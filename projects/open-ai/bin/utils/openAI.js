require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPEN_AI_ORGANIZATION,
});

const openai = new OpenAIApi(config);

module.exports = openai;
