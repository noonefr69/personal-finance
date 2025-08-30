"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // Log error
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-20vh)] px-4">
      <div className="bg-white dark:bg-[#1c1c1c] shadow-xl flex flex-col rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center text-red-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We encountered an unexpected error. Please try again or contact
          support if the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="text-center cursor-pointer flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
