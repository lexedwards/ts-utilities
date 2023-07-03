import type { Config } from 'jest'

const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  //Override Jests `__test__` co-location scheme for tests
  testMatch: ['<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)'],

  // Use swc to transform files
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },

  // Path transformation mapped from tsconfig.json
  moduleNameMapper: {
    '^~/(.*)$': `<rootDir>/$1`,
  },

  // State explicitly what tests were ran
  verbose: true,
}

export default config
