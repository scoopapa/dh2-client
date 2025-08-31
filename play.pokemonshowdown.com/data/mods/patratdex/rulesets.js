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
  realmonclause: {
    effectType: "ValidatorRule",
    name: "Realmon Clause",
    desc: "Bans all previously-existing Pokemon.",
    onValidateSet(set) {
      const species = this.dex.species.get(set.species);
      const exceptions = ["onixpatratdex", "wobbuffetpatratdex", "spoinkpatratdex", "wynautpatratdex", "luvdiscpatratdex", "carnivinepatratdex", "patratpatratdex", "watchogpatratdex", "valillitepatratdex", "vanillishpatratdex", "vanilluxepatratdex", "litwickpatratdex", "lampentpatratdex", "chandelurepatratdex"];
      const forms = ["incrownitoflock", "monstratahammer", "carnivinepatratdexrevealed", "monsoonurachunky"];
      if (!exceptions.includes(species.id) && species.num < 1e3) {
        return [
          "Previously-existing Pokemon are banned. Please use the Pokemon created for this mod."
        ];
      }
      if (forms.includes(species.id)) {
        return [
          "Your team contains an alternate form that is only available mid-battle."
        ];
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
