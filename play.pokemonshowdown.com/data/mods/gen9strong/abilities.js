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
  aerilate: {
    inherit: true,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([5325, 4096]);
    },
    shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.3x power."
  },
  dauntlessshield: {
    inherit: true,
    onStart(pokemon) {
      this.boost({ def: 1 }, pokemon);
    },
    shortDesc: "On switch-in, this Pokemon's Defense is raised by 1 stage."
  },
  galewings: {
    inherit: true,
    onModifyPriority(priority, pokemon, target, move) {
      if (move && move.type === "Flying")
        return priority + 1;
    },
    shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1."
  },
  galvanize: {
    inherit: true,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([5325, 4096]);
    },
    shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.3x power."
  },
  intrepidsword: {
    inherit: true,
    onStart(pokemon) {
      this.boost({ atk: 1 }, pokemon);
    },
    shortDesc: "On switch-in, this Pokemon's Attack is raised by 1 stage."
  },
  libero: {
    inherit: true,
    onPrepareHit(source, target, move) {
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Libero");
      }
    },
    onSwitchIn() {
    },
    shortDesc: "This Pokemon's type changes to match the type of the move it is about to use."
  },
  moody: {
    inherit: true,
    onResidual(pokemon) {
      let stats = [];
      const boost = {};
      let statPlus;
      for (statPlus in pokemon.boosts) {
        if (pokemon.boosts[statPlus] < 6) {
          stats.push(statPlus);
        }
      }
      let randomStat = stats.length ? this.sample(stats) : void 0;
      if (randomStat)
        boost[randomStat] = 2;
      stats = [];
      let statMinus;
      for (statMinus in pokemon.boosts) {
        if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
          stats.push(statMinus);
        }
      }
      randomStat = stats.length ? this.sample(stats) : void 0;
      if (randomStat)
        boost[randomStat] = -1;
      this.boost(boost, pokemon, pokemon);
    },
    shortDesc: "Raises a random stat by 2 and lowers another stat by 1 at the end of each turn."
  },
  parentalbond: {
    inherit: true,
    shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage halved."
  },
  pixilate: {
    inherit: true,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([5325, 4096]);
    },
    shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power."
  },
  protean: {
    inherit: true,
    onPrepareHit(source, target, move) {
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Protean");
      }
    },
    onSwitchIn() {
    },
    shortDesc: "This Pokemon's type changes to match the type of the move it is about to use."
  },
  refrigerate: {
    inherit: true,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([5325, 4096]);
    },
    shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power."
  },
  transistor: {
    inherit: true,
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Electric") {
        this.debug("Transistor boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Electric") {
        this.debug("Transistor boost");
        return this.chainModify(1.5);
      }
    },
    shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using an Electric-type attack."
  }
};
//# sourceMappingURL=abilities.js.map
