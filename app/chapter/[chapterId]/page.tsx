import Link from "next/link";
import { notFound } from "next/navigation";
import { LectureCard } from "@/components/LectureCard";
import { getChapter, getLecturesForChapter } from "@/lib/course";

type ChapterPageProps = {
  params: Promise<{
    chapterId: string;
  }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const chapter = getChapter(chapterId);

  if (!chapter) {
    notFound();
  }

  const chapterLectures = getLecturesForChapter(chapter.id);

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <span>Chapter {chapter.number}</span>
      </div>
      <section className="section-head">
        <div>
          <p className="eyebrow">Chapter {chapter.number}</p>
          <h1>{chapter.title}</h1>
        </div>
        <p>{chapter.description}</p>
      </section>
      <div className="grid">
        {chapterLectures.map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>
    </div>
  );
}
