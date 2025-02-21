import { Log } from "./types";

const logger = (log: Log) => {
  switch (log.context) {
    case "info":
      return console.log(`ℹ️ ${log.message}`);
    case "success":
      return console.log(`✅ ${log.message}`);
    case "error":
      return console.log(`❌ ${log.message}`);
    case "warning":
      return console.log(`⚠️ ${log.message}`);
    case "debug":
      return console.log(`🐛 ${log.message}`);
    default:
      return console.log(log.message);
  }
};

export default logger;
