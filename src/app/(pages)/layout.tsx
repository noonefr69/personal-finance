import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="w-full">{children}</div>
    </main>
  );
}
