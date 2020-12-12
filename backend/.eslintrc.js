module.exports = {
  env: {
    node: true
  },
  rules: {
    "no-console": "off",
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};

