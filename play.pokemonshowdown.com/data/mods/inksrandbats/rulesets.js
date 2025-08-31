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
  permasnow: {
    effectType: "Rule",
    name: "Permasnow",
    desc: "It's always hailing!",
    onBegin() {
      this.add("rule", "Permasnow: The weather will always be Hail");
      this.field.setWeather("hail");
    }
  },
  permasand: {
    effectType: "Rule",
    name: "Permasand",
    desc: "There's a sandstorm!",
    onBegin() {
      this.add("rule", "Permasnow: The weather will always be Sandstorm");
      this.field.setWeather("sandstorm");
    }
  },
  permarain: {
    effectType: "Rule",
    name: "Permarain",
    desc: "It's always raining!",
    onBegin() {
      this.add("rule", "Permarain: The weather will always be Rain");
      this.field.setWeather("rain");
    }
  },
  permasun: {
    effectType: "Rule",
    name: "Permasun",
    desc: "The sun is shining brightly!",
    onBegin() {
      this.add("rule", "Permasun: The weather will always be Sun");
      this.field.setWeather("sunnyday");
    }
  }
};
//# sourceMappingURL=rulesets.js.map
