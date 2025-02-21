import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";

const createMainStorybook = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating main storybook...",
    });

  try {
     await prompts(
      [
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
            ".storybook/main.ts",
            `import type { StorybookConfig } from "@storybook/web-components-webpack5";
  
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
  `,
          );
        case "custom":
          return await prompts(
            [
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
            ],
            {
              onCancel: () => {
                return process.exit(0);
              },
            },
          ).then(async (res) => {
            return fs.writeFileSync(
              ".storybook/main.ts",
              `import type { StorybookConfig } from "@storybook/web-components-webpack5";
  
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
  `,
            );
          });
        case "cancel":
          return process.exit(0);
      }

 

      return;
    });

    verbose &&
    logger({
      context: "success",
      message: `Main storybook created! 🎉`,
    });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating main storybook: ${error}`,
    });
  }
};

export default createMainStorybook;
