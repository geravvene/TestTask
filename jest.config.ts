export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/svgrMock.ts",
    '\\.(gif|ttf|eot|png)$': '<rootDir>/fileMock.ts',
    '\\.(css|less|sass|scss)$': '<rootDir>/styleMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@svg/(.*)$': '<rootDir>/assets/svg/$1',
  },
};
