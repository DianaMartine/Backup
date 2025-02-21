import fs from "fs";
import logger from "../../log";
import prompts from "prompts";
import { rootFiles } from "../../models";
import createNpmRc from "./files/createNpmRc";
import createPackageJson from "./files/createPackageJson";
import createBabelRCJson from "./files/createBabelRCJson";
import createLicense from "./files/createLicense";
import createTsConfigJson from "./files/createTsConfigJson";

const createRootFiles = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Checking root files...",
    });

  !fs.existsSync(rootFiles[0].npmrc) &&
    (await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "Do you want to create .npmrc file?",
          choices: [
            {
              title: "Yes",
              value: "yes",
              description: "Create .npmrc file",
            },
            {
              title: "No",
              value: "no",
              description: "Skip .npmrc file",
              selected: true,
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
          return await createNpmRc(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

  !fs.existsSync(rootFiles[0].packageJson) &&
    (await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "Do you want to create package.json file?",
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
              selected: true,
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
          return await createPackageJson(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

  !fs.existsSync(rootFiles[0].babel) &&
    (await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "Do you want to create .babelrc file?",
          choices: [
            {
              title: "Yes",
              value: "yes",
              description: "Create .babelrc file",
            },
            {
              title: "No",
              value: "no",
              description: "Skip .babelrc file",
              selected: true,
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
          return await createBabelRCJson(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

  !fs.existsSync(rootFiles[0].license) &&
    (await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "Do you want to create LICENSE.md file?",
          choices: [
            {
              title: "Yes",
              value: "yes",
              description: "Create LICENSE.md file",
            },
            {
              title: "No",
              value: "no",
              description: "Skip LICENSE.md file",
              selected: true,
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
          return await createLicense(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

  !fs.existsSync(rootFiles[0].tsconfig) &&
    (await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "Do you want to create tsconfig.json file?",
          choices: [
            {
              title: "Yes",
              value: "yes",
              description: "Create tsconfig.json file",
            },
            {
              title: "No",
              value: "no",
              description: "Skip tsconfig.json file",
              selected: true,
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
          return await createTsConfigJson(verbose);
        case "no":
          return;
        case "cancel":
          return process.exit(0);
      }
    }));

  verbose &&
    logger({
      context: "success",
      message: "Root files checked!",
    });
};

export default createRootFiles;
