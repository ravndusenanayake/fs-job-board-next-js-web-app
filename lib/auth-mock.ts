import { cookies } from 'next/headers';
import prisma from './prisma';
import { Role } from '@prisma/client';

/**
 * MOCK AUTH HELPER
 * In a real app, this would use NextAuth.js or Clerk to get the session.
 * For now, we'll simulate an admin session if a specific cookie is present
 * or just return a mock admin for development purposes.
 */
export async function getAdminSession() {
  // For this demo, let's assume if we're in the admin route, we want to check
  // if a user with ADMIN role exists. In a real app, you'd check the JWT/Session.
  
  // MOCK: Finding the first ADMIN in the database to simulate a logged-in admin
  const admin = await prisma.user.findFirst({
    where: { role: Role.ADMIN }
  });

  if (!admin) return null;

  return {
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  };
}
