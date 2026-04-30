import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishna Tej | ML Engineer & Software Developer",
  description: "ML Engineer & Software Developer specializing in computer vision, machine learning, and cloud-native applications. Building scalable solutions with Python, PyTorch, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

