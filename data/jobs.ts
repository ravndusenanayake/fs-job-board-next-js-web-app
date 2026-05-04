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

export const jobs: Job[] = [
  {
    id: "1",
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
    id: "2",
    title: "Junior Frontend Developer",
    company: "PixelStream",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$80k - $100k",
    postedAt: "2026-05-02T14:30:00Z",
    tags: ["Next.js", "CSS", "Figma"],
    logoColor: "#2563eb"
  },
  {
    id: "3",
    title: "Backend Systems Engineer",
    company: "CloudFlare Core",
    location: "Austin, TX (On-site)",
    type: "Full-time",
    salaryRange: "$110k - $130k",
    postedAt: "2026-05-03T09:15:00Z",
    tags: ["Go", "Rust", "PostgreSQL"],
    logoColor: "#ea580c"
  },
  {
    id: "4",
    title: "Data Science Intern",
    company: "Quantal AI",
    location: "Boston, MA (Hybrid)",
    type: "Internship",
    salaryRange: "$45 - $60 / hr",
    postedAt: "2026-05-04T08:00:00Z",
    tags: ["Python", "PyTorch", "SQL"],
    logoColor: "#16a34a"
  },
  {
    id: "5",
    title: "Full Stack Developer - Entry Level",
    company: "WebSphere",
    location: "Seattle, WA (Remote)",
    type: "Full-time",
    salaryRange: "$90k - $115k",
    postedAt: "2026-05-04T11:45:00Z",
    tags: ["Vue", "Django", "AWS"],
    logoColor: "#c026d3"
  },
  {
    id: "6",
    title: "Mobile App Developer",
    company: "Nomad Tech",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    salaryRange: "$95k - $120k",
    postedAt: "2026-04-28T16:20:00Z",
    tags: ["React Native", "Swift", "Kotlin"],
    logoColor: "#0891b2"
  },
  {
    id: "7",
    title: "DevOps Engineer (Junior)",
    company: "Infrastruct",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$100k - $125k",
    postedAt: "2026-04-30T10:30:00Z",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    logoColor: "#4f46e5"
  },
  {
    id: "8",
    title: "QA Automation Engineer",
    company: "Testify",
    location: "Chicago, IL (On-site)",
    type: "Full-time",
    salaryRange: "$85k - $105k",
    postedAt: "2026-05-01T13:10:00Z",
    tags: ["Selenium", "Cypress", "Java"],
    logoColor: "#dc2626"
  },
  {
    id: "9",
    title: "Cybersecurity Analyst Intern",
    company: "SecureNet",
    location: "Washington, DC (Hybrid)",
    type: "Internship",
    salaryRange: "$35 - $50 / hr",
    postedAt: "2026-05-02T11:00:00Z",
    tags: ["Network Security", "Python", "Linux"],
    logoColor: "#059669"
  },
  {
    id: "10",
    title: "Cloud Architecture Intern",
    company: "SkyHigh Computing",
    location: "Denver, CO (Remote)",
    type: "Internship",
    salaryRange: "$40 - $55 / hr",
    postedAt: "2026-05-03T15:45:00Z",
    tags: ["AWS", "Azure", "Terraform"],
    logoColor: "#0284c7"
  },
  {
    id: "11",
    title: "Machine Learning Engineer",
    company: "BrainWave AI",
    location: "San Jose, CA (Hybrid)",
    type: "Full-time",
    salaryRange: "$120k - $145k",
    postedAt: "2026-04-29T09:20:00Z",
    tags: ["TensorFlow", "C++", "CUDA"],
    logoColor: "#e11d48"
  },
  {
    id: "12",
    title: "Product Manager (Technical)",
    company: "BuildIt",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$110k - $135k",
    postedAt: "2026-05-04T12:00:00Z",
    tags: ["Agile", "Jira", "SQL"],
    logoColor: "#d97706"
  },
  {
    id: "13",
    title: "Game Developer Intern",
    company: "Pixel Play",
    location: "Los Angeles, CA (On-site)",
    type: "Internship",
    salaryRange: "$30 - $45 / hr",
    postedAt: "2026-05-01T08:30:00Z",
    tags: ["Unity", "C#", "3D Math"],
    logoColor: "#9333ea"
  },
  {
    id: "14",
    title: "Site Reliability Engineer",
    company: "AlwaysOn",
    location: "Remote",
    type: "Full-time",
    salaryRange: "$115k - $140k",
    postedAt: "2026-05-03T17:15:00Z",
    tags: ["Linux", "Python", "Monitoring"],
    logoColor: "#334155"
  },
  {
    id: "15",
    title: "UI/UX Developer",
    company: "Creative Logic",
    location: "Portland, OR (Hybrid)",
    type: "Full-time",
    salaryRange: "$95k - $120k",
    postedAt: "2026-05-02T09:45:00Z",
    tags: ["React", "CSS Animations", "Figma"],
    logoColor: "#db2777"
  }
];
