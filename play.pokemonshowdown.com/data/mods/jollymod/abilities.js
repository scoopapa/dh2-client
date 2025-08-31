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
  Abilities: () => Abilities,
  getName: () => getName
});
module.exports = __toCommonJS(abilities_exports);
var import_lib = require("../../../lib");
var import_dex_data = require("../../../sim/dex-data");
const usergroups = {};
const usergroupData = (0, import_lib.FS)("config/usergroups.csv").readIfExistsSync().split("\n");
for (const row of usergroupData) {
  if (!(0, import_dex_data.toID)(row))
    continue;
  const cells = row.split(",");
  if (cells.length > 3)
    throw new Error(`Invalid entry when parsing usergroups.csv`);
  usergroups[(0, import_dex_data.toID)(cells[0])] = cells[1].trim() || " ";
}
function getName(name) {
  const userid = (0, import_dex_data.toID)(name);
  if (!userid)
    throw new Error("No/Invalid name passed to getSymbol");
  const group = usergroups[userid] || " ";
  return group + name;
}
const Abilities = {
  /*
  placeholder: {
  	
  	flags: {},
  	name: "",
  	shortDesc: "",
  },
  */
  christmascarol: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.flags["sound"]) {
        move.type = "Ice";
        move.flags.kindanice = 1;
      }
    },
    flags: {},
    name: "Christmas Carol",
    shortDesc: "This Pokemon's sound moves become Ice-type and have halved karma loss."
  },
  evergreen: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Moss Coat boost");
        return this.chainModify(1.3);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Moss Coat boost");
        return this.chainModify(1.3);
      }
    },
    onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.id === "earthquake" || move.id === "magnitude" || move.id === "bulldoze") {
        return this.chainModify(0.5);
      }
    },
    onResidualOrder: 5,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (this.field.isTerrain("grassyterrain"))
        return;
      this.heal(pokemon.maxhp / 16);
    },
    onTerrain(pokemon) {
      if (!this.field.isTerrain("grassyterrain"))
        return;
      this.heal(pokemon.maxhp / 16);
    },
    name: "Evergreen",
    shortDesc: "This Pokemon is considered to be under the effects of Grassy Terrain."
  },
  fightningrod: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fighting") {
        if (!this.boost({ atk: 1 })) {
          this.add("-immune", target, "[from] ability: Fightning Rod");
        }
        return null;
      }
    },
    onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== "Fighting" || move.flags["pledgecombo"])
        return;
      const redirectTarget = ["randomNormal", "adjacentFoe"].includes(move.target) ? "normal" : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget)
          move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add("-activate", this.effectState.target, "ability: Fightning Rod");
        }
        return this.effectState.target;
      }
    },
    flags: { breakable: 1 },
    name: "Fightning Rod",
    shortDesc: "This Pokemon draws Fighting moves to itself to raise Atk by 1; Fighting immunity."
  },
  ghostofchristmaspast: {
    onBeforeSwitchIn(pokemon) {
      pokemon.illusion = null;
      for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
        const possibleTarget = pokemon.side.pokemon[i];
        if (!possibleTarget.fainted) {
          if (!pokemon.terastallized || possibleTarget.species.baseSpecies !== "Ogerpon") {
            pokemon.illusion = possibleTarget;
          }
          break;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.illusion) {
        this.debug("illusion cleared");
        pokemon.illusion = null;
        const details = pokemon.species.name + (pokemon.level === 100 ? "" : ", L" + pokemon.level) + (pokemon.gender === "" ? "" : ", " + pokemon.gender) + (pokemon.set.shiny ? ", shiny" : "");
        this.add("replace", pokemon, details);
        this.add("-end", pokemon, "Illusion");
        if (this.ruleTable.has("illusionlevelmod")) {
          this.hint("Illusion Level Mod is active, so this Pok\xE9mon's true level was hidden.", true);
        }
      }
    },
    onFaint(pokemon) {
      pokemon.illusion = null;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    name: "Ghost of Christmas Past",
    shortDesc: "This Pokemon appears as the last Pokemon in the party."
  },
  ghostofchristmaspresent: {
    onBasePowerPriority: 24,
    onBasePower(basePower, attacker, defender, move) {
      if (attacker.side.karma != defender.side.karma) {
        if (attacker.side.karma > defender.side.karma) {
          this.debug("Rivalry boost");
          return this.chainModify(1.25);
        } else {
          this.debug("Rivalry weaken");
          return this.chainModify(0.75);
        }
      }
    },
    flags: {},
    name: "Ghost of Christmas Present",
    shortDesc: "This Pokemon deals 1.25x damage to Pokemon with less karma but 0.75x damage to those with more karma."
  },
  ghostofchristmasyettocome: {
    onAnyFaintPriority: 1,
    onAnyFaint() {
      this.boost({ atk: 1 }, this.effectState.target);
    },
    flags: {},
    name: "Ghost of Christmas Yet to Come",
    shortDesc: "This Pokemon's Attack is raised by 1 stage when another Pokemon faints."
  },
  grinchsapprentice: {
    onModifyMove(move) {
      move.flags.naughty = 1;
    },
    flags: {},
    name: "Grinch's Apprentice",
    shortDesc: "This Pokemon's attacks lower its karma by an additional point."
  },
  heatproof: {
    onTryHit(target, source, move) {
      if (move.type === "Fire" && target !== source) {
        this.add("-immune", target, "[from] ability: Heatproof");
        return null;
      }
    },
    onUpdate(pokemon) {
      if (pokemon.status === "brn") {
        this.add("-activate", pokemon, "ability: Heatproof");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Heatproof");
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Heatproof",
    shortDesc: "This Pokemon is immune to Fire-type moves and burn."
  },
  iceface: {
    onModifyMovePriority: 1,
    onModifyMove(move, attacker, defender) {
      if (attacker.species.baseSpecies !== "Eiscue" || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "protect")
        return;
      const targetForme = move.id === "protect" ? "Eiscue" : "Eiscue-Noice";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Ice Face",
    shortDesc: "If Eiscue, changes Forme to Noice before attacks and base before Protect."
  },
  jinglebells: {
    onModifyMove(move) {
      if (move.flags["sound"])
        move.flags.nice = 1;
    },
    flags: {},
    name: "Jolly Spirit",
    shortDesc: "This Pokemon's sound moves increase its karma by 1."
  },
  jollyspirit: {
    onModifyMove(move) {
      if (move.flags["nice"])
        move.flags.extranice = 1;
    },
    flags: {},
    name: "Jolly Spirit",
    shortDesc: "This Pokemon's nice moves raise its karma by an additional point."
  },
  meltingsnow: {
    onStart(source) {
      this.field.addPseudoWeather("watersport");
    },
    flags: {},
    name: "Melting Snow",
    shortDesc: "On switchin, this Pokemon summons Water Sport."
  },
  mountaineer: {
    onDamage(damage, target, source, effect) {
      if (effect && effect.id === "stealthrock") {
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (move.type === "Rock") {
        this.add("-immune", target, "[from] ability: Mountaineer");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Mountaineer",
    shortDesc: "This Pokemon is immune to Rock-type moves and Stealth Rock."
  },
  permafrost: {
    // Implemented in scripts/pokemon/setStatus
    flags: {},
    name: "Permafrost",
    shortDesc: "This Pokemon can inflict Frostbite regardless of typing."
  },
  snowcloak: {
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isWeather("snow"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Snow Cloak",
    shortDesc: "If Snow is active, this Pokemon's Defense is 1.5x."
  },
  spiritofgiving: {
    desc: "On switch-in, every Pok\xE9mon in this Pok\xE9mon's party regains the item it started with, even if the item was a popped Air Balloon, if the item was picked up by a Pok\xE9mon with the Pickup Ability, or the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. It doesn't work if the Pok\xE9mon is already holding something else.",
    shortDesc: "On switchin, this Pokemon restores the party's used or removed items.",
    name: "Spirit of Giving",
    onStart(pokemon) {
      const side = pokemon.side;
      let activated = false;
      for (const ally of side.pokemon) {
        if (ally.item)
          continue;
        if (ally.lostItemForDelibird) {
          const item = ally.lostItemForDelibird;
          if (ally.setItem(item)) {
            if (!activated) {
              this.add("-ability", pokemon, "Spirit of Giving");
            }
            activated = true;
            this.add("-item", ally, this.dex.items.get(item), "[from] Ability: Spirit of Giving");
          }
        }
      }
    },
    rating: 4,
    num: -36
  },
  zenmode: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (target.baseSpecies.baseSpecies !== "Zen Galarian Darmanitan" || target.transformed) {
        return;
      }
      if (target.species.id !== "zengalariandarmanitanzen")
        target.formeChange("Zen Galarian Darmanitan-Zen");
    },
    name: "Zen Mode",
    shortDesc: "If Zen Galarian Darmanitan, change Mode to Zen when damaged by an attack."
  },
  moody: {
    onModifyMove(move) {
      if (this.randomChance(1, 2))
        move.flags.naughty = 1;
      else
        move.flags.extranice = 1;
    },
    flags: {},
    name: "Moody",
    shortDesc: "This Pokemon's moves randomly increase its karma by 2 or decrease it by 1."
  }
};
//# sourceMappingURL=abilities.js.map
