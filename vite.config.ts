import path from "path";
import { defineConfig } from "vite";
const pathSrc = path.resolve(__dirname, "./src");

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["node_modules", `${pathSrc}/scss`],
      },
    },
  },
});
