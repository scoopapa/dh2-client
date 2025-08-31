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
  standard: {
    effectType: "ValidatorRule",
    name: "Standard",
    ruleset: ["Obtainable", "Desync Clause Mod", "Sleep Clause Mod", "Freeze Clause Mod", "Species Clause", "OHKO Clause", "Evasion Moves Clause", "Endless Battle Clause", "HP Percentage Mod", "Cancel Mod"],
    banlist: ["Dig", "Fly"]
  },
  welcomemessage: {
    effectType: "Rule",
    name: "Welcome Message",
    desc: "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A",
    onBegin() {
      this.add("-message", "Welcome to RBY Expansion Pack!");
      this.add("-message", "This is a Solomod that adds things like scrapped content and crossgen evos to RBY OU.");
      this.add("-message", "For more information, please check this spreadsheet - ");
      this.add("-message", "https://docs.google.com/spreadsheets/d/1AVXdy6hSW_TtPr0HSGW9JT4m0bstLlPXnH3ccl-rQ20/edit?usp=sharing");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
