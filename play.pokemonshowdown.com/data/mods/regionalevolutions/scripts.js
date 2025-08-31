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
    customTiers: ["RegEvo", "RegEvo NFE", "RegEvo Ubers"],
    customDoublesTiers: ["RegEvo", "RegEvo NFE", "RegEvo Ubers"]
  },
  pokemon: {
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
      if (!ignoreImmunities && status.id && !(source?.hasAbility("corrosion") && ["tox", "psn"].includes(status.id)) && !(source?.hasAbility("suller") && ["slp"].includes(status.id))) {
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
    }
  }
};
//# sourceMappingURL=scripts.js.map
