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
  // slate 1
  fullmetalbody: {
    inherit: true,
    onDamage(damage, target, source, effect) {
      if (effect.effectType !== "Move") {
        if (effect.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect.name);
        return false;
      }
    },
    shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages. This Pokemon can only be damaged by direct attacks."
  },
  multitype: {
    inherit: true,
    flags: {},
    // yes deleting the flags is an ugly way to do it but I need to find a better one lol
    onStart(pokemon) {
      const allTypes = {
        "Normal": "Rock Head",
        "Grass": "Cotton Down",
        "Fire": "Dry Skin",
        "Water": "Cloud Nine",
        "Electric": "Earth Eater",
        "Ice": "Snow Warning",
        "Fighting": "Scrappy",
        "Poison": "Levitate",
        "Ground": "Clear Body",
        "Flying": "Wind Power",
        "Psychic": "Intimidate",
        "Bug": "Magic Guard",
        "Rock": "Sand Stream",
        "Ghost": "Super Luck",
        "Dragon": "Regenerator",
        "Dark": "Limber",
        "Steel": "Shield Dust",
        "Fairy": "Opportunist"
      };
      const item = pokemon.getItem();
      if (!item.onPlate)
        return;
      const abilityToGive = allTypes[pokemon.types[0]];
      const oldAbility = pokemon.setAbility(abilityToGive);
      if (oldAbility) {
        this.add("-ability", pokemon, abilityToGive, "[from] ability: Multitype");
        return;
      }
      return oldAbility;
    }
  }
};
//# sourceMappingURL=abilities.js.map
