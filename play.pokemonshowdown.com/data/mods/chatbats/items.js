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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  bigroot: {
    inherit: true,
    onTryHealPriority: 1,
    onTryHeal(damage, target, source, effect) {
      const heals = ["drain", "leechseed", "ingrain", "aquaring", "strengthsap"];
      if (heals.includes(effect.id)) {
        return this.chainModify([6144, 4096]);
      }
    },
    shortDesc: "Holder gains 1.5x HP from draining, Aqua Ring, Ingrain, Leech Seed, Strength Sap."
  },
  masquerainite: {
    name: "Masquerainite",
    spritenum: 1,
    megaStone: "Masquerain-Mega",
    megaEvolves: "Masquerain",
    itemUser: ["Masquerain"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1,
    gen: 9,
    desc: "If held by a Masquerain, this item allows it to Mega Evolve in battle."
  },
  starfberry: {
    name: "Starf Berry",
    spritenum: 472,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Psychic"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      const stats = [];
      let stat;
      for (stat in pokemon.boosts) {
        if (stat !== "accuracy" && stat !== "evasion" && pokemon.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 2;
        this.boost(boost);
      }
    },
    num: 207,
    gen: 3
  }
};
//# sourceMappingURL=items.js.map
