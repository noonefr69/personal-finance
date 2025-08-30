"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Pots from "@/models/pots";
import { revalidatePath } from "next/cache";

type PotType = {
  _id: string; // after toString
  potName: string;
  amountPot: number;
  amountEx: number;
  theme: string;
  userEmail: string;
};

export async function getPotsAction() {
  const session = await auth();

  if (!session?.user?.email) throw new Error(`Unauthorized`);

  await dbConnect();

  const getPots = await Pots.find({
    userEmail: session?.user?.email,
  }).lean<PotType[]>();

  return getPots.map((p) => ({
    id: p._id.toString(),
    potName: p.potName,
    amountPot: p.amountPot,
    theme: p.theme,
    amountEx: p.amountEx,
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
    amountEx: 0,
    userEmail: session?.user?.email,
  });

  revalidatePath("/pots");
}

export async function withdrawMoneyPot(id: string, amount: number) {
  const session = await auth();

  if (!session?.user?.email) throw new Error("Unauthorized");
  if (!id || !amount) throw new Error("Invalid input");

  await dbConnect();

  const updated = await Pots.findOneAndUpdate(
    { _id: id, userEmail: session?.user?.email },
    { $inc: { amountEx: -amount } }, // 👈 کم کردن
    { new: true }
  );

  if (!updated) throw new Error("Pot not found or unauthorized");

  if (updated.amountEx < 0) {
    updated.amountEx = 0;
    await updated.save();
  }

  revalidatePath("/pots");
}

export async function updateAddMoneyPot(id: string, newAmountEx: number) {
  const session = await auth();

  if (!session?.user?.email) throw new Error("Unauthorized");

  if (!id || !newAmountEx) {
    throw new Error("Invalid input");
  }

  await dbConnect();

  const updated = await Pots.findOneAndUpdate(
    { _id: id, userEmail: session?.user?.email },
    { $inc: { amountEx: newAmountEx } },
    { new: true }
  );

  if (!updated) {
    throw new Error("Todo not found or unauthorized");
  }

  revalidatePath("/pots");
}

export async function updatePot(
  id: string,
  newPotName: string,
  newAmountPot: number,
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
