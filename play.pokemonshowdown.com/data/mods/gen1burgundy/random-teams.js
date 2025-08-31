"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var random_teams_exports = {};
__export(random_teams_exports, {
  RandomGen1Teams: () => RandomGen1Teams,
  default: () => random_teams_default
});
module.exports = __toCommonJS(random_teams_exports);
var import_random_teams = __toESM(require("../gen2/random-teams"));
class RandomGen1Teams extends import_random_teams.default {
  // Challenge Cup or CC teams are basically fully random teams.
  randomCCTeam() {
    const team = [];
    const hasDexNumber = {};
    const formes = [[], [], [], [], [], []];
    let num;
    for (let i = 0; i < 6; i++) {
      do {
        num = this.random(151) + 1;
      } while (num in hasDexNumber);
      hasDexNumber[num] = i;
    }
    let formeCounter = 0;
    for (const id in this.dex.data.Pokedex) {
      if (!(this.dex.data.Pokedex[id].num in hasDexNumber))
        continue;
      const species = this.dex.species.get(id);
      const lsetData = this.dex.getLearnsetData(id);
      if (!lsetData.learnset || species.forme)
        continue;
      formes[hasDexNumber[species.num]].push(species.name);
      if (++formeCounter >= 6) {
        break;
      }
    }
    for (let i = 0; i < 6; i++) {
      const poke = this.sample(formes[i]);
      const species = this.dex.species.get(poke);
      const lsetData = this.dex.getLearnsetData(species.id);
      const mbstmin = 1307;
      const stats = species.baseStats;
      let mbst = stats["hp"] * 2 + 30 + 63 + 100 + 10;
      mbst += stats["atk"] * 2 + 30 + 63 + 100 + 5;
      mbst += stats["def"] * 2 + 30 + 63 + 100 + 5;
      mbst += stats["spa"] * 2 + 30 + 63 + 100 + 5;
      mbst += stats["spd"] * 2 + 30 + 63 + 100 + 5;
      mbst += stats["spe"] * 2 + 30 + 63 + 100 + 5;
      let level = Math.floor(100 * mbstmin / mbst);
      while (level < 100) {
        mbst = Math.floor((stats["hp"] * 2 + 30 + 63 + 100) * level / 100 + 10);
        mbst += Math.floor(((stats["atk"] * 2 + 30 + 63 + 100) * level / 100 + 5) * level / 100);
        mbst += Math.floor((stats["def"] * 2 + 30 + 63 + 100) * level / 100 + 5);
        mbst += Math.floor(((stats["spa"] * 2 + 30 + 63 + 100) * level / 100 + 5) * level / 100);
        mbst += Math.floor((stats["spd"] * 2 + 30 + 63 + 100) * level / 100 + 5);
        mbst += Math.floor((stats["spe"] * 2 + 30 + 63 + 100) * level / 100 + 5);
        if (mbst >= mbstmin)
          break;
        level++;
      }
      const ivs = {
        hp: 0,
        atk: this.random(16),
        def: this.random(16),
        spa: this.random(16),
        spd: 0,
        spe: this.random(16)
      };
      ivs["hp"] = ivs["atk"] % 2 * 16 + ivs["def"] % 2 * 8 + ivs["spe"] % 2 * 4 + ivs["spa"] % 2 * 2;
      ivs["atk"] = ivs["atk"] * 2;
      ivs["def"] = ivs["def"] * 2;
      ivs["spa"] = ivs["spa"] * 2;
      ivs["spd"] = ivs["spa"];
      ivs["spe"] = ivs["spe"] * 2;
      const evs = { hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255 };
      let moves;
      const pool = [];
      if (lsetData.learnset) {
        for (const move in lsetData.learnset) {
          if (this.dex.moves.get(move).gen !== 1)
            continue;
          if (lsetData.learnset[move].some((learned) => learned[0] === "1")) {
            pool.push(move);
          }
        }
      }
      if (pool.length <= 4) {
        moves = pool;
      } else {
        moves = [
          this.sampleNoReplace(pool),
          this.sampleNoReplace(pool),
          this.sampleNoReplace(pool),
          this.sampleNoReplace(pool)
        ];
      }
      team.push({
        name: poke,
        species: species.name,
        moves,
        gender: false,
        ability: "None",
        evs,
        ivs,
        item: "",
        level,
        happiness: 0,
        shiny: false,
        nature: "Serious"
      });
    }
    return team;
  }
  // Random team generation for Gen 1 Random Battles.
  randomTeam() {
    let pokemonLeft = 0;
    const pokemon = [];
    const handicapMons = ["magikarp", "weedle", "kakuna", "caterpie", "metapod"];
    const nuTiers = ["UU", "UUBL", "NFE", "LC", "NU", "PU"];
    const uuTiers = ["NFE", "UU", "UUBL", "NU", "PU"];
    const pokemonPool = [];
    for (const id in this.dex.data.FormatsData) {
      const species = this.dex.species.get(id);
      if (!species.isNonstandard && species.randomBattleMoves) {
        pokemonPool.push(id);
      }
    }
    const typeCount = {};
    const weaknessCount = { Electric: 0, Psychic: 0, Water: 0, Ice: 0, Ground: 0 };
    let uberCount = 0;
    let nuCount = 0;
    let hasShitmon = false;
    while (pokemonPool.length && pokemonLeft < 6) {
      const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
      if (!species.exists)
        continue;
      if (handicapMons.includes(species.id) && hasShitmon)
        continue;
      const tier = species.tier;
      switch (tier) {
        case "LC":
        case "NFE":
          if (nuCount > 3 || hasShitmon && nuCount > 2 || this.randomChance(1, 3))
            continue;
          break;
        case "Uber":
          if (uberCount >= 1 && !hasShitmon)
            continue;
          break;
        default:
          if (uuTiers.includes(tier) && pokemonPool.length > 1 && (nuCount > 3 && this.randomChance(1, 2)))
            continue;
      }
      let skip = false;
      for (const type of species.types) {
        if (typeCount[type] > 1 || typeCount[type] === 1 && this.randomChance(1, 2) && pokemonPool.length > 1) {
          skip = true;
          break;
        }
      }
      if (skip)
        continue;
      const pokemonWeaknesses = [];
      for (const type in weaknessCount) {
        const increaseCount = this.dex.getImmunity(type, species) && this.dex.getEffectiveness(type, species) > 0;
        if (!increaseCount)
          continue;
        if (weaknessCount[type] >= 2) {
          skip = true;
          break;
        }
        pokemonWeaknesses.push(type);
      }
      if (skip)
        continue;
      const set = this.randomSet(species);
      pokemon.push(set);
      pokemonLeft++;
      for (const type of species.types) {
        if (typeCount[type]) {
          typeCount[type]++;
        } else {
          typeCount[type] = 1;
        }
      }
      for (const weakness of pokemonWeaknesses) {
        weaknessCount[weakness]++;
      }
      if (tier === "Uber") {
        uberCount++;
      } else if (nuTiers.includes(tier)) {
        nuCount++;
      }
      if (handicapMons.includes(species.id))
        hasShitmon = true;
    }
    return pokemon;
  }
  /**
   * Random set generation for Gen 1 Random Battles.
   */
  randomSet(species) {
    species = this.dex.species.get(species);
    if (!species.exists)
      species = this.dex.species.get("pikachu");
    const movePool = species.randomBattleMoves ? species.randomBattleMoves.slice() : [];
    let moves = [];
    const hasType = {};
    hasType[species.types[0]] = true;
    if (species.types[1])
      hasType[species.types[1]] = true;
    let hasMove = {};
    let counter = {};
    const PhysicalSetup = ["swordsdance", "sharpen"];
    const SpecialSetup = ["amnesia", "growth"];
    if (species.comboMoves) {
      if (this.randomChance(1, 2)) {
        moves = moves.concat(species.comboMoves);
      }
    }
    if (moves.length < 4 && species.exclusiveMoves) {
      moves.push(this.sample(species.exclusiveMoves));
    }
    if (moves.length < 4 && species.essentialMove) {
      moves.push(species.essentialMove);
    }
    while (moves.length < 4 && movePool.length) {
      while (moves.length < 4 && movePool.length) {
        const moveid = this.sampleNoReplace(movePool);
        moves.push(moveid);
      }
      if (movePool.length) {
        hasMove = {};
        counter = { Physical: 0, Special: 0, Status: 0, physicalsetup: 0, specialsetup: 0 };
        for (const setMoveid of moves) {
          const move = this.dex.moves.get(setMoveid);
          const moveid = move.id;
          hasMove[moveid] = true;
          if (!move.damage && !move.damageCallback) {
            counter[move.category]++;
          }
          if (PhysicalSetup.includes(moveid)) {
            counter["physicalsetup"]++;
          }
          if (SpecialSetup.includes(moveid)) {
            counter["specialsetup"]++;
          }
        }
        for (const [i, moveid] of moves.entries()) {
          if (moveid === species.essentialMove)
            continue;
          const move = this.dex.moves.get(moveid);
          let rejected = false;
          if (!species.essentialMove || moveid !== species.essentialMove) {
            switch (moveid) {
              case "hydropump":
                if (hasMove["surf"])
                  rejected = true;
                break;
              case "surf":
                if (hasMove["hydropump"])
                  rejected = true;
                break;
              case "selfdestruct":
                if (hasMove["rest"])
                  rejected = true;
                break;
              case "rest":
                if (hasMove["selfdestruct"])
                  rejected = true;
                break;
              case "sharpen":
              case "swordsdance":
                if (counter["Special"] > counter["Physical"] || !counter["Physical"] || hasMove["growth"])
                  rejected = true;
                break;
              case "growth":
                if (counter["Special"] < counter["Physical"] || !counter["Special"] || hasMove["swordsdance"])
                  rejected = true;
                break;
              case "poisonpowder":
              case "stunspore":
              case "sleeppowder":
              case "toxic":
                if (counter["Status"] > 1)
                  rejected = true;
                break;
            }
          }
          if (rejected) {
            moves.splice(i, 1);
            break;
          }
          counter[move.category]++;
        }
      }
    }
    const levelScale = {
      LC: 88,
      NFE: 80,
      PU: 78,
      NU: 77,
      NUBL: 76,
      UU: 74,
      OU: 68,
      Uber: 65
    };
    const customScale = {
      Mewtwo: 62,
      Caterpie: 99,
      Metapod: 99,
      Weedle: 99,
      Kakuna: 99,
      Magikarp: 99,
      Ditto: 88
    };
    let level = levelScale[species.tier] || 80;
    if (customScale[species.name])
      level = customScale[species.name];
    return {
      name: species.name,
      species: species.name,
      moves,
      ability: "None",
      evs: { hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255 },
      ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
      item: "",
      level,
      shiny: false,
      gender: false
    };
  }
}
var random_teams_default = RandomGen1Teams;
//# sourceMappingURL=random-teams.js.map
