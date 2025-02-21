import logger from "../log";
import RegexModels from "../string/regexModels";

const checkComponentName = (
  componentName: string,
  verbose?: boolean,
): boolean => {
  verbose &&
    logger({
      context: "info",
      message: "Checking component name",
    });

  if (!componentName) {
    logger({
      context: "error",
      message: "Component name is required",
    });
    return false;
  }

  if (
    RegExp(RegexModels.emptyString).exec(componentName) ||
    RegExp(RegexModels.comma).exec(componentName) ||
    RegExp(RegexModels.colon).exec(componentName) ||
    RegExp(RegexModels.twoSpaces).exec(componentName) ||
    RegExp(RegexModels.dashes).exec(componentName) ||
    RegExp(RegexModels.twoDashes).exec(componentName) ||
    RegExp(RegexModels.numbers).exec(componentName) ||
    RegExp(RegexModels.symbols).exec(componentName) ||
    RegExp(RegexModels.underscore).exec(componentName) ||
    RegExp(RegexModels.whitespace).exec(componentName) ||
    RegExp(RegexModels.undefined).exec(componentName)
  ) {
    throw new Error(`
    
    Invalid component name: ${componentName}

    Component name must:
    ion add <component-name>

    - Be a string
    - Not contain spaces
    - Not contain numbers
    - Not contain symbols
    - Not contain underscores
    - Not contain colons
    - Not contain commas
    - Not contain double dashes
    - Not whitespace

    <component-name> is required, and must:
    - componentName
    - componentname
    `);
  }

  verbose &&
    logger({
      context: "success",
      message: "Component name checked!",
    });
  return true;
};

export default checkComponentName;
