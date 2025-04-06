import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended, // ESLint's recommended JS rules
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser, // Define global variables for browsers
    },
    plugins: {
      react: react,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Example: Disable React in JSX scope rule
    },
  },
];
