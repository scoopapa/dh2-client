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
  cresselia: {
    inherit: true,
    baseStats: { hp: 120, atk: 70, def: 120, spa: 75, spd: 130, spe: 85 }
  },
  aegislash: {
    inherit: true,
    baseStats: { hp: 60, atk: 50, def: 150, spa: 50, spd: 150, spe: 60 }
  },
  aegislashblade: {
    inherit: true,
    baseStats: { hp: 60, atk: 150, def: 50, spa: 150, spd: 50, spe: 60 }
  },
  zacian: {
    inherit: true,
    baseStats: { hp: 92, atk: 130, def: 115, spa: 80, spd: 115, spe: 138 }
  },
  zaciancrowned: {
    inherit: true,
    baseStats: { hp: 92, atk: 170, def: 115, spa: 80, spd: 115, spe: 148 }
  },
  zamazenta: {
    inherit: true,
    baseStats: { hp: 92, atk: 130, def: 115, spa: 80, spd: 115, spe: 138 }
  },
  zamazentacrowned: {
    inherit: true,
    baseStats: { hp: 92, atk: 130, def: 145, spa: 80, spd: 145, spe: 128 }
  }
};
//# sourceMappingURL=pokedex.js.map
