"use client";

import { getTransactionAction } from "@/actions/handleTransaction";
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
import { useEffect, useState } from "react";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Latest");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const getTransactions = await getTransactionAction();
        setTransactions(getTransactions);
      } catch (error: any) {
        setErr(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  let filteredTransactions = transactions
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

  if (err) return <div>Something went wrong: {err}</div>;

  if (loading)
    return (
      <div className="flex justify-center items-center m-10 p-7 rounded-lg h-[calc(100vh-20vh)] bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mr-4"></div>
      </div>
    );

  return (
    <div className="m-10 bg-white rounded-lg duration-300 overflow-auto min-h-[calc(100vh-21vh)] max-h-[calc(100vh-19vh)]  p-10">
      <div className="mb-10 flex items-center justify-between">
        <input
          type="text"
          className="border-[1px] w-1/3 font-semibold rounded-lg px-3 py-2 border-gray-600 duration-300 outline-offset-4 outline-transparent focus:outline-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Transaction"
        />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <h1 className="font-medium text-gray-500">Sort by</h1>
            <Select onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Latest" />
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
            <h1 className="font-medium text-gray-500">Filter by Category</h1>
            <Select onValueChange={(val) => setFilterBy(val)}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="All" />
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
      <Table className="">
        <TableCaption>{transactions.length == 0 ? "No Data Provided" : "Transaction"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-[#939393] p-4">
              Recipient / Sender
            </TableHead>
            <TableHead className=" text-[#939393] p-4">Category</TableHead>
            <TableHead className=" text-[#939393] p-4">
              Transaction Date
            </TableHead>
            <TableHead className="text-right text-[#939393] p-4">
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
                <TableCell className="font-medium text-[black] p-4 text-[17px]">
                  {transaction.transactionTitle}
                </TableCell>
                <TableCell className=" text-[#818181] p-4">
                  {transaction.category}
                </TableCell>
                <TableCell className=" text-[#818181] p-4">
                  {transaction.date.slice(0, 10)}
                </TableCell>
                <TableCell className="text-right text-green-600 font-medium text-[17px] p-4">
                  +${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
