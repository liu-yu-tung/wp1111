import { Space } from "antd";
import { Typography } from "antd";
import { FC } from "react";
import { PropsChildren } from "../interfaces/Props";

const { Title } = Typography;

const CustomTitle: FC<PropsChildren> = ({ children }: PropsChildren) => {
  return (
    <span>
      <Space direction="horizontal" className=" justify-center w-full">
        <Title className="pt-4 w-fit m-0">{children}</Title>
      </Space>
    </span>
  );
};
export default CustomTitle;
