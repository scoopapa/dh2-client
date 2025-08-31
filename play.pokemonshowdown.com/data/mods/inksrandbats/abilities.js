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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  iceface: {
    onStart(pokemon) {
      if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0 && pokemon.species.id === "eiscuenoice" && !pokemon.transformed) {
        this.add("-activate", pokemon, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon.formeChange("Eiscue", this.effect, true);
      } else if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0 && pokemon.species.id === "castform" && !pokemon.transformed) {
        this.add("-activate", pokemon, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon.formeChange("Castform-Snowy", this.effect, true);
      }
    },
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect && effect.effectType === "Move" && effect.category === "Physical" && target.species.id === "eiscue" || target.species.id === "castformsnowy" && !target.transformed) {
        this.add("-activate", target, "ability: Ice Face");
        this.effectState.busted = true;
        return 0;
      }
    },
    onCriticalHit(target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id === "eiscuenoice" || target.species.id === "castform" || target.transformed)
        return;
      if (target.volatiles["substitute"] && !(move.flags["authentic"] || move.infiltrates))
        return;
      if (!target.runImmunity(move.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id === "eiscuenoice" || target.species.id === "castform" || target.transformed)
        return;
      if (target.volatiles["substitute"] && !(move.flags["authentic"] || move.infiltrates))
        return;
      if (!target.runImmunity(move.type))
        return;
      return 0;
    },
    onUpdate(pokemon) {
      if (pokemon.species.id === "eiscue" && this.effectState.busted) {
        pokemon.formeChange("Eiscue-Noice", this.effect, true);
      } else if (pokemon.species.id === "castformsnowy" && this.effectState.busted) {
        pokemon.formeChange("Castform", this.effect, true);
      }
    },
    onAnyWeatherStart() {
      const pokemon = this.effectState.target;
      if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0 && pokemon.species.id === "eiscuenoice" && !pokemon.transformed) {
        this.add("-activate", pokemon, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon.formeChange("Eiscue", this.effect, true);
      }
      if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0 && pokemon.species.id === "castform" && !pokemon.transformed) {
        this.add("-activate", pokemon, "ability: Ice Face");
        this.effectState.busted = false;
        pokemon.formeChange("Castform-Snowy", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Ice Face",
    rating: 3,
    num: 248
  },
  snowwarning: {
    onStart(source) {
      this.field.weatherData.layers++;
      this.add("-activate", source, "ability: Snow Warning");
      this.hint("The hailstorm has worsened!");
    },
    name: "Snow Warning",
    rating: 4,
    num: 117
  },
  drought: {
    onStart(source) {
      this.field.weatherData.layers = 0;
      this.add("-activate", source, "ability: Drought");
      this.hint("The hailstorm has eased!");
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Water") {
        this.debug("Drought resist");
        return this.chainModify(0.5);
      }
    },
    onUpdate(pokemon) {
      if (pokemon.status === "frz") {
        this.add("-activate", pokemon, "ability: Drought");
        pokemon.cureStatus();
      }
    },
    onImmunity(type, pokemon) {
      if (type === "frz")
        return false;
    },
    name: "Drought",
    rating: 4,
    num: 70
  },
  slushrush: {
    // Doesn't activate on level 0 hail
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0) {
        return this.chainModify(2);
      }
    },
    name: "Slush Rush",
    rating: 3,
    num: 202
  },
  snowcloak: {
    // Doesn't activate on level 0 hail
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    onModifyAccuracyPriority: 8,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather("hail") && this.field.weatherData.layers !== 0) {
        this.debug("Snow Cloak - decreasing accuracy");
        return accuracy * 0.8;
      }
    },
    name: "Snow Cloak",
    rating: 1.5,
    num: 81
  },
  // icebody: { // Doesn't activate on level 0 hail
  // onWeather(target, source, effect) {
  // if (effect.id === 'hail' && (this.field.weatherData.layers !== 0)) {
  // this.heal(target.baseMaxhp / 16);
  // }
  // },
  // onImmunity(type, pokemon) {
  // if (type === 'hail') return false;
  // },
  // name: "Ice Body",
  // rating: 1,
  // num: 115,
  // },
  flurryrush: {
    // Doesn't activate on level 0 hail
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather("hail")) {
        if (this.field.weatherData.layers > 3)
          return this.chainModify(2.5);
        else if (this.field.weatherData.layers === 3)
          return this.chainModify(2);
        else if (this.field.weatherData.layers === 2)
          return this.chainModify(1.5);
        else if (this.field.weatherData.layers === 1)
          return;
        else
          return this.chainModify(0.75);
      }
    },
    name: "Flurry Rush",
    rating: 3,
    num: 202
  },
  icebody: {
    // Alt version of Ice Body, that uses the variable hail damage amount, for something that REALLY needs a buff
    onWeather(target, source, effect) {
      if (effect.id === "hail" && this.field.weatherData.layers !== 0) {
        this.heal(target.baseMaxhp * (this.field.weatherData.layers / 16));
      }
    },
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    name: "Ice Body",
    rating: 1,
    num: 115
  }
};
//# sourceMappingURL=abilities.js.map
