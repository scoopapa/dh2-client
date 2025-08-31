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
  // Set 1
  porous: {
    // Feel like this might be wrong
    id: "porous",
    name: "Porous",
    shortDesc: "Unaware + Water Absorb.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Porous");
        }
        return null;
      }
    },
    onAnyModifyBoost(boosts, pokemon2) {
      const unawareUser = this.effectState.target;
      if (unawareUser === pokemon2)
        return;
      if (unawareUser === this.activePokemon && pokemon2 === this.activeTarget) {
        if (pokemon2 === this.activeTarget) {
          boosts["def"] = 0;
          boosts["spd"] = 0;
          boosts["evasion"] = 0;
        }
      } else if (pokemon2 === this.activePokemon && unawareUser === this.activeTarget) {
        boosts["atk"] = 0;
        boosts["def"] = 0;
        boosts["spa"] = 0;
        boosts["accuracy"] = 0;
      }
    },
    flags: { breakable: 1 }
  },
  despicable: {
    id: "despicable",
    name: "Despicable",
    shortDesc: "This Pokemon's attacks are critical hits if the target is burned or poisoned.",
    onModifyCritRatio(critRatio, source, target) {
      if (target && ["psn", "tox", "brn"].includes(target.status))
        return 5;
    },
    flags: {}
  },
  kingsguard: {
    id: "kingsguard",
    name: "King's Guard",
    shortDesc: "Protected from enemy priority moves and Attack reduction.",
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.atk && boost.atk < 0) {
        delete boost.atk;
        if (!effect2.secondaries) {
          this.add("-fail", target, "unboost", "Attack", "[from] ability: King's Guard", "[of] " + target);
        }
      }
    },
    onFoeTryMove(target, source, move) {
      const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
      if (move.target === "foeSide" || move.target === "all" && !targetAllExceptions.includes(move.id)) {
        return;
      }
      const dazzlingHolder = this.effectState.target;
      if ((source.side === dazzlingHolder.side || move.target === "all") && move.priority > 0.1) {
        this.attrLastMove("[still]");
        this.add("cant", dazzlingHolder, "ability: King's Guard", move, "[of] " + target);
        return false;
      }
    },
    flags: {}
  },
  growthveil: {
    // Too long
    id: "growthveil",
    name: "Growth Veil",
    shortDesc: "Regenerator + Flower Veil.",
    desc: "Restores 1/3 max HP on switch-out; ally Grass-types can't have stats lowered or status inflicted.",
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    onAllyTryBoost(boost, target, source, effect2) {
      if (source && target === source || !target.hasType("Grass"))
        return;
      let showMsg = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          delete boost[i];
          showMsg = true;
        }
      }
      if (showMsg && !effect2.secondaries) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Growth Veil", "[of] " + effectHolder);
      }
    },
    onAllySetStatus(status, target, source, effect2) {
      if (target.hasType("Grass") && source && target !== source && effect2 && effect2.id !== "yawn") {
        this.debug("interrupting setStatus with Growth Veil");
        if (effect2.name === "Synchronize" || effect2.effectType === "Move" && !effect2.secondaries) {
          const effectHolder = this.effectState.target;
          this.add("-block", target, "ability: Growth Veil", "[of] " + effectHolder);
        }
        return null;
      }
    },
    onAllyTryAddVolatile(status, target) {
      if (target.hasType("Grass") && status.id === "yawn") {
        this.debug("Growth Veil blocking yawn");
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Growth Veil", "[of] " + effectHolder);
        return null;
      }
    },
    flags: { breakable: 1 }
  },
  surgeoneye: {
    id: "surgeoneye",
    name: "Surgeon Eye",
    shortDesc: "Regenerator + Analytic.",
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2) {
      let boosted = true;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (this.queue.willMove(target)) {
          boosted = false;
          break;
        }
      }
      if (boosted) {
        this.debug("Surgeon Eye boost");
        return this.chainModify([5325, 4096]);
      }
    },
    flags: {}
  },
  // Set 2
  roughresult: {
    // Too long
    id: "roughresult",
    name: "Rough Result",
    shortDesc: "Foes making contact lose 1/8 max HP; if KOed by contact, attacker loses 1/4 max HP.",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / (target.hp ? 8 : 4), source, target);
      }
    },
    flags: {}
  },
  eyeforaneye: {
    id: "eyeforaneye",
    name: "Eye for an Eye",
    shortDesc: "This Pokemon blocks Dark-type moves and bounces them back to the user.",
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target === source || move.hasBounced || move.type !== "Dark") {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, target, source);
      return null;
    },
    onAllyTryHitSide(target, source, move) {
      if (target.side === source.side || move.hasBounced || move.type !== "Dark") {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, this.effectState.target, source);
      return null;
    },
    condition: {
      duration: 1
    },
    flags: { breakable: 1 }
  },
  naturalheal: {
    id: "naturalheal",
    name: "Natural Heal",
    shortDesc: "Regenerator + Natural Cure.",
    onCheckShow(pokemon2) {
      if (pokemon2.side.active.length === 1)
        return;
      if (pokemon2.showCure === true || pokemon2.showCure === false)
        return;
      const cureList = [];
      let noCureCount = 0;
      for (const curPoke of pokemon2.side.active) {
        if (!curPoke || !curPoke.status) {
          continue;
        }
        if (curPoke.showCure) {
          continue;
        }
        const species = curPoke.species;
        if (!Object.values(species.abilities).includes("Natural Cure") && !Object.values(species.abilities).includes("Natural Heal")) {
          continue;
        }
        if (!species.abilities["1"] && !species.abilities["H"]) {
          continue;
        }
        if (curPoke !== pokemon2 && !this.queue.willSwitch(curPoke)) {
          continue;
        }
        if (curPoke.hasAbility("naturalcure") || curPoke.hasAbility("naturalheal")) {
          cureList.push(curPoke);
        } else {
          noCureCount++;
        }
      }
      if (!cureList.length || !noCureCount) {
        for (const pkmn of cureList) {
          pkmn.showCure = true;
        }
      } else {
        this.add("-message", "(" + cureList.length + " of " + pokemon2.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Heal.)");
        for (const pkmn of cureList) {
          pkmn.showCure = false;
        }
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
      if (!pokemon2.status)
        return;
      if (pokemon2.showCure === void 0)
        pokemon2.showCure = true;
      if (pokemon2.showCure)
        this.add("-curestatus", pokemon2, pokemon2.status, "[from] ability: Natural Heal");
      pokemon2.setStatus("");
      if (!pokemon2.showCure)
        pokemon2.showCure = void 0;
    },
    flags: {}
  },
  overseeingmonarch: {
    name: "Overseeing Monarch",
    desc: "On switch-in, identifies foes' items; on switch-out, restores 1/3 max HP.",
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        if (target.item) {
          this.add("-item", target, target.getItem().name, "[from] ability: Overseeing Monarch", "[of] " + pokemon2, "[identify]");
        }
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    }
  },
  porousfat: {
    id: "porousfat",
    name: "Porous Fat",
    shortDesc: "Fire/Ice/Water moves against this Pokemon deal damage with a halved attacking stat.",
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Water") {
        this.debug("Porous Fat weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Water") {
        this.debug("Porous Fat weaken");
        return this.chainModify(0.5);
      }
    }
  },
  // set 3
  nullsystem: {
    id: "nullsystem",
    name: "Null System",
    shortDesc: "This Pokemon can be any type (selected in teambuilder)."
  },
  /*
  	inthicktrator: {
  		id: "inthicktrator",
  		name: "Inthicktrator",
  		shortDesc: "This Pokemon's moves ignore Screens/Substitutes/Abilities.",
  		onModifyMove(move, pokemon) {
  			///////////PLACEHOLDER FOR STURDY MOLD
  			let ignore = false;
  			for (const target of pokemon.side.foe.active) {
  				if (target.hasAbility('sturdymold')) {
  					ignore = true;
  					console.log("Target has Sturdy Mold");
  					return;
  				} else console.log("Target does not have Sturdy Mold");
  			}
  			if ((move.target === 'allAdjacentFoes' || move.target === 'allAdjacent') && ignore) return;
  			///////////END PLACEHOLDER
  			move.infiltrates = true;
  			move.ignoreAbility = true;
  		},
  	},
  */
  inthicktrator: {
    id: "inthicktrator",
    name: "Inthicktrator",
    shortDesc: "This Pokemon's moves ignore Screens/Substitutes/Resistance-based Abilities.",
    onModifyMove(move, pokemon2, target) {
      move.infiltrates = true;
      if (target.hasAbility(["gulprock", "fatfulfloat", "porousfat", "fridge"])) {
        move.ignoreAbility = true;
      }
    }
  },
  magicsurge: {
    id: "magicsurge",
    name: "Magic Surge",
    shortDesc: "Summons Magic Room for 5 turns when switching in.",
    onStart(source) {
      this.add("-activate", source, "ability: Magic Surge");
      this.field.addPseudoWeather("magicroom");
    },
    flags: {}
  },
  multiantlers: {
    id: "multiantlers",
    name: "Multi Antlers",
    shortDesc: "User takes half damage when switching in or at full HP.",
    onSourceModifyDamage(damage, source, target, move) {
      if (!target.activeTurns) {
        this.debug("Multi Antlers weaken");
        return this.chainModify(0.5);
      }
      if (target.hp >= target.maxhp) {
        this.debug("Multi Antlers weaken");
        return this.chainModify(0.5);
      }
    }
  },
  concussion: {
    // test
    id: "concussion",
    name: "Concussion",
    shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
    onStart(source) {
      let activated = false;
      for (const pokemon2 of source.side.foe.active) {
        if (!activated) {
          this.add("-ability", source, "Concussion");
        }
        activated = true;
        if (!pokemon2.volatiles["embargo"]) {
          pokemon2.addVolatile("embargo");
        }
      }
    },
    onAnySwitchIn(pokemon2) {
      const source = this.effectState.target;
      if (pokemon2 === source)
        return;
      for (const target of source.side.foe.active) {
        if (!target.volatiles["embargo"]) {
          target.addVolatile("embargo");
        }
      }
    },
    onEnd(pokemon2) {
      const source = this.effectState.target;
      for (const target of source.side.foe.active) {
        target.removeVolatile("embargo");
      }
    },
    rating: 4,
    num: 109
  },
  notfunny: {
    id: "notfunny",
    name: "Not Funny",
    shortDesc: "No Guard + Prankster.",
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
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
    flags: {}
  },
  fowlbehavior: {
    id: "fowlbehavior",
    name: "Fowl Behavior",
    shortDesc: "This Pokemon's Sp. Atk is 1.5x, but it can only select the first move it executes.",
    onStart(pokemon2) {
      pokemon2.abilityState.choiceLock = "";
    },
    onBeforeMove(pokemon2, target, move) {
      if (move.isZOrMaxPowered || move.id === "struggle")
        return;
      if (pokemon2.abilityState.choiceLock && pokemon2.abilityState.choiceLock !== move.id) {
        this.addMove("move", pokemon2, move.name);
        this.attrLastMove("[still]");
        this.debug("Disabled by Fowl Behavior");
        this.add("-fail", pokemon2);
        return false;
      }
    },
    onModifyMove(move, pokemon2) {
      if (pokemon2.abilityState.choiceLock || move.isZOrMaxPowered || move.id === "struggle")
        return;
      pokemon2.abilityState.choiceLock = move.id;
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, pokemon2, move) {
      if (pokemon2.volatiles["dynamax"])
        return;
      this.debug("Fowl Behavior Sp. Atk Boost");
      return this.chainModify(1.5);
    },
    onDisableMove(pokemon2) {
      if (!pokemon2.abilityState.choiceLock)
        return;
      if (pokemon2.volatiles["dynamax"])
        return;
      for (const moveSlot of pokemon2.moveSlots) {
        if (moveSlot.id !== pokemon2.abilityState.choiceLock) {
          pokemon2.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
        }
      }
    },
    onEnd(pokemon2) {
      pokemon2.abilityState.choiceLock = "";
    },
    flags: {}
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
      ) || pokemon2.species.id !== "yaciancrowned" && pokemon2.species.id !== "porygrigus" && pokemon2.species.id !== "porymask" && pokemon2.species.id !== "hatterune" && pokemon2.species.id !== "hatamaskgalar") {
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon2) {
      if (!pokemon2.isStarted || this.effectState.gaveUp || !this.effectState.switchingIn)
        return;
      const possibleTargets = pokemon2.foes().filter((foeActive) => foeActive && !foeActive.getAbility().flags["notrace"] && !foeActive.getAbility().flags["failskillswap"] && foeActive.isAdjacent(pokemon2));
      if (!possibleTargets.length)
        return;
      const rand = possibleTargets.length > 1 ? this.random(possibleTargets.length) : 0;
      const target = possibleTargets[rand];
      const pillageAbil = pokemon2.getAbility();
      const ability = target.getAbility();
      if (!this.runEvent("SetAbility", target, pokemon2, this.effect, pillageAbil) || !this.runEvent("SetAbility", pokemon2, pokemon2, this.effect, ability))
        return;
      this.add("-ability", pokemon2, "Pillage");
      this.add("-activate", pokemon2, "move: Skill Swap", ability, pillageAbil, "[of] " + target);
      this.singleEvent("End", pillageAbil, pillageAbil.abilityState, pokemon2);
      this.singleEvent("End", ability, ability.abilityState, target);
      pokemon2.ability = ability.id;
      pokemon2.abilityState = { id: this.toID(pokemon2.ability), target: pokemon2 };
      target.ability = pillageAbil.id;
      target.abilityState = { id: this.toID(pillageAbil.id), target };
      this.singleEvent("Start", ability, pokemon2.abilityState, pokemon2);
      this.singleEvent("Start", pillageAbil, target.abilityState, target);
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 }
  },
  /*
  	magneticwaves: {
  		id: "magneticwaves",
  		name: "Magnetic Waves",
  		shortDesc: "Normal moves: Electric type, 1.2x power. Immune to Ground moves.",
  		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded (via scripts.ts in this case)
  		onModifyTypePriority: -1,
  		onModifyType(move, pokemon) {
  			///////////PLACEHOLDER FOR STURDY MOLD
  			let ignore = false;
  			for (const target of pokemon.side.foe.active) {
  				if (target.hasAbility('sturdymold')) {
  					ignore = true;
  					return;
  				}
  			}
  			if ((move.target === 'allAdjacentFoes' || move.target === 'allAdjacent') && ignore) return;
  			///////////END PLACEHOLDER
  			const noModifyType = [
  				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
  			];
  			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
  				move.type = 'Electric';
  				move.galvanizeBoosted = true;
  			}
  		},
  		onBasePowerPriority: 23,
  		onBasePower(basePower, pokemon, target, move) {
  			if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
  		},
  		onTryHit(target, source, move) {
  			if (target !== source && move.type === 'Ground' && !source.hasAbility('aerialbreak') && !target.volatiles['smackdown'] ) {
  				this.add('-immune', target, '[from] ability: Magnetic Waves');
  				return null;
  			}
  		},
  	},
  */
  doggysmaw: {
    id: "doggysmaw",
    name: "Doggy's Maw",
    shortDesc: "This Pokemon's Normal, Fighting and Dragon moves ignore type-based immunities and this Pokemon's Normal-type moves deal 1.5x damage.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Normal") {
        this.debug("Doggy's Maw boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Normal") {
        this.debug("Doggy's Maw boost");
        return this.chainModify(1.5);
      }
    },
    onModifyMovePriority: -5,
    onModifyMove(move, pokemon2) {
      if ((move.ignoreImmunity || (move.ignoreImmunity = {})) !== true) {
        move.ignoreImmunity["Fighting"] = true;
        move.ignoreImmunity["Normal"] = true;
        move.ignoreImmunity["Dragon"] = true;
      }
    },
    onBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Doggy's Maw", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Doggy's Maw", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Doggy's Maw", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Doggy's Maw", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Doggy's Maw", "[of] " + target);
          }
          break;
      }
    }
  },
  // slate 5
  sturdymold: {
    // this one's gonna be a fucking adventure
    name: "Sturdy Mold",
    shortDesc: "Sturdy + Mold Breaker.",
    onTryHit(pokemon2, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon2, "[from] ability: Sturdy Mold");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect2) {
      if (target.hp === target.maxhp && damage >= target.hp && effect2 && effect2.effectType === "Move") {
        this.add("-ability", target, "Sturdy Mold");
        return target.hp - 1;
      }
    },
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Sturdy Mold");
    },
    onFoeBeforeMovePriority: 13,
    onFoeBeforeMove(attacker, defender, move) {
      attacker.addVolatile("sturdymold");
    },
    condition: {
      onAfterMove(pokemon2) {
        pokemon2.removeVolatile("sturdymold");
      }
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    }
    // I'm gonna figure out how to code this legit at some point, I swear,
    // but for now, since we have so few abilities,
    // I'm just gonna hard-code it into everything.
  },
  therapeutic: {
    id: "therapeutic",
    name: "Therapeutic",
    shortDesc: "Poison Heal effects. Upon losing its item, this Pokemon poisons itself.",
    onDamagePriority: 1,
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "psn" || effect2.id === "tox") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    onAfterUseItem(item, pokemon2) {
      if (pokemon2 !== this.effectState.target)
        return;
      pokemon2.trySetStatus("psn", pokemon2);
    },
    onTakeItem(item, pokemon2) {
      pokemon2.trySetStatus("psn", pokemon2);
    }
  },
  solarpanel: {
    id: "solarpanel",
    name: "Solar Panel",
    shortDesc: "If hit by Electric or Fire: +1 SpA; Electric/Fire immunity.",
    onTryHit(target, source, move) {
      if (target !== source && (move.type === "Electric" || move.type === "Fire")) {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Solar Panel");
        }
        return null;
      }
    }
  },
  scrappy: {
    inherit: true,
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Scrappy", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Scrappy", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Scrappy", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Scrappy", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Scrappy", "[of] " + target);
          }
          break;
      }
    }
  },
  bigpressure: {
    name: "Big Pressure",
    shortDesc: "Moves targeting this Pokemon lose 1 additional PP; Foes cannot lower its Defense.",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Big Pressure");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.def && boost.def < 0) {
        delete boost.def;
        if (!effect2.secondaries && effect2.id !== "octolock") {
          this.add("-fail", target, "unboost", "Defense", "[from] ability: Big Pecks", "[of] " + target);
        }
      }
    }
  },
  friendshield: {
    name: "Friend Shield",
    shortDesc: "Gets +1 Def and SpD on switch-in. Allies recieve 3/4 damage from foes' attacks.",
    onStart(pokemon2) {
      this.boost({ def: 1, spd: 1 }, pokemon2);
    },
    onAnyModifyDamage(damage, source, target, move) {
      if (target !== this.effectState.target && target.side === this.effectState.target.side) {
        this.debug("Friend Shield weaken");
        return this.chainModify(0.75);
      }
    }
  },
  debilitate: {
    name: "Debilitate",
    shortDesc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opponents by 1 stage.",
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Debilitate", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spa: -1 }, target, pokemon2, null, true);
        }
      }
    }
  },
  leafyarmor: {
    // unsure
    name: "Leafy Armor",
    shortDesc: "If a status condition is inflicted on this Pokemon: Cure status, -1 Defense, +2 Speed.",
    onUpdate(pokemon2) {
      if (pokemon2.status && !pokemon2.m.orbItemStatus) {
        this.add("-activate", pokemon2, "ability: Leafy Armor");
        pokemon2.cureStatus();
        this.boost({ def: -1, spe: 2 }, pokemon2, pokemon2);
      }
    }
  },
  surroundsound: {
    // unsure
    name: "Surround Sound",
    shortDesc: "This Pokemon recieves 1/2 damage from multitarget moves. Its own have 1.3x power.",
    onBasePowerPriority: 7,
    onBasePower(basePower, attacker, defender, move) {
      if (["allAdjacent", "allAdjacentFoes", "all"].includes(move.target)) {
        this.debug("Surround Sound boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (["allAdjacent", "allAdjacentFoes", "all"].includes(move.target)) {
        this.debug("Surround Sound weaken");
        return this.chainModify(0.5);
      }
    }
  },
  spikyhold: {
    name: "Spiky Hold",
    shortDesc: "Cannot lose held item due to others' attacks; others making contact lose 1/8 max HP.",
    onTakeItem(item, pokemon2, source) {
      if (this.suppressingAttackEvents(pokemon2) || !pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Spiky Hold");
        return false;
      }
    },
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    }
  },
  // slate 7
  sinkorswim: {
    name: "Sink or Swim",
    shortDesc: "On switch-in, lowers adjacent opponents' Speed by 1 stage.",
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Sink or Swim", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon2, null, true);
        }
      }
    }
  },
  downpour: {
    name: "Downpour",
    shortDesc: "If targeted by a foe's move: move loses 1 extra PP, this Pokemon restores 1/16 max HP.",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Downpour");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      this.heal(target.baseMaxhp / 16);
      return 1;
    },
    rating: 2.5,
    num: 46
  },
  /* //No longer in use
  overclock: {
  	name: "Overclock",
  	shortDesc: "If stats are lowered by foe or if hit by Electric move: Atk +2.",
  	onAfterEachBoost(boost, target, source, effect) {
  		if (!source || target.side === source.side) {
  			if (effect.id === 'stickyweb') {
  				this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant only affects stats lowered by foes.", true, source.side);
  			}
  			return;
  		}
  		let statsLowered = false;
  		let i: BoostName;
  		for (i in boost) {
  			if (boost[i]! < 0) {
  				statsLowered = true;
  			}
  		}
  		if (statsLowered) {
  			this.add('-ability', target, 'Overclock');
  			this.boost({atk: 2}, target, target, null, true);
  		}
  	},
  	onDamagingHit(damage, target, source, move) {
  		if (move.type === 'Electric') {
  			this.boost({atk: 2});
  		}
  	},
  },
  */
  magicmissile: {
    /*
    Need to test:
    - any Berry
    - Toxic Orb, Flame Orb or Light Ball (just one they're the same code)
    - White Herb
    - Mental Herb
    - um, I guess making sure Razor Claw or Razor Fang (just one they're the same code) doesn't immediately crash,
    but it would be basically impossible for them to cause a flinch in a singles context
    (how does this behave with Instruct? maybe you could test with that if you're doing the doubles format Aquatic mentioned)
    */
    name: "Magic Missile",
    shortDesc: "If hit by a contact move while holding an item: lose item, apply item Fling effects, attacker loses 1/4 max HP. If hitting a foe with a contact move while not holding an item: steals the foe's item.",
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (target !== source && move.category !== "Status") {
        if (source.item || source.volatiles["gem"] || move.id === "fling")
          return;
        const yourItem = target.takeItem(source);
        if (!yourItem)
          return;
        if (!source.setItem(yourItem)) {
          target.item = yourItem.id;
          return;
        }
        this.add("-item", source, yourItem, "[from] ability: Magic Missile", "[of] " + target);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (target.isSemiInvulnerable())
        return;
      if (target.ignoringItem())
        return false;
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemData, target, target, move, item))
        return false;
      if (item.id && !item.megaStone) {
        this.damage(source.baseMaxhp / 4, source, target);
        target.addVolatile("fling");
        if (item.is) {
          if (this.singleEvent("Eat", item, null, source, null, null)) {
            this.runEvent("EatItem", source, null, null, item);
            if (item.id === "leppaberry")
              source.staleness = "external";
          }
          if (item.onEat)
            source.ateBerry = true;
        } else if (item.id === "mentalherb") {
          const conditions = ["attract", "taunt", "encore", "torment", "disable", "healblock"];
          for (const firstCondition of conditions) {
            if (source.volatiles[firstCondition]) {
              for (const secondCondition of conditions) {
                source.removeVolatile(secondCondition);
                if (firstCondition === "attract" && secondCondition === "attract") {
                  this.add("-end", source, "move: Attract", "[from] item: Mental Herb");
                }
              }
              return;
            }
          }
        } else if (item.id === "whiteherb") {
          let activate = false;
          const boosts = {};
          let i;
          for (i in source.boosts) {
            if (source.boosts[i] < 0) {
              activate = true;
              boosts[i] = 0;
            }
          }
          if (activate) {
            source.setBoost(boosts);
            this.add("-clearnegativeboost", source, "[silent]");
          }
        } else {
          if (item.fling && item.fling.status) {
            source.trySetStatus(item.fling.status, target);
          } else if (item.fling && item.fling.volatileStatus) {
            source.addVolatile(item.fling.volatileStatus, target);
          }
        }
      }
    }
  },
  // slate 8
  fatproof: {
    name: "Fat Proof",
    shortDesc: "Ice, Fire attacks against this Pokemon use a halved attack stat; Fire moves 1/2 BP.",
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire") {
        this.debug("Fat Proof weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire") {
        this.debug("Fat Proof weaken");
        return this.chainModify(0.5);
      }
    },
    onDamage(damage, target, source, effect2) {
      if (effect2 && effect2.id === "brn") {
        return damage / 2;
      }
    }
  },
  leviflame: {
    name: "Leviflame",
    shortDesc: "30% chance a Pokemon making contact with this Pokemon will be burned. Immune to Ground.",
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("brn", target);
        }
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground" && !source.hasAbility("aerialbreak") && !target.volatiles["smackdown"] && !this.field.getPseudoWeather("gravity")) {
        this.add("-immune", target, "[from] ability: Leviflame");
        return null;
      }
    }
  },
  prophylaxis: {
    name: "Prophylaxis",
    shortDesc: "Regenerator + Anticipation.",
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        for (const moveSlot of target.moveSlots) {
          const move = this.dex.moves.get(moveSlot.move);
          if (move.category === "Status")
            continue;
          const moveType = move.id === "hiddenpower" ? target.hpType : move.type;
          if (this.dex.getImmunity(moveType, pokemon2) && this.dex.getEffectiveness(moveType, pokemon2) > 0 || move.ohko) {
            this.add("-ability", pokemon2, "Prophylaxis");
            return;
          }
        }
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    }
  },
  feelnopain: {
    name: "Feel No Pain",
    shortDesc: "Poison Heal + Levitate",
    onDamagePriority: 1,
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "psn" || effect2.id === "tox") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground" && !source.hasAbility("aerialbreak") && !target.volatiles["smackdown"] && !this.field.getPseudoWeather("gravity")) {
        this.add("-immune", target, "[from] ability: Feel No Pain");
        return null;
      }
    }
  },
  erosion: {
    name: "Erosion",
    shortDesc: "Sand Stream + Lightning Rod.",
    onStart(source) {
      this.field.setWeather("sandstorm");
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Erosion");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Electric" || move.flags["pledgecombo"])
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Lightning Rod");
        }
        return this.effectState.target;
      }
    },
    flags: { breakable: 1 }
  },
  statusabsorbtion: {
    name: "Status Absorbtion",
    shortDesc: "Water Veil + Immunity.",
    onUpdate(pokemon2) {
      if (["tox", "brn", "psn"].includes(pokemon2.status)) {
        this.add("-activate", pokemon2, "ability: Status Absorbtion");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (!["tox", "brn", "psn"].includes(pokemon.status))
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Status Absorbtion");
      }
      return false;
    }
  },
  levitability: {
    name: "Levitability",
    shortDesc: "STAB moves are boosted an additional 1.5x; immune to Ground.",
    onModifySTAB(stab, source, target, move) {
      if (move.forceSTAB || source.hasType(move.type)) {
        if (stab === 2) {
          return 3;
        }
        return 2.25;
      }
    }
  },
  // Implement immunity for Intimidate clones:
  oblivious: {
    inherit: true,
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Oblivious", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Oblivious", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Oblivious", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Oblivious", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Oblivious", "[of] " + target);
          }
          break;
      }
    }
  },
  owntempo: {
    inherit: true,
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Own Tempo", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
      }
    }
  },
  rattled: {
    inherit: true,
    onAfterBoost(boost, target, source, effect2) {
      if (!effect2)
        return;
      let boosted = false;
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            boosted = true;
            break;
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            boosted = true;
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            boosted = true;
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Own Tempo", "[of] " + target);
          }
          break;
      }
      if (effect2 && ["intimidate", "debilitate", "sinkorswim", "scarilyadorable", "peckingorder"].includes(effect2.id)) {
        this.boost({ spe: 1 });
      }
    }
  },
  // new slate
  chivalry: {
    shortDesc: "For each stat lowered by a foe: +2 Atk, +1 Spe.",
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      for (const i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered) {
        this.add("-ability", target, "Chivalry");
        this.boost({ atk: 2, spe: 1 }, target, target, null, true);
      }
    },
    name: "Chivalry"
  },
  hauntedtech: {
    shortDesc: "Moves 60 power or less: 1.5x power. If hit by an attack, 30% chance to disable that move.",
    name: "Haunted Tech",
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      if (defender.hasAbility("sturdymold"))
        return;
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Technician boost");
        return this.chainModify(1.5);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isFutureMove) {
        if (this.randomChance(3, 10)) {
          source.addVolatile("disable", this.effectState.target);
        }
      }
    }
  },
  stickyfloat: {
    // Groundedness implemented in scripts.ts
    onTakeItem(item, pokemon2, source) {
      if (this.suppressingAttackEvents(pokemon2) || !pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Sticky Float");
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground" && !source.hasAbility("aerialbreak") && !target.volatiles["smackdown"] && !this.field.getPseudoWeather("gravity")) {
        this.add("-immune", target, "[from] ability: Sticky Float");
        return null;
      }
    },
    name: "Sticky Float",
    shortDesc: "Effects of Sticky Hold + Levitate"
  },
  terrorizer: {
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isMax && !move.flags["futuremove"] && move.id !== "struggle" && this.randomChance(3, 10)) {
        source.addVolatile("disable", this.effectState.target);
      }
    },
    name: "Terrorizer",
    shortDesc: "Sheer Force + Cursed Body"
  },
  darkhumour: {
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    onTryHit(target, source, move) {
      if (source && target === source || move.category !== "Status")
        return;
      this.add("-ability", target, "Dark Humour");
      this.boost({ atk: 1 }, target, target, null, true);
    },
    flags: { breakable: 1 },
    name: "Dark Humour",
    shortDesc: "Status moves +1 priority. If targeted by a status move, +1 Atk."
  },
  speedy: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ spe: length2 }, source);
      }
    },
    flags: {},
    name: "Speedy",
    shortDesc: "Speed raises by 1 stage if it attacks and KO's another Pokemon."
  },
  ultrahealth: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.add("-activate", source, "ability: Ultra Health");
        this.heal(source.baseMaxhp / 3, source, source, effect2);
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    flags: {},
    name: "Ultra Health",
    shortDesc: "On switching out or landing a KO, heal for 1/3 max HP."
  },
  dustdevil: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        move.accuracy = true;
        if (!target.addVolatile("dustdevil")) {
          this.add("-immune", target, "[from] ability: Dust Devil");
        }
        return null;
      }
    },
    onEnd(pokemon2) {
      pokemon2.removeVolatile("dustdevil");
    },
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(target) {
        this.add("-ability", target, "Dust Devil");
        this.add("-start", target, "Flash Fire", "[silent]");
        this.add("-message", `The power of ${target.name}'s Fire-type moves rose!`);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, attacker, defender, move) {
        if (move.type === "Fire" && attacker.hasAbility("dustdevil")) {
          this.debug("Dust Devil boost");
          return this.chainModify(1.5);
        }
      },
      onModifySpAPriority: 5,
      onModifySpA(atk, attacker, defender, move) {
        if (move.type === "Fire" && attacker.hasAbility("dustdevil")) {
          this.debug("Dust Devil boost");
          return this.chainModify(1.5);
        }
      },
      onEnd(target) {
        this.add("-end", target, "ability: Flash Fire", "[silent]");
      }
    },
    onModifySpe(spe, pokemon2) {
      if (this.field.isWeather("sandstorm")) {
        return this.chainModify(2);
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "sandstorm")
        return false;
    },
    flags: { breakable: 1 },
    name: "Dust Devil",
    shortDesc: "Sand Rush + Flash Fire."
  },
  solidskill: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0 || move.multihit) {
        this.debug("Solid Skill neutralize");
        return this.chainModify(0.75);
      }
    },
    name: "Solid Skill",
    flags: { breakable: 1 },
    shortDesc: "3/4 damage from super-effective and multihit moves."
  },
  modeshift: {
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Sableior" || pokemon2.transformed)
        return;
      if (pokemon2.species.forme !== "Meteor") {
        pokemon2.formeChange("Sableior-Meteor");
      } else if (pokemon2.species.forme === "Meteor") {
        pokemon2.formeChange(pokemon2.set.species);
      }
    },
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (attacker.species.baseSpecies !== "Sableior" || attacker.transformed)
        return;
      const targetForme = move.category === "Status" ? "Sableior-Meteor" : "Sableior";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
      if (attacker.canMegaEvo) {
        attacker.canMegaEvo = targetForme === "Sableior-Meteor" ? "sableiormeteormega" : "sableiormega";
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Mode Shift",
    shortDesc: "Status moves +1 priority. Changes to Meteor Form before using a status move."
  },
  lemegeton: {
    // Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
    // TODO Will abilities that already started start again? (Intimidate seems like a good test case)
    onPreStart(pokemon2) {
      this.add("-ability", pokemon2, "Lemegeton");
      pokemon2.abilityState.ending = false;
      for (const target of this.getAllActive()) {
        if (target.illusion) {
          this.singleEvent("End", this.dex.abilities.get("Illusion"), target.abilityState, target, pokemon2, "lemegeton");
        }
        if (target.volatiles["slowstart"]) {
          delete target.volatiles["slowstart"];
          this.add("-end", target, "Slow Start", "[silent]");
        }
      }
    },
    onEnd(source) {
      source.abilityState.ending = true;
      for (const pokemon2 of this.getAllActive()) {
        if (pokemon2 !== source) {
          this.singleEvent("Start", pokemon2.getAbility(), pokemon2.abilityState, pokemon2);
        }
      }
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        let statName = "atk";
        let bestStat = 0;
        let s;
        for (s in source.storedStats) {
          if (source.storedStats[s] > bestStat) {
            statName = s;
            bestStat = source.storedStats[s];
          }
        }
        this.boost({ [statName]: length2 }, source);
      }
    },
    name: "Lemegeton",
    shortDesc: "Beast Boost + Neutralizing Gas"
  },
  // a
  magicbeast: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target === source || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, target, source);
      return null;
    },
    onAllyTryHitSide(target, source, move) {
      if (target.side === source.side || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, this.effectState.target, source);
      return null;
    },
    condition: {
      duration: 1
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        const bestStat = source.getBestStat(true, true);
        this.boost({ [bestStat]: length2 }, source);
      }
    },
    flags: { breakable: 1 },
    name: "Magic Beast",
    shortDesc: "Magic Bounce + Beast Boost."
  },
  soundneigh: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ atk: length2 }, source);
      }
    },
    onTryHit(target, source, move) {
      if (move.target !== "self" && move.flags["sound"]) {
        this.add("-immune", target, "[from] ability: Sound Neigh");
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (move.flags["sound"]) {
        this.add("-immune", this.effectState.target, "[from] ability: Sound Neigh");
      }
    },
    flags: { breakable: 1 },
    name: "Sound Neigh",
    shortDesc: "Chilling Neigh + Soundproof."
  },
  ecopy: {
    onStart(pokemon2) {
      this.field.setTerrain("electricterrain");
      if (pokemon2.side.foe.active.some(
        (foeActive) => foeActive && pokemon2.isAdjacent(foeActive) && foeActive.ability === "noability"
      )) {
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon2) {
      if (!pokemon2.isStarted || this.effectState.gaveUp)
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
          "imposter",
          "neutralizinggas",
          "powerofalchemy",
          "receiver",
          "trace",
          "zenmode",
          "magicmissile",
          "pillage",
          "ecopy",
          "lemegeton",
          "modeshift"
        ];
        if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
          possibleTargets.splice(rand, 1);
          continue;
        }
        this.add("-ability", pokemon2, ability, "[from] ability: E-Copy", "[of] " + target);
        pokemon2.setAbility(ability);
        return;
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
    name: "E-Copy",
    shortDesc: "Sets Electric Terrain, and then copies the foe's Ability."
  },
  trace: {
    onStart(pokemon2) {
      if (pokemon2.side.foe.active.some(
        (foeActive) => foeActive && pokemon2.isAdjacent(foeActive) && foeActive.ability === "noability"
      )) {
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon2) {
      if (!pokemon2.isStarted || this.effectState.gaveUp)
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
          "imposter",
          "neutralizinggas",
          "powerofalchemy",
          "receiver",
          "trace",
          "zenmode",
          "magicmissile",
          "pillage",
          "ecopy",
          "lemegeton",
          "modeshift"
        ];
        if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
          possibleTargets.splice(rand, 1);
          continue;
        }
        this.add("-ability", pokemon2, ability, "[from] ability: Trace", "[of] " + target);
        pokemon2.setAbility(ability);
        return;
      }
    },
    name: "Trace",
    rating: 2.5,
    num: 36
  },
  wetbugs: {
    onStart(source) {
      for (const action of this.queue) {
        if (action.choice === "runPrimal" && action.pokemon === source && source.species.id === "kyottler")
          return;
        if (action.choice !== "runSwitch" && action.choice !== "runPrimal")
          break;
      }
      this.field.setWeather("raindance");
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Bug" && attacker.hp <= attacker.maxhp / 3) {
        if (defender.hasAbility("sturdymold"))
          return;
        this.debug("Swarm boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Bug" && attacker.hp <= attacker.maxhp / 3) {
        if (defender.hasAbility("sturdymold"))
          return;
        this.debug("Swarm boost");
        return this.chainModify(1.5);
      }
    },
    name: "Wet Bugs",
    shortDesc: "Drizzle + Swarm."
  },
  hydrauliccannon: {
    onModifySpe(spe, pokemon2) {
      if (["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (defender.hasAbility("sturdymold"))
        return;
      if (move.flags["pulse"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Hydraulic Cannon",
    shortDesc: "Mega Launcher + Swift Swim."
  },
  battletheme: {
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (attacker.species.baseSpecies !== "Meloslash" || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      const targetForme = move.secondaries || move.id === "kingsshield" ? "Meloslash" : "Meloslash-Melee";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
      if (move.id === "relicsong") {
        move.willChangeForme = true;
      }
    },
    onAfterMoveSecondarySelf(pokemon2, target, move) {
      if (move.willChangeForme) {
        pokemon2.formeChange("Meloslash-Melee");
      }
    },
    onModifyMovePriority: -2,
    onModifyMove(move) {
      if (move.secondaries) {
        this.debug("doubling secondary chance");
        for (const secondary of move.secondaries) {
          if (secondary.chance)
            secondary.chance *= 2;
        }
      }
      if (move.self?.chance)
        move.self.chance *= 2;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Battle Theme",
    shortDesc: "Meloslash: change forme to Range before using move with secondary, change form to Melee otherwise. Secondary effect chances are doubled."
  },
  flashyjokes: {
    shortDesc: "Flash Fire + Prankster.",
    name: "Flashy Jokes",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        move.accuracy = true;
        if (!target.addVolatile("flashyjokes")) {
          this.add("-immune", target, "[from] ability: Flashy Jokes");
        }
        return null;
      }
    },
    onEnd(pokemon2) {
      pokemon2.removeVolatile("flashyjokes");
    },
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(target) {
        this.add("-ability", target, "Flashy Jokes");
        this.add("-start", target, "Flash Fire", "[silent]");
        this.add("-message", `The power of ${target.name}'s Fire-type moves rose!`);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, attacker, defender, move) {
        if (move.type === "Fire" && attacker.hasAbility("flashyjokes")) {
          this.debug("Flashy Jokes boost");
          return this.chainModify(1.5);
        }
      },
      onModifySpAPriority: 5,
      onModifySpA(atk, attacker, defender, move) {
        if (move.type === "Fire" && attacker.hasAbility("flashyjokes")) {
          this.debug("Flashy Jokes boost");
          return this.chainModify(1.5);
        }
      },
      onEnd(target) {
        this.add("-end", target, "ability: Flash Fire", "[silent]");
      }
    },
    flags: {}
  },
  teachingtech: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      if (defender.hasAbility("sturdymold"))
        return;
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Technician boost");
        return this.chainModify(1.5);
      }
    },
    onSourceHit(target, source, move) {
      if (!move || !target || move.category === "Status")
        return;
      console.log("Teaching Tech: Move BP = " + move.basePower);
      const targetAbility = target.getAbility();
      if (targetAbility.isPermanent || targetAbility.id === "teachingtech")
        return;
      if (move.basePower <= 60) {
        const oldAbility = target.setAbility("teachingtech", source);
        if (oldAbility) {
          this.add("-activate", source, "ability: Teaching Tech");
          this.add("-activate", target, "ability: Teaching Tech");
        }
      }
    },
    flags: {},
    name: "Teaching Tech",
    shortDesc: "Moves <=60 BP: 1.5x power. If hitting something with such a move: changes their ability to Teaching Tech."
  },
  scrappyarmor: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if ((move.ignoreImmunity || (move.ignoreImmunity = {})) !== true) {
        move.ignoreImmunity["Fighting"] = true;
        move.ignoreImmunity["Normal"] = true;
      }
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Scrappy Armor", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Scrappy Armor", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Scrappy Armor", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Scrappy Armor", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Scrappy Armor", "[of] " + target);
          }
          break;
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical") {
        this.boost({ def: -1, spe: 2 }, target, target);
      }
    },
    flags: {},
    name: "Scrappy Armor",
    shortDesc: "Scrappy + Weak Armor"
  },
  olfactoryarmor: {
    onFoeTrapPokemon(pokemon2) {
      if (pokemon2.hasType("Steel") && pokemon2.isAdjacent(this.effectState.target)) {
        pokemon2.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
      if (!(source || (source = this.effectState.target)) || !pokemon2.isAdjacent(source))
        return;
      if (!pokemon2.knownType || pokemon2.hasType("Steel")) {
        pokemon2.maybeTrapped = true;
      }
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        this.debug("Prism Armor neutralize");
        return this.chainModify(0.75);
      }
    },
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Steel") {
        return this.chainModify(0.75);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Steel") {
        return this.chainModify(0.75);
      }
    },
    flags: {},
    name: "Olfactory Armor",
    shortDesc: "Traps Steels + Takes 3/4 damage from Super Effective and Steel-type attacks."
  },
  gutsyjaw: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Gutsy Jaw",
    shortDesc: "Guts + Strong Jaw"
  },
  finalargument: {
    onStart(source) {
      this.field.setTerrain("psychicterrain");
    },
    onSwitchOut(source) {
      this.field.setTerrain("psychicterrain");
    },
    flags: {},
    name: "Final Argument",
    shortDesc: "Summons Psychic Terrain when switched in or out."
  },
  mosscoat: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Grass" && !this.field.isTerrain("grassyterrain")) {
        this.debug("Moss Coat boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (!move.type === "Grass" && !this.field.isTerrain("grassyterrain")) {
        this.debug("Moss Coat boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (this.field.isTerrain("grassyterrain"))
        return;
      if (move.id === "earthquake" || move.id === "magnitude" || move.id === "bulldoze") {
        return this.chainModify(0.5);
      }
    },
    onResidualOrder: 5,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      if (!this.field.isTerrain("grassyterrain"))
        this.heal(pokemon2.maxhp / 16);
    },
    onTerrain(pokemon2) {
      if (!this.field.isTerrain("grassyterrain"))
        this.heal(pokemon2.maxhp / 16);
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Moss Coat",
    shortDesc: "This Pokemon is considered to be under the effects of Grassy Terrain."
  },
  toxicplay: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Toxic Play");
      this.add("-message", pokemon2.name + ` breaks the mold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    flags: {},
    name: "Toxic Play",
    shortDesc: "Mold Breaker + Corrosion."
  },
  covertops: {
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Covert Ops only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          this.boost({ spa: 2 }, target, target, null, false, true);
          return;
        }
      }
    },
    onModifyMove(move) {
      move.infiltrates = true;
    },
    flags: {},
    name: "Covert Ops",
    shortDesc: "Infiltrator + Competitive."
  },
  deluge: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Deluge");
        }
        return null;
      }
    },
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        return this.chainModify([5325, 4096]);
      }
    },
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        return this.chainModify([5325, 4096]);
      }
    },
    flags: { breakable: 1 },
    name: "Deluge",
    shortDesc: "Water Absorb effects. This Pokemon's Water moves have 1.3x power."
  },
  contraryboost: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        let success = false;
        let i;
        for (i in source.boosts) {
          if (source.boosts[i] === 0)
            continue;
          source.boosts[i] = -source.boosts[i];
          success = true;
        }
        if (!success)
          return false;
        this.add("-invertboost", source, "[from] ability: Contrary Boost");
      }
    },
    flags: {},
    name: "Contrary Boost",
    shortDesc: "Reverses stat changes after attacking and KOing a Pokemon."
  },
  itemboost: {
    onAfterUseItem(item, pokemon2) {
      if (pokemon2 === this.effectState.target)
        pokemon2.addVolatile("unburden");
    },
    onTakeItem(item, pokemon2) {
      pokemon2.addVolatile("unburden");
    },
    onEnd(pokemon2) {
      pokemon2.removeVolatile("unburden");
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      var _a;
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ [(_a = this.effectState).bestStat || (_a.bestStat = source.getBestStat(true, true))]: length2 }, source);
      }
    },
    flags: {},
    name: "Item Boost",
    shortDesc: "Unburden + Beast Boost."
  },
  ultrascout: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Ultra Scout");
          activated = true;
        }
        const bestStat = target.getBestStat(true, true);
        const targetAppearance = target.illusion || target;
        const statNames = {
          "atk": "Attack",
          "def": "Defense",
          "spa": "Special Attack",
          "spd": "Special Defense",
          "spe": "Speed"
        };
        this.add("-message", `${targetAppearance.name} is most proficient in ${statNames[bestStat]}!`);
      }
    },
    name: "Ultra Scout",
    rating: 1.5,
    flags: { breakable: 1 },
    shortDesc: "On switch-in, this Pokemon identifies the foe's highest stat."
  },
  scarilyadorable: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Scarily Adorable", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ atk: -1, spe: -1 }, target, pokemon2, null, true);
        }
      }
    },
    flags: {},
    name: "Scarily Adorable",
    shortDesc: "On switch-in, this Pokemon lowers the Attack and Speed of adjacent opponents by 1 stage."
  },
  solarboiler: {
    onTryHit(target, source, move) {
      if (target !== source && (move.type === "Water" || move.type === "Fire")) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Solar Boiler");
        }
        return null;
      }
    },
    onWeather(target, source, effect2) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect2.id === "raindance" || effect2.id === "primordialsea") {
        this.heal(target.baseMaxhp / 8);
      }
    },
    onModifySpe(spe, pokemon2) {
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(4);
      }
    },
    flags: { breakable: 1 },
    name: "Solar Boiler",
    shortDesc: "immune to Water and Fire-type attacks, heals 25% when hit by one; Heals 12.5% per turn in Rain; Has 4x Spe in Sun."
  },
  voltophyll: {
    onTryHit(target, source, move) {
      if (target !== source && (move.type === "Electric" || move.type === "Fire")) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Voltophyll");
        }
        return null;
      }
    },
    onModifySpe(spe, pokemon2) {
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    flags: { breakable: 1 },
    name: "Voltophyll",
    shortDesc: "2x Speed in Sun; Heals 25% when hit by a Fire or Electric move; Fire/Electric immunity"
  },
  weatherpower: {
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon2) {
      if (["sunnyday", "desolateland", "raindance", "primordialsea", "hail", "sandstorm", "deltastream"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onWeather(target, source, effect2) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect2.id === "sunnyday" || effect2.id === "desolateland" || effect2.id === "raindance" || effect2.id === "primordialsea" || effect2.id === "hail" || effect2.id === "sandstorm" || effect2.id === "deltastream") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: {},
    name: "Weather Power",
    shortDesc: "1.5x SpA while under any weather. User loses 12.5% of its HP in any weather."
  },
  plotarmor: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.recoil || move.hasCrashDamage) {
        this.debug("Plot Armor boost");
        return this.chainModify([4915, 4096]);
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect2) {
      if (damage >= target.hp && effect2 && (effect2.id === "recoil" || (effect2.id === "jumpkick" || effect2.id === "highjumpkick") && source === target)) {
        this.add("-ability", target, "Plot Armor");
        return target.hp - 1;
      }
    },
    flags: {},
    name: "Plot Armor",
    shortDesc: "Reckless + If this Pokemon would faint due to recoil or crash damage, it will instead survive with 1 HP."
  },
  reversegear: {
    name: "Reverse Gear",
    onChangeBoost(boost) {
      if (effect && effect.id === "zpower")
        return;
      if (boost.spe)
        boost.spe *= -1;
    },
    flags: { breakable: 1 },
    shortDesc: "Stat boosts to the Speed stat are inversed."
  },
  innerfocus: {
    inherit: true,
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Inner Focus", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Inner Focus", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Inner Focus", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Inner Focus", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Inner Focus", "[of] " + target);
          }
          break;
      }
    },
    name: "Inner Focus"
  },
  fairygust: {
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
        move.type = "Fairy";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.type === "Flying" && pokemon2.hp === pokemon2.maxhp)
        return priority + 1;
    },
    flags: {},
    name: "Fairy Gust",
    shortDesc: "Pixilate + Gale Wings."
  },
  leafstream: {
    onSetStatus(status, target, source, effect2) {
      if (["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        if (effect2?.status) {
          this.add("-immune", target, "[from] ability: Leaf Stream");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Leaf Stream");
        return null;
      }
    },
    onStart(source) {
      for (const action of this.queue) {
        if (action.choice === "runPrimal" && action.pokemon === source && source.species.id === "groudon")
          return;
        if (action.choice !== "runSwitch" && action.choice !== "runPrimal")
          break;
      }
      this.field.setWeather("sunnyday");
    },
    flags: { breakable: 1 },
    name: "Leaf Stream",
    shortDesc: "Leaf Guard + Summons Sunny Day on switch-in."
  },
  jawofthelaw: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        return this.chainModify(1.5);
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender) {
      if (!defender.activeTurns) {
        this.debug("Jaw of the Law boost");
        return this.chainModify(2);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender) {
      if (!defender.activeTurns) {
        this.debug("Jaw of the Law boost");
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Jaw of the Law",
    shortDesc: "Strong Jaw + Stakeout."
  },
  mystic: {
    onStart(source) {
      this.field.setTerrain("mistyterrain");
    },
    // The rest is implemented in moves.ts
    flags: {},
    name: "Mystic",
    shortDesc: "Misty Surge + This Pokemon's moves ignore the effects of Misty Terrain."
  },
  peckingorder: {
    name: "Pecking Order",
    shortDesc: "On switch-in, this Pokemon lowers the Defense of adjacent opponents by 1 stage.",
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Pecking Order", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ def: -1 }, target, pokemon2, null, true);
        }
      }
    },
    flags: {}
  },
  marblegarden: {
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    onAllyBoost(boost, target, source, effect2) {
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
      if (showMsg && !effect2.secondaries) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Marble Garden", "[of] " + effectHolder);
      }
    },
    onAllySetStatus(status, target, source, effect2) {
      if (source && target !== source && effect2 && effect2.id !== "yawn") {
        this.debug("interrupting setStatus with Marble Garden");
        if (effect2.id === "synchronize" || effect2.effectType === "Move" && !effect2.secondaries) {
          const effectHolder = this.effectState.target;
          this.add("-block", target, "ability: Marble Garden", "[of] " + effectHolder);
        }
        return null;
      }
    },
    onAllyTryAddVolatile(status, target) {
      if (status.id === "yawn") {
        this.debug("Marble Garden blocking yawn");
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Marble Garden", "[of] " + effectHolder);
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Marble Garden",
    shortDesc: "Protects the user from Recoil and status infliction/stat reduction from other Pok\xE9mon."
  },
  devilsadvocate: {
    onPreStart(pokemon2) {
      this.add("-ability", pokemon2, "Unnerve");
      this.effectState.unnerved = true;
    },
    onStart(pokemon2) {
      if (this.effectState.unnerved)
        return;
      this.add("-ability", pokemon2, "Unnerve");
      this.effectState.unnerved = true;
    },
    onEnd() {
      this.effectState.unnerved = false;
    },
    onFoeTryEatItem() {
      return !this.effectState.unnerved;
    },
    onChangeBoost(boost, target, source, effect2) {
      if (effect2 && effect2.id === "zpower")
        return;
      let i;
      for (i in boost) {
        boost[i] *= -1;
      }
    },
    flags: { breakable: 1 },
    name: "Devil's Advocate",
    shortDesc: "Unnerve + Contrary"
  },
  snowglobe: {
    onStart(source) {
      this.field.setWeather("hail");
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather("hail")) {
        if (["Rock", "Ground", "Steel"].includes(move.type)) {
          this.debug("Snow Globe boost");
          return this.chainModify([5325, 4096]);
        }
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "hail")
        return false;
    },
    flags: {},
    name: "Snow Globe",
    shortDesc: "Summons Hail on switch-in. Steel, Ground, and Rock moves deal 1.3x damage in Hail; Hail immunity."
  },
  bugscicle: {
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
      if (move.type === "Bug" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status")) {
        move.type = "Ice";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Bugscicle",
    shortDesc: "This Pok\xE9mon's Bug-Type moves become Ice-Type and deal 1.2x damage."
  },
  magicfist: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (!attacker.item) {
        this.debug("Magic Fist boost");
        return this.chainModify([4915, 4096]);
      }
    },
    flags: {},
    name: "Magic Fist",
    shortDesc: "If this Pokemon has no item, its attacks have 1.2x power."
  },
  sandbubbler: {
    onStart(source) {
      this.field.setWeather("sandstorm");
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Sand Bubbler boost");
        return this.chainModify([4915, 4096]);
      }
    },
    flags: {},
    name: "Sand Bubbler",
    shortDesc: "Sand Stream + Iron Fist."
  },
  bombardier: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bullet"]) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Bombardier",
    shortDesc: "Bullet and Bomb moves have 1.5x power."
  },
  asonekecleon: {
    onPreStart(pokemon2) {
      this.add("-ability", pokemon2, "As One");
      this.add("-ability", pokemon2, "Unnerve", pokemon2.side.foe);
    },
    onFoeTryEatItem: false,
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ spa: length2 }, source, source, this.dex.abilities.get("grimneigh"));
      }
    },
    onAfterMoveSecondary(target, source, move) {
      if (!target.hp)
        return;
      const type = move.type;
      if (target.isActive && move.effectType === "Move" && move.category !== "Status" && type !== "???" && !target.hasType(type)) {
        if (!target.setType(type))
          return false;
        this.add("-start", target, "typechange", type, "[from] ability: Color Change");
        if (target.side.active.length === 2 && target.position === 1) {
          const action = this.queue.willMove(target);
          if (action && action.move.id === "curse") {
            action.targetLoc = -1;
          }
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "As One (Kecleon)",
    shortDesc: "As One (Spectrier) + Color Change."
  },
  heavyarmor: {
    onTryBoost(boost, target, source, effect2) {
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
      if (showMsg && !effect2.secondaries && effect2.id !== "octolock") {
        this.add("-fail", target, "unboost", "[from] ability: Heavy Armor", "[of] " + target);
      }
    },
    onCriticalHit: false,
    flags: { breakable: 1 },
    name: "Heavy Armor",
    shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages. This Pokemon cannot be struck by a critical hit."
  },
  magicwand: {
    onModifyMove(move) {
      delete move.flags["contact"];
    },
    onDamage(damage, target, source, effect2) {
      if (effect2.effectType !== "Move") {
        if (effect2.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect2.name);
        return false;
      }
    },
    flags: {},
    name: "Magic Wand",
    shortDesc: "Long Reach + Magic Guard"
  },
  sportsshowtime: {
    onPrepareHit(source, target, move) {
      if (move.hasBounced)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Sports Showtime");
        this.heal(source.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Sports Showtime",
    shortDesc: "Changes to the type of its used move and heals 1/16 of its max HP before dealing damage"
  },
  firestarter: {
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("brn", target);
        }
      }
    },
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (this.checkMoveMakesContact(move, target, source)) {
        if (this.randomChance(3, 10)) {
          target.trySetStatus("brn", source);
        }
      }
    },
    flags: {},
    name: "Fire Starter",
    shortDesc: "30% chance to burn opponent when using a contact move or when the opponent makes contact with this Pokemon"
  },
  parasomnia: {
    shortDesc: "Upon landing a KO or falling asleep, highest stat +1.",
    name: "Parasomnia",
    onSourceFaint(target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ [source.getBestStat(true, true)]: length }, source);
      }
    },
    onAfterSetStatus(status, target, source, effect2) {
      if (status.id === "slp") {
        this.boost({ [target.getBestStat(true, true)]: length }, target);
      }
    },
    flags: {}
  },
  willfulcharge: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Willful Charge");
        }
        return null;
      }
    },
    onModifyMove(move) {
      if (move.type === "Electric") {
        move.ignoreDefensive = true;
        move.ignoreEvasion = true;
      }
    },
    flags: { breakable: 1 },
    name: "Willful Charge",
    shortDesc: "Ignores opponent\u2019s stat changes when doing damage with Electric-type moves and recovers 1/4 max HP when hit by an electric type move; Electric immunity."
  },
  sheerheart: {
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.category === "Special")
        return this.chainModify([5325, 4096]);
    },
    onBoost(boost, target, source, effect2) {
      if (boost.spa && (boost.spa < 0 || boost.spa > 0)) {
        delete boost.spa;
        if (!effect2.secondaries) {
          this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Sheer Heart", "[of] " + target);
        }
      }
    },
    name: "Sheer Heart",
    shortDesc: "Special attacks have 1.3x power; stat changes to the Special Attack stat have no effect."
  },
  berrynice: {
    onModifySpe(spe, pokemon2) {
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (this.field.isWeather(["sunnyday", "desolateland"]) || this.randomChance(1, 2)) {
        if (pokemon2.hp && !pokemon2.item && this.dex.items.get(pokemon2.lastItem).isBerry) {
          pokemon2.setItem(pokemon2.lastItem);
          pokemon2.lastItem = "";
          this.add("-item", pokemon2, pokemon2.getItem(), "[from] ability: Berry Nice");
        }
      }
    },
    onTryHeal(damage, target, source, effect2) {
      if (!effect2)
        return;
      if (effect2.name === "Berry Juice" || effect2.name === "Leftovers") {
        this.add("-activate", target, "ability: Berry Nice");
      }
      if (effect2.isBerry)
        return this.chainModify(2);
    },
    onBoost(boost, target, source, effect2) {
      if (effect2 && effect2.isBerry) {
        let b;
        for (b in boost) {
          boost[b] *= 2;
        }
      }
    },
    onSourceModifyDamagePriority: -1,
    onSourceModifyDamage(damage, source, target, move) {
      if (target.abilityState.berryWeaken) {
        return this.chainModify(0.5);
      }
    },
    onTryEatItemPriority: -1,
    onTryEatItem(item, pokemon2) {
      this.add("-activate", pokemon2, "ability: Berry Nice");
    },
    onEatItem(item, pokemon2) {
      const weakenBerries = [
        "Babiri Berry",
        "Charti Berry",
        "Chilan Berry",
        "Chople Berry",
        "Coba Berry",
        "Colbur Berry",
        "Haban Berry",
        "Kasib Berry",
        "Kebia Berry",
        "Occa Berry",
        "Passho Berry",
        "Payapa Berry",
        "Rindo Berry",
        "Roseli Berry",
        "Shuca Berry",
        "Tanga Berry",
        "Wacan Berry",
        "Yache Berry"
      ];
      pokemon2.abilityState.berryWeaken = weakenBerries.includes(item.name);
    },
    name: "Berry Nice",
    shortDesc: "Chlorophyll + Harvest + Berries eaten by this Pokemon have their effect doubled."
  },
  swiftretreat: {
    onEmergencyExit(target) {
      if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag)
        return;
      for (const side of this.sides) {
        for (const active of side.active) {
          active.switchFlag = false;
        }
      }
      target.switchFlag = true;
      this.add("-activate", target, "ability: Swift Retreat");
    },
    onModifySpe(spe, pokemon2) {
      if (["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Swift Retreat",
    shortDesc: "Emergency Exit + Swift Swim."
  },
  magneticwaves: {
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
        move.type = "Electric";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePower(basePower, pokemon2, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: { breakable: 1 },
    name: "Magnetic Waves",
    shortDesc: "Galvanize + Levitate."
  },
  fridge: {
    onTryHeal(damage, target, source, effect2) {
      if (!effect2)
        return;
      if (effect2.name === "Berry Juice" || effect2.name === "Leftovers") {
        this.add("-activate", target, "ability: Fridge");
      }
      if (effect2.isBerry)
        return this.chainModify(2);
    },
    onBoost(boost, target, source, effect2) {
      if (effect2 && effect2.isBerry) {
        let b;
        for (b in boost) {
          boost[b] *= 2;
        }
      }
    },
    onSourceModifyDamagePriority: -1,
    onSourceModifyDamage(damage, source, target, move) {
      if (target.abilityState.berryWeaken) {
        return this.chainModify(0.5);
      }
    },
    onTryEatItemPriority: -1,
    onTryEatItem(item, pokemon2) {
      this.add("-activate", pokemon2, "ability: Fridge");
    },
    onEatItem(item, pokemon2) {
      const weakenBerries = [
        "Babiri Berry",
        "Charti Berry",
        "Chilan Berry",
        "Chople Berry",
        "Coba Berry",
        "Colbur Berry",
        "Haban Berry",
        "Kasib Berry",
        "Kebia Berry",
        "Occa Berry",
        "Passho Berry",
        "Payapa Berry",
        "Rindo Berry",
        "Roseli Berry",
        "Shuca Berry",
        "Tanga Berry",
        "Wacan Berry",
        "Yache Berry"
      ];
      pokemon2.abilityState.berryWeaken = weakenBerries.includes(item.name);
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Heatproof Atk weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Heatproof SpA weaken");
        return this.chainModify(0.5);
      }
    },
    onDamage(damage, target, source, effect2) {
      if (effect2 && effect2.id === "brn") {
        return damage / 2;
      }
    },
    flags: { breakable: 1 },
    name: "Fridge",
    shortDesc: "Ripen + Heatproof."
  },
  monarchyenforcement: {
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    onFoeTryMove(target, source, move) {
      const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
      if (move.target === "foeSide" || move.target === "all" && !targetAllExceptions.includes(move.id)) {
        return;
      }
      const dazzlingHolder = this.effectState.target;
      if ((source.side === dazzlingHolder.side || move.target === "all") && move.priority > 0.1) {
        this.attrLastMove("[still]");
        this.add("cant", dazzlingHolder, "ability: Monarchy Enforcement", move, "[of] " + target);
        return false;
      }
    },
    flags: { breakable: 1 },
    name: "Monarchy Enforcement",
    shortDesc: "Sheer Force + Queenly Majesty."
  },
  yakultian: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ atk: length2 }, source);
      }
    },
    onStart(source) {
      this.field.setWeather("hail");
    },
    name: "Yakultian",
    shortDesc: "Chilling Neigh + Snow Warning."
  },
  acceleration: {
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.activeTurns) {
        this.boost({ spe: 1 });
      }
    },
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Acceleration only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          this.boost({ spe: 2 }, target, target, null, false, true);
          return;
        }
      }
    },
    name: "Acceleration",
    shortDesc: "+1 Speed end of turn, +2 Speed when a stat is lowered."
  },
  extremophile: {
    onModifySpe(spe, pokemon2) {
      if (["sunnyday", "desolateland", "hail"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    name: "Extremophile",
    shortDesc: "Slush Rush + Chlorophyll."
  },
  hivemind: {
    onTryBoost(boost, target, source, effect2) {
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
      if (showMsg && !effect2.secondaries && effect2.id !== "octolock") {
        this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Bug") {
        this.add("-immune", target, "[from] ability: Hivemind");
        return null;
      }
    },
    name: "Hivemind",
    shortDesc: "This Pokemon is immune to having its stats lowered and Bug-type moves."
  },
  anatidaephobia: {
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (["Normal", "Fighting"].includes(move.type)) {
        this.add("-ability", source, "Anatidaephobia");
        target.tryAddVolatile("perishsong", source);
      }
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Anatidaephobia", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Anatidaephobia", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Anatidaephobia", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Anatidaephobia", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Anatidaephobia", "[of] " + target);
          }
          break;
      }
    },
    flags: {},
    name: "Anatidaephobia",
    shortDesc: "Normal, Fighting hit Ghost and inflict Perish Song."
  },
  permafrost: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        this.debug("Permafrost neutralize");
        return this.chainModify(0.75);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        target.heal(target.baseMaxhp / 16);
        this.add("-heal", target, target.getHealth, "[from] ability: Permafrost");
      }
    },
    name: "Permafrost",
    shortDesc: "When hit by a super effective move, that move deals 3/4 damage and this Pokemon gets healed by 1/16 of its max HP."
  },
  grassystream: {
    onStart(source) {
      this.field.setTerrain("grassyterrain");
    },
    onModifyDefPriority: 6,
    onModifyDef(pokemon2) {
      if (this.field.isWeather("sandstorm"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Grassy Stream",
    shortDesc: "Sets Grassy Terrain upon switch-in. 1.5x Def under Sandstorm."
  },
  /*
  	electrolytes: {
  		onResidualOrder: 5,
  		onResidualSubOrder: 4,
  		onResidual(pokemon, length) {
  			if (pokemon.status) {
  				this.debug('electrolytes');
  				this.add('-activate', pokemon, 'ability: Electrolytes');
  				pokemon.cureStatus();
  				let statName = 'atk';
  				let bestStat = 0;
  				let s: StatNameExceptHP;
  				for (s in pokemon.storedStats) {
  					if (pokemon.storedStats[s] > bestStat) {
  						statName = s;
  						bestStat = pokemon.storedStats[s];
  					}
  				}
  				this.boost({[statName]: length}, pokemon);
  			}
  		},
  		name: "Electrolytes",
  		shortDesc: "When this Pokemon is statused by an opponent, the status is cured at the end of the turn and this Pokemon gains +1 to their highest non-HP stat.",
  	},
  */
  electrolytes: {
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon2) {
      if (pokemon2.hp && pokemon2.status) {
        if (!pokemon2.statusData.source || !pokemon2.statusData.source.side || pokemon2.statusData.source.side === pokemon2.side)
          return;
        this.debug("Electrolytes");
        this.boost({ [pokemon2.getBestStat(true, true)]: 1 }, pokemon2);
        pokemon2.cureStatus();
      }
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        const bestStat = source.getBestStat(true, true);
        this.boost({ [source.getBestStat(true, true)]: length2 }, source);
        source.cureStatus();
      }
    },
    flags: {},
    name: "Electrolytes",
    rating: 4,
    shortDesc: "When this Pokemon is statused by or KOes an opponent, the status is cured at the end of the turn and this Pokemon gains +1 to their highest non-HP stat."
  },
  workability: {
    onModifyMove(move) {
      move.stab = 2;
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Steel") {
        this.debug("Workability boost");
        return this.chainModify(2);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Steel") {
        this.debug("Workability boost");
        return this.chainModify(2);
      }
    },
    name: "Workability",
    shortDesc: "This Pokemon's STAB boost is 2x instead of 1.5x. Steel-type moves are considered STAB for this Pokemon"
  },
  deusexmachina: {
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Wishirupti" || pokemon2.level < 20 || pokemon2.transformed)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 4) {
        if (pokemon2.species.id === "wishirupti") {
          pokemon2.formeChange("Wishirupti-School");
        }
      } else {
        if (pokemon2.species.id === "wishiruptischool") {
          pokemon2.formeChange("Wishirupti");
          pokemon2.setBoost({ atk: 6 });
          this.add("-setboost", pokemon2, "atk", 12, "[from] ability: Deus Ex Machina");
        }
      }
    },
    onResidualOrder: 27,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Wishirupti" || pokemon2.level < 20 || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 4) {
        if (pokemon2.species.id === "wishirupti") {
          pokemon2.formeChange("Wishirupti-School");
        }
      } else {
        if (pokemon2.species.id === "wishiruptischool") {
          pokemon2.formeChange("Wishirupti");
          pokemon2.setBoost({ atk: 6 });
          this.add("-setboost", pokemon2, "atk", 12, "[from] ability: Deus Ex Machina");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Deus Ex Machina",
    shortDesc: "Schooling effects. When this Pokemon enters Solo form, it gains +12 Attack."
  },
  neutralizinggas: {
    // Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
    // TODO Will abilities that already started start again? (Intimidate seems like a good test case)
    onPreStart(pokemon2) {
      this.add("-ability", pokemon2, "Neutralizing Gas");
      pokemon2.abilityState.ending = false;
      for (const target of this.getAllActive()) {
        if (target.illusion) {
          this.singleEvent("End", this.dex.abilities.get("Illusion"), target.abilityState, target, pokemon2, "neutralizinggas");
        }
        if (target.volatiles["slowstart"]) {
          delete target.volatiles["slowstart"];
          this.add("-end", target, "Slow Start", "[silent]");
        }
      }
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      if (source.species.baseSpecies !== "Weezlord-Galar")
        return;
      if (effect2 && effect2.effectType === "Move") {
        let statName = "atk";
        let bestStat = 0;
        let s;
        for (s in source.storedStats) {
          if (source.storedStats[s] > bestStat) {
            statName = s;
            bestStat = source.storedStats[s];
          }
        }
        this.boost({ [statName]: length2 }, source);
      }
    },
    onEnd(source) {
      source.abilityState.ending = true;
      for (const pokemon2 of this.getAllActive()) {
        if (pokemon2 !== source) {
          this.singleEvent("Start", pokemon2.getAbility(), pokemon2.abilityState, pokemon2);
        }
      }
    },
    inherit: true,
    shortDesc: "While this Pokemon is active, Abilities have no effect. Weezlord: +1 to highest stat upon KO"
  },
  undercut: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      this.chainModify(0.75);
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Technician boost");
        return this.chainModify(1.875);
      }
    },
    flags: {},
    name: "Undercut",
    shortDesc: "This Pokemon's moves of 80 power or less have 1.40625x power, but its moves higher than 80 power have 0.75x power."
  },
  heatgenerator: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Heat Generator");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Heat Generator");
        return this.chainModify(1.5);
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    flags: {},
    name: "Heat Generator",
    shortDesc: "Regenerator + Blaze"
  },
  flamingskin: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water" && !move.ignoreAbility) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Flaming Skin");
        }
        return null;
      }
    },
    onFoeBasePowerPriority: 17,
    onFoeBasePower(basePower, attacker, defender, move) {
      if (this.effectState.target !== defender || move.ignoreAbility)
        return;
      if (move.type === "Fire") {
        return this.chainModify(1.25);
      }
    },
    onWeather(target, source, effect2) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect2.id === "raindance" || effect2.id === "primordialsea") {
        this.heal(target.baseMaxhp / 8);
      } else if (effect2.id === "sunnyday" || effect2.id === "desolateland") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("brn", target);
        }
      }
    },
    name: "Flaming Skin",
    shortDesc: "Dry Skin + Flame Body"
  },
  etativel: {
    onBoost(boost, target, source, effect2) {
      if (effect2 && effect2.id === "zpower")
        return;
      let i;
      for (i in boost) {
        boost[i] *= -1;
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground" && !source.hasAbility("aerialbreak") && !target.volatiles["smackdown"] && !this.field.getPseudoWeather("gravity")) {
        this.add("-immune", target, "[from] ability: Etativel");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Etativel",
    shortDesc: "Contrary + Levitate"
  },
  clutchfactor: {
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.category === "Special" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Clutch Factor boost boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Clutch Factor",
    shortDesc: "Special Attacks are boosted by 1.5x at 1/3 HP or less."
  },
  stickysurge: {
    onTakeItem(item, pokemon2, source) {
      if (this.suppressingAttackEvents(pokemon2) || !pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Sticky Surge");
        return false;
      }
    },
    onStart(source) {
      this.field.setTerrain("electricterrain");
    },
    flags: { breakable: 1 },
    name: "Sticky Surge",
    shortDesc: "Sticky Hold + Electric Surge."
  },
  selfsacrifice: {
    onFaint(pokemon2) {
      pokemon2.side.addSlotCondition(pokemon2, "selfsacrifice");
    },
    condition: {
      onStart(pokemon2, source) {
        this.effectState.hp = source.maxhp / 4;
      },
      onSwap(target) {
        if (!target.fainted) {
          const damage = this.heal(this.effectState.hp, target, target);
          if (damage)
            this.add("-heal", target, target.getHealth, "[from] ability: Self Sacrifice", "[of] " + this.effectState.source);
          target.side.removeSlotCondition(target, "selfsacrifice");
        }
      }
    },
    name: "Self Sacrifice",
    shortDesc: "When this Pokemon faints, the replacement is healed by 1/4 of this Pokemon's max HP"
  },
  lighthearted: {
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    flags: { breakable: 1 },
    name: "Lighthearted",
    shortDesc: "Prankster + Levitate"
  },
  tigerpit: {
    onFoeTrapPokemon(pokemon2) {
      if (pokemon2.isAdjacent(this.effectState.target) && pokemon2.isGrounded()) {
        pokemon2.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
      if ((source || (source = this.effectState.target)) && pokemon2.isAdjacent(source) && pokemon2.isGrounded(!pokemon2.knownType)) {
        pokemon2.maybeTrapped = true;
      }
    },
    onSourceModifyAccuracyPriority: 7,
    onSourceModifyAccuracy(accuracy, target, source, move) {
      if (!target.isGrounded()) {
        return accuracy * 0.8;
      }
    },
    onModifyDamage(damage, source, target, move) {
      if (move && target.isGrounded() && !target.hasType("Ghost")) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Tiger Pit",
    shortDesc: "Arena Trap + 1.5x power against grounded, 0.8x Accuracy against airborne."
  },
  /*
  	tigerpit: {//test
  		name: "Tiger Pit",
  		shortDesc: "Prevents grounded foes from switching and moves have 1.5x power against grounded foes. 0.8x Accuracy against airborne foes.",
  		onStart(source) {
  			let activated = false;
  			for (const pokemon of source.side.foe.active) {
  				if (!activated) {
  					this.add('-ability', source, 'Tiger Pit');
  				}
  				activated = true;
  				if (!pokemon.volatiles['trapped'] && (!pokemon.isGrounded() || pokemon.hasAbility('feelnopain') || !pokemon.hasAbility('magneticwaves') ||
              !pokemon.hasAbility('stickyfloat') || !pokemon.hasAbility('etativel') || !pokemon.hasAbility('lighthearted')
              || !pokemon.hasAbility('leviflame') || !pokemon.hasAbility('levitability') || !pokemon.hasAbility('feelsomepain') || !pokemon.hasAbility('aerialbreak') || !pokemon.hasAbility('floatguise') || !pokemon.hasAbility('clearlyfloating') || !pokemon.hasAbility('hoverboard') || !pokemon.hasAbility('levimetal') || !pokemon.hasAbility('levistatic') || !pokemon.hasAbility('lovelessfloat'))) {
  					pokemon.addVolatile('trapped', source, 'trapper');
  				}
  			}
  		},
  		onAnySwitchIn(pokemon) {
  			const source = this.effectState.target;
  			if (pokemon === source) return;
  			for (const target of source.side.foe.active) {
  				if (!target.volatiles['trapped'] && (!target.isGrounded() || target.hasAbility('feelnopain') || !target.hasAbility('magneticwaves') ||
              !target.hasAbility('stickyfloat') || !target.hasAbility('etativel') || !target.hasAbility('lighthearted')
              || !target.hasAbility('leviflame') || !target.hasAbility('levitability') || !target.hasAbility('feelsomepain') || !target.hasAbility('aerialbreak') || !target.hasAbility('floatguise') || !target.hasAbility('clearlyfloating') || !target.hasAbility('hoverboard') || !target.hasAbility('levimetal') || !target.hasAbility('levistatic') || !target.hasAbility('lovelessfloat'))) {
  					target.addVolatile('trapped', source, 'trapper');
  				}
  			}
  		},
  		onEnd(pokemon) {
  			const source = this.effectState.target;
  			for (const target of source.side.foe.active) {
  				target.removeVolatile('trapped');
  			}
  		},
  	},
  */
  vengefulshift: {
    onAfterSetStatus(status, target, source, effect2) {
      if (!source || source === target)
        return;
      if (effect2 && effect2.id === "toxicspikes")
        return;
      if (status.id === "slp" || status.id === "frz")
        return;
      this.add("-activate", target, "ability: Vengeful Shift");
      source.trySetStatus(status, target, { status: status.id, id: "vengefulshift" });
      target.cureStatus();
    },
    flags: {},
    name: "Vengeful Shift",
    shortDesc: "When this Pokemon is statused by another Pokemon, it will attempt to transfer its status condition to an opposing Pokemon at the end of each turn until it is cured."
  },
  toughskin: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["contact"]) {
        return this.chainModify([4915, 4096]);
      }
    },
    flags: {},
    name: "Tough Skin",
    shortDesc: "Foes making contact with this Pokemon lose 1/8 of their max HP. This Pokemon's contact moves have 1.2x power."
  },
  hydraulicpress: {
    onModifyWeight(weighthg) {
      return this.trunc(weighthg / 2);
    },
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    flags: { breakable: 1 },
    name: "Hydraulic Press",
    shortDesc: "Sheer Force + Light Metal."
  },
  parroting: {
    // implemented in runMove in scripts.js
    name: "Parroting",
    shortDesc: "After another Pokemon uses a status move, this Pokemon uses the same move."
  },
  /*
  	lifedrain: {
  		onPrepareHit(source, target, move, basePower) {
  			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
  			this.debug('Base Power: ' + basePowerAfterMultiplier);
  			if (basePowerAfterMultiplier <= 60) {
  				this.heal(source.baseMaxhp / 8);
  			}
  		},
  		onBasePowerPriority: 30,
  		onBasePower(basePower, attacker, defender, move) {
  			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
  			this.debug('Base Power: ' + basePowerAfterMultiplier);
  			if (basePowerAfterMultiplier <= 60) {
  				this.debug('Life Drain boost');
  				return this.chainModify(1.5);
  			}
  		},
  		onDamagePriority: 1,
  		onDamage(damage, target, source, effect) {
  			if (effect.id === 'psn' || effect.id === 'tox') {
  				return false;
  			}
  		},
  		name: "Life Drain",
  		shortDesc: "Moves with ≤60 BP have 1.5x power and heal this Pokemon by 12.5%; Immune to poison damage.",
  	},
  */
  lifedrain: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Life Drain boost");
        move.lifeDrain = true;
        return this.chainModify(1.5);
      }
    },
    onDamagePriority: 1,
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "psn" || effect2.id === "tox") {
        return false;
      }
    },
    onAfterMove(target, source, move) {
      if (move.lifeDrain)
        this.heal(target.baseMaxhp / 8);
    },
    name: "Life Drain",
    shortDesc: "Moves with \u226460 BP have 1.5x power and heal this Pokemon by 12.5%; Immune to poison damage."
  },
  metalhead: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Metalhead", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ atk: -1 }, target, pokemon2, null, true);
        }
      }
    },
    onModifyWeightPriority: 1,
    onModifyWeight(weighthg) {
      return weighthg * 2;
    },
    flags: { breakable: 1 },
    name: "Metalhead",
    shortDesc: "Intimidate + Heavy Metal"
  },
  absorbant: {
    onTryHit(target, source, move) {
      if (target !== source && (move.type === "Water" || move.type === "Ground")) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Absorbant");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Absorbant",
    shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Water or Ground moves; Water & Ground immunity."
  },
  waterpressure: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Water Pressure");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onDamagingHit(damage, target, source, move) {
      if (move.type === "Water") {
        this.boost({ def: 2 });
      }
    },
    name: "Water Pressure",
    shortDesc: "Pressure + Water Compaction"
  },
  musclemass: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.modify(atk, 1.5);
    },
    onModifySpe(spe, pokemon2) {
      return this.chainModify([2731, 4096]);
    },
    name: "Muscle Mass",
    shortDesc: "This Pokemon has 1.5x Attack and 0.667x Speed"
  },
  idiotsavant: {
    onStart(pokemon2) {
      let totaldef = 0;
      let totalspd = 0;
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        totaldef += target.getStat("def", false, true);
        totalspd += target.getStat("spd", false, true);
      }
      if (totaldef) {
        if (totaldef >= totalspd)
          this.boost({ spa: 1 });
      } else if (totalspd) {
        this.boost({ atk: 1 });
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["confusion"]) {
        this.add("-activate", pokemon2, "ability: Idiot Savant");
        pokemon2.removeVolatile("confusion");
      }
    },
    onTryAddVolatile(status, pokemon2) {
      if (status.id === "confusion")
        return null;
    },
    onHit(target, source, move) {
      if (move?.volatileStatus === "confusion") {
        this.add("-immune", target, "confusion", "[from] ability: Idiot Savant");
      }
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Idiot Savant", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Idiot Savant", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Idiot Savant", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Idiot Savant", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Idiot Savant", "[of] " + target);
          }
          break;
      }
    },
    flags: { breakable: 1 },
    name: "Idiot Savant",
    shortDesc: "Own Tempo + Download"
  },
  rebootsystem: {
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Reboot System",
    shortDesc: "RKS System + Regenerator"
  },
  gracefulhealing: {
    onAfterMove(target, source, move) {
      if (move.secondaries)
        this.heal(target.baseMaxhp / 8);
    },
    name: "Graceful Healing",
    shortDesc: "Restores 12.5% max HP when using a move with secondary effects."
  },
  herbivore: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Grass") {
        if (!this.boost({ atk: 2 })) {
          this.add("-immune", target, "[from] ability: Herbivore");
        }
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (target === this.effectState.target || target.side !== source.side)
        return;
      if (move.type === "Grass") {
        this.boost({ atk: 2 }, this.effectState.target);
      }
    },
    name: "Herbivore",
    shortDesc: "This Pokemon's Attack is raised 2 stage if hit by a Grass move; Grass immunity."
  },
  diamondcore: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Diamond Core");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onTryHit(pokemon2, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon2, "[from] ability: Diamond Core");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect2) {
      if (target.hp === target.maxhp && damage >= target.hp && effect2 && effect2.effectType === "Move") {
        this.add("-ability", target, "Diamond Core");
        return target.hp - 1;
      }
    },
    name: "Diamond Core",
    shortDesc: "Pressure + Sturdy"
  },
  combustion: {
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      let combustion = null;
      let statDrop;
      for (statDrop in pokemon2.boosts) {
        if (pokemon2.boosts[statDrop] < 0)
          combustion = true;
      }
      if (pokemon2.activeTurns && !combustion) {
        this.boost({ spe: 1 });
      }
    },
    name: "Combustion",
    shortDesc: "If this Pokemon has no negative stat changes, +1 Speed at the end of the turn."
  },
  scouttyping: {
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        if (target.item) {
          this.add("-item", target, target.getItem().name, "[from] ability: Scout Typing", "[of] " + pokemon2, "[identify]");
        }
      }
    },
    onPrepareHit(source, target, move) {
      if (move.hasBounced)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Scout Typing");
      }
    },
    name: "Scout Typing",
    shortDesc: "Frisk + Protean"
  },
  gutsguard: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(def, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.25);
      }
    },
    name: "Guts Guard",
    shortDesc: "When statused, this Pokemon Attack is boosted 1.5x and it takes 0.75x damage."
  },
  anesthesia: {
    onAnyModifyBoost(boosts, pokemon2) {
      const unawareUser = this.effectState.target;
      if (unawareUser === pokemon2)
        return;
      if (unawareUser === this.activePokemon && pokemon2 === this.activeTarget) {
        boosts["def"] = 0;
        boosts["spd"] = 0;
        boosts["evasion"] = 0;
      }
      if (pokemon2 === this.activePokemon && unawareUser === this.activeTarget) {
        boosts["atk"] = 0;
        boosts["def"] = 0;
        boosts["spa"] = 0;
        boosts["accuracy"] = 0;
      }
    },
    onAllyTryAddVolatile(status, target, source, effect2) {
      if (["attract", "disable", "encore", "healblock", "taunt", "torment"].includes(status.id)) {
        if (effect2.effectType === "Move") {
          const effectHolder = this.effectState.target;
          this.add("-block", target, "ability: Anesthesia", "[of] " + effectHolder);
        }
        return null;
      }
    },
    name: "Anesthesia",
    shortDesc: "Aroma Veil + Unaware"
  },
  stabilizer: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Stabilizer boost");
        return this.chainModify(1.5);
      }
    },
    onDamagingHit(damage, target, source, move, basePower) {
      if (move.basePower <= 60) {
        this.boost({ spe: 1 });
      }
    },
    name: "Stabilizer",
    shortDesc: "Moves with \u226460 BP have 1.5x power. +1 Speed when hit by a move with \u226460 BP."
  },
  headtohead: {
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    onTryHit(target, source, move) {
      if (move.target !== "self" && (move.recoil || move.hasCrashDamage)) {
        this.add("-immune", target, "[from] ability: Head-To-Head");
        return null;
      }
    },
    name: "Head-To-Head",
    shortDesc: "This Pokemon is immune to recoil and recoil moves."
  },
  clearlyfloating: {
    onBoost(boost, target, source, effect2) {
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
      if (showMsg && !effect2.secondaries && effect2.id !== "octolock") {
        this.add("-fail", target, "unboost", "[from] ability: Clearly Floating", "[of] " + target);
      }
    },
    name: "Clearly Floating",
    shortDesc: "Clear Body + Levitate"
  },
  slowmage: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.item) {
        return this.chainModify(0.5);
      }
    },
    onModifySpe(spe, pokemon2) {
      if (pokemon2.item) {
        return this.chainModify(0.5);
      }
    },
    name: "Slow Mage",
    shortDesc: "If this Pokemon is holding an item, its Attack and Speed are halved."
  },
  unseenmagic: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target === source || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, target, source);
      return null;
    },
    onAllyTryHitSide(target, source, move) {
      if (target.side === source.side || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, this.effectState.target, source);
      return null;
    },
    condition: {
      duration: 1
    },
    onModifyMove(move) {
      if (move.flags["contact"])
        delete move.flags["protect"];
    },
    name: "Unseen Magic",
    shortDesc: "Magic Bounce + Unseen Fist"
  },
  gulprock: {
    onDamagingHit(damage, target, source, move) {
      if (target.transformed || target.isSemiInvulnerable())
        return;
      if (["cramotricitygulping", "cramotricitygorging"].includes(target.species.id)) {
        this.damage(source.baseMaxhp / 4, source, target);
        if (target.species.id === "cramotricitygulping") {
          this.boost({ def: -1 }, source, target, null, true);
        } else {
          source.trySetStatus("par", target, move);
        }
        target.formeChange("cramotricity", move);
      }
    },
    // The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
    onSourceTryPrimaryHit(target, source, effect2) {
      if (effect2 && effect2.id === "surf" && source.hasAbility("gulprock") && source.species.name === "Cramotricity" && !source.transformed) {
        const forme = source.hp <= source.maxhp / 2 ? "cramotricitygorging" : "cramotricitygulping";
        source.formeChange(forme, effect2);
      }
    },
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (move.name === "Surf" || move.name === "Dive") {
        return this.chainModify(1.3);
      }
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.name === "Surf" || move.name === "Dive") {
        this.debug("Gulp Rock weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Gulp Rock",
    shortDesc: "Gulp Missile + Surf & Dive deal 1.3x and this Pokemon takes 50% damage from Surf and Dive."
  },
  flyingraijin: {
    onModifyMove(move) {
      move.infiltrates = true;
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Flying Raijin");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Electric" || ["firepledge", "grasspledge", "waterpledge"].includes(move.id))
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Flying Raijin");
        }
        return this.effectState.target;
      }
    },
    name: "Flying Raijin",
    shortDesc: "Infiltrator + Lightning Rod"
  },
  zenmode: {
    onResidualOrder: 27,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Darmanitan-Prime" || pokemon2.transformed) {
        return;
      }
      if (pokemon2.hp <= pokemon2.maxhp / 2 && !["Zen"].includes(pokemon2.species.forme)) {
        pokemon2.addVolatile("zenmode");
      } else if (pokemon2.hp > pokemon2.maxhp / 2 && ["Zen"].includes(pokemon2.species.forme)) {
        pokemon2.addVolatile("zenmode");
        pokemon2.removeVolatile("zenmode");
      }
    },
    onEnd(pokemon2) {
      if (!pokemon2.volatiles["zenmode"] || !pokemon2.hp)
        return;
      pokemon2.transformed = false;
      delete pokemon2.volatiles["zenmode"];
      if (pokemon2.species.baseSpecies === "Darmanitan-Prime" && pokemon2.species.battleOnly) {
        pokemon2.formeChange(pokemon2.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon2) {
        if (!pokemon2.species.name.includes("Galar")) {
          if (pokemon2.species.id !== "darmanitanprimezen")
            pokemon2.formeChange("Darmanitan-Prime-Zen");
        }
      },
      onEnd(pokemon2) {
        if (["Zen"].includes(pokemon2.species.forme)) {
          pokemon2.formeChange(pokemon2.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Zen Mode",
    rating: 0,
    num: 161
  },
  exoskeleton: {
    onUpdate(pokemon2) {
      if (pokemon2.status === "psn" || pokemon2.status === "tox") {
        this.add("-activate", pokemon2, "ability: Exoskeleton");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "psn" && status.id !== "tox")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Exoskeleton");
      }
      return false;
    },
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Exoskeleton");
      this.add("-message", `Pingar breaks the mold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    name: "Exoskeleton",
    shortDesc: "Mold Breaker + Immunity"
  },
  bulletpecks: {
    onTryHit(pokemon2, target, move) {
      if (move.flags["bullet"] || move.name === "Crunch" || move.name === "Crush Claw" || move.name === "Fire Lash" || move.name === "Grav Apple" || move.name === "Iron Tail" || move.name === "Leer" || move.name === "Liquidation" || move.name === "Octolock" || move.name === "Razor Shell" || move.name === "Rock Smash" || move.name === "Screech" || move.name === "Secret Power" || move.name === "Shadow Bone" || move.name === "Tail Whip" || move.name === "Thunderous Kick" || move.name === "Tickle") {
        this.add("-immune", pokemon2, "[from] ability: Bulletpecks");
        return null;
      }
    },
    name: "Bulletpecks",
    shortDesc: "This Pokemon is immune to ballistic moves and moves that lower Defense."
  },
  floatguise: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move" && ["mimikyu", "mimikyutotem", "rotokyu"].includes(target.species.id) && !target.transformed) {
        this.add("-activate", target, "ability: Float Guise");
        this.effectState.busted = true;
        return 0;
      }
    },
    onCriticalHit(target, source, move) {
      if (!target)
        return;
      if (!["mimikyu", "rotokyu"].includes(target.species.id) || target.transformed) {
        return;
      }
      const hitSub = target.volatiles["substitute"] && !move.flags["authentic"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!target)
        return;
      if (!["mimikyu", "rotokyu"].includes(target.species.id) || target.transformed) {
        return;
      }
      const hitSub = target.volatiles["substitute"] && !move.flags["authentic"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return 0;
    },
    onUpdate(pokemon2) {
      if (["mimikyu", "rotokyu"].includes(pokemon2.species.id) && this.effectState.busted) {
        const speciesid = pokemon2.species.id === "rotokyu" ? "Rotokyu-Busted" : "Mimikyu-Busted";
        pokemon2.formeChange(speciesid, this.effect, true);
        this.damage(pokemon2.baseMaxhp / 8, pokemon2, pokemon2, this.dex.species.get(speciesid));
      }
    },
    name: "Float Guise",
    shortDesc: "Disguise + Levitate"
  },
  ragingrapids: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.side.foe.active) {
        if (!target || !target.isAdjacent(pokemon2))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Raging Rapids", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ atk: -1 }, target, pokemon2, null, true);
        }
      }
    },
    onAfterMoveSecondary(target, source, move) {
      if (!source || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3) {
        this.boost({ atk: -1 }, source, target, null, true);
      }
    },
    name: "Raging Rapids",
    shortDesc: "Lowers the foe's Attack by 1 on switch-in and when this Pokemon falls under 1/3 max HP."
  },
  ultrapresto: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        let statName = "atk";
        let bestStat = 0;
        let s;
        for (s in source.storedStats) {
          if (source.storedStats[s] > bestStat) {
            statName = s;
            bestStat = source.storedStats[s];
          }
        }
        this.boost({ [statName]: length2 }, source);
      }
    },
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (target !== source && move.category !== "Status") {
        if (source.item || source.volatiles["gem"] || move.id === "fling")
          return;
        const yourItem = target.takeItem(source);
        if (!yourItem)
          return;
        if (!source.setItem(yourItem)) {
          target.item = yourItem.id;
          return;
        }
        this.add("-item", source, yourItem, "[from] ability: Ultra Presto", "[of] " + target);
      }
    },
    name: "Ultra Presto",
    shortDesc: "Magician + Beast Boost"
  },
  undying: {
    onAfterMoveSecondary(target, source, move) {
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        this.boost({ spa: 1 });
        this.heal(target.baseMaxhp / 3);
      }
    },
    name: "Undying",
    shortDesc: "When this Pokemon falls below 50% HP from an attack, it gains +1 SpA and heals 33% of its maximum HP."
  },
  aerialbreak: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Aerial Break");
      this.add("-message", pokemon2.name + ` controls the skies!`);
    },
    onModifyMove(move, attacker, defender) {
      if (move.type === "Ground" && defender.isGrounded() === null && move.category !== "Status") {
        move.ignoreAbility = true;
      }
    },
    name: "Aerial Break",
    shortDesc: "This Pokemon is immune to Ground-type moves and ignores ability-based Ground immunities"
  },
  charybdis: {
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(1.5);
    },
    name: "Charybdis",
    shortDesc: "This Pokemon's Special Attack is 1.5x."
  },
  frozendish: {
    onPrepareHit(source, target, move) {
      if (source.hasType(move.type)) {
        this.heal(source.baseMaxhp / 16);
      }
    },
    onModifyMove(move) {
      move.stab = 2;
    },
    name: "Frozen Dish",
    shortDesc: "This Pokemon's STAB bonus is 2x instead of 1.5x. Heals 1/16 of its max HP when using a STAB move."
  },
  speedbreak: {
    name: "Speed Break",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Speed Break");
      this.add("-message", `Changes to the Speed stat are inverted!`);
    },
    onAnyBoost(boost, target, source, effect2) {
      if (boost.spe) {
        boost.spe *= -1;
      }
    },
    shortDesc: "While this Pokemon is active, Speed is lowered when boosted and vice versa for all Pokemon."
  },
  creepy: {
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    onAfterMove(target, source, move) {
      if (!move || !source)
        return;
      if (move.category === "Status") {
        let activated = false;
        for (const target2 of this.effectState.target.side.foe.active) {
          if (!target2 || !target2.isAdjacent(this.effectState.target))
            continue;
          if (!activated) {
            this.add("-ability", this.effectState.target, "Creepy", "boost");
            activated = true;
          }
          if (target2.volatiles["substitute"] || target2.hasType("Dark")) {
            this.add("-immune", target2);
          } else {
            this.boost({ atk: -1 }, target2, this.effectState.target, null, true);
          }
        }
      }
    },
    name: "Creepy",
    shortDesc: "This Pokemon's Status moves have priority raised by 1 and lower the foe's Attack by 1, but Dark types are immune."
  },
  toxiclook: {
    name: "Toxic Look",
    onModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod < 0) {
        this.debug("Toxic Look boost");
        return this.chainModify(2);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("psn", target);
        }
      }
    },
    shortDesc: "Tinted Lens + Poison Point"
  },
  ultraimpulse: {
    shortDesc: "If this Pokemon is statused, its highest stat is 1.5x; ignores burn halving physical damage.",
    name: "Ultra Impulse",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      let statName = "atk";
      let bestStat = 0;
      let s;
      for (s in this.effectState.target.storedStats) {
        if (this.effectState.target.storedStats[s] > bestStat) {
          statName = s;
          bestStat = this.effectState.target.storedStats[s];
        }
      }
      if (pokemon2.status && statName === "atk") {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(def, pokemon2) {
      let statName = "atk";
      let bestStat = 0;
      let s;
      for (s in this.effectState.target.storedStats) {
        if (this.effectState.target.storedStats[s] > bestStat) {
          statName = s;
          bestStat = this.effectState.target.storedStats[s];
        }
      }
      if (pokemon2.status && statName === "def") {
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon2) {
      let statName = "atk";
      let bestStat = 0;
      let s;
      for (s in this.effectState.target.storedStats) {
        if (this.effectState.target.storedStats[s] > bestStat) {
          statName = s;
          bestStat = this.effectState.target.storedStats[s];
        }
      }
      if (pokemon2.status && statName === "spa") {
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 6,
    onModifySpD(spd, pokemon2) {
      let statName = "atk";
      let bestStat = 0;
      let s;
      for (s in this.effectState.target.storedStats) {
        if (this.effectState.target.storedStats[s] > bestStat) {
          statName = s;
          bestStat = this.effectState.target.storedStats[s];
        }
      }
      if (pokemon2.status && statName === "spd") {
        return this.chainModify(1.5);
      }
    },
    onModifySpe(spe, pokemon2) {
      let statName = "atk";
      let bestStat = 0;
      let s;
      for (s in this.effectState.target.storedStats) {
        if (this.effectState.target.storedStats[s] > bestStat) {
          statName = s;
          bestStat = this.effectState.target.storedStats[s];
        }
      }
      if (pokemon2.status && statName === "spe") {
        return this.chainModify(1.5);
      }
    }
  },
  demagnetize: {
    name: "Demagnetize",
    onBeforeMove(attacker, defender, move) {
      if (defender.hasType("Steel")) {
        defender.addVolatile("demagnetize");
      }
    },
    onModifyMove(move) {
      move.infiltrates = true;
    },
    condition: {
      duration: 1,
      onStart(pokemon2) {
        pokemon2.setType(pokemon2.getTypes(true).map((type) => type === "Steel" ? "???" : type));
        this.add("-start", pokemon2, "typechange", pokemon2.types.join("/"));
      },
      onSwitchOut(pokemon2) {
        pokemon2.removeVolatile("demagnetize");
      },
      onFaint(pokemon2) {
        pokemon2.removeVolatile("demagnetize");
      },
      onEnd(pokemon2) {
        let types = pokemon2.baseSpecies.types;
        types = pokemon2.baseSpecies.types;
        if (pokemon2.getTypes().join() === types.join() || !pokemon2.setType(types))
          return;
        this.add("-start", pokemon2, "typechange", pokemon2.types.join("/"));
      }
    },
    shortDesc: "This Pokemon ignores the opponent's Steel-typing, Substitute, and screens when attacking"
  },
  everywitchway: {
    onDamage(damage, target, source, effect2) {
      if (effect2.effectType !== "Move") {
        if (effect2.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect2.name);
        return false;
      }
    },
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.accuracy && boost.accuracy < 0) {
        delete boost.accuracy;
        if (!effect2.secondaries) {
          this.add("-fail", target, "unboost", "accuracy", "[from] ability: Every Witch Way", "[of] " + target);
        }
      }
    },
    onModifyMove(move) {
      move.ignoreEvasion = true;
    },
    name: "Every Witch Way",
    shortDesc: "Magic Guard + Keen Eye"
  },
  sheerluck: {
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
      if (move.critRatio > 1) {
        move.willCrit = false;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    name: "Sheer Luck",
    shortDesc: "Sheer Force + Moves with an increased critical hit ratio deal 1.3x damage but can't critically hit."
  },
  bigpower: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.chainModify(1.5);
    },
    name: "Big Power",
    shortDesc: "This Pokemon's Attack is boosted 1.5x."
  },
  levimetal: {
    onModifyWeight(weighthg) {
      return this.trunc(weighthg / 2);
    },
    name: "Levimetal",
    shortDesc: "Light Metal + Levitate"
  },
  waterbender: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Waterbender boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Waterbender boost");
        return this.chainModify(1.5);
      }
    },
    name: "Waterbender",
    shortDesc: "This Pokemon's Water-type moves deal 1.5x damage."
  },
  hoverboard: {
    onModifySpe(spe) {
      if (this.field.isTerrain("electricterrain")) {
        return this.chainModify(2);
      }
    },
    name: "Hoverboard",
    shortDesc: "Levitate + Surge Surfer"
  },
  feverbreaker: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Fever Breaker");
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    onUpdate(pokemon2) {
      if (pokemon2.status === "brn") {
        this.add("-activate", pokemon2, "ability: Fever Breaker");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "brn")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Fever Breaker");
      }
      return false;
    },
    name: "Fever Breaker",
    shortDesc: "Mold Breaker + Water Veil"
  },
  spitefulwishcraft: {
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Spiteful Wishcraft only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered) {
        this.add("-ability", target, "Spiteful Wishcraft");
        this.boost({ atk: 2 }, target, target, null, true);
        source.addVolatile("disable", this.effectState.target);
      }
    },
    name: "Spiteful Wishcraft",
    shortDesc: "If this Pokemon has a stat lowered, it gains +2 Attack and disables the foe's last move"
  },
  gnawrly: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Technician boost");
        return this.chainModify(1.5);
      }
      if (move.flags["bite"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Gnawrly",
    shortDesc: "Technician + Strong Jaw, in that order."
  },
  fungalfocus: {
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"] && !source.status && source.runStatusImmunity("powder")) {
        const r = this.random(100);
        if (r < 11) {
          source.setStatus("slp", target);
        } else if (r < 21) {
          source.setStatus("par", target);
        } else if (r < 30) {
          source.setStatus("psn", target);
        }
      }
    },
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
    name: "Fungal Focus",
    shortDesc: "Effect Spore + No Guard"
  },
  lovelessfloat: {
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: Loveless Float");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: Loveless Float");
      }
    },
    name: "Loveless Float",
    shortDesc: "Levitate + This Pokemon is immune to being infatuated."
  },
  phoenicoid: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "psn" || effect2.id === "tox" || effect2.id === "brn") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    onResidualOrder: 5,
    onResidualSubOrder: 5,
    onResidual(pokemon2) {
      if (pokemon2.status === "par") {
        this.heal(pokemon2.baseMaxhp / 8);
      }
    },
    name: "Phoenicoid",
    shortDesc: "This Pok\xE9mon is healed 1/8 of its max HP every turn when Burned/Poisoned/Paralyzed. Immune to Poison's and Burn's damage and Burn's Attack Drop."
  },
  fatfulfloat: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Ground") {
        this.debug("Fatful Float weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Ground") {
        this.debug("Fatful Float weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Fatful Float",
    shortDesc: "This Pok\xE9mon takes 0.5x damage from Fire, Ice, and Ground moves."
  },
  percentyield: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        this.debug("Percent Yield neutralize");
        return this.chainModify(0.75);
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (target.getMoveHitData(move).typeMod > 0 && target.hp && !target.item && this.dex.items.get(target.lastItem).isBerry) {
        target.m.savedBerry = target.lastItem;
        target.lastItem = "";
      }
    },
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.hp && !pokemon2.item && pokemon2.m.savedBerry) {
        pokemon2.setItem(pokemon2.m.savedBerry);
        pokemon2.lastItem = "";
        delete pokemon2.m.savedBerry;
        this.add("-item", pokemon2, pokemon2.getItem(), "[from] ability: Percent Yield");
      }
    },
    isUnbreakable: true,
    name: "Percent Yield",
    shortDesc: "This Pok\xE9mon takes 0.75x damage from super effective moves and recycles its held berry when hit by one."
  },
  motoroverdrive: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ spe: 2 })) {
          this.add("-immune", target, "[from] ability: Motor Drive");
        }
        return null;
      }
    },
    name: "Motor Overdrive",
    shortDesc: "This Pokemon's Speed is raised 2 stages if hit by an Electric move; Electric immunity."
  },
  coldpressor: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Cold Pressor");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onModifySpe(spe, pokemon2) {
      if (this.field.isWeather("hail")) {
        return this.chainModify(2);
      }
    },
    name: "Cold Pressor",
    shortDesc: "Slush Rush + Pressure"
  },
  proudpounce: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ atk: length2, spa: length2 }, source);
      }
    },
    name: "Proud Pounce",
    shortDesc: "This Pokemon's Atk & Sp. Atk are raised by 1 stage if it attacks and KOes another Pokemon."
  },
  deadlydeft: {
    onUpdate(pokemon2) {
      if (pokemon2.status === "par") {
        this.add("-activate", pokemon2, "ability: Deadly Deft");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "par")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Deadly Deft");
      }
      return false;
    },
    name: "Deadly Deft",
    shortDesc: "Corrosion + Limber"
  },
  toxinrush: {
    onSourceDamagingHit(damage, target, source, move) {
      if (!target.hasAbility("shielddust") && this.checkMoveMakesContact(move, target, source) && this.randomChance(3, this.field.isWeather("hail") ? 5 : 10)) {
        target.trySetStatus("psn", source);
      }
    },
    name: "Toxin Rush",
    shortDesc: "User's contact moves have a 30% Poison chance, 60% under Hail."
  },
  liquidarmor: {
    onSourceTryHeal(damage, target, source, effect2) {
      this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect2.id);
      const canOoze = ["drain", "leechseed", "strengthsap"];
      if (canOoze.includes(effect2.id)) {
        this.damage(damage);
        return 0;
      }
    },
    onCriticalHit: false,
    name: "Liquid Armor",
    shortDesc: "Liquid Ooze + Shell Armor"
  },
  bombshell: {
    /*
    		onBeforeMovePriority: 0.5,
    		onBeforeMove(attacker, defender, move) {
    			if (attacker.species.baseSpecies !== 'Minimie' || attacker.transformed) return;
    			if (this.queue.willMove(defender)) return;
    			const targetForme = (!this.queue.willMove(defender) ? 'Minimie' : 'Minimie-Core');
    			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
    		},
    */
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (attacker.species.baseSpecies !== "Minimie" || attacker.transformed)
        return;
      if (!this.queue.willMove(defender) && defender !== attacker) {
        if (attacker.species.forme !== "Core") {
          attacker.formeChange("Minimie-Core");
        }
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2) {
      let boosted = true;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (this.queue.willMove(target)) {
          boosted = false;
          break;
        }
      }
      if (boosted) {
        this.debug("Bombshell boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onResidualOrder: 27,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Minimie" || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.species.forme === "Core") {
        pokemon2.formeChange("Minimie");
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (target.species.id !== "Minimie" || target.transformed)
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Bombshell");
      }
      return false;
    },
    onTryAddVolatile(status, target) {
      if (target.species.id !== "Minimie" || target.transformed)
        return;
      if (status.id !== "yawn")
        return;
      this.add("-immune", target, "[from] ability: Bombshell");
      return null;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    isUnbreakable: true,
    name: "Bombshell",
    shortDesc: "Analytic effects. Transforms into Core form when moving last or if the opponent switches. Transforms into Meteor at the end of each turn."
  },
  eusocial: {
    onFoeTryMove(target, source, move) {
      const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
      if (move.target === "foeSide" || move.target === "all" && !targetAllExceptions.includes(move.id)) {
        return;
      }
      const dazzlingHolder = this.effectState.target;
      if ((source.side === dazzlingHolder.side || move.target === "all") && move.priority > 0.1) {
        this.attrLastMove("[still]");
        this.add("cant", dazzlingHolder, "ability: Eusocial", move, "[of] " + target);
        return false;
      }
    },
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.priority > 0.1) {
        return this.chainModify(1.5);
      }
    },
    name: "Eusocial",
    shortDesc: "This Pokemon's team is immune to priority moves. 1.5x power on priority moves."
  },
  terabyte: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon2) {
      if (move.flags["bite"]) {
        move.type = "Electric";
      }
    },
    name: "Terabyte",
    shortDesc: "This Pokemon's biting moves become Electric-type."
  },
  flamedrive: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ spe: 1 })) {
          this.add("-immune", target, "[from] ability: Motor Drive");
        }
        return null;
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("brn", target);
        }
      }
    },
    name: "Flame Drive",
    shortDesc: "Flame Body + Motor Drive"
  },
  fruitfulforce: {
    onModifySpAPriority: 5,
    onModifySpA(atk, pokemon2) {
      const item = pokemon2.getItem();
      if (item.isBerry) {
        this.debug("Fruitful Force boost");
        return this.chainModify(1.5);
      }
    },
    name: "Fruitful Force",
    shortDesc: "If the user is holding a berry, the user's Special Attack is 1.5x."
  },
  bravado: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Bravado");
      this.add("-message", `Herasir breaks the mold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        this.boost({ atk: length2 }, source);
      }
    },
    name: "Bravado",
    shortDesc: "Moxie + Mold Breaker"
  },
  sandmistsurge: {
    onStart(source) {
      this.field.setTerrain("mistyterrain");
      this.field.setWeather("sandstorm");
    },
    name: "Sandmist Surge",
    shortDesc: "Sand Stream + Misty Surge"
  },
  fastmetabolism: {
    onModifySpe(spe, pokemon2) {
      if (pokemon2.hp <= pokemon2.maxhp / 2) {
        return this.chainModify(2);
      }
    },
    name: "Fast Metabolism",
    shortDesc: "When this Pokemon has 1/2 or less of its maximum HP, its Speed is doubled."
  },
  psychicflow: {
    onStart(source) {
      this.field.setTerrain("psychicterrain");
    },
    onBasePowerPriority: 7,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water" && this.field.isTerrain("psychicterrain")) {
        this.debug("Psychic Flow boost");
        return this.chainModify(1.5);
      }
    },
    name: "Psychic Flow",
    shortDesc: "On switch-in, this Pokemon summons Psychic Terrain. Its Water-type moves deal 1.5x damage in Psychic Terrain."
  },
  smokegun: {
    onTryBoost(boost, target, source, effect2) {
      if (source && target !== source)
        return;
      if (boost.spa && (boost.spa < 0 || boost.spa > 0)) {
        delete boost.spa;
        if (!effect2.secondaries) {
          this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Smoke Gun", "[of] " + target);
        }
      }
    },
    name: "Smoke Gun",
    shortDesc: "This Pokemon cannot raise or lower its own Special Attack."
  },
  stagnantfumes: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Stagnant Fumes");
    },
    onAnyModifyBoost(boosts, pokemon2) {
      const unawareUser = this.effectState.target;
      if (unawareUser === pokemon2)
        return;
      if (unawareUser === this.activePokemon) {
        if (pokemon2 === this.activeTarget) {
          boosts["def"] = 0;
          boosts["spd"] = 0;
          boosts["evasion"] = 0;
        }
      }
      if (pokemon2 === this.activePokemon && unawareUser === this.activeTarget) {
        boosts["atk"] = 0;
        boosts["def"] = 0;
        boosts["spa"] = 0;
        boosts["accuracy"] = 0;
      }
    },
    name: "Stagnant Fumes",
    shortDesc: "While user is active, all stat changes are ignored by all active Pokemon."
  },
  ironwill: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    onTryBoost(boost, target, source, effect2) {
      let activated = false;
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            activated = true;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Iron Will", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            activated = true;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Iron Will", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            activated = true;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Iron Will", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            activated = true;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Iron Will", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            activated = true;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Iron Will", "[of] " + target);
          }
          break;
      }
      if (activated) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Iron Will",
    shortDesc: "If the foe makes contact with this Pok\xE9mon or tries to Intimidate it, they lose 12.5% of their max HP; Intimidate immunity."
  },
  sweettooth: {
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (this.checkMoveMakesContact(move, target, source)) {
        if (this.randomChance(3, 10)) {
          this.add("-ability", source, "Sweet Tooth");
          target.addVolatile("taunt", source);
        }
      }
    },
    name: "Sweet Tooth",
    shortDesc: "This Pok\xE9mon\u2019s contact attacks have a 30% to inflict taunt on the opponent."
  },
  holdbreaker: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Hold Breaker");
      this.add("-message", ` breaks the hold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Hold Breaker",
    shortDesc: "This Pokemon's moves and their effects ignore the abilities of other Pokemon and can't be removed due to another Pokemon's ability."
  },
  imposingadipose: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        this.debug("Imposing Adipose neutralize");
        return this.chainModify(0.5);
      }
    },
    name: "Imposing Adipose",
    shortDesc: "This Pok\xE9mon takes 50% damage from super effective moves."
  },
  frozenfist: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Frozen Fist boost");
        return this.chainModify([4915, 4096]);
      }
    },
    onAfterMove(target, source, move) {
      if (move.flags["punch"])
        this.heal(target.baseMaxhp / 16);
    },
    name: "Frozen Fist",
    shortDesc: "This Pokemon's punch-based attacks have 1.2x power and heal the user by 1/16th of their max HP."
  },
  shadowydreams: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Shadowy Dreams");
      this.add("-message", pokemon2.name + ` is drowsing!`);
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        if (target.item) {
          this.add("-item", target, target.getItem().name, "[from] ability: Shadowy Dreams", "[of] " + pokemon2, "[identify]");
        }
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Shadowy Dreams");
      }
      return false;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    isUnbreakable: true,
    name: "Shadowy Dreams",
    shortDesc: "Comatose + Frisk"
  },
  reguardless: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Reguardless");
      this.add("-message", `Fraxblade breaks the mold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
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
    name: "Reguardless",
    shortDesc: "Mold Breaker + No Guard"
  },
  envioussword: {
    onStart(pokemon2) {
      this.boost({ spa: 1 }, pokemon2);
    },
    name: "Envious Sword",
    shortDesc: "On switch-in, this Pokemon's Special Attack is raised by 1 stage."
  },
  icebreaker: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2?.effectType !== "Move") {
        return;
      }
      if (source.species.id === "eiscudile" && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
        this.add("-activate", source, "ability: Icebreaker");
        source.formeChange("Eiscudile-Noice", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Icebreaker",
    shortDesc: "When this Pokemon KOes a Pokemon with an attack, it transforms into Noice form."
  },
  flameforce: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (defender.status === "brn") {
        return this.chainModify(1.3);
      }
    },
    name: "Flame Force",
    shortDesc: "This Pokemon's moves deal 1.3x damage against burned opponents."
  },
  hydroelectric: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water" && !move.ignoreAbility) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Hydroelectric");
        }
        return null;
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("par", target);
        }
      }
    },
    name: "Hydroelectric",
    shortDesc: "Static + Water Absorb"
  },
  waterbreak: {
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.activeTurns % 2 === 0) {
        this.add("-activate", pokemon2, "ability: Water Break");
        pokemon2.cureStatus();
      }
    },
    name: "Water Break",
    shortDesc: "This Pokemon heals its status every other turn."
  },
  catastrophic: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Catastrophic boost");
        move.catastrophic = true;
        return this.chainModify(1.5);
      }
    },
    /*
    	onAfterMove(basePower, source, target, move) {
    		if (!move || !source) return;
    		const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
    		this.debug('Base Power: ' + basePowerAfterMultiplier);
    		if (basePowerAfterMultiplier <= 60) {
    			let activated = false;
    			for (const target of this.effectState.target.side.foe.active) {
    				if (!target || !target.isAdjacent(this.effectState.target)) continue;
    				if (!activated) {
    					this.add('-ability', this.effectState.target, 'Catastrophic', 'boost');
    					activated = true;
    				}
    				if ((target.volatiles['substitute'] || target.hasType('Dark'))) {
    					this.add('-immune', target);
    				} else {
    					this.boost({atk: -1}, target, this.effectState.target, null, true);
    				}
    			}
    		}
    	},
    	onModifyMove(move) {
    		if (!move || !move.basePower > 60 || move.target === 'self') return;
    		if (!move.secondaries) {
    			move.secondaries = [];
    		}
    		move.secondaries.push({
    			chance: 100,
    			boosts: {
    				atk: -1,
    			},
    			ability: this.dex.abilities.get('catastrophic'),
    		});
    	},
    */
    onAfterMove(target, source, move) {
      if (move.catastrophic)
        this.boost({ atk: -1 }, source);
    },
    name: "Catastrophic",
    shortDesc: "Moves with \u226460 BP have 1.5x power and lower the target's Attack by 1 stage."
  },
  battletrance: {
    onSourceAfterFaint(length2, target, source, effect2) {
      if (effect2 && effect2.effectType === "Move") {
        source.cureStatus();
      }
    },
    name: "Battle Trance",
    shortDesc: "Upon attacking and KOing a foe, this Pokemon's status is healed."
  },
  refocus: {
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    onTryAddVolatile(status, pokemon2) {
      if (status.id === "flinch")
        return null;
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Refocus", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Refocus", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Refocus", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Refocus", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Refocus", "[of] " + target);
          }
          break;
      }
    },
    name: "Refocus",
    shortDesc: "Regenerator + Inner Focus"
  },
  /*
  	beastlytwist: {
  		onBoost(boost, target, source, effect) {
  			if (effect && effect.id === 'zpower') return;
  			let statName = 'atk';
  			let bestStat = 0;
  			let s;
  			for (s in this.effectState.target.storedStats) {
  				if (this.effectState.target.storedStats[s] > bestStat) {
  					statName = s;
  					bestStat = this.effectState.target.storedStats[s];
  				}
  			}
  			if (statName === 'atk') {
        		 boost.atk *= -1;
  			}
  		if (statName === 'def') {
        		 boost.def *= -1;
  			}
  			if (statName === 'spa') {
  	     		 boost.spa *= -1;
  			}
  			if (statName === 'spd') {
       		 boost.spd *= -1;
  			}
  			if (statName === 'spe') {
        		 boost.spe *= -1;
  			}
  		},
  		name: "Beastly Twist",
  		shortDesc: "(Mostly Non-Functional Placeholder) If this Pokemon's highest stat is raised, it is lowered instead, and vice versa.",
  	},
  */
  beastlytwist: {
    onChangeBoost(boost, target, source, effect2) {
      var _a;
      const bestStat = (_a = this.effectState).bestStat || (_a.bestStat = target.getBestStat(true, true));
      if (effect2 && effect2.id === "zpower" || !boost[bestStat])
        return;
      boost[bestStat] *= -1;
    },
    shortDesc: "Inverts stat changes to highest stat.",
    name: "Beastly Twist"
  },
  waterlogged: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Waterlogged");
        }
        return null;
      }
    },
    onSwitchIn(pokemon2) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon2) {
      pokemon2.abilityState.ending = false;
      if (this.effectState.switchingIn) {
        this.add("-ability", pokemon2, "Waterlogged");
        this.effectState.switchingIn = false;
      }
      this.eachEvent("WeatherChange", this.effect);
    },
    onEnd(pokemon2) {
      pokemon2.abilityState.ending = true;
      this.eachEvent("WeatherChange", this.effect);
    },
    suppressWeather: true,
    name: "Waterlogged",
    shortDesc: "Water Absorb + Air Lock"
  },
  megawatt: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Megawatt");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.activeTurns) {
        this.boost({ spe: 1 });
      }
    },
    name: "Megawatt",
    shortDesc: "Speed Boost + Pressure"
  },
  relentless: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      const boosts = {};
      let i;
      for (i in defender.boosts) {
        if (defender.boosts[i] < 0) {
          return this.chainModify([5325, 4096]);
        }
      }
    },
    name: "Relentless",
    shortDesc: "This Pokemon\u2019s attacks have 1.3x power against opponents with lowered stats."
  },
  rainparade: {
    onStart(source) {
      this.field.setWeather("raindance");
    },
    onAnySetWeather(target, source, weather) {
      const strongWeathers = ["desolateland", "primordialsea", "deltastream"];
      if (this.field.getWeather().id === "raindance" && !strongWeathers.includes(weather.id))
        return false;
    },
    onEnd(pokemon2) {
      if (this.field.weatherDataState.source !== pokemon2)
        return;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (target.hasAbility("rainparade")) {
          this.field.weatherDataState.source = target;
          return;
        }
      }
      this.field.clearWeather();
    },
    name: "Rain Parade",
    shortDesc: "While this Pok\xE9mon is active, Rain is active."
  },
  vigilance: {
    onDamagingHit(damage, target, source, effect2) {
      this.boost({ def: 1 });
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Vigilance", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Vigilance", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Vigilance", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Vigilance", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Vigilance", "[of] " + target);
          }
          break;
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: Vigilance");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: Vigilance");
      }
      if (pokemon2.volatiles["taunt"]) {
        this.add("-activate", pokemon2, "ability: Vigilance");
        pokemon2.removeVolatile("taunt");
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onTryHit(pokemon2, target, move) {
      if (move.ignoreAbility)
        return;
      if (move.id === "attract" || move.id === "captivate" || move.id === "taunt") {
        this.add("-immune", pokemon2, "[from] ability: Vigilance");
        return null;
      }
    },
    flags: {},
    name: "Vigilance",
    shortDesc: "Stamina + Oblivious"
  },
  floodgates: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Floodgates");
        }
        return null;
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 4);
    },
    flags: { breakable: 1 },
    name: "Floodgates",
    shortDesc: "Heals 25% of the user's max HP upon switching out or getting hit by a Water move; Water immunity."
  },
  magicarmour: {
    onBoost(boost, target, source, effect2) {
      if (target === source || !boost || effect2.id === "mirrorarmor" || effect2.id === "magicarmour")
        return;
      let b;
      for (b in boost) {
        if (boost[b] < 0) {
          if (target.boosts[b] === -6)
            continue;
          const negativeBoost = {};
          negativeBoost[b] = boost[b];
          delete boost[b];
          this.add("-ability", target, "Magic Armour");
          this.boost(negativeBoost, source, target, null, true);
        }
      }
    },
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target === source || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, target, source);
      return null;
    },
    onAllyTryHitSide(target, source, move) {
      if (target.side === source.side || move.hasBounced || !move.flags["reflectable"]) {
        return;
      }
      const newMove = this.dex.getActiveMove(move.id);
      newMove.hasBounced = true;
      newMove.pranksterBoosted = false;
      this.useMove(newMove, this.effectState.target, source);
      return null;
    },
    condition: {
      duration: 1
    },
    flags: { breakable: 1 },
    name: "Magic Armour",
    shortDesc: "Magic Bounce + Mirror Armor."
  },
  drakonblood: {
    shortDesc: "Dragon moves used restore user's HP by 50% of the damage dealt.",
    onAfterMoveSecondarySelfPriority: -1,
    onAfterMoveSecondarySelf(pokemon2, target, move) {
      if (move.type === "Dragon" && move.category !== "Status") {
        this.heal(pokemon2.lastDamage / 2, pokemon2);
      }
    },
    name: "Drakon Blood"
  },
  ultrahaircut: {
    shortDesc: "Pok\xE9mon making contact with this Pok\xE9mon have their highest stat lowered by 1 stage.",
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        this.add("-ability", target, "Ultra Haircut");
        this.boost({ [source.getBestStat(true, true)]: -1 }, source, target, null, true);
      }
    },
    name: "Ultra Haircut"
  },
  barbedarmour: {
    shortDesc: "Iron Barbs + Battle Armor",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    onCriticalHit: false,
    name: "Barbed Armour"
  },
  technocrat: {
    shortDesc: "Technician + Super Luck",
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Technocrat boost");
        return this.chainModify(1.5);
      }
    },
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    name: "Technocrat"
  },
  reload: {
    shortDesc: "33% chance to have its status cured and negative stats reset at the end of each turn.",
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon2) {
      if (pokemon2.hp && this.randomChance(1, 3)) {
        this.debug("reload");
        this.add("-activate", pokemon2, "ability: Reload");
        pokemon2.cureStatus();
        const boosts = {};
        let i;
        for (i in pokemon2.boosts) {
          if (pokemon2.boosts[i] < 0) {
            boosts[i] = 0;
          }
        }
        pokemon2.setBoost(boosts);
        this.add("-clearnegativeboost", pokemon2, "[silent]");
        this.add("-message", pokemon2.name + "'s negative stat changes were removed!");
      }
    },
    name: "Reload"
  },
  heatweight: {
    shortDesc: "Blaze + Heavy Metal",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Heat Weight boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Heat Weight boost");
        return this.chainModify(1.5);
      }
    },
    onModifyWeightPriority: 1,
    onModifyWeight(weighthg) {
      return weighthg * 2;
    },
    name: "Heat Weight"
  },
  hairlotion: {
    shortDesc: "Regenerator + Tangling Hair",
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.add("-ability", target, "Hair Lotion");
        this.boost({ spe: -1 }, source, target, null, true);
      }
    },
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    name: "Hair Lotion"
  },
  ironmaiden: {
    shortDesc: "Iron Barbs + Sticky Hold",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    onTakeItem(item, pokemon2, source) {
      if (this.suppressingAttackEvents(pokemon2) || !pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Iron Maiden");
        return false;
      }
    },
    name: "Iron Maiden"
  },
  metamorphic: {
    shortDesc: "Stance Change + Sturdy",
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (attacker.species.baseSpecies !== "Aegix" || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      const targetForme = move.id === "kingsshield" ? "Aegix" : "Aegix-Blade";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
    },
    onTryHit(pokemon2, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon2, "[from] ability: Sturdy");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect2) {
      if (target.hp === target.maxhp && damage >= target.hp && effect2 && effect2.effectType === "Move") {
        this.add("-ability", target, "Metamorphic");
        return target.hp - 1;
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Metamorphic"
  },
  galingsands: {
    shortDesc: "In Sandstorm, this Pokemon's Ground/Steel/Rock type moves have +1 priority.",
    onModifyPriority(priority, pokemon2, target, move) {
      if ((move?.type === "Ground" || move?.type === "Steel" || move?.type === "Rock") && this.field.isWeather("sandstorm"))
        return priority + 1;
    },
    name: "Galing Sands"
  },
  exorcist: {
    shortDesc: "Screen Cleaner + Cursed Body",
    onStart(pokemon2) {
      let activated = false;
      for (const sideCondition of ["reflect", "lightscreen", "auroraveil"]) {
        if (pokemon2.side.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Exorcist");
            activated = true;
          }
          pokemon2.side.removeSideCondition(sideCondition);
        }
        if (pokemon2.side.foe.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Exorcist");
            activated = true;
          }
          pokemon2.side.foe.removeSideCondition(sideCondition);
        }
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isFutureMove) {
        if (this.randomChance(3, 10)) {
          source.addVolatile("disable", this.effectState.target);
        }
      }
    },
    name: "Exorcist"
  },
  peerpressure: {
    shortDesc: "When this Pokemon is targeted by a move, it takes 3/4th damage from it and that move loses 2 PP.",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Peer Pressure");
    },
    onDeductPP(target, source) {
      if (target.side === source.side)
        return;
      return 1;
    },
    onSourceModifyDamage(damage, source, target, move) {
      this.debug("Peer Pressure neutralize");
      return this.chainModify(0.75);
    },
    name: "Peer Pressure"
  },
  testcram: {
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    onCriticalHit: false,
    name: "Test Cram",
    shortDesc: "Levitate + Super Luck + Immune to critical hits"
  },
  slowandsteady: {
    shortDesc: "If this Pokemon moves last, it takes 3/4 damage from all attacks.",
    onSourceModifyDamage(damage, source, target, move) {
      if (this.queue.willMove(target)) {
        this.debug("Slow and Steady neutralize");
        return this.chainModify(0.75);
      }
    },
    name: "Slow and Steady"
  },
  stresseating: {
    shortDesc: "On-switch, this Pokemon eats its berry.",
    onStart(pokemon2) {
      const item = pokemon2.getItem();
      if (item.isBerry && pokemon2.hp) {
        pokemon2.eatItem(true);
      } else {
        return false;
      }
    },
    name: "Stress Eating"
  },
  mephistospact: {
    shortDesc: "After this Pokemon lands a contact move, a target\u2019s ability is swapped with this one.",
    onAfterMove(target, source, move) {
      const additionalBannedAbilities = ["noability", "flowergift", "forecast", "hungerswitch", "illusion", "pillage", "magicmissile", "ecopy", "lemegeton", "modeshift", "rebootsystem", "concussion", "imposter", "neutralizinggas", "powerofalchemy", "receiver", "trace", "zenmode"];
      if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability) || source.volatiles["dynamax"]) {
        return;
      }
      if (move.flags["contact"]) {
        const targetAbility = target.setAbility("mephistospact", target);
        if (!targetAbility)
          return;
        if (source.side === target.side) {
          this.add("-activate", source, "Skill Swap", "", "", "[of] " + source);
        } else {
          this.add("-activate", source, "ability: Mephisto's Pact", this.dex.abilities.get(targetAbility).name, "Mephisto's Pact", "[of] " + source);
        }
        source.setAbility(targetAbility);
      }
    },
    name: "Mephisto's Pact"
  },
  realitysmasher: {
    shortDesc: "Mold Breaker + Defiant",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Reality Smasher");
      this.add("-message", `Drudlinks breaks reality!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Reality Smasher only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered) {
        this.add("-ability", target, "Reality Smasher");
        this.boost({ atk: 2 }, target, target, null, true);
      }
    },
    name: "Reality Smasher"
  },
  toxinreplica: {
    shortDesc: "(Non-functional placeholder) If another Pokemon uses a move with a chance of poisoning, this Pokemon uses the same move.",
    name: "Toxin Replica"
  },
  floatingreach: {
    shortDesc: "Long Reach + Levitate",
    onModifyMove(move) {
      delete move.flags["contact"];
    },
    name: "Floating Reach"
  },
  // LC Only Abilities
  "aurevoir": {
    // this one looks like EXACTLY the character limit
    shortDesc: "Switches out when it reaches 1/2 or less of its max HP and restores 1/3 of its max HP.",
    onEmergencyExit(target) {
      if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag)
        return;
      for (const side of this.sides) {
        for (const active of side.active) {
          active.switchFlag = false;
        }
      }
      this.effectState.exiting = true;
      target.switchFlag = true;
      this.add("-activate", target, "ability: Au Revoir");
    },
    onSwitchOut(pokemon2) {
      if (this.effectState.exiting === true) {
        this.effectState.exiting = void 0;
      } else {
        pokemon2.heal(pokemon2.baseMaxhp / 3);
      }
    },
    id: "aurevoir",
    name: "Au Revoir"
  },
  "clearcleaner": {
    // Functional!
    shortDesc: "On switch-in, Screens end for both sides. Other Pokemon cannot lower its stat stages.",
    onStart(pokemon2) {
      let activated = false;
      for (const sideCondition of ["reflect", "lightscreen", "auroraveil"]) {
        if (pokemon2.side.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Clear Cleaner");
            activated = true;
          }
          pokemon2.side.removeSideCondition(sideCondition);
        }
        if (pokemon2.side.foe.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Clear Cleaner");
            activated = true;
          }
          pokemon2.side.foe.removeSideCondition(sideCondition);
        }
      }
    },
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      let showMsg = false;
      for (const i in boost) {
        if (boost[i] < 0) {
          delete boost[i];
          showMsg = true;
        }
      }
      if (showMsg && !/** @type {ActiveMove} */
      effect2.secondaries && effect2.id !== "octolock") {
        this.add("-fail", target, "unboost", "[from] ability: Clear Cleaner", "[of] " + target);
      }
    },
    id: "clearcleaner",
    name: "Clear Cleaner"
  },
  "unamused": {
    // Functional!
    shortDesc: "Ignores stat changes. Summons Sandstorm when taking or dealing damage.",
    id: "unamused",
    name: "Unamused",
    onAnyModifyBoost(boosts, pokemon2) {
      const unawareUser = this.effectState.target;
      if (unawareUser === pokemon2)
        return;
      if (unawareUser === this.activePokemon) {
        if (pokemon2 === this.activeTarget) {
          boosts["def"] = 0;
          boosts["spd"] = 0;
          boosts["evasion"] = 0;
        }
      } else if (pokemon2 === this.activePokemon && unawareUser === this.activeTarget) {
        boosts["atk"] = 0;
        boosts["def"] = 0;
        boosts["spa"] = 0;
        boosts["accuracy"] = 0;
      }
    },
    onDamagingHit(damage, target, source, move) {
      this.field.setWeather("sandstorm");
    },
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (target !== source && move.category !== "Status" && !this.field.isWeather("sandstorm")) {
        this.field.setWeather("sandstorm");
      }
    }
  },
  "unbullet": {
    // Functional!
    shortDesc: "Speed doubles if it uses an item; immunity to ballistic moves.",
    id: "unbullet",
    name: "Unbullet",
    onAfterUseItem(item, pokemon2) {
      if (pokemon2 !== this.effectState.target)
        return;
      pokemon2.addVolatile("unburden");
    },
    onTakeItem(item, pokemon2) {
      pokemon2.addVolatile("unburden");
    },
    onEnd(pokemon2) {
      pokemon2.removeVolatile("unburden");
    },
    onTryHit(pokemon2, target, move) {
      if (move.flags["bullet"]) {
        this.add("-immune", pokemon2, "[from] ability: Unbullet");
        return null;
      }
    }
  },
  "nocturnalflash": {
    shortDesc: "Attacks have 1.3x power and a 30% chance to Poison if it moves last.",
    id: "nocturnalflash",
    name: "Nocturnal Flash",
    onBasePower(basePower, pokemon2) {
      let boosted = true;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (this.queue.willMove(target)) {
          boosted = false;
          break;
        }
      }
      if (boosted) {
        this.debug("Nocturnal Flash boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onModifyMove(move, pokemon2) {
      let boosted = true;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (this.queue.willMove(target)) {
          boosted = false;
          break;
        }
      }
      if (!move || move.target === "self")
        return;
      if (!boosted)
        return;
      if (!move.secondaries) {
        move.secondaries = [];
      }
      move.secondaries.push({
        chance: 30,
        status: "psn",
        ability: this.dex.abilities.get("nocturnalflash")
      });
    }
  },
  "fatalend": {
    shortDesc: "Punching moves 1.5x.",
    id: "fatalend",
    name: "Fatal End",
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Fatal End boost");
        return this.chainModify(1.5);
      }
    }
  },
  "faustianpact": {
    shortDesc: "Swaps abilities with target before landing a contact move.",
    id: "faustianpact",
    name: "Faustian Pact"
    // Effect coded directly in scripts.ts.
    // It's hitchhiking on Spectral Thief's "hitStepStealBoosts" effect,
    // since I don't think I can add new scripts *specifically to the battle step order*
    // and Spectral Thief has basically the same place in the hitstep, so it probably is fine there.
  },
  "abysmalsurge": {
    // Seems functional
    shortDesc: "Fire attacks have 45% brn chance; other attacks have 35% brn chance.",
    id: "abysmalsurge",
    name: "Abysmal Surge",
    onSourceDamagingHit(damage, target, source, move) {
      if (!target.hasAbility("shielddust") && this.randomChance(move.type === "Fire" ? 9 : 7, 20)) {
        target.trySetStatus("brn", source);
      }
    }
  },
  unusual: {
    onSourceModifyDamage(damage, source, target, move) {
      if (source.hasType(move.type)) {
        this.debug("Unusual weaken");
        return this.chainModify(0.67);
      }
      if (source.hasType(move.type) && (source.hasAbility("versatility") || source.hasAbility("levitability") || source.hasAbility("workability"))) {
        this.debug("Unusual weaken");
        return this.chainModify(0.5);
      }
      if (move.type === "Steel" && source.hasAbility("workability")) {
        this.debug("Unusual weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Unusual",
    shortDesc: "The opponent's STAB bonus is ignored when targeting this Pokemon."
  },
  toxincoat: {
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        const r = this.random(100);
        if (r < 15) {
          source.setStatus("par", target);
        } else if (r < 30) {
          source.setStatus("psn", target);
        }
      }
    },
    name: "Toxin Coat",
    shortDesc: "30% chance of poison or paralysis on others making contact with this Pokemon."
  },
  wetfilling: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.status || ["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    name: "Wet Filling",
    shortDesc: "1.5x when statused or in the rain; Ignores burn Attack drop."
  },
  noproprioception: {
    onBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: No Proprioception", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: No Proprioception", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: No Proprioception", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: No Proprioception", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: No Proprioception", "[of] " + target);
          }
          break;
      }
    },
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: No Proprioception");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: No Proprioception");
      }
      if (pokemon2.volatiles["taunt"]) {
        this.add("-activate", pokemon2, "ability: No Proprioception");
        pokemon2.removeVolatile("taunt");
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "attract" || move.id === "captivate" || move.id === "taunt") {
        this.add("-immune", pokemon2, "[from] ability: No Proprioception");
        return null;
      }
    },
    name: "No Proprioception",
    shortDesc: "Sheer Force + Oblivious"
  },
  roughtime: {
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["confusion"]) {
        this.add("-activate", pokemon2, "ability: Rough Time");
        pokemon2.removeVolatile("confusion");
      }
    },
    onTryAddVolatile(status, pokemon2) {
      if (status.id === "confusion")
        return null;
    },
    onHit(target, source, move) {
      if (move?.volatileStatus === "confusion") {
        this.add("-immune", target, "confusion", "[from] ability: Rough Time");
      }
    },
    onBoost(boost, target, source, effect2) {
      if (effect2.id === "intimidate" || effect2.id === "scarilyadorable" || effect2.id === "metalhead" || effect2.id === "creepy" || effect2.id === "catastrophic") {
        delete boost.atk;
        this.add("-immune", target, "[from] ability: Rough Time");
      }
      if (effect2.id === "peckingorder") {
        delete boost.def;
        this.add("-immune", target, "[from] ability: Rough Time");
      }
      if (effect2.id === "debilitate") {
        delete boost.spa;
        this.add("-immune", target, "[from] ability: Rough Time");
      }
      if (effect2.id === "sinkorswim" || effect2.id === "scarilyadorable") {
        delete boost.spe;
        this.add("-immune", target, "[from] ability: Rough Time");
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["contact"]) {
        return this.chainModify([5325, 4096]);
      }
    },
    name: "Rough Time",
    shortDesc: "Tough Claws + Own Tempo"
  },
  bigeyes: {
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.def && boost.def < 0) {
        delete boost.def;
        if (!effect2.secondaries && effect2.id !== "octolock") {
          this.add("-fail", target, "unboost", "Defense", "[from] ability: Big Eyes", "[of] " + target);
        }
      }
      if (boost.accuracy && boost.accuracy < 0) {
        delete boost.accuracy;
        if (!effect2.secondaries) {
          this.add("-fail", target, "unboost", "accuracy", "[from] ability: Big Eyes", "[of] " + target);
        }
      }
    },
    onModifyMove(move) {
      move.ignoreEvasion = true;
    },
    name: "Big Eyes",
    shortDesc: "Keen Eye + Big Pecks"
  },
  soundsensitive: {
    onDamagingHit(damage, target, source, move) {
      if (["allAdjacent", "allAdjacentFoes", "all"].includes(move.target)) {
        this.boost({ spe: 1 });
      }
    },
    onAfterBoost(boost, target, source, effect2) {
      if (effect2 && ["intimidate", "debilitate", "sinkorswim", "scarilyadorable", "peckingorder"].includes(effect2.id)) {
        this.boost({ spe: 1 });
      }
    },
    name: "Sound Sensitive",
    shortDesc: "+1 Speed when hit by a spread move or Intimidated"
  },
  feelsomepain: {
    onUpdate(pokemon2) {
      if (pokemon2.status === "psn" || pokemon2.status === "tox") {
        this.add("-activate", pokemon2, "ability: Feel Some Pain");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "psn" && status.id !== "tox")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Feel Some Pain");
      }
      return false;
    },
    name: "Feel Some Pain",
    shortDesc: "Immunity + Levitate"
  },
  versatility: {
    onModifyMove(move, pokemon2) {
      move.stab = 2;
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    name: "Versatility",
    shortDesc: "Sheer Force + Adaptability"
  },
  thickskull: {
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    name: "Thick Skull",
    shortDesc: "Sheer Force + Rock Head"
  },
  freehealthcare: {
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon2) {
      if (pokemon2.status) {
        this.debug("freehealthcare");
        this.add("-activate", pokemon2, "ability: Free Healthcare");
        pokemon2.cureStatus();
      }
    },
    name: "Free Healthcare",
    shortDesc: "This Pokemon's status is cured at the end of every turn."
  },
  airheaded: {
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        for (const moveSlot of target.moveSlots) {
          const move = this.dex.moves.get(moveSlot.move);
          if (move.category === "Status")
            continue;
          const moveType = move.id === "hiddenpower" ? target.hpType : move.type;
          if (this.dex.getImmunity(moveType, pokemon2) && this.dex.getEffectiveness(moveType, pokemon2) > 0 || move.ohko) {
            this.add("-ability", pokemon2, "Airheaded");
            return;
          }
        }
      }
    },
    onModifyPriority(priority, pokemon2, target, move) {
      if (move?.type === "Flying" && pokemon2.hp === pokemon2.maxhp)
        return priority + 1;
    },
    name: "Airheaded",
    shortDesc: "Anticipation + Gale Wings"
  },
  insidejob: {
    onBoost(boost, target, source, effect2) {
      if (effect2.id === "intimidate" || effect2.id === "scarilyadorable" || effect2.id === "metalhead" || effect2.id === "creepy" || effect2.id === "catastrophic") {
        delete boost.atk;
        this.add("-immune", target, "[from] ability: Inside Job");
      }
      if (effect2.id === "peckingorder") {
        delete boost.def;
        this.add("-immune", target, "[from] ability: Inside Job");
      }
      if (effect2.id === "debilitate") {
        delete boost.spa;
        this.add("-immune", target, "[from] ability: Inside Job");
      }
      if (effect2.id === "sinkorswim" || effect2.id === "scarilyadorable") {
        delete boost.spe;
        this.add("-immune", target, "[from] ability: Inside Job");
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: Inside Job");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: Inside Job");
      }
      if (pokemon2.volatiles["taunt"]) {
        this.add("-activate", pokemon2, "ability: Inside Job");
        pokemon2.removeVolatile("taunt");
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "attract" || move.id === "captivate" || move.id === "taunt") {
        this.add("-immune", pokemon2, "[from] ability: Inside Job");
        return null;
      }
    },
    onModifyMove(move) {
      move.infiltrates = true;
    },
    name: "Inside Job",
    shortDesc: "Oblivious + Infiltrator"
  },
  sandcastles: {
    onStart(pokemon2, source) {
      this.field.setWeather("sandstorm");
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        for (const moveSlot of target.moveSlots) {
          const move = this.dex.moves.get(moveSlot.move);
          if (move.category === "Status")
            continue;
          const moveType = move.id === "hiddenpower" ? target.hpType : move.type;
          if (this.dex.getImmunity(moveType, pokemon2) && this.dex.getEffectiveness(moveType, pokemon2) > 0 || move.ohko) {
            this.add("-ability", pokemon2, "Sandcastles");
            return;
          }
        }
      }
    },
    name: "Sandcastles",
    shortDesc: "Summons sand on switch-in and when shuddering."
  },
  resilientfat: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire") {
        this.debug("Resilient Fat weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire") {
        this.debug("Resilient Fat weaken");
        return this.chainModify(0.5);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon2, "[from] ability: Resilient Fat");
        return null;
      }
    },
    onDamagePriority: -100,
    onDamage(damage, target, source, effect2) {
      if (target.hp === target.maxhp && damage >= target.hp && effect2 && effect2.effectType === "Move") {
        this.add("-ability", target, "Resilient Fat");
        return target.hp - 1;
      }
    },
    name: "Resilient Fat",
    shortDesc: "Thick Fat + Sturdy"
  },
  numskull: {
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.def && boost.def < 0) {
        delete boost.def;
        if (!effect2.secondaries && effect2.id !== "octolock") {
          this.add("-fail", target, "unboost", "Defense", "[from] ability: Numskull", "[of] " + target);
        }
      }
    },
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    name: "Numskull",
    shortDesc: "Big Pecks + Rock Head"
  },
  boulderfists: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Boulder Fists boost");
        return this.chainModify([4915, 4096]);
      }
    },
    onAfterMove(target, source, move) {
      if (move.flags["punch"]) {
        this.boost({ def: -1, spe: 2 });
      }
    },
    name: "Boulder Fists",
    shortDesc: "This Pokemon's punching moves have 1.2x and give it -1 Def & +2 Spe."
  },
  cherrybomb: {
    onTryHit(pokemon2, target, move) {
      if (move.flags["bullet"]) {
        this.add("-immune", pokemon2, "[from] ability: Cherry Bomb");
        return null;
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        if (effect2?.status) {
          this.add("-immune", target, "[from] ability: Cherry Bomb");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Cherry Bomb");
        return null;
      }
    },
    name: "Cherry Bomb",
    shortDesc: "Bulletproof + Leaf Guard"
  },
  rumenramming: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 5,
    onModifyDef(pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    name: "Rumen Ramming",
    shortDesc: "1.5x Attack and Defense when statused; Ignores Attack burn drop"
  },
  plaincool: {
    onBoost(boost, target, source, effect2) {
      this.heal(target.baseMaxhp / 16);
      this.add("-heal", target, target.getHealth, "[from] ability: Plain Cool");
      if (effect2 && effect2.id === "zpower")
        return;
      let i;
      for (i in boost) {
        boost[i] *= 2;
      }
    },
    name: "Plain Cool",
    shortDesc: "This Pokemon's stat changes are doubled. Heals 1/16 of its HP when a stat is changed."
  },
  cursedduck: {
    onDamagingHit(damage, target, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isMax && !move.flags["futuremove"] && move.id !== "struggle" && this.randomChance(3, 10)) {
        source.addVolatile("disable", this.effectState.target);
      }
    },
    onModifyMovePriority: -5,
    onModifyMove(move) {
      move.ignoreImmunity || (move.ignoreImmunity = {});
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Fighting"] = true;
        move.ignoreImmunity["Normal"] = true;
      }
    },
    onTryBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Cursed Duck", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Cursed Duck", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Cursed Duck", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Cursed Duck", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Cursed Duck", "[of] " + target);
          }
          break;
      }
    },
    name: "Cursed Duck",
    shortDesc: "Scrappy + Cursed Body."
  },
  swiftmetal: {
    onModifySpe(spe, pokemon2) {
      if (["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    onModifyWeightPriority: 1,
    onModifyWeight(weighthg) {
      return weighthg * 2;
    },
    name: "Swift Metal",
    shortDesc: "Swift Swim + Heavy Metal"
  },
  poisoncontrol: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Poison Control boost");
        return this.chainModify(1.5);
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.status === "psn" || pokemon2.status === "tox") {
        this.add("-activate", pokemon2, "ability: Poison Control");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "psn" && status.id !== "tox")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Poison Control");
      }
      return false;
    },
    name: "Poison Control",
    shortDesc: "Technician + Immunity"
  },
  alluminiumbody: {
    onModifyWeight(weighthg) {
      return this.trunc(weighthg / 2);
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.modify(atk, 1.5);
    },
    onSourceModifyAccuracyPriority: 7,
    onSourceModifyAccuracy(accuracy, target, source, move) {
      if (move.category === "Physical" && typeof accuracy === "number") {
        return accuracy * 0.8;
      }
    },
    name: "Alluminium Body",
    shortDesc: "Light Metal + Hustle"
  },
  swarmrush: {
    onModifySpe(spe, pokemon2) {
      if (this.field.isWeather("sandstorm")) {
        return this.chainModify(2);
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "sandstorm")
        return false;
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Bug" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Swarm boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Bug" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Swarm boost");
        return this.chainModify(1.5);
      }
    },
    name: "Swarm Rush",
    shortDesc: "Swarm + Sand Rush"
  },
  courageous: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.status) {
        return this.chainModify(1.5);
      }
    },
    onBoost(boost, target, source, effect2) {
      if (source && target === source)
        return;
      if (boost.def && boost.def < 0) {
        delete boost.def;
        if (!effect2.secondaries && effect2.id !== "octolock") {
          this.add("-fail", target, "unboost", "Defense", "[from] ability: Courageous", "[of] " + target);
        }
      }
    },
    name: "Courageous",
    shortDesc: "Big Pecks + Guts"
  },
  superhustle: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.modify(atk, 1.5);
    },
    onSourceModifyAccuracyPriority: 7,
    onSourceModifyAccuracy(accuracy, target, source, move) {
      if (move.category === "Physical" && typeof accuracy === "number") {
        return accuracy * 0.8;
      }
    },
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    name: "Super Hustle",
    shortDesc: "Hustle + Super Luck"
  },
  levistatic: {
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"] && this.randomChance(3, 10)) {
        source.trySetStatus("par", target);
      }
    },
    name: "Levistatic",
    shortDesc: "Levitate + Static"
  },
  polarattraction: {
    onFoeTrapPokemon(pokemon2) {
      if (pokemon2.status === "par" && pokemon2.isAdjacent(this.effectState.target)) {
        pokemon2.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon2.isAdjacent(source))
        return;
      if (!pokemon2.status === "par") {
        pokemon2.maybeTrapped = true;
      }
    },
    name: "Polar Attraction",
    shortDesc: "Traps paralyzed opponents."
  },
  flawedjaw: {
    onTryMove(pokemon2, target, move) {
      if (move.flags["bite"]) {
        this.attrLastMove("[still]");
        this.add("-fail", pokemon2);
        return null;
      }
    },
    name: "Flawed Jaw",
    shortDesc: "This pok\xE9mon cannot use Biting moves."
  },
  subvergent: {
    onAfterEachBoost(boost, target, source, effect2) {
      if (!source || target.side === source.side) {
        if (effect2.id === "stickyweb") {
          this.hint("Court Change Sticky Web counts as lowering your own Speed, and Subvergent only affects stats lowered by foes.", true, source.side);
        }
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
          break;
        }
      }
      if (statsLowered) {
        this.add("-ability", target, "Subvergent");
        this.boost({ atk: 2 }, target, target, null, true);
        const stats = [];
        const boost2 = {};
        let statPlus;
        for (statPlus in target.boosts) {
          if (statPlus === "accuracy" || statPlus === "evasion")
            continue;
          if (target.boosts[statPlus] < 6) {
            stats.push(statPlus);
          }
        }
        const randomStat = stats.length ? this.sample(stats) : void 0;
        if (randomStat)
          boost2[randomStat] = randomStat === "atk" ? 4 : 2;
        this.boost(boost2);
      }
    },
    name: "Subvergent",
    shortDesc: "Raises Atk and a random (non Acc/Eva) stat by 2 when its stats are lowered by an opponent."
  },
  stinkguard: {
    onModifyMovePriority: -1,
    onModifyMove(move) {
      if (move.category !== "Status") {
        this.debug("Adding Stench flinch");
        move.secondaries || (move.secondaries = []);
        for (const secondary of move.secondaries) {
          if (secondary.volatileStatus === "flinch")
            return;
        }
        move.secondaries.push({
          chance: 10,
          volatileStatus: "flinch"
        });
      }
    },
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
    name: "Stink Guard",
    shortDesc: "No Guard + Stench"
  },
  vitalbody: {
    onUpdate(pokemon2) {
      if (pokemon2.status === "slp") {
        this.add("-activate", pokemon2, "ability: Vital Body");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect2) {
      if (status.id !== "slp")
        return;
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Vital Body");
      }
      return false;
    },
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("brn", target);
        }
      }
    },
    name: "Vital Body",
    shortDesc: "Flame Body + Vital Spirit"
  },
  shellbreaker: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Shell Breaker");
      this.add("-message", pokemon2.name + ` breaks the mold!`);
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    onCriticalHit: false,
    name: "Shell Breaker",
    shortDesc: "Shell Armor + Mold Breaker"
  },
  applearmor: {
    onSetStatus(status, target, source, effect2) {
      if (effect2?.status) {
        this.add("-immune", target, "[from] ability: Apple Armor");
      }
      return false;
    },
    name: "Apple Armor",
    shortDesc: "This Pokemon is immune to status conditions."
  },
  winterhoard: {
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onDamage(damage, target, source, effect2) {
      if (effect2 && effect2.id === "brn") {
        return damage / 2;
      }
    },
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.item)
        return;
      const pickupTargets = [];
      for (const target of this.getAllActive()) {
        if (target.lastItem && target.usedItemThisTurn && pokemon2.isAdjacent(target)) {
          pickupTargets.push(target);
        }
      }
      if (!pickupTargets.length)
        return;
      const randomTarget = this.sample(pickupTargets);
      const item = randomTarget.lastItem;
      randomTarget.lastItem = "";
      this.add("-item", pokemon2, this.dex.items.get(item), "[from] ability: Winter Hoard");
      pokemon2.setItem(item);
    },
    name: "Winter Hoard",
    shortDesc: "Heatproof + Pickup"
  },
  wetfood: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Wet Food boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Wet Food boost");
        return this.chainModify(1.5);
      }
    },
    onPreStart(pokemon2) {
      this.add("-ability", pokemon2, "Wet Food", pokemon2.side.foe);
    },
    onFoeTryEatItem: false,
    name: "Wet Food",
    shortDesc: "Torrent + Unnerve"
  },
  stoneage: {
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
      this.debug("Base Power: " + basePowerAfterMultiplier);
      if (basePowerAfterMultiplier <= 60) {
        this.debug("Stone Age boost");
        return this.chainModify(1.5);
      }
    },
    onDamage(damage, target, source, effect2) {
      if (effect2.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    name: "Stone Age",
    shortDesc: "Rock Head + Technician"
  },
  hydroforce: {
    onModifyMove(move, pokemon2) {
      if (move.secondaries) {
        delete move.secondaries;
        delete move.self;
        if (move.id === "clangoroussoulblaze")
          delete move.selfBoost;
        move.hasSheerForce = true;
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.hasSheerForce)
        return this.chainModify([5325, 4096]);
    },
    onAfterMove(target, source, move) {
      if (move.hasSheerForce)
        source.cureStatus();
    },
    name: "Hydroforce",
    shortDesc: "Moves with secondary effects have 1.3x power and heal this Pokemon's status."
  },
  humidatmosphere: {
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon2) {
      if (pokemon2.status && ["sunnyday", "desolateland", "raindance", "primordialsea", "hail", "sandstorm", "deltastream"].includes(pokemon2.effectiveWeather())) {
        this.debug("humidatmosphere");
        this.add("-activate", pokemon2, "ability: Humid Atmosphere");
        pokemon2.cureStatus();
      }
    },
    name: "Humid Atmosphere",
    shortDesc: "At the end of the turn, if any weather is active, this Pok\xE9mon has its status condition healed."
  },
  wimparmour: {
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        for (const moveSlot of target.moveSlots) {
          const move = this.dex.moves.get(moveSlot.move);
          if (move.category === "Status")
            continue;
          const moveType = move.id === "hiddenpower" ? target.hpType : move.type;
          if (this.dex.getImmunity(moveType, pokemon2) && this.dex.getEffectiveness(moveType, pokemon2) > 0 || move.ohko) {
            this.add("-ability", pokemon2, "Anticipation");
            this.boost({ spe: 2, def: -1 }, pokemon2);
            return;
          }
        }
      }
    },
    name: "Wimp Armour",
    shortDesc: "On switch in, shrudders and gains -1 Def +2 Speed if foe has any Super-Effective or OHKO moves."
  },
  spiritascent: {
    onStart(pokemon2) {
      let activated = false;
      for (const sideCondition of ["reflect", "lightscreen", "auroraveil"]) {
        if (pokemon2.side.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Spirit Ascent");
            activated = true;
          }
          pokemon2.side.removeSideCondition(sideCondition);
        }
        if (pokemon2.side.foe.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon2, "ability: Spirit Ascent");
            activated = true;
          }
          pokemon2.side.foe.removeSideCondition(sideCondition);
        }
      }
    },
    name: "Spirit Ascent",
    shortDesc: "Screen Cleaner + Levitate"
  },
  ghoulaway: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.getMoveHitData(move).typeMod > 0) {
        this.debug("Ghoul Away neutralize");
        return this.chainModify(0.75);
      }
    },
    name: "Ghoul Away",
    shortDesc: "Filter + Levitate"
  },
  dizzyvenom: {
    shortDesc: "30% chance a Pokemon making contact with this Pokemon will be poisoned or confused. Immune to Confusion and Intimidate.",
    onDamagingHit(damage, target, source, move) {
      if (move.flags["contact"]) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("psn", target);
          source.addVolatile("confusion", this.effectState.target);
        }
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["confusion"]) {
        this.add("-activate", pokemon2, "ability: Dizzy Venom");
        pokemon2.removeVolatile("confusion");
      }
    },
    onTryAddVolatile(status, pokemon2) {
      if (status.id === "confusion")
        return null;
    },
    onHit(target, source, move) {
      if (move?.volatileStatus === "confusion") {
        this.add("-immune", target, "confusion", "[from] ability: Dizzy Venom");
      }
    },
    onBoost(boost, target, source, effect2) {
      switch (effect2.name) {
        case "Scarily Adorable":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Dizzy Venom", "[of] " + target);
          }
        case "Intimidate":
        case "Metalhead":
        case "Creepy":
        case "Catastrophic":
          if (boost.atk) {
            delete boost.atk;
            this.add("-fail", target, "unboost", "Attack", "[from] ability: Dizzy Venom", "[of] " + target);
          }
          break;
        case "Pecking Order":
          if (boost.def) {
            delete boost.def;
            this.add("-fail", target, "unboost", "Defense", "[from] ability: Dizzy Venom", "[of] " + target);
          }
          break;
        case "Debilitate":
          if (boost.spa) {
            delete boost.spa;
            this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Dizzy Venom", "[of] " + target);
          }
          break;
        case "Sink or Swim":
          if (boost.spe) {
            delete boost.spe;
            this.add("-fail", target, "unboost", "Speed", "[from] ability: Dizzy Venom", "[of] " + target);
          }
          break;
      }
    },
    name: "Dizzy Venom"
  },
  laststand: {
    shortDesc: "This Pokemon's attacks do not make contact with the target and, at 1/3 HP or less, deal 1.5x damage.",
    onModifyMove(move) {
      if (move.flags["contact"]) {
        move.contactnt = true;
        delete move.flags["contact"];
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.contactnt && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Last Stand boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.contactnt && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Last Stand boost");
        return this.chainModify(1.5);
      }
    },
    name: "Last Stand"
  }
};
//# sourceMappingURL=abilities.js.map
