module.exports = {
  root: true,
  extends: [
    "plugin:prettier/recommended",
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
}
