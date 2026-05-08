import prisma from '@/lib/prisma';
import JobsTable from './JobsTable';

export const metadata = {
  title: 'Job Moderation | Super Admin',
};

export default async function AdminJobsPage() {
  // Fetch all jobs across the platform with recruiter info
  const jobs = await prisma.job.findMany({
    orderBy: {
      postedAt: 'desc',
    },
    include: {
      recruiter: {
        select: {
          name: true,
          companyName: true
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Job Moderation</h2>
          <p className="text-gray-500">Monitor and moderate all job postings across the platform.</p>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg text-green-700 font-semibold text-sm">
          {jobs.length} Total Postings
        </div>
      </div>

      <JobsTable jobs={jobs} />
    </div>
  );
}
