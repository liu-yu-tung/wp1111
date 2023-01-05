import { GroupType, Member, RoleType } from "./graphql/types";

import { uuid as uuidv4 } from "uuidv4";
export const membersInit: Member[] = [
  {
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
    introduction: {
      en: "intro",
      ch: "介紹",
    },
  },
];
