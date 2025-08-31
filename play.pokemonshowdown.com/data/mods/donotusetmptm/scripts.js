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
const Scripts = {
  gen: 9,
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["DoNU", "DoNU UUBL", "DoNU UU", "DoNU RUBL", "DoNU RU", "DoNU Uber"]
  },
  init() {
    delete this.modData("Learnsets", "seedot").learnset.suckerpunch;
    delete this.modData("Learnsets", "numel").learnset.yawn;
    this.modData("Learnsets", "numel").learnset.slackoff = ["9L1"];
    this.modData("Learnsets", "seedot").learnset.pursuit = ["9L1"];
    this.modData("Learnsets", "seedot").learnset.woodhammer = ["9L1"];
    this.modData("Learnsets", "snom").learnset.aurorabeam = ["9L1"];
    this.modData("Learnsets", "snom").learnset.blizzard = ["9L1"];
    this.modData("Learnsets", "snom").learnset.dazzlinggleam = ["9L1"];
    this.modData("Learnsets", "snom").learnset.gigadrain = ["9L1"];
    this.modData("Learnsets", "snom").learnset.hiddenpower = ["9L1"];
    this.modData("Learnsets", "snom").learnset.icebeam = ["9L1"];
    this.modData("Learnsets", "snom").learnset.icespinner = ["9L1"];
    this.modData("Learnsets", "snom").learnset.infestation = ["9L1"];
    this.modData("Learnsets", "snom").learnset.leechlife = ["9L1"];
    this.modData("Learnsets", "snom").learnset.lightscreen = ["9L1"];
    this.modData("Learnsets", "snom").learnset.mist = ["9L1"];
    this.modData("Learnsets", "snom").learnset.playrough = ["9L1"];
    this.modData("Learnsets", "snom").learnset.reflect = ["9L1"];
    this.modData("Learnsets", "snom").learnset.safeguard = ["9L1"];
    this.modData("Learnsets", "snom").learnset.snowscape = ["9L1"];
    this.modData("Learnsets", "snom").learnset.stunspore = ["9L1"];
    this.modData("Learnsets", "snom").learnset.swift = ["9L1"];
    this.modData("Learnsets", "snom").learnset.waterpulse = ["9L1"];
    this.modData("Learnsets", "snom").learnset.weatherball = ["9L1"];
    delete this.modData("Learnsets", "flittle").learnset.agility;
    delete this.modData("Learnsets", "smeargle").learnset.sketch;
    this.modData("Learnsets", "dewpider").learnset.silktrap = ["9L1"];
    this.modData("Learnsets", "dewpider").learnset.toxicthread = ["9L1"];
    this.modData("Learnsets", "flittle").learnset.airslash = ["9L1"];
    this.modData("Learnsets", "flittle").learnset.bravebird = ["9L1"];
    this.modData("Learnsets", "flittle").learnset.shadowball = ["9L1"];
    this.modData("Learnsets", "flittle").learnset.teleport = ["9L1"];
    this.modData("Learnsets", "diglettalola").learnset.voltswitch = ["9L1"];
    this.modData("Learnsets", "diglettalola").learnset.rapidspin = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
