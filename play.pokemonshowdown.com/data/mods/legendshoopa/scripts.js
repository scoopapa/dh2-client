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
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["ANL OU", "ANL NFE", "ANL LC"]
  },
  init() {
    delete this.modData("Learnsets", "crustle").learnset.gigaimpact;
    delete this.modData("Learnsets", "crustle").learnset.hyperbeam;
    this.modData("Learnsets", "lanturn").learnset.thunderfang = ["8M"];
    this.modData("Learnsets", "kecleon").learnset.camoscope = ["8M"];
    this.modData("Learnsets", "tropius").learnset.berryblast = ["8M"];
    for (const id in this.dataCache.Pokedex) {
      const newMon = this.dataCache.Pokedex[id];
      if (!newMon || !newMon.copyData)
        continue;
      const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
      if (!newMon.types && copyData.types)
        newMon.types = copyData.types;
      if (!newMon.baseStats && copyData.baseStats)
        newMon.baseStats = copyData.baseStats;
      if (!newMon.abilities && copyData.abilities)
        newMon.abilities = copyData.abilities;
      if (!newMon.num && copyData.num)
        newMon.num = copyData.num * -1;
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
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid];
        }
        if (newMon.movepoolAdditions) {
          for (const move of newMon.movepoolAdditions) {
            this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)] = ["8M"];
          }
        }
        if (newMon.movepoolDeletions) {
          for (const move of newMon.movepoolDeletions) {
            delete this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)];
          }
        }
      }
    }
  },
  hitStepAccuracy(targets, pokemon, move) {
    const hitResults = [];
    for (const [i, target] of targets.entries()) {
      this.activeTarget = target;
      let accuracy = move.accuracy;
      if (move.ohko) {
        if (!target.isSemiInvulnerable()) {
          accuracy = 30;
          if (move.ohko === "Ice" && this.gen >= 7 && !pokemon.hasType("Ice")) {
            accuracy = 20;
          }
          if (!target.volatiles["dynamax"] && pokemon.level >= target.level && (move.ohko === true || !target.hasType(move.ohko))) {
            accuracy += pokemon.level - target.level;
          } else {
            this.add("-immune", target, "[ohko]");
            hitResults[i] = false;
            continue;
          }
        }
      } else {
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
      }
      if (move.alwaysHit || move.id === "toxic" && this.gen >= 6 && pokemon.hasType("Poison")) {
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
        if (!move.ohko && pokemon.hasItem("blunderpolicy") && pokemon.useItem()) {
          this.boost({ spe: 2 }, pokemon);
        }
        hitResults[i] = false;
        continue;
      }
      if (move.secondaries && move.id !== "secretpower") {
        for (const secondary of move.secondaries) {
          if (secondary.status !== "brn")
            return;
          target.setStatus("");
        }
      } else if (move.status) {
        target.setStatus("");
      }
      hitResults[i] = true;
    }
    return hitResults;
  },
  calculateStat(statName, boost, modifier) {
    statName = toID(statName);
    if (statName === "hp")
      throw new Error("Please read `maxhp` directly");
    let stat = this.storedStats[statName];
    if ("wonderroom" in this.battle.field.pseudoWeather) {
      if (statName === "def") {
        stat = this.storedStats["spd"];
      } else if (statName === "spd") {
        stat = this.storedStats["def"];
      }
    }
    let boosts = {};
    const boostName = statName;
    boosts[boostName] = boost;
    boosts = this.battle.runEvent("ModifyBoost", this, null, null, boosts);
    boost = boosts[boostName];
    const boostTable = [1, 1.5];
    if (boost > 1)
      boost = 1;
    if (boost < -1)
      boost = -1;
    if (boost >= 0) {
      stat = Math.floor(stat * boostTable[boost]);
    } else {
      stat = Math.floor(stat / boostTable[-boost]);
    }
    return this.battle.modify(stat, modifier || 1);
  },
  getStat(statName, unboosted, unmodified) {
    statName = toID(statName);
    if (statName === "hp")
      throw new Error("Please read `maxhp` directly");
    let stat = this.storedStats[statName];
    if (unmodified && "wonderroom" in this.battle.field.pseudoWeather) {
      if (statName === "def") {
        statName = "spd";
      } else if (statName === "spd") {
        statName = "def";
      }
    }
    if (!unboosted) {
      const boosts = this.battle.runEvent("ModifyBoost", this, null, null, { ...this.boosts });
      let boost = boosts[statName];
      const boostTable = [1, 1.5];
      if (boost > 1)
        boost = 1;
      if (boost < -1)
        boost = -1;
      if (boost >= 0) {
        stat = Math.floor(stat * boostTable[boost]);
      } else {
        stat = Math.floor(stat / boostTable[-boost]);
      }
    }
    if (!unmodified) {
      const statTable = { atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe" };
      stat = this.battle.runEvent("Modify" + statTable[statName], this, null, null, stat);
    }
    if (statName === "spe" && stat > 1e4)
      stat = 1e4;
    return stat;
  },
  heal(damage, target, source = null, effect = null) {
    if (this.event) {
      if (!target)
        target = this.event.target;
      if (!source)
        source = this.event.source;
      if (!effect)
        effect = this.effect;
    }
    if (effect === "drain")
      effect = this.dex.getEffectByID(effect);
    if (damage && damage <= 1)
      damage = 1;
    damage = this.trunc(damage);
    damage = this.runEvent("TryHeal", target, source, effect, damage);
    if (!damage)
      return damage;
    if (!target || !target.hp)
      return false;
    if (!target.isActive)
      return false;
    if (target.hp >= target.maxhp)
      return false;
    const finalDamage = target.heal(damage, source, effect);
    switch (effect?.id) {
      case "leechseed":
      case "drain":
        this.add("-heal", target, target.getHealth, "[from] drain", "[of] " + source);
        break;
      case "wish":
        break;
      case "zpower":
        this.add("-heal", target, target.getHealth, "[zeffect]");
        break;
      default:
        if (!effect)
          break;
        if (effect.effectType === "Move") {
          this.add("-heal", target, target.getHealth);
        } else if (source && source !== target) {
          this.add("-heal", target, target.getHealth, "[from] " + effect.fullname, "[of] " + source);
        } else {
          this.add("-heal", target, target.getHealth, "[from] " + effect.fullname);
        }
        break;
    }
    this.runEvent("Heal", target, source, effect, finalDamage);
    return finalDamage;
  },
  pokemon: {
    boostBy(boosts) {
      let delta = 0;
      let boostName;
      for (boostName in boosts) {
        delta = boosts[boostName];
        this.boosts[boostName] += delta;
        if (this.boosts[boostName] > 1) {
          delta -= this.boosts[boostName] - 1;
          this.boosts[boostName] = 1;
        }
        if (this.boosts[boostName] < -1) {
          delta -= this.boosts[boostName] - -1;
          this.boosts[boostName] = -1;
        }
      }
      return delta;
    },
    /*
    		getStat(statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean) {
    			statName = toID(statName) as StatNameExceptHP;
    			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
    			if (statName === 'hp') throw new Error("Please read `maxhp` directly");
    
    			// base stat
    			let stat = this.storedStats[statName];
    
    			// Download ignores Wonder Room's effect, but this results in
    			// stat stages being calculated on the opposite defensive stat
    			if (unmodified && 'wonderroom' in this.battle.field.pseudoWeather) {
    				if (statName === 'def') {
    					statName = 'spd';
    				} else if (statName === 'spd') {
    					statName = 'def';
    				}
    			}
    
    			// stat boosts
    			if (!unboosted) {
    				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
    				let boost = boosts[statName];
    				const boostTable = [1, 1.5];
    				if (boost > 1) boost = 1;
    				if (boost < -1) boost = -1;
    				if (boost >= 0) {
    					stat = Math.floor(stat * boostTable[boost]);
    				} else {
    					stat = Math.floor(stat / boostTable[-boost]);
    				}
    			}
    
    			// stat modifier effects
    			if (!unmodified) {
    				const statTable: {[s in StatNameExceptHP]?: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
    				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
    			}
    
    			if (statName === 'spe' && stat > 10000) stat = 10000;
    			return stat;
    		},
    		*/
    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
      const tr = this.trunc;
      if (!move.type)
        move.type = "???";
      const type = move.type;
      baseDamage += 2;
      if (move.spreadHit) {
        const spreadModifier = move.spreadModifier || (this.gameType === "free-for-all" ? 0.5 : 0.75);
        this.debug("Spread modifier: " + spreadModifier);
        baseDamage = this.modify(baseDamage, spreadModifier);
      }
      baseDamage = this.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
      const isCrit = target.getMoveHitData(move).crit;
      if (isCrit) {
        baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
      }
      baseDamage = this.randomizer(baseDamage);
      if (move.forceSTAB || type !== "???" && pokemon.hasType(type)) {
        baseDamage = this.modify(baseDamage, move.stab || 1.5);
      }
      let typeMod = target.runEffectiveness(move);
      typeMod = this.clampIntRange(typeMod, -6, 6);
      target.getMoveHitData(move).typeMod = typeMod;
      if (typeMod > 0) {
        if (!suppressMessages)
          this.add("-supereffective", target);
        for (let i = 0; i < typeMod; i++) {
          baseDamage *= 2;
        }
      }
      if (typeMod < 0) {
        if (!suppressMessages)
          this.add("-resisted", target);
        for (let i = 0; i > typeMod; i--) {
          baseDamage = tr(baseDamage / 2);
        }
      }
      if (isCrit && !suppressMessages)
        this.add("-crit", target);
      if (pokemon.status === "brn" && move.category === "Physical" && !pokemon.hasAbility("guts")) {
        if (this.gen < 6 || move.id !== "facade") {
          baseDamage = this.modify(baseDamage, 0.5);
        }
      }
      if (pokemon.status === "frz" && move.category === "Special" && pokemon.hasAbility("guts")) {
        baseDamage = this.modify(baseDamage, 0.5);
      }
      if (this.gen === 5 && !baseDamage)
        baseDamage = 1;
      baseDamage = this.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
        baseDamage = this.modify(baseDamage, 0.25);
        this.add("-zbroken", target);
      }
      if (this.gen !== 5 && !baseDamage)
        return 1;
      return tr(baseDamage, 16);
    }
  }
};
//# sourceMappingURL=scripts.js.map
