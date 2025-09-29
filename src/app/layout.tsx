import { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthProvider } from "../app/context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F9F5F0] text-[#1a1a1a]">
        <AuthProvider>
          <Navbar />
          <main className="mt-6 sm:mt-8 md:mt-12 lg:mt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
