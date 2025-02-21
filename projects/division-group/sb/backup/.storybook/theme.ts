import { create } from "@storybook/theming/create";
import packageJson from "../package.json";

export default create({
  base: "dark",
  fontBase: '"Josefin Sans", sans-serif',
  fontCode: "monospace",
  brandTitle: packageJson.name,
  brandUrl: "https://github.com/division-group",
  brandImage: "https://github.com/division-group.png",
  colorPrimary: "#ff66c4",
  colorSecondary: "#59D9D9",
  appBg: "#1D0259",
  appContentBg: "#0d0126",
  appBorderColor: "#120136",
  textColor: "#f2f2f2",
  textInverseColor: "#202020",
  barTextColor: "#ff66c4",
  barSelectedColor: "#BB3186",
  barBg: "#1D0259",
  inputBg: "#1d0259",
  inputBorder: "#120136",
  inputTextColor: "#f2f2f2",
  inputBorderRadius: 4,
  barHoverColor: "#f2f2f2",
  booleanBg: "#202020",
  booleanSelectedBg: "#ff66c4",
  brandTarget: "_blank",
});
