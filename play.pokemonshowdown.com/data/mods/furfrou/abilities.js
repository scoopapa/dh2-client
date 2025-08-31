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
  snowwarning: {
    inherit: true,
    onStart(source) {
      this.field.setWeather("hail");
    },
    shortDesc: "On switch-in, this Pokemon summons Hail."
  },
  flicker: {
    onStart(pokemon) {
      if (pokemon.outFlickered)
        return;
      pokemon.addVolatile("flicker");
    },
    onModifyAccuracy(accuracy, target, source, move) {
      if (target?.volatiles["flicker"] && typeof accuracy === "number") {
        this.debug("Flicker - setting accuracy to 0");
        return 0;
      }
    },
    onEnd(pokemon) {
      if (pokemon?.volatiles["flicker"]) {
        delete pokemon.volatiles["flicker"];
        this.add("-end", pokemon, "Flicker", "[silent]");
      }
    },
    condition: {
      duration: 1,
      onResidualOrder: 28,
      onResidualSubOrder: 2,
      onStart(target) {
        this.add("-start", target, "ability: Flicker");
      },
      onTryHit(target, source, move) {
        if (target !== source) {
          target.flickered = true;
          target.addVolatile("charge");
        }
      },
      onEnd(target) {
        if (target.flickered) {
          this.add("-end", target, "Flicker");
        } else {
          this.add("-message", `${target.name} is wearing itself out!`);
          target.outFlickered = true;
          this.add("-end", target, "Flicker");
        }
      }
    },
    flags: {},
    name: "Flicker",
    shortDesc: "First active turn: dodge any incoming move. If no dodge: ability will never activate again."
  },
  enviousaura: {
    onStart(pokemon) {
      for (const target of pokemon.adjacentFoes()) {
        if (target.positiveBoosts() > 0) {
          this.add("-start", pokemon, "ability: Envious Aura");
          this.add("-message", `${pokemon.name} craves ${target.name}'s strength!`);
        }
      }
    },
    onModifyDamage(damage, source, target, move) {
      if (target.positiveBoosts() > 0) {
        return this.chainModify(1.5);
      }
    },
    onAnyModifyBoost(boosts, pokemon) {
      const enviousUser = this.effectState.target;
      if (enviousUser === pokemon)
        return;
      if (enviousUser === this.activePokemon && pokemon === this.activeTarget) {
        boosts["def"] = 0;
        boosts["spd"] = 0;
        boosts["evasion"] = 0;
      }
    },
    flags: {},
    name: "Envious Aura",
    shortDesc: "User gets a 1.5x power boost if the opponent has a positive boost. User ignores defensive stat boosts.",
    rating: 2.5,
    num: 233
  }
};
//# sourceMappingURL=abilities.js.map
