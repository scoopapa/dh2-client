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
  init() {
    this.modData("Learnsets", "landorus").learnset.airslash = ["9L1"];
    delete this.modData("Learnsets", "landorus").learnset.sludgebomb;
    delete this.modData("Learnsets", "landorus").learnset.sludgewave;
    delete this.modData("Learnsets", "kubfu").learnset.swordsdance;
    delete this.modData("Learnsets", "urshifu").learnset.swordsdance;
    delete this.modData("Learnsets", "urshifurapidstrike").learnset.swordsdance;
    this.modData("Learnsets", "darkrai").learnset.aurasphere = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.confusion = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.extrasensory = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.futuresight = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.leechlife = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.lightscreen = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.poltergeist = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.psychicnoise = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.reflect = ["9L1"];
    this.modData("Learnsets", "darkrai").learnset.zenheadbutt = ["9L1"];
    this.modData("Learnsets", "kingambit").learnset.hammerarm = ["9L1"];
    delete this.modData("Learnsets", "chienpao").learnset.suckerpunch;
    delete this.modData("Learnsets", "chienpao").learnset.iceshard;
    this.modData("Learnsets", "chiyu").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "chiyu").learnset.strengthsap = ["9L1"];
    this.modData("Learnsets", "deoxys").learnset.foulplay = ["9L1"];
    this.modData("Learnsets", "deoxys").learnset.bodypress = ["9L1"];
    delete this.modData("Learnsets", "deoxys").learnset.zapcannon;
    delete this.modData("Learnsets", "deoxys").learnset.dynamicpunch;
    delete this.modData("Learnsets", "deoxys").learnset.extremespeed;
    delete this.modData("Learnsets", "deoxys").learnset.nastyplot;
  }
};
//# sourceMappingURL=scripts.js.map
