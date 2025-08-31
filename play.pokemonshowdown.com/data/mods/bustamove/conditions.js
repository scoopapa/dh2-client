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
  jawlock: {
    name: "jawlock",
    onStart(target) {
      this.add("-activate", target, "jawlock");
    },
    onHit(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "jawlock");
      }
    },
    onResidualOrder: 9,
    onResidual(pokemon) {
      const source = this.effectState.source;
      const gmaxEffect = ["gmaxcentiferno", "gmaxsandblast"].includes(this.effectState.sourceEffect.id);
      if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
        delete pokemon.volatiles["jawlock"];
        this.add("-end", pokemon, this.effectState.sourceEffect, "[jawlock]", "[silent]");
        return;
      }
      this.damage(pokemon.baseMaxhp / 8);
    },
    onEnd(pokemon) {
      this.add("-end", pokemon, this.effectState.sourceEffect, "[jawlock]");
    }
  }
  /* diving: {
  	name: 'diving',
  	duration: 2,
  	onStart(pokemon) {
  		this.add('-diving', pokemon);
  	},
  },
  twoturnmove: { // modified for Dive
  	// Skull Bash, SolarBeam, Sky Drop...
  	name: 'twoturnmove',
  	duration: 2,
  	onStart(target, source, effect) {
  		this.effectState.move = effect.id;
  		target.addVolatile(effect.id, source);
  		this.attrLastMove('[still]');
  	},
  	onEnd(target) {
  		target.removeVolatile(this.effectState.move);
  	},
  	onLockMove(pokemon) {
  		if (pokemon.volatile('diving')) return; // onLockMove traps the user
  		return this.effectState.move;
  	},
  	onDisableMove(pokemon) {
  		if (pokemon.volatile('diving')) return; // equivalent to onLockMove if the user should not be trapped
  		if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
  			return;
  		}
  		for (const moveSlot of pokemon.moveSlots) {
  			if (moveSlot.id !== this.effectState.move) {
  				pokemon.disableMove(moveSlot.id);
  			}
  		}
  	},
  	onMoveAborted(pokemon) {
  		pokemon.removeVolatile('twoturnmove');
  	},
  },
  corrosed: {
  	name: 'corrosed',
  	effectType: 'Status',
  	onStart(pokemon, source, sourceEffect) {
  		if (sourceEffect && sourceEffect.effectType === 'Ability') {
  			this.add('-status', pokemon, 'corrosed', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
  		} else {
  			this.add('-status', pokemon, 'corrosed');
  		}
  	},
  	onModifyTypePriority: -5,
  	onModifyType(type) {
  		if (type === 'Steel') onNegateImmunity: false,
  	},
  },*/
};
//# sourceMappingURL=conditions.js.map
