import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // All icons must go through the central registry (src/lib/icons.ts) so
      // every glyph is declared once and never silently duplicated.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@tabler/icons-react',
              message:
                'Import icons from "@/lib/icons" (Icon / Ui) instead of @tabler/icons-react directly.',
            },
          ],
          patterns: [
            {
              group: ['@fortawesome/*'],
              message:
                'FontAwesome is removed. Use the icon registry in src/lib/icons.ts.',
            },
          ],
        },
      ],
    },
  },
  {
    // The icon registries are the only places allowed to import icons directly.
    files: ['src/lib/icons.ts', 'src/lib/highlightIcons.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
])
