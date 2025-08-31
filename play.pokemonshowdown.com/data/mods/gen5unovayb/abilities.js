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
  slushrush: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Slush Rush",
    rating: 3,
    num: 202,
    shortDesc: "If Snow is active, this Pokemon's Speed is boosted 1.5x.",
    gen: 5
  },
  chlorophyll: {
    onModifySpe(spe, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Chlorophyll",
    rating: 3,
    num: 34,
    shortDesc: "If Sunny Day is active, this Pokemon's Speed is boosted 1.5x."
  },
  sandforce: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather("sandstorm")) {
        if (move.type === "Rock" || move.type === "Ground" || move.type === "Steel") {
          this.debug("Sand Force boost");
          return this.chainModify([4915, 4096]);
        }
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Force",
    rating: 2,
    num: 159,
    shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.2x in Sandstorm; immunity to it."
  },
  sandrush: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather("sandstorm")) {
        return this.chainModify(1.5);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Rush",
    rating: 3,
    num: 146,
    shortDesc: "If Sandstorm is active, this Pokemon's Speed is boosted 1.5x."
  },
  sandveil: {
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    onDamage(damage, target, source, effect) {
      if (effect.effectType !== "Move" && this.field.isWeather("sandstorm")) {
        if (effect.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect.name);
        return false;
      }
    },
    flags: {},
    name: "Sand Veil",
    rating: 1.5,
    num: 8,
    shortDesc: "If Sandstorm is active, this Pokemon is immune to indirect damage."
  },
  snowcloak: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    onDamage(damage, target, source, effect) {
      if (effect.effectType !== "Move" && this.field.isWeather(["hail", "snow"])) {
        if (effect.effectType === "Ability")
          this.add("-activate", source, "ability: " + effect.name);
        return false;
      }
    },
    flags: {},
    name: "Snow Cloak",
    rating: 1.5,
    num: 81,
    shortDesc: "If Snow is active, this Pokemon is immune to indirect damage."
  },
  snowwarning: {
    onStart(source) {
      this.field.setWeather("snow");
    },
    flags: {},
    name: "Snow Warning",
    rating: 4,
    num: 117,
    shortDesc: "On switch-in, this Pokemon summons Snow."
  },
  swiftswim: {
    onModifySpe(spe, pokemon) {
      if (["raindance", "primordialsea"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Swift Swim",
    rating: 3,
    num: 33,
    shortDesc: "If Rain Dance is active, this Pokemon's Speed is boosted 1.5x."
  },
  leafguard: {
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      if (pokemon.status && ["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        this.debug("leafguard");
        this.add("-activate", pokemon, "ability: Leaf Guard");
        pokemon.cureStatus();
      }
    },
    flags: {},
    name: "Leaf Guard",
    rating: 0.5,
    num: 102,
    shortDesc: "This Pokemon has its status cured at the end of each turn if Sunny Day is active."
  },
  galewings: {
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.type === "Flying" && pokemon.hp === pokemon.maxhp)
        return priority + 1;
    },
    flags: {},
    name: "Gale Wings",
    rating: 1.5,
    num: 177,
    gen: 5,
    shortDesc: "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1."
  },
  furcoat: {
    inherit: true,
    gen: 5
  },
  sharpness: {
    inherit: true,
    gen: 5
  },
  download: {
    onStart(pokemon) {
      let totaldef = 0;
      let totalspd = 0;
      for (const target of pokemon.foes()) {
        totaldef += target.getStat("def", false, true);
        totalspd += target.getStat("spd", false, true);
      }
      if (totaldef && totaldef >= totalspd) {
        this.boost({ spa: 1 });
        pokemon.addVolatile("downloadspa");
      } else if (totalspd) {
        this.boost({ atk: 1 });
        pokemon.addVolatile("downloadatk");
      }
    },
    flags: {},
    name: "Download",
    rating: 3.5,
    num: 88,
    shortDesc: "On switch-in, Atk or SpA is raised 1 stage for a turn based on the foes' weaker Defense."
  },
  synchronize: {
    onAfterSetStatus(status, target, source, effect) {
      if (!source || source === target)
        return;
      if (effect && effect.id === "toxicspikes")
        return;
      if (status.id === "slp")
        return;
      this.add("-activate", target, "ability: Synchronize");
      source.trySetStatus(status, target, { status: status.id, id: "synchronize" });
    },
    flags: {},
    name: "Synchronize",
    rating: 2,
    num: 28,
    shortDesc: "If another Pokemon burns/poisons/paralyzes/freezes this Pokemon, it also gets that status."
  },
  defeatist: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 2) {
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Defeatist",
    rating: -1,
    num: 129,
    shortDesc: "While this Pokemon has 1/2 or less of its max HP, its Attack is halved."
  },
  zenmode: {
    onSwitchIn(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Darmanitan" || pokemon.transformed) {
        return;
      }
      if (!["Zen", "Galar-Zen"].includes(pokemon.species.forme)) {
        pokemon.addVolatile("zenmode");
      }
    },
    onEnd(pokemon) {
      if (!pokemon.volatiles["zenmode"] || !pokemon.hp)
        return;
      pokemon.transformed = false;
      delete pokemon.volatiles["zenmode"];
      if (pokemon.species.baseSpecies === "Darmanitan" && pokemon.species.battleOnly) {
        pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon) {
        if (!pokemon.species.name.includes("Galar")) {
          if (pokemon.species.id !== "darmanitanzen")
            pokemon.formeChange("Darmanitan-Zen");
        } else {
          if (pokemon.species.id !== "darmanitangalarzen")
            pokemon.formeChange("Darmanitan-Galar-Zen");
        }
      },
      onEnd(pokemon) {
        if (["Zen", "Galar-Zen"].includes(pokemon.species.forme)) {
          pokemon.formeChange(pokemon.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Zen Mode",
    rating: 0,
    num: 161,
    shortDesc: "If Darmanitan, enters Zen Mode on switch-in."
  },
  unnerve: {
    onPreStart(pokemon) {
      this.add("-ability", pokemon, "Unnerve");
      this.effectState.unnerved = true;
    },
    onStart(pokemon) {
      if (this.effectState.unnerved)
        return;
      this.add("-ability", pokemon, "Unnerve");
      this.effectState.unnerved = true;
      this.add("-message", `The opposing team is too nervous to use Gems!`);
    },
    onEnd() {
      this.effectState.unnerved = false;
    },
    onFoeTryEatItem() {
      return !this.effectState.unnerved;
    },
    flags: {},
    name: "Unnerve",
    rating: 1.5,
    num: 127,
    shortDesc: "If this Pokemon is active, opposing Pokemon can't use Berries or Gems."
  }
};
//# sourceMappingURL=abilities.js.map
