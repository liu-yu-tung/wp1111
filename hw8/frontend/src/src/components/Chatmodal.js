import { Modal, Form, Input } from 'antd'
import { useEffect, useState, useRef } from 'react';

const ChatModal = ({ open, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  const [temp, setTemp] = useState(false)
  const inputRef = useRef(null)

  useEffect( () => {
    console.log("checkpoint")
    setTemp(true)
  })

  return (
    <Modal
      open={open}
      title="create a new Chat room"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((e) => {
            window.alert(e)
          })
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[{
            required: true,
            message: "Error: Please enter the name of the person to chat!"
          }]}
          autoFocus>
            <Input autoFocus ref={inputRef}/>
          </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChatModal