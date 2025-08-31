import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            minWidth: "320px", // ✅ set global width
            minHeight: "60px", // ✅ set global height
            padding: "26px 20px", // ✅ set global padding
            borderRadius: "12px",
            fontSize: "18px",
            textWrap: "nowrap",
          },
        }}
      />{" "}
    </main>
  );
}
