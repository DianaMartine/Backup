import fs from "fs";

const hasInExports = (component: string, index: string) => {
  const data = fs.readFileSync(index, "utf8");

  const regexImport = new RegExp(
    `export { default as ${component} } from "./components/${component}"`,
  );

  if (!regexImport.test(data)) {
    fs.appendFileSync(
      index,
      `export { default as ${component} } from "./components/${component}";\n`,
    );
  }
};

export default hasInExports;
