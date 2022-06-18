export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '#shared/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/@shared/$1',
    '#collection/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/collection/$1',
    '#loan/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/loan/$1',
  }
};
