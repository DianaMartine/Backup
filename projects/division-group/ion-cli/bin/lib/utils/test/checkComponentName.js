"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../log"));
const regexModels_1 = __importDefault(require("../string/regexModels"));
const checkComponentName = (componentName, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Checking component name",
        });
    if (!componentName) {
        (0, log_1.default)({
            context: "error",
            message: "Component name is required",
        });
        return false;
    }
    if (RegExp(regexModels_1.default.emptyString).exec(componentName) ||
        RegExp(regexModels_1.default.comma).exec(componentName) ||
        RegExp(regexModels_1.default.colon).exec(componentName) ||
        RegExp(regexModels_1.default.twoSpaces).exec(componentName) ||
        RegExp(regexModels_1.default.dashes).exec(componentName) ||
        RegExp(regexModels_1.default.twoDashes).exec(componentName) ||
        RegExp(regexModels_1.default.numbers).exec(componentName) ||
        RegExp(regexModels_1.default.symbols).exec(componentName) ||
        RegExp(regexModels_1.default.underscore).exec(componentName) ||
        RegExp(regexModels_1.default.whitespace).exec(componentName) ||
        RegExp(regexModels_1.default.undefined).exec(componentName)) {
        throw new Error(`
    
    Invalid component name: ${componentName}

    Component name must:
    ion add <component-name>

    - Be a string
    - Not contain spaces
    - Not contain numbers
    - Not contain symbols
    - Not contain underscores
    - Not contain colons
    - Not contain commas
    - Not contain double dashes
    - Not whitespace

    <component-name> is required, and must:
    - componentName
    - componentname
    `);
    }
    verbose &&
        (0, log_1.default)({
            context: "success",
            message: "Component name checked!",
        });
    return true;
};
exports.default = checkComponentName;
