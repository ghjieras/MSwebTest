前置作業

npm install
- 微軟開發工具包
npm i windows-build-tools
- gulp全域
npm i gulp -g

網站巡測

透過gulp調整巡測站台

gulp allTest

透過child_process.js中的userData修改userData中的資料可改變執行內容
也可以執行這支檔案跑單一語言

userData = {
  user: 帳號,
  site: 站別
  lang: 語言
  total: 站台要跑的總數
  tab: 單個瀏覽器執行的tab數
  start: 從第幾個element開始
}

跑完會在photo下產生截圖，每次使用完需自行刪除