import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const italianno = localFont({
  src: "./fonts/Italianno-Regular.ttf",
  variable: "--font-italianno",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Ancheta",
  description: "Ben Ancheta",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={italianno.variable}>
      <body>{children}</body>
    </html>
  );
}
