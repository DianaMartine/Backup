import fs from "fs";
import logger from "../../../log";

const createIndex = async (componentName?: string, verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating index file...",
    });

  try {
    if (componentName === undefined) {
      return fs.writeFileSync("./src/index.ts", "");
    }
    fs.writeFileSync(
      "./src/index.ts",
      `export { default as ${componentName} } from "./components/${componentName}";`,
    );

    verbose &&
      logger({
        context: "success",
        message: "Index file created!",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating index file: ${error}`,
    });
  }
};

export default createIndex;
