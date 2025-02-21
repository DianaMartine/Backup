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
const createDeclaration_1 = __importDefault(require("../utils/create/root/files/createDeclaration"));
const createGlobalTypes_1 = __importDefault(require("../utils/create/root/files/createGlobalTypes"));
const createIndex_1 = __importDefault(require("../utils/create/root/files/createIndex"));
const createIndexStyles_1 = __importDefault(require("../utils/create/root/files/createIndexStyles"));
const createRootFiles_1 = __importDefault(require("../utils/create/root/createRootFiles"));
const createRootPaths_1 = __importDefault(require("../utils/create/root/createRootPaths"));
const log_1 = __importDefault(require("../utils/log"));
const checkDependencies_1 = __importDefault(require("../utils/test/checkDependencies"));
const dependencies_1 = require("../utils/dependencies");
const child_process_1 = require("child_process");
const initScript = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Initializing project...",
        });
    try {
        yield (0, createRootFiles_1.default)(verbose);
        yield (0, createRootPaths_1.default)(verbose);
        yield (0, createDeclaration_1.default)(verbose);
        yield (0, createGlobalTypes_1.default)(verbose);
        yield (0, createIndex_1.default)(undefined, verbose);
        yield (0, createIndexStyles_1.default)(verbose);
        yield (0, checkDependencies_1.default)(dependencies_1.DependenciesModel.dependencies, dependencies_1.DependenciesModel.devDependencies, verbose);
        (0, child_process_1.execSync)(`npx prettier --write '.'`);
        (0, log_1.default)({
            context: "success",
            message: `Project initialized! 🎉`,
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error: ${error}`,
        });
    }
});
exports.default = initScript;
