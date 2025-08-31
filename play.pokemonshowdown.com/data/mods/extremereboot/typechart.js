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
var typechart_exports = {};
__export(typechart_exports, {
  TypeChart: () => TypeChart
});
module.exports = __toCommonJS(typechart_exports);
const TypeChart = {
  Spring: {
    damageTaken: {
      Spring: 0,
      Summer: 1,
      Autumn: 0,
      Winter: 3,
      Night: 0,
      Earth: 0,
      Sky: 0,
      Sea: 2,
      Serenity: 0,
      Storm: 1,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Summer: {
    damageTaken: {
      brn: 3,
      Spring: 2,
      Summer: 0,
      Autumn: 1,
      Winter: 0,
      Night: 2,
      Earth: 0,
      Sky: 0,
      Sea: 1,
      Serenity: 0,
      Storm: 1,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Autumn: {
    damageTaken: {
      Spring: 0,
      Summer: 2,
      Autumn: 0,
      Winter: 1,
      Night: 0,
      Earth: 2,
      Sky: 0,
      Sea: 1,
      Serenity: 0,
      Storm: 0,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Winter: {
    damageTaken: {
      frz: 3,
      Spring: 1,
      Summer: 1,
      Autumn: 2,
      Winter: 0,
      Night: 0,
      Earth: 0,
      Sky: 0,
      Sea: 0,
      Serenity: 1,
      Storm: 0,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Night: {
    damageTaken: {
      slp: 3,
      Spring: 0,
      Summer: 1,
      Autumn: 0,
      Winter: 1,
      Night: 2,
      Earth: 0,
      Sky: 0,
      Sea: 0,
      Serenity: 2,
      Storm: 0,
      Folklore: 2,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Earth: {
    damageTaken: {
      Spring: 0,
      Summer: 0,
      Autumn: 1,
      Winter: 1,
      Night: 0,
      Earth: 2,
      Sky: 0,
      Sea: 2,
      Serenity: 0,
      Storm: 2,
      Folklore: 0,
      Manmade: 2,
      Typeless: 0
    },
    HPivs: {}
  },
  Sky: {
    damageTaken: {
      Spring: 0,
      Summer: 0,
      Autumn: 0,
      Winter: 1,
      Night: 0,
      Earth: 3,
      Sky: 2,
      Sea: 2,
      Serenity: 0,
      Storm: 0,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Sea: {
    damageTaken: {
      Spring: 1,
      Summer: 2,
      Autumn: 2,
      Winter: 0,
      Night: 0,
      Earth: 0,
      Sky: 1,
      Sea: 2,
      Serenity: 0,
      Storm: 0,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Serenity: {
    damageTaken: {
      Spring: 2,
      Summer: 2,
      Autumn: 2,
      Winter: 2,
      Night: 1,
      Earth: 0,
      Sky: 2,
      Sea: 0,
      Serenity: 2,
      Storm: 3,
      Folklore: 1,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Storm: {
    damageTaken: {
      Spring: 2,
      Summer: 0,
      Autumn: 0,
      Winter: 0,
      Night: 0,
      Earth: 1,
      Sky: 0,
      Sea: 0,
      Serenity: 1,
      Storm: 1,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Folklore: {
    damageTaken: {
      crs: 3,
      Spring: 0,
      Summer: 0,
      Autumn: 0,
      Winter: 0,
      Night: 1,
      Earth: 0,
      Sky: 0,
      Sea: 0,
      Serenity: 2,
      Storm: 0,
      Folklore: 1,
      Manmade: 3,
      Typeless: 0
    },
    HPivs: {}
  },
  Manmade: {
    damageTaken: {
      psn: 3,
      Spring: 0,
      Summer: 0,
      Autumn: 0,
      Winter: 0,
      Night: 0,
      Earth: 1,
      Sky: 0,
      Sea: 0,
      Serenity: 0,
      Storm: 1,
      Folklore: 3,
      Manmade: 0,
      Typeless: 0
    },
    HPivs: {}
  },
  Typeless: {
    damageTaken: {
      Spring: 0,
      Summer: 0,
      Autumn: 0,
      Winter: 0,
      Night: 0,
      Earth: 0,
      Sky: 0,
      Sea: 0,
      Serenity: 0,
      Storm: 0,
      Folklore: 0,
      Manmade: 0,
      Typeless: 0
    }
  }
};
//# sourceMappingURL=typechart.js.map
