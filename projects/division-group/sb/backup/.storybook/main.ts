import type { StorybookConfig } from "@storybook/web-components-webpack5";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-styling-webpack",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /.scss$/,
            use: [
              {
                loader: "style-loader",
                options: {},
              },
              {
                loader: "css-loader",
                options: { sourceMap: true },
              },
              {
                loader: "postcss-loader",
                options: {},
              },
              {
                loader: "sass-loader",
                options: { sourceMap: true },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../src/styles"],
};

export default config;
