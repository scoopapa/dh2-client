"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
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
  moripakucoffret: {
    onStart(pokemon) {
      const moripakuCoffret = pokemon.side.pokemon.filter((p) => p != pokemon && !p.fainted && p.baseSpecies.moripakucoffret);
      if (moripakuCoffret.length > 0) {
        this.add("-activate", pokemon, "ability: MoriPakuCoffret");
        this.boost({ atk: 1 * moripakucoffret.length, spd: -1 * moripakucoffret.length, def: 1 * moripakucoffret.length }, pokemon, pokemon);
      }
    },
    flags: { breakable: 1 },
    name: "MoriPakuCoffret",
    shortDesc: "On switch-in, +1 Atk/Def, -1 Spd for each unfainted Moriritchi, Coffretchi, and Candy Pakupaku in the party.",
    rating: 1,
    num: 1828
  },
  uraskin: {
    onTryHit(target2, source2, move) {
      if (target2 !== source2 && move.type === "Dark") {
        if (!this.heal(target2.baseMaxhp / 4)) {
          this.add("-immune", target2, "[from] ability: Ura Skin");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Uraskin",
    shortDesc: "This Tamagotchi is Immune to Dark-type moves.",
    rating: 3.5,
    num: 2221
  },
  gigakyun: {
    flags: {},
    shortDesc: "Moves have +20% power, but this Tamagotchi is in love with all males, especially Mametchi.",
    name: "Gigakyun",
    rating: 5,
    num: 3752,
    onModifySpaPriority: 5,
    onModifySpa(spa) {
      return this.chainModify(1.2);
    },
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.chainModify(1.2);
    },
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (pokemon.activeTurns) {
        pokemon.addVolatile("attract", this.effectState.pokemon);
      }
    },
    tamamorishift: {
      onResidualOrder: 28,
      onResidualSubOrder: 2,
      onResidual(pokemon) {
        if (pokemon.activeTurns) {
          if (source.species && (source.species.num === 493 || source.species.num === 773))
            return false;
          if (source.terastallized)
            return false;
          const oldApparentType = source.apparentType;
          let newBaseTypes = target.getTypes(true).filter((type) => type !== "???");
          if (!newBaseTypes.length) {
            if (target.addedType) {
              newBaseTypes = ["Normal"];
            } else {
              return false;
            }
          }
        }
      },
      flags: {},
      shortDesc: "At the end of every turn, changes this Tamagotchi's type to the enemy's type.",
      name: "Tamamori Shift",
      rating: 4.5,
      num: 3553
    },
    candybag: {
      onStart(pokemon) {
        for (const move of pokemon.moveSlots) {
          if (move.id === "metronome")
            return;
        }
        const metronome = this.dex.moves.get("metronome");
        const newMove = {
          move: metronome.name,
          id: metronome.id,
          pp: metronome.pp * 1.6,
          maxpp: metronome.pp * 1.6,
          target: metronome.target,
          disabled: false,
          used: false,
          virtual: true
        };
        pokemon.moveSlots[pokemon.moveSlots.length] = newMove;
        pokemon.baseMoveSlots[pokemon.baseMoveSlots.length] = newMove;
      },
      flags: {},
      name: "Candy Bag",
      shortDesc: "This Pokemon has Metronome as an additional moveslot."
    },
    specialdevice: {
      onFaint(pokemon) {
        source.side.addSideCondition("specialdevice");
        console.log(source.side.sideConditions);
      },
      flags: {},
      name: "Special Device",
      shortDesc: "When this Pokemon's HP drops to 0, it leaves behind a Device Counter."
    }
  }
};
//# sourceMappingURL=abilities.js.map
