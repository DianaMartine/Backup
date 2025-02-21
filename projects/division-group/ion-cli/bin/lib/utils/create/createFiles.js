"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./../models");
const createPaths_1 = __importDefault(require("./createPaths"));
const hasInExports_1 = __importDefault(require("../test/hasInExports"));
const switchCreateFunction_1 = __importDefault(require("./switchCreateFunction"));
const log_1 = __importDefault(require("../log"));
const createFiles = (componentName, attrs, verbose) => {
    (0, createPaths_1.default)(componentName, verbose);
    const componentFiles = [
        {
            component: `./src/components/${componentName}/index.ts`,
            sass: `./src/components/${componentName}/${componentName}.scss`,
            stories: `./src/components/${componentName}/${componentName}.stories.ts`,
            test: `./src/components/${componentName}/${componentName}.spec.ts`,
        },
    ];
    // //   if (fs.existsSync(componentFiles[0].indexComponent)) {
    // //     throw new Error("Component already exists");
    // //   }
    const files = [
        ...models_1.rootFiles,
        ...models_1.storybookFiles,
        ...models_1.srcFiles,
        ...componentFiles,
    ];
    try {
        files.forEach((file) => {
            Object.entries(file).forEach(([_, value]) => {
                (0, switchCreateFunction_1.default)(value, componentName, attrs, verbose);
            });
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating files: ${error}`,
        });
    }
    (0, hasInExports_1.default)(componentName, models_1.srcFiles[0].index);
};
exports.default = createFiles;
