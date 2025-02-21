import fs from "fs";
import logger from "../../../log";
import prompts from "prompts";

const createNpmRc = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating .npmrc file...",
    });

  try {
    await prompts(
      [
        {
          type: "text",
          name: "registry",
          message: "Registry username:",
          initial: "some-username",
          validate: (value) => {
            const pattern = /^[a-z0-9_-]{3,16}$/;
            return pattern.test(value) ? true : "Invalid username!";
          },
        },
        {
          type: "text",
          name: "url",
          message: "URL:",
          initial: "https://npm.pkg.github.com",
          validate: (value) => {
            const pattern =
              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return pattern.test(value) ? true : "Invalid URL!";
          },
        },
        {
          type: "text",
          name: "token",
          message: "Token:",
          initial: "${GITHUB_TOKEN}",
        },
      ],
      {
        onCancel: () => {
          process.exit(0);
        },
      },
    ).then(async (res) => {
      return await prompts(
        [
          {
            type: "select",
            name: "options",
            message: `Confirm data:\n\nRegistry username: ${res.registry}\nURL: ${res.url}\nToken: ${res.token}\n\n`,
            choices: [
              {
                title: "Yes",
                value: "yes",
                description: "Create .npmrc file",
              },
              {
                title: "No",
                value: "no",
                description: "Skip .npmrc file",
              },
              {
                title: "Cancel",
                value: "cancel",
                description: "Cancel process",
              },
            ],
            initial: 0,
            min: 1,
          },
        ],
        {
          onCancel: () => {
            process.exit(0);
          },
        },
      ).then(async (confirm) => {
        switch (confirm.options) {
          case "yes":
            let npmrc = `${String(res.registry).includes("@") ? "" : "@"}${
              res.registry
            }:registry=${res.url}\n//${res.url}/:_authToken=${res.token}`;

            return fs.writeFileSync(".npmrc", npmrc);
          case "no":
            await createNpmRc(verbose);
          case "cancel":
            process.exit(0);
        }
      });
    });

    verbose &&
      logger({
        context: "success",
        message: ".npmrc file created!",
      });

    return;
  } catch (error) {
    logger({
      context: "error",
      message: `Error creating .npmrc file: ${error}`,
    });
  }
};

export default createNpmRc;
