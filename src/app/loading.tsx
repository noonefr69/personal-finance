import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Optional fade-in for the whole container */}
      <div className="flex space-x-4 opacity-0 animate-fade-in">
        <span className="w-10 h-10 bg-neutral-800 rounded-full animate-bounce delay-75"></span>
        <span className="w-10 h-10 bg-neutral-800 rounded-full animate-bounce delay-150"></span>
        <span className="w-10 h-10 bg-neutral-800 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
}
