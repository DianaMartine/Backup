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
const log_1 = __importDefault(require("../../log"));
const models_1 = require("../../models");
const fs_1 = __importDefault(require("fs"));
const createRootPaths = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating root paths...",
        });
    try {
        models_1.rootPaths.forEach((path) => {
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
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating root paths: ${error}`,
        });
    }
});
exports.default = createRootPaths;
