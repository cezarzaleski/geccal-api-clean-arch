export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@geccal/core/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/$1',
    '#shared/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/@shared/$1',
    '#collection/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/collection/$1',
    '#loan/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/loan/$1',
    '#class/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/class/$1',
  }
};
