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
  // start
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
  // start: revisit later to check if ally also gets healed
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
    shortDesc: "Summons Gravity when replacing a fainted Pok\xE9mon.",
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
      this.add("-sidestart", pokemon.side, "move: Tailwind");
    },
    flags: {},
    name: "Ill Wind",
    rating: 5,
    num: -10
  },
  // end
  // start
  inoculum: {
    name: "Inoculum",
    shortDesc: "Heatproof for user and ally.",
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
    shortDesc: "When attacked, inflicts Torment on the attacker.",
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
    //	onResidualOrder: 26,
    //	onResidualSubOrder: 1,
    //	onResidual(pokemon) {
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
    //		onDamage(damage, target, source, effect) {
    //			if (effect && effect.id === 'psn' && (target.volatiles['malwarepoisoned'])) {
    //				return damage / 2;
    //			}
    //		},
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
          "flowergift",
          "forecast",
          "hugepower",
          "hungerswitch",
          "illusion",
          "imposter",
          "neutralizinggas",
          "powerofalchemy",
          "purepower",
          "receiver",
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
    shortDesc: "When brought to 50% HP or less, restores lost items on user's side.",
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
    shortDesc: "In a double battle, the Pok\xE9mon copies its partner's first type.",
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
    //	onAfterMega(pokemon) {
    //		if (!pokemon.side.faintedLastTurn) return;
    //		this.boost({spd: 1}, pokemon);
    //		this.add('-activate', pokemon, 'move: Charge');
    //		pokemon.addVolatile('charge');
    //	},
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
  // start: Volatiles are handled in script
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
  // start: Amaterasu, bound by volatile and Engraving. So, there's no real natural user of Amaterasu
  amaterasu: {
    shortDesc: "User burns and suffers 1/8 Burn damage.",
    onUpdate(pokemon) {
      if (pokemon.hasAbility("amaterasu") && !pokemon.status && !pokemon.hasType("Fire")) {
        if (pokemon.isGrounded() && this.field.isTerrain("mistyterrain")) {
          return;
        }
        if (pokemon.side.getSideCondition("safeguard")) {
          return;
        }
        if (pokemon.hasItem("sunring") && pokemon.baseSpecies.baseSpecies === "Horizonoc") {
          return;
        }
        const allyPresent = pokemon.side.active.some((ally) => ally && ally !== pokemon && ally.baseSpecies.baseSpecies === "Horizonoc" && ally.hasItem("sunring"));
        if (allyPresent && ["sunnyday", "desolateland"].includes(this.field.effectiveWeather())) {
          return;
        }
        pokemon.setStatus("brn", pokemon, null, true);
      }
    },
    onAnyDamage(damage, target, source, effect) {
      if (effect && effect.id === "brn") {
        if (target === this.effectState.target) {
          this.debug("Amaterasu damage increase for burn damage");
          return this.chainModify(2);
        }
      }
    },
    onFaint(target, source, effect) {
      if (!source || !effect || target.side === source.side)
        return;
      if (effect.effectType === "Move" && !effect.flags["futuremove"]) {
        this.add("-ability", target, "Amaterasu");
        const bannedAbilities = [
          "battlebond",
          "comatose",
          "disguise",
          "multitype",
          "powerconstruct",
          "rkssystem",
          "schooling",
          "shieldsdown",
          "skyrider",
          "stancechange",
          "truant",
          "zenmode"
        ];
        if (bannedAbilities.includes(source.ability) || source.hasType("Fire")) {
          return;
        } else {
          source.setAbility("amaterasu");
          source.baseAbility = "amaterasu";
          source.ability = "amaterasu";
          this.add("-ability", source, "Amaterasu", "[from] Ability: Amaterasu");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Amaterasu",
    rating: 0,
    num: -29
  },
  // end
  // start: Archetype (Reserve Idea for New Project)
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
  // start: Reserve Idea for New Project
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
      if (!attacker.species.name.startsWith("Aegislash") && !attacker.species.name.startsWith("Ma'adowr") || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      if (attacker.species.name === "Aegislash" || attacker.species.name === "Aegislash-Blade") {
        const targetForme = move.id === "kingsshield" ? "Aegislash" : "Aegislash-Blade";
        if (attacker.species.name !== targetForme)
          attacker.formeChange(targetForme);
      } else if (attacker.species.name === "Aegislash-Ma'adowr" || attacker.species.name === "Aegislash-Blade-Ma'adowr") {
        const targetForme = move.id === "kingsshield" ? "Aegislash-Ma'adowr" : "Aegislash-Blade-Ma'adowr";
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
  // end
  cursedbody: {
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isMax && !move.flags["futuremove"] && move.id !== "struggle") {
        if (this.randomChance(3, 10) && !target.volatiles["maudiorfeature"]) {
          this.add("-activate", source, "ability: Cursed Body", target);
          source.addVolatile("disable", target);
        } else if (target.volatiles["maudiorfeature"]) {
          this.add("-activate", source, "ability: Cursed Body", target);
          source.addVolatile("disable", target);
        }
      }
    },
    flags: {},
    name: "Cursed Body",
    rating: 2,
    num: 130
  },
  cutecharm: {
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["attract"])
        return;
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10) && !target.volatiles["maudiorfeature"]) {
          this.add("-activate", source, "ability: Cute Charm", target);
          source.addVolatile("attract", target);
        } else if (target.volatiles["maudiorfeature"]) {
          this.add("-activate", source, "ability: Cute Charm", target);
          source.addVolatile("attract", target);
        }
      }
    },
    flags: {},
    name: "Cute Charm",
    rating: 0.5,
    num: 56
  },
  // Effect Spore
  effectspore: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity("powder")) {
        if (target.volatiles["maudiorfeature"]) {
          this.add("-activate", source, "ability: Effect Spore", target);
          const r = this.random(3);
          if (r === 0) {
            source.setStatus("slp", target);
          } else if (r === 1) {
            source.setStatus("par", target);
          } else {
            source.setStatus("psn", target);
          }
        } else {
          const r = this.random(100);
          if (r < 11) {
            source.setStatus("slp", target);
          } else if (r < 21) {
            source.setStatus("par", target);
          } else if (r < 30) {
            source.setStatus("psn", target);
          }
        }
      }
    },
    flags: {},
    name: "Effect Spore",
    rating: 2,
    num: 27
  },
  // End
  flamebody: {
    onDamagingHit(damage, target, source, move) {
      if (!source.status) {
        if (this.checkMoveMakesContact(move, source, target)) {
          if (this.randomChance(3, 10) && !target.volatiles["maudiorfeature"]) {
            source.trySetStatus("brn", target);
          } else if (target.volatiles["maudiorfeature"]) {
            source.trySetStatus("brn", target);
          }
        }
      }
    },
    flags: {},
    name: "Flame Body",
    rating: 2,
    num: 49
  },
  harvest: {
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (pokemon.volatiles["maudiorfeature"]) {
        if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
          pokemon.setItem(pokemon.lastItem);
          pokemon.lastItem = "";
          this.add("-item", pokemon, pokemon.getItem(), "[from] ability: Harvest");
        }
      } else {
        if (this.field.isWeather(["sunnyday", "desolateland"]) || this.randomChance(1, 2)) {
          if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
            pokemon.setItem(pokemon.lastItem);
            pokemon.lastItem = "";
            this.add("-item", pokemon, pokemon.getItem(), "[from] ability: Harvest");
          }
        }
      }
    },
    flags: {},
    name: "Harvest",
    rating: 2.5,
    num: 139
  },
  healer: {
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      for (const allyActive of pokemon.adjacentAllies()) {
        if (pokemon.volatiles["maudiorfeature"]) {
          if (allyActive.status) {
            this.add("-activate", pokemon, "ability: Healer");
            allyActive.cureStatus();
          }
        } else {
          if (allyActive.status && this.randomChance(3, 10)) {
            this.add("-activate", pokemon, "ability: Healer");
            allyActive.cureStatus();
          }
        }
      }
    },
    flags: {},
    name: "Healer",
    rating: 0,
    num: 131
  },
  poisonpoint: {
    onDamagingHit(damage, target, source, move) {
      if (!source.status) {
        if (this.checkMoveMakesContact(move, source, target)) {
          if (this.randomChance(3, 10) && !target.volatiles["maudiorfeature"]) {
            source.trySetStatus("psn", target);
          } else if (target.volatiles["maudiorfeature"]) {
            source.trySetStatus("psn", target);
          }
        }
      }
    },
    flags: {},
    name: "Poison Point",
    rating: 1.5,
    num: 38
  },
  poisontouch: {
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak") || target.status)
        return;
      if (source.volatiles["maudiorfeature"]) {
        target.trySetStatus("psn", source);
      } else {
        if (this.checkMoveMakesContact(move, target, source)) {
          if (this.randomChance(3, 10)) {
            target.trySetStatus("psn", source);
          }
        }
      }
    },
    flags: {},
    name: "Poison Touch",
    rating: 2,
    num: 143
  },
  shedskin: {
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      if (pokemon.volatiles["maudiorfeature"]) {
        if (pokemon.hp && pokemon.status) {
          this.add("-activate", pokemon, "ability: Shed Skin");
          pokemon.cureStatus();
        }
      } else {
        if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
          this.debug("shed skin");
          this.add("-activate", pokemon, "ability: Shed Skin");
          pokemon.cureStatus();
        }
      }
    },
    flags: {},
    name: "Shed Skin",
    rating: 3,
    num: 61
  },
  static: {
    onDamagingHit(damage, target, source, move) {
      if (!source.status) {
        if (this.checkMoveMakesContact(move, source, target)) {
          if (this.randomChance(3, 10) && !target.volatiles["maudiorfeature"]) {
            source.trySetStatus("par", target);
          } else if (target.volatiles["maudiorfeature"]) {
            source.trySetStatus("par", target);
          }
        }
      }
    },
    flags: {},
    name: "Static",
    rating: 2,
    num: 9
  },
  stench: {
    onModifyMovePriority: -1,
    onModifyMove(move) {
      const source = this.effectState.source;
      if (source.volatiles["maudiorfeature"]) {
        this.debug("Adding guaranteed Stench flinch");
        if (!move.secondaries)
          move.secondaries = [];
        for (const secondary of move.secondaries) {
          if (secondary.volatileStatus === "flinch")
            return;
        }
        move.secondaries.push({
          chance: 100,
          // Set chance to 100% for guaranteed flinch
          volatileStatus: "flinch"
        });
      } else {
        if (move.category !== "Status") {
          this.debug("Adding Stench flinch");
          if (!move.secondaries)
            move.secondaries = [];
          for (const secondary of move.secondaries) {
            if (secondary.volatileStatus === "flinch")
              return;
          }
          move.secondaries.push({
            chance: 10,
            // Original chance for flinch
            volatileStatus: "flinch"
          });
        }
      }
    },
    flags: {},
    name: "Stench",
    rating: 0.5,
    num: 1
  },
  wonderskin: {
    onModifyAccuracyPriority: 10,
    onModifyAccuracy(accuracy, target, source, move) {
      if (target.volatiles["maudiorfeature"]) {
        if (move.category === "Status" && typeof accuracy === "number") {
          this.debug("Wonder Skin with Maudior Feature - setting accuracy to 0");
          return 0;
        }
      } else {
        if (move.category === "Status" && typeof accuracy === "number") {
          this.debug("Wonder Skin - setting accuracy to 50");
          return 50;
        }
      }
    },
    flags: { breakable: 1 },
    name: "Wonder Skin",
    rating: 2,
    num: 147
  }
};
//# sourceMappingURL=abilities.js.map
