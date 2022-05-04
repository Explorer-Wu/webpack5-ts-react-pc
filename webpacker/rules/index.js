const {
  typescriptRule,
  javascriptRule,
  tsJsRules,
  htmlRule,
  imagesRule,
  fontsRule
} = require("./common");
const {
  cssRule,
  lessModulesRule,
  lessRule,
  lessRules,
  sassModulesRule,
  sassRule,
  sassRules
} = require("./styles");
const { mediaRule } = require("./media");
const { svgReactComponentRule, svgRule, svgRules } = require("./svg");
// export * from './svg';

module.exports = {
  typescriptRule,
  javascriptRule,
  tsJsRules,
  htmlRule,
  imagesRule,
  fontsRule,
  svgReactComponentRule,
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
