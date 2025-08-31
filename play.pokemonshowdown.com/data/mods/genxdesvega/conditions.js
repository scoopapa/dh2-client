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
  par: {
    inherit: true,
    onStart(target, source, sourceEffect) {
      if (!sourceEffect) {
        this.add("-status", target, "par");
      } else if (sourceEffect.id === "thunderorb") {
        this.add("-status", target, "par", "[from] item: Thunder Orb", "[silent]");
        this.add("-message", `${target.name} was paralyzed by the Thunder Orb!`);
      } else if (sourceEffect.effectType === "Ability") {
        this.add("-status", target, "par", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "par");
      }
    },
    onBeforeMovePriority: 1,
    onBeforeMove(pokemon) {
      if (this.randomChance(1, 4) && !(pokemon.hasAbility("quickfeet") && pokemon.hasItem("thunderorb"))) {
        this.add("cant", pokemon, "par");
        return false;
      }
    }
  }
};
//# sourceMappingURL=conditions.js.map
