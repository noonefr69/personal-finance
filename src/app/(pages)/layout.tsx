import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "finance",
    template: "%s - finance",
  },
  description: "This is a E-commerce store built with Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center">
      <Sidebar />
      <div className=" w-[1550px] mx-auto">{children}</div>
    </main>
  );
}
