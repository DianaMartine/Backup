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
const createManagerStorybook = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating manager storybook...",
        });
    yield (0, prompts_1.default)([
        {
            type: "select",
            name: "options",
            message: "How do you want to create manager storybook?",
            choices: [
                {
                    title: "Default",
                    value: "default",
                    description: "Create default manager storybook",
                },
                {
                    title: "Custom",
                    value: "custom",
                    description: "Create custom manager storybook",
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
                return fs_1.default.writeFileSync("./.storybook/manager.ts", `import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
          
addons.setConfig({
theme: themes.dark,
});
`);
            case "custom":
                return console.log("Not implemented yet");
            case "cancel":
                return process.exit(0);
        }
    }));
    try {
        fs_1.default.writeFileSync("./.storybook/manager.ts", `import { addons } from "@storybook/addons";
import theme from "./theme";

addons.setConfig({
theme: theme,
});
`);
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating manager storybook: ${error}`,
        });
    }
});
exports.default = createManagerStorybook;
