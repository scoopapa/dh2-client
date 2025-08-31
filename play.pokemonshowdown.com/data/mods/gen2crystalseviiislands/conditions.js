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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  // Black Hole needs to hit the user's side of the field
  futuremove: {
    // this is a slot condition
    name: "futuremove",
    duration: 3,
    onResidualOrder: 3,
    onEnd(target) {
      const data = this.effectState;
      const move = this.dex.moves.get(data.move);
      if (target.fainted) {
        this.hint(`${move.name} did not hit because the target is ${data.fainted ? "fainted" : "the user"}.`);
        return;
      }
      this.add("-end", target, "move: " + move.name);
      target.removeVolatile("Protect");
      target.removeVolatile("Endure");
      const hitMove = new this.dex.Move(data.moveData);
      this.actions.trySpreadMoveHit([target], data.source, hitMove);
    }
  }
};
//# sourceMappingURL=conditions.js.map
