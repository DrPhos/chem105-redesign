import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getLectureWithNeighbors } from "@/lib/course";

type VideoPageProps = {
  params: Promise<{
    videoId: string;
  }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;
  const lectureInfo = getLectureWithNeighbors(videoId);

  if (!lectureInfo) {
    notFound();
  }

  const { lecture, previous, next } = lectureInfo;
  const chapter = getChapter(lecture.chapterId);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <Link href={`/chapter/${chapter.id}`}>Chapter {chapter.number}</Link>
        <span>/</span>
        <span>Lecture {lecture.lectureNumber}</span>
      </div>
      <section className="video-layout">
        <div>
          <div className="video-player" aria-label={`${lecture.title} video placeholder`}>
            <span className="play-button" aria-hidden="true">
              &gt;
            </span>
          </div>
          <div className="panel video-details">
            <p className="eyebrow">Placeholder video</p>
            <h1>{lecture.title}</h1>
            <p className="lead">{lecture.summary}</p>
          </div>
          <div className="video-nav">
            {previous ? (
              <Link className="button ghost" href={`/video/${previous.id}`}>
                Previous lecture
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="button primary" href={`/video/${next.id}`}>
                Next lecture
              </Link>
            ) : (
              <Link className="button primary" href="/dashboard">
                Back to dashboard
              </Link>
            )}
          </div>
        </div>
        <aside className="panel sidebar-panel">
          <h2>Video details</h2>
          <dl className="meta-list">
            <div>
              <dt>Chapter</dt>
              <dd>{chapter.number}</dd>
            </div>
            <div>
              <dt>Lecture</dt>
              <dd>{lecture.lectureNumber}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{lecture.duration}</dd>
            </div>
            <div>
              <dt>Provider</dt>
              <dd>{lecture.video.provider}</dd>
            </div>
            <div>
              <dt>Playback ID</dt>
              <dd>{lecture.video.playbackId}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </div>
  );
}
