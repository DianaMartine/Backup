"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const package_json_1 = __importDefault(require("../../../../package.json"));
const log_1 = __importDefault(require("../../log"));
const createStories = (path, componentName, attrs, verbose) => {
    // if (checkIfFileExists(path, verbose)) return;
    try {
        verbose &&
            (0, log_1.default)({
                context: "info",
                message: "Creating stories file",
            });
        fs_1.default.writeFileSync(path, `
  /**
  * @file ${componentName}.stories.ts - ${componentName} component stories
  * @module ${componentName}.stories.ts components/${componentName}
  * @desc This is the stories file for the ${componentName} component, created using the ${package_json_1.default.name} utility.
  * @version ${package_json_1.default.version}
  * @since 2023
  * @license ${package_json_1.default.license}
  * @author ${package_json_1.default.author.name}
  */
  
  import type { Meta, StoryObj } from "@storybook/web-components";
  import type { ${componentName}Props } from ".";
  import ${componentName} from ".";
  
  /**
   * The metadata for Test component stories
   * @type {Meta}
   */
  const meta: Meta = {
  title: "Components/${componentName}",
  tags: ["autodocs"],
  component: "ion-${String(componentName).toLowerCase()}",
  argTypes: {
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
                .join("\n")}
  * @todo Add props here
  * @example
  * someProp: {
  *    ...options
  * }
  */
  componentName: {
  description: "Default value of componentName is string",
  name: "component-name",
  table: {
    category: "Props",
    defaultValue: { summary: "string" },
    type: { summary: "string" },
  }
  },
  ${attrs &&
            String(attrs)
                .split(",")
                .map((attr) => {
                let [name, type] = attr.split(":");
                switch (type) {
                    case "string":
                        return `${name}: {
  description: "Default value of ${name} is ${type}",
  name: "${name}",
  table: {
    category: "Props",
    defaultValue: { summary: "${type}" },
    type: { summary: "${type}" },
  }
  },`;
                    case "number":
                        return `${name}: {
  description: "Default value of ${name} is ${type}",
  name: "${name}",
  table: {
    category: "Props",
    defaultValue: { summary: "${type}" },
    type: { summary: "${type}" },
  }
  },`;
                    case "boolean":
                        return `${name}: {
  description: "Default value of ${name} is ${type}",
  name: "${name}",
  table: {
    category: "Props",
    defaultValue: { summary: "${type}" },
    type: { summary: "${type}" },
  }
  },`;
                    case "event" || "function":
                        return `handle${String(name).charAt(0).toUpperCase() + String(name).slice(1)}: {
  action: "${name}",
  description: "Default value of ${name} is ${type}",
  name: "${name}",
  table: {
    category: "Props",
    defaultValue: { summary: "${type}" },
    type: { summary: "${type}" },
  }
  },`;
                    default:
                        return `${name}: {
  description: "Default value of ${name} is ${type}",
  name: "${name}",
  table: {
    category: "Props",
    defaultValue: { summary: "${type}" },
    type: { summary: "object" },
  }
  },`;
                }
            })
                .join("\n")}
  },
  } satisfies Meta<${componentName}Props>;
  
  export default meta;
  
  /**
   * Default template of the ${componentName} component
   * @type {StoryObj<${componentName}Props>} - The story object
   */
  type Story = StoryObj<${componentName}Props>;
  
  /**
   * Template of the ${componentName} component
   * @param {${componentName}Props} props - The props of the component
   * @returns {TemplateResult} - The template result
   */
  const Template: Story = {
  render: (props: ${componentName}Props) => {
  return ${componentName}.createBuilder()
  .withComponentName(props.componentName)
  ${attrs &&
            String(attrs)
                .split(",")
                .map((attr) => {
                let [name, type] = attr.split(":");
                switch (type) {
                    case "string":
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                    case "number":
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                    case "boolean":
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                    case "array":
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                    case "object":
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                    case "event" || "function":
                        return `.withHandle${name.charAt(0).toUpperCase() + name.slice(1)}((e: Event) => props.handle${name.charAt(0).toUpperCase() + name.slice(1)}(e))`;
                    default:
                        return `.with${name.charAt(0).toUpperCase() + name.slice(1)}(props.${name})`;
                }
            })
                .join("\n") +
                `.build();`}
  },
  };
  
  /**
   * Default ${componentName} story
   * @type {Story} - The story object
   */
  export const Default: Story = {
  args: {
  componentName: "${componentName}",
  ${attrs &&
            String(attrs)
                .split(",")
                .map((attr) => {
                let [name, type] = attr.split(":");
                switch (type) {
                    case "string":
                        return `${name}: "${name}"`;
                    case "number":
                        return `${name}: 0`;
                    case "boolean":
                        return `${name}: false`;
                    case "array":
                        return `${name}: []`;
                    case "object":
                        return `${name}: {}`;
                    case "event" || "function":
                        return `handle${String(name).charAt(0).toUpperCase() + String(name).slice(1)}: () => console.log("Event ${name} triggered")`;
                    default:
                        return `${name}: ${type == "array" ? "[]" : "{}"}`;
                }
            })
                .join(",\n")}
  } as ${componentName}Props,
  ...Template,
  };
  `);
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "Stories file created!",
            });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating stories file: ${error}`,
        });
    }
};
exports.default = createStories;
