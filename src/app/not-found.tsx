"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="bg-white dark:bg-[#1c1c1c] shadow-xl flex flex-col rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center text-yellow-500 mb-4">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/home"
          className="text-center cursor-pointer flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
