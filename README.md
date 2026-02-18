# 產品管理系統 - React 前端專案

> 📋 此專案為求職作品展示，展現 React 開發技能與 API 整合能力

## 🚀 專案簡介

這是一個基於 React + Vite 開發的產品管理系統前端，主要功能包括產品列表展示、產品詳情查看等。專案採用現代化的前端開發技術棧，展現了 API 整合、組件化開發、響應式設計等技能。

## 🛠 技術棧

### 核心技術

- **React 19.2.0** - 前端框架
- **Vite 7.2.4** - 建構工具與開發伺服器
- **Axios** - HTTP 請求庫
- **Bootstrap 5.3.8** - UI 框架
- **Sass** - CSS 預處理器

### 開發工具

- **ESLint** - 程式碼檢查
- **Bootstrap Icons** - 圖標庫

## 📁 專案結構

```
src/
├── components/
│   └── ProductTable/          # 產品表格組件
│       ├── ProductTable.jsx   # 組件邏輯
│       └── ProductTable.scss  # 樣式文件
├── assets/
│   └── style.css              # 全局樣式
├── App.jsx                    # 應用程式入口
└── main.jsx                   # 主程式文件
```

## 🌟 主要功能

### 產品管理

- 📊 產品列表展示
- 🔍 產品詳情查看
- 💰 價格資訊顯示（原價、售價）
- ✅ 產品狀態管理（啟用/停用）

### 技術特色

- 📱 響應式設計，支援各種裝置
- 🔄 API 整合與錯誤處理
- 🎨 現代化 UI 設計
- ⚡ 高效能的 Vite 建構工具

## 🚀 開發流程記錄

### 1. 專案初始化

```bash
# 建立 Vite React 專案
npm create vite@latest react-week2 -- --template react
cd react-week2
npm install
```

### 2. 依賴套件安裝

```bash
# 安裝核心套件
npm install axios bootstrap bootstrap-icons
npm install -D sass
```

### 3. 開發階段

```bash
# 啟動開發伺服器
npm run dev

# 程式碼檢查
npm run lint
```

### 4. 產品組件開發

- 建立 `ProductTable` 組件
- 整合 Bootstrap 樣式系統
- 實作 API 資料獲取邏輯
- 新增響應式表格設計

### 5. 建構與部署

```bash
# 建構專案
npm run build

# 部署
npm run deploy

# 預覽建構結果
npm run preview
```

## 📋 指令說明

| 指令              | 說明             |
| ----------------- | ---------------- |
| `npm run dev`     | 啟動開發伺服器   |
| `npm run build`   | 建構專案         |
| `npm run lint`    | 執行 ESLint 檢查 |
| `npm run preview` | 預覽建構結果     |


## 🎯 專案亮點

1. **現代化技術棧**：使用最新的 React 19 與 Vite 建構工具
2. **組件化開發**：良好的程式碼結構與可重用性
3. **API 整合**：展現前後端協作能力
4. **響應式設計**：支援多裝置展示
5. **開發規範**：包含 ESLint 程式碼檢查

---

> **開發時間**：2026年1月  
> **開發目的**：六角學院 React 框架作品班，作品展示與技能驗證  
> **專案狀態**：持續優化中
