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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  deoxys: {
    name: "deoxys",
    duration: 1,
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "Deoxys");
    },
    onModifyAtk(atk, pokemon) {
      return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs["atk"] + Math.trunc(pokemon.set.evs["atk"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onModifySpA(spa, pokemon) {
      return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs["spa"] + Math.trunc(pokemon.set.evs["spa"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onModifySpe(spe, pokemon) {
      return Math.trunc(Math.trunc(2 * 150 + pokemon.set.ivs["spe"] + Math.trunc(pokemon.set.evs["spe"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onEnd(target) {
      this.add("-end", target, "Deoxys");
    }
  },
  deoxysatk: {
    name: "deoxysatk",
    duration: 1,
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "Deoxys-Attack");
    },
    onModifyAtk(atk, pokemon) {
      return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs["atk"] + Math.trunc(pokemon.set.evs["atk"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onModifySpA(spa, pokemon) {
      return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs["spa"] + Math.trunc(pokemon.set.evs["spa"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onEnd(target) {
      this.add("-end", target, "Deoxys-Attack");
    }
  },
  deoxysdef: {
    name: "deoxysdef",
    duration: 1,
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "Deoxys-Defense");
    },
    onModifyDef(def, pokemon) {
      return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs["def"] + Math.trunc(pokemon.set.evs["def"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onModifySpD(spd, pokemon) {
      return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs["spd"] + Math.trunc(pokemon.set.evs["spd"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onEnd(target) {
      this.add("-end", target, "Deoxys-Defense");
    }
  },
  deoxysspe: {
    name: "deoxysspe",
    duration: 1,
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "Deoxys-Speed");
    },
    onModifyDef(def, pokemon) {
      return Math.trunc(Math.trunc(2 * 160 + pokemon.set.ivs["def"] + Math.trunc(pokemon.set.evs["def"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onModifySpe(spe, pokemon) {
      return Math.trunc(Math.trunc(2 * 180 + pokemon.set.ivs["spe"] + Math.trunc(pokemon.set.evs["spe"] / 4)) * pokemon.set.level / 100 + 5);
    },
    onEnd(target) {
      this.add("-end", target, "Deoxys-Speed");
    }
  }
};
//# sourceMappingURL=conditions.js.map
