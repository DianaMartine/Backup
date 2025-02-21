import logger from "../log";
import RegexModels from "../string/regexModels";

const checkAttributes = (attrs: string, verbose?: boolean): boolean => {
  verbose &&
    logger({
      context: "info",
      message: "Checking attributes",
    });

  if (
    RegExp(RegexModels.emptyString).exec(attrs) ||
    RegExp(RegexModels.twoSpaces).exec(attrs) ||
    RegExp(RegexModels.dashes).exec(attrs) ||
    RegExp(RegexModels.twoDashes).exec(attrs) ||
    RegExp(RegexModels.numbers).exec(attrs) ||
    RegExp(RegexModels.symbols).exec(attrs) ||
    RegExp(RegexModels.underscore).exec(attrs) ||
    RegExp(RegexModels.whitespace).exec(attrs) ||
    RegExp(RegexModels.undefined).exec(attrs)
  ) {
    throw new Error(`
        
        Invalid attributes: ${attrs}

        Attributes must:
        - Be a string
        - Not contain spaces
        - Not contain numbers
        - Not contain symbols
        - Not contain underscores
        - Not contain commas
        - Not contain double dashes
        - Not whitespace

        Must:
        - attrs:type \tone attribute
        - attrs:type,anotherAttr:anotherType \ttwo attributes or more

        Example:
        - label:string
        - label:string,placeholder:string
        - label:string,placeholder:string,disabled:boolean
        `);
  }

  verbose &&
    logger({
      context: "success",
      message: "Attributes checked!",
    });

  return true;
};

export default checkAttributes;
