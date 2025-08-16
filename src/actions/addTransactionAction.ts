"use server";

export async function addTransactionAction(formData: FormData) {
  const transaction = formData.get("transaction");
  const data = formData.get("date");
  const category = formData.get("category");
  const amount = formData.get("amount");
}
