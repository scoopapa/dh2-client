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
  absorption: {
    shortDesc: "Increases user's base Def or SpD in terrain.",
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isTerrain("grassyterrain") || this.field.isTerrain("electricterrain"))
        return this.chainModify(1.5);
    },
    onModifySpDPriority: 6,
    onModifySpD(pokemon) {
      if (this.field.isTerrain("acidicterrain") || this.field.isTerrain("mistyterrain") || this.field.isTerrain("psychicterrain"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Absorption",
    rating: 2,
    num: -1
  },
  // end
  // start
  acidicsurge: {
    desc: "On switch-in, this Pok\xE9mon summons Acidic Terrain for 5 turns. During the effect, the power of Poison-type attacks made by grounded Pok\xE9mon is multiplied by 1.3, and grounded Steel-types are not immune to Poison-type damage. Steel-type Pok\xE9mon are still immune to being poisoned and badly poisoned, except by Pok\xE9mon with Corrosion. Camouflage transforms the user into a Poison-type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
    shortDesc: "5 turns. Grounded: +Poison power, Steel not immune to Poison type.",
    onStart(source) {
      this.field.setTerrain("acidicterrain");
    },
    flags: {},
    name: "Acidic Surge",
    rating: 4,
    num: -2
  },
  // end
  // start
  mimicry: {
    onStart(pokemon) {
      this.singleEvent("TerrainChange", this.effect, this.effectState, pokemon);
    },
    onTerrainChange(pokemon) {
      let types;
      switch (this.field.terrain) {
        case "electricterrain":
          types = ["Electric"];
          break;
        case "grassyterrain":
          types = ["Grass"];
          break;
        case "mistyterrain":
          types = ["Fairy"];
          break;
        case "psychicterrain":
          types = ["Psychic"];
          break;
        case "acidicterrain":
          types = ["Poison"];
          break;
        default:
          types = pokemon.baseSpecies.types;
      }
      const oldTypes = pokemon.getTypes();
      if (oldTypes.join() === types.join() || !pokemon.setType(types))
        return;
      if (this.field.terrain || pokemon.transformed) {
        this.add("-start", pokemon, "typechange", types.join("/"), "[from] ability: Mimicry");
        if (!this.field.terrain)
          this.hint("Transform Mimicry changes you to your original un-transformed types.");
      } else {
        this.add("-activate", pokemon, "ability: Mimicry");
        this.add("-end", pokemon, "typechange", "[silent]");
      }
    },
    flags: {},
    name: "Mimicry",
    rating: 0,
    num: 250
  },
  // end
  // start
  agitation: {
    desc: "When this Pok\xE9mon raises or lowers another Pok\xE9mon's stat stages, the effect is increased by one stage for each affected stat.",
    shortDesc: "Increases stat stage changes the Pok\xE9mon inflicts by 1 stage.",
    onAnyTryBoost(boost, target, source, effect) {
      if (effect && effect.id === "zpower")
        return;
      if (!target || !source || target === source || source !== this.effectState.target)
        return;
      for (const stat in boost) {
        const boostValue = boost[stat];
        if (boostValue !== void 0) {
          if (boostValue < 0) {
            boost[stat] = boostValue - 1;
          } else if (boostValue > 0) {
            boost[stat] = boostValue + 1;
          }
        }
      }
    },
    flags: {},
    name: "Agitation",
    rating: 4,
    num: -3
  },
  // end
  // start
  ampup: {
    desc: "When this Pok\xE9mon's move misses, raises its Speed by 2 stages.",
    shortDesc: "Raises user's Speed by 2 stages if its move misses.",
    onModifySpe(spe, pokemon) {
      if (pokemon.moveThisTurnResult === false) {
        this.boost({ spe: 2 });
      }
    },
    flags: {},
    name: "Amp Up",
    rating: 2,
    num: -4
  },
  // end
  // start:
  buzz: {
    desc: "When this Pok\xE9mon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
    shortDesc: "Inflicts Torment effect if the Pok\xE9mon uses a Sound move.",
    onAfterMove(source, target, move) {
      if (!move.flags["sound"])
        return;
      const applyTorment = (pokemon) => {
        if (pokemon && !pokemon.hasAbility("soundproof") && !pokemon.volatiles["torment"] && !pokemon.volatiles["stall"]) {
          pokemon.addVolatile("torment");
          this.add("-start", pokemon, "Torment", "[from] ability: Buzz");
        }
      };
      switch (move.target) {
        case "all":
          for (const pokemon of this.getAllActive()) {
            applyTorment(pokemon);
          }
          break;
        case "allAdjacent":
          for (const adjacent of this.getAllActive()) {
            if (adjacent !== source && adjacent.isAdjacent(source)) {
              applyTorment(adjacent);
            }
          }
          break;
        case "allAdjacentFoes":
          for (const foe of source.foes()) {
            if (foe.isAdjacent(source)) {
              applyTorment(foe);
            }
          }
          break;
        case "normal":
          applyTorment(target);
          break;
        case "self":
          applyTorment(source);
          break;
        default:
          console.log(`Unhandled move target: ${move.target}`);
      }
    },
    flags: {},
    name: "Buzz",
    rating: 3,
    num: -5
  },
  // end
  // start: look for typetracker and soaksteeldenial in condition.ts, Soak in moves.ts
  // If someone wishes to copy this ability, make sure you account for Magic Powder and special form changes from certain Pkm (like
  // my own Aegislash-Ma'adowr which is Grass / Steel in shield form and Grass / Flying in blade form. Form changes override any
  // temporary type change effect from stuff like Soak or Burn Up, etc.! Magic Powder isn't in my regional dex, so, that's one stuff
  // less to worry about.)
  chainlink: {
    shortDesc: "In a double battle, the Pok\xE9mon steals its partner's Steel type.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted)
        return;
      if (!pokemon.hasType("Steel")) {
        for (const ally of pokemon.allies()) {
          if (ally.hasAbility("chainlink"))
            continue;
          if (ally.hasType("Steel") && pokemon.addType("Steel")) {
            this.add("-ability", pokemon, "Chain Link");
            this.add("-message", `${pokemon.name} stole its partner's armor!`);
            this.add("-start", pokemon, "typeadd", "Steel", "[from] Ability: Chain Link");
            ally.addVolatile("chainlink");
            ally.addVolatile("typetracker");
          }
        }
      }
    },
    onEnd(pokemon) {
      if (!pokemon.hasType("Steel"))
        return;
      for (const ally of pokemon.allies()) {
        ally.removeVolatile("chainlink");
      }
    },
    condition: {
      onStart(pokemon) {
        pokemon.setType(pokemon.getTypes(true).map((type) => type === "Steel" ? "???" : type));
        this.add("-start", pokemon, "typechange", pokemon.types.join("/"));
      },
      onSwitchOut(pokemon) {
        pokemon.removeVolatile("chainlink");
      },
      onFaint(pokemon) {
        pokemon.removeVolatile("chainlink");
      },
      onEnd(pokemon) {
        for (const ally of pokemon.allies()) {
          if (ally.hasAbility("chainlink") && ally.hasType("Steel")) {
            const currentTypes = ally.getTypes();
            const newTypes = currentTypes.filter((type) => type !== "Steel");
            ally.setType(newTypes);
            this.add("-ability", ally, "Chain Link");
            this.add("-message", `${ally.name} returned its partner's armor!`);
            this.add("-start", ally, "typechange", ally.types.join("/"));
          }
        }
        if (pokemon.hasType("???")) {
          if (pokemon.baseSpecies.name === "Mechatauro") {
            const currentTypes = pokemon.getTypes();
            const newTypes = [];
            let replaced = false;
            for (const type of currentTypes) {
              if (type === "???" && !replaced) {
                newTypes.push("Steel");
                replaced = true;
              } else {
                newTypes.push(type);
              }
            }
            pokemon.setType(newTypes);
            this.add("-start", pokemon, "typechange", pokemon.types.join("/"));
          } else {
            const currentTypes = pokemon.getTypes();
            const newTypes = currentTypes.filter((type) => type !== "???").concat("Steel");
            pokemon.setType(newTypes);
            this.add("-start", pokemon, "typechange", pokemon.types.join("/"));
          }
        }
        if (pokemon.volatiles["typetracker"] && pokemon.baseSpecies.name !== "Aegislash-Ma'adowr" && pokemon.baseSpecies.name !== "Aegislash-Blade-Ma'adowr" && pokemon.hasType("Water")) {
          if (!pokemon.hasType("Steel")) {
            pokemon.addType("Steel");
            this.add("-start", pokemon, "typeadd", "Steel", "[from] Typetracker");
            this.add("-message", `${pokemon.name} gained its Steel type back!`);
          }
        }
      }
    },
    flags: {},
    name: "Chain Link",
    rating: 3,
    num: -6
  },
  // end
  // start
  coupdegrass: {
    desc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
    shortDesc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/2 or less HP.",
    onUpdate(pokemon) {
      const action = this.queue.willMove(pokemon);
      if (!action)
        return;
      const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
      if (!target)
        return;
      if (target.hp <= Math.floor(target.maxhp / 2)) {
        if (action.move.target !== "allAdjacent" && action.move.target !== "all") {
          pokemon.addVolatile("coupdegrass");
        }
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        const action = this.queue.willMove(pokemon);
        if (action) {
          this.add("-ability", pokemon, "Coup de Grass");
          this.add("-message", `${pokemon.name} prepared to move immediately!`);
        }
      },
      onModifyPriority(priority) {
        return priority + 0.1;
      }
    },
    flags: {},
    name: "Coup de Grass",
    rating: 3,
    num: -7
  },
  // end
  // start:
  cultivation: {
    shortDesc: "User and ally recover 1/16 of their HP in terrain.",
    onResidualOrder: 26,
    onResidual(pokemon) {
      if (this.field.isTerrain("electricterrain") || this.field.isTerrain("grassyterrain") || this.field.isTerrain("mistyterrain") || this.field.isTerrain("psychicterrain") || this.field.isTerrain("acidicterrain")) {
        this.heal(pokemon.baseMaxhp / 16);
        const ally = pokemon.side.active.find((ally2) => ally2 && ally2 !== pokemon && !ally2.fainted);
        if (ally) {
          this.heal(ally.baseMaxhp / 16, ally);
        }
      }
    },
    flags: {},
    name: "Cultivation",
    rating: 2,
    num: -8
  },
  // end
  // start
  graviton: {
    shortDesc: "Ally faints: user sets Gravity.",
    onAfterMega(source) {
      if (!source.side.faintedLastTurn)
        return;
      this.field.addPseudoWeather("gravity");
    },
    onStart(source) {
      if (!source.side.faintedThisTurn)
        return;
      this.field.addPseudoWeather("gravity");
    },
    flags: {},
    name: "Graviton",
    rating: 4,
    num: -9
  },
  // end
  // start
  illwind: {
    shortDesc: "Sets Tailwind when user replaces a fainted ally.",
    //onAfterMega(pokemon) {
    //	if (!pokemon.side.faintedLastTurn) return;
    //	this.field.addPseudoWeather('tailwind');
    // },
    onStart(pokemon) {
      if (!pokemon.side.faintedThisTurn)
        return;
      pokemon.side.addSideCondition("tailwind");
    },
    flags: {},
    name: "Ill Wind",
    rating: 5,
    num: -10
  },
  // end
  // start
  inoculum: {
    desc: "Pok\xE9mon on user's side receive 50% less damage from Fire moves and receive halfed Burn damage.",
    shortDesc: "User's side: Heatproof effect.",
    name: "Inoculum",
    onAnyModifyDamage(damage, source, target, effect) {
      if (source && effect && effect.effectType === "Move" && effect.type === "Fire") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Inoculum damage reduction from Fire-type move");
          return this.chainModify(0.5);
        }
      }
    },
    onAnyDamage(damage, target, source, effect) {
      if (effect && effect.id === "brn") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Inoculum damage reduction for burn damage");
          return damage / 2;
        }
      }
    },
    flags: {},
    rating: 2,
    num: -11
  },
  // end
  // start
  interference: {
    shortDesc: "If user gets hurt by a move, inflicts Torment on the attacker.",
    onDamagingHit(damage, target, source, move) {
      source.addVolatile("torment", this.effectState.target);
    },
    flags: {},
    name: "Interference",
    rating: 3,
    num: -12
  },
  // end
  // start: Malware
  malware: {
    desc: "As long as user is on the field, all other Pok\xE9mon are considered poisoned and loose 1/16 of their HP from this status condition.",
    shortDesc: "Considers others poisoned. 1/16 damage.",
    name: "Malware",
    onStart(pokemon) {
      this.add("-ability", pokemon, "Malware");
      this.add("-message", `${pokemon.name}'s Malware is active!`);
      this.effectState.malwareUser = pokemon;
      this.eachEvent("Update");
    },
    onAnyDragOut(pokemon) {
      pokemon.removeVolatile("malwarepoisoned");
    },
    onUpdate(pokemon) {
      if (pokemon === this.effectState.malwareUser) {
        for (const target of this.getAllActive()) {
          if (target !== pokemon && !target.hasType("Poison") && !target.hasType("Steel") && !target.status) {
            if (target.isGrounded() && this.field.isTerrain("mistyterrain")) {
              continue;
            }
            if (target.hasAbility("immunity")) {
              continue;
            }
            if (target.hasAbility("comatose")) {
              continue;
            }
            if (target.side.getSideCondition("safeguard")) {
              continue;
            }
            if (target.hasItem("sunring") && target.baseSpecies.baseSpecies === "Horizonoc") {
              continue;
            }
            const allyPresent = target.side.active.some((ally) => ally && ally !== target && ally.baseSpecies.baseSpecies === "Horizonoc" && ally.hasItem("sunring"));
            if (allyPresent && ["sunnyday", "desolateland"].includes(this.field.effectiveWeather())) {
              continue;
            }
            this.add("-message", `${target.name} is affected by Malware!`);
            target.setStatus("psn", pokemon, null, true);
            target.addVolatile("malwarepoisoned");
          }
        }
      }
    },
    onSwitchOut(pokemon) {
      for (const target of this.getAllActive()) {
        if (target.volatiles["malwarepoisoned"]) {
          target.removeVolatile("malwarepoisoned");
          if (target.status === "psn") {
            target.cureStatus();
          }
          this.add("-message", `${target.name} is cured of Malware poison.`);
        }
      }
    },
    // This method handles when any Pokémon switches out
    onAnySwitchOut(pokemon) {
      if (pokemon.volatiles["malwarepoisoned"]) {
        pokemon.removeVolatile("malwarepoisoned");
        if (pokemon.status === "psn") {
          pokemon.cureStatus();
        }
        this.add("-message", `${pokemon.name} is cured of Malware poison.`);
      }
    },
    onFaint(pokemon) {
      for (const target of this.getAllActive()) {
        if (target.volatiles["malwarepoisoned"]) {
          target.removeVolatile("malwarepoisoned");
          if (target.status === "psn") {
            target.cureStatus();
          }
          this.add("-message", `${target.name} is cured of Malware poison.`);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    rating: 4,
    num: -13
  },
  // end
  // start
  masquerade: {
    desc: `This Pok\xE9mon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pok\xE9mon's attack. Abilities that cannot be copied are "No Ability", As One, Battle Bond, Comatose, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Power of Alchemy, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.`,
    shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles["masquerade"])
        return;
      pokemon.addVolatile("masquerade");
      let i;
      for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
        if (!pokemon.side.pokemon[i])
          continue;
        const additionalBannedAbilities = [
          "noability",
          "caretaker",
          "desertmirage",
          "dittobolic",
          "flowergift",
          "forecast",
          "hugepower",
          "hungerswitch",
          "illusion",
          "imposter",
          "malware",
          "neutralizinggas",
          "poultageist",
          "powerofalchemy",
          "psychout",
          "purepower",
          "receiver",
          "sharedmindset",
          "skyrider",
          "teamup",
          "trace",
          "wonderguard"
        ];
        if (pokemon.side.pokemon[i].fainted || pokemon.side.pokemon[i].getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.side.pokemon[i].ability)) {
          continue;
        }
        break;
      }
      if (!pokemon.side.pokemon[i] || pokemon === pokemon.side.pokemon[i]) {
        this.effectState.gaveUp = true;
        return;
      }
      const masquerade = pokemon.side.pokemon[i];
      this.add("-ability", pokemon, "Masquerade");
      pokemon.setAbility(masquerade.ability);
      this.hint(`${pokemon.name} inherited ${this.dex.abilities.get(pokemon.ability).name} from ${masquerade.name}!`);
      this.add("-ability", pokemon, this.dex.abilities.get(pokemon.ability).name, "[silent]");
    },
    condition: {
      onDamagingHit(damage, target, source, move) {
        this.effectState.busted = true;
      },
      onFaint(pokemon) {
        this.effectState.busted = true;
      },
      onUpdate(pokemon) {
        if (pokemon.hasAbility("masquerade"))
          return;
        if (this.effectState.busted) {
          this.add("-ability", pokemon, "Masquerade");
          this.add("-message", `${pokemon.name}'s Masquerade wore off!`);
          pokemon.setAbility("masquerade");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    name: "Masquerade",
    rating: 3,
    num: -14
  },
  // end
  // start
  permafrost: {
    shortDesc: "Boosts Ice moves by 50% on user's side.",
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      if (move.type === "Ice") {
        this.debug("Permafrost boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Permafrost",
    rating: 3.5,
    num: -15
  },
  // end
  // start
  poisonspit: {
    shortDesc: "Sets Acidic Terrain when hurt.",
    onDamagingHit(damage, target, source, move) {
      this.field.setTerrain("acidicterrain");
    },
    flags: {},
    name: "Poison Spit",
    rating: 2,
    num: -16
  },
  // end
  // start
  reconfiguration: {
    shortDesc: "Boosts user's stat depending on target's best stat.",
    onSwitchIn(pokemon) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon) {
      const foes = pokemon.side.foe.active;
      const target = foes[foes.length - 1 - pokemon.position];
      if (!target)
        return;
      this.boost({ [target.getBestStat(false, true)]: 1 });
    },
    flags: {},
    name: "Reconfiguration",
    rating: 3,
    num: -17
  },
  // end
  // start: 
  rewind: {
    name: "Rewind",
    shortDesc: "Restores items on user's side at or below 50% HP. Chronosensis changes form.",
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    rating: 4,
    num: -18,
    onStart(pokemon) {
      pokemon.addVolatile("rewind");
    },
    onDamage(damage, target, source, effect) {
      const rewindState = target.volatiles["rewind"];
      if (!rewindState || typeof damage !== "number")
        return;
      const hpBefore = target.hp;
      const hpAfter = hpBefore - damage;
      if (rewindState.triggeredThisTurn)
        return;
      if (hpBefore > target.maxhp / 2 && hpAfter <= target.maxhp / 2) {
        rewindState.shouldTrigger = true;
        rewindState.triggeredThisTurn = true;
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon) {
      const rewindState = pokemon.volatiles["rewind"];
      if (rewindState) {
        rewindState.triggeredThisTurn = false;
        if (pokemon.baseSpecies.name === "Chronosensis" && !pokemon.transformed) {
          if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.species.name !== "Chronosensis-Alternate") {
            pokemon.formeChange("Chronosensis-Alternate", this.effect, false, "[msg]");
          } else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.species.name === "Chronosensis-Alternate") {
            pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[msg]");
          }
        }
        if (rewindState.shouldTrigger) {
          rewindState.shouldTrigger = false;
          this.add("-message", `${pokemon.name} has triggered Rewind!`);
          let itemRestored = false;
          if (pokemon.side && Array.isArray(pokemon.side.pokemon)) {
            for (const ally of pokemon.side.pokemon) {
              if (ally && !ally.item) {
                this.actions.useMove("Recycle", ally);
                itemRestored = true;
              }
            }
            if (itemRestored) {
              this.add("-message", `${pokemon.name} rewound time to restore its team's items!`);
            }
          }
        }
      }
    },
    onUpdate(pokemon) {
      const rewindState = pokemon.volatiles["rewind"];
      if (!rewindState || !rewindState.shouldTrigger)
        return;
      rewindState.shouldTrigger = false;
      let itemRestored = false;
      this.add("-ability", pokemon, "Rewind");
      if (pokemon.side && Array.isArray(pokemon.side.pokemon)) {
        for (const ally of pokemon.side.pokemon) {
          if (ally && !ally.item) {
            this.actions.useMove("Recycle", ally);
            itemRestored = true;
          }
        }
        if (itemRestored) {
          this.add("-message", `${pokemon.name} rewound time to restore its team's items!`);
        }
      }
    },
    condition: {
      noCopy: true,
      onStart() {
        this.effectState.shouldTrigger = false;
        this.effectState.triggeredThisTurn = false;
      }
    }
  },
  // end
  // start
  scaleshift: {
    shortDesc: "Copies its partner's first type.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted)
        return;
      let newtype = null;
      for (const ally of pokemon.side.active) {
        if (ally && ally !== pokemon && !ally.fainted && !ally.hasAbility("scaleshift") && ally.types[0] !== pokemon.baseSpecies.types[0] && ally.types[0] !== pokemon.baseSpecies.types[1]) {
          newtype = ally.types[0];
          break;
        }
      }
      if (newtype) {
        const typecombo = [newtype, pokemon.baseSpecies.types[1]];
        if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo))
          return;
        this.add("-ability", pokemon, "Scale Shift");
        this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"));
      }
    },
    onEnd(pokemon) {
      if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types))
        return;
      this.add("-ability", pokemon, "Scale Shift");
      this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"));
    },
    flags: {},
    name: "Scale Shift",
    rating: 3,
    num: -19
  },
  // end
  // start
  solarcore: {
    shortDesc: "During intense sunlight, this Pok\xE9mon can skip the charging turn of its moves.",
    onChargeMove(pokemon, target, move) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        this.debug("Solar Core - remove charge turn for " + move.id);
        this.attrLastMove("[still]");
        this.addMove("-anim", pokemon, move.name, target);
        return false;
      }
    },
    flags: {},
    name: "Solar Core",
    rating: 2,
    num: -20
  },
  // end
  // start
  steelbreaker: {
    shortDesc: "This Pok\xE9mon's attacks are critical hits if the target is a Steel-type Pok\xE9mon.",
    onModifyCritRatio(critRatio, source, target) {
      if (target && target.hasType("Steel"))
        return 5;
    },
    flags: {},
    name: "Steelbreaker",
    rating: 3,
    num: -21
  },
  // end
  // start
  tempestuous: {
    desc: "When replacing a fainted party member, this Pok\xE9mon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
    shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
    onAfterMega(pokemon) {
      if (!pokemon.side.faintedLastTurn)
        return;
      this.boost({ spd: 1 }, pokemon);
      if (!pokemon.volatiles["charge"]) {
        pokemon.addVolatile("charge");
      }
    },
    onStart(pokemon) {
      if (!pokemon.side.faintedThisTurn)
        return;
      this.boost({ spd: 1 }, pokemon);
      if (!pokemon.volatiles["charge"]) {
        pokemon.addVolatile("charge");
      }
    },
    name: "Tempestuous",
    rating: 3,
    num: -22
  },
  // end
  // start
  // thermal expansion
  thermalexpansion: {
    onDamage(damage, target, source, effect) {
      if (!target.hasType("Ice"))
        return;
      if (effect && effect.id === "stealthrock") {
        target.setType(target.getTypes(true).map((type) => type === "Ice" ? "???" : type));
        this.add("-start", target, "typechange", target.getTypes().join("/"));
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (!target.hasType("Ice"))
        return;
      if (move.type === "Rock") {
        this.add("-immune", target, "[from] ability: Thermal Expansion");
        target.setType(target.getTypes(true).map((type) => type === "Ice" ? "???" : type));
        this.add("-start", target, "typechange", target.getTypes().join("/"));
        return null;
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (target.hasType("Ice"))
        return;
      if (!target.addType("Ice"))
        return false;
      if (effect.id === "snow") {
        this.add("-start", target, "typeadd", "Ice", "[from] ability: Thermal Expansion");
      }
    },
    flags: {},
    name: "Thermal Expansion",
    shortDesc: "If user is Ice-type, immunity to Stealth Rock and Rock-type moves. On immunity, lose Ice-type. Regain in Snow or switch.",
    rating: 4,
    num: -23
  },
  // end
  // start
  vampirism: {
    shortDesc: "Replaces target's ability with Vampirism if user made contact.",
    onSourceDamagingHit(damage, target, source, move) {
      const sourceAbility = source.getAbility();
      const targetAbility = target.getAbility();
      if (targetAbility.flags["cantsuppress"] || targetAbility.id === "vampirism") {
        return;
      }
      if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
        const oldAbility = target.setAbility("vampirism", source);
        if (oldAbility) {
          this.add("-activate", target, "ability: Vampirism", this.dex.abilities.get(oldAbility).name, "[of] " + source);
        }
      }
    },
    flags: {},
    name: "Vampirism",
    rating: 3,
    num: -24
  },
  // end
  // start
  woodstove: {
    shortDesc: "Ice does 50% less damage against user's side.",
    onAnyModifyDamage(damage, source, target, effect) {
      if (source && effect && effect.effectType === "Move" && effect.type === "Ice") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Wood Stove damage reduction from Ice-type move");
          return this.chainModify(0.5);
        }
      }
    },
    onUpdate(pokemon) {
      const allies = pokemon.side.active;
      for (const ally of allies) {
        if (ally.status === "frz") {
          this.add("-activate", ally, "ability: Wood Stove");
          ally.cureStatus();
        }
      }
      if (pokemon.status === "frz") {
        this.add("-activate", pokemon, "ability: Wood Stove");
        pokemon.cureStatus();
      }
    },
    onImmunity(type, pokemon) {
      if (type === "frz") {
        const allies = pokemon.side.active;
        for (const ally of allies) {
          if (ally === pokemon || ally.isAlly(pokemon)) {
            this.add("-immune", ally, "ability: Wood Stove");
          }
        }
        return false;
      }
    },
    flags: {},
    name: "Wood Stove",
    rating: 2,
    num: -25
  },
  // end
  // start
  skyrider: {
    shortDesc: "Tag Team: Escavalier and Grapplin.",
    onUpdate(pokemon) {
      const grapplin = pokemon.side.active.find((ally) => ally.species.name === "Grapplin");
      if (!grapplin)
        return;
      if (grapplin && !grapplin.volatiles["skyriding"]) {
        grapplin.addVolatile("skyriding");
      }
      if (pokemon.hasType("Steel")) {
        if (!grapplin.hasType("Steel")) {
          grapplin.addVolatile("skyriderally");
        }
      } else {
        if (grapplin.volatiles["skyriderally"]) {
          grapplin.removeVolatile("skyriderally");
        }
      }
    },
    onFaint(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["skyriderally"]) {
          ally.removeVolatile("skyriderally");
        }
        if (ally && ally.volatiles["skyriding"]) {
          ally.removeVolatile("skyriding");
        }
      });
    },
    onSwitchOut(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["skyriderally"]) {
          ally.removeVolatile("skyriderally");
        }
        if (ally && ally.volatiles["skyriding"]) {
          ally.removeVolatile("skyriding");
        }
      });
    },
    onEnd(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["skyriderally"]) {
          ally.removeVolatile("skyriderally");
        }
        if (ally && ally.volatiles["skyriding"]) {
          ally.removeVolatile("skyriding");
        }
      });
    },
    onPrepareHit(pokemon, target, move) {
      const grapplin = pokemon.side.active.find((ally) => ally.species.name === "Grapplin");
      if (!grapplin)
        return;
      if (move.category !== "Status") {
        for (const action of this.queue.list) {
          if (!action.move || !action.pokemon?.isActive || action.pokemon.fainted || action.maxMove || action.zmove) {
            continue;
          }
          if (action.pokemon.isAlly(pokemon)) {
            this.queue.prioritizeAction(action, move);
            this.add("-waiting", pokemon, action.pokemon);
            break;
          }
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Sky Rider",
    rating: 0,
    num: -26
  },
  // end
  // start: Archetype
  archetype: {
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
    name: "Archetype",
    rating: 4,
    num: -27
  },
  // end
  // start
  parasignal: {
    shortDesc: "Sets Psychic Terrain when hurt.",
    onDamagingHit(damage, target, source, move) {
      this.field.setTerrain("psychicterrain");
    },
    flags: {},
    name: "Parasignal",
    rating: 2,
    num: -28
  },
  // end
  // start
  sharedmindset: {
    desc: "Applies opposite of negative stat changes to ally Mycecroak's opposite stat, and vice versa: (Atk/SpA, Def/SpD).",
    shortDesc: "Atk/SpA & Def/SpD for Mycecroak, and vice versa.",
    onUpdate(pokemon) {
      const partnermycecroak = pokemon.side.active.find((ally) => ally.species.name === "Mycecroak");
      if (!partnermycecroak)
        return;
      if (partnermycecroak) {
        if (!partnermycecroak.volatiles["fungus"]) {
          partnermycecroak.addVolatile("fungus");
        }
        if (!pokemon.volatiles["fungus"]) {
          pokemon.addVolatile("fungus");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Shared Mindset",
    rating: 3,
    num: -30
  },
  // end
  // start
  caretaker: {
    desc: "If there's a Swanneil ally, that Pok\xE9mon can no longer switch out and becomes invulnerable until the Arbarnacle user faints. Arbarnacle has all of its stats boosted by 1 + Ingrain.",
    shortDesc: "Commander effect; reversed; Swanneil.",
    onUpdate(pokemon) {
      if (this.gameType !== "doubles")
        return;
      const ally = pokemon.allies()[0];
      if (!ally || pokemon.baseSpecies.baseSpecies !== "Arbarnacle" || ally.baseSpecies.baseSpecies !== "Swanneil") {
        if (pokemon.getVolatile("caretaking"))
          pokemon.removeVolatile("caretaking");
        if (ally && ally.getVolatile("caretaken"))
          ally.removeVolatile("caretaken");
        return;
      }
      if (!pokemon.getVolatile("caretaking")) {
        if (ally.getVolatile("caretaken"))
          return;
        this.queue.cancelAction(ally);
        this.add("-activate", pokemon, "ability: Caretaker", "[of] " + ally);
        pokemon.addVolatile("caretaking");
        ally.addVolatile("caretaken");
      } else {
        if (!ally.fainted)
          return;
        pokemon.removeVolatile("caretaking");
        ally.removeVolatile("caretaken");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    name: "Caretaker",
    rating: 0,
    num: -31
  },
  // end
  // start, Color Spray, -32
  colorspray: {
    shortDesc: "Changes attacker's type to user's primary type.",
    onDamagingHit(damage, target, source, move) {
      if (!source)
        return;
      const userPrimaryType = target.types[0];
      if (source.setType(userPrimaryType)) {
        this.add("-start", source, "typechange", userPrimaryType, "[from] ability: Color Spray", "[of] " + target);
      }
    },
    name: "Color Spray",
    rating: 2,
    num: -32
  },
  // end
  // start
  counterbalance: {
    desc: "When this Pok\xE9mon's Attack is modified, its Special Attack is modified in the opposite way, and vice versa. The same is true for its Defense and Special Defense.",
    shortDesc: "Applies the opposite of stat changes to the opposite stat (Atk/Sp. Atk, Def/Sp. Def).",
    onAfterBoost(boost, target, source, effect) {
      if (!boost || effect.id === "counterbalance")
        return;
      let activated = false;
      const counterbalanceBoost = {};
      if (boost.spa) {
        counterbalanceBoost.atk = -1 * boost.spa;
        activated = true;
      }
      if (boost.spd) {
        counterbalanceBoost.def = -1 * boost.spd;
        activated = true;
      }
      if (boost.atk) {
        counterbalanceBoost.spa = -1 * boost.atk;
        activated = true;
      }
      if (boost.def) {
        counterbalanceBoost.spd = -1 * boost.def;
        activated = true;
      }
      if (activated === true) {
        this.add("-ability", target, "Counterbalance");
        this.boost(counterbalanceBoost, target, target, null, true);
      }
    },
    name: "Counterbalance",
    rating: 4,
    num: -33
  },
  // end
  // start
  cryptobiosis: {
    desc: "If user's HP is at 50% or below, it receives halfed damage, including indirect damage.",
    shortDesc: "User's HP <= 50%: 1/2 damage reduction.",
    onDamage(damage, target, source, effect) {
      if (target.hp <= target.maxhp / 2) {
        this.debug("Cryptobiosis damage reduction");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Cryptobiosis",
    rating: 3.5,
    num: -34
  },
  // end
  // start
  desertmirage: {
    desc: "Sand: Ground/Flying, Rain: Ground/Water, Sun: Ground/Fire, Snow: Ground/Ice.",
    shortDesc: "Gains additional type in weather.",
    onStart(pokemon) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon);
    },
    onWeatherChange(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Dustform" || pokemon.transformed)
        return;
      let forme = null;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          if (pokemon.species.id !== "dustformsunny")
            forme = "Dustform-Sunny";
          break;
        case "raindance":
        case "primordialsea":
          if (pokemon.species.id !== "dustformrainy")
            forme = "Dustform-Rainy";
          break;
        case "hail":
        case "snow":
          if (pokemon.species.id !== "dustformsnowy")
            forme = "Dustform-Snowy";
          break;
        case "sandstorm":
        case "desertgales":
          if (pokemon.species.id !== "dustformsandy")
            forme = "Dustform-Sandy";
          break;
        default:
          if (pokemon.species.id !== "dustform")
            forme = "Dustform";
          break;
      }
      if (pokemon.isActive && forme) {
        pokemon.formeChange(forme, this.effect, false, "[msg]");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
    name: "Desert Mirage",
    rating: 2,
    num: -35
  },
  // end
  // start
  desertgales: {
    desc: "On switch-in, this Pok\xE9mon summons Desert Gales for 5 turns. During the effect, Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.2; Normal-type moves become Ground-type moves; Weather Ball becomes a Ground-type move, and its base power is 100; and other weather-related moves and Abilities behave as they do in Sandstorm.",
    shortDesc: "5 turns. +Ground/Rock/Steel power, Normal moves become Ground-type.",
    onStart(source) {
      this.field.setWeather("desertgales");
    },
    name: "Desert Gales",
    rating: 4,
    num: -36
  },
  // modded for Desert Gales
  sandforce: {
    inherit: true,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather("sandstorm") || this.field.isWeather("desertgales")) {
        if (move.type === "Rock" || move.type === "Ground" || move.type === "Steel") {
          this.debug("Sand Force boost");
          return this.chainModify([5325, 4096]);
        }
      }
    },
    shortDesc: "This Pok\xE9mon's Ground/Rock/Steel attacks do 1.3x in Sandstorm and Desert Gales; immunity to Sandstorm."
  },
  sandrush: {
    inherit: true,
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather("sandstorm") || this.field.isWeather("desertgales")) {
        return this.chainModify(2);
      }
    },
    shortDesc: "If Sandstorm or Desert Gales is active, this Pok\xE9mon's Speed is doubled; immunity to Sandstorm."
  },
  sandveil: {
    inherit: true,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather("sandstorm") || this.field.isWeather("desertgales")) {
        this.debug("Sand Veil - decreasing accuracy");
        return this.chainModify([3277, 4096]);
      }
    },
    shortDesc: "If Sandstorm or Desert Gales is active, this Pok\xE9mon's evasiveness is 1.25x; immunity to Sandstorm."
  },
  // end
  // start
  dittobolic: {
    shortDesc: "Transforms into ally and faints it. +50% HP.",
    onSwitchIn(pokemon) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon) {
      if (!this.effectState.switchingIn)
        return;
      let target = null;
      for (const ally of pokemon.side.pokemon) {
        if (ally && !ally.fainted && ally !== pokemon) {
          target = ally;
          break;
        }
      }
      if (!target) {
        this.effectState.switchingIn = false;
        return;
      }
      pokemon.transformInto(target, this.dex.abilities.get("dittobolic"));
      this.add("-message", `${pokemon.name} sacrificed and transformed into the ally ${target.name}!`);
      target.faint();
      pokemon.baseMaxhp = Math.floor(pokemon.baseMaxhp * 1.5);
      const newMaxHP = pokemon.volatiles["dynamax"] ? 2 * pokemon.baseMaxhp : pokemon.baseMaxhp;
      const hpPercentage = pokemon.hp / pokemon.maxhp;
      pokemon.hp = Math.floor(newMaxHP * hpPercentage);
      pokemon.maxhp = newMaxHP;
      this.add("-message", `${pokemon.name}'s HP increased by 50%!`);
      this.add("-heal", pokemon, pokemon.getHealth, "[silent]");
      this.effectState.switchingIn = false;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
    name: "Dittobolic",
    rating: 5,
    num: -37
  },
  // end
  // start
  endlessdream: {
    desc: "While this Pokemon is active, every other Pokemon is treated as if it has the Comatose ability. Pokemon that are either affected by Sweet Veil, or have Insomnia or Vital Spirit as their abilities are immune this effect.",
    shortDesc: "All Pokemon are under Comatose effect.",
    onStart(source) {
      this.add("-ability", source, "Endless Dream");
      this.field.addPseudoWeather("endlessdream");
      this.hint("All Pokemon are under Comatose effect!");
    },
    onResidualOrder: 21,
    onResidualSubOrder: 2,
    onEnd(pokemon) {
      this.field.removePseudoWeather("endlessdream");
    },
    name: "Endless Dream",
    rating: 3,
    num: -22
  },
  // end
  // start
  fimbulvetr: {
    desc: "Sets side condition on user's side lasting for 5 turns. Causes 1/8 chip damage in Snow/Hail.",
    shortDesc: "1/8 chip damage in Snow/Hail.",
    onUpdate(pokemon) {
      const weather = this.field.weather;
      if (weather === "hail" || weather === "snow") {
        if (!pokemon.side.foe.getSideCondition("fimbulvetr")) {
          this.add("-message", `${pokemon.name} sets up Fimbulvetr on the opponent's side!`);
          pokemon.side.foe.addSideCondition("fimbulvetr");
        }
      }
    },
    name: "Fimbulvetr",
    rating: 4,
    num: -39
  },
  // end
  // start
  goodwill: {
    desc: "Stops stats from further lowering if they've already been lowered. Type of stat dependent.",
    shortDesc: "Stops further stat lowering.",
    onChangeBoost(boost, target, source, effect) {
      if (!target.volatiles["goodwill"]) {
        target.addVolatile("goodwill");
      }
      const goodwillEffect = target.volatiles["goodwill"];
      for (const stat in boost) {
        if (boost[stat] && boost[stat] < 0) {
          if (target.boosts[stat] < 0) {
            if (!goodwillEffect.affectedStats) {
              goodwillEffect.affectedStats = [];
            }
            if (!goodwillEffect.affectedStats.includes(stat)) {
              goodwillEffect.affectedStats.push(stat);
            }
            boost[stat] = 0;
            this.add("-fail", target, "unboost", stat, "[from] ability: Goodwill");
          }
        }
      }
    },
    onUpdate(pokemon) {
      if (pokemon && pokemon.side && Array.isArray(pokemon.side.active)) {
        for (const ally of pokemon.side.active) {
          if (ally && ally !== pokemon && !ally.fainted && !ally.volatiles["goodwillextension"]) {
            ally.addVolatile("goodwillextension");
          }
        }
      }
      if (!pokemon.volatiles["goodwill"])
        return;
      const goodwillEffect = pokemon.volatiles["goodwill"];
      if (goodwillEffect.affectedStats) {
        goodwillEffect.affectedStats = goodwillEffect.affectedStats.filter(
          (stat) => pokemon.boosts[stat] < 0
        );
        if (goodwillEffect.affectedStats.length === 0) {
          delete goodwillEffect.affectedStats;
        }
      }
    },
    name: "Goodwill",
    rating: 3.5,
    num: -40
  },
  // end
  // start
  cosmicpull: {
    shortDesc: "No Guard, but cannot be suppressed.",
    onAnyInvulnerabilityPriority: 1,
    onAnyInvulnerability(target, source, move) {
      if (move && (source === this.effectState.target || target === this.effectState.target))
        return 0;
    },
    onAnyAccuracy(accuracy, target, source, move) {
      if (move && (source === this.effectState.target || target === this.effectState.target)) {
        return true;
      }
      return accuracy;
    },
    flags: { failskillswap: 1, cantsuppress: 1 },
    name: "Cosmic Pull",
    rating: 4,
    num: -41
  },
  // end
  // start
  lunarparticles: {
    desc: "After any of this Pok\xE9mon's stats is reduced, making contact with a Pok\xE9mon on its team lowers the attacker's Spe. The duration is one turn for each stat stage that was reduced, and the duration is extended if stats are reduced again while it is already in effect.",
    shortDesc: "Stat reduction: contact lowers attacker's Spe.",
    name: "Lunar Particles",
    onTryBoost(boost, target, source, effect) {
      for (const i in boost) {
        if (boost[i] < 0) {
          let num = boost[i];
          while (num !== 0) {
            target.side.addSideCondition("lunarparticles");
            num++;
          }
        }
      }
    },
    condition: {
      duration: 2,
      onStart(side) {
        this.add("-ability", this.effectState.source, "Lunar Particles");
        this.add("-message", `The gravity around ${this.effectState.source.name}'s team increased!`);
        this.hint(`During Lunar Particles, making contact with a Pok\xE9mon on ${this.effectState.source.name}'s team will result in Spe drop!`);
        this.hint(`The effect is extended each time ${this.effectState.source.name}'s stats are lowered!`);
        this.effectState.duration = 2;
      },
      onRestart(side) {
        this.effectState.duration++;
      },
      onHit(target, source, move) {
        if (target.side === this.effectState.target && move.flags["contact"]) {
          this.boost({ spe: -1 }, source);
        }
      },
      onResidualOrder: 10,
      onResidual(side) {
        if (this.effectState.duration > 1) {
          this.add("-message", `There are ${this.effectState.duration} turns left of Lunar Particles!`);
        } else if (this.effectState.duration === 1) {
          this.add("-message", `There is one turn left of Lunar Particles!`);
        }
      },
      onEnd(side) {
        this.add("-message", `The gravity around ${this.effectState.source.name}'s team wore off!`);
      }
    },
    rating: 3.5,
    num: -42
  },
  // end
  // start
  metamorphosis: {
    shortDesc: "Increases best stat in non-acidic terrain.",
    /*onStart(pokemon) {
    	this.effectState.bestStat = pokemon.getBestStat(false, true);
    	this.add('-ability', pokemon, 'Metamorphosis');
    	this.add('-message', `${pokemon.name}'s best stat is ${this.effectState.bestStat}!`);
    },*/
    onStart(pokemon) {
      this.effectState.bestStat = pokemon.getBestStat(false, true);
    },
    onChangeBoost(boost, pokemon) {
      const newBestStat = pokemon.getBestStat(false, true);
      if (this.effectState.bestStat !== newBestStat) {
        this.effectState.bestStat = newBestStat;
        if (["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
          this.add("-ability", pokemon, "Metamorphosis");
          this.add("-start", pokemon, "metamorphosis" + this.effectState.bestStat);
        }
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon) {
      if (this.effectState.bestStat === "atk" && ["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
        this.debug("Metamorphosis atk boost");
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 5,
    onModifyDef(def, pokemon) {
      if (this.effectState.bestStat === "def" && ["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
        this.debug("Metamorphosis def boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
      if (this.effectState.bestStat === "spa" && ["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
        this.debug("Metamorphosis spa boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 5,
    onModifySpD(spd, pokemon) {
      if (this.effectState.bestStat === "spd" && ["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
        this.debug("Metamorphosis spd boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpePriority: 5,
    onModifySpe(spe, pokemon) {
      if (this.effectState.bestStat === "spe" && ["grassyterrain", "electricterrain", "mistyterrain", "psychicterrain"].includes(this.field.terrain)) {
        this.debug("Metamorphosis spe boost");
        return this.chainModify(1.5);
      }
    },
    flags: { breakable: 1 },
    name: "Metamorphosis",
    rating: 3,
    num: -43
  },
  // end
  // start
  myomancy: {
    shortDesc: "Spotlight on entry.",
    // Triggered when the Pokémon with Myomancy switches in
    onSwitchIn(pokemon) {
      const ally = pokemon.side.active.find((ally2) => ally2 && ally2 !== pokemon);
      if (ally) {
        ally.addVolatile("spotlight");
        this.add("-message", `${ally.name} is now in the spotlight!`);
      }
    },
    name: "Myomancy",
    rating: 3,
    num: -44
  },
  // end
  // start
  poisonscatter: {
    shortDesc: "Poisons all others when attacked.",
    onDamagingHit(damage, target, source, move) {
      let activated = false;
      for (const pokemon of this.getAllActive()) {
        if (pokemon === target || pokemon.fainted)
          continue;
        if (!activated) {
          this.add("-ability", target, "Poison Scatter");
          activated = true;
        }
        pokemon.trySetStatus("psn", target);
      }
    },
    flags: {},
    name: "Poison Scatter",
    rating: 2,
    num: -45
  },
  // end
  // start
  poultageist: {
    shortDesc: "Returns by fainting; Wonder Guard; once.",
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (target.baseSpecies.baseSpecies === "Restowl" && target.species.forme !== "Guardian") {
        if (damage >= target.hp) {
          this.add("-activate", target, "ability: Poultageist");
          this.add("-message", `${target.name} survived with 1 HP due to Poultageist!`);
          this.effectState.guardian = true;
          return target.hp - 1;
        }
      }
    },
    onUpdate(pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "Restowl" && this.effectState.guardian) {
        pokemon.formeChange("Restowl-Guardian", this.effect, true);
        pokemon.setAbility("Wonder Guard");
        pokemon.hp = 1;
        pokemon.maxhp = 1;
        this.add("-message", `${pokemon.name} transformed into Restowl-Guardian!`);
        this.add("-ability", pokemon, "Wonder Guard");
      }
    },
    flags: {
      failroleplay: 1,
      noreceiver: 1,
      noentrain: 1,
      notrace: 1,
      failskillswap: 1,
      cantsuppress: 1,
      breakable: 1,
      notransform: 1
    },
    name: "Poultageist",
    rating: 4,
    num: -46
  },
  // end
  // start
  psychout: {
    desc: "If a Pok\xE9mon on user's side would faint from damage, it hangs on. Once per game.",
    shortDesc: "No fainting from damage. Once.",
    onStart(pokemon) {
      if (!this.effectState.hasTriggered) {
        this.effectState.hasTriggered = false;
      }
    },
    onDamage(damage, target, source, move) {
      if (this.effectState.hasTriggered)
        return damage;
      if (damage >= target.hp) {
        this.effectState.hasTriggered = true;
        return target.hp - 1;
      }
      return damage;
    },
    onUpdate(pokemon) {
      const hasNotifierAlly = pokemon.side.active.some(
        (ally2) => ally2 !== pokemon && ally2.hp > 0 && ally2.volatiles["psychoutnotifier"]
      );
      if (hasNotifierAlly) {
        this.effectState.hasTriggered = true;
        return;
      }
      if (this.effectState.hasTriggered) {
        const ally2 = pokemon.side.active.find((ally3) => ally3 !== pokemon && ally3.hp > 0);
        if (ally2 && ally2.volatiles["psychout"]) {
          ally2.removeVolatile("psychout");
        }
        return;
      }
      const ally = pokemon.side.active.find((ally2) => ally2 !== pokemon && ally2.hp > 0);
      if (ally && !ally.volatiles["psychout"] && !this.effectState.hasTriggered) {
        ally.addVolatile("psychout");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    name: "Psych Out",
    rating: 5,
    num: -47
  },
  // end
  // start
  rebel: {
    shortDesc: "User's side: 1.3x damage when any Pok\xE9mon has stat drops.",
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      const hasNegativeDrop = attacker.side.pokemon.some(
        (pokemon) => pokemon.boosts && Object.values(pokemon.boosts).some((stat) => stat < 0)
      );
      if (hasNegativeDrop) {
        this.debug("Rebel boost");
        this.add("-ability", attacker, "Rebel");
        return this.chainModify([5325, 4096]);
      }
    },
    name: "Rebel",
    rating: 2.5,
    num: -48
  },
  // end
  // start
  reekingstench: {
    shortDesc: "Bug-type Storm Drain.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Bug") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Reeking Stench");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Bug" || move.flags["pledgecombo"])
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Reeking Stench");
        }
        return this.effectState.target;
      }
    },
    flags: { breakable: 1 },
    name: "Reeking Stench",
    rating: 3,
    num: -49
  },
  // end
  // start
  residualdrain: {
    desc: "Every time another Pok\xE9mon is damaged indirectly, this Pok\xE9mon's HP is restored by the same amount.",
    shortDesc: "Heals from indirect damage dealt to others.",
    onAnyDamage(damage, target, source, effect) {
      const pokemon = this.effectState.target;
      if (effect.effectType !== "Move" && target !== pokemon && effect.id !== "leechseed") {
        pokemon.heal(damage);
        this.add("-heal", pokemon, pokemon.getHealth, "[silent]");
      }
    },
    name: "Residual Drain",
    rating: 4,
    num: -50
  },
  // end
  // start
  concordia: {
    desc: "When this Pok\xE9mon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
    shortDesc: "Inflicts Torment effect if the Pok\xE9mon uses a Sound move.",
    onAfterMove(source, target, move) {
      if (!move.flags["sound"])
        return;
      const applyTorment = (pokemon) => {
        if (pokemon && !pokemon.hasAbility("soundproof") && !pokemon.volatiles["torment"] && !pokemon.volatiles["stall"]) {
          pokemon.addVolatile("torment");
          this.add("-start", pokemon, "Torment", "[from] ability: Concordia");
        }
      };
      switch (move.target) {
        case "all":
          for (const pokemon of this.getAllActive()) {
            applyTorment(pokemon);
          }
          break;
        case "allAdjacent":
          for (const adjacent of this.getAllActive()) {
            if (adjacent !== source && adjacent.isAdjacent(source)) {
              applyTorment(adjacent);
            }
          }
          break;
        case "allAdjacentFoes":
          for (const foe of source.foes()) {
            if (foe.isAdjacent(source)) {
              applyTorment(foe);
            }
          }
          break;
        case "normal":
          applyTorment(target);
          break;
        case "self":
          applyTorment(source);
          break;
        default:
          console.log(`Unhandled move target: ${move.target}`);
      }
    },
    flags: {},
    name: "Concordia",
    rating: 3,
    num: -51
  },
  // end	
  // start
  solarflare: {
    desc: "After any of this Pok\xE9mon's stats is reduced, making contact with a Pok\xE9mon on its team burns the attacker. The duration is one turn for each stat stage that was reduced, and the duration is extended if stats are reduced again while it is already in effect.",
    shortDesc: "Stat reduction: contact burns attacker.",
    name: "Solar Flare",
    onTryBoost(boost, target, source, effect) {
      for (const i in boost) {
        if (boost[i] < 0) {
          let num = boost[i];
          while (num !== 0) {
            target.side.addSideCondition("solarflare");
            num++;
          }
        }
      }
    },
    condition: {
      duration: 2,
      onStart(side) {
        this.add("-ability", this.effectState.source, "Solar Flare");
        this.add("-message", `The air around ${this.effectState.source.name}'s team was superheated!`);
        this.hint(`During Solar Flare, making contact with a Pok\xE9mon on ${this.effectState.source.name}'s team will result in a burn!`);
        this.hint(`The effect is extended each time ${this.effectState.source.name}'s stats are lowered!`);
        this.effectState.duration = 2;
      },
      onRestart(side) {
        this.effectState.duration++;
      },
      onHit(target, source, move) {
        if (target.side === this.effectState.target && move.flags["contact"]) {
          source.trySetStatus("brn", target);
        }
      },
      onResidualOrder: 10,
      onResidual(side) {
        if (this.effectState.duration > 1) {
          this.add("-message", `There are ${this.effectState.duration} turns left of Solar Flare!`);
        } else if (this.effectState.duration === 1) {
          this.add("-message", `There is one turn left of Solar Flare!`);
        }
      },
      onEnd(side) {
        this.add("-message", `The air around ${this.effectState.source.name}'s team cooled down!`);
      }
    },
    rating: 3.5,
    num: -52
  },
  // end
  // start, Star Force, -53
  starforce: {
    desc: "If Gravity is active and user must recharge, gains +1 on every stat.",
    shortDesc: "Gravity + recharge: stat boosts.",
    /*onChargeMove(pokemon, target, move) {
    	if (!pokemon.volatiles['starforcecooldown']) {
    		this.debug('Star Force - remove charge turn for ' + move.id);
    		this.attrLastMove('[still]');
    		this.addMove('-anim', pokemon, move.name, target);
    		// Mark as activated and skip charge turn
    		if (!pokemon.volatiles['starforcecooldown']) {
    			pokemon.addVolatile('starforcecooldown');
    			this.add('-message', `${pokemon.name}'s Star Force is now on cooldown!`);
    		}
    		return false; // skip charge turn
    	}
    },
    onAfterMove(source, target, move) {
    	if (move.flags.recharge) {
    		// Skip the recharge turn by removing the "mustRecharge" volatile
    		if (!source.volatiles['starforcecooldown2']) {
    			source.addVolatile('starforcecooldown2');
    		//	this.add('-end', source, 'mustRecharge', '[from] ability: Star Force');
    		}
    		this.add('-message', `${source.name}'s Star Force is now on cooldown!`);
    	}
    },*/
    /*onAfterMoveSecondarySelf(pokemon, target, move) {
    	// Check if Gravity is active and if the move requires recharge
    	if (this.field.getPseudoWeather('gravity') && move.flags.recharge) {
    		// Find the best stat to lower
    		const bestStat = pokemon.getBestStat();
    		if (bestStat) {
    			this.boost({ [bestStat]: -1 }, pokemon); // Lower the best stat by 1 stage
    			pokemon.removeVolatile('mustrecharge');
    			this.add('-end', pokemon, 'mustrecharge', '[from] ability: Star Force', '[of] ' + pokemon);
    		}
    	}
    },*/
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (this.field.getPseudoWeather("gravity") && pokemon.volatiles["mustrecharge"]) {
        this.boost({ atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }, pokemon);
      }
    },
    flags: {},
    name: "Star Force",
    rating: 4,
    num: -53
  },
  // end
  // start
  teamup: {
    desc: "If ally attacks first, user attacks immediately afterwards.",
    shortDesc: "Attacks after ally.",
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Team Up",
    rating: 3,
    num: -54,
    onUpdate(pokemon) {
      const hasAlly = pokemon.side.active.find((ally) => ally && ally !== pokemon);
      if (!hasAlly)
        return;
      if (hasAlly && !hasAlly.volatiles["headstart"]) {
        hasAlly.addVolatile("headstart");
      }
    },
    onFaint(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["headstart"]) {
          ally.removeVolatile("headstart");
        }
      });
    },
    onSwitchOut(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["headstart"]) {
          ally.removeVolatile("headstart");
        }
      });
    },
    onEnd(pokemon) {
      pokemon.side.active.forEach((ally) => {
        if (ally && ally.volatiles["headstart"]) {
          ally.removeVolatile("headstart");
        }
      });
    }
    /*onPrepareHit(pokemon, target, move) {
    			// Check if the user has any ally
    			const hasAlly = pokemon.side.active.some(ally => ally !== pokemon && !ally.fainted);
    			if (!hasAlly) return; // Ensure there is at least one ally present
    
    			// Check if the move is not a status move
    			if (move.category !== 'Status') {
    				// Loop through the action queue
    				for (const action of this.queue.list as MoveAction[]) {
    					// Check if the action is valid
    					if (
    						!action.move || !action.pokemon?.isActive ||
    						action.pokemon.fainted || action.maxMove || action.zmove
    					) {
    						continue; // Skip invalid actions
    					}
    		
    					// Check if the action belongs specifically to the ally
    					if (action.pokemon.isAlly(pokemon)) {
    						this.queue.prioritizeAction(action, move); // Prioritize the action
    						this.add('-waiting', pokemon, action.pokemon); // Notify that ally is waiting
    						break; // Exit the loop but not the function, meaning user's move should be able to do damage now
    					}
    				}
    			}
    		},*/
  },
  // end
  // start
  transmutation: {
    desc: "At the end of the turn, if Acidic Terrain is active, boosts user's worst stat by 1 stage.",
    shortDesc: "Boosts worst stat in Acidic Terrain every turn.",
    onResidualOrder: 10,
    // Ensure this runs after most other effects
    onResidual(pokemon) {
      if (this.field.isTerrain("acidicterrain")) {
        const stats = ["atk", "def", "spa", "spd", "spe"];
        const statValues = stats.map((stat) => pokemon.getStat(stat));
        const minValue = Math.min(...statValues);
        let worstStat = null;
        for (const stat of stats) {
          if (pokemon.getStat(stat) === minValue) {
            worstStat = stat;
            break;
          }
        }
        if (worstStat) {
          this.boost({ [worstStat]: 1 }, pokemon);
        }
      }
    },
    flags: {},
    name: "Transmutation",
    rating: 5,
    num: -55
  },
  // end
  // start
  tropicalbreeze: {
    desc: "Sets Tailwind in Sun or Desolate Land.",
    shortDesc: "Tailwind in Sun.",
    onSwitchIn(pokemon) {
      if ((this.field.isWeather("sunnyday") || this.field.isWeather("desolateland")) && !pokemon.side.sideConditions["tailwind"]) {
        pokemon.side.addSideCondition("tailwind");
      }
    },
    flags: {},
    name: "Tropical Breeze",
    rating: 5,
    num: -56
  },
  // end
  // start
  iceage: {
    desc: "On switch-in, the weather becomes Hail. This weather remains in effect until this Ability is no longer active for any Pok\xE9mon, or the weather is changed by Delta Stream, Desolate Land or Primordial Sea.",
    shortDesc: "On switch-in, hail begins until this Ability is not active in battle.",
    /*onStart(source) {
    	if (this.field.setWeather('hail')) {
    		this.add('-message', `${source.name} created an unrelenting snow storm!`);
    		this.hint("Ice Age doesn't wear off until the user leaves the field!");
    		this.field.weatherState.duration = 0;
    	} else if (this.field.isWeather('hail') && this.field.weatherState.duration !== 0) {
    		this.add('-ability', source, 'Ice Age');
    		this.add('-message', `${source.name} created an unrelenting snow storm!`);
    		this.hint("Ice Age doesn't wear off until the user leaves the field!");
    		this.field.weatherState.source = source;
    		this.field.weatherState.duration = 0;
    	}
    },
    onAnySetWeather(target, source, weather) {
    	if (source.hasAbility('iceage') && weather.id === 'hail') return;
    	const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
    	if (this.field.getWeather().id === 'hail' && !strongWeathers.includes(weather.id)) return false;
    },
    onEnd(pokemon) {
    	if (this.field.weatherState.source !== pokemon) return;
    	for (const target of this.getAllActive()) {
    		if (target === pokemon) continue;
    		if (target.hasAbility('iceage')) {
    			this.field.weatherState.source = target;
    			return;
    		}
    	}
    	this.field.clearWeather();
    },*/
    onStart(source) {
      this.field.setWeather("hail");
    },
    name: "Ice Age",
    rating: 4.5,
    num: -57
  },
  /*// modded for Everlasting Winter
  deltastream: {
  	inherit: true,
  	onAnySetWeather(target, source, weather) {
  		if (source.hasAbility('iceage') && weather.id === 'hail') return;
  		const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
  		if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
  	},
  },
  desolateland: {
  	inherit: true,
  	onAnySetWeather(target, source, weather) {
  		if (source.hasAbility('iceage') && weather.id === 'hail') return;
  		const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
  		if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
  	},
  },
  primordialsea: {
  	inherit: true,
  	onAnySetWeather(target, source, weather) {
  		if (source.hasAbility('iceage') && weather.id === 'hail') return;
  		const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
  		if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
  	},
  },
  // end*/
  // start
  witheringglare: {
    onAnyTryMove(source, target, move) {
      if (source === this.effectState.target)
        return;
      if (move.id === "batonpass", move.id === "uturn" || move.id === "voltswitch" || move.id === "teleport" || move.id === "partingshot" || move.id === "chillyreception" || move.id === "thunderousroar" || move.id === "unicorndance") {
        this.add("-fail", source, "ability: Withering Glare", "[of] " + this.effectState.target);
        this.add("-ability", target, "Withering Glare");
        return false;
      }
    },
    name: "Withering Glare",
    shortDesc: "While active, Pokemon without this ability cannot pivot out.",
    rating: 3,
    num: -57
  },
  // end
  // start
  fendente: {
    shortDesc: "User's HP: +1 prio / +1 Def / +50%.",
    onModifyPriority(priority, pokemon, target, move) {
      if (move.flags["slicing"] && pokemon.hp === pokemon.maxhp)
        return priority + 1;
    },
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (source.hp === source.maxhp || source.hp <= source.maxhp / 3)
        return;
      if (move.flags["slicing"]) {
        this.boost({ def: 1 }, source);
      }
    },
    onSourceAfterSubDamage(damage, target, source, move) {
      if (!move || !target)
        return;
      if (source.hp === source.maxhp || source.hp <= source.maxhp / 3)
        return;
      if (move.flags["slicing"]) {
        this.boost({ def: 1 }, source);
      }
    },
    onModifyCritRatio(critRatio, source, target, move) {
      if (move.flags["slicing"] && source.hp <= source.maxhp / 3)
        return 5;
    },
    name: "Fendente",
    rating: 3,
    num: -58
  },
  curseenergy: {
    shortDesc: "Absorbs ally's negative stats.",
    onStart(pokemon) {
      this.add("-ability", pokemon, "Curse Energy");
    },
    /*onUpdate(pokemon) {
    			// Check if the user has an ally
    			const ally = pokemon.side.active.find(ally => ally && ally !== pokemon);
    			if (!ally) return; // No ally to absorb from
    	
    			// Check for negative stat boosts on the ally
    			const stats = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'] as const;
    			let boostGains: Partial<Record<typeof stats[number], number>> = {};
    			
    			for (const stat of stats) {
    				if (ally.boosts[stat] < 0) {
    
    					// Calculate how much can be absorbed
    					const canAbsorb = -ally.boosts[stat]; // The absolute value of the negative boost
    					
    					// Remove negative boost from ally
    					ally.boosts[stat] += canAbsorb; // This effectively increases the ally's stat (less negative)
    					
    					// Apply the negative boost to the user
    					boostGains[stat] = (boostGains[stat] || 0) - canAbsorb; // User gains a negative boost
    				}
    			}
    	
    			// Apply the absorbed boosts to the user
    			if (Object.keys(boostGains).length > 0) {
    				this.boost(boostGains, pokemon, pokemon); // Apply negative boosts to the user
    				this.add('-message', `${pokemon.name} absorbs negative boosts from ${ally.name}!`);
    			}
    		},*/
    // version below is almost perfect. At the moment, it always takes away regardless of user's stats
    /*onUpdate(pokemon) {
    			console.log(`Curse Energy onUpdate triggered for ${pokemon.name}`);
    			
    			const allies = pokemon.side.active.filter(ally => ally && ally !== pokemon);
    			if (allies.length === 0) {
    				console.log('No allies found');
    				return;
    			}
    	
    			const stats = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'] as const;
    			let boostGains: Partial<Record<typeof stats[number], number>> = {};
    			let absorbed = false;
    
    
    			// New line: Additional check if any ally has negative boosts to stop internally triggering the ability
    			const hasNegativeBoosts = allies.some(ally => 
    				stats.some(stat => ally.boosts[stat] < 0)
    			);
    		
    			if (!hasNegativeBoosts) {
    				console.log('No negative boosts found among allies, skipping absorption.');
    				return; // Exit early if no negative boosts are present
    			}
    			// end
    
    	
    			for (const ally of allies) {
    				console.log(`Checking ally: ${ally.name}`);
    				console.log(`Ally's current boosts:`, ally.boosts);
    	
    				for (const stat of stats) {
    					if (ally.boosts[stat] < 0) {
    						const canAbsorb = Math.min(-ally.boosts[stat], 6);  // Changed this line
    						
    						if (canAbsorb > 0) {
    							ally.boosts[stat] += canAbsorb;
    							boostGains[stat] = (boostGains[stat] || 0) - canAbsorb;
    							absorbed = true;
    							console.log(`Absorbed ${canAbsorb} from ${stat} of ${ally.name}`);
    
    
    							// Add visual update for the ally's stat change
    							this.add('-setboost', ally, stat, ally.boosts[stat]);
    
    
    						}
    					}
    				}
    			}
    	
    			if (absorbed) {
    				console.log('Applying absorbed boosts:', boostGains);
    				this.boost(boostGains, pokemon, pokemon);
    				this.add('-message', `${pokemon.name} absorbs negative boosts from its ally!`);
    			} else {
    				console.log('No boosts absorbed');
    			}
    		},*/
    // This version below seems to actually work... finally.
    onUpdate(pokemon) {
      const allies = pokemon.side.active.filter((ally) => ally && ally !== pokemon);
      if (allies.length === 0) {
        return;
      }
      const stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
      let boostGains = {};
      let absorbed = false;
      for (const ally of allies) {
        for (const stat of stats) {
          if (ally.boosts[stat] < 0 && pokemon.boosts[stat] > -6) {
            const canAbsorb = Math.min(-ally.boosts[stat], 6);
            if (canAbsorb > 0) {
              ally.boosts[stat] += canAbsorb;
              boostGains[stat] = (boostGains[stat] || 0) - canAbsorb;
              absorbed = true;
              this.add("-setboost", ally, stat, ally.boosts[stat]);
            }
          }
        }
      }
      if (absorbed) {
        this.boost(boostGains, pokemon, pokemon);
        this.add("-message", `${pokemon.name} absorbs negative boosts from its ally!`);
      }
    },
    name: "Curse Energy",
    rating: 4,
    num: -59
  },
  splitsystem: {
    shortDesc: "Old gen phys/spec split. +20% boost.",
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
          this.add("-message", `Split System boosted ${move.name}'s power!`);
        }
      }
    },
    name: "Split System",
    rating: 2,
    num: -60
  },
  //
  fortify: {
    shortDesc: "Recovers item for ally. Once for each ally.",
    onUpdate(pokemon) {
      for (const ally of pokemon.side.pokemon) {
        if (ally && !ally.item && !ally.volatiles["fortifyactivated"]) {
          const success = this.actions.useMove("Recycle", ally);
          if (success) {
            ally.addVolatile("fortifyactivated");
            this.add("-message", `${ally.name}'s item was recovered by ${pokemon.name}'s Fortify!`);
            this.add("-anim", pokemon, "Aromatherapy");
          }
        }
      }
    },
    flags: {},
    name: "Fortify",
    rating: 3.5,
    num: -61
  },
  //
  soothinggift: {
    desc: "On switch-in, if the user's ally doesn't have max HP, the user gives away HP to heal the ally. The user cannot faint from this effect. The ally gains 50% of the HP the user gives away, rounded up.",
    shortDesc: "On switch-in: ally recovers half of user's HP.",
    onStart(pokemon) {
      if (pokemon.side.active.length === 1) {
        return;
      }
      const ally = pokemon.side.active.find((mon) => mon && mon !== pokemon && !mon.fainted);
      if (!ally || ally.hp === ally.maxhp) {
        return;
      }
      const userCurrentHP = pokemon.hp;
      const allyMissingHP = ally.maxhp - ally.hp;
      let hpToGive = Math.min(userCurrentHP - 1, allyMissingHP * 2);
      const hpToReceive = Math.ceil(hpToGive / 2);
      if (hpToGive >= 1) {
        this.directDamage(hpToGive, pokemon);
        ally.heal(hpToReceive);
        this.add("-message", `${pokemon.name} gave away ${hpToGive} HP to heal its ally!`);
        this.add("-message", `${ally.name} recovered ${hpToReceive} HP!`);
        this.add("-heal", ally, ally.getHealth, "[silent]");
      } else {
        this.add("-message", `${pokemon.name} couldn't give any HP to heal its ally.`);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    name: "Soothing Gift",
    rating: 5,
    num: -62
  },
  //
  gforce: {
    desc: "On switch-in, user sets Gravity. This remains in effect until user is no longer active.",
    shortDesc: "Perma Gravity if user active.",
    onStart(source) {
      if (this.field.getPseudoWeather("gravity")) {
        this.add("-ability", source, "G-Force");
        this.add("-message", `${source.name} twisted the dimensions!`);
        this.hint("G-Force doesn't wear off until the user leaves the field!");
        this.field.pseudoWeather.gravity.source = source;
        this.field.pseudoWeather.gravity.duration = 0;
      } else {
        this.add("-ability", source, "G-Force");
        this.field.addPseudoWeather("gravity");
        this.hint("G-Force doesn't wear off until the user leaves the field!");
        this.field.pseudoWeather.gravity.duration = 0;
      }
    },
    onAnyTryMove(target, source, move) {
      if (["gravity"].includes(move.id)) {
        this.attrLastMove("[still]");
        this.add("cant", this.effectState.target, "ability: G-Force", move, "[of] " + target);
        return false;
      }
    },
    onEnd(pokemon) {
      for (const target of this.getAllActive()) {
        if (target === pokemon)
          continue;
        if (target.hasAbility("gforce")) {
          return;
        }
      }
      this.field.removePseudoWeather("gravity");
    },
    name: "G-Force",
    rating: 4.5,
    num: -63
  },
  //
  coordination: {
    shortDesc: "Boosts Bug moves by 50% on user's side.",
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      if (move.type === "Bug") {
        this.debug("Coordination boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Coordination",
    rating: 3.5,
    num: -64
  },
  //
  gravitationalpull: {
    desc: "This Pok\xE9mon is immune to all entry hazards and incorporates them into its body. Pok\xE9mon making contact with this Pok\xE9mon are affected by all of the hazards on both sides of the field, in the same way as if they had switched in.",
    shortDesc: "Hazard immunity. Attacked = hazard effect.",
    name: "Gravitational Pull",
    onStart(pokemon) {
      for (const active of this.getAllActive()) {
        if (active.volatiles["gravitationalpull"]) {
          active.removeVolatile("gravitationalpull");
        }
      }
      pokemon.addVolatile("gravitationalpull");
    },
    onUpdate(pokemon) {
      if (pokemon.volatiles["gravitationalpull"])
        return;
      for (const active of this.getAllActive()) {
        if (active.volatiles["gravitationalpull"]) {
          return;
        }
      }
      pokemon.addVolatile("gravitationalpull");
    },
    onEnd(pokemon) {
      if (pokemon.volatiles["gravitationalpull"]) {
        pokemon.removeVolatile("gravitationalpull");
        for (const active of this.getAllActive()) {
          if (active.hasAbility("gravitationalpull") && active !== pokemon) {
            active.addVolatile("gravitationalpull");
            return;
          }
        }
        const hazards = [
          "spikes",
          "toxicspikes",
          "stealthrock",
          "stickyweb",
          "gmaxsteelsurge"
        ];
        for (const sideCondition of hazards) {
          if (pokemon.side.getSideCondition(sideCondition) || pokemon.side.foe.getSideCondition(sideCondition)) {
            this.add("-message", `The hazards on the field returned to their original positions!`);
            return;
          }
        }
      }
    },
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "ability: Gravitational Pull");
        const hazards = [
          "spikes",
          "toxicspikes",
          "stealthrock",
          "stickyweb",
          "gmaxsteelsurge"
        ];
        for (const sideCondition of hazards) {
          if (pokemon.side.getSideCondition(sideCondition) || pokemon.side.foe.getSideCondition(sideCondition)) {
            this.add("-message", `The hazards on the field are surrounding ${pokemon.name}!`);
            return;
          }
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "ability: Gravitational Pull", "[silent]");
      },
      onDamagingHitOrder: 1,
      onDamagingHit(damage, target, source, move) {
        let success = void 0;
        if (target.side.getSideCondition("spikes") || target.side.foe.getSideCondition("spikes")) {
          if (!success) {
            success = true;
            this.add("-ability", target, "Gravitational Pull");
          }
          let layers = 0;
          if (target.side.sideConditions["spikes"]) {
            layers += target.side.sideConditions["spikes"].layers;
          }
          if (target.side.foe.sideConditions["spikes"]) {
            layers += target.side.foe.sideConditions["spikes"].layers;
          }
          const damageAmounts = [0, 3, 4, 6, 6, 6, 6];
          this.damage(damageAmounts[layers] * source.maxhp / 24, source, target);
        }
        if (target.side.getSideCondition("toxicspikes") || target.side.foe.getSideCondition("toxicspikes")) {
          if (!success) {
            success = true;
            this.add("-ability", target, "Gravitational Pull");
          }
          let layers = 0;
          if (target.side.sideConditions["toxicspikes"]) {
            layers += target.side.sideConditions["toxicspikes"].layers;
          }
          if (target.side.foe.sideConditions["toxicspikes"]) {
            layers += target.side.foe.sideConditions["toxicspikes"].layers;
          }
          if (layers >= 2) {
            source.trySetStatus("tox", target);
          } else {
            source.trySetStatus("psn", target);
          }
        }
        if (target.side.getSideCondition("stealthrock") || target.side.foe.getSideCondition("stealthrock")) {
          if (!success) {
            success = true;
            this.add("-ability", target, "Gravitational Pull");
          }
          const typeMod = this.clampIntRange(source.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
          this.damage(source.maxhp * Math.pow(2, typeMod) / 8, source, target);
        }
        if (target.side.getSideCondition("stickyweb") || target.side.foe.getSideCondition("stickyweb")) {
          if (!success) {
            success = true;
            this.add("-ability", target, "Gravitational Pull");
          }
          this.add("-activate", source, "move: Sticky Web");
          this.boost({ spe: -1 }, source, target, this.dex.getActiveMove("stickyweb"));
        }
        if (target.side.getSideCondition("gmaxsteelsurge") || target.side.foe.getSideCondition("gmaxsteelsurge")) {
          if (!success) {
            success = true;
            this.add("-ability", target, "Gravitational Pull");
          }
          const steelHazard = this.dex.getActiveMove("Stealth Rock");
          steelHazard.type = "Steel";
          const typeMod = this.clampIntRange(source.runEffectiveness(steelHazard), -6, 6);
          this.damage(source.maxhp * Math.pow(2, typeMod) / 8, source, target);
        }
      }
      //	},
    },
    //	hazardImmune: true,
    rating: 3,
    num: -65
  },
  burningtrain: {
    shortDesc: "Sets Sea of Fire after fainting target.",
    onAfterMove(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        target.side.addSideCondition("firepledge");
    },
    flags: {},
    name: "Burning Train",
    rating: 4,
    num: -66
  },
  //
  gooeyessence: {
    shortDesc: "User's side: 1/16 recovery per stat drop.",
    onResidualOrder: 10,
    onResidual(pokemon) {
      if (pokemon && pokemon.boosts) {
        let negativeBoosts = 0;
        const boostKeys = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (const stat of boostKeys) {
          if (pokemon.boosts[stat] < 0) {
            negativeBoosts += Math.abs(pokemon.boosts[stat]);
          }
        }
        if (negativeBoosts > 0) {
          let healAmount = Math.floor(pokemon.maxhp / 16 * negativeBoosts);
          healAmount = Math.min(healAmount, Math.floor(pokemon.maxhp / 8));
          this.heal(healAmount, pokemon);
        }
        const ally = pokemon.side.active.find((ally2) => ally2 && ally2 !== pokemon && !ally2.fainted);
        if (ally) {
          let allyNegativeBoosts = 0;
          for (const stat of boostKeys) {
            if (ally.boosts[stat] < 0) {
              allyNegativeBoosts += Math.abs(ally.boosts[stat]);
            }
          }
          if (allyNegativeBoosts > 0) {
            let allyHealAmount = Math.floor(ally.maxhp / 16 * allyNegativeBoosts);
            allyHealAmount = Math.min(allyHealAmount, Math.floor(ally.maxhp / 8));
            this.heal(allyHealAmount, ally);
          }
        }
      }
    },
    flags: {},
    name: "Gooey Essence",
    rating: 3.5,
    num: -67
  },
  // end
  // start: modifying vanilla abilities
  leafguard: {
    onSetStatus(status, target, source, effect) {
      if (["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Leaf Guard");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Leaf Guard");
        return null;
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isWeather("sunnyday") || this.field.isWeather("desolateland")) {
        return this.chainModify(1.5);
      }
    },
    flags: { breakable: 1 },
    name: "Leaf Guard",
    rating: 0.5,
    num: 102
  },
  magmaarmor: {
    onUpdate(pokemon) {
      if (pokemon.status === "frz") {
        this.add("-activate", pokemon, "ability: Magma Armor");
        pokemon.cureStatus();
      }
    },
    onImmunity(type, pokemon) {
      if (type === "frz")
        return false;
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Ice") {
        this.debug("Magma Armor damage reduction from Ice-type move");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Magma Armor",
    rating: 0.5,
    num: 40
  },
  pixilate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "colourmegone",
        "judgment",
        "multiattack",
        "naturalgift",
        "pincerattack",
        "revelationdance",
        "schadenfreude",
        "seasonalantlers",
        "stellarfission",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Fairy";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Pixilate",
    rating: 4,
    num: 182
  },
  refrigerate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "colourmegone",
        "judgment",
        "multiattack",
        "naturalgift",
        "pincerattack",
        "revelationdance",
        "schadenfreude",
        "seasonalantlers",
        "stellarfission",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Ice";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Refrigerate",
    rating: 4,
    num: 174
  },
  aerilate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "colourmegone",
        "judgment",
        "multiattack",
        "naturalgift",
        "pincerattack",
        "revelationdance",
        "schadenfreude",
        "seasonalantlers",
        "stellarfission",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Flying";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Aerilate",
    rating: 4,
    num: 184
  },
  rivalry: {
    onBasePowerPriority: 24,
    onBasePower(basePower, attacker, defender, move) {
      const ally = attacker.side.active.find((pokemon) => pokemon && pokemon !== attacker);
      if (ally && attacker.gender && ally.gender) {
        if (attacker.gender === ally.gender) {
          this.debug("Rivalry boost");
          return this.chainModify(1.25);
        }
      }
    },
    flags: {},
    name: "Rivalry",
    rating: 0,
    num: 79
  },
  flowergift: {
    onStart(pokemon) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon);
    },
    onWeatherChange(pokemon) {
      if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== "Cherrim" || pokemon.transformed)
        return;
      if (!pokemon.hp)
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        if (pokemon.species.id !== "cherrimsunshine") {
          pokemon.formeChange("Cherrim-Sunshine", this.effect, false, "[msg]");
        }
      } else {
        if (pokemon.species.id === "cherrimsunshine") {
          pokemon.formeChange("Cherrim", this.effect, false, "[msg]");
        }
      }
    },
    onAllyModifyAtkPriority: 3,
    onAllyModifyAtk(atk, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim" && this.effectState.target.baseSpecies.baseSpecies !== "Hieroturoc")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onAllyModifySpDPriority: 4,
    onAllyModifySpD(spd, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim" && this.effectState.target.baseSpecies.baseSpecies !== "Hieroturoc")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 },
    name: "Flower Gift",
    rating: 1,
    num: 122
  },
  stancechange: {
    onModifyMovePriority: 1,
    onModifyMove(move, attacker, defender) {
      if (!attacker.species.name.startsWith("Aegislash") && !attacker.species.name.startsWith("Light") || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      if (attacker.species.name === "Aegislash" || attacker.species.name === "Aegislash-Blade") {
        const targetForme = move.id === "kingsshield" ? "Aegislash" : "Aegislash-Blade";
        if (attacker.species.name !== targetForme)
          attacker.formeChange(targetForme);
      } else if (attacker.species.name === "Aegislash-Light" || attacker.species.name === "Aegislash-Blade-Light") {
        const targetForme = move.id === "kingsshield" ? "Aegislash-Light" : "Aegislash-Blade-Light";
        if (attacker.species.name !== targetForme)
          attacker.formeChange(targetForme);
        this.add("-message", `${attacker.name} changed to ${move.id === "kingsshield" ? "Shield Forme" : "Blade Forme"}!`);
        this.add("-start", attacker, "typechange", attacker.getTypes(true).join("/"), "[silent]");
        if (!this.effectState.busted) {
          const species = this.dex.species.get(attacker.species.name);
          const abilities = species.abilities;
          const baseStats = species.baseStats;
          const type = species.types[0];
          if (species.types[1]) {
            const type2 = species.types[1];
            this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
          } else {
            this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
          }
          this.effectState.busted = true;
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Stance Change",
    rating: 4,
    num: 176
  },
  zenmode: {
    onResidualOrder: 29,
    onResidual(pokemon) {
      const baseSpecies = pokemon.baseSpecies.baseSpecies;
      const forme = pokemon.species.forme;
      if (!["Darmanitan", "Immanicus"].includes(baseSpecies) || pokemon.transformed) {
        return;
      }
      if (pokemon.hp <= pokemon.maxhp / 2 && !["Zen", "Galar-Zen"].includes(forme)) {
        pokemon.addVolatile("zenmode");
      } else if (pokemon.hp > pokemon.maxhp / 2 && ["Zen", "Galar-Zen"].includes(forme)) {
        pokemon.addVolatile("zenmode");
        pokemon.removeVolatile("zenmode");
      }
    },
    onEnd(pokemon) {
      if (!pokemon.volatiles["zenmode"] || !pokemon.hp)
        return;
      pokemon.transformed = false;
      delete pokemon.volatiles["zenmode"];
      if (["Darmanitan", "Immanicus"].includes(pokemon.species.baseSpecies) && pokemon.species.battleOnly) {
        pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon) {
        const speciesId = pokemon.species.id;
        if (!pokemon.species.name.includes("Galar")) {
          if (speciesId === "darmanitanzen" || speciesId === "immanicuszen")
            return;
          if (speciesId === "darmanitan")
            pokemon.formeChange("Darmanitan-Zen");
          if (speciesId === "immanicus")
            pokemon.formeChange("Immanicus-Zen");
        } else {
          if (speciesId !== "darmanitangalarzen")
            pokemon.formeChange("Darmanitan-Galar-Zen");
        }
      },
      onEnd(pokemon) {
        if (["Zen", "Galar-Zen"].includes(pokemon.species.forme)) {
          pokemon.formeChange(pokemon.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Zen Mode",
    rating: 0,
    num: 161
  },
  runaway: {
    inherit: true,
    onTrapPokemonPriority: -10,
    onTrapPokemon(pokemon) {
      pokemon.trapped = pokemon.maybeTrapped = false;
    },
    shortDesc: "Cannot be trapped.",
    flags: {},
    name: "Run Away",
    rating: 0,
    num: 50
  },
  contrary: {
    /*onChangeBoost(boost, target, source, effect) {
    	if ((effect && effect.id === 'zpower')) return;
    	let i: BoostID;
    	for (i in boost) {
    		if (!target.volatiles['sentinoyle']) {
    			// Normal Contrary effect when Sentinoyle is not present
    			boost[i]! *= -1;
    		} else {
    			// When Sentinoyle is present
    			if (boost[i]! < 0) {
    				// Prevent stat decreases
    				this.add('-fail', target, 'boost', '[from] volatile: Sentinoylium Effect'); // originally: unboost
    				boost[i] = 0;
    			} else if (boost[i]! > 0) {
    				// Allow stat increases to be reversed to decreases
    				boost[i]! *= -1;
    			}
    		}
    	}
    },*/
    onChangeBoost(boost, target, source, effect) {
      if (effect && effect.id === "zpower")
        return;
      const hasSentinoyle = target.volatiles["sentinoyle"];
      const hasLZStartersystem = target.volatiles["lzstartersystem"];
      let i;
      for (i in boost) {
        if (hasSentinoyle && !hasLZStartersystem) {
          if (boost[i] < 0) {
            this.add("-fail", target, "boost", "[from] volatile: Sentinoylium Effect");
            boost[i] = 0;
          } else if (boost[i] > 0) {
            boost[i] *= -1;
          }
        } else {
          boost[i] *= -1;
        }
      }
    },
    flags: { breakable: 1 },
    name: "Contrary",
    rating: 4.5,
    num: 126
  },
  defiant: {
    onAfterEachBoost(boost, target, source, effect) {
      if (!source || target.isAlly(source)) {
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered && !target.volatiles["sentinoyle"]) {
        this.boost({ atk: 2 }, target, target, null, false, true);
      }
      if (statsLowered && target.volatiles["sentinoyle"] && target.volatiles["lzstartersystem"]) {
        this.boost({ atk: 2 }, target, target, null, false, true);
      }
    },
    flags: {},
    name: "Defiant",
    rating: 3,
    num: 128
  },
  competitive: {
    onAfterEachBoost(boost, target, source, effect) {
      if (!source || target.isAlly(source)) {
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered && !target.volatiles["sentinoyle"]) {
        this.boost({ spa: 2 }, target, target, null, false, true);
      }
      if (statsLowered && target.volatiles["sentinoyle"] && target.volatiles["lzstartersystem"]) {
        this.boost({ spa: 2 }, target, target, null, false, true);
      }
    },
    flags: {},
    name: "Competitive",
    rating: 2.5,
    num: 172
  }
  /*healer: {
  	onSwitchIn(pokemon) {
  		for (const ally of pokemon.adjacentAllies()) {
  			// Check if the ally has a status condition
  			if (ally.status) {
  				const previousStatus = ally.status; // Store the previous status
  				ally.setStatus(''); // Clear the status condition
  				
  				// Check if the status was successfully cleared
  				if (!ally.status) {
  					this.heal(ally.baseMaxhp / 4, ally, pokemon); // Heal 25% of max HP
  					this.add('-status', ally, '', pokemon); // Notify about the status change
  				}
  			}
  		}
  	},
  	flags: {},
  	name: "Healer",
  	rating: 0,
  	num: 131,
  },*/
  // end
};
//# sourceMappingURL=abilities.js.map
