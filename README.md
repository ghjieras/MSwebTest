前置作業
- 安裝package.json套件
npm install
- 微軟開發工具包
npm i windows-build-tools
- gulp全域
npm i gulp -g





gulp 會遇到使用者權限問題，要開powerShell (以系統管理員執行)
並執行以下指令:
Set-ExecutionPolicy Unrestricted
選擇 "是(Y)"


-------------------------
網站巡測
透過gulp調整巡測站台


1.
 在gulpfile.js中，找到
 taskName[0]~taskName[6]
 'DevCn' ← Dev == 環境 Cn== 語言
2.
 選擇要跑的站別，不執行的部分註解掉
3.
  執行gulp allTest
4.
 跑完會在photo下產生截圖以供檢查，
 每次使用完需自行刪除




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



圖片檔名:

動作+遊戲+語言

auto: 點auto Option
leave: 離開遊戲
normal: 剛進入遊戲的畫面
point: 幣別切換
select: 籌碼選擇
PC:PC模式下細單menu
Detail: 細單內容

