import { defineConfig, globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist/**/*', 'build/**/*', 'src/infra/database/generated/**/*']),
    pluginJs.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
]);
