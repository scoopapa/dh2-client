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
  focusinglens: {
    // TODO
    name: "Focusing Lens",
    shortDesc: "Placeholder"
  },
  chromatophores: {
    // TODO
    name: "Chromatophores",
    onPrepareHit(source, target, move) {
      if (move.category !== "Status")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.addType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Chromatophores");
      }
    },
    shortDesc: "changes secondary type to status move used."
  },
  guidedassault: {
    // TODO
    name: "Guided Assault",
    shortDesc: "Placeholder"
  },
  ripplingsurface: {
    // TODO
    name: "Rippling Surface",
    shortDesc: "Placeholder"
  },
  dreamcatcher: {
    // TODO
    name: "Dream Catcher",
    shortDesc: "Placeholder"
  },
  archetype: {
    // From VGC 20XX
    shortDesc: "Gains opposite effect of target's lowered stat.",
    onPrepareHit(source, target, move) {
      if (move && move.target === "allAdjacentFoes") {
        for (const foe of source.foes()) {
          if (foe.isAdjacent(source)) {
            const boosts = { ...foe.boosts };
            foe.addVolatile("archetype", source);
            foe.volatiles["archetype"].boosts = boosts;
          }
        }
      } else if (move && move.target === "allAdjacent") {
        for (const adjacent of this.getAllActive()) {
          if (adjacent !== source && adjacent.isAdjacent(source)) {
            const boosts = { ...adjacent.boosts };
            adjacent.addVolatile("archetype", source);
            adjacent.volatiles["archetype"].boosts = boosts;
          }
        }
      } else if (move && move.target === "normal") {
        const boosts = { ...target.boosts };
        target.addVolatile("archetype", source);
        target.volatiles["archetype"].boosts = boosts;
      }
    },
    onAfterMove(source, target, move) {
      if (target === source)
        return;
      const stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
      const boostGains = {};
      for (const activeTarget of this.getAllActive()) {
        if (!activeTarget.volatiles["archetype"])
          continue;
        const storedBoosts = activeTarget.volatiles["archetype"].boosts;
        const currentBoosts = activeTarget.boosts;
        for (const stat of stats) {
          if (currentBoosts[stat] < storedBoosts[stat] || currentBoosts[stat] < 0 && currentBoosts[stat] < storedBoosts[stat]) {
            const difference = storedBoosts[stat] - currentBoosts[stat];
            boostGains[stat] = (boostGains[stat] || 0) + difference;
          }
        }
        delete activeTarget.volatiles["archetype"];
      }
      if (Object.keys(boostGains).length > 0) {
        this.boost(boostGains, source, source, this.effect);
      }
    },
    flags: {},
    name: "Archetype"
  },
  ancientcore: {
    // from VGC 20XX
    shortDesc: "Old gen phys/spec split; +20% power.",
    onModifyMovePriority: -1,
    onModifyMove(move) {
      if (move.category !== "Status") {
        const originalCategory = move.category;
        switch (move.type) {
          case "Grass":
          case "Fire":
          case "Water":
          case "Ice":
          case "Electric":
          case "Psychic":
          case "Dragon":
          case "Dark":
            move.category = "Special";
            break;
          case "Bug":
          case "Ghost":
          case "Poison":
          case "Ground":
          case "Rock":
          case "Fighting":
          case "Normal":
          case "Flying":
          case "Steel":
          case "Fairy":
            move.category = "Physical";
            break;
        }
        if (move.category !== originalCategory) {
          move.basePower = Math.floor(move.basePower * 1.2);
          this.add("-message", `Ancient Core boosted ${move.name}'s power!`);
        }
      }
    },
    name: "Ancient Core"
  },
  entanglingroots: {
    // TODO
    name: "Entangling Roots",
    shortDesc: "Placeholder"
  },
  overpoweringmelody: {
    // TODO
    name: "Overpowering Melody",
    onModifyMove(move) {
      if (move.flags["sound"]) {
        if (!move.secondaries)
          move.secondaries = [];
        move.secondaries.push({
          chance: 100,
          volatileStatus: "throatchop"
        });
      }
    },
    shortDesc: "User's sound moves inflict Throat Chop status."
  },
  toxicaura: {
    // TODO
    name: "Toxic Aura",
    shortDesc: "Placeholder"
  }
};
//# sourceMappingURL=abilities.js.map
