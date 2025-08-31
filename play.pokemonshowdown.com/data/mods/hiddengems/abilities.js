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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  amorphous: {
    onPrepareHit(source, target, move) {
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Amorphous");
      }
    },
    flags: {},
    name: "Amorphous",
    rating: 5,
    shortDesc: "This Pokemon's type changes to match the type of the move it is about to use. Works multiple times per switch-in."
  },
  inversion: {
    shortDesc: "On switch-in, this Pokemon summons Trick Room.",
    onStart(source) {
      this.add("-ability", source, "Inversion");
      this.field.addPseudoWeather("trickroom", source, source.ability);
    },
    flags: {},
    name: "Inversion",
    rating: 5
  },
  gravityfield: {
    shortDesc: "On switch-in, this Pokemon summons Gravity.",
    onStart(source) {
      this.add("-ability", source, "Gravity Field");
      this.field.addPseudoWeather("gravity", source, source.ability);
    },
    flags: {},
    name: "Gravity Field",
    rating: 4
  },
  obstinacy: {
    desc: "User gains a boost in it's moves the lower its HP gets. Formula: (1.0 - [Current percentage of HP in decimal form]) + 1.0",
    shortDesc: "User gains a boost in it's moves the lower it's HP gets.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      const obstiancyboost = 1 - attacker.hp / attacker.maxhp + 1;
      return this.chainModify(obstiancyboost);
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      const obstiancyboost = 1 - attacker.hp / attacker.maxhp + 1;
      return this.chainModify(obstiancyboost);
    },
    flags: {},
    name: "Obstinacy",
    rating: 4
  },
  dualdish: {
    onResidualOrder: 5,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (this.field.isWeather(["raindance", "primordialsea"]))
        return;
      this.heal(pokemon.maxhp / 16);
    },
    onWeather(target, source, effect) {
      if (effect.id === "raindance" || effect.id === "primordialsea") {
        this.heal(target.baseMaxhp / 8);
      }
    },
    name: "Dual Dish",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Rain.",
    rating: 3
  },
  terashimmer: {
    onModifySTAB(stab, source, target, move) {
      if (move.forceSTAB || source.hasType(move.type)) {
        return 1;
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.name.startsWith("Terapagos-Terastal")) {
        return this.chainModify([4915, 4096]);
      }
    },
    flags: {},
    name: "Tera Shimmer",
    rating: 3,
    shortDesc: "This Pokemon's moves deal 1.2x damage but don't gain STAB."
  }
};
//# sourceMappingURL=abilities.js.map
