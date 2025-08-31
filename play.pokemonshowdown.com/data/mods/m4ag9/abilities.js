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
  // Gen 9 stuff
  battlebond: {
    inherit: true,
    onSourceAfterFaint(length, target, source, effect) {
      if (effect?.effectType !== "Move")
        return;
      if (source.abilityState.battleBondTriggered)
        return;
      if (source.species.id === "greninjabond" && source.hp && !source.transformed && source.side.foePokemonLeft()) {
        this.boost({ atk: 1, spa: 1, spe: 1 }, source, source, this.effect);
        this.add("-activate", source, "ability: Battle Bond");
        source.abilityState.battleBondTriggered = true;
      }
    },
    onModifyMove(move, attacker2) {
    }
  },
  competitive: {
    inherit: true,
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
      if (statsLowered) {
        this.boost({ spa: 2 }, target, target, null, false, true);
      }
    }
  },
  dauntlessshield: {
    inherit: true,
    onStart(pokemon2) {
      if (pokemon2.shieldBoost)
        return;
      pokemon2.shieldBoost = true;
      this.boost({ def: 1 }, pokemon2);
    }
  },
  defiant: {
    inherit: true,
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
      if (statsLowered) {
        this.boost({ atk: 2 }, target, target, null, false, true);
      }
    }
  },
  gulpmissile: {
    inherit: true,
    flags: { cantsuppress: 1, notransform: 1 }
  },
  heatproof: {
    inherit: true,
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker2, defender, move) {
      if (move.type === "Fire") {
        this.debug("Heatproof Atk weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker2, defender, move) {
      if (move.type === "Fire") {
        this.debug("Heatproof SpA weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceBasePower(basePower, attacker2, defender, move) {
    }
  },
  illuminate: {
    inherit: true,
    onTryBoost(boost, target, source, effect) {
      if (source && target === source)
        return;
      if (boost.accuracy && boost.accuracy < 0) {
        delete boost.accuracy;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "accuracy", "[from] ability: Illuminate", "[of] " + target);
        }
      }
    },
    onModifyMove(move) {
      move.ignoreEvasion = true;
    },
    flags: { breakable: 1 }
  },
  intrepidsword: {
    onStart(pokemon2) {
      if (pokemon2.swordBoost)
        return;
      pokemon2.swordBoost = true;
      this.boost({ atk: 1 }, pokemon2);
    }
  },
  libero: {
    inherit: true,
    onPrepareHit(source, target, move) {
      if (this.effectState.libero)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch" || move.callsMove)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.libero = true;
        this.add("-start", source, "typechange", type, "[from] ability: Libero");
      }
    },
    onSwitchIn() {
      delete this.effectState.libero;
    }
  },
  protean: {
    inherit: true,
    onPrepareHit(source, target, move) {
      if (this.effectState.protean)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch" || move.callsMove)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.protean = true;
        this.add("-start", source, "typechange", type, "[from] ability: Protean");
      }
    },
    onSwitchIn(pokemon2) {
      delete this.effectState.protean;
    }
  },
  snowwarning: {
    inherit: true,
    onStart(source) {
      this.field.setWeather("snow");
    }
  },
  transistor: {
    inherit: true,
    onModifyAtk(atk, attacker2, defender, move) {
      if (move.type === "Electric") {
        this.debug("Transistor boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onModifySpA(atk, attacker2, defender, move) {
      if (move.type === "Electric") {
        this.debug("Transistor boost");
        return this.chainModify([5325, 4096]);
      }
    }
  },
  // M4A Paldea
  accumulate: {
    desc: "If this Pok\xE9mon is a Mega Brambleghast, it calls for help and changes form at the end of each full turn it has been on the field, building up to Mega Brambleghast (Tangled Form) over five turns.",
    shortDesc: "More Brambleghast tangle up at the end of each turn.",
    onResidualOrder: 27,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Brambleghast" || pokemon2.transformed || !pokemon2.hp || !pokemon2.activeTurns || pokemon2.species.id === "brambleghast" || pokemon2.species.id === "brambleghastmegatangled")
        return;
      this.add("-activate", pokemon2, "ability: Accumulate");
      this.add("-message", `${pokemon2.name} called for help!`);
      if (pokemon2.species.id === "brambleghastmega") {
        pokemon2.formeChange("Brambleghast-Mega-1", this.effect, true);
      } else if (pokemon2.species.id === "brambleghastmega1") {
        pokemon2.formeChange("Brambleghast-Mega-2", this.effect, true);
      } else if (pokemon2.species.id === "brambleghastmega2") {
        pokemon2.formeChange("Brambleghast-Mega-3", this.effect, true);
      } else if (pokemon2.species.id === "brambleghastmega3") {
        pokemon2.formeChange("Brambleghast-Mega-4", this.effect, true);
      } else if (pokemon2.species.id === "brambleghastmega4") {
        pokemon2.formeChange("Brambleghast-Mega-Tangled", this.effect, true);
      }
      this.add("-message", `More of ${pokemon2.name}'s friends are getting tangled up!`);
      this.add("-start", pokemon2, "typechange", pokemon2.getTypes(true).join("/"), "[silent]");
      const species = this.dex.species.get(pokemon2.species.name);
      const abilities = species.abilities;
      const baseStats = species.baseStats;
      const type = species.types[0];
      const type2 = species.types[1];
      this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
      pokemon2.baseMaxhp = Math.floor(Math.floor(
        2 * pokemon2.species.baseStats["hp"] + pokemon2.set.ivs["hp"] + Math.floor(pokemon2.set.evs["hp"] / 4) + 100
      ) * pokemon2.level / 100 + 10);
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Accumulate",
    rating: 5,
    num: -2001
  },
  renaturalization: {
    desc: "This Pok\xE9mon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and sets Grassy Terrain.",
    shortDesc: "Hazard immunity. Clears hazards, sets Grassy Terrain if switched in on them.",
    onStart(pokemon2) {
      let activated = false;
      for (const sideCondition of ["gmaxsteelsurge", "spikes", "stealthrock", "stickyweb", "toxicspikes"]) {
        if (pokemon2.side.getSideCondition(sideCondition) && !this.field.getPseudoWeather("stickyresidues")) {
          if (!activated && !this.field.setTerrain("grassyterrain")) {
            this.add("-activate", pokemon2, "ability: Renaturalization");
            activated = true;
          }
          pokemon2.side.removeSideCondition(sideCondition);
          this.add("-sideend", pokemon2.side, this.dex.conditions.get(sideCondition).name, "[from] Ability: Renaturalization", "[of] " + pokemon2);
        }
      }
    },
    hazardImmune: true,
    name: "Renaturalization",
    rating: 5,
    num: -2002
  },
  pavise: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Dark") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Pavise");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Dark")
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Pavise");
        }
        return this.effectState.target;
      }
    },
    flags: { breakable: 1 },
    desc: "This Pokemon is immune to Dark-type moves and raises its Special Attack by 1 stage when hit by a Dark-type move. If this Pokemon is not the target of a single-target Dark-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
    shortDesc: "This Pokemon draws Dark moves to itself to raise Sp. Atk by 1; Dark immunity.",
    name: "Pavise",
    rating: 3,
    num: -2003
  },
  tarslosh: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Tar Slosh", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon2, null, true);
          target.addVolatile("tarslosh");
        }
      }
    },
    condition: {
      onStart(pokemon2, source, effect) {
        this.add("-start", pokemon2, "Tar", "[from] ability: Tar Slosh", "[of] " + source);
      },
      onAnyDamage(damage, target, source, effect) {
        if (effect && effect.effectType === "Move" && effect.type === "Fire" && target === this.effectState.target) {
          return damage * 2;
        }
      }
    },
    shortDesc: "On switch-in, lowers the Speed of every other Pokemon by 1 stage and makes them weak to Fire moves.",
    name: "Tar Slosh",
    rating: 3.5,
    num: -2005
  },
  colorspray: {
    desc: "The first damaging move used against a target since it has switched in turns the target into that type.",
    shortDesc: "Turns a target into the type of the first damaging move used against it.",
    onSourceDamagingHit(damage, target, source, move) {
      if (!target.hp)
        return;
      if (this.effectState.colorspray)
        return;
      const type = move.type;
      if (target.isActive && move.effectType === "Move" && move.category !== "Status" && type !== "???" && !target.hasType(type)) {
        if (!target.setType(type))
          return false;
        this.effectState.colorspray = true;
        this.add("-start", target, "typechange", type, "[from] ability: Color Change");
        if (target.side.active.length === 2 && target.position === 1) {
          const action = this.queue.willMove(target);
          if (action && action.move.id === "curse") {
            action.targetLoc = -1;
          }
        }
      }
    },
    onSwitchIn(pokemon2) {
      delete this.effectState.colorspray;
    },
    name: "Color Spray",
    rating: 4,
    num: -2008
  },
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
    onEnd(pokemon2) {
      this.field.removePseudoWeather("endlessdream");
    },
    name: "Endless Dream",
    rating: 3,
    num: -22
  },
  hairtrigger: {
    onModifyPriority(priority, pokemon2, target, move) {
      if (pokemon2.activeMoveActions < 1) {
        return priority + 0.1;
      }
      return priority;
    },
    desc: "The user moves first in their priority bracket on the first turn after switching in.",
    shortDesc: "Moves first in priority bracket on the first turn after switching in.",
    name: "Hair Trigger",
    rating: 5,
    num: -23
  },
  powdercoat: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker2, defender, move) {
      if (move.type === "Water") {
        this.debug("Powder Coat Atk weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(spa, attacker2, defender, move) {
      if (move.type === "Water") {
        this.debug("Powder Coat SpA weaken");
        return this.chainModify(0.5);
      }
    },
    onDamage(damage, target, source, effect) {
      if (effect.effectType !== "Move") {
        if (effect.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect.name);
        return damage / 2;
      }
    },
    flags: { breakable: 1 },
    name: "Powder Coat",
    desc: "This Pokemon takes 1/2 damages from indirect damage and water type moves.",
    shortDesc: "This Pokemon takes 1/2 damages from indirect damage and water type moves.",
    rating: 2,
    num: -24
  },
  latedelivery: {
    desc: "This Pok\xE9mon's non-contact Rock-type moves take effect two turns after being used. At the end of that turn, the damage is calculated at that time and dealt to the Pok\xE9mon at the position the target had when the move was used. Only one move can be delayed at a time. If the user is no longer active at the time an attacking move should hit, damage is calculated based on the user's natural Attack or Special Attack stat, types, and level, with no boosts from its held item or Ability. Status moves are used by the Pok\xE9mon at the position the user had when the move was used.",
    shortDesc: "Non-contact Rock-type moves delayed until two turns later, but only one at a time.",
    onBeforeMove(source, target, move) {
      if (move && move.type === "Rock" && !move.flags["contact"] && source.hasAbility("clairvoyance") && source.side.addSlotCondition(source, "clairvoyance")) {
        Object.assign(source.side.slotConditions[source.position]["clairvoyance"], {
          duration: 3,
          source,
          target: null,
          move,
          position: target.position,
          side: target.side,
          moveData: this.dex.moves.get(move)
        });
        this.add("-ability", source, "Late Delivery");
        this.add("-message", `${source.name} cast ${move.name} into the future!`);
        source.deductPP(move.id, 1);
        return null;
      }
    },
    condition: {
      duration: 3,
      onResidualOrder: 3,
      onEnd(target) {
        this.effectState.target = this.effectState.side.active[this.effectState.position];
        const data = this.effectState;
        const move = this.dex.moves.get(data.move);
        this.add("-ability", this.effectState.source, "Late Delivery");
        if (!data.target) {
          this.hint(`${move.name} did not hit because there was no target.`);
          return;
        }
        this.add("-message", `${this.effectState.source.name}'s ${move.name} took effect!`);
        data.target.removeVolatile("Endure");
        if (data.source.hasAbility("infiltrator") && this.gen >= 6) {
          data.moveData.infiltrates = true;
        }
        if (data.source.hasAbility("normalize") && this.gen >= 6) {
          data.moveData.type = "Normal";
        }
        if (data.source.hasAbility("adaptability") && this.gen >= 6) {
          data.moveData.stab = 2;
        }
        data.moveData.isFutureMove = true;
        delete data.moveData.flags["contact"];
        delete data.moveData.flags["protect"];
        if (move.category === "Status") {
          this.actions.useMove(move, target, data.target);
        } else {
          const hitMove = new this.dex.Move(data.moveData);
          if (data.source.isActive) {
            this.add("-anim", data.source, hitMove, data.target);
          }
          this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
        }
      }
    },
    name: "Clairvoyance",
    rating: 3,
    num: -25
  },
  toxicdrain: {
    shortDesc: "Removes Poison typing from adjacent Pokemon on switch-in. User gains +1 SpA for each Poison typing removed.",
    desc: "Upon switch-in, the Poison typing is removed from all adjacent Pokemon. The user gains +1 SpA for each Poison typing removed.",
    onUpdate(pokemon2) {
      for (const target of this.getAllActive()) {
        if (!target || target === pokemon2)
          continue;
        if (target.hasType("Poison") && target.isAdjacent(this.effectState.target)) {
          target.setType(target.getTypes(true).map((type) => type === "Poison" ? "???" : type));
          this.add("-start", target, "typechange", target.types.join("/"), "[from] ability: Toxic Drain", "[of] " + pokemon2);
          this.boost({ spa: 1 }, pokemon2);
          this.add("-activate", this.effectState.target, "ability: Toxic Drain");
        }
      }
    },
    name: "Toxic Drain",
    rating: 4,
    num: -26
  },
  /*congestion: { //rn it only works with one move at a time; will have to correct that
  		desc: "This Pokémon's status moves don't take effect until the user is switching out.",
  		shortDesc: "Status moves don't effect until the user switches out.",
  		onBeforeMove(source, target, move) {
  			if (
  				move && move.category === 'Status' && source.hasAbility('congestion') &&
  				source.side.addSlotCondition(source, 'congestion')
  			) {
  				Object.assign(source.side.slotConditions[source.position]['congestion'], {
  					source: source,
  					target: null,
  					move: move,
  					position: target.position,
  					side: target.side,
  					moveData: this.dex.moves.get(move),
  				});
  				this.add('-ability', source, 'Congestion');
  				this.add('-message', `${source.name} will cast ${move.name} when it goes!`);
  				source.deductPP(move.id, 1);
  				return null;
  			}
  		},
  		condition: {
  			onResidualOrder: 3,
  			onSwitchOut(target) {
  				this.effectState.target = this.effectState.side.active[this.effectState.position];
  				const data = this.effectState;
  				const move = this.dex.moves.get(data.move);
  				this.add('-ability', this.effectState.source, 'Congestion');
  				if (!data.target) {
  					this.hint(`${move.name} did not hit because there was no target.`);
  					return;
  				}
  
  				this.add('-message', `${this.effectState.source.name}'s ${move.name} took effect!`);
  				data.target.removeVolatile('Endure');
  
  				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
  					data.moveData.infiltrates = true;
  				}
  				if (data.source.hasAbility('normalize') && this.gen >= 6) {
  					data.moveData.type = 'Normal';
  				}
  				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
  					data.moveData.stab = 2;
  				}
  				data.moveData.isFutureMove = true;
  				delete data.moveData.flags['contact'];
  				delete data.moveData.flags['protect'];
  
  				if (move.category === 'Status') {
  					this.actions.useMove(move, target, data.target);
  				}
  			},
  		},
  		name: "Congestion",
  		rating: 3,
  		num: -27,
  	},*/
  congestion: {
    name: "Congestion",
    shortDesc: "All status moves are delayed until all Congestion users are gone.",
    rating: 3,
    num: -27,
    onUpdate(pokemon2) {
      for (const p of this.getAllActive()) {
        const slot = p.position;
        const side = p.side;
        if (!side.slotConditions[slot]?.congestionstatus) {
          side.addSlotCondition(p, "congestionstatus");
        }
      }
    }
  },
  twinheart: {
    shortDesc: "Switches to Nocturnal form before using a Physical move, and to Diurnal form before using a Special move.",
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker2, defender, move) {
      if (attacker2.species.baseSpecies !== "Farigiraf" || attacker2.transformed)
        return;
      if (move.category === "Status")
        return;
      const targetForme = move.category === "Special" ? "Farigiraf-Mega" : "Farigiraf-Mega-Nocturnal";
      if (attacker2.species.name !== targetForme)
        attacker2.formeChange(targetForme);
      this.add("-start", attacker2, "typechange", attacker2.getTypes(true).join("/"), "[silent]");
      const newatk = attacker2.storedStats.spa;
      const newspa = attacker2.storedStats.atk;
      attacker2.storedStats.atk = newatk;
      attacker2.storedStats.spa = newspa;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Twin Heart",
    rating: 4,
    num: -29
  },
  sugarrush: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fairy") {
        if (!this.boost({ spe: 12 })) {
          this.add("-immune", target, "[from] ability: Sugar Rush");
        }
        target.addVolatile("sugarrush");
        return null;
      }
    },
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      if (pokemon2.volatiles["sugarrush"]) {
        this.boost({ spe: -2 }, pokemon2);
      }
    },
    flags: { breakable: 1 },
    name: "Sugar Rush",
    shortDesc: "When hit by a fairy type move, gain +12 speed, which will then decrease by 2 stages at the end of every turn until the user switches out. Fairy Immunity.",
    rating: 3,
    num: -30
  },
  residualdrain: {
    desc: "Every time another Pok\xE9mon is damaged indirectly, this Pok\xE9mon's HP is restored by the same amount.",
    shortDesc: "Heals from the indirect damage dealt to others.",
    onAnyDamage(damage, target, source, effect) {
      const pokemon2 = this.effectState.target;
      if (effect.effectType !== "Move" && target !== pokemon2 && effect.id !== "leechseed") {
        pokemon2.heal(damage);
        this.add("-heal", pokemon2, pokemon2.getHealth, "[silent]");
      }
    },
    name: "Residual Drain",
    rating: 4,
    num: -31
  },
  agitation: {
    // Thank you BlueRay lol
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
    num: -32
  },
  vengeful: {
    desc: "If the user's previous move failed, the user's next attack deals 2x damage (Stomping Tantrum parameters).",
    shortDesc: "If the user's previous move failed, the user's next attack deals 2x damage (Stomping Tantrum parameters).",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker2, defender, move) {
      if (pokemon.moveLastTurnResult === false) {
        this.debug("doubling ", move, " BP due to previous move failure");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    name: "Vengeful",
    rating: 3,
    num: -33
  },
  frostaura: {
    shortDesc: "Turns all Water-type Pok\xE9mon into Ice-type Pok\xE9mon, and Water-type moves into Ice-type moves until a thawing move is used.",
    desc: "While this Pok\xE9mon is on the field, all Water-type Pok\xE9mon become Ice-type Pok\xE9mon, and all Water-type moves become Ice-type moves. This effect ends when a thawing move is used.",
    onStart(pokemon2) {
      let activated = false;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (!target.hasType("Water"))
          continue;
        if (!activated) {
          this.add("-ability", pokemon2, "Frost Aura", "boost");
          activated = true;
        } else {
          target.addVolatile("frostaura");
        }
      }
    },
    condition: {
      onStart(pokemon2, source, effect) {
        this.add("-start", pokemon2, "Frost", "[from] ability: Frost Aura", "[of] " + source);
      },
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
        if (move.type === "Water" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon2.terastallized)) {
          move.type = "Ice";
          move.typeChangerBoosted = this.effect;
        }
      },
      onUpdate(pokemon2) {
        for (const target of this.getAllActive()) {
          if (!target || target === pokemon2)
            continue;
          if (target.hasType("Water") && target.isAdjacent(this.effectState.target)) {
            target.setType(target.getTypes(true).map((type) => type === "Water" ? "Ice" : type));
            this.add("-start", target, "typechange", target.types.join("/"), "[from] ability: Frost Aura", "[of] " + pokemon2);
          }
        }
      },
      onAfterMoveSecondary(target, source, move) {
        if (move.flags["defrost"]) {
          target.removeVolatile("frostaura");
        }
      }
    },
    name: "Frost Aura",
    rating: 4,
    num: -35
  },
  grudgefultablets: {
    onStart(pokemon2) {
      if (this.suppressingAbility(pokemon2))
        return;
      this.add("-ability", pokemon2, "Grudgeful Tablets");
    },
    onAnyBasePowerPriority: 20,
    onAnyBasePower(basePower, source, target, move) {
      const abilityHolder = this.effectState.target;
      if (source.hasAbility("Grudgeful Tablets"))
        return;
      if (!move.ruinedAtk)
        move.ruinedAtk = abilityHolder;
      if (move.ruinedAtk !== abilityHolder)
        return;
      if (source.getMoveHitData(move).typeMod > 0) {
        this.debug("Grudgeful Tablets drop");
        return this.chainModify(0.75);
      }
    },
    flags: {},
    shortDesc: "All other Pok\xE9mon without this ability deal 3/4 damage with Super Effective hits.",
    desc: "All other Pok\xE9mon without this ability deal 3/4 damage with Super Effective hits.",
    name: "Grudgeful Tablets",
    rating: 4.5,
    num: -36
  },
  hauntingmelody: {
    onModifyMove(move, pokemon2, target) {
      console.log("target is " + target);
      if (move.flags["sound"]) {
        if (target.hasType("Ghost"))
          return false;
        if (!target.addType("Ghost"))
          return false;
        this.add("-start", target, "typeadd", "Ghost", "[from] move: Trick-or-Treat");
      }
    },
    flags: {},
    name: "Haunting Melody",
    shortDesc: "The user's sound moves add ghost type to the target.",
    rating: 1.5,
    num: -37
  },
  liquidate: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        this.actions.useMove("soak", this.effectState.target);
      }
    },
    flags: {},
    name: "Liquidate",
    shortDesc: "If this pokemon is hit by a physical move, use Soak on the opponent.",
    rating: 1.5,
    num: -38
  },
  toxicgains: {
    onBasePower(basePower, pokemon2, target, move) {
      if (move.type !== "Poison")
        return basePower;
      const bp = basePower + 20 * pokemon2.positiveBoosts();
      return bp;
    },
    flags: {},
    name: "Toxic Gains",
    shortDesc: "Poison-type moves gain +20 base power for each stat boost.",
    rating: 1.5,
    num: -39
  },
  iceface: {
    inherit: true,
    onStart(pokemon2) {
      if (this.field.isWeather(["hail", "snow"]) && (pokemon2.species.id === "eiscuenoice" || pokemon2.species.id === "perrserkermegabusted")) {
        this.add("-activate", pokemon2, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon2.formeChange("Eiscue", this.effect, true);
      }
    },
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect?.effectType === "Move" && effect.category === "Physical" && (target.species.id === "eiscue" || target.species.id === "perrserkermega")) {
        this.add("-activate", target, "ability: Ice Face");
        this.effectState.busted = true;
        return 0;
      }
    },
    onCriticalHit(target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id !== "eiscue" && target.species.id !== "perrserkermega")
        return;
      if (target.volatiles["substitute"] && !(move.flags["bypasssub"] || move.infiltrates))
        return;
      if (!target.runImmunity(move.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id !== "eiscue" && target.species.id !== "perrserkermega")
        return;
      const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return 0;
    },
    onUpdate(pokemon2) {
      if (pokemon2.species.id === "eiscue" && this.effectState.busted) {
        pokemon2.formeChange("Eiscue-Noice", this.effect, true);
      } else if (pokemon2.species.id === "perrserkermega" && this.effectState.busted) {
        pokemon2.formeChange("Perrserker-Mega-Busted", this.effect, true);
      }
    },
    onWeatherChange(pokemon2, source, sourceEffect) {
      if (sourceEffect?.suppressWeather)
        return;
      if (!pokemon2.hp)
        return;
      if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "eiscuenoice") {
        this.add("-activate", pokemon2, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon2.formeChange("Eiscue", this.effect, true);
      } else if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "perrserkermegabusted") {
        this.add("-activate", pokemon2, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon2.formeChange("Perrserker-Mega", this.effect, true);
      }
    },
    desc: "If this Pokemon is an Eiscue or a Perrserker-Mega, the first physical hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
    shortDesc: "If Eiscue or Perrserker-Mega, the first physical hit it takes deals 0 damage. Effect is restored in Snow."
  },
  trickysurge: {
    onStart(source) {
      this.add("-activate", source, "ability: Tricky Surge");
      this.field.addPseudoWeather("magicroom");
    },
    flags: {},
    name: "Tricky Surge",
    shortDesc: "On switch-in, set Magic Room for 5 turns.",
    rating: 4,
    num: -40
  },
  shieldsdown: {
    inherit: true,
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Minior" && !attacker.species.name.startsWith("Minior-Mega") || pokemon2.transformed)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 2) {
        if (attacker.species.name.startsWith("Minior-Mega") && pokemon2.species.forme !== "Mega-Meteor") {
          pokemon2.formeChange("Minior-Mega-Meteor");
        } else if (pokemon2.baseSpecies.baseSpecies === "Minior" && pokemon2.species.forme !== "Meteor") {
          pokemon2.formeChange("Minior-Meteor");
        }
      } else {
        if (attacker.species.name.startsWith("Minior-Mega") && pokemon2.species.forme === "Mega-Meteor") {
          pokemon2.formeChange("Minior-Mega");
        } else if (pokemon2.species.forme === "Meteor") {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Minior" && !attacker.species.name.startsWith("Minior-Mega") || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 2) {
        if (attacker.species.name.startsWith("Minior-Mega") && pokemon2.species.forme !== "Mega-Meteor") {
          pokemon2.formeChange("Minior-Mega-Meteor");
        } else if (pokemon2.baseSpecies.baseSpecies === "Minior" && pokemon2.species.forme !== "Meteor") {
          pokemon2.formeChange("Minior-Meteor");
        }
      } else {
        if (attacker.species.name.startsWith("Minior-Mega") && pokemon2.species.forme === "Mega-Meteor") {
          pokemon2.formeChange("Minior-Mega");
        } else if (pokemon2.species.forme === "Meteor") {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    onSetStatus(status, target, source, effect) {
      if (target.species.id !== "miniormeteor" && target.species.id !== "miniormegameteor" || target.transformed)
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Shields Down");
      }
      return false;
    },
    onTryAddVolatile(status, target) {
      if (target.species.id !== "miniormeteor" && target.species.id !== "miniormegameteor" || target.transformed)
        return;
      if (status.id !== "yawn")
        return;
      this.add("-immune", target, "[from] ability: Shields Down");
      return null;
    }
  },
  dustdevil: {
    desc: "This pokemon's damaging Ground-type moves damage all affected pokemon for 1/10th of their max HP at the end of each turn and heal the user for that much damage. Does not affect Ground-type pokemon.",
    shortDesc: "This pokemon's damaging Ground-type moves damage all affected pokemon for 1/10th of their max HP at the end of each turn and heal the user for that much damage. Does not affect Ground-type pokemon.",
    name: "Dust Devil",
    onAfterMoveSecondarySelf(source, target, move) {
      if (move.category === "Status" || move.type !== "Ground" || target.hasType("Ground"))
        return;
      target.addVolatile("dustdevil");
    },
    condition: {
      onResidualOrder: 3,
      onResidual(pokemon2) {
        this.damage(pokemon2.baseMaxhp / 10, pokemon2, pokemon2);
      }
    }
  },
  roaringscream: {
    desc: "When this Pok\xE9mon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
    shortDesc: "Inflicts Torment effect if the Pok\xE9mon uses a Sound move.",
    onAfterMove(source, target, move) {
      if (!move.flags["sound"])
        return;
      const applyTorment = (pokemon2) => {
        if (pokemon2 && !pokemon2.hasAbility("soundproof") && !pokemon2.volatiles["torment"] && !pokemon2.volatiles["stall"]) {
          pokemon2.addVolatile("torment");
          this.add("-start", pokemon2, "Torment", "[from] ability: Buzz");
        }
      };
      switch (move.target) {
        case "all":
          for (const pokemon2 of this.getAllActive()) {
            applyTorment(pokemon2);
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
    name: "Roaring Scream",
    rating: 3,
    num: -5
  }
};
//# sourceMappingURL=abilities.js.map
