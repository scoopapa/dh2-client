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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  /* Gen 7 MetaMons*/
  auraspheregen7: {
    num: 396,
    accuracy: true,
    basePower: 90,
    category: "Special",
    shortDesc: "This move does not check accuracy.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Aura Sphere", target);
    },
    name: "Aura Sphere-Gen 7",
    pp: 20,
    priority: 0,
    flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1, distance: 1 },
    secondary: null,
    target: "any",
    type: "Fighting",
    contestType: "Beautiful"
  },
  explosiongen7: {
    num: 153,
    accuracy: 100,
    basePower: 500,
    category: "Physical",
    shortDesc: "Target's Def halved during damage. User faints.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Explosion", target);
    },
    name: "Explosion-Gen 7",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Beautiful"
  },
  fellstingergen7: {
    num: 565,
    accuracy: 100,
    basePower: 500,
    category: "Physical",
    shortDesc: "Target's Def halved during damage. User faints.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Skitter Smack", target);
    },
    name: "Fell Stinger-Gen 7",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  iciclecrash: {
    num: 556,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "30% chance to flinch the target.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Icicle Crash", target);
    },
    name: "Icicle Crash-Gen 7",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  moonlightgen7: {
    num: 236,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Heals the user by a weather-dependent amount.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Moonlight", target);
    },
    name: "Moonlight-Gen 7",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
          factor = 0.25;
          break;
      }
      return !!this.heal(this.modify(pokemon.maxhp, factor));
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  playroughgen7: {
    num: 583,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "10% chance to lower the target's Attack by 1.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Play Rough", target);
    },
    name: "Play Rough-Gen 7",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cute"
  },
  rockslidegen7: {
    num: 157,
    accuracy: 90,
    basePower: 75,
    category: "Physical",
    name: "Rock Slide-Gen 7",
    shortDesc: "30% chance to flinch the target.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Rock Slide", target);
    },
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Rock",
    contestType: "Tough"
  },
  shadowclawgen7: {
    num: 421,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "20% chance to lower foe's Defense.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shadow Claw", target);
    },
    name: "Shadow Claw-Gen 7",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  shelltrapgen7: {
    num: 704,
    accuracy: 75,
    basePower: 100,
    category: "Physical",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shell Trap", target);
    },
    name: "Shell Trap-Gen 7",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  sketchgen7: {
    num: 166,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Uses the last move used in the battle.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Sketch", target);
    },
    name: "Sketch-Gen 7",
    pp: 1,
    noPPBoosts: true,
    priority: 0,
    flags: { authentic: 1, mystery: 1 },
    onHit(target, source) {
      const disallowedMoves = ["auraspheregen7", "brickbreak", "doubleedge", "healingwish", "hypervoice", "moonblast", "playroughgen7", "psychic", "quickattack", "shadowclawgen7", "stealthrock", "swordsdance", "taunt", "throatchop", "uturn", "vacuumwave"];
      const move = target.lastMove;
      if (source.transformed || !move || source.moves.includes(move.id))
        return false;
      if (disallowedMoves.includes(move.id) || move.isZ || move.isMax)
        return false;
      const sketchIndex = source.moves.indexOf("sketch");
      if (sketchIndex < 0)
        return false;
      const sketchedMove = {
        move: move.name,
        id: move.id,
        pp: move.pp,
        maxpp: move.pp,
        target: move.target,
        disabled: false,
        used: false
      };
      source.moveSlots[sketchIndex] = sketchedMove;
      this.add("-activate", source, "move: Sketch-Gen 7", move.name);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Clever"
  },
  windshackle: {
    num: 662,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Air Cutter", target);
    },
    name: "Wind Shackle",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  /* Gen 8 MetaMons*/
  acidrain: {
    basePower: 75,
    accuracy: 100,
    category: "Special",
    shortDesc: "Deals super effective damage against Rock-types. has a 20% chance to poison the target.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Acid Downpour", target);
    },
    id: "acidrain",
    name: "Acid Rain",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Rock")
        return 1;
    },
    secondary: {
      chance: 20,
      status: "psn"
    },
    target: "normal",
    type: "Poison"
  },
  copycatblast: {
    num: 686,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Type varies based on the user's secondary type.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Aura Sphere", target);
    },
    name: "Copycat Blast",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      const types = pokemon.getTypes();
      let type = types[1] || types[0];
      if (type === "Bird")
        type = "Normal";
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
  },
  rudeparting: {
    num: 521,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    shortDesc: "User switches out after damaging the target.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Parting Shot", target);
    },
    name: "Rude Parting",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  mindreader: {
    num: 170,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Raises user's Sp. Atk and accuracy by 1; 2 in Hail",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Haze", target);
    },
    name: "Mind Reader",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon) {
      if (["hail"].includes(pokemon.effectiveWeather()))
        move.boosts = { spa: 2, accuracy: 2 };
    },
    boosts: {
      spa: 1,
      accuracy: 1
    },
    secondary: null,
    target: "self",
    type: "Ice",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  /* Gen 9 MetaMons*/
  spectralfang: {
    num: 533,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Spectral Fang",
    shortDesc: "Ignore the target's stat changes.",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Jaw Lock", target);
    },
    pp: 15,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    ignoreEvasion: true,
    ignoreDefensive: true,
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  revelationdance: {
    num: 686,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Revelation Dance",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, dance: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
  },
  sappyseed: {
    num: 738,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Sappy Seed",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    onHit(target, source) {
      if (target.hasType("Grass"))
        return null;
      target.addVolatile("leechseed", source);
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Clever"
  },
  ragingbullcombat: {
    num: 873,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Raging Bull-Combat",
    shortDesc: "Damage calculated using the foe's Sp. Def.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    overrideOffensivePokemon: "target",
    overrideOffensiveStat: "spd",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Outrage", target);
    },
    secondary: null,
    target: "normal",
    type: "Fighting"
  },
  ragingbullblaze: {
    num: 873,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Raging Bull-Blaze",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Flare Blitz", target);
    },
    secondary: null,
    target: "normal",
    type: "Fire"
  },
  ragingbullaqua: {
    num: 873,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Raging Bull-Aqua",
    shortDesc: "40% chance of quartering Speed of foes switching in.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Wave Crash", target);
    },
    secondary: {
      chance: 40,
      sideCondition: "grasspledge"
    },
    target: "normal",
    type: "Water"
  },
  clusterexplosion: {
    num: 153.5,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Cluster Explosion",
    shortDesc: "Hits adjacent Pokemon. Sets Spikes. User faints.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, noparentalbond: 1 },
    onPrepareHit(target, pokemon, move) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Splintered Stormshards", pokemon);
    },
    onTryMove(source, target, move) {
      if (!move.hasSheerForce) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
        }
      }
    },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Rock",
    contestType: "Beautiful"
  }
};
//# sourceMappingURL=moves.js.map
