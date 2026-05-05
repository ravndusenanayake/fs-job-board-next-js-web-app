import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { jobId, name, email, portfolioUrl, coverLetter } = body;

    // Server-side validation
    if (!jobId || !name || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save the application to the database
    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        portfolioUrl: portfolioUrl || null,
        coverLetter: coverLetter || null,
      }
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', applicationId: application.id },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { message: 'Internal server error processing application' },
      { status: 500 }
    );
  }
}
