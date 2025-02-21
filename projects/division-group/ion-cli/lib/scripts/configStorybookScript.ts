import { execSync } from "child_process";
import createStorybookFiles from "../utils/create/storybook/createStorybookFiles";
import createStorybookPaths from "../utils/create/storybook/createStorybookPaths";
import logger from "../utils/log";

const configStorybookScript = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Configuring Storybook...",
    });

  try {
    await createStorybookPaths(verbose);

    await createStorybookFiles(verbose);

    execSync(`npx prettier --write './.storybook'`);

    logger({
      context: "success",
      message: `Storybook configured! 🎉`,
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while configuring Storybook: ${error}`,
    });
  }
};

export default configStorybookScript;
