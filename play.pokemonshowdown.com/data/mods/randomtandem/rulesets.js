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
  randomtandemrule: {
    effectType: "Rule",
    name: "Random Tandem Rule",
    desc: ".",
    onValidateTeam(team) {
      if (team.length != 3)
        return "You must bring 3 Pokemon.";
    },
    onBegin() {
      for (const side of this.sides) {
        for (const pokemon of side.pokemon) {
          if (!pokemon.baseSpecies.mons)
            continue;
          let prob = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3];
          let num1 = this.sample(prob);
          let mon1 = pokemon.baseSpecies.mons[num1];
          prob = prob.filter((num) => num !== num1);
          let num2 = this.sample(prob);
          let mon2 = pokemon.baseSpecies.mons[num2];
          let poke1 = this.dex.deepClone(mon1[0]);
          poke1.moves = mon1[1];
          let poke2 = this.dex.deepClone(mon2[0]);
          poke2.moves = mon2[1];
          let newPoke1 = side.addPokemon(poke1);
          let newPoke2 = side.addPokemon(poke2);
        }
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
