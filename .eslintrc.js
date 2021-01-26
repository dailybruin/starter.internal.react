module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/extensions": 0,
    "no-use-before-define": 0,
    "arrow-body-style": 0,
    "no-unused-vars": 0,
    quotes: [2, "double", "avoid-escape"],
    "react/prop-types": 0,
    "no-debugger": 0,
    "no-unused-expressions": 0,
  },
};
