"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createComponent_1 = __importDefault(require("./component/createComponent"));
const createSass_1 = __importDefault(require("./component/createSass"));
const createSpec_1 = __importDefault(require("./component/createSpec"));
const createStories_1 = __importDefault(require("./component/createStories"));
const createBabelRCJson_1 = __importDefault(require("./root/files/createBabelRCJson"));
const createLicense_1 = __importDefault(require("./root/files/createLicense"));
const createTsConfigJson_1 = __importDefault(require("./root/files/createTsConfigJson"));
const switchCreateFunction = (value, componentName, attrs, verbose) => {
    if (value === "./.npmrc" || value === "./package.json")
        return;
    switch (value) {
        case "./.babelrc.json":
            return (0, createBabelRCJson_1.default)(verbose);
        case "./LICENSE.md":
            return (0, createLicense_1.default)(verbose);
        case "./tsconfig.json":
            return (0, createTsConfigJson_1.default)(verbose);
        case "./.storybook/main.ts":
        // return createMainStorybook(value, verbose);
        case "./.storybook/manager.ts":
        // return createManagerStorybook(value, verbose);
        case "./.storybook/preview.ts":
        // return createPreviewStorybook(value, verbose);
        case "./.storybook/theme.ts":
        // return createThemeStorybook(value, verbose);
        case "./src/index.ts":
        // return createIndex(value, componentName, verbose);
        case "./src/styles/tokens.scss":
        // return createIndexStyles(value, componentName);
        case "./src/global.d.ts":
        // return createGlobalTypes(value, verbose);
        case "./src/declaration.d.ts":
        // return createDeclaration(value, verbose);
        case "./src/components/" + componentName + "/index.ts":
            return (0, createComponent_1.default)(value, componentName, attrs, verbose);
        case "./src/components/" + componentName + "/" + componentName + ".scss":
            return (0, createSass_1.default)(value, componentName, verbose);
        case "./src/components/" +
            componentName +
            "/" +
            componentName +
            ".stories.ts":
            return (0, createStories_1.default)(value, componentName, attrs, verbose);
        case "./src/components/" + componentName + "/" + componentName + ".spec.ts":
            return (0, createSpec_1.default)(value, componentName, attrs, verbose);
        default:
            break;
    }
};
exports.default = switchCreateFunction;
