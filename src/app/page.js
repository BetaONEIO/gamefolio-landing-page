"use client";
import ComingSoon from "@/components/Comingsoon/ComingSoon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <div
        className={`h-screen flex flex-col justify-between bg-lightbg dark:bg-darkbg`}
      >
        {/* <Header />
      <ComingSoon />
      <Footer /> */}
        <ComingSoon />
      </div>
    </ThemeProvider>
  );
}
