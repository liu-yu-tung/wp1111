import { FC, Key, useEffect, useState } from "react";
import { useLanguage } from "../../context/useLanguage";
import { GroupType, LangType, RoleType } from "../../interfaces/Elements";
import { Member, emptyMember } from "../../interfaces/Members";
import CustomTitle from "../../components/CustomTItle";
import { Button, Card, Space, Modal, Typography, Form } from "antd";
import { DocumentNode } from "graphql";
import { FetchResult, gql, useMutation, useQuery } from "@apollo/client";
import { GetGroupName, GetRoleName } from "../../lib/members";
import MemberCard from "../../components/MemberCard";
import {
  CreateMemberFormModal,
  ModifyMemberFormModal,
} from "../../components/ModifyMemberFormModal";
import { useLogin } from "../../context/useLogin";

const getMembers = (lang: string) => {
  const QUERY_GET_MEMEBERS: DocumentNode = gql`
    query getMembers {
      getMembers {
        id
        name {
          ${lang}
        }
        introduction {
          ${lang}
        }
        groupRole {
          role
          group
        }
        departmentYear {
         ${lang}
        }
        avatar {
          url
        }
        school {
          ${lang}
        }
      }
    }
  `;
  return QUERY_GET_MEMEBERS;
};
const allMemberKeys = `
  id
  name {
    en
    ch
  }
  introduction {
    en
    ch
  }
  groupRole {
    role
    group
  }
  departmentYear {
    en
    ch
  }
  avatar {
    url
  }
  school {
    en
    ch
  }

`;
const MUTATION_MODIFY_MEMBER = gql`
  mutation modifyMember($member: MemberIdInput!) {
    modifyMember(member: $member) {
      ${allMemberKeys}
    }
  }
`;
const MUTATION_DELETE_MEMBER = gql`
  mutation deleteMember($id: ID!) {
    deleteMember(id: $id) {
      ${allMemberKeys}
    }
  }
`;
const MUTATION_CREATE_MEMBER = gql`
  mutation createMember($member: MemberInput!) {
    createMember(member: $member) {
      ${allMemberKeys}
    }
  }
`;
const QUERY_MEMBER = gql`
  query getMember($id: ID!) {
    getMember(id: $id) {
      id
      name {
        en
        ch
      }
      introduction {
        en
        ch
      }
      groupRole {
        role
        group
      }
      departmentYear {
        en
        ch
      }
      avatar {
        url
      }
      school {
        en
        ch
      }
    }
  }
`;

type GetMembersQueryType = {
  // getContacts: ContactsType;
  getMembers: Member[];
};

type GetMemberQueryType = {
  getMember: Member;
};

const Members: FC = () => {
  const { loggedIn } = useLogin();
  const { lang } = useLanguage();
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [createFormModalOpen, setCreateFormModalOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [uModifyMember] = useMutation(MUTATION_MODIFY_MEMBER);
  const [uDeleteMember] = useMutation(MUTATION_DELETE_MEMBER);
  const [uCreateMember] = useMutation(MUTATION_CREATE_MEMBER);

  const {
    data,
    loading: loadingMembers,
    error,
    refetch,
  } = useQuery<GetMembersQueryType>(getMembers(lang));

  const {
    data: dataMember,
    loading: loadingMember,
    error: errorMember,
    refetch: refetchMember,
  } = useQuery<GetMemberQueryType>(QUERY_MEMBER);

  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const sendModifiedMember = async (memberToSend: Member) => {
    console.log("form: ", form.getFieldsValue(true));
    console.log("send modify member");
    // console.log("member to send: ", memberToSend);
    const tempMember: Member = {
      id: memberToSend.id,
      ...form.getFieldsValue(true),
    };
    const res = await uModifyMember({
      variables: {
        // member: memberToSend,
        member: tempMember,
      },
    });
    console.log("res:", res);
    setFormModalOpen(false);
    setLoading(false);
    refetch();
  };

  const sendCreatedMember = async () => {
    console.log(createForm.getFieldsValue(true));
    const tempMember = { ...createForm.getFieldsValue(true) };
    delete tempMember.id;
    const res = await uCreateMember({
      variables: {
        member: tempMember,
      },
    });
    console.log("res:", res);
    setCreateFormModalOpen(false);
    setLoading(false);
    refetch();
  };

  const handleOk = (memberOk: Member) => {
    setLoading(true);
    sendModifiedMember(memberOk);
  };

  const handleCancel = () => {
    form.resetFields();
    setFormModalOpen(false);
  };

  const sendDeleteMember = async (memberToDelete: Member) => {
    console.log("delete member: ", memberToDelete);
    const res = await uDeleteMember({
      variables: {
        id: memberToDelete.id,
      },
    });
    console.log("delete res: ", res);
    setFormModalOpen(false);
    refetch();
    // res ? console.log("deleted member") : console.log("delete fail");
  };

  const handleCreateMemberClick = () => {
    createForm.setFieldsValue(emptyMember);
    setCreateFormModalOpen(true);
  };

  const handleCreateOk = () => {
    setLoading(true);
    sendCreatedMember();
  };

  const handleCreateCancel = () => {
    setCreateFormModalOpen(false);
  };

  useEffect(() => {
    console.log("dataMemberChanged");
    form.resetFields();
    if (dataMember && formModalOpen) {
      setFormModalOpen(true);
    }
  }, [dataMember]);
  const handleModifyMemberClick = async (id: string) => {
    if (loggedIn) {
      console.log("handleModifyMember, ID: ", id);
      await refetchMember({
        id: id,
      });
      setFormModalOpen(true);
    }
  };
  const groupList: GroupType[] = [
    GroupType.PR,
    GroupType.GEN,
    GroupType.STRUC,
    GroupType.POWER,
    GroupType.ELEC,
    GroupType.AERO,
    GroupType.CHAS,
  ];

  return (
    <>
      {loggedIn && (
        <Button onClick={handleCreateMemberClick}>create member</Button>
      )}
      {loadingMembers ? (
        <span>loading</span>
      ) : (
        <>
          {/* {data && JSON.stringify(data.getMembers)} */}
          <CustomTitle>{lang == LangType.EN ? "Leaders" : "幹部"}</CustomTitle>
          <Space
            className=" px-10 flex-wrap w-full content-end justify-evenly"
            align="center"
            // direction="horizontal"
            wrap={true}
          >
            {data &&
              data.getMembers
                .filter(
                  (member) =>
                    member.groupRole[0].group === GroupType.ADMIN ||
                    member.groupRole[0].role === RoleType.GROUP_LEADER
                )
                .map((member) => (
                  <MemberCard
                    key={member.id as Key}
                    lang={lang}
                    member={member}
                    handleModifyMemberClick={handleModifyMemberClick}
                  />
                ))}
          </Space>
          {groupList
            .map((e: GroupType) => GroupType[e])
            .map((e) => (
              <>
                <CustomTitle>{GetGroupName(e)}</CustomTitle>
                <Space
                  className=" px-10 flex-wrap w-full content-end justify-evenly"
                  align="center"
                  // direction="horizontal"
                  wrap={true}
                >
                  {data &&
                    data.getMembers
                      .filter((member) => member.groupRole[0].group === e)
                      .map((member) => (
                        <MemberCard
                          key={member.id as Key}
                          lang={lang}
                          member={member}
                          handleModifyMemberClick={handleModifyMemberClick}
                        />
                      ))}
                </Space>
              </>
            ))}
          <ModifyMemberFormModal
            memberToModify={dataMember?.getMember!}
            formModalOpen={formModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            loading={loading}
            form={form}
            handleDeleteMember={sendDeleteMember}
          />
          <CreateMemberFormModal
            memberToModify={emptyMember}
            formModalOpen={createFormModalOpen}
            handleOk={handleCreateOk}
            handleCancel={handleCreateCancel}
            loading={loading}
            form={createForm}
            handleDeleteMember={sendDeleteMember}
          />

          {/* <pre>{JSON.stringify(form.getFieldsValue(true))}</pre> */}
        </>
      )}
    </>
  );
};

export default Members;
