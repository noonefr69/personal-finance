import AddTransactions from "@/components/transactionCom/AddTransactions";
import TransactionTable from "@/components/transactionCom/TransactionTable";
import React from "react";

export default function Transactions() {
  return (
    <div className="">
      <div className="flex items-center justify-between m-10">
        <h1 className="text-4xl font-semibold">Transactions</h1>
        <AddTransactions />
      </div>

      <div>
        <TransactionTable />
      </div>
    </div>
  );
}
