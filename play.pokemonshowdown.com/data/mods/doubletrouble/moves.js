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
  confoundingcrystal: {
    // TODO
    num: -1e3,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Confounding Crystal",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  mineraldrain: {
    // TODO
    num: -1001,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Mineral Drain",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  nullaurora: {
    // TODO
    num: -1002,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Null Aurora",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  graverobbing: {
    // TODO
    num: -1003,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Grave Robbing",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  unityveil: {
    // TODO
    num: -1004,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Unity Veil",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  conduct: {
    // TODO
    num: -1005,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Conduct",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  canalsurge: {
    // TODO
    num: -1006,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Canal Surge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  stickyfingers: {
    // TODO
    num: -1007,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Sticky Fingers",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  somnawave: {
    // TODO
    num: -1008,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Somnawave",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  earthshatteringelegy: {
    // TODO
    num: -1009,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Earth-Shattering Elegy",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  },
  acidrain: {
    // TODO
    num: -1010,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Acid Rain",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, source) {
      this.add("-anim", source, "Tackle", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough",
    shortDesc: "Placeholder"
  }
};
//# sourceMappingURL=moves.js.map
