import packageJson from "../../package.json";
import logger from "./log";

const greeting = `Hello from Ion CLI v${packageJson.version}! \u{1F680}`;

const version = `Version: ${packageJson.version}
Description: ${packageJson.description}`;

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

Author: ${packageJson.author.name}
License: ${packageJson.license}
Repository: ${packageJson.repository.url}
Maintainers: ${packageJson.maintainers.map((m) => m.name).join(", ")}`;

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

const info = (cmd: string) => {
  switch (cmd) {
    case "greeting":
      return logger({
        context: "",
        message: greeting,
      });
    case "version":
    case "v":
      return logger({
        context: "info",
        message: version,
      });
    case "help":
    case "h":
      return logger({
        context: "info",
        message: help,
      });
    case "init-help":
      return logger({
        context: "info",
        message: storybookHelp,
      });
    case "config-storybook-help":
      return logger({
        context: "info",
        message: initHelp,
      });
    case "add-help":
      return logger({
        context: "info",
        message: addHelp,
      });
    case "remove-help":
      return logger({
        context: "info",
        message: removeHelp,
      });
    default:
      return;
  }
};

export default info;
