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
  ancientgauge: {
    effectType: "Rule",
    name: "Ancient Gauge",
    desc: "ancient gauge for nsew",
    onAfterMove(target, source, move) {
      if (!target.ancientGauge)
        target.ancientGauge = 0;
      let amount = 0;
      if (move == [something])
        target.ancientGauge += [1];
      this.add("-message", `${target.name} gained ${1} ancient gauge.`);
      if (target.ancientGauge > [2]) {
        this.add("-message", `${target.name} triggered ancient gauge`);
        target.ancientGauge -= [threshold];
        const newMove = {
          move: this.dex.moves.get([newmove]),
          id: [newmove].id,
          pp: 1,
          //probably 1
          maxpp: 1,
          //probably 1
          target: [newmove].target,
          disabled: false,
          used: false
        };
        source.moveSlots[source.moveSlots.length] = newMove;
        source.baseMoveSlots[source.moveSlots.length - 1] = newMove;
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
