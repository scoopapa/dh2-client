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
  kobgoldite: {
    name: "Kobgoldite",
    shortDesc: "If held by a Kobgold, this item allows it to Mega Evolve in battle.",
    megaStone: "Kobgold-Mega",
    megaEvolves: "Kobgold",
    itemUser: ["Kobgold"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    }
  },
  warriorssash: {
    name: "Warrior's Sash",
    shortDesc: "If held by a Flowar, boosts not very effective moves by 100%.",
    itemUser: ["Flowar"],
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.baseSpecies === "Flowar" || pokemon.baseSpecies.baseSpecies === "Flowar") {
        return false;
      }
      return true;
    },
    onModifyDamage(damage, source, target, move) {
      if (source.baseSpecies.baseSpecies === "Flowar") {
        if (target.getMoveHitData(move).typeMod < 0) {
          this.debug("Tinted Lens boost");
          return this.chainModify(2);
        }
      }
    }
  }
};
//# sourceMappingURL=items.js.map
