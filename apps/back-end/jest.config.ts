import type { Config } from "jest";

const SECONDS = 1000;

const config: Config = {
  verbose: true,
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testTimeout: 180 * SECONDS,
  collectCoverageFrom: ["**/*.(t|j)s"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default config;
