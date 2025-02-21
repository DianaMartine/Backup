const { exec } = require("child_process");
const prompt = require("prompt");
const getUser = require("../utils/getUser");
const commands = require("../utils/text-daVinci-003/commands");
const checkConnection = require("../utils/checkConnection");

const run = async () => {
  console.clear();

  await checkConnection();

  prompt.start();

  const schema = {
    properties: {
      command: {
        description: `Olá ${await getUser()}, eu sou a Liz e estou no modo de execução forçada, eu posso te ajudar a executar comandos shell. Digite uma descrição para o comando que você deseja executar`,
        type: "string",
        required: true,
      },
    },
  };

  prompt.get(schema, async (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(`\nExecutando comando...`);
    const command = result.command;

    const generatedCommands = await commands.executeCommand(command);

    exec(`sudo ${generatedCommands}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    console.log(`\nComando Executado:\n\n${generatedCommands}\n`);
  });
};

module.exports = {
  run: run,
};
