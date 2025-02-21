"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = __importDefault(require("../../../log"));
const prompts_1 = __importDefault(require("prompts"));
const models_1 = require("../../../models");
const createTsConfigJson = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating tsconfig.json...",
        });
    try {
        yield (0, prompts_1.default)([
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
        ], {
            onCancel: () => {
                return process.exit(0);
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            switch (res.options) {
                case "default":
                    return fs_1.default.writeFileSync("./tsconfig.json", `{
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
  `);
                case "custom":
                    const target = models_1.tsConfig.compilerOptions.targets.map((target) => {
                        return {
                            title: target,
                            value: target,
                            description: target,
                        };
                    });
                    const lib = models_1.tsConfig.compilerOptions.lib.map((lib) => {
                        return {
                            title: lib,
                            value: lib,
                            description: lib,
                        };
                    });
                    const module = models_1.tsConfig.compilerOptions.module.map((module) => {
                        return {
                            title: module,
                            value: module,
                            description: module,
                        };
                    });
                    const moduleResolution = models_1.tsConfig.compilerOptions.moduleResolution.map((moduleResolution) => {
                        return {
                            title: moduleResolution,
                            value: moduleResolution,
                            description: moduleResolution,
                        };
                    });
                    return yield (0, prompts_1.default)([
                        {
                            type: "select",
                            name: "target",
                            message: "Set the JavaScript language version for emitted JavaScript and include compatible library declarations.",
                            choices: [...target],
                        },
                        {
                            type: "multiselect",
                            name: "lib",
                            message: "Specify a set of bundled library declaration files that describe the target runtime environment.",
                            instructions: false,
                            hint: "- Space to select. Return to submit",
                            choices: [...lib],
                        },
                        {
                            type: "toggle",
                            name: "experimentalDecorators",
                            message: "Enable experimental support for TC39 stage 2 draft decorators.",
                            initial: true,
                            inactive: "false",
                            active: "true",
                        },
                        {
                            type: "toggle",
                            name: "useDefineForClassFields",
                            message: "Enable emitting ECMAScript-standard-compliant class fields.",
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
                            message: "Specify how TypeScript looks up a file from a given module specifier.",
                            choices: [...moduleResolution],
                        },
                        {
                            type: "text",
                            name: "rootDirs",
                            message: "Allow multiple folders to be treated as one when resolving modules.",
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
                            message: "Generate .d.ts files from TypeScript and JavaScript files in your project.",
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
                            message: "Emit the source alongside the sourcemaps within a single file; requires --inlineSourceMap to be set.",
                            initial: true,
                            inactive: "false",
                            active: "true",
                        },
                        {
                            type: "toggle",
                            name: "esModuleInterop",
                            message: "Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.",
                            initial: true,
                            inactive: "false",
                            active: "true",
                        },
                        {
                            type: "toggle",
                            name: "forceConsistentCasingInFileNames",
                            message: "Ensure that casing is correct in imports. This is helpful on case-sensitive systems.",
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
                            message: "Enable error reporting when a local variables aren't read.",
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
                            message: "Enable error reporting for codepaths that do not explicitly return in a function.",
                            initial: true,
                            inactive: "false",
                            active: "true",
                        },
                        {
                            type: "toggle",
                            name: "noFallthroughCasesInSwitch",
                            message: "Enable error reporting for fallthrough cases in switch statements.",
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
                            message: "Specify a list of language service plugins to include in the type checker.",
                            initial: `ts-lit-plugin`,
                        },
                        {
                            type: "text",
                            name: "include",
                            message: "Specifies a list of glob patterns that match files to be included in compilation.",
                            initial: `"src", "src/declaration.d.ts", "src/global.d.ts"`,
                        },
                        {
                            type: "text",
                            name: "exclude",
                            message: "Specifies a list of files to be excluded from compilation.",
                            initial: `"node_modules", "dist", "build", "scripts", "test", "tests"`,
                        },
                    ], {
                        onCancel: () => {
                            return process.exit(0);
                        },
                    }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        return fs_1.default.writeFileSync("./tsconfig.json", `{
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
  `);
                    }));
                case "cancel":
                    return process.exit(0);
            }
        }));
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "tsconfig.json created!",
            });
        return;
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating tsconfig.json: ${error}`,
        });
    }
});
exports.default = createTsConfigJson;
