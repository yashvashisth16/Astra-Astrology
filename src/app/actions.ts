"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function saveUserProfile(data: { dob: string; birthTime: string; birthLocation: string }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    throw new Error("You must be logged in to save your profile.");
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      dob: data.dob,
      birthTime: data.birthTime,
      birthLocation: data.birthLocation,
    },
  });

  return { success: true };
}

export async function submitTestimony(data: { content: string; rating: number }) {
  const session = await getServerSession(authOptions);

  // @ts-ignore
  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in to submit a case study.");
  }

  await prisma.testimony.create({
    data: {
      content: data.content,
      rating: data.rating,
      // @ts-ignore
      userId: session.user.id,
    },
  });

  // Revalidate the testimonies page so the new testimony shows up immediately
  revalidatePath("/testimonies");

  return { success: true };
}
