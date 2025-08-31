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
  gen: 6,
  inherit: "gen6",
  teambuilderConfig: {
    excludeStandardTiers: true,
    customTiers: ["Kalos", "Kalos (NFE)", "Kalos Uber"],
    customDoublesTiers: ["Kalos", "Kalos (NFE)", "Kalos Uber"]
  },
  init() {
    this.modData("Learnsets", "altaria").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "amaura").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "audino").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "aurorus").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "blissey").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "buneary").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "chansey").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "chatot").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "cinccino").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "clefable").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "clefairy").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "cleffa").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "deino").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "delcatty").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "eevee").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "espeon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "exploud").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "flareon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "furfrou").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "furret").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "gallade").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "gardevoir").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "girafarig").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "glaceon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "glameow").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "granbull").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "happiny").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "heliolisk").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "herdier").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "hooh").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "hoothoot").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "houndoom").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "houndour").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "hydreigon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "igglybuff").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "jigglypuff").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "jolteon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "jynx").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "kirlia").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "lapras").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "leafeon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "liepard").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "lillipup").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "linoone").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "litleo").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "lombre").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "lopunny").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "loudred").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "ludicolo").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "lugia").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "meloetta").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "meowth").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "mew").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "mightyena").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "minccino").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "misdreavus").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "mismagius").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "munchlax").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "noctowl").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "noibat").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "noivern").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "pancham").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "pangoro").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "persian").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "politoed").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "poochyena").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "purrloin").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "purugly").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "pyroar").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "ralts").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "sentret").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "skitty").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "smeargle").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "snorlax").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "snubbull").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "spinda").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "stoutland").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "swablu").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "sylveon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "teddiursa").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "togekiss").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "togepi").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "togetic").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "tyrantrum").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "tyrunt").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "umbreon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "ursaring").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "vaporeon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "wailmer").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "wailord").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "whismur").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "wigglytuff").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "xerneas").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "yveltal").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "zigzagoon").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "zoroark").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "zorua").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "zweilous").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "zygarde").learnset.vocalstrain = ["6L1"];
    this.modData("Learnsets", "quilladin").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "chesnaught").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "simisage").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "burmy").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "wormadam").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "florges").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "roselia").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "roserade").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "bulbasaur").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "ivysaur").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "venusaur").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "gogoat").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "pangoro").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "hoppip").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "skiploom").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "jumpluff").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "munchlax").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "snorlax").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "ferroseed").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "ferrothorn").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "leafeon").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "exeggutor").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "bellsprout").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "weepinbell").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "victreebel").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "murkrow").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "honchkrow").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "amoonguss").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "phantump").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "trevenant").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "pumpkaboo").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "gourgeist").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "zoroark").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "yveltal").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "regirockkalos").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "glimmaltis").learnset.abadapple = ["6L1"];
    this.modData("Learnsets", "chandelure").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "charizard").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "delphox").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "houndoom").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "magcargo").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "moltres").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "torkoal").learnset.kindle = ["6L1"];
    this.modData("Learnsets", "lugia").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "suicune").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "manaphy").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "phione").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "corsola").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "swanna").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "milotic").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "lapras").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "politoed").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "slowking").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "alomomola").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "masquerain").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "blissey").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "cinccino").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "audino").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "chimecho").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "aromatisse").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "illumise").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "floatzel").learnset.block = ["6L1"];
    this.modData("Learnsets", "floatzel").learnset.cleansingwave = ["6L1"];
    this.modData("Learnsets", "floatzel").learnset.healpulse = ["6L1"];
    this.modData("Learnsets", "floatzel").learnset.superpower = ["6L1"];
    this.modData("Learnsets", "floatzel").learnset.uturn = ["6L1"];
  }
};
//# sourceMappingURL=scripts.js.map
