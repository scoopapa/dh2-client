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
  dynamax: {
    name: "Dynamax",
    noCopy: true,
    onStart(pokemon) {
      this.effectState.turns = 2;
      pokemon.removeVolatile("minimize");
      pokemon.removeVolatile("substitute");
      if (pokemon.volatiles["torment"]) {
        delete pokemon.volatiles["torment"];
        this.add("-end", pokemon, "Torment", "[silent]");
      }
      if (["cramorantgulping", "cramorantgorging"].includes(pokemon.species.id) && !pokemon.transformed) {
        pokemon.formeChange("cramorant");
      }
      this.add("-start", pokemon, "Dynamax", pokemon.gigantamax ? "Gmax" : "");
      if (pokemon.baseSpecies.name === "Shedinja")
        return;
      const ratio = 1.5 + pokemon.dynamaxLevel * 0.05;
      pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
      pokemon.hp = Math.floor(pokemon.hp * ratio);
      this.add("-heal", pokemon, pokemon.getHealth, "[silent]");
    },
    onTryAddVolatile(status, pokemon) {
      if (status.id === "flinch")
        return null;
    },
    onBeforeSwitchOutPriority: -1,
    onBeforeSwitchOut(pokemon) {
      pokemon.removeVolatile("dynamax");
      pokemon.side.removeSideCondition("maxmeter5");
    },
    onFaint(pokemon) {
      pokemon.removeVolatile("dynamax");
      pokemon.side.removeSideCondition("maxmeter5");
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.id === "behemothbash" || move.id === "behemothblade" || move.id === "dynamaxcannon") {
        return this.chainModify(2);
      }
    },
    onDragOutPriority: 2,
    onDragOut(pokemon) {
      this.add("-block", pokemon, "Dynamax");
      return null;
    },
    onResidualPriority: -100,
    onResidual() {
      this.effectState.turns++;
    },
    onEnd(pokemon) {
      this.add("-end", pokemon, "Dynamax");
      if (pokemon.baseSpecies.name === "Shedinja")
        return;
      pokemon.hp = pokemon.getUndynamaxedHP();
      pokemon.maxhp = pokemon.baseMaxhp;
      this.add("-heal", pokemon, pokemon.getHealth, "[silent]");
      pokemon.side.removeSideCondition("maxmeter5");
    }
  }
};
//# sourceMappingURL=conditions.js.map
