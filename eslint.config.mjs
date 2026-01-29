import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['server.js'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'script', // <- CommonJS: permite require/module
    },
  },
]);
