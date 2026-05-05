import { NextResponse } from 'next/server';
import { getUniqueLocations } from '../../../lib/jobs';

export async function GET() {
  const locations = await getUniqueLocations();
  return NextResponse.json(locations);
}
