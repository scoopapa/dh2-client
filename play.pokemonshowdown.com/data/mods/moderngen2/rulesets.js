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
  standardmg2: {
    effectType: "ValidatorRule",
    name: "Standard MG2",
    ruleset: ["Obtainable Moves", "Obtainable Abilities", "Obtainable Formes", "EV Limit = Auto", "Sleep Clause Mod", "Freeze Clause Mod", "Species Clause", "Nickname Clause", "OHKO Clause", "Evasion Items Clause", "Evasion Moves Clause", "Endless battle Clause", "HP Percentage Mod", "Cancel Mod"],
    banlist: [
      "Hypnosis + Mean Look",
      "Hypnosis + Spider Web",
      "Lovely Kiss + Mean Look",
      "Lovely Kiss + Spider Web",
      "Sing + Mean Look",
      "Sing + Spider Web",
      "Sleep Powder + Mean Look",
      "Sleep Powder + Spider Web",
      "Spore + Mean Look",
      "Spore + Spider Web",
      "Berserk Gene",
      "Dire Claw",
      "Unreleased",
      "Unobtainable",
      "Nonexistent"
    ]
  }
  /*
  obtainablemiscmg2: {
  	effectType: 'ValidatorRule',
  	name: 'Obtainable Misc MG2',
  	desc: "Validate all obtainability things that aren't moves/abilities (Gender, Events, duplicate moves).",
  	onChangeSet(set) {
  		const species = this.dex.species.get(set.species);
  		if (species.gender) {
  			if (set.gender !== species.gender) {
  				set.gender = species.gender;
  			}
  		} else {
  			if (set.gender !== 'M' && set.gender !== 'F') {
  				set.gender = '';
  			}
  		}
  		if (set.moves) {
  			const hasMove: {[k: string]: true} = {};
  			for (const moveId of set.moves) {
  				const move = this.dex.moves.get(moveId);
  				const moveid = move.id;
  				if (hasMove[moveid]) return [`${species.baseSpecies} has multiple copies of ${move.name}.`];
  				hasMove[moveid] = true;
  			}
  		}
  	},
  },
  */
};
//# sourceMappingURL=rulesets.js.map
