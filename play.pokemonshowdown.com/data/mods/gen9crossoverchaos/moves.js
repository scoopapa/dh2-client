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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  dededehammerthrow: {
    num: -1,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    shortDesc: "Lowers the user's Attack by 1. ",
    name: "Dedede Hammer Throw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hammer Arm", target2);
    },
    self: {
      boosts: {
        atk: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  electrohammer: {
    num: -2,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    shortDesc: "Lowers the user's Speed by 1.",
    name: "Electro Hammer",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hammer Arm", target2);
    },
    self: {
      boosts: {
        atk: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  sheikahslate: {
    num: -3,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    shortDesc: "20% chance to burn, freeze or paralyse the target.",
    name: "Sheikah Slate",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Tri Attack", target2);
    },
    secondary: {
      chance: 20,
      onHit(target2, source2) {
        const result = this.random(3);
        if (result === 0) {
          target2.trySetStatus("brn", source2);
        } else if (result === 1) {
          target2.trySetStatus("par", source2);
        } else {
          target2.trySetStatus("frz", source2);
        }
      }
    },
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  lightarrow: {
    num: -4,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    shortDesc: "Traps target, super-effective against Dark.",
    name: "Light Arrow",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target2, type) {
      if (type === "Dark")
        return 1;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spirit Shackle", target2);
    },
    secondary: {
      chance: 100,
      onHit(target2, source2, move) {
        if (source2.isActive)
          target2.addVolatile("trapped", source2, move, "trapper");
      }
    },
    ignoreImmunity: { "Dark": true },
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  psyblast: {
    num: -5,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Consumes Berry and changes move type.",
    name: "Psy Blast",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyType(move, pokemon2) {
      if (pokemon2.ignoringItem())
        return;
      const item = pokemon2.getItem();
      if (!item.naturalGift)
        return;
      move.type = item.naturalGift.type;
    },
    onPrepareHit(target2, pokemon2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon2, "Psystrike", target2);
      if (pokemon2.ignoringItem())
        return false;
      const item = pokemon2.getItem();
      if (!item.naturalGift)
        return false;
      move.basePower = item.naturalGift.basePower;
      if (!pokemon2.hasAbility("adeptprowess")) {
        pokemon2.setItem("");
        pokemon2.lastItem = item.id;
        pokemon2.usedItemThisTurn = true;
        this.runEvent("AfterUseItem", pokemon2, null, null, item);
      }
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  puyopop: {
    num: -6,
    accuracy: 90,
    basePower: 10,
    basePowerCallback(pokemon2, target2, move) {
      return 10 * move.hit;
    },
    category: "Special",
    shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
    id: "puyopop",
    name: "Puyo Pop",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onHit(target2, source2, move) {
      if (move.hit !== 4)
        return;
      const removeAll = ["spikes", "toxicspikes", "stealthrock", "stickyweb"];
      for (const sideCondition of removeAll) {
        if (source2.side.removeSideCondition(sideCondition)) {
          this.add("-sideend", source2.side, this.dex.conditions.get(sideCondition).name, "[from] move: Puyo Pop", "[of] " + source2);
        }
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Water Shuriken", target2);
    },
    multihit: 4,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Water",
    zMovePower: 180,
    contestType: "Cute"
  },
  dracoburning: {
    num: -7,
    accuracy: 90,
    basePower: 105,
    category: "Physical",
    shortDesc: "Can hit Pokemon using Bounce, Fly, or Sky Drop.",
    name: "Draco Burning",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fire Blast", target2);
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  frostkick: {
    num: -8,
    accuracy: 90,
    basePower: 85,
    category: "Physical",
    shortDesc: "High critical hit ratio. 10% chance to freeze.",
    name: "Frost Kick",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: {
      chance: 10,
      status: "frz"
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ice Hammer", target2);
    },
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  shockkick: {
    num: -9,
    accuracy: 90,
    basePower: 85,
    category: "Physical",
    shortDesc: "High critical hit ratio. 10% chance to paralyze.",
    name: "Shock Kick",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunderous Kick", target2);
    },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  greatfire: {
    num: -10,
    accuracy: true,
    basePower: 200,
    category: "Special",
    name: "Great Fire",
    shortDesc: "Calculates damage using the user's Def instead of SpA.",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Inferno Overdrive", target2);
    },
    overrideOffensiveStat: "def",
    isZ: "dracocentauriumz",
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  jumbobarrel: {
    num: -11,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "30% chance to raise the user's Attack by 1. ",
    name: "Jumbo Barrel",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target2);
      this.add("-anim", source2, "Quick Attack", target2);
    },
    secondary: {
      chance: 30,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Flying",
    contestType: "Cool"
  },
  precisionstrikes: {
    num: -12,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    shortDesc: "Heals 40% of the damage dealt.",
    name: "Precision Strikes",
    pp: 10,
    priority: 0,
    flags: { contact: 1, slicing: 1, heal: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Slash", target2);
    },
    drain: [4, 10],
    target: "normal",
    type: "Fighting",
    contestType: "Cool"
  },
  rudebuster: {
    num: -13,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    defensiveCategory: "Physical",
    shortDesc: "Special if user's SpA is higher.",
    name: "Rude Buster",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Pulse", target2);
      this.add("-anim", source2, "Air Slash", target2);
    },
    onModifyMove(move, pokemon2) {
      if (pokemon2.getStat("atk", false, true) < pokemon2.getStat("spa", false, true))
        move.category = "Special";
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  centipedeassault: {
    num: -14,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    overrideOffensiveStat: "spe",
    shortDesc: "Uses user's Spe stat as Atk in damage calculation.",
    name: "Centipede Assault",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flare Blitz", target2);
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  luciolacruciata: {
    num: -15,
    accuracy: true,
    basePower: 180,
    category: "Physical",
    overrideOffensiveStat: "spe",
    shortDesc: "Uses user's Spe stat as Atk in damage calculation.",
    name: "Luciola Cruciata",
    pp: 1,
    priority: 0,
    flags: { contact: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Inferno Overdrive", target2);
    },
    isZ: "wriggliumz",
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  icebreak: {
    num: -16,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "2x power against resists.",
    name: "Ice Break",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onBasePower(basePower, source2, target2, move) {
      if (target2.runEffectiveness(move) < 0) {
        this.debug(`ice break resist buff`);
        return this.chainModify(2);
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sheer Cold", target2);
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  arrowshot: {
    num: -17,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "High critical hit ratio. Cannot be redirected.",
    name: "Arrow Shot",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    critRatio: 2,
    tracksTarget: true,
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Snipe Shot", target2);
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  mountainrangeshakingfirewoodofvenus: {
    num: -18,
    accuracy: true,
    basePower: 190,
    category: "Special",
    shortDesc: "Increases user's Special Attack by 1.",
    name: "Mountain Range-Shaking Firewood of Venus",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-message", source2.name + " is overflowing with space power!");
      this.add("-anim", source2, "Continental Crush", target2);
    },
    isZ: "maannaniumz",
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  lifesoup: {
    num: -19,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "On hit: user heals 1/10 max HP.",
    name: "Life Soup",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlpool", target2);
      this.add("-anim", source2, "Giga Drain", target2);
    },
    onHit(pokemon2, source2, target2) {
      this.heal(source2.maxhp / 10, source2);
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Cute"
  },
  waterplanet: {
    num: -20,
    accuracy: true,
    basePower: 150,
    category: "Physical",
    shortDesc: "Lowers target's Def and SpD by 1.",
    name: "Water Planet",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Oceanic Operetta", target2);
    },
    isZ: "hecatiumz",
    secondary: {
      chance: 100,
      boosts: {
        def: -1,
        spd: -1
      }
    },
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  shakalakamaracas: {
    num: -21,
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Shakalaka Maracas",
    shortDesc: "Sets up a layer of Spikes on the opposing side.",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Teeter Dance", target2);
      this.add("-anim", source2, "Hyper Voice", target2);
      this.add("-anim", source2, "Grassy Glide", target2);
    },
    onAfterHit(target2, source2, move) {
      if (!move.hasSheerForce && source2.hp) {
        for (const side of source2.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
        }
      }
    },
    onAfterSubDamage(damage, target2, source2, move) {
      if (!move.hasSheerForce && source2.hp) {
        for (const side of source2.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
        }
      }
    },
    secondary: {},
    // Sheer Force-boosted
    target: "normal",
    type: "Grass",
    contestType: "Cute"
  },
  doubledynamite: {
    num: -22,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Double Dynamite",
    shortDesc: "Type varies based on the user's primary type.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      let type = source2.getTypes()[0];
      if (type == "Fire")
        this.add("-anim", source2, "Flamethrower", target2);
      if (type == "Ice")
        this.add("-anim", source2, "Ice Beam", target2);
      this.add("-anim", source2, "Psychic", target2);
    },
    onModifyType(move, pokemon2) {
      let type = pokemon2.getTypes()[0];
      if (type === "Bird")
        type = "???";
      if (type === "Stellar")
        type = pokemon2.getTypes(false, true)[0];
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  treeoceanofhourai: {
    num: -23,
    accuracy: true,
    basePower: 180,
    category: "Special",
    shortDesc: "Drains 75% of damage dealt.",
    name: "Tree-Ocean of Hourai",
    pp: 1,
    priority: 0,
    flags: { bullet: 1, heal: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Surf", target2);
      this.add("-anim", source2, "Muddy Water", target2);
      this.add("-anim", source2, "Giga Drain", target2);
    },
    isZ: "kaguyiumz",
    drain: [3, 4],
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Beautiful"
  },
  poltergust: {
    num: -24,
    accuracy: 95,
    basePower: 110,
    category: "Special",
    name: "Poltergust",
    shortDesc: "20% chance to make the target flinch.",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target2);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "any",
    type: "Flying",
    contestType: "Cute"
  },
  // Negative Zone has no valid means of use due to using an invalid move as base, not implementing unless this is resolved
  heavenlysphere: {
    num: -26,
    accuracy: true,
    basePower: 200,
    category: "Special",
    shortDesc: "If Marle-Parasite: Electric-type",
    name: "Heavenly Sphere",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      if (pokemon.species.name === "Marle-Parasite") {
        this.add("-anim", source2, "Charge", source2);
        this.add("-anim", source2, "Geomancy", source2);
        this.add("-anim", source2, "Electro Ball", target2);
      } else {
        this.add("-anim", source2, "Calm Mind", source2);
        this.add("-anim", source2, "Geomancy", source2);
        this.add("-anim", source2, "Aura Sphere", target2);
      }
    },
    isZ: "marliumz",
    secondary: null,
    onModifyType(move, pokemon2) {
      if (pokemon2.species.name === "Marle-Parasite") {
        move.type = "Electric";
      } else {
        move.type = "Flying";
      }
    },
    target: "normal",
    type: "Flying",
    contestType: "Beautiful"
  },
  desiccation: {
    num: -27,
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Desiccation",
    shortDesc: "Applies Leech Seed on the target.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Salt Cure", target2);
    },
    onHit(target2, source2) {
      if (target2.hasType("Grass"))
        return null;
      target2.addVolatile("leechseed", source2);
    },
    secondary: {},
    // Sheer Force-boosted
    target: "normal",
    type: "Rock",
    contestType: "Cute"
  },
  dollswar: {
    num: -28,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Doll's War",
    shortDesc: "Special if user's SpA is higher. 50% chance to raise Defense by 1.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Photon Geyser", target2);
    },
    onModifyMove(move, pokemon2) {
      if (pokemon2.getStat("atk", false, true) < pokemon2.getStat("spa", false, true))
        move.category = "Special";
    },
    ignoreAbility: true,
    secondary: {
      chance: 50,
      self: {
        boosts: {
          def: 1
        }
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  dollsphalanx: {
    num: -29,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Doll's Phalanx",
    shortDesc: "Protects from moves. Contact: loses 1/8 max HP.",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "dollsphalanx",
    onPrepareHit(pokemon2) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Spiky Shield", target);
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon2);
    },
    onHit(pokemon2) {
      pokemon2.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target2) {
        this.add("-singleturn", target2, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target2, source2, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target2.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target2, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move, source2, target2)) {
          this.damage(source2.baseMaxhp / 8, source2, target2);
        }
        return this.NOT_FAIL;
      },
      onHit(target2, source2, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source2, target2)) {
          this.damage(source2.baseMaxhp / 8, source2, target2);
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  artfulsacrifice: {
    num: -30,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Artful Sacrifice",
    shortDesc: "Special if user's SpA is higher. 30% chance to burn the target.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Prismatic Laser", target2);
    },
    onModifyMove(move, pokemon2) {
      if (pokemon2.getStat("atk", false, true) < pokemon2.getStat("spa", false, true))
        move.category = "Special";
    },
    ignoreAbility: true,
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  // No need for this effect to be coded, given mod isn't a doubles format
  chargedcannondive: {
    num: -31,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Charged Cannon DiVE",
    shortDesc: "Deals additional half damage to the target's ally.",
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wild Charge", target2);
    },
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  bulletburst: {
    num: -32,
    accuracy: 85,
    basePower: 25,
    category: "Physical",
    name: "Bullet Burst",
    shortDesc: "Hits 2 to 5 times. 10% chance to lower the target's Defense by 1 stage.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Metal Burst", target2);
    },
    multihit: [2, 5],
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  redtruth: {
    num: -33,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Red Truth",
    shortDesc: "Bypasses Ghost Immunity. If immunity is bypassed, then neutral effectiveness.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1, sound: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target2);
      this.add("-anim", source2, "Astral Barrage", target2);
    },
    onEffectiveness(typeMod, target2, type, move) {
      if (move.type !== "Normal")
        return;
      if (!target2.runImmunity("Ghost")) {
        if (target2.hasType("Normal"))
          return 0;
      }
    },
    ignoreImmunity: { "Normal": true },
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
  },
  nosferatu: {
    num: -34,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Nosferatu",
    shortDesc: "User recovers 50% of the damage dealt.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Ball", target2);
      this.add("-anim", source2, "Giga Drain", target2);
    },
    drain: [1, 2],
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  waste: {
    num: -35,
    accuracy: 85,
    basePower: 50,
    category: "Special",
    name: "Waste",
    shortDesc: "Hits twice.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hex", target2);
    },
    multihit: 2,
    target: "normal",
    type: "Dark",
    contestType: "Tough"
  },
  goetia: {
    num: -36,
    accuracy: 75,
    basePower: 120,
    category: "Special",
    name: "Goetia",
    shortDesc: "No additional effect.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Black Hole Eclipse", target2);
      this.add("-anim", source2, "Thunder", target2);
    },
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  breechburst: {
    num: -37,
    accuracy: 95,
    basePower: 30,
    category: "Physical",
    name: "Breech Burst",
    shortDesc: "Hits 3 times. 10% chance to give user -1 Spe, +1 Atk, and +1 Def.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Scale Shot", target2);
    },
    multihit: 3,
    secondary: {
      chance: 10,
      self: {
        boosts: {
          atk: 1,
          def: 1,
          spd: -1
        }
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  godslayersword: {
    num: -38,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Godslayer Sword",
    shortDesc: "If not very effective: hits for neutral effectiveness.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sacred Sword", target2);
    },
    onEffectiveness(typeMod, target2, type, move) {
      if (typeMod < 0) {
        return 0;
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  guardianorbitars: {
    num: -39,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Guardian Orbitars",
    shortDesc: "Special attacks targeting the user's side get reflected for the rest of the turn.",
    pp: 20,
    priority: 4,
    flags: { metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magic Coat", source2);
    },
    volatileStatus: "guardianorbiters",
    condition: {
      duration: 1,
      onStart(target2, source2, effect) {
        this.add("-singleturn", target2, "move: Guardian Orbiters");
        if (effect?.effectType === "Move") {
          this.effectState.pranksterBoosted = effect.pranksterBoosted;
        }
      },
      onTryHitPriority: 2,
      onTryHit(target2, source2, move) {
        if (target2 === source2 || move.hasBounced || !move.category === "Special") {
          return;
        }
        const newMove = this.dex.getActiveMove(move.id);
        newMove.hasBounced = true;
        newMove.pranksterBoosted = this.effectState.pranksterBoosted;
        this.actions.useMove(newMove, target2, source2);
        return null;
      },
      onAllyTryHitSide(target2, source2, move) {
        if (target2.isAlly(source2) || move.hasBounced || !move.category === "Special") {
          return;
        }
        const newMove = this.dex.getActiveMove(move.id);
        newMove.hasBounced = true;
        newMove.pranksterBoosted = false;
        this.actions.useMove(newMove, this.effectState.target, source2);
        return null;
      }
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { boost: { spd: 1 } },
    contestType: "Clever"
  },
  finalstrike: {
    num: -40,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Final Strike",
    shortDesc: "Lowers the user's Sp. Atk by 1.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Judgment", target2);
      this.add("-anim", source2, "Light of Ruin", target2);
    },
    self: {
      boosts: {
        spa: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  schemeofacuity: {
    num: -41,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Scheme of Acuity",
    shortDesc: "Prevents the target from switching out.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Laser Focus", source2);
      this.add("-anim", source2, "Leaf Storm", target2);
    },
    secondary: {
      chance: 100,
      onHit(target2, source2, move) {
        if (source2.isActive)
          target2.addVolatile("trapped", source2, move, "trapper");
      }
    },
    target: "normal",
    type: "Grass",
    contestType: "Clever"
  },
  illusoryheartburst: {
    num: -42,
    accuracy: true,
    basePower: 160,
    category: "Special",
    name: "Illusory Heartburst",
    shortDesc: "Sets Grassy Terrain.",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Geomancy", source2);
      this.add("-anim", source2, "Grass Knot", target2);
    },
    isZ: "nahidiumz",
    self: {
      onHit(source2) {
        this.field.setTerrain("grassyterrain");
      }
    },
    target: "normal",
    type: "Grass",
    contestType: "Cute"
  },
  // Inhale is -43, but Kirby is uncoded
  // Star Spit is -44, but Kirby is uncoded
  devilsknife: {
    num: -45,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Devilsknife",
    shortDesc: "Hits twice.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Swords Dance", source2);
      this.add("-anim", source2, "Shadow Claw", target2);
    },
    multihit: 2,
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Clever"
  },
  snowgrave: {
    num: -46,
    accuracy: 100,
    basePower: 150,
    category: "Special",
    name: "Snowgrave",
    shortDesc: "Fails if the user takes damage before it hits.",
    pp: 20,
    priority: -3,
    flags: { protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Blizzard", target2);
      this.add("-anim", source2, "Subzero Slammer", target2);
    },
    priorityChargeCallback(pokemon2) {
      pokemon2.addVolatile("snowgrave");
    },
    beforeMoveCallback(pokemon2) {
      if (pokemon2.volatiles["snowgrave"]?.lostFocus) {
        this.add("cant", pokemon2, "Snowgrave", "Snowgrave");
        return true;
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon2) {
        this.add("-singleturn", pokemon2, "move: Snowgrave");
      },
      onHit(pokemon2, source2, move) {
        if (move.category !== "Status") {
          this.effectState.lostFocus = true;
        }
      },
      onTryAddVolatile(status, pokemon2) {
        if (status.id === "flinch")
          return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  killingclaw: {
    num: -47,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Killing Claw",
    shortDesc: "100% chance to lower the target's Attack by 1.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bide", source2);
      this.add("-anim", source2, "Metal Claw", target2);
    },
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  brilliantdiamond: {
    num: -48,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Brilliant Diamond",
    shortDesc: "Hits two turns after being used; prevents foe(s) from switching next turn.",
    pp: 10,
    priority: 0,
    flags: { mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source2, target2) {
      if (!target2.side.addSlotCondition(target2, "futuremove"))
        return false;
      this.add("-anim", source2, "Power Gem", target2);
      Object.assign(target2.side.slotConditions[target2.position]["futuremove"], {
        duration: 3,
        move: "brilliantdiamond",
        source: source2,
        moveData: {
          id: "brilliantdiamond",
          name: "Brilliant Diamond",
          accuracy: true,
          basePower: 0,
          category: "Status",
          priority: 0,
          flags: { mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, futuremove: 1 },
          sideCondition: "brilliantdiamond",
          condition: {
            duration: 2,
            onSideStart(targetSide) {
              this.add("-sidestart", targetSide, "move: Brilliant Diamond");
            },
            onTrapPokemon(pokemon2) {
              pokemon2.tryTrap();
              this.add("-anim", pokemon2, "Rock Polish", pokemon2);
            }
          },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Rock"
        }
      });
      this.add("-start", source2, "move: Brilliant Diamond");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "foeSide",
    type: "Rock",
    zMove: { boost: { def: 2 } },
    contestType: "Clever"
  },
  starriders: {
    num: -49,
    accuracy: true,
    basePower: 200,
    category: "Special",
    name: "Star Riders",
    shortDesc: "No additional effects.",
    pp: 1,
    priority: 0,
    flags: {},
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Cosmic Power", source2);
      this.add("-anim", source2, "Moongeist Beam", target2);
    },
    isZ: "geniumz",
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  eject: {
    num: -50,
    accuracy: 90,
    basePower: 90,
    category: "Special",
    name: "Eject",
    shortDesc: "Forces the target to switch to a random ally.",
    pp: 10,
    priority: -6,
    flags: { protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Nasty Plot", source2);
      this.add("-anim", source2, "Hyper Voice", target2);
      this.add("-anim", target2, "Teleport", target2);
    },
    forceSwitch: true,
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  backstab: {
    num: -51,
    accuracy: 100,
    basePower: 80,
    basePowerCallback(pokemon2, target2, move) {
      if (target2.newlySwitched || this.queue.willMove(target2)) {
        this.debug("Backstab damage boost");
        return move.basePower * 1.5;
      }
      this.debug("Backstab NOT boosted");
      return move.basePower;
    },
    category: "Physical",
    name: "Backstab",
    shortDesc: "Power 1.5x if user moves before the target.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bide", source2);
      this.add("-anim", source2, "Shadow Sneak", target2);
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  electrosapper: {
    num: -52,
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Electro-Sapper",
    shortDesc: "Lowers the target's Speed by 1; Traps and damages the target for 4-5 turns.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bide", source2);
      this.add("-anim", source2, "Thunder Cage", target2);
    },
    volatileStatus: "partiallytrapped",
    boosts: {
      spe: -1
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    zMove: { boost: { spd: 1, spe: 1 } },
    contestType: "Clever"
  },
  rightbehindyou: {
    num: -53,
    accuracy: true,
    basePower: 140,
    category: "Physical",
    name: "Right Behind You",
    shortDesc: "Raises user's speed by 1; restores 50% of damage dealt.",
    pp: 1,
    priority: 0,
    flags: { contact: 1, heal: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bide", source2);
      this.add("-anim", source2, "First Impression", target2);
    },
    self: {
      boosts: {
        spe: 1
      }
    },
    drain: [1, 2],
    isZ: "spyniumz",
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Tough"
  },
  // Skipping ahead bc future moves in the spreadsheet got added to an older mon
  bombblast: {
    num: -77,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Bomb Blast",
    shortDesc: "Hits one turn after being used.",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, metronome: 1, futuremove: 1, bullet: 1 },
    ignoreImmunity: true,
    onTry(source2, target2) {
      if (!target2.side.addSlotCondition(target2, "futuremove"))
        return false;
      this.add("-anim", source2, "Fling", target2);
      Object.assign(target2.side.slotConditions[target2.position]["futuremove"], {
        duration: 2,
        move: "bombblast",
        source: source2,
        moveData: {
          id: "bombblast",
          name: "Bomb Blast",
          accuracy: 100,
          basePower: 100,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1, bullet: 1 },
          onPrepareHit(target3, source3, move) {
            this.attrLastMove("[still]");
            this.add("-anim", target3, "Explosion", source3);
          },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Normal"
        }
      });
      this.add("-start", source2, "move: Bomb Blast");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  bombthrow: {
    num: -78,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Bomb Throw",
    shortDesc: "Hits one turn after being used.",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, metronome: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source2, target2) {
      if (!target2.side.addSlotCondition(target2, "futuremove"))
        return false;
      this.add("-anim", source2, "Fling", target2);
      Object.assign(target2.side.slotConditions[target2.position]["futuremove"], {
        duration: 2,
        move: "bombthrow",
        source: source2,
        moveData: {
          id: "bombthrow",
          name: "Bomb Throw",
          accuracy: 100,
          basePower: 100,
          category: "Physical",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          onPrepareHit(target3, source3, move) {
            this.attrLastMove("[still]");
            this.add("-anim", target3, "Explosion", source3);
          },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Fire"
        }
      });
      this.add("-start", source2, "move: Bomb Throw");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  // Below are vanilla moves altered by custom interractions
  bounce: {
    num: 340,
    accuracy: 85,
    basePower: 85,
    category: "Physical",
    name: "Bounce",
    pp: 5,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onInvulnerability(target2, source2, move) {
        if (["gust", "twister", "skyuppercut", "thunder", "hurricane", "smackdown", "thousandarrows", "dracoburning"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceBasePower(basePower, target2, source2, move) {
        if (move.id === "gust" || move.id === "twister") {
          return this.chainModify(2);
        }
      }
    },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "any",
    type: "Flying",
    contestType: "Cute"
  },
  fly: {
    num: 19,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Fly",
    pp: 15,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onInvulnerability(target2, source2, move) {
        if (["gust", "twister", "skyuppercut", "thunder", "hurricane", "smackdown", "thousandarrows", "dracoburning"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source2, target2, move) {
        if (move.id === "gust" || move.id === "twister") {
          return this.chainModify(2);
        }
      }
    },
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Clever"
  },
  skydrop: {
    num: 507,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    isNonstandard: "Past",
    name: "Sky Drop",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1 },
    onModifyMove(move, source2) {
      if (!source2.volatiles["skydrop"]) {
        move.accuracy = true;
        move.flags.contact = 0;
      }
    },
    onMoveFail(target2, source2) {
      if (source2.volatiles["twoturnmove"] && source2.volatiles["twoturnmove"].duration === 1) {
        source2.removeVolatile("skydrop");
        source2.removeVolatile("twoturnmove");
        this.add("-end", target2, "Sky Drop", "[interrupt]");
      }
    },
    onTryHit(target2, source2, move) {
      if (target2.fainted)
        return false;
      if (source2.removeVolatile(move.id)) {
        if (target2 !== source2.volatiles["twoturnmove"].source)
          return false;
        if (target2.hasType("Flying")) {
          this.add("-immune", target2);
          return null;
        }
      } else {
        if (target2.volatiles["substitute"] || target2.side === source2.side) {
          return false;
        }
        if (target2.getWeight() >= 2e3) {
          this.add("-fail", target2, "move: Sky Drop", "[heavy]");
          return null;
        }
        this.add("-prepare", source2, move.name, target2);
        source2.addVolatile("twoturnmove", target2);
        return null;
      }
    },
    onHit(target2, source2) {
      if (target2.hp)
        this.add("-end", target2, "Sky Drop");
    },
    condition: {
      duration: 2,
      onAnyDragOut(pokemon2) {
        if (pokemon2 === this.effectState.target || pokemon2 === this.effectState.source)
          return false;
      },
      onFoeTrapPokemonPriority: -15,
      onFoeTrapPokemon(defender) {
        if (defender !== this.effectState.source)
          return;
        defender.trapped = true;
      },
      onFoeBeforeMovePriority: 12,
      onFoeBeforeMove(attacker, defender, move) {
        if (attacker === this.effectState.source) {
          attacker.activeMoveActions--;
          this.debug("Sky drop nullifying.");
          return null;
        }
      },
      onRedirectTargetPriority: 99,
      onRedirectTarget(target2, source2, source22) {
        if (source2 !== this.effectState.target)
          return;
        if (this.effectState.source.fainted)
          return;
        return this.effectState.source;
      },
      onAnyInvulnerability(target2, source2, move) {
        if (target2 !== this.effectState.target && target2 !== this.effectState.source) {
          return;
        }
        if (source2 === this.effectState.target && target2 === this.effectState.source) {
          return;
        }
        if (["gust", "twister", "skyuppercut", "thunder", "hurricane", "smackdown", "thousandarrows", "dracoburning"].includes(move.id)) {
          return;
        }
        return false;
      },
      onAnyBasePower(basePower, target2, source2, move) {
        if (target2 !== this.effectState.target && target2 !== this.effectState.source) {
          return;
        }
        if (source2 === this.effectState.target && target2 === this.effectState.source) {
          return;
        }
        if (move.id === "gust" || move.id === "twister") {
          return this.chainModify(2);
        }
      },
      onFaint(target2) {
        if (target2.volatiles["skydrop"] && target2.volatiles["twoturnmove"].source) {
          this.add("-end", target2.volatiles["twoturnmove"].source, "Sky Drop", "[interrupt]");
        }
      }
    },
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Tough"
  },
  curse: {
    num: 174,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Curse",
    pp: 10,
    priority: 0,
    flags: { authentic: 1 },
    volatileStatus: "curse",
    onModifyMove(move, source2, target2) {
      if (!source2.hasType("Ghost") && !source2.hasAbility("curseweaver")) {
        move.target = move.nonGhostTarget;
      }
    },
    onTryHit(target2, source2, move) {
      if (!source2.hasType("Ghost") && !source2.hasAbility("curseweaver")) {
        delete move.volatileStatus;
        delete move.onHit;
        move.self = { boosts: { spe: -1, atk: 1, def: 1 } };
      } else if (move.volatileStatus && target2.volatiles["curse"]) {
        return false;
      }
    },
    onHit(target2, source2) {
      this.directDamage(source2.maxhp / 2, source2, source2);
    },
    condition: {
      onStart(pokemon2, source2) {
        this.add("-start", pokemon2, "Curse", "[of] " + source2);
      },
      onResidualOrder: 10,
      onResidual(pokemon2) {
        this.damage(pokemon2.baseMaxhp / 4);
      }
    },
    secondary: null,
    target: "randomNormal",
    nonGhostTarget: "self",
    type: "Ghost",
    zMove: { effect: "curse" },
    contestType: "Tough"
  },
  bouncybubble: {
    inherit: true,
    isNonstandard: null
  },
  protect: {
    num: 182,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Protect",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "protect",
    onPrepareHit(pokemon2) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon2);
    },
    onHit(pokemon2) {
      pokemon2.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target2) {
        this.add("-singleturn", target2, "Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target2, source2, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target2.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target2, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (target2.hasAbility("smirk")) {
          target2.addVolatile("laserfocus");
        }
        return this.NOT_FAIL;
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  spikes: {
    num: 191,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spikes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "spikes",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 3)
          return false;
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon2) {
        if (!pokemon2.isGrounded() || pokemon2.hasItem("heavydutyboots") || pokemon2.hasAbility("autobuild"))
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * pokemon2.maxhp / 24);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Ground",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  stealthrock: {
    num: 446,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stealth Rock",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "stealthrock",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      onEntryHazard(pokemon2) {
        if (pokemon2.hasItem("heavydutyboots") || pokemon2.hasAbility("autobuild"))
          return;
        const typeMod = this.clampIntRange(pokemon2.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(pokemon2.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Rock",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  stickyweb: {
    num: 564,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sticky Web",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1 },
    sideCondition: "stickyweb",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Sticky Web");
      },
      onEntryHazard(pokemon2) {
        if (!pokemon2.isGrounded() || pokemon2.hasItem("heavydutyboots") || pokemon2.hasAbility("autobuild"))
          return;
        this.add("-activate", pokemon2, "move: Sticky Web");
        this.boost({ spe: -1 }, pokemon2, this.effectState.source, this.dex.getActiveMove("stickyweb"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Bug",
    zMove: { boost: { spe: 1 } },
    contestType: "Tough"
  },
  toxicspikes: {
    num: 390,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Toxic Spikes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "toxicspikes",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 2)
          return false;
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon2) {
        if (!pokemon2.isGrounded())
          return;
        if (pokemon2.hasType("Poison")) {
          this.add("-sideend", pokemon2.side, "move: Toxic Spikes", "[of] " + pokemon2);
          pokemon2.side.removeSideCondition("toxicspikes");
        } else if (pokemon2.hasType("Steel") || pokemon2.hasItem("heavydutyboots") || pokemon2.hasAbility("autobuild")) {
          return;
        } else if (this.effectState.layers >= 2) {
          pokemon2.trySetStatus("tox", pokemon2.side.foe.active[0]);
        } else {
          pokemon2.trySetStatus("psn", pokemon2.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Poison",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  gmaxsteelsurge: {
    num: 1e3,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Gigantamax",
    name: "G-Max Steelsurge",
    pp: 5,
    priority: 0,
    flags: {},
    isMax: "Copperajah",
    self: {
      onHit(source2) {
        for (const side of source2.side.foeSidesWithConditions()) {
          side.addSideCondition("gmaxsteelsurge");
        }
      }
    },
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: G-Max Steelsurge");
      },
      onEntryHazard(pokemon2) {
        if (pokemon2.hasItem("heavydutyboots") || pokemon2.hasAbility("autobuild"))
          return;
        const steelHazard = this.dex.getActiveMove("Stealth Rock");
        steelHazard.type = "Steel";
        const typeMod = this.clampIntRange(pokemon2.runEffectiveness(steelHazard), -6, 6);
        this.damage(pokemon2.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "adjacentFoe",
    type: "Steel",
    contestType: "Cool"
  },
  grassyterrain: {
    num: 580,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Grassy Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "grassyterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        const weakenedMoves = ["earthquake", "bulldoze", "magnitude"];
        if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable() && !defender.hasAbility("autobuild")) {
          this.debug("move weakened by grassy terrain");
          return this.chainModify(0.5);
        }
        if (move.type === "Grass" && attacker.isGrounded() && !attacker.hasAbility("autobuild")) {
          this.debug("grassy terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Grassy Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Grassy Terrain");
        }
      },
      onResidualOrder: 5,
      onResidualSubOrder: 2,
      onResidual(pokemon2) {
        if (pokemon2.isGrounded() && !pokemon2.isSemiInvulnerable() && !pokemon2.hasAbility("autobuild")) {
          this.heal(pokemon2.baseMaxhp / 16, pokemon2, pokemon2);
        } else {
          this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Grassy Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
  },
  mistyterrain: {
    num: 581,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Misty Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "mistyterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onSetStatus(status, target2, source2, effect) {
        if (!target2.isGrounded() || target2.isSemiInvulnerable() || target2.hasAbility("autobuild"))
          return;
        if (effect && (effect.status || effect.id === "yawn")) {
          this.add("-activate", target2, "move: Misty Terrain");
        }
        return false;
      },
      onTryAddVolatile(status, target2, source2, effect) {
        if (!target2.isGrounded() || target2.isSemiInvulnerable() || target2.hasAbility("autobuild"))
          return;
        if (status.id === "confusion") {
          if (effect.effectType === "Move" && !effect.secondaries)
            this.add("-activate", target2, "move: Misty Terrain");
          return null;
        }
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Dragon" && defender.isGrounded() && !defender.isSemiInvulnerable() && !defender.hasAbility("autobuild")) {
          this.debug("misty terrain weaken");
          return this.chainModify(0.5);
        }
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Misty Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Misty Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "Misty Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Fairy",
    zMove: { boost: { spd: 1 } },
    contestType: "Beautiful"
  },
  psychicterrain: {
    num: 678,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Psychic Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "psychicterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onTryHitPriority: 4,
      onTryHit(target2, source2, effect) {
        if (effect && (effect.priority <= 0.1 || effect.target === "self")) {
          return;
        }
        if (target2.isSemiInvulnerable() || target2.isAlly(source2))
          return;
        if (!target2.isGrounded() || target2.hasAbility("autobuild")) {
          const baseMove = this.dex.moves.get(effect.id);
          if (baseMove.priority > 0) {
            if (target2.hasAbility("autobuild")) {
              this.hint("Psychic Terrain doesn't affect Pok\xE9mon with Autobuild.");
            } else {
              this.hint("Psychic Terrain doesn't affect Pok\xE9mon immune to Ground.");
            }
          }
          return;
        }
        this.add("-activate", target2, "move: Psychic Terrain");
        return null;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Psychic" && attacker.isGrounded() && !attacker.isSemiInvulnerable() && !attacker.hasAbility("autobuild")) {
          this.debug("psychic terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Psychic Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Psychic Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Psychic Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Psychic",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  electricterrain: {
    num: 604,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Electric Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "electricterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onSetStatus(status, target2, source2, effect) {
        if (status.id === "slp" && target2.isGrounded() && !target2.isSemiInvulnerable() && !target2.hasAbility("autobuild")) {
          if (effect.id === "yawn" || effect.effectType === "Move" && !effect.secondaries) {
            this.add("-activate", target2, "move: Electric Terrain");
          }
          return false;
        }
      },
      onTryAddVolatile(status, target2) {
        if (!target2.isGrounded() || target2.isSemiInvulnerable() || target2.hasAbility("autobuild"))
          return;
        if (status.id === "yawn") {
          this.add("-activate", target2, "move: Electric Terrain");
          return null;
        }
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Electric" && attacker.isGrounded() && !attacker.isSemiInvulnerable() && !attacker.hasAbility("autobuild")) {
          this.debug("electric terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Electric Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Electric Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Electric Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Electric",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  }
};
//# sourceMappingURL=moves.js.map
