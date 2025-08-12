import Navbar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <div className=" flex h-screen">
      <div className="w-full mx-10">
        <nav>
          <Navbar />
        </nav>
      </div>
    </div>
  );
}
