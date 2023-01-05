import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  FormInstance,
  Modal,
  Space,
  Typography,
  UploadProps,
} from "antd";
import { Button, message, Upload } from "antd";
import { BACKEND_URL } from "../lib/parameters";
const { Title } = Typography;

type ModalProps = {
  closePopup: () => void;
  form: FormInstance;
  isModalOpen: boolean;
  onSubmit: (arg0: string) => void;
};

const UploadFileModal = (props: ModalProps) => {
  const { closePopup, form, isModalOpen, onSubmit } = props;
  let token = "";
  const [uploadState, setUploadState] = useState("");
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    token = localStorage.getItem("racing-account") ?? "";
  }
  const propsForUpload: UploadProps = {
    name: "file",
    action: BACKEND_URL + "/upload/file",
    headers: {
      Authorization: token,
    },
    method: "PUT",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(
          <span style={{ color: "#000" }}>
            {info.file.name} file uploaded successfully
          </span>
        );
        console.log("infor filelist:", info.fileList);
        setUploadState(info.fileList[0].response?.path);
      } else if (info.file.status === "error") {
        message.error(
          <span style={{ color: "#000" }}>
            {info.file.name} file upload failed.
          </span>
        );
      }
    },
  };

  return (
    <Modal
      title={
        <Title
          style={{
            color: "#000000",
            textAlign: "center",
          }}
        >
          Upload File
        </Title>
      }
      width={500}
      footer={[
        <Button key="back" onClick={closePopup} danger>
          <span style={{ color: "#000" }}>Back</span>
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          <span style={{ color: "#000" }}>Submit</span>
        </Button>,
      ]}
      open={isModalOpen}
      onOk={form.submit}
      onCancel={closePopup}
    >
      <Space
        className="dark:bg-zinc-900 rounded-md p-3 w-full bg-yellow-300 h-fil"
        direction="vertical"
      >
        <Upload {...propsForUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <span>url: {uploadState}</span>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          form={form}
          onFinish={() => {
            onSubmit(uploadState);
            setUploadState("");
          }}
        ></Form>
      </Space>
    </Modal>
  );
};
export default UploadFileModal;
