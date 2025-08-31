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
    customTiers: ["Sign", "NoSign"]
  },
  init() {
    this.modData("Learnsets", "venusaur").learnset.greatflower = ["9L1"];
    this.modData("Learnsets", "charizard").learnset.greatflame = ["9L1"];
    this.modData("Learnsets", "blastoise").learnset.greatflood = ["9L1"];
    this.modData("Learnsets", "dugtrio").learnset.tripledig = ["9L1"];
    this.modData("Learnsets", "dugtrioalola").learnset.tripledig = ["9L1"];
    this.modData("Learnsets", "tentacruel").learnset.tentaclelock = ["9L1"];
    this.modData("Learnsets", "snorlax").learnset.bellyflop = ["9L1"];
    this.modData("Learnsets", "azumarill").learnset.bubbleball = ["9L1"];
    this.modData("Learnsets", "sudowoodo").learnset.fakebranch = ["9L1"];
    this.modData("Learnsets", "spinda").learnset.spintowin = ["9L1"];
    this.modData("Learnsets", "zangoose").learnset.whiteclaw = ["9L1"];
    this.modData("Learnsets", "luvdisc").learnset.loveadvice = ["9L1"];
    this.modData("Learnsets", "roserade").learnset.secretthorns = ["9L1"];
    this.modData("Learnsets", "gastrodon").learnset.stickyslime = ["9L1"];
    this.modData("Learnsets", "weavile").learnset.sinisterclaw = ["9L1"];
    this.modData("Learnsets", "froslass").learnset.curseofsnow = ["9L1"];
    this.modData("Learnsets", "scolipede").learnset.poisonwheel = ["9L1"];
    this.modData("Learnsets", "hydreigon").learnset.triplethreat = ["9L1"];
    this.modData("Learnsets", "clawitzer").learnset.waterbombshell = ["9L1"];
    this.modData("Learnsets", "noivern").learnset.killerwail = ["9L1"];
    this.modData("Learnsets", "mimikyu").learnset.snuggle = ["9L1"];
    this.modData("Learnsets", "corviknight").learnset.armorwing = ["9L1"];
    this.modData("Learnsets", "bellibolt").learnset.bellyspot = ["9L1"];
    this.modData("Learnsets", "toedscruel").learnset.tentaclelock = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
