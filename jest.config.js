module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/'],
  testRegex: '\\.spec\\.ts$',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
}