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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  crystalize: {
    onAfterUseItem(item, pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "groundpoison" || pokemon.transformed) {
        return;
      }
      this.add("-activate", pokemon, "ability: Crystalize");
      pokemon.formeChange("groundpoison-Crystallized", this.effect, true);
    },
    onTakeItem(item, pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "groundpoison" || pokemon.transformed) {
        return;
      }
      this.add("-activate", pokemon, "ability: Crystalize");
      pokemon.formeChange("groundpoison-Crystallized", this.effect, true);
    },
    onStart(pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "groundpoison" && !pokemon.item) {
        this.add("-activate", pokemon, "ability: Crystalize");
        pokemon.formeChange("groundpoison-Crystallized", this.effect, true);
      }
    },
    name: "Crystalize",
    shortDesc: "groundpoison: transforms if no item or upon item loss or use."
  },
  downdraft: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Downdraft", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
    name: "Downdraft",
    shortDesc: "On switch-in, this Pokemon lowers the Spe of opponents by 1 stage."
  },
  eideticmemory: {
    onAnyTryMove(target, source, effect) {
      if (["stealthrock", "spikes", "toxicspikes", "stickyweb", "rapidspin", "defog", "courtchange"].includes(effect.id)) {
        this.attrLastMove("[still]");
        this.add("cant", this.effectState.target, "ability: Bubble Mane", effect, "[of] " + target);
        return false;
      }
    },
    name: "Eidetic Memory",
    shortDesc: "While this Pokemon is active, entry hazards cannot be removed or set."
  },
  //vanilla interactions
  innerfocus: {
    inherit: true,
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Inner Focus", "[of] " + target);
      }
      if (effect.name === "Downdraft" && boost.spe) {
        delete boost.spe;
        this.add("-fail", target, "unboost", "Speed", "[from] ability: Inner Focus", "[of] " + target);
      }
    }
  },
  oblivious: {
    inherit: true,
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Oblivious", "[of] " + target);
      }
      if (effect.name === "Downdraft" && boost.spe) {
        delete boost.spe;
        this.add("-fail", target, "unboost", "Speed", "[from] ability: Oblivious", "[of] " + target);
      }
    }
  },
  owntempo: {
    inherit: true,
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Own Tempo", "[of] " + target);
      }
      if (effect.name === "Downdraft" && boost.spe) {
        delete boost.spe;
        this.add("-fail", target, "unboost", "Speed", "[from] ability: Own Tempo", "[of] " + target);
      }
    }
  },
  scrappy: {
    inherit: true,
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Scrappy", "[of] " + target);
      }
      if (effect.name === "Downdraft" && boost.spe) {
        delete boost.spe;
        this.add("-fail", target, "unboost", "Speed", "[from] ability: Scrappy", "[of] " + target);
      }
    }
  }
};
//# sourceMappingURL=abilities.js.map
