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
  bondiumz: {
    name: "Bondium Z",
    desc: "If held by Luigi with Tri Attack, he can use Linking Lighthouse Launch.",
    spritenum: 631,
    onTakeItem: false,
    zMove: "Linking Lighthouse Launch",
    zMoveFrom: "Tri Attack",
    itemUser: ["Luigi"],
    num: -1,
    gen: 9
  },
  suwakiumz: {
    name: "Suwakium Z",
    desc: "If held by Suwako with Muddy Water, she can use Froggy Braves the Wind and Rain.",
    spritenum: 633,
    onTakeItem: false,
    zMove: "Froggy Braves the Wind and Rain",
    zMoveFrom: "Muddy Water",
    itemUser: ["Suwako"],
    num: -2,
    gen: 9
  },
  ananiumz: {
    name: "Ananium Z",
    desc: "If held by Ana with Biotic Grenade, she can use Nano Boost.",
    spritenum: 638,
    onTakeItem: false,
    zMove: "Nano Boost",
    zMoveFrom: "Biotic Grenade",
    itemUser: ["Ana"],
    num: -3,
    gen: 9
  },
  metaknightiumz: {
    name: "Metaknightium Z",
    desc: "If held by Meta Knight with Dimensional Cape, he can use Galaxia Darkness.",
    spritenum: 646,
    onTakeItem: false,
    zMove: "Galaxia Darkness",
    zMoveFrom: "Dimensional Cape",
    itemUser: ["Meta Knight"],
    num: -4,
    gen: 9
  },
  pittite: {
    name: "Pittite",
    spritenum: 576,
    megaStone: "Pit-Mega",
    megaEvolves: "Pit",
    itemUser: ["Pit"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -5,
    gen: 9,
    desc: "If held by Pit, this item allows him to Mega Evolve in battle."
  }
};
//# sourceMappingURL=items.js.map
