"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHelp = exports.addHelp = exports.configStorybookHelp = exports.initHelp = exports.help = exports.version = exports.remove = exports.add = exports.configStorybook = exports.init = exports.greeting = void 0;
const initScript_1 = __importDefault(require("../scripts/initScript"));
const addScript_1 = __importDefault(require("../scripts/addScript"));
const removeScript_1 = __importDefault(require("../scripts/removeScript"));
const info_1 = __importDefault(require("./info"));
const configStorybookScript_1 = __importDefault(require("../scripts/configStorybookScript"));
function greeting() {
    (0, info_1.default)("greeting");
}
exports.greeting = greeting;
function init(verbose) {
    (0, initScript_1.default)(verbose);
}
exports.init = init;
function configStorybook(verbose) {
    (0, configStorybookScript_1.default)(verbose);
}
exports.configStorybook = configStorybook;
function add(componentName, attrs, verbose) {
    (0, addScript_1.default)(componentName, attrs, verbose);
}
exports.add = add;
function remove(componentName, verbose) {
    (0, removeScript_1.default)(componentName, verbose);
}
exports.remove = remove;
function version() {
    (0, info_1.default)("version");
}
exports.version = version;
function help() {
    (0, info_1.default)("help");
}
exports.help = help;
function initHelp() {
    (0, info_1.default)("init-help");
}
exports.initHelp = initHelp;
function configStorybookHelp() {
    (0, info_1.default)("config-storybook-help");
}
exports.configStorybookHelp = configStorybookHelp;
function addHelp() {
    (0, info_1.default)("add-help");
}
exports.addHelp = addHelp;
function removeHelp() {
    (0, info_1.default)("remove-help");
}
exports.removeHelp = removeHelp;
