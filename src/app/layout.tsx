import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "login",
  description: "This is a E-commerce store built with Next.js",
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
