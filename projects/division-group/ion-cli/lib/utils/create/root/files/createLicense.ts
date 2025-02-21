import fs, { readFileSync } from "fs";
import logger from "../../../log";
import licenses from "../../../../assets/licenses.json";
import prompts from "prompts";
import path from "path";

const createLicense = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating LICENSE.md...",
    });

  try {
    await prompts(
      {
        type: "select",
        name: "license",
        message: "License:",
        choices: licenses.map((l) => {
          return {
            title: l.name,
            value: l.name,
            description: l.description,
          };
        }),
        initial: 0,
        min: 1,
      },
      {
        onCancel: () => {
          return process.exit(0);
        },
      },
    ).then(async (res) => {
      let license = `${licenses.find((l) => l.name === res.license)?.content}`;

      let keys = [
        {
          name: "year",
          keys: ["<year>", "[yyyy]", "[year]"],
        },
        {
          name: "yearWithAuthor",
          keys: [" year name of author"],
        },
        {
          name: "author",
          keys: ["<name of author>"],
        },
        {
          name: "project",
          keys: ["[name of copyright owner]", "[fullname]", "<program>"],
        },
        {
          name: "projectWithDescription",
          keys: [
            "<one line to give the program's name and a brief idea of what it does.>",
            "<one line to give the library's name and a brief idea of what it does.>",
          ],
        },
      ];

      keys.forEach((key) => {
        switch (key.name) {
          case "year":
            return key.keys.map((k) => {
              for (let i = 0; i < 2; i++) {
                license = license.replace(k, `${new Date().getFullYear() + i}`);
              }
            });
          case "yearWithAuthor":
            return key.keys.forEach((k) => {
              let author = JSON.parse(
                readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
              ).author;

              license = license.replace(
                k,
                ` ${new Date().getFullYear().toString()} ${author}`,
              );
            });
          case "author":
            return key.keys.map((k) => {
              for (let i = 0; i < 2; i++) {
                license = license.replace(
                  k,
                  JSON.parse(
                    readFileSync(
                      path.join(process.cwd(), "package.json"),
                      "utf-8",
                    ),
                  ).author,
                );
              }
            });
          case "project":
            return key.keys.forEach((k) => {
              let name = JSON.parse(
                readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
              ).name;

              license = license.replace(
                k,
                `${
                  String(name).charAt(0).toUpperCase() +
                  String(name).slice(1).replace(/-/g, " ")
                }`,
              );
            });
          case "projectWithDescription":
            return key.keys.forEach((k) => {
              let name = JSON.parse(
                readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
              ).name;

              let description = JSON.parse(
                readFileSync(path.join(process.cwd(), "package.json"), "utf-8"),
              ).description;

              license = license.replace(
                k,
                `${
                  String(name).charAt(0).toUpperCase() +
                  String(name).slice(1).replace(/-/g, " ")
                } - ${description}`,
              );
            });
        }
      });

      fs.writeFileSync("./LICENSE.md", license);
    });

    verbose &&
      logger({
        context: "success",
        message: "LICENSE.md created!",
      });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating LICENSE.md: ${error}`,
    });
  }
};

export default createLicense;
