const prompt = require("prompt");
const getUser = require("../utils/getUser");
const commands = require("../utils/text-daVinci-003/commands");
const confirmCommand = require("../utils/confirmCommand");
const checkConnection = require("../utils/checkConnection");

const run = async () => {
  console.clear();

  await checkConnection();

  prompt.start();

  const schema = {
    properties: {
      command: {
        description: `Olá ${await getUser()}, eu sou a Liz e estou no modo de execução com confirmação, eu posso te ajudar a executar comandos shell. Digite uma descrição para o comando que você deseja executar`,
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

    console.log(`\nComandos Gerados:\n\n${generatedCommands}\n`);

    const commandsSchema = {
      properties: {
        command: {
          description: `Escolha um ou mais comandos acima para executar (separados por vírgula)`,
          type: "string",
          pattern: /^(1|2|3|4|5|6|7|8|9|10)(,(1|2|3|4|5|6|7|8|9|10))*$/,
          message: "Digite um ou mais números de 1 a 10 separados por vírgula",
          required: true,
        },
      },
    };

    prompt.get(commandsSchema, (err, result) => {
      if (err) {
        console.log(err);
      }

      const selectedCommands = result.command.split(",").map((command) => {
        return generatedCommands.split("\n")[command - 1];
      });

      const commandsToExecute = selectedCommands.map((command) => {
        return command.split(" ").slice(1).join(" ");
      });

      console.log(`\nOs comandos selecionados foram:\n\n${commandsToExecute.join("\n")}\n`);

      const finalCommandToExecute = commandsToExecute.join(" && ");

      confirmCommand(finalCommandToExecute);
    });

    // prompt.get(commandsSchema, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   const selectedCommand = generatedCommands.split("\n")[result.command - 1];
    //   const generatedCommand = selectedCommand.split(" ").slice(1).join(" ");
    //   confirmCommand(generatedCommand);
    // });
  });
};

module.exports = {
  run: run,
};
