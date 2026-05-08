import prisma from '../lib/prisma';

async function main() {
  const updatedCount = await prisma.application.updateMany({
    where: {
      status: {
        equals: undefined
      }
    },
    data: {
      status: 'Pending'
    }
  });
  
  // Also handle nulls just in case
  const updatedNulls = await prisma.application.updateMany({
    where: {
      status: null as any
    },
    data: {
      status: 'Pending'
    }
  });

  console.log(`Updated ${updatedCount.count + updatedNulls.count} applications to 'Pending' status.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
