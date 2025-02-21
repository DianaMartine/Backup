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
const child_process_1 = require("child_process");
const createStorybookFiles_1 = __importDefault(require("../utils/create/storybook/createStorybookFiles"));
const createStorybookPaths_1 = __importDefault(require("../utils/create/storybook/createStorybookPaths"));
const log_1 = __importDefault(require("../utils/log"));
const configStorybookScript = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Configuring Storybook...",
        });
    try {
        yield (0, createStorybookPaths_1.default)(verbose);
        yield (0, createStorybookFiles_1.default)(verbose);
        (0, child_process_1.execSync)(`npx prettier --write './.storybook'`);
        (0, log_1.default)({
            context: "success",
            message: `Storybook configured! 🎉`,
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while configuring Storybook: ${error}`,
        });
    }
});
exports.default = configStorybookScript;
