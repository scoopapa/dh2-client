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
    customTiers: ["Dondozo", "FEDD"]
  },
  faintMessages(lastFirst = false) {
    if (this.ended)
      return;
    const length = this.faintQueue.length;
    if (!length)
      return false;
    if (lastFirst) {
      this.faintQueue.unshift(this.faintQueue[this.faintQueue.length - 1]);
      this.faintQueue.pop();
    }
    let faintData;
    while (this.faintQueue.length) {
      faintData = this.faintQueue.shift();
      const pokemon = faintData.target;
      if (!pokemon.fainted && this.runEvent("BeforeFaint", pokemon, faintData.source, faintData.effect)) {
        this.add("faint", pokemon);
        if (!(pokemon.species.name === "Drifugiri" && pokemon.ability === "zombiefish" && !pokemon.zombie && !pokemon.transformed && this.canSwitch(pokemon.side))) {
          pokemon.side.pokemonLeft--;
        }
        this.runEvent("Faint", pokemon, faintData.source, faintData.effect);
        this.singleEvent("End", pokemon.getAbility(), pokemon.abilityData, pokemon);
        pokemon.clearVolatile(false);
        if (!pokemon.zombie) {
          pokemon.fainted = true;
        } else {
          pokemon.faintQueued = null;
        }
        pokemon.illusion = null;
        pokemon.isActive = false;
        pokemon.isStarted = false;
        pokemon.side.faintedThisTurn = pokemon;
      }
    }
    if (this.gen <= 1) {
      this.queue.clear();
    } else if (this.gen <= 3 && this.gameType === "singles") {
      for (const pokemon of this.getAllActive()) {
        if (this.gen <= 2) {
          this.queue.cancelMove(pokemon);
        } else {
          this.queue.cancelAction(pokemon);
        }
      }
    }
    let team1PokemonLeft = this.sides[0].pokemonLeft;
    let team2PokemonLeft = this.sides[1].pokemonLeft;
    const team3PokemonLeft = this.gameType === "free-for-all" && this.sides[2].pokemonLeft;
    const team4PokemonLeft = this.gameType === "free-for-all" && this.sides[3].pokemonLeft;
    if (this.gameType === "multi") {
      team1PokemonLeft = this.sides.reduce((total, side) => total + (side.n % 2 === 0 ? side.pokemonLeft : 0), 0);
      team2PokemonLeft = this.sides.reduce((total, side) => total + (side.n % 2 === 1 ? side.pokemonLeft : 0), 0);
    }
    if (!team1PokemonLeft && !team2PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
      this.win(faintData && this.gen > 4 ? faintData.target.side : null);
      return true;
    }
    if (!team2PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
      this.win(this.sides[0]);
      return true;
    }
    if (!team1PokemonLeft && !team3PokemonLeft && !team4PokemonLeft) {
      this.win(this.sides[1]);
      return true;
    }
    if (!team1PokemonLeft && !team2PokemonLeft && !team4PokemonLeft) {
      this.win(this.sides[2]);
      return true;
    }
    if (!team1PokemonLeft && !team2PokemonLeft && !team3PokemonLeft) {
      this.win(this.sides[3]);
      return true;
    }
    if (faintData) {
      this.runEvent("AfterFaint", faintData.target, faintData.source, faintData.effect, length);
    }
    return false;
  },
  checkFainted() {
    for (const side of this.sides) {
      for (const pokemon of side.active) {
        if (pokemon.fainted) {
          pokemon.status = "fnt";
          pokemon.switchFlag = true;
        } else if (pokemon.zombie) {
          pokemon.status = "";
          pokemon.switchFlag = true;
        }
      }
    }
  }
};
//# sourceMappingURL=scripts.js.map
