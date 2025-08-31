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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
var import_dex = require("@pkmn/dex");
var import_sets = require("@pkmn/sets");
const Scripts = {
  inherit: "gen1",
  gen: 1,
  init() {
    for (const i in this.data.Pokedex) {
      this.data.Pokedex[i].gender = "N";
      this.data.Pokedex[i].eggGroups = null;
    }
    const teamsFile = require("fs").readFileSync("random-teams.txt").toString("utf-8");
    const teams = import_sets.Sets.importTeams(teamsFile, import_dex.Dex.forGen(1));
  }
};
//# sourceMappingURL=scripts.js.map
