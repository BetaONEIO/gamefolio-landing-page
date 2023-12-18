"use client";
import { SVG } from "@/assets/SVGs";
import { IMAGES } from "@/assets/images";
import { leagueGothic } from "@/font/font";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ComingSoon() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [subscribeMail, setSubscribeMail] = useState("");
  const [message, setMessage] = useState("");

  const toastSuccess = () =>
    toast.success("Thanks for subscribing!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const toastError = (val) => {
    toast.error(val, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // handle subscribe mail
  const handleSubscribeMail = (e) => {
    setSubscribeMail(e.target.value);
  };
  // handle subscribe mail
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  // subscribe mail logic
  const subscribe = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (subscribeMail !== "" && subscribeMail !== "") {
      if (emailRegex.test(subscribeMail)) {
        // send mail to backend

        fetch("https://plausible-tinted-megaraptor.glitch.me/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: subscribeMail,
            message: message,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Email sent successfully") {
              toastSuccess();
              setSubscribeMail("");

              console.log("Success:", data);
            } else {
              toastError(data.message);
              setSubscribeMail("");
            }
          })
          .catch((error) => {
            toastError("Something went wrong!");
            setSubscribeMail("");
            console.error("Error:", error);
          });
      } else {
        toastError("Email is not valid!");
        setSubscribeMail("");
      }
    } else {
      toastError("Email is required! ");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      subscribe();
    }
  };

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
          <Link href="https://www.youtube.com/@Gamefolio_" target="_blank">
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
        <div className="flex flex-col items-center gap-6 mt-4">
          <p className="max-w-2xl font-light text-gray-500 lg:mb2 md:text-lg lg:text-xl dark:text-gray-400">
            Need to contact us?
          </p>
          <form className="">
            <div className="justify-center items-center mx-auto mb-3 space-y-4 sm:flex lg:justify-start sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:w-80 xl:w-96 focus:ring-primary-500 focus:border-primary-500 dark:bg-[#091619] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  required={true}
                  value={subscribeMail}
                  onChange={handleSubscribeMail}
                />
              </div>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                  </svg>
                </div>
                <textarea
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:w-80 xl:w-96 focus:ring-primary-500 focus:border-primary-500 dark:bg-[#091619] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your Message"
                  type="text"
                  rows={1}
                  required={true}
                  value={message}
                  onChange={handleMessage}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#37C535] hover:bg-[#217620] text-white px-5 py-2.5 text-center inline-flex items-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={subscribe}
                onKeyDown={handleKeyPress}
              >
                Contact Us
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </section>
  );
}
export default ComingSoon;
