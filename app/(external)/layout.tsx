import React from "react";
import { Navbar } from "../../components/external-pages/Navbar";
import { Footer } from "../../components/external-pages/Footer";

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
