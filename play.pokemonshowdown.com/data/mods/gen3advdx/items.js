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
  expertbelt: {
    name: "Expert Belt",
    spritenum: 132,
    fling: {
      basePower: 10
    },
    onModifyDamage(damage, source, target, move) {
      if (move && target.getMoveHitData(move).typeMod > 0) {
        return this.chainModify([4915, 4096]);
      }
    },
    isNonstandard: null,
    num: 268,
    gen: 3
  },
  /*
  damprock: {
  	inherit: true,
  	isNonstandard: null,
  	gen: 3,
  },
  heatrock: {
  	inherit: true,
  	isNonstandard: null,
  	gen: 3,
  },
  icyrock: {
  	inherit: true,
  	isNonstandard: null,
  	gen: 3,
  },
  smoothrock: {
  	inherit: true,
  	isNonstandard: null,
  	gen: 3,
  },
  	*/
  bigroot: {
    inherit: true,
    isNonstandard: null,
    gen: 3
  },
  blunderpolicy: {
    inherit: true,
    isNonstandard: null,
    gen: 3
  },
  gripclaw: {
    //implemented in conditions.ts
    inherit: true,
    isNonstandard: null,
    gen: 3
  },
  aguavberry: {
    name: "Aguav Berry",
    spritenum: 5,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dragon"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 3))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 8);
      if (pokemon.getNature().minus === "spd") {
        pokemon.addVolatile("confusion");
      }
    },
    num: 162,
    gen: 3,
    rating: 3
  },
  apicotberry: {
    name: "Apicot Berry",
    spritenum: 10,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Ground"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.boost({ spd: 1 });
    },
    num: 205,
    gen: 3
  },
  berryjuice: {
    inherit: true,
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        if (this.runEvent("TryHeal", pokemon, null, this.effect, 20) && pokemon.useItem()) {
          this.heal(20);
        }
      }
    },
    isNonstandard: "Unobtainable"
  },
  enigmaberry: {
    name: "Enigma Berry",
    spritenum: 124,
    isBerry: true,
    onHit(target, source, move) {
      if (move && target.getMoveHitData(move).typeMod > 0) {
        if (target.eatItem()) {
          this.heal(target.baseMaxhp / 4);
        }
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 4))
        return false;
    },
    onEat() {
    },
    num: 208,
    gen: 3,
    isNonstandard: "Unobtainable"
  },
  figyberry: {
    name: "Figy Berry",
    spritenum: 140,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Bug"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 3))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 8);
      if (pokemon.getNature().minus === "atk") {
        pokemon.addVolatile("confusion");
      }
    },
    num: 159,
    gen: 3,
    rating: 3
  },
  ganlonberry: {
    name: "Ganlon Berry",
    spritenum: 158,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Ice"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.boost({ def: 1 });
    },
    num: 202,
    gen: 3
  },
  iapapaberry: {
    name: "Iapapa Berry",
    spritenum: 217,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Dark"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 3))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 8);
      if (pokemon.getNature().minus === "def") {
        pokemon.addVolatile("confusion");
      }
    },
    num: 163,
    gen: 3,
    rating: 3
  },
  lansatberry: {
    name: "Lansat Berry",
    spritenum: 238,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Flying"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      pokemon.addVolatile("focusenergy");
    },
    num: 206,
    gen: 3
  },
  liechiberry: {
    name: "Liechi Berry",
    spritenum: 248,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Grass"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.boost({ atk: 1 });
    },
    num: 201,
    gen: 3
  },
  magoberry: {
    name: "Mago Berry",
    spritenum: 274,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ghost"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 3))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 8);
      if (pokemon.getNature().minus === "spe") {
        pokemon.addVolatile("confusion");
      }
    },
    num: 161,
    gen: 3,
    rating: 3
  },
  oranberry: {
    name: "Oran Berry",
    spritenum: 319,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Poison"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, 10))
        return false;
    },
    onEat(pokemon) {
      this.heal(10);
    },
    num: 155,
    gen: 3,
    rating: 0
  },
  petayaberry: {
    name: "Petaya Berry",
    spritenum: 335,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Poison"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.boost({ spa: 1 });
    },
    num: 204,
    gen: 3
  },
  salacberry: {
    name: "Salac Berry",
    spritenum: 426,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Fighting"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      this.boost({ spe: 1 });
    },
    num: 203,
    gen: 3,
    rating: 3
  },
  sitrusberry: {
    name: "Sitrus Berry",
    spritenum: 448,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Psychic"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 4))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 4);
    },
    num: 158,
    gen: 3
  },
  starfberry: {
    name: "Starf Berry",
    spritenum: 472,
    isBerry: true,
    naturalGift: {
      basePower: 100,
      type: "Psychic"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility("gluttony") && pokemon.abilityState.gluttony) {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      const stats = [];
      let stat;
      for (stat in pokemon.boosts) {
        if (stat !== "accuracy" && stat !== "evasion" && pokemon.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 2;
        this.boost(boost);
      }
    },
    num: 207,
    gen: 3
  },
  wikiberry: {
    name: "Wiki Berry",
    spritenum: 538,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Rock"
    },
    onUpdate(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        pokemon.eatItem();
      }
    },
    onTryEatItem(item, pokemon) {
      if (!this.runEvent("TryHeal", pokemon, null, this.effect, pokemon.baseMaxhp / 3))
        return false;
    },
    onEat(pokemon) {
      this.heal(pokemon.baseMaxhp / 4);
      if (pokemon.getNature().minus === "spa") {
        pokemon.addVolatile("confusion");
      }
    },
    num: 160,
    gen: 3,
    rating: 3
  }
};
//# sourceMappingURL=items.js.map
