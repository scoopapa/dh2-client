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
var rulesets_exports = {};
__export(rulesets_exports, {
  Rulesets: () => Rulesets
});
module.exports = __toCommonJS(rulesets_exports);
const Rulesets = {
  supertypemovesrule: {
    effectType: "Rule",
    name: "Super Type Moves Rule",
    desc: "Prevents pokemon from using Crystal or Feral moves unless they have a matching type.",
    onBeforeMove(pokemon, target, move) {
      move = Dex.mod("scootopia").moves.get(move);
      if (move.type === "Crystal" && !pokemon.hasType("Crystal"))
        return false;
      if (move.type === "Feral" && !pokemon.hasType("Feral"))
        return false;
    },
    onDisableMove(pokemon) {
      for (const moveSlot of pokemon.moveSlots) {
        const move = Dex.mod("scootopia").moves.get(moveSlot.id);
        if (move.type === "Crystal" && !pokemon.hasType("Crystal") || move.type === "Feral" && !pokemon.hasType("Feral")) {
          pokemon.disableMove(moveSlot.id, false);
        }
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
