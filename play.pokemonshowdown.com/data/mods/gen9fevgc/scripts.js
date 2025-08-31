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
  gen: 9,
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["Reg A", "Reg B", "Reg C", "Reg A NFE", "Reg A LC", "Reg B LC", "Reg C LC"]
  },
  pokemon: {
    ignoringAbility() {
      if (this.battle.gen >= 5 && !this.isActive)
        return true;
      if (this.getAbility().flags["notransform"] && this.transformed)
        return true;
      if (this.getAbility().flags["cantsuppress"])
        return false;
      if (this.volatiles["gastroacid"])
        return true;
      if (this.hasItem("Ability Shield") || this.ability === "neutralizinggas" || this.ability === "neutralmatch")
        return false;
      for (const pokemon of this.battle.getAllActive()) {
        if ((pokemon.ability === "neutralizinggas" || pokemon.ability === "neutralmatch") && !pokemon.volatiles["gastroacid"] && !pokemon.transformed && !pokemon.abilityState.ending && !this.volatiles["commanding"]) {
          return true;
        }
      }
      return false;
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
      if (!ignoreImmunities && status.id && !((source?.hasAbility("corrosion") || source?.hasAbility("deeptoxin") || source?.hasAbility("poisonivy")) && ["tox", "psn"].includes(status.id))) {
        if (!this.runStatusImmunity(status.id === "tox" ? "psn" : status.id)) {
          this.battle.debug("immune to status");
          if (sourceEffect?.status) {
            this.battle.add("-immune", this);
          }
          return false;
        }
      }
      const prevStatus = this.status;
      const prevStatusState = this.statusState;
      if (status.id) {
        const result = this.battle.runEvent("SetStatus", this, source, sourceEffect, status);
        if (!result) {
          this.battle.debug("set status [" + status.id + "] interrupted");
          return result;
        }
      }
      this.status = status.id;
      this.statusState = { id: status.id, target: this };
      if (source)
        this.statusState.source = source;
      if (status.duration)
        this.statusState.duration = status.duration;
      if (status.durationCallback) {
        this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
      }
      if (status.id && !this.battle.singleEvent("Start", status, this.statusState, this, source, sourceEffect)) {
        this.battle.debug("status start [" + status.id + "] interrupted");
        this.status = prevStatus;
        this.statusState = prevStatusState;
        return false;
      }
      if (status.id && !this.battle.runEvent("AfterSetStatus", this, source, sourceEffect, status)) {
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
      if (!negateImmunity && this.hasType("Flying") && !(this.hasType("???") && "roost" in this.volatiles))
        return false;
      if ((this.hasAbility("levitate") || this.hasAbility("sunlitflight") || this.hasAbility("airdrive") || this.hasAbility("aerialforce") || this.hasAbility("fightandflight")) && !this.battle.suppressingAbility(this))
        return null;
      if ("magnetrise" in this.volatiles)
        return false;
      if ("telekinesis" in this.volatiles)
        return false;
      return item !== "airballoon";
    },
    runImmunity(type, message) {
      if (!type || type === "???")
        return true;
      if (!this.battle.dex.types.isName(type)) {
        throw new Error("Use runStatusImmunity for " + type);
      }
      if (this.fainted)
        return false;
      const negateImmunity = !this.battle.runEvent("NegateImmunity", this, type);
      const notImmune = type === "Ground" ? this.isGrounded(negateImmunity) : negateImmunity || this.battle.dex.getImmunity(type, this);
      if (notImmune)
        return true;
      if (!message)
        return false;
      if (notImmune === null) {
        this.battle.add("-immune", this, "[from] ability: " + this.getAbility().name);
      } else {
        this.battle.add("-immune", this);
      }
      return false;
    }
  },
  actions: {
    hitStepTryImmunity(targets, pokemon, move) {
      const hitResults = [];
      for (const [i, target] of targets.entries()) {
        if (this.battle.gen >= 6 && move.flags["powder"] && target !== pokemon && !this.dex.getImmunity("powder", target)) {
          this.battle.debug("natural powder immunity");
          this.battle.add("-immune", target);
          hitResults[i] = false;
        } else if (!this.battle.singleEvent("TryImmunity", move, {}, target, pokemon, move)) {
          this.battle.add("-immune", target);
          hitResults[i] = false;
        } else if (this.battle.gen >= 7 && move.pranksterBoosted && !targets[i].isAlly(pokemon) && !this.dex.getImmunity("prankster", target)) {
          this.battle.debug("natural prankster immunity");
          if (target.illusion || !(move.status && !this.dex.getImmunity(move.status, target))) {
            this.battle.hint("Since gen 7, Dark is immune to Prankster moves.");
          }
          this.battle.add("-immune", target);
          hitResults[i] = false;
        } else {
          hitResults[i] = true;
        }
      }
      return hitResults;
    },
    useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) {
      if (!sourceEffect && this.battle.effect.id)
        sourceEffect = this.battle.effect;
      if (sourceEffect && ["instruct", "custapberry"].includes(sourceEffect.id))
        sourceEffect = null;
      let move = this.dex.getActiveMove(moveOrMoveName);
      pokemon.lastMoveUsed = move;
      if (zMove || move.category !== "Status" && sourceEffect && sourceEffect.isZ) {
        if (move.id === "weatherball" && zMove) {
          this.battle.singleEvent("ModifyType", move, null, pokemon, target, move, move);
          if (move.type !== "Normal")
            sourceEffect = move;
        }
        move = this.getActiveZMove(move, pokemon);
      }
      if (maxMove || move.category !== "Status" && sourceEffect && sourceEffect.isMax) {
        if (maxMove && move.category !== "Status") {
          this.battle.singleEvent("ModifyType", move, null, pokemon, target, move, move);
          this.battle.runEvent("ModifyType", pokemon, target, move, move);
        }
        move = this.getActiveMaxMove(move, pokemon);
      }
      if (this.battle.activeMove) {
        move.priority = this.battle.activeMove.priority;
        if (!move.hasBounced)
          move.pranksterBoosted = this.battle.activeMove.pranksterBoosted;
      }
      const baseTarget = move.target;
      let targetRelayVar = { target };
      targetRelayVar = this.battle.runEvent("ModifyTarget", pokemon, target, move, targetRelayVar, true);
      if (targetRelayVar.target !== void 0)
        target = targetRelayVar.target;
      else if (target === void 0)
        target = this.battle.getRandomTarget(pokemon, move);
      if (move.target === "self" || move.target === "allies") {
        target = pokemon;
      }
      if (sourceEffect) {
        move.sourceEffect = sourceEffect.id;
        move.ignoreAbility = sourceEffect.ignoreAbility;
      }
      let moveResult = false;
      this.battle.setActiveMove(move, pokemon, target);
      this.battle.singleEvent("ModifyType", move, null, pokemon, target, move, move);
      this.battle.singleEvent("ModifyMove", move, null, pokemon, target, move, move);
      if (baseTarget !== move.target) {
        target = this.battle.getRandomTarget(pokemon, move);
      }
      move = this.battle.runEvent("ModifyType", pokemon, target, move, move);
      move = this.battle.runEvent("ModifyMove", pokemon, target, move, move);
      if (baseTarget !== move.target) {
        target = this.battle.getRandomTarget(pokemon, move);
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
      this.battle.addMove("move", pokemon, movename, target + attrs);
      if (zMove)
        this.runZPower(move, pokemon);
      if (!target) {
        this.battle.attrLastMove("[notarget]");
        this.battle.add("-fail", pokemon);
        return false;
      }
      const { targets, pressureTargets } = pokemon.getMoveTargets(move, target);
      if (targets.length) {
        target = targets[targets.length - 1];
      }
      const callerMoveForPressure = sourceEffect && sourceEffect.pp ? sourceEffect : null;
      if (!sourceEffect || callerMoveForPressure || sourceEffect.id === "pursuit") {
        let extraPP = 0;
        for (const source of pressureTargets) {
          const ppDrop = this.battle.runEvent("DeductPP", source, pokemon, move);
          if (ppDrop !== true) {
            extraPP += ppDrop || 0;
          }
        }
        if (extraPP > 0) {
          pokemon.deductPP(callerMoveForPressure || moveOrMoveName, extraPP);
        }
      }
      if (!this.battle.singleEvent("TryMove", move, null, pokemon, target, move) || !this.battle.runEvent("TryMove", pokemon, target, move)) {
        move.mindBlownRecoil = false;
        return false;
      }
      this.battle.singleEvent("UseMoveMessage", move, null, pokemon, target, move);
      if (move.ignoreImmunity === void 0) {
        move.ignoreImmunity = move.category === "Status";
      }
      if (
        /*this.battle.gen !== 4 &&*/
        move.selfdestruct === "always"
      ) {
        this.battle.faint(pokemon, pokemon, move);
      }
      let damage = false;
      if (["all", "foeSide", "allySide", "allyTeam"].includes(move.target)) {
        damage = this.tryMoveHit(targets, pokemon, move);
        if (damage === this.battle.NOT_FAIL)
          pokemon.moveThisTurnResult = null;
        if (damage || damage === 0 || damage === void 0)
          moveResult = true;
      } else if (targets.length) {
        moveResult = this.trySpreadMoveHit(targets, pokemon, move);
      } else {
        this.battle.attrLastMove("[notarget]");
        this.battle.add("-fail", pokemon);
        return false;
      }
      if (move.selfBoost && moveResult)
        this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
      if (!pokemon.hp) {
        this.battle.faint(pokemon, pokemon, move);
      }
      if (!moveResult) {
        this.battle.singleEvent("MoveFail", move, null, target, pokemon, move);
        return false;
      }
      if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility(["sheerforce", "sirocco", "strongarmor", "sheerbird", "brutebird", "frostbite", "polarpower", "dinomight"])) && !move.flags["futuremove"]) {
        const originalHp = pokemon.hp;
        this.battle.singleEvent("AfterMoveSecondarySelf", move, null, pokemon, target, move);
        this.battle.runEvent("AfterMoveSecondarySelf", pokemon, target, move);
        if (pokemon && pokemon !== target && move.category !== "Status") {
          const threshold = pokemon.maxhp * 0.5;
          if (pokemon.hp <= threshold && originalHp > threshold)
            this.battle.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
      return true;
    },
    modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
      const tr = this.battle.trunc;
      if (!move.type)
        move.type = "???";
      const type = move.type;
      baseDamage += 2;
      if (move.spreadHit) {
        const spreadModifier = move.spreadModifier || (this.battle.gameType === "freeforall" ? 0.5 : 0.75);
        this.battle.debug("Spread modifier: " + spreadModifier);
        baseDamage = this.battle.modify(baseDamage, spreadModifier);
      } else if (move.multihitType === "parentalbond" && move.hit > 1) {
        const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
        this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
        baseDamage = this.battle.modify(baseDamage, bondModifier);
      }
      baseDamage = this.battle.runEvent("WeatherModifyDamage", pokemon, target, move, baseDamage);
      const isCrit = target.getMoveHitData(move).crit;
      if (isCrit) {
        baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
      }
      baseDamage = this.battle.randomizer(baseDamage);
      if (type !== "???") {
        let stab = 1;
        const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
        if (isSTAB) {
          stab = 1.5;
        }
        if (pokemon.terastallized === "Stellar") {
          if (!pokemon.stellarBoostedTypes.includes(type)) {
            stab = isSTAB ? 2 : [4915, 4096];
            if (pokemon.species.name !== "Terapagos-Stellar") {
              pokemon.stellarBoostedTypes.push(type);
            }
          }
        } else {
          if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
            stab = 2;
          }
          stab = this.battle.runEvent("ModifySTAB", pokemon, target, move, stab);
        }
        baseDamage = this.battle.modify(baseDamage, stab);
      }
      let typeMod = target.runEffectiveness(move);
      typeMod = this.battle.clampIntRange(typeMod, -6, 6);
      target.getMoveHitData(move).typeMod = typeMod;
      if (typeMod > 0) {
        if (!suppressMessages)
          this.battle.add("-supereffective", target);
        for (let i = 0; i < typeMod; i++) {
          baseDamage *= 2;
        }
      }
      if (typeMod < 0) {
        if (!suppressMessages)
          this.battle.add("-resisted", target);
        for (let i = 0; i > typeMod; i--) {
          baseDamage = tr(baseDamage / 2);
        }
      }
      if (isCrit && !suppressMessages)
        this.battle.add("-crit", target);
      if (pokemon.status === "brn" && move.category === "Physical" && !pokemon.hasAbility(["migrate", "unsettling", "guts", "careless", "overguts"]) && move.id !== "facade") {
        baseDamage = this.battle.modify(baseDamage, 0.5);
      }
      if (this.battle.gen === 5 && !baseDamage)
        baseDamage = 1;
      baseDamage = this.battle.runEvent("ModifyDamage", pokemon, target, move, baseDamage);
      if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
        baseDamage = this.battle.modify(baseDamage, 0.25);
        this.battle.add("-zbroken", target);
      }
      if (this.battle.gen !== 5 && !baseDamage)
        return 1;
      return tr(baseDamage, 16);
    },
    runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
      pokemon.activeMoveActions++;
      let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
      let baseMove = this.dex.getActiveMove(moveOrMoveName);
      const pranksterBoosted = baseMove.pranksterBoosted;
      if (baseMove.id !== "struggle" && !zMove && !maxMove && !externalMove) {
        const changedMove = this.battle.runEvent("OverrideAction", pokemon, target, baseMove);
        if (changedMove && changedMove !== true) {
          baseMove = this.dex.getActiveMove(changedMove);
          if (pranksterBoosted)
            baseMove.pranksterBoosted = pranksterBoosted;
          target = this.battle.getRandomTarget(pokemon, baseMove);
        }
      }
      let move = baseMove;
      if (zMove) {
        move = this.getActiveZMove(baseMove, pokemon);
      } else if (maxMove) {
        move = this.getActiveMaxMove(baseMove, pokemon);
      }
      move.isExternal = externalMove;
      this.battle.setActiveMove(move, pokemon, target);
      const willTryMove = this.battle.runEvent("BeforeMove", pokemon, target, move);
      if (!willTryMove) {
        this.battle.runEvent("MoveAborted", pokemon, target, move);
        this.battle.clearActiveMove(true);
        pokemon.moveThisTurnResult = willTryMove;
        return;
      }
      if (move.flags["cantusetwice"] && pokemon.lastMove?.id === move.id) {
        pokemon.addVolatile(move.id);
      }
      if (move.beforeMoveCallback) {
        if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
          this.battle.clearActiveMove(true);
          pokemon.moveThisTurnResult = false;
          return;
        }
      }
      pokemon.lastDamage = 0;
      let lockedMove;
      if (!externalMove) {
        lockedMove = this.battle.runEvent("LockMove", pokemon);
        if (lockedMove === true)
          lockedMove = false;
        if (!lockedMove) {
          if (!pokemon.deductPP(baseMove, null, target) && move.id !== "struggle") {
            this.battle.add("cant", pokemon, "nopp", move);
            this.battle.clearActiveMove(true);
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
          this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
        }
        this.battle.add("-zpower", pokemon);
        pokemon.side.zMoveUsed = true;
      }
      const oldActiveMove = move;
      const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
      this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
      if (this.battle.activeMove)
        move = this.battle.activeMove;
      this.battle.singleEvent("AfterMove", move, null, pokemon, target, move);
      this.battle.runEvent("AfterMove", pokemon, target, move);
      if (move.flags["cantusetwice"] && pokemon.removeVolatile(move.id)) {
        this.battle.add("-hint", `Some effects can force a Pokemon to use ${move.name} again in a row.`);
      }
      if ((move.flags["dance"] || move.flags["sound"]) && moveDidSomething && !move.isExternal) {
        const dancers = [];
        for (const currentPoke of this.battle.getAllActive()) {
          if (pokemon === currentPoke)
            continue;
          if ((currentPoke.hasAbility("dancer") || currentPoke.hasAbility("parroting")) && !currentPoke.isSemiInvulnerable()) {
            dancers.push(currentPoke);
          }
        }
        dancers.sort(
          (a, b) => -(b.storedStats["spe"] - a.storedStats["spe"]) || b.abilityOrder - a.abilityOrder
        );
        const targetOf1stDance = this.battle.activeTarget;
        for (const dancer of dancers) {
          if (this.battle.faintMessages())
            break;
          if (dancer.fainted)
            continue;
          this.battle.add("-activate", dancer, "ability: Parroting");
          const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ? targetOf1stDance : pokemon;
          const dancersTargetLoc = dancer.getLocOf(dancersTarget);
          this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get("parroting"), void 0, true);
        }
      }
      if (noLock && pokemon.volatiles["lockedmove"])
        delete pokemon.volatiles["lockedmove"];
      this.battle.faintMessages();
      this.battle.checkWin();
      if (this.battle.gen <= 4) {
        this.battle.activeMove = oldActiveMove;
      }
    },
    terastallize(pokemon) {
      if (pokemon.illusion && ["Ogereena", "Terapagos"].includes(pokemon.illusion.species.baseSpecies)) {
        this.battle.singleEvent("End", this.dex.abilities.get("Illusion"), pokemon.abilityState, pokemon);
      }
      const type = pokemon.teraType;
      this.battle.add("-terastallize", pokemon, type);
      pokemon.terastallized = type;
      for (const ally of pokemon.side.pokemon) {
        ally.canTerastallize = null;
      }
      pokemon.addedType = "";
      pokemon.knownType = true;
      pokemon.apparentType = type;
      if (pokemon.species.baseSpecies === "Ogereena") {
        const tera = pokemon.species.id === "ogereena" ? "tealtera" : "tera";
        pokemon.formeChange(pokemon.species.id + tera, null, true);
      }
      if (pokemon.species.name === "Terapagos-Terastal" && type === "Stellar") {
        pokemon.formeChange("Terapagos-Stellar", null, true);
        pokemon.baseMaxhp = Math.floor(Math.floor(
          2 * pokemon.species.baseStats["hp"] + pokemon.set.ivs["hp"] + Math.floor(pokemon.set.evs["hp"] / 4) + 100
        ) * pokemon.level / 100 + 10);
        const newMaxHP = pokemon.baseMaxhp;
        pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
        pokemon.maxhp = newMaxHP;
        this.battle.add("-heal", pokemon, pokemon.getHealth, "[silent]");
      }
      this.battle.runEvent("AfterTerastallization", pokemon);
    }
  }
};
//# sourceMappingURL=scripts.js.map
