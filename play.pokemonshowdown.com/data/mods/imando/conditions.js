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
  advsandstorm: {
    name: "ADV Sandstorm",
    effectType: "Weather",
    duration: 0,
    // This should be applied directly to the stat before any of the other modifiers are chained
    // So we give it increased priority.
    onModifySpDPriority: 10,
    onModifySpD(spd, pokemon) {
      if (pokemon.hasType("Rock") && this.field.isWeather("advsandstorm")) {
        return this.modify(spd, 1.5);
      }
    },
    onResidualOrder: 1,
    onResidual() {
      this.add("-weather", "Adv Sandstorm", "[upkeep]");
      if (this.field.isWeather("advsandstorm"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onEnd() {
      this.add("-weather", "none");
    }
  },
  sunnyday: {
    name: "SunnyDay",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("heatrock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (move.id === "hydrosteam" && !attacker.hasItem("utilityumbrella")) {
        this.debug("Sunny Day Hydro Steam boost");
        return this.chainModify(1.5);
      }
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Fire") {
        this.debug("Sunny Day fire boost");
        return this.chainModify(1.5);
      }
      if (move.type === "Water") {
        this.debug("Sunny Day water suppress");
        return this.chainModify(0.5);
      }
    },
    onFieldStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "SunnyDay", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "SunnyDay");
      }
    },
    onImmunity(type, pokemon) {
      if (pokemon.hasItem("utilityumbrella"))
        return;
      if (type === "frz")
        return false;
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "SunnyDay", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
