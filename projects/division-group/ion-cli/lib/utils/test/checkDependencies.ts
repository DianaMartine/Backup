import fs from "fs";
import { execSync } from "child_process";
import logger from "../log";
import prompts from "prompts";

const checkDependencies = async (
  dependencies: string[],
  devDependencies: string[],
  verbose?: boolean,
) => {
  logger({
    context: "info",
    message: "Checking dependencies",
  });

  await prompts(
    [
      {
        type: "select",
        name: "options",
        message: "Do you want to check dependencies?",
        choices: [
          {
            title: "Yes",
            value: "yes",
            description: "Check dependencies",
          },
          {
            title: "No",
            value: "no",
            description: "Skip dependencies",
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
      case "yes":
        try {
          const packageJson = fs.readFileSync("package.json", "utf-8");

          dependencies.forEach((dependency) => {
            if (!packageJson.includes(dependency)) {
              verbose &&
                logger({
                  context: "warning",
                  message: `Installing ${dependency}...`,
                });

              execSync(`npm i ${dependency}`);
            }
          });

          devDependencies.forEach((dependency) => {
            if (!packageJson.includes(dependency)) {
              verbose &&
                logger({
                  context: "warning",
                  message: `Installing ${dependency}...`,
                });

              execSync(`npm i -D ${dependency}`);
            }
          });

          verbose &&
            logger({
              context: "success",
              message: "Dependencies checked!",
            });
        } catch (error) {
          verbose &&
            logger({
              context: "error",
              message: `Error while checking dependencies: ${error}`,
            });
        }
      case "no":
        return;
      case "cancel":
        return process.exit(0);
    }
  });

  return true;
};

export default checkDependencies;
