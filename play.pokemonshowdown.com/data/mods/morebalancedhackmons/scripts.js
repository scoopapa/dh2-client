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
  actions: {
    // for rage fist
    runSwitch(pokemon) {
      this.battle.runEvent("Swap", pokemon);
      if (this.battle.gen >= 5) {
        this.battle.runEvent("SwitchIn", pokemon);
      }
      this.battle.runEvent("EntryHazard", pokemon);
      if (this.battle.gen <= 4) {
        this.battle.runEvent("SwitchIn", pokemon);
      }
      if (this.battle.gen <= 2) {
        for (const poke of this.battle.getAllActive())
          poke.lastMove = null;
        if (!pokemon.side.faintedThisTurn && pokemon.draggedIn !== this.battle.turn) {
          this.battle.runEvent("AfterSwitchInSelf", pokemon);
        }
      }
      if (!pokemon.hp)
        return false;
      pokemon.isStarted = true;
      if (!pokemon.fainted) {
        this.battle.singleEvent("Start", pokemon.getAbility(), pokemon.abilityState, pokemon);
        this.battle.singleEvent("Start", pokemon.getItem(), pokemon.itemState, pokemon);
      }
      if (this.battle.gen === 4) {
        for (const foeActive of pokemon.foes()) {
          foeActive.removeVolatile("substitutebroken");
        }
      }
      pokemon.draggedIn = null;
      pokemon.timesAttacked = 0;
      return true;
    }
  },
  field: {
    // for utility umbrella
    suppressingWeather() {
      for (const side of this.battle.sides) {
        for (const pokemon of side.active) {
          if (pokemon && !pokemon.fainted && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
            return true;
          }
          if (pokemon && !pokemon.fainted && !pokemon.ignoringItem() && pokemon.getItem().id === "utilityumbrella") {
            return true;
          }
        }
      }
      return false;
    }
  },
  pokemon: {
    // for neutralizing gas
    ignoringAbility() {
      if (this.battle.gen >= 5 && !this.isActive)
        return true;
      if (this.getAbility().isPermanent)
        return false;
      if (this.volatiles["gastroacid"])
        return true;
      if (this.hasItem("Ability Shield") || this.ability === "neutralizinggas")
        return false;
      if (this.volatiles["neutralizinggas"])
        return true;
      return false;
    },
    // for water bubble
    ignoringItem() {
      return !!(this.itemState.knockedOff || // Gen 3-4
      this.battle.gen >= 5 && !this.isActive || !this.getItem().ignoreKlutz && this.hasAbility("klutz") || this.volatiles["embargo"] || this.battle.field.pseudoWeather["magicroom"] || this.volatiles["magician"]);
    }
  }
};
//# sourceMappingURL=scripts.js.map
