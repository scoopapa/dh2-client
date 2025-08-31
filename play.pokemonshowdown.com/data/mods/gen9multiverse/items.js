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
  souldew: {
    inherit: true,
    onBasePower() {
    },
    onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.baseSpecies.num === 380) {
        return this.chainModify([5325, 4096]);
      }
    },
    onModifySpDPriority: 2,
    onModifySpD(spd, pokemon) {
      if (pokemon.baseSpecies.num === 380) {
        return this.chainModify([5325, 4096]);
      }
    },
    shortDesc: "If held by a Latias, its Sp. Atk and Sp. Def are 1.3x.",
    isNonstandard: null
  },
  meowthofaloliumz: {
    name: "Meowthofalolium Z",
    spritenum: 646,
    onTakeItem: false,
    zMove: "infinite baseball reaction",
    zMoveFrom: "Parting Shot",
    itemUser: ["Meowth-Alola"],
    num: -1,
    gen: 9,
    shortDesc: "If held by a Meowth-Alola with Parting Shot, it can use infinite baseball reaction."
  },
  watermemory: {
    inherit: true,
    isNonstandard: null
  },
  hearthflamemask: {
    inherit: true,
    shortDesc: "If held by Ogerpon-Hearthflame, its moves have 1.2x power. Cannot be removed."
  }
};
//# sourceMappingURL=items.js.map
