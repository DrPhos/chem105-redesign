import { ChapterCard } from "@/components/ChapterCard";
import { getChapters, getCourse } from "@/lib/course";
import { lectures } from "@/data/course";

export default function DashboardPage() {
  const course = getCourse();
  const chapters = getChapters();

  return (
    <div className="page">
      <section className="section-head">
        <div>
          <p className="eyebrow">{course?.term}</p>
          <h1>Course Dashboard</h1>
        </div>
        <p>
          Choose a chapter to view its lectures. This static data layer is ready
          to be replaced by Canvas modules or Cloudflare Stream metadata later.
        </p>
      </section>
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
          <strong>{course?.code}</strong>
          <span>course</span>
        </div>
      </div>
      <section>
        <div className="section-head">
          <h2>Chapters</h2>
        </div>
        <div className="grid">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>
    </div>
  );
}
