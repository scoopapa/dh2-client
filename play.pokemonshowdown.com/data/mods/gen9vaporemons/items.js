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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  bigroot: {
    name: "Big Root",
    spritenum: 29,
    fling: {
      basePower: 10
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["heal"] || move.id === "bitterblade") {
        this.debug("Big Root boost");
        return this.chainModify([5324, 4096]);
      }
    },
    onTryHealPriority: 1,
    onTryHeal(damage, target, source, effect) {
      const heals = ["leechseed", "ingrain", "aquaring", "strengthsap", "healingstones", "rekindleheal"];
      if (heals.includes(effect.id)) {
        return this.chainModify([5324, 4096]);
      }
    },
    num: 296,
    desc: "Damaging draining moves deal 30% more damage, status draining moves heal 30% more.",
    gen: 4,
    rating: 3
  },
  terashard: {
    name: "Tera Shard",
    spritenum: 658,
    onTakeItem: false,
    onStart(pokemon2) {
      const type = pokemon2.teraType;
      this.add("-item", pokemon2, "Tera Shard");
      this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
      if (type && type !== "???") {
        if (!pokemon2.setType(type))
          return;
        this.add("-start", pokemon2, "typechange", type, "[from] item: Tera Shard");
      }
      this.add("-message", `${pokemon2.name}'s Tera Shard changed its type!`);
    },
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      if (move.id === "terablast") {
        return move.basepower = 100;
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Tera Shard");
        return null;
      }
    },
    num: -1e3,
    gen: 9,
    desc: "Holder becomes its Tera Type on switch-in.",
    rating: 3
  },
  seginstarshard: {
    name: "Segin Star Shard",
    spritenum: 646,
    fling: {
      basePower: 20,
      status: "slp"
    },
    onTakeItem(item, pokemon2, source) {
      if (source?.baseSpecies.num === 966 || pokemon2.baseSpecies.num === 966) {
        return false;
      }
      return true;
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Revavroom") {
        this.add("-item", pokemon2, "Segin Star Shard");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        this.add("-message", `${pokemon2.name}'s Segin Star Shard changed its type!`);
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.num === 966 && (move.type === "Dark" || move.type === "Steel" || move.type === "Poison")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Segin Star Shard");
        return null;
      }
    },
    forcedForme: "Revavroom-Segin",
    itemUser: ["Revavroom"],
    num: -1001,
    gen: 9,
    desc: "Revavroom: Becomes Dark-type, Ability: Intimidate, 1.2x Dark/Poison/Steel power."
  },
  schedarstarshard: {
    name: "Schedar Star Shard",
    spritenum: 632,
    fling: {
      basePower: 20,
      status: "brn"
    },
    onTakeItem(item, pokemon2, source) {
      if (source?.baseSpecies.num === 966 || pokemon2.baseSpecies.num === 966) {
        return false;
      }
      return true;
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Revavroom") {
        this.add("-item", pokemon2, "Schedar Star Shard");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        this.add("-message", `${pokemon2.name}'s Schedar Star Shard changed its type!`);
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.num === 966 && (move.type === "Fire" || move.type === "Steel" || move.type === "Poison")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Schedar Star Shard");
        return null;
      }
    },
    forcedForme: "Revavroom-Schedar",
    itemUser: ["Revavroom"],
    num: -1002,
    gen: 9,
    desc: "Revavroom: Becomes Fire-type, Ability: Speed Boost, 1.2x Fire/Poison/Steel power."
  },
  navistarshard: {
    name: "Navi Star Shard",
    spritenum: 638,
    fling: {
      basePower: 20,
      status: "psn"
    },
    onTakeItem(item, pokemon2, source) {
      if (source?.baseSpecies.num === 966 || pokemon2.baseSpecies.num === 966) {
        return false;
      }
      return true;
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Revavroom") {
        this.add("-item", pokemon2, "Navi Star Shard");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        this.add("-message", `${pokemon2.name}'s Navi Star Shard changed its type!`);
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.num === 966 && (move.type === "Steel" || move.type === "Poison")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Navi Star Shard");
        return null;
      }
    },
    forcedForme: "Revavroom-Navi",
    itemUser: ["Revavroom"],
    num: -1003,
    gen: 9,
    desc: "Revavroom: Becomes Poison-type, Ability: Toxic Debris, 1.2x Poison/Steel power."
  },
  ruchbahstarshard: {
    name: "Ruchbah Star Shard",
    spritenum: 648,
    fling: {
      basePower: 20,
      volatilestatus: "confusion"
    },
    onTakeItem(item, pokemon2, source) {
      if (source?.baseSpecies.num === 966 || pokemon2.baseSpecies.num === 966) {
        return false;
      }
      return true;
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Revavroom") {
        this.add("-item", pokemon2, "Ruchbah Star Shard");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        this.add("-message", `${pokemon2.name}'s Ruchbah Star Shard changed its type!`);
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.num === 966 && (move.type === "Fairy" || move.type === "Steel" || move.type === "Poison")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Ruchbah Star Shard");
        return null;
      }
    },
    forcedForme: "Revavroom-Ruchbah",
    itemUser: ["Revavroom"],
    num: -1004,
    gen: 9,
    desc: "Revavroom: Becomes Fairy-type, Ability: Misty Surge, 1.2x Fairy/Poison/Steel power."
  },
  caphstarshard: {
    name: "Caph Star Shard",
    spritenum: 637,
    fling: {
      basePower: 20,
      status: "par"
    },
    onTakeItem(item, pokemon2, source) {
      if (source?.baseSpecies.num === 966 || pokemon2.baseSpecies.num === 966) {
        return false;
      }
      return true;
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Revavroom") {
        this.add("-item", pokemon2, "Caph Star Shard");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        this.add("-message", `${pokemon2.name}'s Caph Star Shard changed its type!`);
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (user.baseSpecies.num === 966 && (move.type === "Fighting" || move.type === "Steel" || move.type === "Poison")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Caph Star Shard");
        return null;
      }
    },
    forcedForme: "Revavroom-Caph",
    itemUser: ["Revavroom"],
    num: -1005,
    gen: 9,
    desc: "Revavroom: Becomes Fighting-type, Ability: Stamina, 1.2x Fighting/Poison/Steel power."
  },
  tuffytuff: {
    name: "Tuffy-Tuff",
    spritenum: 692,
    fling: {
      basePower: 10
    },
    onTakeItem(item, source) {
      if (source.baseSpecies.baseSpecies === "Igglybuff" || source.baseSpecies.baseSpecies === "Jigglypuff" || source.baseSpecies.baseSpecies === "Wigglytuff")
        return false;
      return true;
    },
    onModifyDefPriority: 1,
    onModifyDef(def, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Igglybuff" || pokemon2.baseSpecies.baseSpecies === "Jigglypuff" || pokemon2.baseSpecies.baseSpecies === "Wigglytuff") {
        return this.chainModify(2);
      }
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Igglybuff" || pokemon2.baseSpecies.baseSpecies === "Jigglypuff" || pokemon2.baseSpecies.baseSpecies === "Wigglytuff") {
        return this.chainModify(2);
      }
    },
    desc: "Igglybuff line: 2x Defense & Special Defense.",
    itemUser: ["Igglybuff", "Jigglypuff", "Wigglytuff"],
    num: -1006,
    gen: 9
  },
  blunderpolicy: {
    name: "Blunder Policy",
    spritenum: 716,
    fling: {
      basePower: 80
    },
    onUpdate(pokemon2) {
      if (pokemon2.moveThisTurnResult === false) {
        this.boost({ spe: 2, accuracy: 2 });
        pokemon2.useItem();
      }
    },
    // Item activation located in scripts.js
    num: 1121,
    gen: 8,
    desc: "+2 Speed & Accuracy if the holder's move fails. Single use.",
    rating: 3
  },
  punchingglove: {
    name: "Punching Glove",
    spritenum: 0,
    // TODO
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Punching Glove boost");
        return this.chainModify([5324, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["punch"])
        delete move.flags["contact"];
    },
    desc: "Holder's punch-based attacks have 1.3x power and do not make contact.",
    num: 1884,
    gen: 9
  },
  razorclaw: {
    name: "Razor Claw",
    spritenum: 382,
    fling: {
      basePower: 80
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["slicing"]) {
        this.debug("Razor Claw boost");
        return this.chainModify([5324, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["slicing"])
        delete move.flags["contact"];
    },
    desc: "Holder's slicing-based attacks have 1.3x power and do not make contact.",
    num: 326,
    gen: 4
  },
  razorfang: {
    name: "Razor Fang",
    spritenum: 383,
    fling: {
      basePower: 30,
      volatileStatus: "flinch"
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        this.debug("Razor Fang boost");
        return this.chainModify([5324, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["bite"])
        delete move.flags["contact"];
    },
    desc: "Holder's biting-based attacks have 1.3x power and do not make contact.",
    num: 327,
    gen: 4,
    isNonstandard: null
  },
  baseballbat: {
    name: "Baseball Bat",
    spritenum: 465,
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["contact"]) {
        this.debug("Baseball Bat boost");
        return this.chainModify([4915, 4096]);
      }
    },
    /*
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
    	if (target === source || move.hasBounced || !move.flags['bullet']) {
    		return;
    	}
    	const newMove = this.dex.getActiveMove(move.id);
    	newMove.hasBounced = true;
    	newMove.pranksterBoosted = false;
    	this.actions.useMove(newMove, target, source);
    	target.useItem();
    	this.add('-message', `${target.name}'s Baseball Bat broke!`);
    	return null;
    },
    onAllyTryHitSide(target, source, move) {
    	if (target.side === source.side || move.hasBounced || !move.flags['bullet']) {
    		return;
    	}
    	const newMove = this.dex.getActiveMove(move.id);
    	newMove.hasBounced = true;
    	newMove.pranksterBoosted = false;
    	this.actions.useMove(newMove, this.effectState.target, source);
    	target.useItem();
    	this.add('-message', `${pokemon.name}'s Baseball Bat broke!`);
    	return null;
    },
    condition: {
    	duration: 1,
    },
    */
    onSourceModifyDamage(damage, source, target, move) {
      if (move.flags["bullet"]) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.useItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
          this.add("-message", `${pokemon.name} tried to hit the ball back, but its Baseball Bat broke!`);
        }
      }
    },
    desc: "Holder's contact moves have 1.2x power. If hit by a bullet move, it deals 50% damage and the item breaks.",
    num: -1007,
    gen: 9,
    rating: 3
  },
  walkietalkie: {
    name: "Walkie-Talkie",
    spritenum: 713,
    fling: {
      basePower: 20
    },
    onBeforeMovePriority: 0.5,
    onBeforeMove(attacker, defender, move) {
      if (!this.canSwitch(attacker.side) || attacker.forceSwitchFlag || attacker.switchFlag || !move.flags["sound"])
        return;
      this.effectState.move = this.dex.moves.get(move.id);
      attacker.deductPP(move.id, 1);
      if (attacker.side.addSlotCondition(attacker, "walkietalkie")) {
        for (const side of this.sides) {
          for (const active of side.active) {
            active.switchFlag = false;
          }
        }
        this.add("-activate", attacker, "item: Walkie-Talkie");
        this.add("-message", `${attacker.name} is calling in one of its allies!`);
        attacker.switchFlag = true;
        return null;
      }
    },
    slotCondition: "walkietalkie",
    condition: {
      duration: 1,
      onFaint(target) {
        target.side.removeSlotCondition(target, "walkietalkie");
      },
      onSwap(target) {
        if (!target.fainted && this.effectState.moveTarget && this.effectState.moveTarget.isActive) {
          const move = this.dex.moves.get(this.effectState.move);
          this.runMove(move, target, this.getTargetLoc(target.side.foe.active[0], target), null, false, true);
        }
        target.side.removeSlotCondition(target, "walkietalkie");
      }
    },
    desc: "(Mostly non-functional placeholder) Before using a sound move, holder switches. Switch-in uses move if it's holding a Walkei-Talkie.",
    num: -1008,
    gen: 8
  },
  airfreshener: {
    name: "Air Freshener",
    spritenum: 713,
    fling: {
      basePower: 30
    },
    onSwitchOut(pokemon2) {
      pokemon2.cureStatus();
    },
    // effect coded into the moves themselves
    desc: "Holder's wind-based attacks heal the party's status. Heals holder's status on switch-out.",
    num: -1009,
    gen: 9,
    rating: 3
  },
  dancingshoes: {
    name: "Dancing Shoes",
    spritenum: 715,
    onSwitchIn(pokemon2) {
      if (pokemon2.isActive && pokemon2.baseSpecies.name === "Meloetta") {
        pokemon2.formeChange("Meloetta-Pirouette");
        if (pokemon2.hasAbility("trace")) {
          pokemon2.setAbility("noguard", pokemon2, true);
          this.add("-activate", pokemon2, "ability: No Guard");
        }
      }
    },
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.flags["sound"]) {
        if (!this.boost({ atk: 1 })) {
          this.add("-immune", target, "[from] item: Dancing Shoes");
        }
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (target === this.effectState.target || target.side !== source.side)
        return;
      if (move.flags["sound"]) {
        this.boost({ atk: 1 }, this.effectState.target);
      }
    },
    onTakeItem(item, source) {
      if (source.baseSpecies.baseSpecies === "Meloetta")
        return false;
      return true;
    },
    itemUser: ["Meloetta"],
    num: -1010,
    gen: 9,
    desc: "If held by Meloetta: Pirouette Forme on entry, Sound & Hazard immunity, +1 Attack when hit by Sound."
  },
  charizarditeshardx: {
    name: "Charizardite Shard X",
    spritenum: 585,
    onTakeItem(item, source) {
      if (source.baseSpecies.baseSpecies === "Charizard")
        return false;
      return true;
    },
    onSwitchIn(pokemon2) {
      const targetType = pokemon2.types[1];
      if (pokemon2.baseSpecies.baseSpecies === "Charizard") {
        this.add("-item", pokemon2, "Charizardite Shard X");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        pokemon2.setType(pokemon2.getTypes(true).map((type) => type === targetType ? "Dragon" : type));
        this.add("-message", `${pokemon2.name}'s Charizardite Shard X changed its type!`);
        pokemon2.addVolatile("firedragon");
        pokemon2.setAbility("toughclaws", pokemon2, true);
        this.add("-activate", pokemon2, "ability: Tough Claws");
        this.boost({ atk: 1 });
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && user.baseSpecies.num === 6 && ["Dragon", "Fire"].includes(move.type)) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Charizardite Shard X");
        return null;
      }
    },
    itemUser: ["Charizard"],
    num: -1011,
    gen: 9,
    desc: "Charizard: Becomes Fire/Dragon-type, Ability: Tough Claws, +1 Atk, 1.2x Dragon/Fire power."
  },
  charizarditeshardy: {
    name: "Charizardite Shard Y",
    spritenum: 586,
    onTakeItem(item, source) {
      if (source.baseSpecies.baseSpecies === "Charizard")
        return false;
      return true;
    },
    onSwitchIn(pokemon2) {
      const type = pokemon2.hpType;
      if (pokemon2.baseSpecies.baseSpecies === "Charizard") {
        this.add("-item", pokemon2, "Charizardite Shard Y");
        this.add("-anim", pokemon2, "Cosmic Power", pokemon2);
        if (type && type !== "???") {
          if (!pokemon2.setType("Fire"))
            return;
          this.add("-start", pokemon2, "typechange", "Fire", "[from] item: Charizardite Shard Y");
        }
        this.add("-message", `${pokemon2.name}'s Charizardite Shard Y changed its type!`);
        pokemon2.setAbility("drought", pokemon2, true);
        this.boost({ spa: 1 });
      }
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && user.baseSpecies.num === 6 && (move.type === "Flying" || move.type === "Fire")) {
        return this.chainModify([4915, 4096]);
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "soak" || move.id === "magicpowder") {
        this.add("-immune", pokemon2, "[from] item: Charizardite Shard Y");
        return null;
      }
    },
    itemUser: ["Charizard"],
    num: -1012,
    gen: 9,
    desc: "Charizard: Becomes Fire-type, Ability: Drought, +1 SpA, 1.2x Fire/Flying power."
  },
  oddkeystone: {
    name: "Odd Keystone",
    spritenum: 390,
    onResidualOrder: 5,
    onResidualSubOrder: 5,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.name === "Spiritomb") {
        this.heal(pokemon2.baseMaxhp / 8);
      }
    },
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fairy" && defender.baseSpecies.baseSpecies === "Spiritomb") {
        this.debug("Odd Keystone weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fairy" && defender.baseSpecies.baseSpecies === "Spiritomb") {
        this.debug("Odd Keystone weaken");
        return this.chainModify(0.5);
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["healblock"] && pokemon2.baseSpecies.baseSpecies === "Spiritomb") {
        this.add("-activate", pokemon2, "item: Odd Keystone");
        pokemon2.removeVolatile("healblock");
        this.add("-end", pokemon2, "move: Heal Block", "[from] item: Odd Keystone");
      }
    },
    onHit(target, source, move) {
      if (move?.volatileStatus === "healblock" && target.baseSpecies.baseSpecies === "Spiritomb") {
        this.add("-immune", target, "healblock", "[from] item: Odd Keystone");
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "healblock" && pokemon2.baseSpecies.baseSpecies === "Spiritomb") {
        this.add("-immune", pokemon2, "[from] item: Odd Keystone");
        return null;
      }
    },
    onAllyTryAddVolatile(status, target, source, effect) {
      if (["healblock"].includes(status.id)) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "item: Odd Keystone", "[of] " + effectHolder);
        return null;
      }
    },
    onTakeItem(item, source) {
      if (source.baseSpecies.baseSpecies === "Spiritomb")
        return false;
      return true;
    },
    itemUser: ["Spiritomb"],
    num: -1029,
    gen: 8,
    desc: "If held by Spiritomb: Heal 12.5% per turn, 50% damage from Fairy attacks, immune to Heal Block."
  },
  mithrilarmor: {
    name: "Mithril Armor",
    spritenum: 744,
    fling: {
      basePower: 80
    },
    onModifyDefPriority: 2,
    onModifyDef(def, pokemon2) {
      return this.chainModify(1.2);
    },
    onCriticalHit: false,
    onSourceCriticalHit: false,
    num: -1030,
    gen: 8,
    desc: "Holder is immune to critical hits and has 1.2x Defense.",
    rating: 3
  },
  tiedyeband: {
    name: "Tie-Dye Band",
    spritenum: 297,
    fling: {
      basePower: 30
    },
    onBasePower(basePower, pokemon2, target, move) {
      if (!pokemon2.hasType(move.type)) {
        return this.chainModify(1.3);
      } else if (pokemon2.hasType(move.type)) {
        return this.chainModify(0.67);
      }
    },
    num: -1031,
    gen: 8,
    desc: "Holder's non-STAB moves deal 30% more damage, but its STAB moves deal 0.67x damage.",
    rating: 3
  },
  herosbubble: {
    name: "Hero's Bubble",
    spritenum: 390,
    fling: {
      basePower: 30
    },
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water" && attacker.baseSpecies.baseSpecies === "Palafin" && attacker.species.forme !== "Hero") {
        return this.chainModify(2);
      }
    },
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water" && attacker.baseSpecies.baseSpecies === "Palafin" && attacker.species.forme !== "Hero") {
        return this.chainModify(2);
      }
    },
    onSourceModifyAtkPriority: 5,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if ((move.type === "Dark" || move.type === "Fighting") && defender.baseSpecies.baseSpecies === "Palafin" && defender.species.forme === "Hero") {
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if ((move.type === "Dark" || move.type === "Fighting") && defender.baseSpecies.baseSpecies === "Palafin" && defender.species.forme === "Hero") {
        return this.chainModify(0.5);
      }
    },
    itemUser: ["Palafin"],
    num: -1032,
    gen: 8,
    desc: "If Palafin-Zero: 2x Water power. If Palafin-Hero: takes 50% damage from Dark and Fighting."
  },
  sandclock: {
    name: "Sand Clock",
    spritenum: 453,
    fling: {
      basePower: 30
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.hasType("Rock")) {
        return this.chainModify(1.5);
      }
    },
    num: -1033,
    gen: 8,
    desc: "If the holder is a Rock-type, its SpD is boosted 1.5x.",
    rating: 3
  },
  snowglobe: {
    name: "Snow Globe",
    spritenum: 221,
    fling: {
      basePower: 30
    },
    onModifyDefPriority: 1,
    onModifyDef(def, pokemon2) {
      if (pokemon2.hasType("Ice")) {
        return this.chainModify(1.5);
      }
    },
    num: -1034,
    gen: 8,
    desc: "If the holder is an Ice-type, its Def is boosted 1.5x.",
    rating: 3
  },
  handmirror: {
    name: "Hand Mirror",
    spritenum: 747,
    fling: {
      basePower: 30
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (target.hasType(source.getTypes())) {
        return this.chainModify(0.66);
      }
    },
    num: -1035,
    gen: 8,
    desc: "Holder takes 2/3 damage from foes that share a type.",
    rating: 3
  },
  powerherb: {
    onChargeMove(pokemon2, target, move) {
      if (pokemon2.useItem()) {
        this.debug("power herb - remove charge turn for " + move.id);
        this.attrLastMove("[still]");
        this.addMove("-anim", pokemon2, move.name, target);
        return false;
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["mustrecharge"]) {
        pokemon2.removeVolatile("mustrecharge");
        pokemon2.useItem();
      }
    },
    name: "Power Herb",
    spritenum: 358,
    fling: {
      basePower: 10
    },
    num: 271,
    gen: 4,
    desc: "Holder's two-turn moves and recharge complete in one turn (except Sky Drop). Single use.",
    rating: 3
  },
  leatherbelt: {
    name: "Leather Belt",
    spritenum: 132,
    fling: {
      basePower: 10
    },
    onModifyDamage(damage, source, target, move) {
      if (move && target.getMoveHitData(move).typeMod === 0) {
        return this.chainModify([4915, 4096]);
      }
    },
    gen: 8,
    desc: "Holder's neutral damaging moves deal 1.2x damage.",
    rating: 3
  },
  keeberry: {
    name: "Kee Berry",
    spritenum: 593,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Fairy"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.category === "Physical") {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("kee activation");
          this.add("-enditem", target, this.effect, "[weaken]");
          if (!target.getMoveHitData(move).crit) {
            return this.chainModify(0.67);
          }
        }
      }
    },
    onEat(pokemon2) {
      this.boost({ def: 1 });
    },
    num: 687,
    gen: 6,
    desc: "Raises holder's Defense by 1 stage before it is hit by a physical attack. Single use.",
    rating: 3
  },
  marangaberry: {
    name: "Maranga Berry",
    spritenum: 597,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Dark"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.category === "Special") {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("maranga activation");
          this.add("-enditem", target, this.effect, "[weaken]");
          if (!target.getMoveHitData(move).crit) {
            return this.chainModify(0.67);
          }
        }
      }
    },
    onEat(pokemon2) {
      this.boost({ spd: 1 });
    },
    num: 688,
    gen: 6,
    desc: "Raises holder's Sp. Defense by 1 stage before it is hit by a special attack. Single use.",
    rating: 3
  },
  bindingband: {
    name: "Binding Band",
    spritenum: 31,
    fling: {
      basePower: 60
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (target.volatiles["trapped"] || target.volatiles["partiallytrapped"] || target.volatiles["sandspit"]) {
        return this.chainModify(1.5);
      }
    },
    onSourceModifyAccuracyPriority: -2,
    onSourceModifyAccuracy(accuracy, target) {
      if (typeof accuracy === "number" && (target.volatiles["trapped"] || target.volatiles["partiallytrapped"] || target.volatiles["sandspit"])) {
        this.debug("Binding Band boosting accuracy");
        return this.chainModify(1.5);
      }
    },
    // other effects removed in statuses
    desc: "Against trapped targets: 1.5x move power and accuracy.",
    num: 544,
    gen: 5,
    rating: 3
  },
  slingshot: {
    name: "Slingshot",
    spritenum: 387,
    fling: {
      basePower: 60
    },
    onAfterMoveSecondary(target, source, move) {
      if (source && source !== target && source.hp && target.hp && move && (move.id === "uturn" || move.id === "voltswitch" || move.id === "flipturn" || move.id === "round" || move.id === "rollout" || move.id === "partingshot")) {
        if (!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) {
          return;
        }
        if (this.runEvent("DragOut", source, target, move)) {
          this.damage(source.baseMaxhp / 8, source, target);
          source.forceSwitchFlag = true;
        }
      }
    },
    desc: "If hit by pivoting move: attacker takes 1/8 of their max HP in damage and is forced out.",
    gen: 9,
    num: -1100,
    rating: 3
  },
  mantisclaw: {
    name: "Mantis Claw",
    spritenum: 382,
    fling: {
      basePower: 10
    },
    onModifyAtkPriority: 1,
    onModifyAtk(atk, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Kleavor") {
        return this.chainModify(1.5);
      }
    },
    onModifyDefPriority: 1,
    onModifyDef(def, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Scizor") {
        return this.chainModify(1.3);
      }
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Scizor") {
        return this.chainModify(1.3);
      }
    },
    onModifySpePriority: 1,
    onModifySpe(spe, pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies === "Scyther") {
        return this.chainModify(1.5);
      }
    },
    desc: "Scyther line: Immune to hazard damage, 1.5x Spe (Scyther), 1.3x Defenses (Scizor), 1.5x Attack (Kleavor).",
    itemUser: ["Scyther", "Scizor", "Kleavor"],
    gen: 9
  },
  clearamulet: {
    name: "Clear Amulet",
    spritenum: 747,
    fling: {
      basePower: 30
    },
    onTryBoost(boost, target, source, effect) {
      if (!source || target === source || !boost || effect.name === "Mirror Armor" || effect.name === "Clear Amulet")
        return;
      let b;
      for (b in boost) {
        if (boost[b] < 0) {
          if (target.boosts[b] === -6)
            continue;
          const negativeBoost = {};
          negativeBoost[b] = boost[b];
          delete boost[b];
          if (source.hp) {
            this.add("-item", target, "Clear Amulet");
            this.boost(negativeBoost, source, target, null, true);
          }
        }
      }
    },
    num: 1882,
    desc: "If this Pokemon's stat stages would be lowered, the attacker's are lowered instead.",
    gen: 9,
    rating: 3
  },
  quickclaw: {
    name: "Quick Claw",
    spritenum: 373,
    fling: {
      basePower: 20
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move?.priority > 0.1) {
        this.debug("Quick Claw boost");
        return this.chainModify([5324, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move?.priority > 0.1)
        delete move.flags["contact"];
    },
    desc: "Holder's priority attacks have 1.3x power and do not make contact.",
    num: 217,
    gen: 2,
    rating: 3
  },
  protectivepads: {
    name: "Protective Pads",
    spritenum: 663,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.recoil || move.hasCrashDamage) {
        this.debug("Protective Pads boost");
        return this.chainModify([5324, 4096]);
      }
    },
    // protective effect handled in Battle#checkMoveMakesContact
    num: 880,
    gen: 7,
    desc: "This Pokemon's recoil moves deal 1.3x damage and all of its moves don't make contact.",
    rating: 3
  },
  desertrose: {
    name: "Desert Rose",
    spritenum: 603,
    onTakeItem(item, source) {
      if (source.baseSpecies.num === 671)
        return false;
      return true;
    },
    onSwitchIn(pokemon2) {
      this.add("-message", `${pokemon2.name}'s flower blooms in the sandstorm!`);
      pokemon2.setAbility("sandveil", pokemon2, true);
      this.add("-activate", pokemon2, "ability: Sand Veil");
    },
    onResidualOrder: 5,
    onResidualSubOrder: 5,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.num === 671 && this.field.isWeather("sandstorm")) {
        this.heal(pokemon2.baseMaxhp / 8);
      }
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon2) {
      if (pokemon2.baseSpecies.num === 671 && this.field.isWeather("sandstorm")) {
        return this.chainModify(1.5);
      }
    },
    onUpdate(pokemon2) {
      if (pokemon2.volatiles["healblock"] && pokemon2.baseSpecies.num === 671) {
        this.add("-activate", pokemon2, "item: Desert Rose");
        pokemon2.removeVolatile("healblock");
        this.add("-end", pokemon2, "move: Heal Block", "[from] item: Desert Rose");
      }
    },
    onHit(target, source, move) {
      if (move?.volatileStatus === "healblock" && target.baseSpecies.num === 671) {
        this.add("-immune", target, "healblock", "[from] item: Desert Rose");
      }
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "healblock" && target.baseSpecies.num === 671) {
        this.add("-immune", pokemon2, "[from] item: Desert Rose");
        return null;
      }
    },
    onAllyTryAddVolatile(status, target, source, effect) {
      if (["healblock"].includes(status.id)) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "item: Desert Rose", "[of] " + effectHolder);
        return null;
      }
    },
    itemUser: ["Florges"],
    gen: 9,
    desc: "Florges: Ability becomes Sand Veil, immune to Heal Block, 12.5% recovery and 1.5x SpD in Sand."
  },
  diancitestonefragment: {
    name: "Diancite Stone Fragment",
    spritenum: 624,
    onTakeItem: false,
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.name === "Diancie") {
        this.add("-item", pokemon2, "Diancite Stone Fragment");
        pokemon2.setAbility("magicbounce", pokemon2, true);
        this.add("-activate", pokemon2, "ability: Magic Bounce");
        this.boost({ atk: 1, spa: 1, spe: 1 });
      }
    },
    itemUser: ["Diancie"],
    gen: 9,
    desc: "Diancie: Ability becomes Magic Bounce, +1 Atk/SpA/Spe."
  },
  // unchanged items
  boosterenergy: {
    name: "Booster Energy",
    spritenum: 0,
    // TODO
    onUpdate(pokemon2) {
      if (pokemon2.transformed)
        return;
      if (this.queue.peek(true)?.choice === "runSwitch")
        return;
      if (pokemon2.hasAbility("protosynthesis") && !pokemon2.volatiles["protosynthesis"] && !this.field.isWeather("sunnyday") && pokemon2.useItem()) {
        pokemon2.addVolatile("protosynthesis");
      }
      if (pokemon2.hasAbility("protosmosis") && !pokemon2.volatiles["protosmosis"] && !this.field.isWeather("raindance") && pokemon2.useItem()) {
        pokemon2.addVolatile("protosmosis");
      }
      if (pokemon2.hasAbility("protocrysalis") && !pokemon2.volatiles["protocrysalis"] && !this.field.isWeather("sandstorm") && pokemon2.useItem()) {
        pokemon2.addVolatile("protocrysalis");
      }
      if (pokemon2.hasAbility("protostasis") && !pokemon2.volatiles["protostasis"] && !this.field.isWeather("snow") && pokemon2.useItem()) {
        pokemon2.addVolatile("protostasis");
      }
      if (pokemon2.hasAbility("quarkdrive") && !pokemon2.volatiles["quarkdrive"] && !this.field.isTerrain("electricterrain") && pokemon2.useItem()) {
        pokemon2.addVolatile("quarkdrive");
      }
      if (pokemon2.hasAbility("photondrive") && !pokemon2.volatiles["photondrive"] && !this.field.isTerrain("grassyterrain") && pokemon2.useItem()) {
        pokemon2.addVolatile("photondrive");
      }
      if (pokemon2.hasAbility("neurondrive") && !pokemon2.volatiles["neurondrive"] && !this.field.isTerrain("psychicterrain") && pokemon2.useItem()) {
        pokemon2.addVolatile("neurondrive");
      }
      if (pokemon2.hasAbility("runedrive") && !pokemon2.volatiles["runedrive"] && !this.field.isTerrain("mistyterrain") && pokemon2.useItem()) {
        pokemon2.addVolatile("runedrive");
      }
    },
    onTakeItem(item, source) {
      if (source.baseSpecies.tags.includes("Paradox"))
        return false;
      return true;
    },
    num: 1880,
    desc: "Activates the Paradox Abilities. Single use.",
    gen: 9
  },
  electricseed: {
    name: "Electric Seed",
    spritenum: 664,
    fling: {
      basePower: 10
    },
    onStart(pokemon2) {
      if (!pokemon2.ignoringItem() && this.field.isTerrain("electricterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    onAnyTerrainStart() {
      const pokemon2 = this.effectState.target;
      if (this.field.isTerrain("electricterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    boosts: {
      def: 1
    },
    num: 881,
    gen: 7,
    desc: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use."
  },
  psychicseed: {
    name: "Psychic Seed",
    spritenum: 665,
    fling: {
      basePower: 10
    },
    onStart(pokemon2) {
      if (!pokemon2.ignoringItem() && this.field.isTerrain("psychicterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    onAnyTerrainStart() {
      const pokemon2 = this.effectState.target;
      if (this.field.isTerrain("psychicterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 882,
    gen: 7,
    desc: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use."
  },
  mistyseed: {
    name: "Misty Seed",
    spritenum: 666,
    fling: {
      basePower: 10
    },
    onStart(pokemon2) {
      if (!pokemon2.ignoringItem() && this.field.isTerrain("mistyterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    onAnyTerrainStart() {
      const pokemon2 = this.effectState.target;
      if (this.field.isTerrain("mistyterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 883,
    gen: 7,
    desc: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use."
  },
  grassyseed: {
    name: "Grassy Seed",
    spritenum: 667,
    fling: {
      basePower: 10
    },
    onStart(pokemon2) {
      if (!pokemon2.ignoringItem() && this.field.isTerrain("grassyterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    onAnyTerrainStart() {
      const pokemon2 = this.effectState.target;
      if (this.field.isTerrain("grassyterrain")) {
        for (const target of this.getAllActive()) {
          if (target.hasAbility("cloudnine")) {
            this.debug("Cloud Nine prevents Seed use");
            return;
          }
        }
        pokemon2.useItem();
      }
    },
    boosts: {
      def: 1
    },
    num: 884,
    gen: 7,
    desc: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use."
  }
};
//# sourceMappingURL=items.js.map
