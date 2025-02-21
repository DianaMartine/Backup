"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const checkIfFileExists = (file) => {
    if (fs_1.default.existsSync(file)) {
        return true;
    }
    else {
        return false;
    }
};
exports.default = checkIfFileExists;
