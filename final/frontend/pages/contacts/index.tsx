import React, { FC, useEffect, useState } from "react";
import { Button, Space, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { DocumentNode, gql, useQuery } from "@apollo/client";
import {
  ContactsType,
  Contact,
  ContacttsType,
} from "../../interfaces/Contacts";
import { LangType } from "../../interfaces/Elements";
import { useLanguage } from "../../context/useLanguage";
import CustomTitle from "../../components/CustomTItle";

const { Meta } = Card;
const { Title } = Typography;

// const QUERY_GET_CONTACTS: DocumentNode = gql`
//   query getContacts($lang: LangType!) {
//     getContacts(lang: $lang) {
//       name {
//         text
//       }
//       description {
//         text
//       }
//       backgroundImage {
//         url
//       }
//       icon {
//         url
//       }
//       link {
//         url
//       }
//     }
//   }
// `;

const getContacts = (lang: string) => {
  const QUERY_GET_CONTACTS: DocumentNode = gql`
    query getContacts {
      getContacts {
        name {
          ${lang}
        }
        description {
          ${lang}
        }
        backgroundImage {
          url
        }
        icon {
          url
        }
        link {
          url
        }
      }
    }
  `;
  return QUERY_GET_CONTACTS;
};

type ContactQueryType = {
  // getContacts: ContactsType;
  getContacts: ContactsType;
};

const Contacts: FC = () => {
  const { lang } = useLanguage();
  // const [lang, setLang] = useState<LangType>(LangType.CH);
  console.log(lang);
  // const { data, loading, error, refetch } = useQuery<ContactQueryType>(
  //   QUERY_GET_CONTACTS,
  //   {
  //     variables: {
  //       lang: lang,
  //     },
  //   }
  // );
  const { data, loading, error, refetch } = useQuery<ContactQueryType>(
    getContacts(lang)
  );

  useEffect(() => {
    console.log(error);
  }, [error]);

  // console.log("gql: ", getContacts("en"));

  return (
    <>
      <CustomTitle>
        {lang == LangType.EN ? "Contact Us" : "聯絡我們"}
      </CustomTitle>
      {loading
        ? "loading"
        : data && (
            <Space className="p-4 justify-evenly w-full" wrap={true}>
              {data.getContacts.map((Cont) => (
                <a href={Cont.link.url} target="_blank">
                  <Card
                    // style={{ width: 300,  }}
                    cover={<img alt="example" src={Cont.backgroundImage.url} />}
                    className="dark:bg-slate-800 dark:border-transparent justify-evenly w-48 m-2 hover:mb-3 hover:mt-1 hover:mr-3 hover:ml-1 "
                    // actions={[
                    //   <SettingOutlined key="setting" />,
                    //   <EditOutlined key="edit" />,
                    //   <EllipsisOutlined key="ellipsis" />,
                    // ]}
                  >
                    <Meta
                      avatar={<Avatar src={Cont.icon.url} />}
                      title={Cont.name[lang]}
                      description={Cont.description[lang]}
                    />
                  </Card>
                </a>
              ))}
            </Space>
          )}
    </>
  );
};

export default Contacts;
