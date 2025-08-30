"use client";

import { updateAddMoneyPot } from "@/actions/handlePot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";

type PotProps = {
  id: string;
  potName: string;
  theme: string;
  amountPot: number;
  amountEx: number;
};

export default function AddMoneyPot({
  id,
  potName,
  amountPot,
  theme,
  amountEx,
}: PotProps) {
  const [isPending, startTransition] = useTransition();
  const [amountExU, setAmountExU] = useState(0);

  function handleUpdate() {
    startTransition(() => {
      updateAddMoneyPot(id, amountExU).then(() => {
        setAmountExU(0);
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-[rgb(248,244,240)] w-full rounded-lg py-4 font-medium duration-300 hover:bg-transparent cursor-pointer border-2 border-transparent hover:border-black">
        +Add Money
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to &quot;{potName}&quot;</DialogTitle>
          <DialogDescription>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </DialogDescription>
        </DialogHeader>
        <form action={handleUpdate}>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Total Saved</span>
            <h1 className="text-4xl font-bold">
              $
              {amountEx >= amountPot
                ? amountPot.toFixed(2)
                : amountEx.toFixed(2)}
            </h1>
          </div>

          <div className="h-2 mt-5 rounded-lg bg-gray-100 overflow-hidden relative">
            <div
              style={{
                backgroundColor: theme || "black",
                width: `${Math.min((amountEx * 100) / amountPot, 100)}%`,
              }}
              className="h-2 rounded-lg duration-300 absolute left-0 top-0"
            />

            <div
              style={{
                backgroundColor: theme || "black",
                left: `${Math.min((amountEx * 100) / amountPot, 100)}%`,
                width: `${Math.min((amountExU * 100) / amountPot, 100)}%`,
                opacity: 0.7,
              }}
              className="h-2 rounded-lg duration-300 absolute top-0"
            />
          </div>

          <div className="flex mt-4 items-center justify-between">
            <span className="text-green-600">
              {amountEx >= amountPot
                ? "100.00%"
                : `${((amountEx * 100) / amountPot).toFixed(2)}%`}
            </span>
            <span className="text-muted-foreground ">
              Target of ${amountPot}
            </span>
          </div>

          <div className="flex flex-col space-y-2 my-3">
            <label htmlFor="amountPot" className="text-[#8f8f8f] font-semibold">
              Amount to Add
            </label>
            <input
              value={amountExU}
              onChange={(e) => {
                const val = Number(e.target.value);

                if (val <= 0) {
                  setAmountExU(1);
                } else if (val >= amountPot - amountEx) {
                  setAmountExU(amountPot - amountEx);
                } else {
                  setAmountExU(val);
                }
              }}
              type="number"
              id="amountEx"
              name="amountEx"
              min={1}
              max={amountPot - amountEx}
              disabled={amountEx >= amountPot}
              placeholder="Enter amount"
              className="border-[1px] disabled:cursor-no-drop  rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
            />
          </div>

          <button
            type="submit"
            disabled={amountEx >= amountPot}
            className=" mt-6 disabled:opacity-50 disabled:cursor-no-drop cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-900 text-white rounded-lg py-3 px-4 text-md font-semibold shadow-sm hover:opacity-80 transition"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mr-4"></div>
              </div>
            ) : amountEx >= amountPot ? (
              "Max amount"
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
