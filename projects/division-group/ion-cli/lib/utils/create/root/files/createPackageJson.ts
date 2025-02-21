import fs from "fs";
import prompts from "prompts";
import logger from "../../../log";
import { execSync } from "child_process";

const createPackageJson = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating package.json file...",
    });

  try {
    await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "How do you want to create package.json?",
          choices: [
            {
              title: "Default",
              value: "default",
              description: "Create default package.json",
            },
            {
              title: "Custom",
              value: "custom",
              description: "Create custom package.json",
            },
            { title: "Cancel", value: "cancel", description: "Cancel process" },
          ],
        },
      ],
      {},
    ).then(async (res) => {
      switch (res.options) {
        case "default":
          return execSync(`npm init -y`);
        case "custom":
          return await prompts(
            [
              {
                type: "text",
                name: "name",
                message: "Name:",
                initial: "some-name",
              },
              {
                type: "text",
                name: "version",
                message: "Version:",
                initial: "1.0.0",
              },
              {
                type: "text",
                name: "description",
                message: "Description:",
                initial: "Some description",
              },
              {
                type: "text",
                name: "entry",
                message: "Entry point:",
                initial: "index.js",
              },
              {
                type: "text",
                name: "test",
                message: "Test command:",
                initial: "npm test",
              },
              {
                type: "text",
                name: "repository",
                message: "Repository:",
                initial: "",
              },
              {
                type: "text",
                name: "keywords",
                message: "Keywords:",
                initial: "",
              },
              {
                type: "text",
                name: "author",
                message: "Author:",
                initial: "Some author",
              },
              {
                type: "text",
                name: "license",
                message: "License:",
                initial: "MIT",
              },
            ],
            {
              onCancel: () => {
                return process.exit(0);
              },
            },
          ).then(async (res) => {
            return await prompts(
              [
                {
                  type: "select",
                  name: "options",
                  message: `Confirm data:\n\nName: ${res.name}\nVersion: ${res.version}\nDescription: ${res.description}\nEntry point: ${res.entry}\nTest command: ${res.test}\nRepository: ${res.repository}\nKeywords: ${res.keywords}\nAuthor: ${res.author}\nLicense: ${res.license}\n\n`,
                  choices: [
                    {
                      title: "Yes",
                      value: "yes",
                      description: "Create package.json file",
                    },
                    {
                      title: "No",
                      value: "no",
                      description: "Skip package.json file",
                    },
                    {
                      title: "Cancel",
                      value: "cancel",
                      description: "Cancel process",
                    },
                  ],
                  initial: 0,
                  min: 1,
                },
              ],
              {
                onCancel: () => {
                  process.exit(0);
                },
              },
            ).then(async (confirm) => {
              switch (confirm.options) {
                case "yes":
                  let packageJson = `{
"name": "${res.name}",
"version": "${res.version}",
"description": "${res.description}",
"main": "${res.entry}",
"scripts": {
"test": "${res.test}"
},
"repository": "${res.repository}",
"keywords": [
"${res.keywords}"
],
"author": "${res.author}",
"license": "${res.license}"
}`;

                  return fs.writeFileSync("package.json", packageJson);
                case "no":
                  await createPackageJson(verbose);
                case "cancel":
                  process.exit(0);
              }
            });
          });
        case "cancel":
          return process.exit(0);
      }
    });

    verbose &&
      logger({
        context: "success",
        message: "package.json file created!",
      });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error creating package.json file: ${error}`,
    });
  }
};

export default createPackageJson;
