import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { BACKEND_URL } from "../../lib/parameters";

const App: React.FC = () => {
  let token = "";
  const [uploadState, setUploadState] = useState("");
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    token = localStorage.getItem("racing-account") ?? "";
  }
  const props: UploadProps = {
    name: "file",
    action: BACKEND_URL + "/upload/test",
    headers: {
      Authorization: token,
    },
    method: "PUT",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUploadState(info.fileList[0].response?.path);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <span>url: {uploadState}</span>
    </>
  );
};

export default App;
