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
  // slate 1
  souldew: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      return basePower;
    },
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "Latias" || pokemon.baseSpecies.baseSpecies === "Latios") {
        return this.chainModify(1.3);
      }
    },
    onModifySpD(spd, pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "Latias" || pokemon.baseSpecies.baseSpecies === "Latios") {
        return this.chainModify(1.5);
      }
    },
    shortDesc: "If held by a Latias or Latios, 1.3x SpA and 1.5x SpD, and allows them to mega evolve."
  },
  boosterenergy: {
    inherit: true,
    onUpdate(pokemon) {
      if (!this.effectState.started || pokemon.transformed)
        return;
      if (this.queue.peek(true)?.choice === "runSwitch")
        return;
      if (pokemon.hasAbility("protosynthesis") && !this.field.isWeather("sunnyday")) {
        pokemon.addVolatile("protosynthesis");
      }
      if (pokemon.hasAbility("quarkdrive") && !this.field.isTerrain("electricterrain")) {
        pokemon.addVolatile("quarkdrive");
      }
    },
    onTakeItem(item, source) {
      return false;
    },
    shortDesc: "If held by a Paradox Pok\xE9mon, activates the Protosynthesis or Quark Drive abilities."
  },
  meteorite: {
    name: "Meteorite",
    spritenum: 583,
    megaStone: "Rayquaza-Mega",
    megaEvolves: "Rayquaza",
    itemUser: ["Rayquaza"],
    onTakeItem(item, source) {
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: -1001,
    gen: 9,
    desc: "If held by a Rayquaza, this item allows it to Mega Evolve in battle."
  }
};
//# sourceMappingURL=items.js.map
