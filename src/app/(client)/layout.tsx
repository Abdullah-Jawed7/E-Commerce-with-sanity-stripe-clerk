import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/owned/header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/owned/Footer";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

const poppins = localFont({
  src:"../../fonts/poppins.woff2",
  variable:"--font-poppins",
  weight:'400',
  preload:false
})






export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>

    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
        <Toaster
        position="bottom-right"
        toastOptions={{
          style:{
            background: "#000000",
            color: "#fff",
          }
        }}
        />
      </body>
    </html>
    </ClerkProvider>
  );
}




