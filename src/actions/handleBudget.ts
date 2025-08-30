"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Budget from "@/models/budgets";
import { revalidatePath } from "next/cache";

type GetBudgetsType = {
  id: string;
  category: string;
  spend: number;
  theme: string;
};

type BudgetDocument = {
  _id: string | number;
  category: string;
  spend: number;
  theme: string;
};

export async function getBudgetsAction() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const getBudgets = await Budget.find({
    userEmail: session?.user?.email,
  }).lean<BudgetDocument[]>();

  return getBudgets.map((b) => ({
    id: b._id.toString(),
    category: b.category,
    spend: b.spend,
    theme: b.theme,
  })) as GetBudgetsType[];
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

export async function updateBudget(
  id: string,
  newCategory: string,
  newSpend: string,
  newTheme: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (!id || !newCategory.trim() || !newSpend || !newTheme) {
    throw new Error("Invalid input");
  }

  await dbConnect();

  const updated = await Budget.findOneAndUpdate(
    { _id: id, userEmail: session.user.email },
    { category: newCategory, spend: newSpend, theme: newTheme },
    { new: true }
  );

  if (!updated) {
    throw new Error("Todo not found or unauthorized");
  }

  revalidatePath("/budgets");
}
