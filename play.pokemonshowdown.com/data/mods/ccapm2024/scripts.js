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
    // for micrometas to only show custom tiers
    excludeStandardTiers: true,
    // only to specify the order of custom tiers
    customTiers: ["CCAPM2024"]
  },
  init() {
  },
  battle: {},
  actions: {
    secondaries(targets, source, move, moveData, isSelf) {
      if (!moveData.secondaries)
        return;
      for (const target of targets) {
        if (target === false)
          continue;
        const secondaries = this.battle.runEvent("ModifySecondaries", target, source, moveData, moveData.secondaries.slice());
        for (const secondary of secondaries) {
          const secondaryRoll = this.battle.random(100);
          const secondaryOverflow = (secondary.boosts || secondary.self) && this.battle.gen <= 8;
          if (typeof secondary.chance === "undefined" || secondaryRoll < (secondaryOverflow ? secondary.chance % 256 : secondary.chance)) {
            let flag = true;
            let canSetStatus = function(status, target2, pokemon) {
              if (!target2 || target2 === false || target2.status)
                return false;
              let cantStatus = {
                brn: ["Fire", "comatose", "waterveil", "waterbubble"],
                frz: ["Ice", "comatose", "magmaarmor"],
                par: ["Electric", "comatose", "limber"],
                psn: ["comatose", "immunity"],
                slp: ["comatose", "insomnia", "vitalspirit"],
                tox: ["comatose", "immunity"]
              };
              if (target2.hasType(["Poison", "Steel"]) && (status === "psn" || status === "tox")) {
                if (pokemon.hasAbility("corrosion")) {
                  return true;
                } else {
                  return false;
                }
              }
              if (target2.hasType(cantStatus[status][0]))
                return false;
              if (move.ignoreAbility)
                return true;
              if (target2.hasAbility("leafguard") && this.isWeather(["sunnyday", "desolateland"]))
                return false;
              if (target2.hasAbility("shieldsdown") && target2.template.speciesid === "miniormeteor")
                return false;
              if (target2.hasAbility(cantStatus[status]))
                return false;
              return true;
            };
            if (moveData.secondary.status)
              flag = canSetStatus(moveData.secondary.status, target, source);
            if (moveData.secondary.volatileStatus)
              flag = !(moveData.secondary.volatileStatus in target.volatiles);
            if (moveData.secondary.volatileStatus === "flinch")
              flag = flag && target.activeTurns && !target.moveThisTurn;
            this.moveHit(target, source, move, secondary, true, isSelf);
            if (moveData.secondary.self && moveData.secondary.self.boosts) {
              Object.keys(moveData.secondary.self.boosts).forEach((boost) => {
                if (source.boosts[boost] === 6)
                  flag = false;
              });
            } else {
              flag = flag && !(target.hp === void 0 || target.hp <= 0);
            }
            if (moveData.target !== "self" && moveData.secondary.boosts) {
              let cantLower = {
                "atk": ["clearbody", "fullmetalbody", "hypercutter", "whitesmoke"],
                "def": ["bigpecks", "clearbody", "fullmetalbody", "whitesmoke"],
                "spa": ["clearbody", "fullmetalbody", "whitesmoke"],
                "spd": ["clearbody", "fullmetalbody", "whitesmoke"],
                "spe": ["clearbody", "fullmetalbody", "whitesmoke"],
                "accuracy": ["clearbody", "fullmetalbody", "keeneye", "whitesmoke"]
              };
              for (let k in moveData.secondary.boosts) {
                if (target.boosts[k] === -6) {
                  flag = false;
                  continue;
                }
                if (moveData.secondary.boosts[k] < 0 && target.hasAbility(cantLower[k]) && !move.ignoreAbility) {
                  flag = false;
                  break;
                }
              }
            }
            if (source.hasAbility("sheerforce"))
              flag = false;
            if (target && target.hasAbility("shielddust") && !move.ignoreAbility && !move.secondary.self.boosts) {
              flag = false;
            }
            if (flag && target.hasAbility("countermeasures")) {
              this.battle.add("-activate", target, "ability: Countermeasures");
              this.battle.damage(source.baseMaxhp * (100 - secondary.chance) / 100, source, target);
            }
          }
        }
      }
    }
  },
  side: {
    addFishingTokens(amount) {
      if (amount === 0)
        return;
      if (this.fishingTokens === void 0)
        this.fishingTokens = 0;
      if (this.battle.field.isTerrain("fishingterrain"))
        amount *= 2;
      this.fishingTokens += amount;
      const word = amount === 1 ? "token was" : "tokens were";
      this.battle.add("-message", `${amount} fishing ${word} added to ${this.name}'s side!`);
      this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
    },
    removeFishingTokens(amount) {
      if (amount === 0)
        return;
      if (this.fishingTokens === void 0)
        this.fishingTokens = 0;
      if (amount > this.fishingTokens) {
        return false;
      }
      this.fishingTokens -= amount;
      const word = amount === 1 ? "token was" : "tokens were";
      this.battle.add("-message", `${amount} fishing ${word} removed from ${this.name}'s side!`);
      this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
      return true;
    }
  },
  pokemon: {}
};
//# sourceMappingURL=scripts.js.map
