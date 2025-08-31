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
  inherit: "gen8",
  gen: 8,
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["Mega", "Kalos", "Kalos (NFE)"],
    customDoublesTiers: ["Mega", "Kalos", "Kalos (NFE)"]
  },
  init() {
    for (const id in this.dataCache.Pokedex) {
      const pokemon = this.dataCache.Pokedex[id];
      if (pokemon.movepoolAdditions) {
        for (const move of pokemon.movepoolAdditions) {
          this.modData("Learnsets", this.toID(id)).learnset[this.toID(move)] = ["8M"];
        }
      }
      if (!pokemon || !pokemon.mega)
        continue;
      const newMega = this.dataCache.Pokedex[pokemon.mega] = { name: pokemon.megaName };
      pokemon.otherFormes = pokemon.otherFormes ? pokemon.otherFormes.concat([newMega.name]) : [pokemon.megaName];
      pokemon.formeOrder = pokemon.formeOrder ? pokemon.formeOrder.concat([newMega.name]) : [pokemon.name, pokemon.megaName];
      newMega.num = pokemon.num;
      newMega.baseSpecies = pokemon.name;
      newMega.forme = "Mega";
      newMega.types = pokemon.megaType || pokemon.types;
      newMega.abilities = pokemon.megaAbility || pokemon.abilities;
      newMega.baseStats = pokemon.megaStats || pokemon.baseStats;
      newMega.heightm = pokemon.megaHeightm || pokemon.heightm;
      newMega.weightkg = pokemon.megaWeightkg || pokemon.weightkg;
      newMega.eggGroups = pokemon.eggGroups;
      newMega.color = pokemon.megaColor || pokemon.color;
      newMega.creator = pokemon.megaCreator || null;
      newMega.requiredItem = pokemon.megaStone || null;
      if (!this.modData("FormatsData", pokemon.mega))
        this.data.FormatsData[pokemon.mega] = { tier: "Mega" };
    }
  },
  actions: {
    canMegaEvo(pokemon) {
      const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
      const item = pokemon.getItem();
      if (altForme?.isMega && altForme?.requiredMove && pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove) {
        return altForme.name;
      }
      if (item.name === "Wormadamite") {
        if (pokemon.species.name === "Wormadam-Sandy")
          return "Wormadam-Sandy-Mega";
        else
          return null;
      }
      if (item.name === "Hoopanite" && pokemon.species.name === "Hoopa-Unbound")
        return null;
      if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name)
        return null;
      return item.megaStone;
    }
  },
  boost(boost, target = null, source = null, effect = null, isSecondary = false, isSelf = false) {
    if (this.event) {
      if (!target)
        target = this.event.target;
      if (!source)
        source = this.event.source;
      if (!effect)
        effect = this.effect;
    }
    if (!target?.hp)
      return 0;
    if (!target.isActive)
      return false;
    if (this.gen > 5 && !target.side.foePokemonLeft())
      return false;
    boost = this.runEvent("ChangeBoost", target, source, effect, { ...boost });
    boost = target.getCappedBoost(boost);
    boost = this.runEvent("TryBoost", target, source, effect, { ...boost });
    let success = null;
    let boosted = isSecondary;
    let boostName;
    for (boostName in boost) {
      const currentBoost = {
        [boostName]: boost[boostName]
      };
      let boostBy = target.boostBy(currentBoost);
      let msg = "-boost";
      if (boost[boostName] < 0 || target.boosts[boostName] === -6) {
        msg = "-unboost";
        boostBy = -boostBy;
      }
      if (target.volatiles["hyperspacemayhem"] && target.volatiles["hyperspacemayhem"].midtransform && !target.volatiles["hyperspacemayhem"].geomancy) {
        this.runEvent("AfterEachBoost", target, source, effect, currentBoost);
        if (target.volatiles["hyperspacemayhem"].fakelegend) {
          let boostMessage = target.name;
          if (effect.effectType === "Ability" && !boosted) {
            this.add("-ability", target, effect.name, "boost");
            boosted = true;
          }
          if (boostName === "atk")
            boostMessage += `'s Attack`;
          if (boostName === "def")
            boostMessage += `'s Defense`;
          if (boostName === "spa")
            boostMessage += `'s Sp. Atk`;
          if (boostName === "spd")
            boostMessage += `'s Sp. Def`;
          if (boostName === "spe")
            boostMessage += `'s Speed`;
          if (boostName === "evasion")
            boostMessage += `'s evasion`;
          if (boostName === "accuracy")
            boostMessage += `'s accuracy`;
          if (boostBy === 3 && msg !== "-unboost")
            boostMessage += ` rose drastically!`;
          if (boostBy === 2 && msg !== "-unboost")
            boostMessage += ` rose sharply!`;
          if (boostBy === 1 && msg !== "-unboost")
            boostMessage += ` rose!`;
          if (boostBy === 1 && msg === "-unboost")
            boostMessage += ` fell!`;
          if (boostBy === 2 && msg === "-unboost")
            boostMessage += ` fell harshly!`;
          if (boostBy === 3 && msg === "-unboost")
            boostMessage += ` fell severely!`;
          this.add("-message", `${boostMessage}`);
        }
        continue;
      }
      if (target.volatiles["hyperspacemayhem"] && target.volatiles["hyperspacemayhem"].geomancy) {
        target.name = target.volatiles["hyperspacemayhem"].userBackup.name;
        target.fullname = target.volatiles["hyperspacemayhem"].userBackup.fullname;
      }
      if (boostBy) {
        success = true;
        switch (effect?.id) {
          case "bellydrum":
          case "angerpoint":
            this.add("-setboost", target, "atk", target.boosts["atk"], "[from] " + effect.fullname);
            break;
          case "bellydrum2":
            this.add(msg, target, boostName, boostBy, "[silent]");
            this.hint("In Gen 2, Belly Drum boosts by 2 when it fails.");
            break;
          case "zpower":
            this.add(msg, target, boostName, boostBy, "[zeffect]");
            break;
          default:
            if (!effect)
              break;
            if (effect.effectType === "Move") {
              this.add(msg, target, boostName, boostBy);
            } else if (effect.effectType === "Item") {
              this.add(msg, target, boostName, boostBy, "[from] item: " + effect.name);
            } else {
              if (effect.effectType === "Ability" && !boosted) {
                this.add("-ability", target, effect.name, "boost");
                boosted = true;
              }
              this.add(msg, target, boostName, boostBy);
            }
            break;
        }
        this.runEvent("AfterEachBoost", target, source, effect, currentBoost);
      } else if (effect?.effectType === "Ability") {
        if (isSecondary || isSelf)
          this.add(msg, target, boostName, boostBy);
      } else if (!isSecondary && !isSelf) {
        this.add(msg, target, boostName, boostBy);
      }
    }
    this.runEvent("AfterBoost", target, source, effect, boost);
    if (success) {
      if (Object.values(boost).some((x) => x > 0))
        target.statsRaisedThisTurn = true;
      if (Object.values(boost).some((x) => x < 0))
        target.statsLoweredThisTurn = true;
    }
    return success;
  },
  pokemon: {
    ignoringItem() {
      return !!(this.itemState.knockedOff || // Gen 3-4
      this.battle.gen >= 5 && !this.isActive || !this.getItem().ignoreKlutz && this.hasAbility("klutz") || this.volatiles["embargo"] || this.volatiles["hyperspacemayhem"] || this.battle.field.pseudoWeather["magicroom"]);
    },
    formeChange(speciesId, source = this.battle.effect, isPermanent, message) {
      const rawSpecies = this.battle.dex.species.get(speciesId);
      const species = this.setSpecies(rawSpecies, source);
      if (!species)
        return false;
      if (this.battle.gen <= 2)
        return true;
      const apparentSpecies = this.illusion ? this.illusion.species.name : species.baseSpecies;
      if (isPermanent || source.id === "hyperspacehole") {
        if (isPermanent)
          this.baseSpecies = rawSpecies;
        this.details = species.name + (this.level === 100 ? "" : ", L" + this.level) + (this.gender === "" ? "" : ", " + this.gender) + (this.set.shiny ? ", shiny" : "");
        let details = (this.illusion || this).details;
        if (this.terastallized)
          details += `, tera:${this.terastallized}`;
        this.battle.add("detailschange", this, details);
        if (source.effectType === "Item") {
          this.canTerastallize = null;
          if (source.zMove) {
            this.battle.add("-burst", this, apparentSpecies, species.requiredItem);
            this.moveThisTurnResult = true;
          } else if (source.onPrimal) {
            if (this.illusion) {
              this.ability = "";
              this.battle.add("-primal", this.illusion, species.requiredItem);
            } else {
              this.battle.add("-primal", this, species.requiredItem);
            }
          } else {
            if (source.megaEvolves) {
              this.battle.add("-mega", this, apparentSpecies, species.requiredItem);
            }
            this.moveThisTurnResult = true;
          }
        } else if (source.effectType === "Status") {
          this.battle.add("-formechange", this, species.name, message);
        }
      } else {
        if (source.effectType === "Ability") {
          this.battle.add("-formechange", this, species.name, message, `[from] ability: ${source.name}`);
        } else if (source.id === "hyperspacehole") {
          this.battle.add("-formechange", this, this.illusion ? this.illusion.species.name : species.name, "[silent]");
        } else {
          this.battle.add("-formechange", this, this.illusion ? this.illusion.species.name : species.name, message);
        }
      }
      if (isPermanent && !["disguise", "iceface"].includes(source.id)) {
        if (this.illusion) {
          this.ability = "";
        }
        this.setAbility(species.abilities["0"], null, true);
        this.baseAbility = this.ability;
      }
      if (source.id === "hyperspacehole") {
        if (this.volatiles["hyperspacemayhem"]) {
          this.setAbility(species.abilities["0"], null, true);
        } else {
          this.setAbility("hyperspacemayhem", null, true);
        }
        if (this.species.forme.startsWith("Mega") || this.species.forme.startsWith("Ultra"))
          this.battle.add("-start", this, "typechange", this.getTypes(true).join("/"), "[silent]");
      }
      if (this.terastallized) {
        this.knownType = true;
        this.apparentType = this.terastallized;
      }
      return true;
    },
    setAbility(ability, source, isFromFormeChange = false, isTransform = false) {
      if (!this.hp)
        return false;
      if (typeof ability === "string")
        ability = this.battle.dex.abilities.get(ability);
      const oldAbility = this.ability;
      if (!isFromFormeChange) {
        if (ability.isPermanent || this.getAbility().isPermanent)
          return false;
      }
      if (!isTransform) {
        const setAbilityEvent = this.battle.runEvent("SetAbility", this, source, this.battle.effect, ability);
        if (!setAbilityEvent)
          return setAbilityEvent;
      }
      this.battle.singleEvent("End", this.battle.dex.abilities.get(oldAbility), this.abilityState, this, source);
      if (this.battle.effect && this.battle.effect.effectType === "Move" && !isFromFormeChange) {
        this.battle.add("-endability", this, this.battle.dex.abilities.get(oldAbility), "[from] move: " + this.battle.dex.moves.get(this.battle.effect.id));
      }
      this.ability = ability.id;
      this.abilityState = { id: ability.id, target: this };
      if (ability.id && this.battle.gen > 3 && (!isTransform || oldAbility !== ability.id || this.battle.gen <= 4)) {
        this.battle.singleEvent("PreStart", ability, this.abilityState, this, source);
        this.battle.singleEvent("Start", ability, this.abilityState, this, source);
      }
      this.abilityOrder = this.battle.abilityOrder++;
      return oldAbility;
    }
  }
};
//# sourceMappingURL=scripts.js.map
