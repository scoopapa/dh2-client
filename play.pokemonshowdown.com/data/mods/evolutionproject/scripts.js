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
    customTiers: ["Evo!", "Evo NFE!", "Evo (NFE)"],
    //Adding a new tier for NFEs that I don't want buried in the lower section [like Michu :(]
    customDoublesTiers: ["Evo!", "Evo NFE!", "Evo (NFE)"]
  },
  init() {
    this.modData("Learnsets", "parasect").learnset.myceliate = ["8L40"];
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
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => !method.includes("S")
          );
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
        if (newMon.name === "Eclipseroid") {
          for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
            this.modData("Learnsets", id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
              (method) => !method.includes("S")
            );
          }
        }
      }
    }
  },
  actions: {
    //Glad I checked this before making the PR!
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
      if (!pokemon.m.originalItem)
        pokemon.m.originalItem = pokemon.item;
      pokemon.draggedIn = null;
      return true;
    }
  },
  //There used to be a section for Mind Blown here but apparently they fixed that on main so that's gone now!
  pokemon: {
    isGrounded(negateImmunity = false) {
      if ("gravity" in this.battle.field.pseudoWeather)
        return true;
      if ("ingrain" in this.volatiles && this.battle.gen >= 4)
        return true;
      if ("smackdown" in this.volatiles)
        return true;
      const item = this.ignoringItem() ? "" : this.item;
      if (item === "ironball")
        return true;
      if (!negateImmunity && this.hasType("Flying") && !("roost" in this.volatiles))
        return false;
      if (this.hasAbility("levitate") && !this.battle.suppressingAbility(this))
        return null;
      if (this.hasAbility("hoverdrive") && this.battle.field.isTerrain("electricterrain") && !this.battle.suppressingAbility(this))
        return false;
      if ("magnetrise" in this.volatiles)
        return false;
      if ("telekinesis" in this.volatiles)
        return false;
      return item !== "airballoon";
    }
  }
};
//# sourceMappingURL=scripts.js.map
