import logger from "../../log";
import { rootPaths } from "../../models";
import fs from "fs";

const createRootPaths = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating root paths...",
    });

  try {
    rootPaths.forEach((path) => {
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
      message: `Error while creating root paths: ${error}`,
    });
  }
};

export default createRootPaths;
