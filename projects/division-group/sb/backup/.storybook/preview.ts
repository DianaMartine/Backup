import { html } from "lit";
import { Preview } from "@storybook/web-components";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    layout: "",
    docs: {
      theme: theme,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
    },
  },
  decorators: [
    (story) => {
      let style = "";

      return html` ${style} ${story()} `;
    },
  ],
};

export default preview;
