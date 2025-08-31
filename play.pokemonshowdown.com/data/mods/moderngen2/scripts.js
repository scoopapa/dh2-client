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
  inherit: "gen2",
  gen: 2,
  init() {
    const specialTypes = ["Fire", "Water", "Grass", "Ice", "Electric", "Dark", "Psychic", "Dragon"];
    let newCategory = "";
    for (const i in this.data.Moves) {
      if (!this.data.Moves[i])
        console.log(i);
      if (this.data.Moves[i].category === "Status")
        continue;
      newCategory = specialTypes.includes(this.data.Moves[i].type) ? "Special" : "Physical";
      if (newCategory !== this.data.Moves[i].category) {
        this.modData("Moves", i).category = newCategory;
      }
    }
  }
};
//# sourceMappingURL=scripts.js.map
