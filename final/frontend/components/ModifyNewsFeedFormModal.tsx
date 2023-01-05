import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import newsFeed from "../pages/newsFeed";
import { NewsFeedType } from "../interfaces/NewsFeed";
const { Title } = Typography;
type ModifyNewsFeedFormModalType = {
  closePopup: () => void;
  form: FormInstance;
  isModalOpen: boolean;
  onSubmit: () => void;
  newsFeed: NewsFeedType;
};
export const ModifyNewsFeedFormModal = (props: ModifyNewsFeedFormModalType) => {
  const { closePopup, form, isModalOpen, onSubmit, newsFeed } = props;
  return (
    <Modal
      title={
        <Title
          style={{
            color: "#000000",
            textAlign: "center",
          }}
        >
          Modify News
        </Title>
      }
      width={1500}
      footer={[
        <Button key="back" onClick={closePopup} danger>
          <span style={{ color: "#000" }}>Back</span>
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          <span style={{ color: "#000" }}>Submit</span>
        </Button>,
      ]}
      open={isModalOpen}
      onOk={form.submit}
      onCancel={closePopup}
    >
      <Space
        className="dark:bg-zinc-900 rounded-md p-3 w-full bg-yellow-300 h-fil"
        direction="vertical"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          form={form}
          onFinish={onSubmit}
        >
          <Row>
            <Col span={12}>
              <Form.Item name={["title", "en"]} label={<span>Title</span>}>
                <Input
                  defaultValue={newsFeed?.title.en || ""}
                  placeholder="title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["title", "ch"]} label={<span>標題</span>}>
                <Input
                  defaultValue={newsFeed?.title.ch || ""}
                  placeholder="title"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name={["body", "en"]} label={<span>Body</span>}>
                <Input.TextArea
                  defaultValue={newsFeed?.body.en || ""}
                  placeholder="title"
                  autoSize={{ minRows: 6, maxRows: 20 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["body", "ch"]} label={<span>內文</span>}>
                <Input.TextArea
                  defaultValue={newsFeed?.body.ch || ""}
                  placeholder="title"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item shouldUpdate>
            {() => {
              return (
                <>
                  <span>{JSON.stringify(form.getFieldsValue(true))}</span>
                </>
              );
            }}
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
