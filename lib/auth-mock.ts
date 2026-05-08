import { cookies } from 'next/headers';
import prisma from './prisma';

/**
 * MOCK AUTH HELPER
 * In a real app, this would use NextAuth.js or Clerk to get the session.
 * For now, we'll simulate an admin session if a specific user exists.
 */
export async function getAdminSession() {
  try {
    // We use a dynamic check here to avoid IDE type resolution issues 
    // while the Prisma client is regenerating.
    // @ts-ignore
    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
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
  } catch (error) {
    console.error("Auth mock error:", error);
    return null;
  }
}
