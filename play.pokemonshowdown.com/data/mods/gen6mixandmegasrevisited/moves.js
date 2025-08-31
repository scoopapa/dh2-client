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
        if (pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("exoskeleton"))
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
  },
  toxicspikes: {
    num: 390,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Toxic Spikes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "toxicspikes",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 2)
          return false;
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded())
          return;
        if (pokemon.hasType("Poison")) {
          this.add("-sideend", pokemon.side, "move: Toxic Spikes", "[of] " + pokemon);
          pokemon.side.removeSideCondition("toxicspikes");
        } else if (pokemon.hasType("Steel") || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("exoskeleton")) {
          return;
        } else if (this.effectState.layers >= 2) {
          pokemon.trySetStatus("tox", pokemon.side.foe.active[0]);
        } else {
          pokemon.trySetStatus("psn", pokemon.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Poison",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  spikes: {
    num: 191,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spikes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "spikes",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 3)
          return false;
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("exoskeleton"))
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Ground",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  stickyweb: {
    num: 564,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sticky Web",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1 },
    sideCondition: "stickyweb",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Sticky Web");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("exoskeleton"))
          return;
        this.add("-activate", pokemon, "move: Sticky Web");
        this.boost({ spe: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("stickyweb"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Bug",
    zMove: { boost: { spe: 1 } },
    contestType: "Tough"
  }
};
//# sourceMappingURL=moves.js.map
