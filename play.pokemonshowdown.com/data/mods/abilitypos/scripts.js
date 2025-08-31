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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  init() {
    this.modData("Learnsets", "sceptile").learnset.flipturn = ["8L1"];
    this.modData("Learnsets", "sceptile").learnset.liquidation = ["8L1"];
    this.modData("Learnsets", "sceptile").learnset.aquajet = ["8L1"];
    delete this.modData("Learnsets", "sceptile").learnset.irontail;
    delete this.modData("Learnsets", "sceptile").learnset.agility;
    delete this.modData("Learnsets", "sceptile").learnset.furycutter;
    this.modData("Learnsets", "charizard").learnset.uturn = ["8L1"];
    this.modData("Learnsets", "inteleon").learnset.knockoff = ["8L1"];
    this.modData("Learnsets", "inteleon").learnset.poisonjab = ["8L1"];
    this.modData("Learnsets", "inteleon").learnset.sludgebomb = ["8L1"];
    this.modData("Learnsets", "inteleon").learnset.toxic = ["8L1"];
    this.modData("Learnsets", "inteleon").learnset.recover = ["8L1"];
    this.modData("Learnsets", "lanturn").learnset.nuzzle = ["8L1"];
    this.modData("Learnsets", "lanturn").learnset.flipturn = ["8L1"];
    this.modData("Learnsets", "larvesta").learnset.defog = ["8L1"];
    this.modData("Learnsets", "carbink").learnset.painsplit = ["8L1"];
    this.modData("Learnsets", "sableye").learnset.defog = ["8L1"];
    this.modData("Learnsets", "sableye").learnset.teleport = ["8L1"];
    this.modData("Learnsets", "sableye").learnset.thunderwave = ["8L1"];
    this.modData("Learnsets", "hatterene").learnset.moonblast = ["8L1"];
    this.modData("Learnsets", "hatterene").learnset.recover = ["8L1"];
    this.modData("Learnsets", "hatterene").learnset.teleport = ["8L1"];
    this.modData("Learnsets", "raticatealola").learnset.gunkshot = ["8L1"];
    this.modData("Learnsets", "raticatealola").learnset.poisonjab = ["8L1"];
    this.modData("Learnsets", "raticatealola").learnset.drillrun = ["8L1"];
    this.modData("Learnsets", "lapras").learnset.teleport = ["8L1"];
    this.modData("Learnsets", "lapras").learnset.flipturn = ["8L1"];
    this.modData("Learnsets", "lapras").learnset.recover = ["8L1"];
    delete this.modData("Learnsets", "sableye").learnset.willowisp;
  }
};
//# sourceMappingURL=scripts.js.map
