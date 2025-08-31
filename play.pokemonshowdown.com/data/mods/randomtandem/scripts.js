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
  side: {
    inherit: true,
    pickedTeamSize() {
      return 6;
    },
    chooseTeam(data = "") {
      if (this.requestState !== "teampreview") {
        return this.emitChoiceError(`Can't choose for Team Preview: You're not in a Team Preview phase`);
      }
      const ruleTable = this.battle.ruleTable;
      let positions = data.split(data.includes(",") ? "," : "").map((datum) => parseInt(datum) - 1);
      const pickedTeamSize = 6;
      positions.splice(pickedTeamSize);
      if (positions.length === 0) {
        for (let i = 0; i < pickedTeamSize; i++)
          positions.push(i);
      } else if (positions.length < pickedTeamSize) {
        for (let i = 0; i < pickedTeamSize; i++) {
          if (!positions.includes(i))
            positions.push(i);
          if (positions.length >= pickedTeamSize)
            break;
        }
      }
      for (const [index, pos] of positions.entries()) {
        if (isNaN(pos) || pos < 0 || pos >= this.pokemon.length) {
          return this.emitChoiceError(`Can't choose for Team Preview: You do not have a Pok\xE9mon in slot ${pos + 1}`);
        }
        if (positions.indexOf(pos) !== index) {
          return this.emitChoiceError(`Can't choose for Team Preview: The Pok\xE9mon in slot ${pos + 1} can only switch in once`);
        }
      }
      if (ruleTable.maxTotalLevel) {
        let totalLevel = 0;
        for (const pos of positions)
          totalLevel += this.pokemon[pos].level;
        if (totalLevel > ruleTable.maxTotalLevel) {
          if (!data) {
            positions = [...this.pokemon.keys()].sort((a, b) => this.pokemon[a].level - this.pokemon[b].level).slice(0, pickedTeamSize);
          } else {
            return this.emitChoiceError(`Your selected team has a total level of ${totalLevel}, but it can't be above ${ruleTable.maxTotalLevel}; please select a valid team of ${pickedTeamSize} Pok\xE9mon`);
          }
        }
      }
      if (ruleTable.valueRules.has("forceselect")) {
        const species = this.battle.dex.species.get(ruleTable.valueRules.get("forceselect"));
        if (!data) {
          positions = [...this.pokemon.keys()].filter((pos) => this.pokemon[pos].species.name === species.name).concat([...this.pokemon.keys()].filter((pos) => this.pokemon[pos].species.name !== species.name)).slice(0, pickedTeamSize);
        } else {
          let hasSelection = false;
          for (const pos of positions) {
            if (this.pokemon[pos].species.name === species.name) {
              hasSelection = true;
              break;
            }
          }
          if (!hasSelection) {
            return this.emitChoiceError(`You must bring ${species.name} to the battle.`);
          }
        }
      }
      for (const [index, pos] of positions.entries()) {
        this.choice.switchIns.add(pos);
        this.choice.actions.push({
          choice: "team",
          index,
          pokemon: this.pokemon[pos],
          priority: -index
        });
      }
      return true;
    }
  }
};
//# sourceMappingURL=scripts.js.map
