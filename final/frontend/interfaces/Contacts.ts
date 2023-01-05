import { ImageType, TextType, UrlType } from "./Elements";

export type ContactsType = Contact[];
export type ContacttsType = Contactt[];

export type Contact = {
  name: TextType;
  link: UrlType;
  icon: ImageType;
  backgroundImage: ImageType;
  description: TextType;
};

export type Contactt = {
  name: TextType;
  link: UrlType;
  icon: ImageType;
  backgroundImage: ImageType;
  description: TextType;
};
