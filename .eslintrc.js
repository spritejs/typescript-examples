module.exports = {
  globals: {
      doodles: true,
  },
  plugins: ['html'],
  extends:  "eslint-config-sprite",
  overrides: [{
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
          ecmaVersion: 2018,
          sourceType: "module",
          ecmaFeatures: {
              "modules": true
          },
          project: "./tsconfig.json"
      },
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ['@typescript-eslint'],
      rules: {
          // 禁止使用 var
          'no-var': "error",
          // 优先使用 interface 而不是 type
          '@typescript-eslint/consistent-type-definitions': [
              "error",
              "interface"
          ]
      }
  }],
}