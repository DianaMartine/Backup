const prompt = require("prompt");
const { exec } = require("child_process");

const confirmCommand = (generatedCommand) => {
  const schema = {
    properties: {
      confirm: {
        description: `Deseja executar o comando gerado?`,
        type: "string",
        pattern: /^(y|n)$/,
        message: "Digite 'y' para sim ou 'n' para não",
        required: true,
      },
    },
  };

  prompt.get(schema, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.confirm === "n") {
      console.log("\nComando não executado, até mais!");
    } else if (result.confirm === "y") {
      console.log("\nComando executado, aguarde...\n");
      exec(`${generatedCommand}`, (err, stdout, stderr) => {
        if (err) {
          console.log("Error: ", err + "\n");
        } else if (stderr) {
          console.log("Error: ", stderr + "\n");
        } else {
          console.log("Output: ", stdout + "\n");
        }
      });
      return;
    }
  });
};

module.exports = confirmCommand;
