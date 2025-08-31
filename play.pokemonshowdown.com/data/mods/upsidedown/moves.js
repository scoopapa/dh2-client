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
  mudbomb: {
    num: 426,
    accuracy: 85,
    basePower: 65,
    category: "Special",
    isNonstandard: "Past",
    name: "Mud Bomb",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
    condition: {
      noCopy: true,
      duration: 4,
      onStart(pokemon) {
        this.add("-start", pokemon, "Mud Bomb");
      },
      onUpdate(pokemon) {
        if (this.effectState.source && !this.effectState.source.isActive) {
          pokemon.removeVolatile("syrupbomb");
        }
      },
      onResidualOrder: 14,
      onResidual(pokemon) {
        this.boost({ spe: -1 }, pokemon, this.effectState.source);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Mud Bomb", "[silent]");
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Cute",
    secondary: {
      chance: 100,
      volatileStatus: "syrupbomb"
    },
    shortDesc: "Target's Speed is lowered by 1 stage for 3 turns."
  },
  batonpass: {
    inherit: true,
    desc: "The user is replaced with another Pokemon in its party. The selected Pokemon has the user's stat stage deductions, confusion, and certain move effects transferred to it.",
    shortDesc: "Modified Baton Pass. Positive boosts are reset."
  },
  luminacrash: {
    num: 855,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Lumina Crash",
    pp: 5,
    //the change
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spd: -2
      }
    },
    target: "normal",
    type: "Psychic"
  },
  watershuriken: {
    num: 594,
    accuracy: 100,
    basePower: 15,
    basePowerCallback(pokemon, target, move) {
      if (pokemon.species.name === "Greninja-Ash" && pokemon.hasAbility("battlebond") && !pokemon.transformed) {
        return move.basePower + 5;
      }
      return move.basePower;
    },
    category: "Physical",
    //the change
    name: "Water Shuriken",
    pp: 20,
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Cool"
  }
};
//# sourceMappingURL=moves.js.map
