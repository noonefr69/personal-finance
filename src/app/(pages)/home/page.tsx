import { getTransactionAction } from "@/actions/handleTransaction";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { AiFillDollarCircle } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const getTransaction = await getTransactionAction();

  return (
    <div className="flex h-screen">
      <div className="w-full mx-10">
        <nav>
          <Navbar />
        </nav>

        <div className="m-10 grid grid-cols-3 gap-4">
          <div className="bg-[rgb(32,31,36)] text-white p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Current Balance</h1>
            <span className="font-bold text-4xl">$0.00</span>
          </div>
          <div className="bg-[white] p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Income</h1>
            <span className="font-bold text-4xl">$0.00</span>
          </div>
          <div className="bg-[white] p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Expenses</h1>
            <span className="font-bold text-4xl">$0.00</span>
          </div>
        </div>

        <div className="m-10 columns-2 space-y-5">
          {/* Pots */}
          <div className="bg-white rounded-lg p-7 break-inside-avoid">
            <nav className="flex items-center justify-between ">
              <h1 className="font-semibold text-xl">Pots</h1>
              <Link
                className="flex items-center gap-2 text-[#8f8f8f] font-semibold hover:underline"
                href={`/pots`}
              >
                See Details <TiArrowSortedDown className="-rotate-90" />
              </Link>
            </nav>
            <div className="p-4 flex items-center gap-4 my-4 bg-[rgb(248,244,240)] w-1/2 rounded-lg">
              <AiFillDollarCircle size={50} className="text-green-600" />
              <div className="space-y-2">
                <h1 className="font-semibold text-[#727272]">Pots</h1>
                <span className="font-bold text-3xl">$0.00</span>
              </div>
            </div>
          </div>
          {/* budgets */}
          <div className="bg-white rounded-lg p-7 min-h-72 break-inside-avoid">
            <nav className="flex items-center justify-between ">
              <h1 className="font-semibold text-xl">Budgets</h1>
              <Link
                className="flex items-center gap-2 text-[#8f8f8f] font-semibold hover:underline"
                href={`/budgets`}
              >
                See Details <TiArrowSortedDown className="-rotate-90" />
              </Link>
            </nav>
            <div className="flex items-center gap-4 my-4 w-1/2 rounded-lg">
              <span className="flex items-center gap-2 text-[#8f8f8f] font-semibold">
                No Data Provided.
              </span>
            </div>
          </div>
          {/* Transactions */}
          <div className="bg-white rounded-lg p-7 break-inside-avoid">
            <nav className="flex items-center justify-between ">
              <h1 className="font-semibold text-xl">Transactions</h1>
              <Link
                className="flex items-center gap-2 text-[#8f8f8f] font-semibold hover:underline"
                href={`/transactions`}
              >
                See Details <TiArrowSortedDown className="-rotate-90" />
              </Link>
            </nav>
            <div className="flex items-center gap-4 mt-4 py-7 rounded-lg">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className=" text-[#939393] p-4">
                      Recipient / Sender
                    </TableHead>
                    <TableHead className=" text-[#939393] p-4">
                      Category
                    </TableHead>
                    <TableHead className=" text-[#939393] p-4">
                      Transaction Date
                    </TableHead>
                    <TableHead className="text-right text-[#939393] p-4">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {getTransaction
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((transaction) => {
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
                    })
                    .slice(0, 4)}
                </TableBody>
              </Table>
            </div>
          </div>{" "}
          {/* Recurring Bille */}
          <div className="bg-white flex flex-col rounded-lg p-7 break-inside-avoid ">
            <nav className="flex items-center justify-between ">
              <h1 className="font-semibold text-xl">Recurring Bills</h1>
              <Link
                className="flex items-center gap-2 text-[#8f8f8f] font-semibold hover:underline"
                href={`/recurring-bills`}
              >
                See Details <TiArrowSortedDown className="-rotate-90" />
              </Link>
            </nav>

            <div className="flex flex-col justify-between min-h-[10rem] gap-4 mt-4 w-full rounded-lg">
              <div className=" flex items-center justify-between bg-[rgb(248,244,240)] border-l-4 border-l-green-600 rounded-lg py-4 px-4">
                <h1 className="flex items-center gap-2 text-[#696969] font-semibold">
                  Paid Bills
                </h1>
                <span className="flex items-center gap-2 text-[black] font-semibold">
                  $0.00{" "}
                </span>
              </div>
              <div className=" flex items-center justify-between bg-[rgb(248,244,240)] border-l-4 border-l-yellow-400 rounded-lg py-4 px-4">
                <h1 className="flex items-center gap-2 text-[#696969] font-semibold">
                  Total Upcoming
                </h1>
                <span className="flex items-center gap-2 text-[black] font-semibold">
                  $0.00{" "}
                </span>
              </div>
              <div className=" flex items-center justify-between bg-[rgb(248,244,240)] border-l-4 border-l-cyan-500 rounded-lg py-4 px-4">
                <h1 className="flex items-center gap-2 text-[#696969] font-semibold">
                  Due Soon
                </h1>
                <span className="flex items-center gap-2 text-[black] font-semibold">
                  $0.00{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
