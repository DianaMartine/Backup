"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importStar(require("fs"));
const log_1 = __importDefault(require("../../../log"));
const licenses_json_1 = __importDefault(require("../../../../assets/licenses.json"));
const prompts_1 = __importDefault(require("prompts"));
const path_1 = __importDefault(require("path"));
const createLicense = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating LICENSE.md...",
        });
    try {
        yield (0, prompts_1.default)({
            type: "select",
            name: "license",
            message: "License:",
            choices: licenses_json_1.default.map((l) => {
                return {
                    title: l.name,
                    value: l.name,
                    description: l.description,
                };
            }),
            initial: 0,
            min: 1,
        }, {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let license = `${(_a = licenses_json_1.default.find((l) => l.name === res.license)) === null || _a === void 0 ? void 0 : _a.content}`;
            let keys = [
                {
                    name: "year",
                    keys: ["<year>", "[yyyy]", "[year]"],
                },
                {
                    name: "yearWithAuthor",
                    keys: [" year name of author"],
                },
                {
                    name: "author",
                    keys: ["<name of author>"],
                },
                {
                    name: "project",
                    keys: ["[name of copyright owner]", "[fullname]", "<program>"],
                },
                {
                    name: "projectWithDescription",
                    keys: [
                        "<one line to give the program's name and a brief idea of what it does.>",
                        "<one line to give the library's name and a brief idea of what it does.>",
                    ],
                },
            ];
            keys.forEach((key) => {
                switch (key.name) {
                    case "year":
                        return key.keys.map((k) => {
                            for (let i = 0; i < 2; i++) {
                                license = license.replace(k, `${new Date().getFullYear() + i}`);
                            }
                        });
                    case "yearWithAuthor":
                        return key.keys.forEach((k) => {
                            let author = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(process.cwd(), "package.json"), "utf-8")).author;
                            license = license.replace(k, ` ${new Date().getFullYear().toString()} ${author}`);
                        });
                    case "author":
                        return key.keys.map((k) => {
                            for (let i = 0; i < 2; i++) {
                                license = license.replace(k, JSON.parse((0, fs_1.readFileSync)(path_1.default.join(process.cwd(), "package.json"), "utf-8")).author);
                            }
                        });
                    case "project":
                        return key.keys.forEach((k) => {
                            let name = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(process.cwd(), "package.json"), "utf-8")).name;
                            license = license.replace(k, `${String(name).charAt(0).toUpperCase() +
                                String(name).slice(1).replace(/-/g, " ")}`);
                        });
                    case "projectWithDescription":
                        return key.keys.forEach((k) => {
                            let name = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(process.cwd(), "package.json"), "utf-8")).name;
                            let description = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(process.cwd(), "package.json"), "utf-8")).description;
                            license = license.replace(k, `${String(name).charAt(0).toUpperCase() +
                                String(name).slice(1).replace(/-/g, " ")} - ${description}`);
                        });
                }
            });
            fs_1.default.writeFileSync("./LICENSE.md", license);
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "LICENSE.md created!",
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating LICENSE.md: ${error}`,
        });
    }
});
exports.default = createLicense;
