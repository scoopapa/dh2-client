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
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["NS", "Extinct"]
  },
  init() {
    this.modData("Learnsets", "eelektross").learnset.earthpower = ["9L1"];
    this.modData("Learnsets", "eelektross").learnset.earthquake = ["9L1"];
    this.modData("Learnsets", "eelektross").learnset.sludgebomb = ["9L1"];
    this.modData("Learnsets", "eelektross").learnset.stealthrock = ["9L1"];
    this.modData("Learnsets", "eelektross").learnset.spikes = ["9L1"];
    this.modData("Learnsets", "eelektross").learnset.toxic = ["9L1"];
    this.modData("Learnsets", "bouffalant").learnset.bodypress = ["9L1"];
    this.modData("Learnsets", "bouffalant").learnset.bulkup = ["9L1"];
    this.modData("Learnsets", "bouffalant").learnset.headlongrush = ["9L1"];
    this.modData("Learnsets", "bouffalant").learnset.stealthrock = ["9L1"];
    this.modData("Learnsets", "crabominable").learnset.iceshard = ["9L1"];
    this.modData("Learnsets", "crabominable").learnset.machpunch = ["9L1"];
    this.modData("Learnsets", "crabominable").learnset.iciclespear = ["9L1"];
    this.modData("Learnsets", "crabominable").learnset.swordsdance = ["9L1"];
    this.modData("Learnsets", "crabominable").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "klawf").learnset.crunch = ["9L1"];
    this.modData("Learnsets", "klawf").learnset.darkpulse = ["9L1"];
    this.modData("Learnsets", "klawf").learnset.partingshot = ["9L1"];
    this.modData("Learnsets", "klawf").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "jellicent").learnset.drainingkiss = ["9L1"];
    this.modData("Learnsets", "jellicent").learnset.teleport = ["9L1"];
    this.modData("Learnsets", "mandibuzz").learnset.earthquake = ["9L1"];
    this.modData("Learnsets", "mandibuzz").learnset.bulkup = ["9L1"];
    this.modData("Learnsets", "barraskewda").learnset.playrough = ["9L1"];
    this.modData("Learnsets", "barraskewda").learnset.spiritbreak = ["9L1"];
    this.modData("Learnsets", "barraskewda").learnset.icespinner = ["9L1"];
    this.modData("Learnsets", "barraskewda").learnset.switcheroo = ["9L1"];
    this.modData("Learnsets", "barraskewda").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "victreebel").learnset.gunkshot = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
