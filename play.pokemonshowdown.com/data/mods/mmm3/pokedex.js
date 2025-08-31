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
  cyclizar: {
    inherit: true,
    num: 1001,
    species: "Cyclizar",
    types: ["Dragon", "Fairy"],
    baseStats: { hp: 80, atk: 95, def: 75, spa: 85, spd: 75, spe: 121 },
    abilities: { 0: "Shed Skin", 1: "Pixilate", H: "Regenerator" }
  },
  toxapex: {
    inherit: true,
    num: 1002,
    species: "Toxapex",
    types: ["Water", "Poison"],
    baseStats: { hp: 65, atk: 63, def: 152, spa: 53, spd: 142, spe: 35 },
    abilities: { 0: "Merciless", 1: "Limber", H: "Regenerator" }
  },
  electivire: {
    inherit: true,
    num: 1003,
    species: "Electivire",
    types: ["Electric", "Fighting"],
    baseStats: { hp: 75, atk: 120, def: 80, spa: 75, spd: 85, spe: 105 },
    abilities: { 0: "Motor Drive", 1: "Reckless", H: "Vital Spirit" }
  },
  vileplume: {
    inherit: true,
    num: 1004,
    species: "Vileplume",
    types: ["Grass", "Poison"],
    baseStats: { hp: 80, atk: 80, def: 115, spa: 110, spd: 100, spe: 20 },
    abilities: { 0: "Static", 1: "Sticky Hold", H: "Limber" }
  },
  metagross: {
    inherit: true,
    num: 1005,
    species: "Metagross",
    types: ["Psychic", "Steel"],
    baseStats: { hp: 80, atk: 135, def: 130, spa: 85, spd: 100, spe: 70 },
    abilities: { 0: "Purifying Salt", H: "Light Metal" }
  },
  stunfiskgalar: {
    inherit: true,
    num: 1006,
    species: "Stunfisk-Galar",
    types: ["Ground", "Dark"],
    baseStats: { hp: 109, atk: 109, def: 99, spa: 66, spd: 84, spe: 88 },
    abilities: { 0: "Technician", 1: "Mimicry", H: "Inner Focus" }
  },
  moltresgalar: {
    inherit: true,
    num: 1007,
    species: "Moltres-Galar",
    types: ["Dark", "Flying"],
    baseStats: { hp: 90, atk: 75, def: 95, spa: 110, spd: 120, spe: 110 },
    abilities: { 0: "Berserk" }
  },
  ironmoth: {
    inherit: true,
    num: 1008,
    species: "Iron Moth",
    types: ["Fire", "Ice"],
    baseStats: { hp: 80, atk: 70, def: 65, spa: 130, spd: 115, spe: 110 },
    abilities: { 0: "Quark Drive", 1: "Shield Dust", H: "Slush Rush" }
  },
  spinarak: {
    inherit: true,
    num: 1009,
    species: "Spinarak",
    types: ["Bug", "Fairy"],
    baseStats: { hp: 80, atk: 50, def: 80, spa: 40, spd: 80, spe: 110 },
    abilities: { 0: "Pure Power" }
  },
  araquanid: {
    inherit: true,
    num: 1010,
    species: "Araquanid",
    types: ["Water", "Steel"],
    baseStats: { hp: 78, atk: 30, def: 82, spa: 80, spd: 142, spe: 22 },
    abilities: { 0: "Water Bubble", H: "Steelworker" }
  },
  galvantula: {
    inherit: true,
    num: 1011,
    species: "Galvantula",
    types: ["Bug", "Electric"],
    baseStats: { hp: 70, atk: 77, def: 80, spa: 107, spd: 80, spe: 108 },
    abilities: { 0: "Compound Eyes", 1: "Unnerve", H: "Swarm" }
  },
  hatterene: {
    inherit: true,
    num: 1012,
    species: "Hatterene",
    types: ["Psychic", "Fairy"],
    baseStats: { hp: 60, atk: 90, def: 95, spa: 135, spd: 105, spe: 30 },
    abilities: { 0: "Healer", 1: "Anticipation", H: "Magic Bounce" }
  }
};
//# sourceMappingURL=pokedex.js.map
