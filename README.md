# 五子棋遊戲

這是一個五子棋 PWA 遊戲，包含：

- `五子棋.html`：主要遊戲頁面
- `index.html`：ASCII 檔名副本，用於 GitHub Pages 兼容
- `gomoku.html`：另一個 ASCII 檔名副本
- `manifest.json`：PWA 應用設定
- `service-worker.js`：離線快取支持

## 如何部署

1. 在 GitHub 建立一個新的 repository。
2. 將本地 repo 推送到 GitHub：

```bash
git remote add origin https://github.com/<你的帳號>/<你的repo>.git
git branch -M main
git push -u origin main
```

3. 在 GitHub repository 的 `Settings > Pages` 中，將來源設定為 `main` 分支的 `/ (root)`。
4. 開啟 `https://<你的帳號>.github.io/<你的repo>/index.html`。

## iPhone 使用方式

1. 在 Safari 打開 GitHub Pages 網址。
2. 點分享按鈕，選擇「加入主畫面」。
3. 即可當成手機 App 使用。
