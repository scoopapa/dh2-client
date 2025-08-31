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
  direspikescales: {
    onEffectiveness(typeMod, target, type, move) {
      if (!target || target.species.name !== "Dalamadur")
        return;
      if (this.effectState.resisted)
        return -1;
      if (move.category === "Status" || move.id === "struggle")
        return;
      if (!target.runImmunity(move.type))
        return;
      if (target.hp < target.maxhp)
        return;
      this.add("-activate", target, "ability: Direspike Scales");
      this.effectState.resisted = true;
      return -1;
    },
    onAnyAfterMove() {
      this.effectState.resisted = false;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, breakable: 1 },
    name: "Direspike Scales",
    shortDesc: "Dalamadur: If full HP, attacks taken have 0.5 effectiveness unless naturally immune.",
    rating: 3.5,
    num: 1e3
  },
  icearmor: {
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical" && target.species.id === "zamtrios") {
        this.add("-ability", target, "Ice-Armor");
        this.add("-message", `Zamtrios is transforming!`);
        target.formeChange("zamtriosiced", this.effect, true);
      }
    },
    onStart(pokemon2) {
      if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "zamtrios") {
        this.add("-ability", pokemon2, "Ice-Armor");
        this.add("-message", `Zamtrios is transforming!`);
        pokemon2.formeChange("zamtriosiced", this.effect, true);
      }
    },
    onWeatherChange(pokemon2, source, sourceEffect) {
      if (sourceEffect?.suppressWeather)
        return;
      if (!pokemon2.hp)
        return;
      if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "zamtrios") {
        this.add("-ability", pokemon2, "Ice-Armor");
        this.add("-message", `Zamtrios is transforming!`);
        pokemon2.formeChange("zamtriosiced", this.effect, true);
      }
    },
    flags: {
      failroleplay: 1,
      noreceiver: 1,
      noentrain: 1,
      notrace: 1,
      failskillswap: 1,
      cantsuppress: 1,
      notransform: 1
    },
    name: "Ice-Armor",
    shortDesc: "This pokemon will react to a physical attack by encasing it's body in ice. Also activates under Snow.",
    rating: 3,
    num: 1001
  },
  puffup: {
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Special" && target.species.id === "zamtrios") {
        this.add("-ability", target, "Puff-Up");
        this.add("-message", `Zamtrios is transforming!`);
        target.formeChange("zamtriospuffed", this.effect, true);
      }
    },
    onStart(pokemon2) {
      if (this.field.isWeather(["rain"]) && pokemon2.species.id === "zamtrios") {
        this.add("-ability", pokemon2, "Puff-Up");
        this.add("-message", `Zamtrios is transforming!`);
        pokemon2.formeChange("zamtriospuffed", this.effect, true);
      }
    },
    flags: {
      failroleplay: 1,
      noreceiver: 1,
      noentrain: 1,
      notrace: 1,
      failskillswap: 1,
      cantsuppress: 1,
      notransform: 1
    },
    name: "Puff-Up",
    shortDesc: "This pokemon will react to a special attack by puffing up it's body. Also activates under Rain.",
    rating: 3,
    num: 1002
  },
  debris: {
    onDamagingHit(damage, target, source, move) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const Spikes = side.sideConditions["spikes"];
      if (move.category === "Physical" && (!Spikes || Spikes.layers < 3)) {
        this.add("-activate", target, "ability: Debris");
        side.addSideCondition("spikes", target);
      }
    },
    flags: {},
    name: "Debris",
    shortDesc: "If this pokemon is hit by a physical attack, Spikes are set on the opposing side.",
    rating: 3.5,
    num: 1003
  },
  solarwrath: {
    onModifyAtkPriority: 5,
    onModifyAtk(spa, pokemon2) {
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "sunnyday" || effect.id === "desolateland") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: {},
    name: "Solar Wrath",
    shortDesc: "If Sunny Day is active, this Pokemon's Atk is 1.5x; loses 1/8 max HP per turn.",
    rating: 2,
    num: 1004
  },
  tempestenergy: {
    onImmunity(type, pokemon2) {
      if (type === "sandstorm")
        return false;
    },
    onStart(pokemon2) {
      if (pokemon2.side.sideConditions["tailwind"] || this.field.isWeather("sandstorm")) {
        this.boost({ spa: 1 }, pokemon2, pokemon2);
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.flags["wind"]) {
        if (!this.boost({ spa: 1 }, target, target)) {
          this.add("-immune", target, "[from] ability: Tempest Energy");
        }
        return null;
      }
    },
    onAllySideConditionStart(target, source, sideCondition) {
      const pokemon2 = this.effectState.target;
      if (sideCondition.id === "tailwind" || this.field.isWeather("sandstorm")) {
        this.boost({ spa: 1 }, pokemon2, pokemon2);
      }
    },
    flags: {},
    rating: 1,
    desc: "This Pokemon is immune to wind moves and raises its Sp.Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
    shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 SpA. Wind move/Sand immunity.",
    name: "Tempest Energy",
    num: 1005
  },
  tempestforce: {
    inherit: true,
    onImmunity(type, pokemon2) {
      if (type === "sandstorm")
        return false;
    },
    onStart(pokemon2) {
      if (pokemon2.side.sideConditions["tailwind"] || this.field.isWeather("sandstorm")) {
        this.boost({ atk: 1 }, pokemon2, pokemon2);
      }
    },
    onAllySideConditionStart(target, source, sideCondition) {
      const pokemon2 = this.effectState.target;
      if (sideCondition.id === "tailwind" || this.field.isWeather("sandstorm")) {
        this.boost({ atk: 1 }, pokemon2, pokemon2);
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.flags["wind"]) {
        if (!this.boost({ atk: 1 }, target, target)) {
          this.add("-immune", target, "[from] ability: Tempest Force");
        }
        return null;
      }
    },
    flags: {},
    rating: 1,
    num: 1006,
    desc: "This Pokemon is immune to wind moves and raises its Attack by 1 stage when hit by a wind move, when Tailwind begins on this Pokemon's side, or when Sandstorm is active. Sandstorm immunity.",
    shortDesc: "If hit by a wind move or under Tailwind/Sandstorm: +1 Atk. Wind move/Sand immunity.",
    name: "Tempest Force"
  },
  mightywall: {
    name: "Mighty Wall",
    flags: {},
    rating: 1,
    num: 1007,
    shortDesc: "This Pokemon takes half damage from attacks when switching in.",
    onSourceModifyDamage(damage, source, target, move) {
      if (!target.activeTurns) {
        this.debug("Mighty Wall weaken");
        return this.chainModify(0.5);
      }
    }
  },
  ignite: {
    desc: "This Pok\xE9mon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pok\xE9mon's Normal-type moves become Fire-type and have 1.2x power.",
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
        move.type = "Fire";
        move.igniteBoosted = true;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move) {
      if (move.igniteBoosted)
        return this.chainModify([4915, 4096]);
    },
    name: "Ignite",
    rating: 4,
    num: 1008
  },
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
    num: 1009
  },
  aggravation: {
    onDamage(damage, target, source, effect) {
      if (effect.effectType === "Move" && !effect.multihit && (!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility("sheerforce")))) {
        this.effectState.checkedBerserk = false;
      } else {
        this.effectState.checkedBerserk = true;
      }
    },
    onTryEatItem(item) {
      const healingItems = [
        "aguavberry",
        "enigmaberry",
        "figyberry",
        "iapapaberry",
        "magoberry",
        "sitrusberry",
        "wikiberry",
        "oranberry",
        "berryjuice"
      ];
      if (healingItems.includes(item.id)) {
        return this.effectState.checkedBerserk;
      }
      return true;
    },
    onAfterMoveSecondary(target, source, move) {
      this.effectState.checkedBerserk = true;
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        this.boost({ atk: 1 }, target, target);
      }
    },
    flags: {},
    name: "Aggravation",
    shortDesc: "This Pokemon's Attack is raised by 1 when it reaches 1/2 or less of its Max HP.",
    rating: 2,
    num: 1010
  },
  geminicore: {
    onChargeMove(pokemon2, target, move) {
      this.debug("tireless - remove charge turn for " + move.id);
      this.add("-activate", pokemon2, "ability: Gemini Core");
      this.attrLastMove("[still]");
      this.addMove("-anim", pokemon2, move.name, target);
      return false;
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["mustrecharge"]) {
        pokemon2.removeVolatile("mustrecharge");
        this.debug("tireless - remove recharge");
        this.add("-activate", pokemon2, "ability: Gemini Core");
      }
    },
    onBeforeMovePriority: 11,
    onBeforeMove(pokemon2) {
      if (pokemon2.volatiles["mustrecharge"]) {
        pokemon2.removeVolatile("mustrecharge");
        this.debug("geminicore - failsafe remove recharge");
      }
    },
    name: "Gemini Core",
    desc: "When this Pokemon uses a move that must spend a turn charging, it executes on the first turn, after any effects are applied from the charge. When it uses a move that must spend a turn recharging, it does not need to recharge.",
    shortDesc: "This Pokemon's attacks skip charging and recharging turns.",
    activate: "[POKEMON] became energized immediately!",
    flags: {},
    rating: 2,
    num: 1011
  },
  megiddosgift: {
    onBeforeMovePriority: 0.5,
    onBeforeMove(target, source, move) {
      if (move.type === "Fire") {
        this.field.setWeather("sunnyday");
      } else if (move.type === "Water") {
        this.field.setWeather("raindance");
      }
    },
    name: "Megiddo's Gift",
    shortDesc: "Before using a Water or Fire-type move, this Pokemon sets Rain Dance or Sunny Day respectively.",
    rating: 1012
  },
  corrosiveclaws: {
    desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
    shortDesc: "Badly poison enemies brought under half health.",
    onAfterMove(source, target, move) {
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        target.setStatus("tox");
      }
    },
    name: "Corrosive Claws",
    rating: 4,
    num: 1013
  },
  centrifuge: {
    shortDesc: "The Pok\xE9mon draws Ground moves to itself to raise Spa. Attack by 1; Ground immunity.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Centrifuge");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Ground" || ["firepledge", "grasspledge", "waterpledge"].includes(move.id))
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        return this.effectState.target;
      }
    },
    flags: { breakable: 1 },
    name: "Centrifuge",
    rating: 3,
    num: 1014
  },
  dragonvein: {
    desc: "When it KOs an opponent with a direct move, it recovers 25% of its max HP.",
    shortDesc: "Heals 25% HP on KO.",
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.heal(source.baseMaxhp / 4);
      }
    },
    name: "Dragonvein",
    rating: 3,
    num: 1015
  },
  permafrost: {
    name: "Permafrost",
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Permafrost");
      this.add("-message", `${pokemon2.name}'s freezing aura turns water into ice!`);
    },
    onDamagingHit(damage, target, source, move) {
      if (move.type === "Ice") {
        this.boost({ def: 1 });
      }
    },
    onFoeBeforeMovePriority: 13,
    onFoeBeforeMove(attacker, defender, move) {
      attacker.addVolatile("permafrost");
    },
    condition: {
      onModifyTypePriority: -1,
      onModifyType(move, pokemon2) {
        if (move.type === "Water") {
          move.type = "Ice";
        }
      },
      onAfterMove(pokemon2) {
        pokemon2.removeVolatile("permafrost");
      }
    },
    shortDesc: "Water moves used against this Pokemon become Ice-type. +1 Def when hit by Ice.",
    num: 1016,
    rating: 4
  },
  heatsink: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Heat Sink");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Fire moves; Fire immunity.",
    name: "Heat Sink",
    rating: 3.5,
    num: 1017
  },
  rustedgale: {
    onStart(pokemon2) {
      if (this.suppressingAbility(pokemon2))
        return;
      this.add("-ability", pokemon2, "Rusted Gale");
      this.add("-message", `${pokemon2.name}'s gale lowered all defense on the field!`);
    },
    onAnyModifyDef(def, target, source, move) {
      const abilityHolder = this.effectState.target;
      if (target.hasAbility("Rusted Gale"))
        return;
      if (!move.ruinedDef?.hasAbility("Rusted Gale"))
        move.ruinedDef = abilityHolder;
      if (move.ruinedDef !== abilityHolder)
        return;
      this.debug("Rusted Gale Def drop");
      return this.chainModify(0.75);
    },
    flags: {},
    name: "Rusted Gale",
    shortDesc: "Active Pokemon without this Ability have their Defense multiplied by 0.75.",
    rating: 4.5,
    num: 1018
  },
  frostnip: {
    shortDesc: "This Pokemon's moves have 1.3x power against frostbitten targets.",
    onBasePower(basePower, attacker, defender, move) {
      if (defender && ["frz"].includes(defender.status))
        return this.chainModify(1.3);
    },
    name: "Frostnip",
    rating: 4,
    num: 1019
  },
  pungency: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.addVolatile("stench", this.effectState.target);
        }
      }
    },
    flags: {},
    shortDesc: "30% chance of inflicting Stench on a Pokemon if they make contact.",
    name: "Pungency",
    rating: 0.5,
    num: 1020
  },
  oilslick: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon2, "Oilslick", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon2, null, true);
        }
      }
    },
    flags: {},
    shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
    name: "Oilslick",
    rating: 3.5,
    num: 1021
  },
  airbag: {
    onEffectiveness(typeMod, target, type, move) {
      if (!target || move.category !== "Physical")
        return;
      if (!target.runImmunity(move.type))
        return;
      if (this.dex.getEffectiveness(move, target) === -1)
        return;
      return 0;
    },
    name: "Airbag",
    rating: 4,
    shortDesc: "If this Pokemon is hit by a physical super effective move, it takes neutral damage.",
    num: 1022
  },
  itembag: {
    name: "Itembag",
    desc: "At the end of each turn, if it doesn't have an held item, the user acquires a random item. (Leftovers, Sitrus Berry, Lum Berry, Figy Berry, Choice Band, Choice Specs, Choice Scarf, Flame Orb, Frost Orb, Toxic Orb, Light Ball, Iron Ball, Rocky Helmet, Heavy-Duty Boots)",
    shortDesc: "Gets a random item from a list at the end of the turn if the user doesn't already have one.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      const itemList = ["leftovers", "sitrusberry", "lumberry", "figyberry", "choiceband", "choicespecs", "choicescarf", "flameorb", "frostaorb", "toxicorb", "lightball", "ironball", "rockyhelmet", "heavydutyboots"];
      const itemIndex = this.random(itemList.length);
      const itemMade = itemList[itemIndex];
      if (pokemon2.hp && !pokemon2.item) {
        pokemon2.setItem(itemMade);
        this.add("-item", pokemon2, pokemon2.getItem(), "[from] ability: Itembag");
      }
    },
    rating: 3,
    num: 1023
  },
  generalist: {
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move) {
      if (!pokemon2.hasType(move.type)) {
        return this.chainModify(1.3);
      }
    },
    name: "Generalist",
    shortDesc: "Non-STAB moves have 1.3x power.",
    rating: 4.5,
    num: 1024
  },
  frozencalamity: {
    onStart(pokemon2) {
      const target = pokemon2.side.foe.active[pokemon2.side.foe.active.length - 1 - pokemon2.position];
      if (target.side.totalFainted) {
        this.add("-activate", pokemon2, "ability: Frozen Calamity");
        const fallen = Math.min(target.side.totalFainted, 5);
        this.add("-start", pokemon2, `fallen${fallen}`, "[silent]");
        this.effectState.fallen = fallen;
      }
    },
    onResidual(pokemon2) {
      this.add("-end", pokemon2, `fallen${this.effectState.fallen}`, "[silent]");
      const target = pokemon2.side.foe.active[pokemon2.side.foe.active.length - 1 - pokemon2.position];
      if (target.side.totalFainted) {
        this.add("-activate", pokemon2, "ability: Frozen Calamity");
        const fallen = Math.min(target.side.totalFainted, 5);
        this.add("-start", pokemon2, `fallen${fallen}`, "[silent]");
        this.effectState.fallen = fallen;
      }
    },
    onEnd(pokemon2) {
      this.add("-end", pokemon2, `fallen${this.effectState.fallen}`, "[silent]");
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.effectState.fallen && move.type === "Ice") {
        const powMod = [4096, 4300, 4505, 4710, 4915, 5120];
        this.debug(`Pyre boost: ${powMod[this.effectState.fallen]}/4096`);
        return this.chainModify([powMod[this.effectState.fallen], 4096]);
      }
    },
    flags: {},
    name: "Frozen Calamity",
    desc: "For each fainted Pokemon on the opposing team, this Pokemon's Ice-type moves power is increased by 5% of their base power.",
    shortDesc: "For each fainted Pokemon on the opposing team, Ice-type power +5%.",
    rating: 4,
    num: 1025
  },
  riptide: {
    onResidualOrder: 8,
    onResidual(pokemon2) {
      if (!pokemon2.hp)
        return;
      for (const target of pokemon2.foes()) {
        if (target.volatiles["trapped"]) {
          const damage = this.damage(pokemon2.baseMaxhp / 8, target, pokemon2);
          if (damage) {
            this.heal(damage, pokemon2, pokemon2);
          }
        }
      }
    },
    flags: {},
    desc: "If any foe is trapped by a non-damaging move, the foe loses 1/8 of its max HP; heals by that amount.",
    shortDesc: "If foe is hit by non-residual trapping move, foe loses 1/8 of max HP; user heals 1/8th.",
    name: "Riptide",
    rating: 3,
    num: 1026
  },
  ragingrebel: {
    shortDesc: "This Pok\xE9mon and allies: 1.3x damage when any Pok\xE9mon has stat drops; attack can't lowered.",
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      let rebel = null;
      for (const pokemon2 of this.getAllActive()) {
        let statDrop;
        for (statDrop in pokemon2.boosts) {
          if (pokemon2.boosts[statDrop] < 0)
            rebel = true;
        }
      }
      if (rebel) {
        this.debug("Rebel boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (source && target === source)
        return;
      if (boost.atk && boost.atk < 0) {
        delete boost.atk;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Attack", "[from] ability: Raging Rebel", "[of] " + target);
        }
      }
    },
    name: "Raging Rebel",
    rating: 2.5,
    num: 1027
  },
  silversubsume: {
    onAnyTryMove(target, source, effect) {
      if (["stealthrock", "spikes", "toxicspikes", "stickyweb"].includes(effect.id)) {
        this.attrLastMove("[still]");
        this.boost({ atk: 1 }, source);
        this.add("cant", this.effectState.target, "ability: Silver Subsume", effect, "[of] " + target);
        return false;
      }
    },
    name: "Silver Subsume",
    shortDesc: "If a hazard move is used on this Pokemon, it fails and this Pokemon's Attack is raised by 1.",
    rating: 3.5,
    num: 1028
  },
  strafe: {
    shortDesc: "When taking damages, this Pokemon adds 20% of its Speed to its corresponding defense.",
    name: "Strafe",
    onModifyDefPriority: 1,
    onModifyDef(def, pokemon2) {
      const spe = pokemon2.getStat("spe", false, true);
      const newDef = def + spe / 5;
      return newDef;
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      const spe = pokemon2.getStat("spe", false, true);
      const newSpD = spd + spe / 5;
      return newSpD;
    },
    rating: 3.5,
    num: 1029
  },
  plow: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ground") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Plow");
        }
        return null;
      }
    },
    onDamage(damage, target, source, effect) {
      if (effect && (effect.id === "stealthrock" || effect.id === "spikes")) {
        this.heal(damage);
        return false;
      }
    },
    flags: { breakable: 1 },
    name: "Plow",
    shortDesc: "Heals 1/4 of its max HP when hit by Ground; Ground immunity. Healed by Spikes and Stealth Rock.",
    rating: 3.5,
    num: 1030
  },
  insectarmor: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Bug") {
        this.debug("Insect Armor boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Bug") {
        this.debug("Insect Armor boost");
        return this.chainModify(1.5);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Ground") {
        this.debug("Insect Armor weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fighting" || move.type === "Grass" || move.type === "Ground") {
        this.debug("Insect Armor weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Insect Armor",
    shortDesc: "User gains STAB on Bug moves and also gains Bug-type resistances.",
    rating: 4.5,
    num: 1031
  },
  dukesbayonet: {
    shortDesc: "Contact moves bypass Protect. 25% damage instead.",
    onModifyMove(move, source, target) {
      if (move.flags["contact"]) {
        delete move.flags["protect"];
        move.armorPiercer = true;
      }
    },
    onModifyDamage(damage, source, target, move) {
      if (move.armorPiercer && move.flags?.contact && target.volatiles["protect"]) {
        this.debug("Armor Piercer: reduced damage to 25% through Protect");
        return this.chainModify(0.25);
      }
    },
    flags: {},
    name: "Duke's Bayonet",
    rating: 4,
    num: 1032
  },
  watercompaction: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.boost({ def: 2 })) {
          this.add("-immune", target, "[from] ability: Water Compaction");
        }
        return null;
      }
    },
    name: "Water Compaction",
    desc: "This Pokemon is immune to Water-type moves and raises its Def by 2 stages when hit by an Water-type move.",
    shortDesc: "This Pokemon's Defense is raised 2 stages if hit by an Water move; Water immunity.",
    rating: 3,
    num: 1033
  },
  escaton: {
    onPrepareHit(source, target, move) {
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Escaton");
      }
    },
    flags: {},
    name: "Escaton",
    shortDesc: "This Pokemon's type changes to match the type of the move it is about to use. Works multiple times per switch-in."
  },
  twilightdust: {
    name: "Twilight Dust",
    desc: "If this Pokemon is a Nightcloak Malfestio and induces drowsy in a target, the target also becomes confused.",
    shortDesc: "Nightcloak: If this Pokemon induces drowsy in a target, the target also becomes confused.",
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    onAnyAfterSetStatus(status, target, source, effect) {
      if (source.baseSpecies.name !== "Nightcloak Malfestio")
        return;
      if (source !== this.effectState.target || target === source || effect.effectType !== "Move")
        return;
      if (status.id === "slp") {
        target.addVolatile("confusion");
      }
    }
  },
  protopyre: {
    onStart(pokemon2) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon2);
    },
    onWeatherChange(pokemon2) {
      if (this.field.isWeather("sunnyday")) {
        pokemon2.addVolatile("protopyre");
      } else if (!pokemon2.volatiles["protopyre"]?.fromBooster) {
        pokemon2.removeVolatile("protopyre");
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.hp <= pokemon2.maxhp / 3 || this.field.isWeather("sunnyday")) {
        pokemon2.addVolatile("protopyre");
      } else if (!pokemon2.volatiles["protopyre"]?.fromBooster) {
        pokemon2.removeVolatile("protopyre");
      }
    },
    onEnd(pokemon2) {
      delete pokemon2.volatiles["protopyre"];
      this.add("-end", pokemon2, "Protopyre", "[silent]");
    },
    condition: {
      noCopy: true,
      onStart(pokemon2, source, effect) {
        if (effect?.name === "Booster Energy") {
          this.effectState.fromBooster = true;
          this.add("-activate", pokemon2, "ability: Protopyre", "[fromitem]");
        } else {
          this.add("-activate", pokemon2, "ability: Protopyre");
        }
        this.effectState.bestStat = pokemon2.getBestStat(false, true);
        this.add("-start", pokemon2, "protosynthesis" + this.effectState.bestStat);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, pokemon2) {
        if (this.effectState.bestStat !== "atk" || pokemon2.ignoringAbility())
          return;
        this.debug("Protopyre atk boost");
        return this.chainModify([5325, 4096]);
      },
      onModifyDefPriority: 6,
      onModifyDef(def, pokemon2) {
        if (this.effectState.bestStat !== "def" || pokemon2.ignoringAbility())
          return;
        this.debug("Protopyre def boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpAPriority: 5,
      onModifySpA(spa, pokemon2) {
        if (this.effectState.bestStat !== "spa" || pokemon2.ignoringAbility())
          return;
        this.debug("Protopyre spa boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpDPriority: 6,
      onModifySpD(spd, pokemon2) {
        if (this.effectState.bestStat !== "spd" || pokemon2.ignoringAbility())
          return;
        this.debug("Protopyre spd boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpe(spe, pokemon2) {
        if (this.effectState.bestStat !== "spe" || pokemon2.ignoringAbility())
          return;
        this.debug("Protopyre spe boost");
        return this.chainModify(1.5);
      },
      onEnd(pokemon2) {
        this.add("-end", pokemon2, "Protosynthesis");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
    name: "Protopyre",
    num: 1036,
    shortDesc: "Sunny Day active, Booster Energy used or HP drops below 1/3 max HP: highest stat is 1.3x, or 1.5x if Speed."
  },
  icebreaker: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather("snow")) {
        this.debug("Ice Breaker boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "snow")
        return false;
    },
    name: "Ice Breaker",
    desc: "If Snow is active, this Pokemon's attacks have their power multiplied by 1.3. This Pokemon takes no damage from Snow.",
    shortDesc: "This Pokemon's attacks have 1.3x power in snow; immunity to it.",
    flags: {},
    rating: 2.5,
    num: 1037
  },
  oilmucus: {
    shortDesc: "This Pokemon is healed 1/4 by Fire, 1/8 by Sun; is hurt 1.25x by Water, 1/8 by Rain.",
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Oilmucus");
        }
        return null;
      }
    },
    onFoeBasePowerPriority: 17,
    onFoeBasePower(basePower, attacker, defender, move) {
      if (this.effectState.target !== defender)
        return;
      if (move.type === "Water") {
        return this.chainModify(1.25);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "sunnyday" || effect.id === "desolateland") {
        this.heal(target.baseMaxhp / 8);
      } else if (effect.id === "raindance" || effect.id === "primordialsea") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: { breakable: 1 },
    name: "Oilmucus",
    num: 1038,
    rating: 2.5
  },
  perforating: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Poison"] = true;
      }
    },
    name: "Perforating",
    shortDesc: "Poison moves can hit and poison Steel-type Pokemon.",
    rating: 3,
    num: 1040
  },
  gravedrum: {
    onModifySpe(spe, pokemon2) {
      if (pokemon2.adjacentFoes().length == 0)
        return;
      let target = this.sample(pokemon2.adjacentFoes());
      if (target.status === "brn") {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Gravedrum",
    shortDesc: "Speed is doubled if an opponent is burned."
  },
  blindrage: {
    onDamagingHit(damage, target, source, move) {
      if (!move.damage && !move.damageCallback && target.getMoveHitData(move).typeMod > 0) {
        this.boost({ atk: 1 });
      }
    },
    name: "Blind Rage",
    shortDesc: "This Pokemon's Atk is raised by 1 when hit by a super effective attack.",
    rating: 3.5
  },
  pathogenic: {
    onDamagingHit(damage, target, source, move) {
      const sourceAbility = source.getAbility();
      if (sourceAbility.flags["cantsuppress"] || sourceAbility.id === "pathogenic") {
        return;
      }
      if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
        const oldAbility = source.setAbility("pathogenic", target);
        if (oldAbility) {
          this.add("-activate", target, "ability: pathogenic", this.dex.abilities.get(oldAbility).name, "[of] " + source);
        }
      }
    },
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon2) {
      if (pokemon2.hasType("Poison") || pokemon2.baseSpecies.name === "Blackveil Hazak") {
        this.debug("Immune to Pathogenic");
      } else {
        this.add("-message", `${pokemon2.name} is hurt by the Pathogen!`);
        this.damage(pokemon2.baseMaxhp / 8, pokemon2, pokemon2);
      }
    },
    flags: {},
    name: "Pathogenic",
    shortDesc: "Contact changes attacker's ability to Pathogenic; non-Poison Pokemon are hurt.",
    rating: 2
  },
  oceanicveil: {
    onStart(source) {
      this.add("-ability", source, "Water Veil");
      source.addVolatile("aquaring");
    },
    onUpdate(pokemon2) {
      if (pokemon2.status === "brn") {
        this.add("-activate", pokemon2, "ability: Water Veil");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Water Veil");
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Oceanic Veil",
    rating: 2,
    num: 41,
    shortDesc: "This Pokemon uses Aqua Ring on switch-in. This Pokemon can't be burned."
  },
  incandescent: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Incandescent Boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Incandescent Boost");
        return this.chainModify(1.5);
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        this.add("-immune", target, "[from] ability: Incandescent");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Incandescent",
    shortDesc: "User gains STAB on Fire moves; Immune to Fire.",
    rating: 4.5
  },
  maddragon: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dragon") {
        this.debug("Mad Dragon boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dragon") {
        this.debug("Mad Dragon boost");
        return this.chainModify(1.5);
      }
    },
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire" || move.type === "Water" || move.type === "Electric" || move.type === "Grass") {
        this.debug("Mad Dragon weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire" || move.type === "Water" || move.type === "Electric" || move.type === "Grass") {
        this.debug("Mad Dragon weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Mad Dragon",
    shortDesc: "User gains STAB on Dragon moves and also gains Dragon-type resistances.",
    rating: 3.5
  },
  risenburst: {
    shortDesc: "On Mega-Evo; uses Risen Burst (60BP, Typeless). Grants dark res + stab. Uses R.Burst when hit by a dark attack.",
    onStart(pokemon2) {
      let targetSide = null;
      const sides = [this.sides[0], this.sides[1]];
      for (const side of sides) {
        if (pokemon2.side !== side) {
          targetSide = side;
        }
      }
      if (pokemon2.risenBurst)
        return;
      pokemon2.risenBurst = true;
      const reaction = this.dex.getActiveMove("risenburst");
      reaction.noreact = true;
      this.actions.useMove(reaction, pokemon2, targetSide.active[pokemon2.position]);
    },
    onDamagingHitOrder: 3,
    onDamagingHit(damage, target, source, move) {
      if (!move.noreact && target.hp && source.hp && move.type === "Dark") {
        const reaction = this.dex.getActiveMove("risenburst");
        reaction.noreact = true;
        this.actions.useMove(reaction, target, source);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Risen Burst weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Risen Burst weaken");
        return this.chainModify(0.5);
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Risen Burst boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Risen Burst boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Risen Burst",
    rating: 3.5
  },
  overload: {
    name: "Overload",
    rating: 3.5,
    flags: {},
    shortDesc: "All Dragon moves used by the user are 1.4x damage but deal 20% recoil of damage dealt.",
    onModifyMove(move) {
      if (move.type === "Dragon" && move.category !== "Status") {
        move.recoil = [1, 4];
      }
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dragon") {
        this.debug("Overload boost");
        return this.chainModify(1.4);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dragon") {
        this.debug("Overload boost");
        return this.chainModify(1.4);
      }
    }
  },
  terrestrial: {
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ground") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ground") {
        return this.chainModify(0.5);
      }
    },
    name: "Terrestrial",
    rating: 3.5,
    flags: { breakable: 1 },
    shortDesc: "Ground attacks do neutral damage."
  },
  densecortex: {
    onTryHit(pokemon2, target, move) {
      if (move.flags["slicing"]) {
        this.add("-immune", pokemon2, "[from] ability: Dense Cortex");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Dense Cortex",
    shortDesc: "Immune to slicing moves.",
    rating: 3
  },
  wyversion: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      target.addVolatile("dragoncharge");
    },
    flags: {},
    name: "Wyversion",
    shortDesc: "This Pokemon gains a (Dragon-type) Charge effect when it takes a hit from an attack.",
    rating: 3
  },
  stealthsilver: {
    onStart(pokemon2, source) {
      if (pokemon2.stealthsilver)
        return;
      pokemon2.stealthsilver = true;
      pokemon2.side.foe.addSideCondition("gmaxsteelsurge");
    },
    flags: {},
    shortDesc: "On activation, this Pokemon sets steel-type hazards.",
    name: "Stealth Silver",
    rating: 4
  },
  wylkencasing: {
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Zoh Shia" || pokemon2.transformed)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 2) {
        if (pokemon2.species.forme !== "Encased") {
          pokemon2.formeChange("Zoh Shia-Encased");
        }
      } else {
        if (pokemon2.species.forme === "Encased") {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Zoh Shia" || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.hp > pokemon2.maxhp / 2) {
        if (pokemon2.species.forme !== "Encased") {
          pokemon2.formeChange("Zoh Shia-Encased");
        }
      } else {
        if (pokemon2.species.forme === "Encased") {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    onSetStatus(status, target, source, effect) {
      if (target.species.id !== "Zoh Shia-Encased" || target.transformed)
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Wylk Encasing");
      }
      return false;
    },
    onTryAddVolatile(status, target) {
      if (target.species.id !== "Zoh Shia-Encased" || target.transformed)
        return;
      if (status.id !== "yawn")
        return;
      this.add("-immune", target, "[from] ability: Wylk Encasing");
      return null;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Wylk Encasing",
    desc: "If this Pokemon is a Zoh Shia, it changes to its true forme if it has 1/2 or less of its maximum HP, and changes to Encased Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Encased Form, it cannot become affected by a non-volatile status condition or Yawn.",
    shortDesc: "If Zoh Shia, switch-in/end of turn it changes to true form at 1/2 max HP or less, else Encased.",
    rating: 3
  },
  dragonpoint: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("dragonblight", target);
        }
      }
    },
    flags: {},
    name: "Dragon Point",
    shortDesc: "30% chance a Pokemon making contact with this Pokemon will be dragonblighted.",
    rating: 1.5
  },
  butterflystar: {
    onModifyMovePriority: 1,
    onBeforeMove(pokemon2, attacker, move) {
      if (pokemon2.species.id === "estrellian" && move.type === "Bug" || pokemon2.species.id === "estrellianwinged" && move.type === "Bug") {
        this.add("-ability", pokemon2, "Butterfly Star");
        this.add("-message", `Estrellian is transforming!`);
        pokemon2.formeChange("estrellianarmored", this.effect, true);
      }
      if (pokemon2.species.id === "estrellian" && move.type === "Flying" || pokemon2.species.id === "estrellianarmored" && move.type === "Flying") {
        this.add("-ability", pokemon2, "Butterfly Star");
        this.add("-message", `Estrellian is transforming!`);
        pokemon2.formeChange("estrellianwinged", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    shortDesc: "Before using a move, Estrellian transforms. If Bug-Type: Armored Form; Flying-Type: Winged Form.",
    name: "Butterfly Star",
    rating: 4
  },
  destructionstar: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect?.effectType !== "Move") {
        return;
      }
      if (source.species.id === "arbitrellian" && source.hp && !source.transformed && source.side.foePokemonLeft()) {
        this.add("-activate", source, "ability: Destruction Star");
        source.formeChange("arbitrelliancharged", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Destruction Star",
    shortDesc: "After KOing a Pokemon; becomes Charged.",
    rating: 4
  },
  disasterstar: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect?.effectType !== "Move") {
        return;
      }
      if (source.species.id === "doomtrellian" && source.hp && !source.transformed && source.side.foePokemonLeft()) {
        this.add("-activate", source, "ability: Disaster Star");
        source.formeChange("doomtrelliancharged", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Disaster Star",
    shortDesc: "After KOing a Pokemon; becomes Charged.",
    rating: 4
  },
  empressthrone: {
    onResidualOrder: 29,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Ahtal-Ka" || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.species.id === "ahtalneset" || pokemon2.hp > pokemon2.maxhp / 2)
        return;
      this.add("-activate", pokemon2, "ability: Empress Throne");
      pokemon2.formeChange("Ahtal-Neset", this.effect, true);
      pokemon2.baseMaxhp = Math.floor(Math.floor(
        2 * pokemon2.species.baseStats["hp"] + pokemon2.set.ivs["hp"] + Math.floor(pokemon2.set.evs["hp"] / 4) + 100
      ) * pokemon2.level / 100 + 10);
      const newMaxHP = pokemon2.volatiles["dynamax"] ? 2 * pokemon2.baseMaxhp : pokemon2.baseMaxhp;
      pokemon2.hp = newMaxHP - (pokemon2.maxhp - pokemon2.hp);
      pokemon2.maxhp = newMaxHP;
      this.add("-heal", pokemon2, pokemon2.getHealth, "[silent]");
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Empress Throne",
    shortDesc: "If Ahtal-Ka, becomes Ahtal-Neset if at 1/2 max HP or less at end of turn.",
    rating: 5
  },
  crystalblight: {
    onResidual(pokemon2, target) {
      if (!pokemon2.hp)
        return;
      for (const target2 of pokemon2.foes()) {
        if (target2.status === "par") {
          this.damage(target2.baseMaxhp / 16, target2, pokemon2);
          target2.addVolatile("fatigue");
        }
      }
    },
    flags: {},
    name: "Crystalblight",
    shortDesc: "If opponent is paralyzed: Inflicts fatigue, takes 1/16th residual damage.",
    rating: 5
  },
  poisonousradula: {
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (target !== source && move.category !== "Status" && move.type === "Poison" && !(target.getMoveHitData(move).typeMod < 0)) {
        if (!move.secondaries)
          move.secondaries = [];
        if (move.category === "Physical") {
          move.secondaries.push({
            chance: 100,
            boosts: {
              def: -1
            },
            ability: this.dex.abilities.get("poisonousradula")
          });
        } else if (move.category === "Special") {
          move.secondaries.push({
            chance: 100,
            boosts: {
              spd: -1
            },
            ability: this.dex.abilities.get("poisonousradula")
          });
        }
        if (!move.multihit || move.multihit && move.hit === 1) {
        } else {
          move.secondaries = this.dex.moves.get(move.id).secondaries;
        }
      }
    },
    name: "Poisonous Radula",
    shortDesc: "Non-resisted Poison moves lowers the target's corresponding defense by one stage.",
    rating: 5
  },
  dragoneater: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Dragon") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Dragon Eater");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Dragon Eater",
    shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Dragon moves; Dragon immunity.",
    rating: 3.5
  },
  foolproof: {
    onTryHit(target, source, move) {
      if (target !== source && move.flags["sound"]) {
        this.add("-immune", target, "[from] ability: Foolproof");
        return null;
      }
      if (move.flags["bullet"]) {
        this.add("-immune", pokemon, "[from] ability: Foolproof");
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (move.flags["sound"]) {
        this.add("-immune", this.effectState.target, "[from] ability: Foolproof");
      }
    },
    flags: { breakable: 1 },
    name: "Foolproof",
    shortDesc: "Soundproof + Bulletproof",
    rating: 3.5
  },
  relentless: {
    onStart(pokemon2) {
      this.effectState.lastMove = "";
      this.effectState.numConsecutive = 0;
    },
    onTryMovePriority: -2,
    onTryMove(pokemon2, target, move) {
      if (this.effectState.lastMove === move.id && pokemon2.moveLastTurnResult) {
        this.effectState.numConsecutive++;
      } else if (pokemon2.volatiles["twoturnmove"]) {
        if (this.effectState.lastMove !== move.id) {
          this.effectState.numConsecutive = 1;
        } else {
          this.effectState.numConsecutive++;
        }
      } else {
        this.effectState.numConsecutive = 0;
      }
      this.effectState.lastMove = move.id;
    },
    onModifyDamage(damage, source, target, move) {
      const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
      const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
      this.debug(`Current Relentless boost: ${dmgMod[numConsecutive]}/4096`);
      return this.chainModify([dmgMod[numConsecutive], 4096]);
    },
    name: "Relentless",
    desc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
    flags: {},
    num: 1025,
    rating: 2
  },
  pulpup: {
    onModifyMove(move, pokemon2) {
      if (move.category === "Status") {
        pokemon2.addVolatile("stockpile");
        this.add("-ability", pokemon2, "Pulp-Up");
      }
    },
    flags: {},
    name: "Pulp Up",
    shortDesc: "When this Pokemon uses a status move, Stockpiles 1.",
    rating: 3,
    num: -1
  },
  mucusveil: {
    shortDesc: "This Pokemon retaliates with Soak whenever it is damaged by an attack.",
    onDamagingHitOrder: 3,
    onDamagingHit(damage, target, source, move) {
      if (!move.noreact && target.hp && source.hp) {
        const reaction = this.dex.getActiveMove("soak");
        reaction.noreact = true;
        this.actions.useMove(reaction, target, source);
      }
    },
    flags: {},
    name: "Mucus Veil",
    rating: 3.5,
    num: -4
  },
  thunderstorm: {
    onModifyMovePriority: 1,
    onAfterMove(pokemon2, attacker, move) {
      if (move.type === "Flying") {
        this.add("-ability", pokemon2, "Thunderstorm");
        pokemon2.addVolatile("charge");
      }
    },
    flags: {},
    shortDesc: "Grants the charge effect after using a flying-type move.",
    name: "Thunderstorm",
    rating: 4
  },
  spongy: {
    onSourceModifyDamage(damage, source, target, move) {
      let mod = 1;
      if (move.type === "Fire")
        mod *= 2;
      if (move.category === "Special")
        mod /= 2;
      return this.chainModify(mod);
    },
    flags: { breakable: 1 },
    shortDesc: "This Pokemon takes 1/2 damage from special moves, 2x damage from Fire moves.",
    name: "Spongy",
    rating: 3.5
  },
  dulledblades: {
    onSourceHit(target, source, move) {
      if (!move || !target)
        return;
      if (move.flags["slicing"]) {
        this.boost({ def: 1 }, source);
      }
    },
    onSourceAfterSubDamage(damage, target, source, move) {
      if (!move || !target)
        return;
      if (move.flags["slicing"]) {
        this.boost({ def: 1 }, source);
      }
    },
    name: "Dulled Blades",
    shortDesc: "Slicing moves: +1 Defense.",
    rating: 3
  },
  ambush: {
    shortDesc: "Slicing moves: +1 priority at full HP, always crit at 1/3 HP or less.",
    onModifyPriority(priority, pokemon2, target, move) {
      if (move.flags["slicing"] && pokemon2.hp === pokemon2.maxhp)
        return priority + 1;
    },
    name: "Ambush",
    rating: 3
  },
  /*
  Edits
  */
  mountaineer: {
    inherit: true,
    isNonstandard: null
  },
  icebody: {
    inherit: true,
    shortDesc: "If Snow is active, this Pokemon heals 1/8th of its max HP each turn.",
    onWeather(target, source, effect) {
      if (effect.id === "hail" || effect.id === "snow") {
        this.heal(target.baseMaxhp / 8);
      }
    }
  },
  poisonpuppeteer: {
    inherit: true,
    onAnyAfterSetStatus(status, target, source, effect) {
      if (source.baseSpecies.name !== "Chameleos")
        return;
      if (source !== this.effectState.target || target === source || effect.effectType !== "Move")
        return;
      if (status.id === "psn" || status.id === "tox") {
        target.addVolatile("confusion");
      }
    },
    shortDesc: "Chameleos: If this Pokemon poisons a target, the target also becomes confused."
  },
  raindish: {
    inherit: true,
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "raindance" || effect.id === "primordialsea") {
        this.heal(target.baseMaxhp / 8);
      }
    }
  }
};
//# sourceMappingURL=abilities.js.map
