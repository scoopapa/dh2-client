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
  "bugmemory": {
    id: "bugmemory",
    name: "Bug Memory",
    spritenum: 673,
    onMemory: "Bug",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Bug") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Bug",
    num: 909,
    gen: 7,
    desc: "Holder's Multi-Attack is Bug type. Holder's attacks of this memory's type have 1.2x power."
  },
  "darkmemory": {
    id: "darkmemory",
    name: "Dark Memory",
    spritenum: 683,
    onMemory: "Dark",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Dark") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Dark",
    num: 919,
    gen: 7,
    desc: "Holder's Multi-Attack is Dark type. Holder's attacks of this memory's type have 1.2x power."
  },
  "dragonmemory": {
    id: "dragonmemory",
    name: "Dragon Memory",
    spritenum: 682,
    onMemory: "Dragon",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Dragon") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Dragon",
    num: 918,
    gen: 7,
    desc: "Holder's Multi-Attack is Dragon type. Holder's attacks of this memory's type have 1.2x power."
  },
  "electricmemory": {
    id: "electricmemory",
    name: "Electric Memory",
    spritenum: 679,
    onMemory: "Electric",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Electric") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Electric",
    num: 915,
    gen: 7,
    desc: "Holder's Multi-Attack is Electric type. Holder's attacks of this memory's type have 1.2x power."
  },
  "fairymemory": {
    id: "fairymemory",
    name: "Fairy Memory",
    spritenum: 684,
    onMemory: "Fairy",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Fairy") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Fairy",
    num: 920,
    gen: 7,
    desc: "Holder's Multi-Attack is Fairy type. Holder's attacks of this memory's type have 1.2x power."
  },
  "fightingmemory": {
    id: "fightingmemory",
    name: "Fighting Memory",
    spritenum: 668,
    onMemory: "Fighting",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Fighting") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Fighting",
    num: 904,
    gen: 7,
    desc: "Holder's Multi-Attack is Fighting type. Holder's attacks of this memory's type have 1.2x power."
  },
  "firememory": {
    id: "firememory",
    name: "Fire Memory",
    spritenum: 676,
    onMemory: "Fire",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Fire") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Fire",
    num: 912,
    gen: 7,
    desc: "Holder's Multi-Attack is Fire type. Holder's attacks of this memory's type have 1.2x power."
  },
  "flyingmemory": {
    id: "flyingmemory",
    name: "Flying Memory",
    spritenum: 669,
    onMemory: "Flying",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Flying") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Flying",
    num: 905,
    gen: 7,
    desc: "Holder's Multi-Attack is Flying type. Holder's attacks of this memory's type have 1.2x power."
  },
  "ghostmemory": {
    id: "ghostmemory",
    name: "Ghost Memory",
    spritenum: 674,
    onMemory: "Ghost",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Ghost") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Ghost",
    num: 910,
    gen: 7,
    desc: "Holder's Multi-Attack is Ghost type. Holder's attacks of this memory's type have 1.2x power."
  },
  "grassmemory": {
    id: "grassmemory",
    name: "Grass Memory",
    spritenum: 678,
    onMemory: "Grass",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Grass") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Grass",
    num: 914,
    gen: 7,
    desc: "Holder's Multi-Attack is Grass type. Holder's attacks of this memory's type have 1.2x power."
  },
  "groundmemory": {
    id: "groundmemory",
    name: "Ground Memory",
    spritenum: 671,
    onMemory: "Ground",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Ground") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Ground",
    num: 907,
    gen: 7,
    desc: "Holder's Multi-Attack is Ground type. Holder's attacks of this memory's type have 1.2x power."
  },
  "icememory": {
    id: "icememory",
    name: "Ice Memory",
    spritenum: 681,
    onMemory: "Ice",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Ice") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Ice",
    num: 917,
    gen: 7,
    desc: "Holder's Multi-Attack is Ice type. Holder's attacks of this memory's type have 1.2x power."
  },
  "poisonmemory": {
    id: "poisonmemory",
    name: "Poison Memory",
    spritenum: 670,
    onMemory: "Poison",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Poison") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Poison",
    num: 906,
    gen: 7,
    desc: "Holder's Multi-Attack is Poison type. Holder's attacks of this memory's type have 1.2x power."
  },
  "psychicmemory": {
    id: "psychicmemory",
    name: "Psychic Memory",
    spritenum: 680,
    onMemory: "Psychic",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Psychic") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Psychic",
    num: 916,
    gen: 7,
    desc: "Holder's Multi-Attack is Psychic type. Holder's attacks of this memory's type have 1.2x power."
  },
  "rockmemory": {
    id: "rockmemory",
    name: "Rock Memory",
    spritenum: 672,
    onMemory: "Rock",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Rock") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Rock",
    num: 908,
    gen: 7,
    desc: "Holder's Multi-Attack is Rock type. Holder's attacks of this memory's type have 1.2x power."
  },
  "steelmemory": {
    id: "steelmemory",
    name: "Steel Memory",
    spritenum: 675,
    onMemory: "Steel",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Steel") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Steel",
    num: 911,
    gen: 7,
    desc: "Holder's Multi-Attack is Steel type. Holder's attacks of this memory's type have 1.2x power."
  },
  "watermemory": {
    id: "watermemory",
    name: "Water Memory",
    spritenum: 677,
    onMemory: "Water",
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem: function(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Water",
    num: 913,
    gen: 7,
    desc: "Holder's Multi-Attack is Water type. Holder's attacks of this memory's type have 1.2x power."
  },
  burndrive: {
    name: "Burn Drive",
    spritenum: 54,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 649 || pokemon.baseSpecies.num === 649) {
        return false;
      }
      return true;
    },
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Fire") {
        return this.chainModify([4915, 4096]);
      }
    },
    onDrive: "Fire",
    forcedForme: "Genesect-Burn",
    itemUser: ["Genesect-Burn"],
    num: 118,
    gen: 5
  },
  chilldrive: {
    name: "Chill Drive",
    spritenum: 67,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 649 || pokemon.baseSpecies.num === 649) {
        return false;
      }
      return true;
    },
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Ice") {
        return this.chainModify([4915, 4096]);
      }
    },
    onDrive: "Ice",
    forcedForme: "Genesect-Chill",
    itemUser: ["Genesect-Chill"],
    num: 119,
    gen: 5
  },
  dousedrive: {
    name: "Douse Drive",
    spritenum: 103,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 649 || pokemon.baseSpecies.num === 649) {
        return false;
      }
      return true;
    },
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Water") {
        return this.chainModify([4915, 4096]);
      }
    },
    onDrive: "Water",
    forcedForme: "Genesect-Douse",
    itemUser: ["Genesect-Douse"],
    num: 116,
    gen: 5
  },
  shockdrive: {
    name: "Shock Drive",
    spritenum: 442,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 649 || pokemon.baseSpecies.num === 649) {
        return false;
      }
      return true;
    },
    onBasePowerPriority: 6,
    onBasePower: function(basePower, user, target, move) {
      if (move.type === "Electric") {
        return this.chainModify([4915, 4096]);
      }
    },
    onDrive: "Electric",
    forcedForme: "Genesect-Shock",
    itemUser: ["Genesect-Shock"],
    num: 117,
    gen: 5
  }
};
//# sourceMappingURL=items.js.map
