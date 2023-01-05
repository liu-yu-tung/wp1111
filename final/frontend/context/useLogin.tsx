import { FC, createContext, useContext, useEffect, useState } from "react";
import { PropsChildren } from "../interfaces/Props";
import axios from "axios";
import { BACKEND_URL } from "../lib/parameters";
import { message } from "antd";
import { Router, useRouter } from "next/router";

const instance = new axios.Axios({ baseURL: BACKEND_URL });

type loginContextType = {
  loggedIn: boolean;
  TryLogin: (username: string, password: string) => void;
  Logout: () => void;
};
const loginContextDefaultValue = {
  loggedIn: false,
  TryLogin: () => {},
  Logout: () => {},
};
const LoginContext = createContext<loginContextType>(loginContextDefaultValue);

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginContextProvider: FC<PropsChildren> = ({
  children,
}: PropsChildren) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  let token = "";
  if (!ISSERVER) {
    token = localStorage.getItem("racing-account") ?? "";
  }

  useEffect(() => {
    if (!loggedIn && localStorage.getItem("racing-account") != "") {
      setLoggedIn(true);
    }
  });

  const TryLogin = async (username: string, password: string) => {
    console.log(username, password);
    const { data } = await instance.get("/login", {
      headers: { Authorization: `${username}:${password}` },
    });
    const account = JSON.parse(data).account;
    console.log(data);
    console.log(account);
    if (account !== "") {
      message.success(<span style={{ color: "#000" }}>login success</span>);
      localStorage.setItem("racing-account", `${username}:${password}`);
      setLoggedIn(true);
      router.push("/");
    } else {
      message.error(<span style={{ color: "#000" }}>loggin failed</span>);
    }
  };

  const Logout = async () => {
    localStorage.setItem("racing-account", "");
    console.log("clear");
    router.push("/");
    message.success(<span style={{ color: "#000" }}>successfully logout</span>);
    // if (login && localStorage.getItem("racing-account")) {
    if (loggedIn) {
      setLoggedIn(false);
    }
  };

  const value: loginContextType = {
    loggedIn: loggedIn,
    TryLogin: TryLogin,
    Logout: Logout,
  };
  return (
    <>
      <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    </>
  );
};
