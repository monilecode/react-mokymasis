const { pathsToModuleNameMapper } = require("ts-jest");
const { readFileSync } = require("fs");
const { resolve } = require("path");

const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, "./tsconfig.json"), "utf-8")
);

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-css-modules-transform",
  },
};
