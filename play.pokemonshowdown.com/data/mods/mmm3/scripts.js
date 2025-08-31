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
    // for micrometas to only show custom tiers
    excludeStandardTiers: true,
    // only to specify the order of custom tiers
    customTiers: ["MMM3"]
  },
  init() {
    this.modData("Learnsets", "cyclizar").learnset.recover = ["9L1"];
    this.modData("Learnsets", "cyclizar").learnset.toxic = ["9L1"];
    delete this.modData("Learnsets", "cyclizar").learnset.shiftgear;
    this.modData("Learnsets", "electivire").learnset.swordsdance = ["9L1"];
    this.modData("Learnsets", "electivire").learnset.highjumpkick = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.voltswitch = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.thunderbolt = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.slackoff = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.discharge = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.thunderwave = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.spikes = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.knockoff = ["9L1"];
    delete this.modData("Learnsets", "vileplume").learnset.strengthsap;
    delete this.modData("Learnsets", "gloom").learnset.strengthsap;
    delete this.modData("Learnsets", "oddish").learnset.strengthsap;
    this.modData("Learnsets", "metagross").learnset.bulkup = ["9L1"];
    this.modData("Learnsets", "metagross").learnset.photongeyser = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.assurance = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.brutalswing = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.flamewheel = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.grassyglide = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.thief = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.quickattack = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.switcheroo = ["9L1"];
    this.modData("Learnsets", "stunfiskgalar").learnset.swordsdance = ["9L1"];
    this.modData("Learnsets", "moltresgalar").learnset.focusblast = ["9L1"];
    delete this.modData("Learnsets", "moltresgalar").learnset.nastyplot;
    this.modData("Learnsets", "ironmoth").learnset.icebeam = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.freezedry = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.blizzard = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.hail = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.auroraveil = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.icywind = ["9L1"];
    this.modData("Learnsets", "ironmoth").learnset.snowscape = ["9L1"];
    delete this.modData("Learnsets", "ironmoth").learnset.sludgewave;
    delete this.modData("Learnsets", "ironmoth").learnset.toxic;
    delete this.modData("Learnsets", "ironmoth").learnset.toxicspikes;
    delete this.modData("Learnsets", "ironmoth").learnset.venoshock;
    delete this.modData("Learnsets", "ironmoth").learnset.acidspray;
    delete this.modData("Learnsets", "ironmoth").learnset.chargebeam;
    delete this.modData("Learnsets", "ironmoth").learnset.discharge;
    delete this.modData("Learnsets", "ironmoth").learnset.energyball;
    this.modData("Learnsets", "spinarak").learnset.playrough = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.zenheadbutt = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.crosschop = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.swordsdance = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.thunderfang = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.icefang = ["9L1"];
    this.modData("Learnsets", "spinarak").learnset.poisonfang = ["9L1"];
    delete this.modData("Learnsets", "spinarak").learnset.xscissor;
    delete this.modData("Learnsets", "spinarak").learnset.lunge;
    this.modData("Learnsets", "araquanid").learnset.watershuriken = ["9L1"];
    this.modData("Learnsets", "araquanid").learnset.steameruption = ["9L1"];
    this.modData("Learnsets", "araquanid").learnset.doomdesire = ["9L1"];
    this.modData("Learnsets", "galvantula").learnset.blizzard = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
