import React, { FC, ReactNode, ReactElement } from "react";
import { useRouter } from "next/router";
import { useQuery, gql, DocumentNode } from "@apollo/client";
import Link from "next/link";
import NewsFeedCard from "../../components/NewsFeedCard";
import { NewsFeedType } from "../../interfaces/NewsFeed";
import { useLanguage } from "../../context/useLanguage";
import { LangType } from "../../interfaces/Elements";
import { Col, Divider, Space, Table, Tag, Button } from "antd";
import { useEffect } from "react";
import { Key } from "react";
import { useLogin } from "../../context/useLogin";
import CustomTitle from "../../components/CustomTItle";
const { Column, ColumnGroup } = Table;

const getNewsFeeds = (lang: string) => {
  const QUERY_GET_NEWSFEEDS: DocumentNode = gql`
    query MyQuery {
      getNewsFeeds {
        body {
          en
          ch
        }
        Author {
          id
        }
        title {
          en
          ch
        }
        lastUpdateTime
        createdTime
        id
      }
    }
  `;
  return QUERY_GET_NEWSFEEDS;
};
type NewsFeedsQueryType = {
  getNewsFeeds: NewsFeedType[];
};

const newsFeed: FC = () => {
  const { loggedIn } = useLogin();
  const router = useRouter();
  const { lang } = useLanguage();
  const { data, loading, error, refetch } = useQuery<NewsFeedsQueryType>(
    getNewsFeeds(lang)
  );

  useEffect(() => {
    refetch();
  }, [router, router.isReady, router.query]);
  //console.log("getNewsFeeds " + data?.getNewsFeeds.map((news, i) => news.id))
  const newsMap = data?.getNewsFeeds
    .slice(0)
    .reverse()
    .map((news: NewsFeedType, i) => {
      return (
        <Space align="center" wrap size={"large"} key={news.id as Key}>
          <Link href={router.pathname + "/" + news.id}>
            <NewsFeedCard news={news} />
          </Link>
        </Space>
      );
    });
  return (
    <>
      <p>{loading && "loading"}</p>
      {loggedIn && (
      <Link
        href={"newsFeed/create"} >
        <Button >create newsfeed</Button>
      </Link>
      )}
      {/* <Space
        align="center"
        wrap
        split={<Divider type="vertical" />}
        className=" justify-center w-full"
      >
        {newsMap}
      </Space> */}
      {/* {JSON.stringify(data?.getNewsFeeds)} */}
      <Space
        style={{}}
        direction="vertical"
        className="w-full px-10 py-5 justify-center"
      >
        <CustomTitle>
          {lang === LangType.EN ? "NewsFeed" : "最新消息"}
        </CustomTitle>
        <Table dataSource={data?.getNewsFeeds}>
          <Column
            title="link"
            dataIndex="id"
            key="id"
            render={(id: string) => (
              <>
                <Link href={router.pathname + "/" + id}>
                  <span style={{ color: "#000" }}>link</span>
                </Link>
              </>
            )}
          />
          <Column
            title="title"
            dataIndex="title"
            key="title"
            render={({ en, ch }: { en: string; ch: string }) => (
              <span style={{ color: "#000" }}>
                {lang === LangType.EN ? en : ch}
              </span>
            )}
          />
          <Column
            title="Last Update"
            dataIndex="lastUpdateTime"
            key="lastUpdateTime"
            render={(s: Date) => {
              return (
                <span style={{ color: "#000" }}>{s.toLocaleString()}</span>
              );
            }}
          />
          <Column
            title="Created"
            dataIndex="createdTime"
            key="createdTime"
            render={(s: Date) => {
              return (
                <span style={{ color: "#000" }}>{s.toLocaleString()}</span>
              );
            }}
          />
        </Table>
      </Space>
    </>
  );
};

export default newsFeed;
