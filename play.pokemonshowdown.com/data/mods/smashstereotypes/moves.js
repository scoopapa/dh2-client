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
  allterrainblast: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    shortDesc: "Power doubles and type varies in each terrain.",
    id: "allterrainblast",
    name: "All-Terrain Blast",
    pp: 10,
    priority: 0,
    flags: {
      bullet: 1,
      protect: 1,
      mirror: 1
    },
    onModifyType(move, pokemon) {
      if (!pokemon.isGrounded())
        return;
      switch (this.field.terrain) {
        case "electricterrain":
          move.type = "Electric";
          break;
        case "grassyterrain":
          move.type = "Grass";
          break;
        case "mistyterrain":
          move.type = "Fairy";
          break;
        case "psychicterrain":
          move.type = "Psychic";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.terrain && pokemon.isGrounded()) {
        move.basePower *= 2;
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMovePower: 160,
    contestType: "Beautiful"
  },
  leafage: {
    inherit: true,
    onModifyPriority(priority, source2, target, move) {
      if (source2.species.id === "shaymin") {
        return priority + 1;
      }
    }
  },
  shedleaves: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Removes the user's Grass-type, resets negative stat changes, and cures the user of status.",
    name: "Shed Leaves",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    onTryMove(pokemon, target, move) {
      if (pokemon.hasType("Grass"))
        return;
      this.add("-fail", pokemon, "move: Shed Leaves");
      this.attrLastMove("[still]");
      return null;
    },
    onHit(pokemon) {
      if (["", "slp", "frz"].includes(pokemon.status))
        return;
      pokemon.cureStatus();
    },
    self: {
      onHit(pokemon) {
        const boosts = {};
        let i;
        for (i in pokemon.boosts) {
          if (pokemon.boosts[i] < 0) {
            boosts[i] = 0;
          }
        }
        pokemon.setBoost(boosts);
        this.add("-clearnegativeboost", pokemon, "[silent]");
        this.add("-message", pokemon.name + "'s negative stat changes were removed!");
        pokemon.setType(pokemon.getTypes(true).map((type) => type === "Grass" ? "???" : type));
        this.add("-start", pokemon, "typechange", pokemon.types.join("/"), "[from] move: Shed Leaves");
      }
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { effect: "heal" },
    contestType: "Clever"
  },
  seedbomb: {
    inherit: true,
    secondary: {
      chance: 50,
      onHit(target, source2, move) {
        if (source2.species.id !== "shaymin")
          return;
        target.addVolatile("leechseed");
      }
    }
  },
  focusblast: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "heatmor")
        return;
      return accuracy + 15;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id !== "typhlosion")
        return;
      if (target.newlySwitched || !this.queue.willMove(target))
        move.accuracy = true;
    }
  },
  adaptableattack: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Deals typeless damage. Special if SpA > Atk.",
    isViable: true,
    name: "Adaptable Attack",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Multi-Attack", target);
    },
    onModifyMove(move, pokemon, target) {
      move.type = "???";
      if (pokemon.getStat("spa", false, true) > pokemon.getStat("atk", false, true))
        move.category = "Special";
    },
    onBasePower(basePower, pokemon, target) {
      if (pokemon.species.name === "Type: Null") {
        return this.chainModify(1.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Cute"
  },
  chipaway: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon") {
        move.type = "Dragon";
        move.basePower = 85;
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "mytheon") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  doublekick: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "mytheon")
        return;
      return accuracy - 10;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon" || source2.species.id === "arcanine") {
        move.basePower = 50;
      }
    }
  },
  naturalgift: {
    inherit: true,
    onPrepareHit(target, pokemon, move) {
      if (pokemon.species.id !== "mytheon") {
        if (pokemon.ignoringItem())
          return false;
        const item2 = pokemon.getItem();
        if (!item2.naturalGift)
          return false;
        move.basePower = item2.naturalGift.basePower;
        pokemon.setItem("");
        pokemon.lastItem = item2.id;
        pokemon.usedItemThisTurn = true;
        this.runEvent("AfterUseItem", pokemon, null, null, item2);
      } else if (pokemon.species.id === "mytheon") {
        if (pokemon.ignoringItem())
          return false;
        const item2 = pokemon.getItem();
        if (!item2.naturalGift)
          return false;
        move.basePower = item2.naturalGift.basePower;
      }
    }
  },
  poisonfang: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon") {
        move.basePower = 65;
      }
    },
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "mytheon")
        return;
      return accuracy - 5;
    },
    secondary: {
      chance: 50,
      status: "tox"
    },
    self: {
      chance: 10,
      onHit(source2, pokemon) {
        if (source2.species.id !== "mytheon")
          return;
        pokemon.addVolatile("flinch");
      }
    },
    target: "normal",
    type: "Poison",
    contestType: "Clever"
  },
  skittersmack: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon") {
        move.basePower = 90;
      }
      if (source2.species.id === "shedinja") {
        move.basePower = 80;
      }
    },
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "mytheon" || source.species.id !== "shedinja")
        return;
      return accuracy = 100;
    },
    secondaries: [
      {
        chance: 30,
        onHit(source2, pokemon) {
          if (pokemon.species.id === "mytheon") {
            this.boost({ spa: -1 }, source2);
          }
        }
      },
      {
        chance: 100,
        onHit(source2, pokemon) {
          if (pokemon.species.id !== "mytheon") {
            this.boost({ spa: -1 }, source2);
          }
        }
      }
    ]
  },
  synchronoise: {
    inherit: true,
    onTryImmunity(target, source2) {
      if (source2.species.id !== "mytheon") {
        return target.hasType(source2.getTypes());
      }
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon") {
        move.basePower = 70;
        move.ignoreImmunity = false;
        move.flags.sound = 1;
      }
    },
    onBasePower(basePower, pokemon, target) {
      if (target.hasType(pokemon.getTypes()) && pokemon.species.id === "mytheon") {
        return this.chainModify(2);
      }
    }
  },
  uturn: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "mytheon") {
        move.basePower = 60;
      }
    }
  },
  doubleironbash: {
    num: 742,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "Hits twice.",
    name: "Double Iron Bash",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    multihit: 2,
    target: "normal",
    type: "Steel",
    zMove: { basePower: 180 },
    maxMove: { basePower: 140 },
    contestType: "Clever"
  },
  eyesofchaos: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
    isViable: true,
    name: "Eyes of Chaos",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Glare", target);
    },
    useSourceDefensiveAsOffensive: true,
    secondary: null,
    target: "normal",
    type: "Dark"
  },
  multiattack: {
    num: 718,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Multi-Attack",
    shortDesc: "Type varies based on the user's type.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  slitherstrike: {
    num: -1,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    shortDesc: "User switches out after damaging the target. If used by Sandaconda, it transforms into Sandaconda-Uncoiled for the rest of the match.",
    name: "Slither Strike",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onHit(target, pokemon, move) {
      if (pokemon.baseSpecies.baseSpecies === "Sandaconda" && !pokemon.transformed && pokemon.species.id !== "sandacondauncoiled") {
        move.willChangeForme = true;
      }
    },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (move.willChangeForme) {
        let forme = "";
        if (pokemon.species.id === "sandaconda") {
          forme = "-Uncoiled";
        }
        pokemon.formeChange("Sandaconda" + forme, move, true, "[silent]");
        this.add("-message", `${pokemon.name} uncoiled!`);
        const species = this.dex.species.get(pokemon.species.name);
        const abilities = species.abilities;
        const baseStats = species.baseStats;
        const type = species.types[0];
      }
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Cute"
  },
  coralcrash: {
    num: 1006,
    accuracy: 90,
    basePower: 110,
    category: "Physical",
    shortDesc: " Has 1/4 recoil. 10% chance to lower the target's Special Attack by 1.",
    name: "Coral Crash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [1, 4],
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Head Smash", target);
    },
    secondary: {
      chance: 10,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  puyopop: {
    num: 40046,
    accuracy: 90,
    basePower: 10,
    basePowerCallback(pokemon, target, move) {
      return 10 * move.hit;
    },
    category: "Special",
    shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
    id: "puyopop",
    name: "Puyo Pop",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onHit(target, source2, move) {
      if (move.hit !== 4)
        return;
      const removeAll = ["spikes", "toxicspikes", "stealthrock", "stickyweb"];
      for (const sideCondition of removeAll) {
        if (source2.side.removeSideCondition(sideCondition)) {
          this.add("-sideend", source2.side, this.dex.conditions.get(sideCondition).name, "[from] move: Puyo Pop", "[of] " + source2);
        }
      }
    },
    multihit: 4,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Water",
    zMovePower: 180,
    contestType: "Cute"
  },
  permutation: {
    num: 40053,
    accuracy: true,
    basePower: 200,
    category: "Special",
    shortDesc: "No additional effect.",
    id: "permutation",
    name: "Permutation",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "puyoniumz",
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  crunch: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.basePower = 85;
      }
    }
  },
  thunderfang: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.basePower = 85;
      }
    }
  },
  firefang: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.basePower = 85;
      }
    }
  },
  wildcharge: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.basePower = 100;
      }
    }
  },
  dragonragesylve: {
    num: 82,
    accuracy: 100,
    basePower: 0,
    damage: "level",
    category: "Special",
    shortDesc: "Deals fixed damage equal to the user's level",
    id: "dragonragesylve",
    isViable: true,
    name: "Dragon Rage (Sylve)",
    pp: 20,
    priority: 0,
    flags: {
      protect: 1,
      mirror: 1
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dragon Rage", target);
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    zMovePower: 100,
    contestType: "Cool"
  },
  flamewheelsylve: {
    num: 228,
    accuracy: 100,
    basePower: 40,
    basePowerCallback(pokemon, target, move) {
      if (target.beingCalledBack) {
        this.debug("Flame Wheel damage boost");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    shortDesc: "Power doubles if a foe is switching out.",
    id: "flamewheelsylve",
    isViable: true,
    name: "Flame Wheel (Sylve)",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    beforeTurnCallback(pokemon) {
      for (const side of this.sides) {
        if (side === pokemon.side)
          continue;
        side.addSideCondition("flamewheelsylve", pokemon);
        const data = side.getSideConditionData("flamewheelsylve");
        if (!data.sources) {
          data.sources = [];
        }
        data.sources.push(pokemon);
      }
    },
    onModifyMove(move, source2, target) {
      if (target?.beingCalledBack)
        move.accuracy = true;
    },
    onTryHit(target, pokemon) {
      target.side.removeSideCondition("flamewheelsylve");
    },
    condition: {
      duration: 1,
      onBeforeSwitchOut(pokemon) {
        this.debug("Flame Wheel start");
        let alreadyAdded = false;
        pokemon.removeVolatile("destinybond");
        for (const source2 of this.effectState.sources) {
          if (!this.queue.cancelMove(source2) || !source2.hp)
            continue;
          if (!alreadyAdded) {
            this.add("-activate", pokemon, "move: Flame Wheel");
            alreadyAdded = true;
          }
          if (source2.canMegaEvo || source2.canUltraBurst) {
            for (const [actionIndex, action] of this.queue.entries()) {
              if (action.pokemon === source2 && action.choice === "megaEvo") {
                this.runMegaEvo(source2);
                this.queue.list.splice(actionIndex, 1);
                break;
              }
            }
          }
          this.runMove("flamewheelsylve", source2, this.getTargetLoc(pokemon, source2));
        }
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Wheel", target);
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    zMovePower: 100,
    contestType: "Clever"
  },
  incineratesylve: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    shortDesc: "1.5x damage if foe holds an item. Removes item.",
    id: "incineratesylve",
    isViable: true,
    name: "Incinerate (Sylve)",
    pp: 20,
    priority: 0,
    flags: {
      protect: 1,
      mirror: 1
    },
    onBasePowerPriority: 4,
    onBasePower(basePower, source2, target, move) {
      const item2 = target.getItem();
      if (!this.singleEvent("TakeItem", item2, target.itemData, target, source2, move, item2))
        return;
      if (item2.id) {
        return this.chainModify(1.5);
      }
    },
    onHit(target, source2) {
      const item2 = target.getItem();
      if (source2.hp && item2.isBerry && target.takeItem(source2)) {
        this.add("-enditem", target, item2.name, "[from] stealeat", "[move] Incinerate", "[of] " + source2);
        if (this.singleEvent("Eat", item2, null, source2, null, null)) {
          this.runEvent("EatItem", source2, null, null, item2);
        }
        if (item2.onEat)
          source2.ateBerry = true;
      }
    },
    onAfterHit(target, source2) {
      if (source2.hp) {
        const item2 = target.takeItem();
        if (item2) {
          this.add("-enditem", target, item2.name, "[from] move: Incinerate", "[of] " + source2);
        }
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Incinerate", target);
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    zMovePower: 120
  },
  mudslapsylve: {
    num: 98,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    shortDesc: "Usually goes first.",
    id: "mudslapsylve",
    isViable: true,
    name: "Mud Slap (Sylve)",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mud Slap", target);
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    zMovePower: 100,
    contestType: "Cool"
  },
  teleport: {
    num: 100,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Teleport",
    pp: 20,
    priority: -6,
    flags: {},
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.basePower = 70;
        move.target = "normal";
      }
    },
    onModifyPriority(priority, source2, target, move) {
      if (source2.species.id === "arcanine") {
        return priority + 0;
      }
    },
    selfSwitch: true,
    onTryHit: true,
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { effect: "heal" },
    contestType: "Cool"
  },
  stormstrike: {
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    shortDesc: "Power doubles and type varies in each weather.",
    id: "stormstrike",
    name: "Storm Strike",
    pp: 10,
    priority: 0,
    flags: {
      bullet: 1,
      protect: 1,
      mirror: 1
    },
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move.type = "Water";
          break;
        case "sandstorm":
          move.type = "Rock";
          break;
        case "hail":
          move.type = "Ice";
          break;
        case "aircurrent":
          move.type = "Flying";
          break;
        case "shadowsky":
          move.type = "Ghost";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move.basePower *= 2;
          break;
        case "sandstorm":
          move.basePower *= 2;
          break;
        case "hail":
          move.basePower *= 2;
          break;
        case "aircurrent":
          move.basePower *= 2;
          break;
        case "shadowsky":
          move.basePower *= 2;
          break;
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
      this.add("-anim", source2, "Knock Off", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMovePower: 160,
    contestType: "Beautiful"
  },
  peekaboo: {
    num: 712,
    accuracy: 100,
    basePower: 0,
    damageCallback(pokemon) {
      return this.random(130);
    },
    category: "Special",
    name: "Peek-a-Boo",
    shortDesc: "Deals a random amount of damage and forces user out.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onTryHit(pokemon, target, move, source2) {
      if (!this.canSwitch(pokemon.side)) {
        return false;
      }
      source2.forceSwitch();
      return;
    },
    self: {
      forceSwitch: true
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
      this.add("-anim", source2, "Poltergeist", target);
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  planetarycrash: {
    num: 1002,
    accuracy: 80,
    basePower: 120,
    category: "Special",
    name: "Planetary Crash",
    shortDesc: "User takes 50% of max HP if it misses. Phys if Atk > Sp. Atk",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    hasCrashDamage: true,
    onMoveFail(target, source2, move) {
      this.damage(source2.baseMaxhp / 2, source2, source2, this.dex.conditions.get("Planetary Crash"));
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Cosmic Power", target);
      this.add("-anim", source2, "Head Smash", target);
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  terraforming: {
    num: 1015,
    accuracy: 100,
    basePower: 130,
    category: "Physical",
    name: "Terraforming",
    shortDesc: "Fails if there is no weather active. Ends the weather.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit() {
      if (this.field.isWeather(""))
        return false;
    },
    onHit() {
      this.field.clearWeather();
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rototiller", target);
    },
    secondary: null,
    target: "normal",
    type: "Ground"
  },
  aerostrike: {
    num: 369,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "User switches out after damaging the target.",
    name: "Aerostrike",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target);
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Cute"
  },
  sweetmelody: {
    num: 10001,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "The target is freed from Infestation.",
    name: "Sweet Melody",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, authentic: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sparkling Aria", target);
    },
    secondary: {
      dustproof: true,
      chance: 100,
      onHit(target) {
        if (target.volatiles["infestation"])
          target.removeVolatile("infestation");
      }
    },
    target: "allAdjacent",
    type: "Water",
    contestType: "Tough"
  },
  flashhandoff: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    shortDesc: "User switches out. The replacement's next move has perfect accuracy.",
    isViable: true,
    name: "Flash Handoff",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    slotCondition: "flashhandoff",
    condition: {
      duration: 1,
      onResidualOrder: 7,
      onEnd(source2) {
        for (const pokemon of source2.side.active) {
          if (!pokemon.fainted) {
            pokemon.addVolatile("lockon");
          }
        }
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "U-turn", target);
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "healreplacement" },
    contestType: "Tough"
  },
  terracharge: {
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    shortDesc: "Deals 33% of the damage dealt in recoil. 10% chance to lower the target's Speed.",
    isViable: true,
    name: "Terra Charge",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Head Smash", target);
    },
    recoil: [33, 100],
    secondary: {
      chance: 10,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Cool"
  },
  thundercage: {
    inherit: true,
    category: "Physical",
    flags: { protect: 1, mirror: 1, contact: 1 }
  },
  freezeshock: {
    num: 553,
    accuracy: 90,
    basePower: 85,
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
  fusionbolt: {
    num: 559,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "If a Pok\xE9mon in the user's party has Fusion Flare; 1.3x power & 20% chance to burn.",
    name: "Fusion Bolt",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, move) {
      for (const ally of pokemon.side.pokemon) {
        if (!ally || ally.fainted)
          continue;
        for (const moveSlot of ally.moveSlots) {
          const move2 = this.dex.moves.get(moveSlot.move);
          if (move2.id === "fusionflare")
            continue;
          this.debug("double power");
          return this.chainModify(1.3);
        }
      }
    },
    secondary: {
      chance: 20,
      onHit(target, pokemon, move) {
        for (const ally of pokemon.side.pokemon) {
          if (!ally || ally.fainted)
            continue;
          for (const moveSlot of ally.moveSlots) {
            const move2 = this.dex.moves.get(moveSlot.move);
            if (move2.id === "fusionflare")
              continue;
            target.trySetStatus("brn");
          }
        }
      }
    },
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  hiddenpowermiasmons: {
    num: 237,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    shortDesc: "Type varies on Memory, Plate, Type-Item or Berry.",
    name: "Hidden Power (Miasmons)",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      if (pokemon.ignoringItem())
        return;
      if (["insectplate", "bugmemory", "silverpowder", "figyberry", "comnberry", "tangaberry", "enigmaberry"].includes(item.id)) {
        move.type = "Bug";
      } else if (["dreadplate", "darkmemory", "blackglasses", "iapapaberry", "spelonberry", "colburberry", "rowapberry", "marangaberry"].includes(item.id)) {
        move.type = "Dark";
      } else if (["dracoplate", "dragonmemory", "dragonfang", "aguavberry", "nomelberry", "habanberry", "jaboocaberry"].includes(item.id)) {
        move.type = "Dragon";
      } else if (["zapplate", "electricmemory", "magnet", "pechaberry", "wepearberry", "belueberry", "wacanberry"].includes(item.id)) {
        move.type = "Electric";
      } else if (["pixieplate", "fairymemory", "roseliberry", "keeberry"].includes(item.id)) {
        move.type = "Fairy";
      } else if (["flameplate", "firememory", "charcoal", "cheriberry", "blukberry", "watmelberry", "occaberry"].includes(item.id)) {
        move.type = "Fire";
      } else if (["fistplate", "fightingmemory", "blackbelt", "leppaberry", "kelpsyberry", "chopleberry", "salacberry"].includes(item.id)) {
        move.type = "Fighting";
      } else if (["skyplate", "flyingmemory", "sharpbeak", "lumberry", "grepaberry", "cobaberry", "lansatberry"].includes(item.id)) {
        move.type = "Flying";
      } else if (["spookyplate", "ghostmemory", "spelltag", "magoberry", "rabutaberry", "kasibberry", "custapberry"].includes(item.id)) {
        move.type = "Ghost";
      } else if (["meadowplate", "grassmemory", "miracleseed", "rawstberry", "pinapberry", "rindoberry", "liechiberry"].includes(item.id)) {
        move.type = "Grass";
      } else if (["earthplate", "groundmemory", "softsand", "persimberry", "hondewberry", "shucaberry", "apicotberry"].includes(item.id)) {
        move.type = "Ground";
      } else if (["icicleplate", "icememory", "nevermeltice", "aspearberry", "pomegberry", "yacheberry", "ganlonberry"].includes(item.id)) {
        move.type = "Ice";
      } else if (["toxicplate", "poisonmemory", "poisonbarb", "oranberry", "qualotberry", "kebiaberry", "petayaberry"].includes(item.id)) {
        move.type = "Poison";
      } else if (["mindplate", "psychicmemory", "twistedspoon", "sitrusberry", "tamatoberry", "payapaberry", "starfberry"].includes(item.id)) {
        move.type = "Psychic";
      } else if (["stoneplate", "rockmemory", "hardstone", "wikiberry", "magostberry", "chartiberry", "micleberry"].includes(item.id)) {
        move.type = "Rock";
      } else if (["ironplate", "steelmemory", "metalcoat", "razzberry", "pamtreberry", "babiriberry"].includes(item.id)) {
        move.type = "Steel";
      } else if (["splashplate", "watermemory", "mysticwater", "chestoberry", "nanabberry", "durinberry", "passhoberry"].includes(item.id)) {
        move.type = "Water";
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  hypnosis: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "lunatone")
        return;
      return accuracy = 70;
    }
  },
  return: {
    inherit: true,
    basePowerCallback(pokemon) {
      if (pokemon.species.id === "lunatone")
        return;
      return Math.floor(pokemon.happiness * 10 / 25) || 1;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "lunatone") {
        move.basePower = 90;
      }
    }
  },
  stompingtantrum: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "lunatone") {
        move.basePower = 80;
      }
    }
  },
  aurasphere: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 90;
      }
    }
  },
  dreameatercfm: {
    num: 138,
    accuracy: 100,
    basePower: 75,
    basePowerCallback(pokemon, target, move) {
      if (target.status === "slp" || target.hasAbility("comatose"))
        return move.basePower * 1.5;
      return move.basePower;
    },
    category: "Special",
    shortDesc: "User recovers 50% of the damage dealt.",
    name: "Dream Eater (CFM)",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Psychic",
    zMove: { basePower: 140 },
    contestType: "Clever"
  },
  drillruncfm: {
    num: 529,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "10% chance to lower the target's Defence by 1.",
    name: "Drill Run (CFM)",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, antiair: 1 },
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  furyswipes: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "shedinja")
        return;
      return accuracy + 15;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 25;
      }
    }
  },
  gustcfm: {
    num: 16,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    shortDesc: "Usually goes first.",
    cfmDesc: "Priority: +1",
    name: "Gust (CFM)",
    pp: 35,
    priority: 1,
    flags: { protect: 1, mirror: 1, distance: 1 },
    secondary: null,
    target: "any",
    type: "Flying",
    contestType: "Clever"
  },
  leechlife: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 75;
      }
    }
  },
  mudslapcfm: {
    num: 189,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Mud-Slap (CFM)",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, antiair: 1 },
    secondary: {
      chance: 100,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Cute"
  },
  nightslash: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "shedinja")
        return;
      return accuracy - 5;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 100;
      }
    }
  },
  phantomforcecfm: {
    num: 566,
    accuracy: true,
    basePower: 75,
    category: "Physical",
    shortDesc: "Breaks through Substitutes. Never misses",
    name: "Phantom Force (CFM)",
    pp: 10,
    priority: 0,
    flags: { contact: 1, mirror: 1, protect: 1, authentic: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    zMove: { basePower: 140 },
    contestType: "Cool"
  },
  protect: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.type = "Psychic";
      }
    }
  },
  restcfm: {
    num: 156,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Sleeps for 2 turns to recover HP; Comatose: heal 50%.",
    name: "Rest (CFM)",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onTry(source2, target, move) {
      if (source2.hp === source2.maxhp) {
        this.add("-fail", source2, "heal");
        return null;
      }
      if (source2.status === "slp")
        return false;
      if (source2.hasAbility(["insomnia", "vitalspirit"])) {
        this.add("-fail", source2, "[from] ability: " + source2.getAbility().name, "[of] " + source2);
        return null;
      }
      if (source2.hasAbility("comatose")) {
        move.heal = [1, 2];
      }
    },
    onHit(target, source2, move) {
      if (!target.hasAbility("comatose")) {
        if (!target.setStatus("slp", source2, move))
          return false;
        const timer = target.hasAbility("earlybird") ? 1 : 3;
        target.statusState.time = timer;
        this.heal(target.maxhp);
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  sandattackcfm: {
    num: 28,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Sand Attack (CFM)",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      accuracy: -1
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cute"
  },
  screech: {
    inherit: true,
    onSourceModifyAccuracy(accuracy) {
      if (source.species.id !== "shedinja")
        return;
      return accuracy + 15;
    },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.pp = 15;
      }
    }
  },
  shadowball: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 90;
        move.pp = 10;
      }
    }
  },
  shadowclawcfm: {
    num: 421,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "20% chance to lower foe's defense.",
    name: "Shadow Claw (CFM)",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Ghost",
    zMove: { basePower: 160 },
    contestType: "Cool"
  },
  slashcfm: {
    num: 163,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Type varies based on the user's primary type.",
    name: "Slash (CFM)",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, omnitype: 1, antiair: 1 },
    onModifyMove(move, pokemon) {
      let type = pokemon.types[0];
      if (type === "Bird")
        type = "???";
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { basePower: 175 },
    contestType: "Cool"
  },
  sleeptalkcfm: {
    num: 214,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sleep Talk (CFM)",
    pp: 10,
    priority: 0,
    flags: {},
    sleepUsable: true,
    onTry(source2) {
      return source2.status === "slp" || source2.hasAbility("comatose");
    },
    onHit(pokemon) {
      const noSleepTalk = [
        "assist",
        "beakblast",
        "belch",
        "bide",
        "celebrate",
        "chatter",
        "copycat",
        "focuspunch",
        "mefirst",
        "metronome",
        "mimic",
        "mirrormove",
        "naturepower",
        "rest",
        "shelltrap",
        "sketch",
        "skyattack",
        "sleeptalk",
        "uproar"
      ];
      const moves = [];
      for (const moveSlot of pokemon.moveSlots) {
        const moveid = moveSlot.id;
        if (!moveid)
          continue;
        const move = this.dex.moves.get(moveid);
        if (noSleepTalk.includes(moveid) || move.flags["charge"] || move.isZ && move.basePower !== 1) {
          continue;
        }
        moves.push(moveid);
      }
      let randomMove = "";
      if (moves.length)
        randomMove = this.sample(moves);
      if (!randomMove) {
        return false;
      }
      this.actions.useMove(randomMove, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "crit2" },
    contestType: "Cute"
  },
  xscissor: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "shedinja") {
        move.basePower = 90;
        move.ignoreEvasion = true;
        move.ignoreDefensive = true;
      }
    }
  },
  solarbeamcfm: {
    num: 76,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    shortDesc: "Base power is halved if weather is not harsh sunlight.",
    name: "Solar Beam (CFM)",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (!this.field.isWeather(["sunnyday", "desolateland"])) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Cool"
  },
  clobbertackle: {
    num: -1,
    accuracy: 100,
    basePower: 80,
    basePowerCallback(pokemon, target, move) {
      if (target.newlySwitched || this.queue.willMove(target)) {
        this.debug("Clobber Tackle NOT boosted");
        return move.basePower;
      }
      this.debug("Clobber Tackle damage boost");
      return move.basePower * 1.5;
    },
    category: "Physical",
    shortDesc: "1.5x power if user moves after the target.",
    name: "Clobber Tackle",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    target: "normal",
    type: "Rock"
  },
  flicker: {
    num: -1007,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Flicker",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfSwitch: true,
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Moonblast", target);
    },
    secondary: null,
    shortDesc: "The user switches out after using the move.",
    target: "normal",
    type: "Fairy"
  },
  borealshine: {
    num: -1002,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Boreal Shine",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1 },
    boosts: {
      atk: 1,
      def: 1,
      spe: 1
    },
    secondary: null,
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aurora Veil", target);
    },
    target: "self",
    shortDesc: "Raises the user's Atk, Def and Spe.",
    type: "Ice",
    contestType: "Beautiful"
  },
  maelstrom: {
    num: -1012,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Maelstrom",
    pp: 10,
    priority: -6,
    flags: { mirror: 1 },
    forceSwitch: true,
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Clever",
    shortDesc: "Forces the target to switch to a random ally.",
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlpool", target);
    }
  },
  thunderpunch: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "typhlosion" || source2.species.id === "breloom") {
        move.basePower = 85;
      }
    }
  },
  firepunch: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "typhlosion") {
        move.basePower = 85;
      }
    }
  },
  solventshot: {
    num: -1030,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    shortDesc: "10% chance to toxic. Super effective on Steel.",
    name: "Solvent Shot",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    ignoreImmunity: { "Poison": true },
    onEffectiveness(typeMod, target, type) {
      if (type === "Steel")
        return 1;
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Gunk Shot", target);
    },
    secondary: {
      chance: 10,
      status: "tox"
    },
    target: "normal",
    type: "Poison",
    zMove: { basePower: 140 },
    contestType: "Beautiful"
  },
  shortcircuit: {
    num: -1035,
    accuracy: 90,
    basePower: 130,
    category: "Physical",
    shortDesc: "Lowers the user's Atk by 2.",
    name: "Short Circuit",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bolt Strike", target);
    },
    self: {
      boosts: {
        atk: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Beautiful"
  },
  springtidestorm: {
    shortDesc: "10% chance to lower all target's stats.",
    num: -1005,
    accuracy: 95,
    basePower: 95,
    category: "Special",
    name: "Springtide Storm",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fairy Wind", target);
    },
    onTry(pokemon) {
      if (pokemon.species.baseSpecies === "Enamorus-Therian") {
        return;
      }
      this.hint("Only a Pokemon whose form is Enamorus-Therian can use this move.");
      this.add("-fail", pokemon, "move: Springtide Storm");
      return null;
    },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1,
        def: -1,
        spa: -1,
        spd: -1,
        spe: -1
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  dualchop: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "primeape") {
        move.basePower = 50;
      }
    }
  },
  bonemerangpgp: {
    num: 155,
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    shortDesc: "Hits 2 times in one turn. Hits airbone Pokemon.",
    name: "Bonemerang (PGP)",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: 2,
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bonemerang", target);
    },
    ignoreImmunity: { "Ground": true },
    secondary: null,
    target: "normal",
    type: "Ground",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  strengthpgp: {
    num: 70,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Super effective on Fighting. Removes Spikes and Toxic Spikes",
    name: "Strength (PGP)",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Strength", target);
    },
    onAfterHit(target, pokemon) {
      const sideConditions = ["spikes", "toxicspikes"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Strength (PGP)", "[of] " + pokemon);
        }
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Strength (PGP)", "[of] " + pokemon);
        }
      }
    },
    onEffectiveness(typeMod, target, type) {
      if (type === "Fighting")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Tough"
  },
  cocoonfeeding: {
    num: 262,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cocoon Feeding",
    shortDesc: "User faints. Incoming Pokemon gains +1 Def and +1 SpDef.",
    pp: 10,
    priority: 0,
    flags: { mirror: 1 },
    onTryHit(pokemon, target, move) {
      if (!this.canSwitch(pokemon.side)) {
        delete move.selfdestruct;
        return false;
      }
    },
    slotCondition: "cocoonfeeding",
    condition: {
      onSwap(target) {
        this.boost({ def: 1 });
        this.boost({ spd: 1 });
        target.side.removeSlotCondition(target, "cocoonfeeding");
      }
    },
    selfdestruct: "ifHit",
    secondary: null,
    target: "self",
    type: "Bug",
    zMove: { effect: "healreplacement" },
    contestType: "Tough"
  },
  feudalharpoon: {
    num: 830,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Feudal Harpoon",
    desc: "Lowers the user's Defense and Special Defense by 1 stage.",
    shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        def: -1,
        spd: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  banefulbladedance: {
    num: 1014,
    accuracy: true,
    basePower: 160,
    category: "Special",
    name: "Baneful Blade Dance",
    shortDesc: "Guarantees critical hits.",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "odonagiumz",
    self: {
      onHit(source2) {
        for (const pokemon of source2.side.active) {
          pokemon.addVolatile("banefulbladedance");
        }
      }
    },
    condition: {
      noCopy: true,
      onStart(target, source2, effect) {
        if (!["imposter", "psychup", "transform"].includes(effect?.id)) {
          this.add("-start", target, "move: Baneful Blade Dance");
        }
      },
      onModifyCritRatio(critRatio) {
        return critRatio + 3;
      }
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  breegullblaster: {
    num: 40054,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Varies in type based on the user's Sp. Atk IV. (Ice if odd, Fire if even)",
    id: "breegullblaster",
    name: "Breegull Blaster",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    onModifyMove(move, pokemon) {
      if (!(pokemon.set.ivs["spa"] % 2)) {
        move.type = "Fire";
      } else {
        move.type = "Ice";
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMovePower: 120,
    contestType: "Clever"
  },
  shocktail: {
    num: -1e3,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    shortDesc: "The target gets paralyzed when they have positive stat changes.",
    name: "Shock Tail",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Charge", target);
      this.add("-anim", source2, "Iron Tail", target);
    },
    secondary: {
      chance: 100,
      onHit(target, source2) {
        if (target.positiveBoosts()) {
          target.trySetStatus("par", source2);
        }
      }
    },
    target: "normal",
    type: "Electric"
  },
  yoshishield: {
    num: 588,
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Protects from damaging attacks. Contact: -1 Def, SpD, Spe.",
    name: "Yoshi Shield",
    pp: 10,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "yoshishield",
    onTryHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source2, move) {
        if (!move.flags["protect"] || move.category === "Status") {
          if (move.isZ || move.isMax && !move.breaksProtect)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (move.flags["contact"]) {
          this.boost({ atk: -1 }, source2, target, this.dex.getActiveMove("Yoshi Shield"));
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move) {
        if (move.isZOrMaxPowered && move.flags["contact"]) {
          this.boost({ def: -1, spd: -1, spe: -1 }, source2, target, this.dex.getActiveMove("Yoshi Shield"));
        }
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Protect", target);
      this.add("-anim", source2, "Burn Up", target);
    },
    secondary: null,
    target: "self",
    type: "Fire"
  },
  stinkbomb: {
    accuracy: 75,
    basePower: 100,
    category: "Physical",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    isViable: true,
    name: "Stink Bomb",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Toxic", target);
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "allAdjacentFoes",
    type: "Poison",
    contestType: "Tough"
  },
  aridabsorption: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Heals by 33% of its max HP. +33% and +1 Atk for every active Water-type.",
    name: "Arid Absorption",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shore Up", target);
    },
    self: {
      onHit(pokemon, source2, move) {
        this.heal(source2.baseMaxhp / 3, source2, pokemon);
      }
    },
    onHitField(target, source2) {
      if (target.hasType("Water")) {
        this.heal(source2.baseMaxhp / 3, source2, target);
        this.boost({ atk: 1 }, source2);
      }
      if (source2.hasType("Water")) {
        this.heal(source2.baseMaxhp / 3, source2, target);
        this.boost({ atk: 1 }, source2);
        this.damage(source2.baseMaxhp / 3, source2, target);
      }
    },
    secondary: null,
    target: "all",
    type: "Ground"
  },
  "hurricanetoss": {
    num: 40119,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
    shortDesc: "Hits 2-5 times in one turn.",
    id: "hurricanetoss",
    name: "Hurricane Toss",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    ignoreDefensive: true,
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Flying",
    zMovePower: 140,
    gmaxPower: 130,
    contestType: "Cool"
  },
  turnrelay: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Switches the user out.",
    name: "Turn Relay",
    pp: 40,
    priority: 1,
    flags: {},
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Baton Pass", target);
    },
    selfSwitch: true,
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  snowstorm: {
    num: 1003,
    accuracy: 75,
    basePower: 100,
    category: "Special",
    shortDesc: "Traps and damages the target for 4-5 turns.",
    name: "Snowstorm",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "hail":
          move.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
          move.accuracy = 50;
          break;
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Glacial Lance", target);
    },
    volatileStatus: "partiallytrapped",
    secondary: void 0,
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  triattack: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Electric-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Electric";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  doubleedge: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Steel-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Steel";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  facade: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Fighting-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Fighting";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  gigaimpact: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Dark-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Dark";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  hyperbeam: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Dark-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Dark";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  lastresort: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Dark-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Dark";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  round: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Flying-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Flying";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  secretpower: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Psychic-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Psychic";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  skullbash: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Rock-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Rock";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  swift: {
    inherit: true,
    shortDesc: "AbNormal Porygon-Z: Fairy-type.",
    onModifyMove(move, source2, target) {
      if (source2.species.id === "porygonz") {
        move.type = "Fairy";
      }
    },
    onUseMoveMessage(pokemon, target, move) {
      if (pokemon.species.id === "porygonz") {
        this.add("-message", `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
      }
    }
  },
  espwave: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "ESP Wave",
    shortDesc: "Lowers Atk/Sp. Atk/Speed of trapped foes by 1.",
    pp: 20,
    priority: 0,
    flags: { sound: 1, reflectable: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psywave", target);
    },
    onHit(target, source2, move) {
      if (target.volatiles["partiallytrapped"] || target.volatiles["trapped"]) {
        return !!this.boost({ atk: -1, spa: -1, spe: -1 }, target, source2, move);
      }
      return false;
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Psychic",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  boltarang: {
    accuracy: 100,
    basePower: 15,
    basePowerCallback(pokemon, target, move) {
      if (pokemon.species.name === "Thunjust-Super" && pokemon.hasAbility("retribution")) {
        return move.basePower + 10;
      }
      return move.basePower;
    },
    category: "Special",
    shortDesc: "Hits 2-5 times.",
    name: "Boltarang",
    pp: 20,
    priority: 1,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunder Wave", target);
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  stormcloak: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Raises the user's SpA by 1 stage and lowers the user's Spe by 1 stage.",
    name: "Storm Cloak",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Defog", target);
    },
    boosts: {
      spa: 1,
      spe: -1
    },
    secondary: null,
    target: "self",
    type: "Flying",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  floralhealing: {
    num: 666,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Floral Healing",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, heal: 1, allyanim: 1 },
    onHit(target, source2) {
      let success = false;
      let factor = 0.5;
      if (this.field.isTerrain("grassyterrain"))
        factor = 0.667;
      if (source2.hasAbility("divinegrace"))
        factor = factor * 1.5;
      success = !!this.heal(Math.ceil(target.baseMaxhp * factor));
      if (success && !target.isAlly(source2)) {
        target.staleness = "external";
      }
      if (!success) {
        this.add("-fail", target, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  healorder: {
    num: 456,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Heal Order",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Bug",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  healpulse: {
    num: 505,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Heal Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, pulse: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1 },
    onHit(target, source2) {
      let success = false;
      if (source2.hasAbility("megalauncher") || source2.hasAbility("divinegrace")) {
        success = !!this.heal(this.modify(target.baseMaxhp, 0.75));
      } else {
        success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
      }
      if (success && !target.isAlly(source2)) {
        target.staleness = "external";
      }
      if (!success) {
        this.add("-fail", target, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "any",
    type: "Psychic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  junglehealing: {
    num: 816,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Jungle Healing",
    pp: 10,
    priority: 0,
    flags: { heal: 1, bypasssub: 1, allyanim: 1 },
    onHit(pokemon) {
      let factor = 0.25;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.375;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      return pokemon.cureStatus() || success;
    },
    secondary: null,
    target: "allies",
    type: "Grass"
  },
  lifedew: {
    num: 791,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Life Dew",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1, bypasssub: 1 },
    onHit(pokemon) {
      let factor = 0.25;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.375;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "allies",
    type: "Water"
  },
  milkdrink: {
    num: 208,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Milk Drink",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  moonlight: {
    num: 236,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Moonlight",
    pp: 5,
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
      if (pokemon.hasAbility("divinegrace"))
        factor = factor * 1.5;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  morningsun: {
    num: 234,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Morning Sun",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onModifyMove(move, source2, target) {
      if (source2.species.id === "arcanine") {
        move.pp = 10;
      }
    },
    onHit(pokemon) {
      if (this.field.isWeather(["desolateland", "sunnyday"])) {
        return this.heal(this.modify(pokemon.maxhp, 0.667));
      } else if (this.field.isWeather(["raindance", "primordialsea", "sandstorm", "hail"]) && pokemon.species.id !== "arcanine") {
        return this.heal(this.modify(pokemon.maxhp, 0.25));
      } else if (this.field.isWeather(["desolateland", "sunnyday"]) && pokemon.hasAbility("divinegrace")) {
        return this.heal(this.modify(pokemon.maxhp, 1));
      } else if (this.field.isWeather(["raindance", "primordialsea", "sandstorm", "hail"]) && pokemon.hasAbility("divinegrace")) {
        return this.heal(this.modify(pokemon.maxhp, 0.375));
      } else if (pokemon.hasAbility("divinegrace")) {
        return this.heal(this.modify(pokemon.maxhp, 0.75));
      } else {
        return this.heal(this.modify(pokemon.maxhp, 0.5));
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  purify: {
    num: 685,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Purify",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, heal: 1 },
    onHit(target, source2) {
      let factor = 0.5;
      if (source2.hasAbility("divinegrace"))
        factor = 0.75;
      if (!target.cureStatus())
        return this.NOT_FAIL;
      this.heal(Math.ceil(source2.maxhp * factor), source2);
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Beautiful"
  },
  recover: {
    num: 105,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Recover",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  roost: {
    num: 355,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Roost",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    self: {
      volatileStatus: "roost"
    },
    condition: {
      duration: 1,
      onResidualOrder: 25,
      onStart(target) {
        this.add("-singleturn", target, "move: Roost");
      },
      onTypePriority: -1,
      onType(types, pokemon) {
        this.effectState.typeWas = types;
        return types.filter((type) => type !== "Flying");
      }
    },
    secondary: null,
    target: "self",
    type: "Flying",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  shoreup: {
    num: 659,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shore Up",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (this.field.isWeather("sandstorm")) {
        factor = 0.667;
      }
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Ground",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  softboiled: {
    num: 135,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Soft-Boiled",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (pokemon.hasAbility("divinegrace"))
        factor = 0.75;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  strengthsap: {
    num: 668,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Strength Sap",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, heal: 1 },
    onHit(target, source2) {
      if (target.boosts.atk === -6)
        return false;
      let atk = target.getStat("atk", false, true);
      if (source2.hasAbility("divinegrace"))
        atk = atk * 1.5;
      const success = this.boost({ atk: -1 }, target, source2, null, false, true);
      return !!(this.heal(atk, source2, target) || success);
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  swallow: {
    num: 256,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Swallow",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onTry(source2) {
      return !!source2.volatiles["stockpile"];
    },
    onHit(pokemon) {
      const healAmount = pokemon.hasAbility("divinegrace") ? [0.375, 0.75, 1] : [0.25, 0.5, 1];
      const success = !!this.heal(this.modify(pokemon.maxhp, healAmount[pokemon.volatiles["stockpile"].layers - 1]));
      if (!success)
        this.add("-fail", pokemon, "heal");
      pokemon.removeVolatile("stockpile");
      return success || this.NOT_FAIL;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  synthesis: {
    num: 235,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Synthesis",
    pp: 5,
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
      if (pokemon.hasAbility("divinegrace"))
        factor = factor * 1.5;
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  wish: {
    num: 273,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Wish",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    slotCondition: "Wish",
    condition: {
      duration: 2,
      onStart(pokemon, source2) {
        if (source2.hasAbility("divinegrace"))
          this.effectState.hp = source2.maxhp / 2 * 1.5;
        else
          this.effectState.hp = source2.maxhp / 2;
      },
      onResidualOrder: 4,
      onEnd(target) {
        if (target && !target.fainted) {
          const damage = this.heal(this.effectState.hp, target, target);
          if (damage) {
            this.add("-heal", target, target.getHealth, "[from] move: Wish", "[wisher] " + this.effectState.source.name);
          }
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  flintspear: {
    num: -114,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Flint Spear",
    shortDesc: "Target becomes weaker to Fire.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "flintspear",
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Stone Edge", target);
    },
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Flint Spear");
      },
      onEffectivenessPriority: -2,
      onEffectiveness(typeMod, target, type, move) {
        if (move.type !== "Fire")
          return;
        if (!target)
          return;
        if (type !== target.getTypes()[0])
          return;
        return typeMod + 1;
      }
    },
    secondary: null,
    target: "normal",
    type: "Ghost"
  },
  foragerspoise: {
    num: 588,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Forager's Poise",
    shortDesc: "Protects from damaging attacks; +1 Crit hit. Contact: -1 Atk.",
    pp: 10,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "foragerspoise",
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Baneful Bunker", target);
    },
    onTryHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source2, move) {
        if (!move.flags["protect"] || move.category === "Status") {
          if (move.isZ || move.isMax && !move.breaksProtect)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (move.flags["contact"]) {
          target.addVolatile("foragercrit");
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move) {
        if (move.isZOrMaxPowered && move.flags["contact"]) {
          this.boost({ atk: -1 }, source2, target, this.dex.getActiveMove("Forager's Poise"));
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  pepsipower: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Pepsi Power",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, mystery: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Life Dew", target);
    },
    onHit(target, source2) {
      const item2 = target.takeItem(source2);
      if (item2) {
        this.add("-enditem", target, item2.name, "[from] move: Pepsi Power", "[of] " + source2);
        target.setItem("pepsican");
      }
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Water"
  },
  balllighting: {
    accuracy: true,
    basePower: 80,
    category: "Special",
    shortDesc: "Never misses.",
    name: "Ball Lighting",
    pp: 20,
    priority: 0,
    flags: { bullet: 1, protect: 1, pulse: 1, mirror: 1, distance: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Electro Ball", target);
    },
    secondary: null,
    target: "any",
    type: "Electric",
    contestType: "Beautiful"
  },
  empulse: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    shortDesc: "30% chance to confuse the foe.",
    name: "EM Pulse",
    pp: 20,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shock Wave", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "any",
    type: "Electric",
    contestType: "Beautiful"
  },
  guidance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "+2 Attack & SpA for the target.",
    name: "Guidance",
    pp: 15,
    priority: 0,
    flags: { mystery: 1 },
    secondary: null,
    boosts: {
      atk: 2,
      spa: 2
    },
    target: "normal",
    type: "Psychic"
  },
  resistance: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "+2 Defense & SpD for the target.",
    name: "Resistance",
    pp: 15,
    priority: 0,
    flags: { mystery: 1 },
    secondary: null,
    boosts: {
      def: 2,
      spd: 2
    },
    target: "normal",
    type: "Psychic"
  },
  command: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Protects the user. Disables the foe's last move if hit by contact.",
    name: "Command",
    pp: 10,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "command",
    onTryHit(target, source2, move) {
      return !!this.queue.willAct() && this.runEvent("StallMove", target);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source2, move) {
        if (!move.flags["protect"]) {
          if (move.isZ || move.isMax && !move.breaksProtect)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (move.flags["contact"]) {
          source2.addVolatile("disable");
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move) {
        if (move.isZOrMaxPowered && move.flags["contact"]) {
          source2.addVolatile("disable");
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  bless: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "+2 Attack for the user and allies.",
    name: "Bless",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Morning Sun", target);
    },
    boosts: {
      atk: 2
    },
    secondary: null,
    target: "allyTeam",
    type: "Psychic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  prehistoricpulse: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    shortDesc: "10% chance to lower the foe's SpD.",
    name: "Prehistoric Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ancient Power", target);
    },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Clever"
  },
  skyuppercut: {
    inherit: true,
    isNonstandard: null,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "breloom") {
        move.basePower = 70;
        move.accuracy = 100;
      }
    },
    onEffectiveness(typeMod, target, type, source2) {
      if (source2.species.id === "breloom") {
        if (type === "Flying")
          return 1;
      }
    }
  },
  poisondart: {
    accuracy: true,
    basePower: 40,
    category: "Physical",
    shortDesc: "Usually goes first. 10% chance to poison foe.",
    isViable: true,
    name: "Poison Dart",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Sting", target);
    },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  acidicfists: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Destroys screens, unless the target is immune. 10% poison chance.",
    isViable: true,
    name: "Acidic Fists",
    pp: 10,
    priority: 0,
    flags: { punch: 1, contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Jab", target);
      this.add("-anim", source2, "Corrosive Gas", target);
    },
    onTryHit(pokemon) {
      if (pokemon.runImmunity("Poison")) {
        pokemon.side.removeSideCondition("reflect");
        pokemon.side.removeSideCondition("lightscreen");
        pokemon.side.removeSideCondition("auroraveil");
      }
    },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  rashpowder: {
    accuracy: 75,
    basePower: 0,
    category: "Status",
    shortDesc: "Burns the target.",
    isViable: true,
    name: "Rash Powder",
    pp: 30,
    priority: 0,
    flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spore", target);
    },
    status: "brn",
    secondary: null,
    target: "normal",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  venoshock: {
    inherit: true,
    isNonstandard: null,
    onBasePower(basePower, pokemon, target) {
      if (pokemon.species.id === "breloom" && (target.status || target.hasAbility("comatose"))) {
        return this.chainModify(2);
      } else if (target.status === "psn" || target.status === "tox") {
        return this.chainModify(2);
      }
    }
  },
  armthrust: {
    inherit: true,
    onModifyMove(move, source2, target) {
      if (source2.species.id === "breloom") {
        move.basePower = 25;
      }
    }
  },
  enchantedpunch: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    defensiveCategory: "Special",
    shortDesc: "Damages target based on Sp. Def, not Defense.",
    name: "Enchanted Punch",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1, punch: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Meteor Mash", target);
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  // jolte payback and revenge go here
  takeheart: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "+1 Def, SpA, & SpD. User recharges after.",
    name: "Take Heart",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, recharge: 1 },
    onAfterMove(pokemon) {
      pokemon.addVolatile("recharge");
    },
    boosts: {
      def: 1,
      spa: 1,
      spd: 1
    },
    secondary: null,
    target: "self",
    type: "Psychic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  petrifyinggaze: {
    accuracy: 90,
    basePower: 0,
    category: "Status",
    shortDesc: "-1 priority. Foe flinches on its next turn.",
    name: "Petrifying Gaze",
    pp: 20,
    priority: -1,
    flags: { protect: 1, reflectable: 1, mirror: 1, authentic: 1 },
    volatileStatus: "flinch",
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Glare", target);
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  lightblast: {
    num: 1013,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
    name: "Light Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    useSourceDefensiveAsOffensive: true,
    secondary: void 0,
    target: "normal",
    type: "Fairy"
  },
  gutpunch: {
    num: 100001,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    shortDesc: "For 5 turns, the target is prevented from healing.",
    name: "Gut Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    onHit(target) {
      if (target.hp) {
        target.addVolatile("healblock");
      }
    },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mega Punch", target);
    },
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  underdog: {
    num: -18,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Underdog",
    shortDesc: "BP x2 if target's Atk > user's Atk.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onBasePower(basePower, source2, target, move) {
      const targetAtk = target.storedStats.atk;
      const sourceAtk = source2.storedStats.atk;
      if (targetAtk >= sourceAtk) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  aeroblastubermons: {
    num: 177,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Aeroblast (Ubermons)",
    shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1 },
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target);
    },
    self: {
      boosts: {
        def: -1,
        spd: -1
      }
    },
    target: "any",
    type: "Flying",
    contestType: "Cool"
  }
};
//# sourceMappingURL=moves.js.map
