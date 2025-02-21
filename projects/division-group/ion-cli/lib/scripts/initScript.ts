import createDeclaration from "../utils/create/root/files/createDeclaration";
import createGlobalTypes from "../utils/create/root/files/createGlobalTypes";
import createIndex from "../utils/create/root/files/createIndex";
import createIndexStyles from "../utils/create/root/files/createIndexStyles";
import createRootFiles from "../utils/create/root/createRootFiles";
import createRootPaths from "../utils/create/root/createRootPaths";
import logger from "../utils/log";
import checkDependencies from "../utils/test/checkDependencies";
import { DependenciesModel } from "../utils/dependencies";
import { execSync } from "child_process";

const initScript = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Initializing project...",
    });

  try {
    await createRootFiles(verbose);

    await createRootPaths(verbose);

    await createDeclaration(verbose);

    await createGlobalTypes(verbose);

    await createIndex(undefined, verbose);

    await createIndexStyles(verbose);

    await checkDependencies(
      DependenciesModel.dependencies,
      DependenciesModel.devDependencies,
      verbose,
    );

    execSync(`npx prettier --write '.'`);

    logger({
      context: "success",
      message: `Project initialized! 🎉`,
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error: ${error}`,
    });
  }
};

export default initScript;
