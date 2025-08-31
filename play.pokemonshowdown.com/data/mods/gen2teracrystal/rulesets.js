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
var rulesets_exports = {};
__export(rulesets_exports, {
  Rulesets: () => Rulesets
});
module.exports = __toCommonJS(rulesets_exports);
const Rulesets = {
  obtainablemoves: {
    inherit: true,
    banlist: [
      // https://www.smogon.com/forums/threads/implementing-all-old-gens-in-ps-testers-required.3483261/post-5420130
      // confirmed by Marty
      "Kakuna + Poison Sting + Harden",
      "Kakuna + String Shot + Harden",
      "Beedrill + Poison Sting + Harden",
      "Beedrill + String Shot + Harden",
      // https://www.smogon.com/forums/threads/rby-and-gsc-illegal-movesets.78638/
      "Nidoking + Fury Attack + Thrash",
      "Exeggutor + Poison Powder + Stomp",
      "Exeggutor + Sleep Powder + Stomp",
      "Exeggutor + Stun Spore + Stomp",
      "Eevee + Tackle + Growl",
      "Vaporeon + Tackle + Growl",
      "Jolteon + Tackle + Growl",
      "Jolteon + Focus Energy + Thunder Shock",
      "Flareon + Tackle + Growl",
      "Flareon + Focus Energy + Ember"
    ]
  },
  canterastal: {
    effectType: "Rule",
    name: "Can Terastal",
    desc: "Allows Pok&eacute;mon to Terastallize",
    onBegin() {
      for (const pokemon of this.getAllPokemon()) {
        pokemon.canTerastallize = true;
      }
      this.add("rule", "Can Terastal: You can Terastallize");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
