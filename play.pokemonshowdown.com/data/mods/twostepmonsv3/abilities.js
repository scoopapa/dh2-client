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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  miracleremedy: {
    name: "Miracle Remedy",
    shortDesc: "Heals the status of the ally switching in.",
    onSwitchOut(pokemon) {
      pokemon.side.addSlotCondition(pokemon, "miracleremedy");
    },
    condition: {
      onSwitchIn(target) {
        if (!target.fainted && target.status) {
          target.cureStatus();
          target.side.removeSlotCondition(target, "miracleremedy");
        }
      }
    }
  },
  cowardly: {
    name: "Cowardly",
    shortDesc: "When stats are lowered, switches out.",
    onAfterEachBoost(boost, target, source, effect) {
      if (!source || target.isAlly(source)) {
        return;
      }
      let statsLowered = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0) {
          statsLowered = true;
        }
      }
      if (statsLowered) {
        target.switchFlag = true;
      }
    }
  },
  gravitationalpull: {
    name: "Gravitational Pull",
    shortDesc: "Sets Gravity on switch-in.",
    onStart(source) {
      this.add("-ability", source, "Gravitational Pull");
      this.field.addPseudoWeather("gravity");
    }
  },
  hoarding: {
    name: "Hoarding",
    shortDesc: "Uses Stockpile at the end of the turn.",
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      this.actions.useMove("Stockpile", pokemon);
    }
  }
};
//# sourceMappingURL=abilities.js.map
