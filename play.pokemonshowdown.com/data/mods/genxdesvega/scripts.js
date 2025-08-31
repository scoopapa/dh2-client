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
    customTiers: ["Desvega Uber", "Desvega OU", "Desvega NFE", "Desvega LC"],
    customDoublesTiers: ["DGX"]
  },
  init() {
    const undexitedMons = [];
    for (const pokemon in this.data.FormatsData) {
      const tierData = this.modData("FormatsData", pokemon);
      if (!tierData || !tierData.tier || !tierData.tier.startsWith("Desvega")) {
        continue;
      }
      const mon = this.modData("Pokedex", pokemon);
      if (!mon) {
        continue;
      }
      if (mon.num > 1100) {
        if (mon.num < 1328)
          mon.gen = 8;
        continue;
      }
      const learnsetData = this.modData("Learnsets", pokemon);
      if (!learnsetData || !learnsetData.learnset) {
        continue;
      }
      const learnset = learnsetData.learnset;
      if (learnset.terablast) {
        continue;
      }
      if (mon.forme) {
        if (["Brazdo", "Loria"].includes(mon.forme)) {
          mon.gen = 8;
          continue;
        }
        if (mon.forme.startsWith("Desvega")) {
          mon.gen = 9;
          continue;
        }
        if (pokemon.startsWith("rotom")) {
          continue;
        }
      }
      undexitedMons.push(pokemon);
      if (!mon.types.includes("Poison") && learnset.toxic)
        delete learnset.toxic;
      for (const move in learnset) {
        learnset[move].push("9L1");
      }
    }
    this.modData("Learnsets", "oddish").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "oddish").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "gloom").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "gloom").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "bellossom").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "bellossom").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "machop").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "machoke").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "machamp").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "geodude").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "graveler").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "golem").learnset.taunt = ["9L1"];
    this.modData("Learnsets", "mandibuzz").learnset.airdive = ["9L1"];
    this.modData("Learnsets", "trubbish").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "trubbish").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "garbodor").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "garbodor").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "plusle").learnset.pluspulse = ["9L1"];
    this.modData("Learnsets", "plusle").learnset.sparkingleap = ["9L1", "8L1"];
    this.modData("Learnsets", "plusle").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "minun").learnset.minusion = ["9L1"];
    this.modData("Learnsets", "minun").learnset.sparkingleap = ["9L1", "8L1"];
    this.modData("Learnsets", "minun").learnset.shocktail = ["9L1", "8L1"];
    delete this.modData("Learnsets", "bidoof").learnset.sunnyday;
    delete this.modData("Learnsets", "bibarel").learnset.sunnyday;
    this.modData("Learnsets", "bibarel").learnset.wavecrash = ["9L70"];
    this.modData("Learnsets", "bibarel").learnset.shocktail = ["9M"];
    this.modData("Learnsets", "stunfisk").learnset.sparkingleap = ["9L1", "8L1"];
    this.modData("Learnsets", "pachirisu").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "braviary").learnset.airdive = ["9L1"];
    this.modData("Learnsets", "hawlucha").learnset.airdive = ["9L1"];
    this.modData("Learnsets", "gligar").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "gliscor").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "wooper").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "quagsire").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "wooperpaldea").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "wooperpaldea").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "clodsire").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "clodsire").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "deino").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "zweilous").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "hydreigon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "hydreigon").learnset.roost = ["9L1"];
    this.modData("Learnsets", "swinub").learnset.terracharge = ["9L1", "8L1"];
    this.modData("Learnsets", "piloswine").learnset.tripleaxel = ["9L1"];
    this.modData("Learnsets", "piloswine").learnset.terracharge = ["9L1", "8L1"];
    this.modData("Learnsets", "mamoswine").learnset.tripleaxel = ["9L1"];
    this.modData("Learnsets", "mamoswine").learnset.terracharge = ["9L1", "8L1"];
    this.modData("Learnsets", "tandemaus").learnset.nuzzle = ["9L1"];
    this.modData("Learnsets", "tandemaus").learnset.tripleaxel = ["9L1"];
    this.modData("Learnsets", "maushold").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "maushold").learnset.nuzzle = ["9L1"];
    this.modData("Learnsets", "maushold").learnset.tripleaxel = ["9L1"];
    this.modData("Learnsets", "poipole").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "naganadel").learnset.poisonterrain = ["9L1"];
    this.modData("Learnsets", "naganadel").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "rotom").learnset.sparkingleap = ["9L1", "8L1"];
    this.modData("Learnsets", "rotom").learnset.dazzlinggleam = ["9L1"];
    this.modData("Learnsets", "rotom").learnset.playrough = ["9L1"];
    this.modData("Learnsets", "rotom").learnset.wildcharge = ["9L1"];
    this.modData("Learnsets", "frogadier").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "greninja").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "greninjabond").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "mareanie").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "toxapex").learnset.toxicshock = ["9L1"];
    this.modData("Learnsets", "hippopotas").learnset.terracharge = ["9L1", "8L1"];
    this.modData("Learnsets", "hippowdon").learnset.terracharge = ["9L1", "8L1"];
    this.modData("Learnsets", "litleo").learnset.drift = ["9L1"];
    this.modData("Learnsets", "litleo").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "pyroar").learnset.drift = ["9L1"];
    this.modData("Learnsets", "pyroar").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "fennekin").learnset.drift = ["9L1"];
    this.modData("Learnsets", "fennekin").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "braixen").learnset.drift = ["9L1"];
    this.modData("Learnsets", "braixen").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "braixen").learnset.shocktail = ["9L1"];
    this.modData("Learnsets", "delphox").learnset.drift = ["9L1"];
    this.modData("Learnsets", "delphox").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "delphox").learnset.shocktail = ["9L1"];
    this.modData("Learnsets", "rockruff").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "rockruffdusk").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "lycanroc").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "lycanrocmidnight").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "lycanrocmidnight").learnset.crippleclobber = ["9L1", "8L1"];
    this.modData("Learnsets", "lycanrocdusk").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "rampardos").learnset.crippleclobber = ["9L1", "8L1"];
    this.modData("Learnsets", "gigalith").learnset.crippleclobber = ["9L1", "8L1"];
    this.modData("Learnsets", "stonjourner").learnset.crippleclobber = ["9L1", "8L1"];
    this.modData("Learnsets", "magby").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "magmar").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "magmortar").learnset.quickshot = ["9L1", "8L1"];
    this.modData("Learnsets", "elekid").learnset.thunderstrike = ["9L1", "8L1"];
    this.modData("Learnsets", "elekid").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "electabuzz").learnset.thunderstrike = ["9L1", "8L1"];
    this.modData("Learnsets", "electabuzz").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "electivire").learnset.thunderstrike = ["9L1", "8L1"];
    this.modData("Learnsets", "electivire").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "vibrava").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "flygon").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "pichu").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "pikachu").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "raichu").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "raichualola").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "eevee").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "vaporeon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "jolteon").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "jolteon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "flareon").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "flareon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "flareon").learnset.bulkup = ["9L1", "8L1"];
    this.modData("Learnsets", "espeon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "umbreon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "leafeon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "leafeon").learnset.bushclaws = ["9L1", "8L1"];
    this.modData("Learnsets", "leafeon").learnset.fireworkleaf = ["9L1", "8L1"];
    this.modData("Learnsets", "glaceon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "glaceon").learnset.surf = ["9L1", "8L1"];
    this.modData("Learnsets", "glaceon").learnset.hydropump = ["9L1", "8L1"];
    this.modData("Learnsets", "sylveon").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "ekans").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "ekans").learnset.poisonterrain = ["9L1", "8L1"];
    this.modData("Learnsets", "arbok").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "arbok").learnset.poisonterrain = ["9L1", "8L1"];
    this.modData("Learnsets", "arbok").learnset.uturn = ["9L1", "8L1"];
    this.modData("Learnsets", "arbok").learnset.dragonrush = ["9L1", "8L1"];
    this.modData("Learnsets", "sableye").learnset.drainfang = ["9L1", "8L1"];
    this.modData("Learnsets", "dragonair").learnset.defog = ["9L1"];
    this.modData("Learnsets", "dragonite").learnset.defog = ["9L1"];
    this.modData("Learnsets", "bagon").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "shelgon").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "salamence").learnset.uturn = ["9L1"];
    this.modData("Learnsets", "salamence").learnset.defog = ["9L1"];
    this.modData("Learnsets", "rolycoly").learnset.drift = ["9L1"];
    this.modData("Learnsets", "carkol").learnset.drift = ["9L1"];
    this.modData("Learnsets", "carkol").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "coalossal").learnset.drift = ["9L1"];
    this.modData("Learnsets", "coalossal").learnset.knockoff = ["9L1"];
    this.modData("Learnsets", "flareon").learnset.drift = ["9L1"];
    this.modData("Learnsets", "tepig").learnset.drift = ["9L1"];
    this.modData("Learnsets", "pignite").learnset.drift = ["9L1"];
    this.modData("Learnsets", "emboar").learnset.drift = ["9L1"];
    this.modData("Learnsets", "turtonator").learnset.drift = ["9L1"];
    this.modData("Learnsets", "capsakid").learnset.drift = ["9L1"];
    this.modData("Learnsets", "scovillain").learnset.drift = ["9L1"];
    this.modData("Learnsets", "serperior").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "serperior").learnset.dragonhammer = ["9L1", "8L1"];
    this.modData("Learnsets", "serperior").learnset.drillrun = ["9L1", "8L1"];
    this.modData("Learnsets", "emboar").learnset.shocktail = ["9L1", "8L1"];
    this.modData("Learnsets", "emboar").learnset.calmmind = ["9L1", "8L1"];
    this.modData("Learnsets", "emboar").learnset.earthpower = ["9L1", "8L1"];
    this.modData("Learnsets", "samurott").learnset.shadowball = ["9L1", "8L1"];
    this.modData("Learnsets", "samurott").learnset.hypervoice = ["9L1", "8L1"];
    this.modData("Learnsets", "samurott").learnset.focusblast = ["9L1", "8L1"];
    this.modData("Learnsets", "applin").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "flapple").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "appletun").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "dipplin").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "hydrapple").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "carbink").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "eiscue").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "wooloo").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "dubwool").learnset.rapidspin = ["9L1"];
    this.modData("Learnsets", "oddish").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "gloom").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "vileplume").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "bellossom").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "venipede").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "whirlipede").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "scolipede").learnset.mortalspin = ["9L1"];
    this.modData("Learnsets", "paras").learnset.toxic = ["9L1"];
    this.modData("Learnsets", "parasect").learnset.toxic = ["9L1"];
    this.modData("Learnsets", "aerodactyl").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "cranidos").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "rampardos").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "geodude").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "graveler").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "golem").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "stonjourner").learnset.accelerock = ["9L1"];
    this.modData("Learnsets", "lycanrocmidnight").learnset.accelerock = ["9L1"];
  },
  runAction(action) {
    const pokemonOriginalHP = action.pokemon?.hp;
    let residualPokemon = [];
    switch (action.choice) {
      case "start": {
        for (const side of this.sides) {
          side.pokemonLeft && (side.pokemonLeft = side.pokemon.length);
        }
        this.add("start");
        for (const pokemon of this.getAllPokemon()) {
          let rawSpecies = null;
          if (pokemon.species.id === "zacian") {
            if (pokemon.item === "rustedsword")
              rawSpecies = this.dex.species.get("Zacian-Crowned");
          } else if (pokemon.species.id === "zamazenta" && pokemon.item === "rustedshield") {
            rawSpecies = this.dex.species.get("Zamazenta-Crowned");
          }
          if (!rawSpecies)
            continue;
          const species = pokemon.setSpecies(rawSpecies);
          if (!species)
            continue;
          pokemon.baseSpecies = rawSpecies;
          pokemon.details = species.name + (pokemon.level === 100 ? "" : ", L" + pokemon.level) + (pokemon.gender === "" ? "" : ", " + pokemon.gender) + (pokemon.set.shiny ? ", shiny" : "");
          pokemon.setAbility(species.abilities["0"], null, true);
          pokemon.baseAbility = pokemon.ability;
          const behemothMove = {
            "Zacian-Crowned": "behemothblade",
            "Zamazenta-Crowned": "behemothbash"
          };
          const ironHead = pokemon.baseMoves.indexOf("ironhead");
          if (ironHead >= 0) {
            const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
            const movepp = move.noPPBoosts || move.isZ ? move.pp : move.pp * 8 / 5;
            pokemon.baseMoveSlots[ironHead] = {
              move: move.name,
              id: move.id,
              pp: movepp,
              maxpp: movepp,
              target: move.target,
              disabled: false,
              disabledSource: "",
              used: false
            };
            pokemon.moveSlots = pokemon.baseMoveSlots.slice();
          }
        }
        if (this.format.onBattleStart)
          this.format.onBattleStart.call(this);
        for (const rule of this.ruleTable.keys()) {
          if ("+*-!".includes(rule.charAt(0)))
            continue;
          const subFormat = this.dex.formats.get(rule);
          if (subFormat.onBattleStart)
            subFormat.onBattleStart.call(this);
        }
        for (const side of this.sides) {
          for (let i = 0; i < side.active.length; i++) {
            if (side.pokemonLeft) {
              this.actions.switchIn(side.pokemon[i], i);
              continue;
            }
            side.active[i] = side.pokemon[i];
            side.active[i].fainted = true;
            side.active[i].hp = 0;
          }
        }
        for (const pokemon of this.getAllPokemon()) {
          this.singleEvent("Start", this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
        }
        this.midTurn = true;
        break;
      }
      case "move":
        if (!action.pokemon.isActive || action.pokemon.fainted)
          return false;
        this.actions.runMove(
          action.move,
          action.pokemon,
          action.targetLoc,
          action.sourceEffect,
          action.zmove,
          void 0,
          action.maxMove,
          action.originalTarget
        );
        break;
      case "megaEvo":
        this.actions.runMegaEvo(action.pokemon);
        break;
      case "runDynamax":
        action.pokemon.addVolatile("dynamax");
        action.pokemon.side.dynamaxUsed = true;
        if (action.pokemon.side.allySide)
          action.pokemon.side.allySide.dynamaxUsed = true;
        break;
      case "terastallize":
        this.actions.terastallize(action.pokemon);
        break;
      case "beforeTurnMove":
        if (!action.pokemon.isActive || action.pokemon.fainted)
          return false;
        this.debug("before turn callback: " + action.move.id);
        const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
        if (!target)
          return false;
        if (!action.move.beforeTurnCallback)
          throw new Error(`beforeTurnMove has no beforeTurnCallback`);
        action.move.beforeTurnCallback.call(this, action.pokemon, target);
        break;
      case "priorityChargeMove":
        if (!action.pokemon.isActive || action.pokemon.fainted)
          return false;
        this.debug("priority charge callback: " + action.move.id);
        if (!action.move.priorityChargeCallback)
          throw new Error(`priorityChargeMove has no priorityChargeCallback`);
        action.move.priorityChargeCallback.call(this, action.pokemon);
        break;
      case "event":
        this.runEvent(action.event, action.pokemon);
        break;
      case "team":
        if (action.index === 0) {
          action.pokemon.side.pokemon = [];
        }
        action.pokemon.side.pokemon.push(action.pokemon);
        action.pokemon.position = action.index;
        return;
      case "pass":
        return;
      case "instaswitch":
      case "switch":
        if (action.choice === "switch" && action.pokemon.status) {
          this.singleEvent("CheckShow", this.dex.abilities.getByID("naturalcure"), null, action.pokemon);
        }
        if (this.actions.switchIn(
          action.target,
          action.pokemon.position,
          action.sourceEffect
        ) !== "pursuitfaint")
          break;
        this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
        break;
      case "revivalblessing":
        action.pokemon.side.pokemonLeft++;
        if (action.target.position < action.pokemon.side.active.length) {
          this.queue.addChoice({
            choice: "instaswitch",
            pokemon: action.target,
            target: action.target
          });
        }
        action.target.fainted = action.target.faintQueued = action.target.subFainted = false;
        action.target.status = "";
        action.target.hp = 1;
        action.target.sethp(action.target.maxhp / 2);
        this.add("-heal", action.target, action.target.getHealth, "[from] move: Revival Blessing");
        action.pokemon.side.removeSlotCondition(action.pokemon, "revivalblessing");
        break;
      case "runUnnerve":
        this.singleEvent("PreStart", action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
        break;
      case "runSwitch":
        this.actions.runSwitch(action.pokemon);
        break;
      case "runPrimal":
        if (!action.pokemon.transformed) {
          this.singleEvent("Primal", action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
        }
        break;
      case "shift":
        if (!action.pokemon.isActive || action.pokemon.fainted)
          return false;
        this.swapPosition(action.pokemon, 1);
        break;
      case "beforeTurn":
        this.eachEvent("BeforeTurn");
        break;
      case "residual":
        this.add("");
        this.clearActiveMove(true);
        this.updateSpeed();
        residualPokemon = this.getAllActive().map((pokemon) => [pokemon, pokemon.getUndynamaxedHP()]);
        this.residualEvent("Residual");
        this.add("upkeep");
        break;
    }
    for (const side of this.sides) {
      for (const pokemon of side.active) {
        if (!pokemon.forceSwitchFlag)
          continue;
        if (pokemon.hp)
          this.actions.dragIn(pokemon.side, pokemon.position);
        pokemon.forceSwitchFlag = false;
      }
    }
    this.clearActiveMove();
    this.faintMessages();
    if (this.ended)
      return true;
    if (!this.queue.peek()) {
      this.checkFainted();
    } else if (action.choice === "megaEvo") {
      this.eachEvent("Update");
      for (const [i, queuedAction] of this.queue.list.entries()) {
        if (queuedAction.pokemon === action.pokemon && queuedAction.choice === "move") {
          this.queue.list.splice(i, 1);
          queuedAction.mega = "done";
          this.queue.insertChoice(queuedAction, true);
          break;
        }
      }
      return false;
    } else if (this.queue.peek()?.choice === "instaswitch") {
      return false;
    }
    this.eachEvent("Update");
    for (const [pokemon, originalHP] of residualPokemon) {
      const halfOfMaxHP = pokemon.getUndynamaxedHP(pokemon.maxhp) / 2;
      if (pokemon.hp && pokemon.getUndynamaxedHP() <= halfOfMaxHP && originalHP > halfOfMaxHP) {
        this.runEvent("EmergencyExit", pokemon);
      }
    }
    if (action.choice === "runSwitch") {
      const pokemon = action.pokemon;
      const threshold = pokemon.maxhp / 2;
      if (pokemon.hp && pokemon.hp <= threshold && pokemonOriginalHP > threshold) {
        this.runEvent("EmergencyExit", pokemon);
      }
    }
    const switches = this.sides.map(
      (side) => side.active.some((pokemon) => pokemon && !!pokemon.switchFlag)
    );
    for (let i = 0; i < this.sides.length; i++) {
      if (switches[i]) {
        let reviveSwitch = false;
        if (!this.canSwitch(this.sides[i])) {
          for (const pokemon of this.sides[i].active) {
            if (this.sides[i].slotConditions[pokemon.position]["revivalblessing"]) {
              reviveSwitch = true;
              continue;
            }
            pokemon.switchFlag = false;
          }
          if (!reviveSwitch)
            switches[i] = false;
        } else {
          for (const pokemon of this.sides[i].active) {
            if (pokemon.switchFlag && pokemon.switchFlag !== "revivalblessing" && !pokemon.skipBeforeSwitchOutEventFlag) {
              this.runEvent("BeforeSwitchOut", pokemon);
              pokemon.skipBeforeSwitchOutEventFlag = true;
              this.faintMessages();
              if (this.ended)
                return true;
              if (pokemon.fainted) {
                switches[i] = this.sides[i].active.some((sidePokemon) => sidePokemon && !!sidePokemon.switchFlag);
              }
            }
          }
        }
      }
    }
    if (switches.some(Boolean)) {
      this.makeRequest("switch");
      return true;
    }
    if (
      /*this.gen >= 8 &&*/
      this.queue.peek()?.choice === "move" || this.queue.peek()?.choice === "runDynamax"
    ) {
      this.updateSpeed();
      for (const queueAction of this.queue.list) {
        if (!queueAction.pokemon)
          continue;
        this.getActionSpeed(queueAction);
      }
      this.queue.sort();
    }
    return false;
  },
  actions: {
    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
      const tr = this.battle.trunc;
      const type = move.type || (move.type = "???");
      baseDamage += 2;
      if (move.spreadHit) {
        const spreadModifier = move.spreadModifier || (this.battle.gameType === "freeforall" ? 0.5 : 0.75);
        this.battle.debug("Spread modifier: " + spreadModifier);
        baseDamage = this.battle.modify(baseDamage, spreadModifier);
      } else if (move.multihitType === "parentalbond" && move.hit > 1) {
        const bondModifier = 0.25;
        this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
        baseDamage = this.battle.modify(baseDamage, bondModifier);
      }
      baseDamage = this.battle.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
      const isCrit = target.getMoveHitData(move).crit;
      if (isCrit) {
        baseDamage = tr(baseDamage * (move.critModifier || /*(this.battle.gen >= 6 ? 1.5 : 2)*/
        1.5));
      }
      baseDamage = this.battle.randomizer(baseDamage);
      if (type !== "???") {
        const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
        let stab = isSTAB ? 1.5 : 1;
        if (pokemon.terastallized !== "Stellar") {
          stab = this.battle.runEvent(
            "ModifySTAB",
            pokemon,
            target,
            move,
            pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type) ? 2 : stab
          );
        } else if (!pokemon.stellarBoostedTypes.includes(type)) {
          stab = isSTAB ? 2 : [4915, 4096];
          if (pokemon.species.name !== "Terapagos-Stellar") {
            pokemon.stellarBoostedTypes.push(type);
          }
        }
        baseDamage = this.battle.modify(baseDamage, stab);
      }
      let typeMod = target.runEffectiveness(move);
      typeMod = this.battle.clampIntRange(typeMod, -6, 6);
      target.getMoveHitData(move).typeMod = typeMod;
      if (typeMod > 0) {
        if (!suppressMessages)
          this.battle.add("-supereffective", target);
        for (let i = 0; i < typeMod; i++) {
          baseDamage *= 2;
        }
      } else if (typeMod < 0) {
        if (!suppressMessages)
          this.battle.add("-resisted", target);
        for (let i = 0; i > typeMod; i--) {
          baseDamage = tr(baseDamage / 2);
        }
      }
      if (isCrit && !suppressMessages)
        this.battle.add("-crit", target);
      if (pokemon.status === "brn" && move.category === "Physical" && !pokemon.hasAbility("guts") && !["facade", "pepperrush"].includes(move.id)) {
        baseDamage = this.battle.modify(baseDamage, 0.5);
      }
      baseDamage = this.battle.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
        baseDamage = this.battle.modify(baseDamage, 0.25);
        this.battle.add("-zbroken", target);
      }
      if (
        /*this.battle.gen !== 5 && */
        !baseDamage
      )
        return 1;
      return tr(baseDamage, 16);
    },
    canMegaEvo(pokemon) {
      if (pokemon.species.isMega)
        return null;
      const item = pokemon.getItem();
      if (!item.megaStone || item.megaStone === pokemon.baseSpecies.name)
        return null;
      return item.megaStone;
    },
    runMegaEvo(pokemon) {
      if (pokemon.species.isMega)
        return false;
      const species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);
      if (this.dex.species.get(pokemon.canMegaEvo).baseSpecies === pokemon.species.baseSpecies) {
        pokemon.formeChange(species, pokemon.getItem(), true);
        for (const ally of pokemon.side.pokemon) {
          if (!ally.item.endsWith("mask") || !ally.getItem().megaStone) {
            ally.canMegaEvo = null;
          }
        }
      } else {
        const oSpecies = this.dex.species.get(pokemon.species);
        const oMegaSpecies = this.dex.species.get(species.originalSpecies);
        pokemon.formeChange(species, pokemon.getItem(), true);
        this.battle.add("-start", pokemon, oMegaSpecies.requiredItem, "[silent]");
        if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
          this.battle.add("-start", pokemon, "typechange", pokemon.species.types.join("/"), "[silent]");
        }
        for (const ally of pokemon.side.pokemon) {
          if (ally.item.endsWith("mask") && ally.getItem().megaStone) {
            ally.canMegaEvo = null;
          }
        }
      }
      return true;
    },
    getMixedSpecies(originalForme, megaForme) {
      const originalSpecies = this.dex.species.get(originalForme);
      const megaSpecies = this.dex.species.get(megaForme);
      if (originalSpecies.baseSpecies === megaSpecies.baseSpecies)
        return megaSpecies;
      return this.mutateOriginalSpecies(originalSpecies, megaSpecies);
    },
    mutateOriginalSpecies(speciesOrForme, formeChangeSpecies) {
      const baseSpecies = this.dex.species.get(formeChangeSpecies.baseSpecies);
      let statDeltas = {};
      let statId;
      for (statId in formeChangeSpecies.baseStats) {
        statDeltas[statId] = formeChangeSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
      }
      const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
      const baseStats = species.baseStats;
      for (const statName in baseStats) {
        baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + statDeltas[statName], 1, 255);
      }
      const abil = formeChangeSpecies.abilities["0"];
      species.abilities = { "0": abil };
      const newType = formeChangeSpecies.types[0];
      species.types = species.types[0] === newType ? [newType] : [species.types[0], newType];
      if (species.types[1]) {
        const firsttype = species.types[0];
        this.battle.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + ` (` + formeChangeSpecies.requiredItem + `)</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${firsttype}.png" alt="${firsttype}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${newType}.png" alt="${newType}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abil + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
      } else {
        this.battle.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + ` (` + formeChangeSpecies.requiredItem + `)</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${newType}.png" alt="${newType}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abil + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
      }
      this.battle.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
      species.originalSpecies = formeChangeSpecies.name;
      species.requiredItem = formeChangeSpecies.requiredItem;
      species.isMega = true;
      return species;
    }
  },
  pokemon: {
    ignoringItem() {
      return !!(this.itemState.knockedOff || // Gen 3-4
      /*this.battle.gen >= 5 &&*/
      !this.isActive || !this.getItem().ignoreKlutz && this.hasAbility("klutz") || this.volatiles["rulebook"] || this.volatiles["embargo"] || this.battle.field.pseudoWeather["magicroom"]);
    },
    runImmunity(type, message) {
      if (!type || type === "???")
        return true;
      if (!this.battle.dex.types.isName(type)) {
        throw new Error("Use runStatusImmunity for " + type);
      }
      if (this.fainted)
        return false;
      const negateImmunity = !this.battle.runEvent("NegateImmunity", this, type);
      const notImmune = type === "Ground" ? this.isGrounded(negateImmunity) : negateImmunity || this.battle.dex.getImmunity(type, this);
      if (notImmune)
        return true;
      if (message) {
        if (notImmune === null) {
          this.battle.add("-immune", this, "[from] ability: " + this.getAbility().name);
        } else {
          this.battle.add("-immune", this);
        }
      }
      return false;
    },
    isGrounded(negateImmunity = false) {
      if ("gravity" in this.battle.field.pseudoWeather || "ingrain" in this.volatiles || "smackdown" in this.volatiles)
        return true;
      const item = this.ignoringItem() ? "" : this.item;
      if (item === "ironball")
        return true;
      if (!negateImmunity && this.hasType("Flying") && !("roost" in this.volatiles))
        return false;
      if (this.hasAbility(["levitate", "soaringspirit"]) && !this.battle.suppressingAbility(this))
        return null;
      if ("magnetrise" in this.volatiles || "telekinesis" in this.volatiles)
        return false;
      if (!["Diglett", "Dugtrio", "Palossand", "Sandygast"].includes(this.baseSpecies.baseSpecies) && this.baseSpecies.name !== "Gengar-Mega" && this.battle.getAllActive().some((target) => target.hasAbility("treetopper")))
        return false;
      return item !== "airballoon";
    },
    /** Specifically: is protected against a single-target damaging move */
    isProtected() {
      return !!(this.volatiles["protect"] || this.volatiles["detect"] || this.volatiles["maxguard"] || this.volatiles["kingsshield"] || this.volatiles["spikyshield"] || this.volatiles["banefulbunker"] || this.volatiles["obstruct"] || this.volatiles["silktrap"] || this.volatiles["burningbulwark"] || this.volatiles["fieldofvision"] || this.volatiles["firewall"] || this.volatiles["toxicsnowball"]);
    }
  }
};
//# sourceMappingURL=scripts.js.map
