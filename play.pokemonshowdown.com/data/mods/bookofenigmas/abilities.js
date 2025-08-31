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
const slicing = [
  "cut",
  "razorleaf",
  "slash",
  "furycutter",
  "aircutter",
  "aerialace",
  "leafblade",
  "nightslash",
  "airslash",
  "xscissor",
  "psychocutter",
  "crosspoison",
  "sacredsword",
  "razorshell",
  "solarblade",
  "behemothblade",
  "stoneaxe",
  "ceaselessedge",
  "populationbomb",
  "kowtowcleave",
  "bitterblade",
  "aquacutter"
];
const Abilities = {
  // Paradoxes abilities
  cleansingfire: {
    onAnyFaintPriority: 1,
    onAnyFaint() {
      if (!this.effectState.target.hp)
        return;
      this.debug("cleansingfire");
      this.add("-activate", this.effectState.target, "ability: Cleansing Fire");
      this.effectState.target.cureStatus();
    },
    name: "Cleansing Fire",
    shortDesc: "When a Pokemon faints, this Pokemon's status is cured.",
    rating: 3.5,
    num: -1
  },
  corruptingstorm: {
    onDamagingHitOrder: 2,
    onDamagingHit(damage, target, source, move) {
      if (!target.hp) {
        this.add("-activate", target, "ability: Corrupting Storm");
        source.addVolatile("storm");
      }
    },
    name: "Corrupting Storm",
    shortDesc: "When this Pokemon is KOed by another Pokemon, the attacker loses 1/8 max HP every turn until it switches out.",
    rating: 2.5,
    num: -2
  }
};
//# sourceMappingURL=abilities.js.map
