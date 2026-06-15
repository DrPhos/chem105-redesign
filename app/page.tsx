import Link from "next/link";
import { getChapters } from "@/lib/course";
import { lectures } from "@/data/course";

export default function HomePage() {
  const chapters = getChapters();

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Fall 2026 course site</p>
          <h1>CHEM105</h1>
          <p className="lead">
            A focused course home for Introductory General, Organic, and Biochemistry
            for Health Sciences, organized around chapter lectures and semester access.
          </p>
          <div className="actions">
            <Link className="button primary" href="/access">
              Enter access code
            </Link>
            <Link className="button ghost" href="/dashboard">
              Open dashboard
            </Link>
          </div>
        </div>
        <aside className="panel course-card" aria-label="Course overview">
          <div className="course-card-visual">
            <p className="eyebrow">General + Organic + Biochemistry</p>
            <div className="molecule-grid" aria-hidden="true">
              <span className="atom">C</span>
              <span className="atom">H</span>
              <span className="atom">O</span>
              <span className="atom">N</span>
              <span className="atom">pH</span>
              <span className="atom">ATP</span>
            </div>
          </div>
          <div className="course-card-body">
            <div className="stat-row">
              <div className="stat">
                <strong>{chapters.length}</strong>
                <span>chapters</span>
              </div>
              <div className="stat">
                <strong>{lectures.length}</strong>
                <span>lectures</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>course</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
