import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: `/mui-jalali-calendar`,
  plugins: [react()],
});
