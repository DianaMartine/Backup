const prompt = require("prompt");
const getUser = require("../utils/getUser");
const commands = require("../utils/text-daVinci-003/commands");
const confirmCommand = require("../utils/confirmCommand");
const checkConnection = require("../utils/checkConnection")

const run = async () => {
  console.clear();

  await checkConnection();

  prompt.start();

  const schema = {
    properties: {
      command: {
        description: `Olá ${await getUser()}, eu sou a Liz e estou no modo de execução com descrição e confirmação, eu posso te ajudar a executar comandos shell. Digite uma descrição para o comando que você deseja executar`,
        type: "string",
        required: true,
      },
    },
  };

  prompt.get(schema, async (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(`\nAguarde enquanto eu gero os comandos para você executar...`);
    const command = result.command;

    const generatedCommands = await commands.listCommands(command);

    for (let i = 0; i < generatedCommands.split("\n").length; i++) {
      const description = await commands.generateDescription(
        generatedCommands.split("\n")[i]
      );
      console.log(`\n${i + 1} - ${description}`);
    }

    console.log(`\nComandos Gerados:\n\n${generatedCommands}\n`);

    const commandsSchema = {
      properties: {
        command: {
          description: `Escolha um dos comandos acima para executar`,
          type: "string",
          pattern: /^(1|2|3|4|5|6|7|8|9|10)$/,
          message: "Digite um número de 1 a 10",
          required: true,
        },
      },
    };

    prompt.get(commandsSchema, (err, result) => {
      if (err) {
        console.log(err);
      }
      const selectedCommand = generatedCommands.split("\n")[result.command - 1];
      const generatedCommand = selectedCommand.split(" ").slice(1).join(" ");
      confirmCommand(generatedCommand);
    });
  });
};

module.exports = {
  run: run,
};
