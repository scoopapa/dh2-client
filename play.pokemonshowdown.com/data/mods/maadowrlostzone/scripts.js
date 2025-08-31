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
    excludeStandardTiers: true,
    customTiers: ["Mega", "LZ", "LZ NFE"],
    customDoublesTiers: ["Mega", "LZ", "LZ NFE"]
  },
  init() {
    this.modData("Learnsets", "ampharos").learnset.milkdrink = ["9M"];
    this.modData("Learnsets", "avalugg").learnset.lifedew = ["9M"];
    this.modData("Learnsets", "banette").learnset.copycat = ["9M"];
    this.modData("Learnsets", "banette").learnset.stringshot = ["9M"];
    this.modData("Learnsets", "bastiodon").learnset.blockage = ["9M"];
    this.modData("Learnsets", "beedrill").learnset.hazardstinger = ["9M"];
    this.modData("Learnsets", "bouffalant").learnset.quickattack = ["9M"];
    this.modData("Learnsets", "bouffalant").learnset.rampage = ["9M"];
    this.modData("Learnsets", "centiskorch").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "cherrim").learnset.encore = ["9M"];
    this.modData("Learnsets", "cherrim").learnset.springbloom = ["9M"];
    this.modData("Learnsets", "croagunk").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "croagunk").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "croagunk").learnset.reactivepoison = ["9M"];
    this.modData("Learnsets", "croagunk").learnset.superpower = ["9M"];
    delete this.modData("Learnsets", "dragonite").learnset.dualwingbeat;
    this.modData("Learnsets", "dusknoir").learnset.cursedwrath = ["9M"];
    this.modData("Learnsets", "eelektross").learnset.shortcircuit = ["9M"];
    this.modData("Learnsets", "flabebe").learnset.lifedew = ["9M"];
    this.modData("Learnsets", "flabebe").learnset.tailwind = ["9M"];
    this.modData("Learnsets", "flygon").learnset.sandpit = ["9M"];
    this.modData("Learnsets", "goomy").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "goomy").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "goomy").learnset.reactivepoison = ["9M"];
    this.modData("Learnsets", "mareep").learnset.risingvoltage = ["9M"];
    this.modData("Learnsets", "medicham").learnset.channeling = ["9M"];
    this.modData("Learnsets", "natu").learnset.destinybond = ["9M"];
    this.modData("Learnsets", "natu").learnset.mindbend = ["9M"];
    this.modData("Learnsets", "nidoking").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "nidoking").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "nidoking").learnset.reactivepoison = ["9M"];
    this.modData("Learnsets", "nidoqueen").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "nidoqueen").learnset.milkdrink = ["9M"];
    this.modData("Learnsets", "nidoqueen").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "nidoqueen").learnset.reactivepoison = ["9M"];
    this.modData("Learnsets", "orbeetle").learnset.brainage = ["9M"];
    this.modData("Learnsets", "poochyena").learnset.jawlock = ["9M"];
    this.modData("Learnsets", "sandaconda").learnset.sandgeyser = ["9M"];
    this.modData("Learnsets", "sandaconda").learnset.weatherball = ["9M"];
    this.modData("Learnsets", "sandshrew").learnset.grassknot = ["9M"];
    this.modData("Learnsets", "sandshrew").learnset.grassyglide = ["9M"];
    this.modData("Learnsets", "sandshrew").learnset.grassyterrain = ["9M"];
    this.modData("Learnsets", "sawsbuck").learnset.seasonalantlers = ["9M"];
    this.modData("Learnsets", "sharpedo").learnset.jetbite = ["9M"];
    this.modData("Learnsets", "sharpedo").learnset.wavecrash = ["9M"];
    this.modData("Learnsets", "skrelp").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "skrelp").learnset.gastroacid = ["9M"];
    this.modData("Learnsets", "skrelp").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "skrelp").learnset.roost = ["9M"];
    this.modData("Learnsets", "skrelp").learnset.terrainpulse = ["9M"];
    this.modData("Learnsets", "slaking").learnset.fakeout = ["9M"];
    this.modData("Learnsets", "slaking").learnset.feint = ["9M"];
    this.modData("Learnsets", "slaking").learnset.rampage = ["9M"];
    this.modData("Learnsets", "steelix").learnset.headlongrush = ["9M"];
    this.modData("Learnsets", "turtonator").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "turtonator").learnset.oilspill = ["9M"];
    this.modData("Learnsets", "turtonator").learnset.reactivepoison = ["9M"];
    this.modData("Learnsets", "zubat").learnset.acidicterrain = ["9M"];
    this.modData("Learnsets", "zubat").learnset.reactivepoison = ["9M"];
    for (const id in this.dataCache.Pokedex) {
      const newMon = this.dataCache.Pokedex[id];
      if (!newMon || !newMon.copyData)
        continue;
      const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];
      if (!newMon.types && copyData.types)
        newMon.types = copyData.types;
      if (!newMon.baseStats && copyData.baseStats)
        newMon.baseStats = copyData.baseStats;
      if (!newMon.abilities && copyData.abilities)
        newMon.abilities = copyData.abilities;
      if (!newMon.num && copyData.num)
        newMon.num = copyData.num * -1;
      if (!newMon.genderRatio && copyData.genderRatio)
        newMon.genderRatio = copyData.genderRatio;
      if (!newMon.heightm && copyData.heightm)
        newMon.heightm = copyData.heightm;
      if (!newMon.weightkg && copyData.weightkg)
        newMon.weightkg = copyData.weightkg;
      if (!newMon.color && copyData.color)
        newMon.color = copyData.color;
      if (!newMon.eggGroups && copyData.eggGroups)
        newMon.eggGroups = copyData.eggGroups;
      let copyMoves = newMon.copyData;
      if (newMon.copyMoves)
        copyMoves = newMon.copyMoves;
      if (copyMoves) {
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
        for (const moveid in learnset) {
          this.modData("Learnsets", id).learnset[moveid] = learnset[moveid].filter(
            (method) => !method.includes("S")
          );
        }
        if (newMon.movepoolAdditions) {
          for (const move of newMon.movepoolAdditions) {
            this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)] = ["9M"];
          }
        }
        if (newMon.movepoolDeletions) {
          for (const move of newMon.movepoolDeletions) {
            delete this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)];
          }
        }
        if (newMon.name === "Eclipseroid") {
          for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
            this.modData("Learnsets", id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
              (method) => !method.includes("S")
            );
          }
        }
      }
    }
  },
  // New line
  actions: {
    canAscend(pokemon) {
      if (pokemon.baseSpecies.baseSpecies === "Matokoda" && pokemon.getItem().id === "matokodium") {
        return "Matokoda-Ascend";
      }
      return null;
    },
    canMegaEvo(pokemon) {
      const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
      const item = pokemon.getItem();
      if (altForme?.isMega && altForme?.requiredMove && pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove) {
        return altForme.name;
      }
      if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbucksummer")
        return "Sawsbuck-Summer-Mega";
      if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckautumn")
        return "Sawsbuck-Autumn-Mega";
      if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckwinter")
        return "Sawsbuck-Winter-Mega";
      if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name)
        return null;
      return item.megaStone;
    }
  }
  // end
};
//# sourceMappingURL=scripts.js.map
