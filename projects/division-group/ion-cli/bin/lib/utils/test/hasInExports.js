"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const hasInExports = (component, index) => {
    const data = fs_1.default.readFileSync(index, "utf8");
    const regexImport = new RegExp(`export { default as ${component} } from "./components/${component}"`);
    if (!regexImport.test(data)) {
        fs_1.default.appendFileSync(index, `export { default as ${component} } from "./components/${component}";\n`);
    }
};
exports.default = hasInExports;
