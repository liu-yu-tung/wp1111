import { useLanguage } from "../context/useLanguage";
import { GroupType, LangType, RoleType } from "../interfaces/Elements";

export const GetRoleName = (role: RoleType): string => {
  const { lang } = useLanguage();
  const isEn = lang == LangType.EN;
  // const isEn = true;
  switch (role) {
    case "CAPTAIN":
      return isEn ? "Captain" : "隊長";
    case "VICE_CAPTAIN":
      return isEn ? "Vice Captain" : "副隊長";
    case "CTO":
      return isEn ? "CTO" : "技術長";
    case "GROUP_LEADER":
      return isEn ? "Group Leader" : "組長";
    case "MEMBER":
      return isEn ? "Team member" : "組員";
  }
  return role;
};

export const GetGroupName = (group: GroupType): string => {
  const { lang } = useLanguage();
  const isEn = lang === LangType.EN ? true : false;
  switch (group) {
    case "PR":
      return isEn ? "Public Relation Group" : "公關組";
    case "GEN":
      return isEn ? "General Affair Group" : "總務組";
    case "ADMIN":
      return isEn ? "Admininstritive Group" : "行政組";
    case "POWER":
      return isEn ? "Powertrain Group" : "動力組";
    case "ELEC":
      return isEn ? "Electrical System Group" : "電系組";
    case "CHAS":
      return isEn ? "Chassis Group" : "底盤組";
    case "AERO":
      return isEn ? "Aerodynamics Group" : "空力組";
    case "STRUC":
      return isEn ? "Structure Group" : "結構組";
  }
  return group;
};
