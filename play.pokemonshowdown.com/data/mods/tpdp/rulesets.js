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
  sleepclausemod: {
    effectType: "Rule",
    name: "Sleep Clause Mod",
    desc: "Prevents players from putting more than one of their opponent's Pok&eacute;mon to sleep at a time",
    onBegin() {
      this.add("rule", "Sleep Clause Mod: Limit one foe put to sleep");
    },
    onSetStatus(status, target, source) {
      if (source && source.isAlly(target)) {
        return;
      }
      if (status.id === "slp") {
        for (const pokemon of target.side.pokemon) {
          if (pokemon.hp && pokemon.status === "slp") {
            if (!pokemon.statusState.source || !pokemon.statusState.source.isAlly(pokemon)) {
              this.add("-message", "Sleep Clause Mod activated.");
              this.hint("Sleep Clause Mod prevents players from putting more than one of their opponent's Pok\xE9mon to sleep at a time");
              return false;
            }
          }
        }
      }
    }
  },
  statusmod: {
    effectType: "Rule",
    name: "Status Mod",
    desc: "Displays new statuses as a volatile",
    onSwitchIn(pokemon) {
      if (pokemon.status)
        this.add("-start", pokemon, pokemon.status, "[silent]");
    }
  },
  stylemonsmovelegality: {
    effectType: "ValidatorRule",
    name: "Stylemons Move Legality",
    teambuilderConfig: "stylemons",
    desc: "Allows Puppets to use any move that they or another style learns",
    checkCanLearn(move, species, setSources, set) {
      const matchingSpecies = this.dex.species.all().filter((s) => s.spriteid === species.spriteid && !this.ruleTable.isBannedSpecies(s));
      const someCanLearn = matchingSpecies.some((s) => this.checkCanLearn(move, s, setSources, set) === null);
      if (someCanLearn)
        return null;
      return this.checkCanLearn(move, species, setSources, set);
    }
  }
};
//# sourceMappingURL=rulesets.js.map
