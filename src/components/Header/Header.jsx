"use client";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[#08191D]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            href="https://gamefoliodev.vercel.app/"
            className="flex items-center"
          >
            <Image
            width={0}
            height={0}
            sizes="100vw"
              src={IMAGES.logo}
              className="mr-3 w-20 h-20"
              alt="GameFolio Logo"
            />
  
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
