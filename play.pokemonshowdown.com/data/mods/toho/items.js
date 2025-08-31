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
  summerbackdoor: {
    name: "Summer Backdoor",
    spritenum: 751,
    shortDesc: "If held by a Cirno, this item changes its forme to Tanned.",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 5 || pokemon.baseSpecies.num === 5) {
        return false;
      }
      return true;
    },
    itemUser: ["Cirno-Tanned"]
  },
  jeweledpagoda: {
    name: "Jeweled Pagoda",
    spritenum: 92,
    shortDesc: "Nazrin, Shou Toramaru: Fairy moves have 1.5x power.",
    onBasePowerPriority: 15,
    onBasePower(basePower, source, target, move) {
      if (source.baseSpecies.baseSpecies === "Nazrin" || source.baseSpecies.baseSpecies === "Shou Toramaru") {
        if (move && move.type === "Fairy") {
          return this.chainModify(1.5);
        }
      }
    },
    itemUser: ["Nazrin", "Shou Toramaru"]
  },
  //vanilla
  boosterenergy: {
    inherit: true,
    onUpdate(pokemon) {
      if (!this.effectState.started || pokemon.transformed)
        return;
      if (pokemon.hasAbility("protosynthesis") && !this.field.isWeather("sunnyday") && pokemon.useItem()) {
        pokemon.addVolatile("protosynthesis");
      }
      if (pokemon.hasAbility("quarkdrive") && !this.field.isTerrain("electricterrain") && pokemon.useItem()) {
        pokemon.addVolatile("quarkdrive");
      }
      if (pokemon.hasAbility("cactusdrive") && !this.field.isTerrain("grassyterrain") && pokemon.useItem()) {
        pokemon.addVolatile("cactusdrive");
      }
    }
  },
  dracoplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  dreadplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  earthplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  fistplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  flameplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  icicleplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  insectplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  ironplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  meadowplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  mindplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  pixieplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  skyplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  splashplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  spookyplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  stoneplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  toxicplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  },
  zapplate: {
    inherit: true,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 38 || pokemon.baseSpecies.num === 38) {
        return false;
      }
      return true;
    }
  }
};
//# sourceMappingURL=items.js.map
