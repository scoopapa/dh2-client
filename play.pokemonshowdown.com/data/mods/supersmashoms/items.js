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
  venusaurite: {
    inherit: true,
    megaStone: "Donphan-Mega",
    megaEvolves: "Donphan",
    itemUser: ["Donphan"],
    onTakeItem: false,
    isNonstandard: null,
    shortDesc: "If held by an Donphan, this item allows it to Mega Evolve in battle."
  },
  pinsirite: {
    inherit: true,
    megaStone: "Revavroom-Mega",
    megaEvolves: "Revavroom",
    itemUser: ["Revavroom"],
    onTakeItem: false,
    isNonstandard: null,
    shortDesc: "If held by an Revavroom, this item allows it to Mega Evolve in battle."
  },
  manectite: {
    inherit: true,
    megaStone: "Rotom-Mow-Mega",
    megaEvolves: "Rotom-Mow",
    itemUser: ["Rotom-Mow"],
    onTakeItem: false,
    isNonstandard: null,
    shortDesc: "If held by an Rotom-Mow, this item allows it to Mega Evolve in battle."
  },
  cameruptite: {
    inherit: true,
    megaStone: "Spiritomb-Mega",
    megaEvolves: "Spiritomb",
    itemUser: ["Spiritomb"],
    onTakeItem: false,
    isNonstandard: null,
    shortDesc: "If held by an Spiritomb, this item allows it to Mega Evolve in battle."
  }
};
//# sourceMappingURL=items.js.map
