import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

import pkg from "./package.json";
const cardSlug = process.env.CARD_SLUG || pkg.name;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, "./src/lib/index.ts"),
      name: pkg.description,
      fileName: cardSlug,
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
