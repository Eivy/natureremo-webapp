import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import solid from "eslint-plugin-solid/configs/typescript";

export default [
  {
    ignores: ["dist/", "node_modules/", "app/", "src/__tests__/", "src/setupProxy.js"],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        console: "readonly",
        fetch: "readonly",
        XMLHttpRequest: "readonly",
        URL: "readonly",
        SVGSVGElement: "readonly",
        ServiceWorkerRegistration: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      ...solid.plugins,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...solid.rules,
      "no-undef": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
