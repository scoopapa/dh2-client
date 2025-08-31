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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  aloevera: {
    num: -1,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    shortDesc: "All grounded Grass Pok\xE9mon on the field have their Atk and SpA raised by 1 stage.",
    name: "Aloe Vera",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onAfterHit(target, source, move) {
      const targets = [];
      for (const side of this.sides) {
        for (const pokemon of side.active) {
          if (pokemon && !pokemon.fainted && pokemon.hasType("Grass") && pokemon.isGrounded()) {
            targets.push(pokemon);
          }
        }
      }
      if (!targets.length)
        return false;
      for (const pokemon of targets) {
        this.boost({ atk: 1, spa: 1 }, pokemon, source, move);
        this.add("-message", `${pokemon.name}'s Attack and Special Attack were boosted by Aloe Vera!`);
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Beautiful"
  },
  // end
  // start
  clivejump: {
    num: -2,
    accuracy: 95,
    basePower: 85,
    category: "Physical",
    shortDesc: "Lowers target's Def by 1 stage, 2 in Tailwind.",
    name: "Clive Jump",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      onHit(target, source) {
        if (source.side.sideConditions["tailwind"]) {
          this.boost({ def: -2 }, target);
        } else {
          this.boost({ def: -1 }, target);
        }
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  // end
  // start
  coldrush: {
    num: -3,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    shortDesc: "This move hits in two turns and sets Snow.",
    name: "Cold Rush",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, metronome: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTryMove() {
      this.attrLastMove("[still]");
      return true;
    },
    onTry(source, target) {
      this.add("-anim", source, "Future Sight", target);
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "coldrush",
        source,
        moveData: {
          id: "coldrush",
          name: "Cold Rush",
          accuracy: 100,
          basePower: 120,
          category: "Physical",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          ignoreImmunity: false,
          onAfterMoveSecondary() {
            this.field.setWeather("snow");
          },
          onPrepareHit(target2, source2) {
            this.add("-anim", source2, "Doom Desire", target2);
          },
          effectType: "Move",
          type: "Ice"
        }
      });
      this.add("-start", source, "move: Cold Rush");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  // end
  // start
  colourmegone: {
    num: -4,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "User's primary type changes to an ally's primary type before attacking.",
    name: "Colour Me Gone",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    onModifyType(move, pokemon, target) {
      let newType = null;
      for (const ally of pokemon.side.active) {
        if (ally && !ally.fainted && ally !== pokemon) {
          if (ally.types[0] !== pokemon.types[0] && ally.types[0] !== pokemon.types[1]) {
            newType = ally.types[0];
            break;
          }
        }
      }
      if (newType) {
        pokemon.setType(newType);
        this.add("-start", pokemon, "typechange", newType);
        move.type = newType;
      }
      move.type = pokemon.types[0];
    },
    onTryMove(pokemon, target, move) {
      this.attrLastMove("[still]");
    },
    onHit(target, source, move) {
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  // end
  // start
  cuttingedge: {
    num: -5,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "This move does 50% more damage in Grassy Terrain.",
    name: "Cutting Edge",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    secondary: null,
    onBasePower(basePower, source) {
      if (this.field.isTerrain("grassyterrain")) {
        this.debug("cuttingedge grassy terrain boost");
        return this.chainModify(1.5);
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Cool"
  },
  // end
  // start
  dispersion: {
    num: -6,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Type based on user's primary type. Hits foes.",
    name: "Dispersion",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, dance: 1 },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Silver Wind", target);
    },
    onModifyType(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Normal",
    contestType: "Beautiful"
  },
  // end
  // start
  enragedassault: {
    num: -7,
    accuracy: 100,
    basePower: 50,
    basePowerCallback(pokemon) {
      return Math.min(350, 50 + 50 * pokemon.timesAttacked);
    },
    category: "Physical",
    shortDesc: "Like Rage Fist but no punch move.",
    name: "Enraged Assault",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  // end
  // start
  entanglement: {
    num: -8,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "Sets Sticky Web in Electric Terrain.",
    name: "Entanglement",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onAfterHit(target, source, move) {
      if (!move.hasSheerForce && source.hp && this.field.isTerrain("electricterrain")) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stickyweb");
        }
      }
    },
    onAfterSubDamage(damage, target, source, move) {
      if (!move.hasSheerForce && source.hp && this.field.isTerrain("electricterrain")) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stickyweb");
        }
      }
    },
    secondary: {},
    // Sheer Force-boosted
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  // end
  // start
  enzymaticbite: {
    num: -9,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "Recovers half of the damage done to the target, 3/4 in Psychic Terrain.",
    name: "Enzymatic Bite",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1 },
    drain: [1, 2],
    onModifyMove(move, source, target) {
      if (this.field.isTerrain("psychicterrain"))
        move.drain = [3, 4];
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Clever"
  },
  // end
  // start
  frostbite: {
    num: -10,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    shortDesc: "Causes 1/8 residual damage to the target every turn.",
    name: "Frost Bite",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bite: 1 },
    condition: {
      noCopy: true,
      onStart(pokemon) {
        this.add("-start", pokemon, "Frost Bite");
      },
      onResidualOrder: 13,
      onResidual(pokemon) {
        this.damage(pokemon.baseMaxhp / 8);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Frost Bite");
      }
    },
    secondary: {
      chance: 100,
      volatileStatus: "frostbite"
    },
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  // end
  // start:
  gigavolt: {
    num: -11,
    accuracy: 100,
    basePower: 140,
    category: "Physical",
    shortDesc: "Causes paralysis if user gets interrupted.",
    name: "Giga Volt",
    pp: 5,
    priority: -3,
    flags: { contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1 },
    priorityChargeCallback(pokemon) {
      pokemon.addVolatile("gigavolt");
    },
    beforeMoveCallback(pokemon) {
      if (pokemon.volatiles["gigavolt"]?.lostFocus) {
        this.add("cant", pokemon, "Giga Volt", "Giga Volt");
        return true;
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: Giga Volt");
      },
      onHit(pokemon, source, move) {
        if (move.category !== "Status") {
          this.effectState.lostFocus = true;
          if (!source.hasType("Ground")) {
            source.trySetStatus("par", pokemon);
          }
        }
      },
      onTryAddVolatile(status, pokemon) {
        if (status.id === "flinch")
          return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  // end
  // start
  golddigger: {
    num: -12,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Removes target's Steel-type.",
    name: "Golddigger",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    onHit(target, source, move) {
      if (target.hasType("Steel")) {
        target.setType(target.getTypes(true).map((type) => type === "Steel" ? "???" : type));
        this.add("-start", target, "typechange", target.types.join("/"), "[from] move: Golddigger");
        if (target.species.name === "Aegislash-Ma'adowr") {
          target.addVolatile("steeldenial");
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Clever"
  },
  // end
  // start
  honeydew: {
    num: -13,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User and ally recover 25% of their HP. If they're Bug-type and got healed, they also have their offensive stats increased.",
    name: "Honey Dew",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, bypasssub: 1, metronome: 1 },
    onHit(pokemon) {
      const healedAmount = this.heal(this.modify(pokemon.maxhp, 0.25));
      const success = typeof healedAmount === "number" && healedAmount > 0;
      if (pokemon.hasType("Bug") && success) {
        this.boost({ atk: 1, spa: 1 }, pokemon, pokemon);
      }
    },
    secondary: null,
    target: "allies",
    type: "Bug",
    contestType: "Cool"
  },
  // end
  // start
  icechain: {
    num: -14,
    accuracy: 90,
    basePower: 80,
    category: "Special",
    shortDesc: "Traps target for 4-5 turns and causes 1/8 residual damage.",
    name: "Ice Chain",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  // end
  // start
  hasamiwaza: {
    num: -15,
    accuracy: 100,
    basePower: 140,
    category: "Physical",
    shortDesc: "-1 Atk to attacker's side if interrupted.",
    name: "Hasami-waza",
    pp: 5,
    priority: -3,
    flags: { contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1 },
    priorityChargeCallback(pokemon) {
      pokemon.addVolatile("hasamiwaza");
    },
    beforeMoveCallback(pokemon) {
      if (pokemon.volatiles["hasamiwaza"]?.lostFocus) {
        this.add("cant", pokemon, "Hasami-waza", "Hasami-waza");
        return true;
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: Hasami-waza");
      },
      onHit(pokemon, source, move) {
        for (const target of pokemon.adjacentFoes()) {
          if (move.category !== "Status") {
            this.effectState.lostFocus = this.boost({ atk: -1 }, target, pokemon);
          }
        }
      },
      onTryAddVolatile(status, pokemon) {
        if (status.id === "flinch")
          return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  // end
  // start
  lightningswing: {
    num: -16,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "Recovers 1/2 of the damage dealt to the target(s).",
    name: "Lightning Swing",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
    drain: [1, 2],
    secondary: null,
    target: "allAdjacent",
    type: "Electric",
    contestType: "Tough"
  },
  // end
  // start
  lunardust: {
    num: -17,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    shortDesc: "Clears terrain and can't be used twice.",
    name: "Lunar Dust",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, cantusetwice: 1 },
    onAfterHit(target, source) {
      if (source.hp) {
        this.field.clearTerrain();
      }
    },
    onAfterSubDamage(damage, target, source) {
      if (source.hp) {
        this.field.clearTerrain();
      }
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  // end
  // start
  lunarstorm: {
    num: -18,
    accuracy: 90,
    basePower: 120,
    category: "Special",
    shortDesc: "Heals and recharges afterwards.",
    name: "Lunar Storm",
    pp: 5,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
    drain: [1, 2],
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Beautiful"
  },
  // end
  // start
  motioncap: {
    num: -19,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Spectral Thief clone.",
    name: "Motion Cap",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bypasssub: 1 },
    stealsBoosts: true,
    // Boost stealing implemented in scripts.js
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  // end
  // start
  recalibration: {
    num: -20,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Boost acc and another stat based on target's best stat.",
    name: "Recalibration",
    pp: 10,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1, metronome: 1 },
    onHit(target, source) {
      if (!target)
        return;
      const bestStat = target.getBestStat(false, true);
      const boosts = { accuracy: 1 };
      boosts[bestStat] = 2;
      this.boost(boosts, source);
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  // end
  // start
  sandpit: {
    num: -21,
    accuracy: 90,
    basePower: 85,
    category: "Physical",
    shortDesc: "Traps target for 4-5 turns and lowers its Spe by 1 stage.",
    name: "Sand Pit",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTryImmunity(target) {
      return this.dex.getImmunity("trapped", target);
    },
    volatileStatus: "sandpit",
    condition: {
      onStart(pokemon, source) {
        this.add("-start", pokemon, "move: Sandpit", "[of] " + source);
      },
      onResidualOrder: 14,
      onResidual(pokemon) {
        const source = this.effectState.source;
        if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
          delete pokemon.volatiles["sandpit"];
          this.add("-end", pokemon, "Sandpit", "[partiallytrapped]", "[silent]");
          return;
        }
        this.boost({ spe: -1 }, pokemon, source, this.dex.getActiveMove("sandpit"));
      },
      onTrapPokemon(pokemon) {
        if (this.effectState.source && this.effectState.source.isActive)
          pokemon.tryTrap();
      }
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  // end
  // start
  sensorycues: {
    num: -22,
    accuracy: 100,
    basePower: 50,
    basePowerCallback(pokemon, target) {
      let negativeBoosts = 0;
      const boostKeys = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
      for (const stat of boostKeys) {
        if (target.boosts[stat] < 0) {
          negativeBoosts += Math.abs(target.boosts[stat]);
        }
      }
      let power = 50 + 50 * negativeBoosts;
      if (power > 2150)
        power = 2150;
      this.debug("BP: " + power);
      return power;
    },
    category: "Special",
    shortDesc: "Gets more powerful the more negative stat drops the target has.",
    name: "Sensory Cues",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Clever"
  },
  // end
  // start
  shortcircuit: {
    num: -23,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Recovers half of the damage done to the target, burns in Acidic Terrain.",
    name: "Short Circuit",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1 },
    drain: [1, 2],
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
          return;
        if (this.field.isTerrain("acidicterrain")) {
          target.trySetStatus("brn", source, move);
        }
      }
    },
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  // end
  // start
  soothingsong: {
    num: -24,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Inflicts targets with a Torment effect.",
    name: "Soothing Song",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
    onHit(target, source) {
      if (target.hasAbility("soundproof")) {
        this.add("-immune", target, "[from] ability: Soundproof");
        return null;
      }
      target.addVolatile("torment");
    },
    //		volatileStatus: 'torment',
    secondary: null,
    target: "allAdjacentFoes",
    type: "Grass",
    contestType: "Beautiful"
  },
  // end
  // start
  subdued: {
    num: -25,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Inflicts target with a torment effect.",
    name: "Subdued",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    volatileStatus: "torment",
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Clever"
  },
  // end
  // start
  sunbathing: {
    num: -26,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User and ally recover 25% of their HP and no longer have negative stat boosts.",
    name: "Sun Bathing",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, bypasssub: 1, metronome: 1 },
    /*onHit(target) {
    	let boosts: BoostsTable = target.boosts;
    
    	// Check if the target's HP is not full before healing
    	if (target.hp < target.maxhp) {
    		// Calculate the heal amount (25% of max HP)
    		const healAmount = target.maxhp / 4;
    		target.heal(healAmount);
    		this.add('-heal', target, target.getHealth, healAmount);
    	}
    
    	// Clear negative stat boosts after healing
    	for (const stat in boosts) {
    		if (boosts[stat as keyof BoostsTable] < 0) {
    			boosts[stat as keyof BoostsTable] = 0;
    		}
    	}
    		if (Object.values(boosts).every(value => value === 0)) {
    			target.clearBoosts();
    	    	this.add('-clearboost', target);
    		}
    		return true;
    },*/
    onHit(pokemon) {
      if (pokemon.hp < pokemon.maxhp) {
        const healAmount = pokemon.maxhp / 4;
        pokemon.heal(healAmount);
        this.add("-heal", pokemon, pokemon.getHealth, healAmount);
      }
      let userBoosts = pokemon.boosts;
      let clearedUserBoosts = false;
      for (const stat in userBoosts) {
        if (userBoosts[stat] < 0) {
          userBoosts[stat] = 0;
          clearedUserBoosts = true;
        }
      }
      if (clearedUserBoosts) {
        pokemon.clearBoosts();
        this.add("-clearboost", pokemon);
      }
      const ally = pokemon.side.active.find((p) => p !== pokemon);
      if (ally) {
        let allyBoosts = ally.boosts;
        let clearedAllyBoosts = false;
        for (const stat in allyBoosts) {
          if (allyBoosts[stat] < 0) {
            allyBoosts[stat] = 0;
            clearedAllyBoosts = true;
          }
        }
        if (clearedAllyBoosts) {
          ally.clearBoosts();
          this.add("-clearboost", ally);
        }
      }
      return true;
    },
    secondary: null,
    target: "allies",
    type: "Fire",
    contestType: "Beautiful"
  },
  // end
  // start
  terraform: {
    num: -27,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    shortDesc: "All grounded Ground Pok\xE9mon on the field have their Def and SpD raised by 1 stage.",
    name: "Terraform",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onAfterHit(target, source, move) {
      const targets = [];
      for (const side of this.sides) {
        for (const pokemon of side.active) {
          if (pokemon && !pokemon.fainted && pokemon.hasType("Ground") && pokemon.isGrounded()) {
            targets.push(pokemon);
          }
        }
      }
      if (!targets.length)
        return false;
      for (const pokemon of targets) {
        this.boost({ def: 1, spd: 1 }, pokemon, source, move);
        this.add("-message", `${pokemon.name}'s Defense and Special Defense were boosted by Terraform!`);
      }
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  // end
  // start
  thunderousroar: {
    num: -28,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Sets Electric Terrain and switches out.",
    name: "Thunderous Roar",
    pp: 10,
    priority: 0,
    flags: { sound: 1 },
    // TODO show prepare message before the "POKEMON used MOVE!" message
    // This happens even before sleep shows its "POKEMON is fast asleep." message
    terrain: "electricterrain",
    selfSwitch: true,
    secondary: null,
    target: "all",
    type: "Electric"
  },
  // end
  // start
  timecompressor: {
    num: -29,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Sets Trick Room two turns later.",
    name: "Time Compressor",
    pp: 5,
    priority: 0,
    flags: { metronome: 1 },
    onTry(pokemon) {
      if (!pokemon.side.sideConditions["timecrystals"]) {
        pokemon.side.addSideCondition("timecrystals");
        this.add("-message", "Time crystals started to glow.");
        this.add("-anim", pokemon, "Flash");
      } else {
        return false;
      }
    },
    secondary: null,
    target: "allySide",
    type: "Rock",
    contestType: "Clever"
  },
  // end
  // start
  voltomator: {
    num: -30,
    accuracy: 100,
    basePower: 20,
    basePowerCallback(pokemon, target, move) {
      const bp = move.basePower + 20 * pokemon.positiveBoosts();
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Physical",
    shortDesc: "Power Trip clone.",
    name: "Voltomator",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  // end
  //Start
  wondermirror: {
    num: -31,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Changes user's type to the type of the last move it was hit by.",
    name: "Wonder Mirror",
    pp: 10,
    priority: 4,
    stallingMove: true,
    volatileStatus: "wondermirror",
    flags: { noassist: 1, failcopycat: 1, failinstruct: 1 },
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Wonder Mirror");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        this.add("-activate", target, "move: Wonder Mirror");
        const newType = move.type;
        target.setType(newType);
        this.add("-start", target, "typechange", newType);
        return this.NOT_FAIL;
      }
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    contestType: "Beautiful"
  },
  // end
  // start
  acidicterrain: {
    num: -32,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Sets terrain that boosts Poison moves and makes grounded Steel Pkm susceptible to offensive Poison moves.",
    name: "Acidic Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "acidicterrain",
    condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Poison" && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
          this.debug("acidic terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onModifyMovePriority: -5,
      onModifyMove(move, source, target) {
        if (!move.ignoreImmunity)
          move.ignoreImmunity = {};
        if (move.ignoreImmunity !== true) {
          move.ignoreImmunity["Poison"] = true;
        }
      },
      onTryHit(target, source, move) {
        if (move.type === "Poison") {
          if ((!target.isGrounded() || target.isSemiInvulnerable()) && !this.dex.getImmunity("Poison", target)) {
            this.add("-immune", target);
            this.hint(`Only targets that are affected by terrain lose their immunity to Poison.`);
            return null;
          }
        }
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Acidic Terrain", "[from] ability: " + effect.name, "[of] " + source);
          this.add("-message", "Poison-type moves used by grounded Pok\xE9mon will have their power increased.");
          this.add("-message", "Grounded Steel-type Pok\xE9mon will also lose their immunity to Poison-type moves.");
        } else {
          this.add("-fieldstart", "move: Acidic Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Acidic Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Poison",
    contestType: "Clever"
  },
  // end
  // start
  oilspill: {
    num: -33,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Dual Poison & Water move that poisons in Acidic terrain.",
    name: "Oil Spill",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Water", type);
    },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
          return;
        if (this.field.isTerrain("acidicterrain")) {
          target.trySetStatus("psn", source);
        }
      }
    },
    target: "allAdjacentFoes",
    type: "Poison",
    contestType: "Tough"
  },
  // end
  // start:
  incandescentflame: {
    num: -34,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "Burns and suffers no power loss in Rain.",
    name: "Incandescent Flame",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1 },
    /*onBasePower(basePower, source) {
    	if (['raindance', 'primordialsea'].includes(source.effectiveWeather()) && !source.hasItem('utilityumbrella')) {
    		this.debug('rain Incandescent Flame boost');
    		return this.chainModify(2);
    	}
    },*/
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
          return;
        if (["raindance", "primordialsea"].includes(source.effectiveWeather())) {
          target.trySetStatus("brn", source, move);
        }
      }
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  // end
  // start: damage info in conditions.ts
  eyeofthesun: {
    num: -35,
    accuracy: 90,
    basePower: 120,
    category: "Special",
    shortDesc: "Skips in Sun. -1 Spe to target.",
    name: "Eye of the Sun",
    pp: 5,
    priority: 0,
    flags: { charge: 1, protect: 1, metronome: 1, mirror: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, "Tailwind");
      if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.add("-anim", attacker, "Oblivion Wing", defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    hasSheerForce: true,
    target: "normal",
    type: "Flying",
    contestType: "Cool"
  },
  // end
  // start
  reboot: {
    num: -38,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reboot",
    pp: 5,
    priority: -8,
    flags: { heal: 1 },
    shortDesc: "Removes effects, heals, and recovers items.",
    onHitField(target, source, move) {
      this.field.clearTerrain();
      this.field.clearWeather();
      for (const pseudoweather in this.field.pseudoWeather) {
        this.add("-fieldend", this.dex.conditions.get(pseudoweather).name);
        delete this.field.pseudoWeather[pseudoweather];
      }
      for (const side of this.sides) {
        for (const condition in side.sideConditions) {
          this.add("-sideend", side, this.dex.conditions.get(condition).name);
          side.removeSideCondition(condition);
        }
      }
      for (const pokemon of this.getAllActive()) {
        if (!pokemon.fainted) {
          this.queue.cancelMove(pokemon);
          this.queue.cancelAction(pokemon);
          this.add("-anim", pokemon, "Teleport", pokemon);
          for (const volatile in pokemon.volatiles) {
            delete pokemon.volatiles[volatile];
            this.add("-end", pokemon, volatile.charAt(0).toUpperCase() + volatile.slice(1), "[from] move: Reboot");
          }
          pokemon.clearBoosts();
          this.add("-clearboost", pokemon);
          pokemon.heal(pokemon.maxhp - pokemon.hp);
          pokemon.cureStatus();
          for (const moveSlot of pokemon.moveSlots) {
            if (moveSlot.move !== "Reboot") {
              moveSlot.pp = moveSlot.maxpp;
            }
          }
          if (pokemon.lastItem) {
            pokemon.setItem(pokemon.lastItem);
            pokemon.lastItem = "";
            this.add("-item", pokemon, pokemon.getItem(), "[from] move: Reboot");
          }
          this.runEvent("SwitchIn", pokemon);
          if (source.baseSpecies.baseSpecies !== "Porygon-Z-Ma'adowr") {
            const moveSlot = source.moveSlots.find((move2) => move2.move === "Reboot");
            if (moveSlot) {
              moveSlot.pp = 0;
            }
          }
          this.add("-heal", pokemon, pokemon.getHealth, "[silent]");
          this.runEvent("AfterSwitchIn", pokemon);
        }
      }
      if (source.baseSpecies.baseSpecies === "Porygon-Z-Ma'adowr") {
        const newatk = source.storedStats.spa;
        const newspa = source.storedStats.atk;
        source.storedStats.atk = newatk;
        source.storedStats.spa = newspa;
        const newdef = source.storedStats.spd;
        const newspd = source.storedStats.def;
        source.storedStats.def = newdef;
        source.storedStats.spd = newspd;
        this.add("-message", `${source.name}'s offensive and defensive base stats have been permanently swapped. Unexpectedly!`);
        this.add("-anim", source, "confuseray", source);
      }
      this.add("-message", "All Pok\xE9mon had their stat changes removed and are fully restored!");
    },
    secondary: null,
    target: "all",
    type: "Bug",
    contestType: "Clever"
  },
  // end
  // start
  ascension: {
    num: -36,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Life Dew + Mental Herb effect.",
    name: "Ascension",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, bypasssub: 1, metronome: 1 },
    onHit(pokemon) {
      if (pokemon.hp < pokemon.maxhp) {
        const healAmount = pokemon.maxhp / 4;
        pokemon.heal(healAmount);
        this.add("-heal", pokemon, pokemon.getHealth, healAmount);
      }
      const conditions = ["attract", "taunt", "encore", "torment", "disable", "healblock"];
      for (const firstCondition of conditions) {
        if (pokemon.volatiles[firstCondition]) {
          for (const secondCondition of conditions) {
            pokemon.removeVolatile(secondCondition);
            if (firstCondition === "attract" && secondCondition === "attract") {
              this.add("-end", pokemon, "move: Attract", "[from] move: Ascension");
            }
          }
          return;
        }
      }
      const ally = pokemon.side.active.find((p) => p !== pokemon);
      if (ally) {
        const conditions2 = ["attract", "taunt", "encore", "torment", "disable", "healblock"];
        for (const firstCondition of conditions2) {
          if (ally.volatiles[firstCondition]) {
            for (const secondCondition of conditions2) {
              ally.removeVolatile(secondCondition);
              if (firstCondition === "attract" && secondCondition === "attract") {
                this.add("-end", ally, "move: Attract", "[from] move: Ascension");
              }
            }
            return;
          }
        }
      }
    },
    secondary: null,
    target: "allies",
    type: "Grass",
    contestType: "Beautiful"
  },
  // end
  // start
  reactivepoison: {
    num: -37,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    shortDesc: "Priority against a poisoned target.",
    name: "Reactive Poison",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    beforeTurnCallback(pokemon) {
      for (const target of pokemon.side.foe.active) {
        if (target && !target.fainted && (target.status === "psn" || target.status === "tox")) {
          target.addVolatile("reactivepoisontarget", pokemon);
          this.add("-message", `${pokemon.name} is eyeing ${target.name} for a swift strike!`);
        }
      }
    },
    onModifyPriority(priority, source, target) {
      for (const foe of source.side.foe.active) {
        if (foe && foe.volatiles["reactivepoisontarget"]) {
          return priority + 1;
        }
      }
      return priority;
    },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      if (target.volatiles["reactivepoisontarget"]) {
        this.add("-anim", source, "Focus Energy");
      }
      this.add("-anim", source, "Venoshock", target);
    },
    condition: {
      duration: 1,
      onStart(pokemon, source) {
        this.debug(`Reactive Poison - Volatile 'reactivepoisontarget' started on ${pokemon.name}`);
      }
      //	onEnd(pokemon) {
      //		console.log(`Reactive Poison - Volatile 'reactivepoisontarget' ended on ${pokemon.name}`);
      //	},
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Tough"
  },
  // end
  enhancement: {
    num: -41,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User and ally recover 25% of their HP. If they're Rock-type, they also have their defensive stats increased.",
    name: "Enhancement",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, bypasssub: 1, metronome: 1 },
    onHit(pokemon) {
      const healedAmount = this.heal(this.modify(pokemon.maxhp, 0.25));
      const success = typeof healedAmount === "number" && healedAmount > 0;
      if (pokemon.hasType("Rock") && success) {
        this.boost({ def: 1, spd: 1 }, pokemon, pokemon);
      }
    },
    secondary: null,
    target: "allies",
    type: "Rock",
    contestType: "Beautiful"
  },
  // end
  // start
  saute: {
    num: -42,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User's side eats berries; effect doubled.",
    name: "Saute",
    pp: 5,
    priority: 0,
    flags: { bypasssub: 1, metronome: 1 },
    onHitField(target, source, move) {
      const targets = [];
      for (const pokemon of this.getAllActive()) {
        if (pokemon.side === source.side) {
          if (this.runEvent("Invulnerability", pokemon, source, move) === false) {
            this.add("-miss", source, pokemon);
          } else if (this.runEvent("TryHit", pokemon, source, move) && pokemon.getItem().isBerry) {
            targets.push(pokemon);
          }
        }
      }
      this.add("-fieldactivate", "move: Saute");
      if (!targets.length) {
        this.add("-fail", source, "move: Saute");
        this.attrLastMove("[still]");
        return this.NOT_FAIL;
      }
      for (const pokemon of targets) {
        const item = pokemon.getItem();
        if (item.isBerry) {
          if (["figyberry", "wikiberry", "magoberry", "aguavberry", "iapapaberry", "sitrusberry", "oranberry", "leppaberry", "liechiberry", "ganlonberry", "salacberry", "petayaberry", "apicotberry", "starfberry"].includes(item.id)) {
            pokemon.addVolatile("sauteing");
          }
          pokemon.eatItem(true);
        }
      }
    },
    secondary: null,
    target: "all",
    type: "Fire"
  },
  // end
  // start
  blockage: {
    num: -43,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "King's Shield with Disable instead.",
    name: "Blockage",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1, failinstruct: 1 },
    stallingMove: true,
    volatileStatus: "blockage",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Blockage");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (move.category !== "Status") {
          this.add("-activate", target, "move: Blockage");
          source.addVolatile("disable");
          return this.NOT_FAIL;
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Rock",
    contestType: "Tough"
  },
  // end
  // start
  pincerattack: {
    num: -44,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Combo attack: Double damage for second attacker.",
    name: "Pincer Attack",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1 },
    onModifyType(move, pokemon) {
      if (pokemon.species.name === "Escavalier") {
        move.type = "Bug";
      } else if (pokemon.species.name === "Grapplin") {
        move.type = "Fighting";
      }
    },
    onBasePower(basePower, pokemon) {
      if (this.lastSuccessfulMoveThisTurn === "pincerattack" && pokemon.species.name === "Escavalier") {
        this.debug("double power");
        return this.chainModify(2);
      } else if (this.lastSuccessfulMoveThisTurn === "pincerattack" && pokemon.species.name === "Grapplin") {
        this.debug("double power");
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough"
  },
  // end
  // start: Exhume from Dark Volatile, this is now a more simplified coding version
  exhume: {
    num: -45,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Executes first move of last fainted Dark ally. Best stat boost.",
    name: "Exhume",
    pp: 8,
    // this should be fine since this move can only be called through an Engraving effect, which doesn't max pp
    priority: 0,
    flags: { protect: 1, failencore: 1, failmefirst: 1, noassist: 1, failcopycat: 1, failmimic: 1, nosketch: 1 },
    onTryHit(target, source, move) {
      const faintedDarkTypes = source.side.pokemon.filter((p) => p.fainted && p.hasType("Dark"));
      const lastFaintedDark = faintedDarkTypes[faintedDarkTypes.length - 1];
      if (!lastFaintedDark) {
        this.add("-fail", source, "move: Exhume");
        return null;
      }
      const stats = ["atk", "def", "spa", "spd", "spe"];
      let bestStat = stats[0];
      let highestValue = lastFaintedDark.getStat(bestStat);
      for (const stat of stats) {
        const currentValue = lastFaintedDark.getStat(stat);
        if (currentValue > highestValue) {
          highestValue = currentValue;
          bestStat = stat;
        }
      }
      this.add("-anim", source, "Moonlight");
      this.boost({ [bestStat]: 1 }, source);
      const firstMove = lastFaintedDark.moveSlots[0];
      if (!firstMove) {
        this.add("-fail", source, "move: Exhume");
        return null;
      }
      const moveData = this.dex.moves.get(firstMove.id);
      this.add("-message", `${source.name} exhumes ${lastFaintedDark.name}'s ${moveData.name}!`);
      switch (moveData.target) {
        case "self":
          this.actions.useMove(moveData.id, source, source);
          break;
        case "allySide":
          this.actions.useMove(moveData.id, source, source.side.pokemon[0]);
          break;
        case "allyTeam":
          this.actions.useMove(moveData.id, source, null);
          break;
        case "normal":
          const targets = source.side.foe.active.filter((target2) => target2 && !target2.fainted);
          if (targets.length > 0) {
            const randomTarget = targets[Math.floor(Math.random() * targets.length)];
            this.actions.useMove(moveData.id, source, randomTarget);
          } else {
            this.add("-fail", source, "move: Exhume");
          }
          break;
        case "any":
          const anyTarget = source.side.foe.active.filter((target2) => target2 && !target2.fainted);
          if (anyTarget.length > 0) {
            const randomTarget = anyTarget[Math.floor(Math.random() * anyTarget.length)];
            this.actions.useMove(moveData.id, source, randomTarget);
          } else {
            this.add("-fail", source, "move: Exhume");
          }
          break;
        default:
          this.actions.useMove(moveData.id, source, target);
          break;
      }
    },
    secondary: null,
    target: "self",
    type: "Dark",
    contestType: "Cool"
  },
  // end
  // start:
  superkinesis: {
    num: -46,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Superkinesis",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    shortDesc: "Lowers user's best stat by 2.",
    onHit(target, source) {
      if (!target)
        return;
      const bestStat = source.getBestStat(false, true);
      const boosts = {};
      boosts[bestStat] = -2;
      this.boost(boosts, source);
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  // end
  reverberation: {
    num: -47,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Reverberation",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
    shortDesc: "Mini Earthquake follow-up at 60 BP.",
    onAfterMove(source) {
      source.addVolatile("quakingboom");
      this.actions.useMove("earthquake", source);
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  earthquake: {
    inherit: true,
    onModifyMove(move, source, target) {
      if (source && source.volatiles["quakingboom"]) {
        move.basePower = 60;
      }
    },
    onAfterMove(target, source) {
      if (target && target.hp > 0) {
        const allTargets = this.getAllActive().filter((p) => p && p.hp > 0);
        if (allTargets.length === 1) {
          delete source.volatiles["quakingboom"];
        }
      }
    }
  },
  // start: This move is only for testing purposes due to Wood Stove
  //	frostblast: {
  //		num: -38,
  //		accuracy: 100, // Accuracy of the move
  //		basePower: 50, // Base power of the move
  //		category: 'Special', // Category of the move (Physical, Special, or Status)
  //		name: "Frost Blast", // Name of the move
  //		priority: 0, // Priority of the move
  //		pp: 10, // Power Points
  //		flags: {protect: 1, mirror: 1, metronome: 1},
  //		secondary: {
  //			chance: 100,
  //			status: 'frz',
  //		},
  //		target: 'allAdjacent', // This move targets all adjacent opponents
  //		type: 'Ice', // Type of the move
  //		// Additional properties can be added here
  //		shortDesc: "Freezes all adjacent opponents.", // Short description
  //		desc: "A chilling blast that may freeze all adjacent opponents.", // Detailed description
  //	},
  // end
  // start: Reserve Idea For New Project
  paranoia: {
    num: -100,
    accuracy: 95,
    basePower: 0,
    damageCallback(pokemon, target) {
      return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 4), 1);
    },
    onHit(target, source) {
      if (!target)
        return;
      const bestStat = target.getBestStat(false, true);
      const boosts = {};
      boosts[bestStat] = -1;
      this.boost(boosts, target);
    },
    shortDesc: "Quarters targets' HP + lowers best stat.",
    name: "Paranoia",
    category: "Special",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nosketch: 1 },
    // for tournament purpose only, nosketch
    secondary: {},
    target: "allAdjacentFoes",
    type: "Bug",
    contestType: "Clever"
  },
  // end
  // start
  camouflage: {
    inherit: true,
    onHit(target) {
      let newType = "Normal";
      if (this.field.isTerrain("electricterrain")) {
        newType = "Electric";
      } else if (this.field.isTerrain("grassyterrain")) {
        newType = "Grass";
      } else if (this.field.isTerrain("mistyterrain")) {
        newType = "Fairy";
      } else if (this.field.isTerrain("psychicterrain")) {
        newType = "Psychic";
      } else if (this.field.isTerrain("acidicterrain")) {
        newType = "Poison";
      }
      if (target.getTypes().join() === newType || !target.setType(newType))
        return false;
      this.add("-start", target, "typechange", newType);
    }
  },
  naturepower: {
    inherit: true,
    onTryHit(target, pokemon) {
      let move = "triattack";
      if (this.field.isTerrain("electricterrain")) {
        move = "thunderbolt";
      } else if (this.field.isTerrain("grassyterrain")) {
        move = "energyball";
      } else if (this.field.isTerrain("mistyterrain")) {
        move = "moonblast";
      } else if (this.field.isTerrain("psychicterrain")) {
        move = "psychic";
      } else if (this.field.isTerrain("acidicterrain")) {
        move = "sludgebomb";
      }
      this.actions.useMove(move, pokemon, target);
      return null;
    }
  },
  secretpower: {
    inherit: true,
    onModifyMove(move, pokemon) {
      if (this.field.isTerrain(""))
        return;
      move.secondaries = [];
      if (this.field.isTerrain("electricterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "par"
        });
      } else if (this.field.isTerrain("grassyterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "slp"
        });
      } else if (this.field.isTerrain("mistyterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spa: -1
          }
        });
      } else if (this.field.isTerrain("psychicterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("acidicterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "psn"
        });
      }
    }
  },
  terrainpulse: {
    num: 805,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Terrain Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
    onModifyType(move, pokemon) {
      if (!pokemon.isGrounded() || this.field.isTerrain(""))
        return;
      switch (this.field.terrain) {
        case "electricterrain":
          move.type = "Electric";
          break;
        case "grassyterrain":
          move.type = "Grass";
          break;
        case "mistyterrain":
          move.type = "Fairy";
          break;
        case "psychicterrain":
          move.type = "Psychic";
          break;
        case "acidicterrain":
          move.type = "Poison";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.isTerrain(""))
        return;
      if (this.field.terrain && pokemon.isGrounded()) {
        move.basePower *= 2;
        this.debug("BP doubled in Terrain");
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  // end
  // start
  waterpulse: {
    inherit: true,
    basePower: 75
  },
  // end
  // start:
  electroball: {
    inherit: true,
    basePowerCallback(pokemon, target) {
      let ratio = Math.floor(pokemon.getStat("spe") / target.getStat("spe") * 10) / 10;
      if (!isFinite(ratio))
        ratio = 0;
      let bp = 40;
      if (ratio >= 1)
        bp = 60;
      if (ratio >= 1.5)
        bp = 80;
      if (ratio >= 2)
        bp = 100;
      if (ratio >= 3)
        bp = 120;
      if (ratio >= 4)
        bp = 150;
      return bp;
    }
  },
  // end
  // start
  hypnosis: {
    num: 95,
    accuracy: 55,
    basePower: 0,
    category: "Status",
    name: "Hypnosis",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
    onTryHit(target, source, move) {
      if (target.hasType("Psychic")) {
        this.add("-immune", target, "[from] type: Psychic");
        return null;
      }
    },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Psychic",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  // end
  // start: modifying Soak for Aegislash-Ma'adowr to account for form change, letting it stay mono Water
  soak: {
    num: 487,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Soak",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Water" || !target.setType("Water")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Water");
      if (target.species.name === "Aegislash-Ma'adowr" || target.species.name === "Aegislash-Blade-Ma'adowr") {
        target.addVolatile("soaksteeldenial");
      }
    },
    secondary: null,
    target: "normal",
    type: "Water",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  // end
  // start: list of unattainable moves
  frustration: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hail: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  pursuit: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  return: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpower: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerfighting: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerfire: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowergrass: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerwater: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerelectric: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerice: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerpoison: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerground: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerpsychic: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerdark: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerbug: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerghost: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerdragon: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowersteel: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerflying: {
    inherit: true,
    isNonstandard: "Unobtainable"
  },
  hiddenpowerrock: {
    inherit: true,
    isNonstandard: "Unobtainable"
  }
  // end
};
//# sourceMappingURL=moves.js.map
