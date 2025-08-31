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
  // abilities modified to interact with Eternal Krokorok's Kleptomania
  magician: {
    onAfterMoveSecondarySelf(source, target, move) {
      if (!move || !target || source.switchFlag === true)
        return;
      if (target !== source && move.category !== "Status") {
        if (source.item || source.volatiles["gem"] || move.id === "fling")
          return;
        const yourItem = target.takeItem(source);
        if (!yourItem)
          return;
        if (!source.setItem(yourItem)) {
          target.item = yourItem.id;
          return;
        }
        this.add("-item", source, yourItem, "[from] ability: Magician", "[of] " + target);
        if (source.timesStolen)
          source.timesStolen++;
        else
          source.timesStolen = 1;
      }
    },
    flags: {},
    name: "Magician",
    rating: 1,
    num: 170
  },
  pickpocket: {
    onAfterMoveSecondary(target, source, move) {
      if (source && source !== target && move?.flags["contact"]) {
        if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
          return;
        }
        const yourItem = source.takeItem(target);
        if (!yourItem) {
          return;
        }
        if (!target.setItem(yourItem)) {
          source.item = yourItem.id;
          return;
        }
        this.add("-enditem", source, yourItem, "[silent]", "[from] ability: Pickpocket", "[of] " + source);
        this.add("-item", target, yourItem, "[from] ability: Pickpocket", "[of] " + source);
        if (source.timesStolen)
          source.timesStolen++;
        else
          source.timesStolen = 1;
      }
    },
    flags: {},
    name: "Pickpocket",
    rating: 1,
    num: 124
  }
};
//# sourceMappingURL=abilities.js.map
