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
  paramovesclause: {
    effectType: "ValidatorRule",
    name: "Para Moves Clause",
    desc: "Bans all moves that induce paralysis, such as Thunder Wave",
    banlist: ["Nuzzle", "Zap Cannon"],
    onBegin() {
      this.add("rule", "Para Moves Clause: Paralysis-inducing moves are banned");
    },
    onValidateSet(set) {
      const problems = [];
      if (set.moves) {
        for (const id of set.moves) {
          const move = this.dex.moves.get(id);
          if (move.status === "par")
            problems.push(move.name + " is banned by Para Moves Clause.");
        }
      }
      return problems;
    }
  }
};
//# sourceMappingURL=rulesets.js.map
