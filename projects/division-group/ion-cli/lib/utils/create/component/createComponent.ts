import fs from "fs";
import packageJson from "../../../../package.json";
import logger from "../../log";
import checkIfFileExists from "../../test/checkIfFileExists";

const createComponent = (
  path: string,
  componentName: string,
  attrs?: string,
  verbose?: boolean,
) => {
  // if (checkIfFileExists(path, verbose)) return;

  try {
    verbose &&
      logger({
        context: "info",
        message: "Creating component",
      });

    fs.writeFileSync(
      path,
      `
/**
* @file index.ts - ${componentName} component index
* @module index.ts components/${componentName}
* @desc This is the ${componentName}.ts file for definition and implementation of the ${componentName} component, created using the ${
        packageJson.name
      } utility.
* @version ${packageJson.version}
* @since 2023
* @license ${packageJson.license}
* @author ${packageJson.author.name}
*/

import { LitElement, TemplateResult, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./${componentName}.scss";

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
export interface ${componentName}Props {
/**
* @todo Add props here
*/ 
componentName: string;
${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      switch (type) {
        case "string":
          return `${name}: string;`;
        case "number":
          return `${name}: number;`;
        case "boolean":
          return `${name}: boolean;`;
        case "array":
          return `${name}: [];`;
        case "object":
          return `${name}: {};`;
        case "event":
          return `handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }: (e: Event) => void;`;
        case "function":
          return `${name}: () => void;`;
        default:
          return `${name}: ${type};`;
      }
    })
    .join("\n")
}
};

/**
* Primary UI component for user interaction
* @param {${componentName}Props} props - The props of the component
* @returns {TemplateResult} - The template result
*/
@customElement('ion-${String(componentName).toLowerCase()}')
class ${componentName} extends LitElement {
/**
* Styles for the ${componentName} component
* @returns {TemplateResult} - The template result
*/
static styles = unsafeCSS(styles);

/**
* Constructor for the ${componentName} component
* @param {${componentName}Props} props - The props of the component
*/
constructor(props: ${componentName}Props) {
super();
this.componentName = props.componentName;
${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      if (type == "event" || type == "function") return;
      return `this.${name} = props.${name};`;
    })
    .join("\n")
}
}

/**
* Props definition for the ${componentName} component
* @property {string} componentName - The name of the component
${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      return `* @property {${type}} ${name} - Default value type of ${name} is ${type}`;
    })
    .join("\n")
}*/
@property({ 
 type: String,
 noAccessor: true,
 reflect: true,
 attribute: "component-name",
})
componentName?: string = "${componentName}";

${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      switch (type) {
        case "string":
          return `@property({ 
type: String,
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: string = "${name}";`;
        case "number":
          return `@property({ 
type: Number,
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: number = 0;`;
        case "boolean":
          return `@property({ 
type: Boolean,
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: boolean = false;`;
        case "array":
          return `@property({ 
type: Array,
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: [] = [];`;
        case "object":
          return `@property({ 
type: Object,
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: {} = {};`;
        case "event":
          return `@property({
type: Event,
noAccessor: true,
reflect: true,
attribute: "handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }",
})
handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(e: Event) {
console.log("Event handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          } triggered", e);
dispatchEvent(
new CustomEvent("handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }", {
detail: {
value: e,
},
}),
);
}`;
        case "function":
          return `@property({
type: Function,
noAccessor: true,
reflect: true,
attribute: "${name}",
})
${name}() {
console.log("${name}");
}`;
        default:
          return `@property({ 
type: ${type},
noAccessor: true,
reflect: true,
attribute: "${name}",
 })
${name}: ${type} = ${type.includes("[]") ? "[]" : "{}"};`;
      }
    })
    .join("\n\n")
}

/**
* Render method of the ${componentName} component
* @returns {TemplateResult} - The template result
* @todo Add implementation
*/
render(): TemplateResult {
return html\`
<div class='${componentName}'>
 <h1>\${this.componentName}</h1>
 <p>\${this.componentName} component created using the ${
   packageJson.name
 } utility.</p>
 <ul>
${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      if (type == "event")
        return `<li>handle${
          name.charAt(0).toUpperCase() + name.slice(1)
        }: ${type}</li>`;
      return `<li>${name}: ${type}</li>`;
    })
    .join("\n")
}
 </ul>
</div>
\`;
}

/**
* Create method of the Test component
* @returns {TestBuilder} - The builder
*/
static createBuilder(): ${componentName}Builder {
 return new ${componentName}Builder();
}
}

export default ${componentName};

/**
* @desc Register the ${componentName} component as a custom element
* @example
* <ion-${String(componentName).toLowerCase()}/>
* @returns {void}
*/
declare global {
interface HTMLElementTagNameMap {
 "ion-${String(componentName).toLowerCase()}": ${componentName};
}
}

/**
 * @desc Builder class for the ${componentName} component
 * @example
 * const builder = new ${componentName}Builder();
 * @returns {${componentName}Builder} - The builder
 */
class ${componentName}Builder {
private props: ${componentName}Props;

/**
 * Constructor for the ${componentName} builder
 */
constructor() {
this.props = {} as ${componentName}Props;
}

/**
 * Set the componentName property
 * @param {string} componentName - The name of the component
 * @returns {${componentName}Builder} - The builder
 */
withComponentName(componentName: string): ${componentName}Builder {
this.props.componentName = componentName;
return this;
}

${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");
      switch (type) {
        case "string":
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: string): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
        case "number":
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: number): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
        case "boolean":
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: boolean): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
        case "array":
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: []): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
        case "object":
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: {}): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
        case "event" || "function":
          return `withHandle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }: (e: Event) => void): ${componentName}Builder {
this.props.handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          } = handle${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          };
return this;
}`;
        default:
          return `with${
            String(name).charAt(0).toUpperCase() + String(name).slice(1)
          }(${name}: ${type}): ${componentName}Builder {
this.props.${name} = ${name};
return this;
}`;
      }
    })
    .join("\n\n")
}

/**
 * Build the ${componentName} component
 * @returns {${componentName}} - The ${componentName} component
 */
build(): ${componentName} {
const element = new ${componentName}(this.props);

${
  attrs &&
  String(attrs)
    .split(",")
    .map((attr) => {
      let [name, type] = attr.split(":");

      if (type == "event") {
        return `element.setAttribute("handle${
          String(name).charAt(0).toUpperCase() + String(name).slice(1)
        }", String(this.props.handle${
          String(name).charAt(0).toUpperCase() + String(name).slice(1)
        }));

/**
 * This is an example of how to dispatch an event
 */
element.addEventListener("click", this.props.handle${
          String(name).charAt(0).toUpperCase() + String(name).slice(1)
        });`;
      }

      return `element.setAttribute("${name}", String(this.props.${name}));`;
    })
    .join("\n")
}

return element;
}
}
`,
    );

    verbose &&
      logger({
        context: "info",
        message: "Created component",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating component: ${error}`,
    });
  }
};

export default createComponent;
