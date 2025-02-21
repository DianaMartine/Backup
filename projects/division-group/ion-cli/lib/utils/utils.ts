import initScript from "../scripts/initScript";
import addScript from "../scripts/addScript";
import removeScript from "../scripts/removeScript";
import info from "./info";
import configStorybookScript from "../scripts/configStorybookScript";

export function greeting() {
  info("greeting");
}

export function init(verbose?: boolean) {
  initScript(verbose);
}

export function configStorybook(verbose?: boolean) {
  configStorybookScript(verbose);
}

export function add(componentName: string, attrs?: string, verbose?: boolean) {
  addScript(componentName, attrs, verbose);
}

export function remove(componentName: string, verbose?: boolean) {
  removeScript(componentName, verbose);
}

export function version() {
  info("version");
}

export function help() {
  info("help");
}

export function initHelp() {
  info("init-help");
}

export function configStorybookHelp() {
  info("config-storybook-help");
}

export function addHelp() {
  info("add-help");
}

export function removeHelp() {
  info("remove-help");
}
