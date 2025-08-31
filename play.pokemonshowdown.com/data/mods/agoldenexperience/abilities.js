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
const kickMoves = ["jumpkick", "highjumpkick", "megakick", "doublekick", "blazekick", "tropkick", "lowkick", "lowsweep", "rollingkick", "triplekick", "stomp", "highhorsepower", "tripleaxel", "stompingtantrum", "thunderouskick", "axekick"];
const tailMoves = ["firelash", "powerwhip", "tailslap", "wrap", "constrict", "irontail", "dragontail", "poisontail", "aquatail", "vinewhip", "wringout"];
const sleepMove = ["darkvoid", "grasswhistle", "hypnosis", "lovelykiss", "psychoshift", "sing", "sleeppowder", "spore", "yawn"];
const Abilities = {
  poisonousradula: {
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (target !== source && move2.category !== "Status" && move2.type === "Poison" && !(target.getMoveHitData(move2).typeMod < 0)) {
        if (!move2.secondaries)
          move2.secondaries = [];
        if (move2.category === "Physical") {
          move2.secondaries.push({
            chance: 100,
            boosts: {
              def: -1
            },
            ability: this.dex.abilities.get("poisonousradula")
          });
        } else if (move2.category === "Special") {
          move2.secondaries.push({
            chance: 100,
            boosts: {
              spd: -1
            },
            ability: this.dex.abilities.get("poisonousradula")
          });
        }
      }
    },
    name: "Poisonous Radula",
    shortDesc: "Non resisted Poison moves lowers the target's corresponding defense by one stage.",
    rating: 2,
    num: -1
  },
  daredevil: {
    onDamage(damage, target, source, effect) {
      if (effect.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
    name: "Daredevil",
    shortDesc: "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage.",
    rating: 3,
    num: -2
  },
  waterproof: {
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Water") {
        if (!this.boost({ spe: 1 })) {
          this.add("-immune", target, "[from] ability: Waterproof");
        }
        return null;
      }
    },
    name: "Waterproof",
    desc: "This Pokemon is immune to Water-type moves and raises its Speed by 1 stage when hit by an Water-type move.",
    shortDesc: "This Pokemon's Speed is raised 1 stage if hit by an Water move; Water immunity.",
    rating: 3,
    num: -3
  },
  racketeering: {
    shortDesc: "Boosts the power of Knock Off, Thief and Pluck by 1.5x",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.name === "Knock Off" || move2.name === "Thief" || move2.name === "Pluck") {
        return this.chainModify(1.5);
      }
    },
    name: "Racketeering",
    rating: 3,
    num: -4
  },
  snobbery: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Poison" || move2.type === "Bug" || move2.type === "Dark") {
        this.debug("Snobbery weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Poison" || move2.type === "Bug" || move2.type === "Dark") {
        this.debug("Snobbery weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Snobbery",
    shortDesc: "This Pokemon gets half damages from Bug, Poison and Dark type moves.",
    rating: 3.5,
    num: -5
  },
  starsforce: {
    desc: "When this Pok\xE9mon has 1/3 or less of its maximum HP, rounded down, all of its stats are x1.5.",
    shortDesc: "At 1/3 or less of max HP, all stats are x1.5.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move2) {
      if (attacker.hp <= attacker.maxhp / 3) {
        this.debug("Stars Force boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move2) {
      if (attacker.hp <= attacker.maxhp / 3) {
        this.debug("Stars Force boost");
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(def, pokemon2) {
      if (pokemon2.hp <= pokemon2.maxhp / 3) {
        this.debug("Stars Force boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 6,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.hp <= pokemon2.maxhp / 3) {
        this.debug("Stars Force boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpePriority: 6,
    onModifySpe(def, pokemon2) {
      if (pokemon2.hp <= pokemon2.maxhp / 3) {
        this.debug("Stars Force boost");
        return this.chainModify(1.5);
      }
    },
    name: "Star's Force",
    rating: 2,
    num: -6
  },
  webweaver: {
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      let activated = false;
      if (pokemon2.activeTurns) {
        for (const target of pokemon2.side.foe.active) {
          if (!target || !target.isAdjacent(pokemon2) || !target.isGrounded())
            continue;
          if (!activated) {
            this.add("-ability", pokemon2, "Web Weaver", "boost");
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
    name: "Web Weaver",
    shortDesc: "A the end of each turn, lowers by one stage the speed stat of every other grounded Pokemon.",
    rating: 4.5,
    num: -7
  },
  perforating: {
    onModifyMovePriority: -5,
    onModifyMove(move2) {
      if (!move2.ignoreImmunity)
        move2.ignoreImmunity = {};
      if (move2.ignoreImmunity !== true) {
        move2.ignoreImmunity["Poison"] = true;
      }
    },
    onModifyDamage(damage, source, target, move2) {
      if (target.getMoveHitData(move2).typeMod < 0 && (move2.type === "Bug" || move2.type === "Poison")) {
        this.debug("Perforating boost");
        return this.chainModify(2);
      }
    },
    name: "Perforating",
    shortDesc: "Bug & Poison moves deal 2x damage if resisted, can poison Steel types, Poison moves hit Steel types",
    rating: 3,
    num: -8
  },
  doublespirit: {
    shortDesc: "Switches to Nocturnal form before using a Physical move, and to Diurnal form before using a Special move.",
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move2) {
      if (attacker.species.baseSpecies !== "Girafatak" || attacker.transformed)
        return;
      if (move2.category === "Status")
        return;
      const targetForme = move2.category === "Special" ? "Girafatak" : "Girafatak-Nocturnal";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
      const newatk = attacker.storedStats.spa;
      const newspa = attacker.storedStats.atk;
      attacker.storedStats.atk = newatk;
      attacker.storedStats.spa = newspa;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Double Spirit",
    rating: 4,
    num: -9
  },
  divination: {
    shortDesc: "Reveals a random move of each adjacent opponent on entry.",
    onStart(pokemon2) {
      for (const target of pokemon2.side.foe.active) {
        if (target.fainted)
          return;
        const temp = this.sample(target.moveSlots);
        this.add("-message", pokemon2.name + "'s Divination revealed the move " + temp.move + "!");
      }
    },
    name: "Divination",
    rating: 3,
    num: -10
  },
  arcanemastery: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Psychic" || move2.type === "Dark") {
        this.debug("Arcane Mastery boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Psychic" || move2.type === "Dark") {
        this.debug("Arcane Mastery boost");
        return this.chainModify(1.5);
      }
    },
    name: "Arcane Mastery",
    shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Psychic/Dark type attack.",
    rating: 3.5,
    num: -11
  },
  strangebody: {
    onEffectiveness(typeMod, target, type, move2) {
      if (!target || move2.category !== "Physical")
        return;
      if (!target.runImmunity(move2.type))
        return;
      if (this.dex.getEffectiveness(move2, target) === -1)
        return;
      return 0;
    },
    name: "Strange Body",
    rating: 4,
    shortDesc: "If this Pokemon is hit by a physical super effective move, it takes neutral damage.",
    num: -12
  },
  mistymountain: {
    onModifyTypePriority: -1,
    onModifyType(move2, pokemon2) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move2.type === "Rock" && !noModifyType.includes(move2.id) && !(move2.isZ && move2.category !== "Status") && !(move2.name === "Tera Blast" && pokemon2.terastallized)) {
        move2.type = "Ice";
        move2.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Misty Mountain",
    shortDesc: "This Pokemon's Rock-type moves become Ice-type and have 1.2x power.",
    rating: 4,
    num: -13
  },
  coldwind: {
    onModifyTypePriority: -1,
    onModifyType(move2, pokemon2) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move2.type === "Flying" && !noModifyType.includes(move2.id) && !(move2.isZ && move2.category !== "Status")) {
        move2.type = "Ice";
        move2.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Cold Wind",
    shortDesc: "This Pokemon's Flying-type moves become Ice-type and have 1.2x power.",
    rating: 4,
    num: -14
  },
  maddancer: {
    shortDesc: "This Pokemon's Dance move boost its Speed by 1 stage upon use.",
    onBasePowerPriority: 19,
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (move2.flags["dance"]) {
        this.boost({ spe: 1 }, source);
      }
    },
    name: "Mad Dancer",
    num: -15
  },
  toymaker: {
    name: "Toymaker",
    desc: "At the end of each turn, if it doesn't have an held item, the user acquires a random item. (Leftovers, Sitrus Berry, Lum Berry, Figy Berry, Starf Berry, Choice Band, Choice Specs, Choice Scarf, Flame Orb, Para Orb, Toxic Orb, Light Ball, Iron Ball, Rocky Helmet, Heavy-Duty Boots)",
    shortDesc: "Gets a random item from a list at the end of the turn if the user doesn't already have one.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      const itemList = ["leftovers", "sitrusberry", "lumberry", "figyberry", "starfberry", "choiceband", "choicespecs", "choicescarf", "flameorb", "paraorb", "toxicorb", "lightball", "ironball", "rockyhelmet", "heavydutyboots"];
      const itemIndex = this.random(itemList.length);
      const itemMade = itemList[itemIndex];
      if (pokemon2.hp && !pokemon2.item) {
        pokemon2.setItem(itemMade);
        this.add("-item", pokemon2, pokemon2.getItem(), "[from] ability: Toymaker");
      }
    },
    rating: 3,
    num: -16
  },
  woodclearing: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move2) {
      if (this.field.isTerrain("grassyterrain")) {
        this.debug("Wood Clearing boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onEffectiveness(typeMod, target, type, move2) {
      if (type === "Grass")
        return 1;
    },
    name: "Wood Clearing",
    shortDesc: "This Pokemon's attacks do 1.3x in Grassy Terrain. Always hits Grass targets for super effective.",
    rating: 2,
    num: -17
  },
  rickroll: {
    desc: "This Pok\xE9mon does not suffer the drawbacks of recoil moves and sacrificial moves.",
    shortDesc: "Ignores recoil and self-KO effects of that move.",
    onModifyMove(move2) {
      if (move2.recoil || move2.mindBlownRecoil || move2.selfdestruct && move2.selfdestruct === "always") {
        if (move2.selfdestruct && move2.selfdestruct === "always") {
          delete move2.selfdestruct;
        }
        if (move2.recoil) {
          delete move2.recoil;
        }
        if (move2.mindBlownRecoil) {
          move2.mindBlownRecoil = false;
        }
      }
    },
    name: "Rick Roll",
    rating: 4,
    num: -18
  },
  microclimate: {
    onStart(pokemon2) {
      if (this.field.isWeather("sunnyday")) {
        this.field.setWeather("raindance");
      } else if (this.field.isWeather("raindance")) {
        this.field.setWeather("sunnyday");
      } else if (this.field.isWeather("desolateland")) {
        this.field.setWeather("primordialsea");
      } else if (this.field.isWeather("primodialsea")) {
        this.field.setWeather("desolateland");
      } else if (this.field.isWeather(["hail", "snow", "everlastingwinter"]) || this.field.isWeather("sand")) {
        this.field.clearWeather();
      }
    },
    onEnd(pokemon2) {
      if (this.field.isWeather("raindance")) {
        this.field.setWeather("sunnyday");
      } else if (this.field.isWeather("sunnyday")) {
        this.field.setWeather("raindance");
      } else if (this.field.isWeather("primordialsea")) {
        this.field.setWeather("desolateland");
      } else if (this.field.isWeather("desolateland")) {
        this.field.setWeather("primordialsea");
      }
    },
    shortDesc: "Reverses effects of Sun and Rain; negates Sand and Hail.",
    name: "Microclimate",
    rating: 2,
    num: -19
  },
  voidheart: {
    desc: "When it KOs an opponent with a direct move, it recovers 25% of its max HP.",
    shortDesc: "Heals 25% HP on KO.",
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.heal(source.baseMaxhp / 4);
      }
    },
    name: "Void-Heart",
    rating: 3,
    num: -20
  },
  convectioncurrent: {
    desc: "If Gravity is active, this Pokemon's Speed is doubled.",
    shortDesc: "Speed x2 on Gravity.",
    onModifySpe(spe, pokemon2) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    name: "Convection Current",
    rating: 3,
    num: -21
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
  evaporate: {
    desc: "If the Pokemon or the opponent uses a Water type move, it triggers the Haze effect. Immune to Water.",
    shortDesc: "Haze when any Pokemon uses a Water move; Water immunity.",
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (move2.type === "Water") {
        for (const pokemon2 of this.getAllActive()) {
          pokemon2.clearBoosts();
          return null;
        }
      }
    },
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Water") {
        this.add("-immune", target, "[from] ability: Evaporate");
        for (const pokemon2 of this.getAllActive()) {
          pokemon2.clearBoosts();
          return null;
        }
      }
    },
    name: "Evaporate",
    rating: 4,
    num: -23
  },
  desertsong: {
    onModifyTypePriority: -1,
    onModifyType(move2, pokemon2) {
      if (move2.flags["sound"] && !pokemon2.volatiles["dynamax"]) {
        move2.type = "Ground";
      }
    },
    name: "Desert Song",
    desc: "This Pokemon's sound-based moves become Ground-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's sound-based moves become Ground type.",
    rating: 1.5,
    num: -24
  },
  sundownswitch: {
    name: "Sundown Switch",
    desc: "If Cacturne-Mega: Changes to Day form before using Grass move; to Night before using Dark move.",
    num: -25,
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move2) {
      if (attacker.species.baseSpecies !== "Cacturne" || attacker.transformed)
        return;
      if (move2.type !== "Grass" && move2.type !== "Dark")
        return;
      const targetForme = move2.type === "Grass" ? "Cacturne-Mega" : "Cacturne-Mega-Night";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
      this.add("-start", attacker, "typechange", attacker.getTypes(true).join("/"), "[silent]");
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 }
  },
  coldvengeance: {
    desc: "When replacing a fainted party member, its next move has x1.5 BP.",
    shortDesc: "Its first move has x1.5 BP when replacing a fainted ally.",
    onAfterMega(pokemon2) {
      if (!pokemon2.side.faintedLastTurn)
        return;
      pokemon2.addVolatile("coldvengeance");
    },
    onStart(pokemon2) {
      if (!pokemon2.side.faintedThisTurn)
        return;
      pokemon2.addVolatile("coldvengeance");
    },
    onModifyDamage(damage, source, target, move2) {
      if (source.volatiles["coldvengeance"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Cold Vengeance",
    rating: 3,
    num: -26
  },
  blindrage: {
    onDamagingHit(damage, target, source, move2) {
      if (!move2.damage && !move2.damageCallback && target.getMoveHitData(move2).typeMod > 0) {
        this.boost({ atk: 1 });
      }
    },
    name: "Blind Rage",
    shortDesc: "This Pokemon's Atk is raised by 1 when hit by a super effective attack.",
    rating: 3.5,
    num: -27
  },
  hardrock: {
    onModifyAtkPriority: 6,
    onModifyAtk(pokemon2) {
      return this.chainModify(1.5);
    },
    onModifyDefPriority: 6,
    onModifyDef(pokemon2) {
      return this.chainModify(2);
    },
    onModifySpDPriority: 6,
    onModifySpD(pokemon2) {
      return this.chainModify(0.5);
    },
    name: "Hard Rock",
    shortDesc: "This Pokemon's Atk is boosted by 1.5 and Def by 2, but its SpD is halved.",
    rating: 1.5,
    num: -28
  },
  forgery: {
    desc: "This Pok\xE9mon inherits the item of the last unfainted Pokemon in its party.",
    shortDesc: "Inherits the item of the last party member.",
    onStart(pokemon2) {
      if (pokemon2.species.name !== "Zoroark-Mega")
        return;
      pokemon2.addVolatile("forgery");
      let i;
      for (i = pokemon2.side.pokemon.length - 1; i > pokemon2.position; i--) {
        if (!pokemon2.side.pokemon[i] || pokemon2.side.pokemon[i].fainted || !pokemon2.side.pokemon[i].item || this.dex.items.get(pokemon2.side.pokemon[i].item).zMove || this.dex.items.get(pokemon2.side.pokemon[i].item).megaStone)
          continue;
        break;
      }
      if (!pokemon2.side.pokemon[i])
        return;
      if (pokemon2 === pokemon2.side.pokemon[i])
        return;
      const forgery = pokemon2.side.pokemon[i];
      this.add("-ability", pokemon2, "Forgery");
      pokemon2.item = forgery.item;
      this.add("-message", `${pokemon2.name}'s Zoroarkite became a replica of the ${this.dex.items.get(forgery.item).name} belonging to ${forgery.name}!`);
    },
    onUpdate(pokemon2) {
      if (pokemon2.species.name !== "Zoroark-Mega")
        return;
      if (!pokemon2.item) {
        this.add("-ability", pokemon2, "Forgery");
        this.add("-message", `${pokemon2.name}'s Zoroarkite returned to normal!`);
        pokemon2.item = "zoroarkite";
      }
    },
    onEnd(pokemon2) {
      if (pokemon2.species.name !== "Zoroark-Mega")
        return;
      if (pokemon2.item !== "zoroarkite") {
        this.add("-ability", pokemon2, "Forgery");
        this.add("-message", `${pokemon2.name}'s Zoroarkite returned to normal!`);
        pokemon2.item = "zoroarkite";
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Forgery",
    rating: 3,
    num: -29
  },
  clairvoyance: {
    desc: "This Pok\xE9mon's Psychic-type moves take effect two turns after being used. At the end of that turn, the damage is calculated at that time and dealt to the Pok\xE9mon at the position the target had when the move was used. Only one move can be delayed at a time. If the user is no longer active at the time an attacking move should hit, damage is calculated based on the user's natural Attack or Special Attack stat, types, and level, with no boosts from its held item or Ability. Status moves are used by the Pok\xE9mon at the position the user had when the move was used.",
    shortDesc: "Psychic-type moves delayed until two turns later, but only one at a time.",
    onBeforeMove(source, target, move2) {
      if (move2 && move2.type === "Psychic" && source.hasAbility("clairvoyance") && source.side.addSlotCondition(source, "clairvoyance")) {
        Object.assign(source.side.slotConditions[source.position]["clairvoyance"], {
          duration: 3,
          source,
          target: null,
          move: move2,
          position: target.position,
          side: target.side,
          moveData: this.dex.moves.get(move2)
        });
        this.add("-ability", source, "Clairvoyance");
        this.add("-message", `${source.name} cast ${move2.name} into the future!`);
        source.deductPP(move2.id, 1);
        return null;
      }
    },
    condition: {
      duration: 3,
      onResidualOrder: 3,
      onEnd(target) {
        this.effectState.target = this.effectState.side.active[this.effectState.position];
        const data = this.effectState;
        const move2 = this.dex.moves.get(data.move);
        this.add("-ability", this.effectState.source, "Clairvoyance");
        if (!data.target) {
          this.hint(`${move2.name} did not hit because there was no target.`);
          return;
        }
        this.add("-message", `${this.effectState.source.name}'s ${move2.name} took effect!`);
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
        if (move2.category === "Status") {
          this.actions.useMove(move2, target, data.target);
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
    num: -30
  },
  longtail: {
    shortDesc: "Gives a +1 priority to tail and whip moves.",
    onModifyPriority(priority, pokemon2, target, move2) {
      if (tailMoves.includes(move2.id))
        return priority + 1;
    },
    name: "Long Tail",
    num: -31
  },
  boarding: {
    onBasePower(basePower, pokemon2, target) {
      if (target.volatiles["trapped"]) {
        return this.chainModify(1.25);
      }
    },
    name: "Boarding",
    shortDesc: "This Pokemon deals 1.25x damage to trapped opponents.",
    rating: 3,
    num: -32
  },
  lasttoxin: {
    desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
    shortDesc: "Badly poison enemies brought under half health..",
    onAfterMove(source, target, move2) {
      if (!source || source === target || !target.hp || !move2.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move2.multihit ? move2.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        target.setStatus("tox");
      }
    },
    name: "Last Toxin",
    rating: 4,
    num: -33
  },
  chakrasurge: {
    onStart(source) {
      this.field.setTerrain("chakraterrain");
    },
    name: "Chakra Surge",
    shortDesc: "On switch-in, sets Chakra Terrain.",
    rating: 4,
    num: -34
  },
  striker: {
    shortDesc: "Boosts the power of kicking moves by 1.3x",
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move2) {
      if (kickMoves.includes(move2.id)) {
        return this.chainModify(1.3);
      }
    },
    name: "Striker",
    num: -35
  },
  deadlyblasts: {
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["bullet"]) {
        return this.chainModify(1.3);
      }
    },
    name: "Deadly Blasts",
    shortDesc: "Boosts the power of bullet, bomb and ball moves by 1.3x",
    rating: 2.5,
    num: -36
  },
  insectivorous: {
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Bug") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Insectivorous");
        }
        return null;
      }
    },
    name: "Insectivorous",
    shortDesc: "This Pokemon heals 1/4 HP when hit by a Bug type move. Immune to Bug type moves.",
    rating: 3.5,
    num: -37
  },
  cosmicenergy: {
    desc: "This Pok\xE9mon can skip the charging turn of its moves.",
    shortDesc: "Skip charging turns of moves.",
    onChargeMove(pokemon2, target, move2) {
      this.debug("Cosmic Energy - remove charge turn for " + move2.id);
      this.attrLastMove("[still]");
      this.addMove("-anim", pokemon2, move2.name, target);
      return false;
    },
    name: "Cosmic Energy",
    rating: 2,
    num: -38
  },
  ignite: {
    desc: "This Pok\xE9mon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pok\xE9mon's Normal-type moves become Fire-type and have 1.2x power.",
    onModifyTypePriority: -1,
    onModifyType(move2, pokemon2) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move2.type === "Normal" && !noModifyType.includes(move2.id) && !(move2.isZ && move2.category !== "Status")) {
        move2.type = "Fire";
        move2.igniteBoosted = true;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.igniteBoosted)
        return this.chainModify([4915, 4096]);
    },
    name: "Ignite",
    rating: 4,
    num: -39
  },
  nightlight: {
    desc: "This Pokemon takes halves damages against Ghost-type and Dark-type moves.",
    shortDesc: "This Pokemon takes halves damages against Ghost-type and Dark-type moves.",
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Ghost" || move2.type === "Dark") {
        this.debug("Night Light weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Ghost" || move2.type === "Dark") {
        this.debug("Night Light weaken");
        return this.chainModify(0.5);
      }
    },
    name: "Night Light",
    rating: 3.5,
    num: -40
  },
  icebreaker: {
    desc: "This Pokemon's Speed is x1.5 on Hail, and this Pokemon's Atk and SpA is x1.5 on Rain. This Pokemon is immune to Hail.",
    shortDesc: "x1.5 Speed on Hail; x1.5 Atk and SpA on Rain. Hail immunity.",
    onImmunity(type, pokemon2) {
      if (type === "hail")
        return false;
    },
    onModifySpe(spe, pokemon2) {
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"])) {
        return this.chainModify(1.5);
      }
    },
    onModifyAtk(atk, pokemon2) {
      if (["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onModifySpA(spa, pokemon2) {
      if (["raindance", "primordialsea"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    name: "Icebreaker",
    rating: 3,
    num: -41
  },
  parasitism: {
    name: "Parasitism",
    desc: "When this Pokemon is KO, inflicts Yawn and Leech Seed to the opponent.",
    shortDesc: "Inflicts Yawn and Leech Seed on KO.",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move2) {
      if (!target.hp) {
        if (!source.status && source.runStatusImmunity("slp")) {
          source.addVolatile("yawn");
        }
        if (!source.hasType("Grass")) {
          source.addVolatile("leechseed", source);
        }
      }
    },
    rating: 2.5,
    num: -42
  },
  explosive: {
    desc: "This Pok\xE9mon does not suffer the drawbacks of recoil moves and sacrificial moves.",
    shortDesc: "Ignores recoil and self-KO effects of its moves.",
    onModifyMove(move2) {
      if (move2.recoil || move2.mindBlownRecoil || move2.selfdestruct && move2.selfdestruct === "always") {
        if (move2.selfdestruct && move2.selfdestruct === "always") {
          delete move2.selfdestruct;
        }
        if (move2.recoil) {
          delete move2.recoil;
        }
        if (move2.mindBlownRecoil) {
          move2.mindBlownRecoil = false;
        }
      }
    },
    name: "Explosive",
    rating: 4,
    num: -43
  },
  accumulate: {
    desc: "At the end of each turn, this Pokemon gets 1 Stockpile.",
    shortDesc: "Stockpiles at the end of each turn.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.activeTurns) {
        pokemon2.addVolatile("stockpile");
      }
    },
    name: "Accumulate",
    rating: 4.5,
    num: -44
  },
  angelicnature: {
    onModifyMove(move2) {
      if (!move2.ignoreImmunity)
        move2.ignoreImmunity = {};
      if (move2.ignoreImmunity !== true) {
        move2.ignoreImmunity["Dark"] = true;
      }
    },
    onEffectiveness(typeMod, target, type, move2) {
      if (move2.type !== "Dark")
        return;
      if (move2.type === "Dark" && target.hasType("Fairy")) {
        this.debug("Angelic Nature boost");
        return 1;
      }
    },
    name: "Angelic Nature",
    desc: "This Pokemon can hit Fairy type opponents for super effective damages with Dark moves.",
    shortDesc: "Hits Fairy opponents for super effective damages with Dark moves.",
    rating: 3.5,
    num: -45
  },
  blowhole: {
    desc: "Before this Pokemon uses Water Spout, it sets Rain Dance. Water Spout is always at max BP.",
    shortDesc: "Sets Rain Dance before using Water Spout. Water Spout is at max BP.",
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (move2.id === "waterspout" && this.field.getWeather().id !== "raindance") {
        this.field.setWeather("raindance");
      }
    },
    // Water Spout modified in moves.ts
    name: "Blowhole",
    rating: 3,
    num: -46
  },
  northwind: {
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      let activated = false;
      if (pokemon2.activeTurns) {
        for (const target of pokemon2.side.foe.active) {
          if (!target || !target.isAdjacent(pokemon2) || target.hasType("Ice"))
            continue;
          if (!activated) {
            this.add("-ability", pokemon2, "Web Weaver", "boost");
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
    name: "North Wind",
    shortDesc: "At the end of each turn, lowers all of the Pokemons' Speed by one stage.",
    rating: 4.5,
    num: -47
  },
  everlastingwinter: {
    desc: "On switch-in, the weather becomes Snow Hail. This weather remains in effect until this Ability is no longer active for any Pok\xE9mon, or the weather is changed by Delta Stream, Desolate Land or Primordial Sea. Super effective moves only inflict 3/4 damages on this Pokemon.",
    shortDesc: "On switch-in, snow hail begins until this Ability is not active in battle. Filter effect.",
    onStart(source) {
      this.field.setWeather("everlastingwinter");
      this.add("-ability", source, "Everlasting Winter");
      this.add("-message", `${source.name} created an unrelenting winter storm!`);
      this.hint("Everlasting Winter doesn't wear off until the user leaves the field!");
    },
    onAnySetWeather(target, source, weather) {
      const strongWeathers = ["desolateland", "primordialsea", "deltastream", "everlastingwinter"];
      if (this.field.getWeather().id === "everlastingwinter" && !strongWeathers.includes(weather.id))
        return false;
    },
    onEnd(pokemon2) {
      if (this.field.weatherState.source !== pokemon2)
        return;
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (target.hasAbility("everlastingwinter")) {
          this.field.weatherState.source = target;
          return;
        }
      }
      this.field.clearWeather();
    },
    name: "Everlasting Winter",
    rating: 4.5,
    num: -48
  },
  // other strong weathers
  deltastream: {
    inherit: true,
    desc: "On switch-in, the weather becomes strong winds that remove the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land, Everlasting Winter or Primordial Sea.",
    onAnySetWeather(target, source, weather) {
      const strongWeathers = ["desolateland", "primordialsea", "deltastream", "everlastingwinter"];
      if (this.field.getWeather().id === "deltastream" && !strongWeathers.includes(weather.id))
        return false;
    }
  },
  desolateland: {
    inherit: true,
    desc: "On switch-in, the weather becomes extremely harsh sunlight that prevents damaging Water-type moves from executing, in addition to all the effects of Sunny Day. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Everlasting Winter or Primordial Sea.",
    onAnySetWeather(target, source, weather) {
      const strongWeathers = ["desolateland", "primordialsea", "deltastream", "everlastingwinter"];
      if (this.field.getWeather().id === "desolateland" && !strongWeathers.includes(weather.id))
        return false;
    }
  },
  primordialsea: {
    inherit: true,
    desc: "On switch-in, the weather becomes heavy rain that prevents damaging Fire-type moves from executing, in addition to all the effects of Rain Dance. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Delta Stream, Desolate Land or Everlasting Winter.",
    onAnySetWeather(target, source, weather) {
      const strongWeathers = ["desolateland", "primordialsea", "deltastream", "everlastingwinter"];
      if (this.field.getWeather().id === "primordialsea" && !strongWeathers.includes(weather.id))
        return false;
    }
  },
  // all snow and hail abilities
  icebody: {
    inherit: true,
    onImmunity(type, pokemon2) {
      if (type === "hail" || type === "everlastingwinter")
        return false;
    },
    onWeather(target, source, effect) {
      if (effect.id === "hail" || effect.id === "snow" || effect.id === "everlastingwinter") {
        this.heal(target.baseMaxhp / 16);
      }
    }
  },
  slushrush: {
    inherit: true,
    onModifySpe(spe, pokemon2) {
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"])) {
        return this.chainModify(2);
      }
    }
  },
  overcoat: {
    inherit: true,
    onImmunity(type, pokemon2) {
      if (type === "sandstorm" || type === "hail" || type === "everlastingwinter" || type === "powder")
        return false;
    }
  },
  // end of snow and hail abilities
  spikybody: {
    onDamagingHit(damage, target, source, move2) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const spikes = side.sideConditions["spikes"];
      if (move2.category === "Physical" && (!spikes || spikes.layers < 3)) {
        this.add("-activate", target, "ability: Spiky Body");
        side.addSideCondition("spikes", target);
      }
    },
    name: "Spiky Body",
    shortDesc: "If this Pokemon is hit by a physical attack, Spikes are set on the opposing side.",
    rating: 2.5,
    num: -49
  },
  disillusioned: {
    desc: "This Pokemon is immune to Fairy type moves, and can hit Fairy type opponents for neutral damages with Dark moves.",
    shortDesc: "Hits Fairy opponents for neutral damages with Dark moves; Fairy immune.",
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Fairy") {
        this.add("-immune", target, "[from] ability: Disillusioned");
        return null;
      }
    },
    onModifyMove(move2) {
      if (!move2.ignoreImmunity)
        move2.ignoreImmunity = {};
      if (move2.ignoreImmunity !== true) {
        move2.ignoreImmunity["Dark"] = true;
      }
    },
    onModifyDamage(damage, source, target, move2) {
      if (move2.type !== "Dark")
        return;
      if (move2.type === "Dark" && target.hasType("Fairy")) {
        this.debug("Disillusioned boost");
        return this.chainModify(2);
      }
    },
    name: "Disillusioned",
    rating: 3.5,
    num: -50
  },
  leafdress: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (defender.hasType("Grass") && (move2.type === "Ice" || move2.type === "Fire" || move2.type === "Poison" || move2.type === "Flying" || move2.type === "Bug")) {
        this.debug("Leaf Dress weaken");
        return this.chainModify(0.5);
      } else if (!defender.hasType("Grass") && (move2.type === "Grass" || move2.type === "Water" || move2.type === "Electric" || move2.type === "Ground")) {
        this.debug("Leaf Dress weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (defender.hasType("Grass") && (move2.type === "Ice" || move2.type === "Fire" || move2.type === "Poison" || move2.type === "Flying" || move2.type === "Bug")) {
        this.debug("Leaf Dress weaken");
        return this.chainModify(0.5);
      } else if (!defender.hasType("Grass") && (move2.type === "Grass" || move2.type === "Water" || move2.type === "Electric" || move2.type === "Ground")) {
        this.debug("Leaf Dress weaken");
        return this.chainModify(0.5);
      }
    },
    onDamage(damage, target, source, effect) {
      if (target.hasType("Grass") && effect && (effect.id === "stealthrock" || effect.id === "spikes" || effect.id === "toxicspikes" || effect.id === "stickyweb" || effect.id === "gmaxsteelsurge")) {
        return false;
      }
    },
    onSetStatus(status, target, source, effect) {
      if (target.hasType("Grass")) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Leaf Dress");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && target.hasType("Grass")) {
        this.add("-immune", target, "[from] ability: Leaf Dress");
        return null;
      }
    },
    name: "Leaf Dress",
    shortDesc: "If not Grass: gives Grass resists; if Grass: negates Grass weaknesses, status and hazard damage.",
    rating: 3.5,
    num: -51
  },
  invincible: {
    onModifyMovePriority: -5,
    onSetStatus(status, target, source, effect) {
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Invincible");
      }
      return false;
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn") {
        this.add("-immune", target, "[from] ability: Invincible");
        return null;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Invincible", "[of] " + target);
      }
    },
    name: "Invincible",
    shortDesc: "This Pokemon is immune to status condition. Immune to Intimidate.",
    rating: 3,
    num: -52
  },
  sonar: {
    shortDesc: "Reveals a random move of each adjacent opponent when this Pokemon hits them with a Sound move.",
    onSourceHit(target, source, move2) {
      if (move2.flags["sound"]) {
        for (const targ of source.side.foe.active) {
          if (targ.fainted)
            return;
          const temp = this.sample(targ.moveSlots);
          this.add("-message", target.name + "'s Sonar revealed the move " + temp.move + "!");
        }
      }
    },
    name: "Sonar",
    rating: 3,
    num: -53
  },
  unstableshell: {
    shortDesc: "If a pokemon makes contact to this pokemon, this Pokemon loses 25% max HP and returns doubles of lost HP.",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move2) {
      if (move2.flags["contact"]) {
        this.damage(Math.round(target.maxhp / 4), target, target);
        this.damage(Math.round(target.maxhp / 2), source, target);
      }
    },
    name: "Unstable Shell",
    rating: 2.5,
    num: -54
  },
  sleightofhand: {
    desc: "This Pok\xE9mon's contact moves become special attacks and do not make contact with the target.",
    shortDesc: "This Pok\xE9mon's contact moves become special and non-contact.",
    onModifyMove(move2) {
      if (move2.flags["contact"]) {
        if (move2.category !== "Special")
          move2.category = "Special";
        delete move2.flags["contact"];
      }
    },
    name: "Sleight of Hand",
    rating: 3,
    num: -55
  },
  newtonslaw: {
    onModifySpe(spe, pokemon2) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    name: "Newton's Law",
    shortDesc: "On Gravity, this Pokemon's Speed is doubled.",
    rating: 3,
    num: -56
  },
  hyperthermia: {
    onSourceHit(target, source, move2) {
      if (move2.category !== "Status") {
        if (source.volatiles["warming"]) {
          delete source.volatiles["warming"];
          source.addVolatile("warm");
        } else {
          source.addVolatile("warming");
        }
      }
    },
    onAfterMove(pokemon2) {
      if (pokemon2.volatiles["warm"]) {
        pokemon2.clearBoosts();
        this.add("-clearboost", pokemon2);
        delete pokemon2.volatiles["warm"];
      }
    },
    name: "Hyperthermia",
    desc: "After this Pokemon used 2 offensive moves, all of its stat changes are reseted.",
    shortDesc: "Resets all stat changes after 2 offensive moves.",
    rating: 1,
    num: -57
  },
  mentalfortitude: {
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: Mental Fortitude");
      }
      if (pokemon2.volatiles["taunt"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("taunt");
      }
      if (pokemon2.volatiles["encore"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("encore");
      }
      if (pokemon2.volatiles["torment"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("torment");
      }
      if (pokemon2.volatiles["disable"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("disable");
      }
      if (pokemon2.volatiles["healblock"]) {
        this.add("-activate", pokemon2, "ability: Mental Fortitude");
        pokemon2.removeVolatile("healblock");
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onTryHit(pokemon2, target, move2) {
      if (move2.id === "attract" || move2.id === "captivate" || move2.id === "taunt") {
        this.add("-immune", pokemon2, "[from] ability: Oblivious");
        return null;
      }
    },
    name: "Mental Fortitude",
    shortDesc: "This Pokemon is immune to Attract, Disable, Encore, Heal Block, Taunt, Torment.",
    rating: 1.5,
    num: -58
  },
  unconcerned: {
    name: "Unconcerned",
    onTryBoost(boost, target, source, effect) {
      if (boost.atk) {
        delete boost.atk;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Attack", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
      if (boost.def) {
        delete boost.def;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Defense", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
      if (boost.spa) {
        delete boost.spa;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
      if (boost.spd) {
        delete boost.spd;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Special Defense", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
      if (boost.accuracy) {
        delete boost.accuracy;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Accuracy", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
      if (boost.evasion) {
        delete boost.evasion;
        if (!effect.secondaries) {
          this.add("-fail", target, "unboost", "Evasion", "[from] ability: Unconcerned", "[of] " + target);
        }
      }
    },
    shortDesc: "This Pokemon ignores its own stat stages when taking or doing damage.",
    rating: 4,
    num: -59
  },
  hydrophilic: {
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Fire") {
        return this.chainModify(0.5);
      }
    },
    onModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Water") {
        return this.chainModify(2);
      }
    },
    onModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Water") {
        return this.chainModify(2);
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.status === "brn") {
        this.add("-activate", pokemon2, "ability: Water Bubble");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Water Bubble");
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Hydrophilic",
    desc: "This Pokemon's offensive stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
    shortDesc: "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved.",
    rating: 3.5,
    num: -60
  },
  searingtouch: {
    onModifyMove(move2) {
      if (!move2 || !move2.flags["contact"] || move2.target === "self")
        return;
      if (!move2.secondaries) {
        move2.secondaries = [];
      }
      move2.secondaries.push({
        chance: 30,
        status: "brn",
        ability: this.dex.abilities.get("searingtouch")
      });
    },
    name: "Searing Touch",
    shortDesc: "This Pokemon's contact moves have a 30% chance of burning.",
    rating: 2,
    num: -61
  },
  virality: {
    name: "Virality",
    shortDesc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
    onDamagingHit(damage, target, source, move2) {
      const sourceAbility = source.getAbility();
      if (sourceAbility.flags["cantsuppress"] || sourceAbility.id === "virality") {
        return;
      }
      if (move2.flags["contact"]) {
        const oldAbility = source.setAbility("virality", target);
        if (oldAbility) {
          this.add("-activate", target, "ability: Virality", this.dex.abilities.get(oldAbility).name, "[of] " + source);
        }
      }
    },
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.multihitType === "parentalbond" && move2.hit > 1)
        return this.chainModify(0.25);
    },
    rating: 2,
    num: -62
  },
  oldschool: {
    shortDesc: "This Pokemon's high crit rate moves always crit, and deal damages x2 instead of x1.5. This Pokemon's special moves use SpD in calculation.",
    name: "Old School",
    onModifyMove(move2, attacker) {
      if (move2.category === "Special") {
        move2.overrideOffensiveStat = "spd";
      }
    },
    onModifyCritRatio(critRatio, source, target) {
      if (critRatio >= 2)
        return 5;
    },
    onModifyDamage(damage, source, target, move2) {
      if (target.getMoveHitData(move2).crit) {
        this.debug("Old School boost");
        return this.chainModify(2 / 1.5);
      }
    },
    rating: 3.5,
    num: -63
  },
  justified: {
    inherit: true,
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Dark") {
        if (!this.boost({ atk: 1 })) {
          this.add("-immune", target, "[from] ability: Justified");
        }
        return null;
      }
    },
    shortDesc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move. Dark immunity."
  },
  colorchange: {
    inherit: true,
    onAfterMoveSecondary(target, source, move2) {
    },
    onTryHit(target, source, move2) {
      if (!target.hp)
        return;
      const type = move2.type;
      if (target.isActive && move2.effectType === "Move" && move2.category !== "Status" && type !== "???" && !target.hasType(type)) {
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
    shortDesc: "This Pokemon's type changes to the type of a move it's hit by before being hit, unless it has the type."
  },
  iceface: {
    inherit: true,
    onStart(pokemon2) {
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"]) && pokemon2.species.id === "eiscuenoice") {
        this.add("-activate", pokemon2, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon2.formeChange("Eiscue", this.effect, true);
      }
    },
    onDamage(damage, target, source, effect) {
      if (effect?.effectType === "Move" && target.species.id === "eiscue") {
        this.add("-activate", target, "ability: Ice Face");
        this.effectState.busted = true;
        return 0;
      }
    },
    onCriticalHit(target, type, move2) {
      if (!target)
        return;
      if (target.species.id !== "eiscue")
        return;
      if (target.volatiles["substitute"] && !(move2.flags["bypasssub"] || move2.infiltrates))
        return;
      if (!target.runImmunity(move2.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move2) {
      if (!target)
        return;
      if (target.species.id !== "eiscue")
        return;
      const hitSub = target.volatiles["substitute"] && !move2.flags["bypasssub"] && !(move2.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move2.type))
        return;
      return 0;
    },
    onWeatherChange(pokemon2, source, sourceEffect) {
      if (sourceEffect?.suppressWeather)
        return;
      if (!pokemon2.hp)
        return;
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"]) && pokemon2.species.id === "eiscuenoice") {
        this.add("-activate", pokemon2, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon2.formeChange("Eiscue", this.effect, true);
      }
    },
    desc: "If this Pokemon is an Eiscue, the first hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
    shortDesc: "If Eiscue, the first hit it takes deals 0 damage. Effect is restored in Snow."
  },
  powerspot: {
    inherit: true,
    onAllyBasePower(basePower, attacker, defender, move2) {
      if (attacker !== this.effectState.target) {
        this.debug("Power Spot boost");
        return this.chainModify(1.5);
      }
    },
    shortDesc: "This Pokemon's allies have the power of their moves multiplied by 1.5."
  },
  arenatrap: {
    inherit: true,
    onFoeTrapPokemon(pokemon2) {
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
    },
    onModifyDamage(damage, source, target, move2) {
      if (!(source.activeMoveActions > 1)) {
        return this.chainModify(1.3);
      }
    },
    shortDesc: "This Pokemon's attacks deal x1.3 damages during 1 turn."
  },
  shadowtag: {
    inherit: true,
    onFoeTrapPokemon(pokemon2) {
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
    },
    desc: "While this Pok\xE9mon is present, all Pok\xE9mon are prevented from restoring any HP. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. Regenerator is also suppressed.",
    shortDesc: "While present, all Pok\xE9mon are prevented from healing and Regenerator is suppressed.",
    onStart(source) {
      let activated = false;
      for (const pokemon2 of this.getAllActive()) {
        if (!activated) {
          this.add("-ability", source, "Shadow Tag");
        }
        activated = true;
        if (!pokemon2.volatiles["healblock"]) {
          pokemon2.addVolatile("healblock");
        }
      }
    },
    onAnySwitchIn(pokemon2) {
      if (!pokemon2.volatiles["healblock"]) {
        pokemon2.addVolatile("healblock");
      }
    },
    onEnd(pokemon2) {
      for (const target of this.getAllActive()) {
        if (target === pokemon2)
          continue;
        if (target.hasAbility("shadowtag"))
          return;
      }
      for (const target of this.getAllActive()) {
        target.removeVolatile("healblock");
      }
    }
  },
  regenerator: {
    // modded for Shadow Tag
    inherit: true,
    onSwitchOut(pokemon2) {
      for (const target of this.getAllActive()) {
        if (target.hasAbility("shadowtag")) {
          return;
        }
      }
      pokemon2.heal(pokemon2.baseMaxhp / 3);
    }
  },
  sandveil: {
    inherit: true,
    onSetStatus(status, target, source, effect) {
      if (this.field.isWeather("sandstorm")) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Sand Veil");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && this.field.isWeather("sandstorm")) {
        this.add("-immune", target, "[from] ability: Sand Veil");
        return null;
      }
    },
    onModifyDef(def, pokemon2) {
      if (this.field.isWeather("sandstorm")) {
        return this.chainModify(1.3);
      }
    },
    onModifyAccuracy(accuracy) {
    },
    desc: "If Sandstorm is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    shortDesc: "If Sandstorm is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it."
  },
  snowcloak: {
    inherit: true,
    onImmunity(type, pokemon2) {
      if (type === "hail" || type === "everlastingwinter")
        return false;
    },
    onSetStatus(status, target, source, effect) {
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"])) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Snow Cloak");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && this.field.isWeather(["hail", "snow", "everlastingwinter"])) {
        this.add("-immune", target, "[from] ability: Snow Cloak");
        return null;
      }
    },
    onModifyDef(def, pokemon2) {
      if (this.field.isWeather(["hail", "snow", "everlastingwinter"])) {
        return this.chainModify(1.3);
      }
    },
    onModifyAccuracy(accuracy) {
    },
    desc: "If Snow is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    shortDesc: "If Snow is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it."
  },
  leafguard: {
    inherit: true,
    onModifyDef(def, pokemon2) {
      if (this.field.isWeather(["sunnyday", "desolateland"])) {
        return this.chainModify(1.3);
      }
    },
    desc: "If Sunny Day is active, this Pokemon's Defense is multiplied by 1.3, and it cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    shortDesc: "If Sunny Day is active, this Pokemon's Def is 1.3x; cannot be statused and Rest will fail for it."
  },
  immunity: {
    inherit: true,
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Poison") {
        this.add("-immune", target, "[from] ability: Immunity");
        return null;
      }
    },
    shortDesc: "This Pokemon is immune to poison damages and Poison type moves"
  },
  stickyhold: {
    //inherit: true,
    onTakeItem(item, pokemon2, source) {
      if (!pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Sticky Hold");
        return false;
      }
    },
    onSourceModifyDamage(damage, source, target, move2) {
      if (move2.name === "Knock Off") {
        this.debug("Sticky Hold weaken");
        return this.chainModify(0.67);
      }
    },
    onTryHit(pokemon2, target, move2) {
      if (move2.name === "Poltergeist") {
        this.add("-immune", pokemon2, "[from] ability: Sticky Hold");
        return null;
      }
    },
    name: "Sticky Hold",
    rating: 2,
    num: 60
  },
  normalize: {
    inherit: true,
    desc: "This Pokemon's moves are changed to be Normal type and have their power multiplied by 1.5, and ignores type affinities. This effect comes before other effects that change a move's type.",
    shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.5x power, and ignore typing.",
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.typeChangerBoosted === this.effect)
        return this.chainModify(1.5);
    },
    onModifyMove(move2, pokemon2, target) {
      let type = move2.type;
      if (!move2.ignoreImmunity)
        move2.ignoreImmunity = {};
      if (move2.ignoreImmunity !== true) {
        move2.ignoreImmunity[type] = true;
      }
    },
    onEffectiveness(typeMod, target, type) {
      if (target.getMoveHitData(move).typeMod < 0)
        return 0;
    }
  },
  watercompaction: {
    inherit: true,
    onDamagingHit(damage, target, source, move2) {
    },
    onTryHit(target, source, move2) {
      if (target !== source && move2.type === "Water") {
        if (!this.boost({ def: 2 })) {
          this.add("-immune", target, "[from] ability: Water Compaction");
        }
        return null;
      }
    },
    shortDesc: "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move. Water immunity."
  },
  mimicry: {
    inherit: true,
    onTerrainChange(pokemon2) {
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
        case "chakraterrain":
          types = ["Fighting"];
          break;
        default:
          types = pokemon2.baseSpecies.types;
      }
      const oldTypes = pokemon2.getTypes();
      if (oldTypes.join() === types.join() || !pokemon2.setType(types))
        return;
      if (this.field.terrain || pokemon2.transformed) {
        this.add("-start", pokemon2, "typeadd", types.join("/"), "[from] ability: Mimicry");
        if (!this.field.terrain)
          this.hint("Transform Mimicry changes you to your original un-transformed types.");
      } else {
        this.add("-activate", pokemon2, "ability: Mimicry");
        this.add("-end", pokemon2, "typeadd", "[silent]");
      }
    }
  },
  disguise: {
    inherit: true,
    onUpdate(pokemon2) {
      if (["mimikyu", "mimikyutotem"].includes(pokemon2.species.id) && this.effectState.busted) {
        const speciesid = pokemon2.species.id === "mimikyutotem" ? "Mimikyu-Busted-Totem" : "Mimikyu-Busted";
        pokemon2.formeChange(speciesid, this.effect, true);
        this.damage(pokemon2.baseMaxhp / 16, pokemon2, pokemon2, this.dex.species.get(speciesid));
      }
    },
    desc: "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, it changes to Busted Form, and it loses 1/16 of its max HP. Confusion damage also breaks the disguise.",
    shortDesc: "(Mimikyu only) The first hit it takes is blocked, and it takes 1/16 HP damage instead."
  },
  toxicboost: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "psn" || effect.id === "tox") {
        return false;
      }
    },
    shortDesc: "1.5x Attack while poisoned; Immune to poison status damage."
  },
  flareboost: {
    inherit: true,
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "brn") {
        return false;
      }
    },
    shortDesc: "1.5x SpA while burned; Immune to burn damage."
  },
  zenmode: {
    inherit: true,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Darmanitan" || pokemon2.transformed) {
        return;
      }
      if (!["Zen", "Galar-Zen"].includes(pokemon2.species.forme)) {
        pokemon2.addVolatile("zenmode");
      } else if (["Zen", "Galar-Zen"].includes(pokemon2.species.forme)) {
        pokemon2.addVolatile("zenmode");
        pokemon2.removeVolatile("zenmode");
      }
    },
    shortDesc: "If Darmanitan, changes Mode to Zen."
  },
  dragonsmaw: {
    inherit: true,
    onAfterMoveSecondarySelf(pokemon2, target, move2) {
      if (move2.category !== "Status" && move2.type === "Dragon") {
        this.heal(pokemon2.lastDamage / 8, pokemon2);
      }
    },
    shortDesc: "This Pokemon gets x1.5 in its attacking stat when using an Dragon move. It also heals 1/8 of the damages dealt when using a Dragon type move."
  },
  runaway: {
    inherit: true,
    onTrapPokemonPriority: -10,
    onTrapPokemon(pokemon2) {
      pokemon2.trapped = pokemon2.maybeTrapped = false;
    },
    shortDesc: "This Pokemon can't be trapped by any mean."
  },
  illuminate: {
    inherit: true,
    onSourceModifyAccuracyPriority: 9,
    onSourceModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      this.debug("illuminate - enhancing accuracy");
      return accuracy * 1.3;
    },
    desc: "This Pokemon's Accuracy is x1.3. Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
    shortDesc: "This Pokemon's Accuracy is x1.3. This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat."
  },
  honeygather: {
    inherit: true,
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      if (pokemon2.hp && !pokemon2.item) {
        pokemon2.setItem("honey");
        this.add("-item", pokemon2, pokemon2.getItem(), "[from] ability: Honey Gather");
      }
      if (pokemon2.hasItem("honey")) {
        this.heal(pokemon2.baseMaxhp / 8);
      }
    },
    shortDesc: "At the end of each turn, if this Pokemon has no item, it gets Honey. If it has honey, it heals 1/8 of its HP."
  },
  pastelveil: {
    inherit: true,
    desc: "This Pokemon and its allies cannot be poisoned or burned. Gaining this Ability while this Pokemon or its ally is poisoned or burned cures them. If this Ability is being ignored during an effect that causes poison or burn, this Pokemon is cured immediately but its ally is not.",
    shortDesc: "This Pokemon and its allies cannot be poisoned or burned. On switch-in, cures poisoned and burned allies.",
    onStart(pokemon2) {
      for (const ally of pokemon2.allies()) {
        if (["psn", "tox", "brn"].includes(ally.status)) {
          this.add("-activate", pokemon2, "ability: Pastel Veil");
          ally.cureStatus();
        }
      }
    },
    onUpdate(pokemon2) {
      if (["psn", "tox", "brn"].includes(pokemon2.status)) {
        this.add("-activate", pokemon2, "ability: Pastel Veil");
        pokemon2.cureStatus();
      }
    },
    onAllySwitchIn(pokemon2) {
      if (["psn", "tox", "brn"].includes(pokemon2.status)) {
        this.add("-activate", this.effectState.target, "ability: Pastel Veil");
        pokemon2.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (!["psn", "tox", "brn"].includes(status.id))
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Pastel Veil");
      }
      return false;
    },
    onAllySetStatus(status, target, source, effect) {
      if (!["psn", "tox", "brn"].includes(status.id))
        return;
      if (effect?.status) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Pastel Veil", "[of] " + effectHolder);
      }
      return false;
    }
  },
  defeatist: {
    inherit: true,
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.side.totalFainted === 5) {
        return this.chainModify(0.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon2) {
      if (pokemon2.side.totalFainted === 5) {
        return this.chainModify(0.5);
      }
    },
    desc: "If this Pokemon is the last Pokemon of the team, its Attack and Special Attack are halved.",
    shortDesc: "If this Pokemon is the last Pokemon of the team, its Attack and Sp. Atk are halved."
  },
  ironfist: {
    inherit: true,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["punch"]) {
        this.debug("Iron Fist boost");
        return this.chainModify([5325, 4096]);
      }
    },
    desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
    shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted."
  },
  rkssystem: {
    inherit: true,
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move2) {
      if (!pokemon2.hasType(move2.type)) {
        return this.chainModify(1.5);
      }
    },
    shortDesc: "Non-STAB moves have 1.5x power."
  },
  galewings: {
    inherit: true,
    onModifyPriority(priority, pokemon2, target, move2) {
      if (move2 && move2.type === "Flying")
        return priority + 1;
    },
    rating: 4,
    shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1."
  },
  schooling: {
    inherit: true,
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Wishiwashi" || pokemon2.level < 20 || pokemon2.transformed)
        return;
      if (pokemon2.species.id === "wishiwashi") {
        pokemon2.formeChange("Wishiwashi-School");
      }
    },
    onResidualOrder: 27,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Wishiwashi" || pokemon2.level < 20 || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.species.id === "wishiwashi") {
        pokemon2.formeChange("Wishiwashi-School");
      }
    },
    onSourceModifyAccuracyPriority: 9,
    onSourceModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      this.debug("schooling - enhancing accuracy");
      return accuracy * 1.3;
    },
    desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above, it changes to School Form, and raises its Accuracy by 1.3. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
    shortDesc: "If user is Wishiwashi, changes to School Form, else Solo Form. Accuracy x1.3."
  },
  grasspelt: {
    inherit: true,
    onStart(pokemon2) {
      if (!this.field.setTerrain("grassyterrain") && this.field.isTerrain("grassyterrain") && pokemon2.isGrounded()) {
        this.add("-activate", pokemon2, "ability: Grass Pelt");
      }
    },
    onTerrainChange(pokemon2) {
      if (pokemon2 === this.field.weatherState.source)
        return;
      if (this.field.isTerrain("grassyterrain") && pokemon2.isGrounded()) {
        this.add("-activate", pokemon2, "ability: Grass Pelt");
      }
    },
    onModifyDefPriority: 5,
    onModifyDef(def, attacker, defender, move2) {
      if (this.field.isTerrain("grassyterrain") && attacker.isGrounded()) {
        this.debug("Grass Pelt boost");
        return this.chainModify([5461, 4096]);
      }
    },
    shortDesc: "On switch-in, summons Grassy Terrain. During Grassy Terrain, Def is 1.3333x."
  },
  flowergift: {
    inherit: true,
    onModifyAtkPriority: 3,
    onModifyAtk(atk, pokemon2) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 4,
    onModifySpD(spd, pokemon2) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 4,
    onModifyDef(def, pokemon2) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (!["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    desc: "If user is Cherrim and Sunny Day isn't active, its Def is 1.5x. If user is Cherrim and Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x. and Cherrim gains the Fire type.",
    shortDesc: "Cherrim: If Sunny Day is active, it and its allies Atk and Sp. Def are 1.5x, and Cherrim gains the Fire type; otherwise Def x1.5."
  },
  quickdraw: {
    inherit: true,
    onFractionalPriority(priority, pokemon2, target, move2) {
    },
    desc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/3 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
    shortDesc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/3 or less HP.",
    onUpdate(pokemon2) {
      const action = this.queue.willMove(pokemon2);
      if (!action)
        return;
      const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
      if (!target)
        return;
      if (action.move.target != "allAdjacentFoes" && action.move.target != "allAdjacent" && target.hp && target.hp <= target.maxhp / 2) {
        pokemon2.addVolatile("quickdraw");
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon2) {
        const action = this.queue.willMove(pokemon2);
        if (action) {
          this.add("-ability", pokemon2, "Quick Draw");
          this.add("-message", `${pokemon2.name} prepared to move immediately!`);
        }
      },
      onModifyPriority(priority) {
        return priority + 0.1;
      }
    }
  },
  icescales: {
    inherit: true,
    onSourceModifyDamage(damage, source, target, move2) {
      if (move2.category === "Special" || target.getMoveHitData(move2).typeMod > 0) {
        return this.chainModify(0.5);
      }
    },
    shortDesc: "This Pokemon receives 1/2 damage from special attacks, as well as super effective attacks.",
    desc: "This Pokemon receives 1/2 damage from special attacks, as well as super effective attacks."
  },
  strongwill: {
    onSourceModifyDamage(damage, source, target, move2) {
      if (move2.category === "Special") {
        return this.chainModify(0.5);
      }
    },
    name: "Strong Will",
    shortDesc: "This Pokemon receives 1/2 damage from special attacks.",
    desc: "This Pokemon receives 1/2 damage from special attacks.",
    rating: 4,
    num: -64
  },
  smartguard: {
    desc: "On switch-in, this Pok\xE9mon's Defense or Special Defense is raised by 1 stage based on the weaker combined attacking stat of all opposing Pok\xE9mon. Special Defense is raised if their Special Attack is higher, and Defense is raised if their Attack is the same or higher.",
    shortDesc: "On switch-in, Defense or Sp. Def is raised 1 stage based on the foes' weaker Attack.",
    onStart(pokemon2) {
      let totalatk = 0;
      let totalspa = 0;
      for (const target of pokemon2.side.foe.active) {
        if (!target || target.fainted)
          continue;
        totalatk += target.getStat("atk", false, true);
        totalspa += target.getStat("spa", false, true);
      }
      if (totalatk && totalatk >= totalspa) {
        this.boost({ def: 1 });
      } else if (totalspa) {
        this.boost({ spd: 1 });
      }
    },
    name: "Smart Guard",
    rating: 4,
    num: -65
  },
  dodge: {
    shortDesc: "When taking damages, this Pokemon adds 50% of its Speed to its corresponding defense.",
    name: "Dodge",
    onModifyDefPriority: 1,
    onModifyDef(def, pokemon2) {
      const spe = pokemon2.getStat("spe", false, true);
      const newDef = def + spe / 2;
      return newDef;
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      const spe = pokemon2.getStat("spe", false, true);
      const newSpD = spd + spe / 2;
      return newSpD;
    },
    rating: 3.5,
    num: -66
  },
  wonderskin: {
    inherit: true,
    onModifyAccuracy(accuracy, target, source, move2) {
    },
    onTryHit(target, source, move2) {
      if (move2.category === "Status" && target !== source) {
        this.add("-immune", target, "[from] ability: Wonder Skin");
        return null;
      }
    },
    shortDesc: "This Pokemon is immune to Status moves."
  },
  cutecharm: {
    inherit: true,
    onDamagingHit(damage, target, source, move2) {
    },
    onSourceModifyDamage(damage, source, target, move2) {
      return this.chainModify(0.75);
    },
    flags: { breakable: 1 },
    shortDesc: "This Pokemon receives 25% less damage from all attacks.",
    desc: "This Pokemon receives 25% less damage from all attacks."
  },
  reboundbelly: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move2) {
      if (target !== source && move2?.category === "Special" && !move2.flags["sound"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Rebound Belly",
    shortDesc: "The opponent receives 1/8 recoil damage from special non-Sound moves.",
    rating: 2.5,
    num: -67
  },
  faithfulcompanion: {
    onUpdate(pokemon2) {
      if (this.gameType !== "doubles")
        return;
      const ally = pokemon2.allies()[0];
      if (!ally || pokemon2.transformed || pokemon2.baseSpecies.baseSpecies !== "Parrotnair" || ally.baseSpecies.baseSpecies !== "Piratcy") {
        return;
      }
    },
    onAllyAfterUseItem(item, pokemon2) {
      if (pokemon2.switchFlag)
        return;
      const ally = pokemon2.allies()[0];
      if (!ally || pokemon2.transformed || pokemon2.baseSpecies.baseSpecies !== "Parrotnair" || ally.baseSpecies.baseSpecies !== "Piratcy") {
        return;
      }
      const source = this.effectState.target;
      const myItem = source.takeItem();
      if (!myItem)
        return;
      if (!this.singleEvent("TakeItem", myItem, source.itemState, pokemon2, source, this.effect, myItem) || !pokemon2.setItem(myItem)) {
        source.item = myItem.id;
        return;
      }
      this.add("-activate", source, "ability: Faithful Companion", myItem, "[of] " + pokemon2);
    },
    onAfterMoveSecondary(target, source, move2) {
      if (source && source !== target && move2?.flags["contact"]) {
        if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
          return;
        }
        const yourItem = source.takeItem(target);
        if (!yourItem) {
          return;
        }
        if (!target.setItem(yourItem)) {
          source.item = yourItem.id;
          return;
        }
        this.add("-enditem", source, yourItem, "[silent]", "[from] ability: Faithful Companion", "[of] " + source);
        this.add("-item", target, yourItem, "[from] ability: Faithful Companion", "[of] " + source);
      }
    },
    name: "Faithful Companion",
    shortDesc: "If the ally is Piratcy, gives to the ally this Pokemon's item, and steals an item from the opponent.",
    rating: 0,
    num: -68
  },
  truant: {
    inherit: true,
    onStart(pokemon2) {
    },
    onBeforeMove(pokemon2) {
    },
    shortDesc: "No competitive effect.",
    desc: "No competitive effect."
  },
  cheerleader: {
    onStart(pokemon2) {
      this.boost({ atk: 1 }, pokemon2);
    },
    shortDesc: "If the ally has Cheerleader: if Plusle, Atk, SpA and Speed x1.5; if Minun, Def, SpD and Speed x1.5.",
    desc: "If the ally has Cheerleader: if Plusle, its Atk, SpA and Speed are x1.5; if Minun, its Def, SpD and Speed are x1.5.",
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      for (const allyActive of pokemon2.allies()) {
        if (allyActive.hasAbility(["cheerleader"]) && pokemon2.baseSpecies.baseSpecies === "Plusle") {
          return this.chainModify(1.5);
        }
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(def, pokemon2) {
      for (const allyActive of pokemon2.allies()) {
        if (allyActive.hasAbility(["cheerleader"]) && pokemon2.baseSpecies.baseSpecies === "Minun") {
          return this.chainModify(1.5);
        }
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon2) {
      for (const allyActive of pokemon2.allies()) {
        if (allyActive.hasAbility(["cheerleader"]) && pokemon2.baseSpecies.baseSpecies === "Plusle") {
          return this.chainModify(1.5);
        }
      }
    },
    onModifySpDPriority: 5,
    onModifySpD(spd, pokemon2) {
      for (const allyActive of pokemon2.allies()) {
        if (allyActive.hasAbility(["cheerleader"]) && pokemon2.baseSpecies.baseSpecies === "Minun") {
          return this.chainModify(1.5);
        }
      }
    },
    onModifySpePriority: 5,
    onModifySpe(spe, pokemon2) {
      for (const allyActive of pokemon2.allies()) {
        if (allyActive.hasAbility(["cheerleader"])) {
          return this.chainModify(1.5);
        }
      }
    },
    name: "Cheerleader",
    rating: 0,
    num: -69
  },
  seedsower: {
    inherit: true,
    onDamagingHit(damage, target, source, move2) {
      if (!source.hasType("Grass")) {
        this.add("-activate", target, "ability: Seed Sower");
        source.addVolatile("leechseed", this.effectState.target);
      }
    },
    shortDesc: "When this Pokemon is hit by an attack, the effect of Leech Seed begins."
  },
  angershell: {
    inherit: true,
    onAfterMoveSecondary(target, source, move2) {
      this.effectState.checkedAngerShell = true;
      if (!source || source === target || !target.hp || !move2.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move2.multihit ? move2.totalDamage : lastAttackedBy.damage;
      if (target.hp < target.maxhp) {
        this.boost({ atk: 1, spa: 1, spe: 1, def: -1, spd: -1 }, target, target);
      }
    },
    shortDesc: "If this Pokemon is hit by an attack, its Attack, Sp. Atk, and Speed are raised by 1 stage. Its Defense and Sp. Def are lowered by 1 stage."
  },
  electromorphosis: {
    inherit: true,
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move2) {
      target.addVolatile("charge");
    },
    onSourceModifyDamage(damage, source, target, move2) {
      if (target.volatiles["charge"]) {
        return this.chainModify(0.75);
      }
    }
  },
  withering: {
    onModifyMove(move2) {
      if (!move2 || !move2.flags["contact"] || move2.target === "self")
        return;
      if (!move2.secondaries) {
        move2.secondaries = [];
      }
      move2.secondaries.push({
        chance: 100,
        boosts: {
          spe: -1
        },
        ability: this.dex.abilities.get("withering")
      });
    },
    name: "Withering",
    shortDesc: "This Pokemon's contact moves lower the target's Speed by one stage.",
    rating: 2,
    num: -70
  },
  lusterswap: {
    // taken from M4A
    desc: "On entry, this Pok\xE9mon's type changes to match its first move that's super effective against an adjacent opponent.",
    shortDesc: "On entry: type changes to match its first move that's super effective against an adjacent opponent.",
    onStart(pokemon2) {
      for (const moveSlot of pokemon2.moveSlots) {
        const move2 = this.dex.moves.get(moveSlot.move);
        if (move2.category === "Status")
          continue;
        const moveType = move2.id === "hiddenpower" ? pokemon2.hpType : move2.type;
        for (const target of pokemon2.side.foe.active) {
          if (!target || target.fainted || !target.isAdjacent(pokemon2))
            continue;
          if (this.dex.getImmunity(moveType, target) && this.dex.getEffectiveness(moveType, target) > 0) {
            this.add("-ability", pokemon2, "Luster Swap");
            if (!pokemon2.setType(moveType))
              continue;
            this.add("-message", `${pokemon2.name} changed its type to match its ${move2.name}!`);
            this.add("-start", pokemon2, "typechange", moveType);
            return;
          }
        }
      }
      this.add("-ability", pokemon2, "Luster Swap");
      this.add("-message", `${pokemon2.name} can't hit any opponent super effectively!`);
      return;
    },
    name: "Luster Swap",
    rating: 3,
    num: -71
  },
  cacophony: {
    onBasePowerPriority: 7,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["sound"]) {
        this.debug("Cacophony boost");
        return this.chainModify([5325, 4096]);
      }
    },
    onSourceModifyDamage(damage, source, target, move2) {
      if (move2.flags["sound"]) {
        this.debug("Cacophony weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    desc: "This Pokemon's sound-based moves have their power multiplied by 1.3. This Pokemon takes halved damage from sound-based moves.",
    shortDesc: "This Pokemon receives 1/2 damage from sound moves. Its own have 1.3x power.",
    name: "Cacophony",
    rating: 3.5,
    num: -72
  },
  happygolucky: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon2) {
      const newAtk = atk * (1 + Math.floor(pokemon2.happiness / 25) / 100);
      return newAtk;
    },
    onModifyDefPriority: 5,
    onModifyDef(def, pokemon2) {
      const newDef = def * (1 + Math.floor(pokemon2.happiness / 25) / 100);
      return newDef;
    },
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon2) {
      const newSpA = spa * (1 + Math.floor(pokemon2.happiness / 25) / 100);
      return newSpA;
    },
    onModifySpDPriority: 5,
    onModifySpD(spd, pokemon2) {
      const newSpD = spd * (1 + Math.floor(pokemon2.happiness / 25) / 100);
      return newSpD;
    },
    flags: {},
    name: "Happy-Go-Lucky",
    desc: "This Pokemon's Attack, Defense, Special Attack, and Special Defense get a boost depending on the happiness of the Pokemon (maximum 10%).",
    shortDesc: "Boosts Attack, Defense, Special Attack, and Special Defense by 1% per 25 happiness.",
    rating: 4,
    num: -73
  },
  mightywall: {
    onModifyDefPriority: 5,
    onModifyDef(def, pokemon2) {
      return this.chainModify(1.5);
    },
    onModifySpDPriority: 5,
    onModifySpD(spd, pokemon2) {
      return this.chainModify(1.5);
    },
    onSwitchOut(pokemon2) {
      pokemon2.addVolatile("mightywall");
    },
    condition: {
      onModifyDefPriority: 5,
      onModifyDef(def, pokemon2) {
        return this.chainModify(0.5);
      },
      onModifySpDPriority: 5,
      onModifySpD(spd, pokemon2) {
        return this.chainModify(0.5);
      }
    },
    desc: "This Pokemon's Defense and Special Defense are multiplied by 1.5, and by 0.5 when it switches out.",
    shortDesc: "This Pokemon's Defense and Special Defense are multiplied by 1.5, and by 0.5 when it switches out.",
    name: "Mighty Wall",
    rating: 4,
    num: -74
  },
  karma: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["futuremove"]) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    desc: "This Pokemon's delayed moves have their power multiplied by 1.5. Wish restores 50% more HP, rounded half down.",
    shortDesc: "This Pokemon's delayed moves have 1.5x power. Wish heals for 50% more HP.",
    name: "Karma",
    rating: 3,
    num: -75
  },
  souldevourer: {
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
    desc: "If any target is trapped, this target loses 1/8 of its max HP, and this Pokemon heals for the same amount.",
    shortDesc: "If any target is trapped, this target loses 1/8 of its max HP, and this Pokemon heals for the same amount.",
    name: "Soul Devourer",
    rating: 3,
    num: -76
  },
  tacticalescape: {
    onEmergencyExit(target) {
      if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag)
        return;
      for (const side of this.sides) {
        for (const active of side.active) {
          active.switchFlag = false;
        }
      }
      target.switchFlag = true;
      this.add("-activate", target, "ability: Tactical Escape");
    },
    onDamage(damage, target, source, effect) {
      if (effect && (effect.id === "stealthrock" || effect.id === "spikes" || effect.id === "toxicspikes" || effect.id === "stickyweb" || effect.id === "gmaxsteelsurge")) {
        return false;
      }
    },
    flags: {},
    name: "Tactical Escape",
    rating: 2,
    num: -77,
    desc: "This Pokemon is immune to hazards. When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
    shortDesc: "Immune to hazards. This Pokemon switches out when it reaches 1/2 or less of its maximum HP."
  },
  rockypayload: {
    inherit: true,
    onModifySpe(spe, pokemon2) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(1.5);
      }
    },
    shortDesc: "This Pokemon's Speed is x1.5 under Gravity, and this Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack."
  },
  lingeringaroma: {
    inherit: true,
    onDamagingHit(damage, target, source, move2) {
    },
    onAnyModifyDef(def, target, source, move2) {
      const abilityHolder = this.effectState.target;
      if (target.side === source.side)
        return;
      if (!move2.ruinedDef)
        move2.ruinedDef = abilityHolder;
      if (move2.ruinedDef !== abilityHolder)
        return;
      this.debug("Lingering Aroma Def drop");
      return this.chainModify(0.75);
    },
    onAllyModifyAtkPriority: 3,
    onAllyModifyAtk(atk, pokemon2) {
      return this.chainModify(1.25);
    },
    desc: "Opposing Pokemon have their Defense reduced by 25%, and allies have their Attack raised by 25%.",
    shortDesc: "Opposing Pokemon have their Defense reduced by 25%, and allies have their Attack raised by 25%."
  },
  soothingfragrance: {
    onAnyModifyAtk(atk, source, target, move2) {
      const abilityHolder = this.effectState.target;
      if (target.side === source.side)
        return;
      if (!move2.ruinedAtk)
        move2.ruinedAtk = abilityHolder;
      if (move2.ruinedAtk !== abilityHolder)
        return;
      this.debug("Soothing Fragrance Atk drop");
      return this.chainModify(0.75);
    },
    onAllyModifyDefPriority: 3,
    onAllyModifyDef(def, pokemon2) {
      return this.chainModify(1.25);
    },
    desc: "Opposing Pokemon have their Attack reduced by 25%, and allies have their Defense raised by 25%.",
    shortDesc: "Opposing Pokemon have their Attack reduced by 25%, and allies have their Defense raised by 25%.",
    flags: {},
    name: "Soothing Fragrance",
    rating: 2,
    num: -78
  },
  tempestuous: {
    desc: "When replacing a fainted party member, this Pok\xE9mon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
    shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
    onAfterMega(pokemon2) {
      if (!pokemon2.side.faintedLastTurn)
        return;
      this.boost({ spd: 1 }, pokemon2);
      this.add("-activate", pokemon2, "move: Charge");
      pokemon2.addVolatile("charge");
    },
    onStart(pokemon2) {
      if (!pokemon2.side.faintedThisTurn)
        return;
      this.boost({ spd: 1 }, pokemon2);
      this.add("-activate", pokemon2, "move: Charge");
      pokemon2.addVolatile("charge");
    },
    name: "Tempestuous",
    rating: 3,
    num: -79
  },
  ambush: {
    shortDesc: "This Pok\xE9mon's attacks are critical hits if the user moves before the target.",
    onModifyCritRatio(critRatio, source, target) {
      if (target.newlySwitched || this.queue.willMove(target))
        return 5;
    },
    name: "Ambush",
    rating: 4,
    num: -80
  },
  steelbreaker: {
    shortDesc: "This Pok\xE9mon's attacks are critical hits if the target is a Steel-type Pok\xE9mon.",
    onModifyCritRatio(critRatio, source, target) {
      if (target && target.hasType("Steel"))
        return 5;
    },
    name: "Steelbreaker",
    rating: 3,
    num: -81
  },
  curseoflife: {
    onTryHit(pokemon2, target, move2) {
      if (move2.ohko) {
        this.add("-immune", pokemon2, "[from] ability: Curse of Life");
        return null;
      }
    },
    onDamagePriority: -30,
    onDamage(damage, target, source, effect) {
      if (target.hp >= target.maxhp / 2 && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-ability", target, "Curse of Life");
        return target.hp - 1;
      }
    },
    flags: { breakable: 1 },
    name: "Curse of Life",
    rating: 3,
    num: -82,
    desc: "If this Pokemon is at more than half HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
    shortDesc: "If this Pokemon is at >= 50% HP, it survives one hit with at least 1 HP. Immune to OHKO."
  },
  seasonpass: {
    onPrepareHit(source, target, move2) {
      if (move2.hasBounced || move2.flags["futuremove"] || move2.sourceEffect === "snatch" || move2.callsMove)
        return;
      const allTypes = ["Ghost", "Fire", "Fairy", "Ice"];
      const type = move2.type;
      if (type && type !== "???" && source.getTypes()[0] !== type && allTypes.includes(type)) {
        if (!source.addType(type))
          return;
        this.add("-start", source, "typeadd", type, "[from] ability: Season Pass");
      }
    },
    rating: 4.5,
    flags: {},
    name: "Season Pass",
    num: -83,
    desc: "This Pokemon gets a new type when using a Ghost/Fire/Fairy/Ice type move. This effect comes after all effects that change a move's type.",
    shortDesc: "This Pokemon gets a type if using a Ghost/Fire/Fairy/Ice move."
  },
  rattled: {
    inherit: true,
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Bug" || move2.type === "Ghost" || move2.type === "Dark") {
        this.debug("Rattled weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Bug" || move2.type === "Ghost" || move2.type === "Dark") {
        this.debug("Rattled weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    desc: "Bug/Ghost/Dark resistances. This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or if an opposing Pokemon affected this Pokemon with the Intimidate Ability.",
    shortDesc: "Bug/Ghost/Dark resistances. Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or Intimidated."
  },
  bitterhatred: {
    shortDesc: "Deal 10% bonus damage for each hit taken (up to 50%)",
    onStart(pokemon2) {
      if (!pokemon2.hp)
        return;
      let attacked = pokemon2.timesAttacked;
      if (attacked > 0) {
        this.effectState.fallen = attacked > 5 ? 5 : attacked;
        this.add("-start", pokemon2, `fallen${this.effectState.fallen}`, "[silent]");
      } else {
        this.effectState.fallen = 0;
      }
    },
    onDamagingHit(damage, target, source, move2) {
      if (!target.hp || this.effectState.fallen >= 5)
        return;
      if (!move2.isMax && !move2.flags["futuremove"] && move2.id !== "struggle") {
        if (this.effectState.fallen) {
          this.add("-end", target, `fallen${this.effectState.fallen}`, "[silent]");
        }
        this.effectState.fallen++;
        this.add("-activate", target, "ability: Emperor's Clothes");
        this.add("-start", target, `fallen${this.effectState.fallen}`, "[silent]");
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move2) {
      if (this.effectState.fallen) {
        const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
        this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
        return this.chainModify([powMod[this.effectState.fallen], 4096]);
      }
    },
    flags: {},
    name: "Bitter Hatred",
    num: -84
  },
  ninjagaiden: {
    onPrepareHit(source, target, move2) {
      if (move2.hasBounced || move2.flags["futuremove"] || move2.sourceEffect === "snatch" || move2.callsMove)
        return;
      const type = move2.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.add("-start", source, "typechange", type, "[from] ability: Ninja Gaiden");
      }
    },
    flags: {},
    name: "Ninja Gaiden",
    desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
    shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
    rating: 4.5,
    num: -85
  },
  surgesurfer: {
    inherit: true,
    onModifySpe(spe) {
      if (this.field.isTerrain("electricterrain") || this.field.isTerrain("psychicterrain") || this.field.isTerrain("grassyterrain") || this.field.isTerrain("mistyterrain") || this.field.isTerrain("chakraterrain")) {
        return this.chainModify(2);
      }
    },
    shortDesc: "If any Terrain is active, this Pokemon's Speed is doubled."
  },
  pollution: {
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Water") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Water") {
        return this.chainModify(0.5);
      }
    },
    onModifyAtk(atk, attacker, defender, move2) {
      if (move2.type === "Poison") {
        return this.chainModify(2);
      }
    },
    onModifySpA(atk, attacker, defender, move2) {
      if (move2.type === "Poison") {
        return this.chainModify(2);
      }
    },
    onDamagingHit(damage, target, source, move2) {
      if (this.checkMoveMakesContact(move2, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("psn", target);
        }
      }
    },
    flags: { breakable: 1 },
    name: "Pollution",
    desc: "Poison Point. This Pokemon's offensive stat is doubled while using a Poison-type attack. If a Pokemon uses a Water-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon.",
    shortDesc: "Poison Point. This Pokemon's Poison power is 2x; Water power against it is halved.",
    rating: 4.5,
    num: -86
  },
  freegullet: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.id === "surf" || move2.id === "dive") {
        return this.chainModify(1.5);
      }
    },
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (move2.id === "surf" || move2.id === "dive") {
        source.addVolatile("stockpile");
      }
    },
    flags: { cantsuppress: 1, notransform: 1 },
    name: "Free Gullet",
    rating: 2.5,
    num: -87,
    shortDesc: "If the user uses Surf/Dive, it gains the Stockpile effect. Surf/Dive has 1.5x power."
  },
  gulp: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.id === "surf" || move2.id === "dive") {
        return this.chainModify(1.5);
      }
    },
    onAfterMove(target, source, move2) {
      if (target !== source && (move2.id === "surf" || move2.id === "dive")) {
        this.damage(source.baseMaxhp / 4, source, target);
      }
    },
    onModifyMove(move2) {
      if (move2.id === "surf" || move2.id === "dive")
        delete move2.flags["protect"];
    },
    flags: { cantsuppress: 1, notransform: 1 },
    name: "Gulp",
    rating: 2.5,
    num: -88,
    shortDesc: "If the user uses Surf/Dive, the target takes 1/4 max HP on top of the damage. Surf/Dive has 1,5x power. Surf/Dive breaks protection."
  },
  gorge: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.id === "surf" || move2.id === "dive") {
        return this.chainModify(1.5);
      }
    },
    onSourceHit(target, source, move2) {
      if (!move2 || !target)
        return;
      if (move2.id === "surf" || move2.id === "dive") {
        target.addVolatile("charge");
      }
    },
    onSourceDamagingHit(damage, target, source, move2) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (move2.id === "surf" || move2.id === "dive") {
        if (this.randomChance(2, 10)) {
          target.trySetStatus("par", source);
        }
      }
    },
    flags: { cantsuppress: 1, notransform: 1 },
    name: "Gorge",
    rating: 2.5,
    num: -89,
    shortDesc: "If the user uses Surf/Dive, user gains the Charge effect. Surf/Dive has 1,5x power. Surf/Dive has an added 20% chance of paralysis"
  },
  gulpmissile: {
    inherit: true,
    onSourceTryPrimaryHit(target, source, effect) {
      if (effect?.id === "surf" && source.hasAbility("gulpmissile") && source.species.name === "Cramorant") {
        source.formeChange("cramorantgorging", effect);
      }
    },
    desc: "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it uses Dive, or Gorging Form with a Pikachu in its mouth if it uses Surf. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Defense by 1 stage, and a Pikachu paralyzes the target. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
    shortDesc: "When hit after Dive/Surf, attacker takes 1/4 max HP and -1 Defense/paralysis."
  },
  blindeye: {
    onEffectiveness(typeMod, target, type, move2) {
      if (move2 && this.dex.getImmunity(move2, type) === false)
        return 3;
      return -typeMod;
    },
    flags: { breakable: 1 },
    name: "Blind Eye",
    desc: "This Pokemon's affinities are reversed.",
    shortDesc: "This Pokemon's affinities are reversed.",
    rating: 4.5,
    num: -90
  },
  myceliummight: {
    inherit: true,
    onFractionalPriority(priority, pokemon2, target, move2) {
      if (sleepMove.includes(move2.id)) {
        return -0.1;
      }
    },
    desc: "This Pokemon's Status moves ignore certain Abilities of other Pokemon, and Sleep inducing moves go last among Pokemon using the same or greater priority moves.",
    shortDesc: "This Pokemon's Sleep inducing moves go last in their priority bracket and status moves ignore Abilities."
  },
  counterstrike: {
    shortDesc: "This Pokemon reflects 50% of the damage it receives.",
    beforeTurnCallback(pokemon2) {
      pokemon2.addVolatile("counterstrike");
    },
    onTry(source) {
      if (!source.volatiles["counterstrike"])
        return false;
      if (source.volatiles["counterstrike"].slot === null)
        return false;
    },
    condition: {
      duration: 1,
      noCopy: true,
      onStart(target, source, move2) {
        this.effectState.slot = null;
        this.effectState.damage = 0;
      },
      onRedirectTargetPriority: -1,
      onRedirectTarget(target, source, source2, move2) {
        if (source !== this.effectState.target || !this.effectState.slot)
          return;
        return this.getAtSlot(this.effectState.slot);
      },
      onDamagingHit(damage, target, source, move2) {
        if (!source.isAlly(target)) {
          this.effectState.slot = source.getSlot();
          this.effectState.damage = damage / 2;
        }
      }
    },
    name: "Counter Strike",
    rating: 3.5,
    num: -91
  },
  magician: {
    inherit: true,
    shortDesc: "On switch-in, identifies and copies the effect of the opponent's held item.",
    onStart(pokemon2) {
      if (pokemon2.side.foe.active.some(
        (foeActive) => foeActive && pokemon2.isAdjacent(foeActive) && !foeActive.item
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
        const item = target.getItem();
        const additionalBannedItems = [
          // Zen Mode included here for compatibility with Gen 5-6
          "noability",
          "flowergift",
          "forecast",
          "hungerswitch",
          "illusion",
          "imposter",
          "neutralizinggas",
          "receiver",
          "trace",
          "zenmode",
          "protosynthesis",
          "quarkdrive"
        ];
        if (!this.singleEvent("TakeItem", item, target.itemData, target, target, item) || additionalBannedItems.includes(target.item)) {
          possibleTargets.splice(rand, 1);
          continue;
        }
        this.add("-ability", pokemon2, item, "[from] ability: Magician", "[of] " + target);
        pokemon2.setAbility(item);
        return;
      }
    },
    onAfterMoveSecondarySelf(source, target, move2) {
    }
  },
  climaticchange: {
    desc: "Upon using a Water, Fire, or Ice move, this Pokemon changes to that type and sets the corresponding weather.",
    shortDesc: "Changes type and weather when using Water/Fire/Ice moves.",
    onPrepareHit(source, target, move2) {
      if (move2.hasBounced)
        return;
      const type = move2.type;
      if (type) {
        switch (type) {
          case "Water":
            this.field.setWeather("raindance");
            if (!source.setType(type))
              return;
            this.add("-start", source, "typechange", type, "[from] ability: Climatic Change");
            break;
          case "Fire":
            this.field.setWeather("sunnyday");
            if (!source.setType(type))
              return;
            this.add("-start", source, "typechange", type, "[from] ability: Climatic Change");
            break;
          case "Ice":
            this.field.setWeather("hail");
            if (!source.setType(type))
              return;
            this.add("-start", source, "typechange", type, "[from] ability: Climatic Change");
            break;
        }
      }
    },
    name: "Climatic Change",
    rating: 4,
    num: -92
  },
  hyperglycemia: {
    desc: "At the end of each turn, every Pokemon gets 1 Stockpile. Reduces the damage taken by X*10%, with X the amount of Stockpiles this Pokemon has, and boosts this Pokemon's damage by Y*10%, Y being the amount of Stockpiles the target has.",
    shortDesc: "Every Pokemon Stockpiles at the end of each turn. Reduces damage by X*10%, and boosts damage by Y*10%.",
    onResidualOrder: 26,
    onResidualSubOrder: 1,
    onResidual(pokemon2) {
      let activated = false;
      if (pokemon2.activeTurns) {
        pokemon2.addVolatile("stockpile");
        for (const target of pokemon2.side.foe.active) {
          if (!target || !target.isAdjacent(pokemon2))
            continue;
          if (!activated) {
            this.add("-ability", pokemon2, "Hyperglycemia", "boost");
            activated = true;
          }
          if (target.volatiles["substitute"]) {
            this.add("-immune", target);
          } else {
            target.addVolatile("stockpile");
          }
        }
      }
    },
    onBasePowerPriority: 7,
    onBasePower(basePower, attacker, defender, move2) {
      var bpBoost = 1 + 0.1 * attacker.volatiles["stockpile"].layers;
      return this.chainModify(bpBoost);
    },
    onSourceModifyDamage(damage, source, target, move2) {
      var defBoost = 1 + 0.1 * target.volatiles["stockpile"].layers;
      return this.chainModify(defBoost);
    },
    flags: { breakable: 1 },
    name: "Hyperglycemia",
    rating: 4.5,
    num: -93
  },
  graviton: {
    shortDesc: "On switch-in, this Pok\xE9mon summons Gravity.",
    onStart(source) {
      this.field.addPseudoWeather("gravity");
    },
    name: "Graviton",
    rating: 4,
    num: -94
  },
  solarenergy: {
    onModifySpe(spe, pokemon2) {
      if (["sunnyday", "desolateland"].includes(pokemon2.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move2) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        if (move2.type === "Electric") {
          this.debug("Solar Energy boost");
          return this.chainModify([5325, 4096]);
        }
      }
    },
    flags: {},
    name: "Solar Energy",
    desc: "If Sunny Day is active, this Pokemon's Speed is multiplied by 1.5, and this Pokemon's Electric moves have x1.5. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    shortDesc: "If Sunny Day is active, Speed x1.5, and Electric moves x1.5.",
    rating: 3,
    num: -95
  },
  punchprodigee: {
    shortDesc: "Gives a +1 priority to punch moves.",
    onModifyPriority(priority, pokemon2, target, move2) {
      if (move2.flags["punch"])
        return priority + 1;
    },
    name: "Punch Prodigee",
    num: -96
  },
  wanderingspirit: {
    inherit: true,
    onStart(pokemon2) {
      if (pokemon2.adjacentFoes().some((foeActive) => foeActive.ability === "noability")) {
        this.effectState.gaveUp = true;
      }
      if (pokemon2.hasItem("Ability Shield")) {
        this.add("-block", pokemon2, "item: Ability Shield");
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon2) {
      if (!pokemon2.isStarted || this.effectState.gaveUp)
        return;
      const possibleTargets = pokemon2.adjacentFoes().filter(
        (target2) => !target2.getAbility().flags["notrace"] && target2.ability !== "noability"
      );
      if (!possibleTargets.length)
        return;
      const target = this.sample(possibleTargets);
      const ability = target.getAbility();
      if (pokemon2.setAbility(ability) && target.setAbility("wanderingspirit")) {
        this.add("-ability", pokemon2, ability, "[from] ability: Wandering Spirit", "[of] " + target);
      }
    },
    onDamagingHit(damage, target, source, move2) {
    },
    desc: "On switch-in, this Pokemon swaps abilities with the target.",
    shortDesc: "On switch-in, this Pokemon swaps abilities with the target."
  },
  heavyweapon: {
    shortDesc: "Gives an ally Octillery +1 priority on all its moves.",
    onUpdate(pokemon2) {
      if (this.gameType !== "doubles")
        return;
      const ally = pokemon2.allies()[0];
      if (!ally || pokemon2.transformed || pokemon2.baseSpecies.baseSpecies !== "Mantine" || ally.baseSpecies.baseSpecies !== "Octillery") {
        return;
      }
      ally.addVolatile("heavyweapon");
    },
    condition: {
      onModifyPriority(priority, pokemon2, target, move2) {
        return priority + 1;
      }
    },
    name: "Heavy Weapon",
    num: -97
  },
  triheaded: {
    shortDesc: "This Pokemon's moves have x0.5 BP, but hits 3 times.",
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon2, target, move2) {
      if (move2.multihit || move2.category === "Status")
        return;
      return this.chainModify(0.5);
    },
    onModifyMovePriority: 1,
    onModifyMove(move2) {
      if (move2.multihit || move2.category === "Status")
        return;
      move2.multihit = 3;
    },
    name: "Tri-Headed",
    num: -98
  },
  stymphaleblade: {
    desc: "Pokemon making contact with this Pokemon or getting hit from contact moves from this Pokemon lose 1/8 of their maximum HP, rounded down.",
    shortDesc: "Pokemon making contact or being targeted by contact moves from this Pokemon lose 1/8 of their max HP.",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move2) {
      if (this.checkMoveMakesContact(move2, source, target, true)) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    onAfterMove(target, source, move2) {
      if (target !== source && move2.category !== "Status" && move2.totalDamage && move2.flags["contact"]) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Stymphale Blade",
    num: -99
  },
  // Taken from Joltemons, for Magician, damn
  lifeorb: {
    onModifyDamage(damage, source, target, move2) {
      return this.chainModify(1.3);
    },
    onAfterMoveSecondarySelf(source, target, move2) {
      if (source && source !== target && move2 && move2.category !== "Status") {
        this.add("-ability", source, "Life Orb");
        this.damage(source.baseMaxhp / 10, source, source);
      }
    },
    name: "Life Orb"
  },
  assaultvest: {
    onModifySpDPriority: 1,
    onModifySpD(spd) {
      return this.chainModify(1.5);
    },
    onDisableMove(pokemon2) {
      for (const moveSlot of pokemon2.moveSlots) {
        if (this.dex.moves.get(moveSlot.move).category === "Status") {
          pokemon2.disableMove(moveSlot.id);
        }
      }
    },
    name: "Assault Vest"
  },
  choiceband: {
    onStart(pokemon2) {
      pokemon2.abilityState.choiceLock = "";
    },
    onBeforeMove(pokemon2, target, move2) {
      if (move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      if (pokemon2.abilityState.choiceLock && pokemon2.abilityState.choiceLock !== move2.id) {
        this.addMove("move", pokemon2, move2.name);
        this.attrLastMove("[still]");
        this.debug("Disabled by Choice Band");
        this.add("-fail", pokemon2);
        return false;
      }
    },
    onModifyMove(move2, pokemon2) {
      if (pokemon2.abilityState.choiceLock || move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      pokemon2.abilityState.choiceLock = move2.id;
    },
    onModifyAtkPriority: 1,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.volatiles["dynamax"])
        return;
      this.debug("Choice Band Atk Boost");
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
    name: "Choice Band"
  },
  choicespecs: {
    name: "Choice Specs",
    shortDesc: "This Pokemon's Sp. Atk is 1.5x, but it can only select the first move it executes.",
    onStart(pokemon2) {
      pokemon2.abilityState.choiceLock = "";
    },
    onBeforeMove(pokemon2, target, move2) {
      if (move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      if (pokemon2.abilityState.choiceLock && pokemon2.abilityState.choiceLock !== move2.id) {
        this.addMove("move", pokemon2, move2.name);
        this.attrLastMove("[still]");
        this.debug("Disabled by Choice Specs");
        this.add("-fail", pokemon2);
        return false;
      }
    },
    onModifyMove(move2, pokemon2) {
      if (pokemon2.abilityState.choiceLock || move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      pokemon2.abilityState.choiceLock = move2.id;
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, pokemon2, move2) {
      if (pokemon2.volatiles["dynamax"])
        return;
      this.debug("Choice Specs Sp. Atk Boost");
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
    }
  },
  choicescarf: {
    onStart(pokemon2) {
      pokemon2.abilityState.choiceLock = "";
    },
    onBeforeMove(pokemon2, target, move2) {
      if (move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      if (pokemon2.abilityState.choiceLock && pokemon2.abilityState.choiceLock !== move2.id) {
        this.addMove("move", pokemon2, move2.name);
        this.attrLastMove("[still]");
        this.debug("Disabled by Choice Scarf");
        this.add("-fail", pokemon2);
        return false;
      }
    },
    onModifyMove(move2, pokemon2) {
      if (pokemon2.abilityState.choiceLock || move2.isZOrMaxPowered || move2.id === "struggle")
        return;
      pokemon2.abilityState.choiceLock = move2.id;
    },
    onModifySpe(spe, pokemon2) {
      if (pokemon2.volatiles["dynamax"])
        return;
      this.debug("Choice Scarf Spe Boost");
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
    name: "Choice Scarf"
  },
  eviolite: {
    onModifyDefPriority: 2,
    onModifyDef(def, pokemon2) {
      if (pokemon2.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 2,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    name: "Eviolite"
  },
  cursedbelt: {
    onAfterMoveSecondarySelf(target, source, move2) {
      if (move2.category === "Status") {
        target.addVolatile("disable");
      }
    },
    onModifyDamage(damage, source, target, move2) {
      if (source.volatiles["disable"]) {
        return this.chainModify(1.2);
      }
    },
    name: "Cursed Belt"
  },
  focussash: {
    onStart(pokemon2) {
      pokemon2.addVolatile("focussash");
    },
    condition: {
      onDamagePriority: -100,
      onDamage(damage, target, source, effect) {
        if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
          this.add("-ability", target, "Focus Sash");
          return target.hp - 1;
          target.removeVolatile("focussash");
        }
      }
    },
    name: "Focus Sash"
  },
  leftovers: {
    onResidualOrder: 5,
    onResidualSubOrder: 5,
    onResidual(pokemon2) {
      if (this.field.isTerrain("grassyterrain"))
        return;
      this.heal(pokemon2.baseMaxhp / 16);
    },
    onTerrain(pokemon2) {
      if (!this.field.isTerrain("grassyterrain"))
        return;
      this.heal(pokemon2.baseMaxhp / 16);
    },
    name: "Leftovers"
  },
  rockyhelmet: {
    onDamagingHitOrder: 2,
    onDamagingHit(damage, target, source, move2) {
      if (move2.flags["contact"]) {
        this.damage(source.baseMaxhp / 6, source, target);
      }
    },
    name: "Rocky Helmet"
  },
  /*
  	mentalherb: {
  		onStart(pokemon) {
  			pokemon.addVolatile('mentalherb');
  		},
  		condition: {
  			onAllyTryAddVolatile(status, target, source, effect) {
  				if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
  					if (effect.effectType === 'Move') {
  						const effectHolder = this.effectState.target;
  						this.add('-block', target, 'ability: Mental Herb', '[of] ' + effectHolder);
  						target.removeVolatile('mentalherb');
  					}
  					return null;
  				}
  			},
  		name: "Mental Herb",
  	},
  */
  blacksludge: {
    onResidualOrder: 5,
    onResidualSubOrder: 5,
    onResidual(pokemon2) {
      if (this.field.isTerrain("grassyterrain"))
        return;
      if (pokemon2.hasType("Poison")) {
        this.heal(pokemon2.baseMaxhp / 16);
      } else {
        this.damage(pokemon2.baseMaxhp / 8);
      }
    },
    onTerrain(pokemon2) {
      if (!this.field.isTerrain("grassyterrain"))
        return;
      if (pokemon2.hasType("Poison")) {
        this.heal(pokemon2.baseMaxhp / 16);
      } else {
        this.damage(pokemon2.baseMaxhp / 8);
      }
    },
    name: "Black Sludge"
  },
  flameorb: {
    onResidualOrder: 26,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      pokemon2.trySetStatus("brn", pokemon2);
    },
    name: "Flame Orb"
  },
  toxicorb: {
    onResidualOrder: 26,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      pokemon2.trySetStatus("tox", pokemon2);
    },
    name: "Toxic Orb"
  },
  paraorb: {
    onResidualOrder: 26,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      pokemon2.trySetStatus("par", pokemon2);
    },
    name: "Para Orb"
  },
  frozenorb: {
    onResidualOrder: 26,
    onResidualSubOrder: 2,
    onResidual(pokemon2) {
      pokemon2.trySetStatus("frz", pokemon2);
    },
    name: "Frozen Orb"
  },
  widelens: {
    onSourceModifyAccuracyPriority: 4,
    onSourceModifyAccuracy(accuracy) {
      if (typeof accuracy === "number") {
        return accuracy * 1.2;
      }
    },
    name: "Wide Lens"
  },
  zoomlens: {
    onSourceModifyAccuracyPriority: 4,
    onSourceModifyAccuracy(accuracy, target) {
      if (typeof accuracy === "number" && (!this.queue.willMove(target) || target.newlySwitched)) {
        this.debug("Zoom Lens boosting accuracy");
        return accuracy * 1.5;
      }
    },
    name: "Zoom Lens"
  },
  protector: {
    onSourceModifyDamage(damage, source, target, move2) {
      if (target.getMoveHitData(move2).typeMod > 0) {
        this.debug("Protector neutralize");
        return this.chainModify(0.75);
      }
    },
    name: "Protector"
  },
  shedshell: {
    onTrapPokemonPriority: -10,
    onTrapPokemon(pokemon2) {
      pokemon2.trapped = pokemon2.maybeTrapped = false;
    },
    name: "Shed Shell"
  },
  scopelens: {
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    name: "Scope Lens"
  },
  razorclaw: {
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    name: "Razor Claw"
  },
  abilityshield: {
    name: "Ability Shield",
    // Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
    // and in Neutralizing Gas itself within data/abilities.ts
    onSetAbility(ability, target, source, effect) {
      if (effect && effect.effectType === "Ability" && effect.name !== "Trace") {
        this.add("-ability", source, effect);
      }
      this.add("-block", target, "item: Ability Shield");
      return null;
    }
  },
  mirrorherb: {
    name: "Mirror Herb",
    onFoeAfterBoost(boost, target, source, effect) {
      if (effect?.name === "Opportunist" || effect?.name === "Mirror Herb")
        return;
      const boostPlus = {};
      let statsRaised = false;
      let i;
      for (i in boost) {
        if (boost[i] > 0) {
          boostPlus[i] = boost[i];
          statsRaised = true;
        }
      }
      if (!statsRaised)
        return;
      const pokemon2 = this.effectState.target;
      pokemon2.useItem();
      this.boost(boostPlus, pokemon2);
    }
  },
  punchingglove: {
    name: "Punching Glove",
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move2) {
      if (move2.flags["punch"]) {
        this.debug("Punching Glove boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move2) {
      if (move2.flags["punch"])
        delete move2.flags["contact"];
    }
  },
  loadeddice: {
    name: "Loaded Dice",
    // partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
    onModifyMove(move2) {
      if (move2.multiaccuracy) {
        delete move2.multiaccuracy;
      }
    }
  },
  fairyfeather: {
    name: "Fairy Feather",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fairy") {
        return this.chainModify([4915, 4096]);
      }
    }
  },
  covertcloak: {
    name: "Covert Cloak",
    onModifySecondaries(secondaries) {
      this.debug("Covert Cloak prevent secondary");
      return secondaries.filter((effect) => !!(effect.self || effect.dustproof));
    }
  },
  pixieplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fairy") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Pixie Plate"
  },
  blackbelt: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fighting") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Black Belt"
  },
  blackglasses: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Dark") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Black Glasses"
  },
  charcoal: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fire") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Charcoal"
  },
  dragonfang: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Dragon") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Dragon Fang"
  },
  hardstone: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Rock") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Hard Stone"
  },
  magnet: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Electric") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Magnet"
  },
  metalcoat: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Steel") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Metal Coat"
  },
  miracleseed: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Grass") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Miracle Seed"
  },
  mysticwater: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Mystic Water"
  },
  nevermeltice: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ice") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Never-Melt Ice"
  },
  poisonbarb: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Poison") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Poison Barb"
  },
  sharpbeak: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Flying") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Sharp Beak"
  },
  silkscarf: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Normal") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Silk Scarf"
  },
  softsand: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ground") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Soft Sand"
  },
  spelltag: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ghost") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Spell Tag"
  },
  twistedspoon: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Psychic") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Twisted Spoon"
  },
  silverpowder: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Bug") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Silver Powder"
  },
  protectivepads: {
    onModifyMove(move2) {
      delete move2.flags["contact"];
    },
    name: "Protective Pads"
  },
  safetygoggles: {
    onImmunity(type, pokemon2) {
      if (type === "sandstorm" || type === "hail" || type === "powder")
        return false;
    },
    onTryHit(pokemon2, source, move2) {
      if (move2.flags["powder"] && pokemon2 !== source && this.dex.getImmunity("powder", pokemon2)) {
        this.add("-activate", pokemon2, "ability: Safety Goggles", move2.name);
        return null;
      }
    },
    name: "Safety Goggles"
  },
  bigroot: {
    onTryHealPriority: 1,
    onTryHeal(damage, target, source, effect) {
      const heals = ["drain", "leechseed", "ingrain", "aquaring", "strengthsap"];
      if (heals.includes(effect.id)) {
        return this.chainModify([5324, 4096]);
      }
    },
    name: "Big Root"
  },
  utilityumbrella: {
    onImmunity(type, pokemon2) {
      if (type === "sandstorm" || type === "hail")
        return false;
    },
    onWeather(target, source, effect) {
      if (this.field.isWeather(["sunnyday", "desolateland", "hail", "raindance", "primordialsea", "sandstorm"])) {
        this.heal(target.baseMaxhp / 12);
      }
    },
    name: "Utility Umbrella"
  },
  soulblade: {
    onModifyDamage(damage, source, target, move2) {
      return this.chainModify([4505, 4096]);
    },
    /*
    onSourceAfterFaint(length, target, source, effect) {
    	if (effect && effect.effectType === 'Move') {
    		this.add('-activate', source, 'item: Soul Blade');
    		source.setAbility('soulbladelvl2');
    		this.add('-item', source, source.getItem(), '[from] item: Soul Blade');
    	}
    },
    */
    name: "Soul Blade"
  },
  /*
  	soulbladelvl2: {
  		onModifyDamage(damage, source, target, move) {
  				return this.chainModify([0x14CC, 0x1000]);
  		},
  		onSourceAfterFaint(length, target, source, effect) {
  			if (effect && effect.effectType === 'Move') {
  				this.add('-activate', source, 'item: Soul Blade');
  				source.setAbility('soulbladelvl3');
  				this.add('-item', source, source.getItem(), '[from] item: Soul Blade');
  			}
  		},
  		name: "Soul Blade Lvl. 2",
  	},
  	soulbladelvl3: {
  		onModifyDamage(damage, source, target, move) {
  				return this.chainModify(1.5);
  		},
  		onSourceAfterFaint(length, target, source, effect) {
  			if (effect && effect.effectType === 'Move') {
  				this.add('-activate', source, 'item: Soul Blade');
  				source.setAbility('soulbladelvl4');
  				this.add('-item', source, source.getItem(), '[from] item: Soul Blade');
  			}
  		},
  		name: "Soul Blade Lvl. 3",
  	},
  	soulbladelvl4: {
  		onModifyDamage(damage, source, target, move) {
  				return this.chainModify(1.7);
  		},
  		onSourceAfterFaint(length, target, source, effect) {
  			if (effect && effect.effectType === 'Move') {
  				this.add('-activate', source, 'item: Soul Blade');
  				source.setAbility('soulbladelvl5');
  				this.add('-item', source, source.getItem(), '[from] item: Soul Blade');
  			}
  		},
  		name: "Soul Blade Lvl. 4",
  	},
  	soulbladelvl5: {
  		onModifyDamage(damage, source, target, move) {
  				return this.chainModify(1.9);
  		},
  		onSourceAfterFaint(length, target, source, effect) {
  			if (effect && effect.effectType === 'Move') {
  				this.add('-activate', source, 'item: Soul Blade');
  				source.setAbility('ultrasoulblade');
  				this.add('-item', source, source.getItem(), '[from] item: Soul Blade');
  			}
  		},
  		name: "Soul Blade Lvl. 5",
  	},
  	ultrasoulblade: {
  		onModifyDamage(damage, source, target, move) {
  				return this.chainModify(2.1);
  		},
  		name: "Ultra Soul Blade",
  	},
  */
  fistplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fighting") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Fist Plate"
  },
  dreadplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Dark") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Dread Plate"
  },
  flameplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Fire") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Flame Plate"
  },
  dracoplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Dragon") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Draco Plate"
  },
  stoneplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Rock") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Stone Plate"
  },
  rockincense: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Rock") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Rock Incense"
  },
  zapplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Electric") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Zap Plate"
  },
  ironplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Steel") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Iron Plate"
  },
  meadowplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Grass") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Meadow Plate"
  },
  roseincense: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Grass") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Rose Incense"
  },
  splashplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Splash Plate"
  },
  seaincense: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Sea Incense"
  },
  waveincense: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Wave Incense"
  },
  icicleplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ice") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Icicle Plate"
  },
  toxicplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Poison") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Toxic Plate"
  },
  skyplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Flying") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Sky Plate"
  },
  earthplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ground") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Earth Plate"
  },
  spookyplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Ghost") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Spooky Plate"
  },
  mindplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Psychic") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Mind Plate"
  },
  oddincense: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Psychic") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Odd Incense"
  },
  insectplate: {
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move2) {
      if (move2 && move2.type === "Bug") {
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Insect Plate"
  },
  fullincense: {
    onFractionalPriority: -0.1,
    name: "Full Incense"
  },
  laggingtail: {
    onFractionalPriority: -0.1,
    name: "Lagging Tail"
  },
  muscleband: {
    onBasePowerPriority: 16,
    onBasePower(basePower, user, target, move2) {
      if (move2.category === "Physical") {
        return this.chainModify([4505, 4096]);
      }
    },
    name: "Muscle Band"
  },
  wiseglasses: {
    onBasePowerPriority: 16,
    onBasePower(basePower, user, target, move2) {
      if (move2.category === "Special") {
        return this.chainModify([4505, 4096]);
      }
    },
    name: "Wise Glasses"
  },
  focusband: {
    onDamage(damage, target, source, effect) {
      if (this.randomChance(1, 10) && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-activate", target, "ability: Focus Band");
        return target.hp - 1;
      }
    },
    name: "Focus Band"
  },
  metronome: {
    onStart(pokemon2) {
      pokemon2.addVolatile("metronome");
    },
    condition: {
      onStart(pokemon2) {
        this.effectState.lastMove = "";
        this.effectState.numConsecutive = 0;
      },
      onTryMovePriority: -2,
      onTryMove(pokemon2, target, move2) {
        if (!pokemon2.hasItem("metronome")) {
          pokemon2.removeVolatile("metronome");
          return;
        }
        if (this.effectState.lastMove === move2.id && pokemon2.moveLastTurnResult) {
          this.effectState.numConsecutive++;
        } else if (pokemon2.volatiles["twoturnmove"] && this.effectState.lastMove !== move2.id) {
          this.effectState.numConsecutive = 1;
        } else {
          this.effectState.numConsecutive = 0;
        }
        this.effectState.lastMove = move2.id;
      },
      onModifyDamage(damage, source, target, move2) {
        const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
        const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
        return this.chainModify([dmgMod[numConsecutive], 4096]);
      }
    },
    name: "Metronome"
  }
};
//# sourceMappingURL=abilities.js.map
