"use client";

import { AlertCircleIcon, Construction } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecurringBills() {
  const route = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <AlertCircleIcon
            size={80}
            className="text-yellow-500 animate-pulse"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Recurring Bills
        </h1>
        <p className="text-gray-600 mb-6">
          This page is currently under construction. We’re working hard to bring
          you the recurring bills feature soon!
        </p>
        <button
          onClick={() => route.push("/home")}
          className="px-6 cursor-pointer py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
