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
  RandomLetsGoTeams: () => RandomLetsGoTeams
});
module.exports = __toCommonJS(random_teams_exports);
var import_random_teams = __toESM(require("../../random-teams"));
class RandomLetsGoTeams extends import_random_teams.default {
  randomSet(species, teamDetails = {}) {
    species = this.dex.species.get(species);
    let forme = species.name;
    if (species.battleOnly && typeof species.battleOnly === "string") {
      forme = species.battleOnly;
    }
    const movePool = (species.randomBattleMoves || Object.keys(this.dex.data.Learnsets[species.id].learnset)).slice();
    const moves = [];
    const hasType = {};
    hasType[species.types[0]] = true;
    if (species.types[1]) {
      hasType[species.types[1]] = true;
    }
    let hasMove = {};
    let counter;
    do {
      hasMove = {};
      for (const setMoveid of moves) {
        hasMove[setMoveid] = true;
      }
      while (moves.length < 4 && movePool.length) {
        const moveid = this.sampleNoReplace(movePool);
        hasMove[moveid] = true;
        moves.push(moveid);
      }
      counter = this.queryMoves(moves, hasType, {}, movePool);
      for (const [i, setMoveid] of moves.entries()) {
        const move = this.dex.moves.get(setMoveid);
        const moveid = move.id;
        let rejected = false;
        let isSetup = false;
        switch (moveid) {
          case "bulkup":
          case "swordsdance":
            if (counter.setupType !== "Physical" || counter["physicalsetup"] > 1)
              rejected = true;
            if (counter.Physical + counter["physicalpool"] < 2)
              rejected = true;
            isSetup = true;
            break;
          case "calmmind":
          case "nastyplot":
          case "quiverdance":
            if (counter.setupType !== "Special" || counter["specialsetup"] > 1)
              rejected = true;
            if (counter.Special + counter["specialpool"] < 2)
              rejected = true;
            isSetup = true;
            break;
          case "growth":
          case "shellsmash":
            if (counter.setupType !== "Mixed")
              rejected = true;
            if (counter.damagingMoves.length + counter["physicalpool"] + counter["specialpool"] < 2)
              rejected = true;
            isSetup = true;
            break;
          case "agility":
            if (counter.damagingMoves.length < 2 && !counter.setupType)
              rejected = true;
            if (!counter.setupType)
              isSetup = true;
            break;
          case "dragontail":
            if (counter.setupType || !!counter["speedsetup"] || hasMove["encore"] || hasMove["roar"] || hasMove["whirlwind"])
              rejected = true;
            break;
          case "fakeout":
          case "uturn":
            if (counter.setupType || !!counter["speedsetup"] || hasMove["substitute"])
              rejected = true;
            break;
          case "haze":
          case "leechseed":
          case "roar":
          case "whirlwind":
            if (counter.setupType || !!counter["speedsetup"] || hasMove["dragontail"])
              rejected = true;
            break;
          case "protect":
            if (counter.setupType || hasMove["rest"] || hasMove["lightscreen"] || hasMove["reflect"])
              rejected = true;
            break;
          case "seismictoss":
            if (counter.damagingMoves.length > 1 || counter.setupType)
              rejected = true;
            break;
          case "stealthrock":
            if (counter.setupType || !!counter["speedsetup"] || teamDetails.stealthRock)
              rejected = true;
            break;
          case "leechlife":
          case "substitute":
            if (hasMove["uturn"])
              rejected = true;
            break;
          case "dragonclaw":
          case "dragonpulse":
            if (hasMove["dragontail"] || hasMove["outrage"])
              rejected = true;
            break;
          case "thunderbolt":
            if (hasMove["thunder"])
              rejected = true;
            break;
          case "flareblitz":
          case "flamethrower":
          case "lavaplume":
            if (hasMove["fireblast"] || hasMove["firepunch"])
              rejected = true;
            break;
          case "megadrain":
            if (hasMove["petaldance"] || hasMove["powerwhip"])
              rejected = true;
            break;
          case "bonemerang":
            if (hasMove["earthquake"])
              rejected = true;
            break;
          case "icebeam":
            if (hasMove["blizzard"])
              rejected = true;
            break;
          case "return":
            if (hasMove["bodyslam"] || hasMove["facade"] || hasMove["doubleedge"])
              rejected = true;
            break;
          case "psychic":
            if (hasMove["psyshock"])
              rejected = true;
            break;
          case "rockslide":
            if (hasMove["stoneedge"])
              rejected = true;
            break;
          case "hydropump":
          case "willowisp":
            if (hasMove["scald"])
              rejected = true;
            break;
          case "surf":
            if (hasMove["hydropump"] || hasMove["scald"])
              rejected = true;
            break;
        }
        if (move.priority !== 0 && !!counter["speedsetup"]) {
          rejected = true;
        }
        if (move.category === "Physical" && counter.setupType === "Special" || move.category === "Special" && counter.setupType === "Physical") {
          if (!hasType[move.type] || counter.stab > 1 || counter[move.category] < 2)
            rejected = true;
        }
        if (counter.setupType && !isSetup && counter.setupType !== "Mixed" && move.category !== counter.setupType && counter[counter.setupType] < 2) {
          if (move.category !== "Status" || counter[counter.setupType] + counter.Status > 3 && counter["physicalsetup"] + counter["specialsetup"] < 2) {
            rejected = true;
          }
        }
        if (!rejected && (counter["physicalsetup"] + counter["specialsetup"] < 2 && (!counter.setupType || counter.setupType === "Mixed" || move.category !== counter.setupType && move.category !== "Status" || counter[counter.setupType] + counter.Status > 3)) && ((counter.damagingMoves.length === 0 || !counter.stab) && (counter["physicalpool"] || counter["specialpool"]) || hasType["Dark"] && !counter["Dark"] || hasType["Dragon"] && !counter["Dragon"] || hasType["Electric"] && !counter["Electric"] || hasType["Fighting"] && !counter["Fighting"] && (counter.setupType || !counter["Status"]) || hasType["Fire"] && !counter["Fire"] || hasType["Ghost"] && !hasType["Dark"] && !counter["Ghost"] || hasType["Ground"] && !counter["Ground"] || hasType["Ice"] && !counter["Ice"] || hasType["Water"] && (!counter["Water"] || !counter.stab))) {
          if (!isSetup && !move.damage && (move.category !== "Status" || !move.flags.heal)) {
            if (move.category === "Status" || !hasType[move.type] || move.selfSwitch || move.basePower && move.basePower < 40 && !move.multihit)
              rejected = true;
          }
        }
        if (rejected && movePool.length) {
          moves.splice(i, 1);
          break;
        }
      }
    } while (moves.length < 4 && movePool.length);
    const ivs = {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31
    };
    if (!counter["Physical"] && !hasMove["transform"]) {
      ivs.atk = 0;
    }
    return {
      name: species.baseSpecies,
      species: forme,
      level: 100,
      gender: species.gender,
      happiness: 70,
      shiny: this.randomChance(1, 1024),
      item: species.requiredItem || "",
      ability: "No Ability",
      moves,
      evs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
      ivs
    };
  }
  randomTeam() {
    const pokemon = [];
    const pokemonPool = [];
    for (const id in this.dex.data.FormatsData) {
      const species = this.dex.species.get(id);
      if (species.num < 1 || species.num > 151 && ![808, 809].includes(species.num) || species.gen > 7 || species.nfe || !species.randomBattleMoves || !species.randomBattleMoves.length)
        continue;
      pokemonPool.push(id);
    }
    const typeCount = {};
    const typeComboCount = {};
    const baseFormes = {};
    const teamDetails = {};
    while (pokemonPool.length && pokemon.length < 6) {
      const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
      if (!species.exists)
        continue;
      if (baseFormes[species.baseSpecies])
        continue;
      const types = species.types;
      let skip = false;
      for (const type of species.types) {
        if (typeCount[type] > 1 && this.randomChance(4, 5)) {
          skip = true;
          break;
        }
      }
      if (skip)
        continue;
      const set = this.randomSet(species, teamDetails);
      const typeCombo = types.slice().sort().join();
      if (typeComboCount[typeCombo] >= 1)
        continue;
      pokemon.push(set);
      baseFormes[species.baseSpecies] = 1;
      for (const type of types) {
        if (type in typeCount) {
          typeCount[type]++;
        } else {
          typeCount[type] = 1;
        }
      }
      if (typeCombo in typeComboCount) {
        typeComboCount[typeCombo]++;
      } else {
        typeComboCount[typeCombo] = 1;
      }
      if (set.moves.includes("stealthrock"))
        teamDetails["stealthRock"] = 1;
      if (set.moves.includes("rapidspin"))
        teamDetails["rapidSpin"] = 1;
    }
    return pokemon;
  }
}
//# sourceMappingURL=random-teams.js.map
