"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function ThemeSelector() {
  const [value, setValue] = React.useState("");

  return (
    <>
      <input type="hidden" id="theme" name="theme" value={value} />

      <Select value={value} onValueChange={setValue}>
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
              <span className={`w-4 h-4 rounded-full ${theme.color}`}></span>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
