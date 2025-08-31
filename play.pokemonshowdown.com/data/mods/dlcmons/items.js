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
  lunatonite: {
    name: "Lunatonite",
    spritenum: 578,
    megaStone: "Lunatone-Mega",
    megaEvolves: "Lunatone",
    itemUser: ["Lunatone"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1,
    gen: 9,
    desc: "If held by a Lunatone, this item allows it to Mega Evolve in battle."
  },
  solrockite: {
    name: "Solrockite",
    spritenum: 578,
    megaStone: "Solrock-Mega",
    megaEvolves: "Solrock",
    itemUser: ["Solrock"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -2,
    gen: 9,
    desc: "If held by a Solrock, this item allows it to Mega Evolve in battle."
  },
  floatzelite: {
    name: "Floatzelite",
    spritenum: 578,
    megaStone: "Floatzel-Mega",
    megaEvolves: "Floatzel",
    itemUser: ["Floatzel"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -2,
    gen: 9,
    desc: "If held by a Floatzel, this item allows it to Mega Evolve in battle."
  }
};
//# sourceMappingURL=items.js.map
