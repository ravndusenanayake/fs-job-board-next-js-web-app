import 'dotenv/config';
import prisma from '../lib/prisma';

async function makeAdmin(email: string) {
  try {
    // 1. Check if user exists, if not create them
    const user = await prisma.user.upsert({
      where: { email },
      update: { role: 'ADMIN' },
      create: {
        email,
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    console.log(`✅ Success! User ${email} is now an ADMIN.`);
    console.log(user);
  } catch (error) {
    console.error('❌ Error promoting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Replace with the email you want to promote
const targetEmail = process.argv[2];

if (!targetEmail) {
  console.log('Please provide an email: npx tsx scratch/make_admin.ts user@example.com');
  process.exit(1);
}

makeAdmin(targetEmail);
