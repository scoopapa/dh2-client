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
  Conditions: () => Conditions,
  getName: () => getName
});
module.exports = __toCommonJS(conditions_exports);
var import_lib = require("../../../lib");
var import_dex_data = require("../../../sim/dex-data");
const usergroups = {};
const usergroupData = (0, import_lib.FS)("config/usergroups.csv").readIfExistsSync().split("\n");
for (const row of usergroupData) {
  if (!(0, import_dex_data.toID)(row))
    continue;
  const cells = row.split(",");
  if (cells.length > 3)
    throw new Error(`Invalid entry when parsing usergroups.csv`);
  usergroups[(0, import_dex_data.toID)(cells[0])] = cells[1].trim() || " ";
}
function getName(name) {
  const userid = (0, import_dex_data.toID)(name);
  if (!userid)
    throw new Error("No/Invalid name passed to getSymbol");
  const group = usergroups[userid] || " ";
  return group + name;
}
const Conditions = {
  snow: {
    name: "Snow",
    effectType: "Weather",
    duration: 0,
    onFieldStart(field, source, effect) {
      this.add("-weather", "Snow");
      this.effectState.cooldown = 5;
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Snow", "[upkeep]");
      if (this.field.isWeather("snow"))
        this.eachEvent("Weather");
      let probability = 4;
      if (this.field.pseudoWeather.milkandcookies)
        probability = 2;
      if (this.effectState.cooldown === 0 && this.randomChance(1, probability)) {
        this.add("-message", "Santa came to visit!");
        const side1 = this.sides[0];
        const side2 = this.sides[1];
        if (side1.karma > side2.karma) {
          side1.reward();
          side2.punish();
        } else if (side2.karma > side1.karma) {
          side2.reward();
          side1.punish();
        } else {
          this.add("-message", "Both sides have the same karma, so Santa left.");
        }
        this.effectState.cooldown = 5;
      } else if (this.effectState.cooldown !== 0)
        this.effectState.cooldown--;
    }
  },
  fsb: {
    name: "fsb",
    start: "  [Pokemon] was chilled!",
    alreadyStarted: "  [POKEMON] is already chilled!",
    end: "  [POKEMON] warmed up!",
    endFromItem: "  [POKEMON]'s [ITEM] warmed it up!",
    endFromMove: "  [POKEMON]'s [MOVE] warmed it up!",
    cant: "[POKEMON] is chilled!",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "Frostbite", "[silent]");
      this.add("-message", `${target.name} was frostbitten!`);
    },
    onResidualOrder: 9,
    onResidual(pokemon) {
      this.damage(pokemon.baseMaxhp / 16);
    },
    onModifySpA(spa, pokemon) {
      return this.chainModify(0.5);
    }
  }
};
//# sourceMappingURL=conditions.js.map
