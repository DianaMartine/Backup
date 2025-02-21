import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";
import { tsConfig } from "../../../models";

const createTsConfigJson = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating tsconfig.json...",
    });

  try {
    await prompts(
      [
        {
          type: "select",
          name: "options",
          message: "How do you want to create tsconfig.json?",
          choices: [
            {
              title: "Default",
              value: "default",
              description: "Create default tsconfig.json",
            },
            {
              title: "Custom",
              value: "custom",
              description: "Create custom tsconfig.json",
              selected: true,
            },
            { title: "Cancel", value: "cancel", description: "Cancel process" },
          ],
        },
      ],
      {
        onCancel: () => {
          return process.exit(0);
        },
      },
    ).then(async (res) => {
      switch (res.options) {
        case "default":
          return fs.writeFileSync(
            "./tsconfig.json",
            `{
  "compilerOptions": {
  "target": "ES2019",
  "lib": ["DOM", "DOM.Iterable", "ES2021"],
  "experimentalDecorators": true,
  "useDefineForClassFields": false,
  "module": "ESNext",
  "moduleResolution": "node",
  "rootDirs": ["src"],
  "resolveJsonModule": true,
  "allowJs": true,
  "declaration": true,
  "declarationMap": true,
  "sourceMap": true,
  "noEmit": true,
  "inlineSources": true,
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "skipLibCheck": true,
  "plugins": [
  {
  "name": "ts-lit-plugin",
  "strict": true
  }
  ]
  },
  "include": ["src", "src/declaration.d.ts", "src/global.d.ts"],
  "exclude": ["node_modules", "dist", "build", "scripts", "test", "tests"]
  }
  `,
          );
        case "custom":
          const target = tsConfig.compilerOptions.targets.map((target) => {
            return {
              title: target,
              value: target,
              description: target,
            };
          });

          const lib = tsConfig.compilerOptions.lib.map((lib) => {
            return {
              title: lib,
              value: lib,
              description: lib,
            };
          });

          const module = tsConfig.compilerOptions.module.map((module) => {
            return {
              title: module,
              value: module,
              description: module,
            };
          });

          const moduleResolution =
            tsConfig.compilerOptions.moduleResolution.map(
              (moduleResolution) => {
                return {
                  title: moduleResolution,
                  value: moduleResolution,
                  description: moduleResolution,
                };
              },
            );

          return await prompts(
            [
              {
                type: "select",
                name: "target",
                message:
                  "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.",
                choices: [...target],
              },
              {
                type: "multiselect",
                name: "lib",
                message:
                  "Specify a set of bundled library declaration files that describe the target runtime environment.",
                instructions: false,
                hint: "- Space to select. Return to submit",
                choices: [...lib],
              },
              {
                type: "toggle",
                name: "experimentalDecorators",
                message:
                  "Enable experimental support for TC39 stage 2 draft decorators.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "useDefineForClassFields",
                message:
                  "Enable emitting ECMAScript-standard-compliant class fields.",
                initial: false,
                inactive: "false",
                active: "true",
              },
              {
                type: "select",
                name: "module",
                message: "Specify what module code is generated.",
                choices: [...module],
              },
              {
                type: "select",
                name: "moduleResolution",
                message:
                  "Specify how TypeScript looks up a file from a given module specifier.",
                choices: [...moduleResolution],
              },
              {
                type: "text",
                name: "rootDirs",
                message:
                  "Allow multiple folders to be treated as one when resolving modules.",
                initial: "src",
              },
              {
                type: "toggle",
                name: "resolveJsonModule",
                message: "Enable importing .json files",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "allowJs",
                message: "Allow JavaScript files to be a part of your program.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "declaration",
                message:
                  "Generate .d.ts files from TypeScript and JavaScript files in your project.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "declarationMap",
                message: "Create sourcemaps for d.ts files.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "sourceMap",
                message: "Create sourcemaps for JavaScript files.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "noEmit",
                message: "Disable emitting files from a compilation.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "inlineSources",
                message:
                  "Emit the source alongside the sourcemaps within a single file; requires --inlineSourceMap to be set.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "esModuleInterop",
                message:
                  "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "forceConsistentCasingInFileNames",
                message:
                  "Ensure that casing is correct in imports. This is helpful on case-sensitive systems.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "strict",
                message: "Enable all strict type checking options.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "noUnusedLocals",
                message:
                  "Enable error reporting when a local variables aren't read.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "noUnusedParameters",
                message: "Raise an error when a function parameter isn't read",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "noImplicitReturns",
                message:
                  "Enable error reporting for codepaths that do not explicitly return in a function.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "noFallthroughCasesInSwitch",
                message:
                  "Enable error reporting for fallthrough cases in switch statements.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "toggle",
                name: "skipLibCheck",
                message: "Skip type checking all .d.ts files.",
                initial: true,
                inactive: "false",
                active: "true",
              },
              {
                type: "text",
                name: "plugins",
                message:
                  "Specify a list of language service plugins to include in the type checker.",
                initial: `ts-lit-plugin`,
              },
              {
                type: "text",
                name: "include",
                message:
                  "Specifies a list of glob patterns that match files to be included in compilation.",
                initial: `"src", "src/declaration.d.ts", "src/global.d.ts"`,
              },
              {
                type: "text",
                name: "exclude",
                message:
                  "Specifies a list of files to be excluded from compilation.",
                initial: `"node_modules", "dist", "build", "scripts", "test", "tests"`,
              },
            ],
            {
              onCancel: () => {
                return process.exit(0);
              },
            },
          ).then(async (res) => {
            return fs.writeFileSync(
              "./tsconfig.json",
              `{
  "compilerOptions": {
  "target": "${res.target}",
  "lib": ["${String(res.lib).split(",")}"],
  "experimentalDecorators": ${res.experimentalDecorators},
  "useDefineForClassFields": ${res.useDefineForClassFields},
  "module": "${res.module}",
  "moduleResolution": "${res.moduleResolution}",
  "rootDirs": ["${res.rootDirs}"],
  "resolveJsonModule": ${res.resolveJsonModule},
  "allowJs": ${res.allowJs},
  "declaration": ${res.declaration},
  "declarationMap": ${res.declarationMap},
  "sourceMap": ${res.sourceMap},
  "noEmit": ${res.noEmit},
  "inlineSources": ${res.inlineSources},
  "esModuleInterop": ${res.esModuleInterop},
  "forceConsistentCasingInFileNames": ${res.forceConsistentCasingInFileNames},
  "strict": ${res.strict},
  "noUnusedLocals": ${res.noUnusedLocals},
  "noUnusedParameters": ${res.noUnusedParameters},
  "noImplicitReturns": ${res.noImplicitReturns},
  "noFallthroughCasesInSwitch": ${res.noFallthroughCasesInSwitch},
  "skipLibCheck": ${res.skipLibCheck},
  "plugins": [
  ${String(res.plugins)
    .split(",")
    .map((plugin) => {
      return `{ 
  "name": "${plugin}",
  "strict": true
  }`;
    })}
  ]
  },
  "include": [${String(res.include).split(",")}],
  "exclude": [${String(res.exclude).split(",")}]
  }
  `,
            );
          });
        case "cancel":
          return process.exit(0);
      }
    });

    verbose &&
      logger({
        context: "success",
        message: "tsconfig.json created!",
      });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating tsconfig.json: ${error}`,
    });
  }
};

export default createTsConfigJson;
