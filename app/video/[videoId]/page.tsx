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
          {lecture.video.source ? (
            <video
              className="video-element"
              controls
              preload="metadata"
              poster={lecture.video.thumbnail}
            >
              <source src={lecture.video.source.src} type={lecture.video.source.type} />
              {lecture.video.captions ? (
                <track
                  default
                  kind={lecture.video.captions.kind}
                  label={lecture.video.captions.label}
                  src={lecture.video.captions.src}
                  srcLang={lecture.video.captions.srclang}
                />
              ) : null}
            </video>
          ) : (
            <div className="video-player" aria-label={`${lecture.title} video placeholder`}>
              <span className="play-button" aria-hidden="true">
                &gt;
              </span>
            </div>
          )}
          <div className="panel video-details">
            <p className="eyebrow">
              {lecture.video.provider === "local-file" ? "Local test video" : "Placeholder video"}
            </p>
            <h1>{lecture.title}</h1>
            <p className="lead">{lecture.summary}</p>
            {lecture.video.transcript ? (
              <div className="transcript-download">
                <h2>Transcript Available</h2>
                <a className="button ghost" href={lecture.video.transcript.src} download>
                  Download transcript
                </a>
              </div>
            ) : null}
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
            {lecture.video.captions ? (
              <div>
                <dt>Caption source</dt>
                <dd>{lecture.video.captions.sourceFormat.toUpperCase()}</dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </section>
    </div>
  );
}
