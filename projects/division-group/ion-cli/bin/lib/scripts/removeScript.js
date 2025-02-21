"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfFileExists_1 = __importDefault(require("../utils/test/checkIfFileExists"));
const checkComponentName_1 = __importDefault(require("../utils/test/checkComponentName"));
const prepareComponentName_1 = __importDefault(require("../utils/string/prepareComponentName"));
const fs_1 = __importDefault(require("fs"));
const log_1 = __importDefault(require("../utils/log"));
const unlinkFile = (path, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: `Removing ${path}...`,
        });
    (0, checkIfFileExists_1.default)(path);
    fs_1.default.unlinkSync(path);
};
const removeFolder = (path, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: `Removing ${path}...`,
        });
    fs_1.default.rmdirSync(path);
};
const replaceInFile = (path, componentName, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: `Replacing ${componentName} in ${path}...`,
        });
    if ((0, checkIfFileExists_1.default)(path)) {
        let data = fs_1.default.readFileSync(path, "utf8");
        let regexImport = new RegExp(`export { default as ${componentName} } from "./components/${componentName}";\n`);
        data = data.replace(regexImport, "");
        fs_1.default.writeFileSync(path, data, "utf8");
    }
};
const removeScript = (componentName, verbose) => {
    (0, checkComponentName_1.default)(componentName, verbose);
    componentName = (0, prepareComponentName_1.default)(componentName);
    const paths = [
        {
            component: `./src/components/${componentName}/index.ts`,
            stories: `./src/components/${componentName}/${componentName}.stories.ts`,
            test: `./src/components/${componentName}/${componentName}.spec.ts`,
            styles: `./src/components/${componentName}/${componentName}.scss`,
            folder: `./src/components/${componentName}`,
        },
    ];
    try {
        paths.forEach((path) => {
            if (!path.folder.includes("index.ts")) {
                unlinkFile(path.component, verbose);
                unlinkFile(path.stories, verbose);
                unlinkFile(path.test, verbose);
                unlinkFile(path.styles, verbose);
                removeFolder(path.folder, verbose);
            }
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error: ${error}`,
        });
    }
    const indexes = [
        {
            index: "./src/index.ts",
        },
    ];
    try {
        indexes.forEach((index) => {
            replaceInFile(index.index, componentName, verbose);
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error: ${error}`,
        });
    }
};
exports.default = removeScript;
