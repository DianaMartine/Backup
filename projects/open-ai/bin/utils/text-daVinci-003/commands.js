const openai = require("../openAI");

const commands = {
  listCommands: async (description) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Escreva uma lista de até 3 comandos shell que faça o seguinte: ${description}.`,
      max_tokens: 2048,
      temperature: 1,
      n: 1,
      stop: null,
    });
    return response.data.choices[0].text.trim();
  },
  generateDescription: async (command) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Escreva uma descrição resumida para o comando shell: ${command}.`,
      max_tokens: 2048,
      temperature: 1,
      n: 1,
      stop: null,
    });
    return response.data.choices[0].text.trim();
  },
  executeCommand: async (command) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Execute o comando shell: ${command}.`,
      max_tokens: 2048,
      temperature: 1,
      n: 1,
      stop: null,
    });
    return response.data.choices[0].text.trim();
  },
};

module.exports = commands;
