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
var statuses_exports = {};
__export(statuses_exports, {
  Statuses: () => Statuses
});
module.exports = __toCommonJS(statuses_exports);
const Statuses = {
  par: {
    inherit: true,
    onBeforeMove(pokemon) {
      if (!pokemon.hasAbility("magicguard") && this.randomChance(1, 4)) {
        this.add("cant", pokemon, "par");
        return false;
      }
    }
  },
  slp: {
    name: "slp",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Move") {
        this.add("-status", target, "slp", "[from] move: " + sourceEffect.name);
      } else {
        this.add("-status", target, "slp");
      }
      this.effectState.time = this.random(2, 6);
    },
    onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      if (pokemon.hasAbility("earlybird")) {
        pokemon.statusData.time--;
      }
      pokemon.statusData.time--;
      if (pokemon.statusData.time <= 0) {
        pokemon.cureStatus();
        return;
      }
      this.add("cant", pokemon, "slp");
      if (move.sleepUsable) {
        return;
      }
      return false;
    }
  },
  frz: {
    inherit: true,
    onBeforeMove(pokemon, target, move) {
      if (this.randomChance(1, 5)) {
        pokemon.cureStatus();
        return;
      }
      if (move.flags["defrost"])
        return;
      this.add("cant", pokemon, "frz");
      return false;
    }
  },
  substitutebroken: {
    noCopy: true
  },
  trapped: {
    inherit: true,
    noCopy: false
  },
  trapper: {
    inherit: true,
    noCopy: false
  },
  partiallytrapped: {
    inherit: true,
    durationCallback(target, source) {
      if (source.hasItem("gripclaw"))
        return 6;
      return this.random(3, 7);
    }
  },
  stall: {
    // In gen 3-4, the chance of protect succeeding does not fall below 1/8.
    // See http://upokecenter.dreamhosters.com/dex/?lang=en&move=182
    inherit: true,
    counterMax: 8
  }
};
//# sourceMappingURL=statuses.js.map
