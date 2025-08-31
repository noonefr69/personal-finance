"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePickerDemo } from "./DatePicker";
import Selector from "../CategorySelector";
import { addTransactionAction } from "@/actions/handleTransaction";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function AddTransactions() {
  const [isPending, startTransition] = useTransition();

  function handleChange(formData: FormData) {
    startTransition(async () => {
      try {
        await addTransactionAction(formData);
        toast.success("Transaction added successfully!");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          toast.error(err.message);
        } else {
          console.log("Something went wrong");
        }
      }
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="cursor-pointer w-full flex items-center justify-center text-[12px] md:text-base gap-3 bg-gray-800 text-white rounded-lg py-3 px-4 text-md font-semibold shadow-sm hover:bg-gray-900 transition">
          +Add New Transaction
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <form action={handleChange}>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="transaction"
                  className="text-[#8f8f8f] font-semibold"
                >
                  Transaction Name
                </label>
                <input
                  type="text"
                  id="transaction"
                  name="transaction"
                  placeholder="e.g Urban Hub"
                  className="border-[1px] text-[#8f8f8f] font-semibold rounded-lg p-3 border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
                />
                <span className="text-right text-[#8f8f8f] font-semibold text-sm">
                  30 character left
                </span>
              </div>
              <div className="mt-5">
                <DatePickerDemo />
              </div>
              <div className="mt-5">
                <h1 className="text-[#8f8f8f] font-semibold mb-3">Category</h1>{" "}
                <Selector />
              </div>
              <div className="mt-5 flex flex-col space-y-2">
                <label
                  htmlFor="amount"
                  className="text-[#8f8f8f] font-semibold"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="e.g $1000"
                  className="border-[1px] rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
                />
              </div>
              <button
                type="submit"
                className=" mt-8 cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-900 text-white rounded-lg py-3 px-4 text-md font-semibold shadow-sm hover:opacity-80 transition"
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
