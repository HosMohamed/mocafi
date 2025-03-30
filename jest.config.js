module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@core/(.*)$": "<rootDir>/src/app/core/$1",
    "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
    "^@env$": "<rootDir>/src/environments/environment",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
