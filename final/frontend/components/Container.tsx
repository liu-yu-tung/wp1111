import { FC } from "react";
import { PropsChildren } from "../interfaces/Props";

const Container: FC<PropsChildren> = ({ children }: PropsChildren) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;
