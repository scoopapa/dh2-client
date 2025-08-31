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
  // coding the max meter side conditions (AKA I really should've worked off of Stockpile)
  maxmeter1: {
    shortDesc: "The first level of Max Meter.",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Max Meter 1",
    pp: 1,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "maxmeter1",
    condition: {
      onAfterMoveSecondarySelf(source, target, move) {
        if (!move || !target)
          return;
        if (source.hasType(move.type)) {
          source.side.removeSideCondition("maxmeter1");
          source.side.addSideCondition("maxmeter2");
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Max Meter 1");
        this.add("-message", `This side has 1 level of Max Meter!`);
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Max Meter 1");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Fighting"
  },
  maxmeter2: {
    shortDesc: "The second level of Max Meter.",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Max Meter 2",
    pp: 1,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "maxmeter2",
    condition: {
      onAfterMoveSecondarySelf(source, target, move) {
        if (!move || !target)
          return;
        if (source.hasType(move.type)) {
          source.side.removeSideCondition("maxmeter2");
          source.side.addSideCondition("maxmeter3");
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Max Meter 2");
        this.add("-message", `This side has 2 levels of Max Meter!`);
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Max Meter 2");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Fighting"
  },
  maxmeter3: {
    shortDesc: "The third level of Max Meter.",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Max Meter 3",
    pp: 1,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "maxmeter3",
    condition: {
      onAfterMoveSecondarySelf(source, target, move) {
        if (!move || !target)
          return;
        if (source.hasType(move.type)) {
          source.side.removeSideCondition("maxmeter3");
          source.side.addSideCondition("maxmeter4");
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Max Meter 3");
        this.add("-message", `This side has 3 levels of Max Meter!`);
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Max Meter 3");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Fighting"
  },
  maxmeter4: {
    shortDesc: "The fourth level of Max Meter.",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Max Meter 4",
    pp: 1,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "maxmeter4",
    condition: {
      onAfterMoveSecondarySelf(source, target, move) {
        if (!move || !target)
          return;
        if (source.hasType(move.type)) {
          source.side.removeSideCondition("maxmeter4");
          source.side.addSideCondition("maxmeter5");
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Max Meter 4");
        this.add("-message", `This side has 4 levels of Max Meter!`);
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Max Meter 4");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Fighting"
  },
  maxmeter5: {
    shortDesc: "The fifth level of Max Meter.",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Max Meter 5",
    pp: 1,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "maxmeter5",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Max Meter 5");
        this.add("-message", `This side has 5 levels of Max Meter!`);
        this.add("-message", `The Max Meter is now maxed out! This side can now Dynamax!`);
        side.dynamaxUsed = false;
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Max Meter 5");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Fighting"
  },
  dynamaxused: {
    shortDesc: "Prevents Dynamax from being used multiple times (but it's not used here).",
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dynamax Used",
    pp: 5,
    priority: 0,
    flags: {},
    noSketch: true,
    sideCondition: "dynamaxused",
    condition: {},
    secondary: null,
    target: "normal",
    type: "Normal"
  }
};
//# sourceMappingURL=moves.js.map
