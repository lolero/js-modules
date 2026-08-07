module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // React Compiler must run before the RN preset lowers JSX.
  plugins: ['babel-plugin-react-compiler'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
