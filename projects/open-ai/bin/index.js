#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils/utils");
const usage = `Usage: ts <command> [options]`;

const options = yargs
  .usage(usage)
  .option("d", {
    alias: "description",
    describe: "Executa o modo Liz com descrição",
    type: "boolean",
    demandOption: false,
  })
  .option("f", {
    alias: "force",
    describe: "Executa o modo Liz forçando a execução do comando",
    type: "boolean",
    demandOption: false,
  })
  .command("description", "Executa o modo Liz com descrição", () => {
    yargs.alias("d", "description");
    require("./scripts/lizDescription").run();
  })
  .command("force", "Executa o modo Liz forçando a execução do comando", () => {
    require("./scripts/lizForce").run();
  })
  .help("h")
  .alias("h", "help")
  .version()
  .alias("v", "version").argv;

if (
  !yargs.argv._.length &&
  !yargs.argv.h &&
  !yargs.argv.v &&
  !yargs.argv.d &&
  !yargs.argv.f
) {
  utils.liz.run();
}

if (yargs.argv["help"] || yargs.argv["h"]) {
  utils.showHelp();
}

if (yargs.argv["version"] || yargs.argv["v"]) {
  utils.showVersion();
}

if (yargs.argv["description"] || yargs.argv["d"]) {
  utils.lizDescription.run();
}

if (yargs.argv["force"] || yargs.argv["f"]) {
  utils.lizForce.run();
}
