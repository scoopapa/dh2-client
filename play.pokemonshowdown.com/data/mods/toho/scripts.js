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
    customTiers: ["Toho"],
    customDoublesTiers: ["DToho"]
  },
  init() {
  },
  battle: {
    //inherit: true,
    endTurn() {
      this.turn++;
      this.lastSuccessfulMoveThisTurn = null;
      const dynamaxEnding = [];
      for (const pokemon of this.getAllActive()) {
        if (pokemon.volatiles["dynamax"]?.turns === 1) {
          dynamaxEnding.push(pokemon);
        }
      }
      if (dynamaxEnding.length > 1) {
        this.updateSpeed();
        this.speedSort(dynamaxEnding);
      }
      for (const pokemon of dynamaxEnding) {
        pokemon.removeVolatile("dynamax");
      }
      if (this.gen === 1) {
        for (const pokemon of this.getAllActive()) {
          if (pokemon.volatiles["partialtrappinglock"]) {
            const target = pokemon.volatiles["partialtrappinglock"].locked;
            if (target.hp <= 0 || !target.volatiles["partiallytrapped"]) {
              delete pokemon.volatiles["partialtrappinglock"];
            }
          }
          if (pokemon.volatiles["partiallytrapped"]) {
            const source = pokemon.volatiles["partiallytrapped"].source;
            if (source.hp <= 0 || !source.volatiles["partialtrappinglock"]) {
              delete pokemon.volatiles["partiallytrapped"];
            }
          }
        }
      }
      const trappedBySide = [];
      const stalenessBySide = [];
      for (const side of this.sides) {
        let sideTrapped = true;
        let sideStaleness;
        for (const pokemon of side.active) {
          if (!pokemon)
            continue;
          pokemon.moveThisTurn = "";
          pokemon.newlySwitched = false;
          pokemon.moveLastTurnResult = pokemon.moveThisTurnResult;
          pokemon.moveThisTurnResult = void 0;
          if (this.turn !== 1) {
            pokemon.usedItemThisTurn = false;
            pokemon.statsRaisedThisTurn = false;
            pokemon.statsLoweredThisTurn = false;
            pokemon.hurtThisTurn = null;
          }
          pokemon.maybeDisabled = false;
          for (const moveSlot of pokemon.moveSlots) {
            moveSlot.disabled = false;
            moveSlot.disabledSource = "";
          }
          this.runEvent("DisableMove", pokemon);
          for (const moveSlot of pokemon.moveSlots) {
            const activeMove = this.dex.getActiveMove(moveSlot.id);
            this.singleEvent("DisableMove", activeMove, null, pokemon);
            if (activeMove.flags["cantusetwice"] && pokemon.lastMove?.id === moveSlot.id) {
              pokemon.disableMove(pokemon.lastMove.id);
            }
          }
          if (pokemon.getLastAttackedBy() && this.gen >= 7)
            pokemon.knownType = true;
          for (let i = pokemon.attackedBy.length - 1; i >= 0; i--) {
            const attack = pokemon.attackedBy[i];
            if (attack.source.isActive) {
              attack.thisTurn = false;
            } else {
              pokemon.attackedBy.splice(pokemon.attackedBy.indexOf(attack), 1);
            }
          }
          if (this.gen >= 7 && !pokemon.terastallized) {
            const seenPokemon = pokemon.illusion || pokemon;
            const realTypeString = seenPokemon.getTypes(true).join("/");
            if (realTypeString !== seenPokemon.apparentType) {
              this.add("-start", pokemon, "typechange", realTypeString, "[silent]");
              seenPokemon.apparentType = realTypeString;
              if (pokemon.addedType) {
                this.add("-start", pokemon, "typeadd", pokemon.addedType, "[silent]");
              }
            }
          }
          pokemon.trapped = pokemon.maybeTrapped = false;
          this.runEvent("TrapPokemon", pokemon);
          if (!pokemon.knownType || this.dex.getImmunity("trapped", pokemon)) {
            this.runEvent("MaybeTrapPokemon", pokemon);
          }
          if (this.gen > 2) {
            for (const source of pokemon.foes()) {
              const species = (source.illusion || source).species;
              if (!species.abilities)
                continue;
              for (const abilitySlot in species.abilities) {
                const abilityName = species.abilities[abilitySlot];
                if (abilityName === source.ability) {
                  continue;
                }
                const ruleTable = this.ruleTable;
                if ((ruleTable.has("+hackmons") || !ruleTable.has("obtainableabilities")) && !this.format.team) {
                  continue;
                } else if (abilitySlot === "H" && species.unreleasedHidden) {
                  continue;
                }
                const ability = this.dex.abilities.get(abilityName);
                if (ruleTable.has("-ability:" + ability.id))
                  continue;
                if (pokemon.knownType && !this.dex.getImmunity("trapped", pokemon))
                  continue;
                this.singleEvent("FoeMaybeTrapPokemon", ability, {}, pokemon, source);
              }
            }
          }
          if (pokemon.fainted)
            continue;
          sideTrapped = sideTrapped && pokemon.trapped;
          const staleness = pokemon.volatileStaleness || pokemon.staleness;
          if (staleness)
            sideStaleness = sideStaleness === "external" ? sideStaleness : staleness;
          pokemon.activeTurns++;
        }
        trappedBySide.push(sideTrapped);
        stalenessBySide.push(sideStaleness);
        side.faintedLastTurn = side.faintedThisTurn;
        side.faintedThisTurn = null;
      }
      if (this.maybeTriggerEndlessBattleClause(trappedBySide, stalenessBySide))
        return;
      if (this.gameType === "triples" && this.sides.every((side) => side.pokemonLeft === 1)) {
        const actives = this.getAllActive();
        if (actives.length > 1 && !actives[0].isAdjacent(actives[1])) {
          this.swapPosition(actives[0], 1, "[silent]");
          this.swapPosition(actives[1], 1, "[silent]");
          this.add("-center");
        }
      }
      this.add("turn", this.turn);
      if (this.gameType === "multi") {
        for (const side of this.sides) {
          if (side.canDynamaxNow()) {
            if (this.turn === 1) {
              this.addSplit(side.id, ["-candynamax", side.id]);
            } else {
              this.add("-candynamax", side.id);
            }
          }
        }
      }
      if (this.gen === 2)
        this.quickClawRoll = this.randomChance(60, 256);
      if (this.gen === 3)
        this.quickClawRoll = this.randomChance(1, 5);
      if (this.ruleTable.has("crazyhouserule")) {
        for (const side of this.sides) {
          let buf = `raw|${Utils.escapeHTML(side.name)}'s team:<br />`;
          for (const pokemon of side.pokemon) {
            if (!buf.endsWith("<br />"))
              buf += "/</span>&#8203;";
            if (pokemon.fainted) {
              buf += `<span style="white-space:nowrap;"><span style="opacity:.3"><psicon pokemon="${pokemon.species.id}" /></span>`;
            } else {
              buf += `<span style="white-space:nowrap"><psicon pokemon="${pokemon.species.id}" />`;
            }
          }
          this.add(`${buf}</span>`);
        }
      }
      this.makeRequest("move");
    },
    runAction(action) {
      const pokemonOriginalHP = action.pokemon?.hp;
      let residualPokemon = [];
      switch (action.choice) {
        case "start": {
          for (const side of this.sides) {
            if (side.pokemonLeft)
              side.pokemonLeft = side.pokemon.length;
          }
          this.add("start");
          for (const pokemon of this.getAllPokemon()) {
            let rawSpecies = null;
            console.log(pokemon.species.id + " " + pokemon.item);
            if (pokemon.species.id === "cirno" && pokemon.item === "summerbackdoor") {
              rawSpecies = this.dex.species.get("Cirno-Tanned");
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
          console.log(action.pokemon.baseSpecies.name + action.pokemon.baseSpecies.canDynamax);
          if (action.pokemon.baseSpecies.canDynamax)
            action.pokemon.addVolatile("dynamax");
          action.pokemon.side.dynamaxUsed = true;
          if (action.pokemon.side.allySide)
            action.pokemon.side.allySide.dynamaxUsed = true;
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
    }
  },
  pokemon: {
    hasAbility(ability) {
      if (this.ignoringAbility())
        return false;
      if (Array.isArray(ability))
        return ability.some((abil) => this.hasAbility(abil));
      const abilityid = this.battle.toID(ability);
      return this.ability === abilityid || !!this.volatiles["ability:" + abilityid];
    },
    canDynamax() {
      return this.hasAbility("growbigger") && !this.hasDynamaxed;
    },
    effectiveWeather() {
      if (this.hasAbility("lunatictorch") && this.battle.field.isTerrain("psychicterrain"))
        return "sunnyday";
      const weather = this.battle.field.effectiveWeather();
      switch (weather) {
        case "sunnyday":
        case "desolateland":
          if (this.hasAbility("shadowshroud"))
            return "";
        case "raindance":
        case "primordialsea":
          if (this.hasItem("utilityumbrella"))
            return "";
      }
      return weather;
    },
    setType(newType, enforce = false) {
      if (!enforce) {
        if (typeof newType === "string" ? newType === "Stellar" : newType.includes("Stellar"))
          return false;
        if (this.species.num === 104) {
          return false;
        }
        if (this.terastallized)
          return false;
      }
      if (!newType)
        throw new Error("Must pass type to setType");
      this.types = typeof newType === "string" ? [newType] : newType;
      this.addedType = "";
      this.knownType = true;
      this.apparentType = this.types.join("/");
      return true;
    }
  },
  actions: {
    runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
      pokemon.activeMoveActions++;
      let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
      let baseMove = this.dex.getActiveMove(moveOrMoveName);
      const pranksterBoosted = baseMove.pranksterBoosted;
      if (baseMove.id !== "struggle" && !zMove && !maxMove && !externalMove) {
        const changedMove = this.battle.runEvent("OverrideAction", pokemon, target, baseMove);
        if (changedMove && changedMove !== true) {
          baseMove = this.dex.getActiveMove(changedMove);
          if (pranksterBoosted)
            baseMove.pranksterBoosted = pranksterBoosted;
          target = this.battle.getRandomTarget(pokemon, baseMove);
        }
      }
      let move = baseMove;
      if (zMove) {
        move = this.getActiveZMove(baseMove, pokemon);
      } else if (maxMove) {
        move = this.getActiveMaxMove(baseMove, pokemon);
      }
      move.isExternal = externalMove;
      this.battle.setActiveMove(move, pokemon, target);
      const willTryMove = this.battle.runEvent("BeforeMove", pokemon, target, move);
      if (!willTryMove) {
        this.battle.runEvent("MoveAborted", pokemon, target, move);
        this.battle.clearActiveMove(true);
        pokemon.moveThisTurnResult = willTryMove;
        return;
      }
      if (move.flags["cantusetwice"] && pokemon.lastMove?.id === move.id) {
        pokemon.addVolatile(move.id);
      }
      if (move.beforeMoveCallback) {
        if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
          this.battle.clearActiveMove(true);
          pokemon.moveThisTurnResult = false;
          return;
        }
      }
      pokemon.lastDamage = 0;
      let lockedMove;
      if (!externalMove) {
        lockedMove = this.battle.runEvent("LockMove", pokemon);
        if (lockedMove === true)
          lockedMove = false;
        if (!lockedMove) {
          if (!pokemon.deductPP(baseMove, null, target) && move.id !== "struggle") {
            this.battle.add("cant", pokemon, "nopp", move);
            this.battle.clearActiveMove(true);
            pokemon.moveThisTurnResult = false;
            return;
          }
        } else {
          sourceEffect = this.dex.conditions.get("lockedmove");
        }
        pokemon.moveUsed(move, targetLoc);
      }
      const noLock = externalMove && !pokemon.volatiles["lockedmove"];
      if (zMove) {
        if (pokemon.illusion) {
          this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
        }
        this.battle.add("-zpower", pokemon);
        pokemon.side.zMoveUsed = true;
      }
      const oldActiveMove = move;
      const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
      this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
      if (this.battle.activeMove)
        move = this.battle.activeMove;
      this.battle.singleEvent("AfterMove", move, null, pokemon, target, move);
      this.battle.runEvent("AfterMove", pokemon, target, move);
      if (move.flags["cantusetwice"] && pokemon.removeVolatile(move.id)) {
        this.battle.add("-hint", `Some effects can force a Pokemon to use ${move.name} again in a row.`);
      }
      if (move.flags["sound"] && !move.isExternal) {
        const sounders = [];
        for (const currentPoke of this.battle.getAllActive()) {
          if (pokemon === currentPoke)
            continue;
          if (currentPoke.hasAbility("echo") && !currentPoke.isSemiInvulnerable()) {
            sounders.push(currentPoke);
          }
        }
        sounders.sort(
          (a, b) => -(b.storedStats["spe"] - a.storedStats["spe"]) || b.abilityOrder - a.abilityOrder
        );
        const targetOf1stSound = this.battle.activeTarget;
        for (const sounder of sounders) {
          if (this.battle.faintMessages())
            break;
          if (sounder.fainted)
            continue;
          this.battle.add("-activate", sounder, "ability: Echo");
          const soundersTarget = !targetOf1stSound.isAlly(sounder) && pokemon.isAlly(sounder) ? targetOf1stSound : pokemon;
          const soundersTargetLoc = sounder.getLocOf(soundersTarget);
          this.runMove(move.id, sounder, soundersTargetLoc, this.dex.abilities.get("echo"), void 0, true);
        }
      }
      if (noLock && pokemon.volatiles["lockedmove"])
        delete pokemon.volatiles["lockedmove"];
      this.battle.faintMessages();
      this.battle.checkWin();
      if (this.battle.gen <= 4) {
        this.battle.activeMove = oldActiveMove;
      }
    }
  },
  side: {
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
      for (const set of this.team) {
        this.addPokemon(set);
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
        dynamax: false,
        terastallize: false
      };
      this.lastMove = null;
    },
    canDynamaxNow() {
      if (this.battle.gameType === "multi" && this.battle.turn % 2 !== [1, 1, 0, 0][this.n])
        return false;
      let can = false;
      for (const pokemon of this.active) {
        if (pokemon && pokemon.hp && pokemon.canDynamax())
          can = true;
      }
      return can;
    }
  }
};
//# sourceMappingURL=scripts.js.map
