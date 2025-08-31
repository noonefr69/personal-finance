"use client";

// import { Metadata } from "next";
import toast from "react-hot-toast";

// export const metadata = {
//   title: "Recurring Bills",
//   description:
//     "Keep track of your recurring bills and subscriptions so you never miss a payment and can plan your monthly budget with ease.",
// };

const notify = () => toast("Here is your toast.");

export default function RecurringBillsPage() {
  const bills = [
    {
      name: "Internet",
      amount: 400,
      frequency: "Monthly",
      dueDate: "2025-09-01",
    },
    { name: "Rent", amount: 1500, frequency: "Monthly", dueDate: "2025-09-05" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recurring Bills</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Frequency</th>
            <th className="p-2">Next Due</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{bill.name}</td>
              <td className="p-2">${bill.amount}</td>
              <td className="p-2">{bill.frequency}</td>
              <td className="p-2">{bill.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={notify}>Make me a toast</button>
    </div>
  );
}
