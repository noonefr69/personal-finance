"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { TbArrowBigLeftLineFilled } from "react-icons/tb";

export default function Sidebar() {
  const isActive = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "Overview", sign: <AiFillHome /> },
    { href: "/transactions", label: "Transactions", sign: <BsArrowDownUp /> },
    { href: "/budgets", label: "Budgets", sign: <BiSolidPieChartAlt2 /> },
    { href: "/pots", label: "Pots", sign: <AiFillDollarCircle /> },
    {
      href: "/recurring-bills",
      label: "Recurring bills",
      sign: <RiBillFill />,
    },
  ];

  return (
    <div
      className={`bg-[#3300ff00] lg:shrink-0  duration-300 rounded-r-lg overflow-hidden z-20 relative ${
        isOpen ? "lg:w-80 " : "lg:w-[7.3rem]"
      }`}
    >
      <div
        className={`bg-[rgba(32,31,36)] duration-300 lg:rounded-r-lg lg:rounded-t-none rounded-t-lg overflow-hidden z-20 fixed lg:top-0 right-0 left-0 bottom-0 ${
          isOpen ? "lg:w-80" : "lg:w-[7.3rem]"
        }`}
      >
        <div className="lg:m-10 border-l-4 border-l-transparent">
          <Link
            href={`/home`}
            className={`absolute duration-300 cursor-pointer hidden lg:block z-10 ${
              isOpen ? "lg:opacity-0" : "lg:opacity-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="122"
              height="22"
              viewBox="0 0 122 22"
              fill="none"
              className="z-10"
            >
              <path
                d="M8.46495 21.44H2.44895V10.24H0.272949V5.312H2.57695C3.21695 2.272 6.19295 0 11.4729 0H12.7529V4.288H10.5129C8.84895 4.288 8.04895 4.448 8.08095 5.312H12.7529V10.24H8.46495V21.44Z"
                fill="white"
              ></path>
            </svg>
          </Link>
          <Link
            href={`/home`}
            className={`absolute duration-300 hidden lg:block cursor-pointer z-10  ${
              isOpen ? "lg:opacity-100" : "lg:opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="122"
              height="22"
              viewBox="0 0 122 22"
              fill="none"
              className="z-10"
            >
              <path
                d="M8.46495 21.44H2.44895V10.24H0.272949V5.312H2.57695C3.21695 2.272 6.19295 0 11.4729 0H12.7529V4.288H10.5129C8.84895 4.288 8.04895 4.448 8.08095 5.312H12.7529V10.24H8.46495V21.44Z"
                fill="white"
              ></path>
              <path
                d="M20.3777 3.84H14.3617V0H20.3777V3.84ZM20.3777 21.44H14.3617V5.312H20.3777V21.44Z"
                fill="white"
              ></path>
              <path
                d="M28.6352 21.44H22.6192V5.312H28.2512V10.208H28.5712C28.9232 7.52 30.6832 4.992 35.0032 4.992C39.3552 4.992 41.4032 7.616 41.4032 11.104V21.44H35.3872V13.312C35.3872 11.072 34.5552 10.368 31.9312 10.368C29.2752 10.368 28.6352 11.04 28.6352 13.12V21.44Z"
                fill="white"
              ></path>
              <path
                d="M48.7177 21.76C45.0697 21.76 43.0217 20.096 43.0217 17.344C43.0217 15.072 44.5897 13.44 48.2377 13.088L54.7977 12.448V12.128C54.7977 10.496 54.0937 10.24 51.9497 10.24C49.9657 10.24 49.3577 10.624 49.3577 11.968V12.096H43.3417V12.032C43.3417 7.744 46.9257 4.992 52.3977 4.992C58.0297 4.992 60.7497 7.744 60.7497 12.256V21.44H55.1177V18.048H54.7977C54.1897 20.32 52.2057 21.76 48.7177 21.76ZM49.0697 16.96C49.0697 17.472 49.5817 17.568 50.5097 17.568C53.4217 17.568 54.6057 17.216 54.7657 15.776L49.8377 16.352C49.2937 16.416 49.0697 16.608 49.0697 16.96Z"
                fill="white"
              ></path>
              <path
                d="M68.8689 21.44H62.8529V5.312H68.4849V10.208H68.8049C69.1569 7.52 70.9169 4.992 75.2369 4.992C79.5889 4.992 81.6369 7.616 81.6369 11.104V21.44H75.6209V13.312C75.6209 11.072 74.7889 10.368 72.1649 10.368C69.5089 10.368 68.8689 11.04 68.8689 13.12V21.44Z"
                fill="white"
              ></path>
              <path
                d="M92.7915 21.76C87.0634 21.76 83.4155 18.592 83.4155 13.376C83.4155 8.128 87.0634 4.992 92.7915 4.992C98.2954 4.992 101.815 7.808 101.815 12.128V12.64H95.8315V12.384C95.8315 10.72 94.6154 10.368 92.6634 10.368C90.4554 10.368 89.3994 10.848 89.3994 13.376C89.3994 15.872 90.4554 16.352 92.6634 16.352C94.6154 16.352 95.8315 16.032 95.8315 14.368V14.08H101.815V14.624C101.815 18.912 98.2954 21.76 92.7915 21.76Z"
                fill="white"
              ></path>
              <path
                d="M112.735 21.76C107.263 21.76 103.423 19.424 103.423 13.376C103.423 8.128 107.231 4.992 112.607 4.992C118.175 4.992 121.727 7.776 121.727 12.96C121.727 13.504 121.695 13.92 121.631 14.496H108.991C109.087 16.448 109.951 16.992 112.511 16.992C114.943 16.992 115.583 16.576 115.583 15.616V15.264H121.599V15.648C121.599 19.232 118.175 21.76 112.735 21.76ZM112.479 9.6C110.271 9.6 109.343 10.08 109.087 11.456H115.903C115.679 10.08 114.719 9.6 112.479 9.6Z"
                fill="white"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="lg:space-y-2 flex lg:flex-col lg:mt-32 justify-around items-end mx-5 md:mx-10 lg:m-0 lg:pr-10 lg:items-start">
          {navLinks.map((navLink, index) => {
            return (
              <Link
                key={index}
                href={navLink.href}
                className={`flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:items-center duration-300 w-full h-12 md:h-16 lg:h-fit mt-4 lg:mt-0 lg:gap-3 lg:w-full font-semibold text-lg lg:pl-12 lg:py-3 lg:rounded-r-lg lg:mr-4 
    ${
      isActive === navLink.href
        ? `text-black bg-white duration-300 border-b-4 border-b-green-600 lg:border-b-0 rounded-t-lg lg:rounded-t-none ${
            isOpen ? "lg:bg-white" : "lg:bg-transparent"
          } lg:border-l-4 lg:border-l-green-600`
        : "text-[#909090] hover:text-white lg:border-l-4 lg:border-l-transparent border-b-4 lg:border-b-0 rounded-t-lg lg:rounded-t-none border-b-transparent duration-300"
    }
  `}
              >
                <span
                  className={`${
                    isActive === navLink.href ? "text-green-600" : ""
                  }`}
                >
                  {navLink.sign}
                </span>
                <span
                  className={`lg:text-nowrap hidden md:block duration-300 text-center text-md  ${
                    isOpen ? "lg:opacity-100" : "lg:opacity-0"
                  }`}
                >
                  {navLink.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className={`absolute bottom-4 hidden lg:block`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center text-[#909090] cursor-pointer hover:text-white duration-300 gap-3 font-semibold text-lg pl-10 pr-16 py-3 rounded-r-lg mr-4 `}
          >
            <span
              className={`duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
            >
              {" "}
              <TbArrowBigLeftLineFilled />
            </span>
            <span
              className={`text-nowrap duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Minimize Menu
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
