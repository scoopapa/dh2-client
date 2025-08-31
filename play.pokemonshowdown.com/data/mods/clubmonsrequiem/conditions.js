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
  hail: {
    name: "Hail",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Hail", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Hail");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Hail", "[upkeep]");
      if (this.field.isWeather("hail"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      let hailChip = 16;
      for (const mon of this.getAllActive()) {
        if (mon.hasAbility("palewinds"))
          hailChip = 8;
      }
      this.damage(target.baseMaxhp / hailChip);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  mustrecharge: {
    name: "mustrecharge",
    duration: 2,
    onBeforeMovePriority: 11,
    onBeforeMove(pokemon) {
      this.add("cant", pokemon, "recharge");
      if (pokemon.hasItem("fuelcell")) {
        pokemon.useItem();
      }
      pokemon.removeVolatile("mustrecharge");
      pokemon.removeVolatile("truant");
      return null;
    },
    onStart(pokemon) {
      this.add("-mustrecharge", pokemon);
    },
    onLockMove: "recharge"
  }
};
//# sourceMappingURL=conditions.js.map
