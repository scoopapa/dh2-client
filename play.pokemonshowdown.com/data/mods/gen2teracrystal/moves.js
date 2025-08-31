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
  terablast: {
    num: 851,
    accuracy: 100,
    basePower: 80,
    basePowerCallback(pokemon, target, move) {
      if (pokemon.terastallized === "Stellar") {
        return 100;
      }
      return move.basePower;
    },
    category: "Physical",
    name: "Tera Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, mustpressure: 1 },
    onPrepareHit(target, source, move) {
      if (source.terastallized) {
        this.attrLastMove("[anim] Tera Blast " + source.teraType);
      }
    },
    /*onModifyType(move, pokemon, target) {
    	if (pokemon.terastallized) {
    		move.type = pokemon.teraType;
    	}
    },*/
    onModifyMove(move, pokemon) {
      if (pokemon.terastallized === "Fire" || pokemon.terastallized === "Water" || pokemon.terastallized === "Grass" || pokemon.terastallized === "Electric" || pokemon.terastallized === "Dark" || pokemon.terastallized === "Psychic" || pokemon.terastallized === "Dragon" || pokemon.terastallized === "Ice") {
        move.category = "Special";
        move.type = pokemon.teraType;
      }
      if (pokemon.terastallized === "Normal" || pokemon.terastallized === "Fighting" || pokemon.terastallized === "Flying" || pokemon.terastallized === "Ground" || pokemon.terastallized === "Rock" || pokemon.terastallized === "Bug" || pokemon.terastallized === "Ghost" || pokemon.terastallized === "Poison" || pokemon.terastallized === "Steel") {
        move.type = pokemon.teraType;
      }
      if (pokemon.terastallized === "Stellar") {
        if (pokemon.getStat("spa", false, true) > pokemon.getStat("atk", false, true)) {
          move.category = "Special";
          move.type = pokemon.teraType;
        }
        move.self = { boosts: { atk: -1, spa: -1 } };
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    gen: 2
  }
};
//# sourceMappingURL=moves.js.map
