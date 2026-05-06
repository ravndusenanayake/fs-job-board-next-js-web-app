import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../lib/prisma';
import { getJobs } from '../../../lib/jobs';

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const PostJobSchema = z.object({
  title: z
    .string({ required_error: 'Job title is required.' })
    .min(3, 'Title must be at least 3 characters.')
    .max(100, 'Title must be 100 characters or fewer.'),
  location: z
    .string({ required_error: 'Location is required.' })
    .min(2, 'Location must be at least 2 characters.'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
    errorMap: () => ({ message: 'Please select a valid job type.' }),
  }),
  status: z.enum(['Published', 'Draft'], {
    errorMap: () => ({ message: 'Please select a valid status.' }),
  }),
  salaryRange: z.string().max(50, 'Salary range is too long.').optional().or(z.literal('')),
  tags: z
    .array(z.string().trim().min(1, 'Tags cannot be empty.').max(30, 'Each tag must be 30 characters or fewer.'))
    .min(1, 'At least one skill/tag is required.')
    .max(10, 'Maximum 10 tags allowed.'),
  description: z
    .string({ required_error: 'Description is required.' })
    .trim()
    .min(50, 'Description must be at least 50 characters.')
    .max(5000, 'Description must be 5000 characters or fewer.'),
});

// ─── Helper: slug generator ───────────────────────────────────────────────────
function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);

  // Append short random suffix to ensure uniqueness
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

// ─── GET ─────────────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query') || undefined;
  const type = searchParams.get('type') || undefined;
  const locationType = searchParams.get('locationType') || undefined;
  const skill = searchParams.get('skill') || undefined;
  const page = searchParams.has('page') ? parseInt(searchParams.get('page') as string, 10) : undefined;
  const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit') as string, 10) : undefined;

  const result = await getJobs({ query, type, locationType, skill, page, limit });

  return NextResponse.json(result);
}

// ─── POST ─────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const parsed = PostJobSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors: fieldErrors },
        { status: 422 }
      );
    }

    const { title, location, type, status, salaryRange, tags, description } = parsed.data;

    // Find the first recruiter as the owner (until auth is implemented)
    const recruiter = await prisma.recruiter.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!recruiter) {
      return NextResponse.json(
        { success: false, message: 'No recruiter account found. Please set up your profile first.' },
        { status: 400 }
      );
    }

    // Normalize optional fields
    const normalizedSalaryRange = salaryRange && salaryRange.trim() !== '' ? salaryRange.trim() : null;

    // Create job
    const job = await prisma.job.create({
      data: {
        id: slugify(title),
        title: title.trim(),
        location: location.trim(),
        type,
        status,
        salaryRange: normalizedSalaryRange,
        tags: tags.map(t => t.trim()),
        description: description.trim(),
        recruiterId: recruiter.id,
      },
      include: { recruiter: true },
    });

    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error: any) {
    console.error('[POST /api/jobs] Error:', error);

    // Prisma unique constraint violation (duplicate slug)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'A job with a similar title already exists. Please use a more specific title.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
