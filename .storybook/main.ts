import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript', // 确保使用 TypeScript 解析器
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'resolve-url-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true, // 必须启用 sourceMap 配合 resolve-url-loader
          },
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        }
      ],
    },
  );
  
    return config;
  },
  
};

export default config;