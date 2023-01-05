import Link from "next/link";
import React, { FC } from "react";
import { PropsChildren } from "../interfaces/Props";
import { useRouter } from "next/router";
import { Space } from "antd";
import { useLogger } from "graphql-yoga";
import { useLogin } from "../context/useLogin";

type Props = PropsChildren & {
  path: string;
  currentPath: string;
};

const FooterPageLink: FC<Props> = ({ children, path, currentPath }: Props) => {
  return (
    <Link
      href={path}
      className={
        "px-2 py-1 font-semibold text-sm  hover:text-white" +
        (path === currentPath ? "text-white" : " text-gray-300")
      }
    >
      {children}
    </Link>
  );
};

const Footer: FC = () => {
  const { loggedIn } = useLogin();
  const { pathname: currentPath } = useRouter();
  return (
    <footer className="dark:bg-gray-800 bg-gray-200 py-8 text-center text-white">
      <p className="mb-4">Copyright 2022 NTU Racing team official website</p>
      <nav className="flex justify-center">
        <FooterPageLink currentPath={currentPath} path="/">
          <p>Home</p>
        </FooterPageLink>
        <FooterPageLink currentPath={currentPath} path="/contacts">
          <p>Contact Us</p>
        </FooterPageLink>
        {/* <FooterPageLink currentPath={currentPath} path="/aboutUs">
          <p>About Us</p>
        </FooterPageLink> */}
        <FooterPageLink currentPath={currentPath} path="/newsFeed">
          <p>News</p>
        </FooterPageLink>
        <FooterPageLink currentPath={currentPath} path="/members">
          <p>Members</p>
        </FooterPageLink>
        {loggedIn && (
          <FooterPageLink currentPath={currentPath} path="/playground">
            <p>Playground</p>
          </FooterPageLink>
        )}
        <FooterPageLink currentPath={currentPath} path="/login">
          <p>Login/out</p>
        </FooterPageLink>
      </nav>
      <p className="mt-4">
        Contact us:{" "}
        <a href="info@gmail.com" className="underline">
          info@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
