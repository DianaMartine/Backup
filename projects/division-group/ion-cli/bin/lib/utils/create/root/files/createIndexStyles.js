"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = __importDefault(require("../../../log"));
const createIndexStyles = (verbose) => __awaiter(void 0, void 0, void 0, function* () {
    verbose &&
        (0, log_1.default)({
            context: "info",
            message: "Creating index styles...",
        });
    try {
        fs_1.default.writeFileSync("./src/styles/token.scss", `@import url("http://fonts.cdnfonts.com/css/sifonn");
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap");

@import '~@division-group/design-tokens/dist/scss/globals.scss';
@import '~@division-group/design-tokens/dist/scss/mixins.scss';
@import '~@division-group/design-tokens/dist/scss/motions.scss';
@import '~@division-group/design-tokens/dist/scss/division-group/theme/dark.scss';

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

html {
font-size: 62.5%;
font-family: $font-family-2, sans-serif;
}
`);
        verbose &&
            (0, log_1.default)({
                context: "success",
                message: "Index styles created!",
            });
    }
    catch (error) {
        (0, log_1.default)({
            context: "error",
            message: `Error while creating index styles: ${error}`,
        });
    }
});
exports.default = createIndexStyles;
