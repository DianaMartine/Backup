"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../log"));
const regexModels_1 = __importDefault(require("../string/regexModels"));
const checkAttributes = (attrs, verbose) => {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Checking attributes",
        });
    if (RegExp(regexModels_1.default.emptyString).exec(attrs) ||
        RegExp(regexModels_1.default.twoSpaces).exec(attrs) ||
        RegExp(regexModels_1.default.dashes).exec(attrs) ||
        RegExp(regexModels_1.default.twoDashes).exec(attrs) ||
        RegExp(regexModels_1.default.numbers).exec(attrs) ||
        RegExp(regexModels_1.default.symbols).exec(attrs) ||
        RegExp(regexModels_1.default.underscore).exec(attrs) ||
        RegExp(regexModels_1.default.whitespace).exec(attrs) ||
        RegExp(regexModels_1.default.undefined).exec(attrs)) {
        throw new Error(`
        
        Invalid attributes: ${attrs}

        Attributes must:
        - Be a string
        - Not contain spaces
        - Not contain numbers
        - Not contain symbols
        - Not contain underscores
        - Not contain commas
        - Not contain double dashes
        - Not whitespace

        Must:
        - attrs:type \tone attribute
        - attrs:type,anotherAttr:anotherType \ttwo attributes or more

        Example:
        - label:string
        - label:string,placeholder:string
        - label:string,placeholder:string,disabled:boolean
        `);
    }
    verbose &&
        (0, log_1.default)({
            context: "success",
            message: "Attributes checked!",
        });
    return true;
};
exports.default = checkAttributes;
