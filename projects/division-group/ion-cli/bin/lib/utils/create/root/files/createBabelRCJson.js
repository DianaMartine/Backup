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
const child_process_1 = require("child_process");
const createBabelRCJson = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating .babelrc.json...",
        });
    try {
        yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "How do you want to create .babelrc.json?",
                choices: [
                    {
                        title: "Default",
                        value: "default",
                        description: "Create default .babelrc.json",
                    },
                    {
                        title: "Custom",
                        value: "custom",
                        description: "Create custom .babelrc.json",
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
                case "default":
                    return fs_1.default.writeFileSync("./.babelrc", `{
  "sourceType": "unambiguous",
  "presets": [
  [
  "@babel/preset-env",
  {
  "targets": {
  "chrome": 100,
  "safari": 15,
  "firefox": 91
  }
  }
  ],
  "@babel/preset-typescript"
  ],
  "plugins": [
  [
  "@babel/plugin-proposal-decorators",
  {
  "version": "legacy"
  }
  ],
  [
  "@babel/plugin-proposal-class-properties",
  {
  "loose": false
  }
  ]
  ]
  }
  `);
                case "custom":
                    return yield (0, prompts_1.default)([
                        {
                            type: "text",
                            name: "sourceType",
                            message: "Enter sourceType",
                            initial: "unambiguous",
                        },
                        {
                            type: "text",
                            name: "presets",
                            message: "Enter presets",
                            initial: `[["@babel/preset-env",{"targets": {"chrome": 100,"safari": 15,"firefox": 91}}],"@babel/preset-typescript"]`,
                        },
                        {
                            type: "multiselect",
                            name: "plugins",
                            message: "Enter plugins",
                            instructions: false,
                            hint: "- Space to select. Return to submit",
                            choices: [
                                {
                                    title: "proposal-decorators",
                                    value: "@babel/plugin-proposal-decorators",
                                    description: "To use decorators",
                                },
                                {
                                    title: "proposal-class-properties",
                                    value: "@babel/plugin-proposal-class-properties",
                                    description: "To use class properties",
                                },
                                {
                                    title: "other",
                                    value: "other",
                                    description: "To use other plugins",
                                },
                            ],
                        },
                    ], {
                        onCancel: () => {
                            return process.exit(0);
                        },
                    }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        if (res.plugins.includes("other")) {
                            return yield (0, prompts_1.default)([
                                {
                                    type: "text",
                                    name: "other",
                                    message: "Enter other plugins",
                                    initial: "",
                                    validate: (value) => value.length < 3
                                        ? `Other plugins must be at least 3 characters long`
                                        : true,
                                },
                            ], {
                                onCancel: () => {
                                    return process.exit(0);
                                },
                            }).then((other) => __awaiter(void 0, void 0, void 0, function* () {
                                let otherPlugins = other.other.split(",");
                                otherPlugins.forEach((plugin) => {
                                    (0, log_1.default)({
                                        context: "info",
                                        message: `Installing @babel/plugin-${plugin}...`,
                                    });
                                    return (0, child_process_1.execSync)(`npm i -D @babel/plugin-${plugin}`);
                                });
                                return fs_1.default.writeFileSync("./.babelrc", `{
  "sourceType": "${res.sourceType}",
  "presets": ${res.presets},
  "plugins": [
  ${res.plugins
                                    .filter((plugin) => plugin !== "other")
                                    .map((plugin) => `["${plugin}"]`)
                                    .join(",\n")},
  ${otherPlugins.map((plugin) => `["@babel/plugin-${plugin}"]`)}
  ]
  }
  `);
                            }));
                        }
                        else {
                            return fs_1.default.writeFileSync("./.babelrc", `{
  "sourceType": "${res.sourceType}",
  "presets": ${res.presets},
  "plugins": [
  ${res.plugins.map((plugin) => `["${plugin}"]`).join(",\n")}
  ]
  }`);
                        }
                    }));
                case "cancel":
                    return process.exit(0);
            }
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: ".babelrc.json created!",
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating .babelrc.json: ${error}`,
        });
    }
});
exports.default = createBabelRCJson;
