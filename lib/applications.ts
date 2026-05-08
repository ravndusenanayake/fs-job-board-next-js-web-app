import prisma from './prisma';

export async function getApplications(params: {
  page?: number;
  limit?: number;
  jobId?: string;
} = {}) {
  const { page = 1, limit = 10, jobId } = params;
  const skip = (page - 1) * limit;

  const where = jobId ? { jobId } : {};

  try {
    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          job: {
            include: {
              recruiter: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return {
      applications,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return {
      applications: [],
      total: 0,
      totalPages: 0,
    };
  }
}
