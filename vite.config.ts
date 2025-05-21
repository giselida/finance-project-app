import path from "path";
import { configDefaults, defineConfig } from "vitest/config"; // IMPORTANTE: de 'vitest/config'

const pathSrc = path.resolve(__dirname, "./src");

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["node_modules", `${pathSrc}/scss`],
      },
    },
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    coverage: {
      provider: "v8", // usa o @vitest/coverage-v8
      reporter: ["text", "html", "lcov"], // importante incluir 'html'
      reportsDirectory: "./coverage",
      all: true,
      include: ["src/**/*.{ts,js}"],
    },
  },
});
