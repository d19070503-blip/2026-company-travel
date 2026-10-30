# 2026 宇宙科技公司員工旅遊

活動報名網站，採用靜態 HTML + CSS + JavaScript，已連接 Google Apps Script Web App，將報名資料同步至 Google Sheet：`2026_公司旅遊`。

## 本機預覽

```bash
cd c:/Users/9D/Desktop/AI課程3
python -m http.server 8000
```

然後開啟瀏覽器並前往：

- http://localhost:8000

## GitHub Pages 網址

https://d19070503-blip.github.io/2026-company-travel/

> GitHub repo 名稱已更新為 `2026-company-travel`，符合 GitHub 命名限制；網站內容仍與 Google Sheet 檔名 `2026_公司旅遊` 對應。 Pages URL 已同步更新。

## Google Apps Script 部署方式

Web App URL 已設定於 `script.js`。部署設定為「執行身分：我」及「誰可以存取：所有人」，程式會寫入指定試算表及工作表 `2026_公司旅遊`，並將手機欄設定為文字格式。

瀏覽器對 Apps Script 的跨來源回應有限制，因此表單使用 `no-cors` 方式送出。送出後瀏覽器無法讀取 Apps Script 的回應；請到試算表確認資料是否新增，再將報名視為成功。

- Web App：https://script.google.com/macros/s/AKfycbzNG4BmUl_JVWMVLLbvMRF_UcgiXw9gHOvr0P1ESIiPJdMO_SylPQxUcWOeX2FsNteI/exec
- Google Sheet：`2026_公司旅遊`

## 主要檔案

- `index.html`：活動首頁與報名表單
- `styles.css`：RWD 排版與風格設計
- `script.js`：輪播圖與 Apps Script 表單送出邏輯
- `cover.jpg`：16:9 活動封面圖
- `apps-script/Code.gs`：本機 Apps Script 程式原始碼（此目錄不納入 Git 追蹤）

## Apps Script 與本機文件

- Apps Script 專案：[開啟編輯器](https://script.google.com/home/projects/14dwQ1uoQ-wfHph5B_W7Kj6OwYgiqZZWCc3RzIxnrSTY4a-QXNtqLWmqM/edit)
- 本機系統維護文件位於 `docx/`，此目錄不納入 Git 追蹤。

## 注意事項

- `spec/`、`docx/`、`apps-script/` 資料夾不納入 Git 追蹤。
- 若需要 Google 登入或 GitHub 授權，請先完成登入後再繼續部署。
