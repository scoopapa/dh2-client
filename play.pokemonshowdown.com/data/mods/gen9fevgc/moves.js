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
  orderup: {
    num: 856,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Order Up",
    pp: 10,
    priority: 0,
    flags: { protect: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!pokemon.volatiles["commanded"])
        return;
      const tatsugiri = pokemon.volatiles["commanded"].source;
      if (tatsugiri.baseSpecies.baseSpecies !== "Iron Onigiri")
        return;
      switch (tatsugiri.baseSpecies.forme) {
        case "Droopy":
          this.boost({ def: 1 }, pokemon, pokemon);
          break;
        case "Stretchy":
          this.boost({ spe: 1 }, pokemon, pokemon);
          break;
        default:
          this.boost({ atk: 1 }, pokemon, pokemon);
          break;
      }
    },
    secondary: null,
    hasSheerForce: true,
    target: "normal",
    type: "Dragon"
  },
  ivycudgel: {
    num: 904,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Ivy Cudgel",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    critRatio: 2,
    onPrepareHit(target, source, move) {
      if (move.type !== "Grass") {
        this.attrLastMove("[anim] Ivy Cudgel " + move.type);
      }
    },
    onModifyType(move, pokemon) {
      switch (pokemon.species.name) {
        case "Ogereena-Wellspring":
        case "Ogereena-Wellspring-Tera":
          move.type = "Water";
          break;
        case "Ogereena-Hearthflame":
        case "Ogereena-Hearthflame-Tera":
          move.type = "Fire";
          break;
        case "Ogereena-Cornerstone":
        case "Ogereena-Cornerstone-Tera":
          move.type = "Rock";
          break;
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass"
  }
};
//# sourceMappingURL=moves.js.map
