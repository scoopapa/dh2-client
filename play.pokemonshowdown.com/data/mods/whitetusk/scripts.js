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
  inherit: "gen9",
  gen: 9,
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["White Tusk"]
  },
  init() {
    for (const id in this.dataCache.Pokedex) {
      if (this.dataCache.Learnsets[id] && this.dataCache.Learnsets[id].learnset) {
        const learnset = this.modData("Learnsets", this.toID(id)).learnset;
        this.modData("Learnsets", this.toID(id)).learnset.terablast = ["8M"];
      }
    }
  },
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
      if (this.hasAbility("levitate") && !this.battle.suppressingAttackEvents())
        return null;
      if ("magnetrise" in this.volatiles)
        return false;
      if ("telekinesis" in this.volatiles)
        return false;
      for (const target of this.battle.getAllActive()) {
        if (target.hasAbility("antigravity")) {
          return null;
        }
      }
      return item !== "airballoon";
    }
  }
};
//# sourceMappingURL=scripts.js.map
