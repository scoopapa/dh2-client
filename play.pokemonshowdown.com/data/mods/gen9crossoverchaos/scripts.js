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
    customTiers: ["CC OU", "CC Ubers", "CC UU", "unintroduced"]
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
    if (move.useSourceDefensiveAsOffensive) {
      attackStat = defenseStat;
      if ("wonderroom" in this.field.pseudoWeather) {
        if (attackStat === "def") {
          attackStat = "spd";
        } else if (attackStat === "spd") {
          attackStat = "def";
        }
        if (attacker.boosts["def"] || attacker.boosts["spd"]) {
          this.hint("Body Press uses Sp. Def boosts when Wonder Room is active.");
        }
      }
    } else if (move.useSourceAlternateDefensiveAsOffensive) {
      attackStat = defenseStat;
      if (attackStat === "def") {
        attackStat === "spd";
      } else {
        attackStat === "def";
      }
      if ("wonderroom" in this.field.pseudoWeather) {
        if (attackStat === "def") {
          attackStat = "spd";
        } else if (attackStat === "spd") {
          attackStat = "def";
        }
        if (attacker.boosts["def"] || attacker.boosts["spd"]) {
          this.hint("Great Fire uses Sp. Def boosts when Wonder Room is active.");
        }
      }
    }
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
  }
};
//# sourceMappingURL=scripts.js.map
