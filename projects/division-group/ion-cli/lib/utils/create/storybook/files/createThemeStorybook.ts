import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";

const createThemeStorybook = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating theme storybook...",
    });

  await prompts(
    [
      {
        type: "select",
        name: "options",
        message: "How do you want to create theme storybook?",
        choices: [
          {
            title: "Default",
            value: "default",
            description: "Create default theme storybook",
          },
          {
            title: "Custom",
            value: "custom",
            description: "Create custom theme storybook",
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
          "./.storybook/theme.ts",
          `import { create } from "@storybook/theming/create";
import packageJson from "../package.json";

export default create({
base: "dark",
brandTitle: packageJson.name,
brandUrl: "https://example.com",
brandImage: "https://github.com/division-group.png",
brandTarget: "_blank",
});
`,
        );
      case "custom":
        await prompts(
          [
            {
              type: "select",
              name: "base",
              message: "What is the base theme?",
              choices: [
                {
                  title: "Light",
                  value: "light",
                  description: "Light theme",
                },
                {
                  title: "Dark",
                  value: "dark",
                  description: "Dark theme",
                },
              ],
            },
            {
              type: "toggle",
              name: "fontBase",
              message: "Do you want to change the base font?",
              initial: false,
              active: "yes",
              inactive: "no",
            },
            {
              type: "text",
              name: "brandUrl",
              message: "What is the brand url?",
              initial: "https://example.com",
            },
            {
              type: "text",
              name: "brandImage",
              message: "What is the brand image?",
              initial: "https://github.com/division-group.png",
            },
            {
              type: "select",
              name: "brandTarget",
              message: "What is the brand target?",
              choices: [
                {
                  title: "Blank",
                  value: "_blank",
                  description: "Blank target",
                  selected: true,
                },
                {
                  title: "Self",
                  value: "_self",
                  description: "Self target",
                },
              ],
            },
            {
              type: "toggle",
              name: "style",
              message: "Do you want to change the style?",
              initial: false,
              active: "yes",
              inactive: "no",
            },
          ],
          {
            onCancel: () => {
              return process.exit(0);
            },
          },
        ).then(async (res) => {
          console.log(res);

          let theme = `import { create } from "@storybook/theming/create";
import packageJson from "../package.json";

export default create({
base: "${res.base}",
brandTitle: packageJson.name,
brandUrl: "${res.brandUrl}",
brandImage: "${res.brandImage}",
brandTarget: "${res.brandTarget}",
});`;

          if (res.fontBase) {
            await prompts(
              [
                {
                  type: "text",
                  name: "fontBase",
                  message: "What is the base font?",
                  initial: '"Josefin Sans", sans-serif',
                },
                {
                  type: "text",
                  name: "fontCode",
                  message: "What is the code font?",
                  initial: "monospace",
                },
              ],
              {
                onCancel: () => {
                  return process.exit(0);
                },
              },
            ).then(async (res) => {
              theme = theme.replace(
                "});",
                `fontBase: '${res.fontBase}',
fontCode: "${res.fontCode}",
});`,
              );
            });
          }

          if (res.style) {
            await prompts(
              [
                {
                  type: "text",
                  name: "colorPrimary",
                  message: "What is the primary color?",
                  initial: "#ff66c4",
                  style: "color: #ff66c4",
                },
                {
                  type: "text",
                  name: "colorSecondary",
                  message: "What is the secondary color?",
                  initial: "#59D9D9",
                },
                {
                  type: "text",
                  name: "appBg",
                  message: "What is the app background color?",
                  initial: "#1D0259",
                },
                {
                  type: "text",
                  name: "appContentBg",
                  message: "What is the app content background color?",
                  initial: "#0d0126",
                },
                {
                  type: "text",
                  name: "appBorderColor",
                  message: "What is the app border color?",
                  initial: "#120136",
                },
                {
                  type: "text",
                  name: "textColor",
                  message: "What is the text color?",
                  initial: "#f2f2f2",
                },
                {
                  type: "text",
                  name: "textInverseColor",
                  message: "What is the inverse text color?",
                  initial: "#202020",
                },
                {
                  type: "text",
                  name: "barTextColor",
                  message: "What is the bar text color?",
                  initial: "#ff66c4",
                },
                {
                  type: "text",
                  name: "barSelectedColor",
                  message: "What is the bar selected color?",
                  initial: "#BB3186",
                },
                {
                  type: "text",
                  name: "barBg",
                  message: "What is the bar background color?",
                  initial: "#1D0259",
                },
                {
                  type: "text",
                  name: "inputBg",
                  message: "What is the input background color?",
                  initial: "#1d0259",
                },
                {
                  type: "text",
                  name: "inputBorder",
                  message: "What is the input border color?",
                  initial: "#120136",
                },
                {
                  type: "text",
                  name: "inputTextColor",
                  message: "What is the input text color?",
                  initial: "#f2f2f2",
                },
                {
                  type: "text",
                  name: "inputBorderRadius",
                  message: "What is the input border radius?",
                  initial: "4",
                },
                {
                  type: "text",
                  name: "barHoverColor",
                  message: "What is the bar hover color?",
                  initial: "#f2f2f2",
                },
                {
                  type: "text",
                  name: "booleanBg",
                  message: "What is the boolean background color?",
                  initial: "#202020",
                },
                {
                  type: "text",
                  name: "booleanSelectedBg",
                  message: "What is the boolean selected color?",
                  initial: "#ff66c4",
                },
              ],
              {
                onCancel: () => {
                  return process.exit(0);
                },
              },
            ).then(async (res) => {
              theme = theme.replace(
                "});",
                `colorPrimary: "${res.colorPrimary}",
colorSecondary: "${res.colorSecondary}",
appBg: "${res.appBg}",
appContentBg: "${res.appContentBg}",
appBorderColor: "${res.appBorderColor}",
textColor: "${res.textColor}",
textInverseColor: "${res.textInverseColor}",
barTextColor: "${res.barTextColor}",
barSelectedColor: "${res.barSelectedColor}",
barBg: "${res.barBg}",
inputBg: "${res.inputBg}",
inputBorder: "${res.inputBorder}",
inputTextColor: "${res.inputTextColor}",
inputBorderRadius: ${res.inputBorderRadius},
barHoverColor: "${res.barHoverColor}",
booleanBg: "${res.booleanBg}",
booleanSelectedBg: "${res.booleanSelectedBg}",
});`,
              );
            });
          }

          fs.writeFileSync("./.storybook/theme.ts", theme);

          verbose &&
            logger({
              context: "success",
              message: "Theme storybook created successfully!",
            });
        });
      case "cancel":
        return process.exit(0);
    }
  });
};

export default createThemeStorybook;
