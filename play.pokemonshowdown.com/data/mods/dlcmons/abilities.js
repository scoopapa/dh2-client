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
  swiftretreat: {
    name: "Swift Retreat",
    desc: "This Pokemon can choose to switch out on the second turn of moves with a charge turn of invulnerability instead of attacking. This list does not include Sky Drop.",
    shortDesc: "This Pokemon can choose to switch out on the second turn of a two-turn move.",
    num: -1,
    rating: 3
  },
  lightpower: {
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(2);
    },
    name: "Light Power",
    shortDesc: "This Pokemon's Special Attack is doubled.",
    rating: 5,
    num: -2
  },
  seedsower: {
    inherit: true,
    isNonstandard: null,
    gen: 6
  },
  flowergift: {
    inherit: true,
    onStart(pokemon) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon);
    },
    onWeatherChange(pokemon) {
      if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== "Cherrim" && pokemon.baseSpecies.baseSpecies !== "Glimmaltis" || pokemon.transformed)
        return;
      if (!pokemon.hp)
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        if (pokemon.species.id !== "cherrimsunshine") {
          pokemon.formeChange("Cherrim-Sunshine", this.effect, false, "[msg]");
        }
      } else {
        if (pokemon.species.id === "cherrimsunshine") {
          pokemon.formeChange("Cherrim", this.effect, false, "[msg]");
        }
      }
    },
    onAllyModifyAtkPriority: 3,
    onAllyModifyAtk(atk, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onAllyModifySpDPriority: 4,
    onAllyModifySpD(spd, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 }
  },
  slushrush: {
    inherit: true,
    isNonstandard: null,
    gen: 6,
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    }
  },
  centerofmass: {
    shortDesc: "On switch-in, this Pok\xE9mon summons Gravity.",
    onStart(source) {
      this.field.addPseudoWeather("gravity");
    },
    name: "Center of Mass",
    rating: 4,
    num: -3
  }
};
//# sourceMappingURL=abilities.js.map
