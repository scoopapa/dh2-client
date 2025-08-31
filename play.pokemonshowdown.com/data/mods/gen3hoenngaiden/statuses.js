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
      this.effectState.skippedTime = 0;
    },
    onSwitchIn(target) {
      this.effectState.time += this.effectState.skippedTime;
      this.effectState.skippedTime = 0;
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
        this.effectState.skippedTime++;
        return;
      }
      this.effectState.skippedTime = 0;
      return false;
    }
  },
  frz: {
    inherit: true,
    onHit(target, source, move) {
      if (move.thawsTarget || this.dex.moves.get(move.id).type === "Fire" && move.category !== "Status") {
        target.cureStatus();
      }
    }
  },
  sandstorm: {
    inherit: true,
    onModifySpD() {
    }
  },
  silvally: {
    name: "Silvally",
    id: "silvally",
    num: 773,
    onTypePriority: 1,
    onType(types, pokemon) {
      if (pokemon.transformed || pokemon.ability !== "rkssystem" && this.gen >= 8)
        return types;
      let type = "Normal";
      if (pokemon.ability === "rkssystem") {
        type = pokemon.getItem().onMemory;
        if (!type) {
          type = "Normal";
        }
      }
      return [type];
    }
  }
};
//# sourceMappingURL=statuses.js.map
