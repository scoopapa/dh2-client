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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  // Paradoxes moves
  crystalwave: {
    num: -1,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Crystal Wave",
    shortDesc: "Nullifies the foe's Ability if the foe has any status condition.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Power Gem", target);
    },
    onHit(target) {
      if (target.getAbility().isPermanent)
        return;
      if (target.status || target.hasAbility("comatose")) {
        target.addVolatile("gastroacid");
      }
    },
    onAfterSubDamage(damage, target) {
      if (target.getAbility().isPermanent)
        return;
      if (target.status || target.hasAbility("comatose")) {
        target.addVolatile("gastroacid");
      }
    },
    secondary: null,
    target: "normal",
    type: "Flying"
  },
  thunderhammer: {
    num: -2,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Thunder Hammer",
    shortDesc: "Lowers the user's Speed by 1.",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    self: {
      boosts: {
        spe: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  metamorphosis: {
    num: -3,
    accuracy: 90,
    basePower: 120,
    category: "Special",
    name: "Metamorphosis",
    shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      this.boost({ spa: 1 }, attacker, attacker, move);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    secondary: null,
    target: "normal",
    type: "Bug"
  },
  tripledrill: {
    num: -4,
    shortDesc: "Hits three times. Each hit increases in BP by 20, but they have separate accuracy checks.",
    accuracy: 90,
    basePower: 20,
    basePowerCallback(pokemon, target, move) {
      return 20 * move.hit;
    },
    category: "Physical",
    name: "Triple Drill",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    multihit: 3,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Ground",
    zMove: { basePower: 120 },
    maxMove: { basePower: 140 }
  },
  cleansingwater: {
    num: -5,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cleansing Water",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 1 / 3;
      if (pokemon.status) {
        factor = 1 / 6;
        pokemon.cureStatus();
      }
      return !!this.heal(this.modify(pokemon.maxhp, factor));
    },
    secondary: null,
    target: "self",
    type: "Water",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  }
};
//# sourceMappingURL=moves.js.map
