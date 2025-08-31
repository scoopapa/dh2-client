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
  par: {
    inherit: true,
    onBeforeMove(pokemon) {
    }
  },
  confusion: {
    inherit: true,
    onBeforeMove(pokemon) {
      pokemon.volatiles["confusion"].time--;
      if (!pokemon.volatiles["confusion"].time) {
        pokemon.removeVolatile("confusion");
        return;
      }
      this.add("-activate", pokemon, "confusion");
    }
  },
  stall: {
    inherit: true,
    onStallMove(pokemon) {
      const counter = this.effectState.counter || 1;
      this.debug(`Success chance: ${Math.round(100 / counter)}%`);
      let success = true;
      pokemon.side.addMiss(((counter - 1) / counter * 100).toFixed(2));
      if (pokemon.side.miss >= 100) {
        pokemon.side.subtractMiss(100);
        success = false;
      }
      if (!success)
        delete pokemon.volatiles["stall"];
      return success;
    }
  }
};
//# sourceMappingURL=conditions.js.map
