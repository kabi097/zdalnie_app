module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    "vuetify",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-inner-declarations": 0,
    "vue/max-attributes-per-line": 0, 
    "vue/html-indent": 0,
    "vue/script-indent": 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
