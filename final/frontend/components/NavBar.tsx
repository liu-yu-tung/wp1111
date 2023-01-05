import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { ThemeSwitch } from "./ToggleDarkButton";
import { useRouter } from "next/router";
import { PropsChildren } from "../interfaces/Props";
import { LangSwitch } from "./ToggleLangButton";
import { useLanguage } from "../context/useLanguage";
import { useLogin } from "../context/useLogin";

import {
  CaretDownOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { LangType } from "../interfaces/Elements";

type NavLiType = PropsChildren & {
  path: string;
  currentPath: string;
};

const NavLi: FC<NavLiType> = ({ children, path, currentPath }: NavLiType) => {
  return (
    <li>
      <Link
        href={path}
        className={
          "block py-2 pl-3 pr-4" +
          (currentPath.includes(path)
            ? " text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            : " text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent")
        }
        aria-current="page"
      >
        {children}
      </Link>
    </li>
  );
};

const Navigation: FC = () => {
  const router = useRouter();
  const { lang } = useLanguage();
  const { loggedIn: login } = useLogin();

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 z-10">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo_light.png"
              width={5000}
              height={0}
              className="w-auto h-6 mr-3 sm:h-9 dark:[display:none]"
              alt="NTURacing Logo light"
            />
            <Image
              src="/Logo_dark.png"
              width={5000}
              height={0}
              className="w-auto h-6 mr-3 sm:h-9 [display:none] dark:block"
              alt="NTURacing Logo dark"
            />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NavLi currentPath={router.pathname} path="/contacts">
                {lang == LangType.EN ? "Contact Us" : "聯絡我們"}
              </NavLi>
              {/* <NavLi currentPath={router.pathname} path="/aboutUs">
                {lang == LangType.EN ? "About Us" : "關於我們"}
              </NavLi> */}
              <NavLi currentPath={router.pathname} path="/members">
                {lang == LangType.EN ? "Members" : "成員組成"}
              </NavLi>
              <NavLi currentPath={router.pathname} path="/newsFeed">
                {lang == LangType.EN ? "News" : "最新消息"}
              </NavLi>
              <NavLi currentPath={router.pathname} path="/login">
                {lang == LangType.EN
                  ? login
                    ? "Logout"
                    : "Login"
                  : login
                  ? "登出"
                  : "登入"}
                {/* <LoginOutlined />
                <LogoutOutlined /> */}
                {/* <UserOutlined /> */}
              </NavLi>
              {/* <div className="group">
                <NavLi currentPath={router.pathname} path="/playground">
                  playground <CaretDownOutlined />
                </NavLi>
                <div className="mt-2 py-2 w-48 bg-white rounded-lg shadow-xl absolute invisible group-hover:visible delay-200">
                  <Link
                    href="/playground/fileUpload"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    File Upload
                  </Link>
                  <Link
                    href="/playground/graphql"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    Graph QL
                  </Link>
                </div>
              </div> */}

              <li>
                <ThemeSwitch />
                <LangSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
