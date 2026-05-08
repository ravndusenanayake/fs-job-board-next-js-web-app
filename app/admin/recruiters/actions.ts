"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveRecruiter(id: string) {
  await prisma.recruiter.update({
    where: { id },
    data: { 
      isVerified: true,
      verificationStatus: 'Approved'
    }
  });
  revalidatePath('/admin/recruiters');
}

export async function rejectRecruiter(id: string) {
  await prisma.recruiter.update({
    where: { id },
    data: { 
      isVerified: false,
      verificationStatus: 'Rejected'
    }
  });
  revalidatePath('/admin/recruiters');
}

export async function deleteRecruiter(id: string) {
  // Prisma will handle cascading deletes for jobs if configured, 
  // but let's be explicit if needed.
  await prisma.recruiter.delete({
    where: { id }
  });
  revalidatePath('/admin/recruiters');
}
