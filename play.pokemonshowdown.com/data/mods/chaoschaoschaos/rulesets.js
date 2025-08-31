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
  standardpetmod: {
    inherit: true,
    ruleset: ["[Gen 8] OU", "!Species Clause"],
    banlist: ["All Pokemon"],
    onBegin() {
      this.add("rule", "Chaos Chaos Chaos: Limit one of each Pok\xE9mon");
    },
    onValidateTeam(team, format) {
      const speciesTable = {};
      for (const set of team) {
        const template = this.getTemplate(set.species);
        if (speciesTable[template.species]) {
          return ["You are limited to one of each Pok\xE9mon by Chaos Chaos Chaos.", "(You have more than one " + template.species + ")"];
        }
        speciesTable[template.species] = true;
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
