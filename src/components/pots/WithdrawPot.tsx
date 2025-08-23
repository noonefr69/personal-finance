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
      updateAddMoneyPot(id, amountExU);
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-[rgb(248,244,240)] w-full rounded-lg py-4 font-medium duration-300 hover:bg-transparent cursor-pointer border-2 border-transparent hover:border-black">
        Withdraw
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw from "{potName}"</DialogTitle>
          <DialogDescription>
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </DialogDescription>
        </DialogHeader>
        <form action={``}>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">New Amount</span>
            <h1 className="text-4xl font-bold">${amountExU.toFixed(2)}</h1>
          </div>

          <div className="h-2 mt-5 rounded-lg bg-gray-100 flex flex-col overflow-hidden items-start justify-center">
            <div
              style={{
                backgroundColor: theme || "black",
                // width: `${(amountPot * 100) / amountExU}%`,
              }}
              className="h-2 rounded-lg duration-300"
            />
          </div>

          <div className="flex mt-4 items-center justify-between">
            <span className="text-green-600">
              {((amountExU * 100) / amountPot).toFixed(2)}%
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
                  setAmountExU(0);
                } else if (val >= amountPot) {
                  setAmountExU(amountPot);
                } else {
                  setAmountExU(val);
                }
              }}
              type="number"
              id="amountEx"
              name="amountEx"
              min={1}
              max={amountPot}
              placeholder="Enter amount"
              className="border-[1px] rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
            />
          </div>

          <button
            type="submit"
            className=" mt-6 cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-900 text-white rounded-lg py-3 px-4 text-md font-semibold shadow-sm hover:opacity-80 transition"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mr-4"></div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
