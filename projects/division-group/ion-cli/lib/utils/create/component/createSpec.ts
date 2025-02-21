import fs from "fs";
import packageJson from "../../../../package.json";
import logger from "../../log";
import checkIfFileExists from "../../test/checkIfFileExists";

const createSpec = (path: string, componentName: string, attrs?: string, verbose?: boolean) => {
  // if (checkIfFileExists(path, verbose)) return;

  try {
    verbose && logger({
      context: "info",
      message: "Creating spec file",
    });

    fs.writeFileSync(
      path,
      `
   /**
  * @file ${componentName}.spec.ts - ${componentName} component tests
  * @module ${componentName}.spec.ts
  * @desc This is the unit test file for the ${componentName} component, created using the ${
    packageJson.name
  } utility.
  * @version ${packageJson.version}
  * @since 2023
  * @license ${packageJson.license}
  * @todo Add unit tests
  * @todo Add e2e tests
  * @todo Add visual diff tests
  * @todo Add accessibility tests
  * @todo Add performance tests
  */
  
   import { describe, expect, test } from "@jest/globals";
   import type { ${componentName}Props } from ".";
  import ${componentName} from ".";
  
   /**
  * Props definition for the ${componentName} component
  * @property {string} componentName - The name of the component
  ${
    attrs &&
    String(attrs)
      .split(",")
      .map((attr) => {
        let [name, type] = attr.split(":");
        return `* @property {${type}} ${name} - Default value of ${name} is ${type}`;
      })
      .join("\n")
  }*/
  
  const defaultProps: ${componentName}Props = {
  /**
   * @todo Add props here
   */
  componentName: "${componentName}",
  ${
    attrs &&
    String(attrs)
      .split(",")
      .map((attr) => {
        let [name, type] = attr.split(":");
        switch (type) {
          case "string":
            return `${name}: "",`;
          case "number":
            return `${name}: 0,`;
          case "boolean":
            return `${name}: false,`;
          default:
            return `${name}: ${type == "array" ? "[]" : "{}"},`;
        }
      })
      .join("\n")
  }
  };
  
  /**
   * Tests for the ${componentName} component
   * @todo Add tests here
   */
  describe("${componentName} component tests", () => {
  /**
   * Renders a ${componentName} component with default props
   */
  it("renders a ${componentName} component with default props", () => {
    
  });
  
   });
  
   `,
    );

    verbose && logger({
      context: "success",
      message: `Spec file created: ${path}`,
    });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating spec file: ${error}`,
    });
  }
};

export default createSpec;
