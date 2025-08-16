"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Transaction from "@/models/transaction";
import { revalidatePath } from "next/cache";

export async function addTransactionAction(formData: FormData) {
  const transactionTitle = formData.get("transaction");
  const date = formData.get("date");
  const category = formData.get("category");
  const amount = formData.get("amount");

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

  revalidatePath("/");
}
