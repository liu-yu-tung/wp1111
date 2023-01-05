import Head from "next/head";
import { useLanguage } from "../context/useLanguage";

import { useState, FC, useEffect } from "react";
import { LangType } from "../interfaces/Elements";
import Image from "next/image";
import { Space } from "antd";
const Home: FC = () => {
  const { lang } = useLanguage();
  return (
    <>
      <div className="h-fit relative">
        <Image
          width={2000}
          height={100}
          src={"/home_page_background_dark.png"}
          className="h-auto w-50 [display:none] dark:block"
          alt={"home page background"}
        />
        <Image
          width={2000}
          height={100}
          src={"/home_page_background_light.JPG"}
          className="h-auto w-50 block dark:[display:none]"
          alt={"home page background"}
        />
        <div
          className="z-10 absolute 
        dark:top-1/2 dark:left-1/2 dark:transform dark:-translate-x-1/2 dark:-translate-y-1/2 dark:m-0 w-fit
        top-0 right-0 my-4 mx-20 "
        >
          <Space direction="vertical">
            <h1 className="dark:text-center text-right text-7xl text-b font-bold">
              Sky is the limit
            </h1>
            <p className="dark:text-center text-right text-base">
              {lang == LangType.EN ? (
                <span>
                  Our core value is to provide students with a projectized
                  <br /> engineering education platform
                </span>
              ) : (
                <span>
                  台大賽車隊的核心理念為提供學生一個 <br />
                  專案式的工程教育平台
                </span>
              )}
            </p>
          </Space>
        </div>
      </div>
    </>
  );
};
export default Home;
