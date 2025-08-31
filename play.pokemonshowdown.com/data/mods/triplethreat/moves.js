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
  lightsaunter: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Light Saunter",
    shortDesc: "10% chance to raise the user's Speed by 1.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Thrash", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Flying"
  }
};
//# sourceMappingURL=moves.js.map
