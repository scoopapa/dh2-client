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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  nighttime: {
    name: "Nighttime",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("blackrock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move2) {
      if (move2.id === "fireworkblazer" && !attacker.hasItem("utilityumbrella")) {
        this.debug("Nighttime Firework Blazer boost");
        return this.chainModify(2);
      }
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move2.type === "Dark") {
        this.debug("Nighttime dark boost");
        return this.chainModify(1.5);
      }
      if (move2.type === "Light") {
        this.debug("Nighttime Light suppress");
        return this.chainModify(0.5);
      }
    },
    onFieldStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Nighttime", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Nighttime");
      }
    },
    onFieldEnd() {
      this.add("-weather", "none");
    },
    onFoeTryMove(target, source, move2) {
      if (pokemon.hasType("Dark")) {
        const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
        if (move2.target === "foeSide" || move2.target === "all" && !targetAllExceptions.includes(move2.id)) {
          return;
        }
        const dazzlingHolder = this.effectState.target;
        if ((source.isAlly(dazzlingHolder) || move2.target === "all") && move2.priority > 0.1) {
          this.attrLastMove("[still]");
          this.add("cant", dazzlingHolder, "ability: Queenly Majesty", move2, "[of] " + target);
          return false;
        }
      }
    }
  },
  snowscape: {
    name: "Snowscape",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
    onModifyDefPriority: 10,
    onModifyDef(def, pokemon2) {
      if (pokemon2.hasType("Ice") && this.field.isWeather("snowscape")) {
        return this.modify(def, 1.5);
      }
    },
    onModifyCritRatioPriority: 10,
    onModifyCritRatio(critRatio) {
      if (move.type === "Ice") {
        return critRatio + 2;
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Snowscape", "[from] ability: " + effect.name, `[of] ${source}`);
      } else {
        this.add("-weather", "Snowscape");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Snowscape", "[upkeep]");
      if (this.field.isWeather("snowscape"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  pollenseason: {
    name: "PollenSeason",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("mossyrock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move2) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move2.type === "Grass") {
        this.debug("pollenseason grass boost");
        return this.chainModify(1.5);
      }
    },
    onModifyMovePriority: -2,
    onModifyMove(move2) {
      if (move2.secondaries) {
        this.debug("doubling secondary chance");
        for (const secondary of move2.secondaries) {
          if (secondary.chance)
            secondary.chance *= 2;
        }
      }
      if (move2.self?.chance)
        move2.self.chance *= 2;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "PollenSeason", "[from] ability: " + effect.name, `[of] ${source}`);
      } else {
        this.add("-weather", "PollenSeason");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "PollenSeason", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
