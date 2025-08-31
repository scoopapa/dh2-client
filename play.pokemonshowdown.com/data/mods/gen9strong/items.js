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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  aguavberry: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 2);
      if (pokemon.getNature().minus === "spd") {
        pokemon.addVolatile("confusion");
      }
    },
    shortDesc: "Restores 1/2 max HP at 1/2 max HP or less; confuses if -SpD Nature. Single use."
  },
  figyberry: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 2);
      if (pokemon.getNature().minus === "atk") {
        pokemon.addVolatile("confusion");
      }
    },
    shortDesc: "Restores 1/2 max HP at 1/2 max HP or less; confuses if -Atk Nature. Single use."
  },
  iapapaberry: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 2);
      if (pokemon.getNature().minus === "def") {
        pokemon.addVolatile("confusion");
      }
    },
    shortDesc: "Restores 1/2 max HP at 1/2 max HP or less; confuses if -Def Nature. Single use."
  },
  kingsrock: {
    inherit: true,
    onModifyMovePriority: -1,
    onModifyMove(move) {
      if (move.category !== "Status") {
        if (!move.secondaries)
          move.secondaries = [];
        for (const secondary of move.secondaries) {
          if (secondary.volatileStatus === "flinch")
            return;
        }
        move.secondaries.push({
          chance: 12,
          volatileStatus: "flinch"
        });
      }
    },
    shortDesc: "Holder's attacks without a chance to flinch gain a 12% chance to flinch."
  },
  magoberry: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 2);
      if (pokemon.getNature().minus === "spe") {
        pokemon.addVolatile("confusion");
      }
    },
    shortDesc: "Restores 1/2 max HP at 1/2 max HP or less; confuses if -Spe Nature. Single use."
  },
  quickclaw: {
    inherit: true,
    onFractionalPriority(priority, pokemon, target, move) {
      if (move.category === "Status" && pokemon.hasAbility("myceliummight"))
        return;
      if (priority <= 0 && this.randomChance(60, 256)) {
        this.add("-activate", pokemon, "item: Quick Claw");
        return 0.1;
      }
    },
    shortDesc: "Each turn, holder has a ~23.4% chance to move first in its priority bracket."
  },
  souldew: {
    inherit: true,
    onBasePower() {
    },
    onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
        return this.chainModify(1.5);
      }
    },
    onModifySpDPriority: 2,
    onModifySpD(spd, pokemon) {
      if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
        return this.chainModify(1.5);
      }
    },
    shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x."
  },
  wikiberry: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 2);
      if (pokemon.getNature().minus === "spa") {
        pokemon.addVolatile("confusion");
      }
    },
    shortDesc: "Restores 1/2 max HP at 1/2 max HP or less; confuses if -SpA Nature. Single use."
  }
};
//# sourceMappingURL=items.js.map
