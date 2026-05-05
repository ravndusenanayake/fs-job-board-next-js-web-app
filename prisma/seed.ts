import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { jobs as rawJobs } from '../data/jobs';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seeding...');

  // 1. Group jobs by company to create unique Recruiters
  const recruitersMap = new Map<string, any>();
  
  for (const job of rawJobs) {
    if (!recruitersMap.has(job.company)) {
      recruitersMap.set(job.company, {
        name: `${job.company} HR`, // Mock name
        email: `hr@${job.company.toLowerCase().replace(/\s+/g, '')}.com`,
        companyName: job.company,
        companyDescription: `At ${job.company}, we are driven by innovation.`,
        companyLogoColor: job.logoColor || '#7c3aed'
      });
    }
  }

  // 2. Insert Recruiters into DB
  for (const recruiterData of Array.from(recruitersMap.values())) {
    const recruiter = await prisma.recruiter.upsert({
      where: { email: recruiterData.email },
      update: {},
      create: recruiterData,
    });
    // Store back the created ID so we can assign jobs to it
    recruitersMap.set(recruiterData.companyName, recruiter);
  }

  // 3. Insert Jobs linked to Recruiters
  for (const job of rawJobs) {
    const recruiter = recruitersMap.get(job.company);
    
    if (recruiter) {
      await prisma.job.upsert({
        where: { id: job.id },
        update: {},
        create: {
          id: job.id,
          title: job.title,
          location: job.location,
          type: job.type,
          salaryRange: job.salaryRange || null,
          postedAt: new Date(job.postedAt),
          tags: job.tags,
          recruiterId: recruiter.id
        }
      });
    }
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
