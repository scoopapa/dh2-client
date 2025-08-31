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
var statuses_exports = {};
__export(statuses_exports, {
  Statuses: () => Statuses
});
module.exports = __toCommonJS(statuses_exports);
const Statuses = {
  brn: {
    inherit: true,
    onResidual(pokemon) {
      this.damage(pokemon.baseMaxhp / 8);
    }
  },
  par: {
    inherit: true,
    onModifySpe(spe, pokemon) {
      if (!pokemon.hasAbility("quickfeet")) {
        return this.chainModify(0.25);
      }
    }
  },
  confusion: {
    inherit: true,
    onBeforeMove(pokemon) {
      pokemon.volatiles.confusion.time--;
      if (!pokemon.volatiles.confusion.time) {
        pokemon.removeVolatile("confusion");
        return;
      }
      this.add("-activate", pokemon, "confusion");
      if (this.randomChance(1, 2)) {
        return;
      }
      const damage = this.getDamage(pokemon, pokemon, 40);
      if (typeof damage !== "number")
        throw new Error("Confusion damage not dealt");
      this.damage(damage, pokemon, pokemon, {
        id: "confused",
        effectType: "Move",
        type: "???"
      });
      return false;
    }
  },
  choicelock: {
    inherit: true,
    onBeforeMove() {
    }
  }
};
//# sourceMappingURL=statuses.js.map
