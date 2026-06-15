import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <p className="eyebrow">Not found</p>
      <h1>This course page is not available.</h1>
      <p className="lead">The chapter or lecture may not exist in the Version 1 data file.</p>
      <div className="actions">
        <Link className="button primary" href="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
