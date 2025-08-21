"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Pots from "@/models/pots";
import { revalidatePath } from "next/cache";

export async function getPotsAction() {
  const session = await auth();

  if (!session?.user?.email) throw new Error(`Unauthorized`);

  await dbConnect();

  const getPots = await Pots.find({
    userEmail: session?.user?.email,
  }).lean();

  return getPots.map((p: any) => ({
    id: p._id.toString(),
    potName: p.potName,
    amountPot: p.amountPot,
    theme: p.theme,
  }));
}

export async function addPot(formData: FormData) {
  const potName = formData.get("potName");
  const amountPot = Number(formData.get("amountPot"));
  const theme = formData.get("theme");

  if (!potName || !amountPot || !theme) {
    throw new Error("No Data provided");
  }

  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  await Pots.create({
    potName,
    amountPot,
    theme,
    userEmail: session.user.email,
  });

  revalidatePath("/pots");
}

export async function updatePot(
  id: string,
  newPotName: string,
  newAmountPot: string,
  newTheme: string
) {
  const session = await auth();

  if (!session?.user?.email) throw new Error("Unauthorized");

  if (!id || !newPotName.trim() || !newAmountPot || !newTheme) {
    throw new Error("Invalid input");
  }

  await dbConnect();

  const updated = await Pots.findOneAndUpdate(
    { _id: id, userEmail: session?.user?.email },
    { potName: newPotName, amountPot: newAmountPot, theme: newTheme },
    { new: true }
  );

  if (!updated) {
    throw new Error("Todo not found or unauthorized");
  }

  revalidatePath("/pots");
}

export async function deletePot(id: string) {
  const session = await auth();

  await dbConnect();

  await Pots.findOneAndDelete({ _id: id, userEmail: session?.user?.email });

  revalidatePath("/pots");
}
