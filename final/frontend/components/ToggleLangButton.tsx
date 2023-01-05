import { useTheme } from "../context/ThemeContext";
import { Switch, Space, Button } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../context/useLanguage";
import { LangType } from "../interfaces/Elements";

export const LangSwitch = () => {
  const { lang, toggleLang } = useLanguage();
  return (
    <>
      <Space direction="horizontal" className="px-1">
        <Button onClick={toggleLang} className="w-12 border-0">
          <span className="dark:text-white text-gray-800">
            <TranslationOutlined /> {lang == LangType.EN ? "EN" : "中文"}
          </span>
        </Button>
      </Space>
    </>
  );
};
