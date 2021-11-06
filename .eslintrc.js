module.exports = {
  'parserOptions': {
    'ecmaVersion': 2017
  },

  env: {
    node: true
  },
  plugins: [
    'unused-imports',
    'simple-import-sort',
    'import'
  ],
  'extends': '@kibibit/eslint-config-javascript'
};
