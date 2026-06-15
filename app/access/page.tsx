import Link from "next/link";
import { SEMESTER_ACCESS_CODE } from "@/lib/access";

type AccessPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function AccessPage({ searchParams }: AccessPageProps) {
  const params = await searchParams;
  const next = params.next ?? "/dashboard";

  return (
    <div className="page">
      <section className="access-shell">
        <div>
          <p className="eyebrow">Semester access</p>
          <h1>Enter the CHEM105 access code.</h1>
          <p className="lead">
            Access is stored locally in a browser cookie for Version 1. The same
            boundary can later connect to Canvas enrollment checks or a campus login.
          </p>
          <div className="notice">
            Example code for this build: <strong>{SEMESTER_ACCESS_CODE}</strong>
          </div>
        </div>
        <form className="panel access-form" action="/api/access" method="post">
          <input type="hidden" name="next" value={next} />
          <div className="field">
            <label htmlFor="access-code">Access code</label>
            <input
              id="access-code"
              name="code"
              autoComplete="off"
              placeholder="Fall2026-CHEM105"
              required
            />
          </div>
          {params.error ? <p className="error">That code did not match this semester.</p> : null}
          <button className="button primary" type="submit">
            Continue
          </button>
          <div className="actions">
            <Link className="button ghost" href="/">
              Back home
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
