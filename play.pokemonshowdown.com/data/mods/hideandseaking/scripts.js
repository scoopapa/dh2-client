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
  side: {
    inherit: true,
    constructor(name, battle, sideNum, team) {
      const sideScripts = battle.dex.data.Scripts.side;
      if (sideScripts)
        Object.assign(this, sideScripts);
      this.battle = battle;
      this.id = ["p1", "p2", "p3", "p4"][sideNum];
      this.n = sideNum;
      this.name = name;
      this.avatar = "";
      this.team = team;
      this.pokemon = [];
      for (let i = 0; i < this.team.length && i < 24; i++) {
        this.pokemon.push(new Pokemon(this.team[i], this));
        this.pokemon[i].position = i;
      }
      switch (this.battle.gameType) {
        case "doubles":
          this.active = [null, null];
          break;
        case "triples":
        case "rotation":
          this.active = [null, null, null];
          break;
        default:
          this.active = [null];
      }
      this.pokemonLeft = this.pokemon.length;
      this.faintedLastTurn = null;
      this.faintedThisTurn = null;
      this.totalFainted = 0;
      this.zMoveUsed = false;
      this.dynamaxUsed = this.battle.gen !== 9;
      this.sideConditions = {};
      this.slotConditions = [];
      for (let i = 0; i < this.active.length; i++)
        this.slotConditions[i] = {};
      this.activeRequest = null;
      this.choice = {
        cantUndo: false,
        error: ``,
        actions: [],
        forcedSwitchesLeft: 0,
        forcedPassesLeft: 0,
        switchIns: /* @__PURE__ */ new Set(),
        zMove: false,
        mega: false,
        ultra: false,
        terastallize: false,
        dynamax: false
      };
      this.lastMove = null;
    },
    canDynamaxNow() {
      if (this.battle.gen !== 9)
        return false;
      if (this.battle.gameType === "multi" && this.battle.turn % 2 !== [1, 1, 0, 0][this.n])
        return false;
      if (this.dynamaxUsed)
        return false;
      if (this.battle.ruleTable.has("bigdogclause")) {
        return this.active.some((pokemon) => pokemon.m.dog);
      }
      return true;
    }
  },
  pokemon: {
    inherit: true,
    getDynamaxRequest(skipChecks) {
      if (!skipChecks) {
        const speciesid = this.species.id;
        if (!this.side.canDynamaxNow())
          return;
        if (this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo) {
          return;
        }
        if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax)
          return;
      }
      const result = { maxMoves: [] };
      let atLeastOne = false;
      for (const moveSlot of this.moveSlots) {
        const move = this.battle.dex.moves.get(moveSlot.id);
        const maxMove = this.battle.actions.getMaxMove(move, this);
        if (maxMove) {
          if (this.maxMoveDisabled(move)) {
            result.maxMoves.push({ move: maxMove.id, target: maxMove.target, disabled: true });
          } else {
            result.maxMoves.push({ move: maxMove.id, target: maxMove.target });
            atLeastOne = true;
          }
        }
      }
      if (!atLeastOne)
        return;
      if (this.canGigantamax)
        result.gigantamax = this.canGigantamax;
      return result;
    }
  }
};
//# sourceMappingURL=scripts.js.map
