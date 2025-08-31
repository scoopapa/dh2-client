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
  defaultdance: {
    num: 729.01,
    name: "Default Dance",
    types: ["Normal"],
    baseStats: { hp: 85, atk: 95, def: 95, spa: 95, spd: 95, spe: 85 },
    abilities: { 0: "Recycler", 1: "Gambler" }
  },
  strikester: {
    num: 729.02,
    name: "Strikester",
    types: ["Normal"],
    baseStats: { hp: 85, atk: 115, def: 95, spa: 75, spd: 75, spe: 100 },
    abilities: { 0: "Dauntless", 1: "Somewhat Reckless" }
  },
  beamster: {
    num: 729.03,
    name: "Beamster",
    types: ["Normal"],
    baseStats: { hp: 85, atk: 75, def: 75, spa: 115, spd: 95, spe: 100 },
    abilities: { 0: "Dauntless", 1: "Somewhat Reckless" }
  },
  jetpet: {
    num: 729.04,
    name: "Jet Pet",
    types: ["Normal"],
    baseStats: { hp: 85, atk: 70, def: 70, spa: 90, spd: 80, spe: 140 },
    abilities: { 0: "Faster", 1: "Regenerator" }
  },
  physter: {
    num: 729.05,
    name: "Physter",
    types: ["Normal"],
    baseStats: { hp: 115, atk: 100, def: 115, spa: 75, spd: 75, spe: 50 },
    abilities: { 0: "Resilient", 1: "Prickly" }
  },
  specter: {
    num: 729.06,
    name: "Specter",
    types: ["Normal"],
    baseStats: { hp: 115, atk: 75, def: 75, spa: 100, spd: 115, spe: 50 },
    abilities: { 0: "Resilient", 1: "Prickly" }
  },
  meanbean: {
    num: 729.07,
    name: "Mean Bean",
    types: ["Normal"],
    baseStats: { hp: 100, atk: 105, def: 90, spa: 85, spd: 75, spe: 70 },
    abilities: { 0: "Intimidate", 1: "Denigrate" }
  },
  matchupfish: {
    num: 729.08,
    name: "Match-Up Fish",
    types: ["Normal"],
    baseStats: { hp: 85, atk: 87, def: 78, spa: 87, spd: 78, spe: 120 },
    abilities: { 0: "Frisk", 1: "Hook Line" }
  }
};
//# sourceMappingURL=pokedex.js.map
