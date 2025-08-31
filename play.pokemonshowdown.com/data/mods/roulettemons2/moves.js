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
  attackjumpkick: {
    num: 9001,
    accuracy: 90,
    basePower: 115,
    category: "Physical",
    name: "Attack Jump Kick",
    pp: 30,
    priority: 0,
    flags: { protect: 1, snatch: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Fighting"
  },
  milkslide: {
    num: 9002,
    accuracy: 100,
    basePower: 130,
    category: "Physical",
    name: "Milk Slide",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Flying"
  },
  trumpbell: {
    num: 9003,
    accuracy: 100,
    basePower: 70,
    basePowerCallback(pokemon, target, move) {
      return move.basePower + 20 * pokemon.positiveBoosts();
    },
    category: "Physical",
    name: "Trump Bell",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug"
  }
};
//# sourceMappingURL=moves.js.map
