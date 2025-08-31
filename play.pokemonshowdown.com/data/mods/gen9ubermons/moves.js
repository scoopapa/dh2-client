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
  wickedblow: {
    inherit: true,
    basePower: 120,
    desc: "Cannot be selected the turn after it's used.",
    shortDesc: "Cannot be selected the turn after it's used.",
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1, cantusetwice: 1 },
    willCrit: null
  },
  darkvoid: {
    inherit: true,
    accuracy: 90,
    basePower: 80,
    category: "Special",
    desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
    shortDesc: "User recovers 50% of the damage dealt.",
    name: "Dark Void",
    pp: 15,
    flags: { heal: 1, protect: 1, mirror: 1, metronome: 1 },
    viable: true,
    drain: [1, 2],
    status: null,
    onTry() {
    }
  },
  kowtowcleave: {
    inherit: true,
    basePower: 80,
    desc: "This move gains 1.3x power if any stat by the user is lowered.",
    shortDesc: "1.3x power if the user has one stat lowered.",
    onBasePower(basePower, pokemon) {
      if (pokemon.boosts.atk < 0 || pokemon.boosts.def < 0 || pokemon.boosts.spa < 0 || pokemon.boosts.spd < 0 || pokemon.boosts.spe < 0 || pokemon.boosts.accuracy < 0 || pokemon.boosts.evasion < 0) {
        return this.chainModify(1.3);
      }
    }
  },
  psychoboost: {
    inherit: true,
    basePower: 130
  }
};
//# sourceMappingURL=moves.js.map
