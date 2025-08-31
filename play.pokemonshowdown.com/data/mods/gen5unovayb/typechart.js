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
var typechart_exports = {};
__export(typechart_exports, {
  TypeChart: () => TypeChart
});
module.exports = __toCommonJS(typechart_exports);
const TypeChart = {
  electric: {
    inherit: true,
    damageTaken: {
      par: 3,
      Bug: 0,
      Dark: 0,
      Dragon: 0,
      Electric: 2,
      Fighting: 0,
      Fire: 0,
      Flying: 2,
      Ghost: 0,
      Grass: 0,
      Ground: 1,
      Ice: 0,
      Normal: 0,
      Poison: 0,
      Psychic: 0,
      Rock: 0,
      Steel: 2,
      Water: 0
    }
  },
  fire: {
    damageTaken: {
      brn: 3,
      frz: 3,
      Bug: 2,
      Dark: 0,
      Dragon: 0,
      Electric: 0,
      Fairy: 2,
      Fighting: 0,
      Fire: 2,
      Flying: 0,
      Ghost: 0,
      Grass: 2,
      Ground: 1,
      Ice: 2,
      Normal: 0,
      Poison: 0,
      Psychic: 0,
      Rock: 1,
      Steel: 2,
      Stellar: 0,
      Water: 1
    },
    HPivs: { atk: 30, spa: 30, spe: 30 },
    HPdvs: { atk: 14, def: 12 }
  }
};
//# sourceMappingURL=typechart.js.map
