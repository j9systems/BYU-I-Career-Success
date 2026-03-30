import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYU-I Career Success",
  description: "Career management platform for BYU-Idaho's business department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
