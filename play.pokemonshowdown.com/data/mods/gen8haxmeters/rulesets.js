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
  Rulesets: () => Rulesets
});
module.exports = __toCommonJS(rulesets_exports);
const Rulesets = {
  haxmeterrule: {
    effectType: "Rule",
    name: "Hax Meter Rule",
    desc: "Implements the Hax Meter",
    onBegin() {
      for (const side of this.sides) {
        side.miss = 30;
        side.effect = 30;
        side.crit = 30;
        side.status = 30;
        this.add("-message", `${side.name}
Miss: ${side.miss}
Effect: ${side.effect}
Critcal Hit: ${side.crit}
Status: ${side.status}`);
        for (const pokemon of side.pokemon) {
          pokemon.statuses = [];
        }
      }
    },
    onResidual(pokemon) {
      this.add("-message", `${pokemon.side.name}
Miss: ${pokemon.side.miss.toFixed(2)}
Effect: ${pokemon.side.effect.toFixed(2)}
Critcal Hit: ${pokemon.side.crit.toFixed(2)}
Status: ${pokemon.side.status.toFixed(2)}`);
    },
    onUpdate(pokemon) {
      pokemon.statuses = [];
      if (pokemon.volatiles["confusion"])
        pokemon.statuses.push("Confusion");
      if (pokemon.volatiles["attract"])
        pokemon.statuses.push("Attract");
      if (pokemon.status === "par")
        pokemon.statuses.push("Paralysis");
      if (pokemon.status === "frz")
        pokemon.statuses.push("Freeze");
    },
    onBeforeMove(pokemon, target, move) {
      if (!pokemon.statuses || pokemon.statuses.length === 0)
        return;
      let multiplier = 1;
      let prefix = "";
      let suffix = "";
      for (const status of pokemon.statuses) {
        let toAdd = 0;
        switch (status) {
          case "Paralysis":
            toAdd = 25;
            break;
          case "Freeze":
            toAdd = 80;
            break;
          case "Confusion":
            toAdd = 33;
            break;
          case "Attract":
            toAdd = 50;
            break;
        }
        let product = toAdd * multiplier;
        if (prefix.length === 0) {
          prefix = status;
          suffix = toAdd;
        } else {
          prefix += " + " + status;
          suffix = multiplier + " * " + toAdd + " = " + product;
        }
        this.add("-message", `(${prefix}: ${suffix})`);
        pokemon.side.addStatus(product);
        multiplier *= 1 - toAdd / 100;
        if (pokemon.side.status >= 100) {
          pokemon.side.subtractStatus(100);
          switch (status) {
            case "Paralysis":
              this.add("cant", pokemon, "par");
              break;
            case "Freeze":
              this.add("cant", pokemon, "frz");
              break;
            case "Confusion":
              this.activeTarget = pokemon;
              const damage = this.actions.getConfusionDamage(pokemon, 40);
              if (typeof damage !== "number")
                throw new Error("Confusion damage not dealt");
              const activeMove = { id: this.toID("confused"), effectType: "Move", type: "???" };
              this.damage(damage, pokemon, pokemon, activeMove);
              break;
            case "Attract":
              this.add("cant", pokemon, "Attract");
              break;
          }
          return false;
        } else if (pokemon.status === "frz")
          pokemon.cureStatus();
      }
    }
  }
};
//# sourceMappingURL=rulesets.js.map
