import { chapters, courses, lectures } from "@/data/course";

export function getCourse(courseId = "chem105") {
  return courses.find((course) => course.id === courseId);
}

export function getChapters(courseId = "chem105") {
  return chapters.filter((chapter) => chapter.courseId === courseId);
}

export function getChapter(chapterId: string) {
  return chapters.find((chapter) => chapter.id === chapterId);
}

export function getLecturesForChapter(chapterId: string) {
  return lectures.filter((lecture) => lecture.chapterId === chapterId);
}

export function getLecture(videoId: string) {
  return lectures.find((lecture) => lecture.id === videoId);
}

export function getLectureWithNeighbors(videoId: string) {
  const lecture = getLecture(videoId);

  if (!lecture) {
    return null;
  }

  const courseLectures = lectures.filter((item) => item.courseId === lecture.courseId);
  const index = courseLectures.findIndex((item) => item.id === videoId);

  return {
    lecture,
    previous: index > 0 ? courseLectures[index - 1] : null,
    next: index >= 0 && index < courseLectures.length - 1 ? courseLectures[index + 1] : null
  };
}
