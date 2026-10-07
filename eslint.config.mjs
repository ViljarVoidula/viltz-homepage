import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/display-name': 0
    }
  },
  globalIgnores(['.next/**', '.kilo/**', 'public/sw.js', 'public/swe-worker-*.js', 'next-env.d.ts'])
]);
