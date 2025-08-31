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
  /*
  placeholder: {
  	name: "",
  	type: "",
  	category: "",
  	basePower: 0,
  	accuracy: 100,
  	pp: 10,
  	shortDesc: "",
  	priority: 0,
  	flags: {protect: 1, mirror: 1, metronome: 1},
  	onPrepareHit(target, pokemon, move) {
  		this.attrLastMove('[still]');
  		this.add('-anim', pokemon, "", target);
  	},
  	secondary: null,
  	target: "normal",
  },
  */
  leechlife: {
    inherit: true,
    onModifyMove(move, pokemon) {
      if (!pokemon.volatiles["bloodsucking"])
        return;
      move.basePower = 20;
      move.drain = [1, 1];
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
      pokemon.removeVolatile("bloodsucking");
    }
  },
  //fake move
  medic: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "medic",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    sideCondition: "medic",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "medic", "[silent]");
      },
      onEntryHazard(pokemon) {
        this.heal(pokemon.maxhp / 6);
        if (pokemon.status)
          pokemon.cureStatus();
        pokemon.side.removeSideCondition("medic");
        this.add("-sideend", pokemon.side, "move: medic", "[of] " + pokemon, "[silent]");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Normal",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  }
};
//# sourceMappingURL=moves.js.map
