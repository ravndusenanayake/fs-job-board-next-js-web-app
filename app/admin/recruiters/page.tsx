import prisma from '@/lib/prisma';
import RecruitersTable from './RecruitersTable';

export const metadata = {
  title: 'Recruiter Management | Super Admin',
};

export default async function AdminRecruitersPage() {
  // Fetch all recruiters with their job count
  const recruiters = await prisma.recruiter.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: { jobs: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recruiter Management</h2>
          <p className="text-gray-500">Review, verify, and manage all recruiter accounts on the platform.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg text-indigo-700 font-semibold text-sm">
          {recruiters.length} Total Recruiters
        </div>
      </div>

      <RecruitersTable recruiters={recruiters} />
    </div>
  );
}
