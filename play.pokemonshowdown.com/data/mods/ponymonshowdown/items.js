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
  crystalheartpiece: {
    name: "Crystal Heart Piece",
    spritenum: 658,
    onTakeItem: false,
    onStart(pokemon) {
      const type = pokemon.teraType;
      this.add("-item", pokemon, "Tera Shard");
      this.add("-anim", pokemon, "Cosmic Power", pokemon);
      if (type && type !== "???") {
        if (!pokemon.setType(type))
          return;
        this.add("-start", pokemon, "typechange", type, "[from] item: Crystal Heart Piece");
      }
      this.add("-message", `${pokemon.name}'s Tera Shard changed its type!`);
    },
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      if (move.id === "terablast") {
        return move.basepower = 100;
      }
    },
    onTryHit(pokemon, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon, "[from] item: Crystal Heart Piece");
        return null;
      }
    },
    num: -1e3,
    gen: 9,
    desc: "Holder becomes its Tera Type on switch-in.",
    rating: 3
  }
};
//# sourceMappingURL=items.js.map
