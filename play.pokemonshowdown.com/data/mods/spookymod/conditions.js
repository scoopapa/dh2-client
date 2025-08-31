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
  brn: {
    inherit: true,
    duration: 10,
    onResidual(pokemon2) {
      this.damage(pokemon2.baseMaxhp / 12);
    },
    onModifyMove(move, pokemon2) {
      if (move.type === "Water") {
        this.add("-curestatus", pokemon2, "brn", "[from] move: " + move);
        pokemon2.clearStatus();
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.type === "Water" && move.category !== "Status") {
        this.add("-curestatus", pokemon, "brn", "[from] move: " + move);
        target.cureStatus();
      }
    },
    onEnd(target) {
      this.add("-end", target, "brn");
      target.clearStatus();
    }
  },
  psn: {
    inherit: true,
    duration: 5,
    onResidual(pokemon2) {
      this.damage(pokemon2.baseMaxhp / 12);
    },
    onEnd(target) {
      this.add("-end", target, "psn");
      target.clearStatus();
    }
  },
  superjump: {
    name: "Super Jump",
    effectType: "Weather",
    duration: 5,
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (["highjumpkick", "jumpkick", "axe kick", "doublekick", "thunderouskick", "lowkick", "megakick", "triplekick", "tropkick", "skyuppercut", "stomp", "stompingtantrum", "bounce", "fly", "skyattack", "blastjump"].includes(move.id)) {
        this.debug("Jump boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(battle, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Super Jump", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Super Jump", "-silent");
      }
    },
    onTryMovePriority: 1,
    onTryMove(attacker, defender, move) {
      if (move.type === "Ground" && move.category !== "Status") {
        this.debug("Super Jump suppress");
        this.add("-fail", attacker, move, "[from] Super Jump");
        this.attrLastMove("[still]");
        return null;
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Super Jump", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  ubercharge: {
    name: "ubercharge",
    duration: 1,
    // this is a volatile status
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "ubercharge", "[silent]");
      this.add("-message", `${target.name} was ubercharged!`);
    },
    onEnd(target) {
      this.add("-end", target, "ubercharge", "[silent]");
      this.add("-message", `${target.name}'s ubercharge wore off!`);
    },
    onInvulnerability(target, source, move) {
      return false;
    }
  },
  jarate: {
    name: "Jarate",
    duration: 1,
    // this is a volatile status
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "jarate", "[silent]");
      this.add("-message", `${target.name} was covered in Jarate!`);
    },
    onEnd(target) {
      this.add("-end", target, "jarate", "[silent]");
      this.add("-message", `${target.name}'s Jarate wore off!`);
    },
    onSourceModifyDamage(damage, source, target, move) {
      this.add("-crit", target);
      return this.chainModify(1.35);
    }
  },
  flinch: {
    inherit: true,
    flinches: true
  },
  jumpscare: {
    name: "jumpscare",
    flinches: true,
    duration: 1,
    onBeforeMovePriority: 8,
    onBeforeMove(pokemon2) {
      let rand = this.random(6);
      switch (rand) {
        case 0:
          this.add(`raw|<img src="https://pbs.twimg.com/media/E5tJ3LOWEAEuOx5.jpg" height="400" width="400">`);
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("man")}|BOO! Did I scare you? I'm a job application \u{1F602}\u{1F602}`);
          break;
        case 1:
          this.add(`raw|<img src="https://i.kym-cdn.com/photos/images/list/002/166/933/8a3.gif" height="400" width="400">`);
          break;
        case 2:
          this.add(`raw|<img src="https://i.pinimg.com/originals/68/12/4c/68124cdddd5615b4c11df6dcdbe1ff7f.gif" height="400" width="400">`);
          break;
        case 3:
          this.add(`raw|<img src="https://www.videomeme.in/wp-content/uploads/2022/12/1669720009775.jpg" height="400" width="400">`);
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Ghost, From That Game With The Ghost Guy In It (I Don't Remember What It Was Called)")}| `);
          break;
        case 4:
          this.add(`raw|<img src="https://static.wikia.nocookie.net/slenderfortress/images/4/46/Zepheniah_Ghost.png/revision/latest?cb=20151009163710" height="400" width="400">`);
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Zepheniah_Ghost.png")}|BOO`);
          break;
        case 5:
          this.add(`raw|<img src="https://media.discordapp.net/attachments/575738724680204329/909632559036629022/talkinchu.png" height="4540" width="411">`);
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("DuoM2")}|Deez`);
          break;
        default:
          this.add(`raw|<img src="https://steamuserimages-a.akamaihd.net/ugc/950713639436160734/A6DB24F241B8A496DED1033A4A345E05A8336DFA/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" height="400" width="400">`);
          this.hint("Connection Lost: Auto-disconnect in 24.7 seconds");
      }
      this.add("cant", pokemon2, "flinch");
      this.runEvent("Flinch", pokemon2);
      return false;
    }
  },
  dynamax: {
    inherit: true,
    duration: 1,
    onStart(pokemon2) {
      this.add("-start", pokemon2, "Dynamax", "[silent]");
      if (pokemon2.species.id === "gourgeistgigantic") {
        this.add("-message", `${pokemon2.name} grew so large it exploded!`);
        this.actions.useMove("Explosion", pokemon2, pokemon2);
      }
    },
    onTryAddVolatile: null,
    onBeforeSwitchOutPriority: null,
    onBeforeSwitchOut: null,
    onSourceModifyDamage: null,
    onDragOutPriority: null,
    onDragOut: null,
    onResidualPriority: null,
    onResidual: null,
    onEnd(pokemon2) {
      this.add("-end", pokemon2, "Dynamax", "[silent]");
    }
  },
  summon: {
    // this is a slot condition
    onResidualOrder: 3,
    onResidual(target) {
      this.effectState.target = this.effectState.side.active[this.effectState.position];
      const data = this.effectState;
      const move = this.dex.moves.get(data.move);
      if (data.target.fainted || data.target === data.source) {
        this.hint(`${move.name} did not hit because the target is ${data.fainted ? "fainted" : "the user"}.`);
        return;
      }
      this.add("-message", `${data.target.illusion ? data.target.illusion.name : data.target.name} took the ${move.name} attack!`);
      data.moveData.accuracy = true;
      data.moveData.isFutureMove = true;
      delete data.moveData.flags["protect"];
      const hitMove = new this.dex.Move(data.moveData);
      if (data.source.isActive) {
        this.add("-anim", data.source, hitMove, data.target);
      }
      this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
    },
    onEnd(target) {
      this.effectState.target = this.effectState.side.active[this.effectState.position];
      const data = this.effectState;
      const move = this.dex.moves.get(data.move);
      if (data.target.fainted || data.target === data.source) {
        this.hint(`${move.name} did not hit because the target is ${data.fainted ? "fainted" : "the user"}.`);
        return;
      }
      this.add("-message", `${data.target.illusion ? data.target.illusion.name : data.target.name} took the ${move.name} attack!`);
      data.moveData.accuracy = true;
      data.moveData.isFutureMove = true;
      delete data.moveData.flags["protect"];
      const hitMove = new this.dex.Move(data.moveData);
      if (data.source.isActive) {
        this.add("-anim", data.source, hitMove, data.target);
      }
      this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
    }
  },
  shrunken: {
    name: "Shrunken",
    duration: 1,
    // this is a volatile status
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "shrunken", "[silent]");
      this.add("-message", `${target.name} shrunk!`);
      target.formeChange(target.species.id + "shrunken");
      if (target.species.id === "gourgeisttinyshrunken") {
        this.add("-message", `${target.name} shrunk so small it disappeared from existence!`);
        target.faint();
      }
    },
    onEnd(target) {
      this.add("-end", target, "shrunken", "[silent]");
      this.add("-message", `${target.name} returned to full size!`);
      target.formeChange(target.baseSpecies);
    }
  }
};
//# sourceMappingURL=conditions.js.map
