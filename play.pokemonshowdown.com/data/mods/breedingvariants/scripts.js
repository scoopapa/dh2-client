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
  actions: {
    canMegaEvo(pokemon) {
      const species = pokemon.baseSpecies;
      const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
      const item = pokemon.getItem();
      if ((this.battle.gen <= 7 || this.battle.ruleTable.has("+pokemontag:past")) && altForme?.isMega && altForme?.requiredMove && pokemon.baseMoves.includes(toID(altForme.requiredMove)) && !item.zMove) {
        return altForme.name;
      }
      if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
        if (item.megaExcludes.includes(species.name))
          return null;
        if (species.name !== species.baseSpecies && item.altMegaStone.includes(species.name + "-Mega")) {
          return species.name + "-Mega";
        }
        return item.megaStone;
      }
      return null;
    }
  }
};
//# sourceMappingURL=scripts.js.map
