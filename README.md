# 2026 宇宙科技公司員工旅遊

活動報名網站，採用靜態 HTML + CSS + JavaScript，並預留 Google Apps Script Web App 端點以將報名資料同步至 Google Sheet：`2026_公司旅遊`。

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

1. 在 Google Sheet 中開啟 Apps Script 編輯器。
2. 建立 `appsscript.json` 與 `Code.gs` 內容，並將 Sheet 名稱設定為 `2026_公司旅遊`。
3. 部署為網頁應用程式 (Web App)。
4. 取得 Web App URL，並替換 `script.js` 中的 `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`。
5. 確認 `手機` 欄位使用文字格式，避免前綴 0 被轉為數字。

## 主要檔案

- `index.html`：活動首頁與報名表單
- `styles.css`：RWD 排版與風格設計
- `script.js`：輪播圖與表單送出邏輯
- `cover.jpg`：16:9 活動封面圖
- `Code.gs`：Google Apps Script 寫入資料到 Sheet

## 注意事項

- 不要將 `spec/` 資料夾推送至 GitHub repo。
- 若需要 Google 登入或 GitHub 授權，請先完成登入後再繼續部署。
