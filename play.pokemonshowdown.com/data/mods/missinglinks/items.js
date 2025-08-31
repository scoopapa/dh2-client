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
  butterfrite: {
    name: "Butterfrite",
    spritenum: 578,
    megaStone: "Butterfree-Mega",
    megaEvolves: "Butterfree",
    itemUser: ["Butterfree"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1001,
    gen: 8,
    desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle."
  },
  milotite: {
    name: "Milotite",
    spritenum: 578,
    megaStone: "Milotic-Mega",
    megaEvolves: "Milotic",
    itemUser: ["Milotic"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1002,
    gen: 8,
    desc: "If held by a Milotic, this item allows it to Mega Evolve in battle."
  },
  froslassite: {
    name: "Froslassite",
    spritenum: 578,
    megaStone: "Froslass-Mega",
    megaEvolves: "Froslass",
    itemUser: ["Froslass"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1003,
    gen: 8,
    desc: "If held by a Froslass, this item allows it to Mega Evolve in battle."
  },
  frosterizer: {
    name: "Frosterizer",
    spritenum: 119,
    fling: {
      basePower: 80
    },
    num: -1004,
    gen: 4,
    desc: "Evolves Jynx into Frostonna when traded."
  },
  slowkinite: {
    name: "Slowkinite",
    spritenum: 578,
    megaStone: "Slowking-Mega",
    megaEvolves: "Slowking",
    itemUser: ["Slowking"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1005,
    gen: 8,
    desc: "If held by a Slowking, this item allows it to Mega Evolve in battle."
  },
  machampite: {
    name: "Machampite",
    spritenum: 578,
    megaStone: "Machamp-Mega",
    megaEvolves: "Machamp",
    itemUser: ["Machamp"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1006,
    gen: 8,
    desc: "If held by a Machamp, this item allows it to Mega Evolve in battle."
  },
  venusauritey: {
    name: "Venusaurite Y",
    spritenum: 578,
    megaStone: "Venusaur-Mega-Y",
    megaEvolves: "Venusaur",
    itemUser: ["Venusaur"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1007,
    gen: 8,
    desc: "If held by a Venusaur, this item allows it to Mega Evolve in battle."
  },
  blastoisinitex: {
    name: "Blastoisinite X",
    spritenum: 578,
    megaStone: "Blastoise-Mega-X",
    megaEvolves: "Blastoise",
    itemUser: ["Blastoise"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1008,
    gen: 8,
    desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle."
  },
  dragonitite: {
    name: "Dragonitite",
    spritenum: 578,
    megaStone: "Dragonite-Mega",
    megaEvolves: "Dragonite",
    itemUser: ["Dragonite"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1009,
    gen: 8,
    desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle."
  },
  zoroarkite: {
    name: "Zoroarkite",
    spritenum: 578,
    megaStone: "Zoroark-Mega",
    megaEvolves: "Zoroark",
    itemUser: ["Zoroark"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1010,
    gen: 8,
    desc: "If held by a Zoroark, this item allows it to Mega Evolve in battle."
  },
  adrenalineorb: {
    name: "Adrenaline Orb",
    spritenum: 660,
    fling: {
      basePower: 30
    },
    onAfterBoost(boost, target, source, effect) {
      if (effect.id === "intimidate" || effect.id === "bloodscent") {
        target.useItem();
      }
    },
    boosts: {
      spe: 1
    },
    num: 846,
    gen: 7
  }
};
//# sourceMappingURL=items.js.map
