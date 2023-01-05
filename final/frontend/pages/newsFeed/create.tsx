import { Space, Typography } from "antd";
import { LangType } from "../../interfaces/Elements";
import { useLanguage } from "../../context/useLanguage";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, FC } from "react";
import { Button, Form, Input, Select } from "antd";
import { NewsFeedInput } from "../../components/api/graphql/types";
import CustomTitle from "../../components/CustomTItle";
import { useRouter } from "next/router";

const CREATE_NEWSFEED = gql`
  mutation createNewsFeed($input: NewsFeedInput!) {
    createNewsFeed(input: $input) {
      id
    }
  }
`;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      offset: 0,
    },
    sm: {
      offset: 18,
    },
  },
};

const CreateNewsForm: FC = () => {
  const [form] = Form.useForm();
  const router = useRouter() 
  const [uCreateNews] = useMutation(CREATE_NEWSFEED);
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const input: NewsFeedInput = {
      title: {
        en: values.title,
        ch: values.title,
      },
      body: {
        en: values.body,
        ch: values.body,
      },
    };
    console.log(input);
    setTimeout(async () => {
      console.log("sending newsfeed");
      const feedback = await uCreateNews({
        variables: {
          input: input,
        },
      });
      console.log("newsfeed sended");
      router.push('/newsFeed')
    }, 10);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        // style={{backgroundColor: "rgba(128, 128, 128, 0.9)"}}
        name="title"
        label={<span>Title</span>}
        rules={[{ required: true, message: "Please input Title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        // style={{backgroundColor: "rgba(128, 128, 128, 0.9)"}}
        name="body"
        label={<span>Body</span>}
        rules={[{ required: true, message: "Please input Body" }]}
      >
        <Input.TextArea showCount />
      </Form.Item>
      <Form.Item {...tailFormItemLayout} labelAlign={"right"}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const { Title } = Typography;

const CreateNewsFeed = () => {
  const { lang } = useLanguage();
  return (
    <Space direction="vertical" className="w-full p-5">
      <CustomTitle>
        {lang == LangType.EN ? "Create a News Feed" : "新增消息"}
      </CustomTitle>
      <CreateNewsForm></CreateNewsForm>
    </Space>
  );
};

export default CreateNewsFeed;
