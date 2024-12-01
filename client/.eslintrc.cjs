module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "airbnb-typescript"],
  plugins: ["react"],
  rules: {
    "no-console": "warn",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "no-underscore-dangle": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "react/require-default-props": ["off"],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
};
