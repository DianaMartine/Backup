import fs from "fs";
import logger from "../../log";
import { storybookFiles } from "../../models";
import prompts from "prompts";
import createMainStorybook from "./files/createMainStorybook";
import createPreviewStorybook from "./files/createPreviewStorybook";
import createManagerStorybook from "./files/createManagerStorybook";
import createThemeStorybook from "./files/createThemeStorybook";

const createStorybookFiles = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Checking Storybook files...",
    });

  !fs.existsSync(storybookFiles[0].main) &&
    (await prompts(
      [
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
      ],
      {
        onCancel: () => {
          return process.exit(0);
        },
      },
    ).then(async (res) => {
      switch (res.options) {
        case "yes":
          return await createMainStorybook(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

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
};

export default createStorybookFiles;
