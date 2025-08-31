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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  earthpower: {
    inherit: true,
    isNonstandard: "Past"
  },
  flipturn: {
    inherit: true,
    isNonstandard: "Past"
  },
  freezedry: {
    inherit: true,
    isNonstandard: "Past"
  },
  icebeam: {
    inherit: true,
    isNonstandard: "Past"
  },
  knockoff: {
    inherit: true,
    isNonstandard: "Past"
  },
  spikes: {
    inherit: true,
    isNonstandard: "Past"
  },
  taunt: {
    inherit: true,
    isNonstandard: "Past"
  },
  thunderwave: {
    inherit: true,
    isNonstandard: "Past"
  },
  toxic: {
    inherit: true,
    isNonstandard: "Past"
  },
  voltswitch: {
    inherit: true,
    isNonstandard: "Past"
  }
};
//# sourceMappingURL=moves.js.map
