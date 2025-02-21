import fs from "fs";
import packageJson from "../../../../package.json";
import logger from "../../log";
import checkIfFileExists from "../../test/checkIfFileExists";

const createSass = (path: string, componentName: string, verbose?: boolean) => {
  // if (checkIfFileExists(path, verbose)) return;

  try {
    verbose && logger({
      context: "info",
      message: "Creating sass file",
    });

    fs.writeFileSync(
      path,
      `
  /// file: ${componentName}.scss - ${componentName} component styles
  /// module: ${componentName}.scss components/${componentName}
  /// desc: This is the styles file for the ${componentName} component, created using the ${packageJson.name} utility.
  /// version: ${packageJson.version}
  /// @name ${componentName}
  /// @since 2023
  /// license: ${packageJson.license}
  /// @author ${packageJson.author.name}
  /// @return {string} - The styles for the ${componentName} component
  
  @import "../../styles/tokens.scss";
  
  /// @todo - Add styles for the ${componentName} component
  .${componentName} {
      display: block;
  
      h1 {
        font-family: $font-family-1, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }
      
      p {
        font-family: $font-family-2, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
      }
  }
  `,
    );

    verbose && logger({
      context: "success",
      message: "Sass file created!",
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating sass file: ${error}`,
    });
  }
};

export default createSass;
