#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const yargs = __importStar(require("yargs"));
const utils_1 = require("./utils/utils");
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
exports.options = yargs
    .usage(usage)
    .command(["init", "i"], "Initialize the project", () => params, (argv) => {
    var _a;
    console.clear();
    const name = (_a = argv.name) !== null && _a !== void 0 ? _a : argv._[1];
    if (name == "help") {
        (0, utils_1.initHelp)();
        return;
    }
    (0, utils_1.init)(argv.verbose);
})
    .command(["config-storybook", "cs"], "Configure Storybook", () => params, (argv) => {
    var _a;
    console.clear();
    const name = (_a = argv.name) !== null && _a !== void 0 ? _a : argv._[1];
    if (name == "help") {
        (0, utils_1.configStorybookHelp)();
        return;
    }
    (0, utils_1.configStorybook)(argv.verbose);
})
    .command(["add", "a"], "Add a new component", () => params, (argv) => {
    var _a, _b;
    console.clear();
    const name = (_a = argv.name) !== null && _a !== void 0 ? _a : argv._[1];
    const attributes = (_b = argv.attributes) !== null && _b !== void 0 ? _b : argv._[2];
    if (name != "help" && attributes == undefined) {
        (0, utils_1.add)(String(name), "", argv.verbose);
        return;
    }
    else if (name == "help" && attributes == undefined) {
        (0, utils_1.addHelp)();
        return;
    }
    (0, utils_1.add)(String(name), String(attributes), argv.verbose);
})
    .command(["remove", "r"], "Remove a component", () => params, (argv) => {
    var _a;
    console.clear();
    const name = (_a = argv.name) !== null && _a !== void 0 ? _a : argv._[1];
    if (name == "help") {
        (0, utils_1.removeHelp)();
        return;
    }
    (0, utils_1.remove)(String(name), argv.verbose);
})
    .command("*", "Welcome Message", () => {
    console.clear();
    (0, utils_1.greeting)();
})
    .command(["version", "v"], "Show version", () => {
    console.clear();
    (0, utils_1.version)();
})
    .version(false)
    .command(["help", "h"], "Show help", () => {
    console.clear();
    (0, utils_1.help)();
})
    .help(false).argv;
