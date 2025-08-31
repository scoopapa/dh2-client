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
  coremodule: {
    name: "Core Module",
    desc: "Must be held by Xylyeozop.",
    spritenum: 272,
    fling: {
      basePower: 120
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.name === "Xylyeozop" || pokemon.baseSpecies.name === "Xylyeozop") {
        return false;
      }
      return true;
    },
    itemUser: ["Xylyeozop"]
  },
  freshstick: {
    name: "Fresh Stick",
    desc: "Must be held by Gumbrawl-Fresh.",
    spritenum: 272,
    fling: {
      basePower: 120
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.species.name === "Gumbrawl-Fresh" || pokemon.species.name === "Gumbrawl-Fresh") {
        return false;
      }
      return true;
    },
    itemUser: ["Gumbrawl-Fresh"]
  },
  luminousbubble: {
    name: "Luminous Bubble",
    desc: "Must be held by Gumbrawl-Bubble.",
    spritenum: 272,
    fling: {
      basePower: 120
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.species.name === "Gumbrawl-Bubble" || pokemon.species.name === "Gumbrawl-Bubble") {
        return false;
      }
      return true;
    },
    itemUser: ["Gumbrawl-Bubble"]
  },
  futuresphere: {
    name: "Future Sphere",
    desc: "If held by a Dormirr, its Steel- and Fairy-type attacks have 1.2x power.",
    spritenum: 180,
    fling: {
      basePower: 60
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.name === "Dormirr" && (move.type === "Steel" || move.type === "Fairy")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.name === "Dormirr" || pokemon.baseSpecies.name === "Dormirr") {
        return false;
      }
      return true;
    },
    itemUser: ["Dormirr"]
  },
  cursedseal: {
    name: "Cursed Seal",
    desc: "If held by a Blite, allows it to switch formes every turn.",
    spritenum: 461,
    fling: {
      basePower: 30
    },
    onResidual(pokemon) {
      if (pokemon.species.baseSpecies !== "Blite" || pokemon.transformed)
        return;
      const targetForme = pokemon.species.name === "Blite" ? "Blite-Blight" : "Blite";
      pokemon.formeChange(targetForme);
      this.add("-message", `${pokemon.name} transformed!`);
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.name === "Blite" || pokemon.baseSpecies.name === "Blite") {
        return false;
      }
      return true;
    },
    itemUser: ["Blite"]
  }
};
//# sourceMappingURL=items.js.map
