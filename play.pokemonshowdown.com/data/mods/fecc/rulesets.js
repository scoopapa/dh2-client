"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var rulesets_exports = {};
__export(rulesets_exports, {
  Rulesets: () => Rulesets
});
module.exports = __toCommonJS(rulesets_exports);
const Rulesets = {
  intromod: {
    effectType: "Rule",
    name: "Intro Mod",
    desc: "plays the intro for fecc",
    onBegin() {
      this.add("-message", "");
      this.add("-message", "Welcome to Fusion Evolution Corrupt Council! This is one of the April Fools formats from the Fusion Evolution series, built to be fun and chaotic.");
      this.add("-message", "In this format, there are 151 fusions, each with an unique ability with some wacky effect.");
      this.add("-message", "Both the fusions and their abilities are hidden to the players, however, their effects are always some sort of mix of real ability effects, depending on the abilities of the Pok\xE9mon used for the fusions. ");
      this.add("-message", "Go out there and try to figure out how each ability works!");
      this.add("-message", "");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
