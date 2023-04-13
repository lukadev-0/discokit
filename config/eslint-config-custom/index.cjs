module.exports = {
  extends: [
    "eslint:recommended",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next/core-web-vitals",
  ],
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
  },
  plugins: ["@typescript-eslint"],
  root: true,
  overrides: [
    {
      files: ["*.mdx"],
      extends: "plugin:mdx/recommended",
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
  ],
};
