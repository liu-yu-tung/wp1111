import Members from "../pages/members";
import {
  GroupRoleType,
  GroupType,
  ImageType,
  RoleType,
  TextType,
} from "./Elements";

export type Member = {
  name: TextType;
  groupRole: [GroupRoleType];
  avatar: ImageType;
  introduction: TextType;
  id: string;
  departmentYear: TextType;
  school: TextType;
};

export const emptyMember: Member = {
  name: { en: "name", ch: "姓名" },
  groupRole: [{ group: GroupType.ADMIN, role: RoleType.MEMBER }],
  avatar: { url: "" },
  introduction: { en: "introduction", ch: "介紹" },
  departmentYear: { en: "-", ch: "-" },
  school: { en: "National Taiwan University", ch: "國立台灣大學" },
  id: "",
};
