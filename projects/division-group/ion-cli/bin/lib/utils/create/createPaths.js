"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const models_1 = require("../models");
const log_1 = __importDefault(require("../log"));
const createPaths = (componentName, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating paths...",
        });
    const componentPaths = [
        {
            component: `./src/components/${componentName}`,
        },
    ];
    const paths = [...models_1.storybookPaths, ...models_1.rootPaths, ...componentPaths];
    try {
        paths.forEach((path) => {
            Object.entries(path).forEach(([_, value]) => {
                if (!fs_1.default.existsSync(value)) {
                    verbose &&
                        (0, log_1.default)({
                            context: "info",
                            message: `Creating path for: ${value}`,
                        });
                    fs_1.default.mkdirSync(value);
                    verbose &&
                        (0, log_1.default)({
                            context: "success",
                            message: `Path created: ${value}`,
                        });
                }
            });
        });
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "Paths created!",
            });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating paths: ${error}`,
        });
    }
};
exports.default = createPaths;
