const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");
function load(file, overrides = {}) {
  const filename = path.resolve(file);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  const original = mod.require.bind(mod);
  mod.require = (id) =>
    Object.hasOwn(overrides, id) ? overrides[id] : original(id);
  mod._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    filename,
  );
  return mod.exports;
}
const core = load("lib/enquiry.ts");
function valid() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: "Test contact",
    company: "Test company",
    email: "test@example.com",
    phone: "+971541234567",
    service: "Packaging",
    message: "A reference packaging enquiry",
    location: "Sharjah",
    quantity: "250",
  }))
    form.set(key, value);
  return form;
}
test("validates required fields, lengths, phone, quantities and real dates", () => {
  assert.deepEqual(core.validateEnquiry(valid()).errors, {});
  const form = valid();
  form.set("company", "");
  form.set("email", "invalid");
  form.set("phone", "abc");
  form.set("quantity", "1.5");
  form.set("deliveryDate", "2099-02-30");
  form.set("message", "x".repeat(5001));
  const errors = core.validateEnquiry(form).errors;
  for (const key of [
    "company",
    "email",
    "phone",
    "quantity",
    "deliveryDate",
    "message",
  ])
    assert.ok(errors[key]);
});
test("rejects past dates and accepts optional scheduling", () => {
  const form = valid();
  form.set("deliveryDate", "2000-01-01");
  assert.ok(core.validateEnquiry(form).errors.deliveryDate);
  form.set("deliveryDate", "");
  assert.equal(core.validateEnquiry(form).errors.deliveryDate, undefined);
});
test("identifies supported content without trusting browser MIME", () => {
  assert.equal(core.identifyArtwork(Buffer.from("%PDF-1.7")), "pdf");
  assert.equal(
    core.identifyArtwork(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    "png",
  );
  assert.equal(
    core.identifyArtwork(Buffer.from("<svg onload=alert(1)>")),
    null,
  );
});
test("server action only confirms successful provider delivery; errors and uploads are bounded", async () => {
  let result = { data: { id: "mock-message" }, error: null };
  let sends = 0;
  let sent;
  let ip = 0;
  const action = load("app/actions.ts", {
    "@/lib/enquiry": core,
    "@/lib/site": { site: { email: "test@example.com" } },
    "next/headers": {
      headers: async () => new Headers({ "x-forwarded-for": String(++ip) }),
    },
    resend: {
      Resend: class {
        emails = {
          send: async (payload) => {
            sends++;
            sent = payload;
            if (result instanceof Error) throw result;
            return result;
          },
        };
      },
    },
  });
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "mock-key-not-a-real-credential";
  try {
    let response = await action.submitEnquiry({ status: "idle" }, valid());
    assert.equal(response.status, "success");
    assert.match(response.reference, /^FZC-/);
    assert.equal(sent.replyTo, "test@example.com");
    result = { data: null, error: { message: "provider failed" } };
    response = await action.submitEnquiry({ status: "idle" }, valid());
    assert.equal(response.status, "error");
    result = new Error("network failed");
    response = await action.submitEnquiry({ status: "idle" }, valid());
    assert.equal(response.status, "error");
    const before = sends;
    const bot = valid();
    bot.set("company_website", "bot");
    assert.equal(
      (await action.submitEnquiry({ status: "idle" }, bot)).status,
      "error",
    );
    assert.equal(sends, before);
    const bad = valid();
    bad.set(
      "artwork",
      new File(["<script>alert(1)</script>"], "reference.pdf", {
        type: "application/pdf",
      }),
    );
    assert.ok(
      (await action.submitEnquiry({ status: "idle" }, bad)).errors.artwork,
    );
    assert.equal(sends, before);
    const large = valid();
    large.set(
      "artwork",
      new File([new Uint8Array(core.MAX_ARTWORK_BYTES + 1)], "big.png"),
    );
    assert.ok(
      (await action.submitEnquiry({ status: "idle" }, large)).errors.artwork,
    );
    result = { data: { id: "mock-with-reference" }, error: null };
    const pdf = valid();
    pdf.set("artwork", new File(["%PDF-1.7\n%%EOF"], "../../original.pdf"));
    assert.equal(
      (await action.submitEnquiry({ status: "idle" }, pdf)).status,
      "success",
    );
    assert.equal(sent.attachments[0].filename, "project-reference.pdf");
    delete process.env.RESEND_API_KEY;
    const noKeyCount = sends;
    assert.equal(
      (await action.submitEnquiry({ status: "idle" }, valid())).status,
      "error",
    );
    assert.equal(sends, noKeyCount);
  } finally {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  }
});
