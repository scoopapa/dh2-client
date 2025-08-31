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
var rulesets_exports = {};
__export(rulesets_exports, {
  Rulesets: () => Rulesets,
  getName: () => getName
});
module.exports = __toCommonJS(rulesets_exports);
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
const Rulesets = {
  spokymod: {
    effectType: "Rule",
    name: "Spokymod",
    desc: "spookymod jumpscare",
    onBegin() {
      this.add(`raw|<img src="https://cdn.discordapp.com/attachments/885011212776128572/894007367069491230/eminem11.JPG?ex=653d9d3e&is=652b283e&hm=c4c41ba3016b5392853143f7c3ab1c35aa1fc894115f52244d8e8bb0b76167da&" height="16" width="16">`);
    },
    onResidual(pokemon) {
      let result;
      let temp = false;
      for (const p of this.sides[0].pokemon) {
        if (p.isActive && p === pokemon)
          temp = true;
      }
      if (!temp)
        return;
      const spinSet = [
        "The wheel spins!",
        "The wheel spins!",
        "I spin the Wheel of Fate!",
        "The Wheel of Fate spins!",
        "You cannot escape the Wheel of Fate!",
        "Spin, wheel! Spin!",
        "Spin the wheel, and seal your fate!",
        "Yes, spin the wheel, you fools. See what horrors are in store for you.",
        "Prepare to feel the wrath of the Wheel of Fate!",
        "Yes, spin the Wheel of Fate!",
        "Your fate... is at hand!",
        "The Wheel of Fate is a fickle mistress.",
        "The wheel spins!",
        "(laughter) Your fate is at hand.",
        "The wheel will be your undoing.",
        "Yes... Yes! The wheel!",
        "Yes... Yes! Fate!",
        "The wheel! Come on wheel, Merasmus needs this.",
        "The wheel! Come on wheel, you owe me.",
        "The wheel! Come on... Set them all on fire.",
        "The wheel! Come on... Big. Head. Come on, big head."
      ];
      const bighead = [
        "Big heads!",
        "(laughter) Big head fate! Big head fate!",
        "I curse your heads... with bigness!",
        "You cannot escape the terror... of your own giant head!",
        "Super big heads!",
        "Plague of head-biggening!",
        "Big heads! The horror! The horror!"
      ];
      const smallhead = [
        "Shrunken heads!",
        "Tiny heads!",
        "Teeny, tiny heads! As foretold in prophecy.",
        "Feel the tiny eldritch terror of an itty... bitty... head!",
        "Like your tiny heads? THANK MAGIC!",
        "Teeny, tiny heads!"
      ];
      const superspeed = "Super Speed!";
      const dance = [
        "Dance fools!",
        "Darkness falls across the land! The dancing hour is close at hand!",
        "And though you fight to stay alive, your body starts to spasmus. For no mere mortal can resist, the magic of Merasmus!",
        "Dance. Dance! DANCE!",
        "Plague of dancing!"
      ];
      const bleed = [
        "The bloodening!",
        "Blood-letting!",
        "Let the blood flow!",
        "Blood fate!",
        "Plague of blood!"
      ];
      const fire = [
        "Firestorm!",
        "Fire!",
        "Fire, yes! Now you're all on fire!",
        "Fire! Oh, that's a good one!",
        "Burn fools, burn!",
        "BURN!",
        "Burn fools!",
        "Hellfire!"
      ];
      const jarate = [
        "Jarate!",
        "Jarate! No magic is beneath Merasmus!",
        "Jarate! That is what you think it is!",
        "Rain of waste!",
        "Jarate! Merasmus is...sorry about this one.",
        "Jarate! Merasmus is...not proud...of this one.",
        "Rain of Jarate!",
        "Rain of Jarate! *sotto voce* I'm sorry about this.",
        "Jarate!",
        "Jarate! Jarate for everyone!",
        "Jarate for everyone! I'm so, so sorry!"
      ];
      const ghosts = [
        "Ghosts!",
        "Let the haunting... begin!",
        "Rise, rise from your graves!",
        "Plague of ghosts!"
      ];
      const lowgravity = [
        "Low gravity!",
        "Gravity displeases me, so I have removed it!",
        "Gravity displeases me, so I have removed it! ...Most of it!",
        "Gravity! I banish thee!",
        "Bid farewell to your precious gravity!"
      ];
      const superjump = ["Super jumping!", "High jump!"];
      const crithit = ["It is the crit boostening!"];
      const ubercharge = [
        "You are GODS! *sotto voce* ...I don't know why I put that on the wheel...",
        "You are GODS! Magic! It is not an exact science.",
        "Invincible! INVINCIBL- Wait, wait, what?",
        "Everybody's invincible! Muhahahaha! Fools! Ahahaha... eheh... Hold on...",
        "You are GODS! Nahahaha... Enjoy your false confidence. It will be your doom!",
        "You are GODS! Aha, that may seem good, but it will be bad. In the fullness of time.",
        "You are GODS! I... meant to do that. It will go badly for you. You watch.",
        "You are GODS! Wait, no no no no no!",
        "\xDCBERCHARGE!"
      ];
      if (this.turn % 3 !== 0)
        return;
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(spinSet)}`);
      result = this.random(9);
      switch (result) {
        case 0:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(bighead)}`);
          for (const pokemon2 of this.getAllActive()) {
            pokemon2.removeVolatile("shrunken", pokemon2);
            pokemon2.addVolatile("dynamax", pokemon2);
          }
          break;
        case 1:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(smallhead)}`);
          for (const pokemon2 of this.getAllActive()) {
            pokemon2.removeVolatile("dynamax", pokemon2);
            pokemon2.addVolatile("shrunken", pokemon2);
          }
          break;
        case 2:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${superspeed}`);
          for (const pokemon2 of this.getAllActive()) {
            this.boost({ spe: 2 }, pokemon2, pokemon2, null, true);
          }
          break;
        case 3:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(dance)}`);
          for (const pokemon2 of this.getAllActive()) {
            this.add("-anim", pokemon2, "Teeter Dance", pokemon2);
            this.add("-anim", pokemon2, "Revelation Dance", pokemon2);
            this.add("-anim", pokemon2, "Quiver Dance", pokemon2);
            this.add("-anim", pokemon2, "Victory Dance", pokemon2);
            this.add("-anim", pokemon2, "Dragon Dance", pokemon2);
            this.add("-anim", pokemon2, "Swords Dance", pokemon2);
            this.add("-anim", pokemon2, "Petal Dance", pokemon2);
            this.add("-anim", pokemon2, "Lunar Dance", pokemon2);
            this.add("-anim", pokemon2, "Feather Dance", pokemon2);
            this.add("-anim", pokemon2, "Rain Dance", pokemon2);
          }
          break;
        case 4:
          const temp2 = this.random(4);
          switch (temp2) {
            case 0:
              this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(bleed)}`);
              for (const pokemon2 of this.getAllActive()) {
                pokemon2.trySetStatus("psn", pokemon2);
              }
              break;
            case 1:
              this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(fire)}`);
              for (const pokemon2 of this.getAllActive()) {
                pokemon2.trySetStatus("brn", pokemon2);
              }
              break;
            case 2:
              this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(jarate)}`);
              for (const pokemon2 of this.getAllActive()) {
                pokemon2.addVolatile("jarate", pokemon2);
                this.hint("Pokemon covered in Jarate take 1.35x damage from opponent's attacks.");
              }
              break;
            case 3:
              this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(ghosts)}`);
              for (const pokemon2 of this.getAllActive()) {
                pokemon2.addVolatile("jumpscare", pokemon2);
              }
              break;
          }
          break;
        case 5:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(lowgravity)}`);
          for (const pokemon2 of this.getAllActive()) {
            pokemon2.addVolatile("telekinesis", pokemon2);
          }
          break;
        case 6:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(superjump)}`);
          this.field.setWeather("superjump");
          break;
        case 7:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(crithit)}`);
          for (const pokemon2 of this.getAllActive()) {
            pokemon2.addVolatile("laserfocus", pokemon2);
          }
          break;
        default:
          this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(ubercharge)}`);
          for (const pokemon2 of this.getAllActive()) {
            pokemon2.addVolatile("ubercharge", pokemon2);
          }
          this.hint("Ubercharged Pokemon take no damage from attacks.");
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
