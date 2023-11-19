function _construct(Parent,args,Class){if(_isNativeReflectConstruct()){_construct=Reflect.construct.bind();}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor();if(Class)_setPrototypeOf(instance,Class.prototype);return instance;};}return _construct.apply(null,arguments);}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}/**
 * Search
 *
 * Code for searching for dex information, used by the Dex and
 * Teambuilder.
 *
 * Dependencies: battledata, search-index
 * Optional dependencies: pokedex, moves, items, abilities
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */var




















DexSearch=function(){



















































function DexSearch(){var searchType=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';var formatid=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var species=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';this.query='';this.dex=Dex;this.typedSearch=null;this.results=null;this.exactMatch=false;this.firstPokemonColumn='Number';this.sortCol=null;this.reverseSort=false;this.filters=null;
this.setType(searchType,formatid,species);
if(window.room.curTeam.mod)this.dex=Dex.mod(window.room.curTeam.mod);

}var _proto=DexSearch.prototype;_proto.

getTypedSearch=function getTypedSearch(searchType){var format=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var speciesOrSet=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';
if(!searchType)return null;
switch(searchType){
case'pokemon':return new BattlePokemonSearch('pokemon',format,speciesOrSet);
case'item':return new BattleItemSearch('item',format,speciesOrSet);
case'move':return new BattleMoveSearch('move',format,speciesOrSet);
case'ability':return new BattleAbilitySearch('ability',format,speciesOrSet);
case'type':return new BattleTypeSearch('type',format,speciesOrSet);
case'category':return new BattleCategorySearch('category',format,speciesOrSet);
}
return null;
};_proto.

find=function find(query){
query=toID(query);
if(this.query===query&&this.results){
return false;
}
this.query=query;
if(!query){var _this$typedSearch;
this.results=((_this$typedSearch=this.typedSearch)==null?void 0:_this$typedSearch.getResults(this.filters,this.sortCol,this.reverseSort))||[];
}else{
this.results=this.textSearch(query);
}
return true;
};_proto.

setType=function setType(searchType){var _this$typedSearch2;var format=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var speciesOrSet=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';

this.results=null;

if(searchType!==((_this$typedSearch2=this.typedSearch)==null?void 0:_this$typedSearch2.searchType)){
this.filters=null;
this.sortCol=null;
}
this.typedSearch=this.getTypedSearch(searchType,format,speciesOrSet);
if(this.typedSearch)this.dex=this.typedSearch.dex;
};_proto.

addFilter=function addFilter(entry){
if(!this.typedSearch)return false;
var type=entry[0];
if(this.typedSearch.searchType==='pokemon'){
if(type===this.sortCol)this.sortCol=null;
if(!['type','move','ability','egggroup','tier'].includes(type))return false;
if(type==='move')entry[1]=toID(entry[1]);
if(!this.filters)this.filters=[];
this.results=null;for(var _i2=0,_this$filters2=
this.filters;_i2<_this$filters2.length;_i2++){var _filter=_this$filters2[_i2];
if(_filter[0]===type&&_filter[1]===entry[1]){
return true;
}
}
this.filters.push(entry);
return true;
}else if(this.typedSearch.searchType==='move'){
if(type===this.sortCol)this.sortCol=null;
if(!['type','category','pokemon'].includes(type))return false;
if(type==='pokemon')entry[1]=toID(entry[1]);
if(!this.filters)this.filters=[];
this.filters.push(entry);
this.results=null;
return true;
}
return false;
};_proto.

removeFilter=function removeFilter(entry){
if(!this.filters)return false;
if(entry){
var filterid=entry.join(':');
var deleted=null;

for(var i=0;i<this.filters.length;i++){
if(filterid===this.filters[i].join(':')){
deleted=this.filters[i];
this.filters.splice(i,1);
break;
}
}
if(!deleted)return false;
}else{
this.filters.pop();
}
if(!this.filters.length)this.filters=null;
this.results=null;
return true;
};_proto.

toggleSort=function toggleSort(sortCol){
if(this.sortCol===sortCol){
if(!this.reverseSort){
this.reverseSort=true;
}else{
this.sortCol=null;
this.reverseSort=false;
}
}else{
this.sortCol=sortCol;
this.reverseSort=false;
}
this.results=null;
};_proto.

filterLabel=function filterLabel(filterType){
if(this.typedSearch&&this.typedSearch.searchType!==filterType){
return'Filter';
}
return null;
};_proto.
illegalLabel=function illegalLabel(id){var _this$typedSearch3;
return((_this$typedSearch3=this.typedSearch)==null||(_this$typedSearch3=_this$typedSearch3.illegalReasons)==null?void 0:_this$typedSearch3[id])||null;
};_proto.

getTier=function getTier(species){var _this$typedSearch4;
return((_this$typedSearch4=this.typedSearch)==null?void 0:_this$typedSearch4.getTier(species))||'';
};_proto.

textSearch=function textSearch(query){var _this$typedSearch5,_this$typedSearch6;
query=toID(query);

this.exactMatch=false;
var searchType=((_this$typedSearch5=this.typedSearch)==null?void 0:_this$typedSearch5.searchType)||'';




var searchTypeIndex=searchType?DexSearch.typeTable[searchType]:-1;


var qFilterType='';
if(query.slice(-4)==='type'){
if(query.slice(0,-4)in window.BattleTypeChart){
query=query.slice(0,-4);
qFilterType='type';
}
}


var i=DexSearch.getClosest(query);
this.exactMatch=BattleSearchIndex[i][0]===query;







var passType='';


















var searchPasses=[['normal',i,query]];



if(query.length>1)searchPasses.push(['alias',i,query]);





var queryAlias;
if(query in BattleAliases){
if(['sub','tr'].includes(query)||toID(BattleAliases[query]).slice(0,query.length)!==query){
queryAlias=toID(BattleAliases[query]);
var aliasPassType=queryAlias==='hiddenpower'?'exact':'normal';
searchPasses.unshift([aliasPassType,DexSearch.getClosest(queryAlias),queryAlias]);
}
this.exactMatch=true;
}



if(!this.exactMatch&&BattleSearchIndex[i][0].substr(0,query.length)!==query){

var matchLength=query.length-1;
if(!i)i++;
while(matchLength&&
BattleSearchIndex[i][0].substr(0,matchLength)!==query.substr(0,matchLength)&&
BattleSearchIndex[i-1][0].substr(0,matchLength)!==query.substr(0,matchLength)){
matchLength--;
}
var matchQuery=query.substr(0,matchLength);
while(i>=1&&BattleSearchIndex[i-1][0].substr(0,matchLength)===matchQuery)i--;
searchPasses.push(['fuzzy',i,'']);
}











var bufs=[[],[],[],[],[],[],[],[],[],[]];
var topbufIndex=-1;

var count=0;
var nearMatch=false;


var instafilter=null;
var instafilterSort=[0,1,2,5,4,3,6,7,8];
var illegal=(_this$typedSearch6=this.typedSearch)==null?void 0:_this$typedSearch6.illegalReasons;


for(i=0;i<BattleSearchIndex.length;i++){
if(!passType){
var searchPass=searchPasses.shift();
if(!searchPass)break;
passType=searchPass[0];
i=searchPass[1];
query=searchPass[2];
}

var entry=BattleSearchIndex[i];
var _id=entry[0];
var type=entry[1];

if(!_id)break;

if(passType==='fuzzy'){

if(count>=2){
passType='';
continue;
}
nearMatch=true;
}else if(passType==='exact'){

if(count>=1){
passType='';
continue;
}
}else if(_id.substr(0,query.length)!==query){

passType='';
continue;
}

if(entry.length>2){

if(passType!=='alias')continue;
}else{

if(passType==='alias')continue;
}

var typeIndex=DexSearch.typeTable[type];


if(query.length===1&&typeIndex!==(searchType?searchTypeIndex:1))continue;


if(searchType==='pokemon'&&(typeIndex===5||typeIndex>7))continue;
if(searchType==='pokemon'&&typeIndex===3&&this.dex.gen<9)continue;

if(searchType==='move'&&(typeIndex!==8&&typeIndex>4||typeIndex===3))continue;

if(searchType==='move'&&illegal&&typeIndex===1)continue;

if((searchType==='ability'||searchType==='item')&&typeIndex!==searchTypeIndex)continue;

if(qFilterType==='type'&&typeIndex!==2)continue;

if((_id==='megax'||_id==='megay')&&'mega'.startsWith(query))continue;

var matchStart=0;
var matchEnd=0;
if(passType==='alias'){


matchStart=entry[3];
var originalIndex=entry[2];
if(matchStart){
matchEnd=matchStart+query.length;
matchStart+=(BattleSearchIndexOffset[originalIndex][matchStart]||'0').charCodeAt(0)-48;
matchEnd+=(BattleSearchIndexOffset[originalIndex][matchEnd-1]||'0').charCodeAt(0)-48;
}
_id=BattleSearchIndex[originalIndex][0];
}else{
matchEnd=query.length;
if(matchEnd)matchEnd+=(BattleSearchIndexOffset[i][matchEnd-1]||'0').charCodeAt(0)-48;
}


if(queryAlias===_id&&query!==_id)continue;

if(searchType&&searchTypeIndex!==typeIndex){

if(!instafilter||instafilterSort[typeIndex]<instafilterSort[instafilter[2]]){
instafilter=[type,_id,typeIndex];
}
}


if(topbufIndex<0&&searchTypeIndex<2&&passType==='alias'&&!bufs[1].length&&bufs[2].length){
topbufIndex=2;
}


var table=BattleTeambuilderTable[window.room.curTeam.mod];
if(
typeIndex===1&&(!BattlePokedex[_id]||BattlePokedex[_id].exists===false)&&(
!table||!table.overrideDexInfo||_id in table.overrideDexInfo===false))
continue;else
if(
typeIndex===5&&(!BattleItems[_id]||BattleItems[_id].exists===false)&&(
!table||!table.overrideItemInfo||_id in table.overrideItemInfo===false))
continue;else
if(
typeIndex===4&&(!BattleMovedex[_id]||BattleMovedex[_id].exists===false)&&(
!table||!table.overrideMoveInfo||_id in table.overrideMoveInfo===false))
continue;else
if(
typeIndex===6&&(!BattleAbilities[_id]||BattleAbilities[_id].exists===false)&&(
!table||!table.overrideAbilityDesc||_id in table.overrideAbilityDesc===false))
continue;else
if(
typeIndex===2&&_id.replace(_id.charAt(0),_id.charAt(0).toUpperCase())in window.BattleTypeChart===false&&(
!table||_id.replace(_id.charAt(0),_id.charAt(0).toUpperCase())in table.overrideTypeChart===false))
continue;

if(illegal&&typeIndex===searchTypeIndex){





if(!bufs[typeIndex].length&&!bufs[0].length){
bufs[0]=[['header',DexSearch.typeName[type]]];
}
if(!(_id in illegal))typeIndex=0;
}else{
if(!bufs[typeIndex].length){
bufs[typeIndex]=[['header',DexSearch.typeName[type]]];
}
}


var curBufLength=passType==='alias'&&bufs[typeIndex].length;
if(curBufLength&&bufs[typeIndex][curBufLength-1][1]===_id)continue;

bufs[typeIndex].push([type,_id,matchStart,matchEnd]);

count++;
}

var topbuf=[];
if(nearMatch){
topbuf=[['html',"<em>No exact match found. The closest matches alphabetically are:</em>"]];
}
if(topbufIndex>=0){
topbuf=topbuf.concat(bufs[topbufIndex]);
bufs[topbufIndex]=[];
}
if(searchTypeIndex>=0){
topbuf=topbuf.concat(bufs[0]);
topbuf=topbuf.concat(bufs[searchTypeIndex]);
bufs[searchTypeIndex]=[];
bufs[0]=[];
}

if(instafilter&&count<20){

bufs.push(this.instafilter(searchType,instafilter[0],instafilter[1]));
}

this.results=Array.prototype.concat.apply(topbuf,bufs);
return this.results;
};_proto.
instafilter=function instafilter(searchType,fType,fId){var _this$typedSearch7;
var buf=[];
var illegalBuf=[];
var illegal=(_this$typedSearch7=this.typedSearch)==null?void 0:_this$typedSearch7.illegalReasons;

var pokedex=BattlePokedex;
var moveDex=BattleMovedex;
if(window.room.curTeam.mod){
pokedex={};
moveDex={};
var table=BattleTeambuilderTable[window.room.curTeam.mod];
for(var _id2 in table.overrideDexInfo){
pokedex[_id2]={
types:table.overrideDexInfo[_id2].types,
abilities:table.overrideDexInfo[_id2].abilities
};
}
for(var _id3 in table.overrideMoveInfo){
moveDex[_id3]={
type:table.overrideMoveInfo.type,
category:table.overrideMoveInfo.category
};
}
pokedex=Object.assign({},pokedex,BattlePokedex);
moveDex=Object.assign({},moveDex,BattleMovedex);
}
if(searchType==='pokemon'){
switch(fType){
case'type':
var type=fId.charAt(0).toUpperCase()+fId.slice(1);
buf.push(['header',type+"-type Pok&eacute;mon"]);
for(var _id4 in BattlePokedex){
if(!BattlePokedex[_id4].types)continue;
if(this.dex.species.get(_id4).types.includes(type)){
(illegal&&_id4 in illegal?illegalBuf:buf).push(['pokemon',_id4]);
}
}
break;
case'ability':
var ability=Dex.abilities.get(fId).name;
buf.push(['header',ability+" Pok&eacute;mon"]);
for(var _id5 in BattlePokedex){
if(!BattlePokedex[_id5].abilities)continue;
if(Dex.hasAbility(this.dex.species.get(_id5),ability)){
(illegal&&_id5 in illegal?illegalBuf:buf).push(['pokemon',_id5]);
}
}
break;
}
}else if(searchType==='move'){
switch(fType){
case'type':
var _type=fId.charAt(0).toUpperCase()+fId.slice(1);
buf.push(['header',_type+"-type moves"]);
for(var _id6 in BattleMovedex){
if(BattleMovedex[_id6].type===_type){
(illegal&&_id6 in illegal?illegalBuf:buf).push(['move',_id6]);
}
}
break;
case'category':
var category=fId.charAt(0).toUpperCase()+fId.slice(1);
buf.push(['header',category+" moves"]);
for(var _id7 in BattleMovedex){
if(BattleMovedex[_id7].category===category){
(illegal&&_id7 in illegal?illegalBuf:buf).push(['move',_id7]);
}
}
break;
}
}
return[].concat(buf,illegalBuf);
};DexSearch.

getClosest=function getClosest(query){

var left=0;
var right=BattleSearchIndex.length-1;
while(right>left){
var mid=Math.floor((right-left)/2+left);
if(BattleSearchIndex[mid][0]===query&&(mid===0||BattleSearchIndex[mid-1][0]!==query)){

return mid;
}else if(BattleSearchIndex[mid][0]<query){
left=mid+1;
}else{
right=mid-1;
}
}
if(left>=BattleSearchIndex.length-1)left=BattleSearchIndex.length-1;else
if(BattleSearchIndex[left+1][0]&&BattleSearchIndex[left][0]<query)left++;
if(left&&BattleSearchIndex[left-1][0]===query)left--;
return left;
};return DexSearch;}();DexSearch.typeTable={pokemon:1,type:2,tier:3,move:4,item:5,ability:6,egggroup:7,category:8,article:9};DexSearch.typeName={pokemon:'Pok&eacute;mon',type:'Type',tier:'Tiers',move:'Moves',item:'Items',ability:'Abilities',egggroup:'Egg group',category:'Category',article:'Article'};var


BattleTypedSearch=function(){

















































function BattleTypedSearch(searchType){var format=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var speciesOrSet=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';this.searchType=void 0;this.dex=Dex;this.format='';this.modFormat='';this.species='';this.set=null;this.mod='';this.formatType=null;this.baseResults=null;this.baseIllegalResults=null;this.illegalReasons=null;this.results=null;this.sortRow=null;
this.searchType=searchType;

this.baseResults=null;
this.baseIllegalResults=null;
this.modFormat=format;
var gen=9;
var ClientMods=window.ModConfig;
if(format.slice(0,3)==='gen'){
var _gen=Number(format.charAt(3))||6;

this.dex=Dex.forGen(_gen);
var mod='';
var overrideFormat='';
var modFormatType='';
for(var modid in ClientMods){
for(var formatid in ClientMods[modid].formats){
if(formatid===format||format.slice(4)===formatid){
if(format.slice(4)===formatid)this.modFormat=formatid;
mod=modid;
var formatTable=ClientMods[modid].formats[formatid];
if(mod&&formatTable.teambuilderFormat)overrideFormat=toID(formatTable.teambuilderFormat);
if(mod&&formatTable.formatType)modFormatType=toID(formatTable.formatType);
break;
}
}
}
if(mod){
this.dex=Dex.mod(mod);
this.dex.gen=_gen;
this.mod=mod;
}else{
this.dex=Dex.forGen(_gen);
}
if(overrideFormat)format=overrideFormat;else
format=format.slice(4)||'customgame';
if(modFormatType)this.formatType=modFormatType;
}else if(!format){
this.dex=Dex;
}
if(format.startsWith('dlc1')){
if(format.includes('doubles')){
this.formatType='ssdlc1doubles';
}else{
this.formatType='ssdlc1';
}
format=format.slice(4);
}
if(format.startsWith('predlc')){
if(format.includes('doubles')&&!format.includes('nationaldex')){
this.formatType='predlcdoubles';
}else if(format.includes('nationaldex')){
this.formatType='predlcnatdex';
}else{
this.formatType='predlc';
}
format=format.slice(6);
}
if(format.startsWith('stadium')){
this.formatType='stadium';
format=format.slice(7);
if(!format)format='ou';
}
if(format.startsWith('vgc'))this.formatType='doubles';
if(format==='vgc2020')this.formatType='ssdlc1doubles';
if(format==='vgc2023regulationd')this.formatType='predlcdoubles';
if(format.includes('bdsp')){
if(format.includes('doubles')){
this.formatType='bdspdoubles';
}else{
this.formatType='bdsp';
}
format=format.slice(4);
this.dex=Dex.mod('gen8bdsp');
}
if(format==='partnersincrime')this.formatType='doubles';
if(format.startsWith('ffa')||format==='freeforall')this.formatType='doubles';
if(format.includes('letsgo')){
this.formatType='letsgo';
this.dex=Dex.mod('gen7letsgo');
}
if(format.includes('nationaldex')||format.startsWith('nd')||format.includes('natdex')){
format=format.startsWith('nd')?format.slice(2):
format.includes('natdex')?format.slice(6):format.slice(11);
this.formatType='natdex';
if(!format)format='ou';
}
if(format.includes('doubles')&&this.dex.gen>4&&!this.formatType)this.formatType='doubles';
if(this.formatType==='letsgo')format=format.slice(6);
if(format.includes('metronome')){
this.formatType='metronome';
}
if(format.endsWith('nfe')){
format=format.slice(3);
this.formatType='nfe';
if(!format)format='ou';
}
if((format.endsWith('lc')||format.startsWith('lc'))&&format!=='caplc'&&!this.formatType){
this.formatType='lc';
format='lc';
}
if(format.endsWith('draft'))format=format.slice(0,-5);
this.format=format;

this.species='';
this.set=null;
if(typeof speciesOrSet==='string'){
if(speciesOrSet)this.species=speciesOrSet;
}else{
this.set=speciesOrSet;
this.species=toID(this.set.species);
}
if(!searchType||!this.set)return;
}var _proto2=BattleTypedSearch.prototype;_proto2.
getResults=function getResults(filters,sortCol,reverseSort){var _this=this;
if(sortCol==='type'){
return[this.sortRow].concat(BattleTypeSearch.prototype.getDefaultResults.call(this));
}else if(sortCol==='category'){
return[this.sortRow].concat(BattleCategorySearch.prototype.getDefaultResults.call(this));
}else if(sortCol==='ability'){
return[this.sortRow].concat(BattleAbilitySearch.prototype.getDefaultResults.call(this));
}

if(!this.baseResults){
this.baseResults=this.getBaseResults();
}

if(!this.baseIllegalResults){
var legalityFilter={};for(var _i4=0,_this$baseResults2=
this.baseResults;_i4<_this$baseResults2.length;_i4++){var _ref=_this$baseResults2[_i4];var resultType=_ref[0];var value=_ref[1];
if(resultType===this.searchType)legalityFilter[value]=1;
}
this.baseIllegalResults=[];
this.illegalReasons={};

for(var _id8 in this.getTable()){
if(!(_id8 in legalityFilter)){
this.baseIllegalResults.push([this.searchType,_id8]);
this.illegalReasons[_id8]='Illegal';
}
}
}

var results;
var illegalResults;

if(filters){
results=[];
illegalResults=[];for(var _i6=0,_this$baseResults4=
this.baseResults;_i6<_this$baseResults4.length;_i6++){var result=_this$baseResults4[_i6];
if(this.filter(result,filters)){
if(results.length&&result[0]==='header'&&results[results.length-1][0]==='header'){
results[results.length-1]=result;
}else{
results.push(result);
}
}
}
if(results.length&&results[results.length-1][0]==='header'){
results.pop();
}for(var _i8=0,_this$baseIllegalResu2=
this.baseIllegalResults;_i8<_this$baseIllegalResu2.length;_i8++){var _result=_this$baseIllegalResu2[_i8];
if(this.filter(_result,filters)){
illegalResults.push(_result);
}
}
}else{
results=[].concat(this.baseResults);
illegalResults=null;
}

if(sortCol){
results=results.filter(function(_ref2){var rowType=_ref2[0];return rowType===_this.searchType;});
results=this.sort(results,sortCol,reverseSort);
if(illegalResults){
illegalResults=illegalResults.filter(function(_ref3){var rowType=_ref3[0];return rowType===_this.searchType;});
illegalResults=this.sort(illegalResults,sortCol,reverseSort);
}
}

if(this.sortRow){
results=[this.sortRow].concat(results);
}
if(illegalResults&&illegalResults.length){
results=[].concat(results,[['header',"Illegal results"]],illegalResults);
}
return results;
};_proto2.
firstLearnsetid=function firstLearnsetid(speciesid){var _this$formatType;
var table=BattleTeambuilderTable;
if((_this$formatType=this.formatType)!=null&&_this$formatType.startsWith('bdsp'))table=table['gen8bdsp'];
if(this.formatType==='letsgo')table=table['gen7letsgo'];
if(speciesid in table.learnsets)return speciesid;
var species=this.dex.species.get(speciesid);
if(!species.exists)return'';

var baseLearnsetid=toID(species.baseSpecies);
if(typeof species.battleOnly==='string'&&species.battleOnly!==species.baseSpecies){
baseLearnsetid=toID(species.battleOnly);
}
if(baseLearnsetid in table.learnsets)return baseLearnsetid;
return'';
};_proto2.
nextLearnsetid=function nextLearnsetid(learnsetid,speciesid){
if(learnsetid==='lycanrocdusk'||speciesid==='rockruff'&&learnsetid==='rockruff'){
return'rockruffdusk';
}
var lsetSpecies=this.dex.species.get(learnsetid);
if(!lsetSpecies.exists)return'';

if(lsetSpecies.id==='gastrodoneast')return'gastrodon';
if(lsetSpecies.id==='pumpkaboosuper')return'pumpkaboo';
if(lsetSpecies.id==='sinisteaantique')return'sinistea';
if(lsetSpecies.id==='tatsugiristretchy')return'tatsugiri';

var next=lsetSpecies.battleOnly||lsetSpecies.changesFrom||lsetSpecies.prevo;
if(next)return toID(next);

return'';
};_proto2.
canLearn=function canLearn(speciesid,moveid){
var move=this.dex.moves.get(moveid);
if(this.formatType==='natdex'&&move.isNonstandard&&move.isNonstandard!=='Past'){
return false;
}
var gen=this.dex.gen;
var genChar=""+gen;
if(
this.format.startsWith('vgc')||
this.format.startsWith('battlespot')||
this.format.startsWith('battlestadium')||
this.format.startsWith('battlefestival')||
this.dex.gen===9&&this.formatType!=='natdex')
{
if(gen===9){
genChar='a';
}else if(gen===8){
genChar='g';
}else if(gen===7){
genChar='q';
}else if(gen===6){
genChar='p';
}
}
var learnsetid=this.firstLearnsetid(speciesid);
while(learnsetid){var _this$formatType2;
var table=BattleTeambuilderTable;
if((_this$formatType2=this.formatType)!=null&&_this$formatType2.startsWith('bdsp'))table=table['gen8bdsp'];
if(this.formatType==='letsgo')table=table['gen7letsgo'];
var learnset=table.learnsets[learnsetid];
if(this.mod){
var overrideLearnsets=BattleTeambuilderTable[this.mod].overrideLearnsets;
if(overrideLearnsets[learnsetid]){
if(!learnset)learnset=overrideLearnsets[learnsetid];else
{
for(var learnedMove in overrideLearnsets[learnsetid])learnset[learnedMove]=overrideLearnsets[learnsetid][learnedMove];
}
}
}

var tradebacksMod=['gen1expansionpack','gen1burgundy'];
if(learnset&&moveid in learnset&&(!(this.format.startsWith('tradebacks')||tradebacksMod.includes(this.mod))?learnset[moveid].includes(genChar):
learnset[moveid].includes(genChar)||
learnset[moveid].includes(""+(gen+1))&&move.gen===gen)){
return true;
}
learnsetid=this.nextLearnsetid(learnsetid,speciesid);
}
return false;
};_proto2.
getTier=function getTier(pokemon){
if(this.formatType==='metronome'){
return pokemon.num>=0?String(pokemon.num):pokemon.tier;
}
var modFormatTable=this.mod?window.ModConfig[this.mod].formats[this.modFormat]:{};
var table=window.BattleTeambuilderTable;
if(this.mod)table=modFormatTable.gameType!=='doubles'?BattleTeambuilderTable[this.mod]:BattleTeambuilderTable[this.mod].doubles;
var gen=this.dex.gen;
var tableKey=this.formatType==='doubles'?"gen"+gen+"doubles":
this.formatType==='letsgo'?'gen7letsgo':
this.formatType==='bdsp'?'gen8bdsp':
this.formatType==='bdspdoubles'?'gen8bdspdoubles':
this.formatType==='nfe'?"gen"+gen+"nfe":
this.formatType==='lc'?"gen"+gen+"lc":
this.formatType==='ssdlc1'?'gen8dlc1':
this.formatType==='ssdlc1doubles'?'gen8dlc1doubles':
this.formatType==='predlc'?'gen9predlc':
this.formatType==='predlcdoubles'?'gen9predlcdoubles':
this.formatType==='predlcnatdex'?'gen9predlcnatdex':
this.formatType==='natdex'?"gen"+gen+"natdex":
this.formatType==='stadium'?"gen"+gen+"stadium"+(gen>1?gen:''):"gen"+
gen;
if(table&&table[tableKey]){
table=table[tableKey];
}
if(!table)return pokemon.tier;

var id=pokemon.id;
if(id in table.overrideTier){
return table.overrideTier[id];
}
if(id.slice(-5)==='totem'&&id.slice(0,-5)in table.overrideTier){
return table.overrideTier[id.slice(0,-5)];
}
id=toID(pokemon.baseSpecies);
if(id in table.overrideTier){
return table.overrideTier[id];
}

return pokemon.tier;
};return BattleTypedSearch;}();var







BattlePokemonSearch=function(_BattleTypedSearch){_inheritsLoose(BattlePokemonSearch,_BattleTypedSearch);function BattlePokemonSearch(){var _this2;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this2=_BattleTypedSearch.call.apply(_BattleTypedSearch,[this].concat(args))||this;_this2.
sortRow=['sortpokemon',''];return _this2;}var _proto3=BattlePokemonSearch.prototype;_proto3.
getTable=function getTable(){
if(!this.mod)return BattlePokedex;else
return Object.assign({},BattleTeambuilderTable[this.mod].overrideDexInfo,BattlePokedex);
};_proto3.
getDefaultResults=function getDefaultResults(){
var results=[];
for(var _id9 in BattlePokedex){
switch(_id9){
case'bulbasaur':
results.push(['header',"Generation 1"]);
break;
case'chikorita':
results.push(['header',"Generation 2"]);
break;
case'treecko':
results.push(['header',"Generation 3"]);
break;
case'turtwig':
results.push(['header',"Generation 4"]);
break;
case'victini':
results.push(['header',"Generation 5"]);
break;
case'chespin':
results.push(['header',"Generation 6"]);
break;
case'rowlet':
results.push(['header',"Generation 7"]);
break;
case'grookey':
results.push(['header',"Generation 8"]);
break;
case'sprigatito':
results.push(['header',"Generation 9"]);
break;
case'missingno':
results.push(['header',"Glitch"]);
break;
case'syclar':
results.push(['header',"CAP"]);
break;
case'pikachucosplay':
continue;
}
results.push(['pokemon',_id9]);
}
return results;
};_proto3.
getBaseResults=function getBaseResults(){var _this$formatType3,_this$formatType4,_this$formatType5,_this$formatType6,_this$formatType7;
var format=this.format;
if(!format)return this.getDefaultResults();
var isVGCOrBS=format.startsWith('battlespot')||format.startsWith('battlestadium')||format.startsWith('vgc');
var isHackmons=format.includes('hackmons')||format.endsWith('bh');
var isDoublesOrBS=isVGCOrBS||((_this$formatType3=this.formatType)==null?void 0:_this$formatType3.includes('doubles'));
var dex=this.dex;
var modFormatTable=this.mod?window.ModConfig[this.mod].formats[this.modFormat]:{};
var table=BattleTeambuilderTable;
if(this.mod){
table=modFormatTable.gameType!=='doubles'?BattleTeambuilderTable[this.mod]:BattleTeambuilderTable[this.mod].doubles;
}else if((format.endsWith('cap')||format.endsWith('caplc'))&&dex.gen<9){
table=table['gen'+dex.gen];
}else if(isVGCOrBS){
table=table['gen'+dex.gen+'vgc'];
}else if(dex.gen===9&&isHackmons&&!this.formatType){
table=table['bh'];
}else if(
table['gen'+dex.gen+'doubles']&&dex.gen>4&&
this.formatType!=='letsgo'&&this.formatType!=='bdspdoubles'&&
this.formatType!=='ssdlc1doubles'&&this.formatType!=='predlcdoubles'&&(

format.includes('doubles')||format.includes('triples')||
format==='freeforall'||format.startsWith('ffa')||
format==='partnersincrime'))

{
table=table['gen'+dex.gen+'doubles'];
isDoublesOrBS=true;
}else if(dex.gen<9&&!this.formatType){
table=table['gen'+dex.gen];
}else if((_this$formatType4=this.formatType)!=null&&_this$formatType4.startsWith('bdsp')){
table=table['gen8'+this.formatType];
}else if(this.formatType==='letsgo'){
table=table['gen7letsgo'];
}else if(this.formatType==='natdex'){
table=table['gen'+dex.gen+'natdex'];
}else if(this.formatType==='metronome'){
table=table['gen'+dex.gen+'metronome'];
}else if(this.formatType==='nfe'){
table=table['gen'+dex.gen+'nfe'];
}else if(this.formatType==='lc'){
table=table['gen'+dex.gen+'lc'];
}else if((_this$formatType5=this.formatType)!=null&&_this$formatType5.startsWith('dlc1')){
if(this.formatType.includes('doubles')){
table=table['gen8dlc1doubles'];
}else{
table=table['gen8dlc1'];
}
}else if((_this$formatType6=this.formatType)!=null&&_this$formatType6.startsWith('predlc')){
if(this.formatType.includes('doubles')){
table=table['gen9predlcdoubles'];
}else if(this.formatType.includes('natdex')){
table=table['gen9predlcnatdex'];
}else{
table=table['gen9predlc'];
}
}else if(this.formatType==='stadium'){
table=table['gen'+dex.gen+'stadium'+(dex.gen>1?dex.gen:'')];
}

if(!table.tierSet){
table.tierSet=table.tiers.map(function(r){
if(typeof r==='string')return['pokemon',r];
return[r[0],r[1]];
});
table.tiers=null;
}
var tierSet=table.tierSet;
var slices=table.formatSlices;
if(format==='ubers'||format==='uber')tierSet=tierSet.slice(slices.Uber);else
if(isVGCOrBS||isHackmons&&dex.gen===9&&!this.formatType){
if(format.endsWith('series13')||isHackmons){

}else if(
format==='vgc2010'||format==='vgc2016'||format.startsWith('vgc2019')||
format==='vgc2022'||format.endsWith('series10')||format.endsWith('series11'))
{
tierSet=tierSet.slice(slices["Restricted Legendary"]);
}else{
tierSet=tierSet.slice(slices.Regular);
}
}else if(format==='ou')tierSet=tierSet.slice(slices.OU);else
if(format==='uu')tierSet=tierSet.slice(slices.UU);else
if(format==='ru')tierSet=tierSet.slice(slices.RU||slices.UU);else
if(format==='nu')tierSet=tierSet.slice(slices.NU||slices.RU||slices.UU);else
if(format==='pu')tierSet=tierSet.slice(slices.PU||slices.NU);else
if(format==='zu')tierSet=tierSet.slice(slices.ZU||slices.PU||slices.NU);else
if(format==='lc'||format==='lcuu'||format.startsWith('lc')||format!=='caplc'&&format.endsWith('lc'))tierSet=tierSet.slice(slices.LC);else
if(format==='cap')tierSet=tierSet.slice(0,slices.AG||slices.Uber).concat(tierSet.slice(slices.OU));else
if(format==='caplc'){
tierSet=tierSet.slice(slices['CAP LC'],slices.AG||slices.Uber).concat(tierSet.slice(slices.LC));
}else if(format==='anythinggoes'||format.endsWith('ag')||format.startsWith('ag')){
tierSet=tierSet.slice(slices.AG);
}else if(isHackmons&&(dex.gen<9||this.formatType==='natdex')){
tierSet=tierSet.slice(slices.AG||slices.Uber);
}else if(format==='monotype'||format.startsWith('monothreat'))tierSet=tierSet.slice(slices.Uber);else
if(format==='doublesubers')tierSet=tierSet.slice(slices.DUber);else
if(format==='doublesou'&&dex.gen>4)tierSet=tierSet.slice(slices.DOU);else
if(format==='doublesuu')tierSet=tierSet.slice(slices.DUU);else
if(format==='doublesnu')tierSet=tierSet.slice(slices.DNU||slices.DUU);else
if((_this$formatType7=this.formatType)!=null&&_this$formatType7.startsWith('bdsp')||this.formatType==='letsgo'||this.formatType==='stadium'){
tierSet=tierSet.slice(slices.Uber);
}else if(!isDoublesOrBS){
tierSet=[].concat(
tierSet.slice(slices.OU,slices.UU),
tierSet.slice(slices.AG,slices.Uber),
tierSet.slice(slices.Uber,slices.OU),
tierSet.slice(slices.UU));

}else{
tierSet=[].concat(
tierSet.slice(slices.DOU,slices.DUU),
tierSet.slice(slices.DUber,slices.DOU),
tierSet.slice(slices.DUU));

}

if(dex.gen>=5){
if(format==='zu'&&table.zuBans){
tierSet=tierSet.filter(function(_ref4){var type=_ref4[0],id=_ref4[1];
if(id in table.zuBans)return false;
return true;
});
}
if((format==='monotype'||format.startsWith('monothreat'))&&table.monotypeBans){
tierSet=tierSet.filter(function(_ref5){var type=_ref5[0],id=_ref5[1];
if(id in table.monotypeBans)return false;
return true;
});
}
}
if(this.mod&&!table.customTierSet){
table.customTierSet=table.customTiers.map(function(r){
if(typeof r==='string')return['pokemon',r];
return[r[0],r[1]];
});
table.customTiers=null;
}
var customTierSet=table.customTierSet;
if(customTierSet){
tierSet=customTierSet.concat(tierSet);
if(modFormatTable.bans.length>0&&!modFormatTable.bans.includes("All Pokemon")){
tierSet=tierSet.filter(function(_ref6){var type=_ref6[0],id=_ref6[1];
var banned=modFormatTable.bans;
return!banned.includes(id);
});
}else if(modFormatTable.unbans.length>0&&modFormatTable.bans.includes("All Pokemon")){
tierSet=tierSet.filter(function(_ref7){var type=_ref7[0],id=_ref7[1];
var unbanned=modFormatTable.unbans;
return unbanned.includes(id)||type==='header';
});
}
var headerCount=0;
var lastHeader='';
var emptyHeaders=[];
for(var i in tierSet){
headerCount=tierSet[i][0]==='header'?headerCount+1:0;
if(headerCount>1)emptyHeaders.push(lastHeader);
if(headerCount>0)lastHeader=tierSet[i][1];
}
if(headerCount===1)emptyHeaders.push(lastHeader);
tierSet=tierSet.filter(function(_ref8){var type=_ref8[0],id=_ref8[1];
return type!=='header'||!emptyHeaders.includes(id);
});
}


if(!/^(battlestadium|vgc|doublesubers)/g.test(format)){
tierSet=tierSet.filter(function(_ref9){var type=_ref9[0],id=_ref9[1];
if(type==='header'&&id==='DUber by technicality')return false;
if(type==='pokemon')return!id.endsWith('gmax');
return true;
});
}

return tierSet;
};_proto3.
filter=function filter(row,filters){
if(!filters)return true;
if(row[0]!=='pokemon')return true;
var species=this.dex.species.get(row[1]);for(var _i10=0;_i10<
filters.length;_i10++){var _ref10=filters[_i10];var filterType=_ref10[0];var value=_ref10[1];
switch(filterType){
case'type':
if(species.types[0]!==value&&species.types[1]!==value)return false;
break;
case'egggroup':
if(species.eggGroups[0]!==value&&species.eggGroups[1]!==value)return false;
break;
case'tier':
if(this.getTier(species)!==value)return false;
break;
case'ability':
if(!Dex.hasAbility(species,value))return false;
break;
case'move':
if(!this.canLearn(species.id,value))return false;
}
}
return true;
};_proto3.
sort=function sort(results,sortCol,reverseSort){var _this3=this;
var sortOrder=reverseSort?-1:1;
var table=!this.mod?'':BattleTeambuilderTable[this.mod].overrideDexInfo;
if(['hp','atk','def','spa','spd','spe'].includes(sortCol)){
return results.sort(function(_ref11,_ref12){var rowType1=_ref11[0],id1=_ref11[1];var rowType2=_ref12[0],id2=_ref12[1];
var pokedex1=BattlePokedex;
var pokedex2=BattlePokedex;
if(_this3.mod){
if(table[id1]&&table[id1].baseStats)pokedex1=table;
if(table[id2]&&table[id2].baseStats)pokedex2=table;
}
var stat1=_this3.dex.species.get(id1).baseStats[sortCol];
var stat2=_this3.dex.species.get(id2).baseStats[sortCol];
return(stat2-stat1)*sortOrder;
});
}else if(sortCol==='bst'){
return results.sort(function(_ref13,_ref14){var rowType1=_ref13[0],id1=_ref13[1];var rowType2=_ref14[0],id2=_ref14[1];
var pokedex1=BattlePokedex;
var pokedex2=BattlePokedex;
if(_this3.mod){
if(table[id1]&&table[id1].baseStats)pokedex1=table;
if(table[id2]&&table[id2].baseStats)pokedex2=table;
}
var base1=_this3.dex.species.get(id1).baseStats;
var base2=_this3.dex.species.get(id2).baseStats;
var bst1=base1.hp+base1.atk+base1.def+base1.spa+base1.spd+base1.spe;
var bst2=base2.hp+base2.atk+base2.def+base2.spa+base2.spd+base2.spe;
return(bst2-bst1)*sortOrder;
});
}else if(sortCol==='name'){
return results.sort(function(_ref15,_ref16){var rowType1=_ref15[0],id1=_ref15[1];var rowType2=_ref16[0],id2=_ref16[1];
var name1=id1;
var name2=id2;
return(name1<name2?-1:name1>name2?1:0)*sortOrder;
});
}
throw new Error("invalid sortcol");
};return BattlePokemonSearch;}(BattleTypedSearch);var


BattleAbilitySearch=function(_BattleTypedSearch2){_inheritsLoose(BattleAbilitySearch,_BattleTypedSearch2);function BattleAbilitySearch(){return _BattleTypedSearch2.apply(this,arguments)||this;}var _proto4=BattleAbilitySearch.prototype;_proto4.
getTable=function getTable(){
if(!this.mod)return BattleAbilities;else
return Object.assign({},BattleTeambuilderTable[this.mod].fullAbilityName,BattleAbilities);
};_proto4.
getDefaultResults=function getDefaultResults(){
var results=[];
for(var _id10 in BattleAbilities){
results.push(['ability',_id10]);
}
return results;
};_proto4.
getBaseResults=function getBaseResults(){
if(!this.species)return this.getDefaultResults();
var format=this.format;
var isHackmons=format.includes('hackmons')||format.endsWith('bh');
var isAAA=format==='almostanyability'||format.includes('aaa');
var dex=this.dex;
var species=dex.species.get(this.species);
var abilitySet=[['header',"Abilities"]];

if(species.isMega){
abilitySet.unshift(['html',"Will be <strong>"+species.abilities['0']+"</strong> after Mega Evolving."]);
species=dex.species.get(species.baseSpecies);
}
abilitySet.push(['ability',toID(species.abilities['0'])]);
if(species.abilities['1']){
abilitySet.push(['ability',toID(species.abilities['1'])]);
}
if(species.abilities['H']){
abilitySet.push(['header',"Hidden Ability"]);
abilitySet.push(['ability',toID(species.abilities['H'])]);
}
if(species.abilities['S']){
abilitySet.push(['header',"Special Event Ability"]);
abilitySet.push(['ability',toID(species.abilities['S'])]);
}
if(isAAA||format.includes('metronomebattle')||isHackmons){
var abilities=[];
for(var i in this.getTable()){
var ability=dex.abilities.get(i);
if(ability.isNonstandard)continue;
if(ability.gen>dex.gen)continue;
abilities.push(ability.id);
}

var goodAbilities=[['header',"Abilities"]];
var poorAbilities=[['header',"Situational Abilities"]];
var badAbilities=[['header',"Unviable Abilities"]];for(var _i12=0,_abilities$sort$map2=
abilities.sort().map(function(abil){return dex.abilities.get(abil);});_i12<_abilities$sort$map2.length;_i12++){var _ability=_abilities$sort$map2[_i12];
var rating=_ability.rating;
if(_ability.id==='normalize')rating=3;
if(rating>=3){
goodAbilities.push(['ability',_ability.id]);
}else if(rating>=2){
poorAbilities.push(['ability',_ability.id]);
}else{
badAbilities.push(['ability',_ability.id]);
}
}
abilitySet=[].concat(goodAbilities,poorAbilities,badAbilities);
if(species.isMega){
if(isAAA){
abilitySet.unshift(['html',"Will be <strong>"+species.abilities['0']+"</strong> after Mega Evolving."]);
}

}
}
return abilitySet;
};_proto4.
filter=function filter(row,filters){
if(!filters)return true;
if(row[0]!=='ability')return true;
var ability=this.dex.abilities.get(row[1]);for(var _i14=0;_i14<
filters.length;_i14++){var _ref17=filters[_i14];var filterType=_ref17[0];var value=_ref17[1];
switch(filterType){
case'pokemon':
if(!Dex.hasAbility(this.dex.species.get(value),ability.name))return false;
break;
}
}
return true;
};_proto4.
sort=function sort(results,sortCol,reverseSort){
throw new Error("invalid sortcol");
};return BattleAbilitySearch;}(BattleTypedSearch);var


BattleItemSearch=function(_BattleTypedSearch3){_inheritsLoose(BattleItemSearch,_BattleTypedSearch3);function BattleItemSearch(){return _BattleTypedSearch3.apply(this,arguments)||this;}var _proto5=BattleItemSearch.prototype;_proto5.
getTable=function getTable(){
if(!this.mod)return BattleItems;else
return Object.assign({},BattleTeambuilderTable[this.mod].overrideItemInfo,BattleItems);
};_proto5.
getDefaultResults=function getDefaultResults(){var _this$formatType8;
var table=BattleTeambuilderTable;
if(this.mod){
table=table[this.mod];
}else if((_this$formatType8=this.formatType)!=null&&_this$formatType8.startsWith('bdsp')){
table=table['gen8bdsp'];
}else if(this.formatType==='natdex'){
table=table['gen'+this.dex.gen+'natdex'];
}else if(this.formatType==='metronome'){
table=table['gen'+this.dex.gen+'metronome'];
}else if(this.dex.gen<9){
table=table['gen'+this.dex.gen];
}
if(!table.itemSet){
table.itemSet=table.items.map(function(r){
if(typeof r==='string'){
return['item',r];
}
return[r[0],r[1]];
});
table.items=null;
}
return table.itemSet;
};_proto5.
getBaseResults=function getBaseResults(){
var results=this.getDefaultResults();
var species=this.dex.species.get(this.species);
var speciesSpecific=[];
for(var i=results.length-1;i>0;i--){var _item$itemUser,_species$tags;
var row=results[i];
if(row[0]!=='item')continue;
var _id11=row[1];
var item=this.dex.items.get(_id11);
if(!item.exists||item.isNonstandard){
if(item.isNonstandard!="Past"||this.formatType!="natdex"){
results.splice(i,1);
continue;
}
}
if((_item$itemUser=item.itemUser)!=null&&_item$itemUser.includes(species.name)){
speciesSpecific.push(row);
}
if(_id11==='boosterenergy'&&(_species$tags=species.tags)!=null&&_species$tags.includes('Paradox')){
speciesSpecific.push(row);
}
}
if(speciesSpecific.length){
return[
['header',"Specific to "+species.name]].concat(
speciesSpecific,
results);

}
return results;
};_proto5.
filter=function filter(row,filters){
if(!filters)return true;
if(row[0]!=='ability')return true;
var ability=this.dex.abilities.get(row[1]);for(var _i16=0;_i16<
filters.length;_i16++){var _ref18=filters[_i16];var filterType=_ref18[0];var value=_ref18[1];
switch(filterType){
case'pokemon':
if(!Dex.hasAbility(this.dex.species.get(value),ability.name))return false;
break;
}
}
return true;
};_proto5.
sort=function sort(results,sortCol,reverseSort){
throw new Error("invalid sortcol");
};return BattleItemSearch;}(BattleTypedSearch);var


BattleMoveSearch=function(_BattleTypedSearch4){_inheritsLoose(BattleMoveSearch,_BattleTypedSearch4);function BattleMoveSearch(){var _this4;for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}_this4=_BattleTypedSearch4.call.apply(_BattleTypedSearch4,[this].concat(args))||this;_this4.
sortRow=['sortmove',''];return _this4;}var _proto6=BattleMoveSearch.prototype;_proto6.
getTable=function getTable(){
if(!this.mod)return BattleMovedex;else
return Object.assign({},BattleTeambuilderTable[this.mod].overrideMoveInfo,BattleMovedex);
};_proto6.
getDefaultResults=function getDefaultResults(){
var results=[];
results.push(['header',"Moves"]);
for(var _id12 in this.getTable()){
switch(_id12){
case'paleowave':
results.push(['header',"CAP moves"]);
break;
case'magikarpsrevenge':
continue;
}
results.push(['move',_id12]);
}
return results;
};_proto6.
moveIsNotUseless=function moveIsNotUseless(id,species,moves,set){var _moveData$flags,_moveData$flags2,_moveData$flags3;
var dex=this.dex;

var abilityid=set?toID(set.ability):'';
var itemid=set?toID(set.item):'';


if(this.mod&&id in BattleTeambuilderTable[this.mod].overrideMoveInfo){
if(BattleTeambuilderTable[this.mod].overrideMoveInfo[id].viable===true)return true;
if(BattleTeambuilderTable[this.mod].overrideMoveInfo[id].viable===false)return false;
}

if(dex.gen===1){

if([
'acidarmor','amnesia','barrier','bind','blizzard','clamp','confuseray','counter','firespin','growth','headbutt','hyperbeam','mirrormove','pinmissile','razorleaf','sing','slash','sludge','twineedle','wrap'].
includes(id)){
return true;
}


if([
'disable','haze','leechseed','quickattack','roar','thunder','toxic','triattack','waterfall','whirlwind'].
includes(id)){
return false;
}


switch(id){
case'bubblebeam':return!moves.includes('surf')&&!moves.includes('blizzard');
case'doubleedge':return!moves.includes('bodyslam');
case'doublekick':return!moves.includes('submission');
case'firepunch':return!moves.includes('fireblast');
case'megadrain':return!moves.includes('razorleaf')&&!moves.includes('surf');
case'megakick':return!moves.includes('hyperbeam');
case'reflect':return!moves.includes('barrier')&&!moves.includes('acidarmor');
case'stomp':return!moves.includes('headbutt');
case'submission':return!moves.includes('highjumpkick');
case'thunderpunch':return!moves.includes('thunderbolt');
case'triattack':return!moves.includes('bodyslam');
}

if(this.formatType==='stadium'){
if(['doubleedge','focusenergy','haze'].includes(id))return true;
if(['hyperbeam','sing','hypnosis'].includes(id))return false;
switch(id){
case'fly':return!moves.includes('drillpeck');
case'dig':return!moves.includes('earthquake');
}
}

if(this.mod==='gen1expansionpack'){
if(['bulletpunch','irondefense','ironhead','metalsound','drainingkiss','charm'].includes(id))return true;
if(['magnetbomb','disarmingvoice','brutalswing'].includes(id))return false;
switch(id){

case'smartstrike':return!moves.includes('ironhead');
case'magnetbomb':return!moves.includes('ironhead')&&!moves.includes('smartstrike');
case'mirrorshot':return!moves.includes('ironhead')&&!moves.includes('smartstrike')&&!moves.includes('magnetbomb');

case'kowtowcleave':return!moves.includes('nightslash');
case'falsesurrender':return!moves.includes('kowtowcleave')&&!moves.includes('nightslash');
case'feintattack':return!moves.includes('kowtowcleave')&&!moves.includes('falsesurrender')&&!moves.includes('nightslash');
case'brutalswing':return!moves.includes('kowtowcleave')&&!moves.includes('falsesurrender')&&!moves.includes('nightslash')&&!moves.includes('feintattack');
}
}
}

if(this.formatType==='letsgo'){
if(['megadrain','teleport'].includes(id))return true;
}

if(this.formatType==='metronome'){
if(id==='metronome')return true;
}

if(itemid==='pidgeotite')abilityid='noguard';
if(itemid==='blastoisinite')abilityid='megalauncher';
if(itemid==='heracronite')abilityid='skilllink';
if(itemid==='cameruptite')abilityid='sheerforce';
if(itemid==='aerodactylite'||itemid==='charizardmegax')abilityid='toughclaws';
if(itemid==='glalitite')abilityid='refrigerate';

switch(id){
case'fakeout':case'flamecharge':case'nuzzle':case'poweruppunch':
return abilityid!=='sheerforce';
case'solarbeam':case'solarblade':
return['desolateland','drought','chlorophyll','orichalcumpulse'].includes(abilityid)||itemid==='powerherb';
case'dynamicpunch':case'grasswhistle':case'inferno':case'sing':case'zapcannon':
return abilityid==='noguard';
case'heatcrash':case'heavyslam':
return species.weightkg>=(species.evos?75:130);

case'aerialace':
return['technician','toughclaws'].includes(abilityid)&&!moves.includes('bravebird');
case'ancientpower':
return['serenegrace','technician'].includes(abilityid)||!moves.includes('powergem');
case'aquajet':
return!moves.includes('jetpunch');
case'aurawheel':
return species.baseSpecies==='Morpeko';
case'axekick':
return!moves.includes('highjumpkick');
case'bellydrum':
return moves.includes('aquajet')||moves.includes('jetpunch')||moves.includes('extremespeed')||
['iceface','unburden'].includes(abilityid);
case'bulletseed':
return['skilllink','technician'].includes(abilityid);
case'chillingwater':
return!moves.includes('scald');
case'counter':
return species.baseStats.hp>=65;
case'darkvoid':
return dex.gen<7;
case'dualwingbeat':
return abilityid==='technician'||!moves.includes('drillpeck');
case'feint':
return abilityid==='refrigerate';
case'grassyglide':
return abilityid==='grassysurge';
case'gyroball':
return species.baseStats.spe<=60;
case'headbutt':
return abilityid==='serenegrace';
case'hex':
return!moves.includes('infernalparade');
case'hiddenpowerelectric':
return!(moves.includes('thunderbolt')||dex.gen<4&&moves.includes('thunderpunch'));
case'hiddenpowerfighting':
return!(moves.includes('aurasphere')||moves.includes('focusblast')||dex.gen<4&&moves.includes('brickbreak'));
case'hiddenpowerfire':
return!(moves.includes('flamethrower')||moves.includes('mysticalfire')||dex.gen<4&&moves.includes('firepunch'));
case'hiddenpowergrass':
return!(moves.includes('energyball')||moves.includes('grassknot')||moves.includes('gigadrain'));
case'hiddenpowerice':
return!(moves.includes('icebeam')||dex.gen>5&&(moves.includes('aurorabeam')||moves.includes('glaciate'))||dex.gen<4&&moves.includes('icepunch'));
case'hiddenpowerflying':
return dex.gen<4&&!moves.includes('drillpeck');
case'hiddenpowerbug':
return dex.gen<4&&!moves.includes('megahorn');
case'hiddenpowerpsychic':
return species.baseSpecies==='Unown';
case'hyperspacefury':
return species.id==='hoopaunbound';
case'hypnosis':
return dex.gen<4&&!moves.includes('sleeppowder')||dex.gen>6&&abilityid==='baddreams';
case'icepunch':
return!moves.includes('icespinner')||['sheerforce','ironfist'].includes(abilityid)||itemid==='punchingglove';
case'iciclecrash':
return!moves.includes('mountaingale');
case'icywind':

return species.baseSpecies==='Keldeo'||this.formatType==='doubles';
case'infestation':
return moves.includes('stickyweb');
case'irondefense':
return!moves.includes('acidarmor');
case'irontail':
return dex.gen>5&&!moves.includes('ironhead')&&!moves.includes('gunkshot')&&!moves.includes('poisonjab');
case'jumpkick':
return!moves.includes('highjumpkick')&&!moves.includes('axekick');
case'lastresort':
return set&&set.moves.length<3;
case'leechlife':
return dex.gen>6;
case'mysticalfire':
return dex.gen>6&&!moves.includes('flamethrower');
case'naturepower':
return dex.gen===5;
case'nightslash':
return!moves.includes('crunch')&&!(moves.includes('knockoff')&&dex.gen>=6);
case'outrage':
return!moves.includes('glaiverush');
case'petaldance':
return abilityid==='owntempo';
case'phantomforce':
return!(moves.includes('shadowforce')||moves.includes('poltergeist')||moves.includes('shadowclaw'))||this.formatType==='doubles';
case'poisonfang':
return species.types.includes('Poison')&&!moves.includes('gunkshot')&&!moves.includes('poisonjab');
case'relicsong':
return species.id==='meloetta';
case'refresh':
return!moves.includes('aromatherapy')&&!moves.includes('healbell');
case'risingvoltage':
return abilityid==='electricsurge'||abilityid==='hadronengine';
case'rocktomb':
return abilityid==='technician';
case'selfdestruct':
return dex.gen<5&&!moves.includes('explosion');
case'shadowpunch':
return abilityid==='ironfist'&&!moves.includes('ragefist');
case'shelter':
return!moves.includes('acidarmor')&&!moves.includes('irondefense');
case'smackdown':
return species.types.includes('Ground');
case'smartstrike':
return species.types.includes('Steel')&&!moves.includes('ironhead');
case'soak':
return abilityid==='unaware';
case'steelwing':
return!moves.includes('ironhead');
case'stompingtantrum':
return!moves.includes('earthquake')&&!moves.includes('drillrun')||this.formatType==='doubles';
case'stunspore':
return!moves.includes('thunderwave');
case'technoblast':
return dex.gen>5&&itemid.endsWith('drive')||itemid==='dousedrive';
case'teleport':
return dex.gen>7;
case'terrainpulse':case'waterpulse':
return['megalauncher','technician'].includes(abilityid)&&!moves.includes('originpulse');
case'toxicspikes':
return abilityid!=='toxicdebris';
case'trickroom':
return species.baseStats.spe<=100;
}

if(this.formatType==='doubles'&&BattleMoveSearch.GOOD_DOUBLES_MOVES.includes(id)){
return true;
}
var moveData=BattleMovedex[id];
if(!moveData)return true;
if(moveData.category==='Status'){
return BattleMoveSearch.GOOD_STATUS_MOVES.includes(id);
}
if((_moveData$flags=moveData.flags)!=null&&_moveData$flags.charge){
return itemid==='powerherb';
}
if((_moveData$flags2=moveData.flags)!=null&&_moveData$flags2.recharge){
return false;
}
if((_moveData$flags3=moveData.flags)!=null&&_moveData$flags3.slicing&&abilityid==='sharpness'){
return true;
}
if(moveData.basePower<75){
return BattleMoveSearch.GOOD_WEAK_MOVES.includes(id);
}
return!BattleMoveSearch.BAD_STRONG_MOVES.includes(id);
};_proto6.












getBaseResults=function getBaseResults(){var _window$ModConfig$thi,_this$formatType9,_this$formatType10,_this$formatType11;
if(!this.species)return this.getDefaultResults();
var dex=this.dex;
var species=dex.species.get(this.species);
var format=this.format;
var isHackmons=format.includes('hackmons')||format.endsWith('bh');
var isSTABmons=format.includes('stabmons')||format.includes('stylemons')||format==='staaabmons';
var isTradebacks=format.includes('tradebacks')||this.mod==='gen1expansionpack'||this.mod==='gen1burgundy';
var regionBornLegality=dex.gen>=6&&(
/^battle(spot|stadium|festival)/.test(format)||format.startsWith('vgc')||
dex.gen===9&&this.formatType!=='natdex');

var isHoennGaiden=this.modFormat.endsWith('hoenngaiden');

var hasOwnUsefulCheck=false;
switch(typeof((_window$ModConfig$thi=window.ModConfig[this.mod])==null?void 0:_window$ModConfig$thi.moveIsNotUseless)){
case'string':
hasOwnUsefulCheck=true;
var usefulCheck=JSON.parse(window.ModConfig[this.mod].moveIsNotUseless);
var checkParameters=usefulCheck.substring(usefulCheck.indexOf('(')+1,usefulCheck.indexOf(')')).split(',');
window.ModConfig[this.mod].moveIsNotUseless=_construct(Function,checkParameters.concat([usefulCheck.substring(usefulCheck.indexOf('{'))]));
break;
case'function':
hasOwnUsefulCheck=true;
break;
}

var learnsetid=this.firstLearnsetid(species.id);
var moves=[];
var sketchMoves=[];
var sketch=false;
var gen=''+dex.gen;
var lsetTable=BattleTeambuilderTable;
if((_this$formatType9=this.formatType)!=null&&_this$formatType9.startsWith('bdsp'))lsetTable=lsetTable['gen8bdsp'];
if(this.formatType==='letsgo')lsetTable=lsetTable['gen7letsgo'];
if((_this$formatType10=this.formatType)!=null&&_this$formatType10.startsWith('dlc1'))lsetTable=lsetTable['gen8dlc1'];
if((_this$formatType11=this.formatType)!=null&&_this$formatType11.startsWith('predlc'))lsetTable=lsetTable['gen9predlc'];
while(learnsetid){
var learnset=lsetTable.learnsets[learnsetid];
if(this.mod){
var overrideLearnsets=BattleTeambuilderTable[this.mod].overrideLearnsets;
if(overrideLearnsets[learnsetid]){
if(!learnset)learnset=overrideLearnsets[learnsetid];else
{
for(var moveid in overrideLearnsets[learnsetid])learnset[moveid]=overrideLearnsets[learnsetid][moveid];
}
}
}
if(learnset){
for(var _moveid in learnset){var _this$formatType12,_BattleTeambuilderTab,_this$formatType13,_BattleTeambuilderTab2;
var learnsetEntry=learnset[_moveid];
var move=dex.moves.get(_moveid);
var minGenCode={6:'p',7:'q',8:'g',9:'a'};
if(regionBornLegality&&!learnsetEntry.includes(minGenCode[dex.gen])){
continue;
}
if(
!learnsetEntry.includes(gen)&&(
!isTradebacks?true:!(move.gen<=dex.gen&&learnsetEntry.includes(''+(dex.gen+1)))))
{
continue;
}
if(this.formatType!=='natdex'&&move.isNonstandard==="Past"){
continue;
}
if(
(_this$formatType12=this.formatType)!=null&&_this$formatType12.startsWith('dlc1')&&(_BattleTeambuilderTab=
BattleTeambuilderTable['gen8dlc1'])!=null&&_BattleTeambuilderTab.nonstandardMoves.includes(_moveid))
{
continue;
}
if(
(_this$formatType13=this.formatType)!=null&&_this$formatType13.includes('predlc')&&this.formatType!=='predlcnatdex'&&(_BattleTeambuilderTab2=
BattleTeambuilderTable['gen9predlc'])!=null&&_BattleTeambuilderTab2.nonstandardMoves.includes(_moveid))
{
continue;
}
if(moves.includes(_moveid))continue;
moves.push(_moveid);
if(_moveid==='sketch')sketch=true;
if(_moveid==='hiddenpower'){
moves.push(
'hiddenpowerbug','hiddenpowerdark','hiddenpowerdragon','hiddenpowerelectric','hiddenpowerfighting','hiddenpowerfire','hiddenpowerflying','hiddenpowerghost','hiddenpowergrass','hiddenpowerground','hiddenpowerice','hiddenpowerpoison','hiddenpowerpsychic','hiddenpowerrock','hiddenpowersteel','hiddenpowerwater'
);
}
if(isHoennGaiden&&_moveid==='batonpass'){
moves.push('batonpassgaiden');
moves.splice(moves.indexOf('batonpass'),1);
}
}
}
learnsetid=this.nextLearnsetid(learnsetid,species.id);
}
if(sketch||isHackmons){
if(isHackmons)moves=[];
for(var _id13 in this.getTable()){
if(!format.startsWith('cap')&&(_id13==='paleowave'||_id13==='shadowstrike'))continue;
var _move=dex.moves.get(_id13);
if(!_move.exists||moves.includes(_id13)||_move.gen>dex.gen)continue;
if(sketch){
if(_move.noSketch||_move.isMax||_move.isZ)continue;
if(_move.isNonstandard&&_move.isNonstandard!=='Past')continue;
if(_move.isNonstandard==='Past'&&this.formatType!=='natdex')continue;
sketchMoves.push(_id13);
}else{
if(!(dex.gen<8||this.formatType==='natdex')&&_move.isZ)continue;
if(typeof _move.isMax==='string')continue;
if(_move.isMax&&dex.gen>8)continue;
if(_move.isNonstandard==='Past'&&this.formatType!=='natdex')continue;
if(_move.isNonstandard==='LGPE'&&this.formatType!=='letsgo')continue;
moves.push(_id13);
}
}
}
if(this.formatType==='metronome')moves=['metronome'];
if(isSTABmons){
for(var _id14 in this.getTable()){
var _move2=dex.moves.get(_id14);
if(moves.includes(_move2.id))continue;
if(_move2.gen>dex.gen)continue;
if(_move2.isZ||_move2.isMax||_move2.isNonstandard&&_move2.isNonstandard!=='Unobtainable')continue;

var speciesTypes=[];
var moveTypes=[];
for(var i=dex.gen;i>=species.gen&&i>=_move2.gen;i--){
var genDex=Dex.forGen(i);
moveTypes.push(genDex.moves.get(_move2.name).type);

var pokemon=genDex.species.get(species.name);
var baseSpecies=genDex.species.get(pokemon.changesFrom||pokemon.name);
if(!pokemon.battleOnly)speciesTypes.push.apply(speciesTypes,pokemon.types);
var prevo=pokemon.prevo;
while(prevo){
var prevoSpecies=genDex.species.get(prevo);
speciesTypes.push.apply(speciesTypes,prevoSpecies.types);
prevo=prevoSpecies.prevo;
}
if(pokemon.battleOnly&&typeof pokemon.battleOnly==='string'){
species=dex.species.get(pokemon.battleOnly);
}
var excludedForme=function(s){return[
'Alola','Alola-Totem','Galar','Galar-Zen','Hisui','Paldea','Paldea-Combat','Paldea-Blaze','Paldea-Aqua'].
includes(s.forme);};
if(baseSpecies.otherFormes&&!['Wormadam','Urshifu'].includes(baseSpecies.baseSpecies)){
if(!excludedForme(species))speciesTypes.push.apply(speciesTypes,baseSpecies.types);for(var _i18=0,_baseSpecies$otherFor2=
baseSpecies.otherFormes;_i18<_baseSpecies$otherFor2.length;_i18++){var formeName=_baseSpecies$otherFor2[_i18];
var forme=dex.species.get(formeName);
if(!forme.battleOnly&&!excludedForme(forme))speciesTypes.push.apply(speciesTypes,forme.types);
}
}
}
var valid=false;for(var _i20=0;_i20<
moveTypes.length;_i20++){var type=moveTypes[_i20];
if(speciesTypes.includes(type)){
valid=true;
break;
}
}
if(valid)moves.push(_id14);
}
}

moves.sort();
sketchMoves.sort();

var usableMoves=[];
var uselessMoves=[];for(var _i22=0,_moves2=
moves;_i22<_moves2.length;_i22++){var _id15=_moves2[_i22];
var isUsable=this.moveIsNotUseless(_id15,species,moves,this.set);
if(hasOwnUsefulCheck){
var modIsUsable=window.ModConfig[this.mod].moveIsNotUseless.apply(window.ModConfig[this.mod],[_id15,species,moves,this.set]);
if(typeof modIsUsable==='boolean'&&modIsUsable!==isUsable)isUsable=modIsUsable;
}
if(isUsable){
if(!usableMoves.length)usableMoves.push(['header',"Moves"]);
usableMoves.push(['move',_id15]);
}else{
if(!uselessMoves.length)uselessMoves.push(['header',"Usually useless moves"]);
uselessMoves.push(['move',_id15]);
}
}
if(sketchMoves.length){
usableMoves.push(['header',"Sketched moves"]);
uselessMoves.push(['header',"Useless sketched moves"]);
}for(var _i24=0;_i24<
sketchMoves.length;_i24++){var _id16=sketchMoves[_i24];
var _isUsable=this.moveIsNotUseless(_id16,species,sketchMoves,this.set);
if(hasOwnUsefulCheck){
var _modIsUsable=window.ModConfig[this.mod].moveIsNotUseless.apply(window.ModConfig[this.mod],[_id16,species,moves,this.set]);
if(typeof _modIsUsable==='boolean'&&_modIsUsable!==_isUsable)_isUsable=_modIsUsable;
}
if(_isUsable){
usableMoves.push(['move',_id16]);
}else{
uselessMoves.push(['move',_id16]);
}
}
return[].concat(usableMoves,uselessMoves);
};_proto6.
filter=function filter(row,filters){
if(!filters)return true;
if(row[0]!=='move')return true;
var move=this.dex.moves.get(row[1]);for(var _i26=0;_i26<
filters.length;_i26++){var _ref19=filters[_i26];var filterType=_ref19[0];var value=_ref19[1];
switch(filterType){
case'type':
if(move.type!==value)return false;
break;
case'category':
if(move.category!==value)return false;
break;
case'pokemon':
if(!this.canLearn(value,move.id))return false;
break;
}
}
return true;
};_proto6.
sort=function sort(results,sortCol,reverseSort){var _this5=this;
var sortOrder=reverseSort?-1:1;
switch(sortCol){
case'power':
var powerTable={
"return":102,frustration:102,spitup:300,trumpcard:200,naturalgift:80,grassknot:120,
lowkick:120,gyroball:150,electroball:150,flail:200,reversal:200,present:120,
wringout:120,crushgrip:120,heatcrash:120,heavyslam:120,fling:130,magnitude:150,
beatup:24,punishment:1020,psywave:1250,nightshade:1200,seismictoss:1200,
dragonrage:1140,sonicboom:1120,superfang:1350,endeavor:1399,sheercold:1501,
fissure:1500,horndrill:1500,guillotine:1500
};
return results.sort(function(_ref20,_ref21){var rowType1=_ref20[0],id1=_ref20[1];var rowType2=_ref21[0],id2=_ref21[1];
var move1=_this5.dex.moves.get(id1);
var move2=_this5.dex.moves.get(id2);
var pow1=move1.basePower||powerTable[id1]||(move1.category==='Status'?-1:1400);
var pow2=move2.basePower||powerTable[id2]||(move2.category==='Status'?-1:1400);
return(pow2-pow1)*sortOrder;
});
case'accuracy':
return results.sort(function(_ref22,_ref23){var rowType1=_ref22[0],id1=_ref22[1];var rowType2=_ref23[0],id2=_ref23[1];
var accuracy1=_this5.dex.moves.get(id1).accuracy||0;
var accuracy2=_this5.dex.moves.get(id2).accuracy||0;
if(accuracy1===true)accuracy1=101;
if(accuracy2===true)accuracy2=101;
return(accuracy2-accuracy1)*sortOrder;
});
case'pp':
return results.sort(function(_ref24,_ref25){var rowType1=_ref24[0],id1=_ref24[1];var rowType2=_ref25[0],id2=_ref25[1];
var pp1=_this5.dex.moves.get(id1).pp||0;
var pp2=_this5.dex.moves.get(id2).pp||0;
return(pp2-pp1)*sortOrder;
});
case'name':
return results.sort(function(_ref26,_ref27){var rowType1=_ref26[0],id1=_ref26[1];var rowType2=_ref27[0],id2=_ref27[1];
var name1=id1;
var name2=id2;
return(name1<name2?-1:name1>name2?1:0)*sortOrder;
});
}
throw new Error("invalid sortcol");
};return BattleMoveSearch;}(BattleTypedSearch);BattleMoveSearch.GOOD_STATUS_MOVES=['acidarmor','agility','aromatherapy','auroraveil','autotomize','banefulbunker','batonpass','bellydrum','bulkup','calmmind','chillyreception','clangoroussoul','coil','cottonguard','courtchange','curse','defog','destinybond','detect','disable','dragondance','encore','extremeevoboost','filletaway','geomancy','glare','haze','healbell','healingwish','healorder','heartswap','honeclaws','kingsshield','leechseed','lightscreen','lovelykiss','lunardance','magiccoat','maxguard','memento','milkdrink','moonlight','morningsun','nastyplot','naturesmadness','noretreat','obstruct','painsplit','partingshot','perishsong','protect','quiverdance','recover','reflect','reflecttype','rest','revivalblessing','roar','rockpolish','roost','shedtail','shellsmash','shiftgear','shoreup','silktrap','slackoff','sleeppowder','sleeptalk','softboiled','spikes','spikyshield','spore','stealthrock','stickyweb','strengthsap','substitute','switcheroo','swordsdance','synthesis','tailglow','tailwind','taunt','thunderwave','tidyup','toxic','transform','trick','victorydance','whirlwind','willowisp','wish','yawn'];BattleMoveSearch.GOOD_WEAK_MOVES=['accelerock','acrobatics','aquacutter','avalanche','barbbarrage','bonemerang','bouncybubble','bulletpunch','buzzybuzz','ceaselessedge','circlethrow','clearsmog','doubleironbash','dragondarts','dragontail','drainingkiss','endeavor','facade','firefang','flipturn','flowertrick','freezedry','frustration','geargrind','grassknot','gyroball','icefang','iceshard','iciclespear','infernalparade','jetpunch','knockoff','lastrespects','lowkick','machpunch','mortalspin','mysticalpower','naturesmadness','nightshade','nuzzle','pikapapow','populationbomb','psychocut','psyshieldbash','pursuit','quickattack','ragefist','rapidspin','return','rockblast','ruination','saltcure','scorchingsands','seismictoss','shadowclaw','shadowsneak','sizzlyslide','skydrop','stoneaxe','storedpower','stormthrow','suckerpunch','superfang','surgingstrikes','tailslap','trailblaze','tripleaxel','tripledive','twinbeam','uturn','veeveevolley','voltswitch','watershuriken','weatherball'];BattleMoveSearch.BAD_STRONG_MOVES=['belch','burnup','crushclaw','dragonrush','dreameater','eggbomb','firepledge','flyingpress','grasspledge','hyperbeam','hyperfang','hyperspacehole','jawlock','landswrath','megakick','megapunch','mistyexplosion','muddywater','nightdaze','pollenpuff','rockclimb','selfdestruct','shelltrap','skyuppercut','slam','strength','submission','synchronoise','takedown','thrash','uproar','waterpledge'];BattleMoveSearch.GOOD_DOUBLES_MOVES=['allyswitch','bulldoze','coaching','electroweb','faketears','fling','followme','healpulse','helpinghand','junglehealing','lifedew','lunarblessing','muddywater','pollenpuff','psychup','ragepowder','safeguard','skillswap','snipeshot','wideguard'];var


BattleCategorySearch=function(_BattleTypedSearch5){_inheritsLoose(BattleCategorySearch,_BattleTypedSearch5);function BattleCategorySearch(){return _BattleTypedSearch5.apply(this,arguments)||this;}var _proto7=BattleCategorySearch.prototype;_proto7.
getTable=function getTable(){
return{physical:1,special:1,status:1};
};_proto7.
getDefaultResults=function getDefaultResults(){
return[
['category','physical'],
['category','special'],
['category','status']];

};_proto7.
getBaseResults=function getBaseResults(){
return this.getDefaultResults();
};_proto7.
filter=function filter(row,filters){
throw new Error("invalid filter");
};_proto7.
sort=function sort(results,sortCol,reverseSort){
throw new Error("invalid sortcol");
};return BattleCategorySearch;}(BattleTypedSearch);var


BattleTypeSearch=function(_BattleTypedSearch6){_inheritsLoose(BattleTypeSearch,_BattleTypedSearch6);function BattleTypeSearch(){return _BattleTypedSearch6.apply(this,arguments)||this;}var _proto8=BattleTypeSearch.prototype;_proto8.
getTable=function getTable(){
if(!this.mod)return window.BattleTypeChart;else
return Object.assign({},BattleTeambuilderTable[this.mod].overrideTypeChart,window.BattleTypeChart);
};_proto8.
getDefaultResults=function getDefaultResults(){
var results=[];
for(var _id17 in window.BattleTypeChart){
results.push(['type',_id17]);
}
return results;
};_proto8.
getBaseResults=function getBaseResults(){
return this.getDefaultResults();
};_proto8.
filter=function filter(row,filters){
throw new Error("invalid filter");
};_proto8.
sort=function sort(results,sortCol,reverseSort){
throw new Error("invalid sortcol");
};return BattleTypeSearch;}(BattleTypedSearch);
//# sourceMappingURL=battle-dex-search.js.map