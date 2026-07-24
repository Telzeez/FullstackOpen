import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
export default [
  js.configs.recommended,
  {
    plugins:{
      '@stylistic/js': stylisticJs,
    },
rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }, 
    files: ['**/*.js'],
ignores: ['dist/**'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
  },
]