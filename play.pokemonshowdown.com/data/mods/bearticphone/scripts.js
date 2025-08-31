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
  gen: 9,
  actions: {
    inherit: true,
    runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
      pokemon.activeMoveActions++;
      let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
      let baseMove = this.dex.getActiveMove(moveOrMoveName);
      const pranksterBoosted = baseMove.pranksterBoosted;
      if (baseMove.id !== "struggle" && !zMove && !maxMove && !externalMove) {
        const changedMove = this.battle.runEvent("OverrideAction", pokemon, target, baseMove);
        if (changedMove && changedMove !== true) {
          baseMove = this.dex.getActiveMove(changedMove);
          if (pranksterBoosted)
            baseMove.pranksterBoosted = pranksterBoosted;
          target = this.battle.getRandomTarget(pokemon, baseMove);
        }
      }
      let move = baseMove;
      if (zMove) {
        move = this.getActiveZMove(baseMove, pokemon);
      } else if (maxMove) {
        move = this.getActiveMaxMove(baseMove, pokemon);
      }
      move.isExternal = externalMove;
      this.battle.setActiveMove(move, pokemon, target);
      const willTryMove = this.battle.runEvent("BeforeMove", pokemon, target, move);
      if (!willTryMove) {
        this.battle.runEvent("MoveAborted", pokemon, target, move);
        this.battle.clearActiveMove(true);
        pokemon.moveThisTurnResult = willTryMove;
        return;
      }
      if (move.flags["cantusetwice"] && pokemon.lastMove?.id === move.id) {
        pokemon.addVolatile(move.id);
      }
      if (move.beforeMoveCallback) {
        if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
          this.battle.clearActiveMove(true);
          pokemon.moveThisTurnResult = false;
          return;
        }
      }
      pokemon.lastDamage = 0;
      let lockedMove;
      if (!externalMove) {
        lockedMove = this.battle.runEvent("LockMove", pokemon);
        if (lockedMove === true)
          lockedMove = false;
        if (!lockedMove) {
          if (!pokemon.deductPP(baseMove, null, target) && move.id !== "struggle") {
            this.battle.add("cant", pokemon, "nopp", move);
            this.battle.clearActiveMove(true);
            pokemon.moveThisTurnResult = false;
            return;
          }
        } else {
          sourceEffect = this.dex.conditions.get("lockedmove");
        }
        pokemon.moveUsed(move, targetLoc);
      }
      const noLock = externalMove && !pokemon.volatiles["lockedmove"];
      if (zMove) {
        if (pokemon.illusion) {
          this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
        }
        this.battle.add("-zpower", pokemon);
        pokemon.side.zMoveUsed = true;
      }
      const oldActiveMove = move;
      const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
      this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
      if (this.battle.activeMove)
        move = this.battle.activeMove;
      this.battle.singleEvent("AfterMove", move, null, pokemon, target, move);
      this.battle.runEvent("AfterMove", pokemon, target, move);
      if (move.flags["cantusetwice"] && pokemon.removeVolatile(move.id)) {
        this.battle.add("-hint", `Some effects can force a Pokemon to use ${move.name} again in a row.`);
      }
      if (noLock && pokemon.volatiles["lockedmove"])
        delete pokemon.volatiles["lockedmove"];
      this.battle.faintMessages();
      this.battle.checkWin();
    }
  },
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["bear"]
  }
};
//# sourceMappingURL=scripts.js.map
