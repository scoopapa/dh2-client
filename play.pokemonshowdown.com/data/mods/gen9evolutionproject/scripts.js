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
  teambuilderConfig: {
    excludeStandardTiers: true,
    // sorting the teambuilder by slate / prompt
    customTiers: ["Pok\xE9mon of the Day!", "Evo!", "(Prevo)"],
    customDoublesTiers: ["Pok\xE9mon of the Day!", "Evo!", "(Prevo)"]
  },
  init() {
    let customList = [];
    for (const id in this.dataCache.Pokedex) {
      const notm = ["terablast", "hiddenpower"];
      const gen9only = [
        "plankteenie",
        "mareaniedrifter",
        "toxapexglacial",
        "nemesyst",
        "numeldormant",
        "dormedary",
        "dormaderupt"
      ];
      if (this.dataCache.Learnsets[id]) {
        for (const moveid of notm) {
          if (this.dataCache.Learnsets[id].learnset && this.dataCache.Learnsets[id].learnset[moveid]) {
            let learns = false;
            for (const method in this.dataCache.Learnsets[id].learnset[moveid]) {
              if (method.charAt(1) === "L" || method.charAt(1) === "E")
                learns = true;
            }
            if (!learns)
              delete this.modData("Learnsets", id).learnset[moveid];
          }
        }
      }
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
      if (!newMon.evos)
        customList.push(id);
      let copyMoves = newMon.copyData;
      if (newMon.copyMoves)
        copyMoves = newMon.copyMoves;
      if (copyMoves) {
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => !(method.includes("S") || notm.includes(moveid) && (method.includes("M") || method.includes("T")) || gen9only.includes(id) && !method.startsWith("9"))
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
      }
    }
    let random1 = Math.floor(Math.random() * customList.length);
    let random2 = Math.floor(Math.random() * (customList.length - 1));
    let random3 = Math.floor(Math.random() * (customList.length - 2));
    if (random2 >= random1)
      random2 += 1;
    if (random3 >= random1)
      random3 += 1;
    if (random3 >= random2)
      random3 += 1;
    this.modData("FormatsData", customList[random1]).tier = "Pok\xE9mon of the Day!";
    this.modData("FormatsData", customList[random2]).tier = "Pok\xE9mon of the Day!";
    this.modData("FormatsData", customList[random3]).tier = "Pok\xE9mon of the Day!";
  }
};
//# sourceMappingURL=scripts.js.map
