import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ["**/*.{js,mjs,cjs}"] }, // No JSX files in the backend
  { languageOptions: { globals: { 
      ...globals.node, 
      ...globals.jest, 
      ...globals.mocha  
    } 
  }},
  pluginJs.configs.recommended
];
