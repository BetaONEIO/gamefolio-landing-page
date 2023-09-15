"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ComingSoon() {
  const [subscribeMail, setSubscribeMail] = useState("");
  const sectionStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(4, 50, 12, 1), rgba(4, 50, 12, 0) 10%),linear-gradient(to top, rgba(0, 50, 12, 1), rgba(0, 50, 12, 0) 10%)`,
  };

  const toastSuccess = () =>
    toast.success("Successfully Subscribe", {
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

  // subscribe mail logic
  const subscribe = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (subscribeMail !== "") {
      if (emailRegex.test(subscribeMail)) {
        // send mail to backend

        fetch("https://plausible-tinted-megaraptor.glitch.me/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: subscribeMail,
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
    <section
      style={sectionStyle}
      className="h-full flex justify-center bg-[#091619]"
    >
      <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-12 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center  mr-auto mb-10 lg:col-span-7 xl:col-span-8 xl:mb-0">
          <h1 className="mb-6 max-w-2xl text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Coming Soon
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Signup to get updates
          </p>
          <form action="#" className="">
            <div className="justify-center items-center mx-auto mb-3 space-y-4 sm:flex lg:justify-start sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <label
                  for="email"
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
                  required="true"
                  value={subscribeMail}
                  onChange={handleSubscribeMail}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#37C535] hover:bg-[#217620] text-white px-5 py-2.5 text-center inline-flex items-center rounded-tl-[20px] rounded-br-[20px] rounded-tr-[5px] rounded-bl-[5px] mb-3"
                onClick={subscribe}
                onKeyDown={handleKeyPress}
              >
                Sign-up
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mt-4 sm:border-t sm:border-gray-400 sm:mt-8 sm:pt-8 dark:border-[#091619]">
              <p className="hidden text-base font-medium text-gray-500 sm:block">
                Follow us on:
              </p>

              <div className="flex items-center gap-2 mt-3 max-w-md">
                <a
                  href="#"
                  data-tooltip-target="tooltip-facebook"
                  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-8 h-8"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="sr-only">Facebook</span>
                </a>
                <div
                  id="tooltip-facebook"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-[#091619] rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-[#091619]"
                >
                  Like us on Facebook
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <a
                  href="#"
                  data-tooltip-target="tooltip-twitter"
                  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-[#091619]"
                >
                  <svg
                    className="w-8 h-8"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                    />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <div
                  id="tooltip-twitter"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Follow us on Twitter
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
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
        <div class="hidden lg:mt-0 lg:col-span-5 xl:col-span-4 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mobile-app.svg"
            alt="phone illustration"
          />
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
