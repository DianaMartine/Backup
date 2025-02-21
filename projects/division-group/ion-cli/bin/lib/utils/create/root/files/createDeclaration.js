"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = __importDefault(require("../../../log"));
const createDeclaration = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating declaration file...",
        });
    try {
        fs_1.default.writeFileSync("./src/declaration.d.ts", `declare module '*.scss' {
const content: { [className: string]: string };
export default content;
}`);
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "Declaration file created!",
            });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating declaration file: ${error}`,
        });
    }
});
exports.default = createDeclaration;
