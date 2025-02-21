import fs from "fs";
import logger from "../../../log";

const createDeclaration = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating declaration file...",
    });

  try {
    fs.writeFileSync(
      "./src/declaration.d.ts",
      `declare module '*.scss' {
const content: { [className: string]: string };
export default content;
}`,
    );

    verbose &&
      logger({
        context: "success",
        message: "Declaration file created!",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating declaration file: ${error}`,
    });
  }
};

export default createDeclaration;
