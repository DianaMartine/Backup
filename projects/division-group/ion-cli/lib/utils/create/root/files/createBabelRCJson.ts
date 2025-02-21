import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";
import { execSync } from "child_process";

const createBabelRCJson = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating .babelrc.json...",
    });

  try {
    await prompts(
      [
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
            "./.babelrc",
            `{
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
  `,
          );
        case "custom":
          return await prompts(
            [
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
            ],
            {
              onCancel: () => {
                return process.exit(0);
              },
            },
          ).then(async (res) => {
            if (res.plugins.includes("other")) {
              return await prompts(
                [
                  {
                    type: "text",
                    name: "other",
                    message: "Enter other plugins",
                    initial: "",
                    validate: (value) =>
                      value.length < 3
                        ? `Other plugins must be at least 3 characters long`
                        : true,
                  },
                ],
                {
                  onCancel: () => {
                    return process.exit(0);
                  },
                },
              ).then(async (other) => {
                let otherPlugins = other.other.split(",");

                otherPlugins.forEach((plugin: string) => {
                  logger({
                    context: "info",
                    message: `Installing @babel/plugin-${plugin}...`,
                  });

                  return execSync(`npm i -D @babel/plugin-${plugin}`);
                });

                return fs.writeFileSync(
                  "./.babelrc",
                  `{
  "sourceType": "${res.sourceType}",
  "presets": ${res.presets},
  "plugins": [
  ${res.plugins
    .filter((plugin: string) => plugin !== "other")
    .map((plugin: string) => `["${plugin}"]`)
    .join(",\n")},
  ${otherPlugins.map((plugin: string) => `["@babel/plugin-${plugin}"]`)}
  ]
  }
  `,
                );
              });
            } else {
              return fs.writeFileSync(
                "./.babelrc",
                `{
  "sourceType": "${res.sourceType}",
  "presets": ${res.presets},
  "plugins": [
  ${res.plugins.map((plugin: string) => `["${plugin}"]`).join(",\n")}
  ]
  }`,
              );
            }
          });
        case "cancel":
          return process.exit(0);
      }
    });

    verbose &&
      logger({
        context: "success",
        message: ".babelrc.json created!",
      });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating .babelrc.json: ${error}`,
    });
  }
};

export default createBabelRCJson;
