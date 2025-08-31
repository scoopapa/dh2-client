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
  brutalswing: {
    inherit: true,
    category: "Special",
    type: "Dark",
    gen: 1
  },
  bulletpunch: {
    inherit: true,
    category: "Physical",
    type: "Steel",
    gen: 1
  },
  darkvoid: {
    // unused
    inherit: true,
    category: "Status",
    type: "Dark",
    gen: 1
  },
  dazzlinggleam: {
    inherit: true,
    category: "Special",
    type: "Fairy",
    gen: 1
  },
  drainingkiss: {
    inherit: true,
    category: "Special",
    type: "Fairy",
    gen: 1
  },
  fairywind: {
    inherit: true,
    category: "Special",
    type: "Fairy",
    gen: 1
  },
  faketears: {
    inherit: true,
    category: "Status",
    type: "Dark",
    target: "normal",
    gen: 1,
    boosts: {
      spd: -2,
      spa: -2
    }
  },
  falsesurrender: {
    inherit: true,
    category: "Special",
    type: "Dark",
    gen: 1
  },
  feintattack: {
    inherit: true,
    category: "Special",
    type: "Dark",
    gen: 1
  },
  irondefense: {
    inherit: true,
    category: "Status",
    type: "Steel",
    gen: 1
  },
  ironhead: {
    inherit: true,
    category: "Physical",
    type: "Steel",
    gen: 1
  },
  kowtowcleave: {
    // filled in manually
    num: -100,
    inherit: true,
    basePower: 85,
    accuracy: true,
    pp: 10,
    type: "Dark",
    target: "normal",
    secondary: null,
    priority: 0,
    name: "Kowtow Cleave"
  },
  magnetbomb: {
    inherit: true,
    category: "Physical",
    type: "Steel",
    gen: 1
  },
  metalsound: {
    inherit: true,
    category: "Status",
    type: "Steel",
    gen: 1,
    boosts: {
      spd: -2,
      spa: -2
    }
  },
  mirrorshot: {
    inherit: true,
    category: "Physical",
    type: "Steel",
    gen: 1
  },
  naturesmadness: {
    // unused
    inherit: true,
    category: "Special",
    type: "Fairy",
    gen: 1
  },
  nastyplot: {
    inherit: true,
    boosts: {
      spd: 2,
      spa: 2
    },
    category: "Status",
    type: "Dark",
    gen: 1
  },
  nightslash: {
    inherit: true,
    category: "Special",
    type: "Dark",
    gen: 1
  },
  playrough: {
    inherit: true,
    category: "Special",
    type: "Fairy",
    gen: 1
  },
  ruination: {
    // unused; filled in manually
    num: -101,
    inherit: true,
    ignoreImmunity: true,
    basePower: 1,
    accuracy: 90,
    damageCallback(pokemon, target) {
      return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
    },
    pp: 10,
    type: "Dark",
    target: "normal",
    secondary: null,
    priority: 0,
    name: "Ruination"
  },
  shelter: {
    // unused; filled in manually
    inherit: true,
    category: "Status",
    type: "Steel",
    gen: 1,
    accuracy: true,
    basePower: 0,
    name: "Shelter",
    pp: 10,
    secondary: null,
    target: "self"
  },
  smartstrike: {
    inherit: true,
    category: "Physical",
    type: "Steel",
    gen: 1
  },
  charm: {
    inherit: true,
    type: "Fairy",
    gen: 1
  },
  sweetkiss: {
    inherit: true,
    category: "Status",
    type: "Fairy",
    gen: 1
  },
  // Prototype Move restorations begin here.
  powdersnow: {
    // copypasted from modern
    inherit: true,
    num: 181,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Powder Snow",
    pp: 25,
    priority: 0,
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    // reduces any chance of fuckery
    type: "Ice",
    gen: 1
  },
  uppercut: {
    // copypasted from modern
    inherit: true,
    num: 182,
    accuracy: 80,
    basePower: 55,
    category: "Physical",
    name: "Uppercut",
    pp: 15,
    priority: 0,
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fighting",
    gen: 1,
    shortDesc: "No additional effect."
  }
};
//# sourceMappingURL=moves.js.map
