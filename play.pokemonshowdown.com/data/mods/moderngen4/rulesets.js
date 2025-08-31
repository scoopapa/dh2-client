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
  zmoveclause: {
    effectType: "ValidatorRule",
    name: "Z-Move Clause",
    desc: "Bans Pok&eacute;mon from holding Z-Crystals",
    onValidateSet(set) {
      const item = this.dex.items.get(set.item);
      if (item.zMove)
        return [`${set.name || set.species}'s item ${item.name} is banned by Z-Move Clause.`];
    },
    onBegin() {
      this.add("rule", "Z-Move Clause: Z-Moves are banned");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
