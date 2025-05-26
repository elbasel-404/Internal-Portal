
import { type Config } from "prettier";

const config: Config = {
  trailingComma: "all",
  arrowParens: "avoid",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  jsxSingleQuote: false,
  singleQuote: false,
  tabWidth: 2,
  objectWrap: "collapse",
};

module.exports = config;