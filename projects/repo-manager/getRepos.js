const yargs = require("yargs");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

dotenv.config();

const options = yargs
  .option("username", {
    alias: "u",
    description: "Your GitHub username",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const getRepos = async () => {
  if (!options.username) {
    console.log("Please provide a username. E.g.: node getRepos.js -u='username'");
    return;
  }

  console.log("Getting repos from GitHub...");

  const username = options.username;
  console.log(`Username: ${username}`);

  const URL = `https://api.github.com/users/${username}/repos`;
  console.log(`Fetching: ${URL}`);

  const headers = {
    Authorization: process.env.ACCESS_TOKEN,
  };

  const response = await fetch(URL, { headers });
  const repos = await response.json();
  console.log(`Found ${repos.length} repos`);

  const tmpPath = path.join(__dirname, "tmp");
  console.log(`Checking for tmp directory: ${tmpPath}`);

  if (!fs.existsSync(tmpPath)) {
    console.log("No tmp directory found, creating...");
    fs.mkdirSync(tmpPath);
  }

  const filePath = path.join(tmpPath, "repos.json");
  console.log(`Writing repos to ${filePath}`);

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      username,
      data: repos.map((repo) => {
        return {
          repo_name: repo.full_name,
          repo_url: repo.clone_url
        }
      })
    }, null, 2)
  );

  console.log("Cloning repos...");
  await cloneRepos();

  console.log("Getting repos done!");
};

const cloneRepos = async () => {
  const tmpPath = path.join(__dirname, "tmp");
  console.log(`Checking for tmp directory: ${tmpPath}`);

  const filePath = path.join(tmpPath, "repos.json");
  console.log(`Reading repos from ${filePath}`);

  const repos = require(filePath);
  console.log(`Found ${repos.data.length} repos`);

  const reposPath = path.join(tmpPath, `${repos.username}-repos`);
  console.log(`Checking for repos directory: ${reposPath}`);

  if (!fs.existsSync(reposPath)) {
    console.log("No reposPath directory found, creating...");
    fs.mkdirSync(reposPath);
  }

  console.log(repos.data)
  repos.data.forEach((repo) => {
    console.log(`Cloning ${repo.repo_name}...`);
    execSync(
      `
        cd ${reposPath} &&
        git clone ${repo.repo_url}
        `,
      (err, stdout) => {
        if (err) {
          console.error(err);
        }
        console.log(stdout);
      }
    )
  })
  console.log("Cloning repos done!");
};

getRepos();