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
  recover: {
    inherit: true,
    pp: 10
  },
  softboiled: {
    inherit: true,
    pp: 10
  },
  rest: {
    inherit: true,
    pp: 10
  },
  milkdrink: {
    inherit: true,
    pp: 10
  },
  slackoff: {
    inherit: true,
    pp: 10
  },
  roost: {
    inherit: true,
    pp: 10
  },
  shoreup: {
    inherit: true,
    pp: 10
  },
  triplearrows: {
    num: -1,
    accuracy: 100,
    basePower: 30,
    category: "Special",
    shortDesc: "Hits 3 times. Lowers target's Sp. Def. after the 3rd hit.",
    name: "Triple Arrows",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    critRatio: 2,
    onHit(target2, source2, move) {
      if (move.hit === 3) {
        return !!this.boost({ spd: -1 }, target2, source2, move);
      }
      return false;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thousand Arrows", target2);
    },
    multihit: 3,
    secondary: null,
    target: "normal",
    type: "Fighting"
  },
  infernalparade: {
    num: -2,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    name: "Infernal Parade",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hex", target2);
    },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Ghost"
  },
  razorshell: {
    inherit: true,
    accuracy: 100,
    basePower: 80,
    shortDesc: "100% chance to lower the target's Defense by 1.",
    pp: 15,
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    }
  },
  ceaselessedge: {
    num: -3,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "If this move is not very effective on a target, it sets a layer of Spikes.",
    name: "Ceaseless Edge",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onHit(target2, source2, move) {
      if (!move || !target2)
        return;
      if (target2 !== source2 && move.category !== "Status" && target2.getMoveHitData(move).typeMod < 0) {
        source2.side.foe.addSideCondition("spikes");
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Night Slash", target2);
    },
    secondary: null,
    target: "normal",
    type: "Dark"
  },
  twirlingdance: {
    num: -4,
    accuracy: 90,
    basePower: 20,
    basePowerCallback(pokemon, target2, move) {
      return 20 * move.hit;
    },
    category: "Physical",
    shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
    name: "Twirling Dance",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fiery Dance", target2);
    },
    multihit: 3,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Fire"
  },
  pompomdance: {
    num: -5,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Type varies matches the user's primary type. The user is flung into the air.",
    name: "Pom-pom Dance",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, dance: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Revelation Dance", target2);
    },
    self: {
      volatileStatus: "telekinesis"
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  skirtdance: {
    num: -6,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
    name: "Skirt Dance",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Quiver Dance", target2);
    },
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Fairy"
  },
  deathlydance: {
    num: -7,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "User recovers 50% of the damage dealt.",
    name: "Deathly Dance",
    pp: 15,
    priority: 0,
    flags: { dance: 1, protect: 1, mirror: 1, heal: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Night Shade", target2);
    },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Ghost"
  },
  gearup: {
    num: 674,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Raises user's Attack and Sp. Atk by 1; 2 in Electric Terrain.",
    name: "Gear Up",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, authentic: 1 },
    onModifyMove(move, pokemon) {
      if ((this.field.isTerrain("electricterrain") || this.field.isTerrain("psychicterrain") || this.field.isTerrain("grassyterrain") || this.field.isTerrain("mistyterrain")) && pokemon.isGrounded())
        move.boosts = { atk: 2, spa: 2 };
    },
    boosts: {
      atk: 1,
      spa: 1
    },
    secondary: null,
    target: "self",
    type: "Steel"
  },
  pollenpuff: {
    num: 676,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "30% chance to lower the target's Attack by 1 stage.",
    name: "Pollen Puff",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Bug"
  },
  geargrind: {
    inherit: true,
    accuracy: 95
  },
  wickedblow: {
    inherit: true,
    accuracy: 100,
    basePower: 85,
    shortDesc: "Inflicts Torment on the opponent.",
    pp: 10,
    willCrit: null,
    self: {
      onHit(source2) {
        for (const pokemon of source2.side.foe.active) {
          pokemon.addVolatile("torment");
        }
      }
    }
  },
  surgingstrikes: {
    inherit: true,
    basePower: 20,
    basePowerCallback(pokemon, target2, move) {
      return move.basePower + 20 * pokemon.positiveBoosts();
    },
    shortDesc: "+ 20 power for each of the user's stat boosts.",
    pp: 10,
    flags: { contact: 1, protect: 1, mirror: 1 },
    willCrit: null,
    multihit: null
  },
  glacialcharge: {
    num: -8,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    shortDesc: "No additional effect.",
    name: "Glacial Charge",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Glacial Lance", target2);
    },
    secondary: null,
    target: "normal",
    type: "Ice"
  },
  astralbarrage: {
    inherit: true,
    accuracy: 80,
    basePower: 100,
    shortDesc: "High critical hit ratio.",
    target: "normal",
    type: "Dark"
  },
  clangingscales: {
    num: 691,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Physical if user's Atk > Sp. Atk. Cures user's status.",
    name: "Clanging Scales",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, authentic: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    self: {
      onHit(source2) {
        source2.cureStatus();
      }
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Dragon"
  },
  clangoroussoul: {
    num: 775,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Raises the user's Special Attack and Speed by 1.",
    name: "Clangorous Soul",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, sound: 1, dance: 1 },
    boosts: {
      spa: 1,
      spe: 1
    },
    secondary: null,
    target: "self",
    type: "Dragon"
  },
  rockyscales: {
    num: -9,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    shortDesc: "Lowers the user's Special Attack by 1.",
    name: "Rocky Scales",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, authentic: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Clanging Scales", target2);
    },
    selfBoost: {
      boosts: {
        spa: -1
      }
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Rock"
  },
  shiftinggems: {
    num: -10,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "At >1/2 max HP, +1 Def & 1 SpA. Else Heals 33% max HP.",
    name: "Shifting Gems",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Geomancy", target2);
    },
    self: {
      onHit(pokemon) {
        if (pokemon.hp > pokemon.maxhp / 2) {
          this.boost({ def: 1, spa: 1 });
        } else if (pokemon.hp <= pokemon.maxhp / 2) {
          this.heal(pokemon.baseMaxhp / 3);
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Rock"
  },
  firerenewal: {
    num: -11,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User heals 3/4 max HP and cures status. Removes Fire type. Trapped next turn.",
    name: "Fire Renewal",
    pp: 10,
    priority: 0,
    volatileStatus: "firerenewal",
    flags: { heal: 1, authentic: 1, mystery: 1 },
    onTryMove(pokemon, target2, move) {
      if (pokemon.hasType("Fire"))
        return;
      this.add("-fail", pokemon, "move: Burn Up");
      this.attrLastMove("[still]");
      return null;
    },
    onHit(pokemon) {
      const success = !!this.heal(this.modify(pokemon.maxhp, 0.75));
      return pokemon.cureStatus() || success;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Burn Up", target2);
    },
    self: {
      onHit(pokemon) {
        pokemon.setType(pokemon.getTypes(true).map((type) => type === "Fire" ? "???" : type));
        this.add("-start", pokemon, "typechange", pokemon.types.join("/"), "[from] move: Fire Renewal");
      }
    },
    condition: {
      duration: 2,
      onStart(pokemon) {
        this.add("-start", pokemon, "move: Fire Renewal");
      },
      onTrapPokemon(pokemon) {
        pokemon.tryTrap();
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "move: Fire Renewal");
      }
    },
    secondary: null,
    target: "self",
    type: "Fire"
  },
  ghostbite: {
    num: -12,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "Neutral on Ghost.",
    name: "Ghost Bite",
    pp: 10,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    ignoreImmunity: { "Fighting": true },
    onEffectiveness(typeMod, target2, type) {
      if (type === "Ghost")
        return 0;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bug Bite", target2);
    },
    target: "normal",
    type: "Fighting"
  },
  snaptrap: {
    num: 779,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Snap Trap",
    pp: 10,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Steel"
  },
  photongeyser: {
    num: 722,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "Goes off higher attacking stat. Does 1.2x damage in Psychic Terrain.",
    name: "Photon Geyser",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onBasePower(basePower, source2) {
      if (this.field.isTerrain("psychicterrain") && source2.isGrounded()) {
        this.debug("terrain buff");
        return this.chainModify(1.2);
      }
    },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Psychic"
  },
  sunsteelstrike: {
    num: 713,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    shortDesc: "User recovers 50% of the damage dealt.",
    name: "Sunsteel Strike",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Steel"
  },
  moongeistbeam: {
    num: 714,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    shortDesc: "User switches out. Nullifies the foes Ability if the foes move first.",
    name: "Moongeist Beam",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onHit(target2) {
      if (target2.getAbility().isPermanent)
        return;
      if (target2.newlySwitched || this.queue.willMove(target2))
        return;
      target2.addVolatile("gastroacid");
    },
    onAfterSubDamage(damage, target2) {
      if (target2.getAbility().isPermanent)
        return;
      if (target2.newlySwitched || this.queue.willMove(target2))
        return;
      target2.addVolatile("gastroacid");
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Ghost"
  },
  prismaticlaser: {
    num: 711,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "This move ignores type based interactions.",
    name: "Prismatic Laser",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, source2, target2) {
      move.type = "???";
    },
    secondary: null,
    target: "normal",
    type: "Dragon"
  },
  esperwing: {
    num: -13,
    accuracy: 100,
    basePower: 80,
    basePowerCallback(pokemon, target2, move) {
      if (pokemon.hasType("Psychic")) {
        return move.basePower * 1.5;
      }
      return move.basePower;
    },
    category: "Special",
    shortDesc: "If used by a Psychic-type: 1.5x power. Super effective on Poison.",
    name: "Esper Wing",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onEffectiveness(typeMod, target2, type) {
      if (type === "Poison")
        return 1;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Burn Up", target2);
    },
    secondary: null,
    target: "normal",
    type: "Flying"
  },
  chloroblast: {
    num: -14,
    accuracy: 100,
    basePower: 150,
    category: "Special",
    shortDesc: "User loses 50% max HP. Hits adjacent Pokemon.",
    name: "Chloro Blast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    mindBlownRecoil: true,
    onAfterMove(pokemon, target2, move) {
      if (move.mindBlownRecoil && !move.multihit) {
        this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get("Chloro Blast"), true);
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Solar Beam", target2);
    },
    secondary: null,
    target: "allAdjacent",
    type: "Grass"
  },
  payday: {
    num: 6,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "Always results in a critical hit.",
    name: "Pay Day",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    willCrit: true,
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  overdrive: {
    inherit: true,
    basePower: 100
  },
  teatime: {
    inherit: true,
    priority: 1
  },
  teatimeantique: {
    num: 752,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "All active Pokemon consume held Berries.",
    name: "Teatime (Antique)",
    pp: 10,
    priority: 0,
    flags: { authentic: 1 },
    onHitField(target2, source2, move) {
      let result = false;
      for (const active of this.getAllActive()) {
        if (this.runEvent("Invulnerability", active, source2, move) === false) {
          this.add("-miss", source2, active);
          result = true;
        } else {
          const item = active.getItem();
          if (active.hp && item.isBerry) {
            active.eatItem(true);
            result = true;
          }
        }
      }
      return result;
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Teatime", target2);
    },
    secondary: null,
    target: "all",
    type: "Normal"
  },
  freezingglare: {
    num: 821,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "100% chance to lower the target's Speed by 1.",
    name: "Freezing Glare",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Flying"
  },
  lifedew: {
    num: 791,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Heals 1/3 of max HP. If statused: Heals 1/6 and cures status.",
    name: "Life Dew",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.333;
      if (pokemon.status) {
        factor = 0.167;
        pokemon.cureStatus();
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Water"
  },
  turkeybarrage: {
    num: -15,
    accuracy: 70,
    basePower: 140,
    category: "Physical",
    shortDesc: "20% chance to make the target flinch.",
    name: "Turkey Barrage",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sky Attack", target2);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "any",
    type: "Flying",
    contestType: "Cool"
  },
  fierywrath: {
    num: 822,
    accuracy: 100,
    basePower: 105,
    category: "Physical",
    shortDesc: "Combines Fire in its type effectiveness.",
    name: "Fiery Wrath",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target2, type, move) {
      return typeMod + this.dex.getEffectiveness("Fire", type);
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Dark"
  },
  boneclub: {
    inherit: true,
    accuracy: 100,
    basePower: 70,
    shortDesc: "The target takes hazard damage after being hit by this move.",
    pp: 15,
    onAfterHit(target2, source2) {
      const targetSide = source2.side.foe;
      if (targetSide.getSideCondition("stealthrock")) {
        if (target2.hasItem("heavydutyboots"))
          return;
        const typeMod = this.clampIntRange(target2.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(target2.maxhp * Math.pow(2, typeMod) / 8);
        this.add("-message", `Pointed stones dug into ${target2.name}!`);
      }
      if (targetSide.getSideCondition("spikes")) {
        if (target2.hasItem("heavydutyboots"))
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * target2.maxhp / 24);
        this.add("-message", `${target2.name} was hurt by the spikes!`);
      }
    },
    secondary: {}
  },
  bonemerang: {
    inherit: true,
    accuracy: 100,
    basePower: 35,
    shortDesc: "Hits twice. User switches out.",
    pp: 20,
    selfSwitch: true,
    type: "Rock"
  },
  shadowbone: {
    inherit: true,
    basePower: 90,
    shortDesc: "30% chance to lower target's Attack by 1.",
    pp: 15,
    secondary: {
      chance: 30,
      boosts: {
        atk: -1
      }
    }
  },
  springtidestorm: {
    num: -16,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    shortDesc: "Lowers the user's Sp. Atk by 1.",
    name: "Springtide Storm",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -1
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psycho Boost", target2);
    },
    secondary: null,
    target: "normal",
    type: "Psychic"
  },
  roaroftime: {
    num: 459,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    shortDesc: "Raises user's SpA by 1 when attacked before it moves.",
    name: "Roar of Time",
    pp: 5,
    priority: -3,
    flags: { protect: 1, mirror: 1 },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("roaroftime");
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: Roar of Time");
      },
      onDamagingHit(damage, target2, source2, move) {
        this.boost({ spa: 1 }, target2, source2, void 0, true);
        this.add("-activate", target2, "move: Roar of Time");
      }
    },
    onAfterMove(pokemon) {
      pokemon.removeVolatile("roaroftime");
    },
    secondary: null,
    target: "normal",
    type: "Dragon"
  },
  originrend: {
    num: -17,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(pokemon, target2, move) {
      if (!pokemon.item) {
        this.debug("Power doubled for no item");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    shortDesc: "Power doubles if the user has no held item.",
    name: "Origin Rend",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spacial Rend", target2);
    },
    secondary: null,
    target: "normal",
    type: "Poison"
  },
  trickroom: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasAbility("persistent")) {
          this.add("-activate", source2, "ability: Persistent", effect);
          return 7;
        }
        if (source2?.hasItem("adamantorb")) {
          return 8;
        }
        return 5;
      },
      onStart(target2, source2) {
        this.add("-fieldstart", "move: Trick Room", "[of] " + source2);
      },
      onRestart(target2, source2) {
        this.field.removePseudoWeather("trickroom");
      },
      // Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
      onResidualOrder: 23,
      onEnd() {
        this.add("-fieldend", "move: Trick Room");
      }
    }
  },
  hyperspacefury: {
    inherit: true,
    flags: { mirror: 1, punch: 1, bypasssub: 1 },
    onTry(pokemon) {
      if (pokemon.species.name === "Hoopa-Ifrit" || pokemon.species.name === "Archronos") {
        return;
      }
      this.hint("Only a Pokemon whose form is Hoopa Unbound or Archronos can use this move.");
      if (pokemon.species.name === "Hoopa") {
        this.add("-fail", pokemon, "move: Hyperspace Fury", "[forme]");
        return null;
      }
      this.add("-fail", pokemon, "move: Hyperspace Fury");
      return null;
    }
  },
  wavecrash: {
    num: -18,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    shortDesc: "Fails if the target is not attacking. Has 33% recoil.",
    name: "Wave Crash",
    pp: 5,
    priority: 1,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onTry(source2, target2) {
      const action = this.queue.willMove(target2);
      const move = action?.choice === "move" ? action.move : null;
      if (!move || move.category === "Status" && move.id !== "mefirst" || target2.volatiles["mustrecharge"]) {
        return false;
      }
    },
    recoil: [33, 100],
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aqua Jet", target2);
    },
    secondary: null,
    target: "normal",
    type: "Water"
  },
  venoshock: {
    inherit: true,
    basePowerCallback(pokemon, target2, move) {
      if (target2.status || target2.hasAbility("comatose"))
        return move.basePower * 2;
      return move.basePower;
    }
  },
  barbbarrage: {
    num: -19,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Barb Barrage",
    shortDesc: "Hits 2-5 times in one turn. Each hit has 10% to poison.",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spike Cannon", target2);
    },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Clever"
  },
  bittermalice: {
    num: -20,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Bitter Malice",
    shortDesc: "100% chance to lower the target's Special Attack by 1.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Icy Wind", target2);
    },
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Ice",
    contestType: "Clever"
  },
  shelter: {
    num: -21,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shelter",
    shortDesc: "Protects from damaging attacks. Contact: Infestation.",
    description: "Protects from damaging attacks. If the attacker makes contact, they are afflicted with Infestation.",
    pp: 10,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "shelter",
    onPrepareHit(pokemon) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Withdraw", target);
      this.add("-anim", source, "Protect", target);
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target2) {
        this.add("-singleturn", target2, "Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target2, source2, move) {
        if (!move.flags["protect"] || move.category === "Status") {
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
        if (move.flags["contact"]) {
          source2.addVolatile("partiallytrapped");
          this.add("-activate", source2, "move: Infestation", "[of] " + target2);
        }
        return this.NOT_FAIL;
      },
      onHit(target2, source2, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source2, target2)) {
          source2.addVolatile("partiallytrapped");
          this.add("-activate", source2, "move: Infestation", "[of] " + target2);
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Ground",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  wonderdrill: {
    num: -22,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Wonder Drill",
    shortDesc: "Summons Wonder Room.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Guillotine", target2);
    },
    onHit() {
      if (!this.field.getPseudoWeather("wonderroom"))
        this.field.addPseudoWeather("wonderroom");
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  watershuriken: {
    inherit: true,
    shortDesc: "Hits 3 times in one turn.",
    flags: { protect: 1, mirror: 1, slicing: 1 },
    multihit: 3
  },
  shadowclaw: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 }
  },
  hyperspacehole: {
    inherit: true,
    basePower: 40,
    shortDesc: "User recovers 75% of the damage dealt.",
    priority: 1,
    flags: { mirror: 1, bypasssub: 1, heal: 1 },
    drain: [3, 4]
  },
  freezeshock: {
    num: 553,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Freeze Shock",
    shortDesc: "30% chance to paralyze the target.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  iceburn: {
    num: 554,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ice Burn",
    shortDesc: "30% chance to burn the target.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  ragingfury: {
    num: 833,
    accuracy: 100,
    basePower: 50,
    basePowerCallback(pokemon) {
      if (!pokemon.m.timesAttacked)
        pokemon.m.timesAttacked = 0;
      return Math.min(350, 50 + 50 * pokemon.m.timesAttacked);
    },
    category: "Physical",
    name: "Raging Fury",
    shortDesc: "+50 power for each time the user was hit. Max 6 hits.",
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flare Blitz", target2);
    },
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Fire"
  },
  mountaingale: {
    num: 836,
    accuracy: 100,
    basePower: 100,
    onBasePower(basePower, pokemon, target2) {
      if (["hail", "snow"].includes(pokemon.effectiveWeather())) {
        this.debug("stronger by weather");
        return this.chainModify(1.3);
      }
    },
    category: "Physical",
    name: "Mountain Gale",
    shortDesc: "This move has 1.3x power under Snow/Hail.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Icicle Crash", target2);
    },
    secondary: null,
    target: "normal",
    type: "Ice"
  },
  psyshieldbash: {
    num: 828,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Psyshield Bash",
    shortDesc: "Uses user's Def stat as Atk in damage calculation.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Body Press", target2);
    },
    useSourceDefensiveAsOffensive: true,
    secondary: null,
    target: "normal",
    type: "Psychic"
  },
  jetpunch: {
    num: 857,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Jet Punch",
    shortDesc: "If target is faster: 1/2 power and +1 priority.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    onModifyMove(move, pokemon) {
      const basePower = move.basePower;
      for (const target2 of pokemon.side.foe.active) {
        if (move.priority > 0) {
          this.hint("Jet Punch moved at Hero Speed!");
          move.basePower = basePower * 0.5;
        }
      }
    },
    onModifyPriority(priority, source2, target2, move) {
      for (const pokemon of source2.side.foe.active) {
        target2 = pokemon;
      }
      if (target2.side.choice.actions && target2.side.choice.actions.choice == "switch") {
        for (const pokemon of source2.side.foe.pokemon) {
          if (pokemon == target2.side.choice.actions.pokemon)
            target2 = pokemon;
        }
      }
      const userspeed = source2.getStat("spe", false, true);
      const targetspeed = target2.getStat("spe", false, true);
      if (targetspeed >= userspeed) {
        return priority + 1;
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mach Punch", target2);
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Cool"
  },
  ragingbull: {
    num: 873,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    shortDesc: "Type depends on user's secondary type. Resists: -1 Def.",
    name: "Raging Bull",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.types[1];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    onHit(target2, source2, move) {
      if (!move || !target2)
        return;
      if (target2 !== source2 && move.category !== "Status" && target2.getMoveHitData(move).typeMod < 0) {
        this.boost({ def: -1 }, target2);
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target2);
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  ragingbullsteam: {
    num: -23,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "(Semifunctional placeholder) Type depends on both the user's types.",
    name: "Raging Bull (Steam)",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    onEffectiveness(typeMod, target2, type, move) {
      return typeMod + this.dex.getEffectiveness("Water", type);
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target2);
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  stampederush: {
    num: -24,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    shortDesc: "Destroys screens. Ice-type if user is Tauros-Azul. 100% chance to lower the target's Speed by 1.",
    name: "Stampede Rush",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit(pokemon) {
      pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
    },
    onModifyType(move, pokemon) {
      if (pokemon.species.name === "Tauros-Azul") {
        move.type = "Fighting";
      }
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target2);
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Normal"
  },
  zippyzap: {
    num: 729,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    shortDesc: "Usually goes first.",
    isNonstandard: null,
    name: "Zippy Zap",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    target: "normal",
    type: "Electric"
  },
  fling: {
    inherit: true,
    basePowerCallback(pokemon, target2, move) {
      if (pokemon.hasAbility("cannonstyle")) {
        return move.basePower * 2;
      }
      return move.basePower;
    }
  },
  extremeevoboost: {
    inherit: true,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User loses 33% of its max HP. +1 to all stats.",
    isNonstandard: null,
    name: "Extreme Evoboost",
    pp: 5,
    priority: 0,
    flags: { snatch: 1 },
    isZ: null,
    onTryHit(pokemon, target2, move) {
      if (pokemon.hp <= pokemon.maxhp * 33 / 100 || pokemon.maxhp === 1) {
        return false;
      }
      if (!this.boost(move.boosts))
        return null;
      delete move.boosts;
    },
    onHit(pokemon) {
      this.directDamage(pokemon.maxhp * 33 / 100);
    },
    boosts: {
      atk: 1,
      def: 1,
      spa: 1,
      spd: 1,
      spe: 1
    },
    secondary: null,
    target: "self",
    type: "Normal"
  },
  baddybad: {
    inherit: true,
    accuracy: 100,
    isNonstandard: null
  },
  bouncybubble: {
    inherit: true,
    basePower: 80,
    isNonstandard: null,
    pp: 10,
    flags: { protect: 1, heal: 1, contact: 1 }
  },
  buzzybuzz: {
    inherit: true,
    shortDesc: "100% chance to paralyze the target if they have a stat boost.",
    isNonstandard: null,
    pp: 10,
    secondary: {
      chance: 100,
      onHit(target2, source2, move) {
        if (target2.positiveBoosts() > 0) {
          target2.trySetStatus("par", source2, move);
        }
      }
    }
  },
  freezyfrost: {
    inherit: true,
    accuracy: 100,
    basePower: 80,
    shortDesc: "Resets all of the target's stat stages to 0.",
    isNonstandard: null,
    pp: 15,
    onHit(target2) {
      target2.clearBoosts();
      this.add("-clearboost", target2);
    }
  },
  glitzyglow: {
    inherit: true,
    accuracy: 100,
    category: "Special",
    isNonstandard: null
  },
  sappyseed: {
    inherit: true,
    accuracy: 100,
    basePower: 80,
    isNonstandard: null
  },
  sizzlyslide: {
    inherit: true,
    shortDesc: "100% chance to burn the target if they have a stat boost.",
    isNonstandard: null,
    pp: 10,
    secondary: {
      chance: 100,
      onHit(target2, source2, move) {
        if (target2.positiveBoosts() > 0) {
          target2.trySetStatus("brn", source2, move);
        }
      }
    }
  },
  sparklyswirl: {
    inherit: true,
    accuracy: 100,
    basePower: 80,
    isNonstandard: null,
    pp: 15
  },
  veeveevolley: {
    inherit: true,
    accuracy: 100,
    basePower: 50,
    basePowerCallback(pokemon, target2, move) {
      return move.basePower;
    },
    category: "Special",
    shortDesc: "The user removes its sides hazards. User switches.",
    isNonstandard: null,
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1 },
    selfSwitch: true,
    onAfterHit(target2, pokemon) {
      const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Veevee Volley", "[of] " + pokemon);
        }
      }
    },
    onAfterSubDamage(damage, target2, pokemon) {
      const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Veevee Volley", "[of] " + pokemon);
        }
      }
    }
  },
  blossom: {
    num: -25,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User: -1/2 max HP; +1 Omni-Boost & Summons Sun.",
    name: "Blossom",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    onHit(target2) {
      if (target2.hp <= target2.maxhp / 2 || target2.boosts.atk >= 6 || target2.maxhp === 1) {
        return false;
      }
      this.directDamage(target2.maxhp / 2);
      this.boost({ atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }, target2);
      this.field.setWeather("sunnyday");
    },
    onPrepareHit(target2, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Growth", target2);
    },
    secondary: null,
    target: "self",
    type: "Grass"
  }
};
//# sourceMappingURL=moves.js.map
