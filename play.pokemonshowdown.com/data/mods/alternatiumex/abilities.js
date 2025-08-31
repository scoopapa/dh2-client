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
  soulreap: {
    onBasePower(basePower, attacker, defender, move) {
      if (defender.volatiles["partiallytrapped"] || defender.volatiles["trapped"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Soul Reap",
    shortDesc: "This Pokemon's attacks have 1.5x power against trapped targets.",
    rating: 4,
    num: -1
  },
  immolation: {
    onModifySpDPriority: 6,
    onModifySpD(spd, source, target2) {
      if (target2.status === "brn") {
        return this.chainModify(1.5);
      }
    },
    name: "Immolation",
    shortDesc: "This Pokemon's Special Defense is 1.5x against burned attackers.",
    rating: 4,
    num: -2
  },
  staccato: {
    onDamagingHit(damage, target2, source, move) {
      if (!this.field.isTerrain("electricterrain")) {
        this.field.setTerrain("electricterrain");
        target2.addVolatile("staccato");
      }
    },
    condition: {
      noCopy: true,
      onStart(pokemon) {
        let applies = false;
        if (pokemon.hasType("Flying") || pokemon.hasAbility("levitate"))
          applies = true;
        if (pokemon.hasItem("ironball") || pokemon.volatiles["ingrain"] || this.field.getPseudoWeather("gravity"))
          applies = false;
        if (pokemon.removeVolatile("fly") || pokemon.removeVolatile("bounce")) {
          applies = true;
          this.queue.cancelMove(pokemon);
          pokemon.removeVolatile("twoturnmove");
        }
        if (pokemon.volatiles["magnetrise"]) {
          applies = true;
          delete pokemon.volatiles["magnetrise"];
        }
        if (pokemon.volatiles["telekinesis"]) {
          applies = true;
          delete pokemon.volatiles["telekinesis"];
        }
        if (!applies)
          return false;
        this.add("-start", pokemon, "Staccato");
      },
      onRestart(pokemon) {
        if (pokemon.removeVolatile("fly") || pokemon.removeVolatile("bounce")) {
          this.queue.cancelMove(pokemon);
          this.add("-start", pokemon, "Staccato");
        }
      }
      // groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
    },
    name: "Staccato",
    shortDesc: "If this Pokemon is attacked, it sets Electric Terrain and grounds itself.",
    rating: 4,
    num: -3
  },
  necrodancer: {
    onAnyFaint() {
      const necrodancertarget = this.effectState.target;
      necrodancertarget.addVolatile("necrodancer");
    },
    onAfterMove(pokemon, target2, move) {
      if (pokemon.volatiles["necrodancer"] && move.flags["dance"]) {
        pokemon.removeVolatile("necrodancer");
      }
    },
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(target2) {
        this.add("-start", target2, "ability: Necro Dancer");
      },
      onModifyPriority(priority, pokemon, target2, move) {
        if (move.flags["dance"])
          return priority + 1;
      },
      onEnd(target2) {
        this.add("-end", target2, "ability: Necro Dancer", "[silent]");
      }
    },
    name: "Necro Dancer",
    shortDesc: "(Non-functional) This Pokemon's next dance move gains +1 priority when another Pok\xE9mon faints.",
    rating: 3.5,
    num: -4
  },
  electricfusion: {
    onAfterBoost(boost, target2, source, effect) {
      if (!boost || effect.id === "electricfusion")
        return;
      let activated = false;
      const electricfusionBoost = {};
      if (boost.spa) {
        electricfusionBoost.spd = 1 * boost.spa;
        activated = true;
      }
      if (boost.spd) {
        electricfusionBoost.spa = 1 * boost.spd;
        activated = true;
      }
      if (activated === true) {
        this.add("-ability", target2, "Electric Fusion");
        this.boost(electricfusionBoost, target2, target2, null, true);
      }
    },
    name: "Electric Fusion",
    shortDesc: "This Pokemon's stat changes to Sp. Atk. are shared with Sp. Def. and vice versa.",
    rating: 4,
    num: -5
  },
  splitsystem: {
    // Not used in this mod, but the code can be helpful
    onModifyMovePriority: -1,
    onModifyMove(move) {
      if (move.type === "Dark") {
        move.category === "Special";
      }
      if (move.type === "Steel") {
        move.category === "Physical";
      }
    },
    name: "Split System",
    shortDesc: "This Pokemon's Dark-type moves are special and its Steel-type moves are physical.",
    rating: 2,
    num: -6
  },
  surgesurfer: {
    onModifySpe(spe) {
      if (!this.field.isTerrain("")) {
        return this.chainModify(2);
      }
    },
    name: "Surge Surfer",
    shortDesc: "If any Terrain is active, this Pokemon's Speed is doubled.",
    rating: 3,
    num: 207
  },
  rubberarmor: {
    onStart(pokemon) {
      this.add("-ability", pokemon, "Rubber Armor");
    },
    onFoeBeforeMovePriority: 13,
    onFoeBeforeMove(attacker, defender, move) {
      if (move.category === "Status")
        return;
      attacker.addVolatile("rubberarmor");
    },
    condition: {
      onAfterMove(pokemon) {
        pokemon.removeVolatile("rubberarmor");
      }
    },
    name: "Rubber Armor",
    shortDesc: "Negates opponent's abilities when targeted by an attacking move.",
    rating: 2,
    num: -7
  },
  asoneglastrier: {
    onPreStart(pokemon) {
      this.add("-ability", pokemon, "As One");
    },
    onStart(source) {
      this.field.setWeather("hail");
    },
    onWeather(target2, source, effect) {
      if (effect.id === "hail" || effect.id === "snow") {
        this.heal(target2.baseMaxhp / 16);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "As One (Glastrier)",
    shortDesc: "The effects of Ice Body. Summons Hail on entry.",
    rating: 3.5,
    num: 266
  },
  grimneigh: {
    onFaint(source, target2) {
      for (const target3 of this.getAllActive()) {
        target3.clearBoosts();
        this.add("-clearboost", target3, "[from] ability: Grim Neigh", "[of] " + source);
        target3.cureStatus();
      }
    },
    name: "Grim Neigh",
    shortDesc: "Upon fainting, all active Pokemon have their stat changes and non-volatile status cleared.",
    rating: 3,
    num: 265
  },
  excavate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
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
        move.type = "Rock";
        move.excavateBoosted = true;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target2, move) {
      if (move.excavateBoosted)
        return this.chainModify([4915, 4096]);
    },
    name: "Excavate",
    shortDesc: "This Pokemon's Normal-type moves become Rock type and have 1.2x power.",
    rating: 4,
    num: -8
  },
  exoskelett: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Bug") {
        this.debug("Exoskelett boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Bug") {
        this.debug("Exoskelett boost");
        return this.chainModify(1.5);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Ground") {
        this.debug("Exoskelett weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Ground") {
        this.debug("Exoskelett weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Exoskelett",
    shortDesc: "User gains STAB on Bug moves and also gains Bug-type resistances.",
    rating: 4.5,
    num: -9
  },
  screencleaner: {
    onStart(pokemon) {
      let activated = false;
      for (const sideCondition of ["reflect", "lightscreen", "auroraveil"]) {
        if (pokemon.side.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon, "ability: Screen Cleaner");
            activated = true;
          }
          pokemon.side.removeSideCondition(sideCondition);
        }
        if (pokemon.side.foe.getSideCondition(sideCondition)) {
          if (!activated) {
            this.add("-activate", pokemon, "ability: Screen Cleaner");
            activated = true;
          }
          pokemon.side.foe.removeSideCondition(sideCondition);
        }
      }
      for (const pseudoWeather of ["wonderroom", "trickroom", "magicroom"]) {
        if (this.field.getPseudoWeather(pseudoWeather)) {
          if (!activated) {
            this.add("-activate", pokemon, "ability: Screen Cleaner");
            activated = true;
          }
          this.field.removePseudoWeather(pseudoWeather);
        }
      }
      this.field.clearTerrain();
    },
    shortDesc: "On switch-in, the effects of Screens, Terrains and Rooms end for both sides.",
    inherit: true
  },
  lightarmor: {
    onSourceModifyDamage(damage, source, target2, move) {
      if (["Dark", "Fairy", "Ghost"].includes(move.type)) {
        this.debug("Light Armor neutralize");
        return this.chainModify(0.67);
      }
    },
    isUnbreakable: true,
    name: "Light Armor",
    shortDesc: "This Pokemon takes 2/3 damage from Dark-, Fairy- and Ghost-moves.",
    rating: 3,
    num: -10
  },
  neuroforce: {
    onModifyDamage(damage, source, target2, move) {
      if (move && target2.getMoveHitData(move).typeMod === 0) {
        return this.chainModify(1.1);
      }
    },
    shortDesc: "This Pokemon does 1.1x damage on neutral targets.",
    inherit: true
  },
  battlescarred: {
    onAfterMoveSecondary(target2, source, move) {
      if (!source || source === target2 || !target2.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target2.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target2.hp <= target2.maxhp / 2 && target2.hp + damage > target2.maxhp / 2) {
        this.boost({ atk: 1 });
      }
    },
    name: "Battle-Scarred",
    shortDesc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its max HP.",
    rating: 2,
    num: -11
  },
  grounding: {
    onTryHit(target2, source, move) {
      if (target2 !== source && move.type === "Ground") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target2, "[from] ability: Grounding");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target2, source, source2, move) {
      if (move.type !== "Ground" || ["firepledge", "grasspledge", "waterpledge"].includes(move.id))
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target2) {
          this.add("-activate", this.effectState.target, "ability: Grounding");
        }
        return this.effectState.target;
      }
    },
    name: "Grounding",
    shortDesc: "This Pokemon draws Ground moves to itself to raise Sp. Atk by 1; Ground immunity.",
    rating: 3,
    num: -12
  },
  snowcloak: {
    onTryBoost(boost, target2, source, effect) {
      if (!this.field.isWeather(["hail", "snow"]))
        return;
      if (effect && effect.id === "zpower")
        return;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          delete boost[i];
          this.add("-ability", target2, "Snow Cloak");
          this.hint("Snow Cloak prevents stat drops for the user under Snow/Hail.");
        }
      }
    },
    name: "Snow Cloak",
    shortDesc: "If Snow/Hail, this Pokemon cannot have its stats lowered or lower its own stats.",
    rating: 3,
    num: 81
  },
  plus: {
    onDamagingHit(damage, target2, source, effect) {
      this.boost({ spa: 1 });
    },
    name: "Plus",
    shortDesc: "This Pokemon's SpA is raised by 1 stage when hit by an attack.",
    rating: 3.5,
    num: 57
  },
  energyloop: {
    onPrepareHit(source, target2, move) {
      if (move?.category !== "Status") {
        this.heal(target2.baseMaxhp / 16);
      }
    },
    name: "Energy Loop",
    shortDesc: "This Pokemon heals 1/16 of its max HP before using an attacking move.",
    rating: 3.5,
    num: -13
  },
  shockproof: {
    onSetStatus(status, target2, source, effect) {
      if (status.id !== "par")
        return;
      if (effect?.status) {
        this.add("-immune", target2, "[from] ability: Shockproof");
      }
      return false;
    },
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Electric") {
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Shockproof",
    shortDesc: "This Pokemon takes halved damage from Electric-type moves; paralysis immunity.",
    rating: 2,
    num: -37
  },
  coldblooded: {
    onStart(pokemon) {
      pokemon.abilityData.choiceLock = "";
    },
    onBeforeMove(pokemon, target2, move) {
      if (move.isZOrMaxPowered || move.id === "struggle")
        return;
      if (pokemon.abilityData.choiceLock && pokemon.abilityData.choiceLock !== move.id) {
        this.addMove("move", pokemon, move.name);
        this.attrLastMove("[still]");
        this.debug("Disabled by Cold-Blooded");
        this.add("-fail", pokemon);
        return false;
      }
    },
    onModifyMove(move, pokemon) {
      if (pokemon.abilityData.choiceLock || move.isZOrMaxPowered || move.id === "struggle")
        return;
      pokemon.abilityData.choiceLock = move.id;
    },
    onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.volatiles["dynamax"])
        return;
      this.debug("Cold-Blooded SpA Boost");
      return this.chainModify(1.5);
    },
    onDisableMove(pokemon) {
      if (!pokemon.abilityData.choiceLock)
        return;
      if (pokemon.volatiles["dynamax"])
        return;
      for (const moveSlot of pokemon.moveSlots) {
        if (moveSlot.id !== pokemon.abilityData.choiceLock) {
          pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
        }
      }
    },
    onEnd(pokemon) {
      pokemon.abilityData.choiceLock = "";
    },
    name: "Cold-Blooded",
    shortDesc: "This Pokemon's Sp. Atk. is 1.5x, but it can only select the first move it executes.",
    rating: 4.5,
    num: -14
  },
  transience: {
    onSourceModifyDamage(damage, source, target2, move) {
      if (this.field.pseudoWeather.trickroom) {
        this.debug("Transience weaken");
        return this.chainModify(0.75);
      }
    },
    name: "Transience",
    shortDesc: "Under Trick Room, this Pokemon takes 0.75x damage from attacks.",
    rating: 3.5,
    num: -15
  },
  originorb: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Fighting"] = true;
        move.ignoreImmunity["Normal"] = true;
        move.ignoreImmunity["Poison"] = true;
        move.ignoreImmunity["Ground"] = true;
        move.ignoreImmunity["Ghost"] = true;
        move.ignoreImmunity["Electric"] = true;
        move.ignoreImmunity["Psychic"] = true;
        move.ignoreImmunity["Dragon"] = true;
      }
    },
    onModifyDamage(damage, source, target2, move) {
      if ((move.type === "Fighting" || move.type === "Normal") && target2.hasType("Ghost") || move.type === "Poison" && target2.hasType("Steel") || move.type === "Ground" && target2.hasType("Flying") || move.type === "Ghost" && target2.hasType("Normal") || move.type === "Electric" && target2.hasType("Ground") || move.type === "Psychic" && target2.hasType("Dark") || move.type === "Dragon" && target2.hasType("Fairy")) {
        this.debug("Origin Orb decrease");
        return this.chainModify(0.5);
      }
    },
    name: "Origin Orb",
    shortDesc: "(Semifunctional placeholder) This Pokemon deals resisted damage to immunities.",
    rating: 5,
    num: -16
  },
  rewind: {
    onSwitchOut(pokemon) {
      this.actions.useMove("Recycle", pokemon);
    },
    name: "Rewind",
    shortDesc: "(Semifunctional placeholder) This Pokemon restores its held item upon switching out.",
    rating: 3.5,
    num: -17
  },
  spacedivide: {
    onAfterBoost(boost, target2, source, effect) {
      if (!boost || effect.id === "spacedivide")
        return;
      let activated = false;
      const spacedivideBoost = {};
      if (boost.spa) {
        spacedivideBoost.atk = -1 * boost.spa;
        activated = true;
      }
      if (boost.spd) {
        spacedivideBoost.def = -1 * boost.spd;
        activated = true;
      }
      if (boost.atk) {
        spacedivideBoost.spa = -1 * boost.atk;
        activated = true;
      }
      if (boost.def) {
        spacedivideBoost.spd = -1 * boost.def;
        activated = true;
      }
      if (activated === true) {
        this.add("-ability", target2, "Space Divide");
        this.boost(spacedivideBoost, target2, target2, null, true);
      }
    },
    name: "Space Divide",
    shortDesc: "Applies the opposite of stat changes to the opposite stat (Atk/Sp. Atk, Def/Sp. Def).",
    rating: 4,
    num: -18
  },
  skybreach: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.type === "Water" && !(move.isZ && move.category !== "Status")) {
        move.type = "Flying";
      }
    },
    name: "Sky Breach",
    shortDesc: "This Pokemon's Water-type moves become Flying-type.",
    rating: 3,
    num: -19
  },
  windupkey: {
    onAnyFaintPriority: 1,
    onAnyFaint(target2, source) {
      const boosts = {};
      let i;
      for (i in source.boosts) {
        if (source.boosts[i] < 0) {
          boosts[i] = 0;
        }
      }
      source.setBoost(boosts);
      this.add("-clearnegativeboost", source, "[silent]");
      this.add("-message", source.name + "'s negative stat changes were removed!");
    },
    name: "Wind-up Key",
    shortDesc: "This Pokemon's negative stat changes are removed when a Pokemon faints.",
    rating: 3,
    num: -20
  },
  mountaineer: {
    onDamage(damage, target2, source, effect) {
      if (effect && effect.id === "stealthrock") {
        return false;
      }
    },
    onTryHit(target2, source, move) {
      if (move.type === "Rock" && !target2.activeTurns) {
        this.add("-immune", target2, "[from] ability: Mountaineer");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Mountaineer",
    rating: 3,
    num: -2
  },
  zergrush: {
    onPrepareHit(source, target2, move) {
      if (move.multihit)
        return;
      if (move.flags["contact"] && !move.isZ && !move.isMax) {
        move.multihit = 4;
      }
    },
    onBasePowerPriority: 7,
    onBasePower(basePower, pokemon, target2, move) {
      if (move.flags["contact"])
        return this.chainModify([1365, 4096]);
    },
    name: "Zerg Rush",
    shortDesc: "This Pokemon's contact moves have 33% power but hit 4 times.",
    rating: 4,
    num: -22
  },
  lingeringaroma: {
    onDamagingHit(damage, target2, source, move) {
      const additionalBannedAbilities = ["hungerswitch", "illusion", "neutralizinggas", "wonderguard"];
      if (source.getAbility().isPermanent || additionalBannedAbilities.includes(source.ability) || target2.volatiles["dynamax"]) {
        return;
      }
      if (move.flags["contact"]) {
        const targetCanBeSet = this.runEvent("SetAbility", target2, source, this.effect, source.ability);
        if (!targetCanBeSet)
          return targetCanBeSet;
        const sourceAbility = source.setAbility("lingeringaroma", target2);
        if (!sourceAbility)
          return;
        if (target2.side === source.side) {
          this.add("-activate", target2, "Skill Swap", "", "", "[of] " + source);
        } else {
          this.add("-activate", target2, "ability: Lingering Aroma", this.dex.abilities.get(sourceAbility).name, "Lingering Aroma", "[of] " + source);
        }
        target2.setAbility(sourceAbility);
      }
    },
    name: "Lingering Aroma",
    shortDesc: "Pokemon making contact with this Pokemon have their Ability swapped with this one.",
    rating: 2.5,
    num: -23
  },
  bubblemane: {
    onAnyTryMove(target2, source, effect) {
      if (["stealthrock", "spikes", "toxicspikes", "stickyweb"].includes(effect.id)) {
        this.attrLastMove("[still]");
        this.boost({ spa: 1 }, source);
        this.add("cant", this.effectState.target, "ability: Bubble Mane", effect, "[of] " + target2);
        return false;
      }
    },
    name: "Bubble Mane",
    shortDesc: "If a hazard move is used on this Pokemon, it fails and this Pokemon's Special Attack is raised by 1.",
    rating: 3.5,
    num: -24
  },
  frenziedmight: {
    onDamage(damage, target2, source, effect) {
      if (effect.effectType !== "Move") {
        if (effect.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect.name);
        return this.chainModify(0.5);
      }
    },
    name: "Frenzied Might",
    shortDesc: "This Pokemon takes halved damage from residual sources.",
    rating: 4,
    num: -25
  },
  reflectivesurface: {
    onTryHit(target2, source, move) {
      if (target2 !== source && move.type === "Fire") {
        this.add("-immune", target2, "[from] ability: Reflective Surface");
        if (this.runEvent("DragOut", source, target2, move)) {
          source.forceSwitchFlag = true;
        }
        return null;
      }
    },
    name: "Reflective Surface",
    shortDesc: "This Pokemon forces the attacker out if hit by a Fire move; Fire immunity.",
    rating: 3.5,
    num: -26
  },
  iceage: {
    shortDesc: "This Pokemon takes halved damage from Ice-type attacks. Its own have 1.3x power.",
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        return this.chainModify(0.5);
      }
    },
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        return this.chainModify(1.3);
      }
    },
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice") {
        return this.chainModify(1.3);
      }
    },
    flags: { breakable: 1 },
    name: "Ice Age",
    rating: 4.5,
    num: -27
  },
  flock: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Flying" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Flock boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Flying" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Flock boost");
        return this.chainModify(1.5);
      }
    },
    name: "Flock",
    shortDesc: "When this Pokemon has 1/3 HP or less, its Flying-type moves have 1.5x power.",
    num: -28
  },
  costar: {
    onStart(pokemon) {
      let activated = false;
      for (const target2 of pokemon.side.foe.active) {
        if (!target2)
          continue;
        if (!activated) {
          this.add("-ability", pokemon, "Costar", "boost");
          activated = true;
        }
        console.log(target2.boosts);
        this.boost({ spe: target2.boosts.spe }, pokemon);
      }
    },
    name: "Costar",
    shortDesc: "On switch-in, this Pokemon copies the speed boosts of the opponent.",
    num: 294
  },
  overthehead: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon) {
      if (pokemon.hp >= pokemon.maxhp / 4) {
        return this.chainModify(0.8);
      }
    },
    onModifyDefPriority: 5,
    onModifyDef(atk, pokemon) {
      if (pokemon.hp >= pokemon.maxhp / 4) {
        return this.chainModify(0.8);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, pokemon) {
      if (pokemon.hp >= pokemon.maxhp / 4) {
        return this.chainModify(0.8);
      }
    },
    onModifySpDPriority: 5,
    onModifySpD(atk, pokemon) {
      if (pokemon.hp >= pokemon.maxhp / 4) {
        return this.chainModify(0.8);
      }
    },
    onModifySpe(spe, pokemon) {
      if (pokemon.hp >= pokemon.maxhp / 4) {
        return this.chainModify(0.8);
      }
    },
    name: "Over the Head",
    shortDesc: "When this Pokemon has more than 1/4 max HP, its stats are 0.8x.",
    rating: -1,
    num: -29
  },
  zerotohero: {
    onTryAddVolatile(status, pokemon) {
      if (pokemon.species.id !== "palafin")
        return;
      if (status.id === "flinch" || status.id === "trapped" || status.id === "partiallytrapped" || status.id === "leechseed" || status.id === "confusion" || status.id === "curse" || status.id === "drowsy" || status.id === "taunt" || status.id === "torment" || status.id === "encore" || status.id === "disable" || status.id === "embargo" || status.id === "healblock" || status.id === "infatuation" || status.id === "nightmare" || status.id === "perishsong" || status.id === "telekinesis") {
        this.add("-immune", pokemon, "[from] ability: Zero to Hero");
        return null;
      }
    },
    onCheckShow(pokemon) {
      if (target.species.id !== "palafin")
        return;
      if (pokemon.side.active.length === 1)
        return;
      if (pokemon.showCure === true || pokemon.showCure === false)
        return;
      const cureList = [];
      let noCureCount = 0;
      for (const curPoke of pokemon.side.active) {
        if (!curPoke?.status) {
          continue;
        }
        if (curPoke.showCure) {
          continue;
        }
        const species = curPoke.species;
        if (!Object.values(species.abilities).includes("Zero to Hero")) {
          continue;
        }
        if (!species.abilities["1"] && !species.abilities["H"]) {
          continue;
        }
        if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
          continue;
        }
        if (curPoke.hasAbility("Zero to Hero")) {
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
        this.add("-message", "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Zero to Hero.)");
        for (const pkmn of cureList) {
          pkmn.showCure = false;
        }
      }
    },
    onSwitchOut(pokemon) {
      if (!pokemon.status)
        return;
      if (pokemon.showCure === void 0)
        pokemon.showCure = true;
      if (pokemon.showCure)
        this.add("-curestatus", pokemon, pokemon.status, "[from] ability: Natural Cure");
      pokemon.clearStatus();
      if (!pokemon.showCure)
        pokemon.showCure = void 0;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Zero to Hero",
    shortDesc: "If Palafin: Non-volatile status condition are cured when switching out. Immune to volatile status.",
    rating: 3.5,
    num: 278
  },
  moody: {
    shortDesc: "This Pokemon's lowest stat goes up by 1 every turn.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon) {
      if (pokemon.activeTurns) {
        let statName = "atk";
        let worstStat = 3e3;
        let s;
        for (s in pokemon.storedStats) {
          if (pokemon.storedStats[s] < worstStat) {
            statName = s;
            worstStat = pokemon.storedStats[s];
          }
        }
        this.boost({ [statName]: 1 }, pokemon);
      }
    },
    name: "Moody",
    rating: 3,
    num: 141
  },
  spikyandround: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target2, source, move) {
      if (move.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target2);
      }
    },
    onStart(pokemon) {
      pokemon.addVolatile("spikyandround");
    },
    condition: {
      onStart(pokemon) {
        this.effectState.lastMove = "";
        this.effectState.numConsecutive = 0;
      },
      onTryMovePriority: -2,
      onTryMove(pokemon, target2, move) {
        if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
          this.effectState.numConsecutive++;
        } else if (pokemon.volatiles["twoturnmove"] && this.effectState.lastMove !== move.id) {
          this.effectState.numConsecutive = 1;
        } else {
          this.effectState.numConsecutive = 0;
        }
        this.effectState.lastMove = move.id;
      },
      onModifyDamage(damage, source, target2, move) {
        if (source.hasType(move.type)) {
          const dmgMod = [4096, 4505, 4915, 5324, 5734, 6144];
          const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
          return this.chainModify([dmgMod[numConsecutive], 4096]);
        }
      }
    },
    name: "Spiky and Round",
    shortDesc: "Damage of STAB moves used on consecutive turns is increased. Max 1.5x after 5 turns. Contact: -1/8 max HP.",
    rating: 3.5,
    num: -30
  },
  rollromp: {
    onTryHit(target2, source, move) {
      if (target2 !== source && move.type === "Ground") {
        if (!this.boost({ spe: 1 })) {
          this.add("-immune", target2, "[from] ability: Roll Romp");
        }
        return null;
      }
    },
    name: "Roll Romp",
    shortDesc: "This Pokemon's Speed is raised 1 stage if hit by an Ground move; Ground immunity.",
    rating: 3,
    num: -31
  },
  angerpoint: {
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.cureStatus();
        pokemon.addVolatile("angerpoint");
      }
    },
    condition: {
      onStart(target2) {
        this.add("-start", target2, "ability: Anger Point", "[silent]");
      },
      onSetStatus(status, target2, source, effect) {
        if (effect?.status) {
          this.add("-immune", target2, "[from] ability: Anger Point");
        }
        return false;
      },
      onEnd(target2) {
        this.add("-end", target2, "ability: Anger Point", "[silent]");
      }
    },
    name: "Anger Point",
    shortDesc: "When this Pokemon reaches 1/2 or less max HP, it cures its status and becomes immune to status.",
    rating: 1,
    num: 83
  },
  tactician: {
    onModifyDamage(damage, source, target2, move) {
      if (move && target2.getMoveHitData(move).typeMod > 0) {
        return this.chainModify([5120, 4096]);
      }
    },
    name: "Tactician",
    shortDesc: "This Pokemon's attacks that are super effective against the target do 1.25x damage.",
    rating: 2.5,
    num: -32
  },
  pastelveil: {
    onStart(source) {
      for (const ally of source.side.pokemon) {
        if (["psn", "tox"].includes(ally.status)) {
          ally.cureStatus();
        }
      }
    },
    onTryHit(target2, source, move) {
      if (target2 !== source && move.type === "Poison") {
        this.add("-immune", target2, "[from] ability: Pastel Veil");
        return null;
      }
    },
    name: "Pastel Veil",
    shortDesc: "This Pokemon is immune to Poison-type moves. On switch-in, cures its team of poison.",
    rating: 3,
    num: 257
  },
  cannonstyle: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, item) {
      if (attacker.item === "ironball") {
        this.debug("Cannon Style boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, attacker, defender, item) {
      if (attacker.item === "ironball") {
        this.debug("Cannon Style boost");
        return this.chainModify(1.5);
      }
    },
    name: "Cannon Style",
    shortDesc: "This Pokemon's Atk and SpA is 1.5x when holding an Iron Ball. Fling: 2x damage.",
    rating: 3.5,
    num: -33
  },
  thermofist: {
    onAfterMoveSecondarySelf(pokemon, target2, move) {
      const thermofistBoost = {};
      if (move.flags["punch"]) {
        this.boost({ atk: 1 }, pokemon);
      } else if (!move.flags["flags"]) {
        thermofistBoost.atk = -1 * pokemon.boosts["atk"];
        this.boost(thermofistBoost, pokemon, pokemon);
      }
    },
    onUpdate(pokemon) {
      const boost = {};
      if (pokemon.boosts["atk"] === 6) {
        pokemon.trySetStatus("brn", pokemon);
      }
    },
    name: "Thermo Fist",
    shortDesc: "+1 Atk if using a Punching move. If not: Atk reset. If +6 Atk: Burned.",
    rating: 3.5,
    num: -34
  },
  flowergift: {
    onModifyAtkPriority: 3,
    onModifyAtk(pokemon) {
      if (this.field.isTerrain("grassyterrain"))
        return this.chainModify(1.5);
    },
    onModifySpDPriority: 4,
    onModifySpD(spd, pokemon) {
      if (this.field.isTerrain("grassyterrain"))
        return this.chainModify(1.5);
    },
    name: "Flower Gift",
    shortDesc: "If Grassy Terrain is active, this Pokemon's Atk and SpD are multiplied by 1.5.",
    rating: 1,
    num: 122
  },
  generalist: {
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target2, move) {
      if (!pokemon.hasType(move.type)) {
        return this.chainModify(1.2);
      }
    },
    name: "Generalist",
    shortDesc: "Non-STAB moves have 1.2x power.",
    rating: 4.5,
    num: -35
  },
  gempower: {
    onAfterMoveSecondarySelf(pokemon, target2, move) {
      if (pokemon.item || pokemon.useItem())
        return;
      if (move.category !== "Status") {
        const type = move.type;
        switch (type) {
          case "Bug":
            this.add("-item", pokemon, "Bug Gem", "[from] ability: Gem Power");
            pokemon.setItem("buggem");
            break;
          case "Dark":
            this.add("-item", pokemon, "Dark Gem", "[from] ability: Gem Power");
            pokemon.setItem("darkgem");
            break;
          case "Dragon":
            this.add("-item", pokemon, "Dragon Gem", "[from] ability: Gem Power");
            pokemon.setItem("dragongem");
            break;
          case "Electric":
            this.add("-item", pokemon, "Electric Gem", "[from] ability: Gem Power");
            pokemon.setItem("electricgem");
            break;
          case "Fairy":
            this.add("-item", pokemon, "Fairy Gem", "[from] ability: Gem Power");
            pokemon.setItem("fairygem");
            break;
          case "Fighting":
            this.add("-item", pokemon, "Fighting Gem", "[from] ability: Gem Power");
            pokemon.setItem("fightinggem");
            break;
          case "Fire":
            this.add("-item", pokemon, "Fire Gem", "[from] ability: Gem Power");
            pokemon.setItem("firegem");
            break;
          case "Flying":
            this.add("-item", pokemon, "Flying Gem", "[from] ability: Gem Power");
            pokemon.setItem("flyinggem");
            break;
          case "Ghost":
            this.add("-item", pokemon, "Ghost Gem", "[from] ability: Gem Power");
            pokemon.setItem("ghostgem");
            break;
          case "Grass":
            this.add("-item", pokemon, "Grass Gem", "[from] ability: Gem Power");
            pokemon.setItem("grassgem");
            break;
          case "Ground":
            this.add("-item", pokemon, "Ground Gem", "[from] ability: Gem Power");
            pokemon.setItem("groundgem");
            break;
          case "Ice":
            this.add("-item", pokemon, "Ice Gem", "[from] ability: Gem Power");
            pokemon.setItem("icegem");
            break;
          case "Normal":
            this.add("-item", pokemon, "Normal Gem", "[from] ability: Gem Power");
            pokemon.setItem("normalgem");
            break;
          case "Poison":
            this.add("-item", pokemon, "Poison Gem", "[from] ability: Gem Power");
            pokemon.setItem("poisongem");
            break;
          case "Psychic":
            this.add("-item", pokemon, "Psychic Gem", "[from] ability: Gem Power");
            pokemon.setItem("psychicgem");
            break;
          case "Rock":
            this.add("-item", pokemon, "Rock Gem", "[from] ability: Gem Power");
            pokemon.setItem("rockgem");
            break;
          case "Steel":
            this.add("-item", pokemon, "Steel Gem", "[from] ability: Gem Power");
            pokemon.setItem("steelgem");
            break;
          case "Water":
            this.add("-item", pokemon, "Water Gem", "[from] ability: Gem Power");
            pokemon.setItem("watergem");
            break;
        }
      }
    },
    name: "Gem Power",
    shortDesc: "If this Pokemon has no item, it will gain a Gem based on the type it uses.",
    rating: 1.5,
    num: -36
  },
  // SV Ability Descriptions
  quarkdrive: {
    inherit: true,
    condition: {
      noCopy: true,
      onStart(pokemon, source, effect) {
        if (effect?.id === "boosterenergy") {
          this.effectState.fromBooster = true;
          this.add("-activate", pokemon, "ability: Quark Drive", "[fromitem]");
        } else {
          this.add("-activate", pokemon, "ability: Quark Drive");
        }
        this.effectState.bestStat = pokemon.getBestStat(false, true);
        this.add("-start", pokemon, "quarkdrive" + this.effectState.bestStat);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, source, target2, move) {
        if (this.effectState.bestStat !== "atk" || target2.hasAbility("rubberarmor"))
          return;
        this.debug("Quark Drive atk boost");
        return this.chainModify([5325, 4096]);
      },
      onModifyDefPriority: 6,
      onModifyDef(def, target2, source, move) {
        if (this.effectState.bestStat !== "def")
          return;
        this.debug("Quark Drive def boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpAPriority: 5,
      onModifySpA(relayVar, source, target2, move) {
        if (this.effectState.bestStat !== "spa" || target2.hasAbility("rubberarmor"))
          return;
        this.debug("Quark Drive spa boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpDPriority: 6,
      onModifySpD(relayVar, target2, source, move) {
        if (this.effectState.bestStat !== "spd")
          return;
        this.debug("Quark Drive spd boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpe(spe, pokemon) {
        if (this.effectState.bestStat !== "spe")
          return;
        this.debug("Quark Drive spe boost");
        return this.chainModify(1.5);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Quark Drive");
      }
    }
  },
  protosynthesis: {
    inherit: true,
    condition: {
      noCopy: true,
      onStart(pokemon, source, effect) {
        if (effect?.id === "boosterenergy") {
          this.effectState.fromBooster = true;
          this.add("-activate", pokemon, "ability: Protosynthesis", "[fromitem]");
        } else {
          this.add("-activate", pokemon, "ability: Protosynthesis");
        }
        this.effectState.bestStat = pokemon.getBestStat(false, true);
        this.add("-start", pokemon, "protosynthesis" + this.effectState.bestStat);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, source, target2, move) {
        if (this.effectState.bestStat !== "atk" || target2.hasAbility("rubberarmor"))
          return;
        this.debug("Protosynthesis atk boost");
        return this.chainModify([5325, 4096]);
      },
      onModifyDefPriority: 6,
      onModifyDef(def, target2, source, move) {
        if (this.effectState.bestStat !== "def")
          return;
        this.debug("Protosynthesis def boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpAPriority: 5,
      onModifySpA(relayVar, source, target2, move) {
        if (this.effectState.bestStat !== "spa" || target2.hasAbility("rubberarmor"))
          return;
        this.debug("Protosynthesis spa boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpDPriority: 6,
      onModifySpD(relayVar, target2, source, move) {
        if (this.effectState.bestStat !== "spd")
          return;
        this.debug("Protosynthesis spd boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpe(spe, pokemon) {
        if (this.effectState.bestStat !== "spe")
          return;
        this.debug("Protosynthesis spe boost");
        return this.chainModify(1.5);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Protosynthesis");
      }
    }
  },
  // Gen 8 Version of abilities
  protean: {
    onPrepareHit(source, target2, move) {
      if (move.hasBounced)
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Protean");
      }
    },
    name: "Protean",
    rating: 4.5,
    num: 168
  },
  dauntlessshield: {
    onStart(pokemon) {
      this.boost({ def: 1 }, pokemon);
    },
    name: "Dauntless Shield",
    rating: 3.5,
    num: 235
  },
  intrepidsword: {
    onStart(pokemon) {
      this.boost({ atk: 1 }, pokemon);
    },
    name: "Intrepid Sword",
    rating: 4,
    num: 234
  },
  // Rubber Armor Interaction
  galewings: {
    inherit: true,
    onModifyPriority(priority, pokemon, target2, move) {
      for (const poke of this.getAllActive()) {
        if (poke.hasAbility("rubberarmor") && poke.side.id !== pokemon.side.id && !poke.volatiles["gastroacid"] && !poke.transformed && move?.category !== "Status") {
          return;
        }
      }
      if (move?.type === "Flying" && pokemon.hp === pokemon.maxhp)
        return priority + 1;
    }
  }
};
//# sourceMappingURL=abilities.js.map
