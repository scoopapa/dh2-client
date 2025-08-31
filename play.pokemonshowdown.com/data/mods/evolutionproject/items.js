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
  luckypunch: {
    name: "Lucky Punch",
    desc: "If held by Chansey or Lediluck, its critical hit ratio is raised by 2 stages.",
    spritenum: 261,
    fling: {
      basePower: 40
    },
    onModifyCritRatio(critRatio, user) {
      if (user.baseSpecies.name === "Chansey" || user.baseSpecies.name === "Lediluck") {
        return critRatio + 2;
      }
    },
    itemUser: ["Chansey", "Lediluck"],
    num: 256,
    gen: 2
  },
  thickclub: {
    name: "Thick Club",
    desc: "If held by a Cubone, Marowak or Resurrectric, its Attack is doubled.",
    spritenum: 491,
    fling: {
      basePower: 90
    },
    onModifyAtkPriority: 1,
    onModifyAtk(atk, pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "Cubone" || pokemon.baseSpecies.baseSpecies === "Marowak" || pokemon.baseSpecies.baseSpecies === "Resurrectric") {
        return this.chainModify(2);
      }
    },
    itemUser: ["Resurrectric", "Marowak", "Cubone"],
    num: 258,
    gen: 2
  }
};
//# sourceMappingURL=items.js.map
