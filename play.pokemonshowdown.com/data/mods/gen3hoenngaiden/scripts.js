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
var import_learnsetupdate = require("../../mods/gen3hoenngaiden/learnsetupdate");
const Scripts = {
  gen: 3,
  inherit: "gen3",
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["New", "S1", "S2", "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "D1", "D2", "D3", "E", "Unranked", "NFE", "LC", "Uber"]
  },
  init() {
    for (const species in this.data.Pokedex) {
      delete this.data.Pokedex[species].abilities["H"];
    }
    for (const species in this.dataCache?.Pokedex) {
      if (this.modData("FormatsData", species) && this.modData("FormatsData", species).tier !== "Uber") {
        if (this.modData("FormatsData", species).rank !== "Unranked") {
          this.modData("FormatsData", species).tier = this.modData("FormatsData", species).rank;
        } else {
          this.modData("FormatsData", species).tier = "Unranked";
        }
      }
    }
    ;
    (0, import_learnsetupdate.learnsetUpdate)(this);
  }
};
//# sourceMappingURL=scripts.js.map
