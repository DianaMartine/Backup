const lizDescription = require("../scripts/lizDescription.js");
const lizForce = require("../scripts/lizForce.js");
const liz = require("../scripts/liz.js");
const packageJson = require("../../package.json");

module.exports = {
  showHelp: showHelp,
  showVersion: showVersion,
  lizDescription: lizDescription,
  lizForce: lizForce,
  liz: liz,
};

const usage = `Usage: ts <command> [options]`;
const info = `Description: This is an AI project to help in terminal commands.`;
const version = `Version: ${packageJson.version}`;

function showHelp() {
  console.log(usage);
  console.log(info);
  console.log(version);
}

function showVersion() {
  console.log(version);
}
