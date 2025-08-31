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
  // SANDBOX CONTENT STARTS HERE
  megastone1: {
    name: "Mega Stone 1",
    spritenum: 578,
    onTakeItem(item, source) {
      return false;
    },
    num: -2e3,
    gen: 8,
    desc: "If held by any Pok\xE9mon with a certain nickname, this item allows it to Mega Evolve in battle."
  },
  megastone2: {
    name: "Mega Stone 2",
    spritenum: 578,
    onTakeItem(item, source) {
      return false;
    },
    num: -2001,
    gen: 8,
    desc: "If held by any Pok\xE9mon with a certain nickname, this item allows it to Mega Evolve in battle."
  },
  megastoneh: {
    name: "Mega Stone H",
    spritenum: 578,
    onTakeItem(item, source) {
      return false;
    },
    num: -2003,
    gen: 8,
    desc: "If held by any Pok\xE9mon with a certain nickname, this item allows it to Mega Evolve in battle."
  },
  porygoditez: {
    name: "Porygodite-Z",
    spritenum: 578,
    megaStone: "Porygod-Z-Mega",
    megaEvolves: "Porygon-Z",
    itemUser: ["Porygon-Z"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -5e3,
    gen: 8,
    desc: "Please do not confuse this for Porygonite-Z because it's not that"
  },
  pichunite: {
    name: "Pichunite",
    spritenum: 578,
    megaStone: "Pichu-Spiky-eared-Mega",
    megaEvolves: "Pichu-Spiky-eared",
    itemUser: ["Pichu-Spiky-eared"],
    onTakeItem(item, source) {
      if (source.species.name.startsWith("Pichu-Spiky-eared"))
        return false;
      return true;
    },
    num: -5001,
    gen: 8,
    desc: "If held by a Spiky-eared Pichu, this item allows it to Mega Evolve in battle."
  },
  floettite: {
    name: "Floettite",
    spritenum: 578,
    megaStone: "Floette-Eternal-Mega",
    megaEvolves: "Floette-Eternal",
    itemUser: ["Floette-Eternal"],
    onTakeItem(item, source) {
      if (source.species.name.startsWith("Floette-Eternal"))
        return false;
      return true;
    },
    num: -5002,
    gen: 8,
    desc: "If held by a Floette with an Eternal Flower, this item allows it to Mega Evolve in battle."
  },
  meltanite: {
    name: "Meltanite",
    spritenum: 578,
    megaStone: "Meltan-Mega",
    megaEvolves: "Meltan",
    itemUser: ["Meltan"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -5003,
    gen: 8,
    desc: "If held by a Meltan, this item allows it to Mega Evolve in battle."
  },
  stoutlanditeu: {
    name: "Stoutlandite-U",
    spritenum: 578,
    megaStone: "Stoutland-Mega-U",
    megaEvolves: "Stoutland",
    itemUser: ["Stoutland"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -5004,
    gen: 8,
    desc: "If held by a Stoutland, this item allows it to Mega Evolve differently in battle...!"
  }
};
//# sourceMappingURL=items.js.map
