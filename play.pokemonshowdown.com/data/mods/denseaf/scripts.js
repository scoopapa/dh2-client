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
  gen: 9,
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["DAF"],
    customDoublesTiers: ["DAF"]
  },
  //adapting Nihilslaves's Createmons script
  spreadModify(baseStats, set) {
    const modStats = { hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 };
    const tr = this.trunc;
    let statName;
    for (statName in modStats) {
      const stat = baseStats[statName];
      modStats[statName] = tr(2 * stat + 31 + set.evs[statName] / 4) + 5;
    }
    if ("hp" in baseStats) {
      const stat = baseStats["hp"];
      modStats["hp"] = tr(2 * stat + 31 + set.evs["hp"] / 4 + 100) + 10;
    }
    return this.natureModify(modStats, set);
  }
};
//# sourceMappingURL=scripts.js.map
