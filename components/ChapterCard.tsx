import Link from "next/link";
import type { Chapter } from "@/data/course";
import { getLecturesForChapter } from "@/lib/course";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const lectures = getLecturesForChapter(chapter.id);

  return (
    <Link className="chapter-card" href={`/chapter/${chapter.id}`}>
      <span className="chip">Chapter {chapter.number}</span>
      <h3>{chapter.title}</h3>
      <p>{chapter.description}</p>
      <span className="card-meta">
        {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"}
      </span>
    </Link>
  );
}
