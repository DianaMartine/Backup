import fs from "fs";
import logger from "../../../log";

const createIndexStyles = async (verbose?: boolean) => {
  verbose &&
    logger({
      context: "info",
      message: "Creating index styles...",
    });

  try {
    fs.writeFileSync(
      "./src/styles/token.scss",
      `@import url("http://fonts.cdnfonts.com/css/sifonn");
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
`,
    );

    verbose &&
      logger({
        context: "success",
        message: "Index styles created!",
      });
  } catch (error) {
    logger({
      context: "error",
      message: `Error while creating index styles: ${error}`,
    });
  }
};

export default createIndexStyles;
