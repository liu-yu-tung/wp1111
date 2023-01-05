// export type TexttType = {
//   text: string;
// };

export type TextType = {
  en: string;
  ch: string;
};

export type ImageType = {
  url: string;
};

export type UrlType = {
  url: string;
};

export enum ElementType {
  FILE,
  IMAGE,
  TEXT,
  URL,
}

export enum RoleType {
  CAPTAIN = "CAPTAIN",
  VICE_CAPTAIN = "VICE_CAPTAIN",
  CTO = "CTO",
  GROUP_LEADER = "GROUP_LEADER",
  MEMBER = "MEMBER",
}

export enum GroupType {
  PR = "PR",
  GEN = "GEN",
  ADMIN = "ADMIN",
  POWER = "POWER",
  ELEC = "ELEC",
  CHAS = "CHAS",
  AERO = "AERO",
  STRUC = "STRUC",
}

export type GroupRoleType = {
  role: RoleType;
  group: GroupType;
};

export enum LangType {
  EN = "en",
  CH = "ch",
}
