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
  perdemos1anaconja: {
    num: 1.5,
    species: "perdemos 1-anaconja",
    types: ["Ground", "Water"],
    baseStats: { hp: 115, atk: 60, def: 84, spa: 81, spd: 87, spe: 65 },
    abilities: { 0: "Ball Fetch", 1: "Poison Heal" }
  },
  perdemos3anaconja: {
    num: 2.5,
    species: "perdemos 3-anaconja",
    types: ["Flying"],
    baseStats: { hp: 100, atk: 60, def: 105, spa: 120, spd: 105, spe: 80 },
    abilities: { 0: "Thick Fat" }
  },
  perdemos2anaconja: {
    num: 3.5,
    species: "perdemos 2-anaconja",
    types: ["Poison", "Fairy"],
    baseStats: { hp: 100, atk: 60, def: 81, spa: 81, spd: 81, spe: 64 },
    abilities: { 0: "Ball Fetch" }
  },
  vailaflygravitymonkey: {
    num: 4.5,
    species: "Vailafly-gravitymonkey",
    types: ["Bug"],
    baseStats: { hp: 65, atk: 60, def: 63, spa: 64, spd: 64, spe: 151 },
    abilities: { 0: "Illuminate" }
  },
  komodoregravitymonkey: {
    num: 5.5,
    species: "Komodore-gravitymonkey",
    types: ["Rock"],
    baseStats: { hp: 99, atk: 60, def: 89, spa: 150, spd: 98, spe: 136 },
    abilities: { 0: "Stalwart" }
  },
  cutternalgravitymonkey: {
    num: 6.5,
    species: "Cutternal-gravitymonkey",
    types: ["Water", "Ground"],
    baseStats: { hp: 150, atk: 60, def: 159, spa: 115, spd: 130, spe: 123 },
    abilities: { 0: "Suction Cups", 1: "Sap Sipper" }
  }
};
//# sourceMappingURL=pokedex.js.map
