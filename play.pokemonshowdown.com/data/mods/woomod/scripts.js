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
    customTiers: ["woomod"]
  },
  init() {
    this.modData("Learnsets", "krokorok").learnset.ceaselessedge = ["9L1"];
    this.modData("Learnsets", "krokorok").learnset.smackdown = ["9L1"];
    this.modData("Learnsets", "qwilfishhisui").learnset.downtownslide = ["9L1"];
    this.modData("Learnsets", "qwilfishhisui").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "qwilfishhisui").learnset.recover = ["9L1"];
    delete this.modData("Learnsets", "qwilfishhisui").learnset.barbbarrage;
    this.modData("Learnsets", "snivy").learnset.shimmeringsap = ["9L1"];
    this.modData("Learnsets", "snivy").learnset.aurasphere = ["9L1"];
    this.modData("Learnsets", "snivy").learnset.focusblast = ["9L1"];
    this.modData("Learnsets", "snivy").learnset.closecombat = ["9L1"];
    this.modData("Learnsets", "snivy").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.bluemoon = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.dazzlinggleam = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.calmmind = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.moonlight = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.charm = ["9L1"];
    this.modData("Learnsets", "dragonair").learnset.psyshock = ["9L1"];
    delete this.modData("Learnsets", "dragonair").learnset.extremespeed;
    this.modData("Learnsets", "wimpod").learnset.stickyweb = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.bugbuzz = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.flamethrower = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.ember = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.willowisp = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.overheat = ["9L1"];
    this.modData("Learnsets", "wimpod").learnset.vcreate = ["9L1"];
    this.modData("Learnsets", "tadbulb").learnset.hydropump = ["9L1"];
    this.modData("Learnsets", "tadbulb").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "tadbulb").learnset.bouncybubble = ["9L1"];
    this.modData("Learnsets", "tadbulb").learnset.electrodrift = ["9L1"];
    this.modData("Learnsets", "pikipek").learnset.playrough = ["9L1"];
    this.modData("Learnsets", "pikipek").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "pikipek").learnset.dazzlinggleam = ["9L1"];
    this.modData("Learnsets", "chingling").learnset.voltswitch = ["9L1"];
    this.modData("Learnsets", "chingling").learnset.willowisp = ["9L1"];
    this.modData("Learnsets", "charmander").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "nymble").learnset.nymblekick = ["9L1"];
    this.modData("Learnsets", "nymble").learnset.stealthrock = ["9L1"];
    this.modData("Learnsets", "vanillite").learnset.scald = ["9L1"];
    this.modData("Learnsets", "vanillite").learnset.voltswitch = ["9L1"];
    this.modData("Learnsets", "vanillite").learnset.vanilliteattackwithtoomanyeffects = ["9L1"];
    this.modData("Learnsets", "spheal").learnset.hydrosteam = ["9L1"];
    this.modData("Learnsets", "spheal").learnset.flamethrower = ["9L1"];
    this.modData("Learnsets", "spheal").learnset.flipturn = ["9L1"];
    delete this.modData("Learnsets", "spheal").learnset.surf;
    this.modData("Learnsets", "anorith").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "anorith").learnset.metalsound = ["9L1"];
    this.modData("Learnsets", "anorith").learnset.stoneaxe = ["9L1"];
    this.modData("Learnsets", "anorith").learnset.wish = ["9L1"];
    this.modData("Learnsets", "anorith").learnset.explosion = ["9L1"];
    this.modData("Learnsets", "anorith").learnset.copycat = ["9L1"];
    this.modData("Learnsets", "ditto").learnset.explosion = ["9L1"];
    this.modData("Learnsets", "ditto").learnset.bloodmoon = ["9L1"];
    this.modData("Learnsets", "jigglypuff").learnset.starsmash = ["9L1"];
    this.modData("Learnsets", "jigglypuff").learnset.spikes = ["9L1"];
    this.modData("Learnsets", "bronzor").learnset.mentalspin = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.gunkshot = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.gigadrain = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.wigglinglash = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.sludgebomb = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.sludgewave = ["9L1"];
    this.modData("Learnsets", "wiglett").learnset.toxic = ["9L1"];
    this.modData("Learnsets", "gible").learnset.overheat = ["9L1"];
    this.modData("Learnsets", "gible").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "vulpix").learnset.vcreate = ["9L1"];
    this.modData("Learnsets", "shuppet").learnset.wish = ["9L1"];
    this.modData("Learnsets", "shuppet").learnset.teleport = ["9L1"];
    this.modData("Learnsets", "golett").learnset.burialblast = ["9L1"];
    this.modData("Learnsets", "golett").learnset.meteorbeam = ["9L1"];
    this.modData("Learnsets", "golett").learnset.gigadrain = ["9L1"];
    this.modData("Learnsets", "elgyem").learnset.duoshock = ["9L1"];
    this.modData("Learnsets", "elgyem").learnset.swordsdance = ["9L1"];
    delete this.modData("Learnsets", "elgyem").learnset.zenheadbutt;
    this.modData("Learnsets", "farfetchd").learnset.ivycudgel = ["9L1"];
    this.modData("Learnsets", "amaura").learnset.meteorcrash = ["9L1"];
    this.modData("Learnsets", "amaura").learnset.fireblast = ["9L1"];
    this.modData("Learnsets", "amaura").learnset.chillyreception = ["9L1"];
    this.modData("Learnsets", "wailmer").learnset.defog = ["9L1"];
    this.modData("Learnsets", "pikachu").learnset.flipturn = ["9L1"];
    this.modData("Learnsets", "pikachu").learnset.tachyoncutter = ["9L1"];
    this.modData("Learnsets", "morelull").learnset.nightmare = ["9L1"];
    this.modData("Learnsets", "morelull").learnset.scorchingsands = ["9L1"];
    delete this.modData("Learnsets", "morelull").learnset.spore;
  },
  pokemon: {
    hasAbility(ability) {
      if (this.ignoringAbility())
        return false;
      if (Array.isArray(ability))
        return ability.some((abil) => this.hasAbility(abil));
      const abilityid = this.battle.toID(ability);
      return this.ability === abilityid || !!this.volatiles["ability:" + abilityid];
    }
  }
};
//# sourceMappingURL=scripts.js.map
