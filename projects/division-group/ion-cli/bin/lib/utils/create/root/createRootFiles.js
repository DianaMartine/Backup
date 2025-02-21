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
const log_1 = __importDefault(require("../../log"));
const prompts_1 = __importDefault(require("prompts"));
const models_1 = require("../../models");
const createNpmRc_1 = __importDefault(require("./files/createNpmRc"));
const createPackageJson_1 = __importDefault(require("./files/createPackageJson"));
const createBabelRCJson_1 = __importDefault(require("./files/createBabelRCJson"));
const createLicense_1 = __importDefault(require("./files/createLicense"));
const createTsConfigJson_1 = __importDefault(require("./files/createTsConfigJson"));
const createRootFiles = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Checking root files...",
        });
    !fs_1.default.existsSync(models_1.rootFiles[0].npmrc) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create .npmrc file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create .npmrc file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip .npmrc file",
                        selected: true,
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
                initial: 0,
                min: 1,
            },
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "yes":
                    return yield (0, createNpmRc_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    !fs_1.default.existsSync(models_1.rootFiles[0].packageJson) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create package.json file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create package.json file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip package.json file",
                        selected: true,
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
                initial: 0,
                min: 1,
            },
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "yes":
                    return yield (0, createPackageJson_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    !fs_1.default.existsSync(models_1.rootFiles[0].babel) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create .babelrc file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create .babelrc file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip .babelrc file",
                        selected: true,
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
                initial: 0,
                min: 1,
            },
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "yes":
                    return yield (0, createBabelRCJson_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    !fs_1.default.existsSync(models_1.rootFiles[0].license) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create LICENSE.md file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create LICENSE.md file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip LICENSE.md file",
                        selected: true,
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
                initial: 0,
                min: 1,
            },
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "yes":
                    return yield (0, createLicense_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    !fs_1.default.existsSync(models_1.rootFiles[0].tsconfig) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create tsconfig.json file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create tsconfig.json file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip tsconfig.json file",
                        selected: true,
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
                initial: 0,
                min: 1,
            },
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "yes":
                    return yield (0, createTsConfigJson_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    verbose &&
        (0, log_1.default)({
            context: "success",
            message: "Root files checked!",
        });
});
exports.default = createRootFiles;
