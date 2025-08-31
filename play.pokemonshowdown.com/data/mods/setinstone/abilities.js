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
  risingsun: {
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (move.category === "Physical")
        this.boost({ spa: 1 }, source, source);
      if (move.category === "Special")
        this.boost({ atk: 1 }, source, source);
    },
    name: "Rising Sun",
    shortDesc: "This Pokemon raises its Attack by 1 stage when using a special attack and vice versa.",
    num: -1
  },
  germinate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Grass";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Germinate",
    shortDesc: "This Pokemon's Normal type moves become Grass type and have 1.2x power.",
    num: -2
  },
  iceskate: {
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (move.type === "Ice")
        this.boost({ spe: 1 }, source, source);
    },
    name: "Ice Skate",
    shortDesc: "This Pokemon's Speed is raised by one stage after using an Ice-type move.",
    num: -3
  },
  bullying: {
    onModifyMove(move) {
      if (!move?.flags["contact"] || move.target === "self")
        return;
      if (!move.secondaries) {
        move.secondaries = [];
      }
      move.secondaries.push({
        chance: 30,
        onHit(source) {
          for (const pokemon of source.side.foe.active) {
            pokemon.addVolatile("taunt");
          }
        },
        ability: this.dex.abilities.get("bullying")
      });
    },
    name: "Bullying",
    shortDesc: "This Pokemon's contact moves have a 30% chance to taunt the target.",
    num: -4
  },
  loosecannon: {
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (typeof move.accuracy !== "number")
        return basePower;
      return basePower + (100 - move.accuracy);
    },
    name: "Loose Cannon",
    shortDesc: "This Pokemon's moves gain 1 BP per percent accuracy below 100.",
    num: -5
  }
};
//# sourceMappingURL=abilities.js.map
