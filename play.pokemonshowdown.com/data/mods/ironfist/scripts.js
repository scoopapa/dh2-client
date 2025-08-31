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
var import_dex = require("../../../sim/dex");
const Scripts = {
  gen: 9,
  teambuilderConfig: {
    // for micrometas to only show custom tiers
    excludeStandardTiers: true,
    // only to specify the order of custom tiers
    customTiers: ["Viable", "Untested", "Unviable"]
  },
  init() {
    for (const pokemon in import_dex.Dex.data.Pokedex) {
      if (pokemon in import_dex.Dex.data.Learnsets && this.modData("Learnsets", pokemon).learnset) {
        this.modData("Learnsets", pokemon).learnset.fishingterrain = ["9L1"];
        this.modData("Learnsets", pokemon).learnset.holdhands = ["9L1"];
        this.modData("Learnsets", pokemon).learnset.mewing = ["9L1"];
        this.modData("Learnsets", pokemon).learnset.epicbeam = ["9L1"];
        this.modData("Learnsets", pokemon).learnset.bigbash = ["9L1"];
        const mon = import_dex.Dex.species.get(pokemon);
        if (!mon.types.includes("Water") && !mon.types.includes("Steel"))
          this.modData("Learnsets", pokemon).learnset.fisheater = ["9L1"];
        if (mon.fish)
          this.modData("Learnsets", pokemon).learnset.fish = ["9L1"];
        if (mon.diamondhand)
          this.modData("Learnsets", pokemon).learnset.diamondhand = ["9L1"];
        if (mon.hoenn || mon.gen === 3)
          this.modData("Learnsets", pokemon).learnset.hoenn = ["9L1"];
        if (mon.trans)
          this.modData("Learnsets", pokemon).learnset.trans = ["9L1"];
      }
    }
  },
  battle: {
    runAction(action) {
      const pokemonOriginalHP = action.pokemon?.hp;
      let residualPokemon = [];
      console.log(action);
      switch (action.choice) {
        case "start": {
          for (const side of this.sides) {
            if (side.pokemonLeft)
              side.pokemonLeft = side.pokemon.length;
          }
          this.add("start");
          for (const pokemon of this.getAllPokemon()) {
            let rawSpecies = null;
            if (pokemon.species.id === "zacian" && pokemon.item === "rustedsword") {
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
              pokemon.baseMoveSlots[ironHead] = {
                move: move.name,
                id: move.id,
                pp: move.noPPBoosts || move.isZ ? move.pp : move.pp * 8 / 5,
                maxpp: move.noPPBoosts || move.isZ ? move.pp : move.pp * 8 / 5,
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
              if (!side.pokemonLeft) {
                side.active[i] = side.pokemon[i];
                side.active[i].fainted = true;
                side.active[i].hp = 0;
              } else {
                this.actions.switchIn(side.pokemon[i], i);
              }
            }
          }
          for (const pokemon of this.getAllPokemon()) {
            this.singleEvent("Start", this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
          }
          this.midTurn = true;
          break;
        }
        case "move":
          if (!action.pokemon.isActive)
            return false;
          if (action.pokemon.fainted)
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
        case "megaEvoX":
          this.actions.runMegaEvoX?.(action.pokemon);
          break;
        case "megaEvoY":
          this.actions.runMegaEvoY?.(action.pokemon);
          break;
        case "runDynamax":
          action.pokemon.addVolatile("bigbutton");
          action.pokemon.side.dynamaxUsed = false;
          if (action.pokemon.side.allySide)
            action.pokemon.side.allySide.dynamaxUsed = false;
          break;
        case "terastallize":
          this.actions.terastallize(action.pokemon);
          break;
        case "beforeTurnMove":
          if (!action.pokemon.isActive)
            return false;
          if (action.pokemon.fainted)
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
          if (!action.pokemon.isActive)
            return false;
          if (action.pokemon.fainted)
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
          if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === "pursuitfaint") {
            if (this.gen <= 4) {
              this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
              action.priority = -101;
              this.queue.unshift(action);
              break;
            } else {
              this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
              break;
            }
          }
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
          action.target.fainted = false;
          action.target.faintQueued = false;
          action.target.subFainted = false;
          action.target.status = "";
          action.target.hp = 1;
          action.target.sethp(action.target.maxhp / 2);
          this.add("-heal", action.target, action.target.getHealth, "[from] move: Revival Blessing");
          action.pokemon.side.removeSlotCondition(action.pokemon, "revivalblessing");
          break;
        case "epicbeam":
          console.log("runaction: " + action.target.position + " " + action.pokemon.side.active.length);
          action.pokemon.side.pokemonLeft--;
          if (action.target.position < action.pokemon.side.active.length) {
            this.queue.addChoice({
              choice: "instaswitch",
              pokemon: action.target,
              target: action.target
            });
          }
          action.target.fainted = true;
          this.add("-faint", action.target, "[from] move: Epic Beam");
          action.pokemon.side.removeSlotCondition(action.pokemon, "epicbeam");
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
          if (!action.pokemon.isActive)
            return false;
          if (action.pokemon.fainted)
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
          if (pokemon.forceSwitchFlag) {
            if (pokemon.hp)
              this.actions.dragIn(pokemon.side, pokemon.position);
            pokemon.forceSwitchFlag = false;
          }
        }
      }
      this.clearActiveMove();
      this.faintMessages();
      if (this.ended)
        return true;
      if (!this.queue.peek() || this.gen <= 3 && ["move", "residual"].includes(this.queue.peek().choice)) {
        this.checkFainted();
      } else if (["megaEvo", "megaEvoX", "megaEvoY"].includes(action.choice) && this.gen === 7) {
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
      if (this.gen >= 5) {
        this.eachEvent("Update");
        for (const [pokemon, originalHP] of residualPokemon) {
          const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
          if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
            this.runEvent("EmergencyExit", pokemon);
          }
        }
      }
      if (action.choice === "runSwitch") {
        const pokemon = action.pokemon;
        if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP > pokemon.maxhp / 2) {
          this.runEvent("EmergencyExit", pokemon);
        }
      }
      const switches = this.sides.map(
        (side) => side.active.some((pokemon) => pokemon && !!pokemon.switchFlag)
      );
      for (let i = 0; i < this.sides.length; i++) {
        let reviveSwitch = false;
        if (switches[i] && !this.canSwitch(this.sides[i])) {
          for (const pokemon of this.sides[i].active) {
            if (this.sides[i].slotConditions[pokemon.position]["revivalblessing"]) {
              reviveSwitch = true;
              continue;
            }
            pokemon.switchFlag = false;
          }
          if (!reviveSwitch)
            switches[i] = false;
        } else if (switches[i]) {
          for (const pokemon of this.sides[i].active) {
            if (pokemon.hp && pokemon.switchFlag && pokemon.switchFlag !== "revivalblessing" && !pokemon.skipBeforeSwitchOutEventFlag) {
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
      for (const playerSwitch of switches) {
        if (playerSwitch) {
          this.makeRequest("switch");
          return true;
        }
      }
      if (this.gen < 5)
        this.eachEvent("Update");
      if (this.gen >= 8 && (this.queue.peek()?.choice === "move" || this.queue.peek()?.choice === "runDynamax")) {
        this.updateSpeed();
        for (const queueAction of this.queue.list) {
          if (queueAction.pokemon)
            this.getActionSpeed(queueAction);
        }
        this.queue.sort();
      }
      return false;
    },
    heal(damage, target, source = null, effect = null) {
      if (this.event) {
        target || (target = this.event.target);
        source || (source = this.event.source);
        effect || (effect = this.effect);
      }
      if (effect === "drain")
        effect = this.dex.conditions.getByID(effect);
      if (damage && damage <= 1)
        damage = 1;
      damage = this.trunc(damage);
      damage = this.runEvent("TryHeal", target, source, effect, damage);
      if (!damage)
        return damage;
      if (!target?.hp)
        return false;
      if (!target.isActive)
        return false;
      if (target.hp >= target.maxhp)
        return false;
      const finalDamage = target.heal(damage, source, effect);
      switch (effect?.id) {
        case "leechseed":
        case "rest":
          this.add("-heal", target, target.getHealth, "[silent]");
          break;
        case "drain":
          this.add("-heal", target, target.getHealth, "[from] drain", "[of] " + source);
          break;
        case "wish":
          break;
        case "zpower":
          this.add("-heal", target, target.getHealth, "[zeffect]");
          break;
        default:
          if (!effect)
            break;
          if (effect.effectType === "Move") {
            this.add("-heal", target, target.getHealth);
          } else if (source && source !== target) {
            this.add("-heal", target, target.getHealth, "[from] " + effect.fullname, "[of] " + source);
          } else {
            this.add("-heal", target, target.getHealth, "[from] " + effect.fullname);
          }
          break;
      }
      this.runEvent("Heal", target, source, effect, finalDamage);
      target.addVolatile("healed");
      return finalDamage;
    }
  },
  queue: {
    resolveAction(action, midTurn = false) {
      if (!action)
        throw new Error(`Action not passed to resolveAction`);
      if (action.choice === "pass")
        return [];
      const actions = [action];
      if (!action.side && action.pokemon)
        action.side = action.pokemon.side;
      if (!action.move && action.moveid)
        action.move = this.battle.dex.getActiveMove(action.moveid);
      if (!action.order) {
        const orders = {
          team: 1,
          start: 2,
          instaswitch: 3,
          beforeTurn: 4,
          beforeTurnMove: 5,
          revivalblessing: 6,
          epicbeam: 6,
          runUnnerve: 100,
          runSwitch: 101,
          runPrimal: 102,
          switch: 103,
          megaEvo: 104,
          megaEvoX: 104,
          megaEvoY: 104,
          runDynamax: 105,
          terastallize: 106,
          priorityChargeMove: 107,
          shift: 200,
          // default is 200 (for moves)
          residual: 300
        };
        if (action.choice in orders) {
          action.order = orders[action.choice];
        } else {
          action.order = 200;
          if (!["move", "event"].includes(action.choice)) {
            throw new Error(`Unexpected orderless action ${action.choice}`);
          }
        }
      }
      if (!midTurn) {
        if (action.choice === "move") {
          if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
            actions.unshift(...this.resolveAction({
              choice: "beforeTurnMove",
              pokemon: action.pokemon,
              move: action.move,
              targetLoc: action.targetLoc
            }));
          }
          if (action.mega && !action.pokemon.isSkyDropped()) {
            actions.unshift(...this.resolveAction({
              choice: "megaEvo",
              pokemon: action.pokemon
            }));
          }
          if (action.megax && !action.pokemon.isSkyDropped()) {
            actions.unshift(...this.resolveAction({
              choice: "megaEvoX",
              pokemon: action.pokemon
            }));
          }
          if (action.megay && !action.pokemon.isSkyDropped()) {
            actions.unshift(...this.resolveAction({
              choice: "megaEvoY",
              pokemon: action.pokemon
            }));
          }
          if (action.terastallize && !action.pokemon.terastallized) {
            actions.unshift(...this.resolveAction({
              choice: "terastallize",
              pokemon: action.pokemon
            }));
          }
          if (action.maxMove && !action.pokemon.volatiles["dynamax"]) {
            actions.unshift(...this.resolveAction({
              choice: "runDynamax",
              pokemon: action.pokemon
            }));
          }
          if (!action.maxMove && !action.zmove && action.move.priorityChargeCallback) {
            actions.unshift(...this.resolveAction({
              choice: "priorityChargeMove",
              pokemon: action.pokemon,
              move: action.move
            }));
          }
          action.fractionalPriority = this.battle.runEvent("FractionalPriority", action.pokemon, null, action.move, 0);
        } else if (["switch", "instaswitch"].includes(action.choice)) {
          if (typeof action.pokemon.switchFlag === "string") {
            action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag);
          }
          action.pokemon.switchFlag = false;
        }
      }
      const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== "done";
      if (action.move) {
        let target = null;
        action.move = this.battle.dex.getActiveMove(action.move);
        if (!action.targetLoc) {
          target = this.battle.getRandomTarget(action.pokemon, action.move);
          if (target)
            action.targetLoc = action.pokemon.getLocOf(target);
        }
        action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
      }
      if (!deferPriority)
        this.battle.getActionSpeed(action);
      return actions;
    }
  },
  actions: {
    canTerastallize(pokemon) {
      if (pokemon.getItem().zMove || pokemon.canMegaEvo || this.dex.gen !== 9 || pokemon.volatiles["bigbutton"]) {
        return null;
      }
      return pokemon.teraType;
    },
    terastallize(pokemon) {
      if (pokemon.volatiles["bigbutton"])
        return;
      if (pokemon.illusion && ["Ogerpon", "Terapagos"].includes(pokemon.illusion.species.baseSpecies)) {
        this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
      }
      let type = pokemon.teraType;
      let canTera = false;
      if (pokemon.set.ability === "I Love Fishing") {
        canTera = true;
        type = "Water";
      }
      if (pokemon.set.ability === "Racer's Spirit") {
        canTera = true;
        type = "Steel";
      }
      if (type === "Bug" || canTera) {
        this.battle.add("-terastallize", pokemon, type);
        pokemon.terastallized = type;
        for (const ally of pokemon.side.pokemon) {
          if (ally.teraType === "Bug")
            ally.canTerastallize = null;
        }
        pokemon.addedType = "";
        pokemon.knownType = true;
        pokemon.apparentType = type;
        if (pokemon.species.baseSpecies === "Ogerpon") {
          const tera = pokemon.species.id === "ogerpon" ? "tealtera" : "tera";
          pokemon.formeChange(pokemon.species.id + tera, null, true);
        }
        if (pokemon.species.name === "Terapagos-Terastal" && type === "Stellar") {
          pokemon.formeChange("Terapagos-Stellar", null, true);
          pokemon.baseMaxhp = Math.floor(Math.floor(
            2 * pokemon.species.baseStats["hp"] + pokemon.set.ivs["hp"] + Math.floor(pokemon.set.evs["hp"] / 4) + 100
          ) * pokemon.level / 100 + 10);
          const newMaxHP = pokemon.baseMaxhp;
          pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
          pokemon.maxhp = newMaxHP;
          this.battle.add("-heal", pokemon, pokemon.getHealth, "[silent]");
        }
        this.battle.runEvent("AfterTerastallization", pokemon);
      } else
        pokemon.addVolatile("bigbutton");
    },
    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
      const tr = this.battle.trunc;
      if (!move.type)
        move.type = "???";
      const type = move.type;
      baseDamage += 2;
      if (move.spreadHit) {
        const spreadModifier = move.spreadModifier || (this.battle.gameType === "freeforall" ? 0.5 : 0.75);
        this.battle.debug("Spread modifier: " + spreadModifier);
        baseDamage = this.battle.modify(baseDamage, spreadModifier);
        if (move.multihitType === "bestfriends") {
          this.battle.debug("Best Friends modifier: 0.33");
          baseDamage = this.battle.modify(baseDamage, 0.33);
        }
      } else if (move.multihitType === "parentalbond" && move.hit > 1) {
        const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
        this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
        baseDamage = this.battle.modify(baseDamage, bondModifier);
      } else if (move.multihitType === "bestfriends") {
        this.battle.debug("Best Friends modifier: 0.33");
        baseDamage = this.battle.modify(baseDamage, 0.33);
      }
      baseDamage = this.battle.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
      const isCrit = target.getMoveHitData(move).crit;
      if (isCrit) {
        baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
      }
      baseDamage = this.battle.randomizer(baseDamage);
      if (type !== "???") {
        let stab = 1;
        const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
        if (isSTAB) {
          stab = 1.5;
        }
        if (pokemon.terastallized === "Stellar") {
          if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
            stab = isSTAB ? 2 : [4915, 4096];
            move.stellarBoosted = true;
            if (pokemon.species.name !== "Terapagos-Stellar") {
              pokemon.stellarBoostedTypes.push(type);
            }
          }
        } else {
          if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
            stab = 2;
          }
          stab = this.battle.runEvent("ModifySTAB", pokemon, target, move, stab);
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
      }
      if (typeMod < 0) {
        if (!suppressMessages)
          this.battle.add("-resisted", target);
        for (let i = 0; i > typeMod; i--) {
          baseDamage = tr(baseDamage / 2);
        }
      }
      if (isCrit && !suppressMessages)
        this.battle.add("-crit", target);
      if (pokemon.status === "brn" && move.category === "Physical" && !pokemon.hasAbility("guts")) {
        if (this.battle.gen < 6 || move.id !== "facade") {
          baseDamage = this.battle.modify(baseDamage, 0.5);
        }
      }
      if (this.battle.gen === 5 && !baseDamage)
        baseDamage = 1;
      baseDamage = this.battle.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
        baseDamage = this.battle.modify(baseDamage, 0.25);
        this.battle.add("-zbroken", target);
      }
      if (this.battle.gen !== 5 && !baseDamage)
        return 1;
      return tr(baseDamage, 16);
    },
    getZMove(move, pokemon, skipChecks) {
      const Z_MOVES = {
        Poison: "Acid Downpour",
        Fighting: "All-Out Pummeling",
        Dark: "Black Hole Eclipse",
        Grass: "Bloom Doom",
        Normal: "Breakneck Blitz",
        Rock: "Continental Crush",
        Steel: "Corkscrew Crash",
        Dragon: "Devastating Drake",
        Electric: "Gigavolt Havoc",
        Water: "Hydro Vortex",
        Fire: "Inferno Overdrive",
        Ghost: "Never-Ending Nightmare",
        Bug: "Savage Spin-Out",
        Psychic: "Shattered Psyche",
        Ice: "Subzero Slammer",
        Flying: "Supersonic Skystrike",
        Ground: "Tectonic Rage",
        Fairy: "Twinkle Tackle",
        Stellar: "Tera Triple Basedball Barrage"
      };
      const item = pokemon.getItem();
      if (!skipChecks) {
        if (pokemon.side.zMoveUsed)
          return;
        if (!item.zMove)
          return;
        if (item.itemUser && !item.itemUser.includes(pokemon.species.name))
          return;
        const moveData = pokemon.getMoveData(move);
        if (!moveData?.pp)
          return;
      }
      if (item.zMoveFrom) {
        if (move.name === item.zMoveFrom)
          return item.zMove;
      } else if (item.zMove === true) {
        if (move.type === item.zMoveType || item.name === "Stellarium Z") {
          if (move.category === "Status") {
            return move.name;
          } else if (move.zMove?.basePower) {
            if (item.name === "Stellarium Z")
              return "Tera Triple Basedball Barrage";
            else
              return Z_MOVES[move.type];
          }
        }
      }
    },
    getActiveZMove(move, pokemon) {
      const Z_MOVES = {
        Poison: "Acid Downpour",
        Fighting: "All-Out Pummeling",
        Dark: "Black Hole Eclipse",
        Grass: "Bloom Doom",
        Normal: "Breakneck Blitz",
        Rock: "Continental Crush",
        Steel: "Corkscrew Crash",
        Dragon: "Devastating Drake",
        Electric: "Gigavolt Havoc",
        Water: "Hydro Vortex",
        Fire: "Inferno Overdrive",
        Ghost: "Never-Ending Nightmare",
        Bug: "Savage Spin-Out",
        Psychic: "Shattered Psyche",
        Ice: "Subzero Slammer",
        Flying: "Supersonic Skystrike",
        Ground: "Tectonic Rage",
        Fairy: "Twinkle Tackle",
        Stellar: "Tera Triple Basedball Barrage"
      };
      let item;
      if (pokemon) {
        item = pokemon.getItem();
        if (move.name === item.zMoveFrom) {
          const zMove2 = this.dex.getActiveMove(item.zMove);
          zMove2.isZOrMaxPowered = true;
          return zMove2;
        }
      }
      if (move.category === "Status") {
        const zMove2 = this.dex.getActiveMove(move);
        zMove2.isZ = true;
        zMove2.isZOrMaxPowered = true;
        return zMove2;
      }
      let zMove = this.dex.getActiveMove(Z_MOVES[move.type]);
      if (item && item.name === "Stellarium Z")
        zMove = this.dex.getActiveMove("Tera Triple Basedball Barrage");
      zMove.basePower = move.zMove.basePower;
      zMove.category = move.category;
      zMove.priority = move.priority;
      zMove.isZOrMaxPowered = true;
      return zMove;
    },
    canZMove(pokemon) {
      if (pokemon.side.zMoveUsed || pokemon.transformed && (pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
        return;
      const item = pokemon.getItem();
      if (!item.zMove)
        return;
      if (item.itemUser && !item.itemUser.includes(pokemon.species.name))
        return;
      let atLeastOne = false;
      let mustStruggle = true;
      const zMoves = [];
      for (const moveSlot of pokemon.moveSlots) {
        if (moveSlot.pp <= 0) {
          zMoves.push(null);
          continue;
        }
        if (!moveSlot.disabled) {
          mustStruggle = false;
        }
        const move = this.dex.moves.get(moveSlot.move);
        let zMoveName = this.getZMove(move, pokemon, true) || "";
        if (zMoveName) {
          const zMove = this.dex.moves.get(zMoveName);
          if (!zMove.isZ && zMove.category === "Status")
            zMoveName = "Z-" + zMoveName;
          zMoves.push({ move: zMoveName, target: zMove.target });
        } else {
          zMoves.push(null);
        }
        if (zMoveName)
          atLeastOne = true;
      }
      if (atLeastOne && !mustStruggle)
        return zMoves;
    },
    hitStepMoveHitLoop(targets, pokemon, move) {
      let damage = [];
      for (const i of targets.keys()) {
        damage[i] = 0;
      }
      move.totalDamage = 0;
      pokemon.lastDamage = 0;
      let targetHits = move.multihit || 1;
      if (Array.isArray(targetHits)) {
        if (targetHits[0] === 2 && targetHits[1] === 5) {
          if (this.battle.gen >= 5) {
            targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
            if (targetHits < 4 && pokemon.hasItem("loadeddice")) {
              targetHits = 5 - this.battle.random(2);
            }
          } else {
            targetHits = this.battle.sample([2, 2, 2, 3, 3, 3, 4, 5]);
          }
        } else {
          targetHits = this.battle.random(targetHits[0], targetHits[1] + 1);
        }
      }
      if (targetHits === 10 && pokemon.hasItem("loadeddice"))
        targetHits -= this.battle.random(7);
      targetHits = Math.floor(targetHits);
      let nullDamage = true;
      let moveDamage = [];
      const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;
      let targetsCopy = targets.slice(0);
      let hit;
      for (hit = 1; hit <= targetHits; hit++) {
        if (damage.includes(false))
          break;
        if (hit > 1 && pokemon.status === "slp" && (!isSleepUsable || this.battle.gen === 4))
          break;
        if (targets.every((target2) => !target2?.hp))
          break;
        move.hit = hit;
        if (move.smartTarget && targets.length > 1) {
          targetsCopy = [targets[hit - 1]];
          damage = [damage[hit - 1]];
        } else {
          targetsCopy = targets.slice(0);
        }
        const target = targetsCopy[0];
        if (target && typeof move.smartTarget === "boolean") {
          if (hit > 1) {
            this.battle.addMove("-anim", pokemon, move.name, target);
          } else {
            this.battle.retargetLastMove(target);
          }
        }
        if (target && move.multiaccuracy && hit > 1) {
          let accuracy = move.accuracy;
          const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
          if (accuracy !== true) {
            if (!move.ignoreAccuracy) {
              const boosts = this.battle.runEvent("ModifyBoost", pokemon, null, null, { ...pokemon.boosts });
              const boost = this.battle.clampIntRange(boosts["accuracy"], -6, 6);
              if (boost > 0) {
                accuracy *= boostTable[boost];
              } else {
                accuracy /= boostTable[-boost];
              }
            }
            if (!move.ignoreEvasion) {
              const boosts = this.battle.runEvent("ModifyBoost", target, null, null, { ...target.boosts });
              const boost = this.battle.clampIntRange(boosts["evasion"], -6, 6);
              if (boost > 0) {
                accuracy /= boostTable[boost];
              } else if (boost < 0) {
                accuracy *= boostTable[-boost];
              }
            }
          }
          accuracy = this.battle.runEvent("ModifyAccuracy", target, pokemon, move, accuracy);
          if (!move.alwaysHit) {
            accuracy = this.battle.runEvent("Accuracy", target, pokemon, move, accuracy);
            if (accuracy !== true && !this.battle.randomChance(accuracy, 100))
              break;
          }
        }
        const moveData = move;
        if (!moveData.flags)
          moveData.flags = {};
        let moveDamageThisHit;
        [moveDamageThisHit, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);
        if (move.smartTarget) {
          moveDamage.push(...moveDamageThisHit);
        } else {
          moveDamage = moveDamageThisHit;
        }
        if (!moveDamage.some((val) => val !== false))
          break;
        nullDamage = false;
        for (const [i, md] of moveDamage.entries()) {
          if (move.smartTarget && i !== hit - 1)
            continue;
          damage[i] = md === true || !md ? 0 : md;
          move.totalDamage += damage[i];
        }
        if (move.mindBlownRecoil) {
          const hpBeforeRecoil = pokemon.hp;
          this.battle.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
          move.mindBlownRecoil = false;
          if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
            this.battle.runEvent("EmergencyExit", pokemon, pokemon);
          }
        }
        this.battle.eachEvent("Update");
        if (!move.flags["futuremove"] && !pokemon.hp && targets.length === 1) {
          hit++;
          break;
        }
      }
      if (hit === 1)
        return damage.fill(false);
      if (nullDamage)
        damage.fill(false);
      this.battle.faintMessages(false, false, !pokemon.hp);
      if (move.multihit && typeof move.smartTarget !== "boolean") {
        this.battle.add("-hitcount", targets[0], hit - 1);
      }
      if ((move.recoil || move.id === "chloroblast") && move.totalDamage) {
        const hpBeforeRecoil = pokemon.hp;
        this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, "recoil");
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.battle.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
      if (move.struggleRecoil) {
        const hpBeforeRecoil = pokemon.hp;
        let recoilDamage;
        if (this.dex.gen >= 5) {
          recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
        } else {
          recoilDamage = this.battle.clampIntRange(this.battle.trunc(pokemon.maxhp / 4), 1);
        }
        this.battle.directDamage(recoilDamage, pokemon, pokemon, { id: "strugglerecoil" });
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.battle.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
      if (move.smartTarget) {
        targetsCopy = targets.slice(0);
      }
      for (const [i, target] of targetsCopy.entries()) {
        if (target && pokemon !== target) {
          target.gotAttacked(move, moveDamage[i], pokemon);
          if (typeof moveDamage[i] === "number") {
            target.timesAttacked += move.smartTarget ? 1 : hit - 1;
          }
        }
      }
      if (move.ohko && !targets[0].hp)
        this.battle.add("-ohko");
      if (!damage.some((val) => !!val || val === 0))
        return damage;
      this.battle.eachEvent("Update");
      this.afterMoveSecondaryEvent(targetsCopy.filter((val) => !!val), pokemon, move);
      if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility("sheerforce"))) {
        for (const [i, d] of damage.entries()) {
          const curDamage = targets.length === 1 ? move.totalDamage : d;
          if (typeof curDamage === "number" && targets[i].hp) {
            const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
            if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
              this.battle.runEvent("EmergencyExit", targets[i], pokemon);
            }
          }
        }
      }
      return damage;
    }
  },
  side: {
    //inherit: true,
    constructor(name, battle, sideNum, team) {
      const sideScripts = battle.dex.data.Scripts.side;
      if (sideScripts)
        Object.assign(this, sideScripts);
      this.battle = battle;
      this.id = ["p1", "p2", "p3", "p4"][sideNum];
      this.n = sideNum;
      this.name = name;
      this.avatar = "";
      this.team = team;
      this.pokemon = [];
      for (let i = 0; i < this.team.length && i < 24; i++) {
        this.pokemon.push(new Pokemon(this.team[i], this));
        this.pokemon[i].position = i;
      }
      switch (this.battle.gameType) {
        case "doubles":
          this.active = [null, null];
          break;
        case "triples":
        case "rotation":
          this.active = [null, null, null];
          break;
        default:
          this.active = [null];
      }
      this.pokemonLeft = this.pokemon.length;
      this.faintedLastTurn = null;
      this.faintedThisTurn = null;
      this.totalFainted = 0;
      this.zMoveUsed = false;
      this.dynamaxUsed = false;
      this.sideConditions = {};
      this.slotConditions = [];
      for (let i = 0; i < this.active.length; i++)
        this.slotConditions[i] = {};
      this.activeRequest = null;
      this.choice = {
        cantUndo: false,
        error: ``,
        actions: [],
        forcedSwitchesLeft: 0,
        forcedPassesLeft: 0,
        switchIns: /* @__PURE__ */ new Set(),
        zMove: false,
        mega: false,
        ultra: false,
        terastallize: false,
        dynamax: false
      };
      this.lastMove = null;
      this.fishingTokens = 0;
    },
    getChoice() {
      if (this.choice.actions.length > 1 && this.choice.actions.every((action) => action.choice === "team")) {
        return `team ` + this.choice.actions.map((action) => action.pokemon.position + 1).join(", ");
      }
      return this.choice.actions.map((action) => {
        switch (action.choice) {
          case "move":
            let details = ``;
            if (action.targetLoc && this.active.length > 1)
              details += ` ${action.targetLoc > 0 ? "+" : ""}${action.targetLoc}`;
            if (action.mega)
              details += action.pokemon.item === "ultranecroziumz" ? ` ultra` : ` mega`;
            if (action.zmove)
              details += ` zmove`;
            if (action.maxMove)
              details += ` dynamax`;
            if (action.terastallize)
              details += ` terastallize`;
            return `move ${action.moveid}${details}`;
          case "switch":
          case "instaswitch":
          case "revivalblessing":
          case "epicbeam":
            return `switch ${action.target.position + 1}`;
          case "team":
            return `team ${action.pokemon.position + 1}`;
          default:
            return action.choice;
        }
      }).join(", ");
    },
    chooseSwitch(slotText) {
      if (this.requestState !== "move" && this.requestState !== "switch") {
        return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
      }
      const index = this.getChoiceIndex();
      if (index >= this.active.length) {
        if (this.requestState === "switch") {
          return this.emitChoiceError(`Can't switch: You sent more switches than Pok\xE9mon that need to switch`);
        }
        return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pok\xE9mon`);
      }
      const pokemon = this.active[index];
      let slot;
      if (!slotText) {
        if (this.requestState !== "switch") {
          return this.emitChoiceError(`Can't switch: You need to select a Pok\xE9mon to switch in`);
        }
        if (this.slotConditions[pokemon.position]["revivalblessing"]) {
          slot = 0;
          while (!this.pokemon[slot].fainted)
            slot++;
        } else if (this.slotConditions[pokemon.position]["epicbeam"]) {
          slot = 0;
          while (this.pokemon[slot].fainted)
            slot++;
        } else {
          if (!this.choice.forcedSwitchesLeft)
            return this.choosePass();
          slot = this.active.length;
          while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted)
            slot++;
        }
      } else {
        slot = parseInt(slotText) - 1;
      }
      if (isNaN(slot) || slot < 0) {
        slot = -1;
        for (const [i, mon] of this.pokemon.entries()) {
          if (slotText.toLowerCase() === mon.name.toLowerCase() || toID(slotText) === mon.species.id) {
            slot = i;
            break;
          }
        }
        if (slot < 0) {
          return this.emitChoiceError(`Can't switch: You do not have a Pok\xE9mon named "${slotText}" to switch to`);
        }
      }
      if (slot >= this.pokemon.length) {
        return this.emitChoiceError(`Can't switch: You do not have a Pok\xE9mon in slot ${slot + 1} to switch to`);
      } else if (slot < this.active.length && !this.slotConditions[pokemon.position]["revivalblessing"]) {
        return this.emitChoiceError(`Can't switch: You can't switch to an active Pok\xE9mon`);
      } else if (slot < this.active.length && !this.slotConditions[pokemon.position]["epicbeam"]) {
        return this.emitChoiceError(`Can't switch: You can't switch to an active Pok\xE9mon`);
      } else if (this.choice.switchIns.has(slot)) {
        return this.emitChoiceError(`Can't switch: The Pok\xE9mon in slot ${slot + 1} can only switch in once`);
      }
      const targetPokemon = this.pokemon[slot];
      if (this.slotConditions[pokemon.position]["revivalblessing"]) {
        if (!targetPokemon.fainted) {
          return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pok\xE9mon`);
        }
        this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
        pokemon.switchFlag = false;
        this.choice.actions.push({
          choice: "revivalblessing",
          pokemon,
          target: targetPokemon
        });
        return true;
      }
      if (this.slotConditions[pokemon.position]["epicbeam"]) {
        if (targetPokemon.fainted) {
          return this.emitChoiceError(`Can't switch: You have to sacrifice an unfainted Pok\xE9mon`);
        }
        this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
        pokemon.switchFlag = false;
        this.battle.faint(targetPokemon, targetPokemon, this.battle.dex.moves.get("epicbeam"));
        this.choice.actions.push({
          choice: "epicbeam",
          pokemon,
          target: targetPokemon
        });
        return true;
      }
      if (targetPokemon.fainted) {
        return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pok\xE9mon`);
      }
      if (this.requestState === "move") {
        if (pokemon.trapped) {
          const includeRequest = this.updateRequestForPokemon(pokemon, (req) => {
            let updated = false;
            if (req.maybeTrapped) {
              delete req.maybeTrapped;
              updated = true;
            }
            if (!req.trapped) {
              req.trapped = true;
              updated = true;
            }
            return updated;
          });
          const status = this.emitChoiceError(`Can't switch: The active Pok\xE9mon is trapped`, includeRequest);
          if (includeRequest)
            this.emitRequest(this.activeRequest);
          return status;
        } else if (pokemon.maybeTrapped) {
          this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
        }
      } else if (this.requestState === "switch") {
        if (!this.choice.forcedSwitchesLeft) {
          throw new Error(`Player somehow switched too many Pokemon`);
        }
        this.choice.forcedSwitchesLeft--;
      }
      this.choice.switchIns.add(slot);
      this.choice.actions.push({
        choice: this.requestState === "switch" ? "instaswitch" : "switch",
        pokemon,
        target: targetPokemon
      });
      return true;
    },
    canDynamaxNow() {
      if (this.battle.gen === 9)
        return false;
      return true;
    },
    addFishingTokens(amount) {
      if (amount === 0 || Number.isNaN(amount))
        return false;
      if (this.fishingTokens === void 0)
        this.fishingTokens = 0;
      this.fishingTokens += amount;
      const word = amount === 1 ? "token was" : "tokens were";
      this.battle.add("-message", `${amount} fishing ${word} added to ${this.name}'s side!`);
      this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
    },
    removeFishingTokens(amount) {
      if (this.fishingTokens === void 0)
        this.fishingTokens = 0;
      if (amount === 0 || Number.isNaN(amount) || amount > this.fishingTokens)
        return false;
      this.fishingTokens -= amount;
      const word = amount === 1 ? "token was" : "tokens were";
      this.battle.add("-message", `${amount} fishing ${word} removed from ${this.name}'s side!`);
      this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
      if (this.battle.field.isWeather("acidrain"))
        this.removeFishingToken();
      return true;
    },
    removeFishingToken() {
      if (this.fishingTokens === void 0)
        this.fishingTokens = 0;
      if (this.fishingTokens < 1)
        return false;
      this.fishingTokens -= 1;
      this.battle.add("-message", `1 fishing token was removed from ${this.name}'s side!`);
      this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
      return true;
    },
    addSideCondition(status, source = null, sourceEffect = null) {
      if (!source && this.battle.event && this.battle.event.target)
        source = this.battle.event.target;
      if (source === "debug")
        source = this.active[0];
      if (!source)
        throw new Error(`setting sidecond without a source`);
      if (!source.getSlot)
        source = source.active[0];
      status = this.battle.dex.conditions.get(status);
      if (this.sideConditions[status.id]) {
        if (!status.onSideRestart)
          return false;
        return this.battle.singleEvent("SideRestart", status, this.sideConditions[status.id], this, source, sourceEffect);
      }
      this.sideConditions[status.id] = {
        id: status.id,
        target: this,
        source,
        sourceSlot: source.getSlot(),
        duration: status.duration
      };
      if (status.durationCallback) {
        this.sideConditions[status.id].duration = status.durationCallback.call(this.battle, this.active[0], source, sourceEffect);
      }
      if (source.hasAbility("unitedparty") && status.duration && source.copen)
        this.sideConditions[status.id].duration += status.id === "tailwind" ? Math.floor(source.copen / 2) : source.copen;
      if (!this.battle.singleEvent("SideStart", status, this.sideConditions[status.id], this, source, sourceEffect)) {
        delete this.sideConditions[status.id];
        return false;
      }
      this.battle.runEvent("SideConditionStart", source, source, status);
      return true;
    }
  },
  pokemon: {
    inherit: true,
    hasAbility(ability) {
      if (this.ignoringAbility())
        return false;
      if (Array.isArray(ability))
        return ability.some((abil) => this.hasAbility(abil));
      const abilityid = this.battle.toID(ability);
      return this.ability === abilityid || !!this.volatiles["ability:" + abilityid];
    },
    isGrounded(negateImmunity = false) {
      if ("gravity" in this.battle.field.pseudoWeather)
        return true;
      if ("ingrain" in this.volatiles && this.battle.gen >= 4)
        return true;
      if ("smackdown" in this.volatiles)
        return true;
      const item = this.ignoringItem() ? "" : this.item;
      if (item === "ironball" || item === "itemfist")
        return true;
      if (!negateImmunity && this.hasType("Flying") && !("roost" in this.volatiles))
        return false;
      if ((this.hasAbility("levitate") || this.hasAbility("impalpable")) && !this.battle.suppressingAbility(this))
        return null;
      if ("magnetrise" in this.volatiles)
        return false;
      if ("telekinesis" in this.volatiles)
        return false;
      return item !== "airballoon";
    }
  },
  field: {
    inherit: true,
    setWeather(status, source = null, sourceEffect = null) {
      console.log(status);
      status = this.battle.dex.conditions.get(status);
      if (!sourceEffect && this.battle.effect)
        sourceEffect = this.battle.effect;
      if (!source && this.battle.event && this.battle.event.target)
        source = this.battle.event.target;
      if (source === "debug")
        source = this.battle.sides[0].active[0];
      if (this.weather === status.id) {
        if (sourceEffect && sourceEffect.effectType === "Ability") {
          if (this.battle.gen > 5 || this.weatherState.duration === 0) {
            return false;
          }
        } else if (this.battle.gen > 2 || status.id === "sandstorm") {
          return false;
        }
      }
      if (source) {
        const result = this.battle.runEvent("SetWeather", source, source, status);
        if (!result) {
          if (result === false) {
            if (sourceEffect?.weather) {
              this.battle.add("-fail", source, sourceEffect, "[from] " + this.weather);
            } else if (sourceEffect && sourceEffect.effectType === "Ability") {
              this.battle.add("-ability", source, sourceEffect, "[from] " + this.weather, "[fail]");
            }
          }
          return null;
        }
      }
      const prevWeather = this.weather;
      const prevWeatherState = this.weatherState;
      this.weather = status.id;
      this.weatherState = { id: status.id };
      if (source) {
        this.weatherState.source = source;
        this.weatherState.sourceSlot = source.getSlot();
        console.log(this.effectState.copen);
        if (source.hasAbility("unitedparty") && status.duration && source.copen)
          status.duration += source.copen;
      }
      if (status.duration) {
        this.weatherState.duration = status.duration;
      }
      if (status.durationCallback) {
        if (!source)
          throw new Error(`setting weather without a source`);
        this.weatherState.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
      }
      if (!this.battle.singleEvent("FieldStart", status, this.weatherState, this, source, sourceEffect)) {
        this.weather = prevWeather;
        this.weatherState = prevWeatherState;
        return false;
      }
      this.battle.eachEvent("WeatherChange", sourceEffect);
      return true;
    },
    setTerrain(status, source = null, sourceEffect = null) {
      console.log(status);
      status = this.battle.dex.conditions.get(status);
      if (!sourceEffect && this.battle.effect)
        sourceEffect = this.battle.effect;
      if (!source && this.battle.event && this.battle.event.target)
        source = this.battle.event.target;
      if (source === "debug")
        source = this.battle.sides[0].active[0];
      if (!source)
        throw new Error(`setting terrain without a source`);
      if (this.terrain === status.id)
        return false;
      const prevTerrain = this.terrain;
      const prevTerrainState = this.terrainState;
      this.terrain = status.id;
      this.terrainState = {
        id: status.id,
        source,
        sourceSlot: source.getSlot(),
        duration: status.duration
      };
      if (status.durationCallback) {
        this.terrainState.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
      }
      if (source.hasAbility("unitedparty") && status.duration && this.effectState.copen)
        this.terrainState.duration += this.effectState.copen;
      if (!this.battle.singleEvent("FieldStart", status, this.terrainState, this, source, sourceEffect)) {
        this.terrain = prevTerrain;
        this.terrainState = prevTerrainState;
        return false;
      }
      this.battle.eachEvent("TerrainChange", sourceEffect);
      return true;
    },
    addPseudoWeather(status, source = null, sourceEffect = null) {
      console.log(status);
      if (!source && this.battle.event && this.battle.event.target)
        source = this.battle.event.target;
      if (source === "debug")
        source = this.battle.sides[0].active[0];
      status = this.battle.dex.conditions.get(status);
      let state = this.pseudoWeather[status.id];
      if (state) {
        if (!status.onFieldRestart)
          return false;
        return this.battle.singleEvent("FieldRestart", status, state, this, source, sourceEffect);
      }
      state = this.pseudoWeather[status.id] = {
        id: status.id,
        source,
        sourceSlot: source?.getSlot(),
        duration: status.duration
      };
      if (status.durationCallback) {
        if (!source)
          throw new Error(`setting fieldcond without a source`);
        state.duration = status.durationCallback.call(this.battle, source, source, sourceEffect);
      }
      if (!this.battle.singleEvent("FieldStart", status, state, this, source, sourceEffect)) {
        delete this.pseudoWeather[status.id];
        return false;
      }
      this.battle.runEvent("PseudoWeatherChange", source, source, status);
      return true;
    }
  }
};
//# sourceMappingURL=scripts.js.map
