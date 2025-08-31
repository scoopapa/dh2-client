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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  schooling: {
    onStart(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Soot Sprite" || pokemon.level < 20 || pokemon.transformed)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Soot Sprite") {
          pokemon.formeChange("Soot Sprite-Horde");
        }
      } else {
        if (pokemon.species.id === "sootspritehorde") {
          pokemon.formeChange("Soot Sprite");
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Soot Sprite" || pokemon.level < 20 || pokemon.transformed || !pokemon.hp)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Soot Sprite") {
          pokemon.formeChange("Soot Sprite-Horde");
        }
      } else {
        if (pokemon.species.id === "sootspritehorde") {
          pokemon.formeChange("Soot Sprite");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Horde",
    rating: 3,
    num: -1
  }
};
//# sourceMappingURL=abilities.js.map
