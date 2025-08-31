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
  diamonddust: {
    name: "Diamond Dust",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
    onStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-ability", source, "Diamond Dust");
        this.add("-weather", "Diamond Dust", "[silent]");
        this.add("-message", `A cloud of diamond dust blew in!`);
        this.add("-message", "All Rock-type damage, including Stealth Rock, will be nullified.");
        this.add("-message", "Other weather-related moves and Abilities will behave as they do in hail.");
      } else {
        this.add("-weather", "Diamond Dust", "[silent]");
      }
    },
    onDamage(damage, target, source, effect) {
      if (effect && effect.id === "stealthrock") {
        this.add("-message", `${target.name} was protected from Stealth Rock by the diamond dust!`);
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (move.type === "Rock") {
        this.add("-message", `${target.name} was protected from ${move.name} by the diamond dust!`);
        this.add("-immune", target);
        return null;
      }
    },
    onResidual() {
      this.add("-weather", "Diamond Dust", "[upkeep]");
      this.add("-message", `The air is sparkling with diamond dust!`);
    },
    onEnd() {
      this.add("-weather", "none", "[silent]");
      this.add("-message", `The cloud of diamond dust blew away!`);
    }
  }
};
//# sourceMappingURL=conditions.js.map
