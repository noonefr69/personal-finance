"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddMoneyPot() {
  return (
      <Dialog>
        <DialogTrigger className="bg-[rgb(248,244,240)] w-full rounded-lg py-4 font-medium duration-300 hover:bg-transparent cursor-pointer border-2 border-transparent hover:border-black">
          +Add Money
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  );
}
