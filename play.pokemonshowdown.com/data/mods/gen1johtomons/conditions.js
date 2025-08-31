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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  brn: {
    name: "brn",
    effectType: "Status",
    onStart(target) {
      this.add("-status", target, "brn");
      target.addVolatile("brnattackdrop");
    },
    onAfterMoveSelfPriority: 2,
    onAfterMoveSelf(pokemon) {
      const toxicCounter = pokemon.volatiles["residualdmg"] ? pokemon.volatiles["residualdmg"].counter : 1;
      this.damage(this.clampIntRange(Math.floor(pokemon.maxhp / 16), 1) * toxicCounter, pokemon);
      if (pokemon.volatiles["residualdmg"]) {
        this.hint("In Gen 1, Toxic's counter is retained after Rest and applies to PSN/BRN.", true);
      }
    },
    onSwitchIn(pokemon) {
      pokemon.addVolatile("brnattackdrop");
    },
    onAfterSwitchInSelf(pokemon) {
      this.damage(this.clampIntRange(Math.floor(pokemon.maxhp / 16), 1));
    }
  },
  par: {
    name: "par",
    effectType: "Status",
    onStart(target) {
      this.add("-status", target, "par");
      target.addVolatile("parspeeddrop");
    },
    onBeforeMovePriority: 2,
    onBeforeMove(pokemon) {
      if (this.randomChance(63, 256)) {
        this.add("cant", pokemon, "par");
        pokemon.removeVolatile("bide");
        pokemon.removeVolatile("twoturnmove");
        pokemon.removeVolatile("dig");
        pokemon.removeVolatile("fly");
        pokemon.removeVolatile("solarbeam");
        pokemon.removeVolatile("skullbash");
        pokemon.removeVolatile("partialtrappinglock");
        return false;
      }
    },
    onSwitchIn(pokemon) {
      pokemon.addVolatile("parspeeddrop");
    }
  },
  slp: {
    name: "slp",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Move") {
        this.add("-status", target, "slp", "[from] move: " + sourceEffect.name);
      } else {
        this.add("-status", target, "slp");
      }
      this.effectState.startTime = this.random(1, 8);
      this.effectState.time = this.effectState.startTime;
    },
    onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      pokemon.statusData.time--;
      if (pokemon.statusData.time > 0) {
        this.add("cant", pokemon, "slp");
      }
      pokemon.lastMove = null;
      return false;
    },
    onAfterMoveSelf(pokemon) {
      if (pokemon.statusData.time <= 0)
        pokemon.cureStatus();
    }
  },
  frz: {
    name: "frz",
    effectType: "Status",
    onStart(target) {
      this.add("-status", target, "frz");
    },
    onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      this.add("cant", pokemon, "frz");
      pokemon.lastMove = null;
      return false;
    },
    onAfterMoveSecondary(target, source, move) {
      if (move.secondary && move.secondary.status === "brn") {
        target.cureStatus();
      }
    }
  },
  psn: {
    name: "psn",
    effectType: "Status",
    onStart(target) {
      this.add("-status", target, "psn");
    },
    onAfterMoveSelfPriority: 2,
    onAfterMoveSelf(pokemon) {
      const toxicCounter = pokemon.volatiles["residualdmg"] ? pokemon.volatiles["residualdmg"].counter : 1;
      this.damage(this.clampIntRange(Math.floor(pokemon.maxhp / 8), 1) * toxicCounter, pokemon);
      if (pokemon.volatiles["residualdmg"]) {
        this.hint("In Gen 1, Toxic's counter is retained after Rest and applies to PSN/BRN.", true);
      }
    },
    onAfterSwitchInSelf(pokemon) {
      this.damage(this.clampIntRange(Math.floor(pokemon.maxhp / 8), 1));
    }
  },
  tox: {
    inherit: true,
    onAfterMoveSelfPriority: 2
  },
  confusion: {
    name: "confusion",
    // this is a volatile status
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.id === "lockedmove") {
        this.add("-start", target, "confusion", "[silent]");
      } else {
        this.add("-start", target, "confusion");
      }
      this.effectState.time = this.random(2, 6);
    },
    onEnd(target) {
      this.add("-end", target, "confusion");
    },
    onBeforeMovePriority: 3,
    onBeforeMove(pokemon, target) {
      pokemon.volatiles.confusion.time--;
      if (!pokemon.volatiles.confusion.time) {
        pokemon.removeVolatile("confusion");
        return;
      }
      this.add("-activate", pokemon, "confusion");
      if (!this.randomChance(128, 256)) {
        const damage = Math.floor(Math.floor((Math.floor(2 * pokemon.level / 5) + 2) * pokemon.getStat("atk") * 40 / pokemon.getStat("def", false)) / 50) + 2;
        this.directDamage(damage, pokemon, target);
        pokemon.removeVolatile("bide");
        pokemon.removeVolatile("twoturnmove");
        pokemon.removeVolatile("fly");
        pokemon.removeVolatile("dig");
        pokemon.removeVolatile("solarbeam");
        pokemon.removeVolatile("skullbash");
        pokemon.removeVolatile("partialtrappinglock");
        return false;
      }
      return;
    }
  },
  flinch: {
    name: "flinch",
    duration: 1,
    onBeforeMovePriority: 4,
    onBeforeMove(pokemon) {
      if (!this.runEvent("Flinch", pokemon)) {
        return;
      }
      this.add("cant", pokemon, "flinch");
      return false;
    }
  },
  trapped: {
    name: "trapped",
    noCopy: true,
    onTrapPokemon(pokemon) {
      if (!this.effectState.source || !this.effectState.source.isActive) {
        delete pokemon.volatiles["trapped"];
        return;
      }
      pokemon.trapped = true;
    }
  },
  partiallytrapped: {
    name: "partiallytrapped",
    duration: 2,
    onBeforeMovePriority: 4,
    onBeforeMove(pokemon) {
      this.add("cant", pokemon, "partiallytrapped");
      return false;
    }
  },
  partialtrappinglock: {
    name: "partialtrappinglock",
    durationCallback() {
      const duration = this.sample([3, 3, 3, 3, 3, 3, 3, 3]);
      return duration;
    },
    onResidual(target) {
      if (target.lastMove && target.lastMove.id === "struggle" || target.status === "slp") {
        delete target.volatiles["partialtrappinglock"];
      }
    },
    onStart(target, source, effect) {
      this.effectState.move = effect.id;
    },
    onDisableMove(pokemon) {
      if (!pokemon.hasMove(this.effectState.move)) {
        return;
      }
      for (const moveSlot of pokemon.moveSlots) {
        if (moveSlot.id !== this.effectState.move) {
          pokemon.disableMove(moveSlot.id);
        }
      }
    }
  },
  mustrecharge: {
    inherit: true,
    onStart() {
    }
  },
  lockedmove: {
    // Outrage, Thrash, Petal Dance...
    inherit: true,
    durationCallback() {
      return this.random(3, 5);
    }
  },
  stall: {
    name: "stall",
    // Protect, Detect, Endure counter
    duration: 2,
    counterMax: 256,
    onStart() {
      this.effectState.counter = 2;
    },
    onStallMove() {
      const counter = this.effectState.counter || 1;
      if (counter >= 256) {
        return this.random() * 4294967296 < 1;
      }
      this.debug("Success chance: " + Math.round(100 / counter) + "%");
      return this.randomChance(1, counter);
    },
    onRestart() {
      if (this.effectState.counter < this.effect.counterMax) {
        this.effectState.counter *= 2;
      }
      this.effectState.duration = 2;
    }
  }
};
//# sourceMappingURL=conditions.js.map
