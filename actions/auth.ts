"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/lib/validation";

export async function signUp(values: any) {
  // Validate fields using Zod
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { email, password, name, role } = validatedFields.data;

  // Additional check: Ensure 'ADMIN' role cannot be assigned via the public sign-up form
  // (Though Zod enum already limits this to USER and RECRUITER)
  if (role as string === "ADMIN") {
    return { error: "Unauthorized role assignment" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        ...(role === "RECRUITER" && {
          recruiter: {
            create: {
              name: name,
              email: email,
              companyName: validatedFields.data.companyName || "Unknown Company",
              verificationStatus: "Pending",
              isVerified: false,
            },
          },
        }),
      },
    });

    return { success: "Account created successfully!" };
  } catch (error: any) {
    console.error("Sign-up error:", error);
    return { error: error?.message || "An unexpected error occurred" };
  }
}
