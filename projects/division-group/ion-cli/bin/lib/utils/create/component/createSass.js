"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const package_json_1 = __importDefault(require("../../../../package.json"));
const log_1 = __importDefault(require("../../log"));
const createSass = (path, componentName, verbose) => {
    // if (checkIfFileExists(path, verbose)) return;
    try {
        verbose && (0, log_1.default)({
            context: "info",
            message: "Creating sass file",
        });
        fs_1.default.writeFileSync(path, `
  /// file: ${componentName}.scss - ${componentName} component styles
  /// module: ${componentName}.scss components/${componentName}
  /// desc: This is the styles file for the ${componentName} component, created using the ${package_json_1.default.name} utility.
  /// version: ${package_json_1.default.version}
  /// @name ${componentName}
  /// @since 2023
  /// license: ${package_json_1.default.license}
  /// @author ${package_json_1.default.author.name}
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
  `);
        verbose && (0, log_1.default)({
            context: "success",
            message: "Sass file created!",
        });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating sass file: ${error}`,
        });
    }
};
exports.default = createSass;
