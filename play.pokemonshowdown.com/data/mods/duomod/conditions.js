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
  frz: {
    name: "frz",
    id: "frz",
    num: 0,
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      this.add("-status", target, "frz");
    },
    duration: 4,
    onBeforeMovePriority: 2,
    onBeforeMove(pokemon, target, move) {
      if (this.randomChance(4, 10)) {
        pokemon.cureStatus();
        return;
      }
      if (move.flags["defrost"]) {
        pokemon.cureStatus();
        return;
      }
      this.add("cant", pokemon, "frz");
      return false;
    },
    onHit(target, source, move) {
      if (move.type === "Fire" && move.category !== "Status" || move.flags["defrost"]) {
        target.cureStatus();
      }
    },
    onEnd(target) {
      this.add("-curestatus", target, "frz");
    }
  }
};
//# sourceMappingURL=conditions.js.map
