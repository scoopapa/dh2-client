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
  dracoplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Dragon") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  dreadplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Dark") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  earthplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Ground") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  fistplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Fighting") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  flameplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Fire") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  icicleplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Ice") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  insectplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Bug") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  ironplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Steel") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  meadowplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Grass") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  pixieplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Fairy") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  skyplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Flying") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  splashplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Water") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  spookyplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Ghost") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  stoneplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Rock") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  toxicplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Poison") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  },
  zapplate: {
    inherit: true,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Electric") {
        if (user.volatiles["cynthiaboost"])
          return this.chainModify([5324, 4096]);
        return this.chainModify([4915, 4096]);
      }
    }
  }
};
//# sourceMappingURL=items.js.map
