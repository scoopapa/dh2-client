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
var pokedex_exports = {};
__export(pokedex_exports, {
  Pokedex: () => Pokedex
});
module.exports = __toCommonJS(pokedex_exports);
const Pokedex = {
  tinkaton: {
    inherit: true,
    baseStats: { hp: 85, atk: 95, def: 77, spa: 70, spd: 105, spe: 94 }
  },
  salamence: {
    inherit: true,
    baseStats: { hp: 115, atk: 135, def: 80, spa: 110, spd: 80, spe: 100 }
  },
  electrodehisui: {
    inherit: true,
    abilities: { 0: "Soundproof", 1: "Magic Guard", H: "Aftermath" }
  },
  delphox: {
    inherit: true,
    types: ["Fire", "Fairy"],
    baseStats: { hp: 95, atk: 69, def: 72, spa: 114, spd: 100, spe: 104 }
  },
  slitherwing: {
    inherit: true,
    abilities: { 0: "Protosynthesis", H: "Fluffy" }
  },
  taurospaldeacombat: {
    inherit: true,
    types: ["Fighting", "Fairy"],
    baseStats: { hp: 75, atk: 110, def: 125, spa: 30, spd: 70, spe: 100 }
  },
  cloyster: {
    inherit: true,
    types: ["Ice", "Ground"]
  }
};
//# sourceMappingURL=pokedex.js.map
