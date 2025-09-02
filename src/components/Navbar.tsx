import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { BiExit } from "react-icons/bi";

export default async function Navbar() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-between my-4 md:m-10">
      <h1 className="text-2xl md:text-4xl font-semibold">Overview</h1>
      <form
        className=""
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
      >
        <button
          type="submit"
          className="cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-800 text-white rounded-lg py-2 px-3 font-medium shadow-sm hover:bg-gray-900 transition"
        >
          <BiExit />
          Sign Out
        </button>
      </form>
    </div>
  );
}
