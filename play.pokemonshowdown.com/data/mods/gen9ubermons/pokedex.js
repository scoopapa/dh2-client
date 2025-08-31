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
  landorus: {
    inherit: true,
    abilities: { 0: "Sand Force", H: "Defiant" }
  },
  urshifu: {
    inherit: true,
    baseStats: { hp: 100, atk: 120, def: 100, spa: 73, spd: 60, spe: 97 }
  },
  ogerponhearthflame: {
    inherit: true,
    abilities: { 0: "Regenerator" }
  },
  darkrai: {
    inherit: true,
    baseStats: { hp: 90, atk: 90, def: 90, spa: 120, spd: 90, spe: 120 }
  },
  kingambit: {
    inherit: true,
    baseStats: { hp: 100, atk: 125, def: 130, spa: 60, spd: 85, spe: 50 }
  },
  chienpao: {
    inherit: true,
    baseStats: { hp: 80, atk: 100, def: 80, spa: 90, spd: 85, spe: 135 }
  },
  chiyu: {
    inherit: true,
    baseStats: { hp: 85, atk: 90, def: 90, spa: 95, spd: 130, spe: 80 }
  },
  deoxys: {
    inherit: true,
    baseStats: { hp: 50, atk: 120, def: 90, spa: 120, spd: 90, spe: 130 },
    abilities: { 0: "Infiltrator" }
  },
  deoxysattack: {
    inherit: true,
    baseStats: { hp: 50, atk: 150, def: 80, spa: 150, spd: 80, spe: 90 },
    abilities: { 0: "No Guard" }
  },
  deoxysdefense: {
    inherit: true,
    abilities: { 0: "Thick Fat" }
  },
  deoxysspeed: {
    inherit: true,
    baseStats: { hp: 50, atk: 90, def: 110, spa: 90, spd: 110, spe: 150 },
    abilities: { 0: "Aftermath" }
  }
};
//# sourceMappingURL=pokedex.js.map
