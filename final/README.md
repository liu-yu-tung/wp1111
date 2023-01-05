#  [111-1] Web Programming Final
## (Group24)台大賽車社官方網站

Demo影片連結:https://drive.google.com/file/d/11d_VeBQs64VXinMah2PVb8_Hg6Exo6LF/view?usp=sharing

專題描述:
此專題為台大賽車隊的官網，網頁需求皆來自對上公關組的成員進行設計，但UI與其要求有些出入

Deployed連結: 124.218.222.22:80(有問題的話可以用port 3000測試)

使用/操作方式:參考demo影片操作網站。使用者可以觀看網站內的內容，有管理權限的人則可以直接在網站上修改大部分的內容。

### 使用框架/模組:

前端使用:next.js/react/typescript

後端使用:express/mongodb/graphql-yoga、使用MD5進行帳號密碼hash、使用lodash進行字典合併

### 專題製作心得:

劉宇彤:這次專案的心得短時間學習第一次使用 Next.js 以及 TypeScript 的方式進行開發，過程充滿挑戰性，但非常有收穫，跟組員討論、開發、 Debug 的階段都是十分有趣的過程，跟以往的學習經驗有很大不同，以實務為導向為目標是很新鮮的體驗

郭哲明:這次專案的心得短時間學習第一次使用 Next.js ,tailwindcsss, eslint, prettier以及 TypeScript 的方式進行開發，跟組員討論、開發、 Debug 的階段都是十分痛苦的過程，但在每次完成一個問題的時候的成就感總是再次給我繼續前進的動力。


林胤辰:這次的專題內容讓我體驗了一個網站從無到有建構的過程，以及現代程式設計的發展是如何建立在巨人的肩膀上。絕大部分的時候建構一個結構化的設計都仰賴著密切的合作，將工作切分成好幾個關聯的區塊，並以純然的信任建構這些api，相信只要依照spec隊友就能使用。我因此更加體會了合作的進步跟

## local 執行方式

### node modules安裝

在/frontend資料夾，首先透過以下指令安裝所需的套件，並啟動在loaclhost:3000的前端Server
```
npm install --global pnpm
pnpm install
pnpm dev
```

在/backend資料夾，首先透過以下指令安裝所需的套件，並啟動在loaclhost:4000的後端Server

```
yarn
yarn server
```

### 資料庫串接及匯入
請在backend/.env當中的MONGO_URL填入你的mongodb的URL，資料庫需要匯入的json檔放置在database-content/，請將這些json各自匯入同名的collection。可透過mongodb官網獲得mongodb database tools，並進入database-content/使用以下指令。
```
mongoimport --uri "{MONGO_URL}" --collection membermodels --drop --file membermodels.json --jsonArray
mongoimport --uri "{MONGO_URL}" --collection newsfeedmodels --drop --file newsfeedmodels.json --jsonArray
mongoimport --uri "{MONGO_URL}" --collection accountmodels --drop --file accountmodels.json --jsonArray
mongoimport --uri "{MONGO_URL}" --collection contactsmodels --drop --file contactsmodels.json --jsonArray
```

## 組員分工

B09902044林胤辰:負責後端，包含資料庫、後端api、驗證機制以及graphql request的處理。
B10502016郭哲明:負責前端，包含newsFeed, members, 首頁，darkmode, 中英切換功能...
B10901114劉宇彤:負責前端，包含newsFeed, members, darkmode, 中英切換功能...
