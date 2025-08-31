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
  sylvemonsintromod: {
    effectType: "Rule",
    name: "SylveMons Intro Mod",
    desc: "At the start of a battle, gives each player information about the the archive and SylveMons Resources thread so they can use them to get information about new additions",
    onBegin() {
      this.add("-message", `Welcome to SylveMons!`);
      this.add("-message", `This is a National Dex-based format where a multitude of moves, items, and abilities have been changed or added and a number of Pokemon have had their types changed as well!.`);
      this.add("-message", `If you need information on all of the new additions in this mod, then you can find the mod's spreadsheet here:`);
      this.add("-message", `https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit?usp=sharing`);
      this.add("-message", `You can also use /dt to get information quickly!`);
      this.add("-message", `You can also find metagame resources here:`);
      this.add("-message", `https://www.smogon.com/forums/threads/3646673/`);
    }
  }
};
//# sourceMappingURL=rulesets.js.map
