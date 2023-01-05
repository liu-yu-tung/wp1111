import { useTheme } from "../context/ThemeContext";
import { Switch, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export const ThemeSwitch= () => {
  const { darkTheme, toggleDark } = useTheme();
  return (
    <>
    <Space direction="horizontal">
      <span className={darkTheme ? "text-white" : "text-gray-800"}>Dark Mode</span>
    <Switch  onChange={toggleDark} defaultChecked 
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
    />
    </Space>
    </>
  );
};
