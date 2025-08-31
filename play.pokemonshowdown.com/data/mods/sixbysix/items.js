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
  cornerstonemask: {
    name: "Cornerstone Mask",
    spritenum: 758,
    fling: {
      basePower: 60
    },
    num: 2406,
    gen: 9,
    desc: "No competitive use."
  },
  hearthflamemask: {
    name: "Hearthflame Mask",
    spritenum: 760,
    fling: {
      basePower: 60
    },
    desc: "No competitive use.",
    num: 2408,
    gen: 9
  },
  wellspringmask: {
    name: "Wellspring Mask",
    spritenum: 759,
    fling: {
      basePower: 60
    },
    desc: "No competitive use.",
    num: 2407,
    gen: 9
  }
};
//# sourceMappingURL=items.js.map
