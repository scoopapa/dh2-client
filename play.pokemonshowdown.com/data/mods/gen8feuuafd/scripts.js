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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  init() {
    for (const id in this.dataCache.Pokedex) {
      const fusionEntry = this.dataCache.Pokedex[id];
      if (fusionEntry.fusion) {
        const learnsetFusionList = [];
        for (let name of fusionEntry.fusion) {
          let prevo = true;
          while (prevo) {
            learnsetFusionList.push(name);
            const dexEntry = this.dataCache.Pokedex[this.toID(name)];
            if (dexEntry.prevo)
              name = dexEntry.prevo;
            else
              prevo = false;
          }
        }
        if (!this.dataCache.Learnsets[id])
          this.dataCache.Learnsets[id] = { learnset: {} };
        for (const name of learnsetFusionList) {
          const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;
          for (const moveid in learnset) {
            if (this.dataCache.Moves[moveid].isNonstandard === "Past")
              continue;
            this.modData("Learnsets", id).learnset[moveid] = ["8L1"];
          }
        }
      }
    }
    this.modData("Learnsets", "yaciancrowned").learnset.behemothblade = ["7L1"];
    this.modData("Learnsets", "igglyzentacrowned").learnset.behemothbash = ["7L1"];
    this.modData("Learnsets", "nozedawnwings").learnset.moongeistbeam = ["7L1"];
    this.modData("Learnsets", "tyranetteeternal").learnset.lightofruin = ["7L1"];
    this.modData("Learnsets", "monferpaunbound").learnset.hyperspacefury = ["7L1"];
    this.modData("Learnsets", "hoopagigasunbound").learnset.hyperspacefury = ["7L1"];
    delete this.modData("Learnsets", "yaciancrowned").learnset.ironhead;
    delete this.modData("Learnsets", "igglyzentacrowned").learnset.ironhead;
  },
  teambuilderConfig: {
    // for micrometas to only show custom tiers
    excludeStandardTiers: true,
    // only to specify the order of custom tiers
    customTiers: ["FEUU", "FERUBL", "FERU", "Bugged", "FENFE", "FELC", "Forms", "FEUUber"]
  },
  canMegaEvo(pokemon) {
    const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
    const item = pokemon.getItem();
    if (altForme?.isMega && altForme?.requiredMove && pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove) {
      return altForme.name;
    }
    if (item.name === "Sablenite" && pokemon.baseSpecies.name === "Absable") {
      return "Absable-Mega-Y";
    }
    if (item.name === "Tyranitarite" && pokemon.baseSpecies.name === "Goatitar") {
      return "Goatitar-Mega";
    }
    if (item.name === "Mawilite" && pokemon.baseSpecies.name === "Duramaw") {
      return "Duramaw-Mega";
    }
    if (item.name === "Gardevoirite" && pokemon.baseSpecies.name === "Goodevoir") {
      return "Goodevoir-Mega";
    }
    if (item.name === "Audinite" && pokemon.baseSpecies.name === "Audiyem") {
      return "Audiyem-Mega";
    }
    if (item.name === "Heracronite" && pokemon.baseSpecies.name === "Cleracross") {
      return "Cleracross-Mega";
    }
    if (item.name === "Garchompite" && pokemon.baseSpecies.name === "Rhychomp") {
      return "Rhychomp-Mega";
    }
    if (item.name === "Medichamite" && pokemon.baseSpecies.name === "Gastrocham") {
      return "Gastrocham-Mega";
    }
    return item.megaStone;
  },
  runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
    pokemon.activeMoveActions++;
    let target = this.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
    let baseMove = this.dex.getActiveMove(moveOrMoveName);
    const pranksterBoosted = baseMove.pranksterBoosted;
    if (baseMove.id !== "struggle" && !zMove && !maxMove && !externalMove) {
      const changedMove = this.runEvent("OverrideAction", pokemon, target, baseMove);
      if (changedMove && changedMove !== true) {
        baseMove = this.dex.getActiveMove(changedMove);
        if (pranksterBoosted)
          baseMove.pranksterBoosted = pranksterBoosted;
        target = this.getRandomTarget(pokemon, baseMove);
      }
    }
    let move = baseMove;
    if (zMove) {
      move = this.getActiveZMove(baseMove, pokemon);
    } else if (maxMove) {
      move = this.getActiveMaxMove(baseMove, pokemon);
    }
    move.isExternal = externalMove;
    this.setActiveMove(move, pokemon, target);
    const willTryMove = this.runEvent("BeforeMove", pokemon, target, move);
    if (!willTryMove) {
      this.runEvent("MoveAborted", pokemon, target, move);
      this.clearActiveMove(true);
      pokemon.moveThisTurnResult = willTryMove;
      return;
    }
    if (move.beforeMoveCallback) {
      if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
        this.clearActiveMove(true);
        pokemon.moveThisTurnResult = false;
        return;
      }
    }
    pokemon.lastDamage = 0;
    let lockedMove;
    if (!externalMove) {
      lockedMove = this.runEvent("LockMove", pokemon);
      if (lockedMove === true)
        lockedMove = false;
      if (!lockedMove) {
        if (!pokemon.deductPP(baseMove, null, target) && move.id !== "struggle") {
          this.add("cant", pokemon, "nopp", move);
          const gameConsole = [
            null,
            "Game Boy",
            "Game Boy Color",
            "Game Boy Advance",
            "DS",
            "DS",
            "3DS",
            "3DS"
          ][this.gen] || "Switch";
          this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
          this.clearActiveMove(true);
          pokemon.moveThisTurnResult = false;
          return;
        }
      } else {
        sourceEffect = this.dex.conditions.get("lockedmove");
      }
      pokemon.moveUsed(move, targetLoc);
    }
    const noLock = externalMove && !pokemon.volatiles["lockedmove"];
    if (zMove) {
      if (pokemon.illusion) {
        this.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityData, pokemon);
      }
      this.add("-zpower", pokemon);
      pokemon.side.zMoveUsed = true;
    }
    const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
    this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.activeMove && this.activeMove.id : null;
    if (this.activeMove)
      move = this.activeMove;
    this.singleEvent("AfterMove", move, null, pokemon, target, move);
    this.runEvent("AfterMove", pokemon, target, move);
    if (moveDidSomething && !move.isExternal) {
      const dancers = [];
      for (const currentPoke of this.getAllActive()) {
        if (pokemon === currentPoke)
          continue;
        if (!currentPoke.isSemiInvulnerable() && (move.flags["dance"] && currentPoke.hasAbility("dancer")) || move.category === "Status" && currentPoke.hasAbility("parroting")) {
          dancers.push(currentPoke);
        }
      }
      dancers.sort(
        (a, b) => -(b.storedStats["spe"] - a.storedStats["spe"]) || b.abilityOrder - a.abilityOrder
      );
      for (const dancer of dancers) {
        if (this.faintMessages())
          break;
        if (dancer.fainted)
          continue;
        const dancersTarget = target.side !== dancer.side && pokemon.side === dancer.side ? target : pokemon;
        this.runMove(move.id, dancer, this.getTargetLoc(dancersTarget, dancer), this.dex.abilities.get(dancer.ability), void 0, true);
      }
    }
    if (noLock && pokemon.volatiles["lockedmove"])
      delete pokemon.volatiles["lockedmove"];
  },
  pokemon: {
    // Included for abilities that make the user non-grounded:
    // Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
    // So we manually add a check for Magnetic Waves here as well,
    // Including a diffrent activation message
    // so that the game doesn't report it as having Levitate when it procs.
    // AFFECTED ABILITIES: Magnetic Waves, Leviflame, Levitability
    runImmunity(type, message) {
      if (!type || type === "???")
        return true;
      if (!(type in this.battle.dex.data.TypeChart)) {
        if (type === "Fairy" || type === "Dark" || type === "Steel")
          return true;
        throw new Error("Use runStatusImmunity for " + type);
      }
      if (this.fainted)
        return false;
      const negateResult = this.battle.runEvent("NegateImmunity", this, type);
      let isGrounded;
      if (type === "Ground") {
        isGrounded = this.isGrounded(!negateResult);
        if (isGrounded === null) {
          if (message) {
            if (this.hasAbility("magneticwaves")) {
              this.battle.add("-immune", this, "[from] ability: Magnetic Waves");
            } else if (this.hasAbility("leviflame")) {
              this.battle.add("-immune", this, "[from] ability: Leviflame");
            } else if (this.hasAbility("levitability")) {
              this.battle.add("-immune", this, "[from] ability: Levitability");
            } else if (this.hasAbility("stickyfloat")) {
              this.battle.add("-immune", this, "[from] ability: Sticky Float");
            } else if (this.hasAbility("etativel")) {
              this.battle.add("-immune", this, "[from] ability: Etativel");
            } else if (this.hasAbility("lighthearted")) {
              this.battle.add("-immune", this, "[from] ability: Lighthearted");
            } else if (this.hasAbility("clearlyfloating")) {
              this.battle.add("-immune", this, "[from] ability: Clearly Floating");
            } else if (this.hasAbility("floatguise")) {
              this.battle.add("-immune", this, "[from] ability: Float Guise");
            } else if (this.hasAbility("aerialbreak")) {
              this.battle.add("-immune", this, "[from] ability: Aerial Break");
            } else if (this.hasAbility("levimetal")) {
              this.battle.add("-immune", this, "[from] ability: Levimetal");
            } else if (this.hasAbility("hoverboard")) {
              this.battle.add("-immune", this, "[from] ability: Hoverboard");
            } else if (this.hasAbility("levistatic")) {
              this.battle.add("-immune", this, "[from] ability: Levistatic");
            } else {
              this.battle.add("-immune", this, "[from] ability: Levitate");
            }
          }
          return false;
        }
      }
      if (!negateResult)
        return true;
      if (isGrounded === void 0 && !this.battle.dex.getImmunity(type, this) || isGrounded === false) {
        if (message) {
          this.battle.add("-immune", this);
        }
        return false;
      }
      return true;
    },
    isGrounded(negateImmunity = false) {
      if ("gravity" in this.battle.field.pseudoWeather)
        return true;
      if ("ingrain" in this.volatiles && this.battle.gen >= 4)
        return true;
      if ("smackdown" in this.volatiles)
        return true;
      const item = this.ignoringItem() ? "" : this.item;
      if (item === "ironball")
        return true;
      if (!negateImmunity && this.hasType("Flying") && !("roost" in this.volatiles))
        return false;
      if ((this.hasAbility("levitate") || this.hasAbility("magneticwaves") || this.hasAbility("leviflame") || this.hasAbility("levitability") || this.hasAbility("stickyfloat")) && !this.battle.suppressingAttackEvents())
        return null;
      if ("magnetrise" in this.volatiles)
        return false;
      if ("telekinesis" in this.volatiles)
        return false;
      return item !== "airballoon";
    },
    ignoringAbility() {
      let neutralizinggas = false;
      let lemegeton = false;
      for (const pokemon of this.battle.getAllActive()) {
        if (pokemon.ability === "neutralizinggas" || pokemon.ability === "lemegeton" && !pokemon.volatiles["gastroacid"] && !pokemon.abilityData.ending) {
          neutralizinggas = true;
          lemegeton = true;
          break;
        }
      }
      return !!(this.battle.gen >= 5 && !this.isActive || (this.volatiles["gastroacid"] || neutralizinggas && this.ability !== "neutralizinggas" || lemegeton && this.ability !== "lemegeton") && !this.getAbility().isPermanent);
    },
    setStatus(status, source = null, sourceEffect = null, ignoreImmunities = false) {
      if (!this.hp)
        return false;
      status = this.battle.dex.conditions.get(status);
      if (this.battle.event) {
        if (!source)
          source = this.battle.event.source;
        if (!sourceEffect)
          sourceEffect = this.battle.effect;
      }
      if (!source)
        source = this;
      if (this.status === status.id) {
        if (sourceEffect?.status === this.status) {
          this.battle.add("-fail", this, this.status);
        } else if (sourceEffect?.status) {
          this.battle.add("-fail", source);
          this.battle.attrLastMove("[still]");
        }
        return false;
      }
      if (!ignoreImmunities && status.id && !(source?.hasAbility(["corrosion", "toxicplay"]) && ["tox", "psn"].includes(status.id))) {
        if (!this.runStatusImmunity(status.id === "tox" ? "psn" : status.id)) {
          this.battle.debug("immune to status");
          if (sourceEffect?.status) {
            this.battle.add("-immune", this);
          }
          return false;
        }
      }
      const prevStatus = this.status;
      const prevStatusData = this.statusData;
      if (status.id) {
        const result = this.battle.runEvent("SetStatus", this, source, sourceEffect, status);
        if (!result) {
          this.battle.debug("set status [" + status.id + "] interrupted");
          return result;
        }
      }
      this.status = status.id;
      this.statusData = { id: status.id, target: this };
      if (source)
        this.statusData.source = source;
      if (status.duration)
        this.statusData.duration = status.duration;
      if (status.durationCallback) {
        this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
      }
      if (status.id && !this.battle.singleEvent("Start", status, this.statusData, this, source, sourceEffect)) {
        this.battle.debug("status start [" + status.id + "] interrupted");
        this.status = prevStatus;
        this.statusData = prevStatusData;
        return false;
      }
      if (status.id && !this.battle.runEvent("AfterSetStatus", this, source, sourceEffect, status)) {
        return false;
      }
      return true;
    }
  },
  // Included for Gutsy Jaw:
  // Burn status' Atk reduction and Guts users' immunity to it is hard-coded in battle.ts,
  // So we have to bypass it manually here.
  modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
    const tr = this.trunc;
    if (!move.type)
      move.type = "???";
    const type = move.type;
    baseDamage += 2;
    if (move.spreadHit) {
      const spreadModifier = move.spreadModifier || (this.gameType === "free-for-all" ? 0.5 : 0.75);
      this.debug("Spread modifier: " + spreadModifier);
      baseDamage = this.modify(baseDamage, spreadModifier);
    }
    baseDamage = this.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
    const isCrit = target.getMoveHitData(move).crit;
    if (isCrit) {
      baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
    }
    baseDamage = this.randomizer(baseDamage);
    if (move.forceSTAB || type !== "???" && pokemon.hasType(type)) {
      baseDamage = this.modify(baseDamage, move.stab || 1.5);
    }
    let typeMod = target.runEffectiveness(move);
    typeMod = this.clampIntRange(typeMod, -6, 6);
    target.getMoveHitData(move).typeMod = typeMod;
    if (typeMod > 0) {
      if (!suppressMessages)
        this.add("-supereffective", target);
      for (let i = 0; i < typeMod; i++) {
        baseDamage *= 2;
      }
    }
    if (typeMod < 0) {
      if (!suppressMessages)
        this.add("-resisted", target);
      for (let i = 0; i > typeMod; i--) {
        baseDamage = tr(baseDamage / 2);
      }
    }
    if (isCrit && !suppressMessages)
      this.add("-crit", target);
    if (pokemon.status === "brn" && move.category === "Physical" && !(pokemon.hasAbility("guts") || pokemon.hasAbility("gutsyjaw") || pokemon.hasAbility("wetfilling") || pokemon.hasAbility("rumenramming") || pokemon.hasAbility("gutsguard") || pokemon.hasAbility("courageous") || pokemon.hasAbility("ultraimpulse"))) {
      if (this.gen < 6 || move.id !== "facade") {
        baseDamage = this.modify(baseDamage, 0.5);
      }
    }
    if (this.gen === 5 && !baseDamage)
      baseDamage = 1;
    baseDamage = this.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
    if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
      baseDamage = this.modify(baseDamage, 0.25);
      this.add("-zbroken", target);
    }
    if (this.gen !== 5 && !baseDamage)
      return 1;
    return tr(baseDamage, 16);
  },
  cureStatus(silent = false) {
    if (!this.hp || !this.status)
      return false;
    this.battle.add("-curestatus", this, this.status, silent ? "[silent]" : "[msg]");
    if (this.status === "slp" && !this.hasAbility("comatose") && this.removeVolatile("nightmare")) {
      this.battle.add("-end", this, "Nightmare", "[silent]");
    }
    this.setStatus("");
    delete this.m.orbItemStatus;
    return true;
  },
  // Something something Life Orb Sheer Force
  // Wow, this sucks
  useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) {
    if (!sourceEffect && this.effect.id)
      sourceEffect = this.effect;
    if (sourceEffect && ["instruct", "custapberry"].includes(sourceEffect.id))
      sourceEffect = null;
    let move = this.dex.getActiveMove(moveOrMoveName);
    if (move.id === "weatherball" && zMove) {
      this.singleEvent("ModifyType", move, null, pokemon, target, move, move);
      if (move.type !== "Normal")
        sourceEffect = move;
    }
    if (zMove || move.category !== "Status" && sourceEffect && sourceEffect.isZ) {
      move = this.getActiveZMove(move, pokemon);
    }
    if (maxMove && move.category !== "Status") {
      this.singleEvent("ModifyType", move, null, pokemon, target, move, move);
      this.runEvent("ModifyType", pokemon, target, move, move);
    }
    if (maxMove || move.category !== "Status" && sourceEffect && sourceEffect.isMax) {
      move = this.getActiveMaxMove(move, pokemon);
    }
    if (this.activeMove) {
      move.priority = this.activeMove.priority;
      if (!move.hasBounced)
        move.pranksterBoosted = this.activeMove.pranksterBoosted;
    }
    const baseTarget = move.target;
    if (target === void 0)
      target = this.getRandomTarget(pokemon, move);
    if (move.target === "self" || move.target === "allies") {
      target = pokemon;
    }
    if (sourceEffect) {
      move.sourceEffect = sourceEffect.id;
      move.ignoreAbility = false;
    }
    let moveResult = false;
    this.setActiveMove(move, pokemon, target);
    this.singleEvent("ModifyType", move, null, pokemon, target, move, move);
    this.singleEvent("ModifyMove", move, null, pokemon, target, move, move);
    if (baseTarget !== move.target) {
      target = this.getRandomTarget(pokemon, move);
    }
    move = this.runEvent("ModifyType", pokemon, target, move, move);
    move = this.runEvent("ModifyMove", pokemon, target, move, move);
    if (baseTarget !== move.target) {
      target = this.getRandomTarget(pokemon, move);
    }
    if (!move || pokemon.fainted) {
      return false;
    }
    let attrs = "";
    let movename = move.name;
    if (move.id === "hiddenpower")
      movename = "Hidden Power";
    if (sourceEffect)
      attrs += `|[from]${sourceEffect.fullname}`;
    if (zMove && move.isZ === true) {
      attrs = "|[anim]" + movename + attrs;
      movename = "Z-" + movename;
    }
    this.addMove("move", pokemon, movename, target + attrs);
    if (zMove)
      this.runZPower(move, pokemon);
    if (!target) {
      this.attrLastMove("[notarget]");
      this.add(this.gen >= 5 ? "-fail" : "-notarget", pokemon);
      return false;
    }
    const { targets, pressureTargets } = pokemon.getMoveTargets(move, target);
    if (targets.length) {
      target = targets[targets.length - 1];
    }
    if (!sourceEffect || sourceEffect.id === "pursuit") {
      let extraPP = 0;
      for (const source of pressureTargets) {
        const ppDrop = this.runEvent("DeductPP", source, pokemon, move);
        if (ppDrop !== true) {
          extraPP += ppDrop || 0;
        }
      }
      if (extraPP > 0) {
        pokemon.deductPP(move, extraPP);
      }
    }
    if (!this.singleEvent("TryMove", move, null, pokemon, target, move) || !this.runEvent("TryMove", pokemon, target, move)) {
      move.mindBlownRecoil = false;
      return false;
    }
    this.singleEvent("UseMoveMessage", move, null, pokemon, target, move);
    if (move.ignoreImmunity === void 0) {
      move.ignoreImmunity = move.category === "Status";
    }
    if (this.gen !== 4 && move.selfdestruct === "always") {
      this.faint(pokemon, pokemon, move);
    }
    let damage = false;
    if (move.target === "all" || move.target === "foeSide" || move.target === "allySide" || move.target === "allyTeam") {
      damage = this.tryMoveHit(target, pokemon, move);
      if (damage === this.NOT_FAIL)
        pokemon.moveThisTurnResult = null;
      if (damage || damage === 0 || damage === void 0)
        moveResult = true;
    } else {
      if (!targets.length) {
        this.attrLastMove("[notarget]");
        this.add(this.gen >= 5 ? "-fail" : "-notarget", pokemon);
        return false;
      }
      if (this.gen === 4 && move.selfdestruct === "always") {
        this.faint(pokemon, pokemon, move);
      }
      moveResult = this.trySpreadMoveHit(targets, pokemon, move);
    }
    if (move.selfBoost && moveResult)
      this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
    if (!pokemon.hp) {
      this.faint(pokemon, pokemon, move);
    }
    if (!moveResult) {
      this.singleEvent("MoveFail", move, null, target, pokemon, move);
      return false;
    }
    if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility("terrorizer") || pokemon.hasAbility("monarchyenforcement") || pokemon.hasAbility("hydraulicpress") || pokemon.hasAbility("noproprioception") || pokemon.hasAbility("versatility") || pokemon.hasAbility("thickskull") || pokemon.hasAbility("sheerluck"))) && !(pokemon.hasAbility("sheerluck") && move.critRatio > 1)) {
      const originalHp = pokemon.hp;
      this.singleEvent("AfterMoveSecondarySelf", move, null, pokemon, target, move);
      this.runEvent("AfterMoveSecondarySelf", pokemon, target, move);
      if (pokemon && pokemon !== target && move.category !== "Status") {
        if (pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
          this.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
    }
    return true;
  },
  afterMoveSecondaryEvent(targets, pokemon, move) {
    if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility("terrorizer") || pokemon.hasAbility("monarchyenforcement") || pokemon.hasAbility("hydraulicpress") || pokemon.hasAbility("noproprioception") || pokemon.hasAbility("versatility") || pokemon.hasAbility("thickskull") || pokemon.hasAbility("sheerluck"))) && !(pokemon.hasAbility("sheerluck") && move.critRatio > 1)) {
      this.singleEvent("AfterMoveSecondary", move, null, targets[0], pokemon, move);
      this.runEvent("AfterMoveSecondary", targets, pokemon, move);
    }
    return void 0;
  },
  hitStepMoveHitLoop(targets, pokemon, move) {
    const damage = [];
    for (const i of targets.keys()) {
      damage[i] = 0;
    }
    move.totalDamage = 0;
    pokemon.lastDamage = 0;
    let targetHits = move.multihit || 1;
    if (Array.isArray(targetHits)) {
      if (targetHits[0] === 2 && targetHits[1] === 5) {
        if (this.gen >= 5) {
          targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
        } else {
          targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
        }
      } else {
        targetHits = this.random(targetHits[0], targetHits[1] + 1);
      }
    }
    targetHits = Math.floor(targetHits);
    let nullDamage = true;
    let moveDamage;
    const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;
    let targetsCopy = targets.slice(0);
    let hit;
    for (hit = 1; hit <= targetHits; hit++) {
      if (damage.includes(false))
        break;
      if (hit > 1 && pokemon.status === "slp" && !isSleepUsable)
        break;
      if (targets.every((target2) => !target2 || !target2.hp))
        break;
      move.hit = hit;
      if (move.smartTarget && targets.length > 1) {
        targetsCopy = [targets[hit - 1]];
      } else {
        targetsCopy = targets.slice(0);
      }
      const target = targetsCopy[0];
      if (target && typeof move.smartTarget === "boolean") {
        if (hit > 1) {
          this.addMove("-anim", pokemon, move.name, target);
        } else {
          this.retargetLastMove(target);
        }
      }
      if (target && move.multiaccuracy && hit > 1) {
        let accuracy = move.accuracy;
        const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
        if (accuracy !== true) {
          if (!move.ignoreAccuracy) {
            const boosts = this.runEvent("ModifyBoost", pokemon, null, null, { ...pokemon.boosts });
            const boost = this.clampIntRange(boosts["accuracy"], -6, 6);
            if (boost > 0) {
              accuracy *= boostTable[boost];
            } else {
              accuracy /= boostTable[-boost];
            }
          }
          if (!move.ignoreEvasion) {
            const boosts = this.runEvent("ModifyBoost", target, null, null, { ...target.boosts });
            const boost = this.clampIntRange(boosts["evasion"], -6, 6);
            if (boost > 0) {
              accuracy /= boostTable[boost];
            } else if (boost < 0) {
              accuracy *= boostTable[-boost];
            }
          }
        }
        accuracy = this.runEvent("ModifyAccuracy", target, pokemon, move, accuracy);
        if (!move.alwaysHit) {
          accuracy = this.runEvent("Accuracy", target, pokemon, move, accuracy);
          if (accuracy !== true && !this.randomChance(accuracy, 100))
            break;
        }
      }
      const moveData = move;
      if (!moveData.flags)
        moveData.flags = {};
      [moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);
      if (!moveDamage.some((val) => val !== false))
        break;
      nullDamage = false;
      for (const [i, md] of moveDamage.entries()) {
        damage[i] = md === true || !md ? 0 : md;
        move.totalDamage += damage[i];
      }
      if (move.mindBlownRecoil) {
        this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get("Mind Blown"), true);
        move.mindBlownRecoil = false;
      }
      this.eachEvent("Update");
      if (!pokemon.hp && targets.length === 1) {
        hit++;
        break;
      }
    }
    if (hit === 1)
      return damage.fill(false);
    if (nullDamage)
      damage.fill(false);
    if (move.multihit && typeof move.smartTarget !== "boolean") {
      this.add("-hitcount", targets[0], hit - 1);
    }
    if (move.recoil && move.totalDamage) {
      this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, "recoil");
    }
    if (move.struggleRecoil) {
      let recoilDamage;
      if (this.dex.gen >= 5) {
        recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
      } else {
        recoilDamage = this.trunc(pokemon.maxhp / 4);
      }
      this.directDamage(recoilDamage, pokemon, pokemon, { id: "strugglerecoil" });
    }
    if (move.smartTarget)
      targetsCopy = targets.slice(0);
    for (const [i, target] of targetsCopy.entries()) {
      if (target && pokemon !== target) {
        target.gotAttacked(move, damage[i], pokemon);
      }
    }
    if (move.ohko && !targets[0].hp)
      this.add("-ohko");
    if (!damage.some((val) => !!val || val === 0))
      return damage;
    this.eachEvent("Update");
    this.afterMoveSecondaryEvent(targetsCopy.filter((val) => !!val), pokemon, move);
    if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility("terrorizer") || pokemon.hasAbility("monarchyenforcement")))) {
      for (const [i, d] of damage.entries()) {
        const curDamage = targets.length === 1 ? move.totalDamage : d;
        if (typeof curDamage === "number" && targets[i].hp) {
          const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
          if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
            this.runEvent("EmergencyExit", targets[i], pokemon);
          }
        }
      }
    }
    return damage;
  },
  canUltraBurst(pokemon) {
    if (["Necrozma-Dawn-Wings", "Necrozma-Dusk-Mane"].includes(pokemon.baseSpecies.name) && pokemon.getItem().id === "ultranecroziumz") {
      return "Necrozma-Ultra";
    }
    if (["Noze-Dawn-Wings"].includes(pokemon.baseSpecies.name) && pokemon.getItem().id === "depletedultranecroziumz") {
      return "Noze-Ultra";
    }
    return null;
  },
  hitStepTryImmunity(targets, pokemon, move) {
    const hitResults = [];
    for (const [i, target] of targets.entries()) {
      if (this.gen >= 6 && move.flags["powder"] && target !== pokemon && !this.dex.getImmunity("powder", target)) {
        this.debug("natural powder immunity");
        this.add("-immune", target);
        hitResults[i] = false;
      } else if (!this.singleEvent("TryImmunity", move, {}, target, pokemon, move)) {
        this.add("-immune", target);
        hitResults[i] = false;
      } else if (this.gen >= 7 && move.pranksterBoosted && (pokemon.hasAbility("prankster") || pokemon.hasAbility("notfunny") || pokemon.hasAbility("darkhumour") || pokemon.hasAbility("flashyjokes") || pokemon.hasAbility("lighthearted") || pokemon.hasAbility("creepy")) && targets[i].side !== pokemon.side && !this.dex.getImmunity("prankster", target)) {
        this.debug("natural prankster immunity");
        if (!target.illusion)
          this.hint("Since gen 7, Dark is immune to Prankster moves.");
        this.add("-immune", target);
        hitResults[i] = false;
      } else {
        hitResults[i] = true;
      }
    }
    return hitResults;
  },
  hitStepStealBoosts(targets, pokemon, move) {
    const target = targets[0];
    if (move.stealsBoosts) {
      const boosts = {};
      let stolen = false;
      let statName;
      for (statName in target.boosts) {
        const stage = target.boosts[statName];
        if (stage > 0) {
          boosts[statName] = stage;
          stolen = true;
        }
      }
      if (stolen) {
        this.attrLastMove("[still]");
        this.add("-clearpositiveboost", target, pokemon, "move: " + move.name);
        this.boost(boosts, pokemon, pokemon);
        let statName2;
        for (statName2 in boosts) {
          boosts[statName2] = 0;
        }
        target.setBoost(boosts);
        this.addMove("-anim", pokemon, "Spectral Thief", target);
      }
    }
    if (pokemon.ability === "faustianpact" && move.flags["contact"]) {
      let swapped = false;
      const targetAbility = target.getAbility();
      const additionalBannedAbilities = ["hungerswitch", "illusion", "neutralizinggas", "wonderguard"];
      if (!targetAbility.isPermanent || !additionalBannedAbilities.includes(targetAbility) || !pokemon.volatiles["dynamax"]) {
        swapped = true;
      }
      if (swapped) {
        this.attrLastMove("[still]");
        target.setAbility("faustianpact", pokemon);
        pokemon.setAbility(targetAbility);
        this.add("-activate", pokemon, "ability: Faustian Pact");
        this.add("-activate", pokemon, "Skill Swap", "", "", "[of] " + target);
        this.add("-activate", pokemon, "ability: " + targetAbility.name);
        this.add("-activate", target, "ability: Faustian Pact");
        this.addMove("-anim", pokemon, move.name, target);
      }
    }
    return void 0;
  }
};
//# sourceMappingURL=scripts.js.map
