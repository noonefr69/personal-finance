"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRef, useTransition } from "react";
import ThemeSelector from "./ThemeSelector";
import CategorySelector from "../CategorySelector";
import { addBudget } from "@/actions/handleBudget";
import toast from "react-hot-toast";

export default function AddTransactions() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(formData: FormData) {
    startTransition(async () => {
      try {
        await addBudget(formData);
        formRef.current?.reset();

        toast.success("Budget added successfully!");
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
        <DialogTrigger className="cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-800 text-white rounded-lg py-3 px-4 text-sm md:text-base font-semibold shadow-sm hover:bg-gray-900 transition">
          +Add New Budget
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Budget</DialogTitle>
            <DialogDescription className="my-5">
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </DialogDescription>
            <form ref={formRef} action={handleChange}>
              <div className="flex flex-col space-y-2">
                <h1 className="text-[#8f8f8f] font-semibold">Category</h1>
                <CategorySelector />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="spend" className="text-[#8f8f8f] font-semibold">
                  Maximum Spend
                </label>
                <input
                  type="number"
                  id="spend"
                  name="spend"
                  placeholder="e.g $2000"
                  className="border-[1px] rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-2">
                <h1 className="text-[#8f8f8f] font-semibold">Theme</h1>
                <ThemeSelector />
              </div>{" "}
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
