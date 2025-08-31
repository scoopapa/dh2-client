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
  RESTORATIVE_BERRIES: () => RESTORATIVE_BERRIES,
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const RESTORATIVE_BERRIES = /* @__PURE__ */ new Set([
  "leppaberry",
  "aguavberry",
  "enigmaberry",
  "figyberry",
  "iapapaberry",
  "magoberry",
  "sitrusberry",
  "wikiberry",
  "oranberry"
]);
const Scripts = {
  gen: 9,
  teambuilderConfig: {},
  init() {
  },
  pokemon: {
    getBestStatExceptSpeed(unboosted, unmodified) {
      let statName = "atk";
      let bestStat = 0;
      const stats = ["atk", "def", "spa", "spd"];
      for (const i of stats) {
        if (this.getStat(i, unboosted, unmodified) > bestStat) {
          statName = i;
          bestStat = this.getStat(i, unboosted, unmodified);
        }
      }
      return statName;
    },
    setItem(item, source, effect) {
      if (!this.hp)
        return false;
      if (this.itemState.knockedOff)
        return false;
      if (typeof item === "string")
        item = this.battle.dex.items.get(item);
      const effectid = this.battle.effect ? this.battle.effect.id : "";
      if (RESTORATIVE_BERRIES.has("leppaberry")) {
        const inflicted = ["trick", "switcheroo"].includes(effectid);
        const external = inflicted && source && !source.isAlly(this);
        this.pendingStaleness = external ? "external" : "internal";
      } else {
        this.pendingStaleness = void 0;
      }
      const oldItem = this.getItem();
      const oldItemState = this.itemState;
      this.item = item.id;
      this.itemState = { id: item.id, target: this };
      if (oldItem.exists)
        this.battle.singleEvent("End", oldItem, oldItemState, this);
      if (item.id && this.isActive) {
        this.battle.singleEvent("Start", item, this.itemState, this, source, effect);
      }
      return true;
    }
  }
};
//# sourceMappingURL=scripts.js.map
