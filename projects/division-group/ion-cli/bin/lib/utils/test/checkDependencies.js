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
const child_process_1 = require("child_process");
const log_1 = __importDefault(require("../log"));
const prompts_1 = __importDefault(require("prompts"));
const checkDependencies = (dependencies, devDependencies, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    (0, log_1.default)({
        context: "info",
        message: "Checking dependencies",
    });
    yield (0, prompts_1.default)([
        {
            type: "select",
            name: "options",
            message: "Do you want to check dependencies?",
            choices: [
                {
                    title: "Yes",
                    value: "yes",
                    description: "Check dependencies",
                },
                {
                    title: "No",
                    value: "no",
                    description: "Skip dependencies",
                    selected: true,
                },
                { title: "Cancel", value: "cancel", description: "Cancel process" },
            ],
        },
    ], {
        onCancel: () => {
            return process.exit(0);
        },
    }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        switch (res.options) {
            case "yes":
                try {
                    const packageJson = fs_1.default.readFileSync("package.json", "utf-8");
                    dependencies.forEach((dependency) => {
                        if (!packageJson.includes(dependency)) {
                            verbose &&
                                (0, log_1.default)({
                                    context: "warning",
                                    message: `Installing ${dependency}...`,
                                });
                            (0, child_process_1.execSync)(`npm i ${dependency}`);
                        }
                    });
                    devDependencies.forEach((dependency) => {
                        if (!packageJson.includes(dependency)) {
                            verbose &&
                                (0, log_1.default)({
                                    context: "warning",
                                    message: `Installing ${dependency}...`,
                                });
                            (0, child_process_1.execSync)(`npm i -D ${dependency}`);
                        }
                    });
                    verbose &&
                        (0, log_1.default)({
                            context: "success",
                            message: "Dependencies checked!",
                        });
                }
                catch (error) {
                    verbose &&
                        (0, log_1.default)({
                            context: "error",
                            message: `Error while checking dependencies: ${error}`,
                        });
                }
            case "no":
                return;
            case "cancel":
                return process.exit(0);
        }
    }));
    return true;
});
exports.default = checkDependencies;
