"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="shell section">
      <h1>Something didn’t load.</h1>
      <p className="large-copy">
        Please try again, or contact us directly if the problem continues.
      </p>
      <button className="button button-black" onClick={reset}>
        Try Again
      </button>
    </section>
  );
}
