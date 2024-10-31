import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unnamed Movie App",
  description: "Part of the Toxic code test.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
