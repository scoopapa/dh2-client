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
  psn: {
    name: "psn",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "psn", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "psn");
      }
    },
    onResidualOrder: 9,
    onResidual(pokemon) {
      if (pokemon.hasAbility("toxicboost"))
        return;
      this.damage(pokemon.baseMaxhp / 8);
    }
  },
  tox: {
    name: "tox",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      this.effectState.stage = 0;
      if (sourceEffect && sourceEffect.id === "toxicorb") {
        this.add("-status", target, "tox", "[from] item: Toxic Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "tox", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "tox");
      }
    },
    onSwitchIn() {
      this.effectState.stage = 0;
    },
    onResidualOrder: 9,
    onResidual(pokemon) {
      if (this.effectState.stage < 15) {
        this.effectState.stage++;
      }
      if (pokemon.hasAbility("toxicboost"))
        return;
      this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
    }
  }
};
//# sourceMappingURL=conditions.js.map
