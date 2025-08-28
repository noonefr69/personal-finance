import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" flex ">
      <Sidebar />
      <div className=" w-[1550px] mx-auto">{children}</div>
    </main>
  );
}
