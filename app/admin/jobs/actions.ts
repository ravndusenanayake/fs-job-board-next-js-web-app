"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function unpublishJob(id: string) {
  await prisma.job.update({
    where: { id },
    data: { 
      status: 'Draft' // Or 'Unpublished' depending on your preference
    }
  });
  revalidatePath('/admin/jobs');
}

export async function deleteJob(id: string) {
  await prisma.job.delete({
    where: { id }
  });
  revalidatePath('/admin/jobs');
}

export async function publishJob(id: string) {
  await prisma.job.update({
    where: { id },
    data: { 
      status: 'Published'
    }
  });
  revalidatePath('/admin/jobs');
}
