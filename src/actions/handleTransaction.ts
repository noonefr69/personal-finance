"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Transaction from "@/models/transaction";
import { revalidatePath } from "next/cache";

export type GetTransactionType = {
  id: string;
  transactionTitle: string;
  category: string;
  amount: number;
  date: string;
};

export async function getTransactionAction() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const getTransaction = await Transaction.find({
    userEmail: session?.user?.email,
  }).lean();

  return getTransaction.map((t) => ({
    id: t._id as unknown as string,
    transactionTitle: t.transactionTitle,
    category: t.category,
    amount: t.amount,
    date: t.date instanceof Date ? t.date.toISOString() : String(t.date),
  })) as GetTransactionType[];
}

export async function addTransactionAction(formData: FormData) {
  const transactionTitle = formData.get("transaction");
  const date = formData.get("date");
  const category = formData.get("category");
  const amount = Number(formData.get("amount"));

  if (!transactionTitle || !date || !category || !amount) {
    throw new Error("No title provided");
  }

  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  await Transaction.create({
    transactionTitle,
    date,
    category,
    amount,
    userEmail: session.user.email,
  });

  revalidatePath("/transactions");
}
