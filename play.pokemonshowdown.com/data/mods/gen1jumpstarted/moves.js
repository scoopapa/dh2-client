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
  brickbreak: {
    inherit: true,
    basePower: 65,
    onTryHit(pokemon) {
      pokemon.removeVolatile("reflect");
      pokemon.removeVolatile("lightscreen");
    },
    gen: 1
  },
  anchorshot: {
    inherit: true,
    type: "Ghost",
    gen: 1
  },
  freezingglare: {
    inherit: true,
    basePower: 80,
    gen: 1
  },
  thunderouskick: {
    inherit: true,
    basePower: 80,
    gen: 1
  },
  fierywrath: {
    inherit: true,
    basePower: 80,
    type: "Ghost",
    category: "Physical",
    gen: 1
  },
  bugbuzz: {
    inherit: true,
    category: "Physical",
    secondary: {
      chance: 10,
      boosts: {
        spa: -1,
        spd: -1
      }
    },
    gen: 1
  },
  torchsong: {
    inherit: true,
    basePower: 60,
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spa: 1,
          spd: 1
        }
      }
    },
    gen: 1
  },
  woodhammer: {
    inherit: true,
    category: "Special",
    gen: 1
  },
  aquacutter: {
    inherit: true,
    category: "Special",
    gen: 1
  },
  quiverdance: {
    inherit: true,
    gen: 1
  },
  meteorbeam: {
    inherit: true,
    category: "Physical",
    basePower: 130,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile("twoturnmove")) {
        attacker.removeVolatile("invulnerability");
        return;
      }
      this.add("-prepare", attacker, move.name);
      attacker.addVolatile("twoturnmove", defender);
      this.boost({ spa: 1, spd: 1 }, attacker, attacker, move);
      return null;
    },
    gen: 1
  },
  diamondstorm: {
    inherit: true,
    self: {
      chance: 50,
      boosts: {
        def: 1
      }
    },
    target: "normal",
    gen: 1
  }
};
//# sourceMappingURL=moves.js.map
