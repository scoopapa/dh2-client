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
  partiallytrapped: {
    name: "partiallytrapped",
    duration: 5,
    durationCallback(target, source) {
      if (source?.hasItem("gripclaw"))
        return 8;
      return this.random(5, 7);
    },
    onStart(pokemon, source) {
      this.add("-activate", pokemon, "move: " + this.effectState.sourceEffect, "[of] " + source);
      this.effectState.boundDivisor = source.hasItem("gripclaw") ? 4 : 8;
    },
    onResidualOrder: 13,
    onResidual(pokemon) {
      const source = this.effectState.source;
      const gmaxEffect = ["gmaxcentiferno", "gmaxsandblast"].includes(this.effectState.sourceEffect.id);
      if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
        delete pokemon.volatiles["partiallytrapped"];
        this.add("-end", pokemon, this.effectState.sourceEffect, "[partiallytrapped]", "[silent]");
        return;
      }
      this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
    },
    onEnd(pokemon) {
      this.add("-end", pokemon, this.effectState.sourceEffect, "[partiallytrapped]");
    },
    onTrapPokemon(pokemon) {
      const gmaxEffect = ["gmaxcentiferno", "gmaxsandblast"].includes(this.effectState.sourceEffect.id);
      if (!pokemon.hasAbility("runaway") && (this.effectState.source?.isActive || gmaxEffect))
        pokemon.tryTrap();
    }
  },
  snow: {
    name: "Snow",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Ice") {
        this.debug("Snowscape ice boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Snow", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Snow");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Snow", "[upkeep]");
      if (this.field.isWeather("snow"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
