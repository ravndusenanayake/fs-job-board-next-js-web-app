import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const jobCount = await prisma.job.count();
  const recruiterCount = await prisma.recruiter.count();
  console.log(`Jobs in DB: ${jobCount}`);
  console.log(`Recruiters in DB: ${recruiterCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
