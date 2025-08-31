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
var tags_exports = {};
__export(tags_exports, {
  Tags: () => Tags
});
module.exports = __toCommonJS(tags_exports);
const Tags = {
  sound: {
    name: "Sound",
    desc: "Doesn't affect Soundproof Pok\xE9mon. Boosted by Cacophony. All sound moves also bypass Substitute.",
    moveFilter: (move) => "sound" in move.flags
  },
  powder: {
    name: "Powder",
    desc: "Doesn't affect Grass-type Pok\xE9mon, Overcoat or Immunity Pok\xE9mon, or Safety Goggles holders.",
    moveFilter: (move) => "powder" in move.flags
  },
  fist: {
    name: "Fist",
    desc: "Boosted 1.3x by Iron Fist.",
    moveFilter: (move) => "punch" in move.flags
  },
  bite: {
    name: "Bite",
    desc: "Boosted 1.5x by Strong Jaw.",
    moveFilter: (move) => "bite" in move.flags
  },
  bullet: {
    name: "Shot",
    desc: "Boosted 1.3x by Mega Launcher. Doesn't affect Bulletproof Pok\xE9mon.",
    moveFilter: (move) => "bullet" in move.flags
  },
  bludg: {
    name: "Bludgeon",
    desc: "Boosted 1.5x by Bludgeon.",
    moveFilter: (move) => "bludg" in move.flags
  },
  slicing: {
    name: "Slicing",
    desc: "Boosted 1.3x by Sharpness.",
    moveFilter: (move) => "slicing" in move.flags
  },
  // Tiers
  // -----
  esh: {
    name: "ESH",
    pokemonFilter: (species) => species.tier === "ESH"
  }
};
//# sourceMappingURL=tags.js.map
