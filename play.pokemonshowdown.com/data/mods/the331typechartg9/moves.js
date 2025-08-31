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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  extremespeed: {
    inherit: true,
    basePower: 70
  },
  boomburst: {
    inherit: true,
    basePower: 110
  },
  selfdestruct: {
    inherit: true,
    basePower: 140
  },
  explosion: {
    inherit: true,
    basePower: 260
  },
  stealthrock: {
    num: 446,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stealth Rock",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "stealthrock",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots"))
          return;
        if (pokemon.hasType("Water"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Rock",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  }
};
//# sourceMappingURL=moves.js.map
