import { GroupType, NewsFeedType, RoleType } from "./graphql/types";
import { uuid as uuidv4 } from "uuidv4";
export const db: NewsFeedType[]= [
    {
  createdTime: "2017-01-10T21:33:15.233Z",
  title: {
      ch: "chinese title 1",
      en: "english title 1"
  },
  body: {
      ch: "ch body 1",
      en: "en body 1"
  },
  id: "1",
  lastUpdateTime: "2023-01-02T16:40:45.143Z",
  img: {
      url: ""
  },
  Author: {
    name: {
      en: "TSUI,EN CHIEH",
      ch: "崔恩傑",
    },
    groupRole: [
      {
        role: RoleType.Captain,
        group: GroupType.Admin,
      },
    ],
    avatar: {
      url: "http://124.218.222.22:8002/publicfiles/contacts/DSC09609.JPG",
    },
    school: {
      en: "National Taiwan University",
      ch: "國立台灣大學",
    },
    departmentYear: {
      en: "Mechenichal Engineering 3",
      ch: "機械工程學系 三年級",
    },
    id: uuidv4(),
    },
  },
  {
  createdTime: "2017-01-10T21:33:15.233Z",
  title: {
      ch: "chinese title 2",
      en: "english title 2"
  },
  body: {
      ch: "ch body 1",
      en: "en body 1"
  },
  id: "2",
  lastUpdateTime: "2023-01-02T16:40:45.143Z",
  img: {
      url: ""
  },
  Author: {
    name: {
      en: "TSUI,EN CHIEH",
      ch: "崔恩傑",
    },
    groupRole: [
      {
        role: RoleType.Captain,
        group: GroupType.Admin,
      },
    ],
    avatar: {
      url: "http://124.218.222.22:8002/publicfiles/contacts/DSC09609.JPG",
    },
    school: {
      en: "National Taiwan University",
      ch: "國立台灣大學",
    },
    departmentYear: {
      en: "Mechenichal Engineering 3",
      ch: "機械工程學系 三年級",
    },
    id: uuidv4(),
    },
  },
]
