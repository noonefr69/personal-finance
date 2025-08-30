import { getPotsAction } from "@/actions/handlePot";
import AddPots from "@/components/pots/AddPots";
import DropDownPot from "@/components/pots/DropDownPot";
import React from "react";
import AddMoneyPot from "@/components/pots/AddMoneyPot";
import WithdrawPot from "@/components/pots/WithdrawPot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pots",
  description:
    "Organize your savings into dedicated pots to set aside money for goals, emergencies, or upcoming expenses.",
};

export default async function Pots() {
  const getPots = await getPotsAction();

  return (
    <div>
      <div className="flex items-center justify-between m-8 lg:m-10">
        <h1 className="text-4xl font-semibold">Pots</h1>
        <AddPots />
      </div>

      {getPots.length <= 0 ? (
        <div className="m-10 text-muted-foreground font-medium">
          No Data Provided.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-8 lg:m-10 gap-4 pb-16 lg:pb-0">
          {getPots.map((p) => {
            return (
              <div key={p.id} className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: p.theme || "cyan" }}
                      className={`h-4 rounded-full w-4`}
                    />{" "}
                    <h1 className="font-semibold text-lg">{p.potName}</h1>
                  </div>
                  <DropDownPot
                    id={p.id}
                    potName={p.potName}
                    amountPot={p.amountPot}
                    theme={p.theme}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">
                      Total Saved
                    </span>
                    <h1 className="text-4xl font-bold">
                      $
                      {p.amountEx >= p.amountPot
                        ? p.amountPot.toFixed(2)
                        : p.amountEx.toFixed(2)}
                    </h1>
                  </div>

                  <div className="h-2 mt-5 rounded-lg bg-gray-100 flex flex-col overflow-hidden items-start justify-center">
                    <div
                      style={{
                        backgroundColor: p.theme || "black",
                        width: `${(p.amountEx * 100) / p.amountPot}%`,
                      }}
                      className="h-2 duration-300 rounded-lg"
                    />
                  </div>

                  <div className="flex mt-4 items-center justify-between">
                    <span className="text-muted-foreground ">
                      {p.amountEx >= p.amountPot
                        ? "100.00"
                        : ((p.amountEx * 100) / p.amountPot).toFixed(2)}
                      %
                    </span>
                    <span className="text-muted-foreground ">
                      Target of ${p.amountPot}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-9">
                    <AddMoneyPot
                      potName={p.potName}
                      amountPot={p.amountPot}
                      id={p.id}
                      theme={p.theme}
                      amountEx={p.amountEx}
                    />
                    <WithdrawPot
                      potName={p.potName}
                      amountPot={p.amountPot}
                      id={p.id}
                      theme={p.theme}
                      amountEx={p.amountEx}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
