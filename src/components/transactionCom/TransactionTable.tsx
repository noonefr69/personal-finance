"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PiSortAscendingFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { GetTransactionType } from "@/actions/handleTransaction";

type TransactionTableProps = {
  transactions: GetTransactionType[];
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

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [filterBy, setFilterBy] = useState("All");

  const filteredTransactions = transactions
    // search filter
    .filter((t) =>
      t.transactionTitle.toLowerCase().includes(search.toLowerCase())
    )
    // category filter
    .filter((t) => (filterBy === "All" ? true : t.category === filterBy));

  // sorting logic
  if (sortBy === "Latest") {
    filteredTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortBy === "Oldest") {
    filteredTransactions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (sortBy === "AtoZ") {
    filteredTransactions.sort((a, b) =>
      a.transactionTitle.localeCompare(b.transactionTitle)
    );
  } else if (sortBy === "ZtoA") {
    filteredTransactions.sort((a, b) =>
      b.transactionTitle.localeCompare(a.transactionTitle)
    );
  } else if (sortBy === "Highest") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === "Lowest") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  return (
    <div className="lg:m-10 bg-white rounded-lg overflow-auto duration-300 min-h-[calc(100vh-21vh)] max-h-[calc(100vh-19vh)] p-4 lg:p-10">
      <div className="mb-10 flex items-center gap-3 lg:justify-between">
        <input
          type="text"
          className="border-[1px] w-2/3 lg:w-1/3 font-semibold rounded-lg px-3 py-2 border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Transaction"
        />
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="flex items-center gap-3">
            <h1 className="font-medium text-gray-500 hidden lg:flex">
              Sort by
            </h1>
            <Select onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[180px] cursor-pointer hidden lg:flex">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectTrigger className="w-fit cursor-pointer flex lg:hidden  border-none shadow-none">
                <PiSortAscendingFill className="" size={60} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="AtoZ">A to Z</SelectItem>
                <SelectItem value="ZtoA">Z to A</SelectItem>
                <SelectItem value="Highest">Highest</SelectItem>
                <SelectItem value="Lowest">Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-medium text-gray-500 hidden lg:flex">
              Filter by Category
            </h1>
            <Select onValueChange={(val) => setFilterBy(val)}>
              <SelectTrigger className="w-[180px] cursor-pointer hidden lg:flex">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectTrigger className="w-fit cursor-pointer flex lg:hidden  border-none shadow-none">
                <FaFilter size={60} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="DiningOut">Dining Out</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="PersonalCare">Personal Care</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full">
        <Table className="">
          <TableCaption>
            {transactions.length == 0 ? "No Data Provided" : "Transaction"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#939393] ">
                Recipient / Sender
              </TableHead>
              <TableHead className="text-[#939393] ">Category</TableHead>
              <TableHead className="text-[#939393] ">
                Transaction Date
              </TableHead>
              <TableHead className="text-right text-[#939393] ">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {filteredTransactions.map((transaction) => {
              return (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="font-medium text-[black] text-lg">
                    {transaction.transactionTitle}
                  </TableCell>
                  <TableCell className=" text-[#818181]">
                    {transaction.category}
                  </TableCell>
                  <TableCell className=" text-[#818181]">
                    {transaction.date.slice(0, 10)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium text-lg ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    } !important`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-col-1 md:grid-cols-2 md:hidden gap-4">
        {filteredTransactions.map((t) => {
          const randomTheme = themes[Math.floor(Math.random() * themes.length)];

          return (
            <div
              key={t.id}
              className="duration-300 hover:bg-gray-200 p-4 rounded-lg shadow"
            >
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-[black] font-semibold text-xl">
                  {t.transactionTitle}
                </div>

                <div
                  className={`text-[white] opacity-50 font-medium text-base py-1 px-2 duration-300 rounded-lg ${randomTheme.color}`}
                >
                  {t.category}
                </div>
              </div>
              <div
                className={` font-medium text-lg ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                } !important`}
              >
                {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
              </div>
              <div className="text-[#939393] font-medium ">
                {t.date.slice(0, 10)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
