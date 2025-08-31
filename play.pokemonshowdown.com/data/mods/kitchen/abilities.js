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
  sprinter: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (attacker.activeMoveActions <= 1) {
        return this.chainModify([1.5]);
      }
    },
    flags: { breakable: 1 },
    name: "Sprinter",
    shortDesc: "This Pokemon deals 1.5x damage with it's first move on the field.",
    rating: 3.5,
    num: 1e3
  },
  temperedsteel: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        move.accuracy = true;
        if (!target.addVolatile("temperedsteel")) {
          this.add("-immune", target, "[from] ability: Tempered Steel");
        }
        return null;
      }
    },
    onEnd(pokemon) {
      pokemon.removeVolatile("temperedsteel");
    },
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(target) {
        this.add("-start", target, "ability: Tempered Steel");
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, attacker, defender, move) {
        if (move.type === "Steel" && attacker.hasAbility("temperedsteel")) {
          this.debug("Tempered Steel boost");
          return this.chainModify(1.5);
        }
      },
      onModifySpAPriority: 5,
      onModifySpA(atk, attacker, defender, move) {
        if (move.type === "Steel" && attacker.hasAbility("temperedsteel")) {
          this.debug("Tempered Steel boost");
          return this.chainModify(1.5);
        }
      },
      onEnd(target) {
        this.add("-end", target, "ability: Tempered Steel", "[silent]");
      }
    },
    flags: { breakable: 1 },
    name: "Tempered Steel",
    shortDesc: "This Pokemon's Steel attacks do 1.5x damage if hit by one Fire move; Fire immunity.",
    rating: 3.5,
    num: 1001
  }
};
//# sourceMappingURL=abilities.js.map
