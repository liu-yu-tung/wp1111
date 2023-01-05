import { FC } from "react";
import { LangType } from "../interfaces/Elements";
import { useLanguage } from "../context/useLanguage";
import { Head } from "next/document";
const aboutUs: FC = () => {
  const { lang } = useLanguage();
  return (
    <div>
      {/* <Head>
        <title>
          {lang == LangType.EN
            ? "NTU Racing | About Us"
            : "台大賽車隊 | 關於我們"}
        </title>
      </Head> */}
      about Us
    </div>
  );
};

export default aboutUs;
