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
  thermalexchange: {
    onTryHit(target, source, move) {
      if (move.type === "Fire") {
        this.add("-immune", pokemon, "[from] ability: Thermal Exchange");
        return null;
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.type === "Fire") {
        this.boost({ atk: 1 });
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Thermal Exchange");
      }
      return false;
    },
    name: "Thermal Exchange",
    shortDesc: "Atk is raised by 1 when this Pokemon is hit by a Fire move; Fire immunity; can't be burned.",
    rating: 2.5
  },
  carpenter: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Carpenter boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Carpenter boost");
        return this.chainModify(1.5);
      }
    },
    name: "Carpenter",
    shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Grass-type attack.",
    rating: 3.5
  },
  myceliummight: {
    onFractionalPriorityPriority: -1,
    onFractionalPriority(priority, pokemon2, target, move) {
      if (move.category === "Status") {
        return -0.1;
      }
    },
    onModifyMove(move) {
      if (move.category === "Status") {
        move.ignoreAbility = true;
        move.ignoreVolatiles = true;
      }
    },
    name: "Mycelium Might",
    rating: 2,
    num: 298
  },
  honeyfists: {
    onModifyMove(move, pokemon2) {
      if (pokemon2.types.includes(move.type))
        move.drain = [1, 8];
    },
    name: "Honey Fists",
    shortDesc: "When this Pokemon uses a STAB attack, it heals 1/8 of the damage dealt.",
    rating: 4
  },
  northwind: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("North Wind boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Flying") {
        this.debug("North Wind boost");
        return this.chainModify(1.5);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Bug") {
        this.debug("North Wind weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Bug") {
        this.debug("North Wind weaken");
        return this.chainModify(0.5);
      }
    },
    name: "North Wind",
    shortDesc: "User gains STAB on Flying moves and also gains Flying-type resistances.",
    rating: 4.5
  },
  fortitude: {
    onModifySpAPriority: 5,
    onModifySpA(atk, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    name: "Fortitude",
    shortDesc: "If this Pokemon is statused, its Sp. Atk is multiplied by 1.5x.",
    rating: 3.5,
    num: 62
  },
  gravitationalpull: {
    onStart(source) {
      this.add("-ability", source, "Gravitational Pull");
      this.field.addPseudoWeather("gravity", source, source.ability);
    },
    name: "Gravitational Pull",
    shortDesc: "On switch-in, this Pokemon summons Gravity.",
    rating: 4
  }
};
//# sourceMappingURL=abilities.js.map
