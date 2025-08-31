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
  raindance: {
    name: "RainDance",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("damprock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Water") {
        this.debug("rain water boost");
        return this.chainModify(1.5);
      }
      if (move.type === "Fire") {
        this.debug("rain fire suppress");
        return this.chainModify(0.5);
      }
    },
    onStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5 || source.hasAbility("rainparade"))
          this.effectState.duration = 0;
        this.add("-weather", "RainDance", "[from] ability: " + effect, "[of] " + source);
      } else {
        this.add("-weather", "RainDance");
      }
    },
    onResidualOrder: 1,
    onResidual() {
      this.add("-weather", "RainDance", "[upkeep]");
      this.eachEvent("Weather");
    },
    onEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
