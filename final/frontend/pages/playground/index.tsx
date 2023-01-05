import React, { FC, useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import { PropsChildren } from "../../interfaces/Props";
import Link from "next/link";

const Playground: FC<PropsChildren> = (props: PropsChildren) => {
  return (
    <>
      <Space direction="vertical" className="p-5">
        <h1>Menu of Playground</h1>
        <ul className="bg-white">
          <li>
            <Link
              href="/playground/fileUpload"
              className="block px-4 py-2 text-gray-800  hover:bg-indigo-500 hover:text-white"
            >
              File Upload
            </Link>
          </li>
          <li>
            <Link
              href="/playground/graphql"
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >
              Graph QL
            </Link>
          </li>
        </ul>
      </Space>
    </>
  );
};

export default Playground;
