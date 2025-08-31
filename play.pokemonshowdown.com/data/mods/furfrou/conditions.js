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
  mustrecharge: {
    name: "mustrecharge",
    duration: 2,
    onBeforeMovePriority: 11,
    onBeforeMove(pokemon) {
      this.add("cant", pokemon, "recharge");
      if (pokemon.hasItem("fuelcell")) {
        pokemon.useItem();
      }
      pokemon.removeVolatile("mustrecharge");
      pokemon.removeVolatile("truant");
      return null;
    },
    onStart(pokemon) {
      this.add("-mustrecharge", pokemon);
    },
    onLockMove: "recharge"
  },
  flicker: {
    name: "flicker",
    duration: 1,
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onStart(target) {
      this.add("-start", target, "ability: Flicker");
    },
    onTryHit(target, source, move) {
      if (target !== source) {
        target.flickered = true;
        target.addVolatile("charge");
      }
    },
    onEnd(target) {
      this.add("-end", target, "Flicker");
      if (target.flickered)
        return;
      target.outFlickered = true;
    }
  },
  solischarge: {
    name: "solischarge",
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onStart(target) {
      this.add("-start", target, "Solis Charge");
    },
    onModifyDamage(damage, source, target, move) {
      return this.chainModify(1.5);
    },
    onEnd(target) {
      this.add("-end", target, "Solis Charge");
    }
  }
};
//# sourceMappingURL=conditions.js.map
