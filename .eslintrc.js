module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'import'],
  'env': { // 指定脚本的运行环境
    'browser': true,
    'node': true,
    'jasmine': true
  },
  'extends': [
    'eslint:recommended',
  ],
  'rules': {
    'no-console': 'off', // console.log
    'no-unused-vars': 'off', // 枚举类报未使用的错误
    '@typescript-eslint/no-unused-vars': ['error'], //枚举类报未使用的错误
    '@typescript-eslint/semi': ['error']
  },
  'root': true,
};
