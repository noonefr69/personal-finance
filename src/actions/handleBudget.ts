"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Budget from "@/models/budgets";
import { revalidatePath } from "next/cache";

export async function getBudgetsAction() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const getBudgets = await Budget.find({
    userEmail: session?.user?.email,
  }).lean();

  return getBudgets.map((b: any) => ({
    id: b._id.toString(),
    category: b.category,
    spend: b.spend,
    theme: b.theme,
  }));
}

export async function addBudget(formData: FormData) {
  const category = formData.get("category");
  const spend = Number(formData.get("spend"));
  const theme = formData.get("theme");

  if (!category || !spend || !theme) {
    throw new Error("No Data provided");
  }

  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  await Budget.create({
    category,
    spend,
    theme,
    userEmail: session.user.email,
  });

  revalidatePath("/budgets");
}

export async function deleteBudget(id: string) {
  const session = await auth();

  await dbConnect();

  await Budget.findOneAndDelete({ _id: id, userEmail: session?.user?.email });

  revalidatePath("/budgets");
}
