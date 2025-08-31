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
  Scripts: () => Scripts,
  getName: () => getName
});
module.exports = __toCommonJS(scripts_exports);
var import_lib = require("../../../lib");
var import_dex_data = require("../../../sim/dex-data");
const usergroups = {};
const usergroupData = (0, import_lib.FS)("config/usergroups.csv").readIfExistsSync().split("\n");
for (const row of usergroupData) {
  if (!(0, import_dex_data.toID)(row))
    continue;
  const cells = row.split(",");
  if (cells.length > 3)
    throw new Error(`Invalid entry when parsing usergroups.csv`);
  usergroups[(0, import_dex_data.toID)(cells[0])] = cells[1].trim() || " ";
}
function getName(name) {
  const userid = (0, import_dex_data.toID)(name);
  if (!userid)
    throw new Error("No/Invalid name passed to getSymbol");
  const group = usergroups[userid] || " ";
  return group + name;
}
const Scripts = {
  init() {
    for (const id in this.dataCache.Pokedex) {
      const fusionEntry = this.dataCache.Pokedex[id];
      if (fusionEntry.fusion) {
        const learnsetFusionList = [];
        for (let name of fusionEntry.fusion) {
          let prevo = true;
          while (prevo) {
            learnsetFusionList.push(name);
            const dexEntry = this.dataCache.Pokedex[this.toID(name)];
            if (dexEntry.prevo)
              name = dexEntry.prevo;
            else
              prevo = false;
          }
        }
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        for (const name of learnsetFusionList) {
          const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;
          for (const moveid in learnset) {
            if (this.dataCache.Moves[moveid].isNonstandard === "Past")
              continue;
            this.modData("Learnsets", id).learnset[moveid] = ["9L1"];
          }
        }
      }
    }
  },
  gen: 9,
  teambuilderConfig: {
    // for micrometas to only show custom tiers
    excludeStandardTiers: true,
    // only to specify the order of custom tiers
    customTiers: ["FECC"]
  },
  battle: {
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
        effect = this.dex.conditions.getByID(effect);
      if (damage && damage <= 1)
        damage = 1;
      if (target.hasAbility("healaura") || source.hasAbility("healaura"))
        damage * 1.33;
      damage = this.trunc(damage);
      damage = this.runEvent("TryHeal", target, source, effect, damage);
      if (!damage)
        return damage;
      if (!target?.hp)
        return false;
      if (!target.isActive)
        return false;
      if (target.hp >= target.maxhp)
        return false;
      const finalDamage = target.heal(damage, source, effect);
      switch (effect?.id) {
        case "leechseed":
        case "rest":
          this.add("-heal", target, target.getHealth, "[silent]");
          break;
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
    }
  },
  actions: {
    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
      const tr = this.battle.trunc;
      if (!move.type)
        move.type = "???";
      const type = move.type;
      baseDamage += 2;
      if (move.spreadHit) {
        const spreadModifier = move.spreadModifier || (this.battle.gameType === "freeforall" ? 0.5 : 0.75);
        this.battle.debug("Spread modifier: " + spreadModifier);
        baseDamage = this.battle.modify(baseDamage, spreadModifier);
      } else if (move.multihitType === "parentalbond" && move.hit > 1) {
        const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
        this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
        baseDamage = this.battle.modify(baseDamage, bondModifier);
      }
      baseDamage = this.battle.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
      const isCrit = target.getMoveHitData(move).crit;
      if (isCrit) {
        baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
      }
      baseDamage = this.battle.randomizer(baseDamage);
      if (type !== "???") {
        let stab = 1;
        const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
        if (isSTAB) {
          stab = 1.5;
        }
        if (pokemon.terastallized === "Stellar") {
          if (!pokemon.stellarBoostedTypes.includes(type)) {
            stab = isSTAB ? 2 : [4915, 4096];
            if (pokemon.species.name !== "Teradoof-Stellar") {
              pokemon.stellarBoostedTypes.push(type);
            }
          }
        } else {
          if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
            stab = 2;
          }
          stab = this.battle.runEvent("ModifySTAB", pokemon, target, move, stab);
        }
        baseDamage = this.battle.modify(baseDamage, stab);
      }
      let typeMod = target.runEffectiveness(move);
      typeMod = this.battle.clampIntRange(typeMod, -6, 6);
      target.getMoveHitData(move).typeMod = typeMod;
      if (typeMod > 0) {
        if (!suppressMessages)
          this.battle.add("-supereffective", target);
        for (let i = 0; i < typeMod; i++) {
          baseDamage *= 2;
        }
      }
      if (typeMod < 0) {
        if (!suppressMessages)
          this.battle.add("-resisted", target);
        for (let i = 0; i > typeMod; i--) {
          baseDamage = tr(baseDamage / 2);
        }
      }
      if (isCrit && !suppressMessages)
        this.battle.add("-crit", target);
      if (pokemon.status === "brn" && move.category === "Physical" && !pokemon.hasAbility("goondrive")) {
        if (this.battle.gen < 6 || move.id !== "facade") {
          baseDamage = this.battle.modify(baseDamage, 0.5);
        }
      }
      if (this.battle.gen === 5 && !baseDamage)
        baseDamage = 1;
      baseDamage = this.battle.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
        baseDamage = this.battle.modify(baseDamage, 0.25);
        this.battle.add("-zbroken", target);
      }
      if (this.battle.gen !== 5 && !baseDamage)
        return 1;
      return tr(baseDamage, 16);
    },
    terastallize(pokemon) {
      if (pokemon.illusion && ["Ogerpon", "Teradoof"].includes(pokemon.illusion.species.baseSpecies)) {
        this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
      }
      const type = pokemon.teraType;
      this.battle.add("-terastallize", pokemon, type);
      pokemon.terastallized = type;
      for (const ally of pokemon.side.pokemon) {
        ally.canTerastallize = null;
      }
      pokemon.addedType = "";
      pokemon.knownType = true;
      pokemon.apparentType = type;
      if (pokemon.species.baseSpecies === "Ogerpon") {
        const tera = pokemon.species.id === "ogerpon" ? "tealtera" : "tera";
        pokemon.formeChange(pokemon.species.id + tera, null, true);
      }
      if (pokemon.species.name === "Teradoof-Terastal" && type === "Stellar") {
        pokemon.formeChange("Teradoof-Stellar", null, true);
        pokemon.formeChange("Teradoof-Stellar", null, true);
        pokemon.baseMaxhp = Math.floor(Math.floor(
          2 * pokemon.species.baseStats["hp"] + pokemon.set.ivs["hp"] + Math.floor(pokemon.set.evs["hp"] / 4) + 100
        ) * pokemon.level / 100 + 10);
        const newMaxHP = pokemon.baseMaxhp;
        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
        pokemon.maxhp = newMaxHP;
        this.battle.add("-heal", pokemon, pokemon.getHealth, "[silent]");
      }
      this.battle.runEvent("AfterTerastallization", pokemon);
    },
    canMegaEvo(pokemon) {
      const species = pokemon.baseSpecies;
      const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
      if (altForme)
        console.log(altForme);
      const item = pokemon.getItem();
      if (altForme?.isMega && altForme?.requiredMove && pokemon.baseMoves.includes((0, import_dex_data.toID)(altForme.requiredMove)) && !item.zMove) {
        return altForme.name;
      }
      if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
        return item.megaStone;
      }
      return null;
    },
    canUltraBurst(pokemon) {
      if (pokemon.baseSpecies.name === "Necro Mane-Dusk Mane" && pokemon.getItem().id === "depletedultranecroziumz") {
        return "Necro Mane-Ultra";
      }
      return null;
    },
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
        } else {
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
          if (pokemon.hasAbility("coinflipmechanics")) {
            this.battle.add(`c:|${Math.floor(Date.now() / 1e3)}|${pokemon.name}|Aw dang it`);
          }
          if (target.hasAbility("coinflipmechanics")) {
            this.battle.add(`c:|${Math.floor(Date.now() / 1e3)}|${target.name}|Hey, ${pokemon.side.name}, did you know 99% of gamblers quit right before hitting it big?`);
          }
          if (target.hasAbility("swallowswallow")) {
            this.battle.add(`c:|${Math.floor(Date.now() / 1e3)}|${target.name}|@${pokemon.name}, sorry, your vote did not follow the format - try again`);
          }
          hitResults[i] = false;
          continue;
        }
        hitResults[i] = true;
      }
      return hitResults;
    }
  },
  pokemon: {
    // for serious showdown
    ignoringAbility() {
      if (this.battle.gen >= 5 && !this.isActive)
        return true;
      if (this.getAbility().isPermanent)
        return false;
      if (this.volatiles["gastroacid"])
        return true;
      if (this.ability === "neutralizinggas")
        return false;
      if (this.volatiles["seriousshowdown"])
        return true;
      return false;
    },
    getActionSpeed() {
      let speed = this.getStat("spe", false, false);
      if (this.battle.field.getPseudoWeather("trickroom") || this.battle.getAllActive().some((poke) => poke.hasAbility("trjumpscare"))) {
        speed = 1e4 - speed;
      }
      return this.battle.trunc(speed, 13);
    },
    setStatus(status, source = null, sourceEffect = null, ignoreImmunities = false) {
      if (!this.hp)
        return false;
      status = this.battle.dex.conditions.get(status);
      if (this.battle.event) {
        if (!source)
          source = this.battle.event.source;
        if (!sourceEffect)
          sourceEffect = this.battle.effect;
      }
      if (!source)
        source = this;
      if (this.status === status.id) {
        if (sourceEffect?.status === this.status) {
          this.battle.add("-fail", this, this.status);
        } else if (sourceEffect?.status) {
          this.battle.add("-fail", source);
          this.battle.attrLastMove("[still]");
        }
        return false;
      }
      if (!ignoreImmunities && status.id && !(source?.hasAbility("corrosion") && !source?.hasAbility("codebreaker") && ["tox", "psn"].includes(status.id))) {
        if (!this.runStatusImmunity(status.id === "tox" ? "psn" : status.id)) {
          this.battle.debug("immune to status");
          if (sourceEffect?.status) {
            this.battle.add("-immune", this);
          }
          return false;
        }
      }
      const prevStatus = this.status;
      const prevStatusState = this.statusState;
      if (status.id) {
        const result = this.battle.runEvent("SetStatus", this, source, sourceEffect, status);
        if (!result) {
          this.battle.debug("set status [" + status.id + "] interrupted");
          return result;
        }
      }
      this.status = status.id;
      this.statusState = { id: status.id, target: this };
      if (source)
        this.statusState.source = source;
      if (status.duration)
        this.statusState.duration = status.duration;
      if (status.durationCallback) {
        this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
      }
      if (status.id && !this.battle.singleEvent("Start", status, this.statusState, this, source, sourceEffect)) {
        this.battle.debug("status start [" + status.id + "] interrupted");
        this.status = prevStatus;
        this.statusState = prevStatusState;
        return false;
      }
      if (status.id && !this.battle.runEvent("AfterSetStatus", this, source, sourceEffect, status)) {
        return false;
      }
      return true;
    },
    hasAbility(ability) {
      if (this.ignoringAbility())
        return false;
      if (Array.isArray(ability))
        return ability.some((abil) => this.hasAbility(abil));
      const abilityid = this.battle.toID(ability);
      return this.ability === abilityid || !!this.volatiles["ability:" + abilityid];
    },
    getWorstStat(unboosted, unmodified) {
      let statName = "atk";
      let worstStat = 9999;
      const stats = ["atk", "def", "spa", "spd", "spe"];
      for (const i of stats) {
        if (this.getStat(i, unboosted, unmodified) < worstStat) {
          statName = i;
          worstStat = this.getStat(i, unboosted, unmodified);
        }
      }
      return statName;
    }
  }
};
//# sourceMappingURL=scripts.js.map
