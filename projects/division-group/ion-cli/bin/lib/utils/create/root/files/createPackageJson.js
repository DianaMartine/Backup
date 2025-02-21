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
const prompts_1 = __importDefault(require("prompts"));
const log_1 = __importDefault(require("../../../log"));
const child_process_1 = require("child_process");
const createPackageJson = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating package.json file...",
        });
    try {
        yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "How do you want to create package.json?",
                choices: [
                    {
                        title: "Default",
                        value: "default",
                        description: "Create default package.json",
                    },
                    {
                        title: "Custom",
                        value: "custom",
                        description: "Create custom package.json",
                    },
                    { title: "Cancel", value: "cancel", description: "Cancel process" },
                ],
            },
        ], {}).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "default":
                    return (0, child_process_1.execSync)(`npm init -y`);
                case "custom":
                    return yield (0, prompts_1.default)([
                        {
                            type: "text",
                            name: "name",
                            message: "Name:",
                            initial: "some-name",
                        },
                        {
                            type: "text",
                            name: "version",
                            message: "Version:",
                            initial: "1.0.0",
                        },
                        {
                            type: "text",
                            name: "description",
                            message: "Description:",
                            initial: "Some description",
                        },
                        {
                            type: "text",
                            name: "entry",
                            message: "Entry point:",
                            initial: "index.js",
                        },
                        {
                            type: "text",
                            name: "test",
                            message: "Test command:",
                            initial: "npm test",
                        },
                        {
                            type: "text",
                            name: "repository",
                            message: "Repository:",
                            initial: "",
                        },
                        {
                            type: "text",
                            name: "keywords",
                            message: "Keywords:",
                            initial: "",
                        },
                        {
                            type: "text",
                            name: "author",
                            message: "Author:",
                            initial: "Some author",
                        },
                        {
                            type: "text",
                            name: "license",
                            message: "License:",
                            initial: "MIT",
                        },
                    ], {
                        onCancel: () => {
                            return process.exit(0);
                        },
                    }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        return yield (0, prompts_1.default)([
                            {
                                type: "select",
                                name: "options",
                                message: `Confirm data:\n\nName: ${res.name}\nVersion: ${res.version}\nDescription: ${res.description}\nEntry point: ${res.entry}\nTest command: ${res.test}\nRepository: ${res.repository}\nKeywords: ${res.keywords}\nAuthor: ${res.author}\nLicense: ${res.license}\n\n`,
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
                                    let packageJson = `{
"name": "${res.name}",
"version": "${res.version}",
"description": "${res.description}",
"main": "${res.entry}",
"scripts": {
"test": "${res.test}"
},
"repository": "${res.repository}",
"keywords": [
"${res.keywords}"
],
"author": "${res.author}",
"license": "${res.license}"
}`;
                                    return fs_1.default.writeFileSync("package.json", packageJson);
                                case "no":
                                    yield createPackageJson(verbose);
                                case "cancel":
                                    process.exit(0);
                            }
                        }));
                    }));
                case "cancel":
                    return process.exit(0);
            }
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "package.json file created!",
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error creating package.json file: ${error}`,
        });
    }
});
exports.default = createPackageJson;
