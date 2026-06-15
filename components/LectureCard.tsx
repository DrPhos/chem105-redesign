import Link from "next/link";
import type { Lecture } from "@/data/course";

export function LectureCard({ lecture }: { lecture: Lecture }) {
  return (
    <Link className="lecture-card" href={`/video/${lecture.id}`}>
      <span className="chip">Lecture {lecture.lectureNumber}</span>
      <h3>{lecture.title}</h3>
      <p>{lecture.summary}</p>
      <span className="card-meta">{lecture.duration} video</span>
    </Link>
  );
}
