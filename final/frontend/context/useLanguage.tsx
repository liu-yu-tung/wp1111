import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  FC,
} from "react";
import { Button } from "antd";
import { PropsChildren } from "../interfaces/Props";
import { LangType } from "../interfaces/Elements";

type LanguageContextType = {
  lang: LangType;
  toggleLang: () => void;
};

const LanguageContext = createContext({
  lang: LangType.EN,
  toggleLang: () => {},
});

const LanguageProvider: FC<PropsChildren> = (Props: PropsChildren) => {
  const [lang, setLanguage] = useState(LangType.EN);
  const toggleLang = () => {
    setLanguage(lang == LangType.EN ? LangType.CH : LangType.EN);
  };
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }} {...Props}>
      {Props.children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

export { LanguageProvider, useLanguage };
