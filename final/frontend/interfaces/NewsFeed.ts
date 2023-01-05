import { TextType } from "./Elements";
import { Member } from "./Members";
import { ImageType } from "./Elements"

export type NewsFeedType = {
  title: TextType;
  Author: Member;
  createdTime: Date;
  lastUpdateTime: Date;
  body: TextType;
  img: ImageType[]|null;
  id: string;
};
