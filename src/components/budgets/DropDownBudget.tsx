"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteBudget } from "@/actions/handleBudget";
import { useTransition } from "react";

type BudgetProps = {
  category: string;
  id: string;
};

export default function DropDownBudget({ category, id }: BudgetProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange() {
    console.log(id);
    startTransition(() => {
      deleteBudget(id);
    });
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          {" "}
          <BsThreeDots className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-center flex flex-col items-center w-full rounded-sm">
          {/* Edit */}
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="duration-300 w-full"
          >
            <Dialog>
              <DialogTrigger className="cursor-pointer p-2 duration-300 w-full font-medium">
                Edit Budgets
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          {/* Delete */}
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="duration-300 w-full"
          >
            <Dialog>
              <DialogTrigger className="cursor-pointer p-2 duration-300 text-red-600 w-full font-medium">
                Delete Budgets
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete {category}?</DialogTitle>
                  <DialogDescription className="text-[15px]">
                    Are you sure you want to delete this budget? This action
                    cannot be reversed, and all the data inside it will be
                    removed forever.
                  </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col items-end" action={handleChange}>
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-4 py-2 w-fit bg-[#b60101] duration-300 hover:bg-[#dd0101] text-white cursor-pointer font-medium rounded-lg"
                    >
                      {isPending ? "load" : "Yes"}
                    </button>
                    <DialogClose className="px-4 py-2 bg-[rgb(253,236,218)] duration-300 hover:bg-[rgb(255,212,165)] cursor-pointer rounded-lg">
                      No
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
