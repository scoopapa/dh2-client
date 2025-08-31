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
  brn: {
    inherit: true,
    onResidual(pokemon) {
      this.damage(pokemon.baseMaxhp / 8);
    }
  },
  par: {
    inherit: true,
    onModifySpe(spe, pokemon) {
      spe = this.finalModify(spe);
      if (!pokemon.hasAbility("quickfeet")) {
        spe = Math.floor(spe * 25 / 100);
      }
      return spe;
    },
    onBeforeMovePriority: 1,
    onBeforeMove(pokemon) {
      if (!pokemon.hasAbility("magicguard") && this.randomChance(1, 4)) {
        this.add("cant", pokemon, "par");
        return false;
      }
    }
  },
  slp: {
    inherit: true,
    onSwitchIn(target) {
      this.effectState.time = this.effectState.startTime;
    },
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "slp", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else if (sourceEffect && sourceEffect.effectType === "Move") {
        this.add("-status", target, "slp", "[from] move: " + sourceEffect.name);
      } else {
        this.add("-status", target, "slp");
      }
      this.effectState.startTime = this.random(1, 8);
      this.effectState.time = this.effectState.startTime;
      if (target.removeVolatile("nightmare")) {
        this.add("-end", target, "Nightmare", "[silent]");
      }
    },
    onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      if (pokemon.hasAbility("earlybird")) {
        pokemon.statusState.time--;
      }
      pokemon.statusState.time--;
      if (pokemon.statusState.time > 0) {
        this.add("cant", pokemon, "slp");
      }
      if (pokemon.statusState.time <= 0) {
        pokemon.cureStatus();
        this.add("cant", pokemon);
      }
      if (move.sleepUsable) {
        return;
      }
      return false;
    }
  },
  /*frz: {
  	inherit: true,
  	onBeforeMovePriority: 10,
  	onBeforeMove(pokemon, target, move) {
  		if (move.flags['defrost']) return;
  		this.add('cant', pokemon, 'frz');
  		pokemon.lastMove = null;
  		return false;
  	},
  	onAfterMoveSecondary(target, source, move) {
  		if (move.thawsTarget || move.secondary && move.secondary.status === 'brn') {
  			target.cureStatus();
  		}
  	},
  },*/
  confusion: {
    inherit: true,
    onBeforeMovePriority: 3,
    onBeforeMove(pokemon) {
      pokemon.volatiles["confusion"].time--;
      if (!pokemon.volatiles["confusion"].time) {
        pokemon.removeVolatile("confusion");
        return;
      }
      this.add("-activate", pokemon, "confusion");
      if (!this.randomChance(50, 100)) {
        return;
      }
      this.activeTarget = pokemon;
      const damage = this.actions.getConfusionDamage(pokemon, 40);
      if (typeof damage !== "number")
        throw new Error("Confusion damage not dealt");
      const activeMove = { id: this.toID("confused"), effectType: "Move", type: "???" };
      this.damage(damage, pokemon, pokemon, activeMove);
      return false;
    }
  },
  gem: {
    name: "gem",
    duration: 1,
    affectsFainted: true,
    onBasePowerPriority: 14,
    onBasePower(basePower, user, target, move) {
      this.debug("Gem Boost");
      return this.chainModify(1.5);
    }
  },
  raindance: {
    inherit: true,
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        this.effectState.duration = 0;
        this.add("-weather", "RainDance", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "RainDance");
      }
    }
  },
  sunnyday: {
    inherit: true,
    onFieldStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        this.effectState.duration = 0;
        this.add("-weather", "SunnyDay", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "SunnyDay");
      }
    }
  },
  sandstorm: {
    inherit: true,
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        this.effectState.duration = 0;
        this.add("-weather", "Sandstorm", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Sandstorm");
      }
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 8);
    }
  },
  hail: {
    inherit: true,
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        this.effectState.duration = 0;
        this.add("-weather", "Hail", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Hail");
      }
    }
  },
  snow: {
    inherit: true,
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        this.effectState.duration = 0;
        this.add("-weather", "Snow", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Snow");
      }
    }
  }
};
//# sourceMappingURL=conditions.js.map
