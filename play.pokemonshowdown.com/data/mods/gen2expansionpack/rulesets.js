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
  obtainablemoves: {
    inherit: true
  },
  standard: {
    effectType: "ValidatorRule",
    name: "Standard",
    ruleset: ["Obtainable", "Sleep Clause Mod", "Freeze Clause Mod", "Species Clause", "Nickname Clause", "OHKO Clause", "Evasion Items Clause", "Evasion Moves Clause", "Endless battle Clause", "HP Percentage Mod", "Cancel Mod"],
    banlist: [
      "Hypnosis + Mean Look",
      "Hypnosis + Spider Web",
      "Lovely Kiss + Mean Look",
      "Lovely Kiss + Spider Web",
      "Sing + Mean Look",
      "Sing + Spider Web",
      "Sleep Powder + Mean Look",
      "Sleep Powder + Spider Web",
      "Spore + Mean Look",
      "Spore + Spider Web"
    ]
  },
  welcomemessage: {
    effectType: "Rule",
    name: "Welcome Message",
    desc: "",
    onBegin() {
      this.add("-message", "Welcome to Johto Expansion Pack!");
      this.add("-message", "This is a Solomod that adds things like scrapped content and crossgen evos to GSC OU.");
      this.add("-message", "For more information, please check this spreadsheet - ");
      this.add("-message", "https://docs.google.com/spreadsheets/d/1t54hCQrMGj102ck9L7mW47GJxrHMmJy5Ygum6ldWVX0/edit?usp=sharing");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
