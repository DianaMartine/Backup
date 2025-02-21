const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const dotenv = require("dotenv");

dotenv.config();

const options = yargs
  .option("username", {
    alias: "u",
    description: "Your GitHub username",
    type: "string",
  })
  .option("toUser", {
    alias: "t",
    description: "The username to post the repos to",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const moveRepos = async () => {
  if (!options.username) {
    console.log("Please provide a username");
    return;
  }

  if (!options.toUser) {
    console.log("Please provide a username to post the repos to");
    return;
  }

  if (!fs.existsSync(path.join(__dirname, "tmp"))) {
    console.log("Please run getRepos first");
    return;
  }

  if (!fs.existsSync(path.join(__dirname, "tmp", "repos.json"))) {
    console.log("Please run getRepos first");
    return;
  }

  console.log("Posting repos to GitHub...");
  console.log(`From: ${options.username}`);
  console.log(`To: ${options.toUser}`);

  await getFolders(options.username, options.toUser);

  console.log("Done!");
};

const getFolders = async (fromPathName, toPathName) => {
  const URL = `https://api.github.com/orgs/${options.toUser}/repos`;

  const insideLocalRepos = fs
    .readdirSync(path.join(__dirname, "tmp", `${fromPathName}-repos`))
    .toLocaleString({
      encoding: "utf8",
      withFileTypes: true,
    })
    .toLowerCase()
    .split(",");

  insideLocalRepos.forEach(async (repo) => {
    const opts = {
      org: toPathName,
      name: repo,
      description: `${repo} created by ${fromPathName}}`,
      homepage: "https://github.com",
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    };

    // const response = await fetch(
    //   `https://api.github.com/repos/${options.toUser}/${repo}`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `token ${process.env.GITHUB_TOKEN}`,
    //       "X-GitHub-Api-Version": "2022-11-28",
    //     },
    //     body: JSON.stringify(opts),
    //   }
    // );

    // const response = await fetch(URL, {
    // method: "POST",
    // headers: {
    // Authorization: `token ${process.env.GITHUB_TOKEN}`,
    // "X-GitHub-Api-Version": "2022-11-28",
    // },
    // body: JSON.stringify(opts),
    // });

    // const repos = await response.json();
    // console.log(repos);

    execSync(
      `
      cd tmp/${fromPathName}-repos/${repo} &&
      rm -rf .git &&
      git init &&
      git add . &&
      git commit -m "initial commit" &&
      git branch -M main &&
      git remote add origin git@github.com:diVision-Group/${repo}.git &&
      git push -u origin main --force
      `,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        console.log(`stdout: ${stdout}`);
      }
    );
  });
};

moveRepos();
