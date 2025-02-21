export type Log = {
  context: string;
  message: string;
};

export type RootPath = {
  src: string;
  styles: string;
  components: string;
};

export type StorybookPath = {
  storybook: string;
  storybookUtils: string;
};

export type ComponentPath = {
  component: string;
};

export type RootFile = {
  npmrc: string;
  packageJson: string;
  babel: string;
  license: string;
  tsconfig: string;
};

export type StorybookFile = {
  main: string;
  manager: string;
  preview: string;
  theme: string;
};

export type SrcFile = {
  index: string;
  indexStyle: string;
  globalTypes: string;
  declarations: string;
};

export type ComponentFile = {
  component: string;
  sass: string;
  stories: string;
  test: string;
};

export type TSConfig = {
  compilerOptions: {
    targets: string[];
    lib: string[];
    module: string[];
    moduleResolution: string[];
  };
  include: string[];
  exclude: string[];
};
