"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
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
  cursedbody: {
    inherit: true,
    onDamagingHit(damage, target2, source, move) {
      if (source.volatiles["disable"])
        return;
      if (!move.isMax && !move.flags["futuremove"] && move.id !== "struggle") {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        target2.side.addEffect(30);
        if (target2.side.effect >= 100) {
          target2.side.subtractEffect(100);
          source.addVolatile("disable", this.effectState.target);
        }
      }
    }
  },
  cutecharm: {
    inherit: true,
    onDamagingHit(damage, target2, source, move) {
      if (this.checkMoveMakesContact(move, source, target2)) {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        target2.side.addEffect(30);
        if (target2.side.effect >= 100) {
          target2.side.subtractEffect(100);
          source.addVolatile("attract", this.effectState.target);
        }
      }
    }
  },
  flamebody: {
    inherit: true,
    onDamagingHit(damage, target2, source, move) {
      if (this.checkMoveMakesContact(move, source, target2) && !source.status) {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        target2.side.addEffect(30);
        if (target2.side.effect >= 100) {
          target2.side.subtractEffect(100);
          source.trySetStatus("brn", target2);
        }
      }
    }
  },
  poisonpoint: {
    inherit: true,
    onDamagingHit(damage, target2, source, move) {
      if (this.checkMoveMakesContact(move, source, target2) && !source.status) {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        target2.side.addEffect(30);
        if (target2.side.effect >= 100) {
          target2.side.subtractEffect(100);
          source.trySetStatus("psn", target2);
        }
      }
    }
  },
  poisontouch: {
    inherit: true,
    onSourceDamagingHit(damage, target2, source, move) {
      if (target2.hasAbility("shielddust") || target2.hasItem("covertcloak"))
        return;
      if (this.checkMoveMakesContact(move, target2, source) && !target2.status) {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        source.side.addEffect(30);
        if (source.side.effect >= 100) {
          source.side.subtractEffect(100);
          target2.trySetStatus("psn", source);
        }
      }
    }
  },
  quickdraw: {
    inherit: true,
    onFractionalPriority(priority, pokemon, target2, move) {
      if (move.category !== "Status") {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        pokemon.side.addEffect(30);
        if (pokemon.side.effect >= 100) {
          pokemon.side.subtractEffect(100);
          this.add("-activate", pokemon, "ability: Quick Draw");
          return 0.1;
        }
      }
    }
  },
  shedskin: {
    inherit: true,
    onResidual(pokemon) {
      if (pokemon.hp && pokemon.status) {
        this.add("-message", `(${target.name}'s Ability: 33)`);
        pokemon.side.addEffect(33);
        if (pokemon.side.effect >= 100) {
          pokemon.side.subtractEffect(100);
          this.debug("shed skin");
          this.add("-activate", pokemon, "ability: Shed Skin");
          pokemon.cureStatus();
        }
      }
    }
  },
  static: {
    inherit: true,
    onDamagingHit(damage, target2, source, move) {
      if (this.checkMoveMakesContact(move, source, target2) && !source.status) {
        this.add("-message", `(${target2.name}'s Ability: 30)`);
        target2.side.addEffect(30);
        if (target2.side.effect >= 100) {
          target2.side.subtractEffect(100);
          source.trySetStatus("par", target2);
        }
      }
    }
  },
  toxicchain: {
    inherit: true,
    onSourceDamagingHit(damage, target2, source, move) {
      if (target2.hasAbility("shielddust") || target2.hasItem("covertcloak"))
        return;
      this.add("-message", `(${target2.name}'s Ability: 30)`);
      if (!target2.status)
        source.side.addEffect(30);
      if (source.side.effect >= 100) {
        source.side.subtractEffect(100);
        target2.trySetStatus("tox", source);
      }
    }
  }
};
//# sourceMappingURL=abilities.js.map
