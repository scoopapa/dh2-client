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
    customTiers: ["VGC", "VGC NFE"],
    customDoublesTiers: ["VGC", "VGC NFE"]
  },
  init() {
    const moveLearnsets = {
      acidicrain: ["cacnea", "ghastly", "grimer", "grimeralola", "croagunk", "vullaby"],
      aircannon: ["gyarados", "flygon", "flamigo"],
      assurance: ["cacnea"],
      batonpass: ["tinkatink"],
      brine: ["cacnea"],
      bulletpunch: ["perrserker"],
      calmmind: ["milotic"],
      circlethrow: ["breloom"],
      dazzlinggleam: ["tinkatink"],
      doubleedge: ["kangaskhan", "stoutland"],
      drillpeck: ["flamigo"],
      forcefulhug: ["tangrowth", "beartic", "reuniclus", "muk", "mukalola", "kangaskhan", "snorlax"],
      healorder: ["vespiquen"],
      helpinghand: ["arbok"],
      iceshard: ["beartic"],
      mightyblow: ["snorlax", "braviary", "tinkatink"],
      oilspill: ["cacnea"],
      paranoia: ["golisopod", "orbeetle", "flygon"],
      partingshot: ["arbok"],
      passiveaggressive: ["espurr", "orbeetle", "reuniclus", "farigiraf", "delcatty"],
      poisonjab: ["vespiquen"],
      rampage: ["gyarados", "beartic", "golurk", "perrserker"],
      recalibration: ["rotom", "golurk"],
      slackoff: ["snorlax"],
      storedpower: ["golurk"],
      stringshot: ["tangela"],
      strongarm: ["reuniclus", "golurk", "snorlax"],
      swarmingstrike: ["tangela", "breloom", "volbeat", "illumise", "vespiquen", "accelgor", "escavalier", "flygon"],
      taunt: ["arbok"],
      triplekick: ["breloom", "sneasel"],
      uturn: ["stoutland"],
      wailingwraith: ["rotom", "espurr", "vullaby"],
      wavecrash: ["golisopod", "gyarados"],
      weatherball: ["tangela"]
    };
    for (const moveid in moveLearnsets) {
      for (const monid of moveLearnsets[moveid]) {
        if (!this.dataCache.Learnsets[monid]) {
          this.dataCache.Learnsets[monid] = { learnset: {} };
        }
        if (!this.dataCache.Learnsets[monid].learnset) {
          this.dataCache.Learnsets[monid].learnset = {};
        }
        this.modData("Learnsets", monid).learnset[moveid] = ["9M"];
      }
    }
    for (const mon in this.dataCache.Learnsets) {
      if (this.dataCache.Learnsets[mon].learnset?.surf) {
        this.modData("Learnsets", mon).learnset.eastseawave = ["9M"];
      }
    }
    for (const id in this.dataCache.Pokedex) {
      const newMon = this.dataCache.Pokedex[id];
      if (!newMon || !newMon.copyData)
        continue;
      const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
      if (!newMon.types && copyData.types)
        newMon.types = copyData.types;
      if (!newMon.baseStats && copyData.baseStats)
        newMon.baseStats = copyData.baseStats;
      if (!newMon.abilities && copyData.abilities)
        newMon.abilities = copyData.abilities;
      if (!newMon.num && copyData.num)
        newMon.num = copyData.num * -1;
      if (!newMon.genderRatio && copyData.genderRatio)
        newMon.genderRatio = copyData.genderRatio;
      if (!newMon.heightm && copyData.heightm)
        newMon.heightm = copyData.heightm;
      if (!newMon.weightkg && copyData.weightkg)
        newMon.weightkg = copyData.weightkg;
      if (!newMon.color && copyData.color)
        newMon.color = copyData.color;
      if (!newMon.eggGroups && copyData.eggGroups)
        newMon.eggGroups = copyData.eggGroups;
      let copyMoves = newMon.copyData;
      if (newMon.copyMoves)
        copyMoves = newMon.copyMoves;
      if (copyMoves) {
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => !method.includes("S")
          );
        }
        if (newMon.movepoolAdditions) {
          for (const move of newMon.movepoolAdditions) {
            this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)] = ["9M"];
          }
        }
        if (newMon.movepoolDeletions) {
          for (const move of newMon.movepoolDeletions) {
            delete this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)];
          }
        }
        if (newMon.name === "Eclipseroid") {
          for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
            this.modData("Learnsets", id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
              (method) => !method.includes("S")
            );
          }
        }
      }
    }
  }
};
//# sourceMappingURL=scripts.js.map
