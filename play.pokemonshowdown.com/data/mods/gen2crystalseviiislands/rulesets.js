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
  // Rulesets
  ///////////////////////////////////////////////////////////////////
  crystalseviiislandsmod: {
    effectType: "Rule",
    name: "Crystal: Sevii Islands Mod",
    desc: "At the start of a battle, gives each player a link to the Crystal: Sevii Islands spreasheet so they can use it to get information about new additions to the metagame.",
    onBegin() {
      this.add(`raw|<img src="https://www.smogon.com/forums/attachments/151df61d-7d50-438a-ac00-32f18fe1424b-png.395890/" height="212" width="381">`);
      this.add("-message", `Welcome to Crystal: Sevii Islands!`);
      this.add("-message", `This is a [Gen 2] OU-based format where we add new Fakemon, items, moves and even lore!`);
      this.add("-message", `You can find our spreadsheet with all the new additions here:`);
      this.add("-message", `https://docs.google.com/spreadsheets/d/1QL_789vTzxG8An43itUxPonK9ee7ezxH6GCR9dD_JyQ/edit?usp=sharing`);
      this.add("-message", `Good luck and have fun with your battle!`);
    }
  }
};
//# sourceMappingURL=rulesets.js.map
