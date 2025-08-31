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
  runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
    pokemon.activeMoveActions++;
    let target = this.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
    let baseMove = this.dex.getActiveMove(moveOrMoveName);
    const pranksterBoosted = baseMove.pranksterBoosted;
    if (baseMove.id !== "struggle" && !zMove && !maxMove && !externalMove) {
      const changedMove = this.runEvent("OverrideAction", pokemon, target, baseMove);
      if (changedMove && changedMove !== true) {
        baseMove = this.dex.getActiveMove(changedMove);
        if (pranksterBoosted)
          baseMove.pranksterBoosted = pranksterBoosted;
        target = this.getRandomTarget(pokemon, baseMove);
      }
    }
    let move = baseMove;
    move.isExternal = externalMove;
    this.setActiveMove(move, pokemon, target);
    const willTryMove = this.runEvent("BeforeMove", pokemon, target, move);
    if (!willTryMove) {
      this.runEvent("MoveAborted", pokemon, target, move);
      this.clearActiveMove(true);
      pokemon.moveThisTurnResult = willTryMove;
      return;
    }
    if (move.beforeMoveCallback) {
      if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
        this.clearActiveMove(true);
        pokemon.moveThisTurnResult = false;
        return;
      }
    }
    pokemon.lastDamage = 0;
    let lockedMove;
    if (!externalMove) {
      lockedMove = this.runEvent("LockMove", pokemon);
      if (lockedMove === true)
        lockedMove = false;
      if (!lockedMove) {
        if (!pokemon.deductPP(baseMove, null, target) && move.id !== "struggle") {
          this.add("cant", pokemon, "nopp", move);
          const gameConsole = [
            null,
            "Game Boy",
            "Game Boy Color",
            "Game Boy Advance",
            "DS",
            "DS",
            "3DS",
            "3DS"
          ][this.gen] || "Switch";
          this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
          this.clearActiveMove(true);
          pokemon.moveThisTurnResult = false;
          return;
        }
      } else {
        sourceEffect = this.dex.conditions.get("lockedmove");
      }
      pokemon.moveUsed(move, targetLoc);
    }
    const noLock = externalMove && !pokemon.volatiles["lockedmove"];
    const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
    this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.activeMove && this.activeMove.id : null;
    if (this.activeMove)
      move = this.activeMove;
    this.singleEvent("AfterMove", move, null, pokemon, target, move);
    this.runEvent("AfterMove", pokemon, target, move);
    if (move.type === "Sea" && move.category !== "Status" && moveDidSomething && !move.isExternal) {
      const waveCrashers = [];
      for (const currentPoke of this.getAllActive()) {
        if (pokemon === currentPoke)
          continue;
        if (currentPoke.hasAbility("wavecrasher") && !currentPoke.isSemiInvulnerable()) {
          waveCrashers.push(currentPoke);
        }
      }
      waveCrashers.sort(
        (a, b) => -(b.storedStats["spe"] - a.storedStats["spe"]) || b.abilityOrder - a.abilityOrder
      );
      for (const waveCrasher of waveCrashers) {
        if (this.faintMessages())
          break;
        if (waveCrasher.fainted)
          continue;
        this.add("-activate", waveCrasher, "ability: Wave Crasher");
        const dancersTarget = target.side !== waveCrasher.side && pokemon.side === waveCrasher.side ? target : pokemon;
        this.runMove(move.id, waveCrasher, this.getTargetLoc(dancersTarget, waveCrasher), this.dex.abilities.get("wavecrasher"), void 0, true);
      }
    }
    if (noLock && pokemon.volatiles["lockedmove"])
      delete pokemon.volatiles["lockedmove"];
  },
  hitStepAccuracy(targets, pokemon, move) {
    const hitResults = [];
    for (const [i, target] of targets.entries()) {
      this.activeTarget = target;
      let accuracy = move.accuracy;
      const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
      let boosts;
      let boost;
      if (accuracy !== true) {
        if (!move.ignoreAccuracy) {
          boosts = this.runEvent("ModifyBoost", pokemon, null, null, { ...pokemon.boosts });
          boost = this.clampIntRange(boosts["accuracy"], -6, 6);
          if (boost > 0) {
            accuracy *= boostTable[boost];
          } else {
            accuracy /= boostTable[-boost];
          }
        }
        if (!move.ignoreEvasion) {
          boosts = this.runEvent("ModifyBoost", target, null, null, { ...target.boosts });
          boost = this.clampIntRange(boosts["evasion"], -6, 6);
          if (boost > 0) {
            accuracy /= boostTable[boost];
          } else if (boost < 0) {
            accuracy *= boostTable[-boost];
          }
        }
      }
      accuracy = this.runEvent("ModifyAccuracy", target, pokemon, move, accuracy);
      if (move.alwaysHit || move.id === "sunkiss" && pokemon.hasType("Summer") || // Extreme Reboot code
      move.id === "coldstare" && pokemon.hasType("Winter") || move.id === "incantation" && pokemon.hasType("Folklore") || move.id === "incantation" && pokemon.hasType("Folklore")) {
        accuracy = true;
      } else {
        accuracy = this.runEvent("Accuracy", target, pokemon, move, accuracy);
      }
      if (accuracy !== true && !this.randomChance(accuracy, 100)) {
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          if (!move.spreadHit)
            this.attrLastMove("[miss]");
          this.add("-miss", pokemon, target);
        }
        hitResults[i] = false;
        continue;
      }
      hitResults[i] = true;
    }
    return hitResults;
  },
  getDamage(pokemon, target, move, suppressMessages = false) {
    if (typeof move === "string")
      move = this.dex.getActiveMove(move);
    if (typeof move === "number") {
      const basePower2 = move;
      move = new Dex.Move({
        basePower: basePower2,
        type: "???",
        category: "Physical",
        willCrit: false
      });
      move.hit = 0;
    }
    if (!move.ignoreImmunity || move.ignoreImmunity !== true && !move.ignoreImmunity[move.type]) {
      if (!target.runImmunity(move.type, !suppressMessages)) {
        return false;
      }
    }
    if (move.ohko)
      return target.maxhp;
    if (move.damageCallback)
      return move.damageCallback.call(this, pokemon, target);
    if (move.damage === "level") {
      return pokemon.level;
    } else if (move.damage) {
      return move.damage;
    }
    const category = this.getCategory(move);
    const defensiveCategory = move.defensiveCategory || category;
    let basePower = move.basePower;
    if (move.basePowerCallback) {
      basePower = move.basePowerCallback.call(this, pokemon, target, move);
    }
    if (!basePower)
      return basePower === 0 ? void 0 : basePower;
    basePower = this.clampIntRange(basePower, 1);
    let critMult;
    let critRatio = this.runEvent("ModifyCritRatio", pokemon, target, move, move.critRatio || 0);
    if (this.gen <= 5) {
      critRatio = this.clampIntRange(critRatio, 0, 5);
      critMult = [0, 16, 8, 4, 3, 2];
    } else {
      critRatio = this.clampIntRange(critRatio, 0, 4);
      if (this.gen === 6) {
        critMult = [0, 16, 8, 2, 1];
      } else {
        critMult = [0, 24, 8, 2, 1];
      }
    }
    const moveHit = target.getMoveHitData(move);
    moveHit.crit = move.willCrit || false;
    if (move.willCrit === void 0) {
      if (critRatio) {
        moveHit.crit = this.randomChance(1, critMult[critRatio]);
      }
    }
    if (moveHit.crit) {
      moveHit.crit = this.runEvent("CriticalHit", target, null, move);
    }
    basePower = this.runEvent("BasePower", pokemon, target, move, basePower, true);
    if (!basePower)
      return 0;
    basePower = this.clampIntRange(basePower, 1);
    const level = pokemon.level;
    const attacker = pokemon;
    const defender = target;
    let attackStat = category === "Physical" ? "atk" : "spa";
    const defenseStat = defensiveCategory === "Physical" ? "def" : "spd";
    const speedStat = "spe";
    if (move.useSourceDefAsOffensive)
      attackStat = "def";
    if (move.useSourceSpDAsOffensive)
      attackStat = "spd";
    if (move.useSourceSpeedAsOffensive)
      attackStat = speedStat;
    const statTable = { atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe" };
    let attack;
    let defense;
    let atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
    let defBoosts = defender.boosts[defenseStat];
    let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
    let ignorePositiveDefensive = !!move.ignorePositiveDefensive;
    if (moveHit.crit) {
      ignoreNegativeOffensive = true;
      ignorePositiveDefensive = true;
    }
    const ignoreOffensive = !!(move.ignoreOffensive || ignoreNegativeOffensive && atkBoosts < 0);
    const ignoreDefensive = !!(move.ignoreDefensive || ignorePositiveDefensive && defBoosts > 0);
    if (ignoreOffensive) {
      this.debug("Negating (sp)atk boost/penalty.");
      atkBoosts = 0;
    }
    if (ignoreDefensive) {
      this.debug("Negating (sp)def boost/penalty.");
      defBoosts = 0;
    }
    if (move.useTargetOffensive) {
      attack = defender.calculateStat(attackStat, atkBoosts);
    } else {
      attack = attacker.calculateStat(attackStat, atkBoosts);
    }
    attackStat = category === "Physical" ? "atk" : "spa";
    defense = defender.calculateStat(defenseStat, defBoosts);
    attack = this.runEvent("Modify" + statTable[attackStat], attacker, defender, move, attack);
    defense = this.runEvent("Modify" + statTable[defenseStat], defender, attacker, move, defense);
    if (this.gen <= 4 && ["explosion", "selfdestruct"].includes(move.id) && defenseStat === "def") {
      defense = this.clampIntRange(Math.floor(defense / 2), 1);
    }
    const tr = this.trunc;
    const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);
    return this.modifyDamage(baseDamage, pokemon, target, move, suppressMessages);
  },
  pokemon: {
    getActionSpeed() {
      let speed = this.getStat("spe", false, false);
      if (this.battle.field.getPseudoWeather("rulesrewrite")) {
        speed = 1e4 - speed;
      }
      return this.battle.trunc(speed, 13);
    },
    ignoringAbility() {
      let volatileSuppress = false;
      const suppressingVolatiles = ["mindcleansing", "moonblade", "void"];
      for (const volatileStatus of suppressingVolatiles) {
        if (this.volatiles[volatileStatus])
          volatileSuppress = true;
      }
      return !!(!this.isActive || volatileSuppress && !this.getAbility().isPermanent);
    },
    ignoringItem() {
      return !!(this.battle.gen >= 5 && !this.isActive || this.hasAbility("klutz") && !this.getItem().ignoreKlutz || this.volatiles["void"] || this.battle.field.pseudoWeather["magicroom"]);
    }
  }
};
//# sourceMappingURL=scripts.js.map
