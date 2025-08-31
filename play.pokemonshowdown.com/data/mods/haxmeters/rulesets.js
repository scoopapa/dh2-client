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
  roundNum: () => roundNum
});
module.exports = __toCommonJS(rulesets_exports);
function roundNum(n, places) {
  return Math.round((n + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places);
}
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
        side.pmiss = 30;
        side.peffect = 30;
        side.pcrit = 30;
        side.pstatus = 30;
        for (const pokemon of side.pokemon) {
          pokemon.statuses = [];
        }
      }
      const sideOne = this.sides[0];
      const sideTwo = this.sides[1];
      this.add(`c:|${Math.floor(Date.now() / 1e3)}||/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss, 2)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss, 2)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect, 2)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect, 2)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit, 2)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit, 2)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status, 2)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status, 2)}</td></tr></tbody></table></div></summary>`);
    },
    onResidual(pokemon) {
      const sideOne = this.sides[0];
      const sideTwo = this.sides[1];
      if (pokemon.hp && pokemon.side !== sideOne)
        return;
      this.add(`c:|${Math.floor(Date.now() / 1e3)}||/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss, 2)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss, 2)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect, 2)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect, 2)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit, 2)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit, 2)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status, 2)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status, 2)}</td></tr></tbody></table></div></summary>`);
      for (const side of this.sides) {
        side.pmiss = side.miss;
        side.peffect = side.effect;
        side.pcrit = side.crit;
        side.pstatus = side.status;
      }
    },
    onUpdate(pokemon) {
      pokemon.statuses = [];
      if (pokemon.status === "frz")
        pokemon.statuses.push("Freeze");
      if (pokemon.volatiles["confusion"])
        pokemon.statuses.push("Confusion");
      if (pokemon.volatiles["attract"])
        pokemon.statuses.push("Infatuation");
      if (pokemon.status === "par")
        pokemon.statuses.push("Paralysis");
    },
    onBeforeMove(pokemon, target, move) {
      if (!pokemon.statuses || pokemon.statuses.length === 0)
        return;
      let multiplier = 1;
      let clauses = 0;
      let prefix = "";
      let suffix = "";
      for (const status of pokemon.statuses) {
        let toAdd = 0;
        switch (status) {
          case "Paralysis":
            toAdd = 25;
            clauses++;
            break;
          case "Freeze":
            if (move.flags["defrost"])
              break;
            toAdd = 80;
            clauses++;
            break;
          case "Confusion":
            if (pokemon.volatiles["confusion"]) {
              this.add("-activate", pokemon, "confusion");
              toAdd = 33;
              clauses++;
              break;
            } else
              continue;
          case "Infatuation":
            this.add("-activate", pokemon, "move: Attract", "[of] " + target);
            toAdd = 50;
            clauses++;
            break;
        }
        let product = toAdd * multiplier;
        if (prefix.length === 0) {
          prefix = status;
          suffix = toAdd;
        } else
          suffix = roundNum(multiplier, 3) + " * " + roundNum(toAdd, 3) + " = " + roundNum(product, 3);
        if (toAdd > 0) {
          if (clauses === 1)
            this.add("-message", `(${status}: ${suffix})`);
          else
            this.add("-message", `(No ${prefix} + ${status}: ${suffix})`);
        }
        pokemon.side.addStatus(product);
        multiplier *= 1 - toAdd / 100;
        if (prefix.length !== 0 && prefix !== status) {
          prefix += " + No " + status;
        }
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
            case "Infatuation":
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
