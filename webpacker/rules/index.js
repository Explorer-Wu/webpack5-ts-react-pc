const {
  javascriptPreRule,
  // javascriptRule,
  // typescriptRule,
  tsJsRules,
  htmlRule,
  imagesRule,
  fontsRule
} = require("./common");
const {
  mixCssLessRules,
  mixCssSassRules,
  cssRule,
  lessModulesRule,
  lessRule,
  lessRules,
  sassModulesRule,
  sassRule,
  sassRules
} = require("./styles");
const { mediaRule } = require("./media");
const { svgRule, svgRules } = require("./svg");
// export * from './svg';

module.exports = {
  javascriptPreRule,
  // javascriptRule,
  // typescriptRule,
  tsJsRules,
  htmlRule,
  imagesRule,
  fontsRule,
  svgRule,
  svgRules,
  mediaRule,
  mixCssLessRules,
  mixCssSassRules,
  cssRule,
  lessModulesRule,
  lessRule,
  lessRules,
  sassModulesRule,
  sassRule,
  sassRules
};
