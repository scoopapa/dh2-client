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
  shadowsky: {
    name: "Shadow Sky",
    effectType: "Weather",
    duration: 5,
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Shadow") {
        this.debug("Shadow Sky boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Shadow Sky", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Shadow Sky");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Sandstorm", "[upkeep]");
      if (this.field.isWeather("shadowsky"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
