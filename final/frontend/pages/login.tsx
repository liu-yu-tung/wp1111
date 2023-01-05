import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Router from "next/router";
import axios from "axios";
import { message, Space } from "antd";
import CustomTitle from "../components/CustomTItle";
import { useLanguage } from "../context/useLanguage";
import { LangType } from "../interfaces/Elements";
import { BACKEND_URL } from "../lib/parameters";
import { useLogin } from "../context/useLogin";

const instance = new axios.Axios({ baseURL: BACKEND_URL });

const Login = () => {
  const { loggedIn, TryLogin, Logout } = useLogin();
  const { lang } = useLanguage();
  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    TryLogin(username, password);
  };
  return (
    <Space direction="vertical" className="w-full p-4">
      <CustomTitle>{lang == LangType.EN ? "Authentication" : "驗證"}</CustomTitle>
      {loggedIn && (
        <Space className="w-full justify-center">
          <Button type="primary" danger onClick={Logout}>
            Logout
          </Button>
        </Space>
      )}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {!loggedIn && (
          <Form.Item
            label={<span>username</span>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {!loggedIn && (
          <Form.Item
            label={<span>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      ></Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {!loggedIn && (
            <Button type="primary" ghost htmlType="submit">
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};
export default Login;
