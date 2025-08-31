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
  psychic: {
    inherit: true,
    damageTaken: {
      Bug: 1,
      Dark: 1,
      Dragon: 0,
      Electric: 0,
      Fairy: 0,
      Fighting: 2,
      Fire: 0,
      Flying: 0,
      Ghost: 3,
      Grass: 0,
      Ground: 0,
      Ice: 0,
      Normal: 0,
      Poison: 0,
      Psychic: 2,
      Rock: 0,
      Steel: 0,
      Water: 0
    }
  },
  steel: {
    inherit: true,
    damageTaken: {
      sandstorm: 3,
      psn: 3,
      tox: 3,
      Bug: 2,
      Dark: 2,
      Dragon: 2,
      Electric: 0,
      Fairy: 2,
      Fighting: 1,
      Fire: 1,
      Flying: 2,
      Ghost: 2,
      Grass: 2,
      Ground: 1,
      Ice: 2,
      Normal: 2,
      Poison: 3,
      Psychic: 2,
      Rock: 2,
      Steel: 2,
      Water: 0
    }
  }
};
//# sourceMappingURL=typechart.js.map
