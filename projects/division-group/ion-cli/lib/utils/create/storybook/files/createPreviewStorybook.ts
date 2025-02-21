import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";

const createPreviewStorybook = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating preview storybook...",
    });

  await prompts(
    [
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
          ".storybook/preview.ts",
          `import { Preview } from "@storybook/web-components";

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

export default preview;`,
        );
      case "custom":
        await prompts(
          [
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
          ],
          {},
        ).then(async (res) => {
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

          return fs.writeFileSync(".storybook/preview.ts", preview);
        });
      case "cancel":
        return process.exit(0);
    }
  });
};

export default createPreviewStorybook;
