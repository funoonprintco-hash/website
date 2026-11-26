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

const core=load("lib/ecard.ts");
const valid=()=>({...core.emptyCard,name:"Example Person",phone:"+971501234567",email:"example@example.com"});
test("e-card validation preserves opt-out and rejects unsafe links and invalid designs",()=>{
 assert.deepEqual(core.validateCard(valid()).errors,{});
 assert.equal(core.validateCard(valid()).card.marketing,false);
 assert.equal(core.validateCard({...valid(),marketing:"true"}).card.marketing,false);
 assert.equal(core.validateCard({...valid(),marketing:true}).card.marketing,true);
 for(const url of ["javascript:alert(1)","data:text/html,test","https://user:password@example.com"])
   assert.ok(core.validateCard({...valid(),website:url}).errors.website);
 assert.equal(core.safeWeb("example.com"),"https://example.com/");
 assert.ok(core.validateCard({...valid(),design:"unknown",color:"red"}).errors.design);
 assert.ok(core.validateCard({...valid(),extraLinks:Array(6).fill("https://example.com").join("\n")}).errors.extraLinks);
 assert.ok(core.validateCard({...valid(),name:"x".repeat(201)}).errors.name);
});
test("vCard escapes user content instead of creating new properties",()=>{
 const text=core.vCard({...valid(),company:"Example\nTEL:123;Group"});
 assert.ok(text.includes("ORG:Example\\nTEL:123\\;Group"));
 assert.equal(text.split("\r\n").filter(l=>l.startsWith("TEL")).length,1);
});
test("e-card submission records consent and confirms only accepted email delivery",async()=>{
 let payload;let calls=0;let provider={data:{id:"test"},error:null};let ip=0;
 const action=load("app/ecard-demo/actions.ts",{
  "@/lib/ecard":core,"@/lib/site":{site:{email:"owner@example.com"}},
  "next/headers":{headers:async()=>new Headers({"x-forwarded-for":String(++ip)})},
  resend:{Resend:class{emails={send:async(p)=>{payload=p;calls++;return provider}}}}
 });
 const previous=process.env.RESEND_API_KEY;process.env.RESEND_API_KEY="mock";
 try{
  assert.equal((await action.saveECard(valid(),"")).status,"success");
  let record=JSON.parse(payload.attachments[0].content.toString());
  assert.equal(record.marketing,false);assert.match(record.marketingConsent,/NOT OPTED IN/);assert.equal(record.consentVersion,core.consentVersion);assert.ok(record.submittedAt);
  assert.equal((await action.saveECard({...valid(),marketing:true},"")).status,"success");
  record=JSON.parse(payload.attachments[0].content.toString());assert.equal(record.marketing,true);assert.equal(record.consentText,core.consentText);
  const before=calls;assert.equal((await action.saveECard(valid(),"bot")).status,"error");assert.equal(calls,before);
  provider={data:null,error:{message:"failed"}};assert.equal((await action.saveECard(valid(),"")).status,"error");
  delete process.env.RESEND_API_KEY;assert.equal((await action.saveECard(valid(),"")).status,"error");
 }finally{if(previous===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=previous;}
});
