export type Course = {
  id: string;
  code: string;
  title: string;
  term: string;
  audience: string;
  platform: {
    canvasCourseId?: string;
    cloudflareStreamAccountId?: string;
  };
};

export type Chapter = {
  id: string;
  courseId: string;
  number: number;
  title: string;
  description: string;
};

export type Lecture = {
  id: string;
  courseId: string;
  chapterId: string;
  chapterNumber: number;
  lectureNumber: number;
  title: string;
  duration: string;
  summary: string;
  video: {
    provider: "placeholder" | "local-file" | "cloudflare-stream";
    playbackId: string;
    thumbnail: string;
    source?: {
      src: string;
      type: string;
    };
    captions?: {
      src: string;
      sourceSrc: string;
      sourceFormat: "srt";
      kind: "captions" | "subtitles";
      label: string;
      srclang: string;
    };
    transcript?: {
      src: string;
      label: string;
    };
  };
};

export const courses: Course[] = [
  {
    id: "chem105",
    code: "CHEM105",
    title: "Introductory General, Organic, and Biochemistry for Health Sciences",
    term: "Fall 2026",
    audience: "Health sciences students",
    platform: {
      canvasCourseId: undefined,
      cloudflareStreamAccountId: undefined
    }
  }
];

const chapterDefinitions = [
  [1, "Measurements, Matter, and Scientific Reasoning", "Course foundations, measurements, matter, and chemical problem solving."],
  [2, "Atoms and the Periodic Table", "Atomic structure, periodic patterns, and the language of elements."],
  [3, "Chemical Bonds", "Ionic and covalent bonding patterns used across health science chemistry."],
  [4, "Chemical Reactions", "Reaction types, equations, and mole-based relationships."],
  [6, "Gases and Solutions", "Gas behavior, concentration, and solution chemistry."],
  [7, "Acids, Bases, and Buffers", "pH, acid-base reactions, and buffer systems relevant to physiology."],
  [9, "Organic Chemistry Foundations", "Carbon bonding, functional groups, and molecular structure."],
  [10, "Alcohols, Ethers, and Thiols", "Properties and reactions of oxygen- and sulfur-containing organic compounds."],
  [11, "Aldehydes and Ketones", "Carbonyl compounds and their roles in biochemical contexts."],
  [12, "Carboxylic Acids and Esters", "Carboxylic acid derivatives, reactions, and health science applications."],
  [13, "Amines and Amides", "Nitrogen-containing organic compounds and their biological importance."],
  [14, "Carbohydrates", "Monosaccharides, disaccharides, polysaccharides, and energy chemistry."],
  [15, "Lipids", "Fatty acids, triglycerides, phospholipids, and membranes."],
  [16, "Proteins and Enzymes", "Amino acids, protein structure, and enzyme behavior."],
  [17, "Nucleic Acids and Metabolism", "DNA, RNA, and major metabolic themes."]
] as const;

const lectureCountsByChapter = new Map<number, number>([
  [1, 1],
  [2, 2],
  [3, 1],
  [4, 1],
  [6, 3],
  [7, 2],
  [9, 2],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 1],
  [14, 2],
  [15, 2],
  [16, 2],
  [17, 2]
]);

export const chapters: Chapter[] = chapterDefinitions.map(([number, title, description]) => ({
  id: `chapter-${number}`,
  courseId: "chem105",
  number,
  title,
  description
}));

export const lectures: Lecture[] = chapters.flatMap((chapter) => {
  const lectureCount = lectureCountsByChapter.get(chapter.number) ?? 0;

  return Array.from({ length: lectureCount }, (_, index) => {
    const lectureNumber = index + 1;
    const isChapterOneLecture = chapter.number === 1 && lectureNumber === 1;

    return {
      id: `chapter-${chapter.number}-lecture-${lectureNumber}`,
      courseId: chapter.courseId,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      lectureNumber,
      title: isChapterOneLecture
        ? "Chapter 1, Lecture 1: Measurements, Matter, and Scientific Reasoning"
        : `Chapter ${chapter.number}, Lecture ${lectureNumber}`,
      duration: isChapterOneLecture ? "Local test lecture" : ["18 min", "24 min", "31 min"][index % 3],
      summary: isChapterOneLecture
        ? "Real local test lecture using the Chapter 1 video and transcript files in public/test-media."
        : `${chapter.title}: focused lecture ${lectureNumber} with placeholder video metadata for Version 1.`,
      video: isChapterOneLecture
        ? {
            provider: "local-file",
            playbackId: "local-ch1-l1",
            thumbnail: "/video-placeholder.svg",
            source: {
              src: "/test-media/Ch_1.mov",
              type: "video/quicktime"
            },
            captions: {
              src: "/test-media/Ch_1.vtt",
              sourceSrc: "/test-media/Ch_1.srt",
              sourceFormat: "srt",
              kind: "captions",
              label: "English",
              srclang: "en"
            },
            transcript: {
              src: "/test-media/Ch_1.srt",
              label: "Chapter 1 transcript"
            }
          }
        : {
            provider: "placeholder",
            playbackId: `placeholder-ch${chapter.number}-l${lectureNumber}`,
            thumbnail: `/video-placeholder.svg`
          }
    };
  });
});
