import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/build/**",
    "**/coverage/**",
    "**/node_modules/**",
    "**/.agents/**",
    "**/.claude/**",
    "**/.codex/**",
    "**/.cursor/**",
    "apps/api/migrations/**",
    "apps/api/src/prisma/contract.d.ts",
    "apps/api/src/prisma/contract.json",
  ]),
  {
    files: ["**/*.config.{js,mjs}", "eslint.config.mjs"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["apps/api/src/**/*.ts", "packages/contracts/src/**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
