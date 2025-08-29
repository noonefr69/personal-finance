import { getTransactionAction } from "@/actions/handleTransaction";
import AddTransactions from "@/components/transactionCom/AddTransactions";
import TransactionTable from "@/components/transactionCom/TransactionTable";
import React from "react";

export default async function Transactions() {
  const transaction = await getTransactionAction();
  return (
    <div className="">
      <div className="flex items-center justify-between m-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Transactions
        </h1>
        <AddTransactions />
      </div>

      <div className="">
        <TransactionTable transactions={transaction} />
      </div>
    </div>
  );
}
