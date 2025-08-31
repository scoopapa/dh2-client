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
  // DESERT GALES, DIAMOND DUST
  moonlight: {
    inherit: true,
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "desertgales":
        case "hail":
        case "diamonddust":
        case "snow":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  morningsun: {
    inherit: true,
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "desertgales":
        case "hail":
        case "diamonddust":
        case "snow":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  shoreup: {
    inherit: true,
    onHit(pokemon) {
      let factor = 0.5;
      if (this.field.isWeather("sandstorm") || this.field.isWeather("desertgales")) {
        factor = 0.667;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  solarbeam: {
    inherit: true,
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "desertgales", "hail", "diamonddust", "snow"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  solarblade: {
    inherit: true,
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "desertgales", "hail", "diamonddust", "snow"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  synthesis: {
    inherit: true,
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "desertgales":
        case "hail":
        case "diamonddust":
        case "snow":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  weatherball: {
    inherit: true,
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move.type = "Water";
          break;
        case "sandstorm":
          move.type = "Rock";
          break;
        case "desertgales":
          move.type = "Ground";
          break;
        case "hail":
        case "diamonddust":
        case "snow":
          move.type = "Ice";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move.basePower *= 2;
          break;
        case "sandstorm":
        case "desertgales":
          move.basePower *= 2;
          break;
        case "hail":
        case "diamonddust":
        case "snow":
          move.basePower *= 2;
          break;
      }
      this.debug("BP: " + move.basePower);
    }
  },
  // JUST DIAMOND DUST
  auroraveil: {
    inherit: true,
    onTry() {
      return this.field.isWeather(["hail", "diamonddust", "snow"]);
    }
  },
  blizzard: {
    inherit: true,
    onModifyMove(move) {
      if (this.field.isWeather(["hail", "diamonddust", "snow"]))
        move.accuracy = true;
    }
  }
};
//# sourceMappingURL=moves.js.map
