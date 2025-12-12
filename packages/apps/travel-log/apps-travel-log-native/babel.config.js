module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
