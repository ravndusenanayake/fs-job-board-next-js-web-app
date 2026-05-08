"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleBanUser(id: string, currentStatus: boolean) {
  await prisma.user.update({
    where: { id },
    data: { 
      isBanned: !currentStatus
    }
  });
  revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id }
  });
  revalidatePath('/admin/users');
}

export async function changeUserRole(id: string, newRole: any) {
  await prisma.user.update({
    where: { id },
    data: { 
      role: newRole
    }
  });
  revalidatePath('/admin/users');
}
