import fs from "fs";
import { rootPaths, storybookPaths } from "../models";
import { ComponentPath } from "../types";
import logger from "../log";

const createPaths = (componentName: string, verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating paths...",
    });

  const componentPaths: ComponentPath[] = [
    {
      component: `./src/components/${componentName}`,
    },
  ];

  const paths = [...storybookPaths, ...rootPaths, ...componentPaths];

  try {
    paths.forEach((path) => {
      Object.entries(path).forEach(([_, value]) => {
        if (!fs.existsSync(value)) {
          verbose &&
            logger({
              context: "info",
              message: `Creating path for: ${value}`,
            });

          fs.mkdirSync(value);

          verbose &&
            logger({
              context: "success",
              message: `Path created: ${value}`,
            });
        }
      });
    });

    verbose &&
      logger({
        context: "success",
        message: "Paths created!",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating paths: ${error}`,
    });
  }
};

export default createPaths;
