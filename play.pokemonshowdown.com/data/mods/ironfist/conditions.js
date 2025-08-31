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
  Conditions: () => Conditions,
  getName: () => getName
});
module.exports = __toCommonJS(conditions_exports);
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
const Conditions = {
  //slate 1
  baseball: {
    name: "baseball",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      this.add("-message", "baseball this guy");
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "baseball", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "baseball");
      }
    },
    onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      return this.chainModify(0.75);
    },
    onModifySpDPriority: 1,
    onModifySpD(spd, pokemon) {
      return this.chainModify(0.75);
    },
    onTry(source, target, move) {
      if (move.flags["sound"]) {
        this.add("-fail", source);
        this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(target.name)}|Shut Up\u203C\uFE0F`);
        return null;
      }
    }
  },
  bigbutton: {
    inherit: true,
    duration: null,
    onStart(pokemon) {
      if (!pokemon.big)
        pokemon.big = true;
      this.add("-start", pokemon, "Dynamax", "[silent]");
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (["grassknot", "lowkick"].includes(move.id)) {
        return 120;
      }
    },
    onBasePower(basePower, pokemon, target, move) {
      if (!target || target.volatiles["bigbutton"])
        return;
      const boostedMoves = [
        "aerialace",
        "aquatail",
        "crabhammer",
        "forcepalm",
        "furyattack",
        "gigaimpact",
        "heatcrash",
        "heavyslam",
        "highhorsepower",
        "irontail",
        "lethalhug",
        "meteormash",
        "nuzzle",
        "peck",
        "playrough",
        "slam",
        "strugglebug",
        "visegrip"
      ];
      const minimizeMoves = [
        "stomp",
        "steamroller",
        "bodyslam",
        "flyingpress",
        "dragonrush",
        "heatcrash",
        "heavyslam",
        "maliciousmoonsault",
        "supercellslam"
      ];
      if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id)) {
        move.accuracy = true;
        if (["heatcrash", "heavyslam"].includes(move.id))
          return 120;
        if (move.basePower < 60)
          return this.chainModify(2);
        if (minimizeMoves.includes(move.id))
          return this.chainModify(1.5);
      }
    },
    onModifyMove(move, pokemon, target) {
      if (!target || target.volatiles["bigbutton"])
        return;
      const boostedMoves = [
        "aerialace",
        "aquatail",
        "crabhammer",
        "forcepalm",
        "furyattack",
        "gigaimpact",
        "heatcrash",
        "heavyslam",
        "highhorsepower",
        "irontail",
        "lethalhug",
        "meteormash",
        "nuzzle",
        "peck",
        "playrough",
        "slam",
        "strugglebug",
        "visegrip"
      ];
      const minimizeMoves = [
        "stomp",
        "steamroller",
        "bodyslam",
        "flyingpress",
        "dragonrush",
        "heatcrash",
        "heavyslam",
        "maliciousmoonsault",
        "supercellslam"
      ];
      if (boostedMoves.includes(move.id) || minimizeMoves.includes(move.id))
        move.accuracy = true;
    },
    onEnd(pokemon) {
      this.add("-end", pokemon, "Dynamax", "[silent]");
    }
  },
  //slate 3
  sunnyday: {
    inherit: true,
    //slate 10
    durationCallback(source, effect) {
      if (source?.hasItem("heatrock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    },
    //slate 6
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella") || defender.hasAbility("divininghorn"))
        return;
      if (move.type === "Fire") {
        this.debug("Sunny Day fire boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "SunnyDay", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "SunnyDay");
      }
    }
  },
  raindance: {
    inherit: true,
    //slate 10
    durationCallback(source, effect) {
      if (source?.hasItem("damprock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    },
    //slate 6
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella") || defender.hasAbility("divininghorn"))
        return;
      if (move.type === "Water") {
        this.debug("Rain water boost");
        return this.chainModify(1.5);
      }
    },
    onFieldResidual() {
      this.add("-weather", "RainDance", "[upkeep]");
      if (this.field.isTerrain("fishingterrain"))
        this.effectState.duration++;
      this.eachEvent("Weather");
    }
  },
  //slate 6
  acidrain: {
    name: "Acid Rain",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("sulphurrock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Acid Rain", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Acid Rain");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Acid Rain", "[upkeep]");
      if (this.field.isWeather("Acid Rain"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      if (target.hasType("Lemon"))
        this.heal(target.baseMaxhp / 16, target, target);
      else if ((target.hasType("Water") || target.hasType("Steel")) && !target.hasType("Bug"))
        this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  graveyard: {
    name: "Graveyard",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("bonerockorsomethingidfk")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella") || defender.hasAbility("divininghorn"))
        return;
      if (move.type === "Ghost") {
        this.debug("Graveyard ghost boost");
        return this.chainModify(1.3);
      }
    },
    onFieldStart(field, source, effect) {
      this.add("-message", "The dead rose from their graves!");
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Graveyard", "[from] ability: " + effect.name, "[of] " + source, "[silent]");
      } else {
        this.add("-weather", "Graveyard", "[silent]");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-message", "Zombies roam the battlefield.");
      this.add("-weather", "Graveyard", "[upkeep]");
      if (this.field.isWeather("Graveyard"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      if (!target.hasAbility("magicguard") && !target.hasAbility("ghoulgobbler") && !target.hasAbility("rkssystem") && !target.hasAbility("fashionicon") && !target.hasAbility("monstermash") && !target.hasType("Dark") && !target.hasType("Ghost") && !target.hasType("Normal")) {
        this.add("-message", `${target.name} was attacked by the zombies!`);
        this.damage(target.baseMaxhp / 16);
      }
    },
    onFieldEnd() {
      this.add("-weather", "none", "[silent]");
      this.add("-message", "The zombies vanished from Ironfistlandia... for now.");
    }
  },
  //slate 10
  sandstorm: {
    inherit: true,
    durationCallback(source, effect) {
      if (source?.hasItem("smoothrock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    }
  },
  hail: {
    inherit: true,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    }
  },
  snowscape: {
    inherit: true,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      if (source?.hasAbility("timebomb")) {
        return 10;
      }
      return 5;
    }
  }
};
//# sourceMappingURL=conditions.js.map
