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
  megastoneclause: {
    effectType: "ValidatorRule",
    name: "Mega Stone Clause",
    desc: "Bans Pok&eacute;mon from holding Mega Stones",
    onValidateSet(set) {
      const item = this.dex.items.get(set.item);
      if (item.megaEvolves)
        return [`${set.name || set.species}'s item ${item.name} is banned by Mega Stone Clause.`];
    },
    onBegin() {
      this.add("rule", "Mega Stone Clause: Mega Stones are banned");
      for (const pokemon of this.getAllPokemon()) {
        if (pokemon.species.id === "rayquaza") {
          pokemon.canMegaEvo = null;
          pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
        }
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
