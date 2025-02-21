const RegexModels = {
  emptyString: /^$/,
  comma: /,/,
  colon: /:/,
  twoSpaces: /\s\s+/g,
  dashes: /-/g,
  twoDashes: /--/g,
  lettersDashesUnderscoresColonsSpaces: /^[a-zA-Z-_:, ]+$/,
  numbers: /\d+$/,
  symbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+$/,
  underscore: /_/g,
  whitespace: /\s/g,
  undefined: /undefined/,
};

export default RegexModels;
