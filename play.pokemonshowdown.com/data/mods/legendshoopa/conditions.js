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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  legendsboost: {
    name: "legendsboost",
    onBoost(boost, target, source, effect) {
      this.effectState.startTime = 0;
      if (!boost || effect.id === "legendsboost")
        return;
      let activated = false;
      let boostName;
      this.effectState.atkBoosted = false;
      this.effectState.defBoosted = false;
      this.effectState.speBoosted = false;
      const LegendsBoost = {};
      if (boost.atk) {
        LegendsBoost.spa = boost.atk;
        this.effectState.atkBoosted = true;
        activated = true;
      }
      if (boost.spa) {
        LegendsBoost.atk = boost.spa;
        this.effectState.atkBoosted = true;
        activated = true;
      }
      if (boost.spd) {
        LegendsBoost.def = boost.spd;
        this.effectState.defBoosted = true;
        activated = true;
      }
      if (boost.def) {
        LegendsBoost.spd = boost.def;
        this.effectState.defBoosted = true;
        activated = true;
      }
      if (boost.spe) {
        this.effectState.speBoosted = true;
        activated = true;
      }
      if (activated === true) {
        this.boost(LegendsBoost, target, target, null, true);
        this.effectState.startTime = 6;
        if (this.effectState.atkBoosted) {
          this.effectState.startTime -= 1;
        }
        if (this.effectState.defBoosted) {
          this.effectState.startTime -= 1;
        }
        if (this.effectState.speBoosted) {
          this.effectState.startTime -= 1;
        }
        if (effect.effectType === "Move" && !effect.status || effect.effectType === "Ability" || effect.effectType === "Item") {
          this.effectState.startTime = 3;
        }
        if (this.dex.abilities.get("remaininghope") && this.effectState.startTime == 3) {
          this.effectState.startTime += 1;
        }
        this.effectState.time = this.effectState.startTime;
        return;
      }
    },
    // this isnt a boost really its just so i dont have to make another volatile xx
    onModifyMove(move) {
      if (move.secondaries) {
        if (move.id === "powdersnow" || move.id === "blizzard" || move.id === "firepunch" || move.id === "icepunch" || move.id === "thunderpunch")
          return;
        this.debug("doubling secondary chance");
        for (const secondary of move.secondaries) {
          if (secondary.chance && secondary.chance === 10)
            secondary.chance *= 2;
        }
      }
      if (move.self?.chance && move.self?.chance === 10) {
        move.self.chance *= 2;
      }
    },
    onResidual(pokemon2) {
      this.effectState.time -= 1;
      if (this.effectState.time <= 0) {
        this.add("-clearboost", pokemon2);
        pokemon2.clearBoosts();
        return;
      }
    },
    onEnd(pokemon2) {
      this.add("-end", pokemon2, "legendsboost", "[silent]");
    }
  },
  altboost: {
    name: "altboost"
  },
  confusion: {
    name: "confusion"
  },
  jaggedsplinters: {
    name: "jaggedsplinters",
    onStart(side, target, source) {
      this.add("-start", side, "Jagged Splinters");
      this.effectState.jaggedType = target.lastMove;
    },
    onResidual(pokemon2) {
      const type = this.dex.getActiveMove(this.effectState.jaggedType);
      const typeMod = this.clampIntRange(pokemon2.runEffectiveness(type));
      const tr = this.trunc;
      let damage = this.getDamage(pokemon2, pokemon2, 25);
      if (typeof damage !== "number")
        throw new Error("Jagged Splinters damage not dealt");
      pokemon2.getMoveHitData(type).typeMod = typeMod;
      if (typeMod > 0) {
        for (let i = 0; i < typeMod; i++) {
          damage *= 2;
        }
      }
      if (typeMod < 0) {
        for (let i = 0; i > typeMod; i--) {
          damage = tr(damage / 2);
        }
      }
      this.damage(damage);
      this.add("-message", `Jagged Splinters dug into ${pokemon2.name}!`);
    }
  },
  fixated: {
    name: "fixated",
    onStart(target, source, effect) {
      this.add("-start", target, "fixated", "[silent]");
      this.effectState.move = effect.id;
      this.add("-message", `${target.name} is fixated on ${this.effectState.move}!`);
    },
    onTryMovePriority: -2,
    onTryMove(pokemon2, target, move) {
      if (this.effectState.move === move.id)
        return;
      pokemon2.removeVolatile("fixated");
    },
    onModifyDamage(damage, source, target, move) {
      return this.chainModify(1.5);
    },
    onFoeBasePowerPriority: 17,
    onFoeBasePower(basePower, attacker, defender, move) {
      if (this.effectState.target !== defender)
        return;
      return this.chainModify(1.33);
    },
    onEnd(pokemon2) {
      this.add("-end", pokemon2, "fixated", "[silent]");
      this.add("-message", `${pokemon2.name} is no longer fixated!`);
    }
  },
  primed: {
    name: "primed",
    duration: 5,
    onStart(target, source, effect) {
      if (effect.effectType === "Item")
        this.duration = 4;
      if (effect.effectType === "Ability")
        this.duration = 5;
      this.add("-start", target, "primed", "[silent]");
      this.add("-message", `${target.name} adopted a hard-hitting stance!`);
    },
    onModifyDamage(damage, source, target, move) {
      return this.chainModify(1.5);
    },
    onEnd(pokemon2) {
      this.add("-end", pokemon2, "primed", "[silent]");
      this.add("-message", `${pokemon2.name} is no longer primed!`);
    }
  },
  // / Canon Conditions ///
  brn: {
    name: "brn",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.id === "flameorb") {
        this.add("-status", target, "brn", "[from] item: Flame Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "brn", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "brn");
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    // Damage reduction is handled directly in the sim/battle.js damage function
    onResidualOrder: 9,
    onResidual(pokemon2) {
      this.damage(pokemon2.baseMaxhp / 12);
      pokemon2.statusData.time--;
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "brn", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  par: {
    name: "par",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "par", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "par");
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    onModifySpe(spe, pokemon2) {
      if (!pokemon2.hasAbility("quickfeet")) {
        return this.chainModify(0.5);
      }
    },
    onBeforeMovePriority: 1,
    onBeforeMove(pokemon2) {
      if (this.randomChance(1, 4)) {
        this.add("cant", pokemon2, "par");
        return false;
      }
    },
    onResidualOrder: 9,
    onResidual(pokemon2) {
      pokemon2.statusData.time--;
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "par", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  // code stolen from M4A's Sandbox x
  frz: {
    name: "frz",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "frz", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "frz");
      }
      if (target.species.name === "Shaymin-Sky" && target.baseSpecies.baseSpecies === "Shaymin") {
        target.formeChange("Shaymin", this.effect, true);
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    onHit(target, source, move) {
      if (move.thawsTarget || (move.id === "flamewheel" || move.id === "flareblitz") && move.category !== "Status") {
        target.cureStatus();
      }
    },
    onResidualOrder: 9,
    onResidual(pokemon2) {
      this.hint(`${this.effectState.target.name} is afflicted with frostbite!`);
      this.damage(pokemon2.baseMaxhp / 12);
      pokemon2.statusData.time--;
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "frz", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  slp: {
    name: "slp",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "slp", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else if (sourceEffect && sourceEffect.effectType === "Move") {
        this.add("-status", target, "slp", "[from] move: " + sourceEffect.name);
      } else {
        this.add("-status", target, "slp");
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    onFoeBasePowerPriority: 17,
    onFoeBasePower(basePower, attacker, defender, move) {
      if (this.effectState.target !== defender)
        return;
      return this.chainModify(1.33);
    },
    onBeforeMovePriority: 1,
    onBeforeMove(target, source, move) {
      if ((move.id === "wildcharge" || move.id === "spark" || move.id === "volttackle") && move.category !== "Status") {
        target.cureStatus();
      }
      if (this.field.isWeather("hail")) {
        if (this.randomChance(1, 1.5)) {
          this.add("cant", pokemon, "slp");
          return false;
        }
      } else {
        if (this.randomChance(1, 3)) {
          this.add("cant", pokemon, "slp");
          return false;
        }
      }
    },
    onResidualOrder: 9,
    onResidual(pokemon2) {
      pokemon2.statusData.time--;
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "slp", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  psn: {
    name: "psn",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "psn", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "psn");
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    onResidualOrder: 9,
    onResidual(pokemon2) {
      this.damage(pokemon2.baseMaxhp / 6);
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "psn", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  tox: {
    name: "tox",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      this.effectState.stage = 0;
      if (sourceEffect && sourceEffect.id === "toxicorb") {
        this.add("-status", target, "tox", "[from] item: Toxic Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "tox", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "tox");
      }
      this.effectState.startTime = 6;
      if (sourceEffect.effectType === "Ability" || sourceEffect.effectType === "Item") {
        this.effectState.startTime = 3;
      }
      this.effectState.time = this.effectState.startTime;
    },
    onSwitchIn() {
      this.effectState.stage = 0;
    },
    onResidualOrder: 9,
    onResidual(pokemon2) {
      if (this.effectState.stage < 15) {
        this.effectState.stage++;
      }
      this.damage(this.clampIntRange(pokemon2.baseMaxhp / 12, 1) * this.effectState.stage);
      if (pokemon2.statusData.time <= 0) {
        this.add("-curestatus", pokemon2, "tox", "[Silent]");
        pokemon2.setStatus("");
        return;
      }
    }
  },
  hail: {
    name: "Hail",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
    onStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Hail", "[from] ability: " + effect, "[of] " + source);
      } else {
        this.add("-weather", "Hail");
      }
    },
    onModifyMove(move) {
      if (move.secondaries && move.id !== "secretpower") {
        for (const secondary of move.secondaries) {
          if (secondary.status !== "frz")
            return;
          if (secondary.chance)
            secondary.chance *= 2;
        }
      }
    },
    onResidualOrder: 1,
    onResidual() {
      this.add("-weather", "Hail", "[upkeep]");
      if (this.field.isWeather("hail"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map
