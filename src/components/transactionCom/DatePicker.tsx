"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <>
      <input
        type="hidden"
        id="date"
        name="date"
        value={date ? date.toISOString() : ""}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground border-transparent border-[1px] rounded-lg hover:border-black hover:bg-white cursor-pointer p-7 bg-[rgb(248,244,240)] justify-between text-left font-normal w-full"
          >
            {date ? (
              <div className="text-[#000000] font-semibold">
                {format(date, "PPP")}
              </div>
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </>
  );
}
