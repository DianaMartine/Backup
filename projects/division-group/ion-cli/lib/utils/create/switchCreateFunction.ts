import createComponent from "./component/createComponent";
import createSass from "./component/createSass";
import createSpec from "./component/createSpec";
import createStories from "./component/createStories";
import createBabelRCJson from "./root/files/createBabelRCJson";
import createDeclaration from "./root/files/createDeclaration";
import createGlobalTypes from "./root/files/createGlobalTypes";
import createIndex from "./root/files/createIndex";
import createIndexStyles from "./root/files/createIndexStyles";
import createLicense from "./root/files/createLicense";
import createTsConfigJson from "./root/files/createTsConfigJson";
import createMainStorybook from "./storybook/files/createMainStorybook";
import createManagerStorybook from "./storybook/files/createManagerStorybook";
import createPreviewStorybook from "./storybook/files/createPreviewStorybook";
import createThemeStorybook from "./storybook/files/createThemeStorybook";

const switchCreateFunction = (
  value: string,
  componentName: string,
  attrs?: string,
  verbose?: boolean,
) => {
  if (value === "./.npmrc" || value === "./package.json") return;

  switch (value) {
    case "./.babelrc.json":
      return createBabelRCJson(verbose);
    case "./LICENSE.md":
      return createLicense(verbose);
    case "./tsconfig.json":
      return createTsConfigJson(verbose);
    case "./.storybook/main.ts":
      // return createMainStorybook(value, verbose);
    case "./.storybook/manager.ts":
      // return createManagerStorybook(value, verbose);
      case "./.storybook/preview.ts":
      // return createPreviewStorybook(value, verbose);
      case "./.storybook/theme.ts":
      // return createThemeStorybook(value, verbose);
    case "./src/index.ts":
      // return createIndex(value, componentName, verbose);
    case "./src/styles/tokens.scss":
      // return createIndexStyles(value, componentName);
    case "./src/global.d.ts":
      // return createGlobalTypes(value, verbose);
    case "./src/declaration.d.ts":
      // return createDeclaration(value, verbose);
    case "./src/components/" + componentName + "/index.ts":
      return createComponent(value, componentName, attrs, verbose);
    case "./src/components/" + componentName + "/" + componentName + ".scss":
      return createSass(value, componentName, verbose);
    case "./src/components/" +
      componentName +
      "/" +
      componentName +
      ".stories.ts":
      return createStories(value, componentName, attrs, verbose);
    case "./src/components/" + componentName + "/" + componentName + ".spec.ts":
      return createSpec(value, componentName, attrs, verbose);
    default:
      break;
  }
};

export default switchCreateFunction;
