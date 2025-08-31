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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  sweetveilscreen: {
    name: "SweetVeilScreen",
    duration: 5,
    durationCallback(target, source, effect) {
      if (source?.hasItem("lightclay")) {
        return 8;
      }
      return 5;
    },
    onStart(side) {
      this.add("-sidestart", side, "ability: Sweet Veil");
    },
    onEnd(side) {
      this.add("-sideend", side, "ability: Sweet Veil");
    },
    onResidualOrder: 5,
    onResidualSubOrder: 2,
    onResidual(side) {
      if (this.field.isTerrain("grassyterrain"))
        return;
      for (const ally of side.active) {
        this.heal(ally.maxhp / 16);
      }
    },
    onTerrain(pokemon) {
      if (!this.field.isTerrain("grassyterrain"))
        return;
      for (const ally of pokemon.side.active) {
        this.heal(ally.maxhp / 16);
      }
    }
  }
};
//# sourceMappingURL=conditions.js.map
