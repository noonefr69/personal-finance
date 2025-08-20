import { getBudgetsAction } from "@/actions/handleBudget";
import { getTransactionAction } from "@/actions/handleTransaction";
import AddBedgets from "@/components/budgets/AddBedgets";
import DropDownBudget from "@/components/budgets/DropDownBudget";
import { ChartPieDonutText } from "@/components/budgets/PieChart";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";

export default async function Budgets() {
  const getBedgets = await getBudgetsAction();
  const getTransactions = await getTransactionAction();

  const transactionsByCategory = getTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="">
      <div className="flex items-center justify-between m-10">
        <h1 className="text-4xl font-semibold">Budgets</h1>
        <AddBedgets />
      </div>

      <div className="grid grid-cols-9 gap-4 m-10">
        <div className="col-span-3 h-fit bg-white rounded-lg p-7">
          <ChartPieDonutText />
          <div className="flex mb-5">
            <span className="font-semibold text-xl">Spending Summary</span>
          </div>
          <div className="flex flex-col">
            {getBedgets.map((b) => {
              const spent = transactionsByCategory[b.category] || 0;

              return (
                <div
                  key={b.id}
                  className="flex items-center justify-between border-b py-4 duration-300 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: b.theme || "cyan" }}
                      className={` h-5 rounded-lg w-1`}
                    />
                    <h1 className="text-muted-foreground font-medium">
                      {b.category}
                    </h1>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium text-lg text-black">
                      ${spent.toFixed(2)}
                    </span>{" "}
                    of ${b.spend.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* DATA */}
        <div className="col-span-6 space-y-5 pb-10">
          {getBedgets.map((b) => {
            const spent = transactionsByCategory[b.category] || 0;

            return (
              <div key={b.id} className="bg-white p-7 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: b.theme || "cyan" }}
                      className={`h-4 rounded-full w-4`}
                    />{" "}
                    <h1 className="font-semibold text-lg">{b.category}</h1>
                  </div>
                  <DropDownBudget category={b.category} id={b.id} />
                </div>

                <div>
                  <h1 className="text-muted-foreground">
                    Maximum of ${b.spend.toFixed(2)}
                    <div className="w-full flex items-center justify-start p-2 bg-gray-100 rounded-sm mt-5 h-9">
                      <div
                        className="h-7 rounded-sm duration-300"
                        style={{
                          width: `${(spent * 100) / b.spend}%`,
                          backgroundColor: b.theme,
                        }}
                      />
                    </div>
                  </h1>
                </div>

                <div className="flex items-center my-7">
                  <div className="flex items-center gap-3 w-1/2">
                    <div
                      style={{ backgroundColor: b.theme }}
                      className="h-10 w-1 rounded-lg"
                    />
                    <div>
                      <h6 className="text-muted-foreground text-sm">Spent</h6>
                      <h1 className="font-medium">${spent.toFixed(2)}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-1/2">
                    <div
                      style={{ backgroundColor: b.theme }}
                      className="h-10 w-1 rounded-lg"
                    />
                    <div>
                      <h6 className="text-muted-foreground text-sm">Free</h6>
                      <h1 className="font-medium">
                        ${(b.spend - spent).toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className=" bg-[rgb(248,244,240)] rounded-lg p-5">
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium">Latest Spending</h1>
                    <Link
                      className="flex items-center gap-1 text-[#8f8f8f] hover:underline"
                      href={`/transactions`}
                    >
                      See All <TiArrowSortedDown className="-rotate-90" />
                    </Link>
                  </div>

                  <div className="">
                    {getTransactions
                      .filter((t) => {
                        return t.category === b.category;
                      })
                      .map((t) => {
                        return (
                          <div
                            className="py-2 flex items-center justify-between border-b"
                            key={t.id}
                          >
                            <div className="font-medium">
                              {t.transactionTitle}
                            </div>
                            <div className="flex flex-col items-end">
                              <h1 className="font-medium text-green-600 text-xl">
                                ${t.amount.toFixed(2)}
                              </h1>
                              <span className="text-muted-foreground text-sm">
                                {t.date.slice(0, 10)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
