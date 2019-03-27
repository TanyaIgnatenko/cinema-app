const jestConfig = {
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/src/test/scss-mock',
    '\\.svg$': '<rootDir>/src/test/svg-mock',
  },
  testRegex: '/__tests__/.*.test.js$',
};

module.exports = jestConfig;
