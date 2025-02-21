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
const createMainStorybook = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating main storybook...",
        });
    try {
        yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "How do you want to create main storybook?",
                choices: [
                    {
                        title: "Default",
                        value: "default",
                        description: "Create default main storybook",
                    },
                    {
                        title: "Custom",
                        value: "custom",
                        description: "Create custom main storybook",
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
                    return fs_1.default.writeFileSync(".storybook/main.ts", `import type { StorybookConfig } from "@storybook/web-components-webpack5";
  
  const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
  "@storybook/addon-links",
  "@storybook/addon-essentials",
  "@storybook/addon-actions",
  "@storybook/addon-a11y",
  "@storybook/addon-docs",
  "@storybook/addon-styling-webpack",
  {
  name: "@storybook/addon-styling-webpack",
  options: {
  rules: [
  {
  test: /.scss$/,
  use: [
  {
  loader: "style-loader",
  options: {},
  },
  {
  loader: "css-loader",
  options: { sourceMap: true },
  },
  {
  loader: "postcss-loader",
  options: {},
  },
  {
   loader: "sass-loader",
  options: { sourceMap: true },
  },
  ],
  },
  ],
  },
  },
  ],
  framework: {
  name: "@storybook/web-components-webpack5",
  options: {},
  },
  core: {
  builder: "@storybook/builder-webpack5",
  },
  docs: {
  autodocs: "tag",
  },
  staticDirs: ["../src/styles"],
  };
  
  export default config;
  `);
                case "custom":
                    return yield (0, prompts_1.default)([
                        {
                            type: "text",
                            name: "stories",
                            message: "What is the stories path of your project?",
                            initial: "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
                        },
                        {
                            type: "multiselect",
                            name: "addons",
                            message: "What are the addons of your project?",
                            instructions: false,
                            hint: "- Space to select. Return to submit",
                            choices: [
                                {
                                    title: "Links",
                                    value: "@storybook/addon-links",
                                    description: "Links addon",
                                },
                                {
                                    title: "Essentials",
                                    value: "@storybook/addon-essentials",
                                    description: "Essentials addon",
                                },
                                {
                                    title: "Actions",
                                    value: "@storybook/addon-actions",
                                    description: "Actions addon",
                                },
                                {
                                    title: "A11y",
                                    value: "@storybook/addon-a11y",
                                    description: "A11y addon",
                                },
                                {
                                    title: "Docs",
                                    value: "@storybook/addon-docs",
                                    description: "Docs addon",
                                },
                                {
                                    title: "Styling Webpack",
                                    value: "@storybook/addon-styling-webpack",
                                    description: "Styling Webpack addon",
                                },
                            ],
                            initial: `"@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-actions", "@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-styling-webpack"`,
                            min: 1,
                        },
                        {
                            type: "text",
                            name: "framework",
                            message: "What is the framework of your project?",
                            initial: `@storybook/web-components-webpack5`,
                        },
                        {
                            type: "text",
                            name: "core",
                            message: "What is the core of your project?",
                            initial: `@storybook/builder-webpack5`,
                        },
                        {
                            type: "text",
                            name: "docs",
                            message: "What is the docs of your project?",
                            initial: `tag`,
                        },
                        {
                            type: "text",
                            name: "staticDirs",
                            message: "What are the staticDirs of your project?",
                            initial: `"../src/styles"`,
                        },
                    ], {
                        onCancel: () => {
                            return process.exit(0);
                        },
                    }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        return fs_1.default.writeFileSync(".storybook/main.ts", `import type { StorybookConfig } from "@storybook/web-components-webpack5";
  
  const config: StorybookConfig = {
  stories: ["${res.stories}"],
  addons: [
  ${String(res.addons)
                            .split(",")
                            .map((addon) => `"${addon}"`)},
  ],
  framework: {
  name: "${res.framework}",
  options: {},
  },
  core: {
  builder: "${res.core}",
  },
  docs: {
  autodocs: "${res.docs}",
  },
  staticDirs: [${res.staticDirs}],
  };
  
  export default config;
  `);
                    }));
                case "cancel":
                    return process.exit(0);
            }
            return;
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: `Main storybook created! 🎉`,
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating main storybook: ${error}`,
        });
    }
});
exports.default = createMainStorybook;
