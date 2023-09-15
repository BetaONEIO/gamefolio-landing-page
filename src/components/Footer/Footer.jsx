import React from "react";

function Footer() {
  return (
    <footer className="bg-white shadow sm:flex sm:items-center sm:justify-between p-2 sm:p-4 xl:p-6 dark:bg-[#08191D] antialiased">
      <div className="flex justify-center items-center  w-full">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; 2023{" "}
          <a
            href="https://gamefolio.com/"
            className="hover:underline"
            target="_blank"
          >
            GameFolio.com
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
