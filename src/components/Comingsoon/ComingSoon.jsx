import { SVG } from "@/assets/SVGs";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ComingSoon() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <section className="h-full flex justify-center items-center ">
      <button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
        className=" absolute top-10 right-10 bg-gray-200 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-full  "
      >
        <svg
          className="dark:hidden"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-slate-500"
            d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
          />
          <path
            className="fill-slate-600"
            d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
          />
        </svg>
        <svg
          className="hidden dark:block"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-slate-300"
            d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
          />
          <path
            className="fill-slate-400"
            d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
          />
        </svg>
      </button>
      <div className="flex flex-col justify-center items-center gap-4 p-4 ">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="w-48 h-48"
            src={IMAGES.logo}
            width={0}
            height={0}
            sizes="100vw"
            alt="GameFolio"
            priority={true}
          />
          <span
            className={`${leagueGothic.className} text-2xl text-black dark:text-white  tracking-wider`}
          >
            GAMEFOLIO
          </span>
        </div>
        <span
          className={`${leagueGothic.className} text-4xl text-black dark:text-white  tracking-wider`}
        >
          Follow us on socials!
        </span>
        <div className="flex gap-3">
          <Link href="https://www.facebook.com/gamefoliogg/" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Facebook}
              width={0}
              height={0}
              sizes="100vw"
              alt="Facebook Logo"
            />
          </Link>
          <Link href="http://twitter.com/gamefoliogg" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Twitter}
              width={0}
              height={0}
              sizes="100vw"
              alt="Twitter Logo"
            />
          </Link>
          <Link href="http://instagram.com/gamefoliogg" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Instagram}
              width={0}
              height={0}
              sizes="100vw"
              alt="Instagram Logo"
            />
          </Link>
          <Link href="https://youtube.com/@GamefolioGG" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Youtube}
              width={0}
              height={0}
              sizes="100vw"
              alt="Youtube Logo"
            />
          </Link>
          <Link href="https://www.tiktok.com/@gamefoliogg" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Tiktok}
              width={0}
              height={0}
              sizes="100vw"
              alt="Tiktok Logo"
            />
          </Link>
          <Link href="https://reddit.com/r/gamefolio/" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Reddit}
              width={0}
              height={0}
              sizes="100vw"
              alt="Reddit Logo"
            />
          </Link>
          <Link href="https://discord.gg/jTHEq8TrSr" target="_blank">
            <Image
              className="w-8 h-8"
              src={SVG.Discord}
              width={0}
              height={0}
              sizes="100vw"
              alt="Discord Logo - join us on Discord!"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default ComingSoon;
