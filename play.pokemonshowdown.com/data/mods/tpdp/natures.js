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
var natures_exports = {};
__export(natures_exports, {
  Natures: () => Natures
});
module.exports = __toCommonJS(natures_exports);
const Natures = {
  red: {
    name: "Red",
    plus: "atk"
  },
  blue: {
    name: "Blue",
    plus: "def"
  },
  black: {
    name: "Black",
    plus: "spa"
  },
  white: {
    name: "White",
    plus: "spd"
  },
  green: {
    name: "Green",
    plus: "spe"
  }
};
//# sourceMappingURL=natures.js.map
