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
  inherit: "gen2",
  gen: 1,
  init() {
    for (const i in this.data.Pokedex) {
      this.data.Pokedex[i].gender = "N";
      this.data.Pokedex[i].eggGroups = null;
    }
    for (const i in this.data.Moves) {
      if (!this.data.Moves[i])
        console.log(i);
      const category = this.mod().data.Moves[i].category;
      this.modData("Moves", i).category = category;
    }
  },
  // Gen 1 stores the last damage dealt by a move in the battle.
  // This is used for the move Counter.
  lastDamage: 0,
  // BattleSide scripts.
  // In gen 1, last move information is stored on the side rather than on the active Pokémon.
  // This is because there was actually no side, just Battle and active Pokémon effects.
  // Side's lastMove is used for Counter and Mirror Move.
  side: {
    lastMove: null
  },
  // BattlePokemon scripts.
  pokemon: {
    getStat(statName, unmodified) {
      if (statName === "hp")
        throw new Error("Please read `maxhp` directly");
      if (unmodified)
        return this.storedStats[statName];
      return this.modifiedStats[statName];
    },
    // Gen 1 function to apply a stat modification that is only active until the stat is recalculated or mon switched.
    modifyStat(statName, modifier) {
      if (!(statName in this.storedStats))
        throw new Error("Invalid `statName` passed to `modifyStat`");
      const modifiedStats = this.battle.clampIntRange(Math.floor(this.modifiedStats[statName] * modifier), 1, 999);
      this.modifiedStats[statName] = modifiedStats;
    },
    // In generation 1, boosting function increases the stored modified stat and checks for opponent's status.
    boostBy(boost) {
      let changed = false;
      let i;
      for (i in boost) {
        const delta = boost[i];
        if (delta === void 0)
          continue;
        if (delta > 0 && this.boosts[i] >= 6)
          continue;
        if (delta < 0 && this.boosts[i] <= -6)
          continue;
        this.boosts[i] += delta;
        if (this.boosts[i] > 6) {
          this.boosts[i] = 6;
        }
        if (this.boosts[i] < -6) {
          this.boosts[i] = -6;
        }
        changed = true;
        if (i === "evasion" || i === "accuracy")
          continue;
        let stat = this.species.baseStats[i];
        stat = Math.floor(Math.floor(2 * stat + this.set.ivs[i] + Math.floor(this.set.evs[i] / 4)) * this.level / 100 + 5);
        this.modifiedStats[i] = this.storedStats[i] = Math.floor(stat);
        if (this.boosts[i] >= 0) {
          this.modifyStat(i, [1, 1.5, 2, 2.5, 3, 3.5, 4][this.boosts[i]]);
        } else {
          this.modifyStat(i, [100, 66, 50, 40, 33, 28, 25][-this.boosts[i]] / 100);
        }
      }
      return changed;
    }
  },
  // Battle scripts.
  // runMove can be found in scripts.js. This function is the main one when running a move.
  // It deals with the beforeMove and AfterMoveSelf events.
  // This leads with partial trapping moves shennanigans after the move has been used.
  // It also deals with how PP reduction works on gen 1.
  runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect) {
    const target = this.getTarget(pokemon, moveOrMoveName, targetLoc);
    const move = this.dex.getActiveMove(moveOrMoveName);
    if (target?.subFainted)
      target.subFainted = null;
    this.setActiveMove(move, pokemon, target);
    if (pokemon.moveThisTurn || !this.runEvent("BeforeMove", pokemon, target, move)) {
      pokemon.removeVolatile("twoturnmove");
      delete pokemon.volatiles["lockedmove"];
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
    if (pokemon.volatiles["partialtrappinglock"] && target !== pokemon.volatiles["partialtrappinglock"].locked) {
      const moveSlot = pokemon.moveSlots.find((ms) => ms.id === move.id);
      if (moveSlot && moveSlot.pp < 0) {
        moveSlot.pp = 63;
        this.hint("In Gen 1, if a player is forced to use a move with 0 PP, the move will underflow to have 63 PP.");
      }
    }
    this.useMove(move, pokemon, target, sourceEffect);
    this.singleEvent("AfterMove", move, null, pokemon, target, move);
    if (target && target.hp <= 0) {
      if (pokemon.volatiles["mustrecharge"])
        pokemon.removeVolatile("mustrecharge");
      delete pokemon.volatiles["partialtrappinglock"];
      target.side.removeSideCondition("reflect");
      target.side.removeSideCondition("lightscreen");
      pokemon.removeVolatile("twoturnmove");
    } else if (pokemon.hp) {
      this.runEvent("AfterMoveSelf", pokemon, target, move);
    }
    if (pokemon.volatiles["mustrecharge"])
      this.add("-mustrecharge", pokemon);
    if (move.volatileStatus === "partiallytrapped" && target && target.hp > 0) {
      if (pokemon.volatiles["partialtrappinglock"] && target.volatiles["partiallytrapped"]) {
        const sourceVolatile = pokemon.volatiles["partialtrappinglock"];
        const targetVolatile = target.volatiles["partiallytrapped"];
        if (!sourceVolatile.locked) {
          sourceVolatile.locked = target;
        } else if (target !== pokemon && target !== sourceVolatile.locked) {
          const duration = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
          sourceVolatile.duration = duration;
          sourceVolatile.locked = target;
          targetVolatile.duration = 2;
        }
      }
    }
  },
  // useMove can be found on scripts.js
  // It is the function that actually uses the move, running ModifyMove events.
  // It uses the move and then deals with the effects after the move.
  useMove(moveOrMoveName, pokemon, target, sourceEffect) {
    if (!sourceEffect && this.effect.id)
      sourceEffect = this.effect;
    const baseMove = this.dex.moves.get(moveOrMoveName);
    let move = this.dex.getActiveMove(baseMove);
    if (target === void 0)
      target = this.getRandomTarget(pokemon, move);
    if (move.target === "self") {
      target = pokemon;
    }
    if (sourceEffect)
      move.sourceEffect = sourceEffect.id;
    this.setActiveMove(move, pokemon, target);
    this.singleEvent("ModifyMove", move, null, pokemon, target, move, move);
    if (baseMove.target !== move.target) {
      target = this.getRandomTarget(pokemon, move);
    }
    move = this.runEvent("ModifyMove", pokemon, target, move, move);
    if (baseMove.target !== move.target) {
      target = this.getRandomTarget(pokemon, move);
      this.debug("not a gen 1 mechanic");
    }
    if (!move)
      return false;
    let attrs = "";
    if (pokemon.fainted) {
      pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      return false;
    }
    if (sourceEffect)
      attrs += "|[from]" + this.dex.conditions.get(sourceEffect);
    this.addMove("move", pokemon, move.name, target + attrs);
    if (!this.singleEvent("Try", move, null, pokemon, target, move)) {
      return true;
    }
    if (!this.singleEvent("TryMove", move, null, pokemon, target, move) || !this.runEvent("TryMove", pokemon, target, move)) {
      return true;
    }
    if (move.ignoreImmunity === void 0) {
      move.ignoreImmunity = move.category === "Status";
    }
    let damage = false;
    if (!target || target.fainted) {
      this.attrLastMove("[notarget]");
      this.add("-notarget");
      return true;
    }
    damage = this.tryMoveHit(target, pokemon, move);
    const neverDamageMoves = [
      "conversion",
      "haze",
      "mist",
      "focusenergy",
      "confuseray",
      "supersonic",
      "transform",
      "lightscreen",
      "reflect",
      "substitute",
      "mimic",
      "leechseed",
      "splash",
      "softboiled",
      "recover",
      "rest"
    ];
    if (!damage && (move.category !== "Status" || move.status && !["psn", "tox", "par"].includes(move.status)) && !neverDamageMoves.includes(move.id)) {
      this.lastDamage = 0;
    }
    if (damage === false) {
      this.singleEvent("MoveFail", move, null, target, pokemon, move);
      return true;
    }
    if (!move.negateSecondary) {
      this.singleEvent("AfterMoveSecondarySelf", move, null, pokemon, target, move);
      this.runEvent("AfterMoveSecondarySelf", pokemon, target, move);
    }
    return true;
  },
  // tryMoveHit can be found on scripts.js
  // This function attempts a move hit and returns the attempt result before the actual hit happens.
  // It deals with partial trapping weirdness and accuracy bugs as well.
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
    if (move.volatileStatus === "partiallytrapped" && target === pokemon.volatiles["partialtrappinglock"]?.locked) {
      accuracy = true;
    }
    if (move.status === "slp" && target && target.volatiles["mustrecharge"]) {
      accuracy = true;
    }
    if (move.ohko) {
      if (target.speed > pokemon.speed) {
        this.add("-immune", target, "[ohko]");
        return false;
      }
    }
    const boostTable = [25, 28, 33, 40, 50, 66, 100, 150, 200, 250, 300, 350, 400];
    if (accuracy !== true) {
      accuracy = Math.floor(accuracy * 255 / 100);
      if (!move.ignoreAccuracy) {
        accuracy = Math.floor(accuracy * (boostTable[pokemon.boosts.accuracy + 6] / 100));
      }
      if (!move.ignoreEvasion) {
        accuracy = Math.floor(accuracy * (boostTable[-target.boosts.evasion + 6] / 100));
      }
      accuracy = Math.min(accuracy, 255);
    }
    accuracy = this.runEvent("Accuracy", target, pokemon, move, accuracy);
    if (move.target === "self" && accuracy !== true)
      accuracy++;
    if (accuracy !== true && !this.randomChance(accuracy, 256)) {
      this.attrLastMove("[miss]");
      this.add("-miss", pokemon);
      if (accuracy === 255)
        this.hint("In Gen 1, moves with 100% accuracy can still miss 1/256 of the time.");
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
    if (move.category !== "Status") {
      target.gotAttacked(move, damage, pokemon);
    }
    if (move.selfdestruct) {
      if (!target.subFainted) {
        this.faint(pokemon, pokemon, move);
      } else {
        this.hint(`In Gen 1, the user of ${move.name} will not take damage if it breaks a Substitute.`);
      }
    }
    if (!damage && damage !== 0) {
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
  // move Hit can be found on scripts.js
  // It deals with the actual move hit, as the name indicates, dealing damage and/or effects.
  // This function also deals with the Gen 1 Substitute behaviour on the hitting process.
  moveHit(target, pokemon, move, moveData, isSecondary, isSelf) {
    let damage = 0;
    if (!isSecondary && !isSelf)
      this.setActiveMove(move, pokemon, target);
    let hitResult = true;
    if (!moveData)
      moveData = move;
    if (move.ignoreImmunity === void 0) {
      move.ignoreImmunity = move.category === "Status";
    }
    const targetSub = target ? target.volatiles["substitute"] : false;
    const targetHadSub = targetSub !== null && targetSub !== false && typeof targetSub !== "undefined";
    if (target) {
      hitResult = this.singleEvent("TryHit", moveData, {}, target, pokemon, move);
      if (targetSub && moveData.volatileStatus && moveData.volatileStatus === "partiallytrapped") {
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
      if (moveData.boosts && target.hp) {
        if (!this.boost(moveData.boosts, target, pokemon, move)) {
          this.add("-fail", target);
          return false;
        }
        didSomething = true;
        if (pokemon.side.foe.active[0] && pokemon.side.foe.active[0].status) {
          if (pokemon.side.foe.active[0].status === "par") {
            pokemon.side.foe.active[0].modifyStat("spe", 0.25);
          }
          if (pokemon.side.foe.active[0].status === "brn") {
            pokemon.side.foe.active[0].modifyStat("atk", 0.5);
          }
        }
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
        if (moveData.status === "slp" && target.volatiles["mustrecharge"]) {
          if (target.setStatus(moveData.status, pokemon, move)) {
            target.removeVolatile("mustrecharge");
            this.hint(
              "In Gen 1, if a Pok\xE9mon that has just used Hyper Beam and has yet to recharge is targeted with a sleep inducing move, any other status it may already have will be ignored and sleep will be induced regardless."
            );
          }
        } else if (!target.status) {
          if (target.setStatus(moveData.status, pokemon, move)) {
            if (moveData.status === "brn")
              target.modifyStat("atk", 0.5);
            if (moveData.status === "par")
              target.modifyStat("spe", 0.25);
          }
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
          if (moveData.forceStatus === "brn")
            target.modifyStat("atk", 0.5);
          if (moveData.forceStatus === "par")
            target.modifyStat("spe", 0.25);
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
    const targetHasSub = !!target?.volatiles["substitute"];
    const doSelf = targetHadSub && targetHasSub || !targetHadSub;
    if (moveData.self && (doSelf || moveData.self !== true && moveData.self.volatileStatus === "partialtrappinglock")) {
      this.moveHit(pokemon, pokemon, move, moveData.self, isSecondary, true);
    }
    if (pokemon.volatiles["partialtrappinglock"]) {
      pokemon.volatiles["partialtrappinglock"].damage = pokemon.lastDamage;
    }
    if (moveData.secondaries) {
      for (const secondary of moveData.secondaries) {
        if (!(secondary.status && ["par", "brn", "frz"].includes(secondary.status) && target && target.hasType(move.type))) {
          if (secondary.chance === void 0 || this.randomChance(Math.ceil(secondary.chance * 256 / 100), 256)) {
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
  // boost can be found on sim/battle.js on Battle object.
  // It deals with Pokémon stat boosting, including Gen 1 buggy behaviour with burn and paralyse.
  boost(boost, target, source = null, effect = null) {
    if (this.event) {
      if (!target)
        target = this.event.target;
      if (!source)
        source = this.event.source;
      if (!effect)
        effect = this.effect;
    }
    if (typeof effect === "string")
      effect = this.dex.conditions.get(effect);
    if (!target || !target.hp)
      return 0;
    let success = null;
    boost = this.runEvent("Boost", target, source, effect, { ...boost });
    let i;
    for (i in boost) {
      const currentBoost = {};
      currentBoost[i] = boost[i];
      if (boost[i] !== 0 && target.boostBy(currentBoost)) {
        success = true;
        let msg = "-boost";
        if (boost[i] < 0) {
          msg = "-unboost";
          boost[i] = -boost[i];
          if (i === "atk" && target.status === "brn" && !target.volatiles["brnattackdrop"]) {
            target.addVolatile("brnattackdrop");
          }
          if (i === "spe" && target.status === "par" && !target.volatiles["parspeeddrop"]) {
            target.addVolatile("parspeeddrop");
          }
        } else {
          if (i === "atk" && target.status === "brn" && target.volatiles["brnattackdrop"]) {
            target.removeVolatile("brnattackdrop");
          }
          if (i === "spe" && target.status === "par" && target.volatiles["parspeeddrop"]) {
            target.removeVolatile("parspeeddrop");
          }
        }
        if (!effect || effect.effectType === "Move") {
          this.add(msg, target, i, boost[i]);
        } else {
          this.add(msg, target, i, boost[i], "[from] " + effect.fullname);
        }
        this.runEvent("AfterEachBoost", target, source, effect, currentBoost);
      }
    }
    this.runEvent("AfterBoost", target, source, effect, boost);
    return success;
  },
  // getDamage can be found on sim/battle.js on the Battle object.
  // It calculates the damage pokemon does to target with move.
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
      let critChance = Math.floor(pokemon.species.baseStats["spe"] / 2);
      if (pokemon.volatiles["focusenergy"]) {
        critChance = Math.floor(critChance / 2);
      } else {
        critChance = this.clampIntRange(critChance * 2, 1, 255);
      }
      if (move.critRatio === 1) {
        critChance = Math.floor(critChance / 2);
      } else if (move.critRatio === 2) {
        critChance = this.clampIntRange(critChance * 4, 1, 255);
      }
      if (critChance > 0) {
        isCrit = this.randomChance(critChance, 256);
      }
    }
    if (isCrit)
      target.getMoveHitData(move).crit = true;
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
    const atkType = move.category === "Physical" ? "atk" : "spa";
    const defType = move.defensiveCategory === "Physical" ? "def" : "spd";
    let attack = attacker.getStat(move.useSourceDefensiveAsOffensive ? defType : atkType);
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
    const totalTypeMod = target.runEffectiveness(move);
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
    }
    return Math.floor(damage);
  }
};
//# sourceMappingURL=scripts.js.map
