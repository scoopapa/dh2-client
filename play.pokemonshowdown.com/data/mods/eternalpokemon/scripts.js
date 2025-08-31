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
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["Banned", "WIP", "FE", "1x NFE", "2x NFE"]
  },
  init() {
    for (const id in this.dataCache.Pokedex) {
      const newMon = this.dataCache.Pokedex[id];
      if (!newMon)
        continue;
      if (id == "floette") {
        const learnset = this.dataCache.Learnsets[id].learnset;
        const latestGen = 9;
        for (const moveid in learnset) {
          this.modData("Learnsets", "floetteeternal").learnset[moveid] = learnset[moveid].filter(
            (method) => parseInt(method[0]) == latestGen && method[1] != "V"
          );
        }
        this.modData("Learnsets", "floetteeternal").learnset["lightofruin"] = ["9L50"];
      }
      if (id == "floetteeternal")
        continue;
      if (!newMon.copyData) {
        if (!this.dataCache.Learnsets[id] || !this.dataCache.Learnsets[id].learnset)
          continue;
        const learnset = this.dataCache.Learnsets[id].learnset;
        let currentGen, latestGen = 0;
        for (const moveid in learnset) {
          for (const method in learnset[moveid]) {
            if (learnset[moveid][method][1] != "V") {
              currentGen = parseInt(learnset[moveid][method][0]);
              if (currentGen > latestGen)
                latestGen = currentGen;
            }
          }
        }
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => parseInt(method[0]) == latestGen && method[1] != "V"
          );
        }
        continue;
      }
      const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
      if (!newMon.types && copyData.types)
        newMon.types = copyData.types;
      if (!newMon.baseStats && copyData.baseStats)
        newMon.baseStats = copyData.baseStats;
      if (!newMon.abilities && copyData.abilities)
        newMon.abilities = copyData.abilities;
      if (!newMon.num && copyData.num)
        newMon.num = copyData.num;
      if (!newMon.genderRatio && copyData.genderRatio)
        newMon.genderRatio = copyData.genderRatio;
      if (!newMon.heightm && copyData.heightm)
        newMon.heightm = copyData.heightm;
      if (!newMon.weightkg && copyData.weightkg)
        newMon.weightkg = copyData.weightkg;
      if (!newMon.color && copyData.color)
        newMon.color = copyData.color;
      if (!newMon.eggGroups && copyData.eggGroups)
        newMon.eggGroups = copyData.eggGroups;
      let copyMoves = newMon.copyData;
      if (newMon.copyMoves)
        copyMoves = newMon.copyMoves;
      if (copyMoves) {
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
        let currentGen, latestGen = 0;
        for (const moveid in learnset) {
          for (const method in learnset[moveid]) {
            if (learnset[moveid][method][1] != "V") {
              currentGen = parseInt(learnset[moveid][method][0]);
              if (currentGen > latestGen)
                latestGen = currentGen;
            }
          }
        }
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => parseInt(method[0]) == latestGen
          );
        }
        if (copyData.prevo) {
          const prevoLearnset = this.dataCache.Learnsets[this.toID(copyData.prevo.toLowerCase())].learnset;
          for (const moveid in prevoLearnset) {
            this.modData("Learnsets", id).learnset[moveid] = prevoLearnset[moveid].filter(
              (method) => parseInt(method[0]) == latestGen && method[1] != "V"
            );
          }
        }
        if (newMon.movepoolAdditions) {
          for (const move of newMon.movepoolAdditions) {
            this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)] = ["9L50"];
          }
        }
      }
    }
  },
  // modifies getMoveAccuracy to account for Eternal Eevee's Continuous Steps
  // Gets the current accuracy for a move.
  // todo: not working
  actions: {
    hitStepAccuracy(targets, pokemon, move) {
      const hitResults = [];
      for (const [i, target] of targets.entries()) {
        this.battle.activeTarget = target;
        let accuracy = move.accuracy;
        if (move.ohko) {
          if (!target.isSemiInvulnerable()) {
            accuracy = 30;
            if (move.ohko === "Ice" && this.battle.gen >= 7 && !pokemon.hasType("Ice")) {
              accuracy = 20;
            }
            if (!target.volatiles["dynamax"] && pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
              accuracy += pokemon.level - target.level;
            } else {
              this.battle.add("-immune", target, "[ohko]");
              hitResults[i] = false;
              continue;
            }
          }
        } else if (move.name == "Continuous Steps")
          accuracy = move.accuracy;
        else {
          accuracy = this.battle.runEvent("ModifyAccuracy", target, pokemon, move, accuracy);
          if (accuracy !== true) {
            let boost = 0;
            if (!move.ignoreAccuracy) {
              const boosts = this.battle.runEvent("ModifyBoost", pokemon, null, null, { ...pokemon.boosts });
              boost = this.battle.clampIntRange(boosts["accuracy"], -6, 6);
            }
            if (!move.ignoreEvasion) {
              const boosts = this.battle.runEvent("ModifyBoost", target, null, null, { ...target.boosts });
              boost = this.battle.clampIntRange(boost - boosts["evasion"], -6, 6);
            }
            if (boost > 0) {
              accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
            } else if (boost < 0) {
              accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
            }
          }
        }
        if (move.alwaysHit || move.id === "toxic" && this.battle.gen >= 8 && pokemon.hasType("Poison") || move.target === "self" && move.category === "Status" && !target.isSemiInvulnerable()) {
          accuracy = true;
        } else {
          accuracy = this.battle.runEvent("Accuracy", target, pokemon, move, accuracy);
        }
        if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
          if (move.smartTarget) {
            move.smartTarget = false;
          } else {
            if (!move.spreadHit)
              this.battle.attrLastMove("[miss]");
            this.battle.add("-miss", pokemon, target);
          }
          if (!move.ohko && pokemon.hasItem("blunderpolicy") && pokemon.useItem()) {
            this.battle.boost({ spe: 2 }, pokemon);
          }
          hitResults[i] = false;
          continue;
        }
        hitResults[i] = true;
      }
      return hitResults;
    }
  }
};
//# sourceMappingURL=scripts.js.map
