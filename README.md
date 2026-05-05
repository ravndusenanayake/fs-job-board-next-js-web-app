<div align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Modules" />
</div>

<h1 align="center">Full Stack Job Board Web Application</h1>

<p align="center">
  A premium, mobile-responsive software engineering job board built with the latest <strong>Next.js 16</strong> App Router. Features advanced server-side search, dynamic routing, highly polished UI/UX, and robust API endpoints for application handling.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#repository">Repository</a>
</p>

---

## ✨ Features

- **Advanced Search & Filtering**: Fast, server-side filtering for jobs based on roles, locations, and keywords.
- **Dynamic Routing**: Dedicated, SEO-friendly detail pages for individual job listings (`/jobs/[id]`).
- **Interactive "Apply Now" Flow**: 
  - Beautiful modal overlay utilizing a glassmorphism effect.
  - Strict frontend form validations (required fields, regex-based email verification).
  - Elegant success, error, and loading states simulating real database insertions.
- **Robust API Backend**: Custom Next.js Route Handlers (`/api/jobs`, `/api/locations`, `/api/apply`) functioning as a decoupled backend data access layer.
- **Custom Error Handling**: 
  - **Global 404 Pages**: A visually striking "Page Not Found" page for invalid global routes.
  - **Context-Specific 404 Pages**: Intelligent, job-specific fallback pages that suggest "Popular Searches" when a requested job URL is missing or expired.
- **Premium UI/UX Design**: Built completely with Vanilla CSS and CSS Modules. Features harmonious color palettes, fluid gradients, typography scaling, and dynamic micro-animations without relying on heavy UI frameworks.

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (CSS Modules)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codezelaca/fs-job-board-next-js-webapp.git
   cd fs-job-board-next-js-webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📂 Project Structure

```text
fs-job-board-next-js-web-app/
├── app/
│   ├── api/                  # Backend Next.js API Routes
│   │   ├── apply/            # Form submission handler
│   │   ├── jobs/             # Job retrieval endpoint
│   │   └── locations/        # Location filtering endpoint
│   ├── jobs/
│   │   └── [id]/             # Dynamic individual job pages
│   │       ├── not-found.tsx # Job-specific 404 page
│   │       └── page.tsx      # Job details UI
│   ├── globals.css           # Global theme variables & resets
│   ├── layout.tsx            # Root layout component
│   ├── not-found.tsx         # Global 404 page
│   └── page.tsx              # Application homepage
├── components/               # Reusable React components
│   ├── ApplyButton.tsx       # Client-side modal trigger
│   ├── ApplyModal.tsx        # Fully validated application form modal
│   ├── JobCard.tsx           # Individual job listing preview
│   └── JobFilters.tsx        # Search and filter input handlers
├── lib/                      # Utility functions & data access methods
└── public/                   # Static assets (images, fonts, etc.)
```

## 🔗 Repository

You can find the source code and contribute to the project on GitHub:
**[https://github.com/codezelaca/fs-job-board-next-js-webapp](https://github.com/codezelaca/fs-job-board-next-js-webapp)**

---
<p align="center">Built with passion using Next.js.</p>
