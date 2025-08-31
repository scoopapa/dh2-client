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
  inherit: "gen2",
  gen: 2,
  init() {
    const specialTypes = ["Fire", "Water", "Grass", "Ice", "Electric", "Dark", "Psychic", "Dragon", "Fairy"];
    let newCategory = "";
    for (const i in this.data.Moves) {
      if (!this.data.Moves[i])
        console.log(i);
      if (this.data.Moves[i].category === "Status")
        continue;
      newCategory = specialTypes.includes(this.data.Moves[i].type) ? "Special" : "Physical";
      if (newCategory !== this.data.Moves[i].category) {
        this.modData("Moves", i).category = newCategory;
      }
    }
  },
  teambuilderConfig: {
    specialTypes: ["Fire", "Water", "Grass", "Electric", "Ice", "Psychic", "Dark", "Dragon", "Fairy"]
  },
  // Guardia & Mimmeo held items
  pokemon: {
    inherit: true,
    getStat(statName, unboosted, unmodified, fastReturn) {
      if (statName === "hp")
        throw new Error("Please read `maxhp` directly");
      let stat = this.storedStats[statName];
      if (!unboosted) {
        let boost = this.boosts[statName];
        if (boost > 6)
          boost = 6;
        if (boost < -6)
          boost = -6;
        if (boost >= 0) {
          const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
          stat = Math.floor(stat * boostTable[boost]);
        } else {
          const numerators = [100, 66, 50, 40, 33, 28, 25];
          stat = Math.floor(stat * numerators[-boost] / 100);
        }
      }
      if (this.status === "par" && statName === "spe") {
        stat = Math.floor(stat / 4);
      }
      if (!unmodified) {
        if (this.status === "brn" && statName === "atk") {
          stat = Math.floor(stat / 2);
        }
      }
      stat = this.battle.clampIntRange(stat, 1, 999);
      if (fastReturn)
        return stat;
      if (!unboosted) {
        if (statName === "def" && this.side.sideConditions["reflect"] || statName === "spd" && this.side.sideConditions["lightscreen"]) {
          stat *= 2;
        }
      }
      if (["Cubone", "Marowak", "Marowak-Alola", "Guardia"].includes(this.baseSpecies.name) && this.item === "thickclub" && statName === "atk" || this.baseSpecies.name === "Pikachu" && this.item === "lightball" && statName === "spa") {
        stat *= 2;
      } else if (["Ditto", "Mimmeo"].includes(this.baseSpecies.name) && this.item === "metalpowder" && ["def", "spd"].includes(statName)) {
        stat = Math.floor(stat * 1.5);
      }
      return stat;
    }
  }
};
//# sourceMappingURL=scripts.js.map
