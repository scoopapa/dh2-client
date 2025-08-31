"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
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
  shadownightmare: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Shadow" && target.status === "slp" || target.hasAbility("comatose")) {
        this.debug("Shadow Nightmare boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Shadow" && target.status === "slp" || target.hasAbility("comatose")) {
        this.debug("Shadow Nightmare boost");
        return this.chainModify(1.5);
      }
    },
    name: "Shadow Nightmare",
    shortDesc: "Shadow moves this Pokemon uses will do 1.5x damage if the target is asleep.",
    rating: 4,
    num: 271
  },
  miasma: {
    // upokecenter says this is implemented as an added secondary effect
    onModifyMove(move2) {
      if (move2.type !== "Normal" && target.type === "Shadow" && !move2 || move2.target === "self")
        return;
      if (!move2.secondaries) {
        move2.secondaries = [];
      }
      move2.secondaries.push({
        chance: 20,
        status: "psn",
        ability: this.dex.getAbility("miasma")
      });
    },
    name: "Miasma",
    shortDesc: "Shadow moves this Pokemon uses have a 20% chance of poisoning opposing non-Shadow Pokemon.",
    rating: 2,
    num: 143
  },
  lawsofstreet: {
    onModifyDamage(damage, source2, target2, move2) {
      if (move2.type !== "Shadow" && target2.getMoveHitData(move2).typeMod > 0)
        return;
      if (move2.category === "Physical") {
        this.boost({ def: -1 }, source2, target2, null, true);
      } else if (move2.category === "Special") {
        this.boost({ spd: -1 }, source2, target2, null, true);
      }
    },
    name: "Laws of Street",
    shortDesc: "Super effective non-Shadow moves drop corresponding defense by one.",
    rating: 2.5,
    num: 233
  },
  negativecharge: {
    onStart(pokemon) {
      if (target.types.includes("Shadow") || this.suppressingAbility(pokemon))
        return;
      this.add("-ability", pokemon, "Negative Charge");
    },
    onAnyModifyAtk(atk, source2, target2, move2) {
      const abilityHolder = this.effectState.target;
      if (source2.hasAbility("Negative Charge"))
        return;
      if (!move2.ruinedAtk)
        move2.ruinedAtk = abilityHolder;
      if (move2.ruinedAtk !== abilityHolder)
        return;
      this.debug("Negative Charge Atk drop");
      return this.chainModify(0.75);
    },
    onAnyModifySpA(spa, source2, target2, move2) {
      const abilityHolder = this.effectState.target;
      if (source2.hasAbility("Negative Charge"))
        return;
      if (!move2.ruinedSpA)
        move2.ruinedSpA = abilityHolder;
      if (move2.ruinedSpA !== abilityHolder)
        return;
      this.debug("Negative Charge SpA drop");
      return this.chainModify(0.75);
    },
    name: "Negative Charge",
    shortDesc: "Active Shadow type Pokemon without this Ability have their Attack and Special Attack multiplied by 0.75.",
    rating: 4.5,
    num: 284
  },
  fearthedark: {
    onStart(pokemon) {
      let activated = false;
      for (const target2 of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Fear the Dark", "boost");
          activated = true;
        }
        if (target2.volatiles["substitute"]) {
          this.add("-immune", target2);
        } else {
          this.boost({ atk: -1, spa: -1 }, target2, pokemon, null, true);
        }
      }
    },
    name: "Fear the Dark",
    shortDesc: "Upon switch-in, opposing Pokemon have their Atk and SpA lowered by 1.",
    rating: 3.5,
    num: 22
  },
  shadowboxer: {
    onDamagingHit(damage, target2, source2, effect) {
      if (target2.getMoveHitData(move).typeMod < 0) {
        this.boost({ def: 1, spd: 1 });
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["punch"]) {
        this.debug("Iron Fist boost");
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Shadow Boxer",
    shortDesc: "When hit by a resisted attack, raise Def and SpD by 1. Increases the power of all punching moves by 20%.",
    rating: 3.5,
    num: 192
  },
  critic: {
    onHit(target2, source2, move2) {
      if (!target2.hp)
        return;
      if (move2?.effectType === "Move" && target2.getMoveHitData(move2).crit) {
        const r = this.random(100);
        if (r < 25) {
          source2.setStatus("slp", target2);
        } else if (r < 50) {
          source2.setStatus("par", target2);
        } else if (r < 75) {
          source2.setStatus("psn", target2);
        } else if (r < 100) {
          source2.setStatus("frz", target2);
        }
      }
    },
    name: "Critic",
    shortDesc: "When hit by a crit, inflict a random status effect on the opponent.",
    rating: 3.5,
    num: 192
  },
  cryogenian: {
    onStart(source2) {
      this.field.setWeather("snow");
    },
    onModifyAtk(atk, pokemon) {
      if (["snow"].includes(pokemon.effectiveWeather())) {
        return this.chainModify([5325, 4096]);
      }
    },
    onModifySpA(spa, pokemon) {
      if (["snow"].includes(pokemon.effectiveWeather())) {
        return this.chainModify([5325, 4096]);
      }
    },
    name: "Cryogenian",
    shortDesc: "On switch-in, summons Snow. While Snow is active, the base powers of this Pokemon's moves are multiplied by 1.3x.",
    rating: 4,
    num: 117
  },
  shadowclaws: {
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    onModifyDamage(damage, source2, target2, move2) {
      if (target2.getMoveHitData(move2).crit) {
        this.debug("Shadow Claws boost");
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Shadow Claws",
    shortDesc: "+1 Critical Hit Ratio. When this Pokemon gets a critical hit, the attack's power is multiplied by 1.2x.",
    rating: 4,
    num: 105
  },
  lastdance: {
    onModifyMove(move2) {
      if (!move2?.flags["dance"])
        return;
      if (!move2.secondaries) {
        move2.secondaries = [];
      }
      move2.secondaries.push({
        chance: 100,
        self: {
          boosts: {
            spa: 1
          }
        },
        ability: this.dex.abilities.get("lastdance")
      });
    },
    onTryAddVolatile(status, pokemon) {
      if (status.id === "confusion")
        return null;
    },
    onBasePowerPriority: 7,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["dance"]) {
        this.debug("Last Dance weaken");
        return this.chainModify(0.75);
      }
    },
    name: "Last Dance",
    shortDesc: "When this Pokemon uses a dance move, its Special Attack is raised by one stage. This Pokemon is immune to confusion, and it's dance moves deal 0.75x damage.",
    rating: 3.5,
    num: 220
  },
  shadowscourge: {
    onStart(pokemon) {
      for (const target2 of pokemon.foes()) {
        if (!target2.activeTurns) {
          this.damage(target2.baseMaxhp / 16, target2, pokemon);
        }
      }
    },
    name: "Shadow Scourge",
    shortDesc: "When opponent switches in, while Heracross-Shadow is active, opposing Pok\xE9mon take 1/16 of their hp as damage.",
    rating: 3.5,
    num: 220
  },
  shadowdawn: {
    onStart(source2) {
      this.field.setWeather("shadowsky");
    },
    name: "Shadow Dawn",
    shortDesc: "Sets Shadow Sky.",
    rating: 3.5,
    num: 220
  },
  shadowspell: {
    onModifyMove(move2) {
      if (!move2 || !target)
        return;
      if (target !== source && target.hp && move2.category == "Special" && !move2.secondaries) {
        move2.secondaries = [];
      }
      move2.secondaries.push({
        chance: 30,
        boosts: {
          spd: -1
        },
        ability: this.dex.abilities.get("shadowspell")
      });
    },
    name: "Shadow Spell",
    shortDesc: "This Pok\xE9mon's special moves have an additional 30% chance of lower their target SpDef by one stage.",
    rating: 3.5,
    num: 220
  },
  darkmind: {
    onTryHit(target2, source2, move2) {
      if (target2 !== source2 && (move2.type === "Dark" || move2.type === "Psychic" || move2.pranksterBoosted)) {
        this.add("-immune", target2, "[from] ability: Dark Mind");
      }
    },
    name: "Dark Mind",
    shortDesc: "This Pok\xE9mon's special moves have an additional 30% chance of lower their target SpDef by one stage.",
    rating: 3.5,
    num: 220
  },
  combustion: {
    // Placeholder
    name: "Combustion",
    shortDesc: "This Pok\xE9mon can burn a target regardless of its typing.",
    rating: 3.5,
    num: 220
  }
};
//# sourceMappingURL=abilities.js.map
