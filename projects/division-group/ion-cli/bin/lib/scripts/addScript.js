"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../utils/log"));
const createRootFiles_1 = __importDefault(require("../utils/create/root/createRootFiles"));
const addScript = (component, attrs, verbose) => {
    try {
        (0, createRootFiles_1.default)(verbose);
        // checkDependencies(
        //   DependenciesModel.dependencies,
        //   DependenciesModel.devDependencies,
        //   verbose,
        // );
        // checkComponentName(component, verbose);
        // attrs && checkAttributes(attrs, verbose);
        // component = capitalizeFirstLetter(component);
        // createFiles(component, attrs, verbose);
        // verbose &&
        //   logger({
        //     context: "info",
        //     message: "Formatting files...",
        //   });
        // execSync(`npx prettier --write '.'`);
        // verbose &&
        //   logger({
        //     context: "success",
        //     message: "Files formatted!",
        //   });
        // logger({
        //   context: "success",
        //   message: `Component ${component} created! 🎉`,
        // });
        // logger({
        //   context: "",
        //   message: `You can find it at: \n\n\ Component: ${path.join(
        //     process.cwd(),
        //     "src",
        //     "components",
        //     component,
        //   )} \n Stories: ${path.join(
        //     process.cwd(),
        //     "src",
        //     "stories",
        //     component,
        //   )} \n Tests: ${path.join(
        //     process.cwd(),
        //     "src",
        //     "tests",
        //     component,
        //   )} \n Sass: ${path.join(process.cwd(), "src", "sass", component)} \n`,
        // });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: String(error),
        });
    }
};
exports.default = addScript;
