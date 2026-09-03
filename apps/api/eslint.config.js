import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "migrations/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".cursor/**",
    "src/prisma/contract.d.ts",
    "src/prisma/contract.json",
  ]),
  {
    files: ["src/**/*.ts"],
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
