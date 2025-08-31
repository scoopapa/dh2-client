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
  dragonclaw: {
    inherit: true,
    onBasePower(basePower, pokemon2, target) {
      if (pokemon2.volatiles["irisboost"])
        return 100;
    }
  },
  dragonpulse: {
    inherit: true,
    onBasePower(basePower, pokemon2, target) {
      if (pokemon2.volatiles["irisboost"])
        return 100;
    }
  },
  quickattack: {
    inherit: true,
    onBasePower(basePower, pokemon2, target) {
      if (pokemon2.volatiles["joeyboost"])
        return basePower + 20;
    }
  },
  tackle: {
    inherit: true,
    onBasePower(basePower, pokemon2, target) {
      if (pokemon2.volatiles["joeyboost"])
        return basePower + 80;
    }
  },
  tailwhip: {
    inherit: true,
    onModifyMove(move, pokemon2) {
      if (pokemon2.volatiles["joeyboost"])
        move.selfSwitch = true;
    }
  },
  futuresight: {
    inherit: true,
    onTry(source, target) {
      let bp = 120;
      if (pokemon.volatiles["willboost"])
        bp *= 1.3;
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "futuresight",
        source,
        moveData: {
          id: "futuresight",
          name: "Future Sight",
          accuracy: 100,
          basePower: bp,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Psychic"
        }
      });
      this.add("-start", source, "move: Future Sight");
      return this.NOT_FAIL;
    }
  },
  poltergeist: {
    inherit: true,
    onTry(source, target) {
      return !!target.item && !target.volatiles["ltsurgeboost"];
    }
  },
  knockoff: {
    inherit: true,
    onBasePower(basePower, source, target, move) {
      if (target.volatiles["ltsurgeboost"])
        return;
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemState, target, target, move, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    }
  },
  stealthrock: {
    inherit: true,
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      onSwitchIn(pokemon2) {
        if (pokemon2.hasItem("heavydutyboots") || pokemon2.volatiles["bugsyboost"])
          return;
        const typeMod = this.clampIntRange(pokemon2.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(pokemon2.maxhp * 2 ** typeMod / 8);
      }
    }
  },
  spikes: {
    inherit: true,
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 3)
          return false;
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers++;
      },
      onSwitchIn(pokemon2) {
        if (!pokemon2.isGrounded() || pokemon2.hasItem("heavydutyboots") || pokemon2.volatiles["bugsyboost"])
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * pokemon2.maxhp / 24);
      }
    }
  },
  toxicspikes: {
    inherit: true,
    onSwitchIn(pokemon2) {
      if (!pokemon2.isGrounded() || pokemon2.volatiles["bugsyboost"])
        return;
      if (pokemon2.hasType("Poison")) {
        this.add("-sideend", pokemon2.side, "move: Toxic Spikes", `[of] ${pokemon2}`);
        pokemon2.side.removeSideCondition("toxicspikes");
      } else if (pokemon2.hasType("Steel") || pokemon2.hasItem("heavydutyboots")) {
      } else if (this.effectState.layers >= 2) {
        pokemon2.trySetStatus("tox", pokemon2.side.foe.active[0]);
      } else {
        pokemon2.trySetStatus("psn", pokemon2.side.foe.active[0]);
      }
    }
  },
  stickyweb: {
    inherit: true,
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Sticky Web");
      },
      onSwitchIn(pokemon2) {
        if (!pokemon2.isGrounded() || pokemon2.hasItem("heavydutyboots") || pokemon2.volatiles["bugsyboost"])
          return;
        this.add("-activate", pokemon2, "move: Sticky Web");
        this.boost({ spe: -1 }, pokemon2, pokemon2.side.foe.active[0], this.dex.getActiveMove("stickyweb"));
      }
    }
  },
  asa: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "asa",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1 },
    sideCondition: "asa",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "asa", "[silent]");
      },
      onEntryHazard(pokemon2) {
        this.heal(pokemon2.maxhp / 10);
        pokemon2.side.removeSideCondition("asa");
        this.add("-sideend", pokemon2.side, "move: asa", "[of] " + pokemon2, "[silent]");
      }
    },
    secondary: null,
    target: "allySide",
    type: "Ghost",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  }
};
//# sourceMappingURL=moves.js.map
