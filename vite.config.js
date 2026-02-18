import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 設定 GitHub Pages 部署的 base 路徑
  base:
    process.env.NODE_ENV === "production" ? "/react-week5/" : "/",
});
 