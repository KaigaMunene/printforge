import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Base ESLint rules
  js.configs.recommended,

  // Next.js recommended config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier should come last to disable formatting conflicts
  prettierConfig,

  {
    plugins: {
      prettier,
    },
    rules: {
      // Let Prettier handle formatting
      "prettier/prettier": "error",

      // Next.js + TS tweaks
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Using TypeScript
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
];
