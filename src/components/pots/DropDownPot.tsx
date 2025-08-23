"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useState, useTransition } from "react";
import { deletePot, updatePot } from "@/actions/handlePot";
import ThemeSelector from "../budgets/ThemeSelector";

type PotProps = {
  potName: string;
  id: string;
  amountPot: number;
  theme: string;
};

const themes = [
  { name: "Red", value: "red", color: "bg-red-500" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
  { name: "Pink", value: "pink", color: "bg-pink-500" },
  { name: "Teal", value: "teal", color: "bg-teal-500" },
  { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
  { name: "Gray", value: "gray", color: "bg-gray-500" },
  { name: "Indigo", value: "indigo", color: "bg-indigo-500" },
];

export default function DropDownPot({
  potName,
  id,
  amountPot,
  theme,
}: PotProps) {
  const [isPending, startTransition] = useTransition();
  const [potNamePlace, setPotNamePlace] = useState(potName);
  const [amountPotPlace, setAmountPotPlace] = useState(amountPot);
  const [themePlace, setThemePlace] = useState(theme);

  function handleDelete() {
    startTransition(() => {
      deletePot(id);
    });
  }

  function handleUpdate() {
    console.log(potNamePlace, amountPotPlace, theme);
    startTransition(() => {
      updatePot(id, potNamePlace, amountPotPlace, themePlace);
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
                Edit Pots
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Budget</DialogTitle>
                  <DialogDescription>
                    If your saving targets change, feel free to update your
                    pots.
                  </DialogDescription>
                </DialogHeader>
                <form action={handleUpdate}>
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="potName"
                      className="text-[#8f8f8f] font-semibold"
                    >
                      Pot Name
                    </label>
                    <input
                      type="text"
                      value={potNamePlace}
                      onChange={(e) => setPotNamePlace(e.target.value)}
                      id="potName"
                      name="potName"
                      placeholder="e.g Rainy Days"
                      className="border-[1px] text-[#8f8f8f] font-semibold rounded-lg p-3 border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
                    />
                    <span className="text-right text-[#8f8f8f] font-semibold text-sm">
                      30 character left
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="amountPot"
                      className="text-[#8f8f8f] font-semibold"
                    >
                      Target Amount
                    </label>
                    <input
                      type="number"
                      value={amountPotPlace}
                      onChange={(e) =>
                        setAmountPotPlace(Number(e.target.value))
                      }
                      id="amountPot"
                      name="amountPot"
                      placeholder="e.g $2000"
                      className="border-[1px] rounded-lg p-3 text-[#8f8f8f] font-semibold border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <h1 className="text-[#8f8f8f] font-semibold">Theme</h1>
                    <Select value={themePlace} onValueChange={setThemePlace}>
                      <SelectTrigger className="w-full cursor-pointer font-semibold text-[#8f8f8f] rounded-lg py-6 px-4 border-black">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg font-semibold">
                        {themes.map((theme) => (
                          <SelectItem
                            key={theme.value}
                            value={theme.value}
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${theme.color}`}
                            ></span>
                            {theme.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <DialogTitle>Delete {potName}?</DialogTitle>
                  <DialogDescription className="text-[15px]">
                    Are you sure you want to delete this pot? This action cannot
                    be reversed, and all the data inside it will be removed
                    forever.
                  </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col items-end" action={handleDelete}>
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
