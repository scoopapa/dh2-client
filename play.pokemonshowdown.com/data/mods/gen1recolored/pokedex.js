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
  weezing: {
    inherit: true,
    baseStats: { hp: 105, atk: 120, def: 140, spa: 100, spd: 100, spe: 35 }
  },
  muk: {
    inherit: true,
    baseStats: { hp: 130, atk: 110, def: 105, spa: 125, spd: 125, spe: 30 }
  },
  arcanine: {
    inherit: true,
    baseStats: { hp: 90, atk: 125, def: 85, spa: 100, spd: 100, spe: 81 }
  },
  alakazam: {
    inherit: true,
    baseStats: { hp: 55, atk: 50, def: 45, spa: 145, spd: 145, spe: 120 }
  },
  seadra: {
    inherit: true,
    baseStats: { hp: 55, atk: 65, def: 95, spa: 125, spd: 125, spe: 85 }
  },
  ninetales: {
    inherit: true,
    types: ["Fire", "Ghost"]
  },
  vileplume: {
    inherit: true,
    baseStats: { hp: 95, atk: 80, def: 85, spa: 100, spd: 100, spe: 50 }
  },
  venusaur: {
    inherit: true,
    types: ["Grass"]
  },
  gyarados: {
    inherit: true,
    baseStats: { hp: 95, atk: 130, def: 79, spa: 105, spd: 105, spe: 81 }
  },
  aerodactyl: {
    inherit: true,
    baseStats: { hp: 80, atk: 125, def: 65, spa: 60, spd: 60, spe: 130 }
  },
  onix: {
    inherit: true,
    baseStats: { hp: 140, atk: 85, def: 110, spa: 85, spd: 85, spe: 70 }
  },
  raichu: {
    inherit: true,
    baseStats: { hp: 60, atk: 100, def: 55, spa: 100, spd: 100, spe: 110 }
  },
  golem: {
    inherit: true,
    baseStats: { hp: 85, atk: 120, def: 140, spa: 65, spd: 65, spe: 45 }
  }
};
//# sourceMappingURL=pokedex.js.map
