"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../package.json"));
const log_1 = __importDefault(require("./log"));
const greeting = `Hello from Ion CLI v${package_json_1.default.version}! \u{1F680}`;
const version = `Version: ${package_json_1.default.version}
Description: ${package_json_1.default.description}`;
const help = `Help: ion <command> [options]

Description: This is a CLI for creating new components for the Ion Core library.

Commands:
    add <name>    Add a new component
    add <name> <attributes> Add a new component with attributes
    add help      Get help for add command

    remove <name> Remove a component
    version       Get the current version
    help          Get help

Options:
    h, help    Show help
    v, version Show version number

Examples:
    ion add button
    ion version
    ion help

Author: ${package_json_1.default.author.name}
License: ${package_json_1.default.license}
Repository: ${package_json_1.default.repository.url}
Maintainers: ${package_json_1.default.maintainers.map((m) => m.name).join(", ")}`;
const initHelp = `Help: ion init [options]

Description: This command initializes the Ion Core library.

Options:
    help Get help

Examples:

    Example 1:
    ion init

    Example 2:
    ion init --help`;
const storybookHelp = `Help: ion config storybook [options]

Description: This command configures Storybook for the Ion Core library.

Options:
    help Get help

Examples:
  
      Example 1:
      ion config storybook
  
      Example 2:
      ion config storybook --help`;
const addHelp = `Help: ion add <name> [options]

Description: This command adds a new component to the Ion Core library.

Options:
    -n, --name       Component name
    -a, --attributes Component attributes
    help             Get help

Examples:

    Example 1:
    ion add button
    ion add button label:string
    ion add button label:string,checked:boolean

    Example 2:
    ion add -n button
    ion add -n button -a label:string
    ion add -n button -a label:string,checked:boolean

    Example 3:
    ion add --name button
    ion add --name button --attributes label:string
    ion add --name button --attributes label:string,checked:boolean`;
const removeHelp = `Help: ion remove <name> [options]

Description: This command removes a component from the Ion Core library.

Options:
    -n, --name Component name
    help       Get help

Examples:

    Example 1:
    ion remove button

    Example 2:
    ion remove -n button

    Example 3:
    ion remove --name button`;
const info = (cmd) => {
    switch (cmd) {
        case "greeting":
            return (0, log_1.default)({
                context: "",
                message: greeting,
            });
        case "version":
        case "v":
            return (0, log_1.default)({
                context: "info",
                message: version,
            });
        case "help":
        case "h":
            return (0, log_1.default)({
                context: "info",
                message: help,
            });
        case "init-help":
            return (0, log_1.default)({
                context: "info",
                message: storybookHelp,
            });
        case "config-storybook-help":
            return (0, log_1.default)({
                context: "info",
                message: initHelp,
            });
        case "add-help":
            return (0, log_1.default)({
                context: "info",
                message: addHelp,
            });
        case "remove-help":
            return (0, log_1.default)({
                context: "info",
                message: removeHelp,
            });
        default:
            return;
    }
};
exports.default = info;
