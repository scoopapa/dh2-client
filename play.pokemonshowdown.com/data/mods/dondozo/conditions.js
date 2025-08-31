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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  gyeahvictim: {
    name: "gyeah-victim",
    noCopy: true,
    onStart(pokemon) {
      this.boost({ atk: -2, spa: -2, spe: -2, def: -2, spd: -2 }, pokemon);
    }
  },
  // Tatsugiri
  gyeahperpetrator: {
    name: "gyeah-perpetrator",
    noCopy: true,
    // Override No Guard
    onInvulnerabilityPriority: 2,
    onInvulnerability(target, source, move) {
      return false;
    },
    onBeforeTurn(pokemon) {
      this.queue.cancelAction(pokemon);
    }
  }
};
//# sourceMappingURL=conditions.js.map
