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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  waterbubble: {
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onUpdate(pokemon) {
      if (pokemon.status === "brn") {
        this.add("-activate", pokemon, "ability: Water Bubble");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Water Bubble");
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Water Bubble",
    rating: 4.5,
    num: 199,
    shortDesc: "User takes 0.5x damage from Fire-type moves and is immune to Burn."
  }
};
//# sourceMappingURL=abilities.js.map
