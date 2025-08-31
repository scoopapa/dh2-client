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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  // Template
  /*
  	psychicgem: {
  		name: "Psychic Gem",
  		spritenum: 369,
  		isGem: true,
  		onSourceTryPrimaryHit(target, source, move) {
  			if (target === source || move.category === 'Status') return;
  			if (move.type === 'Psychic' && source.useItem()) {
  				source.addVolatile('gem');
          		if (source.baseSpecies.baseSpecies === 'Golduck') {
  				  source.addVolatile('psychicgem');
          		}
  			}
  		},
  		num: 557,
  		gen: 5,
  		isNonstandard: null,
  	},
  */
  buggem: {
    name: "Bug Gem",
    spritenum: 53,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Bug" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Galvantula") {
          source.addVolatile("buggem");
        }
      }
    },
    itemUser: ["Galvantula"],
    num: 558,
    gen: 5,
    isNonstandard: null
  },
  darkgem: {
    name: "Dark Gem",
    spritenum: 89,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Dark" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Lycanroc" && ["Midnight"].includes(source.species.forme)) {
          source.addVolatile("darkgem");
        }
      }
    },
    num: 562,
    gen: 5,
    isNonstandard: null
  },
  dragongem: {
    name: "Dragon Gem",
    spritenum: 107,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Dragon" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Gyarados") {
          source.addVolatile("dragongem");
        }
      }
    },
    itemUser: ["Gyarados"],
    num: 561,
    gen: 5,
    isNonstandard: null
  },
  electricgem: {
    name: "Electric Gem",
    spritenum: 120,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type === "Electric" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Dedenne") {
          source.addVolatile("electricgem");
        }
      }
    },
    itemUser: ["Dedenne"],
    num: 550,
    gen: 5,
    isNonstandard: null
  },
  fairygem: {
    name: "Fairy Gem",
    spritenum: 611,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Fairy" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Whimsicott") {
          source.addVolatile("fairygem");
        }
        if (source.baseSpecies.baseSpecies === "Meganium") {
          source.addVolatile("grassstartergem");
        }
      }
    },
    num: 715,
    gen: 6,
    isNonstandard: null
  },
  fightinggem: {
    name: "Fighting Gem",
    spritenum: 139,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Fighting" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Keldeo") {
          source.addVolatile("fightinggem");
        }
      }
    },
    itemUser: ["Keldeo"],
    num: 553,
    gen: 5,
    isNonstandard: null
  },
  firegem: {
    name: "Fire Gem",
    spritenum: 141,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type === "Fire" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Chandelure") {
          source.addVolatile("firegem");
        }
      }
    },
    itemUser: ["Chandelure"],
    num: 548,
    gen: 5,
    isNonstandard: null
  },
  flyinggem: {
    name: "Flying Gem",
    spritenum: 149,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Flying" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Electivire") {
          source.addVolatile("flyinggem");
        }
        if (source.baseSpecies.baseSpecies === "Infernape") {
          source.addVolatile("firestartergem");
        }
      }
    },
    itemUser: ["Electivire"],
    num: 556,
    gen: 5,
    isNonstandard: null,
    rating: 3
  },
  ghostgem: {
    name: "Ghost Gem",
    spritenum: 161,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Ghost" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Snorlax") {
          source.addVolatile("ghostgem");
        }
      }
    },
    itemUser: ["Snorlax"],
    num: 560,
    gen: 5,
    isNonstandard: null
  },
  grassgem: {
    name: "Grass Gem",
    spritenum: 172,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type === "Grass" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Iron Leaves") {
          source.addVolatile("grassgem");
        }
      }
    },
    itemUser: ["Iron Leaves"],
    num: 551,
    gen: 5,
    isNonstandard: null
  },
  groundgem: {
    name: "Ground Gem",
    spritenum: 182,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Ground" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Flapple") {
          source.addVolatile("groundgem");
        }
      }
    },
    itemUser: ["Flapple"],
    num: 555,
    gen: 5,
    isNonstandard: null
  },
  icegem: {
    name: "Ice Gem",
    spritenum: 218,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Ice" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Crabominable") {
          source.addVolatile("icegem");
        }
      }
    },
    itemUser: ["Crabominable"],
    num: 552,
    gen: 5,
    isNonstandard: null
  },
  normalgem: {
    name: "Normal Gem",
    spritenum: 307,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type === "Normal" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Ambipom") {
          source.addVolatile("normalgem");
        }
      }
    },
    itemUser: ["Ambipom"],
    num: 564,
    gen: 5
  },
  poisongem: {
    name: "Poison Gem",
    spritenum: 344,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Poison" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Tornadus" && !["Therian"].includes(source.species.forme)) {
          source.addVolatile("poisongem");
        }
      }
    },
    itemUser: ["Tornadus"],
    num: 554,
    gen: 5,
    isNonstandard: null
  },
  psychicgem: {
    name: "Psychic Gem",
    spritenum: 369,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Psychic" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Necrozma") {
          source.addVolatile("psychicgem");
        }
      }
    },
    itemUser: ["Necrozma"],
    num: 557,
    gen: 5,
    isNonstandard: null
  },
  rockgem: {
    name: "Rock Gem",
    spritenum: 415,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Rock" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Sandaconda") {
          source.addVolatile("rockgem");
        }
      }
    },
    itemUser: ["Sandaconda"],
    num: 559,
    gen: 5,
    isNonstandard: null
  },
  steelgem: {
    name: "Steel Gem",
    spritenum: 473,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Steel" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Alcremie") {
          source.addVolatile("steelgem");
        }
        if (source.baseSpecies.baseSpecies === "Blastoise") {
          source.addVolatile("waterstartergem");
        }
      }
    },
    num: 563,
    gen: 5,
    isNonstandard: null
  },
  watergem: {
    name: "Water Gem",
    spritenum: 528,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type === "Water" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Goodra" && !["Hisui"].includes(source.species.forme)) {
          source.addVolatile("watergem");
        }
      }
    },
    itemUser: ["Goodra"],
    num: 549,
    gen: 5,
    isNonstandard: null
  },
  stellargem: {
    name: "Stellar Gem",
    spritenum: 107,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status" || move.flags["pledgecombo"])
        return;
      if (move.type !== "???" && source.useItem()) {
        source.addVolatile("gem");
        if (source.baseSpecies.baseSpecies === "Terapagos") {
          source.addVolatile("stellargem");
        }
      }
    },
    itemUser: ["Terapagos", "Terapagos-Terastal"],
    num: -1e3,
    gen: 9,
    isNonstandard: null,
    desc: "Holder's first successful attack will have 1.3x power. Single use."
  }
};
//# sourceMappingURL=items.js.map
