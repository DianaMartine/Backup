"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const package_json_1 = __importDefault(require("../../../../package.json"));
const log_1 = __importDefault(require("../../log"));
const createSpec = (path, componentName, attrs, verbose) => {
    // if (checkIfFileExists(path, verbose)) return;
    try {
        verbose && (0, log_1.default)({
            context: "info",
            message: "Creating spec file",
        });
        fs_1.default.writeFileSync(path, `
   /**
  * @file ${componentName}.spec.ts - ${componentName} component tests
  * @module ${componentName}.spec.ts
  * @desc This is the unit test file for the ${componentName} component, created using the ${package_json_1.default.name} utility.
  * @version ${package_json_1.default.version}
  * @since 2023
  * @license ${package_json_1.default.license}
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
  ${attrs &&
            String(attrs)
                .split(",")
                .map((attr) => {
                let [name, type] = attr.split(":");
                return `* @property {${type}} ${name} - Default value of ${name} is ${type}`;
            })
                .join("\n")}*/
  
  const defaultProps: ${componentName}Props = {
  /**
   * @todo Add props here
   */
  componentName: "${componentName}",
  ${attrs &&
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
                .join("\n")}
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
  
   `);
        verbose && (0, log_1.default)({
            context: "success",
            message: `Spec file created: ${path}`,
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating spec file: ${error}`,
        });
    }
};
exports.default = createSpec;
