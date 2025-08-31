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
  Moves: () => Moves,
  getName: () => getName
});
module.exports = __toCommonJS(moves_exports);
var import_lib = require("../../../lib");
var import_dex_data = require("../../../sim/dex-data");
const usergroups = {};
const usergroupData = (0, import_lib.FS)("config/usergroups.csv").readIfExistsSync().split("\n");
for (const row of usergroupData) {
  if (!(0, import_dex_data.toID)(row))
    continue;
  const cells = row.split(",");
  if (cells.length > 3)
    throw new Error(`Invalid entry when parsing usergroups.csv`);
  usergroups[(0, import_dex_data.toID)(cells[0])] = cells[1].trim() || " ";
}
function getName(name) {
  const userid = (0, import_dex_data.toID)(name);
  if (!userid)
    throw new Error("No/Invalid name passed to getSymbol");
  const group = usergroups[userid] || " ";
  return group + name;
}
const Moves = {
  /*
  placeholder: {
  	name: "",
  	type: "",
  	category: "",
  	basePower: 0,
  	accuracy: 100,
  	pp: 10,
  	shortDesc: "",
  	priority: 0,
  	flags: {protect: 1, mirror: 1, metronome: 1},
  	onPrepareHit(target, pokemon, move) {
  		this.attrLastMove('[still]');
  		this.add('-anim', pokemon, "", target);
  	},
  	secondary: null,
  	target: "normal",
  },
  */
  //slate 1
  silcoonsexactmovepool: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "silcoonsexactmovepool",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(source2) {
      this.actions.useMove("Tackle", source2);
      this.actions.useMove("String Shot", source2);
      this.actions.useMove("Poison Sting", source2);
      this.actions.useMove("Bug Bite", source2);
      this.actions.useMove("Iron Defense", source2);
    },
    secondary: null,
    target: "self",
    type: "Bug",
    shortDesc: "Uses Tackle, String Shot, Poison Sting, Bug Bite, and Iron Defense."
  },
  pog: {
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "POG",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "G-Max Steelsurge", target);
    },
    onEffectiveness(typeMod, target, type) {
      if (target.getTypes()[0] === type || target.terastallized)
        return 1;
      else
        return 0;
    },
    target: "normal",
    type: "Steel",
    shortDesc: "Always super-effective.",
    contestType: "Beautiful"
  },
  velvetblade: {
    accuracy: 100,
    basePower: 90,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Night Slash", target);
    },
    category: "Physical",
    name: "Velvet Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    onModifyMove(move2, pokemon, target) {
      let newMoveName;
      let activated = false;
      for (const moveSlot of pokemon.moveSlots) {
        const temp = this.dex.moves.get(moveSlot.id);
        if (temp.category === "Status") {
          newMoveName = temp.name;
          activated = true;
          break;
        }
      }
      if (activated)
        move2.name = newMoveName;
      else
        move2.basePower /= 2;
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    shortDesc: "Disguises as the user's first Status move. Else halved power.",
    contestType: "Tough"
  },
  mogoff: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Mog Off",
    shortDesc: "50% chance to lower the target's Atk/SpA by 1.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Bulk Up", target);
    },
    onModifyMove(move2, pokemon, target) {
      if (pokemon.ability === "benevolentblessing") {
        move2.secondary = null;
        move2.onHit = function(target2, source2) {
          if (this.randomChance(1, 2))
            this.actions.useMove("swagger", source2, source2);
          else
            this.actions.useMove("selfdestruct", source2, target2);
        };
      }
    },
    secondary: {
      chance: 50,
      boosts: {
        atk: -1,
        spa: -1
      }
    },
    target: "any",
    type: "Silly",
    contestType: "Tough"
    //shortDesc: "50% chance to confuse the target.",
  },
  chocolatekiss: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Chocolate Kiss",
    pp: 20,
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Lovely Kiss", target);
    },
    secondary: {
      chance: 10,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Fairy",
    shortDesc: "Usually moves first. 10% chance to lower target's Speed by 1.",
    contestType: "Cool"
  },
  fishingminigame: {
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Fishing Minigame",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Anchor Shot", target);
    },
    onHit(target, source2, move2) {
      if (source2.isActive)
        target.addVolatile("trapped", source2, move2, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough",
    shortDesc: "Prevents the target from switching out."
  },
  stankyleg: {
    accuracy: 95,
    basePower: 60,
    category: "Physical",
    name: "Stanky Leg",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Rolling Kick", target);
    },
    secondary: {
      chance: 100,
      status: "tox"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool",
    shortDesc: "100% chance to badly poison the target."
  },
  triplerkick: {
    accuracy: 90,
    basePower: 20,
    basePowerCallback(pokemon, target, move2) {
      return 20 * move2.hit;
    },
    category: "Physical",
    name: "Tripler Kick",
    shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Triple Kick", target);
    },
    multihit: 3,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Fighting",
    zMove: { basePower: 120 },
    maxMove: { basePower: 140 }
  },
  gorgingmissile: {
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Gorging Missile",
    shortDesc: "If user is under 50% max HP, paralyzes the opponent.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Snipe Shot", target);
    },
    onModifyMove(move2, pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        move2.status = "par";
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  goombastomp: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Goomba Stomp",
    shortDesc: "100% chance for -1 Defense. OHKOs Goomba.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "High Jump Kick", target);
    },
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    onModifyMove(move2, pokemon) {
      for (const target of pokemon.foes()) {
        if (target.baseSpecies == "Goomba") {
          if (target.volatiles["bigbutton"]) {
            basePower = 0;
            damageCallback = function(target2) {
              return this.clampIntRange(target2.getUndynamaxedHP() / 3, 1);
            };
          } else {
            move2.ohko = true;
            move2.accuracy = true;
          }
        }
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  splash: {
    inherit: true,
    flags: { snatch: 1, fishing: 1, metronome: 1 },
    shortDesc: "Feebas: remove all tokens and gain +1 all stats for each 2.",
    onTryHit(target, source2, move2) {
      if (target.baseSpecies.baseSpecies === "Feebas") {
        const targetSide = target.side;
        if (targetSide.fishingTokens > 0) {
          const boosts = Math.floor(targetSide.fishingTokens / 2);
          target.side.removeFishingTokens(targetSide.fishingTokens);
          this.boost({ atk: boosts, def: boosts, spa: boosts, spd: boosts, spe: boosts }, target, target, move2);
        } else
          targetSide.addFishingTokens(1);
      } else
        this.add("-nothing");
    }
  },
  silcoonblast: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Silcoon Blast",
    shortDesc: "Turns the opponent into Silcoon.",
    pp: 166,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
    secondary: null,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Hyper Beam", target);
    },
    onHit(target, pokemon, move2) {
      for (const target2 of pokemon.foes()) {
        target2.formeChange("Silcoon");
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  gofish: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Go Fish",
    shortDesc: "Spends 1 token to switch target. Fails if target is not attacking.",
    pp: 5,
    priority: 1,
    flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1, fishing: 1 },
    forceSwitch: true,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Boomburst", target);
    },
    onTry(source2, target) {
      const action = this.queue.willMove(target);
      const move2 = action?.choice === "move" ? action.move : null;
      if (!move2 || move2.category === "Status" && move2.id !== "mefirst" || target.volatiles["mustrecharge"] || !source2.side.removeFishingTokens(1)) {
        return false;
      }
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Clever"
  },
  //slate 2
  thekitchensink: {
    num: -1,
    accuracy: 93.81174699,
    basePower: 76.6977492,
    basePowerCallback(pokemon, target, move2) {
      let power = move2.basePower;
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.pokemon === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        power *= 2;
      }
      if (target.newlySwitched || this.queue.willMove(target)) {
        power *= 2;
      } else {
        power *= 2;
      }
      power += Math.floor(pokemon.happiness * 10 / 25) || 1;
      const targetWeight = target.getWeight();
      const pokemonWeight = pokemon.getWeight();
      if (pokemonWeight >= targetWeight * 5) {
        power += 120;
      } else if (pokemonWeight >= targetWeight * 4) {
        power += 100;
      } else if (pokemonWeight >= targetWeight * 3) {
        power += 80;
      } else if (pokemonWeight >= targetWeight * 2) {
        power += 60;
      } else {
        power += 40;
      }
      power += 50 * pokemon.side.totalFainted;
      if (targetWeight >= 2e3) {
        power += 120;
      } else if (targetWeight >= 1e3) {
        power += 100;
      } else if (targetWeight >= 500) {
        power += 80;
      } else if (targetWeight >= 250) {
        power += 60;
      } else if (targetWeight >= 100) {
        power += 40;
      } else {
        power += 20;
      }
      power += 20 * pokemon.positiveBoosts();
      power += 20 * target.positiveBoosts();
      if (power > 200)
        power = 200;
      if (target.beingCalledBack || target.switchFlag) {
        this.debug("Pursuit damage boost");
        power *= 2;
      }
      power = Math.min(350, power + 50 * pokemon.timesAttacked);
      const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
      if (ratio < 2) {
        power += 200;
      } else if (ratio < 5) {
        power += 150;
      } else if (ratio < 10) {
        power += 100;
      } else if (ratio < 17) {
        power += 80;
      } else if (ratio < 33) {
        power += 40;
      } else {
        power += 20;
      }
      if (pokemon.volatiles["defensecurl"])
        power *= 2;
      if (target.status === "par") {
        power *= 2;
      }
      if (pokemon.moveLastTurnResult === false) {
        power *= 2;
      }
      if (pokemon.terastallized === "Stellar") {
        power += 100;
      } else
        power += 80;
      power += 20 * move2.hit;
      const callerMoveId = move2.pokemonEffect || move2.id;
      const moveSlot = callerMoveId === "instruct" ? pokemon.getMoveData(move2.id) : pokemon.getMoveData(callerMoveId);
      if (!moveSlot) {
        power += 40;
      } else {
        switch (moveSlot.pp) {
          case 0:
            power += 200;
            break;
          case 1:
            power += 80;
            break;
          case 2:
            power += 60;
            break;
          case 3:
            power += 50;
            break;
          default:
            power += 40;
            break;
        }
      }
      if (target.status === "slp" || target.hasAbility("comatose")) {
        power *= 2;
      }
      const hp = target.hp;
      const maxHP = target.maxhp;
      power += Math.floor(Math.floor((120 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
      return power;
    },
    category: "Physical",
    name: "The Kitchen Sink",
    shortDesc: "Power doubles if user is damaged by the target. Power doubles if user moves before the target. Power doubles if the user moves after the target. Power doubles if user is burn/poison/ paralyzed. Power doubles if the target's HP is 50% or less. Power doubles if the target is poisoned. Power doubles if target is burned. Power doubles if the target has a status ailment. More power the more HP the target has left. Max 102 power at minimum Happiness. More power the heavier the user than the target. +50 power for each time a party member fainted. More power the heavier the target. + 20 power for each of the user's stat boosts. +20 for each of the target's stat boosts. If a foe is switching out, hits it at 2x power. +50 power for each time user was hit. Max 6 hits. More power the less HP the user has left. Power doubles if target is paralyzed. Power doubles if the user's last move failed. Each hit can miss, but power rises. More power the fewer PP this move has left. Power doubles if target is asleep. Breaks protect. High critical hit ratio. Heals 50% of the damage dealt. Ignores the Abilities of other Pokemon. Ignores the target's stat stage changes. User loses 50% max HP. Hits adjacent Pokemon. Hits 10 times. Uses user's Def stat as Atk in damage calculation. Uses target's Attack stat in damage calculation. Normal moves become Electric type this turn. Steals target's boosts before dealing damage. Cannot be redirected. Traps and damages the target for 4-5 turns. Always results in a critical hit. Burns on contact with the user before it moves. Fails if the user takes damage before it hits. Removes item. Frees user from hazards/bind/ Leech Seed. If the user has no item, it steals the target's. Lasts 2-3 turns. Confuses the user afterwards. The target is cured of its burn. Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe. Ends terrain. 2x power if the user had a stat lowered this turn. During Electric Terrain: 1.5x power. Power doubles if an ally fainted last turn. No charge in sunlight. Halved power in other weathers. Cannot be selected until the user eats a Berry. Grounds adjacent foes. First hit neutral on Flying. User steals and eats the target's Berry. If the target is an ally, heals 50% of its max HP. Summons Leech Seed. All healthy allies aid in damaging the target. Can't miss in rain. Power varies; 2x on Dig. Physical if user's Atk > Sp. Atk. 40, 80, 120 power, or heals target 1/4 max HP. Effect varies with terrain. (30% paralysis chance). If Terastallized: Phys. if Atk > SpA, type = Tera. User on terrain: power doubles, type varies. Power doubles and type varies in each weather. Type varies based on the held Memory. Type varies based on the user's primary type. Type varies based on the held Drive. User is hurt by 50% of its max HP if it misses. Fails if target is not attacking. Power increases when used on consecutive turns. Fails if user has no Stockpile. Fails if the target has no held item. Fails if there is no terrain active. Destroys screens, unless the target is immune. Active Pokemon cannot fall asleep. Hits adjacent Pokemon sharing the user's type. Summons Reflect. Lower's the user's Attack and Defense by 1. Lowers the user's Sp. Attack by 2. Lowers the user's Sp. Defense by 1. Lowers the user's Spe by 2. Cures the user's party of all status conditions.",
    pp: 13.41701681,
    priority: 0.0341176471,
    gen: 5,
    flags: {
      protect: 1,
      mirror: 1,
      bullet: 1,
      punch: 1,
      bite: 1,
      contact: 1,
      wind: 1,
      sound: 1,
      slicing: 1,
      heal: 1,
      defrost: 1,
      failencore: 1,
      failcopycat: 1,
      failinstruct: 1,
      failmimic: 1,
      nosleeptalk: 1,
      noassist: 1,
      noparentalbond: 1,
      reflectable: 1,
      charge: 1,
      recharge: 1,
      gravity: 1,
      distance: 1,
      nonsky: 1,
      bypasssub: 1
    },
    breaksProtect: true,
    critRatio: 2,
    drain: [1, 2],
    ignoreAbility: true,
    ignoreEvasion: true,
    ignoreDefensive: true,
    //darkest lariat
    mindBlownRecoil: true,
    multihit: 10,
    multiaccuracy: true,
    noSketch: true,
    //torques
    overrideDefensiveStat: "def",
    overrideOffensiveStat: "def",
    //body press
    overrideOffensivePokemon: "target",
    //foul play
    pseudoWeather: "iondeluge",
    //plasma fists
    recoil: [33, 100],
    //selfdestruct: "always",
    stealsBoosts: true,
    tracksTarget: true,
    volatileStatus: "partiallytrapped",
    willCrit: true,
    priorityChargeCallback(pokemon) {
      pokemon.addVolatile("thekitchensink");
    },
    beforeMoveCallback(pokemon) {
      if (pokemon.volatiles["thekitchensink"]?.lostFocus) {
        this.add("cant", pokemon, "The Kitchen Sink", "The Kitchen Sink");
        return true;
      }
      for (const side of this.sides) {
        if (side.hasAlly(pokemon))
          continue;
        side.addSideCondition("pursuit", pokemon);
        const data = side.getSideConditionData("pursuit");
        if (!data.pokemons) {
          data.pokemons = [];
        }
        data.pokemons.push(pokemon);
      }
    },
    onAfterHit(target, source2, move2) {
      if (source2.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: The Kitchen Sink", "[of] " + source2);
        }
      }
      if (!move2.hasSheerForce) {
        if (source2.hp && source2.removeVolatile("leechseed")) {
          this.add("-end", source2, "Leech Seed", "[from] move: The Kitchen Sink", "[of] " + source2);
        }
        const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
        for (const condition of sideConditions) {
          if (source2.hp && source2.side.removeSideCondition(condition)) {
            this.add("-sideend", source2.side, this.dex.conditions.get(condition).name, "[from] move: Mortal Spin", "[of] " + source2);
          }
        }
        if (source2.hp && source2.volatiles["partiallytrapped"]) {
          source2.removeVolatile("partiallytrapped");
        }
      }
      if (source2.item || source2.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source2);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source2, target, move2, yourItem) || !source2.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-enditem", target, yourItem, "[silent]", "[from] move: Thief", "[of] " + source2);
      this.add("-item", source2, yourItem, "[from] move: Thief", "[of] " + target);
    },
    onAfterMove(pokemon, target, move2) {
      if (move2.mindBlownRecoil && !move2.multihit) {
        const hpBeforeRecoil = pokemon.hp;
        this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get("Mind Blown"), true);
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
      for (const pokemon2 of this.getAllActive()) {
        if (pokemon2 !== target && pokemon2.removeVolatile("sparklingaria") && pokemon2.status === "brn" && !source.fainted) {
          pokemon2.cureStatus();
        }
      }
    },
    onAfterMoveSecondarySelf(pokemon, target, move2) {
      if (!pokemon.volatiles["commanded"])
        return;
      const tatsugiri = pokemon.volatiles["commanded"].source;
      if (tatsugiri.baseSpecies.baseSpecies !== "Tatsugiri")
        return;
      switch (tatsugiri.baseSpecies.forme) {
        case "Droopy":
          this.boost({ def: 1 }, pokemon, pokemon);
          break;
        case "Stretchy":
          this.boost({ spe: 1 }, pokemon, pokemon);
          break;
        default:
          this.boost({ atk: 1 }, pokemon, pokemon);
          break;
      }
    },
    onAfterSubDamage(damage, target, pokemon, move2) {
      if (!move2.hasSheerForce) {
        if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
          this.add("-end", pokemon, "Leech Seed", "[from] move: The Kitchen Sink", "[of] " + pokemon);
        }
        const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
        for (const condition of sideConditions) {
          if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
            this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Mortal Spin", "[of] " + pokemon);
          }
        }
        if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
          pokemon.removeVolatile("partiallytrapped");
        }
      }
      if (!pokemon.isAlly(target))
        this.hint(move2.category + " The Kitchen Sink");
      this.field.clearTerrain();
    },
    onBasePower(basePower2, pokemon, target) {
      if (target.hp * 2 <= target.maxhp) {
        return this.chainModify(2);
      }
      if (pokemon.statsLoweredThisTurn) {
        this.debug("lashout buff");
        return this.chainModify(2);
      }
      if (this.field.isTerrain("electricterrain")) {
        this.debug("psyblade electric terrain boost");
        return this.chainModify(1.5);
      }
      if (pokemon.side.faintedLastTurn) {
        this.debug("Boosted for a faint last turn");
        return this.chainModify(2);
      }
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
      if (target.status === "psn" || target.status === "tox") {
        return this.chainModify(2);
      }
    },
    onDisableMove(pokemon) {
      if (!pokemon.ateBerry)
        pokemon.disableMove("thekitchensink");
    },
    onEffectiveness(typeMod, target, type, move2) {
      if (type === "Water")
        return 1;
      if (move2.type !== "Ground")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Ground")) {
        if (target.hasType("Flying"))
          return 0;
      }
    },
    onHit(target, source2, move2) {
      const item = target.getItem();
      if (source2.hp && item.isBerry && target.takeItem(source2)) {
        this.add("-enditem", target, item.name, "[from] stealeat", "[move] The Kitchen Sink", "[of] " + source2);
        if (this.singleEvent("Eat", item, null, source2, null, null)) {
          this.runEvent("EatItem", source2, null, null, item);
          if (item.id === "leppaberry")
            target.staleness = "external";
        }
        if (item.onEat)
          source2.ateBerry = true;
      }
      if (source2.isAlly(target)) {
        if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
          if (target.volatiles["healblock"] && target.hp !== target.maxhp) {
            this.attrLastMove("[still]");
            this.add("cant", source2, "move: Heal Block", move2);
          } else {
            this.add("-immune", target);
          }
          return this.NOT_FAIL;
        }
      }
      if (target.hasType("Grass"))
        return null;
      target.addVolatile("leechseed", source2);
      if (!source2.isAlly(target))
        this.hint(move2.category + " Shell Side Arm");
      this.field.clearTerrain();
    },
    onModifyMove(move2, pokemon, target) {
      move2.allies = pokemon.side.pokemon.filter((ally) => ally === pokemon || !ally.fainted && !ally.status);
      move2.multihit += move2.allies.length;
      if (target && ["raindance", "primordialsea"].includes(target.effectiveWeather())) {
        move2.accuracy = true;
      }
      const i = this.random(100);
      if (i < 5) {
        move2.magnitude = 4;
        move2.basePower += 10;
      } else if (i < 15) {
        move2.magnitude = 5;
        move2.basePower += 30;
      } else if (i < 35) {
        move2.magnitude = 6;
        move2.basePower += 50;
      } else if (i < 65) {
        move2.magnitude = 7;
        move2.basePower += 70;
      } else if (i < 85) {
        move2.magnitude = 8;
        move2.basePower += 90;
      } else if (i < 95) {
        move2.magnitude = 9;
        move2.basePower += 110;
      } else {
        move2.magnitude = 10;
        move2.basePower += 150;
      }
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move2.category = "Physical";
      const rand = this.random(10);
      if (rand < 2) {
        move2.heal = [1, 4];
        move2.infiltrates = true;
      } else if (rand < 6) {
        move2.basePower += 40;
      } else if (rand < 9) {
        move2.basePower += 80;
      } else {
        move2.basePower += 120;
      }
      if (target?.beingCalledBack || target?.switchFlag)
        move2.accuracy = true;
      if (this.field.isTerrain(""))
        return;
      move2.secondaries = [];
      if (this.field.isTerrain("electricterrain")) {
        move2.secondaries.push({
          chance: 30,
          status: "par"
        });
      } else if (this.field.isTerrain("grassyterrain")) {
        move2.secondaries.push({
          chance: 30,
          status: "slp"
        });
      } else if (this.field.isTerrain("mistyterrain")) {
        move2.secondaries.push({
          chance: 30,
          boosts: {
            spa: -1
          }
        });
      } else if (this.field.isTerrain("psychicterrain")) {
        move2.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      }
      if (!target)
        return;
      const atk = pokemon.getStat("atk", false, true);
      const spa = pokemon.getStat("spa", false, true);
      const def = target.getStat("def", false, true);
      const spd = target.getStat("spd", false, true);
      const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
      const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
      if (physical > special || physical === special && this.random(2) === 0) {
        move2.category = "Physical";
        move2.flags.contact = 1;
      }
      if (pokemon.terastallized && pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true)) {
        move2.category = "Physical";
      }
      if (pokemon.terastallized === "Stellar") {
        move2.self = { boosts: { atk: -1, spa: -1 } };
      }
      if (this.field.terrain && pokemon.isGrounded()) {
        move2.basePower *= 2;
        this.debug("BP doubled in Terrain");
      }
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move2.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move2.basePower *= 2;
          break;
        case "sandstorm":
          move2.basePower *= 2;
          break;
        case "hail":
        case "snow":
          move2.basePower *= 2;
          break;
      }
    },
    onModifyType(move2, pokemon) {
      if (pokemon.ignoringItem())
        return;
      move2.type = this.runEvent("Memory", pokemon, null, move2, "Normal");
      let type = pokemon.getTypes()[0];
      if (type === "Bird")
        type = "???";
      if (type === "Stellar")
        type = pokemon.getTypes(false, true)[0];
      move2.type = type;
      if (pokemon.ignoringItem())
        return;
      move2.type = this.runEvent("Drive", pokemon, null, move2, "Normal");
      if (pokemon.terastallized) {
        move2.type = pokemon.teraType;
      }
      if (!pokemon.isGrounded())
        return;
      switch (this.field.terrain) {
        case "electricterrain":
          move2.type = "Electric";
          break;
        case "grassyterrain":
          move2.type = "Grass";
          break;
        case "mistyterrain":
          move2.type = "Fairy";
          break;
        case "psychicterrain":
          move2.type = "Psychic";
          break;
      }
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move2.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move2.type = "Water";
          break;
        case "sandstorm":
          move2.type = "Rock";
          break;
        case "hail":
        case "snow":
          move2.type = "Ice";
          break;
      }
    },
    onMoveFail(target, source2, move2) {
      this.damage(source2.baseMaxhp / 2, source2, source2, this.dex.conditions.get("The Kitchen Sink"));
    },
    onPrepareHit(target, source2, move2) {
      if (source2.terastallized) {
        this.attrLastMove("[anim] Tera Blast " + source2.teraType);
      }
    },
    onTry(source2, target) {
      const action = this.queue.willMove(target);
      const move2 = action?.choice === "move" ? action.move : null;
      if (!move2 || move2.category === "Status" && move2.id !== "mefirst" || target.volatiles["mustrecharge"]) {
        return false;
      }
      if (source2.activeMoveActions > 1) {
        this.hint("The Kitchen Sink only works on your first turn out.");
      }
      this.field.addPseudoWeather("echoedvoice");
      return !!source2.volatiles["stockpile"] && //spit up
      !!target.item && //poltergeist
      !target.fainted && //sky drop
      !this.field.isTerrain("");
    },
    onTryHit(target, pokemon) {
      pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
      if (pokemon.isAlly(target)) {
        move.basePower = 0;
        move.infiltrates = true;
      }
      this.add("-activate", target, "move: The Kitchen Sink", this.dex.items.get(target.item).name);
      target.side.removeSideCondition("pursuit");
      const activeTeam = target.side.activeTeam();
      const foeActiveTeam = target.side.foe.activeTeam();
      for (const [i, allyActive] of activeTeam.entries()) {
        if (allyActive && allyActive.status === "slp")
          allyActive.cureStatus();
        const foeActive = foeActiveTeam[i];
        if (foeActive && foeActive.status === "slp")
          foeActive.cureStatus();
      }
    },
    onTryMove(source2, target, move2) {
      if (source2.isAlly(target) && source2.volatiles["healblock"]) {
        this.attrLastMove("[still]");
        this.add("cant", source2, "move: Heal Block", move2);
        return false;
      }
    },
    onTryImmunity(target, source2) {
      return target.hasType(source2.getTypes());
    },
    onUseMoveMessage(pokemon, target, move2) {
      this.add("-activate", pokemon, "move: Magnitude", move2.magnitude);
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: The Kitchen Sink");
      },
      onHit(target, source2, move2) {
        if (this.checkMoveMakesContact(move2, source2, target)) {
          source2.trySetStatus("brn", target);
        }
        if (move2.category !== "Status") {
          this.effectState.lostFocus = true;
        }
      },
      onTryAddVolatile(status, pokemon) {
        if (status.id === "flinch")
          return null;
      }
    },
    secondary: null,
    self: {
      volatileStatus: "mustrecharge",
      //baddy bad
      sideCondition: "reflect",
      boosts: {
        atk: -1,
        def: -1,
        spa: -2,
        spd: -1,
        spe: -2
      },
      //sparkly swirl
      onHit(pokemon, source2, move2) {
        this.add("-activate", source2, "move: Aromatherapy");
        for (const ally of source2.side.pokemon) {
          if (ally !== source2 && (ally.volatiles["substitute"] && !move2.infiltrates)) {
            continue;
          }
          ally.cureStatus();
        }
      }
    },
    target: "allAdjacent",
    type: "???"
  },
  cuddie: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "cuddIe",
    shortDesc: "the pokemon have. a nice cuddle :)",
    pp: 625e3,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Tickle", target);
    },
    onTryHit(target, source2) {
      this.add("-message", `${source2.name} cuddled ${target.name}...`);
    },
    secondary: null,
    target: "normal",
    type: "Friend",
    contestType: "Cute"
  },
  feebasproshops: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Feebas Pro Shops",
    shortDesc: "50%: 85 BP Special, hits Ghost; 50%: +2 tokens.",
    pp: 5,
    priority: 0,
    flags: { fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Pay Day", target);
    },
    onModifyMove(move2, pokemon, target) {
      if (this.randomChance(1, 2)) {
        move2.basePower = 85;
        move2.category = "Special";
        if (!move2.ignoreImmunity)
          move2.ignoreImmunity = {};
        if (move2.ignoreImmunity !== true) {
          move2.ignoreImmunity["Fighting"] = true;
        }
      } else {
        move2.basePower = 0;
        move2.category = "Status";
      }
    },
    onHit(target, source2, move2) {
      if (move2.basePower === 0)
        source2.side.addFishingTokens(2);
    },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  bigbash: {
    accuracy: 100,
    basePower: 68,
    category: "Physical",
    name: "Big Bash",
    shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
    pp: 20,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Pulverizing Pancake", target);
    },
    onModifyMove(move2, pokemon, target) {
      if (pokemon.volatiles["bigbutton"] || target.volatiles["bigbutton"])
        move2.willCrit = true;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  diamondhatchet: {
    accuracy: 100,
    basePower: 80,
    basePowerCallback(pokemon, target, move2) {
      if (pokemon.volatiles["bigbutton"])
        return 120;
      return 80;
    },
    category: "Physical",
    name: "Diamond Hatchet",
    shortDesc: "20% chance to make the target flinch. Big: 120 BP.",
    pp: 10,
    priority: 0,
    flags: { slicing: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Mighty Cleave", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fighting"
  },
  rainbowfeather: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Rainbow Feather",
    shortDesc: "User switches out. Target uses Conversion.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Esper Wing", target);
    },
    selfSwitch: true,
    onHit(target, source2, move2) {
      this.actions.useMove("Conversion", target);
    },
    secondary: null,
    target: "normal",
    type: "Flying"
  },
  heartdrain: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Heart Drain",
    shortDesc: "User recovers 50% of the damage dealt.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, heal: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Giga Drain", target);
    },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Psychic"
  },
  vineboom: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Vine Boom",
    shortDesc: "20% par; 30% flinch; 5% frz; 10% slp; 1% ingrain.",
    pp: 40,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Ivy Cudgel", target);
    },
    secondaries: [
      {
        chance: 20,
        status: "par"
      },
      {
        chance: 30,
        volatileStatus: "flinch"
      },
      {
        chance: 5,
        status: "frz"
      },
      {
        chance: 10,
        status: "slp"
      },
      {
        chance: 1,
        volatileStatus: "ingrain"
      }
    ],
    target: "normal",
    type: "Silly"
  },
  awesomeearthquake: {
    name: "awesome Earthquake",
    type: "Silly",
    category: "Physical",
    basePower: 100,
    accuracy: 100,
    pp: 10,
    shortDesc: "No additional effect.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Earthquake", target);
    },
    secondary: null,
    target: "normal"
  },
  wingedblade: {
    name: "Winged Blade",
    type: "Flying",
    category: "Physical",
    basePower: 90,
    accuracy: 100,
    pp: 15,
    shortDesc: "High critical hit ratio.",
    priority: 0,
    flags: { slicing: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Air Cutter", target);
    },
    secondary: null,
    target: "normal"
  },
  //slate 3
  fishanddip: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fish and Dip",
    shortDesc: "Sets 1 Fishing Token on the user's side. User switches out.",
    pp: 10,
    priority: 0,
    flags: { metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Life Dew", pokemon);
    },
    onHit(target, source2, move2) {
      source2.side.addFishingTokens(1);
    },
    selfSwitch: true,
    secondary: null,
    target: "self",
    type: "Water"
  },
  ohmygoooodwaaaaaaaaaanisfokifnouh: {
    name: "OH MY GOOOOD WAAAAAAAAAANISFOKIFNOUH",
    type: "Normal",
    category: "Physical",
    basePower: 300,
    accuracy: 100,
    pp: 1,
    noPPBoosts: true,
    shortDesc: "User faints. Removes user's side's entry hazards.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Spin Out", target);
    },
    onHit(target, source2, move2) {
      if (!move2.hasSheerForce) {
        const sideConditions = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "gmaxsteelsurge"];
        for (const condition of sideConditions) {
          if (source2.side.removeSideCondition(condition)) {
            this.add("-sideend", source2.side, this.dex.conditions.get(condition).name, "[from] move: OH MY GOOOOD WAAAAAAAAAANISFOKIFNOUH", "[of] " + source2);
          }
        }
      }
    },
    selfdestruct: "always",
    secondary: null,
    target: "normal"
  },
  frigidterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Frigid Terrain",
    shortDesc: "5 turns. Grounded: +Ice power, Fishing takes 3x PP.",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "frigidterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower2, attacker, defender, move2) {
        if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
          if (move2.type === "Ice")
            return this.chainModify(1.5);
        }
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Frigid Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Frigid Terrain");
        }
      },
      onAnyDeductPP(target, source2) {
        if (target.isGrounded() && target.lastMoveUsed.flags["fishing"])
          return 2;
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Frigid Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Water"
  },
  getemboys: {
    name: "Get Em', Boys",
    type: "Normal",
    category: "Physical",
    basePower: 100,
    basePowerCallback(pokemon, target, move2) {
      const allies = pokemon.side.pokemon.filter((ally) => ally != pokemon && !ally.fainted && ally.diamondHand);
      return 100 + 10 * allies;
    },
    accuracy: 100,
    pp: 10,
    shortDesc: "+10 BP per other unfainted allied Diamond Hand.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Close Combat", target);
    },
    secondary: null,
    target: "normal"
  },
  sniftgear: {
    name: "Snift Gear",
    type: "Steel",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "User +2 Atk; can hit Ghost-types, ignores evasiveness, takes 2x from Poison.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Odor Sleuth", target);
    },
    boosts: {
      atk: 2
    },
    volatileStatus: "sniftgear",
    condition: {
      onStart(pokemon) {
        this.add("-message", `${pokemon.name} took a big sniff!`);
        this.add("-start", pokemon, "Snift Gear", "[silent]");
      },
      onModifyMovePriority: -5,
      onModifyMove(move2) {
        if (!move2.ignoreImmunity)
          move2.ignoreImmunity = {};
        if (move2.ignoreImmunity !== true) {
          move2.ignoreImmunity["Fighting"] = true;
          move2.ignoreImmunity["Normal"] = true;
        }
      },
      onAnyModifyBoost(boosts, pokemon) {
        const unawareUser = this.effectState.target;
        if (unawareUser === pokemon)
          return;
        if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
          boosts["evasion"] = 0;
        }
      },
      onSourceModifyDamage(damage, source2, target, move2) {
        if (move2.type === "Poison")
          return this.chainModify(2);
      }
    },
    secondary: null,
    target: "self"
  },
  springtidestorm: {
    inherit: true,
    basePower: 120,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 },
    shortDesc: "30% chance to lower the foe(s) Attack by 1. Rain: can't miss.",
    onModifyMove(move2, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
          move2.accuracy = true;
          break;
      }
    }
  },
  anchorshot: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, fishing: 1 }
  },
  arrowsoflight: {
    name: "Arrows of Light",
    type: "Fighting",
    category: "Physical",
    basePower: 185,
    accuracy: 100,
    pp: 1,
    shortDesc: "User gains the Laser Focus effect.",
    priority: 0,
    flags: {},
    isZ: "zeldaniumz",
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Sinister Arrow Raid", target);
    },
    secondary: null,
    target: "normal"
  },
  supermushroom: {
    name: "Super Mushroom",
    type: "Grass",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Heals 1/3 max HP, Endure. Cannot be selected twice in a row.",
    priority: 3,
    flags: { snatch: 1, metronome: 1, cantusetwice: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Synthesis", pokemon);
    },
    heal: [1, 3],
    volatileStatus: "endure",
    secondary: null,
    target: "self"
  },
  fishprocessing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fish Processing",
    shortDesc: "+1 Fishing Token; +1 Fishing Token at end of turn.",
    pp: 10,
    priority: 0,
    flags: { metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Shift Gear", pokemon);
    },
    onHit(target, source2, move2) {
      source2.side.addFishingTokens(1);
    },
    volatileStatus: "fishprocessing",
    condition: {
      onResidual(pokemon) {
        pokemon.side.addFishingTokens(1);
      }
    },
    secondary: null,
    target: "self",
    type: "Steel"
  },
  fisheater: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fish Eater",
    shortDesc: "-50% foe's fishing tokens; 1/16 heal, +1 stockpile each.",
    pp: 10,
    priority: 0,
    flags: { metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Life Dew", pokemon);
    },
    onTry(source2, target) {
      return target.side.fishingTokens && target.side.fishingTokens > 0;
    },
    onHit(target, source2, move2) {
      if (!target.side.fishingTokens || target.side.fishingTokens <= 0 || source2.volatiles["stockpile3"])
        return false;
      const tokens = Math.ceil(target.side.fishingTokens / 2);
      const success = target.side.removeFishingTokens(tokens);
      if (success) {
        for (let i = 0; i < Math.min(3, tokens); i++) {
          source2.addVolatile("stockpile");
        }
        this.heal(Math.ceil(source2.maxhp * tokens / 16), source2);
      }
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  fishingterrain: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fishing Terrain",
    shortDesc: "5 turns. Grounded: +Fishing power, Fishing tokens +1 on fishing move.",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1, metronome: 1 },
    terrain: "fishingterrain",
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower2, attacker, defender, move2) {
        let mod = 1;
        if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
          if (move2.flags["fishing"])
            mod *= 1.3;
        }
        return this.chainModify(mod);
      },
      onAfterMove(target, source2, move2) {
        if (move2.flags["fishing"])
          target.side.addFishingTokens(1);
      },
      onFieldStart(field, source2, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Fishing Terrain", "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-fieldstart", "move: Fishing Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Fishing Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Water"
  },
  evilscaryuturn: {
    name: "EVIL SCARY U-Turn",
    type: "Dark",
    category: "Physical",
    basePower: 70,
    accuracy: 100,
    pp: 20,
    shortDesc: "User switches out after damaging the target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Scary Face", target);
      this.add("-anim", pokemon, "Shadow Sneak", target);
    },
    selfSwitch: true,
    secondary: null,
    target: "normal"
  },
  looksmaxxknuckle: {
    name: "Looksmaxx Knuckle",
    type: "Fairy",
    category: "Physical",
    basePower: 70,
    accuracy: 100,
    pp: 10,
    shortDesc: "Raises the user's Attack by 1.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Max Knuckle", target);
    },
    self: {
      boosts: {
        atk: 1
      }
    },
    secondary: null,
    target: "normal"
  },
  lemonacid: {
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Lemon Acid",
    shortDesc: "100% chance to lower the target\u2019s Sp. Def by 1.",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Acid Spray", target);
    },
    secondary: {
      chance: 100,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Lemon"
  },
  campfire: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Campfire",
    shortDesc: "Consumes 1 Fishing Token to heal 50% max HP.",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Ember", pokemon);
    },
    onTry(source2) {
      return source2.side.fishingTokens && source2.side.fishingTokens > 0;
    },
    onHit(target, source2, move2) {
      const success = source2.side.removeFishingTokens(1);
      if (success) {
        this.heal(Math.ceil(source2.maxhp / 2), source2);
        if (!["", "slp", "frz"].includes(source2.status))
          source2.cureStatus();
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Fire"
  },
  sizedifference: {
    name: "Size Difference",
    type: "Ice",
    category: "Physical",
    basePower: 100,
    basePowerCallback(pokemon, target, move2) {
      if (target.newlySwitched || this.queue.willMove(target)) {
        this.debug("Payback NOT boosted");
        return move2.basePower;
      }
      const targetMove = target.lastMove;
      if (targetMove.name.length < 15)
        return move2.basePower * 2;
    },
    accuracy: 100,
    pp: 5,
    shortDesc: "Move against user has shorter name: 2x power.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Ice Hammer", target);
    },
    secondary: null,
    target: "normal"
  },
  genderaffirmingcare: {
    name: "Gender Affirming Care",
    type: "Silly",
    category: "Status",
    basePower: 0,
    accuracy: 100,
    pp: 10,
    shortDesc: "Changes the target's gender.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Endeavor", target);
    },
    onTryImmunity(pokemon, source2) {
      return pokemon.gender !== "N";
    },
    onHit(target) {
      if (!target.trans) {
        target.gender = target.gender === "F" ? "M" : "F";
        target.trans = true;
        this.add("-message", `${target.name} is now ${target.gender === "M" ? "male" : "female"}!`);
      } else {
        this.boost({ def: 1, spd: 1 }, target, target);
      }
    },
    secondary: null,
    target: "normal"
  },
  liondeluge: {
    name: "Lion Deluge",
    type: "Electric",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 40,
    shortDesc: "For 5 turns, sound moves turn the user into a Lion.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Ion Deluge", target);
    },
    pseudoWeather: "liondeluge",
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("liongun")) {
          return 10;
        }
        return 5;
      },
      onFieldStart(target, source2, sourceEffect) {
        this.add("-fieldactivate", "move: Lion Deluge");
        this.hint(`Certain sound moves cause the user to become a lion Pokemon depending on the move's type.`);
      },
      onBeforeMove(pokemon, target, move2) {
        if (!move2.flags["sound"])
          return;
        if (move2.type === "Normal")
          pokemon.formeChange("Pyroar");
        if (move2.type === "Electric")
          pokemon.formeChange("Luxray");
        if (move2.type === "Fire")
          pokemon.formeChange("Entei");
        if (move2.type === "Dragon")
          pokemon.formeChange("Gouging Fire");
        if (move2.type === "Steel")
          pokemon.formeChange("Solgaleo");
        if (move2.type === "Psychic")
          pokemon.formeChange("Necrozma-Dusk-Mane");
      },
      onFieldEnd() {
        this.add("-fieldend", "move: Lion Deluge");
      }
    },
    secondary: null,
    target: "normal"
  },
  //slate 4
  holdhands: {
    inherit: true,
    onTryHit(target, source2) {
      this.add("-message", `${source2.name} held hands with ${target.name}!`);
    }
  },
  spacelaser: {
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Space Laser",
    shortDesc: "Hits two turns after being used.",
    pp: 5,
    priority: 0,
    flags: { metronome: 1, futuremove: 1 },
    onTry(source2, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "spacelaser",
        source: source2,
        moveData: {
          id: "spacelaser",
          name: "Space Laser",
          accuracy: 100,
          basePower: 140,
          category: "Special",
          priority: 0,
          flags: { metronome: 1, futuremove: 1 },
          effectType: "Move",
          type: "Fire"
        }
      });
      this.add("-start", source2, "Space Laser");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  juicewave: {
    name: "Juice Wave",
    type: "Lemon",
    category: "Special",
    basePower: 80,
    accuracy: 100,
    pp: 10,
    shortDesc: "User recovers 50% of the damage dealt.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, heal: 1 },
    drain: [1, 2],
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Sludge Wave", target);
    },
    secondary: null,
    target: "normal"
  },
  zestycutter: {
    name: "Zesty Cutter",
    type: "Lemon",
    category: "Physical",
    basePower: 80,
    accuracy: 100,
    pp: 10,
    shortDesc: "+1 priority if the target has a lowered stat.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Psycho Cut", target);
    },
    onModifyPriority(priority, source2) {
      for (const target of source2.foes()) {
        if (target) {
          const boosts = {};
          let i;
          for (i in target.boosts) {
            if (target.boosts[i] < 0) {
              return priority + 1;
            }
          }
        }
      }
    },
    secondary: null,
    target: "normal"
  },
  blindingsquirter: {
    name: "Blinding Squirter",
    type: "Lemon",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Target's 100% accurate moves have 50% accuracy.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Acid Spray", target);
    },
    volatileStatus: "blindingsquirter",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Blinding Squirter", "[silent]");
        this.add("message", `${pokemon.name} was blinded!`);
      },
      onSourceAccuracy(accuracy, target, source2, move2) {
        if (move2 && move2.accuracy === 100)
          return 50;
      }
    },
    secondary: null,
    target: "normal"
  },
  throwemamug: {
    name: "Throw Em' A Mug",
    type: "Lemon",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "User switches out. Incoming Diamond Hand: 30% heal.",
    priority: -2,
    flags: { metronome: 1 },
    onTry(source2) {
      return !!this.canSwitch(source2.side);
    },
    selfSwitch: true,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Teleport", target);
    },
    sideCondition: "throwemamug",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Throw Em A Mug", "[silent]");
      },
      onEntryHazard(pokemon) {
        if (pokemon.baseSpecies.diamondHand)
          this.heal(pokemon.maxhp * 0.3);
        pokemon.side.removeSideCondition("throwemamug");
        this.add("-sideend", pokemon.side, "move: Throw Em A Mug", "[of] " + pokemon, "[silent]");
      }
    },
    secondary: null,
    target: "self"
  },
  mewing: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mewing",
    shortDesc: "Protects from damaging attacks. Contact: gain Silly.",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1, failinstruct: 1 },
    stallingMove: true,
    volatileStatus: "mewing",
    onPrepareHit(pokemon) {
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
      onTryHit(target, source2, move2) {
        if (!move2.flags["protect"] || move2.category === "Status") {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move2.id))
            return;
          if (move2.isZ || move2.isMax)
            target.getMoveHitData(move2).zBrokeProtect = true;
          return;
        }
        if (move2.smartTarget) {
          move2.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move2, source2, target)) {
          if (!target.hasType("Silly") && target.addType("Silly"))
            this.add("-start", target, "typeadd", "Silly", "[from] move: Mewing");
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move2) {
        if (move2.isZOrMaxPowered && this.checkMoveMakesContact(move2, source2, target)) {
          if (!target.hasType("Silly") && target.addType("Silly"))
            this.add("-start", target, "typeadd", "Silly", "[from] move: Mewing");
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Silly"
  },
  freakout: {
    name: "Freak Out",
    type: "Silly",
    category: "Physical",
    basePower: 85,
    accuracy: 100,
    pp: 10,
    shortDesc: "50% chance to lower target's Def by 1 stage, 100% if target healed.\u200B",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
    },
    onModifyMove(move2, pokemon, target) {
      if (target.volatiles["healed"]) {
        move2.secondary.chance = 100;
      }
    },
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  corrosivegus: {
    name: "Corrosive Gus",
    type: "Normal",
    category: "Status",
    basePower: 0,
    accuracy: 100,
    pp: 10,
    shortDesc: "Target has a random stat lowered by 1 each turn.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Corrosive Gas", target);
    },
    volatileStatus: "corrosivegus",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Corrosive Gus");
      },
      onResidualOrder: 28,
      onResidualSubOrder: 2,
      onResidual(pokemon) {
        let stats = [];
        const boost = {};
        stats = [];
        let statMinus;
        for (statMinus in pokemon.boosts) {
          if (statMinus === "accuracy" || statMinus === "evasion")
            continue;
          if (pokemon.boosts[statMinus] > -6) {
            stats.push(statMinus);
          }
        }
        let randomStat = stats.length ? this.sample(stats) : void 0;
        if (randomStat)
          boost[randomStat] = -1;
        this.boost(boost, pokemon, pokemon);
      }
    },
    secondary: null,
    target: "normal"
  },
  incinerate: {
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Incinerate",
    shortDesc: "1.5x damage if foe holds an item. Removes item.",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onBasePower(basePower2, source2, target, move2) {
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemState, target, target, move2, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    },
    onAfterHit(target, source2) {
      if (source2.hp) {
        let item = target.item;
        const nonBurn = ["Never-Melt Ice", "Charcoal", "Magmarizer", "Dragon Fang", "Dragon Scale", "Damp Rock", "Smooth Rock", "Heat Rock", "Insect Plate", "Dread Plate", "Draco Plate", "Zap Plate", "Flame Plate", "Fist Plate", "Sky Plate", "Pixie Plate", "Spooky Plate", "Meadow Plate", "Earth Plate", "Icicle Plate", "Toxic Plate", "Stone Plate", "Iron Plate", "Splash Plate", "Light Ball", "Metal Powder", "Quick Powder", "Deep Sea Scale", "Deep Sea Tooth", "Thick Club", "Protective Pads"];
        if (!nonBurn.includes(target.item))
          item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: Incinerate", "[of] " + source2);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Clever"
  },
  pissongrave: {
    name: "Piss on Grave",
    type: "Lemon",
    category: "Special",
    basePower: 95,
    accuracy: 100,
    pp: 10,
    shortDesc: "OHKOs Margaret Thatcher.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Steam Eruption", target);
    },
    onModifyMove(move2, pokemon) {
      for (const target of pokemon.foes()) {
        if (target.baseSpecies == "Margaret Thatcher") {
          move2.ohko = true;
          move2.accuracy = true;
        }
      }
    },
    secondary: null,
    target: "normal"
  },
  formofthestrawberryelephant: {
    name: "Form of the strawberry elephant",
    type: "Silly",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 5,
    shortDesc: "Raises Attack, Sp. Attack, Speed, accuracy by 1. User loses 1/8 HP.",
    priority: 0,
    flags: { snatch: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Bulk Up", target);
    },
    onTry(source2) {
      if (source2.hp <= source2.maxhp / 8 || source2.maxhp === 1)
        return false;
    },
    onTryHit(pokemon, target, move2) {
      if (!this.boost(move2.boosts))
        return null;
      delete move2.boosts;
    },
    onHit(pokemon) {
      this.directDamage(pokemon.maxhp / 8);
    },
    boosts: {
      atk: 1,
      spa: 1,
      spe: 1,
      accuracy: 1
    },
    secondary: null,
    target: "self"
  },
  /*thief: {
  	inherit: true,
  	shortDesc: "Steels the target's item.",
  	onAfterHit(target, source) {
  		const item = target.takeItem();
  		if (!item) return;
  		const ironball = this.dex.items.get('Iron Ball');
  		this.add('-enditem', target, item.name, '[from] move: Thief', '[of] ' + source, "[silent]");
  		this.add('-item', target, ironball, '[from] move: Thief', '[of] ' + target, "[silent]");
  		target.setItem(ironball);
  		this.add("-message", `${source.name} steeled ${target.name}'s ${item}!`);
  	}
  },*/
  swiftsquirt: {
    name: "Swift Squirt",
    type: "Lemon",
    category: "Special",
    basePower: 40,
    accuracy: 100,
    pp: 10,
    shortDesc: "Usually moves first. High critical hit ratio.",
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    critRatio: 2,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Water Shuriken", target);
    },
    secondary: null,
    target: "normal"
  },
  courtchange: {
    inherit: true,
    onHitField(target, source2) {
      const sideConditions = [
        "mist",
        "lightscreen",
        "reflect",
        "spikes",
        "safeguard",
        "tailwind",
        "toxicspikes",
        "stealthrock",
        "waterpledge",
        "firepledge",
        "grasspledge",
        "stickyweb",
        "auroraveil",
        "gmaxsteelsurge",
        "gmaxcannonade",
        "gmaxvinelash",
        "gmaxwildfire"
      ];
      let success = false;
      const sourceSideConditions = source2.side.sideConditions;
      const targetSideConditions = source2.side.foe.sideConditions;
      const sourceTemp = {};
      const targetTemp = {};
      for (const id in sourceSideConditions) {
        if (!sideConditions.includes(id))
          continue;
        sourceTemp[id] = sourceSideConditions[id];
        delete sourceSideConditions[id];
        success = true;
      }
      for (const id in targetSideConditions) {
        if (!sideConditions.includes(id))
          continue;
        targetTemp[id] = targetSideConditions[id];
        delete targetSideConditions[id];
        success = true;
      }
      if (target.side.fishingTokens > 0 || source2.side.fishingTokens > 0) {
        const tempT = target.side.fishingTokens;
        const tempS = source2.side.fishingTokens;
        target.side.removeFishingTokens(tempT);
        target.side.addFishingTokens(tempS);
        source2.side.removeFishingTokens(tempS);
        source2.side.addFishingTokens(tempT);
      }
      for (const id in sourceTemp) {
        targetSideConditions[id] = sourceTemp[id];
      }
      for (const id in targetTemp) {
        sourceSideConditions[id] = targetTemp[id];
      }
      this.add("-swapsideconditions");
      if (!success)
        return false;
      this.add("-activate", source2, "move: Court Change");
    }
  },
  lethalhug: {
    name: "Lethal Hug",
    type: "Silly",
    category: "Physical",
    basePower: 90,
    accuracy: 10001,
    pp: 10,
    shortDesc: "User recovers 1/8 max HP if this KOs a target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Body Slam", target);
    },
    onAfterMoveSecondarySelf(pokemon, target, move2) {
      if (!target || target.fainted || target.hp <= 0)
        this.heal(pokemon.maxhp / 6, pokemon, target, move2);
    },
    secondary: null,
    target: "normal"
  },
  brainrotcudgel: {
    name: "Brainrot Cudgel",
    type: "Silly",
    category: "Physical",
    basePower: 50,
    accuracy: 100,
    pp: 10,
    shortDesc: "Always results in a critical hit.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    willCrit: true,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Ivy Cudgel Rock", target);
    },
    secondary: null,
    target: "normal"
  },
  //slate 5
  maldfist: {
    name: "Mald Fist",
    type: "Ghost",
    category: "Physical",
    accuracy: 100,
    pp: 16,
    noPPBoosts: true,
    basePower: 50,
    shortDesc: "+10 power for each PP used.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1 },
    basePowerCallback(pokemon, target, move2) {
      const callerMoveId = move2.sourceEffect || move2.id;
      const moveSlot = callerMoveId === "instruct" ? pokemon.getMoveData(move2.id) : pokemon.getMoveData(callerMoveId);
      return move2.basePower + 10 * (move2.pp - moveSlot.pp - 1);
    },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Rage Fist", target);
    },
    secondary: null,
    target: "normal"
  },
  airhorn: {
    name: "Air Horn",
    type: "Silly",
    category: "Special",
    basePower: 55,
    accuracy: 100,
    pp: 10,
    shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Boomburst", target);
    },
    onModifyMove(move2, pokemon, target) {
      if (pokemon.volatiles["bigbutton"] || target.volatiles["bigbutton"])
        move2.willCrit = true;
    },
    secondary: null,
    target: "normal"
  },
  balatroblast: {
    name: "Balatro Blast",
    type: "Silly",
    category: "Special",
    basePower: 40,
    basePowerCallback(pokemon, target, move2) {
      if (!pokemon.side.trumpcard)
        pokemon.side.trumpcard = 0;
      const bp = move2.basePower + 20 * pokemon.side.trumpcard;
      this.debug("BP: " + bp);
      return bp;
    },
    accuracy: 100,
    pp: 10,
    shortDesc: "+20 power for each time an ally used Trump Card.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Hyper Beam", target);
    },
    secondary: null,
    target: "normal"
  },
  fiendfire: {
    name: "Fiend Fire",
    type: "Fire",
    category: "Special",
    basePower: 50,
    accuracy: 100,
    pp: 10,
    shortDesc: "Consumes user's tokens; hits for that many tokens, max 4.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Magma Storm", target);
    },
    onModifyMove(move2, pokemon, target) {
      const pokeSide = pokemon.side;
      if (pokeSide.fishingTokens > 0) {
        const hits = Math.min(pokeSide.fishingTokens, 4);
        pokeSide.removeFishingTokens(pokeSide.fishingTokens);
        move2.multihit = hits;
      }
    },
    secondary: null,
    target: "normal"
  },
  jurassicfeast: {
    name: "Jurassic Feast",
    type: "Rock",
    category: "Physical",
    basePower: 80,
    accuracy: 100,
    pp: 10,
    shortDesc: "Always crits and burns Lemon-type or fish Pokemon.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Tar Shot", target);
    },
    onModifyMove(move2, pokemon, target) {
      if (target.hasType("Lemon") || target.baseSpecies.fish)
        move2.willCrit = true;
    },
    onAfterHit(target, source2, move2) {
      if (target.hasType("Lemon") || target.baseSpecies.fish) {
        target.trySetStatus("brn");
      }
    },
    secondary: null,
    target: "normal"
  },
  singleironbash: {
    name: "Single Iron Bash",
    type: "Steel",
    category: "Physical",
    basePower: 111,
    accuracy: true,
    pp: 11,
    noPPBoosts: true,
    shortDesc: "11% chance to make the target flinch.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Double Iron Bash", target);
    },
    secondary: {
      chance: 11,
      volatileStatus: "flinch"
    },
    target: "normal"
  },
  handofspace: {
    name: "Hand of Space",
    type: "Water",
    category: "Special",
    basePower: 100,
    basePowerCallback(pokemon, target, move2) {
      if (target.baseSpecies.diamondHand)
        return move2.basePower * 1.5;
      return move2.basePower;
    },
    accuracy: 100,
    pp: 10,
    shortDesc: "Deals 1.5x damage to Diamond Hand members.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Spacial Rend", target);
    },
    secondary: null,
    target: "normal"
  },
  fishburn: {
    name: "Fish Burn",
    type: "Fire",
    category: "Special",
    basePower: 80,
    basePowerCallback(pokemon, target, move2) {
      if (target.side.removeFishingTokens(1)) {
        return move2.basePower *= 1.5;
      }
      return move2.basePower;
    },
    accuracy: 100,
    pp: 10,
    shortDesc: "-1 foe's Fishing Token to deal 1.5x damage.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, fishing: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Burn Up", target);
    },
    secondary: null,
    target: "normal"
  },
  enchantedboomerang: {
    name: "Enchanted Boomerang",
    type: "Fairy",
    category: "Physical",
    basePower: 50,
    accuracy: 100,
    pp: 10,
    shortDesc: "Hits twice.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Bonemerang", target);
    },
    multihit: 2,
    secondary: null,
    target: "normal"
  },
  teratriplebasedballbarrage: {
    name: "Tera Triple Basedball Barrage",
    type: "Stellar",
    category: "Physical",
    basePower: 1,
    accuracy: true,
    pp: 1,
    shortDesc: "",
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Astral Barrage", target);
    },
    isZ: "stellariumz",
    secondary: null,
    target: "normal"
  },
  //slate 6
  ironfist: {
    name: "Iron Fist",
    type: "Steel",
    category: "Physical",
    basePower: 90,
    accuracy: 100,
    pp: 10,
    shortDesc: "Raises user's and target's Defense by 1.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Double Iron Bash", target);
    },
    boosts: {
      def: 1
    },
    self: {
      boosts: {
        def: 1
      }
    },
    secondary: null,
    target: "normal"
  },
  fertilesoil: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fertile Soil",
    shortDesc: "Inflicts foes with Leech seed on switchin. Single use.",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "fertilesoil",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Fertile Soil");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.hasType("Grass")) {
          if (pokemon.adjacentFoes().length == 0)
            return;
          const target = this.sample(pokemon.adjacentFoes());
          pokemon.addVolatile("leechseed", target);
          pokemon.side.removeSideCondition("fertilesoil");
          this.add("-sideend", pokemon.side, "move: Fertile Soil", "[of] " + pokemon);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  epicbeam: {
    name: "Epic Beam",
    type: "Ice",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 40,
    shortDesc: "Epic Beam",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTry(source2) {
      if (source2.side.pokemonLeft > 1)
        return;
      this.attrLastMove("[still]");
      this.add("-fail", source2, "move: Epic Beam");
      return null;
    },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Prismatic Laser", target);
    },
    onModifyMove(move2, pokemon, target) {
      move2.category = "Special";
      move2.basePower = 300;
    },
    onAfterHit(target, source2) {
      source2.side.addSlotCondition(source2, "epicbeam");
    },
    // wtf
    selfSwitch: true,
    condition: {
      duration: 1
      // sacrificing implemented in side.ts, kind of
    },
    secondary: null,
    target: "normal"
  },
  homerun: {
    name: "Home Run",
    type: "Silly",
    category: "Physical",
    basePower: 40,
    accuracy: 100,
    pp: 15,
    shortDesc: "Usually goes first. 2x power if target is Baseballed.",
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Brutal Swing", target);
    },
    onBasePower(basePower2, pokemon, target) {
      if (target.status === "baseball")
        return this.chainModify(2);
    },
    secondary: null,
    target: "normal"
  },
  chaospotion: {
    name: "Chaos Potion",
    type: "Psychic",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Turns the user into a random Pokemon.",
    priority: 2,
    flags: { snatch: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Transform", target);
    },
    onHit(pokemon) {
      if (!pokemon.hp)
        return;
      const pokemons = this.dex.species.all();
      const randomPokemon = this.sample(pokemons);
      pokemon.formeChange(randomPokemon);
      this.add("-message", `${pokemon.name} transformed into ${randomPokemon}!`);
    },
    secondary: null,
    target: "self"
  },
  justicepotion: {
    name: "Justice Potion",
    type: "Psychic",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Turns the target into a random Pokemon.",
    priority: -2,
    flags: { protect: 1, mirror: 1, reflectable: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Acid Spray", target);
    },
    onHit(pokemon) {
      if (!pokemon.hp)
        return;
      const pokemons = this.dex.species.all();
      const randomPokemon = this.sample(pokemons);
      pokemon.formeChange(randomPokemon);
      this.add("-message", `${pokemon.name} transformed into ${randomPokemon}!`);
    },
    secondary: null,
    target: "normal"
  },
  graveyard: {
    name: "Graveyard",
    type: "Ghost",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 5,
    shortDesc: "For 5 turns, +Ghost and damages non-Ghost/Darks/Normals.",
    priority: 0,
    flags: { metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Sunny Day", target);
    },
    weather: "graveyard",
    secondary: null,
    target: "all"
  },
  pieblast: {
    name: "Pie Blast",
    type: "Silly",
    category: "Special",
    basePower: 80,
    accuracy: 100,
    pp: 15,
    shortDesc: "100% chance to lower the target's Speed by 1.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Mind Blown", target);
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal"
  },
  multiattack: {
    inherit: true,
    shortDesc: "Type = Memory. Special if user's Sp. Atk > Atk.",
    onModifyMove(move2, pokemon) {
      if (pokemon.getStat("atk", false, true) < pokemon.getStat("spa", false, true))
        move2.category = "Special";
    }
  },
  citrusbomb: {
    accuracy: 85,
    basePower: 60,
    category: "Special",
    name: "Citrus Bomb",
    shortDesc: "Target's accuracy is lowered by 1 stage for 3 turns.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
    condition: {
      noCopy: true,
      duration: 4,
      onStart(pokemon) {
        this.add("-start", pokemon, "Citrus Bomb");
      },
      onUpdate(pokemon) {
        if (this.effectState.source && !this.effectState.source.isActive) {
          pokemon.removeVolatile("citrusbomb");
        }
      },
      onResidualOrder: 14,
      onResidual(pokemon) {
        this.boost({ accuracy: -1 }, pokemon, this.effectState.source);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Citrus Bomb", "[silent]");
      }
    },
    secondary: {
      chance: 100,
      volatileStatus: "citrusbomb"
    },
    target: "normal",
    type: "Lemon"
  },
  //slate 7
  clash: {
    name: "Clash",
    type: "Fighting",
    category: "Physical",
    basePower: 100,
    accuracy: 100,
    pp: 10,
    shortDesc: "Fails if this Pokemon has a Status move.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "First Impression", target);
    },
    onTry(pokemon) {
      for (const moveSlot of pokemon.moveSlots) {
        const temp = this.dex.moves.get(moveSlot.id);
        if (temp.category === "Status")
          return false;
      }
    },
    secondary: null,
    target: "normal"
  },
  anofferyoucantrefuse: {
    name: "An Offer You Can't Refuse",
    type: "Bug",
    category: "Physical",
    basePower: 90,
    accuracy: 100,
    pp: 10,
    shortDesc: "User sets a Madness Counter on its side.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Pay Day", target);
    },
    onAfterHit(target, source2) {
      source2.side.addSideCondition("madnesscounter");
    },
    secondary: null,
    target: "normal"
  },
  lemonbash: {
    name: "Lemon Bash",
    type: "Lemon",
    category: "Physical",
    basePower: 85,
    accuracy: 100,
    pp: 15,
    shortDesc: "20% chance to lower the target's Def by 1.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Double-Edge", target);
    },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal"
  },
  springyfist: {
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Springy Fist",
    shortDesc: "User switches out. Disables the target's last move.",
    pp: 15,
    priority: 1,
    flags: { contact: 1, punch: 1, protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Dizzy Punch", target);
    },
    onAfterHit(target, source2) {
      if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === "struggle")
        return;
      target.addVolatile("disable");
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Psychic"
  },
  focusblast: {
    inherit: true,
    accuracy: 80
  },
  recycle: {
    inherit: true,
    shortDesc: "Restores the items the user's party last used.",
    onHit(target, source2) {
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally.item || !ally.lastItem)
          continue;
        const item = ally.lastItem;
        ally.lastItem = "";
        this.add("-item", ally, this.dex.items.get(item), "[from] move: Recycle");
        ally.setItem(item);
        success = true;
      }
      return success;
    }
  },
  //slate 8
  necromancy: {
    name: "Necromancy",
    type: "Ghost",
    category: "Special",
    basePower: 0,
    basePowerCallback(pokemon, target, move2) {
      return 30 * Math.min(pokemon.side.totalFainted, 5);
    },
    accuracy: 70,
    pp: 5,
    shortDesc: "+30 power for each fainted ally. Graveyard: can't miss.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTryMove(attacker, defender, move2) {
      return attacker.side.totalFainted > 0;
    },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Last Respects", target);
    },
    onModifyMove(move2, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "graveyard":
          move2.accuracy = true;
          break;
      }
    },
    secondary: null,
    target: "normal"
  },
  snowflakeshuriken: {
    name: "Snowflake Shuriken",
    type: "Ice",
    category: "Special",
    basePower: 20,
    accuracy: 100,
    pp: 20,
    shortDesc: "Usually goes first. Hits 3 times.",
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    multihit: 3,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Icicle Spear", target);
    },
    secondary: null,
    target: "normal"
  },
  wildhunt: {
    name: "Wild Hunt",
    type: "Fairy",
    category: "Physical",
    basePower: 120,
    accuracy: 85,
    pp: 10,
    shortDesc: "No additional effect.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Power Whip", target);
    },
    secondary: null,
    target: "normal"
  },
  flytrap: {
    name: "Flytrap",
    type: "Grass",
    category: "Physical",
    basePower: 70,
    accuracy: 100,
    pp: 20,
    shortDesc: "Super effective against Bug-types.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Snap Trap", target);
    },
    onEffectiveness(typeMod, target, type) {
      if (type === "Bug")
        return 1;
    },
    secondary: null,
    target: "normal"
  },
  twineedle: {
    inherit: true,
    shortDesc: "Hits 2-5 times. 20% chance to poison regardless of typing.",
    multihit: [2, 5],
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("twineedle");
    },
    condition: {
      duration: 1,
      noCopy: true,
      onStart(target) {
        target.addVolatile("ability:corrosion");
      },
      onEnd(target) {
        target.removeVolatile("ability:corrosion");
      }
    }
  },
  wariopicrosspuzzle4g: {
    name: "Wario Picross Puzzle 4G",
    type: "Rock",
    category: "Special",
    basePower: 95,
    accuracy: 100,
    pp: 10,
    shortDesc: "10% chance to Baseball the target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Power Gem", target);
    },
    secondary: {
      chance: 10,
      status: "baseball"
    },
    target: "normal"
  },
  blazeball: {
    name: "Blazeball",
    type: "Fire",
    category: "Special",
    basePower: 160,
    basePowerCallback(pokemon, target, move2) {
      if (pokemon === target || move2.target === "self") {
        this.debug("BP halved in hitting self");
        return move2.basePower / 2;
      }
      return move2.basePower;
    },
    accuracy: 100,
    pp: 10,
    shortDesc: "User also hits self at half power.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Burn Up", target);
    },
    onAfterHit(target, source2, move2) {
      if (source2.hp && source2.lastMove.target != "self") {
        move2.target = "self";
        this.actions.useMove(move2.id, source2, source2);
      }
    },
    secondary: null,
    target: "normal"
  },
  perfectfreeze: {
    num: -1012,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Perfect Freeze",
    pp: 1,
    noPPBoosts: true,
    priority: 0,
    flags: { protect: 1, mirror: 1, recharge: 1 },
    secondary: {
      chance: 100,
      status: "frz"
    },
    self: {
      volatileStatus: "mustrecharge"
    },
    onTryMove() {
      this.attrLastMove("[still]");
    },
    onPrepareHit(target, source2) {
      this.add("-anim", source2, "Sheer Cold", target);
    },
    /*mindBlownRecoil: true,
    onAfterMove(pokemon, target, move) {
    	if (move.mindBlownRecoil && !move.multihit) {
    		const hpBeforeRecoil = pokemon.hp;
    		this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Perfect Freeze'), true);
    		if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
    			this.runEvent('EmergencyExit', pokemon, pokemon);
    		}
    	}
    },*/
    target: "normal",
    type: "Ice",
    contestType: "Cool",
    shortDesc: "100% chance to freeze. User must recharge."
  },
  energytank: {
    name: "Energy Tank",
    type: "Steel",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Heals 1/3 max HP, Endure. Cannot be selected twice in a row.",
    priority: 3,
    flags: { snatch: 1, metronome: 1, cantusetwice: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Synthesis", pokemon);
    },
    heal: [1, 3],
    volatileStatus: "endure",
    secondary: null,
    target: "self"
  },
  zekromkick: {
    name: "Zekrom Kick",
    type: "Dragon",
    category: "Physical",
    basePower: 45,
    basePowerCallback(pokemon, target, move2) {
      if (pokemon.species.id === "zekrom")
        return move2.basePower * 2;
      return move2.basePower;
    },
    accuracy: 100,
    pp: 15,
    shortDesc: "Zekrom: 2x power. Else transforms into Zekrom.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Thunderous Kick", target);
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(pokemon.name)}|shut up idiot \u30B8\u30A7\u30A4\u7D75\u30B8\u30A7 (ZEKROM KICK)`);
    },
    onAfterMoveSecondarySelf(target, source2, move2) {
      if (target.species.id !== "zekrom")
        target.formeChange("Zekrom", this.effect, false, "0", "[msg]");
    },
    secondary: null,
    target: "normal"
  },
  bakingblast: {
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Baking Blast",
    shortDesc: "+2 SpD on contact with user before it moves.",
    pp: 15,
    priority: -3,
    flags: { protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1 },
    priorityChargeCallback(pokemon) {
      pokemon.addVolatile("bakingblast");
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: Baking Blast");
      },
      onHit(target, source2, move2) {
        if (this.checkMoveMakesContact(move2, source2, target)) {
          this.boost({ def: 2, accuracy: 1 }, target);
        }
      }
    },
    // FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('beakblast')},
    onAfterMove(pokemon) {
      pokemon.removeVolatile("bakingblast");
    },
    secondary: null,
    target: "normal",
    type: "Silly",
    contestType: "Tough"
  },
  deathgrip: {
    num: 3015,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    shortDesc: "Prevents the target from using pivoting moves.",
    name: "Death Grip",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target, source2, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Octolock", target);
    },
    volatileStatus: "deathgrip",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Death Grip");
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          const move2 = this.dex.moves.get(moveSlot.id);
          if (move2.selfSwitch) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Tough"
  },
  //slate 9
  trumpcard: {
    inherit: true,
    basePowerCallback(source2, target, move2) {
      const callerMoveId = move2.sourceEffect || move2.id;
      const moveSlot = callerMoveId === "instruct" ? source2.getMoveData(move2.id) : source2.getMoveData(callerMoveId);
      let bp;
      if (!moveSlot) {
        bp = 40;
      } else {
        switch (moveSlot.pp) {
          case 0:
            bp = 250;
            break;
          case 1:
            bp = 120;
            break;
          case 2:
            bp = 90;
            break;
          case 3:
            bp = 60;
            break;
          default:
            bp = 40;
            break;
        }
      }
      this.debug("BP: " + bp);
      return bp;
    },
    onPrepareHit(target, source2, move2) {
      if (!source2.side.trumpcard)
        source2.side.trumpcard = 0;
      source2.side.trumpcard++;
      console.log(source2.name + " " + source2.side.trumpcard);
    },
    onTryHit(target, source2, move2) {
      if (!move2.multihit)
        return;
      if (!source2.side.trumpcard)
        source2.side.trumpcard = 0;
      source2.side.trumpcard++;
      console.log(source2.name + " " + source2.side.trumpcard);
    }
  },
  racism2: {
    name: "Racism 2",
    type: "Dark",
    category: "Special",
    basePower: 82,
    accuracy: 100,
    pp: 15,
    shortDesc: "25% chance to transform the target into Ferrothorn for 3 turns.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Taunt", target);
    },
    secondary: {
      chance: 25,
      volatileStatus: "racism2"
    },
    condition: {
      noCopy: true,
      duration: 3,
      onStart(pokemon) {
        pokemon.formeChange("Ferrothorn");
      },
      onEnd(pokemon) {
        pokemon.formeChange(pokemon.baseSpecies.name);
      }
    },
    target: "normal"
  },
  citron: {
    name: "Citron",
    type: "Lemon",
    category: "Special",
    basePower: 80,
    accuracy: 100,
    pp: 10,
    shortDesc: "Hits all adjacent foes.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Overdrive", target);
    },
    secondary: null,
    target: "allAdjacentFoes"
  },
  citronoverload: {
    name: "CITRON OVERLOAD",
    type: "Lemon",
    category: "Special",
    basePower: 145,
    accuracy: true,
    pp: 1,
    shortDesc: "Hits all adjacent foes. All Pokemon become Lemon-type.",
    priority: 0,
    flags: { sound: 1 },
    isZ: "citroniumz",
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Boomburst", target);
    },
    onAfterHit(target, pokemon, move2) {
      this.add("-fieldactivate", "move: CITRON OVERLOAD");
      for (const pokemon2 of this.getAllActive()) {
        if (pokemon2.setType("Lemon")) {
          this.add("-start", pokemon2, "typechange", "Lemon");
        }
      }
    },
    secondary: null,
    target: "allAdjacentFoes"
  },
  everstormhalberd: {
    name: "Everstorm Halberd",
    type: "Dragon",
    category: "Physical",
    basePower: 0,
    damageCallback(pokemon, target) {
      const nonVanilla = ["Anarlvet", "Kingler-Mega", "microwave", "Lytlegai", "Ohmyrod", "Big Crammer", "Samurott-Sinnoh", "Goomba", "Fridgile", "Melmetal 2", "Pidown", "Kurayami", "Zelda", "Drigike", "Phish", "Smelmetal", "Bondra", "Tangette-Eternal", "Donmigo", "Dragoone", "Collachet", "Guiltrism", "Swooliobat", "Electrode-Mega", "Mario Kart Wii", "Impalpitoad", "Scrubby", "Ogerpon-Cornerstone", "palpitoad is so cool", "Moltres-Mega", "Jirachitwo", "Shinx-Fishing", "Conquescape", "Daiyakuza", "Pokestar Fisherman", "Magnegiri", "mario", "Contamicow", "Whonhef", "Fish Factory", "cowboy_bandido", "Pokestar Giant", "Richard Petty", "Impidimp-Mega", "Lemon", "Fishing Zombie", "Pokestar MT", "Margaret Thatcher", "Flesh Valiant", "Flesh Valiant-Mega", "Ronald Reagan", "Lime Lips", "Lemotic", "Zestii", "Rawring Moon", "Boogerpon-CLOWNerstone", "Keisberg-IF", "Apple's Newest Emoji", "Lemon Fish", "Goddease", "Jableye", "Kyrum", "Raccoon", "Lucario-Calm", "Nedontrol", "Princirang", "Iron Clown", "The Pearl Hand", "McFish", "Applwirm", "minun and plusle :D", "Traike", "Dr. Liberty", "Sunflora-Grave", "Hydralemon", "Hiveweb", "Syndican't", "Fish Marketing 3", "Lemonganium", "Carnivine-IF", "Grumpig", "Impromancer", "Pander Dragoon", "Soruarc", "Skibidragon", "Hitmontop-Mega", "Porygon-Z-Mega", "Furumo", "mega man", "Fudgesaur", "Fudgesaur-Mega", "darkpoison", "Sigma Rice Lion", "Lickilord", "Citrus Jams", "Everh\xE1l", "Grimace", "Pyroaring", "Tyler the Creator"];
      return nonVanilla.includes(target.baseSpecies.name) ? 200 : 150;
    },
    accuracy: 90,
    pp: 5,
    shortDesc: "Deals 150 damage; 200 to fakemon.",
    priority: -2,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Dragon Hammer", target);
    },
    secondary: null,
    target: "normal"
  },
  absolutezero: {
    name: "Absolute Zero",
    type: "Ice",
    category: "Special",
    basePower: 80,
    accuracy: 80,
    pp: 10,
    shortDesc: "Frigid Terrain: 1.5x power, lowers Speed by 2.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Sheer Cold", target);
    },
    onBasePower(basePower2, source2) {
      if (this.field.isTerrain("frigidterrain") && source2.isGrounded()) {
        this.debug("terrain buff");
        return this.chainModify(1.5);
      }
    },
    onModifyMove(move2, source2, target) {
      if (this.field.isTerrain("frigidterrain") && source2.isGrounded()) {
        move2.secondaries = [];
        move2.secondaries.push({
          chance: 100,
          boosts: {
            spe: -2
          }
        });
      }
    },
    secondary: null,
    target: "normal"
  },
  yoshisisland: {
    name: "Yoshi's Island",
    type: "Normal",
    category: "Physical",
    basePower: 180,
    accuracy: 100,
    pp: 5,
    shortDesc: "Hits all adjacent Pokemon. User faints and gains 3 Fishing Tokens.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    selfdestruct: "always",
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Explosion", target);
    },
    onAfterHit(target, source2) {
      source2.side.addFishingTokens(3);
    },
    onAfterSubDamage(damage, target, source2) {
      source2.side.addFishingTokens(3);
    },
    secondary: null,
    target: "normal"
  },
  fuckaroundandfindout: {
    name: "Fuck Around and Find Out",
    type: "Silly",
    category: "Physical",
    basePower: 120,
    accuracy: 100,
    pp: 15,
    shortDesc: "Has 50% recoil unless it KOs the target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    recoil: [1, 2],
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      const moves = this.dex.moves.all();
      this.add("-anim", pokemon, this.sample(moves).name, target);
    },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("fuckaroundandfindout");
    },
    condition: {
      duration: 1,
      noCopy: true,
      onSourceDamagingHit(damage, target, source2, move2) {
        if (target.hp <= 0) {
          source2.addVolatile("ability:rockhead");
        }
      },
      onEnd(pokemon) {
        pokemon.removeVolatile("ability:rockhead");
      }
    },
    secondary: null,
    target: "normal"
  },
  "5bigdooms": {
    accuracy: 100,
    basePower: 28,
    category: "Special",
    name: "5 Big Dooms",
    shortDesc: "Hits 5 times, 2 turns after being used.",
    pp: 5,
    priority: 0,
    flags: { metronome: 1, futuremove: 1 },
    onTry(source2, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "5bigdooms",
        source: source2,
        moveData: {
          id: "5bigdooms",
          name: "5 Big Dooms",
          accuracy: 100,
          basePower: 28,
          category: "Special",
          priority: 0,
          flags: { metronome: 1, futuremove: 1 },
          multihit: 5,
          effectType: "Move",
          type: "Dark"
        }
      });
      this.add("-start", source2, "5 Big Dooms");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  snagphone: {
    name: "Snag Phone",
    type: "Lemon",
    category: "Physical",
    basePower: 20,
    accuracy: 100,
    pp: 20,
    shortDesc: "Steals the target's item if user is not holding one. User switches out.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
    selfSwitch: true,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Thief", target);
    },
    onAfterHit(target, source2, move2) {
      if (source2.item || source2.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source2);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source2, target, move2, yourItem) || !source2.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-enditem", target, yourItem, "[silent]", "[from] move: Snag Phone", "[of] " + source2);
      this.add("-item", source2, yourItem, "[from] move: Snag Phone", "[of] " + target);
    },
    secondary: null,
    target: "normal"
  },
  //slate 10
  lemonthrow: {
    name: "Lemon Throw",
    type: "Lemon",
    category: "Physical",
    basePower: 25,
    accuracy: 90,
    pp: 10,
    shortDesc: "Hits 2-5 times.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Rock Blast", target);
    },
    secondary: null,
    target: "normal"
  },
  eatmyshorts: {
    name: "Eat My Shorts!",
    type: "Lemon",
    category: "Special",
    basePower: 85,
    accuracy: 100,
    pp: 10,
    shortDesc: "For 2 turns, the target cannot use status moves.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Taunt", target);
    },
    condition: {
      duration: 2,
      onStart(target) {
        if (target.activeTurns && !this.queue.willMove(target)) {
          this.effectState.duration++;
        }
        this.add("-start", target, "move: Taunt");
      },
      onResidualOrder: 15,
      onEnd(target) {
        this.add("-end", target, "move: Taunt");
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          const move2 = this.dex.moves.get(moveSlot.id);
          if (move2.category === "Status" && move2.id !== "mefirst") {
            pokemon.disableMove(moveSlot.id);
          }
        }
      },
      onBeforeMovePriority: 5,
      onBeforeMove(attacker, defender, move2) {
        if (!move2.isZ && !move2.isMax && move2.category === "Status" && move2.id !== "mefirst") {
          this.add("cant", attacker, "move: Taunt", move2);
          return false;
        }
      }
    },
    secondary: {
      chance: 100,
      onHit(target) {
        target.addVolatile("eatmyshorts");
      }
    },
    target: "normal"
  },
  citrusrend: {
    name: "Citrus Rend",
    type: "Lemon",
    category: "Physical",
    basePower: 70,
    basePowerCallback(pokemon, target, move2) {
      if (target.newlySwitched || this.queue.willMove(target)) {
        this.debug("Fishious Rend damage boost");
        return move2.basePower * 2;
      }
      this.debug("Fishious Rend NOT boosted");
      return move2.basePower;
    },
    accuracy: 100,
    pp: 15,
    shortDesc: "Doubled power if user moves before the target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, bite: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Fishious Rend", target);
    },
    secondary: null,
    target: "normal"
  },
  decoyanvil: {
    name: "Decoy Anvil",
    type: "Silly",
    category: "Special",
    basePower: 110,
    accuracy: 100,
    pp: 10,
    shortDesc: "Lowers user's Sp. Atk by 1.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Rock Tomb", target);
      this.add("-anim", pokemon, "Core Enforcer", target);
    },
    self: {
      boosts: {
        spa: -1
      }
    },
    secondary: null,
    target: "normal"
  },
  anvildrop: {
    name: "Anvil Drop",
    type: "Steel",
    category: "Physical",
    basePower: 80,
    accuracy: 100,
    pp: 5,
    shortDesc: "Hits in 2 turns. Sets Stealth Rock.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    ignoreImmunity: true,
    onTry(source2, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "anvildrop",
        source: source2,
        moveData: {
          id: "anvildrop",
          name: "Anvil Drop",
          accuracy: 100,
          basePower: 80,
          category: "Physical",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Steel",
          onAfterHit(target2, source3, move2) {
            if (!move2.hasSheerForce && source3.hp) {
              for (const side of source3.side.foeSidesWithConditions()) {
                side.addSideCondition("stealthrock");
              }
            }
          },
          onAfterSubDamage(damage, target2, source3, move2) {
            if (!move2.hasSheerForce && source3.hp) {
              for (const side of source3.side.foeSidesWithConditions()) {
                side.addSideCondition("stealthrock");
              }
            }
          }
        }
      });
      this.add("-start", source2, "move: Future Sight");
      return this.NOT_FAIL;
    },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Doom Desire", target);
    },
    secondary: null,
    target: "normal"
  },
  fishield: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fishield",
    shortDesc: "Protects from moves. Attack: +1 Fishing Token.",
    pp: 10,
    priority: 4,
    flags: { metronome: 1, noassist: 1, failcopycat: 1, fishing: 1 },
    stallingMove: true,
    volatileStatus: "fishield",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
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
      onTryHit(target, source2, move2) {
        if (!move2.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move2.id))
            return;
          if (move2.isZ || move2.isMax)
            target.getMoveHitData(move2).zBrokeProtect = true;
          return;
        }
        if (move2.smartTarget) {
          move2.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (move2.category !== "Status") {
          target.side.addFishingTokens(1);
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move2) {
        if (move2.isZOrMaxPowered) {
          target.side.addFishingTokens(1);
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Water"
  },
  floatsamhook: {
    name: "Floatsam Hook",
    type: "Water",
    category: "Physical",
    basePower: 75,
    accuracy: 100,
    pp: 10,
    shortDesc: "Has +1 crit ratio for each user's Fishing Token.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Liquidation", target);
    },
    onModifyMove(move2, pokemon) {
      move2.critRatio = pokemon.side.fishingTokens;
    },
    secondary: null,
    target: "normal"
  },
  youwantfun: {
    name: "You Want Fun?!",
    type: "Dark",
    category: "Physical",
    basePower: 65,
    accuracy: 95,
    pp: 10,
    shortDesc: "Forces the target to switch to a random ally.",
    priority: -6,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    forceSwitch: true,
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Pursuit", target);
    },
    secondary: null,
    target: "normal"
  },
  abominationsjig: {
    name: "Abomination's Jig",
    type: "Silly",
    category: "Physical",
    basePower: 80,
    accuracy: 100,
    pp: 10,
    shortDesc: "30% chance to inflict Insanity on the target.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, dance: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Teeter Dance", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "insanity"
    },
    target: "normal"
  },
  catchysong: {
    name: "Catchy Song",
    type: "Silly",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 10,
    shortDesc: "Inflicts the target with Insanity.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Sing", target);
    },
    volatileStatus: "insanity",
    secondary: null,
    target: "normal"
  },
  bravestbird: {
    name: "Bravest Bird",
    type: "Flying",
    category: "Physical",
    basePower: 150,
    accuracy: 100,
    pp: 1,
    noPPBoosts: true,
    shortDesc: "Has 50% recoil. 10% chance to burn.",
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    recoil: [1, 2],
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Brave Bird", target);
    },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal"
  },
  bloomdesire: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Bloom Desire",
    shortDesc: "2 turns: 2/3 of user's max HP is restored, cure status.",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    slotCondition: "bloomdesire",
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Wish", target);
    },
    condition: {
      onStart(pokemon, source2) {
        this.effectState.hp = source2.maxhp * 2 / 3;
        this.effectState.turns = 2;
      },
      onResidualOrder: 4,
      onResidual(side) {
        if (this.effectState.turns === 0)
          side.removeSlotCondition(this.getAtSlot(this.effectState.sourceSlot), "bloomdesire");
        else
          this.effectState.turns--;
      },
      onEnd(target) {
        if (target && !target.fainted) {
          const damage = this.heal(this.effectState.hp, target, target);
          if (damage) {
            this.add("-heal", target, target.getHealth, "[from] move: Bloom Desire", "[wisher] " + this.effectState.source.name);
            target.cureStatus();
          }
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  acidrain: {
    name: "Acid Rain",
    type: "Lemon",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 5,
    shortDesc: "For 5 turns, the weather becomes Acid Rain.",
    priority: 0,
    flags: { protect: 1, metronome: 1 },
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Rain Dance", target);
    },
    weather: "acidrain",
    secondary: null,
    target: "all"
  },
  makelemonade: {
    name: "Make Lemonade",
    type: "Lemon",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 5,
    shortDesc: "Heals a weather-dependent amount. Lemon-type removed until turn ends.",
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "acidrain":
          factor = 0.667;
          break;
        case "sunnyday":
        case "desolateland":
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snowscape":
        case "graveyard":
          factor = 0.333;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    self: {
      volatileStatus: "makelemonade"
    },
    condition: {
      duration: 1,
      onResidualOrder: 25,
      onStart(target) {
        if (target.terastallized) {
          if (target.hasType("Lemon")) {
            this.add("-hint", "If a Terastallized Pokemon uses Make Lemonade, it remains Lemon-type.");
          }
          return false;
        }
        this.add("-singleturn", target, "move: Make Lemonade");
      },
      onTypePriority: -1,
      onType(types, pokemon) {
        this.effectState.typeWas = types;
        return types.filter((type) => type !== "Lemon");
      }
    },
    secondary: null,
    target: "self"
  },
  fishmortar: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Fish Mortar",
    shortDesc: "Hits two turns after being used.",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, metronome: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source2, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "fishmortar",
        source: source2,
        moveData: {
          id: "fishmortar",
          name: "Fish Mortar",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Water"
        }
      });
      this.add("-start", source2, "move: Fish Mortar");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Clever"
  },
  stealthanvils: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stealth Anvils",
    shortDesc: "Flattens the opponent upon entry.",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1, snatch: 1 },
    sideCondition: "stealthanvils",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Stealth Anvils");
      },
      onEntryHazard(pokemon) {
        this.add("-message", `${pokemon.name} was flattened!`);
        pokemon.addVolatile("flattened");
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Steel",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  //silly shit
  attract: {
    inherit: true,
    type: "Silly"
  },
  bind: {
    inherit: true,
    type: "Silly"
  },
  confide: {
    inherit: true,
    type: "Silly"
  },
  confuseray: {
    inherit: true,
    type: "Silly"
  },
  constrict: {
    inherit: true,
    type: "Silly"
  },
  doubleslap: {
    inherit: true,
    type: "Silly"
  },
  faketears: {
    inherit: true,
    type: "Silly"
  },
  flatter: {
    inherit: true,
    type: "Silly"
  },
  growl: {
    inherit: true,
    type: "Silly"
  },
  harden: {
    inherit: true,
    type: "Silly"
  },
  healblock: {
    inherit: true,
    type: "Silly"
  },
  lick: {
    inherit: true,
    type: "Silly"
  },
  lovelykiss: {
    inherit: true,
    type: "Silly"
  },
  milkdrink: {
    inherit: true,
    type: "Silly"
  },
  mindreader: {
    inherit: true,
    type: "Silly"
  },
  pounce: {
    inherit: true,
    type: "Silly"
  },
  rocksmash: {
    inherit: true,
    type: "Silly"
  },
  roleplay: {
    inherit: true,
    type: "Silly"
  },
  skittersmack: {
    inherit: true,
    type: "Silly"
  },
  sleeptalk: {
    inherit: true,
    type: "Silly"
  },
  smackdown: {
    inherit: true,
    type: "Silly"
  },
  snarl: {
    inherit: true,
    type: "Silly"
  },
  submission: {
    inherit: true,
    type: "Silly"
  },
  swagger: {
    inherit: true,
    type: "Silly"
  },
  swallow: {
    inherit: true,
    type: "Silly"
  },
  sweetkiss: {
    inherit: true,
    type: "Silly"
  },
  tickle: {
    inherit: true,
    type: "Silly"
  },
  topsyturvy: {
    inherit: true,
    type: "Silly"
  },
  //disaster shit
  rockslide: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  earthquake: {
    inherit: true,
    flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1 }
  },
  magnitude: {
    inherit: true,
    flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1 }
  },
  muddywater: {
    inherit: true,
    flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1 }
  },
  surf: {
    inherit: true,
    flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1 }
  },
  hurricane: {
    inherit: true,
    flags: { protect: 1, mirror: 1, distance: 1, wind: 1, metronome: 1, disaster: 1 },
    onModifyMove(move2, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
          move2.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
        case "acidrain":
          move2.accuracy = 50;
          break;
      }
    }
  },
  thunder: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 },
    onModifyMove(move2, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
          move2.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
        case "acidrain":
          move2.accuracy = 50;
          break;
      }
    }
  },
  blizzard: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 },
    onModifyMove(move2, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "hail":
        case "snow":
          move2.accuracy = true;
          break;
        case "acidrain":
          move2.accuracy = 50;
          break;
      }
    }
  },
  dracometeor: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  heatwave: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 }
  },
  inferno: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  eruption: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  avalanche: {
    inherit: true,
    flags: { protect: 1, mirror: 1, contact: 1, metronome: 1, disaster: 1 }
  },
  whirlwind: {
    inherit: true,
    flags: { reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, noassist: 1, failcopycat: 1, wind: 1, disaster: 1 }
  },
  bleakwindstorm: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 }
  },
  sandsearstorm: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 }
  },
  wildboltstorm: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 }
  },
  lavaplume: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  twister: {
    inherit: true,
    flags: { protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1 }
  },
  magmastorm: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, disaster: 1 }
  },
  //foot shit
  axekick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  blazekick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  doublekick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  highjumpkick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  jumpkick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  megakick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  pyroball: {
    inherit: true,
    flags: { protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  stomp: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  stompingtantrum: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  thunderouskick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  triplekick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  tropkick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  rollingkick: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  lowsweep: {
    inherit: true,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1 }
  },
  //fake moves
  abomacarespikes: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aboma Care Spikes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    sideCondition: "abomacarespikes",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Aboma Care Spikes", "[silent]");
      },
      onEntryHazard(pokemon) {
        this.heal(pokemon.maxhp / 4);
        pokemon.side.removeSideCondition("abomacarespikes");
        this.add("-sideend", pokemon.side, "move: Aboma Care Spikes", "[of] " + pokemon, "[silent]");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  madnesscounter: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Madness Counter",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    sideCondition: "madnesscounter",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Madness Counter");
      },
      onEntryHazard(pokemon) {
        if (pokemon.baseSpecies.diamondHand) {
          if (pokemon.hasAbility("stillwater"))
            pokemon.side.addFishingTokens(3);
          else {
            const bestStat = pokemon.getBestStat(true, true);
            this.boost({ [bestStat]: 1 }, pokemon);
          }
          pokemon.side.removeSideCondition("madnesscounter");
          this.add("-sideend", pokemon.side, "move: Madness Counter", "[of] " + pokemon);
        }
      }
    },
    secondary: null,
    target: "allySide",
    type: "Psychic",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  clownnose: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Clown Nose",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    volatileStatus: "clownnose",
    condition: {
      onStart(pokemon) {
        this.add("-message", `${pokemon.name} grew a clown nose!`);
        this.add("-start", pokemon, "Clown Nose", "[silent]");
      }
    },
    secondary: null,
    target: "normal",
    type: "Silly"
  },
  fish: {
    name: "Fish",
    type: "Water",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 1,
    shortDesc: "Designates Fish Pokemon",
    viable: false,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "", target);
    },
    secondary: null,
    target: "normal"
  },
  diamondhand: {
    name: "Diamond Hand",
    type: "Normal",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 1,
    shortDesc: "Designates Diamond Hand Pokemon",
    viable: false,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "", target);
    },
    secondary: null,
    target: "normal"
  },
  hoenn: {
    name: "Hoenn",
    type: "Dragon",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 1,
    shortDesc: "Designates Hoenn Pokemon",
    viable: false,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "", target);
    },
    secondary: null,
    target: "normal"
  },
  trans: {
    name: "Trans",
    type: "Normal",
    category: "Status",
    basePower: 0,
    accuracy: true,
    pp: 1,
    shortDesc: "Designates Trans Pokemon",
    viable: false,
    priority: 0,
    flags: {},
    onPrepareHit(target, pokemon, move2) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "", target);
    },
    secondary: null,
    target: "normal"
  },
  insanity: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Insanity",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    volatileStatus: "insanity",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Insanity", "[silent]");
      },
      onAfterMove(source2, target, move2) {
        if (move2.category !== "Status")
          this.actions.useMove("chaospotion", source2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Silly"
  },
  //vanilla moves
  naturepower: {
    inherit: true,
    onTryHit(target, pokemon) {
      let move2 = "triattack";
      if (this.field.isTerrain("electricterrain")) {
        move2 = "thunderbolt";
      } else if (this.field.isTerrain("grassyterrain")) {
        move2 = "energyball";
      } else if (this.field.isTerrain("mistyterrain")) {
        move2 = "moonblast";
      } else if (this.field.isTerrain("psychicterrain")) {
        move2 = "psychic";
      } else if (this.field.isTerrain("fishingterrain")) {
        move2 = "fishingminigame";
      } else if (this.field.isTerrain("frigidterrain")) {
        move2 = "icebeam";
      }
      this.actions.useMove(move2, pokemon, { target });
      return null;
    }
  },
  secretpower: {
    inherit: true,
    onModifyMove(move2, pokemon) {
      if (this.field.isTerrain(""))
        return;
      move2.secondaries = [];
      if (this.field.isTerrain("electricterrain")) {
        move2.secondaries.push({
          chance: 30,
          status: "par"
        });
      } else if (this.field.isTerrain("grassyterrain")) {
        move2.secondaries.push({
          chance: 30,
          status: "slp"
        });
      } else if (this.field.isTerrain("mistyterrain")) {
        move2.secondaries.push({
          chance: 30,
          boosts: {
            spa: -1
          }
        });
      } else if (this.field.isTerrain("psychicterrain")) {
        move2.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("fishingterrain")) {
        move2.secondaries.push({
          chance: 100,
          onHit(target, source2, move3) {
            source2.side.addFishingTokens(1);
          }
        });
      } else if (this.field.isTerrain("frigidterrain")) {
        move2.secondaries.push({
          chance: 30,
          status: "frz"
        });
      }
    }
  },
  terrainpulse: {
    inherit: true,
    onModifyType(move2, pokemon) {
      if (!pokemon.isGrounded())
        return;
      switch (this.field.terrain) {
        case "electricterrain":
          move2.type = "Electric";
          break;
        case "grassyterrain":
          move2.type = "Grass";
          break;
        case "mistyterrain":
          move2.type = "Fairy";
          break;
        case "psychicterrain":
          move2.type = "Psychic";
          break;
        case "fishingterrain":
          move2.type = "Water";
          break;
        case "frigidterrain":
          move2.type = "Ice";
          break;
      }
    }
  },
  firepledge: {
    inherit: true,
    isViable: true,
    shortDesc: "Sets Rainbow if Fishing Terrain is active.",
    onModifyMove(move2) {
      if (this.field.isTerrain("fishingterrain"))
        move2.sideCondition = "waterpledge";
    }
  },
  grasspledge: {
    inherit: true,
    isViable: true,
    shortDesc: "Sets Swamp if Fishing Terrain is active.",
    onModifyMove(move2) {
      if (this.field.isTerrain("fishingterrain"))
        move2.sideCondition = "grasspledge";
    }
  },
  skydrop: {
    inherit: true,
    onTry(source2, target) {
      return !target.fainted && !target.volatiles["bigbutton"];
    }
  },
  blazingtorque: {
    inherit: true,
    isNonstandard: null
  },
  wickedtorque: {
    inherit: true,
    isNonstandard: null
  },
  combattorque: {
    inherit: true,
    isNonstandard: null
  },
  noxioustorque: {
    inherit: true,
    isNonstandard: null
  },
  magicaltorque: {
    inherit: true,
    isNonstandard: null
  },
  gmaxcuddle: null,
  weatherball: {
    inherit: true,
    onModifyType(move2, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move2.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move2.type = "Water";
          break;
        case "sandstorm":
          move2.type = "Rock";
          break;
        case "hail":
        case "snow":
          move2.type = "Ice";
          break;
        case "graveyard":
          move2.type = "Ghost";
          break;
        case "acidrain":
          move2.type = "Lemon";
          break;
      }
    },
    onModifyMove(move2, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move2.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move2.basePower *= 2;
          break;
        case "sandstorm":
          move2.basePower *= 2;
          break;
        case "hail":
        case "snow":
          move2.basePower *= 2;
          break;
        case "graveyard":
          move2.basePower *= 2;
          break;
        case "acidrain":
          move2.basePower *= 2;
          break;
      }
      this.debug("BP: " + move2.basePower);
    }
  },
  morningsun: {
    inherit: true,
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
        case "snow":
        case "graveyard":
        case "acidrain":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  synthesis: {
    inherit: true,
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
        case "snow":
        case "graveyard":
        case "acidrain":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  moonlight: {
    inherit: true,
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
        case "graveyard":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snow":
        case "acidrain":
          factor = 0.25;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    }
  },
  stockpile: {
    inherit: true,
    condition: {
      noCopy: true,
      onStart(target, source2, effect) {
        this.effectState.layers = 1;
        this.effectState.def = 0;
        this.effectState.spd = 0;
        this.add("-start", target, "stockpile" + this.effectState.layers);
        if (effect.id === "fisheater")
          return;
        const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
        this.boost({ def: 1, spd: 1 }, target, target);
        if (curDef !== target.boosts.def)
          this.effectState.def--;
        if (curSpD !== target.boosts.spd)
          this.effectState.spd--;
      },
      onRestart(target, source2, effect) {
        if (this.effectState.layers >= 3)
          return false;
        this.effectState.layers++;
        this.add("-start", target, "stockpile" + this.effectState.layers);
        if (effect.id === "fisheater")
          return;
        const curDef = target.boosts.def;
        const curSpD = target.boosts.spd;
        this.boost({ def: 1, spd: 1 }, target, target);
        if (curDef !== target.boosts.def)
          this.effectState.def--;
        if (curSpD !== target.boosts.spd)
          this.effectState.spd--;
      },
      onEnd(target) {
        if (this.effectState.def || this.effectState.spd) {
          const boosts = {};
          if (this.effectState.def)
            boosts.def = this.effectState.def;
          if (this.effectState.spd)
            boosts.spd = this.effectState.spd;
          this.boost(boosts, target, target);
        }
        this.add("-end", target, "Stockpile");
        if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
          this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
        }
      }
    }
  },
  solarbeam: {
    inherit: true,
    onBasePower(basePower2, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  solarblade: {
    inherit: true,
    onBasePower(basePower2, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  lightofruin: {
    inherit: true,
    isNonstandard: null
  },
  baddybad: {
    inherit: true,
    isNonstandard: null
  },
  fling: {
    inherit: true,
    onModifyPriority(priority, source2, target, move2) {
      if (source2.ignoringItem())
        return;
      const item = source2.getItem();
      if (item.fling.priority) {
        return item.fling.priority;
      }
    },
    onPrepareHit(target, source2, move2) {
      if (source2.ignoringItem())
        return false;
      const item = source2.getItem();
      if (!this.singleEvent("TakeItem", item, source2.itemState, source2, source2, move2, item))
        return false;
      if (!item.fling)
        return false;
      move2.basePower = item.fling.basePower;
      if (item.fling.damageCallback)
        move2.damageCallback = item.fling.damageCallback;
      if (item.fling.multihit)
        move2.multihit = item.fling.multihit;
      if (item.fling.priority)
        move2.priority = item.fling.priority;
      if (item.fling.type)
        move2.type = item.fling.type;
      this.debug("BP: " + move2.basePower);
      if (item.isBerry) {
        move2.onHit = function(foe) {
          if (this.singleEvent("Eat", item, null, foe, null, null)) {
            this.runEvent("EatItem", foe, null, null, item);
            if (item.id === "leppaberry")
              foe.staleness = "external";
          }
          if (item.onEat)
            foe.ateBerry = true;
        };
      } else if (item.fling.effect) {
        move2.onHit = item.fling.effect;
      } else {
        if (!move2.secondaries) {
          move2.secondaries = [];
          if (item.fling.status) {
            move2.secondaries.push({ status: item.fling.status });
          } else if (item.fling.volatileStatus) {
            move2.secondaries.push({ volatileStatus: item.fling.volatileStatus });
          } else if (item.fling.secondaries) {
            move2.secondaries.push(item.fling.secondary);
          }
        }
      }
      source2.addVolatile("fling");
    }
  },
  gravity: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasAbility("persistent")) {
          this.add("-activate", source2, "ability: Persistent", "[move] Gravity");
          return 7;
        }
        if (source2?.hasItem("spacejamdvd")) {
          this.add("-message", `${source2.name} is ballin!`);
          return 8;
        }
        return 5;
      },
      onFieldStart(target, source2) {
        if (source2?.hasAbility("persistent")) {
          this.add("-fieldstart", "move: Gravity", "[persistent]");
        } else {
          this.add("-fieldstart", "move: Gravity");
        }
        for (const pokemon of this.getAllActive()) {
          let applies = false;
          if (pokemon.removeVolatile("bounce") || pokemon.removeVolatile("fly")) {
            applies = true;
            this.queue.cancelMove(pokemon);
            pokemon.removeVolatile("twoturnmove");
          }
          if (pokemon.volatiles["skydrop"]) {
            applies = true;
            this.queue.cancelMove(pokemon);
            if (pokemon.volatiles["skydrop"].source) {
              this.add("-end", pokemon.volatiles["twoturnmove"].source, "Sky Drop", "[interrupt]");
            }
            pokemon.removeVolatile("skydrop");
            pokemon.removeVolatile("twoturnmove");
          }
          if (pokemon.volatiles["magnetrise"]) {
            applies = true;
            delete pokemon.volatiles["magnetrise"];
          }
          if (pokemon.volatiles["telekinesis"]) {
            applies = true;
            delete pokemon.volatiles["telekinesis"];
          }
          if (applies)
            this.add("-activate", pokemon, "move: Gravity");
        }
      },
      onModifyAccuracy(accuracy) {
        if (typeof accuracy !== "number")
          return;
        return this.chainModify([6840, 4096]);
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          if (this.dex.moves.get(moveSlot.id).flags["gravity"]) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      },
      // groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
      onBeforeMovePriority: 6,
      onBeforeMove(pokemon, target, move2) {
        if (move2.flags["gravity"] && !move2.isZ) {
          this.add("cant", pokemon, "move: Gravity", move2);
          return false;
        }
      },
      onModifyMove(move2, pokemon, target) {
        if (move2.flags["gravity"] && !move2.isZ) {
          this.add("cant", pokemon, "move: Gravity", move2);
          return false;
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 2,
      onFieldEnd() {
        this.add("-fieldend", "move: Gravity");
      }
    }
  },
  magicroom: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasAbility("persistent")) {
          this.add("-activate", source2, "ability: Persistent", "[move] Magic Room");
          return 7;
        }
        if (source2?.hasItem("spacejamdvd")) {
          this.add("-message", `${source2.name} is ballin!`);
          return 8;
        }
        return 5;
      },
      onFieldStart(target, source2) {
        if (source2?.hasAbility("persistent")) {
          this.add("-fieldstart", "move: Magic Room", `[of] ${source2}`, "[persistent]");
        } else {
          this.add("-fieldstart", "move: Magic Room", `[of] ${source2}`);
        }
        for (const mon of this.getAllActive()) {
          this.singleEvent("End", mon.getItem(), mon.itemState, mon);
        }
      },
      onFieldRestart(target, source2) {
        this.field.removePseudoWeather("magicroom");
      },
      // Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 6,
      onFieldEnd() {
        this.add("-fieldend", "move: Magic Room", "[of] " + this.effectState.source);
      }
    }
  },
  wonderroom: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(source2, effect) {
        if (source2?.hasAbility("persistent")) {
          this.add("-activate", source2, "ability: Persistent", "[move] Wonder Room");
          return 7;
        }
        if (source2?.hasItem("spacejamdvd")) {
          this.add("-message", `${source2.name} is ballin!`);
          return 8;
        }
        return 5;
      },
      onModifyMove(move2, source2, target) {
        if (!move2.overrideOffensiveStat)
          return;
        const statAndBoosts = move2.overrideOffensiveStat;
        if (!["def", "spd"].includes(statAndBoosts))
          return;
        move2.overrideOffensiveStat = statAndBoosts === "def" ? "spd" : "def";
        this.hint(`${move2.name} uses ${statAndBoosts === "def" ? "" : "Sp. "}Def boosts when Wonder Room is active.`);
      },
      onFieldStart(field, source2) {
        if (source2?.hasAbility("persistent")) {
          this.add("-fieldstart", "move: Wonder Room", `[of] ${source2}`, "[persistent]");
        } else {
          this.add("-fieldstart", "move: Wonder Room", `[of] ${source2}`);
        }
      },
      onFieldRestart(target, source2) {
        this.field.removePseudoWeather("wonderroom");
      },
      // Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 5,
      onFieldEnd() {
        this.add("-fieldend", "move: Wonder Room");
      }
    }
  },
  reflect: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("lightclay")) {
          return 8;
        }
        if (source2?.hasAbility("timebomb")) {
          return 10;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source2, target, move2) {
        if (target !== source2 && this.effectState.target.hasAlly(target) && this.getCategory(move2) === "Physical") {
          if (!target.getMoveHitData(move2).crit && !move2.infiltrates) {
            this.debug("Reflect weaken");
            if (this.activePerHalf > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "Reflect");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 1,
      onSideEnd(side) {
        this.add("-sideend", side, "Reflect");
      }
    }
  },
  lightscreen: {
    inherit: true,
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("lightclay")) {
          return 8;
        }
        if (source2?.hasAbility("timebomb")) {
          return 10;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source2, target, move2) {
        if (target !== source2 && this.effectState.target.hasAlly(target) && this.getCategory(move2) === "Special") {
          if (!target.getMoveHitData(move2).crit && !move2.infiltrates) {
            this.debug("Light Screen weaken");
            if (this.activePerHalf > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Light Screen");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Light Screen");
      }
    }
  },
  metronome: {
    inherit: true,
    onAfterMove(pokemon) {
      if (pokemon && pokemon.hp && pokemon.lastMove === "metronome" && pokemon.item === "metronome") {
        if (!pokemon.metronome)
          pokemon.metronome = 0;
        pokemon.metronome++;
      } else
        pokemon.metronome = 0;
    }
  },
  sunnyday: {
    inherit: true,
    weather: null,
    onHitField(target, source2) {
      if (this.field.isTerrain("fishingterrain")) {
        this.add("-message", "The fishing terrain blocked out the sun!");
        return false;
      }
      this.field.setWeather("sunnyday");
    }
  }
};
//# sourceMappingURL=moves.js.map
