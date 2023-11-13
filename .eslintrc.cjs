module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'plugin:react/jsx-runtime', 'prettier', 'import-resolver-alias'],
  parserOptions: {
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
};
