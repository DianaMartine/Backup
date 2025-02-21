import logger from "../../log";
import { storybookPaths } from "../../models";
import fs from "fs";

const createStorybookPaths = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating Storybook paths...",
    });

  try {
    storybookPaths.forEach((path) => {
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
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating Storybook paths: ${error}`,
    });
  }
};

export default createStorybookPaths;
