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
const prompts_1 = __importDefault(require("prompts"));
const createNpmRc = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating .npmrc file...",
        });
    try {
        yield (0, prompts_1.default)([
            {
                type: "text",
                name: "registry",
                message: "Registry username:",
                initial: "some-username",
                validate: (value) => {
                    const pattern = /^[a-z0-9_-]{3,16}$/;
                    return pattern.test(value) ? true : "Invalid username!";
                },
            },
            {
                type: "text",
                name: "url",
                message: "URL:",
                initial: "https://npm.pkg.github.com",
                validate: (value) => {
                    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                    return pattern.test(value) ? true : "Invalid URL!";
                },
            },
            {
                type: "text",
                name: "token",
                message: "Token:",
                initial: "${GITHUB_TOKEN}",
            },
        ], {
            onCancel: () => {
                process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, prompts_1.default)([
                {
                    type: "select",
                    name: "options",
                    message: `Confirm data:\n\nRegistry username: ${res.registry}\nURL: ${res.url}\nToken: ${res.token}\n\n`,
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
                        },
                        {
                            title: "Cancel",
                            value: "cancel",
                            description: "Cancel process",
                        },
                    ],
                    initial: 0,
                    min: 1,
                },
            ], {
                onCancel: () => {
                    process.exit(0);
                },
            }).then((confirm) => __awaiter(void 0, void 0, void 0, function* () {
                switch (confirm.options) {
                    case "yes":
                        let npmrc = `${String(res.registry).includes("@") ? "" : "@"}${res.registry}:registry=${res.url}\n//${res.url}/:_authToken=${res.token}`;
                        return fs_1.default.writeFileSync(".npmrc", npmrc);
                    case "no":
                        yield createNpmRc(verbose);
                    case "cancel":
                        process.exit(0);
                }
            }));
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: ".npmrc file created!",
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error creating .npmrc file: ${error}`,
        });
    }
});
exports.default = createNpmRc;
