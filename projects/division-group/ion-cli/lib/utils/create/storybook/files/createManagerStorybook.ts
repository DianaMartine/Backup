import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";

const createManagerStorybook = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating manager storybook...",
    });

  await prompts(
    [
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
    ],
    {
      onCancel: () => {
        return process.exit(0);
      },
    },
  ).then(async (res) => {
    switch (res.options) {
      case "default":
        return fs.writeFileSync(
          "./.storybook/manager.ts",
          `import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
          
addons.setConfig({
theme: themes.dark,
});
`,
        );
      case "custom":
        return console.log("Not implemented yet");
      case "cancel":
        return process.exit(0);
    }
  });

  try {
    fs.writeFileSync(
      "./.storybook/manager.ts",
      `import { addons } from "@storybook/addons";
import theme from "./theme";

addons.setConfig({
theme: theme,
});
`,
    );
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating manager storybook: ${error}`,
    });
  }
};

export default createManagerStorybook;
