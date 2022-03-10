module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  plugins: [
    'svelte3',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/typescript': true,
  },
};
