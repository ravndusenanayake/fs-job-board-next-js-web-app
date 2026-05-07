export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  salaryRange?: string;
  postedAt: string;
  tags: string[];
  logoColor?: string;
}

const generateSlug = (title: string, company: string, existingSlugs: Set<string>): string => {
  const baseSlug = `${title}-${company}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  existingSlugs.add(slug);
  return slug;
};

const existingSlugs = new Set<string>();

export const jobs: Job[] = [
  {
    id: generateSlug("Software Engineering Intern", "TechNova", existingSlugs),
    title: "Software Engineering Intern",
    company: "TechNova",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    salaryRange: "$40 - $55 / hr",
    postedAt: "2026-05-01T10:00:00Z",
    tags: ["React", "TypeScript", "Node.js"],
    logoColor: "#7c3aed"
  },
  {
    id: generateSlug("Junior Frontend Developer", "PixelStream", existingSlugs),
    title: "Junior Frontend Developer",
    company: "PixelStream",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$80k - $110k",
    postedAt: "2026-05-02T14:30:00Z",
    tags: ["Next.js", "CSS Modules", "Figma"],
    logoColor: "#2563eb"
  },
  {
    id: generateSlug("Backend Developer", "CloudScale", existingSlugs),
    title: "Backend Developer",
    company: "CloudScale",
    location: "New York, NY",
    type: "Full-time",
    salaryRange: "$100k - $140k",
    postedAt: "2026-05-03T09:15:00Z",
    tags: ["PostgreSQL", "Prisma", "Go"],
    logoColor: "#059669"
  },
  {
    id: generateSlug("Mobile App Intern", "AppVantage", existingSlugs),
    title: "Mobile App Intern",
    company: "AppVantage",
    location: "Austin, TX (On-site)",
    type: "Internship",
    salaryRange: "$35 - $45 / hr",
    postedAt: "2026-05-04T11:45:00Z",
    tags: ["React Native", "Firebase", "Mobile"],
    logoColor: "#f59e0b"
  },
  {
    id: generateSlug("Full Stack Developer", "WebWorks", existingSlugs),
    title: "Full Stack Developer",
    company: "WebWorks",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$90k - $130k",
    postedAt: "2026-05-05T16:20:00Z",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    logoColor: "#ec4899"
  },
  {
    id: generateSlug("Data Engineer", "DataFlow", existingSlugs),
    title: "Data Engineer",
    company: "DataFlow",
    location: "Seattle, WA",
    type: "Full-time",
    salaryRange: "$110k - $150k",
    postedAt: "2026-05-06T08:00:00Z",
    tags: ["Python", "Spark", "AWS"],
    logoColor: "#6366f1"
  }
];
