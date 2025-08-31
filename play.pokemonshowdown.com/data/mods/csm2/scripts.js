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
    excludeStandardTiers: true
  },
  init() {
    this.modData("Learnsets", "solrock").learnset.shoreup = ["9L1"];
    this.modData("Learnsets", "solrock").learnset.bodypress = ["9L1"];
    this.modData("Learnsets", "solrock").learnset.superpower = ["9L1"];
    this.modData("Learnsets", "solrock").learnset.circlethrow = ["9L1"];
    this.modData("Learnsets", "solrock").learnset.uturn = ["9L1"];
    delete this.modData("Learnsets", "solrock").learnset.psychic;
    delete this.modData("Learnsets", "solrock").learnset.psyshock;
    delete this.modData("Learnsets", "solrock").learnset.zenheadbutt;
    delete this.modData("Learnsets", "solrock").learnset.hypnosis;
    delete this.modData("Learnsets", "solrock").learnset.calmmind;
    delete this.modData("Learnsets", "solrock").learnset.swordsdance;
    delete this.modData("Learnsets", "solrock").learnset.willowisp;
    this.modData("Learnsets", "aegislash").learnset.painsplit = ["9L1"];
    this.modData("Learnsets", "aegislash").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "aegislash").learnset.toxicspikes = ["9L1"];
    this.modData("Learnsets", "aegislash").learnset.corrosivegas = ["9L1"];
    this.modData("Learnsets", "aegislash").learnset.purify = ["9L1"];
    this.modData("Learnsets", "solgaleo").learnset.aurasphere = ["9L1"];
    this.modData("Learnsets", "solgaleo").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "solgaleo").learnset.voltswitch = ["9L1"];
    delete this.modData("Learnsets", "solgaleo").learnset.heatcrash;
    delete this.modData("Learnsets", "solgaleo").learnset.flareblitz;
    delete this.modData("Learnsets", "solgaleo").learnset.fireblast;
    delete this.modData("Learnsets", "solgaleo").learnset.flamethrower;
    delete this.modData("Learnsets", "solgaleo").learnset.mysticalfire;
    delete this.modData("Learnsets", "solgaleo").learnset.knockoff;
    this.modData("Learnsets", "komala").learnset.slackoff = ["9L1"];
    this.modData("Learnsets", "komala").learnset.spiritbreak = ["9L1"];
    delete this.modData("Learnsets", "komala").learnset.bulkup;
    delete this.modData("Learnsets", "komala").learnset.swordsdance;
    delete this.modData("Learnsets", "komala").learnset.wish;
    this.modData("Learnsets", "zangoose").learnset.pyroball = ["9L1"];
    delete this.modData("Learnsets", "zangoose").learnset.closecombat;
    delete this.modData("Learnsets", "zangoose").learnset.lowkick;
    this.modData("Learnsets", "chandelure").learnset.scorchingsands = ["9L1"];
    this.modData("Learnsets", "chandelure").learnset.blueflare = ["9L1"];
    delete this.modData("Learnsets", "chandelure").learnset.calmmind;
    delete this.modData("Learnsets", "chandelure").learnset.energyball;
    delete this.modData("Learnsets", "chandelure").learnset.solarbeam;
    delete this.modData("Learnsets", "litwick").learnset.calmmind;
    delete this.modData("Learnsets", "litwick").learnset.energyball;
    delete this.modData("Learnsets", "litwick").learnset.solarbeam;
    delete this.modData("Learnsets", "lampent").learnset.calmmind;
    delete this.modData("Learnsets", "lampent").learnset.energyball;
    delete this.modData("Learnsets", "lampent").learnset.solarbeam;
    this.modData("Learnsets", "carracosta").learnset.darkpulse = ["9L1"];
    this.modData("Learnsets", "carracosta").learnset.spikes = ["9L1"];
    this.modData("Learnsets", "carracosta").learnset.obstruct = ["9L1"];
    delete this.modData("Learnsets", "carracosta").learnset.ironhead;
    delete this.modData("Learnsets", "carracosta").learnset.stoneedge;
    delete this.modData("Learnsets", "carracosta").learnset.rockslide;
    delete this.modData("Learnsets", "carracosta").learnset.stealthrock;
    delete this.modData("Learnsets", "carracosta").learnset.rockblast;
    delete this.modData("Learnsets", "carracosta").learnset.focusblast;
    delete this.modData("Learnsets", "carracosta").learnset.earthpower;
    delete this.modData("Learnsets", "carracosta").learnset.aquajet;
    delete this.modData("Learnsets", "carracosta").learnset.ironhead;
    delete this.modData("Learnsets", "tirtouga").learnset.stoneedge;
    delete this.modData("Learnsets", "tirtouga").learnset.rockslide;
    delete this.modData("Learnsets", "tirtouga").learnset.stealthrock;
    delete this.modData("Learnsets", "tirtouga").learnset.rockblast;
    delete this.modData("Learnsets", "tirtouga").learnset.focusblast;
    delete this.modData("Learnsets", "tirtouga").learnset.earthpower;
    delete this.modData("Learnsets", "tirtouga").learnset.aquajet;
    this.modData("Learnsets", "overqwil").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "overqwil").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "overqwil").learnset.darkpulse = ["9L1"];
    this.modData("Learnsets", "omastar").learnset.earthquake = ["9L1"];
    this.modData("Learnsets", "omastar").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "omastar").learnset.bulldoze = ["9L1"];
    this.modData("Learnsets", "omastar").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "omastar").learnset.shoreup = ["9L1"];
    delete this.modData("Learnsets", "omastar").learnset.stealthrock;
    delete this.modData("Learnsets", "omastar").learnset.toxicspikes;
    delete this.modData("Learnsets", "omastar").learnset.rockblast;
    delete this.modData("Learnsets", "omastar").learnset.stoneedge;
    delete this.modData("Learnsets", "omastar").learnset.rockslide;
    delete this.modData("Learnsets", "omastar").learnset.shellsmash;
    this.modData("Learnsets", "pichu").learnset.extremespeed = ["9L1"];
    this.modData("Learnsets", "pichu").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "pichu").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "virizion").learnset.anchorshot = ["9L1"];
    this.modData("Learnsets", "virizion").learnset.leechseed = ["9L1"];
    this.modData("Learnsets", "virizion").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "virizion").learnset.hornleech = ["9L1"];
    delete this.modData("Learnsets", "virizion").learnset.closecombat;
    this.modData("Learnsets", "eiscue").learnset.flashcannon = ["9L1"];
    this.modData("Learnsets", "eiscue").learnset.nastyplot = ["9L1"];
    this.modData("Learnsets", "eiscue").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "sandyshocks").learnset.thousandwaves = ["9L1"];
    this.modData("Learnsets", "lumineon").learnset.roost = ["9L1"];
    this.modData("Learnsets", "lumineon").learnset.whirlwind = ["9L1"];
    this.modData("Learnsets", "talonflame").learnset.lavaplume = ["9L1"];
    delete this.modData("Learnsets", "talonflame").learnset.uturn;
    this.modData("Learnsets", "onix").learnset.clangingscales = ["9L1"];
    this.modData("Learnsets", "onix").learnset.dracometeor = ["9L1"];
    this.modData("Learnsets", "onix").learnset.outrage = ["9L1"];
    this.modData("Learnsets", "onix").learnset.powergem = ["9L1"];
    this.modData("Learnsets", "onix").learnset.scaleshot = ["9L1"];
    this.modData("Learnsets", "onix").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "chiyu").learnset.recover = ["9L1"];
    this.modData("Learnsets", "chiyu").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.dragontail = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.dracometeor = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.dragonpulse = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.swordsdance = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.superpower = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.stoneedge = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.ironhead = ["9L1"];
    this.modData("Learnsets", "dondozo").learnset.flipturn = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
