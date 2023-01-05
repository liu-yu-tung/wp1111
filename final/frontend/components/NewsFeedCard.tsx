import React, { FC, ReactNode, use, useState } from "react";
import { Carousel, Typography } from "antd";
import { PropsChildren } from "../interfaces/Props";
import { useLanguage } from "../context/useLanguage";
import { LangType } from "../interfaces/Elements";
import { useTheme } from "../context/ThemeContext";
import { Space, Table, Tag} from "antd";
import type { ColumnsType } from 'antd/es/table'
import { NewsFeedType } from "../interfaces/NewsFeed";

interface DataType {
  title: string;
  body: string;
}
type NewsProps = {
  news: NewsFeedType;
};
const { Paragraph } = Typography;
const NewsFeedCard: FC<NewsProps> = ({ news }: NewsProps) => {
  const { lang } = useLanguage();
  const dark = useTheme();
  const onChange = (currentSlide: number) => {};
  const contentStyle: React.CSSProperties = {
    margin: 0,
    color: "#fff",
    height: "240px",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },{
    title: 'Body',
    dataIndex: 'body',
    key: 'body'
  }
  ]
  const data: DataType[] = []
  return (
    <></>
  )
  {/*
  const Content: FC = () => {
    return (news.img === undefined?
    (<>
      <Card style={{width: 300}}>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>
            {lang == LangType.EN ? news.title.en : news.title.ch}
          </h3>
        </div>
      </Carousel>
      <Paragraph ellipsis={{rows: 1}}>
        <p style={{ color: "#000" }}>
          {lang == LangType.EN ? news.body.en : news.body.ch}
        </p>
      </Paragraph> 
          </Card>
        </>)
      :(
      <Card>
        <Carousel autoplay afterChange={onChange}>
          {news.img?.map(e=>(
            <div>
              <img src ={e.url} alt=""/>
            </div>
          ))}
        </Carousel>
        <Paragraph ellipsis={{rows: 1}}>
          <p style={{ color: "#000" }}>
            {lang == LangType.EN ? news.body.en : news.body.ch}
          </p>
        </Paragraph> 
      </Card>)
    )
  }
*/}
};

export default NewsFeedCard;
