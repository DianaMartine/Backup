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
const models_1 = require("../../models");
const prompts_1 = __importDefault(require("prompts"));
const createMainStorybook_1 = __importDefault(require("./files/createMainStorybook"));
const createStorybookFiles = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Checking Storybook files...",
        });
    !fs_1.default.existsSync(models_1.storybookFiles[0].main) &&
        (yield (0, prompts_1.default)([
            {
                type: "select",
                name: "options",
                message: "Do you want to create main.ts file?",
                choices: [
                    {
                        title: "Yes",
                        value: "yes",
                        description: "Create main.ts file",
                    },
                    {
                        title: "No",
                        value: "no",
                        description: "Skip main.ts file",
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
                    return yield (0, createMainStorybook_1.default)(verbose);
                case "no":
                    return;
                case "cancel":
                    return process.exit(0);
            }
        })));
    // !fs.existsSync(storybookFiles[0].theme) &&
    // (await prompts(
    //   [
    //     {
    //       type: "select",
    //       name: "options",
    //       message: "Do you want to create theme.ts file?",
    //       choices: [
    //         {
    //           title: "Yes",
    //           value: "yes",
    //           description: "Create theme.ts file",
    //         },
    //         {
    //           title: "No",
    //           value: "no",
    //           description: "Skip theme.ts file",
    //           selected: true,
    //         },
    //         { title: "Cancel", value: "cancel", description: "Cancel process" },
    //       ],
    //       initial: 0,
    //       min: 1,
    //     },
    //   ],
    //   {
    //     onCancel: () => {
    //       return process.exit(0);
    //     },
    //   },
    // ).then(async (res) => {
    //     switch (res.options) {
    //         case "yes":
    //         return await createThemeStorybook(verbose);
    //         case "no":
    //         return;
    //         case "cancel":
    //         return process.exit(0);
    //     }
    // }));
    // !fs.existsSync(storybookFiles[0].preview) &&
    // (await prompts(
    //   [
    //     {
    //       type: "select",
    //       name: "options",
    //       message: "Do you want to create preview.ts file?",
    //       choices: [
    //         {
    //           title: "Yes",
    //           value: "yes",
    //           description: "Create preview.ts file",
    //         },
    //         {
    //           title: "No",
    //           value: "no",
    //           description: "Skip preview.ts file",
    //           selected: true,
    //         },
    //         { title: "Cancel", value: "cancel", description: "Cancel process" },
    //       ],
    //       initial: 0,
    //       min: 1,
    //     },
    //   ],
    //   {
    //     onCancel: () => {
    //       return process.exit(0);
    //     },
    //   },
    // ).then(async (res) => {
    //     switch (res.options) {
    //         case "yes":
    //         return await createPreviewStorybook(verbose);
    //         case "no":
    //         return;
    //         case "cancel":
    //         return process.exit(0);
    //     }
    // }));
    // !fs.existsSync(storybookFiles[0].manager) &&
    // (await prompts(
    //   [
    //     {
    //       type: "select",
    //       name: "options",
    //       message: "Do you want to create manager.ts file?",
    //       choices: [
    //         {
    //           title: "Yes",
    //           value: "yes",
    //           description: "Create manager.ts file",
    //         },
    //         {
    //           title: "No",
    //           value: "no",
    //           description: "Skip manager.ts file",
    //           selected: true,
    //         },
    //         { title: "Cancel", value: "cancel", description: "Cancel process" },
    //       ],
    //       initial: 0,
    //       min: 1,
    //     },
    //   ],
    //   {
    //     onCancel: () => {
    //       return process.exit(0);
    //     },
    //   },
    // ).then(async (res) => {
    //     switch (res.options) {
    //         case "yes":
    //         return await createManagerStorybook(verbose);
    //         case "no":
    //         return;
    //         case "cancel":
    //         return process.exit(0);
    //     }
    // }));
});
exports.default = createStorybookFiles;
