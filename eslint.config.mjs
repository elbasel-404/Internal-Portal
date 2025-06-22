import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import prettierPlugin from "eslint-plugin-prettier"
import nextPlugin from "@next/eslint-plugin-next"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import prettierConfig from "eslint-config-prettier"

export default [
  {
    ignores: [],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
    },
    extends: [
      ...tsPlugin.configs.recommended,
      ...reactHooksPlugin.configs.recommended,
      ...jsxA11yPlugin.configs.recommended,
      ...prettierConfig.extends,
    ],
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
