"use client";

import { withdrawMoneyPot } from "@/actions/handlePot";
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

export default function Withdraw({
  id,
  potName,
  amountPot,
  theme,
  amountEx,
}: PotProps) {
  const [isPending, startTransition] = useTransition();
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  function handleUpdate() {
    startTransition(() => {
      withdrawMoneyPot(id, withdrawAmount).then(() => {
        setWithdrawAmount(0);
      });
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

        <form action={handleUpdate}>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Currently Saved</span>
            <h1 className="text-4xl font-bold">${amountEx.toFixed(2)}</h1>
          </div>

          <div className="h-2 mt-5 rounded-lg bg-gray-100 overflow-hidden relative">
            <div
              className="h-2 rounded-lg duration-300 absolute left-0 top-0"
              style={{
                backgroundColor: theme || "black",
                width: `${Math.min((amountEx * 100) / amountPot, 100)}%`,
              }}
            />

            <div
              className="h-2 rounded-lg duration-300 absolute top-0 opacity-70"
              style={{
                backgroundColor: "black",
                left: `${Math.max(
                  ((amountEx - withdrawAmount) * 100) / amountPot,
                  0
                )}%`,
                width: `${Math.min((withdrawAmount * 100) / amountPot, 100)}%`,
              }}
            />
          </div>

          <div className="flex mt-4 items-center justify-between">
            <span className="text-red-600">
              {amountEx >= amountPot
                ? "100.00%"
                : `${((amountEx * 100) / amountPot).toFixed(2)}%`}
            </span>
            <span className="text-muted-foreground ">
              Target of ${amountPot}
            </span>
          </div>

          <div className="flex flex-col space-y-2 my-3">
            <label htmlFor="withdraw" className="text-[#8f8f8f] font-semibold">
              Amount to Withdraw
            </label>
            <input
              value={withdrawAmount}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 0) {
                  setWithdrawAmount(0);
                } else if (val > amountEx) {
                  setWithdrawAmount(amountEx);
                } else {
                  setWithdrawAmount(val);
                }
              }}
              type="number"
              id="withdraw"
              name="withdraw"
              min={1}
              max={amountEx}
              disabled={amountEx <= 0}
              placeholder="Enter amount"
              className="border-[1px] disabled:cursor-no-drop rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
            />
          </div>

          <button
            type="submit"
            disabled={amountEx <= 0 || withdrawAmount <= 0}
            className="mt-6 cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-900 text-white rounded-lg py-3 px-4 text-md font-semibold shadow-sm hover:opacity-80 transition disabled:cursor-no-drop disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mr-4"></div>
              </div>
            ) : (
              "Withdraw"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
