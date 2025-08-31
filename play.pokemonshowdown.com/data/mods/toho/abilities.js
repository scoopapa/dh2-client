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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  /*
  placeholder: {
  	
  	flags: {},
  	name: "",
  	shortDesc: "",
  },
  */
  hakkero: {
    //effect in conditions.ts
    flags: {},
    name: "Hakkero",
    shortDesc: "Fire moves not weakened by Rain."
  },
  darkborder: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fairy" || move.type === "Fire") {
        this.debug("Dark Border weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fairy" || move.type === "Fire") {
        this.debug("Dark Border weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Dark Border",
    shortDesc: "Fairy and Fire damage taken is halved."
  },
  mistystep: {
    onModifySpe(spe) {
      if (this.field.isTerrain("mistyterrain")) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Misty Step",
    shortDesc: "Speed is doubled in Misty Terrain."
  },
  anemic: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.category === "Special") {
        for (const moveSlot of attacker.moveSlots) {
          if (moveSlot.id == move.id)
            moveSlot.pp--;
        }
        return this.chainModify(1.2);
      }
    },
    flags: {},
    name: "Anemic",
    shortDesc: "Special moves have 1.2x power, cost 2 PP."
  },
  maidstrick: {
    onModifyPriority(priority, pokemon2, target, move) {
      if (move.flags["slicing"] && pokemon2.hp === pokemon2.maxhp)
        return priority + 1;
    },
    flags: {},
    name: "Maid's Trick",
    shortDesc: "Slicing moves have priority at full HP."
  },
  vampirism: {
    onModifyMove(move) {
      if (move.flags["bite"]) {
        move.drain || (move.drain = [1, 4]);
      }
    },
    flags: {},
    name: "Vampirism",
    shortDesc: "Biting moves drain 25% of damage dealt."
  },
  illusorybacking: {
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"] && attacker !== this.effectState.target) {
        this.debug("Power Spot boost");
        return this.chainModify([5325, 4096]);
      }
    },
    flags: {},
    name: "Illusory Backing",
    shortDesc: "Allies' Sound moves have 1.3x power."
  },
  netherworldsspring: {
    onResidual(pokemon2) {
      console.log(this.field.weather + " " + pokemon2.hp + " " + pokemon2.baseMaxhp);
      if (pokemon2.hp && pokemon2.hp < pokemon2.baseMaxhp && this.field.isWeather("snow")) {
        if (this.field.clearWeather())
          this.heal(pokemon2.baseMaxhp / 3);
      }
    },
    flags: {},
    name: "Netherworld's Spring",
    shortDesc: "Clears Snow at the end of each turn to heal by 33%."
  },
  demonparade: {
    onModifySpe(spe, pokemon2) {
      if (pokemon2.adjacentFoes().length == 0)
        return;
      let target = this.sample(pokemon2.adjacentFoes());
      if (target.status === "brn") {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Demon Parade",
    shortDesc: "Speed is doubled if an opponent is burned."
  },
  nightsong: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon2) {
      if (move.flags["sound"] && !pokemon2.volatiles["dynamax"]) {
        move.type = "Dark";
      }
    },
    flags: {},
    name: "Night Song",
    shortDesc: "Sound moves become Dark-Type."
  },
  werehakutaku: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move" && source.species.id === "keine") {
        source.formeChange("Keine-Hakutaku", this.effect, true);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Were-Hakutaku",
    shortDesc: "Transforms Keine into Keine-Hakutaku after KO-ing an opponent."
  },
  brainofthemoon: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Psychic" || move.type === "Dark") {
        this.debug("Brain of the Moon weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Psychic" || move.type === "Dark") {
        this.debug("Brain of the Moon weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Brain of the Moon",
    shortDesc: "Dark and Psychic damage taken is halved."
  },
  blackandwhite: {
    // CHECK IF THIS WORKS
    onModifyDamage(damage, source, target, move) {
      if (move && target.getMoveHitData(move).typeMod > 0) {
        return this.chainModify(1.5);
      } else if (move && target.getMoveHitData(move).typeMod < 0) {
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Black and White",
    shortDesc: "Super effective moves deal 1.5x damage, not very effective deals half."
  },
  cursegathering: {
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.category !== "Status" || move.flags["pledgecombo"])
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Curse Gathering");
        }
        return this.effectState.target;
      }
    },
    flags: {},
    name: "Curse Gathering",
    shortDesc: "Redirects status moves targeting an ally to the user instead."
  },
  swordofhisou: {
    onStart(pokemon2) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon2);
    },
    onWeatherChange(pokemon2) {
      if (pokemon2.effectiveWeather()) {
        pokemon2.addVolatile("ability:swordofruin");
      } else {
        pokemon2.removeVolatile("ability:swordofruin");
      }
    },
    flags: {},
    name: "Sword of Hisou",
    shortDesc: "Activate Sword of Ruin while a weather effect is active."
  },
  dexterity: {
    onDamage(damage, target, source, effect) {
      if (effect && ["stealthrock", "spikes", "gmaxsteelsurge"].includes(effect.id)) {
        return false;
      }
    },
    flags: {},
    name: "Dexterity",
    shortDesc: "Immunity to entry hazards."
  },
  jealous: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.target === "normal" || move.target === "any") {
        return this.chainModify(Math.min(2, 1 + 0.1 * defender.positiveBoosts()));
      }
    },
    flags: {},
    name: "Jealous",
    shortDesc: "Gain 10% extra damage per increased stat stage on the opponent, max 100%."
  },
  recollection: {
    onSwitchIn(source) {
      const target = source.side.foe.active[source.side.foe.active.length - 1 - source.position];
      if (target) {
        for (let i = 0; i < Math.min(target.moveSlots.length, 4); i++) {
          const moveSlot = target.moveSlots[i];
          if (source.moveSlots.filter((m) => m.id === moveSlot.id).length)
            continue;
          if (moveSlot === null)
            break;
          this.attrLastMove("[still]");
          if (source.moveSlots.length < 0)
            return;
          const learnedMove = {
            move: this.dex.moves.get(moveSlot.id),
            id: moveSlot.id,
            pp: 5,
            maxpp: 5,
            target: moveSlot.target,
            disabled: false,
            used: false
          };
          source.moveSlots[source.moveSlots.length] = learnedMove;
        }
      }
    },
    flags: {},
    name: "Recollection",
    shortDesc: "On switch-in, learn the opponent's moves in addition to your own."
  },
  delusion: {
    onResidual(pokemon2) {
      if (pokemon2.volatiles["confusion"] || this.field.isTerrain("psychicterrain")) {
        this.heal(pokemon2.baseMaxhp / 8);
      }
    },
    flags: {},
    name: "Delusion",
    shortDesc: "Heal 12.5% at the end of each turn while confused or in psychic terrain."
  },
  surprise: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon2, "Surprise", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"] || target.hasType("Psychic")) {
          this.add("-immune", target);
        } else {
          this.boost({ spa: -1 }, target, pokemon2, null, true);
        }
      }
    },
    flags: {},
    name: "Surprise",
    shortDesc: "On switch-in, lower opponent's Sp. Atk. by 1 stage, Psychic-Types are immune."
  },
  summonnyuudou: {
    onSwitchOut(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Ichirin Kumoi")
        return;
      if (pokemon2.species.forme !== "Unzan") {
        pokemon2.formeChange("Ichirin and Unzan", this.effect, true);
        pokemon2.set.ability = "Iron Fist";
      }
    },
    onSwitchIn(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Ichirin Kumoi")
        return;
      if (!this.effectState.heroMessageDisplayed && pokemon2.species.forme === "Ichirin and Unzan") {
        this.add("-activate", pokemon2, "ability: Summon Nyuudou");
        this.effectState.heroMessageDisplayed = true;
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
    name: "Summon Nyuudou",
    shortDesc: "Transforms Ichirin Kumoi into Ichirin and Unzan when switching out."
  },
  waterygrave: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.field.setWeather("raindance");
      }
    },
    flags: {},
    name: "Watery Grave",
    shortDesc: "Summons Rain for 5 turns after KO-ing an opponent."
  },
  devilsrecitation: {
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Dark" && this.field.isTerrain("psychicterrain")) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Devil's Recitation",
    shortDesc: "Dark-Type moves have 1.5x power in Psychic Terrain."
  },
  undefineddefense: {
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === target.hpType) {
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Undefined Defense",
    shortDesc: "Halves damage taken from moves of the Pok\xE9mon's hidden power type."
  },
  echo: {
    onTryHit(target, source, move) {
      if (target !== source && move.flags["sound"]) {
        this.add("-immune", target, "[from] ability: Echo");
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (move.flags["sound"]) {
        this.add("-immune", this.effectState.target, "[from] ability: Echo");
      }
    },
    // echo part implemented in runMove in scripts/actions
    flags: {},
    name: "Echo",
    shortDesc: "Sound immunity, repeats sound moves used."
  },
  healbydesire: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Ghost") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Heal by Desire");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Heal by Desire",
    shortDesc: "Ghost immunity, heals 25% when hit by Ghost."
  },
  "100medicines": {
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon2) {
      if (pokemon2.status && this.field.isTerrain("grassyterrain")) {
        this.add("-activate", pokemon2, "ability: 100 Medicines");
        pokemon2.cureStatus();
      }
    },
    flags: {},
    name: "100 Medicines",
    shortDesc: "Heals status conditions at the end of the turn while in grassy terrain."
  },
  wickedpower: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Wicked Power boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Wicked Power boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Wicked Power",
    shortDesc: "Dark-Type moves are 1.5x stronger while under 33% HP."
  },
  growbigger: {
    //effects in scripts/battle, pokemon, etc
    flags: {},
    name: "Grow Bigger",
    shortDesc: "Once per battle the pok\xE9mon can Dynamax for one turn."
  },
  pristinebeat: {
    onStart(pokemon2) {
      pokemon2.addVolatile("pristinebeat");
    },
    condition: {
      onStart(pokemon2) {
        this.effectState.lastMove = "";
        this.effectState.numConsecutive = 0;
      },
      onTryMovePriority: -2,
      onTryMove(pokemon2, target, move) {
        if (!pokemon2.hasAbility("pristinebeat")) {
          pokemon2.removeVolatile("pristinebeat");
          return;
        }
        if (move.callsMove)
          return;
        if (this.effectState.lastMove === move.id && pokemon2.moveLastTurnResult) {
          this.effectState.numConsecutive++;
        } else if (pokemon2.volatiles["twoturnmove"]) {
          if (this.effectState.lastMove !== move.id) {
            this.effectState.numConsecutive = 1;
          } else {
            this.effectState.numConsecutive++;
          }
        } else {
          this.effectState.numConsecutive = 0;
        }
        this.effectState.lastMove = move.id;
      },
      onModifyDamage(damage, source, target, move) {
        const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
        const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
        this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}/4096`);
        return this.chainModify([dmgMod[numConsecutive], 4096]);
      }
    },
    flags: {},
    name: "Pristine Beat",
    shortDesc: "Moves used multiple times in a row get 20% stronger up to a 100% boost."
  },
  dangoinfluence: {
    onEatItem(item, pokemon2) {
      this.boost({ atk: 1 }, pokemon2);
    },
    flags: {},
    name: "Dango Influence",
    shortDesc: "Consuming a berry increases Atk. by one stage."
  },
  lunatictorch: {
    //effects in pokemon/effectiveWeather
    flags: {},
    name: "Lunatic Torch",
    shortDesc: "Gain the effects of Sun while in Psychic Terrain."
  },
  foolsgold: {
    onTryHit(target, source, move) {
      if (move.category === "Status" && target !== source) {
        this.add("-immune", target, "[from] ability: Fool's Gold");
        target.setAbility("defeatist");
        return null;
      }
    },
    flags: {},
    name: "Fool's Gold",
    shortDesc: "Immunity to Status moves, changes to Defeatist after activating."
  },
  cutdeep: {
    onSourceDamagingHit(damage, target, source, move) {
      if (!move.flags["slicing"] || target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      this.boost({ def: -1 }, target, source);
    },
    flags: {},
    name: "Cut Deep",
    shortDesc: "Slicing moves lower the target's Def. by one stage."
  },
  winterhearth: {
    onBasePower(basePower, attacker, defender, move) {
      if (["snowscape"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Winter Hearth",
    shortDesc: "Fire moves are twice as powerful during Snow."
  },
  fourseasons: {
    onSwitchInPriority: -2,
    onStart(pokemon2) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon2);
    },
    onWeatherChange(pokemon2) {
      switch (pokemon2.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          pokemon2.setType(["Fire", "Dark"]);
          break;
        case "raindance":
        case "primordialsea":
          pokemon2.setType(["Water", "Dark"]);
          break;
        case "sandstorm":
          pokemon2.setType(["Rock", "Dark"]);
          break;
        case "hail":
        case "snowscape":
          pokemon2.setType(["Ice", "Dark"]);
          break;
        default:
          pokemon2.setType(["Normal", "Dark"]);
          break;
      }
    },
    flags: { failroleplay: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Four Seasons",
    shortDesc: "Okina Matara's primary typing changes to match the weather."
  },
  heavystone: {
    onStart(source) {
      this.add("-activate", source, "ability: Heavy Stone");
      this.field.addPseudoWeather("gravity");
    },
    flags: {},
    name: "Heavy Stone",
    shortDesc: "On switch-in, sets Gravity for 5 turns."
  },
  marchingorders: {
    onAllyAfterMove(ally) {
      if (!ally.lastMove || ally.lastMove.priority > 0)
        return;
      const pokemon2 = this.effectState.target;
      if (!pokemon2)
        return;
      const action = this.queue.willMove(pokemon2);
      if (action) {
        this.add("-activate", pokemon2, "ability: Marching Orders");
        this.queue.prioritizeAction(action);
      } else {
        return;
      }
    },
    flags: {},
    name: "Marching Orders",
    shortDesc: "The Pok\xE9mon takes its turn immediately after an ally attacks, excludes priority moves."
  },
  blacksmoke: {
    onAnyTryBoost(boost, target, source, effect) {
      if (target === this.effectState.target || !target.runStatusImmunity("powder"))
        return;
      let showMsg = false;
      let i;
      for (i in boost) {
        if (boost[i] > 0) {
          delete boost[i];
          showMsg = true;
        }
      }
      if (showMsg && !effect.secondaries && effect.id !== "octolock") {
        this.add("-fail", target, "boost", "[from] ability: Black Smoke", `[of] ${this.effectState.target}`);
      }
    },
    flags: {},
    name: "Black Smoke",
    shortDesc: "Other Pok\xE9mon on the field cannot have their stats increased unless immune to Powder."
  },
  property: {
    onTakeItem(item, pokemon2, source) {
      if (!this.activeMove)
        throw new Error("Battle.activeMove is null");
      if (!pokemon2.hp || pokemon2.item === "stickybarb")
        return;
      if (source && source !== pokemon2 || this.activeMove.id === "knockoff") {
        this.add("-activate", pokemon2, "ability: Property");
        return false;
      }
    },
    flags: { breakable: 1 },
    name: "Property",
    shortDesc: "Prevents the Pok\xE9mon's item from being removed."
  },
  dragoneater: {
    onBasePower(basePower, attacker, defender, move) {
      if (defender.hasType("Dragon")) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Dragon Eater",
    shortDesc: "Attacks deal 1.5x damage against Dragon-Types."
  },
  bloodsucker: {
    onAfterMoveSecondarySelf(pokemon2, target, move) {
      if (move.flags["contact"] && (!target || target.fainted || target.hp <= 0))
        pokemon2.heal(pokemon2.baseMaxhp / 3);
    },
    flags: {},
    name: "Bloodsucker",
    shortDesc: "KO-ing an opponent with a contact move heals 33%."
  },
  void: {
    onSwitchIn(pokemon2) {
      for (const foe of pokemon2.foes()) {
        if (!foe.getAbility().flags["cantsuppress"])
          foe.addVolatile("gastroacid");
      }
    },
    flags: {},
    name: "Void",
    shortDesc: "On switch-in, opponent's abilities are suppressed."
  },
  cactusdrive: {
    //this is just copied from Quark with the word changed to cactus
    onStart(pokemon2) {
      this.singleEvent("TerrainChange", this.effect, this.effectState, pokemon2);
    },
    onTerrainChange(pokemon2) {
      if (this.field.isTerrain("grassyterrain")) {
        pokemon2.addVolatile("cactusdrive");
      } else if (!pokemon2.volatiles["cactusdrive"]?.fromBooster) {
        pokemon2.removeVolatile("cactusdrive");
      }
    },
    onEnd(pokemon2) {
      delete pokemon2.volatiles["cactusdrive"];
      this.add("-end", pokemon2, "Cactus Drive", "[silent]");
    },
    condition: {
      noCopy: true,
      onStart(pokemon2, source, effect) {
        if (effect?.name === "Booster Energy") {
          this.effectState.fromBooster = true;
          this.add("-activate", pokemon2, "ability: Cactus Drive", "[fromitem]");
        } else {
          this.add("-activate", pokemon2, "ability: Cactus Drive");
        }
        this.effectState.bestStat = pokemon2.getBestStat(false, true);
        this.add("-start", pokemon2, "cactusdrive" + this.effectState.bestStat);
      },
      onModifyAtkPriority: 5,
      onModifyAtk(atk, pokemon2) {
        if (this.effectState.bestStat !== "atk" || pokemon2.ignoringAbility())
          return;
        this.debug("Cactus Drive atk boost");
        return this.chainModify([5325, 4096]);
      },
      onModifyDefPriority: 6,
      onModifyDef(def, pokemon2) {
        if (this.effectState.bestStat !== "def" || pokemon2.ignoringAbility())
          return;
        this.debug("Cactus Drive def boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpAPriority: 5,
      onModifySpA(spa, pokemon2) {
        if (this.effectState.bestStat !== "spa" || pokemon2.ignoringAbility())
          return;
        this.debug("Cactus Drive spa boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpDPriority: 6,
      onModifySpD(spd, pokemon2) {
        if (this.effectState.bestStat !== "spd" || pokemon2.ignoringAbility())
          return;
        this.debug("Cactus Drive spd boost");
        return this.chainModify([5325, 4096]);
      },
      onModifySpe(spe, pokemon2) {
        if (this.effectState.bestStat !== "spe" || pokemon2.ignoringAbility())
          return;
        this.debug("Cactus Drive spe boost");
        return this.chainModify(1.5);
      },
      onEnd(pokemon2) {
        this.add("-end", pokemon2, "cactusdriveatk", "[silent]");
        this.add("-end", pokemon2, "cactusdrivedef", "[silent]");
        this.add("-end", pokemon2, "cactusdrivespa", "[silent]");
        this.add("-end", pokemon2, "cactusdrivespd", "[silent]");
        this.add("-end", pokemon2, "cactusdrivespe", "[silent]");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
    name: "Cactus Drive",
    shortDesc: "Grassy Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed."
  }
};
//# sourceMappingURL=abilities.js.map
