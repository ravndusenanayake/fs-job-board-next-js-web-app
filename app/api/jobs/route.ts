import { NextResponse } from 'next/server';
import { getJobs } from '../../../lib/jobs';

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
