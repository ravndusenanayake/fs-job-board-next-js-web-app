import { NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '../../../../lib/jobs';
import { PostJobSchema } from '../../../../lib/validation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const job = await getJobById(resolvedParams.id);

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
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

    const job = await updateJob(resolvedParams.id, parsed.data);
    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    console.error('[PATCH /api/jobs/[id]] Error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await deleteJob(resolvedParams.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[DELETE /api/jobs/[id]] Error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
