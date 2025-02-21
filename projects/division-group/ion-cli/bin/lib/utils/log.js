"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (log) => {
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
exports.default = logger;
