import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    preset: 'ts-jest',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
