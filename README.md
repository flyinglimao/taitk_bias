# 說明
## 專案架構
> / dist - 編譯完成的網站
> / public - 固定提供的網站內容
> / src - 網站主體
> /-/ assets - 素材檔案
> /-/ components - 元件資料夾
> /-/-- *.vue or *.js - 元件
> /-- App.vue - 網站核心
> /-- main.js - 網站邏輯的進入點
> /-- router.js - 路由定義
> /-- *.model.js - 資料模型定義

## 開發操作
執行
```
npm install
```
運行
```
npm run serve
```
編譯
```
npm run build
```

## Vue 檔案結構說明
Vue 檔案具有 template、script、css 三部分，分別為元件的 HTML、腳本與樣式定義。

## 開發說明
1. App.vue 由兩個主要元件構成，左方是文章導航的 PostNav 元件，右方則根據 Router 設定顯示不同的元件
2. Router 顯示的元件可以在 router.js 中看到，path 指明對應的路徑，component 則指明使用的元件
3. 目前都使用 Post 元件，可以在 components/Post.vue 看到
4. 在 Post 中，將會讀入文章內容，並建立五個 PostMask
5. PostMask 會依照 data() 下的 mask 數量建立，並使用 keymap 作為快捷鍵、colorset 作為背景顏色