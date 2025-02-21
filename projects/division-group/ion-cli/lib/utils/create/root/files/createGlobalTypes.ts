import fs from "fs";
import logger from "../../../log";

const createGlobalTypes = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating global types...",
    });

  try {
    fs.writeFileSync(
      "./src/global.d.ts",
      `declare namespace NodeJS {
interface Global {}
}`,
    );

    verbose &&
      logger({
        context: "success",
        message: "Global types created!",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating global types: ${error}`,
    });
  }
};

export default createGlobalTypes;
