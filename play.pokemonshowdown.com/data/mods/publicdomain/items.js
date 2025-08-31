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
  sligmaball: {
    name: "Sligma Ball",
    spritenum: 585,
    megaStone: "Sligma-Mega",
    megaEvolves: "Sligma",
    itemUser: ["Sligma"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1,
    gen: 9,
    desc: "If held by Sligma, this item allows it to Mega Evolve in battle."
  },
  starsweet: {
    inherit: true,
    shortDesc: "Holder's use of Meteor Shower lasts 8 turns instead of 5.",
    rating: 2
  }
};
//# sourceMappingURL=items.js.map
