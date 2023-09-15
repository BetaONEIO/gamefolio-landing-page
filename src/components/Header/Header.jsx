"use client";
import { IMAGES } from "@/assets/images";
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
          <a
            href="https://gamefoliodev.vercel.app/"
            className="flex items-center"
          >
            <img
              src={IMAGES.logo}
              className="mr-3 h-6 sm:h-9"
              alt="GameFolio Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Gamefolio
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
