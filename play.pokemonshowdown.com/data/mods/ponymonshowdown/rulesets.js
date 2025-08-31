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
  terastalclause: {
    effectType: "Rule",
    name: "Terastal Clause",
    desc: "Prevents Pok&eacute;mon from Terastallizing",
    onBegin() {
      for (const pokemon of this.getAllPokemon()) {
        pokemon.canTerastallize = null;
      }
      this.add("rule", "Terastal Clause: You cannot Terastallize");
    }
  },
  ubersterastalclause: {
    effectType: "Rule",
    name: "Ubers Terastal Clause",
    desc: "Prevents Pok&eacute;mon without Terastal forms from Terastallizing",
    onBegin() {
      for (const pokemon of this.getAllPokemon()) {
        if (pokemon.species.baseSpecies !== "Terapagos") {
          pokemon.canTerastallize = null;
        }
      }
      this.add("rule", "Ubers Terastal Clause: Only Pok\xE9mon with Tera forms can Terastallize");
    }
  },
  megarayquazaclause: {
    effectType: "Rule",
    name: "Mega Rayquaza Clause",
    desc: "Prevents Rayquaza from mega evolving",
    onBegin() {
      this.add("rule", "Mega Rayquaza Clause: You cannot mega evolve Rayquaza");
      for (const pokemon of this.getAllPokemon()) {
        if (pokemon.species.id === "rayquaza") {
          pokemon.canMegaEvo = null;
        }
      }
    }
  },
  datamod: {
    effectType: "Rule",
    name: "Data Mod",
    desc: "When a new Pok\xE9mon switches in for the first time, information about its types, stats and Abilities is displayed to both players.",
    onBegin() {
      for (const pokemon of this.getAllPokemon()) {
        const species = this.dex.species.get(pokemon.species.name);
        const baseSpecies = Dex.species.get(pokemon.species.name);
        let modded = false;
        for (const type in [0, 1]) {
          if (species.types[type] !== baseSpecies.types[type]) {
            modded = true;
          }
        }
        modded = modded || /*if*/
        (species.baseStats.hp !== baseSpecies.baseStats.hp || species.baseStats.atk !== baseSpecies.baseStats.atk || species.baseStats.def !== baseSpecies.baseStats.def || species.baseStats.spa !== baseSpecies.baseStats.spa || species.baseStats.spd !== baseSpecies.baseStats.spd || species.baseStats.spe !== baseSpecies.baseStats.spe || species.abilities[0] !== baseSpecies.abilities[0] || species.abilities[1] !== baseSpecies.abilities[1] || species.abilities["H"] !== baseSpecies.abilities["H"] || species.abilities["S"] !== baseSpecies.abilities["S"]);
        if (modded) {
          pokemon.isModded = true;
        }
      }
    },
    onSwitchIn(pokemon) {
      let species = this.dex.species.get(pokemon.species.name);
      let switchedIn = pokemon.switchedIn;
      if (pokemon.illusion) {
        species = this.dex.species.get(pokemon.illusion.species.name);
        if (!pokemon.illusion.isModded)
          return;
        this.add("-start", pokemon, "typechange", pokemon.illusion.getTypes(true).join("/"), "[silent]");
        if (pokemon.illusion.switchedIn)
          return;
        pokemon.illusion.switchedIn = true;
      } else {
        if (!pokemon.isModded)
          return;
        this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"), "[silent]");
        if (pokemon.switchedIn)
          return;
        pokemon.switchedIn = true;
      }
      let abilities = species.abilities[0];
      if (species.abilities[1]) {
        abilities += ` / ${species.abilities[1]}`;
      }
      if (species.abilities["H"]) {
        abilities += ` / ${species.abilities["H"]}`;
      }
      if (species.abilities["S"]) {
        abilities += ` / ${species.abilities["S"]}`;
      }
      const baseStats = species.baseStats;
      const type = species.types[0];
      if (species.types[1]) {
        const type2 = species.types[1];
        this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
      } else {
        this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
      }
      this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
    },
    onDamagingHit(damage, target, source, move) {
      if (target.hasAbility("illusion")) {
        if (target.isModded) {
          this.add("-start", target, "typechange", target.getTypes(true).join("/"), "[silent]");
          if (!target.switchedIn) {
            target.switchedIn = true;
            let species = this.dex.species.get(target.species.name);
            let abilities = species.abilities[0];
            if (species.abilities[1]) {
              abilities += ` / ${species.abilities[1]}`;
            }
            if (species.abilities["H"]) {
              abilities += ` / ${species.abilities["H"]}`;
            }
            if (species.abilities["S"]) {
              abilities += ` / ${species.abilities["S"]}`;
            }
            const baseStats = species.baseStats;
            const type = species.types[0];
            if (species.types[1]) {
              const type2 = species.types[1];
              this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
            } else {
              this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
            }
            this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
          }
        } else {
          const types = target.baseSpecies.types;
          if (target.getTypes().join() === types.join()) {
            this.add("-end", target, "typechange", "[silent]");
          }
        }
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
