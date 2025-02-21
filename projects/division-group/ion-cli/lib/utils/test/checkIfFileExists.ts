import fs from "fs";

const checkIfFileExists = (file: string) => {
  if (fs.existsSync(file)) {
    return true;
  } else {
    return false;
  }
};

export default checkIfFileExists;
