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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  supportgear: {
    name: "Support Gear",
    num: -1e3,
    spritenum: 581,
    desc: "If held by Pthormign: recoil is negated.",
    itemUser: ["Pthormign"],
    onTakeItem(item, pokemon, source) {
      return true;
    },
    /*onModifyMove(move) {
    	if (move.recoil) move.recoil = null;
    	if (move.hasCrashDamage) move.hasCrashDamage = false;
    },*/
    onDamage(damage, target, source, effect) {
      if (effect.type !== "Move" && ["highjumpkick", "jumpkick", "supercellslam", "recoil"].includes(effect.id)) {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    }
  },
  fawntifite: {
    name: "Fawntifite",
    num: -1001,
    desc: "Allows Fawntiful to Mega Evolve.",
    spritenum: 624,
    megaStone: "Fawntiful-Mega",
    megaEvolves: "Fawntiful",
    itemUser: ["Fawntiful"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    gen: 9
  },
  bjornioritite: {
    name: "Bjornioritite",
    num: -1001,
    desc: "Allows Bjorniorite to Mega Evolve.",
    spritenum: 624,
    megaStone: "Bjorniorite-Mega",
    megaEvolves: "Bjorniorite",
    itemUser: ["Bjorniorite"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    gen: 9
  },
  polipidite: {
    name: "Polipidite",
    num: -1001,
    desc: "Allows Polipid to Mega Evolve.",
    spritenum: 624,
    megaStone: "Polipid-Mega",
    megaEvolves: "Polipid",
    itemUser: ["Polipid"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    gen: 9
  },
  naglrite: {
    name: "Naglrite",
    num: -1001,
    desc: "Allows Naglrir to Mega Evolve.",
    spritenum: 624,
    megaStone: "Naglrir-Mega",
    megaEvolves: "Naglrir",
    itemUser: ["Naglrir"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    gen: 9
  }
};
//# sourceMappingURL=items.js.map
