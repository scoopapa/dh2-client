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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  inherit: "gen1",
  gen: 1,
  // BattlePokemon scripts. Stadium shares gen 1 code but it fixes some problems with it.
  pokemon: {
    inherit: true,
    // Gen 1 function to apply a stat modification that is only active until the stat is recalculated or mon switched.
    // Modified stats are declared in the Pokemon object in sim/pokemon.js in about line 681.
    modifyStat(statName, modifier) {
      if (!(statName in this.storedStats))
        throw new Error("Invalid `statName` passed to `modifyStat`");
      this.modifiedStats[statName] = this.battle.clampIntRange(Math.floor(this.modifiedStats[statName] * modifier), 1);
    },
    // This is run on Stadium after boosts and status changes.
    recalculateStats() {
      let statName;
      for (statName in this.storedStats) {
        let stat = this.species.baseStats[statName];
        stat = Math.floor(
          Math.floor(
            2 * stat + this.set.ivs[statName] + Math.floor(this.set.evs[statName] / 4)
          ) * this.level / 100 + 5
        );
        this.baseStoredStats[statName] = this.storedStats[statName] = Math.floor(stat);
        this.modifiedStats[statName] = Math.floor(stat);
        if (this.status === "par")
          this.modifyStat("spe", 0.25);
        if (this.status === "brn")
          this.modifyStat("atk", 0.5);
        if (this.boosts[statName] !== 0) {
          if (this.boosts[statName] >= 0) {
            this.modifyStat(statName, [1, 1.5, 2, 2.5, 3, 3.5, 4][this.boosts[statName]]);
          } else {
            this.modifyStat(statName, [100, 66, 50, 40, 33, 28, 25][-this.boosts[statName]] / 100);
          }
        }
      }
    },
    // Stadium's fixed boosting function.
    boostBy(boost) {
      let changed = false;
      let i;
      for (i in boost) {
        let delta = boost[i];
        if (delta === void 0)
          continue;
        this.boosts[i] += delta;
        if (this.boosts[i] > 6) {
          delta -= this.boosts[i] - 6;
          this.boosts[i] = 6;
        }
        if (this.boosts[i] < -6) {
          delta -= this.boosts[i] - -6;
          this.boosts[i] = -6;
        }
        if (delta)
          changed = true;
      }
      this.recalculateStats();
      return changed;
    }
  },
  // Battle scripts.
  runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect) {
    const move = this.dex.getActiveMove(moveOrMoveName);
    const target = this.getTarget(pokemon, move, targetLoc);
    if (target?.subFainted)
      target.subFainted = null;
    this.setActiveMove(move, pokemon, target);
    if (pokemon.moveThisTurn || !this.runEvent("BeforeMove", pokemon, target, move)) {
      this.debug("" + pokemon.fullname + " move interrupted; movedThisTurn: " + pokemon.moveThisTurn);
      this.clearActiveMove(true);
      this.runEvent("AfterMoveSelf", pokemon, target, move);
      return;
    }
    if (move.beforeMoveCallback) {
      if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
        this.clearActiveMove(true);
        return;
      }
    }
    pokemon.lastDamage = 0;
    let lockedMove = this.runEvent("LockMove", pokemon);
    if (lockedMove === true)
      lockedMove = false;
    if (!lockedMove && (!pokemon.volatiles["partialtrappinglock"] || pokemon.volatiles["partialtrappinglock"].locked !== target)) {
      pokemon.deductPP(move, null, target);
      pokemon.side.lastMove = move;
      pokemon.lastMove = move;
    } else {
      sourceEffect = move;
    }
    this.useMove(move, pokemon, target, sourceEffect);
    this.singleEvent("AfterMove", move, null, pokemon, target, move);
    if (target && target.hp <= 0) {
      target.side.removeSideCondition("reflect");
      target.side.removeSideCondition("lightscreen");
    } else {
      this.runEvent("AfterMoveSelf", pokemon, target, move);
    }
    if (pokemon.volatiles["mustrecharge"])
      this.add("-mustrecharge", pokemon);
    if (move.volatileStatus === "partiallytrapped" && target && target.hp > 0) {
      target.removeVolatile("mustrecharge");
      if (pokemon.volatiles["partialtrappinglock"] && target.volatiles["partiallytrapped"]) {
        if (!pokemon.volatiles["partialtrappinglock"].locked) {
          pokemon.volatiles["partialtrappinglock"].locked = target;
        }
      }
    }
  },
  tryMoveHit(target, pokemon, move) {
    let damage = 0;
    let hitResult = this.runEvent("Invulnerability", target, pokemon, move);
    if (hitResult === false) {
      if (!move.spreadHit)
        this.attrLastMove("[miss]");
      this.add("-miss", pokemon);
      return false;
    }
    if ((!move.ignoreImmunity || move.ignoreImmunity !== true && !move.ignoreImmunity[move.type]) && !target.runImmunity(move.type, true)) {
      if (move.selfdestruct) {
        this.faint(pokemon, pokemon, move);
      }
      return false;
    }
    hitResult = this.singleEvent("TryImmunity", move, null, target, pokemon, move);
    if (hitResult === false) {
      this.add("-immune", target);
      return false;
    }
    let accuracy = move.accuracy;
    if (pokemon.volatiles["partialtrappinglock"]) {
      if (move.volatileStatus === "partiallytrapped" && target === pokemon.volatiles["partialtrappinglock"].locked) {
        accuracy = true;
      } else if (pokemon.volatiles["partialtrappinglock"].locked !== target) {
        delete pokemon.volatiles["partialtrappinglock"];
        return false;
      }
    }
    if (move.ohko) {
      if (target.speed > pokemon.speed) {
        this.add("-immune", target, "[ohko]");
        return false;
      }
    }
    const boostTable = [1 / 3, 0.36, 0.43, 0.5, 0.66, 0.75, 1, 1.33, 1.66, 2, 2.33, 2.66, 3];
    if (accuracy !== true) {
      accuracy = Math.floor(accuracy * 255 / 100);
      if (!move.ignoreAccuracy) {
        accuracy = Math.floor(accuracy * boostTable[pokemon.boosts.accuracy + 6]);
      }
      if (!move.ignoreEvasion) {
        accuracy = Math.floor(accuracy * boostTable[-target.boosts.evasion + 6]);
      }
      accuracy = Math.min(accuracy, 255);
    }
    accuracy = this.runEvent("Accuracy", target, pokemon, move, accuracy);
    if (accuracy !== true && !this.randomChance(accuracy + 1, 256)) {
      this.attrLastMove("[miss]");
      this.add("-miss", pokemon);
      damage = false;
    }
    if (damage !== false) {
      pokemon.lastDamage = 0;
      if (move.multihit) {
        let hits = move.multihit;
        if (Array.isArray(hits)) {
          if (hits[0] === 2 && hits[1] === 5) {
            hits = this.sample([2, 2, 3, 3, 4, 5]);
          } else {
            hits = this.random(hits[0], hits[1] + 1);
          }
        }
        hits = Math.floor(hits);
        let moveDamage = 0;
        let i;
        for (i = 0; i < hits && target.hp && pokemon.hp; i++) {
          move.hit = i + 1;
          moveDamage = this.moveHit(target, pokemon, move);
          if (moveDamage === false)
            break;
          damage = moveDamage || 0;
          if (i === 0)
            move.damage = damage;
          if (target.subFainted) {
            i++;
            break;
          }
        }
        move.damage = null;
        if (i === 0)
          return 1;
        this.add("-hitcount", target, i);
      } else {
        damage = this.moveHit(target, pokemon, move);
      }
    }
    if (move.category !== "Status")
      target.gotAttacked(move, damage, pokemon);
    if (move.selfdestruct) {
      this.faint(pokemon, pokemon, move);
    }
    if (damage === false) {
      delete pokemon.volatiles["partialtrappinglock"];
      return false;
    }
    if (move.ohko)
      this.add("-ohko");
    if (!move.negateSecondary) {
      this.singleEvent("AfterMoveSecondary", move, null, target, pokemon, move);
      this.runEvent("AfterMoveSecondary", target, pokemon, move);
    }
    return damage;
  },
  moveHit(target, pokemon, moveOrMoveName, moveData, isSecondary, isSelf) {
    let damage = 0;
    const move = this.dex.getActiveMove(moveOrMoveName);
    if (!isSecondary && !isSelf)
      this.setActiveMove(move, pokemon, target);
    let hitResult = true;
    if (!moveData)
      moveData = move;
    if (move.ignoreImmunity === void 0) {
      move.ignoreImmunity = move.category === "Status";
    }
    if (target) {
      hitResult = this.singleEvent("TryHit", moveData, {}, target, pokemon, move);
      const targetHadSub = !!target.volatiles["substitute"];
      if (targetHadSub && moveData.volatileStatus && moveData.volatileStatus === "partiallytrapped") {
        target.addVolatile(moveData.volatileStatus, pokemon, move);
      }
      if (!hitResult) {
        if (hitResult === false)
          this.add("-fail", target);
        return false;
      }
      if (!isSelf && !isSecondary) {
        hitResult = this.runEvent("TryHit", target, pokemon, move);
        if (!hitResult) {
          if (hitResult === false)
            this.add("-fail", target);
          if (hitResult !== 0) {
            return false;
          }
        }
        if (!this.runEvent("TryFieldHit", target, pokemon, move)) {
          return false;
        }
      } else if (isSecondary && !moveData.self) {
        hitResult = this.runEvent("TrySecondaryHit", target, pokemon, moveData);
      }
      if (hitResult === 0) {
        target = null;
      } else if (!hitResult) {
        if (hitResult === false)
          this.add("-fail", target);
        return false;
      }
    }
    if (target) {
      let didSomething = false;
      damage = this.getDamage(pokemon, target, moveData);
      if ((damage || damage === 0) && !target.fainted) {
        if (move.noFaint && damage >= target.hp) {
          damage = target.hp - 1;
        }
        damage = this.damage(damage, target, pokemon, move);
        if (!(damage || damage === 0))
          return false;
        didSomething = true;
      } else if (damage === false && typeof hitResult === "undefined") {
        this.add("-fail", target);
      }
      if (damage === false || damage === null) {
        return false;
      }
      if (moveData.boosts && !target.fainted) {
        this.boost(moveData.boosts, target, pokemon, move);
      }
      if (moveData.heal && !target.fainted) {
        const d = target.heal(Math.floor(target.maxhp * moveData.heal[0] / moveData.heal[1]));
        if (!d) {
          this.add("-fail", target);
          return false;
        }
        this.add("-heal", target, target.getHealth);
        didSomething = true;
      }
      if (moveData.status) {
        if (!target.status) {
          target.setStatus(moveData.status, pokemon, move);
          target.recalculateStats();
        } else if (!isSecondary) {
          if (target.status === moveData.status) {
            this.add("-fail", target, target.status);
          } else {
            this.add("-fail", target);
          }
        }
        didSomething = true;
      }
      if (moveData.forceStatus) {
        if (target.setStatus(moveData.forceStatus, pokemon, move)) {
          target.recalculateStats();
          didSomething = true;
        }
      }
      if (moveData.volatileStatus) {
        if (target.addVolatile(moveData.volatileStatus, pokemon, move)) {
          didSomething = true;
        }
      }
      if (moveData.sideCondition) {
        if (target.side.addSideCondition(moveData.sideCondition, pokemon, move)) {
          didSomething = true;
        }
      }
      if (moveData.pseudoWeather) {
        if (this.field.addPseudoWeather(moveData.pseudoWeather, pokemon, move)) {
          didSomething = true;
        }
      }
      hitResult = this.singleEvent("Hit", moveData, {}, target, pokemon, move);
      if (!isSelf && !isSecondary) {
        this.runEvent("Hit", target, pokemon, move);
      }
      if (!hitResult && !didSomething) {
        if (hitResult === false)
          this.add("-fail", target);
        return false;
      }
    }
    if (moveData.self) {
      this.moveHit(pokemon, pokemon, move, moveData.self, isSecondary, true);
    }
    if (pokemon.volatiles["partialtrappinglock"]) {
      pokemon.volatiles["partialtrappinglock"].damage = pokemon.lastDamage;
    }
    if (moveData.secondaries) {
      for (const secondary of moveData.secondaries) {
        if (!(secondary.status && ["par", "brn", "frz"].includes(secondary.status) && target && target.hasType(move.type))) {
          const effectChance = Math.floor((secondary.chance || 100) * 255 / 100);
          if (typeof secondary.chance === "undefined" || this.randomChance(effectChance + 1, 256)) {
            this.moveHit(target, pokemon, move, secondary, true, isSelf);
          }
        }
      }
    }
    if (move.selfSwitch && pokemon.hp) {
      pokemon.switchFlag = move.selfSwitch;
    }
    return damage;
  },
  getDamage(pokemon, target, move, suppressMessages) {
    if (typeof move === "string") {
      move = this.dex.getActiveMove(move);
    } else if (typeof move === "number") {
      move = {
        basePower: move,
        type: "???",
        category: "Physical",
        willCrit: false,
        flags: {}
      };
    }
    if (!move.ignoreImmunity || move.ignoreImmunity !== true && !move.ignoreImmunity[move.type]) {
      if (!target.runImmunity(move.type, true)) {
        return false;
      }
    }
    if (move.ohko) {
      return target.maxhp;
    }
    if (move.damageCallback) {
      return move.damageCallback.call(this, pokemon, target);
    }
    if (move.damage === "level") {
      return pokemon.level;
    }
    if (move.damage) {
      return move.damage;
    }
    if (move.volatileStatus === "partiallytrapped" && move.type === "Normal" && target.hasType("Ghost")) {
      return 0;
    }
    if (pokemon.volatiles["partialtrappinglock"] && target === pokemon.volatiles["partialtrappinglock"].locked) {
      return pokemon.volatiles["partialtrappinglock"].damage;
    }
    if (!move.category)
      move.category = "Physical";
    if (!move.defensiveCategory)
      move.defensiveCategory = move.category;
    if (!move.type)
      move.type = "???";
    const type = move.type;
    let basePower = move.basePower;
    if (move.basePowerCallback) {
      basePower = move.basePowerCallback.call(this, pokemon, target, move);
    }
    if (!basePower) {
      return basePower === 0 ? void 0 : basePower;
    }
    basePower = this.clampIntRange(basePower, 1);
    let isCrit = move.willCrit || false;
    if (!isCrit) {
      let critChance = pokemon.species.baseStats["spe"] + 76;
      critChance = critChance >> 2;
      if (pokemon.volatiles["focusenergy"]) {
        critChance = critChance << 2;
        critChance += 160;
      } else {
        critChance = critChance << 1;
      }
      if (move.critRatio === 2) {
        critChance = critChance << 2;
      } else if (move.critRatio === 1) {
        critChance = critChance >> 1;
      }
      critChance = this.clampIntRange(critChance, 1, 255);
      if (critChance > 0) {
        isCrit = this.randomChance(critChance, 256);
      }
    }
    if (isCrit && this.runEvent("CriticalHit", target, null, move)) {
      target.getMoveHitData(move).crit = true;
    }
    if (basePower) {
      basePower = this.runEvent("BasePower", pokemon, target, move, basePower);
      if (basePower && move.basePowerModifier) {
        basePower *= move.basePowerModifier;
      }
    }
    if (!basePower)
      return 0;
    basePower = this.clampIntRange(basePower, 1);
    let level = pokemon.level;
    let attacker = pokemon;
    const defender = target;
    if (move.useTargetOffensive)
      attacker = target;
    let atkType = move.category === "Physical" ? "atk" : "spa";
    const defType = move.defensiveCategory === "Physical" ? "def" : "spd";
    if (move.useSourceDefensiveAsOffensive)
      atkType = defType;
    let attack = attacker.getStat(atkType);
    let defense = defender.getStat(defType);
    if (defType === "def" && defender.volatiles["reflect"] || defType === "spd" && defender.volatiles["lightscreen"]) {
      this.debug("Screen doubling (Sp)Def");
      defense *= 2;
      defense = this.clampIntRange(defense, 1, 1998);
    }
    if (isCrit) {
      move.ignoreOffensive = true;
      move.ignoreDefensive = true;
      level *= 2;
      if (!suppressMessages)
        this.add("-crit", target);
    }
    if (move.ignoreOffensive) {
      this.debug("Negating (sp)atk boost/penalty.");
      attack = attacker.getStat(atkType, true);
    }
    if (move.ignoreDefensive) {
      this.debug("Negating (sp)def boost/penalty.");
      defense = target.getStat(defType, true);
    }
    if (attack >= 256 || defense >= 256) {
      attack = this.clampIntRange(Math.floor(attack / 4) % 256, 1);
      defense = this.clampIntRange(Math.floor(defense / 4) % 256, 1);
    }
    if (move.selfdestruct && defType === "def") {
      defense = this.clampIntRange(Math.floor(defense / 2), 1);
    }
    let damage = level * 2;
    damage = Math.floor(damage / 5);
    damage += 2;
    damage *= basePower;
    damage *= attack;
    damage = Math.floor(damage / defense);
    damage = this.clampIntRange(Math.floor(damage / 50), 1, 997);
    damage += 2;
    if (type !== "???" && pokemon.hasType(type)) {
      damage += Math.floor(damage / 2);
    }
    const totalTypeMod = this.dex.getEffectiveness(type, target);
    if (totalTypeMod > 0) {
      if (!suppressMessages)
        this.add("-supereffective", target);
      damage *= 20;
      damage = Math.floor(damage / 10);
      if (totalTypeMod >= 2) {
        damage *= 20;
        damage = Math.floor(damage / 10);
      }
    }
    if (totalTypeMod < 0) {
      if (!suppressMessages)
        this.add("-resisted", target);
      damage *= 5;
      damage = Math.floor(damage / 10);
      if (totalTypeMod <= -2) {
        damage *= 5;
        damage = Math.floor(damage / 10);
      }
    }
    if (damage === 0)
      return damage;
    if (damage > 1) {
      damage *= this.random(217, 256);
      damage = Math.floor(damage / 255);
      if (damage > target.hp && !target.volatiles["substitute"])
        damage = target.hp;
      if (target.volatiles["substitute"] && damage > target.volatiles["substitute"].hp) {
        damage = target.volatiles["substitute"].hp;
      }
    }
    return Math.floor(damage);
  }
};
//# sourceMappingURL=scripts.js.map
