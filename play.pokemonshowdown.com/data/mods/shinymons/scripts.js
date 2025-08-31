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
  inherit: "gen9",
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
          if (!pokemon.set.shiny)
            continue;
          const species = pokemon.species.name;
          const ability = pokemon.ability;
          pokemon.formeChange(`${pokemon.name}-Shiny`, this.effect, true, "0", "[msg]");
          pokemon.ability = ability;
          const shinyMove = {
            "Dragonite": ["poisonjab", "corrosivejab"],
            "Sneasler": ["direclaw", "weldingclaw"],
            "Wigglytuff": ["swallow", "poisonoushug"],
            "Passimian": ["suckerpunch", "himalayantraveller"],
            "Hoopa": ["shadowball", "gild"],
            "Weezing-Galar": ["strangesteam", "heatdeath"],
            "Slowbro": ["icepunch", "rockslap"],
            "Dusknoir": ["shadowpunch", "jawsoflife"],
            "Armaldo": ["crushclaw", "apexclaw"],
            "Walking Wake": ["freezedry", "chillingstream"],
            "Carbink": ["roost", "ascension"]
          };
          if (Object.keys(shinyMove).includes(pokemon.name)) {
            const shinyMoveIndex = pokemon.baseMoves.indexOf(shinyMove[species][0]);
            if (shinyMoveIndex >= 0) {
              const move = this.dex.moves.get(shinyMove[species][1]);
              pokemon.baseMoveSlots[shinyMoveIndex] = {
                move: move.name,
                id: move.id,
                pp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
                maxpp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
                target: move.target,
                disabled: false,
                disabledSource: "",
                used: false
              };
              pokemon.moveSlots = pokemon.baseMoveSlots.slice();
            }
          }
        }
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
          pokemon.details = pokemon.getUpdatedDetails();
          pokemon.setAbility(species.abilities["0"], null, true);
          pokemon.baseAbility = pokemon.ability;
          const behemothMove = {
            "Zacian-Crowned": "behemothblade",
            "Zamazenta-Crowned": "behemothbash"
          };
          const ironHeadIndex = pokemon.baseMoves.indexOf("ironhead");
          if (ironHeadIndex >= 0) {
            const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
            pokemon.baseMoveSlots[ironHeadIndex] = {
              move: move.name,
              id: move.id,
              pp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
              maxpp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
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
        this.actions.runMove(action.move, action.pokemon, action.targetLoc, {
          sourceEffect: action.sourceEffect,
          zMove: action.zmove,
          maxMove: action.maxMove,
          originalTarget: action.originalTarget
        });
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
      case "runSwitch":
        this.actions.runSwitch(action.pokemon);
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
        this.fieldEvent("Residual");
        if (!this.ended)
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
    if (this.gen >= 5 && action.choice !== "start") {
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
  pokemon: {
    setStatus(status, source = null, sourceEffect = null, ignoreImmunities = false) {
      if (!this.hp)
        return false;
      status = this.battle.dex.conditions.get(status);
      if (this.battle.event) {
        if (!source)
          source = this.battle.event.source;
        if (!sourceEffect)
          sourceEffect = this.battle.effect;
      }
      if (!source)
        source = this;
      if (this.status === status.id) {
        if (sourceEffect?.status === this.status) {
          this.battle.add("-fail", this, this.status);
        } else if (sourceEffect?.status) {
          this.battle.add("-fail", source);
          this.battle.attrLastMove("[still]");
        }
        return false;
      }
      if (!ignoreImmunities && status.id && !((source?.hasAbility("corrosion") || sourceEffect.id === "corrosivejab" && !this.types.includes("Poison")) && ["tox", "psn"].includes(status.id))) {
        if (!this.runStatusImmunity(status.id === "tox" ? "psn" : status.id)) {
          this.battle.debug("immune to status");
          if (sourceEffect?.status) {
            this.battle.add("-immune", this);
          }
          return false;
        }
      }
      const prevStatus = this.status;
      const prevStatusState = this.statusState;
      if (status.id) {
        const result = this.battle.runEvent("SetStatus", this, source, sourceEffect, status);
        if (!result) {
          this.battle.debug("set status [" + status.id + "] interrupted");
          return result;
        }
      }
      this.status = status.id;
      this.statusState = this.battle.initEffectState({ id: status.id, target: this });
      if (source)
        this.statusState.source = source;
      if (status.duration)
        this.statusState.duration = status.duration;
      if (status.durationCallback) {
        this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
      }
      if (status.id && !this.battle.singleEvent("Start", status, this.statusState, this, source, sourceEffect)) {
        this.battle.debug("status start [" + status.id + "] interrupted");
        this.status = prevStatus;
        this.statusState = prevStatusState;
        return false;
      }
      if (status.id && !this.battle.runEvent("AfterSetStatus", this, source, sourceEffect, status)) {
        return false;
      }
      return true;
    }
  }
};
//# sourceMappingURL=scripts.js.map
