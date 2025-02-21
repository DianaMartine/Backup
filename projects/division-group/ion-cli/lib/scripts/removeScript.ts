import checkIfFileExists from "../utils/test/checkIfFileExists";
import checkComponentName from "../utils/test/checkComponentName";
import capitalizeFirstLetter from "../utils/string/prepareComponentName";
import fs from "fs";
import logger from "../utils/log";

const unlinkFile = (path: string, verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: `Removing ${path}...`,
    });
  checkIfFileExists(path);
  fs.unlinkSync(path);
};

const removeFolder = (path: string, verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: `Removing ${path}...`,
    });
  fs.rmdirSync(path);
};

const replaceInFile = (
  path: string,
  componentName: string,
  verbose?: boolean,
) => {
  verbose &&
    logger({
      context: "info",
      message: `Replacing ${componentName} in ${path}...`,
    });
  if (checkIfFileExists(path)) {
    let data = fs.readFileSync(path, "utf8");

    let regexImport = new RegExp(
      `export { default as ${componentName} } from "./components/${componentName}";\n`,
    );

    data = data.replace(regexImport, "");

    fs.writeFileSync(path, data, "utf8");
  }
};

const removeScript = (componentName: string, verbose?: boolean) => {
  checkComponentName(componentName, verbose);

  componentName = capitalizeFirstLetter(componentName);

  const paths = [
    {
      component: `./src/components/${componentName}/index.ts`,
      stories: `./src/components/${componentName}/${componentName}.stories.ts`,
      test: `./src/components/${componentName}/${componentName}.spec.ts`,
      styles: `./src/components/${componentName}/${componentName}.scss`,
      folder: `./src/components/${componentName}`,
    },
  ];

  try {
    paths.forEach((path) => {
   if (!path.folder.includes("index.ts")) {
      unlinkFile(path.component, verbose);
      unlinkFile(path.stories, verbose);
      unlinkFile(path.test, verbose);
      unlinkFile(path.styles, verbose);
      removeFolder(path.folder, verbose);
    }
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error: ${error}`,
    });
  }

  const indexes = [
    {
      index: "./src/index.ts",
    },
  ];

  try {
    indexes.forEach((index) => {
      replaceInFile(index.index, componentName, verbose);
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error: ${error}`,
    });
  }
};

export default removeScript;
