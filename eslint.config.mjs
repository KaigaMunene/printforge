import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base recommended configuration
  js.configs.recommended,

  // Next.js configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier configuration (must be last to override other configs)
  prettierConfig,

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

  // TypeScript configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },

  // Airbnb-style rules for JavaScript/TypeScript/React
  {
    plugins: {
      prettier,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Airbnb-style JavaScript/TypeScript rules - Complete Implementation

      // Types (Airbnb 1.1)
      "no-new-object": "error",
      "no-array-constructor": "error",
      "no-new-wrappers": "error",

      // References (Airbnb 2.1-2.3)
      "no-unused-vars": "off", // Use TypeScript version instead
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "no-const-assign": "error",
      "prefer-destructuring": [
        "error",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Objects (Airbnb 3.1-3.8)
      "object-shorthand": "error",
      "quote-props": ["error", "as-needed"],
      "no-prototype-builtins": "error",
      "prefer-object-spread": "error",
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: {
            minProperties: 4,
            multiline: true,
            consistent: true,
          },
          ObjectPattern: {
            minProperties: 4,
            multiline: true,
            consistent: true,
          },
        },
      ],

      // Arrays (Airbnb 4.1-4.6)
      "no-array-constructor": "error",
      "array-callback-return": "error",
      "prefer-destructuring": [
        "error",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "prefer-spread": "error",

      // Destructuring (Airbnb 5.1-5.3)
      "prefer-destructuring": [
        "error",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Strings (Airbnb 6.1-6.4)
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "no-eval": "error",

      // Functions (Airbnb 7.1-7.15)
      "wrap-iife": ["error", "outside"],
      "no-loop-func": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-confusing-arrow": "error",
      "no-useless-constructor": "error",
      "no-duplicate-imports": "error",
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-webpack-loader-syntax": "error",

      // Arrow Functions (Airbnb 8.1-8.4)
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-confusing-arrow": "error",

      // Classes & Constructors (Airbnb 9.1-9.4)
      "no-useless-constructor": "error",
      "class-methods-use-this": "error",

      // Modules (Airbnb 10.1-10.6)
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],

      // Iterators & Generators (Airbnb 11.1-11.3)
      "no-iterator": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        },
        {
          selector: "ForOfStatement",
          message:
            "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
        },
        {
          selector: "LabeledStatement",
          message:
            "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
        },
        {
          selector: "WithStatement",
          message:
            "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
        },
      ],

      // Properties (Airbnb 12.1-12.3)
      "dot-notation": "error",
      "computed-property-spacing": "error",

      // Variables (Airbnb 13.1-13.8)
      "no-unused-vars": "off", // Use TypeScript version
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
      "no-alert": "error",
      "no-debugger": "error",

      // Hoisting (Airbnb 14.1-14.4)
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],

      // Comparison Operators & Equality (Airbnb 15.1-15.8)
      eqeqeq: ["error", "always"],
      "no-case-declarations": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-mixed-operators": "error",

      // Blocks (Airbnb 16.1-16.3)
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "no-else-return": "error",
      "no-continue": "error",
      "no-labels": "error",

      // Comments (Airbnb 17.1-17.3)
      "spaced-comment": ["error", "always"],

      // Whitespace (Airbnb 18.1-18.12)
      indent: ["error", 2],
      "keyword-spacing": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "eol-last": "error",
      "newline-per-chained-call": "error",
      "no-whitespace-before-property": "error",
      "padded-blocks": ["error", "never"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
        },
      ],
      "comma-spacing": "error",
      "comma-style": "error",
      "computed-property-spacing": "error",
      "func-call-spacing": "error",
      "key-spacing": "error",
      "no-trailing-spaces": "error",
      semi: ["error", "always"],
      "semi-spacing": "error",
      "semi-style": "error",

      // React rules (Airbnb-style)
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off", // Using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/no-unescaped-entities": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-wrap-multilines": "off",
      "react/jsx-curly-newline": "off",
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",
      "react/jsx-max-props-per-line": "off",
      "react/jsx-first-prop-new-line": "off",
      "react/jsx-closing-bracket-location": "off",
      "react/jsx-closing-tag-location": "off",
      "react/jsx-curly-spacing": "off",
      "react/jsx-equals-spacing": "off",
      "react/jsx-tag-spacing": "off",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility rules
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",

      // Prettier integration
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
