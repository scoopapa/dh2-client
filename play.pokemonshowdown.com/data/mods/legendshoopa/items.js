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
  toxicorb: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.status) {
        this.add("-curestatus", pokemon, pokemon.status, "[Silent]");
        pokemon.setStatus("");
      }
      pokemon.trySetStatus("tox", pokemon);
    }
  },
  flameorb: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.status) {
        pokemon.setStatus("");
      }
      pokemon.trySetStatus("brn", pokemon);
    }
  },
  weaknesspolicy: {
    inherit: true,
    onDamagingHit(damage, target, source, move) {
      if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
        target.useItem();
        target.addVolatile("primed");
      }
    }
  }
};
//# sourceMappingURL=items.js.map
