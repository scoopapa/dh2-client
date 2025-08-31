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
  jolly: {
    name: "Jolly",
    desc: "Jollymod",
    onBegin() {
      this.add("rule", "Jollymod", "getting jolly with it");
      this.field.setWeather("snow");
      this.sides[0].karma = 0;
      this.sides[1].karma = 0;
    },
    onSwitchIn(pokemon) {
      if (pokemon.status === "fsb") {
        this.add("-start", pokemon, "Frostbite", "[silent]");
      }
    },
    onAfterMove(source, target, move) {
      if (move.flags["extranice"])
        source.side.addKarma(2);
      else if (move.flags["nice"])
        source.side.addKarma(1);
      else if (move.flags["kindanice"])
        source.side.addKarma(0.5);
      else if (move.flags["neutral"])
        return;
      else if (move.flags["naughty"])
        source.side.removeKarma(2);
      else if (move.category !== "Status")
        source.side.removeKarma(1);
    }
  }
};
//# sourceMappingURL=rulesets.js.map
