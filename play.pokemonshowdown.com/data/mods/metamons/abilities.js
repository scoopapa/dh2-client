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
  /* Gen 7 MetaMons*/
  berserkgen7: {
    onDamagingHit(damage, target, source, effect) {
      this.boost({ spa: 1 });
    },
    name: "Berserk-Gen 7",
    shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage after it is damaged by a move.",
    rating: 2,
    num: 201
  },
  chimera: {
    onModifySpeciesPriority: 2,
    onModifySpecies(species, target, source, effect) {
      if (!target)
        return;
      if (effect && ["imposter", "transform"].includes(effect.id))
        return;
      const types = [...new Set(target.baseMoveSlots.slice(0, 2).map((move) => this.dex.moves.get(move.id).type))];
      return { ...species, types };
    },
    onSwitchIn(pokemon2) {
      this.add("-start", pokemon2, "typechange", (pokemon2.illusion || pokemon2).getTypes(true).join("/"), "[silent]");
    },
    shortDesc: "(Placeholder) User's type matches that of its first two moves (new type is displayed).",
    name: "Chimera",
    rating: 3,
    num: -29
  },
  fortress: {
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Rock") {
        return this.chainModify(0.5);
      }
    },
    name: "Fortress",
    shortDesc: "The power of Fighting and Ground attacks against this Pokemon is halved.",
    rating: 2,
    num: 85
  },
  infiltratorgen7: {
    onModifyMove(move) {
      move.infiltrates = true;
    },
    onDamage(damage, target, source, effect) {
      if (effect.id === "gmaxsteelsurge" || effect.id === "spikes" || effect.id === "stealthrock" || effect.id === "stickyweb" || effect.id === "toxicspikes") {
        return false;
      }
    },
    name: "Infiltrator-Gen 7",
    shortDesc: "Moves ignore substitutes/side conditions. This Pokemon is immune to hazards.",
    rating: 2.5,
    num: 151
  },
  lightrunner: {
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Ground") {
        return this.chainModify(0.5);
      }
    },
    name: "Light Runner",
    shortDesc: "The power of Ground-type attacks against this Pokemon is halved",
    rating: 2,
    num: 85
  },
  persistence: {
    onModifyDefPriority: 6,
    onModifyDef(def, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    name: "Persistence",
    shortDesc: "1.5x Defense when statused.",
    rating: 2.5,
    num: 63
  },
  purepowergen7: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Pure Power boost");
        return this.chainModify(2);
      }
    },
    name: "Pure Power-Gen 7",
    shortDesc: "This Pokemon's moves of 60 power or less have 2x power, including Struggle.",
    rating: 5,
    num: 74
  },
  /* Gen 8 MetaMons*/
  unnerve: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Unnerve", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spa: -1 }, target, pokemon2, null, true);
        }
      }
    },
    name: "Unnerve",
    shortDesc: "On switch-in, this Pokemon lowers the Special attack of adjacent opponents by 1 stage.",
    rating: 1.5,
    num: 127
  },
  abyssalboost: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Abyssal boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Abyssal boost");
        return this.chainModify(1.5);
      }
    },
    name: "Abyssal Boost",
    shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Dark-type attack.",
    rating: 3.5,
    num: 300
  },
  typesuction: {
    shortDesc: "On switch-in adds the foes type(s).",
    onStart(source) {
      const newTypes = [];
      newTypes.push(source.types[0]);
      if (source.types[1])
        newTypes.push(source.types[1]);
      for (const target of source.side.foe.active) {
        for (const type of target.types) {
          if (newTypes.includes(type) || type === "???")
            continue;
          newTypes.push(type);
        }
        if (target.addedType && !newTypes.includes(target.addedType)) {
          newTypes.push(target.addedType);
        }
        this.add("-start", source, "typeadd", "[from] ability: Type Suction", "[of] " + source);
        source.setType(newTypes);
        source.knownType = target.side === source.side && target.knownType;
      }
    },
    name: "Type Suction",
    rating: 3.5,
    num: 302
  },
  flowerveil: {
    onAllyBoost(boost, target, source, effect) {
      if (source && target === source)
        return;
      let showMsg = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          delete boost[i];
          showMsg = true;
        }
      }
      if (showMsg && !effect.secondaries) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Flower Veil", "[of] " + effectHolder);
      }
    },
    onAllySetStatus(status, target, source, effect) {
      if (source && target !== source && effect && effect.id !== "yawn") {
        this.debug("interrupting setStatus with Flower Veil");
        if (effect.id === "synchronize" || effect.effectType === "Move" && !effect.secondaries) {
          const effectHolder = this.effectState.target;
          this.add("-block", target, "ability: Flower Veil", "[of] " + effectHolder);
        }
        return null;
      }
    },
    onAllyTryAddVolatile(status, target) {
      if (status.id === "yawn") {
        this.debug("Flower Veil blocking yawn");
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Flower Veil", "[of] " + effectHolder);
        return null;
      }
    },
    name: "Flower Veil",
    rating: 0,
    num: 166
  },
  pillage: {
    id: "pillage",
    name: "Pillage",
    shortDesc: "On switch-in, swaps ability with the opponent.",
    onSwitchIn(pokemon2) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon2) {
      if (pokemon2.side.foe.active.some(
        (foeActive) => foeActive && pokemon2.isAdjacent(foeActive) && foeActive.ability === "noability"
      ) || pokemon2.species.id !== "jellicent") {
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon2) {
      if (!pokemon2.isStarted || this.effectState.gaveUp)
        return;
      if (!this.effectState.switchingIn)
        return;
      const possibleTargets = pokemon2.side.foe.active.filter((foeActive) => foeActive && pokemon2.isAdjacent(foeActive));
      while (possibleTargets.length) {
        let rand = 0;
        if (possibleTargets.length > 1)
          rand = this.random(possibleTargets.length);
        const target = possibleTargets[rand];
        const ability = target.getAbility();
        const additionalBannedAbilities = [
          // Zen Mode included here for compatability with Gen 5-6
          "noability",
          "flowergift",
          "forecast",
          "hungerswitch",
          "illusion",
          "pillage",
          "imposter",
          "neutralizinggas",
          "powerofalchemy",
          "receiver",
          "trace",
          "zenmode",
          "magicmissile",
          "ecopy",
          "lemegeton",
          "modeshift",
          "rebootsystem",
          "concussion"
        ];
        if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
          possibleTargets.splice(rand, 1);
          continue;
        }
        target.setAbility("pillage", pokemon2);
        pokemon2.setAbility(ability);
        this.add("-activate", pokemon2, "ability: Pillage");
        this.add("-activate", pokemon2, "Skill Swap", "", "", "[of] " + target);
        this.add("-activate", pokemon2, "ability: " + ability.name);
        this.add("-activate", target, "ability: Pillage");
        return;
      }
    }
  },
  dauntlessshieldgen8: {
    onStart(pokemon2) {
      this.boost({ def: 1 }, pokemon2);
    },
    name: "Dauntless Shield-Gen 8",
    shortDesc: "On switch-in, this Pokemon's Defense is raised by 1 stage. Once per battle.",
    rating: 3.5,
    num: 235
  },
  proteangen8: {
    onPrepareHit(source, target, move) {
      if (move.hasBounced)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Protean");
      }
    },
    name: "Protean-Gen 8",
    rating: 4.5,
    num: 168
  },
  /* Gen 9 MetaMons*/
  refrigerate: {
    shortDesc: "Normal moves become Ice type and 1.2x power. Ice moves 1.5x power.",
    onModifyTypePriority: -1,
    onModifyType(move, pokemon2) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status")) {
        move.type = "Ice";
        move.refrigerateBoosted = true;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.refrigerateBoosted)
        return this.chainModify([4915, 4096]);
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        this.debug("Refrigerate boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        this.debug("Refrigerate boost");
        return this.chainModify(1.5);
      }
    },
    name: "Refrigerate",
    rating: 4,
    num: 174
  },
  wiseeye: {
    shortDesc: "This Pok\xE9mon crits against opposing Pok\xE9mon sharing a type with it.",
    onModifyCritRatio(critRatio, source, target) {
      if (target.hasType(source.getTypes()))
        return 5;
    },
    name: "Wise Eye",
    rating: 3
  },
  dancer: {
    name: "Dancer",
    // implemented in runMove in scripts.js
    onModifyMove(move) {
      if (!move.flags["dance"] || move.category === "Status")
        return;
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true)) {
        move.category === "Physical";
      } else if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true)) {
        move.category === "Special";
      }
    },
    rating: 1.5,
    num: 216
  }
};
//# sourceMappingURL=abilities.js.map
