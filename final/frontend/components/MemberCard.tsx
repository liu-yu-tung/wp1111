import { FC } from "react";
import { LangType } from "../interfaces/Elements";
import { Member } from "../interfaces/Members";
import { Card, Avatar} from "antd";
import { GetGroupName, GetRoleName } from "../lib/members";

const { Meta } = Card
type PropsCustomCard = {
  member: Member;
  lang: LangType;
  handleModifyMemberClick: (arg0: string) => void;
};

const CustomCard: FC<PropsCustomCard> = ({
  member,
  lang,
  handleModifyMemberClick,
}: PropsCustomCard) => {
  return (
    <Card
      style={{ backgroundColor: "rgba(128, 128, 128, 0.15)", border: 0, width: 300, height: 200, overflow: "hidden"}}
      className="dark:bg-black"
      // headStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)", border: 0 }}
      // bodyStyle={{ backgroundColor: "rgba(255, 0, 0, 0.4)", border: 0 }}
      onClick={() => {
        console.log("clicked ccard");
        handleModifyMemberClick(member.id);
      }}
      hoverable={true}
    >
      <Meta 
        avatar={<Avatar src={member.avatar.url}></Avatar>} 
        title={member.name[lang]}
        description={ <><span>{member.groupRole[0]?.group}</span> <br /><span>{member.groupRole[0]?.role}</span></>}
        />
      {/*
      <span>{"name: " + member.name[lang]}</span>
      <br />
      <span>{"avatar url: " + member.avatar?.url}</span>
      <br />
      <span>{"group: " + GetGroupName(member.groupRole[0]?.group)}</span>
      <br />
      <span>{"role: " + GetRoleName(member.groupRole[0]?.role)}</span>
      <br />
      <span>{"intro: " + member.introduction[lang]}</span>
      <br />
      <span>{"dy: " + member.departmentYear[lang]}</span>
      <br />
      <span>{"school: " + member.school[lang]}</span>
    */}
    </Card>
  );
};
export default CustomCard;
