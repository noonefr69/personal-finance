import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Securely log in to your personal finance dashboard to track expenses, manage budgets, and reach your financial goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[rgb(248,244,240)]">
        <div className="">{children}</div>
      </body>
    </html>
  );
}
