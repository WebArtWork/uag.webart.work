module.exports = {
	preset: 'jest-preset-angular',
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '<rootDir>/tests/'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|mjs|html|js)$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	testMatch: ['**/+(*.)+(spec).+(ts)'],
};
