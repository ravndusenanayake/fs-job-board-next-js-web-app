import 'dotenv/config';
import prisma from '../lib/prisma';

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log('Total users:', users.length);
    console.log('Roles found:', [...new Set(users.map(u => u.role))]);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
