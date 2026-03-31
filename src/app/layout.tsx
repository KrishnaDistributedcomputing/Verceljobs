import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vercel SE Technical Study Guide",
  description:
    "Deep technical study guide for Vercel Solutions Engineer role preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
