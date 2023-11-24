/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    threads: true,
    minThreads: 1,
    maxThreads: 8,
    css: true,
    coverage: {
      all: true,
      provider: "v8",
      include: ["src/**/*.{ts}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/types.ts",
        "src/**/*.{tsx}",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/setupTest.tsx",
        "src/globalSetupTest.ts",
        "src/main.tsx",
      ],
    },
  },
});
