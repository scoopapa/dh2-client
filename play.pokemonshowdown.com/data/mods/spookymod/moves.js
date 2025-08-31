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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves,
  getName: () => getName
});
module.exports = __toCommonJS(moves_exports);
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
const Moves = {
  knockoff: {
    inherit: true,
    basePower: 20
  },
  bitterblade: {
    inherit: true,
    basePower: 75,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, heal: 1 }
  },
  poltergeist: {
    inherit: true,
    shortDesc: "Fails if target has no item. Removes target's item.",
    basePower: 100,
    accuracy: 100,
    onAfterHit(target2, source) {
      if (source.hp) {
        const item = target2.takeItem();
        if (item) {
          this.add("-enditem", target2, item.name, "[from] move: Poltergeist", "[of] " + source);
        }
      }
    }
  },
  spiritshackle: {
    shortDesc: "Removes the target's Ghost type.",
    basePower: 85,
    inherit: true,
    onHit(target2) {
      if (!target2.getTypes().includes("Ghost"))
        return;
      const newBaseTypes = target2.getTypes().filter((t) => t !== "Ghost");
      this.add("-start", target2, "typechange", newBaseTypes);
      target2.setType(newBaseTypes);
    },
    secondary: null
  },
  shadowpunch: {
    shortDesc: "Uses Pain Split.",
    inherit: true,
    basePower: 75,
    onAfterHit(target2, source, move) {
      this.actions.useMove("painsplit", target2, source);
    }
  },
  shadowforce: {
    num: 467,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Shadow Force",
    shortDesc: "Hits two turns after use.",
    pp: 5,
    priority: 0,
    flags: { allyanim: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source, target2) {
      if (!target2.side.addSlotCondition(target2, "futuremove"))
        return false;
      Object.assign(target2.side.slotConditions[target2.position]["futuremove"], {
        duration: 3,
        move: "shadowforce",
        source,
        moveData: {
          id: "shadowforce",
          name: "Shadow Force",
          accuracy: 100,
          basePower: 100,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Ghost"
        }
      });
      this.add("-start", source, "move: Shadow Force");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  phantomforce: {
    inherit: true,
    basePower: 75
  },
  shadowbone: {
    inherit: true,
    isNonstandard: null,
    shortDesc: "Uses the user's Defense in calculation. User: -1 Def.",
    overrideOffensiveStat: "def",
    self: {
      boosts: {
        def: -1
      }
    },
    secondary: null
  },
  spectralthief: {
    shortDesc: "Fails if no stat boosts. Steals the target's stat boosts.",
    inherit: true,
    isNonstandard: null,
    onTry(source) {
      if (target.positiveBoosts() === 0)
        return false;
    }
  },
  ragefist: {
    shortDesc: "+1 power per time hit, max 300. 1 damage recoil.",
    inherit: true,
    pp: 187.5,
    basePowerCallback(pokemon) {
      return Math.min(350, 50 + 1 * pokemon.timesAttacked);
    },
    onAfterHit(target2, pokemon, move) {
      this.damage(1, pokemon, target2);
    }
  },
  bittermalice: {
    inherit: true,
    basePower: 50,
    shortDesc: "+10 power for each PP used.",
    basePowerCallback(pokemon, target2, move) {
      return move.basePower + 10 * (pp - moveSlot.pp);
    },
    secondary: null
  },
  lastrespects: {
    inherit: true,
    basePower: 60,
    basePowerCallback(pokemon, target2, move) {
      return 60 + 5 * pokemon.side.totalFainted;
    },
    shortDesc: "+1 priority and +5 BP for each ally fainted.",
    priority: -1,
    onModifyPriority(priority, source, target2, move) {
      return priority + source.side.totalFainted;
    }
  },
  astonish: {
    inherit: true,
    shortDesc: "Fails if not turn 1 out. 100% chance to flinch.",
    onTry(source) {
      if (source.activeMoveActions > 1) {
        this.hint("Astonish only works on your first turn out.");
        return false;
      }
    },
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    }
  },
  shadowclaw: {
    inherit: true,
    basePower: 50,
    shortDesc: "Always results in a critical hit.",
    willCrit: true,
    critRatio: null
  },
  lick: {
    inherit: true,
    shortDesc: "Paralyzes the target. Once per battle.",
    onAfterHit(target2, source, move) {
      if (source.lick)
        return;
      source.lick = true;
      target2.trySetStatus("par", source, move);
    },
    secondary: null
  },
  astralbarrage: {
    inherit: true,
    shortDesc: "User faints.",
    basePower: 150,
    selfdestruct: "always"
  },
  bombinomicon: {
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "BOMBINOMICON!",
    shortDesc: "Fails if the user is hit before it moves.",
    pp: 5,
    priority: -3,
    flags: { contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, trick: 1 },
    onPrepareHit(target2, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shell Trap", target2);
    },
    priorityChargeCallback(pokemon) {
      const bomb = [
        "Bombinomicon! Destroy them!",
        "By the power...of the Bombinomicon!",
        "Booooooombinomicon!",
        "Forbidden book! I unchain thee!",
        "Cower before the Bombinomicon!",
        "Beebus Barrasbus Bombinomicon!",
        "Bombinomicon! Heed my call!",
        "Feel the terror...of reading!",
        "Feel the terror...of books!",
        "Heads up!",
        "Fire in the hole!",
        "Grenade! (laughter)",
        "(crazed laughter)",
        "Bombs! So many bombs!",
        "Magic everyone! Magic!",
        "Yes! Yes! Perfect!",
        "Yes! Flee! Flee, cowards!",
        "(laughter) Run cowards! Run!",
        "That's right. Run cowards!",
        "(evil laughter) Run cowards! Run!",
        "How will you fight me when you're all so scared?",
        "The fear is inside you!",
        "Fear me! Poop, poop in your pumpkin pants!"
      ];
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName("Merasmus")}|${this.sample(bomb)}`);
      pokemon.addVolatile("bombinomicon");
    },
    beforeMoveCallback(pokemon) {
      if (pokemon.volatiles["bombinomicon"]?.lostFocus) {
        this.add("cant", pokemon, "BOMBINOMICON!", "BOMBINOMICON!");
        return true;
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-singleturn", pokemon, "move: BOMBINOMICON!");
      },
      onHit(pokemon, source, move) {
        if (move.category !== "Status") {
          this.effectState.lostFocus = true;
        }
      },
      onTryAddVolatile(status, pokemon) {
        if (status.id === "flinch")
          return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Ghost"
  },
  hex: {
    inherit: true,
    shortDesc: "Fails if the target does not have a status ailment.",
    basePower: 100,
    basePowerCallback: null,
    flags: { protect: 1, mirror: 1, trick: 1 },
    onTry(source, target2) {
      return !!target2.status;
    }
  },
  nightshade: {
    inherit: true,
    flags: { protect: 1, mirror: 1, heal: 1 },
    shortDesc: "Deals and heals damage equal to the user's level.",
    onHit(target2, pokemon) {
      this.heal(pokemon.level, pokemon);
    }
  },
  moongeistbeam: {
    inherit: true,
    isNonstandard: null,
    shortDesc: "Fails if the user did not use Moonlight in the previous turn. Ignores abilities.",
    onTry(source, target2) {
      return source.lastMove === "Moonlight";
    }
  },
  shadowball: {
    inherit: true,
    shortDesc: "10% chance to lower the target's/user's Sp. Def by 1",
    basePower: 70,
    secondary: {
      chance: 20,
      onHit(target2, source, move) {
        if (this.random(2) === 0)
          this.boost({ spd: -1 }, target2, source, move);
        else
          this.boost({ spd: -1 }, source, source, move);
      }
    }
  },
  infernalparade: {
    inherit: true,
    shortDesc: "Added Fire effectiveness. 30% chance to burn the target.",
    basePowerCallback: null,
    onEffectiveness(typeMod, target2, type, move) {
      return typeMod + this.dex.getEffectiveness("Fire", type);
    }
  },
  ominouswind: {
    inherit: true,
    isNonstandard: null,
    shortDesc: "Forces the target out. 2x power if the user was hit.",
    basePower: 50,
    basePowerCallback(pokemon, target2, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target2 && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target2);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    forceSwitch: true,
    secondary: null
  },
  grudge: {
    inherit: true,
    isNonstandard: null,
    priority: 1
  },
  nightmare: {
    inherit: true,
    isNonstandard: null,
    shortDesc: "A statused target is hurt 1/4 max HP per turn.",
    volatileStatus: "nightmare",
    condition: {
      noCopy: true,
      onStart(pokemon) {
        if (!pokemon.status && !pokemon.hasAbility("comatose")) {
          return false;
        }
        this.add("-start", pokemon, "Nightmare");
      },
      onResidualOrder: 11,
      onResidual(pokemon) {
        this.damage(pokemon.baseMaxhp / 4);
      }
    }
  },
  spite: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Spite",
    shortDesc: "Copies, disables a foe's move. User must be faster.",
    pp: 20,
    priority: 0,
    flags: {
      protect: 1,
      bypasssub: 1,
      failencore: 1,
      failmefirst: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failinstruct: 1,
      failmimic: 1
    },
    onTryHit(target2, pokemon) {
      const action = this.queue.willMove(target2);
      if (!action)
        return false;
      const move = this.dex.getActiveMove(action.move.id);
      target2.lastmove = move;
      if (action.zmove || move.isZ || move.isMax)
        return false;
      if (target2.volatiles["mustrecharge"])
        return false;
      if (move.category === "Status" || move.flags["failmefirst"])
        return false;
      this.actions.useMove(move, pokemon, target2);
      target2.addVolatile("spite");
      return null;
    },
    condition: {
      duration: 4,
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(pokemon, source, effect) {
        if (effect.effectType === "Ability") {
          this.add("-start", pokemon, "Spite", pokemon.lastMove, "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-start", pokemon, "Spite", pokemon.lastMove);
        }
        const move = pokemon.lastmove;
        this.effectState.move = move;
      },
      onResidualOrder: 17,
      onEnd(pokemon) {
        this.add("-end", pokemon, "Spite");
      },
      onBeforeMovePriority: 7,
      onBeforeMove(attacker, defender, move) {
        if (this.effectState.move.id === move.id) {
          this.add("cant", attacker, "Spite", move);
          return false;
        }
      },
      onDisableMove(pokemon) {
        for (const moveSlot2 of pokemon.moveSlots) {
          if (this.effectState.move.id === moveSlot2.id) {
            pokemon.disableMove(moveSlot2.id);
          }
        }
      }
    },
    secondary: null,
    target: "adjacentFoe",
    type: "Ghost"
  },
  trickortreat: {
    inherit: true,
    isNonstandard: null,
    shortDesc: "50% chance to trick, 50% chance to treat.",
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, trick: 1 },
    onHit(target2, source) {
      let random = this.random(2);
      if (random === 0) {
        let random2 = this.random(4);
        switch (random2) {
          case 0:
            const statuses = ["brn", "par", "slp", "psn", "frz"];
            source.trySetStatus(this.sample(statuses), source);
            break;
          case 1:
            const volatiles = ["taunt", "torment", "encore", "disable"];
            source.addVolatile(this.sample(volatiles), source);
            break;
          case 2:
            this.actions.useMove("Trick", source, target2);
            break;
          default:
            this.damage(source.baseMaxhp / 4, source);
        }
      } else {
        let random2 = this.random(2);
        if (random2 === 0)
          source.cureStatus();
        else
          this.heal(source.baseMaxhp / 4, source);
      }
    }
  },
  confuseray: {
    inherit: true,
    priority: 1,
    shortDesc: "Fails if target attacks. May cause target to disobey.",
    flags: { protect: 1, reflectable: 1, mirror: 1, trick: 1 },
    onTry(source, target2) {
      const action = this.queue.willMove(target2);
      const move = action?.choice === "move" ? action.move : null;
      if (!move || move.category === "Status" && move.id !== "mefirst" || target2.volatiles["mustrecharge"]) {
        return false;
      }
    },
    volatileStatus: "confuseray",
    condition: {
      duration: 1,
      onStart(pokemon) {
        this.add("-start", pokemon, "Confuse Ray", "[silent]");
        this.add("-message", `${pokemon.name} became disobedient!`);
      },
      onBeforeMove(pokemon, target2, move) {
        if (this.random(2) === 0) {
          let rand = this.random(10);
          if (rand < 1) {
            if (pokemon.setStatus("slp", pokemon, move))
              this.add("-message", `${pokemon.name} began to nap!`);
            else
              rand = 3;
          } else if (rand < 3) {
            this.add("-message", `${pokemon.name} won't obey!`);
            const damage = this.actions.getConfusionDamage(pokemon, 40);
            if (typeof damage !== "number")
              throw new Error("Confusion damage not dealt");
            const activeMove = { id: this.toID("confused"), effectType: "Move", type: "???" };
            this.damage(damage, pokemon, pokemon, activeMove);
          }
          if (rand >= 3) {
            const noAttack = [
              "ignored orders!",
              "is loafing around!",
              "turned away!",
              "pretended not to notice!"
            ];
            const noAttackSleep = "ignored orders and kept sleeping!";
            this.add("-message", `${pokemon.name} ${pokemon.status === "slp" && ["sleeptalk", "snore"].includes(pokemon.move) ? noAttackSleep : this.sample(noAttack)}`);
          }
          return null;
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Confuse Ray", "[silent]");
        this.add("-message", `${pokemon.name} got its act together!`);
      }
    }
  },
  grassyglide: {
    inherit: true,
    bp: 70
  },
  wordsdance: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Words Dance",
    shortDesc: "Confuses the target and lowers its Def/SpD by 2.",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, trick: 1, dance: 1, sound: 1 },
    ignoreImmunity: { "Normal": true },
    onPrepareHit(source, target2, move) {
      const messages = [
        "L \u{1F1F1} RATIO \u2797 READ MARX \u{1F9D4}\u200D\u2642\uFE0F \u{1F4D5} NO TOUHOU GIRLS \u{1F52B} \u{1F467} \u{1F6AB} CISHET \u{1F468}\u200D\u{1F469}\u200D\u{1F466} NEUROTYPICAL \u{1F9E0} \u{1F468}\u200D\u{1F4BC} CRINGE \u{1F62C} NO DRIP \u{1F327}\uFE0F \u{1F6AB} GAME FUN HAPPY TIMES \u6E38\u620F\u4E50\u8DA3\u5FEB\u4E50\u65F6\u5149 \u{1F3B2} \u{1F3AE} ACCELERATE \u23E9 ACCELERATE \u23E9 ACCELERATE \u23E9 \u{1F9DE}\u200D\u2642\uFE0F \u{1F3A3} \u{1F307} \u{1F50B} \u{1FAA1} SQUID GAMES \u203C\uFE0F",
        `Are you kidding ??? What the **** are you talking about man ? You are a biggest looser i ever seen in my life ! You was doing PIPI in your pampers when i was beating players much more stronger then you! You are not proffesional, because proffesionals knew how to lose and congratulate opponents, you are like a noob crying after i beat you! Be brave, be honest to yourself and stop this trush talkings!!! Everybody know that i am very good bh player, i can win anyone in the world in single game! And "c"ity "s"c is nobody for me, just a player who are crying every single time when loosing, ( remember what you say about Sevag ) !!! Stop playing with my name, i deserve to have a good name during whole my bh carrier, I am Officially inviting you to NDBH match with the Prize fund! Both of us will invest 5000$ and winner takes it all! I suggest all other people who's intrested in this situation, just take a look at my results in OMPL 8 and 9 tournaments, and that should be enough... No need to listen for every crying babe, ChampionLeonOM is always play Fair ! And if someone will continue Officially talk about me like that, we will meet in Court! God bless with true! True will never die ! Liers will kicked off...`,
        "megas for all mismagius torment confusion alchemist araquanid no recover parasex flavor town megas for all sharting pot dragon heaven big button is watching pet mods gluke smogon kero megas for all dimrah pumpkin joltemons sylvemons farfetchd acid rock hematite boomer mentality flavor drama sexcadrill pet mods smogon pet mods bubble dies from cringe purple frong bat silvally pet mods",
        "\u514D\u8D39\u5854\u666E\u4E50\u4E50 Free Tapu Lele \u683C\u9C81\u514B\u4F2F\u7235\u914D\u5BF9 The Earl G-Luke Pairing \u5384\u5C14\u54C8\u514B\u65AF\u5927\u5C60\u6740 The Earl Hax Massacre \u53CD\u4E54\u5C14\u7279\u8499\u65AF\u6597\u4E89 The Anti-Joltemons Struggle \u9002\u5408\u6240\u6709\u57CE\u5E02\u7684\u5927\u578B\u5927\u578B\u8BBE\u65BD The Great M4A Tourban \u4F1F\u5927\u7684\u5357\u74DC\u53F2\u8BD7\u5D4C\u5165\u5931\u8D25 The Great Gourgeist 0-8 \u5927\u6309\u94AE Big Button \u970D\u666E\u6717 Hooporant \u526F\u6027\u4EA4 Parasex \u7EC6\u80DE\u5668 Cellsius \u591A\u8F6C\u9EBB\u75F9 Multi-turn paralysis \u7F57\u6258\u59C6\u98CE\u6247 Rotom Fan \u5E93\u8BFA\u4E4B\u95E8 Cunogate \u56DB\u4E07\u4E94\u5343\u65AF\u79D1\u5E15\u5E15 Scoopapa \u63A8\u51FA\u6A31\u6843 Rollout Cherrim \u56F4\u5DFE\u7535\u94BB Scarf Vikadrill \u8001\u677F\u8054\u7CFB\u65B9\u5F0F The Bossaru Contact \u6C38\u6052\u5149\u675F Eternabeam \u58C1\u864E\u5976\u916A\u5BA3\u4F20 Gekokeso Propaganda \u5947\u591A Cheeto",
        'Right here it says "UPS: Our Fastest Ground Shipping Ever." You know, what if it said "Our fastest and hardest boner?" Quickest, uh, speed for getting a boner? Alright, thanks guys.',
        "Pog sussy balls means nothing to you!?!? WTF! That\u2019s one epic fail! You\u2019re in the quite the pickle there Rick! Im rofling on the floor laughing AND firing my lazor AND you sir win teh interwebs AND le reddit gold if i do say so myself yessir yessir!"
      ];
      this.add("-message", `${target2.name} took a deep breath and said:`);
      this.attrLastMove("[still]");
      this.add("-anim", target2, "Boomburst", source);
      this.add("-message", this.sample(messages));
    },
    volatileStatus: "confusion",
    boosts: {
      def: -2,
      spd: -2
    },
    secondary: null,
    target: "normal",
    type: "Normal"
  },
  runch: {
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    shortDesc: "Combines Grass in its effectiveness. Sets Leech Seed.",
    name: "Runch",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    onPrepareHit(target2, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Grassy Glide", target2);
    },
    onEffectiveness(typeMod, target2, type, move) {
      return typeMod + this.dex.getEffectiveness("Grass", type);
    },
    onHit(target2, source) {
      if (target2.hasType("Grass"))
        return null;
      target2.addVolatile("leechseed", source);
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  ualchop: {
    accuracy: 90,
    basePower: 40,
    category: "Physical",
    name: "Ual Chop",
    shortDesc: "Hits twice. 30% chance to lower target's highest offense.",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onPrepareHit(target2, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Dual Chop", target2);
    },
    multihit: 2,
    secondary: {
      chance: 30,
      onHit(target2, source, move) {
        if (target2.getStat("atk", false, true) > target2.getStat("spa", false, true)) {
          return !!this.boost({ atk: -1 }, target2, source, move);
        } else
          return !!this.boost({ spa: -1 }, target2, source, move);
      }
    },
    target: "normal",
    type: "Dragon",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  lackoff: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Lack Off",
    shortDesc: "Heals equal to the opponent's missing HP.",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onPrepareHit(target2, source, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source, "Strength Sap", target2);
    },
    onHit(target2, source) {
      if (target2.basemaxHp === target2.hp)
        return false;
      const toHeal = target2.baseMaxhp - target2.hp;
      console.log(target2.baseMaxhp);
      console.log(target2.hp);
      console.log(toHeal);
      return !!this.heal(toHeal, source, target2);
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  flowertrick: {
    inherit: true,
    flags: { protect: 1, mirror: 1, trick: 1 }
  },
  powertrick: {
    inherit: true,
    flags: { snatch: 1, trick: 1 }
  },
  trick: {
    inherit: true,
    flags: { protect: 1, mirror: 1, allyanim: 1, noassist: 1, failcopycat: 1, trick: 1 }
  },
  trickroom: {
    inherit: true,
    flags: { mirror: 1, trick: 1 }
  },
  shadowleap: {
    accuracy: 100,
    basePower: 10,
    category: "Physical",
    shortDesc: "Heals 60 HP and switches out.",
    name: "Shadow Leap",
    pp: 1.25,
    priority: 0,
    flags: { protect: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Ipsum Instantarium!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shadow Sneak", target2);
    },
    onAfterHit(target2, source, move) {
      this.heal(60, source, source);
    },
    selfSwitch: true,
    target: "normal",
    type: "Ghost"
  },
  firebail: {
    accuracy: 100,
    basePower: 100,
    category: "Special",
    shortDesc: "Burns the target.",
    name: "FirebaIl",
    pp: 1.25,
    priority: 0,
    flags: { protect: 1, bullet: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Caputus Crepitus!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Searing Shot", target2);
    },
    status: "brn",
    target: "normal",
    type: "Fire"
  },
  blastjump: {
    accuracy: 100,
    basePower: 50,
    category: "Special",
    shortDesc: "Summons Super Jump and heals the user for 50 HP.",
    name: "Blast Jump",
    pp: 1.25,
    priority: 0,
    flags: { protect: 1, bullet: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    weather: "superjump",
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Amplus Tripudio!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "High Jump Kick", target2);
    },
    target: "normal",
    type: "Fighting"
  },
  overheal: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Gives the user Ubercharge and heals it for 1/8 max HP for 3 turns.",
    name: "Overheal",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Barpo Kabalto!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Geomancy", target2);
    },
    onHit(pokemon) {
      pokemon.addVolatile("ubercharge");
    },
    volatileStatus: "overheal",
    condition: {
      duration: 3,
      onStart(pokemon) {
        this.add("-start", pokemon, "Overheal");
      },
      onResidualOrder: 6,
      onResidual(pokemon) {
        this.heal(pokemon.baseMaxhp / 8);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Overheal");
      }
    },
    target: "self",
    type: "Normal"
  },
  batswarm: {
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    shortDesc: "Poisons the target.",
    name: "Bat Swarm",
    pp: 1.25,
    priority: 0,
    flags: { protect: 1, contact: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Deus Invictus!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Gunk Shot", target2);
    },
    status: "psn",
    target: "normal",
    type: "Poison"
  },
  pumpkinmirv: {
    accuracy: 100,
    basePower: 0,
    category: "Status",
    shortDesc: "If the user attacks first after this turn, the target loses 1/2 max HP. Disappears if the target attacks first.",
    name: "Pumpkin MIRV",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, bullet: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Pactum Diabolus!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Leech Seed", target2);
    },
    volatileStatus: "pumpkinmirv",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Pumpkin MIRV", "[silent]");
        this.add("-message", `Pumpkin bombs were scattered around ${pokemon.name}!`);
      },
      onAfterMove(pokemon, target2, move) {
        if (move.category !== "Status") {
          pokemon.removeVolatile("Pumpkin MIRV");
          this.add("-message", `The pumpkin bombs around ${pokemon.name} disappeared!`);
        }
      },
      onDamagingHit(damage, target2, source, move) {
        if (source !== target2) {
          this.add("-message", "The pumpkin bombs exploded!");
          this.damage(target2.baseMaxhp / 2, target2, source);
          target2.removeVolatile("Pumpkin MIRV");
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Pumpkin MIRV", "[silent]");
      }
    },
    target: "normal",
    type: "Fire"
  },
  stealth: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "Heals 100 HP; taunted, doubled evasion for one turn.",
    name: "Stealth",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Barpo Invisium!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shadow Force", target2);
    },
    volatileStatus: "stealth",
    condition: {
      duration: 2,
      onStart(pokemon) {
        this.add("-start", pokemon, "Stealth");
        this.heal(100, pokemon, pokemon);
      },
      onModifyAccuracy(accuracy) {
        if (typeof accuracy !== "number")
          return;
        return this.chainModify(0.5);
      },
      onDisableMove(pokemon) {
        for (const moveSlot2 of pokemon.moveSlots) {
          const move = this.dex.moves.get(moveSlot2.id);
          if (move.category === "Status" && move.id !== "spite") {
            pokemon.disableMove(moveSlot2.id);
          }
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Stealth");
      }
    },
    target: "self",
    type: "Ghost"
  },
  monoculus: {
    accuracy: 100,
    basePower: 0,
    category: "Special",
    shortDesc: "Deals 150 damage. 50 BP move at the end of the turn for 2 turns.",
    name: "MONOCULUS!",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, bullet: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1, summon: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Invokum MONOCULUS!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Steel Beam", target2);
      this.damage(150, target2, source);
      if (!target2.side.addSlotCondition(target2, "summon"))
        return false;
      Object.assign(target2.side.slotConditions[target2.position]["summon"], {
        duration: 2,
        source,
        move,
        position: target2.position,
        side: target2.side,
        moveData: {
          id: "monoculus",
          name: "MONOCULUS!",
          accuracy: 100,
          basePower: 40,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Steel"
        }
      });
    },
    target: "normal",
    type: "Steel"
  },
  skeletonhorde: {
    accuracy: 100,
    basePower: 20,
    category: "Physical",
    shortDesc: "50 BP move at the end of the turn for 5 turns.",
    name: "Skeleton Horde",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1, summon: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Mortis Animataris!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Shadow Bone", target2);
      if (!target2.side.addSlotCondition(target2, "summon"))
        return false;
      Object.assign(target2.side.slotConditions[target2.position]["summon"], {
        duration: 5,
        source,
        move,
        position: target2.position,
        side: target2.side,
        moveData: {
          id: "skeletonhorde",
          name: "Skeleton Horde",
          accuracy: 100,
          basePower: 50,
          category: "Physical",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Ground"
        }
      });
    },
    target: "normal",
    type: "Ground"
  },
  ballolightning: {
    accuracy: 100,
    basePower: 60,
    category: "Special",
    shortDesc: "Traps the target. 50 BP move at the end of the turn for 3 turns.",
    name: "Ball O' Lightning",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, bullet: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1, summon: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Imputum Fulmenus!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Electro Ball", target2);
      if (!target2.side.addSlotCondition(target2, "summon"))
        return false;
      Object.assign(target2.side.slotConditions[target2.position]["summon"], {
        duration: 3,
        source,
        move,
        position: target2.position,
        side: target2.side,
        moveData: {
          id: "balloflightning",
          name: "Ball O' Lightning",
          accuracy: 100,
          basePower: 50,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Electric"
        }
      });
    },
    secondary: {
      chance: 100,
      onHit(target2, source, move) {
        if (source.isActive)
          target2.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Electric"
  },
  meteorshower: {
    accuracy: 85,
    basePower: 50,
    category: "Special",
    name: "Meteor Shower",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Seismela Tremoro!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Draco Meteor", target2);
    },
    multihit: 3,
    multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Rock"
  },
  minify: {
    accuracy: true,
    basePower: 0,
    category: "Status",
    shortDesc: "User recovers 100 HP and doubles evasion, but damage taken is doubled and forces the user out.",
    name: "Minify",
    pp: 0.625,
    priority: 0,
    flags: { protect: 1, mirror: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    onPrepareHit(target2, source, move) {
      this.add(`c:|${Math.floor(Date.now() / 1e3)}|${getName(source.name)}|Barpo Invisium!`);
      this.attrLastMove("[still]");
      this.add("-anim", source, "Minimize", target2);
    },
    volatileStatus: "minify",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Minify");
        this.heal(100, pokemon, pokemon);
      },
      onModifyAccuracy(accuracy) {
        if (typeof accuracy !== "number")
          return;
        return this.chainModify(0.5);
      },
      onSourceModifyDamage(damage, source, target2, move) {
        return this.chainModify(2);
      },
      onDamagingHit(damage, target2, source, move) {
        target2.removeVolatile("minify");
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Minify");
        pokemon.forceSwitchFlag = true;
      }
    },
    target: "self",
    type: "Fairy"
  },
  mindblown: {
    inherit: true,
    isNonstandard: null
  }
};
//# sourceMappingURL=moves.js.map
