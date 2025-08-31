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
var rulesets_exports = {};
__export(rulesets_exports, {
  Rulesets: () => Rulesets
});
module.exports = __toCommonJS(rulesets_exports);
const Rulesets = {
  standardnatdex: {
    effectType: "ValidatorRule",
    name: "Standard NatDex",
    desc: "The standard ruleset for all National Dex tiers",
    ruleset: [
      "Obtainable",
      "+Unobtainable",
      "+Past",
      "Team Preview",
      "Nickname Clause",
      "HP Percentage Mod",
      "Cancel Mod",
      "Endless Battle Clause"
    ],
    onValidateSet(set) {
      const unobtainables = [
        "Eevee-Starter",
        "Floette-Eternal",
        "Pichu-Spiky-eared",
        "Pikachu-Belle",
        "Pikachu-Cosplay",
        "Pikachu-Libre",
        "Pikachu-PhD",
        "Pikachu-Pop-Star",
        "Pikachu-Rock-Star",
        "Pikachu-Starter",
        "Eternatus-Eternamax"
      ];
      const species = this.dex.species.get(set.species);
      if (species.restrictedLearnset || species.name === "Vespiquen") {
        const problems = [];
        if (set.moves) {
          for (const moveId of set.moves) {
            const move = this.dex.moves.get(moveId);
            if (move.isNonstandard) {
              problems.push(
                move.name + " is not available in Sword and Shield, which is necessary for " + species.name + " because its home mod requires it."
              );
            }
          }
        }
        return problems;
      }
      if (unobtainables.includes(species.name)) {
        if (this.ruleTable.has(`+pokemon:${species.id}`))
          return;
        return [`${set.name || set.species} does not exist in the National Dex.`];
      }
      if (species.tier === "Unreleased") {
        const basePokemon = this.toID(species.baseSpecies);
        if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
          return;
        }
        return [`${set.name || set.species} does not exist in the National Dex.`];
      }
      if (!set.item)
        return;
      const item = this.dex.items.get(set.item);
      if (!item.isNonstandard)
        return;
      if (["Past", "Unobtainable"].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
        if (this.ruleTable.has(`+item:${item.id}`))
          return;
        return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
      }
    }
  },
  ohkoclause: {
    effectType: "ValidatorRule",
    name: "OHKO Clause",
    desc: "Bans all OHKO moves, such as Fissure",
    onBegin() {
      this.add("rule", "OHKO Clause: OHKO moves are banned (except Escavalier :P)");
    },
    onValidateSet(set) {
      const problems = [];
      if (set.moves) {
        for (const moveId of set.moves) {
          const move = this.dex.moves.get(moveId);
          if (move.ohko)
            problems.push(move.name + " is banned by OHKO Clause.");
          if (set.species === "Escavalier")
            continue;
          if (move.name === "Guillotine")
            problems.push(move.name + " is banned by OHKO Clause.");
          if (move.name === "Horn Drill")
            problems.push(move.name + " is banned by OHKO Clause.");
        }
      }
      return problems;
    }
  }
};
//# sourceMappingURL=rulesets.js.map
