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
    '#acervo/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/acervo/$1',
    '#book/(.*)$': '<rootDir>/../../../node_modules/@geccal/core/dist/book/$1',
  }
};
