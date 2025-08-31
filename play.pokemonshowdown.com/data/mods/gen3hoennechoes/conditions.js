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
  slp: {
    name: "slp",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "slp", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else if (sourceEffect && sourceEffect.effectType === "Move") {
        this.add("-status", target, "slp", "[from] move: " + sourceEffect.name);
      } else {
        this.add("-status", target, "slp");
      }
      this.effectState.startTime = this.random(2, 5);
      this.effectState.time = this.effectState.startTime;
      if (target.removeVolatile("nightmare")) {
        this.add("-end", target, "Nightmare", "[silent]");
      }
    },
    onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      if (pokemon.hasAbility("earlybird")) {
        pokemon.statusState.time--;
      }
      pokemon.statusState.time--;
      if (pokemon.statusState.time <= 0) {
        pokemon.cureStatus();
        return;
      }
      this.add("cant", pokemon, "slp");
      if (move.sleepUsable) {
        return;
      }
      return false;
    }
  },
  frz: {
    inherit: true,
    onDamagingHit(damage, target, source, move) {
      if (this.dex.moves.get(move.id).type === "Fire" && move.category !== "Status") {
        target.cureStatus();
      }
    }
  },
  par: {
    name: "par",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "par", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "par");
      }
    },
    onModifySpePriority: -101,
    onModifySpe(spe, pokemon) {
      spe = this.finalModify(spe);
      if (!pokemon.hasAbility("quickfeet")) {
        return this.chainModify(0.25);
      }
      return spe;
    }
  },
  confusion: {
    name: "confusion",
    onStart(target, source, sourceEffect) {
      if (sourceEffect?.id === "lockedmove") {
        this.add("-start", target, "confusion", "[fatigue]");
      } else if (sourceEffect?.effectType === "Ability") {
        this.add("-start", target, "confusion", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-start", target, "confusion");
      }
      const min = sourceEffect?.id === "axekick" ? 3 : 2;
      this.effectState.time = this.random(min, 6);
    },
    onEnd(target) {
      this.add("-end", target, "confusion");
    },
    onBeforeMovePriority: 3,
    onBeforeMove(pokemon) {
      pokemon.volatiles["confusion"].time--;
      if (!pokemon.volatiles["confusion"].time) {
        pokemon.removeVolatile("confusion");
        return;
      }
      this.add("-activate", pokemon, "confusion");
      if (!this.randomChance(33, 100)) {
        return;
      }
      this.activeTarget = pokemon;
      const damage = this.actions.getConfusionDamage(pokemon, 40);
      if (typeof damage !== "number")
        throw new Error("Confusion damage not dealt");
      const activeMove = { id: this.toID("confused"), effectType: "Move", type: "???" };
      this.damage(damage, pokemon, pokemon, activeMove);
      return false;
    }
  },
  partiallytrapped: {
    name: "partiallytrapped",
    duration: 5,
    durationCallback(target, source) {
      if (source?.hasItem("gripclaw"))
        return 8;
      return this.random(5, 7);
    },
    onStart(pokemon, source) {
      this.add("-activate", pokemon, "move: " + this.effectState.sourceEffect, "[of] " + source);
      this.effectState.boundDivisor = source.hasItem("bindingband") ? 6 : 8;
    },
    onResidualOrder: 13,
    onResidual(pokemon) {
      const source = this.effectState.source;
      const gmaxEffect = ["gmaxcentiferno", "gmaxsandblast"].includes(this.effectState.sourceEffect.id);
      if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
        delete pokemon.volatiles["partiallytrapped"];
        this.add("-end", pokemon, this.effectState.sourceEffect, "[partiallytrapped]", "[silent]");
        return;
      }
      this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
    },
    onEnd(pokemon) {
      this.add("-end", pokemon, this.effectState.sourceEffect, "[partiallytrapped]");
    },
    onTrapPokemon(pokemon) {
      const gmaxEffect = ["gmaxcentiferno", "gmaxsandblast"].includes(this.effectState.sourceEffect.id);
      if (this.effectState.source?.isActive || gmaxEffect)
        pokemon.tryTrap();
    }
  },
  mustrecharge: {
    name: "mustrecharge",
    duration: 2,
    onBeforeMovePriority: 11,
    onBeforeMove(pokemon) {
      this.add("cant", pokemon, "recharge");
      pokemon.removeVolatile("mustrecharge");
      pokemon.removeVolatile("truant");
      return null;
    },
    onStart(pokemon) {
      this.add("-mustrecharge", pokemon);
    },
    onSourceAfterFaint(length, target, pokemon, effect) {
      if (effect && effect.effectType === "Move") {
        this.actions.useMove("Recharge", pokemon);
        pokemon.removeVolatile("mustrecharge");
        this.add("-message", `${pokemon.name} recharged instantly!`);
      }
    },
    onLockMove: "recharge"
  },
  aurorabeam: {
    name: "aurorabeam",
    duration: 3,
    onStart(pokemon, source) {
      this.add("-start", pokemon, "move: Heal Block");
      source.moveThisTurnResult = true;
    },
    onDisableMove(pokemon) {
      for (const moveSlot of pokemon.moveSlots) {
        if (this.dex.moves.get(moveSlot.id).flags["heal"]) {
          pokemon.disableMove(moveSlot.id);
        }
      }
    },
    onBeforeMovePriority: 6,
    onBeforeMove(pokemon, target, move) {
      if (move.flags["heal"] && !move.isZ && !move.isMax) {
        this.add("cant", pokemon, "move: Heal Block", move);
        return false;
      }
    },
    onModifyMove(move, pokemon, target) {
      if (move.flags["heal"] && !move.isZ && !move.isMax) {
        this.add("cant", pokemon, "move: Heal Block", move);
        return false;
      }
    },
    onResidualOrder: 20,
    onEnd(pokemon) {
      this.add("-end", pokemon, "move: Heal Block");
    },
    onTryHeal(damage, target, source, effect) {
      if (effect?.id === "zpower" || this.effectState.isZ)
        return damage;
      return false;
    }
  },
  sandstorm: {
    inherit: true,
    onModifySpD() {
    }
  }
};
//# sourceMappingURL=conditions.js.map
