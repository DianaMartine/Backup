import { rootFiles, storybookFiles, srcFiles } from "./../models";
import fs from "fs";
import createPaths from "./createPaths";
import { ComponentFile } from "../types";
import hasInExports from "../test/hasInExports";
import switchCreateFunction from "./switchCreateFunction";
import checkIfFileExists from "../test/checkIfFileExists";
import logger from "../log";

const createFiles = (componentName: string, attrs?: string, verbose?: boolean) => {
  createPaths(componentName, verbose);

  const componentFiles: ComponentFile[] = [
    {
      component: `./src/components/${componentName}/index.ts`,
      sass: `./src/components/${componentName}/${componentName}.scss`,
      stories: `./src/components/${componentName}/${componentName}.stories.ts`,
      test: `./src/components/${componentName}/${componentName}.spec.ts`,
    },
  ];

  // //   if (fs.existsSync(componentFiles[0].indexComponent)) {
  // //     throw new Error("Component already exists");
  // //   }

  const files = [
    ...rootFiles,
    ...storybookFiles,
    ...srcFiles,
    ...componentFiles,
  ];

  try {
    files.forEach((file) => {
      Object.entries(file).forEach(([_, value]) => {
        switchCreateFunction(value, componentName, attrs, verbose);
      });
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating files: ${error}`,
    });
  }

  hasInExports(componentName, srcFiles[0].index);
};

export default createFiles;
