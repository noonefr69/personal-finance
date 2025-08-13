import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="w-[1540px] mx-auto">{children}</div>
    </main>
  );
}
