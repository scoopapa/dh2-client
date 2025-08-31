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
  pressurepoint: {
    num: -2301,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Pressure Point",
    shortDesc: "Clears the target's stat boosts. High critical hit ratio.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    critRatio: 2,
    onHit(target) {
      target.clearBoosts();
      this.add("-clearboost", target);
    },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Psycho Cut", target);
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  heckle: {
    num: -2302,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Heckle",
    shortDesc: "Lowers foes' evasion by 2 and inflicts Torment.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
    boosts: {
      evasion: -2
    },
    volatileStatus: "torment",
    condition: {
      noCopy: true,
      onStart(pokemon, source, effect) {
        if (pokemon.volatiles["dynamax"]) {
          delete pokemon.volatiles["torment"];
          return false;
        }
        if (effect?.id === "gmaxmeltdown")
          this.effectState.duration = 3;
        this.add("-start", pokemon, "Torment");
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Torment");
      },
      onDisableMove(pokemon) {
        if (pokemon.lastMove && pokemon.lastMove.id !== "struggle")
          pokemon.disableMove(pokemon.lastMove.id);
      }
    },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Torment", target);
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  gunpowder: {
    num: -2303,
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Gunpowder",
    shortDesc: "No additional effects.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, powder: 1 },
    onPrepareHit(target, pokemon, move) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Burn Up", target);
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  piracy: {
    num: -2304,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Piracy",
    shortDesc: "+1 priority and snatches the move. Fails if not a Status move.",
    pp: 5,
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTry(source, target) {
      const action = this.queue.willMove(target);
      const move = action?.choice === "move" ? action.move : null;
      if (!move || !(move.category === "Status") || target.volatiles["mustrecharge"]) {
        return false;
      }
    },
    onHit(target, source) {
      source.addVolatile("snatch");
    },
    onPrepareHit(target, pokemon, move) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Anchor Shot", target);
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  ferociousroar: {
    num: -2305,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Ferocious Roar",
    shortDesc: "Lowers target's Atk and Sp. Atk by 2. Cannot be used consecutively.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, sound: 1, cantusetwice: 1 },
    boosts: {
      atk: -2,
      spa: -2
    },
    onPrepareHit(target, pokemon, move) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Noble Roar", target);
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  overexert: {
    num: -2306,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Overexert",
    shortDesc: "Raises Atk by 3. Atk drops by 2 each turn after.",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    volatileStatus: "overexert",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "move: Overexert", "[of] " + pokemon);
        this.boost({ atk: 3 }, pokemon, this.dex.getActiveMove("overexert"));
      },
      onResidualOrder: 14,
      onResidual(pokemon) {
        if (pokemon && (!pokemon.isActive || pokemon.hp <= 0 || !pokemon.activeTurns)) {
          delete pokemon.volatiles["overexert"];
          this.add("-end", pokemon, "Overexert", "[silent]");
          return;
        }
        if (pokemon.activeMoveActions >= 2) {
          this.boost({ atk: -2 }, pokemon, this.dex.getActiveMove("overexert"));
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Fighting",
    contestType: "Tough"
  }
};
//# sourceMappingURL=moves.js.map
