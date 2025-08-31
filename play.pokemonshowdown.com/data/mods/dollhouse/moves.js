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
  disable: {
    num: 50,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Disable",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
    volatileStatus: "disable",
    onTryHit(target) {
      if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === "struggle") {
        return false;
      }
    },
    condition: {
      duration: 5,
      durationCallback(target, source, effect) {
        if (effect.id === "ursalunabloodmoonplushie") {
          return 3;
        }
        return 5;
      },
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(pokemon, source, effect) {
        if (this.queue.willMove(pokemon) || pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal) {
          this.effectState.duration--;
        }
        if (!pokemon.lastMove) {
          this.debug(`Pokemon hasn't moved yet`);
          return false;
        }
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.id === pokemon.lastMove.id) {
            if (!moveSlot.pp) {
              this.debug("Move out of PP");
              return false;
            }
          }
        }
        if (effect.effectType === "Ability") {
          this.add("-start", pokemon, "Disable", pokemon.lastMove.name, "[from] ability: Cursed Body", "[of] " + source);
        } else {
          this.add("-start", pokemon, "Disable", pokemon.lastMove.name);
        }
        this.effectState.move = pokemon.lastMove.id;
      },
      onResidualOrder: 17,
      onEnd(pokemon) {
        this.add("-end", pokemon, "Disable");
      },
      onBeforeMovePriority: 7,
      onBeforeMove(attacker, defender, move) {
        if (!move.isZ && move.id === this.effectState.move) {
          this.add("cant", attacker, "Disable", move);
          return false;
        }
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.id === this.effectState.move) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  }
};
//# sourceMappingURL=moves.js.map
