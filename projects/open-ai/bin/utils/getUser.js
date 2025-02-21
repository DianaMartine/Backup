const { exec } = require("child_process");

const getUser = () => {
  return new Promise((resolve, reject) => {
    exec("whoami", (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      } else if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

module.exports = getUser;
