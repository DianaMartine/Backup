import { DependenciesModel } from "./../utils/dependencies";
import { execSync } from "child_process";
import checkComponentName from "../utils/test/checkComponentName";
import createFiles from "../utils/create/createFiles";
import capitalizeFirstLetter from "../utils/string/prepareComponentName";
import checkAttributes from "../utils/test/checkAttributes";
import checkDependencies from "../utils/test/checkDependencies";
import path from "path";
import checkIfFileExists from "../utils/test/checkIfFileExists";
import createNpmRc from "../utils/create/root/files/createNpmRc";
import logger from "../utils/log";
import { rootFiles } from "../utils/models";
import createPackageJson from "../utils/create/root/files/createPackageJson";
import createRootFiles from "../utils/create/root/createRootFiles";

const addScript = (component: string, attrs?: string, verbose?: boolean) => {
  try {

    createRootFiles(verbose);

    // checkDependencies(
    //   DependenciesModel.dependencies,
    //   DependenciesModel.devDependencies,
    //   verbose,
    // );

    // checkComponentName(component, verbose);

    // attrs && checkAttributes(attrs, verbose);

    // component = capitalizeFirstLetter(component);

    // createFiles(component, attrs, verbose);

    // verbose &&
    //   logger({
    //     context: "info",
    //     message: "Formatting files...",
    //   });
    // execSync(`npx prettier --write '.'`);

    // verbose &&
    //   logger({
    //     context: "success",
    //     message: "Files formatted!",
    //   });

    // logger({
    //   context: "success",
    //   message: `Component ${component} created! 🎉`,
    // });

    // logger({
    //   context: "",
    //   message: `You can find it at: \n\n\ Component: ${path.join(
    //     process.cwd(),
    //     "src",
    //     "components",
    //     component,
    //   )} \n Stories: ${path.join(
    //     process.cwd(),
    //     "src",
    //     "stories",
    //     component,
    //   )} \n Tests: ${path.join(
    //     process.cwd(),
    //     "src",
    //     "tests",
    //     component,
    //   )} \n Sass: ${path.join(process.cwd(), "src", "sass", component)} \n`,
    // });
  } catch (error) {
    logger({
      context: "error",
      message: String(error),
    });
  }
};

export default addScript;
