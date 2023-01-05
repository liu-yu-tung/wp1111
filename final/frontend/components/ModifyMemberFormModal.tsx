import {
  Button,
  Form,
  message,
  Modal,
  ModalProps,
  Space,
  Typography,
  Row,
  Col,
  Input,
  Select,
  FormInstance,
} from "antd";
import { Member, emptyMember } from "../interfaces/Members";
import { GroupType, RoleType } from "../interfaces/Elements";
import { GetGroupName, GetRoleName } from "../lib/members";
// import { FC, useEffect, useRef } from "react";
import {
  ExclamationCircleOutlined,
  PropertySafetyFilled,
} from "@ant-design/icons";
import UploadFileModal from "./uploadFileModal";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

type PropsModal = ModalProps & {
  memberToModify: Member;
  formModalOpen: boolean;
  loading: boolean;
  handleOk: (memberToModify: Member) => void;
  handleCancel: () => void;
  form: FormInstance;
  handleDeleteMember: (memberToDelete: Member) => void;
};

export const CreateMemberFormModal = (props: PropsModal) => {
  const {
    memberToModify,
    handleOk,
    handleCancel,
    formModalOpen,
    loading,
    form,
    handleDeleteMember,
  } = props;
  return (
    <>
      <Modal
        open={formModalOpen}
        title={
          <Title
            style={{
              color: "#000",
              textAlign: "center",
            }}
          >
            Create Member
          </Title>
        }
        onOk={() => {
          handleOk(memberToModify);
        }}
        onCancel={handleCancel}
        style={{ color: "#000" }}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel} danger type="dashed">
            <span style={{ color: "#000" }}>Cancel</span>
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              handleOk(memberToModify);
            }}
          >
            <span style={{ color: "#000" }}>Submit</span>
          </Button>,
        ]}
      >
        <Space
          className="dark:bg-zinc-900 rounded-md p-3 w-full bg-yellow-300 h-fil"
          direction="vertical"
        >
          <ModifyForm {...props} />
        </Space>
      </Modal>
    </>
  );
};

export const ModifyMemberFormModal = (props: PropsModal) => {
  // useEffect(() => {
  //   memberToModify && form.setFieldsValue(memberToModify);
  // });
  const {
    memberToModify,
    handleOk,
    handleCancel,
    formModalOpen,
    loading,
    form,
    handleDeleteMember,
  } = props;
  return (
    <>
      <Modal
        open={formModalOpen}
        title={
          <Title
            style={{
              color: "#000",
              textAlign: "center",
            }}
          >
            Modify Member
          </Title>
        }
        onOk={() => {
          handleOk(memberToModify);
        }}
        onCancel={handleCancel}
        style={{ color: "#000" }}
        width={1000}
        footer={[
          <Button
            key="delete"
            danger
            type="primary"
            onClick={() => {
              confirm({
                title: "Confirmation",
                icon: <ExclamationCircleOutlined />,
                // onCancel: () => {}
                onOk: () => {
                  handleDeleteMember(memberToModify);
                },
                content: "You are about to delete a member, are you sure?",
                okText: <span style={{ color: "#000" }}>confirm</span>,
                cancelText: <span style={{ color: "#000" }}>Cancel</span>,
              });
            }}
          >
            <span style={{ color: "#fff" }}>Delete</span>
          </Button>,
          <Button key="back" onClick={handleCancel} danger type="dashed">
            <span style={{ color: "#000" }}>Cancel</span>
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              handleOk(memberToModify);
            }}
          >
            <span style={{ color: "#000" }}>Submit</span>
          </Button>,
        ]}
      >
        <Space
          className="dark:bg-zinc-900 rounded-md p-3 w-full bg-yellow-300 h-fil"
          direction="vertical"
        >
          <ModifyForm {...props} />
        </Space>
      </Modal>
    </>
  );
};

export const ModifyForm = (props: PropsModal) => {
  const { memberToModify, form } = props;
  const [fileUploadModalOpen, setFileUploadModalOpen] =
    useState<boolean>(false);
  const [fileUploadForm] = useForm();
  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name={["name", "en"]}
              label={<span>Name</span>}
              rules={[{ required: true }]}
            >
              <Input
                defaultValue={memberToModify?.name?.en || ""}
                placeholder="name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["name", "ch"]}
              label={<span>姓名</span>}
              rules={[{ required: true }]}
            >
              <Input
                defaultValue={memberToModify?.name?.ch || ""}
                placeholder="name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={["introduction", "en"]}
              label={<span>Introduction</span>}
            >
              <Input.TextArea
                showCount
                maxLength={1000}
                defaultValue={memberToModify?.introduction?.en || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={["introduction", "ch"]} label={<span>介紹</span>}>
              <Input.TextArea
                showCount
                maxLength={1000}
                defaultValue={memberToModify?.introduction?.ch || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={["departmentYear", "en"]}
              label={<span>department year</span>}
            >
              <Input
                placeholder="department and year"
                defaultValue={memberToModify?.departmentYear?.en || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["departmentYear", "ch"]}
              label={<span>系所年級</span>}
            >
              <Input
                placeholder="系所年級"
                defaultValue={memberToModify?.departmentYear?.ch || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name={["school", "en"]} label={<span>School</span>}>
              <Input
                placeholder="School"
                defaultValue={memberToModify?.school?.en || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={["school", "ch"]} label={<span>學校</span>}>
              <Input
                placeholder="學校"
                defaultValue={memberToModify?.school?.ch || ""}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={["groupRole", "group"]}
              label={<span>Group</span>}
              rules={[
                {
                  required: true,
                  message: "Please select your group!",
                },
              ]}
            >
              <Select
                placeholder="Please select a Group"
                defaultValue={memberToModify?.groupRole[0]?.group}
              >
                {Object.keys(GroupType).map((group) => (
                  <Option value={group}>
                    <span style={{ color: "#000" }}>
                      {GetGroupName(group as GroupType)}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={["groupRole", "role"]}
              label={<span>Role</span>}
              rules={[
                {
                  required: true,
                  message: "Please select your role!",
                },
              ]}
            >
              <Select
                placeholder="Please select a role"
                defaultValue={memberToModify?.groupRole[0]?.role || ""}
              >
                {Object.keys(RoleType).map((role) => (
                  <Option value={role}>
                    <span style={{ color: "#000" }}>
                      {GetRoleName(role as RoleType)}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              shouldUpdate
              name={["avatar", "url"]}
              label={<span>Avatar url</span>}
            >
              <Input
                // disabled={true}
                placeholder="avatar url"
                defaultValue={memberToModify?.avatar?.url || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="id" label={<span>id</span>}>
              <div className="bg-white rounded-md">
                <Input
                  disabled={true}
                  placeholder="ID"
                  defaultValue={memberToModify?.id || ""}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item shouldUpdate>
              <Button
                onClick={() => {
                  setFileUploadModalOpen(true);
                  // console.log("set avatar value");
                  // form.setFieldValue(["avatar", "url"], "t");
                }}
              >
                change avatar
              </Button>
              {/* <img style={} src={form.getFieldValue(["avatar", "url"])}></img> */}
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item shouldUpdate>
              {() => {
                return (
                  <>
                    <span>{JSON.stringify(form.getFieldsValue(true))}</span>
                    <span>{JSON.stringify(form.getFieldsValue(true))}</span>
                  </>
                );
              }}
            </Form.Item> */}
      </Form>
      <UploadFileModal
        closePopup={() => {
          setFileUploadModalOpen(false);
        }}
        form={fileUploadForm}
        isModalOpen={fileUploadModalOpen}
        onSubmit={(newUrl: string) => {
          form.setFieldValue(["avatar", "url"], newUrl);
          setFileUploadModalOpen(false);
        }}
      />
    </>
  );
};
