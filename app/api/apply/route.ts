import { NextResponse } from 'next/server';

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

    // Simulate backend processing time (e.g. database insert, sending email)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would typically save the application to your database
    // console.log("New application received:", { jobId, name, email, portfolioUrl, coverLetter });

    // For demonstration, let's pretend if email is 'error@example.com', we throw an error
    if (email === 'error@example.com') {
      return NextResponse.json(
        { message: 'Database constraint failed. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Application submitted successfully' },
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
