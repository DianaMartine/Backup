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
const createPreviewStorybook = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating preview storybook...",
        });
    yield (0, prompts_1.default)([
        {
            type: "select",
            name: "options",
            message: "How do you want to create preview storybook?",
            choices: [
                {
                    title: "Default",
                    value: "default",
                    description: "Create default preview storybook",
                },
                {
                    title: "Custom",
                    value: "custom",
                    description: "Create custom preview storybook",
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
                return fs_1.default.writeFileSync(".storybook/preview.ts", `import { Preview } from "@storybook/web-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`);
            case "custom":
                yield (0, prompts_1.default)([
                    {
                        type: "toggle",
                        name: "theme",
                        message: "Do you want to add theme?",
                        initial: false,
                        active: "yes",
                        inactive: "no",
                    },
                    {
                        type: "select",
                        name: "layout",
                        message: "Select layout",
                        choices: [
                            {
                                title: "Centered",
                                value: "centered",
                                description: "Centered layout",
                            },
                            {
                                title: "Fullscreen",
                                value: "fullscreen",
                                description: "Fullscreen layout",
                            },
                            {
                                title: "Padded",
                                value: "padded",
                                description: "Padded layout",
                            },
                        ],
                    },
                    {
                        type: "toggle",
                        name: "style",
                        message: "Do you want add style theme in Stories?",
                        initial: false,
                        active: "yes",
                        inactive: "no",
                    },
                ], {}).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    let preview = ``;
                    res.style &&
                        (preview += `import { html } from "lit";\nimport theme from "./theme";\n`);
                    preview += `import { Preview } from "@storybook/web-components";\n\nconst preview: Preview = {\nparameters: {\n`;
                    res.layout && (preview += `layout: "${res.layout}",\n`);
                    res.theme && (preview += `docs: {\ntheme: theme,\n},\n`);
                    preview += `actions: { argTypesRegex: "^on[A-Z].*" },\ncontrols: {\nmatchers: {\ncolor: /(background|color)$/i,\ndate: /Date$/i,\n},\n},\n},`;
                    res.theme &&
                        (preview += `\nglobalTypes: {\ntheme: {\nname: "Theme",\ndescription: "Global theme for components",\ndefaultValue: "dark",\n},\n},\n`);
                    res.style &&
                        (preview += `\ndecorators: [\n(story) => {\nlet style = "";\n\nreturn html\`\${style}\${story()}\`;\n},\n],\n`);
                    preview += `\n};\n\nexport default preview;`;
                    return fs_1.default.writeFileSync(".storybook/preview.ts", preview);
                }));
            case "cancel":
                return process.exit(0);
        }
    }));
});
exports.default = createPreviewStorybook;
