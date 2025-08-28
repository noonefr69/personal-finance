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
import { getPotsAction } from "@/actions/handlePot";
import { ChartPieDonutText } from "@/components/budgets/PieChart";
import { getBudgetsAction } from "@/actions/handleBudget";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const getTransaction = await getTransactionAction();
  const getPots = await getPotsAction();
  const getBudgets = await getBudgetsAction();

  const transactionsByCategory = getTransaction.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);
  const spent = transactionsByCategory;

  console.log(getTransaction, getBudgets, spent);

  return (
    <div className="flex h-screen">
      <div className="w-full mx-10">
        <nav>
          <Navbar />
        </nav>

        <div className="m-10 grid grid-cols-3 gap-4">
          <div className="bg-[rgb(32,31,36)] text-white p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Current Balance</h1>
            <span className="font-bold text-4xl">
              $
              {(
                getTransaction.reduce(
                  (acc, sec) => (sec.amount > 0 ? acc + sec.amount : acc),
                  0
                ) +
                getTransaction.reduce(
                  (acc, sec) => (sec.amount < 0 ? acc + sec.amount : acc),
                  0
                )
              ).toFixed(2)}
            </span>
          </div>
          <div className="bg-[white] p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Income</h1>
            <span className="font-bold text-4xl">
              $
              {getTransaction
                .reduce(
                  (acc, sec) => (sec.amount > 0 ? acc + sec.amount : acc),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="bg-[white] p-7 rounded-lg space-y-2">
            <h1 className="font-semibold">Expenses</h1>
            <span className="font-bold text-4xl">
              $
              {Math.abs(
                getTransaction.reduce(
                  (acc, sec) => (sec.amount < 0 ? acc + sec.amount : acc),
                  0
                )
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="m-10 pb-10 columns-2 space-y-5">
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
            <div className="flex items-center">
              {" "}
              <div className="p-4 flex items-center gap-4 my-4 bg-[rgb(248,244,240)] w-1/2 rounded-lg">
                <AiFillDollarCircle size={50} className="text-green-600" />
                <div className="space-y-2">
                  <h1 className="font-semibold text-[#727272]">Pots</h1>
                  <span className="font-bold text-3xl">
                    ${getPots.reduce((acc, sec) => acc + sec.amountEx, 0)}
                  </span>
                </div>
              </div>
              <div className="grid ml-2 grid-cols-2 gap-2 w-1/2  ">
                {getPots
                  .map((p) => {
                    return (
                      <div
                        className="flex hover:bg-gray-100 px-3 rounded-lg duration-300 gap-3 items-center"
                        key={p.id}
                      >
                        <div
                          className="h-8 rounded-lg w-1"
                          style={{ backgroundColor: p.theme || "black" }}
                        />
                        <div>
                          <h1 className="text-muted-foreground">{p.potName}</h1>
                          <h3 className="font-medium">${p.amountEx}</h3>
                        </div>
                      </div>
                    );
                  })
                  .slice(0, 4)}
              </div>
            </div>
          </div>
          {/* budgets */}
          <div className="bg-white rounded-lg min-h-52 break-inside-avoid">
            <nav className="flex items-center justify-between p-7">
              <h1 className="font-semibold text-xl">Budgets</h1>
              <Link
                className="flex items-center gap-2 text-[#8f8f8f] font-semibold hover:underline"
                href={`/budgets`}
              >
                See Details <TiArrowSortedDown className="-rotate-90" />
              </Link>
            </nav>
            <div className=" w-full grid grid-cols-10 gap-4 my-4 rounded-lg ">
              {getBudgets.length == 0 ? (
                <span className="flex px-7 py-4 text-nowrap items-center gap-2 text-[#8f8f8f] font-semibold">
                  No Data Provided.
                </span>
              ) : (
                <>
                  <div className="h-fit col-span-6">
                    <ChartPieDonutText
                      transactionsByCategory={transactionsByCategory}
                    />
                  </div>
                  <div className="pb-7 col-span-3 space-y-2">
                    {getBudgets
                      .map((b) => {
                        return (
                          <div key={b.id} className="flex items-center gap-2">
                            <div
                              className="w-1 h-10 rounded-lg"
                              style={{ backgroundColor: b.theme || "black" }}
                            />
                            <div>
                              <h1 className="text-muted-foreground">
                                {b.category}
                              </h1>
                              <span className="font-medium">
                                ${b.spend.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                      .slice(0, 4)}
                  </div>
                </>
              )}
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
              {getTransaction.length == 0 ? (
                <span className="flex  text-nowrap items-center gap-2 text-[#8f8f8f] font-semibold">
                  No Data Provided.
                </span>
              ) : (
                <Table className="w-full">
                  <TableBody className="">
                    {getTransaction
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
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
              )}
            </div>
          </div>{" "}
          {/* Recurring Bille */}
          <div className="bg-white flex flex-col rounded-lg p-7 break-inside-avoid ">
            <nav className="flex items-center justify-between ">
              <h1 className="font-semibold text-xl">
                Recurring Bills{" "}
                <span className="text-muted-foreground text-sm">(Demo)</span>
              </h1>
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
