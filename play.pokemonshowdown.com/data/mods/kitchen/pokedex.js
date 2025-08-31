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
  athleetah: {
    num: 3002,
    name: "Athleetah",
    types: ["Normal", "Ground"],
    baseStats: { hp: 65, atk: 80, def: 65, spa: 65, spd: 65, spe: 145 },
    abilities: { 0: "Sprinter", 1: "Limber", H: "Quick Feet" },
    heightm: 1.6,
    weightkg: 45,
    color: "Yellow",
    eggGroups: ["Field", "Human-Like"],
    gen: 9
  },
  blunderbuzz: {
    num: 3005,
    name: "Blunderbuzz",
    types: ["Bug", "Dragon"],
    baseStats: { hp: 80, atk: 70, def: 120, spa: 135, spd: 70, spe: 50 },
    abilities: { 0: "Battle Armor", 1: "Technician", H: "Mega Launcher" },
    heightm: 2.2,
    weightkg: 268,
    color: "Green",
    eggGroups: ["Bug"],
    gen: 9
  },
  fortifether: {
    num: 3007,
    name: "Fortifether",
    types: ["Steel", "Dark"],
    baseStats: { hp: 75, atk: 90, def: 125, spa: 50, spd: 93, spe: 67 },
    abilities: { 0: "Tempered Steel", H: "Overcoat" },
    heightm: 1,
    weightkg: 144,
    color: "Gray",
    eggGroups: ["Flying"],
    gen: 9
  }
};
//# sourceMappingURL=pokedex.js.map
