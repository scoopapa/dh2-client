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
  teampreview: {
    effectType: "Rule",
    name: "Team Preview",
    desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
    onBegin() {
      this.add("clearpoke");
      for (const pokemon of this.getAllPokemon()) {
        const details = pokemon.details.replace(", shiny", "").replace(/(Arceus|Gourgeist|Pumpkaboo|Silvally|Urshifu|Silvino)(-[a-zA-Z?-]+)?/g, "$1-*");
        this.add("poke", pokemon.side.id, details, "");
      }
    },
    onTeamPreview() {
      this.makeRequest("teampreview");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
