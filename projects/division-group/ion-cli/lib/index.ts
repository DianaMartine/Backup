#! /usr/bin/env node
import * as yargs from "yargs";
import {
  greeting,
  add,
  remove,
  version,
  help,
  addHelp,
  removeHelp,
  init,
  initHelp,
  configStorybookHelp,
  configStorybook,
} from "./utils/utils";

const usage = `Usage: $0 <command> [options]`;

const params = yargs
  .option("name", {
    alias: "n",
    describe: "Component name",
    type: "string",
    demandOption: false,
  })
  .option("attributes", {
    alias: "a",
    describe: "Component attributes",
    type: "string",
    demandOption: false,
  })
  .option("verbose", {
    alias: "v",
    describe: "Verbose mode",
    type: "boolean",
    demandOption: false,
  });

export const options = yargs
  .usage(usage)
  .command(
    ["init", "i"],
    "Initialize the project",
    () => params,
    (argv) => {
      console.clear();
      const name = argv.name ?? argv._[1];

      if (name == "help") {
        initHelp();
        return;
      }

      init(argv.verbose);
    },
  )
  .command(
    ["config-storybook", "cs"],
    "Configure Storybook",
    () => params,
    (argv) => {
      console.clear();
      const name = argv.name ?? argv._[1];

      if (name == "help") {
        configStorybookHelp();
        return;
      }

      configStorybook(argv.verbose);
    },
  )
  .command(
    ["add", "a"],
    "Add a new component",
    () => params,
    (argv) => {
      console.clear();

      const name = argv.name ?? argv._[1];
      const attributes = argv.attributes ?? argv._[2];

      if (name != "help" && attributes == undefined) {
        add(String(name), "", argv.verbose);
        return;
      } else if (name == "help" && attributes == undefined) {
        addHelp();
        return;
      }

      add(String(name), String(attributes), argv.verbose);
    },
  )
  .command(
    ["remove", "r"],
    "Remove a component",
    () => params,
    (argv) => {
      console.clear();

      const name = argv.name ?? argv._[1];

      if (name == "help") {
        removeHelp();
        return;
      }

      remove(String(name), argv.verbose);
    },
  )
  .command("*", "Welcome Message", () => {
    console.clear();
    greeting();
  })
  .command(["version", "v"], "Show version", () => {
    console.clear();
    version();
  })
  .version(false)
  .command(["help", "h"], "Show help", () => {
    console.clear();
    help();
  })
  .help(false).argv;
