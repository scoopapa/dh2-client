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
  crystalorb: {
    inherit: true,
    isNonstandard: "Past"
  },
  feralorb: {
    inherit: true,
    isNonstandard: "Past"
  },
  shatteredorb: {
    name: "Shattered Orb",
    fling: {
      basePower: 30
    },
    desc: "Single use per battle. Instantly sets a World Effect in the holder's moveset.",
    onStart(pokemon) {
      if (!pokemon.side.usedShatteredOrb)
        pokemon.side.usedShatteredOrb = false;
      let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon);
      if (!wMove)
        return;
      if (!pokemon.ignoringItem() && this.dex.dataCache.scootopia.getWorldEffect(pokemon) !== wMove) {
        pokemon.useItem();
        pokemon.battle.field.addPseudoWeather(wMove);
        pokemon.side.usedShatteredOrb = true;
      }
    },
    onUpdate(pokemon) {
      if (pokemon.side.usedShatteredOrb)
        return;
      let wMove = this.dex.dataCache.scootopia.getWorldEffectMove(pokemon);
      if (!wMove)
        return;
      if (!pokemon.ignoringItem() && this.dex.dataCache.scootopia.getWorldEffect(pokemon) !== wMove) {
        pokemon.useItem();
        pokemon.battle.field.addPseudoWeather(wMove);
        pokemon.side.usedShatteredOrb = true;
      }
    },
    onTakeItem(item, pokemon, source) {
      if (pokemon.side.usedShatteredOrb)
        return true;
      return false;
    },
    gen: 9,
    rating: 3
  }
};
//# sourceMappingURL=items.js.map
