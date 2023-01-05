import { useRouter } from "next/router";
import { useQuery, gql, DocumentNode, useMutation } from "@apollo/client";
import { NewsFeedType } from "../../interfaces/NewsFeed";
import { useLanguage } from "../../context/useLanguage";
import React, {
  ReactNode,
  ReactElement,
  useEffect,
  useState,
  useCallback,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { LangType } from "../../interfaces/Elements";
import {
  Select,
  Button,
  Space,
  Form,
  Modal,
  Input,
  Row,
  Col,
  Typography,
} from "antd";
import { ModifyNewsFeedFormModal } from "../../components/ModifyNewsFeedFormModal";
import { useLogin } from "../../context/useLogin";

const { Title } = Typography;
const { Option } = Select;

const MUTATION_DELETE_NEWSFEED: DocumentNode = gql`
  mutation deleteNewsFeed($id: ID!) {
    deleteNewsFeed(id: $id)
  }
`;
const MUTATION_EDIT_NEWSFEED: DocumentNode = gql`
  mutation modifyNewsFeed($id: ID!, $input: NewsFeedModifyInput!) {
    modifyNewsFeed(id: $id, input: $input) {
      id
    }
  }
`;
const getNewsFeed = (lang: string) => {
  const QUERY_GET_NEWSFEED: DocumentNode = gql`
    query getNewsFeed($id: ID!) {
      getNewsFeed(id: $id) {
        Author {
          id
        }
        body {
          en
          ch
        }
        id
        imgs {
          url
        }
        lastUpdateTime
        title {
          en
          ch
        }
      }
    }
  `;
  return QUERY_GET_NEWSFEED;
};
type NewsFeedQueryType = {
  getNewsFeed: NewsFeedType;
};

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const { lang } = useLanguage();
  const { loggedIn } = useLogin();
  const { data, loading, error, refetch } = useQuery<NewsFeedQueryType>(
    getNewsFeed(lang),
    {
      variables: {
        id: id,
      },
    }
  );
  const [uDeleteNews] = useMutation(MUTATION_DELETE_NEWSFEED);
  const handleOnDelete = async () => {
    console.log("deleting");
    const feedback = await uDeleteNews({
      variables: {
        id: id,
      },
    });
    console.log("deleted: " + id + ", " + feedback);
    router.push("/newsFeed");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const closePopup = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const [uModifyNews] = useMutation(MUTATION_EDIT_NEWSFEED);
  const onSubmit = async () => {
    console.log("on submit");
    console.log(form.getFieldsValue(true));
    const res = await uModifyNews({
      variables: {
        id: id,
        input: form.getFieldsValue(true)!,
      },
    });
    refetch();
    closePopup();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOnEdit = async () => {
    console.log("editing");
    showModal();
  };
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  let title =
    lang == LangType.EN
      ? data?.getNewsFeed.title.en
      : data?.getNewsFeed.title.ch;
  const body =
    lang == LangType.EN ? data?.getNewsFeed.body.en : data?.getNewsFeed.body.ch;
  const newsfeed = data?.getNewsFeed;

  if (body === undefined && !loading) {
    title = "404 Not Found";
  }
  if (loading) {
    title = "loading";
  }
  return (
    <Space direction="vertical" className="w-full p-10" size={"large"}>
      <h1>{title}</h1>
      <>
        {" "}
        <ReactMarkdown children={body!} remarkPlugins={[remarkGfm]} />
      </>
      {loggedIn && (
        <Space
          wrap
          align="center"
          direction="horizontal"
          className=" justify-center w-full"
        >
          {!loading && body && (
            <Button type="primary" ghost onClick={handleOnEdit}>
              Edit
            </Button>
          )}
          {!loading && body && (
            <Button type="primary" danger onClick={handleOnDelete}>
              Delete
            </Button>
          )}
        </Space>
      )}
      {!loading && body && (
        <ModifyNewsFeedFormModal
          closePopup={closePopup}
          form={form}
          isModalOpen={isModalOpen}
          onSubmit={onSubmit}
          newsFeed={newsfeed!}
        />
      )}
    </Space>
  );
};
