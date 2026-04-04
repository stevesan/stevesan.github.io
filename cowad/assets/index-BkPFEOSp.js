(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class vi{constructor(e,t){this.key=e,this._val=t}val(){return this._val}numChildren(){return this._val&&typeof this._val=="object"?Object.keys(this._val).length:0}}const Af="cowad-local",ur="data",Hu="store",Bi={};let Ro=null;function wf(){return new Promise((i,e)=>{const t=indexedDB.open(Af,1);t.onupgradeneeded=()=>{t.result.createObjectStore(ur)},t.onsuccess=()=>i(t.result),t.onerror=()=>e(t.error)})}function Cf(){return wf().then(i=>(Ro=i,new Promise(e=>{const n=i.transaction(ur,"readonly").objectStore(ur).get(Hu);n.onsuccess=()=>{n.result&&Object.assign(Bi,n.result),e()},n.onerror=()=>e()}))).catch(()=>{})}function vl(){if(!Ro)return;Ro.transaction(ur,"readwrite").objectStore(ur).put(structuredClone(Bi),Hu)}const la=new Map;function ks(i,e){const t=la.get(i);return t?t.filter(n=>n.event===e).map(n=>n.callback):[]}function Rf(i,e,t){la.has(i)||la.set(i,[]),la.get(i).push({event:e,callback:t})}function jn(i){let e=Bi;for(const t of i){if(e==null||typeof e!="object")return;e=e[t]}return e}function za(i,e){if(i.length===0){if(e==null)for(const s of Object.keys(Bi))delete Bi[s];else typeof e=="object"&&Object.assign(Bi,e);return}let t=Bi;for(let s=0;s<i.length-1;s++)(t[i[s]]==null||typeof t[i[s]]!="object")&&(t[i[s]]={}),t=t[i[s]];const n=i[i.length-1];e==null?delete t[n]:t[n]=e}function Va(i,e,t,n){if(e.length>=2){const s=e.slice(0,-1).join("/"),r=e[e.length-1],a=t!==void 0,o=n==null;if(!a&&!o)for(const c of ks(s,"child_added"))c(new vi(r,n));else if(a&&o)for(const c of ks(s,"child_removed"))c(new vi(r,t));else if(a&&!o)for(const c of ks(s,"child_changed"))c(new vi(r,n))}for(const s of ks(i,"value"))s(new vi(e[e.length-1]||"",n??null));if(e.length>=2){const s=e.slice(0,-1).join("/"),r=jn(e.slice(0,-1));for(const a of ks(s,"value"))a(new vi(e[e.length-2]||"",r??null))}}let Pf=Date.now();class Fc{constructor(e){this._path=e.replace(/^\/+|\/+$/g,"")}get key(){const e=this._path.split("/");return e[e.length-1]||""}get segments(){return this._path?this._path.split("/"):[]}child(e){const t=this._path?`${this._path}/${e}`:e;return new Fc(t)}set(e){const t=this.segments,n=jn(t);za(t,e);const s=jn(t);return Va(this._path,t,n,s),vl(),Promise.resolve()}update(e){if(e==null)return Promise.resolve();const t=this.segments;if(t.length===0)for(const[n,s]of Object.entries(e)){const r=n.split("/").filter(c=>c),a=jn(r);za(r,s);const o=jn(r);Va(n,r,a,o)}else{const n=jn(t),s=n&&typeof n=="object"?{...n}:{};for(const[r,a]of Object.entries(e))a==null?delete s[r]:s[r]=a;za(t,s),Va(this._path,t,n,s)}return vl(),Promise.resolve()}remove(){return this.set(null)}push(e){const t="-"+(++Pf).toString(36)+Math.random().toString(36).slice(2,8),n=this.child(t);if(e!==void 0){const r=n.set(e).then(()=>n);return r.key=t,r}const s=Promise.resolve(n);return s.key=t,s}on(e,t){if(Rf(this._path,e,t),e==="value"){const n=jn(this.segments);t(new vi(this.key,n??null))}else if(e==="child_added"){const n=jn(this.segments);if(n&&typeof n=="object")for(const[s,r]of Object.entries(n))t(new vi(s,r))}}once(e){const t=jn(this.segments);return Promise.resolve(new vi(this.key,t??null))}onDisconnect(){return{remove(){}}}}class Lf{ref(e){return new Fc(e||"")}}function If(){const i=Cf();return{db:new Lf,ready:i}}const Oc="cowad-firebase-config",Bc="cowad-firebase-connected";function Df(){return localStorage.getItem(Oc)!==null}function Gu(){try{const i=localStorage.getItem(Oc);return i?JSON.parse(i):null}catch{return null}}function Uf(i){localStorage.setItem(Oc,JSON.stringify(i))}let Wu=!1,$t,Po;const Nf=localStorage.getItem(Bc)==="true",xl=Gu();if(Nf&&xl)firebase.initializeApp({...xl}),$t=firebase.database(),Wu=!0,Po=Promise.resolve();else{const i=If();$t=i.db,Po=i.ready}function ge(i){return $t.ref("map/"+i)}function Xu(){localStorage.setItem(Bc,"true"),location.reload()}function Ff(){localStorage.setItem(Bc,"false"),location.reload()}const Of=Math.random().toString(36).slice(2,10),R={vertices:new Map,linedefs:new Map,sidedefs:new Map,sectors:new Map,things:new Map};let Mn="select",Ee=null,Bt={x:0,y:0},ft=1,$u=!1,Ks={mx:0,my:0,px:0,py:0},qu=!1,Dn=null,rt={x:0,y:0},Rt=null,Ct=[],et=new Set,Pt=null,Hi=null,Vn=8,Wi=null,dr=new Map;function Bf(i){Mn=i}function kt(i){Ee=i}function Yu(i){ft=i}function Ea(i){$u=i}function Ku(i){Ks=i}function _l(i){qu=i}function Ha(i){Dn=i}function kf(i){rt=i}function Zu(i){Rt=i}function zf(i){Ct=i}function Ot(i,e){et=i,e!==void 0&&(Pt=e),i.size===0&&(Pt=null,dr=new Map),Pt!=="linedef"&&(dr=new Map)}function Vf(i){dr=i}function ba(i){Hi=i}function Hf(i){Vn=i}function fr(i){Wi=i}let Ju=()=>{},ju=()=>{},Qu=()=>{};function Gf(i){Ju=i.draw,ju=i.renderPanel,i.rebuild3D&&(Qu=i.rebuild3D)}function vs(){Ju(),Qu()}function Mi(){ju()}const br={1:{name:"Player 1 Start",cat:"player",radius:16},2:{name:"Player 2 Start",cat:"player",radius:16},3:{name:"Player 3 Start",cat:"player",radius:16},4:{name:"Player 4 Start",cat:"player",radius:16},11:{name:"Deathmatch Start",cat:"player",radius:16},3004:{name:"Zombieman",cat:"enemy",radius:20},9:{name:"Shotgun Guy",cat:"enemy",radius:20},3001:{name:"Imp",cat:"enemy",radius:20},3002:{name:"Demon",cat:"enemy",radius:30},58:{name:"Spectre",cat:"enemy",radius:30},3005:{name:"Cacodemon",cat:"enemy",radius:31},3003:{name:"Baron of Hell",cat:"enemy",radius:24},3006:{name:"Lost Soul",cat:"enemy",radius:16},16:{name:"Cyberdemon",cat:"enemy",radius:40},7:{name:"Spider Mastermind",cat:"enemy",radius:128},65:{name:"Chaingun Guy",cat:"enemy",radius:20},64:{name:"Arch-Vile",cat:"enemy",radius:20},66:{name:"Revenant",cat:"enemy",radius:20},67:{name:"Mancubus",cat:"enemy",radius:48},68:{name:"Arachnotron",cat:"enemy",radius:64},69:{name:"Hell Knight",cat:"enemy",radius:24},71:{name:"Pain Elemental",cat:"enemy",radius:31},84:{name:"Wolfenstein SS",cat:"enemy",radius:20},2005:{name:"Chainsaw",cat:"weapon",radius:10},2001:{name:"Shotgun",cat:"weapon",radius:10},82:{name:"Super Shotgun",cat:"weapon",radius:10},2002:{name:"Chaingun",cat:"weapon",radius:10},2003:{name:"Rocket Launcher",cat:"weapon",radius:10},2004:{name:"Plasma Rifle",cat:"weapon",radius:10},2006:{name:"BFG 9000",cat:"weapon",radius:10},2007:{name:"Clip",cat:"ammo",radius:10},2048:{name:"Box of Bullets",cat:"ammo",radius:10},2008:{name:"Shells",cat:"ammo",radius:10},2049:{name:"Box of Shells",cat:"ammo",radius:10},2010:{name:"Rocket",cat:"ammo",radius:10},2046:{name:"Box of Rockets",cat:"ammo",radius:10},2047:{name:"Energy Cell",cat:"ammo",radius:10},17:{name:"Energy Cell Pack",cat:"ammo",radius:10},2014:{name:"Health Bonus",cat:"health",radius:10},2011:{name:"Stimpack",cat:"health",radius:10},2012:{name:"Medikit",cat:"health",radius:10},2013:{name:"Soulsphere",cat:"health",radius:10},83:{name:"Megasphere",cat:"health",radius:10},2015:{name:"Armor Bonus",cat:"armor",radius:10},2018:{name:"Green Armor",cat:"armor",radius:10},2019:{name:"Blue Armor",cat:"armor",radius:10},5:{name:"Blue Keycard",cat:"key",radius:10},13:{name:"Red Keycard",cat:"key",radius:10},6:{name:"Yellow Keycard",cat:"key",radius:10},40:{name:"Blue Skull Key",cat:"key",radius:10},38:{name:"Red Skull Key",cat:"key",radius:10},39:{name:"Yellow Skull Key",cat:"key",radius:10},2022:{name:"Invulnerability",cat:"powerup",radius:10},2023:{name:"Berserk",cat:"powerup",radius:10},2024:{name:"Invisibility",cat:"powerup",radius:10},2025:{name:"Radiation Suit",cat:"powerup",radius:10},2026:{name:"Computer Map",cat:"powerup",radius:10},2045:{name:"Light Goggles",cat:"powerup",radius:10},2035:{name:"Barrel",cat:"decor",radius:10},70:{name:"Burning Barrel",cat:"decor",radius:10},43:{name:"Burnt Tree",cat:"decor",radius:16},54:{name:"Brown Tree",cat:"decor",radius:16},2028:{name:"Floor Lamp",cat:"decor",radius:16},85:{name:"Tall Techno Lamp",cat:"decor",radius:16},86:{name:"Short Techno Lamp",cat:"decor",radius:16},34:{name:"Candle",cat:"decor",radius:16},35:{name:"Candelabra",cat:"decor",radius:16},44:{name:"Tall Blue Torch",cat:"decor",radius:16},45:{name:"Tall Green Torch",cat:"decor",radius:16},46:{name:"Tall Red Torch",cat:"decor",radius:16},55:{name:"Short Blue Torch",cat:"decor",radius:16},56:{name:"Short Green Torch",cat:"decor",radius:16},57:{name:"Short Red Torch",cat:"decor",radius:16},48:{name:"Tall Techno Column",cat:"decor",radius:16},30:{name:"Tall Green Pillar",cat:"decor",radius:16},32:{name:"Short Green Pillar",cat:"decor",radius:16},31:{name:"Tall Red Pillar",cat:"decor",radius:16},33:{name:"Short Red Pillar",cat:"decor",radius:16},36:{name:"Pillar w/ Heart",cat:"decor",radius:16},37:{name:"Pillar w/ Skull",cat:"decor",radius:16},47:{name:"Brown Stump",cat:"decor",radius:16},41:{name:"Evil Eye",cat:"decor",radius:16},42:{name:"Floating Skull",cat:"decor",radius:16},10:{name:"Bloody Mess 1",cat:"gore",radius:16},12:{name:"Bloody Mess 2",cat:"gore",radius:16},24:{name:"Pool of Blood",cat:"gore",radius:16},27:{name:"Pole w/ Skull",cat:"gore",radius:16},28:{name:"Skewer w/ Heads",cat:"gore",radius:16},29:{name:"Pile of Skulls",cat:"gore",radius:16},25:{name:"Impaled Body",cat:"gore",radius:16},26:{name:"Twitching Body",cat:"gore",radius:16},49:{name:"Hanging Body 1",cat:"gore",radius:16},50:{name:"Hanging Body 2",cat:"gore",radius:16},51:{name:"Hanging Body 3",cat:"gore",radius:16},52:{name:"Hanging Body 4",cat:"gore",radius:16},53:{name:"Hanging Body 5",cat:"gore",radius:16},73:{name:"Hanging Body 6",cat:"gore",radius:16},74:{name:"Hanging Body 7",cat:"gore",radius:16},75:{name:"Hanging Body 8",cat:"gore",radius:16},76:{name:"Hanging Body 9",cat:"gore",radius:16},77:{name:"Hanging Body 10",cat:"gore",radius:16},78:{name:"Hanging Body 11",cat:"gore",radius:16},79:{name:"Hanging Body 12",cat:"gore",radius:16},15:{name:"Dead Marine",cat:"gore",radius:16},18:{name:"Dead Zombieman",cat:"gore",radius:16},19:{name:"Dead Shotgun Guy",cat:"gore",radius:16},20:{name:"Dead Imp",cat:"gore",radius:16},21:{name:"Dead Demon",cat:"gore",radius:16},22:{name:"Dead Cacodemon",cat:"gore",radius:16},23:{name:"Dead Lost Soul",cat:"gore",radius:16},14:{name:"Teleport Landing",cat:"decor",radius:16},88:{name:"Boss Brain",cat:"enemy",radius:16},89:{name:"Spawn Shooter",cat:"enemy",radius:16},87:{name:"Spawn Spot",cat:"enemy",radius:16}},Tr={1:"PLAY",2:"PLAY",3:"PLAY",4:"PLAY",11:"PLAY",3004:"POSS",9:"SPOS",3001:"TROO",3002:"SARG",58:"SARG",3005:"HEAD",3003:"BOSS",3006:"SKUL",16:"CYBR",7:"SPID",65:"CPOS",64:"VILE",66:"SKEL",67:"FATT",68:"BSPI",69:"BOS2",71:"PAIN",84:"SSWV",2005:"CSAW",2001:"SHOT",82:"SGN2",2002:"MGUN",2003:"LAUN",2004:"PLAS",2006:"BFUG",2007:"CLIP",2048:"AMMO",2008:"SHEL",2049:"SBOX",2010:"ROCK",2046:"BROK",2047:"CELL",17:"CELP",2014:"BON1",2011:"STIM",2012:"MEDI",2013:"SOUL",83:"MEGA",2015:"BON2",2018:"ARM1",2019:"ARM2",5:"BKEY",13:"RKEY",6:"YKEY",40:"BSKU",38:"RSKU",39:"YSKU",2022:"PINV",2023:"PSTR",2024:"PINS",2025:"SUIT",2026:"PMAP",2045:"PVIS",2035:"BAR1",70:"FCAN",43:"TRE1",54:"TRE2",2028:"COLU",85:"TLMP",86:"TLP2",34:"CAND",35:"CBRA",44:"TBLU",45:"TGRN",46:"TRED",55:"SMBT",56:"SMGT",57:"SMRT",48:"ELEC",30:"COL1",32:"COL3",31:"COL2",33:"COL4",36:"COL5",37:"COL6",47:"SMIT",41:"CEYE",42:"FSKU",10:"POL5",12:"POL5",24:"POL5",27:"POL4",28:"POL2",29:"POL3",25:"POL1",26:"POL6",49:"GOR1",50:"GOR2",51:"GOR3",52:"GOR4",53:"GOR5",73:"HDB1",74:"HDB2",75:"HDB3",76:"HDB4",77:"HDB5",78:"HDB6",79:"POB1",15:"PLAYN",18:"POSSL",19:"SPOSL",20:"TROOM",21:"SARGN",22:"HEADL",23:"SKULK",14:"TFOG",88:"BBRN",89:"BOSF",87:"FIRE"},ed=[{bit:1,label:"Impassable"},{bit:4,label:"Two-Sided"},{bit:16,label:"Upper Unpeg"},{bit:32,label:"Lower Unpeg"}];function St(i,e){return{x:i*ft+Bt.x,y:-e*ft+Bt.y}}function Ni(i,e){return{x:(i-Bt.x)/ft,y:-(e-Bt.y)/ft}}function Jt(i,e=Vn){return Math.round(i/e)*e}function Wf(i){const e=new DataView(i),t=String.fromCharCode(e.getUint8(0),e.getUint8(1),e.getUint8(2),e.getUint8(3));if(t!=="IWAD"&&t!=="PWAD")throw new Error("Not a WAD file");const n=e.getInt32(4,!0),s=e.getInt32(8,!0),r=[];for(let a=0;a<n;a++){const o=s+a*16,c=e.getInt32(o,!0),l=e.getInt32(o+4,!0);let u="";for(let f=0;f<8;f++){const h=e.getUint8(o+8+f);if(h===0)break;u+=String.fromCharCode(h)}r.push({name:u.toUpperCase(),offset:c,size:l})}return{type:t,lumps:r,data:i}}function Lo(i,e){const t=e.toUpperCase(),n=i.lumps.find(s=>s.name===t);return!n||n.size===0?null:{dv:new DataView(i.data,n.offset,n.size),offset:n.offset,size:n.size}}function hr(i,e,t){const n=e.toUpperCase(),s=t.toUpperCase(),r=[];let a=!1;for(const o of i.lumps){if(o.name===n){a=!0;continue}if(o.name===s){a=!1;continue}a&&o.size>0&&r.push(o)}return r}function Xf(i){const e=Lo(i,"PLAYPAL");if(!e)throw new Error("PLAYPAL lump not found");const t=new Uint8Array(768);for(let n=0;n<768;n++)t[n]=e.dv.getUint8(n);return t}function $f(i,e){const t=[],n=[["F_START","F_END"],["F1_START","F1_END"],["F2_START","F2_END"],["FF_START","FF_END"]],s=new Set;for(const[r,a]of n){const o=hr(i,r,a);for(const c of o){if(c.size!==4096||s.has(c.name))continue;s.add(c.name);const l=new Uint8Array(i.data,c.offset,4096),u=new ImageData(64,64),f=u.data;for(let h=0;h<4096;h++){const d=l[h];f[h*4]=e[d*3],f[h*4+1]=e[d*3+1],f[h*4+2]=e[d*3+2],f[h*4+3]=255}t.push({name:c.name,type:"flat",width:64,height:64,dataUrl:kc(u)})}}return t}function td(i,e,t){if(t<8)return null;const n=new DataView(i,e,t),s=n.getUint16(0,!0),r=n.getUint16(2,!0),a=n.getInt16(6,!0);if(s===0||r===0||s>4096||r>4096||t<8+s*4)return null;const o=new Uint8Array(s*r);o.fill(255);for(let c=0;c<s;c++){let l=n.getUint32(8+c*4,!0);if(l>=t)continue;let u=0;for(;l<t;){const f=n.getUint8(l);if(f===255)break;l++;const h=f<=u&&u>0?u+f:f;if(u=h,l>=t)break;const d=n.getUint8(l);l++,l++;for(let g=0;g<d&&!(l>=t);g++){const v=h+g;v<r&&(o[v*s+c]=n.getUint8(l)),l++}l++}}return{width:s,height:r,topOffset:a,pixels:o}}function qf(i,e){const t=Lo(i,"PNAMES");if(!t)return[];const n=t.dv.getInt32(0,!0),s=[];for(let u=0;u<n;u++){let f="";for(let h=0;h<8;h++){const d=t.dv.getUint8(4+u*8+h);if(d===0)break;f+=String.fromCharCode(d)}s.push(f.toUpperCase())}const r=new Map,a=[...hr(i,"P_START","P_END"),...hr(i,"PP_START","PP_END")];for(const u of a)r.has(u.name)||r.set(u.name,{offset:u.offset,size:u.size});for(const u of s)if(!r.has(u)){const f=i.lumps.find(h=>h.name===u&&h.size>0);f&&r.set(u,{offset:f.offset,size:f.size})}const o=new Map;function c(u){if(o.has(u))return o.get(u);const f=r.get(u);if(!f)return o.set(u,null),null;const h=td(i.data,f.offset,f.size);return o.set(u,h),h}const l=[];for(const u of["TEXTURE1","TEXTURE2"]){const f=Lo(i,u);if(!f)continue;const h=f.dv.getInt32(0,!0);for(let d=0;d<h;d++){let v=f.dv.getInt32(4+d*4,!0),p="";for(let C=0;C<8;C++){const y=f.dv.getUint8(v+C);if(y===0)break;p+=String.fromCharCode(y)}p=p.toUpperCase(),v+=8,v+=4;const m=f.dv.getUint16(v,!0);v+=2;const x=f.dv.getUint16(v,!0);v+=2,v+=4;const S=f.dv.getUint16(v,!0);if(v+=2,m===0||x===0||m>4096||x>4096)continue;const M=new Uint8Array(m*x);M.fill(255);for(let C=0;C<S;C++){const y=f.dv.getInt16(v,!0);v+=2;const T=f.dv.getInt16(v,!0);v+=2;const X=f.dv.getUint16(v,!0);if(v+=2,v+=4,X>=s.length)continue;const P=c(s[X]);if(P)for(let k=0;k<P.height;k++){const V=T+k;if(!(V<0||V>=x))for(let H=0;H<P.width;H++){const O=y+H;if(O<0||O>=m)continue;const G=P.pixels[k*P.width+H];G!==255&&(M[V*m+O]=G)}}}const A=new ImageData(m,x),w=A.data;for(let C=0;C<m*x;C++){const y=M[C];y===255?(w[C*4]=0,w[C*4+1]=255,w[C*4+2]=255,w[C*4+3]=255):(w[C*4]=e[y*3],w[C*4+1]=e[y*3+1],w[C*4+2]=e[y*3+2],w[C*4+3]=255)}l.push({name:p,type:"wall",width:m,height:x,dataUrl:kc(A)})}}return l}const ua=document.createElement("canvas"),Yf=ua.getContext("2d");function kc(i){return ua.width=i.width,ua.height=i.height,Yf.putImageData(i,0,0),ua.toDataURL()}let An=new Map;function Ua(i){const e=i.toUpperCase();return e.length>=5?An.get(e+"0")||An.get(e+"1")||null:An.get(e+"A0")||An.get(e+"A1")||null}function Kf(i,e){An=new Map;const t=[...hr(i,"S_START","S_END"),...hr(i,"SS_START","SS_END")],n=new Set,s=new Set;for(const r of Object.values(Tr)){const a=r.toUpperCase();n.add(a.substring(0,4)),a.length>=5&&s.add(a)}for(const r of t){if(r.size<8||r.name.length<6)continue;const a=r.name.substring(0,4);if(!n.has(a))continue;const o=r.name[4],c=r.name[5];if(c!=="0"&&c!=="1")continue;const l=a+o,u=o==="A",f=s.has(l);if(!u&&!f)continue;const h=l+c;if(An.has(l+"0")||c==="1"&&An.has(h))continue;const d=td(i.data,r.offset,r.size);if(!d)continue;const g=new ImageData(d.width,d.height),v=g.data;for(let p=0;p<d.width*d.height;p++){const m=d.pixels[p];m===255?v[p*4+3]=0:(v[p*4]=e[m*3],v[p*4+1]=e[m*3+1],v[p*4+2]=e[m*3+2],v[p*4+3]=255)}An.set(h,{name:r.name,width:d.width,height:d.height,topOffset:d.topOffset,dataUrl:kc(g)})}}let ei=new Map;function zc(){return ei}function Ds(i){var e;return((e=ei.get(i.toUpperCase()))==null?void 0:e.dataUrl)??null}function Ki(){return ei.size>0}async function Zf(i){const e=await i.arrayBuffer(),t=Wf(e),n=Xf(t),s=$f(t,n),r=qf(t,n);Kf(t,n),ei=new Map;for(const a of s)ei.set(a.name,a);for(const a of r)ei.set(a.name,a);return await Jf(),await jf(),{flats:s.length,walls:r.length}}async function Jf(){const i={};ei.forEach((e,t)=>{i[t]={name:e.name,type:e.type,width:e.width,height:e.height,dataUrl:e.dataUrl}}),await $t.ref("textures").set(i)}async function jf(){const i={};An.forEach((e,t)=>{i[t]={name:e.name,width:e.width,height:e.height,topOffset:e.topOffset,dataUrl:e.dataUrl}}),await $t.ref("sprites").set(i)}async function Qf(){const e=(await $t.ref("textures").once("value")).val();if(!e)return;ei=new Map;for(const s of Object.keys(e)){const r=e[s];ei.set(s,{name:r.name,type:r.type,width:r.width,height:r.height,dataUrl:r.dataUrl})}const n=(await $t.ref("sprites").once("value")).val();if(n){An=new Map;for(const s of Object.keys(n)){const r=n[s];An.set(s,{name:r.name,width:r.width,height:r.height,topOffset:r.topOffset,dataUrl:r.dataUrl})}}}const En=new Map,xs=new Map,bs=new Map;function nd(i){const e=new Set,t=xs.get(i);if(t)for(const n of t){const s=bs.get(n);s&&e.add(s)}return e}function eh(i,e,t){id(i,e,t);const n=R.linedefs.get(i);n&&sd(i,n.frontSide,n.backSide)}function th(i,e,t,n,s){var a,o;n&&n!==e&&((a=En.get(n))==null||a.delete(i)),s&&s!==t&&((o=En.get(s))==null||o.delete(i)),id(i,e,t),rd(i);const r=R.linedefs.get(i);r&&sd(i,r.frontSide,r.backSide)}function nh(i,e,t){var n,s;(n=En.get(e))==null||n.delete(i),(s=En.get(t))==null||s.delete(i),rd(i)}function ih(i,e){ad(i,e)}function sh(i,e,t){var n;t&&t!==e&&((n=xs.get(t))==null||n.delete(i)),ad(i,e)}function rh(i,e){var t;e&&((t=xs.get(e))==null||t.delete(i)),bs.delete(i)}function id(i,e,t){En.has(e)||En.set(e,new Set),En.has(t)||En.set(t,new Set),En.get(e).add(i),En.get(t).add(i)}function sd(i,e,t){e&&bs.set(e,i),t&&bs.set(t,i)}function rd(i){for(const[e,t]of bs)t===i&&bs.delete(e)}function ad(i,e){e&&(xs.has(e)||xs.set(e,new Set),xs.get(e).add(i))}function pr(i,e,t){let n=null,s=t;return R.vertices.forEach((r,a)=>{const o=Math.hypot(r.x-i,r.y-e);o<s&&(s=o,n=a)}),n}function da(i,e,t){let n=null,s=t;return R.linedefs.forEach((r,a)=>{const o=R.vertices.get(r.v1),c=R.vertices.get(r.v2);if(!o||!c)return;const l=ah(i,e,o.x,o.y,c.x,c.y);l<s&&(s=l,n=a)}),n}function Sl(i,e,t){let n=null,s=t;return R.things.forEach((r,a)=>{const o=Math.hypot(r.x-i,r.y-e);o<s&&(s=o,n=a)}),n}function ah(i,e,t,n,s,r){const a=s-t,o=r-n,c=a*a+o*o;if(!c)return Math.hypot(i-t,e-n);const l=Math.max(0,Math.min(1,((i-t)*a+(e-n)*o)/c));return Math.hypot(i-(t+l*a),e-(n+l*o))}function od(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const a=t[s].x,o=t[s].y,c=t[r].x,l=t[r].y;o>e!=l>e&&i<(c-a)*(e-o)/(l-o)+a&&(n=!n)}return n}function yl(i){let e=0;for(let t=0,n=i.length-1;t<i.length;n=t++)e+=(i[n].x+i[t].x)*(i[n].y-i[t].y);return Math.abs(e)/2}function Ur(i,e,t,n,s,r){return(t-i)*(r-e)-(n-e)*(s-i)}function ir(i,e,t,n,s,r,a,o){if(i===s&&e===r||i===a&&e===o||t===s&&n===r||t===a&&n===o)return!1;const c=Ur(s,r,a,o,i,e),l=Ur(s,r,a,o,t,n),u=Ur(i,e,t,n,s,r),f=Ur(i,e,t,n,a,o);return(c>0&&l<0||c<0&&l>0)&&(u>0&&f<0||u<0&&f>0)}function Vc(i){let e=0;for(let t=0,n=i.length-1;t<i.length;n=t++)e+=(i[n].x+i[t].x)*(i[n].y-i[t].y);return e}function Hc(i){const e=nd(i);if(!e.size)return[];const t=new Map;for(const d of e){const g=R.linedefs.get(d);if(!g)continue;const v=R.vertices.get(g.v1),p=R.vertices.get(g.v2);!v||!p||(t.has(g.v1)||t.set(g.v1,[]),t.has(g.v2)||t.set(g.v2,[]),t.get(g.v1).push({angle:Math.atan2(p.y-v.y,p.x-v.x),vid:g.v2}),t.get(g.v2).push({angle:Math.atan2(v.y-p.y,v.x-p.x),vid:g.v1}))}for(const d of t.values())d.sort((g,v)=>g.angle-v.angle);const n=new Map;let s=0;for(const d of t.keys()){if(n.has(d))continue;const g=s++,v=[d];for(;v.length;){const p=v.pop();if(!n.has(p)){n.set(p,g);for(const m of t.get(p))n.has(m.vid)||v.push(m.vid)}}}const r=new Array(s).fill(""),a=new Array(s).fill(-1/0),o=new Array(s).fill(-1/0);for(const[d,g]of n){const v=R.vertices.get(d);(v.x>a[g]||v.x===a[g]&&v.y>o[g])&&(a[g]=v.x,o[g]=v.y,r[g]=d)}const c=new Set;for(let d=0;d<s;d++){const g=r[d],v=t.get(g);c.add(g+"|"+v[0].vid)}const l=new Set,u=[],f=[];for(const[d,g]of t)for(const v of g){const p=d+"|"+v.vid;if(l.has(p))continue;const m=[];let x=!1,S=d,M=v.vid;for(;;){const A=S+"|"+M;c.has(A)&&(x=!0),l.add(A),m.push(S);const w=t.get(M),y=(w.findIndex(T=>T.vid===S)-1+w.length)%w.length;if(S=M,M=w[y].vid,S===d&&M===v.vid||m.length>e.size*2)break}m.length>=3&&(u.push(m),f.push(x))}const h=u.filter((d,g)=>!f[g]);if(h.length>0){const g=h.map(m=>m.map(x=>R.vertices.get(x))).map(m=>Vc(m));let v=0,p=0;for(let m=0;m<g.length;m++){const x=Math.abs(g[m]);x>p&&(p=x,v=m)}g[v]<0&&h[v].reverse();for(let m=0;m<h.length;m++)m!==v&&g[m]>0&&h[m].reverse()}return h}function Ar(i){return Hc(i).map(e=>e.map(t=>R.vertices.get(t)).filter(t=>!!t)).filter(e=>e.length>=3)}function oh(i){const e=Ar(i);if(!e.length)return null;let t=e[0],n=yl(t);for(let s=1;s<e.length;s++){const r=yl(e[s]);r>n&&(n=r,t=e[s])}return t}function Bn(i,e,t){const n=Ar(t);let s=0;for(const r of n)od(i,e,r)&&s++;return(s&1)===1}const Si=12,fa=16,Ml=48,Pn=32,mr={player:"#0f0",enemy:"#f44",weapon:"#fa0",ammo:"#f80",health:"#4af",armor:"#4ff",key:"#ff4",powerup:"#f4f",decor:"#888",gore:"#a44"};let Nn,Y;function ch(i){Nn=i,Y=Nn.getContext("2d")}function cd(){if(!Nn||R.vertices.size===0)return;let i=1/0,e=1/0,t=-1/0,n=-1/0;R.vertices.forEach(u=>{u.x<i&&(i=u.x),u.x>t&&(t=u.x),u.y<e&&(e=u.y),u.y>n&&(n=u.y)});const s=80,r=t-i||1,a=n-e||1,o=(i+t)/2,c=(e+n)/2,l=Math.min((Nn.width-s*2)/r,(Nn.height-s*2)/a);Yu(Math.max(.05,Math.min(32,l))),Bt.x=Nn.width/2-o*ft,Bt.y=Nn.height/2+c*ft,Et()}function Et(){if(!Nn)return;const i=Nn.width,e=Nn.height;Y.clearRect(0,0,i,e),Y.fillStyle="#0a0a0a",Y.fillRect(0,0,i,e),lh(i,e),uh(),dh(),fh(),ph(),mh(),gh()}function lh(i,e){const t=Ni(0,0),n=Ni(i,e),s=Math.floor(t.x/Pn)*Pn,r=Math.ceil(n.x/Pn)*Pn,a=Math.floor(n.y/Pn)*Pn,o=Math.ceil(t.y/Pn)*Pn;Y.strokeStyle="#181818",Y.lineWidth=1;for(let l=s;l<=r;l+=Pn){const u=St(l,0).x;Y.beginPath(),Y.moveTo(u,0),Y.lineTo(u,e),Y.stroke()}for(let l=a;l<=o;l+=Pn){const u=St(0,l).y;Y.beginPath(),Y.moveTo(0,u),Y.lineTo(i,u),Y.stroke()}Y.strokeStyle="#252525";const c=St(0,0);Y.beginPath(),Y.moveTo(c.x,0),Y.lineTo(c.x,e),Y.stroke(),Y.beginPath(),Y.moveTo(0,c.y),Y.lineTo(i,c.y),Y.stroke()}function uh(){R.sectors.forEach((i,e)=>{const t=Ar(e);if(!t.length)return;const n=Ee&&Ee.type==="sector"&&Ee.id===e,s=Pt==="sector"&&et.has(e),r=Rt&&Rt.type==="sector"&&Rt.id===e,a=Math.max(0,Math.min(255,i.light??160)),o=Math.round(20+a/255*70);Y.fillStyle=n||s?`rgba(${o+40},${o+30},${Math.round(o*.4)},0.7)`:r?`rgba(${o+20},${o+20},${Math.round(o*.75)+15},0.7)`:`rgba(${o},${o},${Math.round(o*.75)},0.6)`,Y.beginPath();for(const c of t){const l=St(c[0].x,c[0].y);Y.moveTo(l.x,l.y);for(let u=1;u<c.length;u++){const f=St(c[u].x,c[u].y);Y.lineTo(f.x,f.y)}Y.closePath()}Y.fill("evenodd"),n||s?(Y.strokeStyle="#ff0",Y.lineWidth=2,Y.stroke()):r&&(Y.strokeStyle="rgba(255, 255, 255, 0.4)",Y.lineWidth=1,Y.stroke())})}function dh(){R.linedefs.forEach((i,e)=>{const t=R.vertices.get(i.v1),n=R.vertices.get(i.v2);if(!t||!n)return;const s=St(t.x,t.y),r=St(n.x,n.y),a=Ee&&Ee.type==="linedef"&&Ee.id===e,o=Pt==="linedef"&&et.has(e),c=Rt&&Rt.type==="linedef"&&Rt.id===e,l=!!(i.flags&4);c&&!a&&!o&&(Y.strokeStyle="rgba(255, 255, 255, 0.15)",Y.lineWidth=8,Y.beginPath(),Y.moveTo(s.x,s.y),Y.lineTo(r.x,r.y),Y.stroke()),Y.strokeStyle=a||o?"#ff0":c?"#fff":l?"#aa0":"#ddd",Y.lineWidth=a||o||c?2:1,Y.beginPath(),Y.moveTo(s.x,s.y),Y.lineTo(r.x,r.y),Y.stroke();const u=(s.x+r.x)/2,f=(s.y+r.y)/2,h=r.x-s.x,d=r.y-s.y,g=Math.hypot(h,d);if(g>0){const v=-d/g,p=h/g;Y.strokeStyle="#f00",Y.lineWidth=1,Y.beginPath(),Y.moveTo(u,f),Y.lineTo(u+v*6,f+p*6),Y.stroke()}})}function fh(){R.vertices.forEach((i,e)=>{const t=St(i.x,i.y),n=Ee&&Ee.type==="vertex"&&Ee.id===e,s=et.has(e),r=Rt&&Rt.type==="vertex"&&Rt.id===e;r&&!n&&!s&&(Y.strokeStyle="rgba(255, 255, 255, 0.3)",Y.lineWidth=1,Y.beginPath(),Y.arc(t.x,t.y,Si,0,Math.PI*2),Y.stroke()),Y.fillStyle=n||s?"#ff0":r?"#fff":"#0ff";const a=r||n||s?4:3;Y.fillRect(t.x-a,t.y-a,a*2,a*2)})}const Ga=new Map;function hh(i){if(Ga.has(i))return Ga.get(i);const e=Ua(i);if(!e)return null;const t=new Image;return t.src=e.dataUrl,t.onload=()=>Et(),Ga.set(i,t),t}function ph(){R.things.forEach((i,e)=>{const t=St(i.x,i.y),n=br[i.type]||{cat:"player"},s=Math.max(n.radius*ft,4),r=s*2,a=Ee&&Ee.type==="thing"&&Ee.id===e,o=Rt&&Rt.type==="thing"&&Rt.id===e,c=a?"#ff0":o?"#fff":mr[n.cat]||"#fff";o&&!a&&(Y.strokeStyle="rgba(255, 255, 255, 0.2)",Y.lineWidth=1,Y.beginPath(),Y.arc(t.x,t.y,24,0,Math.PI*2),Y.stroke());const l=Tr[i.type],u=l&&Ki()?hh(l):null;if(u&&u.complete&&u.naturalWidth>0){const f=Math.min(r/u.naturalWidth,r/u.naturalHeight),h=u.naturalWidth*f,d=u.naturalHeight*f;Y.imageSmoothingEnabled=!1,Y.drawImage(u,t.x-h/2,t.y-d/2,h,d),Y.imageSmoothingEnabled=!0}if(Mn==="thing"||a||o){Y.strokeStyle=c,Y.lineWidth=a||o?2:1,Y.strokeRect(t.x-s,t.y-s,r,r);const f=(i.angle??0)*Math.PI/180;Y.lineWidth=1,Y.beginPath(),Y.moveTo(t.x,t.y),Y.lineTo(t.x+Math.cos(f)*s,t.y-Math.sin(f)*s),Y.stroke()}})}function mh(){if(Mn!=="draw")return;if(Ct.length===0){const l=pr(rt.x,rt.y,Si/ft);if(l){const u=R.vertices.get(l),f=St(u.x,u.y);Y.strokeStyle="#0ff",Y.lineWidth=1,Y.beginPath(),Y.arc(f.x,f.y,Si,0,Math.PI*2),Y.stroke()}return}const i=Ct[0],e=Ct[Ct.length-1];let t=Jt(rt.x),n=Jt(rt.y);const s=pr(rt.x,rt.y,Si/ft);let r=!1;if(s){const l=R.vertices.get(s);t=l.x,n=l.y,r=!0}let a=!1;if(Ct.length>=3&&Math.hypot(t-i.x,n-i.y)<24/ft&&(t=i.x,n=i.y,a=!0),Ct.length>=2){Y.fillStyle="rgba(0, 180, 0, 0.08)",Y.beginPath();const l=St(i.x,i.y);Y.moveTo(l.x,l.y);for(let f=1;f<Ct.length;f++){const h=St(Ct[f].x,Ct[f].y);Y.lineTo(h.x,h.y)}const u=St(t,n);Y.lineTo(u.x,u.y),Y.closePath(),Y.fill()}Y.strokeStyle="#0f0",Y.lineWidth=2;for(let l=0;l<Ct.length-1;l++){const u=St(Ct[l].x,Ct[l].y),f=St(Ct[l+1].x,Ct[l+1].y);Y.beginPath(),Y.moveTo(u.x,u.y),Y.lineTo(f.x,f.y),Y.stroke()}const o=St(e.x,e.y),c=St(t,n);if(Y.strokeStyle="#ff0",Y.lineWidth=1,Y.setLineDash([4,4]),Y.beginPath(),Y.moveTo(o.x,o.y),Y.lineTo(c.x,c.y),Y.stroke(),Ct.length>=2){const l=St(i.x,i.y);Y.strokeStyle="rgba(255, 255, 0, 0.3)",Y.beginPath(),Y.moveTo(c.x,c.y),Y.lineTo(l.x,l.y),Y.stroke()}Y.setLineDash([]);for(let l=0;l<Ct.length;l++){const u=St(Ct[l].x,Ct[l].y);Y.fillStyle=l===0?"#0f0":"#0ff";const f=l===0?5:3;Y.fillRect(u.x-f,u.y-f,f*2,f*2)}if(a){const l=St(i.x,i.y);Y.fillStyle="rgba(0, 255, 0, 0.15)",Y.beginPath(),Y.arc(l.x,l.y,30,0,Math.PI*2),Y.fill(),Y.strokeStyle="#0f0",Y.lineWidth=2,Y.beginPath(),Y.arc(l.x,l.y,30,0,Math.PI*2),Y.stroke()}else r&&(Y.strokeStyle="#0ff",Y.lineWidth=1,Y.beginPath(),Y.arc(c.x,c.y,Si,0,Math.PI*2),Y.stroke())}function gh(){if(!Hi)return;const i=St(Hi.x,Hi.y),e=St(rt.x,rt.y),t=Math.min(i.x,e.x),n=Math.min(i.y,e.y),s=Math.abs(e.x-i.x),r=Math.abs(e.y-i.y);Y.fillStyle="rgba(255, 255, 0, 0.08)",Y.fillRect(t,n,s,r),Y.strokeStyle="rgba(255, 255, 0, 0.5)",Y.lineWidth=1,Y.setLineDash([4,4]),Y.strokeRect(t,n,s,r),Y.setLineDash([])}function ld(i,e,t){for(const[n,s]of i){if(s.v1===e&&s.v2===t)return{ldId:n,sameDirection:!0};if(s.v1===t&&s.v2===e)return{ldId:n,sameDirection:!1}}return null}function vh(i,e,t,n){const s=new Set,r=new Set;for(const[a,o]of i)a!==n&&(o.v1===e&&s.add(o.v2),o.v2===e&&s.add(o.v1),o.v1===t&&r.add(o.v2),o.v2===t&&r.add(o.v1));for(const a of s)if(a!==t&&r.has(a))return!0;return!1}function xh(i){const e=new Set,t=En.get(i);if(!t)return e;for(const n of t){const s=R.linedefs.get(n);if(s)for(const r of[s.frontSide,s.backSide]){if(!r)continue;const a=R.sidedefs.get(r);a!=null&&a.sector&&e.add(a.sector)}}return e}function _h(i,e){const t=xh(i);for(const n of t)for(const s of Hc(n))if(s.includes(i)&&s.includes(e))return!0;return!1}let El;function $e(i){const e=document.getElementById("toast");e.textContent=i,e.classList.add("show"),clearTimeout(El),El=setTimeout(()=>e.classList.remove("show"),3e3)}const sr=[],Gc=[];let ki=null,rr=0,Xi=!1,_s=!1;const Sh=50;function gt(){Xi||(rr===0&&(ki=[]),rr++)}function be(i,e,t){Xi||!ki||ki.push({path:i,before:e,after:t})}function vt(){Xi||rr<=0||(rr--,rr===0&&(ki&&ki.length>0&&(sr.push({changes:ki}),sr.length>Sh&&sr.shift(),Gc.length=0),ki=null))}async function yh(){if(_s)return;const i=sr.pop();if(!i){$e("Nothing to undo");return}_s=!0,Xi=!0;try{const e={};for(const{path:t,before:n}of i.changes)t in e||(e[t]=n);await $t.ref().update(e),Gc.push(i)}finally{Xi=!1,_s=!1}}async function Mh(){if(_s)return;const i=Gc.pop();if(!i){$e("Nothing to redo");return}_s=!0,Xi=!0;try{const e={};for(const{path:t,after:n}of i.changes)e[t]=n;await $t.ref().update(e),sr.push(i)}finally{Xi=!1,_s=!1}}let Ss=1,Wc="",ar="all",Io=null;const ud={player:"Players",enemy:"Enemies",weapon:"Weapons",ammo:"Ammo",health:"Health",armor:"Armor",key:"Keys",powerup:"Power-ups",decor:"Decorations",gore:"Gore"},dd=["player","enemy","weapon","ammo","health","armor","key","powerup","decor","gore"];function Eh(){return Ss}function fd(){const i=document.getElementById("thing-type-btn");if(!i)return;const e=br[Ss],t=Tr[Ss],n=t?Ua(t):null;let s="";if(n)s+=`<img src="${n.dataUrl}" width="20" height="20" style="image-rendering:pixelated;vertical-align:middle;margin-right:4px;">`;else{const r=mr[e==null?void 0:e.cat]||"#888";s+=`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${r};vertical-align:middle;margin-right:4px;"></span>`}s+=(e==null?void 0:e.name)||`Type ${Ss}`,i.innerHTML=s}function bh(){let i=document.getElementById("thing-browser-modal");if(!i){i=document.createElement("div"),i.id="thing-browser-modal",i.className="tex-modal-overlay",i.style.display="none",i.innerHTML=`
      <div class="tex-modal-content">
        <div class="tex-modal-header">
          <input type="text" id="thing-search" placeholder="Search things...">
          <div class="tex-tabs" id="thing-cat-tabs">
            <button class="tex-tab active" data-cat="all">All</button>
          </div>
          <button class="tex-modal-close">&times;</button>
        </div>
        <div class="tex-grid" id="thing-grid" style="grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));"></div>
      </div>`,document.body.appendChild(i);const e=i.querySelector("#thing-cat-tabs");for(const t of dd){const n=document.createElement("button");n.className="tex-tab",n.dataset.cat=t,n.textContent=ud[t]||t,e.appendChild(n)}i.addEventListener("click",t=>{t.target===i&&ha()}),i.querySelector(".tex-modal-close").addEventListener("click",ha),i.querySelector("#thing-search").addEventListener("input",t=>{Wc=t.target.value,Do()}),i.querySelectorAll(".tex-tab").forEach(t=>{t.addEventListener("click",()=>{ar=t.dataset.cat,i.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n===t)),Do()})}),i.addEventListener("keydown",t=>{t.key==="Escape"&&ha(),t.stopPropagation()}),i.addEventListener("keyup",t=>t.stopPropagation())}return i}function Do(){const i=document.getElementById("thing-grid"),e=Wc.toLowerCase(),t=[];for(const[r,a]of Object.entries(br)){const o=parseInt(r,10);ar!=="all"&&a.cat!==ar||e&&!a.name.toLowerCase().includes(e)||t.push({id:o,name:a.name,cat:a.cat})}const n=new Map;for(const r of dd){const a=t.filter(o=>o.cat===r);a.length>0&&n.set(r,a)}let s="";for(const[r,a]of n){if(ar==="all"){const o=mr[r]||"#888";s+=`<div class="thing-cat-header" style="border-left-color:${o}">${ud[r]||r}</div>`}for(const o of a){const c=o.id===Ss,l=Tr[o.id],u=l?Ua(l):null,f=mr[o.cat]||"#888";let h;u?h=`<img src="${u.dataUrl}" width="48" height="48" style="image-rendering:pixelated;object-fit:contain;">`:h=`<div style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
          <span style="display:block;width:24px;height:24px;border-radius:50%;background:${f};border:2px solid ${f}88;"></span></div>`,s+=`<div class="tex-card thing-card${c?" selected":""}" data-id="${o.id}" style="border-bottom: 2px solid ${f}44;">
        ${h}
        <div class="tex-card-name">${o.name}</div>
      </div>`}}i.innerHTML=s,i.querySelectorAll(".thing-card").forEach(r=>{r.addEventListener("click",()=>{Ss=parseInt(r.dataset.id,10),fd(),ha(),Io&&Io()})})}function Th(i){Io=i??null;const e=bh();ar="all",Wc="";const t=e.querySelector("#thing-search");t.value="",e.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n.dataset.cat==="all")),Do(),e.style.display="",setTimeout(()=>t.focus(),50)}function ha(){const i=document.getElementById("thing-browser-modal");i&&(i.style.display="none")}let mn=!1,qt=[],xi=null;function Ah(){return mn}function wh(){mn=!0,qt=[],xi=null}function Ch(){return mn=!1,xi=null,qt}function hd(i){const e=oh(i);if(!e||e.length<3)return null;let t=0,n=0;for(const s of e)t+=s.x,n+=s.y;if(t/=e.length,n/=e.length,Bn(t,n,i))return{x:t,y:n};for(let s=0;s<e.length;s++){const r=e[s],a=e[(s+1)%e.length],o=e[(s+2)%e.length],c=(r.x+a.x+o.x)/3,l=(r.y+a.y+o.y)/3;if(Bn(c,l,i))return{x:c,y:l}}return{x:t,y:n}}function Us(){return{sectors:R.sectors.size,vertices:R.vertices.size,linedefs:R.linedefs.size,sidedefs:R.sidedefs.size}}function Rh(i,e){mn&&qt.push({action:"drawClick",x:i,y:e})}function Ph(){mn&&qt.push({action:"drawComplete"})}function Lh(i,e){if(!mn)return;let t=null;if(i==="vertex"){const n=R.vertices.get(e);n&&(t={x:n.x,y:n.y})}else if(i==="linedef"){const n=R.linedefs.get(e);if(n){const s=R.vertices.get(n.v1),r=R.vertices.get(n.v2);s&&r&&(t={x:(s.x+r.x)/2,y:(s.y+r.y)/2})}}else if(i==="sector")t=hd(e);else if(i==="thing"){const n=R.things.get(e);n&&(t={x:n.x,y:n.y})}xi={type:i,x:(t==null?void 0:t.x)??0,y:(t==null?void 0:t.y)??0}}function Ih(){mn&&(xi&&qt.push({action:"deleteSelected",deleteType:xi.type,x:xi.x,y:xi.y}),qt.push({action:"assertCounts",counts:Us()}),xi=null)}function Dh(i,e){if(!mn)return;const t=R.vertices.get(i),n=R.vertices.get(e);!t||!n||(qt.push({action:"mergeVertices",x1:t.x,y1:t.y,x2:n.x,y2:n.y}),qt.push({action:"assertCounts",counts:Us()}))}function Uh(i){if(!mn)return;const e=[];for(const t of i){const n=hd(t);n&&e.push(n)}qt.push({action:"mergeSectors",sectorPoints:e}),qt.push({action:"assertCounts",counts:Us()})}function Nh(i,e){mn&&(qt.push({action:"placeThing",x:i,y:e}),qt.push({action:"assertCounts",counts:Us()}))}function Fh(i,e,t){if(!mn)return;const n=R.linedefs.get(i);if(!n)return;const s=R.vertices.get(n.v1),r=R.vertices.get(n.v2),a=s&&r?{x:(s.x+r.x)/2,y:(s.y+r.y)/2}:{x:0,y:0};qt.push({action:"splitLinedef",ldMid:a,splitX:e,splitY:t}),qt.push({action:"assertCounts",counts:Us()})}function Oh(i){if(!mn)return;const e=[];for(const t of i){const n=R.vertices.get(t);n&&e.push({x:n.x,y:n.y})}qt.push({action:"deleteMultiSelected",vertices:e}),qt.push({action:"assertCounts",counts:Us()})}function Bh(i){return i.replace(/[^a-zA-Z0-9\s]/g,"").split(/\s+/).filter(e=>e.length>0).map((e,t)=>t===0?e.toLowerCase():e[0].toUpperCase()+e.slice(1).toLowerCase()).join("")}function bl(i,e){const t=[],n=Bh(e);t.push("import { describe, it, expect } from 'vitest';"),t.push("import { maps, setSelected, setMultiSelected, multiSelectType } from '../../src/state/appState';"),t.push("import { drawClick, drawComplete } from '../../src/map/drawSession';"),t.push("import { findVertexAt, findSectorAt, findLinedefNear, expectMapIsValid, dumpMapJSON } from './setup';"),t.push("import { deleteSelected, deleteMultiSelected, mergeVertices, mergeSectors, bridgeLinedefs, placeThing, splitLinedefAtPoint } from '../../src/map/mapActions';"),t.push(""),t.push(`describe('${e}', () => {`),t.push("  it('should produce correct map state', async () => {");for(const s of i)switch(s.action){case"drawClick":t.push(`    await drawClick(${s.x}, ${s.y});`);break;case"drawComplete":t.push("    await drawComplete();");break;case"deleteSelected":s.deleteType==="sector"?t.push(`    setSelected({ type: 'sector', id: findSectorAt(${s.x}, ${s.y})! });`):s.deleteType==="vertex"?t.push(`    setSelected({ type: 'vertex', id: findVertexAt(${s.x}, ${s.y})! });`):t.push(`    // TODO: select ${s.deleteType} at (${s.x}, ${s.y})`),t.push("    deleteSelected();");break;case"deleteMultiSelected":t.push("    setMultiSelected(new Set([");for(const r of s.vertices)t.push(`      findVertexAt(${r.x}, ${r.y})!,`);t.push("    ]));"),t.push("    deleteMultiSelected();");break;case"mergeVertices":t.push(`    setMultiSelected(new Set([findVertexAt(${s.x1}, ${s.y1})!, findVertexAt(${s.x2}, ${s.y2})!]));`),t.push("    mergeVertices();");break;case"mergeSectors":t.push("    setMultiSelected(new Set([");for(const r of s.sectorPoints)t.push(`      findSectorAt(${r.x}, ${r.y})!,`);t.push("    ]));"),t.push("    mergeSectors();");break;case"bridgeLinedefs":t.push(`    await bridgeLinedefs(findLinedefNear(${s.mid1.x}, ${s.mid1.y})!, findLinedefNear(${s.mid2.x}, ${s.mid2.y})!);`);break;case"placeThing":t.push(`    placeThing(${s.x}, ${s.y});`);break;case"splitLinedef":t.push(`    splitLinedefAtPoint(findLinedefNear(${s.ldMid.x}, ${s.ldMid.y})!, ${s.splitX}, ${s.splitY});`);break;case"assertCounts":t.push(`    expect(maps.sectors.size).toBe(${s.counts.sectors});`),t.push(`    expect(maps.vertices.size).toBe(${s.counts.vertices});`),t.push(`    expect(maps.linedefs.size).toBe(${s.counts.linedefs});`),t.push("");break}return t.push(`    dumpMapJSON('${n}');`),t.push("    expectMapIsValid();"),t.push("  });"),t.push("});"),t.push(""),t.join(`
`)}function kh(i){return JSON.stringify(i,null,2)}let ht=[];function Uo(){zf(ht.map(i=>({x:i.x,y:i.y})))}function Ta(){ht=[],Uo()}function Zs(i,e,t,n){for(const[,s]of R.linedefs){const r=R.vertices.get(s.v1),a=R.vertices.get(s.v2);if(!(!r||!a)&&ir(i,e,t,n,r.x,r.y,a.x,a.y))return!1}for(let s=0;s<ht.length-1;s++){const r=ht[s],a=ht[s+1];if(ir(i,e,t,n,r.x,r.y,a.x,a.y))return!1}return!0}function zh(i){const e=R.sectors.get(i),t=e?{floor:e.floor,ceiling:e.ceiling,light:e.light,...e.special!=null?{special:e.special}:{},...e.tag!=null?{tag:e.tag}:{},...e.floorTex!=null?{floorTex:e.floorTex}:{},...e.ceilTex!=null?{ceilTex:e.ceilTex}:{}}:{floor:0,ceiling:128,light:160,floorTex:"FLOOR4_8",ceilTex:"CEIL3_5"},n=ge("sectors").push(t);return be(`map/sectors/${n.key}`,null,t),n.key}async function Aa(i){const e=ht.length;if(e<2)return;gt();const t=[];for(const o of ht)if(o.existingId)t.push(o.existingId);else{const c={x:o.x,y:o.y},l=ge("vertices").push(c);be(`map/vertices/${l.key}`,null,c),t.push(l.key)}const n=i?e:e-1,s=[];for(let o=0;o<n;o++){const c=t[o],l=t[(o+1)%e],u=ld(R.linedefs,c,l);if(u)s.push(u.ldId);else{const f={v1:c,v2:l,flags:1},h=ge("linedefs").push(f);be(`map/linedefs/${h.key}`,null,f),s.push(h.key)}}const r=new Set(s);let a=null;for(const[o]of R.sectors)if(Bn(ht[0].x,ht[0].y,o)){a=o;break}if(a)for(const o of nd(a))r.add(o);Wh(r),vt(),Ta()}async function Vh(i,e){ht=i,await Aa(e),Ta()}async function Hh(i,e){const t=Jt(i),n=Jt(e),s=pr(i,e,Si/ft);let r,a,o=null;if(s){const f=R.vertices.get(s);r=f.x,a=f.y,o=s}else r=t,a=n;if(Rh(r,a),ht.length===0){ht.push({x:r,y:a,existingId:o}),Uo();return}const c=ht[0],l=ht[ht.length-1];if(r===l.x&&a===l.y)return;const u=24/ft;if(ht.length>=3){const f=Math.hypot(r-c.x,a-c.y)<u,h=o!==null&&o===c.existingId;if(f||h){if(!Zs(l.x,l.y,c.x,c.y)){$e("Closing edge would intersect");return}await Aa(!0);return}}if(c.existingId&&ht.length>=1&&o&&!ht.some(f=>f.existingId===o)){if(!Zs(l.x,l.y,r,a)){$e("Edge would intersect");return}if(!_h(c.existingId,o)&&!Zs(r,a,c.x,c.y)){$e("Closing edge would intersect");return}ht.push({x:r,y:a,existingId:o}),await Aa(!1);return}if(!Zs(l.x,l.y,r,a)){$e("Edge would intersect");return}ht.push({x:r,y:a,existingId:o}),Uo()}async function Gh(){if(ht.length<3)return!1;const i=ht[0],e=ht[ht.length-1];return Zs(e.x,e.y,i.x,i.y)?(Ph(),await Aa(!0),!0):($e("Closing edge would intersect"),!1)}function Wh(i){const e=new Map;function t(d,g,v){const p=R.vertices.get(d),m=R.vertices.get(g);!p||!m||(e.has(d)||e.set(d,[]),e.get(d).push({angle:Math.atan2(m.y-p.y,m.x-p.x),toVid:g,ldId:v}))}for(const[d,g]of R.linedefs)t(g.v1,g.v2,d),t(g.v2,g.v1,d);for(const d of e.values())d.sort((g,v)=>g.angle-v.angle);function n(d,g,v){const p=e.get(g);let m=-1;for(let S=0;S<p.length;S++)if(p[S].toVid===d&&p[S].ldId===v){m=S;break}if(m===-1)throw new Error("Could not find twin");const x=p[(m+1)%p.length];return{fromVid:g,toVid:x.toVid,ldId:x.ldId}}const s=[];for(const d of i){const g=R.linedefs.get(d);s.push({fromVid:g.v1,toVid:g.v2,ldId:d}),s.push({fromVid:g.v2,toVid:g.v1,ldId:d})}const r=d=>`${d.ldId}:${d.fromVid}`,a=new Set,o=[];for(const d of s){if(a.has(r(d)))continue;const g=[];let v=d;for(;g.push(v),i.has(v.ldId)&&a.add(r(v)),v=n(v.fromVid,v.toVid,v.ldId),!(v.fromVid===d.fromVid&&v.toVid===d.toVid&&v.ldId===d.ldId||g.length>R.linedefs.size*2););const p=g.map(m=>R.vertices.get(m.fromVid));o.push({loop:g,area2:Vc(p)})}const c=[],l=o.filter(d=>d.area2>0).sort((d,g)=>d.area2-g.area2),u=o.filter(d=>d.area2<0);for(const d of l)c.push({boundary:d.loop,holes:[]});for(const d of u){const g=R.vertices.get(d.loop[0].fromVid);let v=null;for(const p of c){const m=p.boundary.map(x=>R.vertices.get(x.fromVid));if(od(g.x,g.y,m)){v=p;break}}v&&v.holes.push(d.loop)}function f(d){const g=R.linedefs.get(d.ldId),v=d.fromVid===g.v1,p=v?g.frontSide:g.backSide;if(p)return p;const m={sector:null,xoff:0,yoff:0,upper:"-",mid:"-",lower:"-"},x=ge("sidedefs").push(m);be(`map/sidedefs/${x.key}`,null,m);const S={...g},M=v?"frontSide":"backSide";return be(`map/linedefs/${d.ldId}`,S,{...S,[M]:x.key}),ge("linedefs").child(d.ldId).update({[M]:x.key}),x.key}const h=new Set;for(const d of c){const v=[...d.boundary,...d.holes.flat()].map(f);let p=null;for(const x of v){const S=R.sidedefs.get(x);if(S!=null&&S.sector){p=S.sector;break}}let m;if(p)h.has(p)?m=zh(p):m=p;else{const x={floor:0,ceiling:128,light:160,floorTex:"FLOOR4_8",ceilTex:"CEIL3_5"},S=ge("sectors").push(x);be(`map/sectors/${S.key}`,null,x),m=S.key}h.add(m);for(const x of v){const S=R.sidedefs.get(x);if(S.sector!==m){const M={...S};be(`map/sidedefs/${x}`,M,{...S,sector:m}),ge("sidedefs").child(x).update({sector:m})}}}}function Xh(i,e){const t=Eh(),n={x:i,y:e,angle:0,type:t,flags:7},s=ge("things").push(n);be(`map/things/${s.key}`,null,n),Nh(i,e)}function pd(i,e,t){const n=R.linedefs.get(i);if(!n)return;const s=R.vertices.get(n.v1),r=R.vertices.get(n.v2);if(!s||!r||e===s.x&&t===s.y||e===r.x&&t===r.y)return;Fh(i,e,t),gt();const a={x:e,y:t},c=ge("vertices").push(a).key;be(`map/vertices/${c}`,null,a);const l=n.v2,u={...n};be(`map/linedefs/${i}`,u,{...u,v2:c}),ge("linedefs").child(i).update({v2:c});const f={v1:c,v2:l,flags:u.flags};if(u.special&&(f.special=u.special),u.tag&&(f.tag=u.tag),u.frontSide){const d=R.sidedefs.get(u.frontSide);if(d){const g={...d},v=ge("sidedefs").push(g);be(`map/sidedefs/${v.key}`,null,g),f.frontSide=v.key}}if(u.backSide){const d=R.sidedefs.get(u.backSide);if(d){const g={...d},v=ge("sidedefs").push(g);be(`map/sidedefs/${v.key}`,null,g),f.backSide=v.key}}const h=ge("linedefs").push(f);be(`map/linedefs/${h.key}`,null,f),vt(),kt({type:"vertex",id:c}),Mi()}function $h(){if(et.size!==2){$e("Select exactly 2 vertices to merge");return}const[i,e]=[...et],t=R.vertices.get(i),n=R.vertices.get(e);if(!t||!n)return;const s=ld(R.linedefs,i,e);if(!s){$e("Vertices must be connected by a linedef");return}const r=s.ldId;if(vh(R.linedefs,i,e,r)){$e("Merge would create duplicate linedefs");return}Dh(i,e),gt();const a=Math.hypot(t.x-rt.x,t.y-rt.y),o=Math.hypot(n.x-rt.x,n.y-rt.y),c=a<o?t:n;c!==n&&(be(`map/vertices/${e}`,{...n},{x:c.x,y:c.y}),ge("vertices").child(e).update({x:c.x,y:c.y})),wa(r),R.linedefs.forEach((l,u)=>{const f={};l.v1===i&&(f.v1=e),l.v2===i&&(f.v2=e),Object.keys(f).length&&(be(`map/linedefs/${u}`,{...l},{...l,...f}),ge("linedefs").child(u).update(f))}),be(`map/vertices/${i}`,{...t},null),ge("vertices").child(i).remove(),vt(),Ot(new Set([e])),kt({type:"vertex",id:e}),Mi(),vs()}function qh(){if(Pt!=="sector"||et.size<2){$e("Select 2 or more sectors to merge");return}const i=[...et],e=i[i.length-1],t=new Set(i.slice(0,-1));Uh(i),gt(),R.sidedefs.forEach((r,a)=>{r.sector&&t.has(r.sector)&&(be(`map/sidedefs/${a}`,{...r},{...r,sector:e}),ge("sidedefs").child(a).update({sector:e}))});const n=[];R.linedefs.forEach((r,a)=>{if(!r.frontSide||!r.backSide)return;const o=R.sidedefs.get(r.frontSide),c=R.sidedefs.get(r.backSide);(o==null?void 0:o.sector)===e&&(c==null?void 0:c.sector)===e&&n.push(a)});for(const r of n)wa(r);const s=new Set;R.linedefs.forEach(r=>{s.add(r.v1),s.add(r.v2)}),R.vertices.forEach((r,a)=>{s.has(a)||(be(`map/vertices/${a}`,{...r},null),ge("vertices").child(a).remove())});for(const r of t){const a=R.sectors.get(r);a&&(be(`map/sectors/${r}`,{...a},null),ge("sectors").child(r).remove())}vt(),Ot(new Set),kt({type:"sector",id:e}),Mi(),vs()}function wa(i){const e=R.linedefs.get(i);if(e){if(e.frontSide){const t=R.sidedefs.get(e.frontSide);t&&be(`map/sidedefs/${e.frontSide}`,{...t},null),ge("sidedefs").child(e.frontSide).remove()}if(e.backSide){const t=R.sidedefs.get(e.backSide);t&&be(`map/sidedefs/${e.backSide}`,{...t},null),ge("sidedefs").child(e.backSide).remove()}be(`map/linedefs/${i}`,{...e},null),ge("linedefs").child(i).remove()}}function md(){if(!Ee)return;Lh(Ee.type,Ee.id),gt();const{type:i,id:e}=Ee;if(i==="vertex"){const t=[];R.linedefs.forEach((s,r)=>{(s.v1===e||s.v2===e)&&t.push(r)}),t.forEach(wa);const n=R.vertices.get(e);n&&be(`map/vertices/${e}`,{...n},null),ge("vertices").child(e).remove()}else if(i==="linedef")wa(e);else if(i==="sector"){const t=new Set;R.sidedefs.forEach((s,r)=>{s.sector===e&&t.add(r)}),R.linedefs.forEach((s,r)=>{const a=s.frontSide&&t.has(s.frontSide),o=s.backSide&&t.has(s.backSide);if(!a&&!o)return;const c={...s};if(a&&o){const l=R.sidedefs.get(s.frontSide);l&&be(`map/sidedefs/${s.frontSide}`,{...l},null),ge("sidedefs").child(s.frontSide).remove();const u=R.sidedefs.get(s.backSide);u&&be(`map/sidedefs/${s.backSide}`,{...u},null),ge("sidedefs").child(s.backSide).remove(),be(`map/linedefs/${r}`,c,null),ge("linedefs").child(r).remove();for(const f of[s.v1,s.v2]){let h=!1;if(R.linedefs.forEach((d,g)=>{g!==r&&(d.v1===f||d.v2===f)&&(h=!0)}),!h){const d=R.vertices.get(f);d&&be(`map/vertices/${f}`,{...d},null),ge("vertices").child(f).remove()}}}else if(a){const l=R.sidedefs.get(s.frontSide);if(l&&be(`map/sidedefs/${s.frontSide}`,{...l},null),ge("sidedefs").child(s.frontSide).remove(),s.backSide){const u={frontSide:s.backSide,backSide:null,v1:s.v2,v2:s.v1,flags:(s.flags??1)&-5|1};be(`map/linedefs/${r}`,c,{...c,...u}),ge("linedefs").child(r).update(u);const f=R.sidedefs.get(s.backSide);f&&(!f.mid||f.mid==="-")&&(be(`map/sidedefs/${s.backSide}`,{...f},{...f,mid:"STARTAN2"}),ge("sidedefs").child(s.backSide).update({mid:"STARTAN2"}))}else be(`map/linedefs/${r}`,c,null),ge("linedefs").child(r).remove()}else if(o){const l=R.sidedefs.get(s.backSide);l&&be(`map/sidedefs/${s.backSide}`,{...l},null),ge("sidedefs").child(s.backSide).remove();const u={backSide:null,flags:(s.flags??1)&-5|1};be(`map/linedefs/${r}`,c,{...c,...u}),ge("linedefs").child(r).update(u);const f=s.frontSide?R.sidedefs.get(s.frontSide):null;f&&(!f.mid||f.mid==="-")&&(be(`map/sidedefs/${s.frontSide}`,{...f},{...f,mid:"STARTAN2"}),ge("sidedefs").child(s.frontSide).update({mid:"STARTAN2"}))}});const n=R.sectors.get(e);n&&be(`map/sectors/${e}`,{...n},null),ge("sectors").child(e).remove()}else if(i==="thing"){const t=R.things.get(e);t&&be(`map/things/${e}`,{...t},null),ge("things").child(e).remove()}vt(),Ih(),kt(null),Mi()}function Yh(){if(et.size===0)return;Oh(et),gt();const i=new Set(et),e=new Set;R.linedefs.forEach((r,a)=>{(i.has(r.v1)||i.has(r.v2))&&e.add(a)});const t=new Set,n=new Map;R.linedefs.forEach((r,a)=>{if(!e.has(a))for(const o of[r.frontSide,r.backSide]){if(!o)continue;const c=R.sidedefs.get(o);c!=null&&c.sector&&n.set(c.sector,(n.get(c.sector)??0)+1)}});for(const r of e){const a=R.linedefs.get(r);if(a){if(a.frontSide){const o=R.sidedefs.get(a.frontSide);o&&(be(`map/sidedefs/${a.frontSide}`,{...o},null),t.add(a.frontSide)),ge("sidedefs").child(a.frontSide).remove()}if(a.backSide){const o=R.sidedefs.get(a.backSide);o&&(be(`map/sidedefs/${a.backSide}`,{...o},null),t.add(a.backSide)),ge("sidedefs").child(a.backSide).remove()}be(`map/linedefs/${r}`,{...a},null),ge("linedefs").child(r).remove()}}for(const r of i){const a=R.vertices.get(r);a&&be(`map/vertices/${r}`,{...a},null),ge("vertices").child(r).remove()}const s=new Set;R.sectors.forEach((r,a)=>{(!n.has(a)||n.get(a)===0)&&s.add(a)});for(const r of s){const a=R.sectors.get(r);a&&be(`map/sectors/${r}`,{...a},null),ge("sectors").child(r).remove()}vt(),Ot(new Set),kt(null),Mi(),vs()}async function Kh(i,e){const t=R.linedefs.get(i),n=R.linedefs.get(e);if(!t||!n)return;if(i===e){$e("Select two different linedefs");return}const s=[t.v1,t.v2],r=[n.v1,n.v2];if(new Set([...s,...r]).size!==4){$e("Cannot bridge: linedefs share a vertex");return}const[a,o]=s.map(v=>R.vertices.get(v)),[c,l]=r.map(v=>R.vertices.get(v));if(!a||!o||!c||!l)return;function u(v,p,m,x){for(const[,S]of R.linedefs){const M=R.vertices.get(S.v1),A=R.vertices.get(S.v2);if(!(!M||!A)&&ir(v,p,m,x,M.x,M.y,A.x,A.y))return!0}return!1}const f=!ir(o.x,o.y,c.x,c.y,l.x,l.y,a.x,a.y)&&!u(o.x,o.y,c.x,c.y)&&!u(l.x,l.y,a.x,a.y),h=!ir(o.x,o.y,l.x,l.y,c.x,c.y,a.x,a.y)&&!u(o.x,o.y,l.x,l.y)&&!u(c.x,c.y,a.x,a.y);let d;if(f)d=[t.v1,t.v2,n.v1,n.v2];else if(h)d=[t.v1,t.v2,n.v2,n.v1];else{$e("Cannot bridge: connecting edges would intersect");return}const g=d.map(v=>{const p=R.vertices.get(v);return{x:p.x,y:p.y,existingId:v}});await Vh(g,!0)}let Ca=null,gr="all",Xc="",gd="";function Zh(){let i=document.getElementById("texture-browser-modal");return i||(i=document.createElement("div"),i.id="texture-browser-modal",i.className="tex-modal-overlay",i.style.display="none",i.innerHTML=`
      <div class="tex-modal-content">
        <div class="tex-modal-header">
          <input type="text" id="tex-search" placeholder="Search textures...">
          <div class="tex-tabs">
            <button class="tex-tab active" data-filter="all">All</button>
            <button class="tex-tab" data-filter="flat">Flats</button>
            <button class="tex-tab" data-filter="wall">Walls</button>
          </div>
          <button class="tex-modal-close">&times;</button>
        </div>
        <div class="tex-grid" id="tex-grid"></div>
      </div>`,document.body.appendChild(i),i.addEventListener("click",e=>{e.target===i&&pa()}),i.querySelector(".tex-modal-close").addEventListener("click",pa),i.querySelector("#tex-search").addEventListener("input",e=>{Xc=e.target.value,No()}),i.querySelectorAll(".tex-tab").forEach(e=>{e.addEventListener("click",()=>{gr=e.dataset.filter,i.querySelectorAll(".tex-tab").forEach(t=>t.classList.toggle("active",t===e)),No()})}),i.addEventListener("keydown",e=>{e.key==="Escape"&&pa(),e.stopPropagation()}),i.addEventListener("keyup",e=>e.stopPropagation())),i}function No(){const i=document.getElementById("tex-grid"),e=zc(),t=Xc.toUpperCase(),n=[];e.forEach(s=>{gr!=="all"&&s.type!==gr||t&&!s.name.includes(t)||n.push(s)}),n.sort((s,r)=>s.name.localeCompare(r.name)),i.innerHTML=n.map(s=>{const r=s.width&&s.height?s.width/s.height:1;return`
    <div class="tex-card${s.name===gd.toUpperCase()?" selected":""}" data-name="${s.name}">
      <img src="${s.dataUrl}" style="aspect-ratio:${r};image-rendering:pixelated">
      <div class="tex-card-name">${s.name}</div>
    </div>`}).join(""),i.querySelectorAll(".tex-card").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.name;Ca&&Ca(r),pa()})})}function wr(i){const e=Zh();Ca=i.onSelect,gr=i.filter??"all",gd=i.currentValue??"",Xc="";const t=e.querySelector("#tex-search");t.value="",e.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n.dataset.filter===gr)),No(),e.style.display="",setTimeout(()=>t.focus(),50)}function pa(){const i=document.getElementById("texture-browser-modal");i&&(i.style.display="none"),Ca=null}function Cr(i,e=24){const t=zc().get(i.toUpperCase());if(!t||!t.width||!t.height)return`width:${e}px;height:${e}px`;const n=t.width/t.height;return`width:${Math.round(e*n)}px;height:${e}px`}function ys(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function hn(i){const e=i.trim();if(!e)return 0;if(/^[\d+\-*/().  ]+$/.test(e))try{const t=new Function("return "+e)();if(typeof t=="number"&&isFinite(t))return Math.round(t*1e3)/1e3}catch{}return parseFloat(e)||0}function Lt(){var h;const i=document.getElementById("panel-empty"),e=document.getElementById("panel-content");if(Pt==="vertex"&&et.size>0){i.style.display="none",e.style.display="",tp(e);return}if(Pt==="sector"&&et.size>0){i.style.display="none",e.style.display="",np(e);return}if(Pt==="linedef"&&et.size>0){i.style.display="none",e.style.display="",ip(e);return}if(!Ee){i.style.display="",e.style.display="none",e.innerHTML="";return}i.style.display="none",e.style.display="";const{type:t,id:n}=Ee,s=t==="vertex"?"vertices":t+"s",r=R[s]&&R[s].get(n);if(!r){e.innerHTML='<div id="panel-empty">Not found.</div>';return}let a=`<div class="panel-title">${t} <span style="color:#444;text-transform:none">${n}</span></div>`;function o(d,g,v,p=1){return`<div class="prop-row"><label>${d}</label>
      <input type="text" data-path="${g}" data-numeric data-step="${p}" value="${v??0}"></div>`}function c(d,g,v){return`<div class="prop-row"><label>${d}</label>
      <input type="text" data-path="${g}" value="${ys(v??"")}"></div>`}function l(d,g,v,p){const m=v??"",x=Ki()?Ds(m):null,S=m?Cr(m):"width:24px;height:24px",M=x?`<img class="tex-preview tex-clickable" src="${x}" style="${S}" data-path="${g}" data-tex-type="${p}">`:`<span class="tex-clickable tex-placeholder" data-path="${g}" data-tex-type="${p}"></span>`;return`<div class="prop-row"><label>${d}</label>
      ${M}
      <span class="tex-name tex-clickable" data-path="${g}" data-tex-type="${p}">${ys(m)||"—"}</span></div>`}function u(d,g,v,p){const m=p&v?"checked":"";return`<div class="prop-row"><label>${d}</label>
      <input type="checkbox" data-bitmask="${g}" data-bit="${v}" ${m}></div>`}function f(d,g,v=!1){const p=R.sidedefs.get(g);if(!p)return"";const m=x=>`sidedefs/${g}/${x}`;return`<div class="prop-section${v?" active-side":""}">
      <div class="panel-title">${d}</div>
      ${c("Sector",m("sector"),p.sector??"")}
      ${o("X Off",m("xoff"),p.xoff)}
      ${o("Y Off",m("yoff"),p.yoff)}
      ${l("Upper",m("upper"),p.upper,"wall")}
      ${l("Mid",m("mid"),p.mid,"wall")}
      ${l("Lower",m("lower"),p.lower,"wall")}
    </div>`}if(t==="vertex"){const d=g=>`vertices/${n}/${g}`;a+=`<div class="prop-row"><label>ID</label><span class="prop-val">${ys(n)}</span></div>`,a+=o("X",d("x"),r.x)+o("Y",d("y"),r.y)}else if(t==="linedef"){const d=g=>`linedefs/${n}/${g}`;a+=o("Special",d("special"),r.special)+o("Tag",d("tag"),r.tag),a+='<div class="prop-section"><div class="panel-title">Flags</div>';for(const{bit:g,label:v}of ed)a+=u(v,`linedefs/${n}/flags`,g,r.flags||0);a+="</div>",r.frontSide&&(a+=f("Front Sidedef",r.frontSide,Wi==="front")),r.backSide&&(a+=f("Back Sidedef",r.backSide,Wi==="back"))}else if(t==="sector"){const d=g=>`sectors/${n}/${g}`;a+=o("Floor H",d("floor"),r.floor)+o("Ceil H",d("ceiling"),r.ceiling)+l("Floor Tex",d("floorTex"),r.floorTex||"FLOOR4_8","flat")+l("Ceil Tex",d("ceilTex"),r.ceilTex||"CEIL3_5","flat")+o("Light",d("light"),r.light)+o("Special",d("special"),r.special)+o("Tag",d("tag"),r.tag),a+='<button class="door-btn" id="door-btn">Create Door</button>'}else if(t==="thing"){const d=g=>`things/${n}/${g}`;a+=o("X",d("x"),r.x)+o("Y",d("y"),r.y)+o("Angle",d("angle"),r.angle),a+=`<div class="prop-row"><label>Type</label><select data-path="${d("type")}">`;for(const[g,v]of Object.entries(br))a+=`<option value="${g}" ${r.type==g?"selected":""}>${v.name}</option>`;a+="</select></div>",a+=o("Flags",d("flags"),r.flags)}a+=`<button class="del-btn" id="del-btn">Delete ${t}</button>`,e.innerHTML=a,e.querySelectorAll("[data-path]").forEach(d=>{d.addEventListener("change",()=>{var M;const[g,v,p]=d.dataset.path.split("/"),m=d.hasAttribute("data-numeric");m&&(d.value=String(hn(d.value)));const x=m?hn(d.value):d.tagName==="SELECT"?isNaN(Number(d.value))?d.value:+d.value:d.value,S=(M=R[g])==null?void 0:M.get(v);S&&(gt(),be(`map/${g}/${v}`,{...S},{...S,[p]:x}),vt()),ge(g).child(v).update({[p]:x})})}),e.querySelectorAll("[data-bitmask]").forEach(d=>{d.addEventListener("change",()=>{var A;const[g,v,p]=d.dataset.bitmask.split("/"),m=parseInt(d.dataset.bit,10),x=(R[g].get(v)||{})[p]||0,S=d.checked?x|m:x&~m,M=(A=R[g])==null?void 0:A.get(v);M&&(gt(),be(`map/${g}/${v}`,{...M},{...M,[p]:S}),vt()),ge(g).child(v).update({[p]:S})})}),e.querySelectorAll(".tex-clickable").forEach(d=>{d.addEventListener("click",()=>{var M,A;const g=d.dataset.path,v=d.dataset.texType,[p,m,x]=g.split("/"),S=((A=(M=R[p])==null?void 0:M.get(m))==null?void 0:A[x])??"";wr({filter:v,currentValue:S,onSelect:w=>{var y;const C=(y=R[p])==null?void 0:y.get(m);C&&(gt(),be(`map/${p}/${m}`,{...C},{...C,[x]:w}),vt()),ge(p).child(m).update({[x]:w}),Lt()}})})}),e.querySelectorAll("input[data-numeric]").forEach(d=>{d.addEventListener("wheel",g=>{g.preventDefault();const v=g.deltaY<0?Vn:-Vn;d.value=String(hn(d.value)+v),d.dispatchEvent(new Event("change"))})}),e.querySelectorAll('input[type="text"]').forEach(d=>{d.addEventListener("focus",()=>d.select())}),document.getElementById("del-btn").addEventListener("click",md),(h=document.getElementById("door-btn"))==null||h.addEventListener("click",()=>{(Ee==null?void 0:Ee.type)==="sector"&&Qh(Ee.id)})}const Jh=[{value:1,label:"Standard Door (open/close)"},{value:31,label:"Door (stays open)"},{value:26,label:"Blue Key Door"},{value:27,label:"Yellow Key Door"},{value:28,label:"Red Key Door"},{value:32,label:"Blue Key Door (stays open)"},{value:33,label:"Yellow Key Door (stays open)"},{value:34,label:"Red Key Door (stays open)"}];function Nr(i,e,t,n){const s=Ki()?Ds(t):null,r=Cr(t),a=s?`<img class="tex-preview door-tex-pick" src="${s}" style="${r}" data-door-id="${i}" data-tex-type="${n}">`:`<span class="door-tex-pick tex-placeholder" data-door-id="${i}" data-tex-type="${n}"></span>`;return`<div class="prop-row"><label>${e}</label>
    ${a}
    <span class="tex-name door-tex-pick" data-door-id="${i}" data-tex-type="${n}" id="${i}-name">${t||"—"}</span>
    <input type="hidden" id="${i}" value="${ys(t)}">
  </div>`}function jh(i){const e=document.getElementById(i);if(!e)return;const t=e.value,n=document.getElementById(i+"-name");n&&(n.textContent=t||"—");const s=e.closest(".prop-row");if(!s)return;const r=s.querySelector("img.door-tex-pick"),a=s.querySelector("span.door-tex-pick.tex-placeholder"),o=Ki()?Ds(t):null;if(o&&r)r.src=o;else if(o&&a){const c=document.createElement("img");c.className="tex-preview door-tex-pick",c.src=o,c.style.cssText=Cr(t),c.dataset.doorId=a.dataset.doorId,c.dataset.texType=a.dataset.texType,a.replaceWith(c)}}function Qh(i){let e=document.getElementById("door-modal");e&&e.remove(),e=document.createElement("div"),e.id="door-modal",e.className="tex-modal-overlay",e.innerHTML=`
    <div class="door-modal-content">
      <div class="panel-title" style="margin-bottom:12px;">Create Door</div>
      <div class="prop-row"><label>Type</label>
        <select id="door-type">
          ${Jh.map(t=>`<option value="${t.value}">${t.label}</option>`).join("")}
        </select>
      </div>
      ${Nr("door-tex-face","Door Face","BIGDOOR2","wall")}
      ${Nr("door-tex-bottom","Door Bottom","FLAT20","flat")}
      ${Nr("door-tex-track","Track Sides","DOORTRAK","wall")}
      ${Nr("door-tex-floor","Track Floor","FLAT20","flat")}
      <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
        <button id="door-cancel" class="del-btn" style="background:#333;">Cancel</button>
        <button id="door-ok" class="del-btn" style="background:#2a6e2a;">OK</button>
      </div>
    </div>`,document.body.appendChild(e),e.querySelectorAll(".door-tex-pick").forEach(t=>{t.style.cursor="pointer",t.addEventListener("click",()=>{const n=t.dataset.doorId,s=t.dataset.texType,r=document.getElementById(n);wr({filter:s,currentValue:r.value,onSelect:a=>{r.value=a,jh(n)}})})}),e.addEventListener("click",t=>{t.target===e&&e.remove()}),e.addEventListener("keydown",t=>{t.key==="Escape"&&e.remove(),t.stopPropagation()}),e.addEventListener("keyup",t=>t.stopPropagation()),document.getElementById("door-cancel").addEventListener("click",()=>e.remove()),document.getElementById("door-ok").addEventListener("click",()=>{const t=parseInt(document.getElementById("door-type").value,10),n=document.getElementById("door-tex-face").value||"BIGDOOR2",s=document.getElementById("door-tex-bottom").value||"FLAT20",r=document.getElementById("door-tex-track").value||"DOORTRAK",a=document.getElementById("door-tex-floor").value||"FLAT20";ep(i,t,{face:n,bottom:s,trackSides:r,trackFloor:a}),e.remove()}),document.getElementById("door-type").focus()}function ep(i,e,t){const n=R.sectors.get(i);if(!n)return;gt();const s=n.floor??0,r={...n,ceiling:s,ceilTex:t.bottom,floorTex:t.trackFloor};be(`map/sectors/${i}`,{...n},r),ge("sectors").child(i).update({ceiling:s,ceilTex:t.bottom,floorTex:t.trackFloor}),R.linedefs.forEach((a,o)=>{if(!a.frontSide)return;const c=R.sidedefs.get(a.frontSide);if(!c)return;const l=a.backSide?R.sidedefs.get(a.backSide):null,u=c.sector===i,f=(l==null?void 0:l.sector)===i;if(!u&&!f)return;const h={...a};if(!a.backSide){const x=(a.flags||0)|16;be(`map/linedefs/${o}`,h,{...h,flags:x}),ge("linedefs").child(o).update({flags:x}),be(`map/sidedefs/${a.frontSide}`,{...c},{...c,mid:t.trackSides}),ge("sidedefs").child(a.frontSide).update({mid:t.trackSides});return}const d=(a.flags||0)|16;if(u){const x={...h,v1:a.v2,v2:a.v1,frontSide:a.backSide,backSide:a.frontSide,special:e,flags:d};be(`map/linedefs/${o}`,h,x),ge("linedefs").child(o).update(x)}else be(`map/linedefs/${o}`,h,{...h,special:e,flags:d}),ge("linedefs").child(o).update({special:e,flags:d});const g=u?a.backSide:a.frontSide,v=R.sidedefs.get(g);be(`map/sidedefs/${g}`,{...v},{...v,upper:t.face}),ge("sidedefs").child(g).update({upper:t.face});const p=u?a.frontSide:a.backSide,m=R.sidedefs.get(p);be(`map/sidedefs/${p}`,{...m},{...m,upper:t.trackSides}),ge("sidedefs").child(p).update({upper:t.trackSides})}),vt(),Lt()}function tp(i){const e=[...et],t=e.map(o=>R.vertices.get(o)).filter(Boolean);if(t.length===0)return;function n(o){const c=t.map(l=>l[o]);return c.every(l=>l===c[0])?c[0]:null}const s=n("x"),r=n("y");let a=`<div class="panel-title">vertices <span style="color:#444">${e.length} selected</span></div>`;a+=`<div class="prop-row"><label>X</label>
    <input type="text" data-multi-field="x" data-numeric data-step="1" value="${s!==null?s:""}" placeholder="mixed"></div>`,a+=`<div class="prop-row"><label>Y</label>
    <input type="text" data-multi-field="y" data-numeric data-step="1" value="${r!==null?r:""}" placeholder="mixed"></div>`,i.innerHTML=a,i.querySelectorAll("[data-multi-field]").forEach(o=>{o.addEventListener("change",()=>{const c=o.dataset.multiField;o.value=String(hn(o.value));const l=hn(o.value);gt();for(const u of e){const f=R.vertices.get(u);f&&(be(`map/vertices/${u}`,{...f},{...f,[c]:l}),ge("vertices").child(u).update({[c]:l}))}vt()})})}function np(i){const e=[...et],t=e.map(g=>R.sectors.get(g)).filter(Boolean);if(t.length===0)return;function n(g){const v=t.map(p=>p[g]);return v.every(p=>p===v[0])?v[0]:null}const s=n("floor"),r=n("ceiling"),a=n("light"),o=n("special"),c=n("tag"),l=n("floorTex"),u=n("ceilTex");function f(g,v,p,m=1){return`<div class="prop-row"><label>${g}</label>
      <input type="text" data-multi-field="${v}" data-numeric data-step="${m}" value="${p!==null?p:""}" placeholder="mixed"></div>`}function h(g,v,p,m){const x=p??"",S=x&&Ki()?Ds(x):null,M=x?Cr(x):"width:24px;height:24px",A=S?`<img class="tex-preview tex-clickable" src="${S}" style="${M}" data-multi-field="${v}" data-tex-type="${m}">`:`<span class="tex-clickable tex-placeholder" data-multi-field="${v}" data-tex-type="${m}"></span>`;return`<div class="prop-row"><label>${g}</label>
      ${A}
      <span class="tex-name tex-clickable" data-multi-field="${v}" data-tex-type="${m}">${p?ys(x):"mixed"}</span></div>`}let d=`<div class="panel-title">sectors <span style="color:#444">${e.length} selected</span></div>`;d+=f("Floor H","floor",s),d+=f("Ceil H","ceiling",r),d+=h("Floor Tex","floorTex",l,"flat"),d+=h("Ceil Tex","ceilTex",u,"flat"),d+=f("Light","light",a),d+=f("Special","special",o),d+=f("Tag","tag",c),i.innerHTML=d,i.querySelectorAll("[data-multi-field]").forEach(g=>{g.tagName==="INPUT"&&g.addEventListener("change",()=>{const v=g.dataset.multiField,p=g.hasAttribute("data-numeric");p&&(g.value=String(hn(g.value)));const m=p?hn(g.value):g.value;gt();for(const x of e){const S=R.sectors.get(x);S&&(be(`map/sectors/${x}`,{...S},{...S,[v]:m}),ge("sectors").child(x).update({[v]:m}))}vt()})}),i.querySelectorAll(".tex-clickable").forEach(g=>{g.addEventListener("click",()=>{const v=g.dataset.multiField,p=g.dataset.texType,m=n(v)??"";wr({filter:p,currentValue:m,onSelect:x=>{gt();for(const S of e){const M=R.sectors.get(S);M&&(be(`map/sectors/${S}`,{...M},{...M,[v]:x}),ge("sectors").child(S).update({[v]:x}))}vt(),Lt()}})})}),i.querySelectorAll("input[data-numeric]").forEach(g=>{g.addEventListener("wheel",v=>{v.preventDefault();const p=v.deltaY<0?Vn:-Vn;g.value=String(hn(g.value)+p),g.dispatchEvent(new Event("change"))})}),i.querySelectorAll("input[data-numeric]").forEach(g=>{g.addEventListener("focus",()=>g.select())})}function ip(i){const e=[...et],t=e.map(v=>R.linedefs.get(v)).filter(Boolean);if(t.length===0)return;function n(v){const p=t.map(m=>m[v]);return p.every(m=>m===p[0])?p[0]:null}const s=e.map(v=>{var p;return(p=R.linedefs.get(v))==null?void 0:p.frontSide}).filter(Boolean),r=e.map(v=>{var p;return(p=R.linedefs.get(v))==null?void 0:p.backSide}).filter(Boolean);function a(v,p){if(v.length===0)return null;const m=v.map(x=>{const S=R.sidedefs.get(x);return S?S[p]:void 0});return m.every(x=>x===m[0])?m[0]:null}const o=n("special"),c=n("tag"),l=n("flags");function u(v,p,m,x=1){return`<div class="prop-row"><label>${v}</label>
      <input type="text" data-multi-field="${p}" data-numeric data-step="${x}" value="${m!==null?m:""}" placeholder="mixed"></div>`}function f(v,p,m){const x=m!==null&&m&p?"checked":"";return`<div class="prop-row"><label>${v}</label>
      <input type="checkbox" data-multi-bit="${p}" ${x}></div>`}function h(v,p,m,x){if(m.length===0)return"";const S=a(m,p),M=S??"",A=M&&Ki()?Ds(M):null,w=M?Cr(M):"width:24px;height:24px",C=A?`<img class="tex-preview tex-clickable" src="${A}" style="${w}" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}">`:`<span class="tex-clickable tex-placeholder" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}"></span>`;return`<div class="prop-row"><label>${v}</label>
      ${C}
      <span class="tex-name tex-clickable" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}">${S?ys(M):"mixed"}</span></div>`}let d=`<div class="panel-title">linedefs <span style="color:#444">${e.length} selected</span></div>`;d+=u("Special","special",o),d+=u("Tag","tag",c),d+='<div class="prop-section"><div class="panel-title">Flags</div>';for(const{bit:v,label:p}of ed)d+=f(p,v,l);d+="</div>";const g=e.map(v=>dr.get(v)).filter(Boolean);if(g.length>0){let v=function(S,M){const A=S.map(w=>{const C=R.sidedefs.get(w);return C?C[M]??0:0});return A.every(w=>w===A[0])?A[0]:null},p=function(S,M,A,w,C=1){return`<div class="prop-row"><label>${S}</label>
        <input type="text" data-multi-side-num="${M}" data-side-ids="${w.join(",")}" data-numeric data-step="${C}" value="${A!==null?A:""}" placeholder="mixed"></div>`};const m=v(g,"xoff"),x=v(g,"yoff");d+=`<div class="prop-section"><div class="panel-title">Selected Sides <span style="color:#444">${g.length}</span></div>`,d+=p("X Off","xoff",m,g),d+=p("Y Off","yoff",x,g),d+="</div>"}s.length>0&&(d+='<div class="prop-section"><div class="panel-title">Front Sidedef</div>',d+=h("Upper","upper",s,"wall"),d+=h("Mid","mid",s,"wall"),d+=h("Lower","lower",s,"wall"),d+="</div>"),r.length>0&&(d+='<div class="prop-section"><div class="panel-title">Back Sidedef</div>',d+=h("Upper","upper",r,"wall"),d+=h("Mid","mid",r,"wall"),d+=h("Lower","lower",r,"wall"),d+="</div>"),i.innerHTML=d,i.querySelectorAll("[data-multi-field]").forEach(v=>{v.addEventListener("change",()=>{const p=v.dataset.multiField;v.hasAttribute("data-numeric")&&(v.value=String(hn(v.value)));const m=hn(v.value);gt();for(const x of e){const S=R.linedefs.get(x);S&&(be(`map/linedefs/${x}`,{...S},{...S,[p]:m}),ge("linedefs").child(x).update({[p]:m}))}vt()})}),i.querySelectorAll("[data-multi-side-num]").forEach(v=>{v.addEventListener("change",()=>{const p=v.dataset.multiSideNum,m=v.dataset.sideIds.split(","),x=hn(v.value);v.value=String(x),gt();for(const S of m){const M=R.sidedefs.get(S);M&&(be(`map/sidedefs/${S}`,{...M},{...M,[p]:x}),ge("sidedefs").child(S).update({[p]:x}))}vt()})}),i.querySelectorAll("[data-multi-bit]").forEach(v=>{v.addEventListener("change",()=>{const p=parseInt(v.dataset.multiBit,10);gt();for(const m of e){const x=R.linedefs.get(m);if(x){const S=x.flags||0,M=v.checked?S|p:S&~p;be(`map/linedefs/${m}`,{...x},{...x,flags:M}),ge("linedefs").child(m).update({flags:M})}}vt()})}),i.querySelectorAll(".tex-clickable").forEach(v=>{v.addEventListener("click",()=>{const p=v.dataset.sideField,m=v.dataset.sideType,x=v.dataset.sideIds.split(","),S=a(x,p)??"";wr({filter:m,currentValue:S,onSelect:M=>{gt();for(const A of x){const w=R.sidedefs.get(A);w&&(be(`map/sidedefs/${A}`,{...w},{...w,[p]:M}),ge("sidedefs").child(A).update({[p]:M}))}vt(),Lt()}})})}),i.querySelectorAll("input[data-numeric]").forEach(v=>{v.addEventListener("wheel",p=>{p.preventDefault();const m=p.deltaY<0?Vn:-Vn;v.value=String(hn(v.value)+m),v.dispatchEvent(new Event("change"))})}),i.querySelectorAll("input[data-numeric]").forEach(v=>{v.addEventListener("focus",()=>v.select())})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $c="183",sp=0,Tl=1,rp=2,ma=1,ap=2,Js=3,Ei=0,jt=1,bn=2,ti=0,Ms=1,Al=2,wl=3,Cl=4,op=5,Fi=100,cp=101,lp=102,up=103,dp=104,fp=200,hp=201,pp=202,mp=203,Fo=204,Oo=205,gp=206,vp=207,xp=208,_p=209,Sp=210,yp=211,Mp=212,Ep=213,bp=214,Bo=0,ko=1,zo=2,Ts=3,Vo=4,Ho=5,Go=6,Wo=7,vd=0,Tp=1,Ap=2,kn=0,xd=1,_d=2,Sd=3,yd=4,Md=5,Ed=6,bd=7,Td=300,$i=301,As=302,Wa=303,Xa=304,Na=306,vr=1e3,Qn=1001,Xo=1002,Tt=1003,wp=1004,Fr=1005,Xt=1006,$a=1007,zi=1008,fn=1009,Ad=1010,wd=1011,xr=1012,qc=1013,Hn=1014,Fn=1015,ii=1016,Yc=1017,Kc=1018,_r=1020,Cd=35902,Rd=35899,Pd=1021,Ld=1022,wn=1023,si=1026,Vi=1027,Id=1028,Zc=1029,ws=1030,Jc=1031,jc=1033,ga=33776,va=33777,xa=33778,_a=33779,$o=35840,qo=35841,Yo=35842,Ko=35843,Zo=36196,Jo=37492,jo=37496,Qo=37488,ec=37489,tc=37490,nc=37491,ic=37808,sc=37809,rc=37810,ac=37811,oc=37812,cc=37813,lc=37814,uc=37815,dc=37816,fc=37817,hc=37818,pc=37819,mc=37820,gc=37821,vc=36492,xc=36494,_c=36495,Sc=36283,yc=36284,Mc=36285,Ec=36286,Cp=3200,Rp=0,Pp=1,_i="",un="srgb",Cs="srgb-linear",Ra="linear",st="srgb",ji=7680,Rl=519,Lp=512,Ip=513,Dp=514,Qc=515,Up=516,Np=517,el=518,Fp=519,Pl=35044,Ll="300 es",On=2e3,Pa=2001;function Op(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function La(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bp(){const i=La("canvas");return i.style.display="block",i}const Il={};function Dl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Dd(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=Dd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=Dd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ia(...i){const e=i.join(" ");e in Il||(Il[e]=!0,Be(...i))}function kp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const zp={[Bo]:ko,[zo]:Go,[Vo]:Wo,[Ts]:Ho,[ko]:Bo,[Go]:zo,[Wo]:Vo,[Ho]:Ts};class Ns{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qa=Math.PI/180,bc=180/Math.PI;function Fs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function Vp(i,e){return(i%e+e)%e}function Ya(i,e,t){return(1-t)*i+t*e}function zs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Le{constructor(e=0,t=0){Le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Os{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(f!==v||c!==h||l!==d||u!==g){let p=c*h+l*d+u*g+f*v;p<0&&(h=-h,d=-d,g=-g,v=-v,p=-p);let m=1-o;if(p<.9995){const x=Math.acos(p),S=Math.sin(x);m=Math.sin(m*x)/S,o=Math.sin(o*x)/S,c=c*m+h*o,l=l*m+d*o,u=u*m+g*o,f=f*m+v*o}else{c=c*m+h*o,l=l*m+d*o,u=u*m+g*o,f=f*m+v*o;const x=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=x,l*=x,u*=x,f*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*f+c*d-l*h,e[t+1]=c*g+u*h+l*f-o*d,e[t+2]=l*g+u*d+o*h-c*f,e[t+3]=u*g-o*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),h=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ul.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ul.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ka.copy(this).projectOnVector(e),this.sub(Ka)}reflect(e){return this.sub(Ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ka=new N,Ul=new Os;class Ge{constructor(e,t,n,s,r,a,o,c,l){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],v=s[0],p=s[3],m=s[6],x=s[1],S=s[4],M=s[7],A=s[2],w=s[5],C=s[8];return r[0]=a*v+o*x+c*A,r[3]=a*p+o*S+c*w,r[6]=a*m+o*M+c*C,r[1]=l*v+u*x+f*A,r[4]=l*p+u*S+f*w,r[7]=l*m+u*M+f*C,r[2]=h*v+d*x+g*A,r[5]=h*p+d*S+g*w,r[8]=h*m+d*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,h=o*c-u*r,d=l*r-a*c,g=t*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(s*l-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=d*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Za.makeScale(e,t)),this}rotate(e){return this.premultiply(Za.makeRotation(-e)),this}translate(e,t){return this.premultiply(Za.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Za=new Ge,Nl=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fl=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hp(){const i={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(s.r=Es(s.r),s.g=Es(s.g),s.b=Es(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?Ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ia("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ia("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cs]:{primaries:e,whitePoint:n,transfer:Ra,toXYZ:Nl,fromXYZ:Fl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:n,transfer:st,toXYZ:Nl,fromXYZ:Fl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const je=Hp();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Es(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Qi;class Gp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Qi===void 0&&(Qi=La("canvas")),Qi.width=e.width,Qi.height=e.height;const s=Qi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Qi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=La("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wp=0;class tl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ja(s[a].image)):r.push(Ja(s[a]))}else r=Ja(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ja(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Xp=0;const ja=new N;class Vt extends Ns{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=Qn,s=Qn,r=Xt,a=zi,o=wn,c=fn,l=Vt.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Fs(),this.name="",this.source=new tl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ja).x}get height(){return this.source.getSize(ja).y}get depth(){return this.source.getSize(ja).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Td)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vr:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vr:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Td;Vt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,M=(d+1)/2,A=(m+1)/2,w=(u+h)/4,C=(f+v)/4,y=(g+p)/4;return S>M&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=C/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=y/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=y/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(f-v)/x,this.z=(h-u)/x,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $p extends Ns{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Vt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new tl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends $p{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ud extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qp extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yt{constructor(e,t,n,s,r,a,o,c,l,u,f,h,d,g,v,p){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,f,h,d,g,v,p)}set(e,t,n,s,r,a,o,c,l,u,f,h,d,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/es.setFromMatrixColumn(e,0).length(),r=1/es.setFromMatrixColumn(e,1).length(),a=1/es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,d=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,d=c*f,g=l*u,v=l*f;t[0]=h+v*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,d=c*f,g=l*u,v=l*f;t[0]=h-v*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+v,t[1]=c*f,t[5]=v*l+h,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,d=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-v*f}else if(e.order==="XZY"){const h=a*c,d=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yp,e,Kp)}lookAt(e,t,n){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ci.crossVectors(n,nn),ci.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ci.crossVectors(n,nn)),ci.normalize(),Or.crossVectors(nn,ci),s[0]=ci.x,s[4]=Or.x,s[8]=nn.x,s[1]=ci.y,s[5]=Or.y,s[9]=nn.y,s[2]=ci.z,s[6]=Or.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],v=n[6],p=n[10],m=n[14],x=n[3],S=n[7],M=n[11],A=n[15],w=s[0],C=s[4],y=s[8],T=s[12],X=s[1],P=s[5],k=s[9],V=s[13],H=s[2],O=s[6],G=s[10],F=s[14],te=s[3],ee=s[7],de=s[11],fe=s[15];return r[0]=a*w+o*X+c*H+l*te,r[4]=a*C+o*P+c*O+l*ee,r[8]=a*y+o*k+c*G+l*de,r[12]=a*T+o*V+c*F+l*fe,r[1]=u*w+f*X+h*H+d*te,r[5]=u*C+f*P+h*O+d*ee,r[9]=u*y+f*k+h*G+d*de,r[13]=u*T+f*V+h*F+d*fe,r[2]=g*w+v*X+p*H+m*te,r[6]=g*C+v*P+p*O+m*ee,r[10]=g*y+v*k+p*G+m*de,r[14]=g*T+v*V+p*F+m*fe,r[3]=x*w+S*X+M*H+A*te,r[7]=x*C+S*P+M*O+A*ee,r[11]=x*y+S*k+M*G+A*de,r[15]=x*T+S*V+M*F+A*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],v=e[7],p=e[11],m=e[15],x=c*d-l*h,S=o*d-l*f,M=o*h-c*f,A=a*d-l*u,w=a*h-c*u,C=a*f-o*u;return t*(v*x-p*S+m*M)-n*(g*x-p*A+m*w)+s*(g*S-v*A+m*C)-r*(g*M-v*w+p*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],v=e[13],p=e[14],m=e[15],x=t*o-n*a,S=t*c-s*a,M=t*l-r*a,A=n*c-s*o,w=n*l-r*o,C=s*l-r*c,y=u*v-f*g,T=u*p-h*g,X=u*m-d*g,P=f*p-h*v,k=f*m-d*v,V=h*m-d*p,H=x*V-S*k+M*P+A*X-w*T+C*y;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/H;return e[0]=(o*V-c*k+l*P)*O,e[1]=(s*k-n*V-r*P)*O,e[2]=(v*C-p*w+m*A)*O,e[3]=(h*w-f*C-d*A)*O,e[4]=(c*X-a*V-l*T)*O,e[5]=(t*V-s*X+r*T)*O,e[6]=(p*M-g*C-m*S)*O,e[7]=(u*C-h*M+d*S)*O,e[8]=(a*k-o*X+l*y)*O,e[9]=(n*X-t*k-r*y)*O,e[10]=(g*w-v*M+m*x)*O,e[11]=(f*M-u*w-d*x)*O,e[12]=(o*T-a*P-c*y)*O,e[13]=(t*P-n*T+s*y)*O,e[14]=(v*S-g*A-p*x)*O,e[15]=(u*A-f*S+h*x)*O,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,f=o+o,h=r*l,d=r*u,g=r*f,v=a*u,p=a*f,m=o*f,x=c*l,S=c*u,M=c*f,A=n.x,w=n.y,C=n.z;return s[0]=(1-(v+m))*A,s[1]=(d+M)*A,s[2]=(g-S)*A,s[3]=0,s[4]=(d-M)*w,s[5]=(1-(h+m))*w,s[6]=(p+x)*w,s[7]=0,s[8]=(g+S)*C,s[9]=(p-x)*C,s[10]=(1-(h+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=es.set(s[0],s[1],s[2]).length();const o=es.set(s[4],s[5],s[6]).length(),c=es.set(s[8],s[9],s[10]).length();r<0&&(a=-a),xn.copy(this);const l=1/a,u=1/o,f=1/c;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=f,xn.elements[9]*=f,xn.elements[10]*=f,t.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=On,c=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===On)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Pa)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=On,c=!1){const l=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===On)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Pa)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const es=new N,xn=new yt,Yp=new N(0,0,0),Kp=new N(1,1,1),ci=new N,Or=new N,nn=new N,Ol=new yt,Bl=new Os;class ri{constructor(e=0,t=0,n=0,s=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ol.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ol,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class nl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zp=0;const kl=new N,ts=new Os,qn=new yt,Br=new N,Vs=new N,Jp=new N,jp=new Os,zl=new N(1,0,0),Vl=new N(0,1,0),Hl=new N(0,0,1),Gl={type:"added"},Qp={type:"removed"},ns={type:"childadded",child:null},Qa={type:"childremoved",child:null};class Qt extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qt.DEFAULT_UP.clone();const e=new N,t=new ri,n=new Os,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new yt},normalMatrix:{value:new Ge}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=Qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,t){return ts.setFromAxisAngle(e,t),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Hl,e)}translateOnAxis(e,t){return kl.copy(e).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Hl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Vs,Br,this.up):qn.lookAt(Br,Vs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ts.setFromRotationMatrix(qn),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gl),ns.child=e,this.dispatchEvent(ns),ns.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),Qa.child=e,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gl),ns.child=e,this.dispatchEvent(ns),ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,e,Jp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Qt.DEFAULT_UP=new N(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class js extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const em={type:"move"};class eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(em)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new js;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},kr={h:0,s:0,l:0};function to(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=je.workingColorSpace){if(e=Vp(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=to(a,r,e+1/3),this.g=to(a,r,e),this.b=to(a,r,e-1/3)}return je.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=Nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return je.workingToColorSpace(Wt.copy(this),e),Math.round(Ye(Wt.r*255,0,255))*65536+Math.round(Ye(Wt.g*255,0,255))*256+Math.round(Ye(Wt.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Wt.copy(this),t);const n=Wt.r,s=Wt.g,r=Wt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=un){je.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,s=Wt.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(kr);const n=Ya(li.h,kr.h,t),s=Ya(li.s,kr.s,t),r=Ya(li.l,kr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ke;Ke.NAMES=Nd;class il{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=t}clone(){return new il(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tm extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const _n=new N,Yn=new N,no=new N,Kn=new N,is=new N,ss=new N,Wl=new N,io=new N,so=new N,ro=new N,ao=new bt,oo=new bt,co=new bt;class Tn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),_n.subVectors(e,t),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){_n.subVectors(s,t),Yn.subVectors(n,t),no.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Yn),c=_n.dot(no),l=Yn.dot(Yn),u=Yn.dot(no),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(a,Kn.y),c.addScaledVector(o,Kn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return ao.setScalar(0),oo.setScalar(0),co.setScalar(0),ao.fromBufferAttribute(e,t),oo.fromBufferAttribute(e,n),co.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ao,r.x),a.addScaledVector(oo,r.y),a.addScaledVector(co,r.z),a}static isFrontFacing(e,t,n,s){return _n.subVectors(n,t),Yn.subVectors(e,t),_n.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),_n.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;is.subVectors(s,n),ss.subVectors(r,n),io.subVectors(e,n);const c=is.dot(io),l=ss.dot(io);if(c<=0&&l<=0)return t.copy(n);so.subVectors(e,s);const u=is.dot(so),f=ss.dot(so);if(u>=0&&f<=u)return t.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(is,a);ro.subVectors(e,r);const d=is.dot(ro),g=ss.dot(ro);if(g>=0&&d<=g)return t.copy(r);const v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ss,o);const p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return Wl.subVectors(r,s),o=(f-u)/(f-u+(d-g)),t.copy(s).addScaledVector(Wl,o);const m=1/(p+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector(is,a).addScaledVector(ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Rr{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(r,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),Vr.subVectors(this.max,Hs),rs.subVectors(e.a,Hs),as.subVectors(e.b,Hs),os.subVectors(e.c,Hs),ui.subVectors(as,rs),di.subVectors(os,as),Ai.subVectors(rs,os);let t=[0,-ui.z,ui.y,0,-di.z,di.y,0,-Ai.z,Ai.y,ui.z,0,-ui.x,di.z,0,-di.x,Ai.z,0,-Ai.x,-ui.y,ui.x,0,-di.y,di.x,0,-Ai.y,Ai.x,0];return!lo(t,rs,as,os,Vr)||(t=[1,0,0,0,1,0,0,0,1],!lo(t,rs,as,os,Vr))?!1:(Hr.crossVectors(ui,di),t=[Hr.x,Hr.y,Hr.z],lo(t,rs,as,os,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Zn=[new N,new N,new N,new N,new N,new N,new N,new N],Sn=new N,zr=new Rr,rs=new N,as=new N,os=new N,ui=new N,di=new N,Ai=new N,Hs=new N,Vr=new N,Hr=new N,wi=new N;function lo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){wi.fromArray(i,r);const o=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=n.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const At=new N,Gr=new Le;let nm=0;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),s=Zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),s=Zt(s,this.array),r=Zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pl&&(e.usage=this.usage),e}}class Fd extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Od extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pn extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}const im=new Rr,Gs=new N,uo=new N;class sl{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):im.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gs.subVectors(e,this.center);const t=Gs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gs.copy(e.center).add(uo)),this.expandByPoint(Gs.copy(e.center).sub(uo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let sm=0;const cn=new yt,fo=new Qt,cs=new N,sn=new Rr,Ws=new Rr,Nt=new N;class gn extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Op(e)?Od:Fd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,n){return cn.makeTranslation(e,t,n),this.applyMatrix4(cn),this}scale(e,t,n){return cn.makeScale(e,t,n),this.applyMatrix4(cn),this}lookAt(e){return fo.lookAt(e),fo.updateMatrix(),this.applyMatrix4(fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pn(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(sn.min,Ws.min),sn.expandByPoint(Nt),Nt.addVectors(sn.max,Ws.max),sn.expandByPoint(Nt)):(sn.expandByPoint(Ws.min),sn.expandByPoint(Ws.max))}sn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Nt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Nt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Nt.fromBufferAttribute(o,l),c&&(cs.fromBufferAttribute(e,l),Nt.add(cs)),s=Math.max(s,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new N,c[y]=new N;const l=new N,u=new N,f=new N,h=new Le,d=new Le,g=new Le,v=new N,p=new N;function m(y,T,X){l.fromBufferAttribute(n,y),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,X),h.fromBufferAttribute(r,y),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,X),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),o[y].add(v),o[T].add(v),o[X].add(v),c[y].add(p),c[T].add(p),c[X].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let y=0,T=x.length;y<T;++y){const X=x[y],P=X.start,k=X.count;for(let V=P,H=P+k;V<H;V+=3)m(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const S=new N,M=new N,A=new N,w=new N;function C(y){A.fromBufferAttribute(s,y),w.copy(A);const T=o[y];S.copy(T),S.sub(A.multiplyScalar(A.dot(T))).normalize(),M.crossVectors(w,T);const P=M.dot(c[y])<0?-1:1;a.setXYZW(y,S.x,S.y,S.z,P)}for(let y=0,T=x.length;y<T;++y){const X=x[y],P=X.start,k=X.count;for(let V=P,H=P+k;V<H;V+=3)C(e.getX(V+0)),C(e.getX(V+1)),C(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,u=new N,f=new N;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let v=0,p=c.length;v<p;v++){o.isInterleavedBufferAttribute?d=c[v]*o.data.stride+o.offset:d=c[v]*u;for(let m=0;m<u;m++)h[g++]=l[d++]}return new en(h,u,f)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gn,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let rm=0;class Pr extends Ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=Ms,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fo,this.blendDst=Oo,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fo&&(n.blendSrc=this.blendSrc),this.blendDst!==Oo&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Jn=new N,ho=new N,Wr=new N,fi=new N,po=new N,Xr=new N,mo=new N;class Bd{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ho.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),fi.copy(this.origin).sub(ho);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Wr),o=fi.dot(this.direction),c=-fi.dot(Wr),l=fi.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*c-o,h=a*o-c,g=r*u,f>=0)if(h>=-g)if(h<=g){const v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ho).addScaledVector(Wr,h),d}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);const n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,s,r){po.subVectors(t,e),Xr.subVectors(n,e),mo.crossVectors(po,Xr);let a=this.direction.dot(mo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;fi.subVectors(this.origin,e);const c=o*this.direction.dot(Xr.crossVectors(fi,Xr));if(c<0)return null;const l=o*this.direction.dot(po.cross(fi));if(l<0||c+l>a)return null;const u=-o*fi.dot(mo);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rs extends Pr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xl=new yt,Ci=new Bd,$r=new sl,$l=new N,qr=new N,Yr=new N,Kr=new N,go=new N,Zr=new N,ql=new N,Jr=new N;class Yt extends Qt{constructor(e=new gn,t=new Rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Zr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],f=r[c];u!==0&&(go.fromBufferAttribute(f,e),a?Zr.addScaledVector(go,u):Zr.addScaledVector(go.sub(t),u))}t.add(Zr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Ci.copy(e.ray).recast(e.near),!($r.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere($r,$l)===null||Ci.origin.distanceToSquared($l)>(e.far-e.near)**2))&&(Xl.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Xl),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const p=h[g],m=a[p.materialIndex],x=Math.max(p.start,d.start),S=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let M=x,A=S;M<A;M+=3){const w=o.getX(M),C=o.getX(M+1),y=o.getX(M+2);s=jr(this,m,e,n,l,u,f,w,C,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const x=o.getX(p),S=o.getX(p+1),M=o.getX(p+2);s=jr(this,a,e,n,l,u,f,x,S,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const p=h[g],m=a[p.materialIndex],x=Math.max(p.start,d.start),S=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let M=x,A=S;M<A;M+=3){const w=M,C=M+1,y=M+2;s=jr(this,m,e,n,l,u,f,w,C,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const x=p,S=p+1,M=p+2;s=jr(this,a,e,n,l,u,f,x,S,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function am(i,e,t,n,s,r,a,o){let c;if(e.side===jt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Ei,o),c===null)return null;Jr.copy(o),Jr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Jr);return l<t.near||l>t.far?null:{distance:l,point:Jr.clone(),object:i}}function jr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,qr),i.getVertexPosition(c,Yr),i.getVertexPosition(l,Kr);const u=am(i,e,t,n,qr,Yr,Kr,ql);if(u){const f=new N;Tn.getBarycoord(ql,qr,Yr,Kr,f),s&&(u.uv=Tn.getInterpolatedAttribute(s,o,c,l,f,new Le)),r&&(u.uv1=Tn.getInterpolatedAttribute(r,o,c,l,f,new Le)),a&&(u.normal=Tn.getInterpolatedAttribute(a,o,c,l,f,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new N,materialIndex:0};Tn.getNormal(qr,Yr,Kr,h.normal),u.face=h,u.barycoord=f}return u}class om extends Vt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Tt,u=Tt,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vo=new N,cm=new N,lm=new Ge;class Ui{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=vo.subVectors(n,t).cross(cm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(vo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||lm.getNormalMatrix(e),s=this.coplanarPoint(vo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new sl,um=new Le(.5,.5),Qr=new N;class kd{constructor(e=new Ui,t=new Ui,n=new Ui,s=new Ui,r=new Ui,a=new Ui){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],v=r[9],p=r[10],m=r[11],x=r[12],S=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-a,d-u,m-g,A-x).normalize(),s[1].setComponents(l+a,d+u,m+g,A+x).normalize(),s[2].setComponents(l+o,d+f,m+v,A+S).normalize(),s[3].setComponents(l-o,d-f,m-v,A-S).normalize(),n)s[4].setComponents(c,h,p,M).normalize(),s[5].setComponents(l-c,d-h,m-p,A-M).normalize();else if(s[4].setComponents(l-c,d-h,m-p,A-M).normalize(),t===On)s[5].setComponents(l+c,d+h,m+p,A+M).normalize();else if(t===Pa)s[5].setComponents(c,h,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);const t=um.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Qr.x=s.normal.x>0?e.max.x:e.min.x,Qr.y=s.normal.y>0?e.max.y:e.min.y,Qr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zd extends Vt{constructor(e=[],t=$i,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sr extends Vt{constructor(e,t,n=Hn,s,r,a,o=Tt,c=Tt,l,u=si,f=1){if(u!==si&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class dm extends Sr{constructor(e,t=Hn,n=$i,s,r,a=Tt,o=Tt,c,l=si){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Vd extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Lr extends gn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pn(l,3)),this.setAttribute("normal",new pn(u,3)),this.setAttribute("uv",new pn(f,2));function g(v,p,m,x,S,M,A,w,C,y,T){const X=M/C,P=A/y,k=M/2,V=A/2,H=w/2,O=C+1,G=y+1;let F=0,te=0;const ee=new N;for(let de=0;de<G;de++){const fe=de*P-V;for(let _e=0;_e<O;_e++){const ke=_e*X-k;ee[v]=ke*x,ee[p]=fe*S,ee[m]=H,l.push(ee.x,ee.y,ee.z),ee[v]=0,ee[p]=0,ee[m]=w>0?1:-1,u.push(ee.x,ee.y,ee.z),f.push(_e/C),f.push(1-de/y),F+=1}}for(let de=0;de<y;de++)for(let fe=0;fe<C;fe++){const _e=h+fe+O*de,ke=h+fe+O*(de+1),nt=h+(fe+1)+O*(de+1),at=h+(fe+1)+O*de;c.push(_e,ke,at),c.push(ke,nt,at),te+=6}o.addGroup(d,te,T),d+=te,h+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Be("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const u=n[s],h=n[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new Le:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new N,s=[],r=[],a=[],o=new N,c=new yt;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ye(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rl extends Wn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Le){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class fm extends rl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function al(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,f){let h=(a-r)/l-(o-r)/(l+u)+(o-a)/u,d=(o-a)/u-(c-a)/(u+f)+(c-o)/f;h*=u,d*=u,s(a,o,h,d)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const ea=new N,xo=new al,_o=new al,So=new al;class hm extends Wn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(ea.subVectors(s[0],s[1]).add(s[0]),l=ea);const f=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(ea.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=ea),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),xo.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,v,p),_o.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,v,p),So.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(xo.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),_o.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),So.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(xo.calc(c),_o.calc(c),So.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Yl(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function pm(i,e){const t=1-i;return t*t*e}function mm(i,e){return 2*(1-i)*i*e}function gm(i,e){return i*i*e}function or(i,e,t,n){return pm(i,e)+mm(i,t)+gm(i,n)}function vm(i,e){const t=1-i;return t*t*t*e}function xm(i,e){const t=1-i;return 3*t*t*i*e}function _m(i,e){return 3*(1-i)*i*i*e}function Sm(i,e){return i*i*i*e}function cr(i,e,t,n,s){return vm(i,e)+xm(i,t)+_m(i,n)+Sm(i,s)}class Hd extends Wn{constructor(e=new Le,t=new Le,n=new Le,s=new Le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Le){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,s.x,r.x,a.x,o.x),cr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ym extends Wn{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,s.x,r.x,a.x,o.x),cr(e,s.y,r.y,a.y,o.y),cr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gd extends Wn{constructor(e=new Le,t=new Le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Le){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mm extends Wn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wd extends Wn{constructor(e=new Le,t=new Le,n=new Le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Le){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(or(e,s.x,r.x,a.x),or(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Em extends Wn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(or(e,s.x,r.x,a.x),or(e,s.y,r.y,a.y),or(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xd extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Le){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Yl(o,c.x,l.x,u.x,f.x),Yl(o,c.y,l.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Le().fromArray(s))}return this}}var Kl=Object.freeze({__proto__:null,ArcCurve:fm,CatmullRomCurve3:hm,CubicBezierCurve:Hd,CubicBezierCurve3:ym,EllipseCurve:rl,LineCurve:Gd,LineCurve3:Mm,QuadraticBezierCurve:Wd,QuadraticBezierCurve3:Em,SplineCurve:Xd});class bm extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Kl[s.type]().fromJSON(s))}return this}}class Tc extends bm{constructor(e){super(),this.type="Path",this.currentPoint=new Le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Gd(this.currentPoint.clone(),new Le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Wd(this.currentPoint.clone(),new Le(e,t),new Le(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Hd(this.currentPoint.clone(),new Le(e,t),new Le(n,s),new Le(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Xd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new rl(e,t,n,s,r,a,o,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class $d extends Tc{constructor(e){super(e),this.uuid=Fs(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Tc().fromJSON(s))}return this}}function Tm(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=qd(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Pm(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let u=o,f=c;for(let h=t;h<s;h+=t){const d=i[h],g=i[h+1];d<o&&(o=d),g<c&&(c=g),d>u&&(u=d),g>f&&(f=g)}l=Math.max(u-o,f-c),l=l!==0?32767/l:0}return yr(r,a,t,o,c,l,0),a}function qd(i,e,t,n,s){let r;if(s===Vm(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Zl(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Zl(a/n|0,i[a],i[a+1],r);return r&&Ps(r,r.next)&&(Er(r),r=r.next),r}function qi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ps(t,t.next)||mt(t.prev,t,t.next)===0)){if(Er(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Nm(i,n,s,r);let o=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?wm(i,n,s,r):Am(i)){e.push(c.i,i.i,l.i),Er(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Cm(qi(i),e),yr(i,e,t,n,s,r,2)):a===2&&Rm(i,e,t,n,s,r):yr(qi(i),e,t,n,s,r,1);break}}}function Am(i){const e=i.prev,t=i,n=i.next;if(mt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,u=Math.min(s,r,a),f=Math.min(o,c,l),h=Math.max(s,r,a),d=Math.max(o,c,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&Qs(s,o,r,c,a,l,g.x,g.y)&&mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function wm(i,e,t,n){const s=i.prev,r=i,a=i.next;if(mt(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,f=r.y,h=a.y,d=Math.min(o,c,l),g=Math.min(u,f,h),v=Math.max(o,c,l),p=Math.max(u,f,h),m=Ac(d,g,e,t,n),x=Ac(v,p,e,t,n);let S=i.prevZ,M=i.nextZ;for(;S&&S.z>=m&&M&&M.z<=x;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Qs(o,u,c,f,l,h,S.x,S.y)&&mt(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=d&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&Qs(o,u,c,f,l,h,M.x,M.y)&&mt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=m;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Qs(o,u,c,f,l,h,S.x,S.y)&&mt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=x;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&Qs(o,u,c,f,l,h,M.x,M.y)&&mt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Cm(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Ps(n,s)&&Kd(n,t,t.next,s)&&Mr(n,s)&&Mr(s,n)&&(e.push(n.i,t.i,s.i),Er(t),Er(t.next),t=i=s),t=t.next}while(t!==i);return qi(t)}function Rm(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Bm(a,o)){let c=Zd(a,o);a=qi(a,a.next),c=qi(c,c.next),yr(a,e,t,n,s,r,0),yr(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Pm(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=qd(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Om(l))}s.sort(Lm);for(let r=0;r<s.length;r++)t=Im(s[r],t);return t}function Lm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Im(i,e){const t=Dm(i,e);if(!t)return e;const n=Zd(t,i);return qi(n,n.next),qi(t,t.next)}function Dm(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Ps(i,t))return t;do{if(Ps(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Yd(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);Mr(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&Um(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function Um(i,e){return mt(i.prev,i,e.prev)<0&&mt(e.next,i,i.next)<0}function Nm(i,e,t,n){let s=i;do s.z===0&&(s.z=Ac(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Fm(s)}function Fm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ac(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Om(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Yd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Qs(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Yd(i,e,t,n,s,r,a,o)}function Bm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!km(i,e)&&(Mr(i,e)&&Mr(e,i)&&zm(i,e)&&(mt(i.prev,i,e.prev)||mt(i,e.prev,e))||Ps(i,e)&&mt(i.prev,i,i.next)>0&&mt(e.prev,e,e.next)>0)}function mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ps(i,e){return i.x===e.x&&i.y===e.y}function Kd(i,e,t,n){const s=na(mt(i,e,t)),r=na(mt(i,e,n)),a=na(mt(t,n,i)),o=na(mt(t,n,e));return!!(s!==r&&a!==o||s===0&&ta(i,t,e)||r===0&&ta(i,n,e)||a===0&&ta(t,i,n)||o===0&&ta(t,e,n))}function ta(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function na(i){return i>0?1:i<0?-1:0}function km(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Kd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Mr(i,e){return mt(i.prev,i,i.next)<0?mt(i,e,i.next)>=0&&mt(i,i.prev,e)>=0:mt(i,e,i.prev)<0||mt(i,i.next,e)<0}function zm(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Zd(i,e){const t=wc(i.i,i.x,i.y),n=wc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Zl(i,e,t,n){const s=wc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function wc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vm(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Hm{static triangulate(e,t,n=2){return Tm(e,t,n)}}class lr{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return lr.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Jl(e),jl(n,e);let a=e.length;t.forEach(Jl);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,jl(n,t[c]);const o=Hm.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Jl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function jl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ls extends gn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=e/o,h=t/c,d=[],g=[],v=[],p=[];for(let m=0;m<u;m++){const x=m*h-a;for(let S=0;S<l;S++){const M=S*f-r;g.push(M,-x,0),v.push(0,0,1),p.push(S/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<o;x++){const S=x+l*m,M=x+l*(m+1),A=x+1+l*(m+1),w=x+1+l*m;d.push(S,M,w),d.push(M,A,w)}this.setIndex(d),this.setAttribute("position",new pn(g,3)),this.setAttribute("normal",new pn(v,3)),this.setAttribute("uv",new pn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.widthSegments,e.heightSegments)}}class ol extends gn{constructor(e=new $d([new Le(0,.5),new Le(-.5,-.5),new Le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new pn(s,3)),this.setAttribute("normal",new pn(r,3)),this.setAttribute("uv",new pn(a,2));function l(u){const f=s.length/3,h=u.extractPoints(t);let d=h.shape;const g=h.holes;lr.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];lr.isClockWise(x)===!0&&(g[p]=x.reverse())}const v=lr.triangulateShape(d,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];d=d.concat(x)}for(let p=0,m=d.length;p<m;p++){const x=d[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=v.length;p<m;p++){const x=v[p],S=x[0]+f,M=x[1]+f,A=x[2]+f;n.push(S,M,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Gm(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new ol(n,e.curveSegments)}}function Gm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function Is(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=Is(i[t]);for(const s in n)e[s]=n[s]}return e}function Wm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Xm={clone:Is,merge:Kt};var $m=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Pr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$m,this.fragmentShader=qm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=Wm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ym extends Gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Km extends Pr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zm extends Pr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Jm extends Qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ia=new N,sa=new Os,Ln=new N;class jd extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ia,sa,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ia,sa,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ia,sa,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ia,sa,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const hi=new N,Ql=new Le,eu=new Le;class dn extends jd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bc*2*Math.atan(Math.tan(qa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Ql,eu),t.subVectors(eu,Ql)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Qd extends jd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jm extends Jm{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ls=-90,us=1;class Qm extends Qt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(ls,us,e,t);s.layers=this.layers,this.add(s);const r=new dn(ls,us,e,t);r.layers=this.layers,this.add(r);const a=new dn(ls,us,e,t);a.layers=this.layers,this.add(a);const o=new dn(ls,us,e,t);o.layers=this.layers,this.add(o);const c=new dn(ls,us,e,t);c.layers=this.layers,this.add(c);const l=new dn(ls,us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Pa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class eg extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const tu=new yt;class tg{constructor(e,t,n=0,s=1/0){this.ray=new Bd(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new nl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tu),this}intersectObject(e,t=!0,n=[]){return Cc(e,this,n,t),n.sort(nu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Cc(e[s],this,n,t);return n.sort(nu),n}}function nu(i,e){return i.distance-e.distance}function Cc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Cc(r[a],e,t,!0)}}function iu(i,e,t,n){const s=ng(n);switch(t){case Pd:return i*e;case Id:return i*e/s.components*s.byteLength;case Zc:return i*e/s.components*s.byteLength;case ws:return i*e*2/s.components*s.byteLength;case Jc:return i*e*2/s.components*s.byteLength;case Ld:return i*e*3/s.components*s.byteLength;case wn:return i*e*4/s.components*s.byteLength;case jc:return i*e*4/s.components*s.byteLength;case ga:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xa:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qo:case Ko:return Math.max(i,16)*Math.max(e,8)/4;case $o:case Yo:return Math.max(i,8)*Math.max(e,8)/2;case Zo:case Jo:case Qo:case ec:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jo:case tc:case nc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ic:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case rc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case cc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case lc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case uc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case dc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case pc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case gc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vc:case xc:case _c:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Sc:case yc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Mc:case Ec:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ng(i){switch(i){case fn:case Ad:return{byteLength:1,components:1};case xr:case wd:case ii:return{byteLength:2,components:1};case Yc:case Kc:return{byteLength:2,components:4};case Hn:case qc:case Fn:return{byteLength:4,components:1};case Cd:case Rd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$c}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$c);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ef(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ig(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const v=f[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var sg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ag=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ug=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_g=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,wg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ug="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ng=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$g=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,r0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,h0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,x0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,S0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,M0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,A0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,w0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,R0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,I0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,D0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,H0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Y0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,j0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,av=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ov=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_v=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Av=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Iv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:sg,alphahash_pars_fragment:rg,alphamap_fragment:ag,alphamap_pars_fragment:og,alphatest_fragment:cg,alphatest_pars_fragment:lg,aomap_fragment:ug,aomap_pars_fragment:dg,batching_pars_vertex:fg,batching_vertex:hg,begin_vertex:pg,beginnormal_vertex:mg,bsdfs:gg,iridescence_fragment:vg,bumpmap_pars_fragment:xg,clipping_planes_fragment:_g,clipping_planes_pars_fragment:Sg,clipping_planes_pars_vertex:yg,clipping_planes_vertex:Mg,color_fragment:Eg,color_pars_fragment:bg,color_pars_vertex:Tg,color_vertex:Ag,common:wg,cube_uv_reflection_fragment:Cg,defaultnormal_vertex:Rg,displacementmap_pars_vertex:Pg,displacementmap_vertex:Lg,emissivemap_fragment:Ig,emissivemap_pars_fragment:Dg,colorspace_fragment:Ug,colorspace_pars_fragment:Ng,envmap_fragment:Fg,envmap_common_pars_fragment:Og,envmap_pars_fragment:Bg,envmap_pars_vertex:kg,envmap_physical_pars_fragment:Zg,envmap_vertex:zg,fog_vertex:Vg,fog_pars_vertex:Hg,fog_fragment:Gg,fog_pars_fragment:Wg,gradientmap_pars_fragment:Xg,lightmap_pars_fragment:$g,lights_lambert_fragment:qg,lights_lambert_pars_fragment:Yg,lights_pars_begin:Kg,lights_toon_fragment:Jg,lights_toon_pars_fragment:jg,lights_phong_fragment:Qg,lights_phong_pars_fragment:e0,lights_physical_fragment:t0,lights_physical_pars_fragment:n0,lights_fragment_begin:i0,lights_fragment_maps:s0,lights_fragment_end:r0,logdepthbuf_fragment:a0,logdepthbuf_pars_fragment:o0,logdepthbuf_pars_vertex:c0,logdepthbuf_vertex:l0,map_fragment:u0,map_pars_fragment:d0,map_particle_fragment:f0,map_particle_pars_fragment:h0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:v0,morphnormal_vertex:x0,morphtarget_pars_vertex:_0,morphtarget_vertex:S0,normal_fragment_begin:y0,normal_fragment_maps:M0,normal_pars_fragment:E0,normal_pars_vertex:b0,normal_vertex:T0,normalmap_pars_fragment:A0,clearcoat_normal_fragment_begin:w0,clearcoat_normal_fragment_maps:C0,clearcoat_pars_fragment:R0,iridescence_pars_fragment:P0,opaque_fragment:L0,packing:I0,premultiplied_alpha_fragment:D0,project_vertex:U0,dithering_fragment:N0,dithering_pars_fragment:F0,roughnessmap_fragment:O0,roughnessmap_pars_fragment:B0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:z0,shadowmap_vertex:V0,shadowmask_pars_fragment:H0,skinbase_vertex:G0,skinning_pars_vertex:W0,skinning_vertex:X0,skinnormal_vertex:$0,specularmap_fragment:q0,specularmap_pars_fragment:Y0,tonemapping_fragment:K0,tonemapping_pars_fragment:Z0,transmission_fragment:J0,transmission_pars_fragment:j0,uv_pars_fragment:Q0,uv_pars_vertex:ev,uv_vertex:tv,worldpos_vertex:nv,background_vert:iv,background_frag:sv,backgroundCube_vert:rv,backgroundCube_frag:av,cube_vert:ov,cube_frag:cv,depth_vert:lv,depth_frag:uv,distance_vert:dv,distance_frag:fv,equirect_vert:hv,equirect_frag:pv,linedashed_vert:mv,linedashed_frag:gv,meshbasic_vert:vv,meshbasic_frag:xv,meshlambert_vert:_v,meshlambert_frag:Sv,meshmatcap_vert:yv,meshmatcap_frag:Mv,meshnormal_vert:Ev,meshnormal_frag:bv,meshphong_vert:Tv,meshphong_frag:Av,meshphysical_vert:wv,meshphysical_frag:Cv,meshtoon_vert:Rv,meshtoon_frag:Pv,points_vert:Lv,points_frag:Iv,shadow_vert:Dv,shadow_frag:Uv,sprite_vert:Nv,sprite_frag:Fv},pe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Un={basic:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Kt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Kt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Kt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Kt([pe.points,pe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Kt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Kt([pe.common,pe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Kt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Kt([pe.sprite,pe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Kt([pe.common,pe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Kt([pe.lights,pe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Un.physical={uniforms:Kt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ra={r:0,b:0,g:0},Pi=new ri,Ov=new yt;function Bv(i,e,t,n,s,r){const a=new Ke(0);let o=s===!0?0:1,c,l,u=null,f=0,h=null;function d(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const M=x.backgroundBlurriness>0;S=e.get(S,M)}return S}function g(x){let S=!1;const M=d(x);M===null?p(a,o):M&&M.isColor&&(p(M,1),S=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,S){const M=d(S);M&&(M.isCubeTexture||M.mapping===Na)?(l===void 0&&(l=new Yt(new Lr(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Is(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),Pi.copy(S.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ov.makeRotationFromEuler(Pi)),l.material.toneMapped=je.getTransfer(M.colorSpace)!==st,(u!==M||f!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Yt(new Ls(2,2),new Gn({name:"BackgroundMaterial",uniforms:Is(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=je.getTransfer(M.colorSpace)!==st,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,S){x.getRGB(ra,Jd(i)),t.buffers.color.setClear(ra.r,ra.g,ra.b,S,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,S=1){a.set(x),o=S,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:v,dispose:m}}function kv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(P,k,V,H,O){let G=!1;const F=f(P,H,V,k);r!==F&&(r=F,l(r.object)),G=d(P,H,V,O),G&&g(P,H,V,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(P,k,V,H),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function u(P){return i.deleteVertexArray(P)}function f(P,k,V,H){const O=H.wireframe===!0;let G=n[k.id];G===void 0&&(G={},n[k.id]=G);const F=P.isInstancedMesh===!0?P.id:0;let te=G[F];te===void 0&&(te={},G[F]=te);let ee=te[V.id];ee===void 0&&(ee={},te[V.id]=ee);let de=ee[O];return de===void 0&&(de=h(c()),ee[O]=de),de}function h(P){const k=[],V=[],H=[];for(let O=0;O<t;O++)k[O]=0,V[O]=0,H[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:H,object:P,attributes:{},index:null}}function d(P,k,V,H){const O=r.attributes,G=k.attributes;let F=0;const te=V.getAttributes();for(const ee in te)if(te[ee].location>=0){const fe=O[ee];let _e=G[ee];if(_e===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(_e=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(_e=P.instanceColor)),fe===void 0||fe.attribute!==_e||_e&&fe.data!==_e.data)return!0;F++}return r.attributesNum!==F||r.index!==H}function g(P,k,V,H){const O={},G=k.attributes;let F=0;const te=V.getAttributes();for(const ee in te)if(te[ee].location>=0){let fe=G[ee];fe===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor));const _e={};_e.attribute=fe,fe&&fe.data&&(_e.data=fe.data),O[ee]=_e,F++}r.attributes=O,r.attributesNum=F,r.index=H}function v(){const P=r.newAttributes;for(let k=0,V=P.length;k<V;k++)P[k]=0}function p(P){m(P,0)}function m(P,k){const V=r.newAttributes,H=r.enabledAttributes,O=r.attributeDivisors;V[P]=1,H[P]===0&&(i.enableVertexAttribArray(P),H[P]=1),O[P]!==k&&(i.vertexAttribDivisor(P,k),O[P]=k)}function x(){const P=r.newAttributes,k=r.enabledAttributes;for(let V=0,H=k.length;V<H;V++)k[V]!==P[V]&&(i.disableVertexAttribArray(V),k[V]=0)}function S(P,k,V,H,O,G,F){F===!0?i.vertexAttribIPointer(P,k,V,O,G):i.vertexAttribPointer(P,k,V,H,O,G)}function M(P,k,V,H){v();const O=H.attributes,G=V.getAttributes(),F=k.defaultAttributeValues;for(const te in G){const ee=G[te];if(ee.location>=0){let de=O[te];if(de===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),de!==void 0){const fe=de.normalized,_e=de.itemSize,ke=e.get(de);if(ke===void 0)continue;const nt=ke.buffer,at=ke.type,q=ke.bytesPerElement,ae=at===i.INT||at===i.UNSIGNED_INT||de.gpuType===qc;if(de.isInterleavedBufferAttribute){const ce=de.data,Oe=ce.stride,Ue=de.offset;if(ce.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ee.locationSize;Ne++)m(ee.location+Ne,ce.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ne=0;Ne<ee.locationSize;Ne++)p(ee.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Ne=0;Ne<ee.locationSize;Ne++)S(ee.location+Ne,_e/ee.locationSize,at,fe,Oe*q,(Ue+_e/ee.locationSize*Ne)*q,ae)}else{if(de.isInstancedBufferAttribute){for(let ce=0;ce<ee.locationSize;ce++)m(ee.location+ce,de.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ce=0;ce<ee.locationSize;ce++)p(ee.location+ce);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let ce=0;ce<ee.locationSize;ce++)S(ee.location+ce,_e/ee.locationSize,at,fe,_e*q,_e/ee.locationSize*ce*q,ae)}}else if(F!==void 0){const fe=F[te];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(ee.location,fe);break;case 3:i.vertexAttrib3fv(ee.location,fe);break;case 4:i.vertexAttrib4fv(ee.location,fe);break;default:i.vertexAttrib1fv(ee.location,fe)}}}}x()}function A(){T();for(const P in n){const k=n[P];for(const V in k){const H=k[V];for(const O in H){const G=H[O];for(const F in G)u(G[F].object),delete G[F];delete H[O]}}delete n[P]}}function w(P){if(n[P.id]===void 0)return;const k=n[P.id];for(const V in k){const H=k[V];for(const O in H){const G=H[O];for(const F in G)u(G[F].object),delete G[F];delete H[O]}}delete n[P.id]}function C(P){for(const k in n){const V=n[k];for(const H in V){const O=V[H];if(O[P.id]===void 0)continue;const G=O[P.id];for(const F in G)u(G[F].object),delete G[F];delete O[P.id]}}}function y(P){for(const k in n){const V=n[k],H=P.isInstancedMesh===!0?P.id:0,O=V[H];if(O!==void 0){for(const G in O){const F=O[G];for(const te in F)u(F[te].object),delete F[te];delete O[G]}delete V[H],Object.keys(V).length===0&&delete n[k]}}}function T(){X(),a=!0,r!==s&&(r=s,l(r.object))}function X(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:X,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function zv(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),t.update(u,n,f))}function o(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function c(l,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Vv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==wn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const y=C===ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==fn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Fn&&!y)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:M,maxSamples:A,samples:w}}function Hv(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ui,o=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const x=r?0:n,S=x*4;let M=m.clippingState||null;c.value=M,M=u(g,h,S,d);for(let A=0;A!==S;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=d+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let S=0,M=d;S!==v;++S,M+=4)a.copy(f[S]).applyMatrix4(x,o),a.normal.toArray(p,M),p[M+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}const yi=4,su=[.125,.215,.35,.446,.526,.582],Oi=20,Gv=256,Xs=new Qd,ru=new Ke;let yo=null,Mo=0,Eo=0,bo=!1;const Wv=new N;class au{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Wv}=r;yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yo,Mo,Eo),this._renderer.xr.enabled=bo,e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$i||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:ii,format:wn,colorSpace:Cs,depthBuffer:!1},s=ou(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ou(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Xv(r)),this._blurMaterial=qv(r,e,t),this._ggxMaterial=$v(r,e,t)}return s}_compileMaterial(e){const t=new Yt(new gn,e);this._renderer.compile(t,Xs)}_sceneToCubeUV(e,t,n,s,r){const c=new dn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(ru),f.toneMapping=kn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yt(new Lr,new Rs({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let m=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(ru),m=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[S],r.y,r.z)):M===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[S]));const A=this._cubeSize;ds(s,M*A,S>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(v,c),f.render(e,c)}f.toneMapping=d,f.autoClear=h,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===$i||e.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=lu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ds(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Xs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,d=f*h,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-yi?n-g+yi:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=g-t,ds(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(o,Xs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,ds(e,p,m,3*v,2*v),s.setRenderTarget(e),s.render(o,Xs)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Oi-1),v=r/g,p=isFinite(r)?1+Math.floor(u*v):Oi;p>Oi&&Be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Oi}`);const m=[];let x=0;for(let C=0;C<Oi;++C){const y=C/v,T=Math.exp(-y*y/2);m.push(T),C===0?x+=T:C<p&&(x+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/x;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-n;const M=this._sizeLods[s],A=3*M*(s>S-yi?s-S+yi:0),w=4*(this._cubeSize-M);ds(t,A,w,3*M,2*M),c.setRenderTarget(t),c.render(f,Xs)}}function Xv(i){const e=[],t=[],n=[];let s=i;const r=i-yi+1+su.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-yi?c=su[a-i+yi-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,v=3,p=2,m=1,x=new Float32Array(v*g*d),S=new Float32Array(p*g*d),M=new Float32Array(m*g*d);for(let w=0;w<d;w++){const C=w%3*2/3-1,y=w>2?0:-1,T=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];x.set(T,v*g*w),S.set(h,p*g*w);const X=[w,w,w,w,w,w];M.set(X,m*g*w)}const A=new gn;A.setAttribute("position",new en(x,v)),A.setAttribute("uv",new en(S,p)),A.setAttribute("faceIndex",new en(M,m)),n.push(new Yt(A,null)),s>yi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function ou(i,e,t){const n=new zn(i,e,t);return n.texture.mapping=Na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ds(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function $v(i,e,t){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function qv(i,e,t){const n=new Float32Array(Oi),s=new N(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function cu(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function lu(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Fa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class tf extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new zd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Lr(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:ti});r.uniforms.tEquirect.value=t;const a=new Yt(s,r),o=t.minFilter;return t.minFilter===zi&&(t.minFilter=Xt),new Qm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Yv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Wa||d===Xa)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new tf(g.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",l),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,g=d===Wa||d===Xa,v=d===$i||d===As;if(g||v){let p=t.get(h);const m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new au(i)),p=g?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{const x=h.image;return g&&x&&x.height>0||v&&x&&c(x)?(n===null&&(n=new au(i)),p=g?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,d){return d===Wa?h.mapping=$i:d===Xa&&(h.mapping=As),h}function c(h){let d=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&d++;return d===g}function l(h){const d=h.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Kv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ia("WebGLRenderer: "+n+" extension not supported."),s}}}function Zv(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const d=r.get(h);d&&(e.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const x=d.array;v=d.version;for(let S=0,M=x.length;S<M;S+=3){const A=x[S+0],w=x[S+1],C=x[S+2];h.push(A,w,w,C,C,A)}}else{const x=g.array;v=g.version;for(let S=0,M=x.length/3-1;S<M;S+=3){const A=S+0,w=S+1,C=S+2;h.push(A,w,w,C,C,A)}}const p=new(g.count>=65535?Od:Fd)(h,1);p.version=v;const m=r.get(f);m&&e.remove(m),r.set(f,p)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Jv(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,d){i.drawElements(n,d,r,h*a),t.update(d,n,1)}function l(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,h*a,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];t.update(p,n,1)}function f(h,d,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)l(h[m]/a,d[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,h,0,v,0,g);let m=0;for(let x=0;x<g;x++)m+=d[x]*v[x];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function jv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Qv(i,e,t){const n=new WeakMap,s=new bt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let X=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",X)};var d=X;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),p===!0&&(M=3);let A=o.attributes.position.count*M,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*w*4*f),y=new Ud(C,A,w,f);y.type=Fn,y.needsUpdate=!0;const T=M*4;for(let P=0;P<f;P++){const k=m[P],V=x[P],H=S[P],O=A*w*4*P;for(let G=0;G<k.count;G++){const F=G*T;g===!0&&(s.fromBufferAttribute(k,G),C[O+F+0]=s.x,C[O+F+1]=s.y,C[O+F+2]=s.z,C[O+F+3]=0),v===!0&&(s.fromBufferAttribute(V,G),C[O+F+4]=s.x,C[O+F+5]=s.y,C[O+F+6]=s.z,C[O+F+7]=0),p===!0&&(s.fromBufferAttribute(H,G),C[O+F+8]=s.x,C[O+F+9]=s.y,C[O+F+10]=s.z,C[O+F+11]=H.itemSize===4?s.w:1)}}h={count:f,texture:y,size:new Le(A,w)},n.set(o,h),o.addEventListener("dispose",X)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function ex(i,e,t,n,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const tx={[xd]:"LINEAR_TONE_MAPPING",[_d]:"REINHARD_TONE_MAPPING",[Sd]:"CINEON_TONE_MAPPING",[yd]:"ACES_FILMIC_TONE_MAPPING",[Ed]:"AGX_TONE_MAPPING",[bd]:"NEUTRAL_TONE_MAPPING",[Md]:"CUSTOM_TONE_MAPPING"};function nx(i,e,t,n,s){const r=new zn(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),a=new zn(e,t,{type:ii,depthBuffer:!1,stencilBuffer:!1}),o=new gn;o.setAttribute("position",new pn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new pn([0,2,0,0,2,0],2));const c=new Ym({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Yt(o,c),u=new Qd(-1,1,1,-1,0,1);let f=null,h=null,d=!1,g,v=null,p=[],m=!1;this.setSize=function(x,S){r.setSize(x,S),a.setSize(x,S);for(let M=0;M<p.length;M++){const A=p[M];A.setSize&&A.setSize(x,S)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const S=r.width,M=r.height;for(let A=0;A<p.length;A++){const w=p[A];w.setSize&&w.setSize(S,M)}},this.begin=function(x,S){if(d||x.toneMapping===kn&&p.length===0)return!1;if(v=S,S!==null){const M=S.width,A=S.height;(r.width!==M||r.height!==A)&&this.setSize(M,A)}return m===!1&&x.setRenderTarget(r),g=x.toneMapping,x.toneMapping=kn,!0},this.hasRenderPass=function(){return m},this.end=function(x,S){x.toneMapping=g,d=!0;let M=r,A=a;for(let w=0;w<p.length;w++){const C=p[w];if(C.enabled!==!1&&(C.render(x,A,M,S),C.needsSwap!==!1)){const y=M;M=A,A=y}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,c.defines={},je.getTransfer(f)===st&&(c.defines.SRGB_TRANSFER="");const w=tx[h];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(v),x.render(l,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const nf=new Vt,Rc=new Sr(1,1),sf=new Ud,rf=new qp,af=new zd,uu=[],du=[],fu=new Float32Array(16),hu=new Float32Array(9),pu=new Float32Array(4);function Bs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uu[s];if(r===void 0&&(r=new Float32Array(s),uu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Oa(i,e){let t=du[e];t===void 0&&(t=new Int32Array(e),du[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ix(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function ox(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;pu.set(n),i.uniformMatrix2fv(this.addr,!1,pu),Dt(t,n)}}function cx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;hu.set(n),i.uniformMatrix3fv(this.addr,!1,hu),Dt(t,n)}}function lx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(It(t,n))return;fu.set(n),i.uniformMatrix4fv(this.addr,!1,fu),Dt(t,n)}}function ux(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function fx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function px(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function vx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function xx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Rc.compareFunction=t.isReversedDepthBuffer()?el:Qc,r=Rc):r=nf,t.setTexture2D(e||r,s)}function _x(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||rf,s)}function Sx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||af,s)}function yx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||sf,s)}function Mx(i){switch(i){case 5126:return ix;case 35664:return sx;case 35665:return rx;case 35666:return ax;case 35674:return ox;case 35675:return cx;case 35676:return lx;case 5124:case 35670:return ux;case 35667:case 35671:return dx;case 35668:case 35672:return fx;case 35669:case 35673:return hx;case 5125:return px;case 36294:return mx;case 36295:return gx;case 36296:return vx;case 35678:case 36198:case 36298:case 36306:case 35682:return xx;case 35679:case 36299:case 36307:return _x;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return yx}}function Ex(i,e){i.uniform1fv(this.addr,e)}function bx(i,e){const t=Bs(e,this.size,2);i.uniform2fv(this.addr,t)}function Tx(i,e){const t=Bs(e,this.size,3);i.uniform3fv(this.addr,t)}function Ax(i,e){const t=Bs(e,this.size,4);i.uniform4fv(this.addr,t)}function wx(i,e){const t=Bs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cx(i,e){const t=Bs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rx(i,e){const t=Bs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Px(i,e){i.uniform1iv(this.addr,e)}function Lx(i,e){i.uniform2iv(this.addr,e)}function Ix(i,e){i.uniform3iv(this.addr,e)}function Dx(i,e){i.uniform4iv(this.addr,e)}function Ux(i,e){i.uniform1uiv(this.addr,e)}function Nx(i,e){i.uniform2uiv(this.addr,e)}function Fx(i,e){i.uniform3uiv(this.addr,e)}function Ox(i,e){i.uniform4uiv(this.addr,e)}function Bx(i,e,t){const n=this.cache,s=e.length,r=Oa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Rc:a=nf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function kx(i,e,t){const n=this.cache,s=e.length,r=Oa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||rf,r[a])}function zx(i,e,t){const n=this.cache,s=e.length,r=Oa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||af,r[a])}function Vx(i,e,t){const n=this.cache,s=e.length,r=Oa(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Dt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||sf,r[a])}function Hx(i){switch(i){case 5126:return Ex;case 35664:return bx;case 35665:return Tx;case 35666:return Ax;case 35674:return wx;case 35675:return Cx;case 35676:return Rx;case 5124:case 35670:return Px;case 35667:case 35671:return Lx;case 35668:case 35672:return Ix;case 35669:case 35673:return Dx;case 5125:return Ux;case 36294:return Nx;case 36295:return Fx;case 36296:return Ox;case 35678:case 36198:case 36298:case 36306:case 35682:return Bx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return zx;case 36289:case 36303:case 36311:case 36292:return Vx}}class Gx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Mx(t.type)}}class Wx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hx(t.type)}}class Xx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const To=/(\w+)(\])?(\[|\.)?/g;function mu(i,e){i.seq.push(e),i.map[e.id]=e}function $x(i,e,t){const n=i.name,s=n.length;for(To.lastIndex=0;;){const r=To.exec(n),a=To.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){mu(t,l===void 0?new Gx(o,i,e):new Wx(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Xx(o),mu(t,f)),t=f}}}class Sa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);$x(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function gu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const qx=37297;let Yx=0;function Kx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const vu=new Ge;function Zx(i){je._getMatrix(vu,je.workingColorSpace,i);const e=`mat3( ${vu.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Ra:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Kx(i.getShaderSource(e),o)}else return r}function Jx(i,e){const t=Zx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jx={[xd]:"Linear",[_d]:"Reinhard",[Sd]:"Cineon",[yd]:"ACESFilmic",[Ed]:"AgX",[bd]:"Neutral",[Md]:"Custom"};function Qx(i,e){const t=jx[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const aa=new N;function e_(){je.getLuminanceCoefficients(aa);const i=aa.x.toFixed(4),e=aa.y.toFixed(4),t=aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function n_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function i_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function er(i){return i!==""}function _u(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Su(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const s_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(i){return i.replace(s_,a_)}const r_=new Map;function a_(i,e){let t=We[e];if(t===void 0){const n=r_.get(e);if(n!==void 0)t=We[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pc(t)}const o_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yu(i){return i.replace(o_,c_)}function c_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const l_={[ma]:"SHADOWMAP_TYPE_PCF",[Js]:"SHADOWMAP_TYPE_VSM"};function u_(i){return l_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const d_={[$i]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[Na]:"ENVMAP_TYPE_CUBE_UV"};function f_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":d_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const h_={[As]:"ENVMAP_MODE_REFRACTION"};function p_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":h_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m_={[vd]:"ENVMAP_BLENDING_MULTIPLY",[Tp]:"ENVMAP_BLENDING_MIX",[Ap]:"ENVMAP_BLENDING_ADD"};function g_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":m_[i.combine]||"ENVMAP_BLENDING_NONE"}function v_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function x_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=u_(t),l=f_(t),u=p_(t),f=g_(t),h=v_(t),d=t_(t),g=n_(r),v=s.createProgram();let p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),m.length>0&&(m+=`
`)):(p=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),m=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?We.tonemapping_pars_fragment:"",t.toneMapping!==kn?Qx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Jx("linearToOutputTexel",t.outputColorSpace),e_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),a=Pc(a),a=_u(a,t),a=Su(a,t),o=Pc(o),o=_u(o,t),o=Su(o,t),a=yu(a),o=yu(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=x+p+a,M=x+m+o,A=gu(s,s.VERTEX_SHADER,S),w=gu(s,s.FRAGMENT_SHADER,M);s.attachShader(v,A),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(P){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(A)||"",H=s.getShaderInfoLog(w)||"",O=k.trim(),G=V.trim(),F=H.trim();let te=!0,ee=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,w);else{const de=xu(s,A,"vertex"),fe=xu(s,w,"fragment");Je("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+de+`
`+fe)}else O!==""?Be("WebGLProgram: Program Info Log:",O):(G===""||F==="")&&(ee=!1);ee&&(P.diagnostics={runnable:te,programLog:O,vertexShader:{log:G,prefix:p},fragmentShader:{log:F,prefix:m}})}s.deleteShader(A),s.deleteShader(w),y=new Sa(s,v),T=i_(s,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=s.getProgramParameter(v,qx)),X},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=w,this}let __=0;class S_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new y_(e),t.set(e,n)),n}}class y_{constructor(e){this.id=__++,this.code=e,this.usedTimes=0}}function M_(i,e,t,n,s,r){const a=new nl,o=new S_,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,T,X,P,k){const V=P.fog,H=k.geometry,O=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,F=e.get(y.envMap||O,G),te=F&&F.mapping===Na?F.image.height:null,ee=d[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&Be("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const de=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,fe=de!==void 0?de.length:0;let _e=0;H.morphAttributes.position!==void 0&&(_e=1),H.morphAttributes.normal!==void 0&&(_e=2),H.morphAttributes.color!==void 0&&(_e=3);let ke,nt,at,q;if(ee){const it=Un[ee];ke=it.vertexShader,nt=it.fragmentShader}else ke=y.vertexShader,nt=y.fragmentShader,o.update(y),at=o.getVertexShaderID(y),q=o.getFragmentShaderID(y);const ae=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),Oe=k.isInstancedMesh===!0,Ue=k.isBatchedMesh===!0,Ne=!!y.map,xt=!!y.matcap,qe=!!F,Ze=!!y.aoMap,tt=!!y.lightMap,Ve=!!y.bumpMap,ot=!!y.normalMap,L=!!y.displacementMap,pt=!!y.emissiveMap,$=!!y.metalnessMap,Te=!!y.roughnessMap,he=y.anisotropy>0,b=y.clearcoat>0,_=y.dispersion>0,D=y.iridescence>0,Z=y.sheen>0,j=y.transmission>0,K=he&&!!y.anisotropyMap,ye=b&&!!y.clearcoatMap,re=b&&!!y.clearcoatNormalMap,Re=b&&!!y.clearcoatRoughnessMap,De=D&&!!y.iridescenceMap,ne=D&&!!y.iridescenceThicknessMap,ie=Z&&!!y.sheenColorMap,me=Z&&!!y.sheenRoughnessMap,le=!!y.specularMap,ue=!!y.specularColorMap,Fe=!!y.specularIntensityMap,I=j&&!!y.transmissionMap,oe=j&&!!y.thicknessMap,se=!!y.gradientMap,Se=!!y.alphaMap,Q=y.alphaTest>0,J=!!y.alphaHash,Ae=!!y.extensions;let ze=kn;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ze=i.toneMapping);const dt={shaderID:ee,shaderType:y.type,shaderName:y.name,vertexShader:ke,fragmentShader:nt,defines:y.defines,customVertexShaderID:at,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ue,batchingColor:Ue&&k._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&k.instanceColor!==null,instancingMorph:Oe&&k.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Cs,alphaToCoverage:!!y.alphaToCoverage,map:Ne,matcap:xt,envMap:qe,envMapMode:qe&&F.mapping,envMapCubeUVHeight:te,aoMap:Ze,lightMap:tt,bumpMap:Ve,normalMap:ot,displacementMap:L,emissiveMap:pt,normalMapObjectSpace:ot&&y.normalMapType===Pp,normalMapTangentSpace:ot&&y.normalMapType===Rp,metalnessMap:$,roughnessMap:Te,anisotropy:he,anisotropyMap:K,clearcoat:b,clearcoatMap:ye,clearcoatNormalMap:re,clearcoatRoughnessMap:Re,dispersion:_,iridescence:D,iridescenceMap:De,iridescenceThicknessMap:ne,sheen:Z,sheenColorMap:ie,sheenRoughnessMap:me,specularMap:le,specularColorMap:ue,specularIntensityMap:Fe,transmission:j,transmissionMap:I,thicknessMap:oe,gradientMap:se,opaque:y.transparent===!1&&y.blending===Ms&&y.alphaToCoverage===!1,alphaMap:Se,alphaTest:Q,alphaHash:J,combine:y.combine,mapUv:Ne&&g(y.map.channel),aoMapUv:Ze&&g(y.aoMap.channel),lightMapUv:tt&&g(y.lightMap.channel),bumpMapUv:Ve&&g(y.bumpMap.channel),normalMapUv:ot&&g(y.normalMap.channel),displacementMapUv:L&&g(y.displacementMap.channel),emissiveMapUv:pt&&g(y.emissiveMap.channel),metalnessMapUv:$&&g(y.metalnessMap.channel),roughnessMapUv:Te&&g(y.roughnessMap.channel),anisotropyMapUv:K&&g(y.anisotropyMap.channel),clearcoatMapUv:ye&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(y.sheenRoughnessMap.channel),specularMapUv:le&&g(y.specularMap.channel),specularColorMapUv:ue&&g(y.specularColorMap.channel),specularIntensityMapUv:Fe&&g(y.specularIntensityMap.channel),transmissionMapUv:I&&g(y.transmissionMap.channel),thicknessMapUv:oe&&g(y.thicknessMap.channel),alphaMapUv:Se&&g(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ot||he),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!H.attributes.uv&&(Ne||Se),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||H.attributes.normal===void 0&&ot===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ce,skinning:k.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:_e,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&X.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ne&&y.map.isVideoTexture===!0&&je.getTransfer(y.map.colorSpace)===st,decodeVideoTextureEmissive:pt&&y.emissiveMap.isVideoTexture===!0&&je.getTransfer(y.emissiveMap.colorSpace)===st,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===bn,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ae&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&y.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function p(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const X in y.defines)T.push(X),T.push(y.defines[X]);return y.isRawShaderMaterial===!1&&(m(T,y),x(T,y),T.push(i.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function m(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function x(y,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),y.push(a.mask)}function S(y){const T=d[y.type];let X;if(T){const P=Un[T];X=Xm.clone(P.uniforms)}else X=y.uniforms;return X}function M(y,T){let X=u.get(T);return X!==void 0?++X.usedTimes:(X=new x_(i,T,y,s),l.push(X),u.set(T,X)),X}function A(y){if(--y.usedTimes===0){const T=l.indexOf(y);l[T]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:S,acquireProgram:M,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:C}}function E_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function b_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Eu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,g,v,p,m){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:m},i[e]=x):(x.id=h.id,x.object=h,x.geometry=d,x.material=g,x.materialVariant=a(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=p,x.group=m),e++,x}function c(h,d,g,v,p,m){const x=o(h,d,g,v,p,m);g.transmission>0?n.push(x):g.transparent===!0?s.push(x):t.push(x)}function l(h,d,g,v,p,m){const x=o(h,d,g,v,p,m);g.transmission>0?n.unshift(x):g.transparent===!0?s.unshift(x):t.unshift(x)}function u(h,d){t.length>1&&t.sort(h||b_),n.length>1&&n.sort(d||Eu),s.length>1&&s.sort(d||Eu)}function f(){for(let h=e,d=i.length;h<d;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function T_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new bu,i.set(n,[a])):s>=r.length?(a=new bu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ke};break;case"SpotLight":t={position:new N,direction:new N,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function w_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let C_=0;function R_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function P_(i){const e=new A_,t=w_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new yt,a=new yt;function o(l){let u=0,f=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,x=0,S=0,M=0,A=0,w=0,C=0;l.sort(R_);for(let T=0,X=l.length;T<X;T++){const P=l[T],k=P.color,V=P.intensity,H=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ws?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=k.r*V,f+=k.g*V,h+=k.b*V;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],V);C++}else if(P.isDirectionalLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const F=P.shadow,te=t.get(P);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,n.directionalShadow[d]=te,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=P.shadow.matrix,x++}n.directional[d]=G,d++}else if(P.isSpotLight){const G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(k).multiplyScalar(V),G.distance=H,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[v]=G;const F=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,F.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[v]=F.matrix,P.castShadow){const te=t.get(P);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,n.spotShadow[v]=te,n.spotShadowMap[v]=O,M++}v++}else if(P.isRectAreaLight){const G=e.get(P);G.color.copy(k).multiplyScalar(V),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=G,p++}else if(P.isPointLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const F=P.shadow,te=t.get(P);te.shadowIntensity=F.intensity,te.shadowBias=F.bias,te.shadowNormalBias=F.normalBias,te.shadowRadius=F.radius,te.shadowMapSize=F.mapSize,te.shadowCameraNear=F.camera.near,te.shadowCameraFar=F.camera.far,n.pointShadow[g]=te,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=G,g++}else if(P.isHemisphereLight){const G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(V),G.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[m]=G,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const y=n.hash;(y.directionalLength!==d||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==x||y.numPointShadows!==S||y.numSpotShadows!==M||y.numSpotMaps!==A||y.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,y.directionalLength=d,y.pointLength=g,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=x,y.numPointShadows=S,y.numSpotShadows=M,y.numSpotMaps=A,y.numLightProbes=C,n.version=C_++)}function c(l,u){let f=0,h=0,d=0,g=0,v=0;const p=u.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const S=l[m];if(S.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),f++}else if(S.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(S.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(p),h++}else if(S.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(p),v++}}}return{setup:o,setupView:c,state:n}}function Tu(i){const e=new P_(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function L_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Tu(i),e.set(s,[o])):r>=a.length?(o=new Tu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,U_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],N_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Au=new yt,$s=new N,Ao=new N;function F_(i,e,t){let n=new kd;const s=new Le,r=new Le,a=new bt,o=new Km,c=new Zm,l={},u=t.maxTextureSize,f={[Ei]:jt,[jt]:Ei,[bn]:bn},h=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:I_,fragmentShader:D_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new gn;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Yt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ma;let m=this.type;this.render=function(w,C,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===ap&&(Be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ma);const T=i.getRenderTarget(),X=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(ti),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const V=m!==this.type;V&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(O=>O.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,O=w.length;H<O;H++){const G=w[H],F=G.shadow;if(F===void 0){Be("WebGLShadowMap:",G,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const te=F.getFrameExtents();s.multiply(te),r.copy(F.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,F.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,F.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=ee,F.map===null||V===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Js){if(G.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new zn(s.x,s.y,{format:ws,type:ii,minFilter:Xt,magFilter:Xt,generateMipmaps:!1}),F.map.texture.name=G.name+".shadowMap",F.map.depthTexture=new Sr(s.x,s.y,Fn),F.map.depthTexture.name=G.name+".shadowMapDepth",F.map.depthTexture.format=si,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Tt,F.map.depthTexture.magFilter=Tt}else G.isPointLight?(F.map=new tf(s.x),F.map.depthTexture=new dm(s.x,Hn)):(F.map=new zn(s.x,s.y),F.map.depthTexture=new Sr(s.x,s.y,Hn)),F.map.depthTexture.name=G.name+".shadowMap",F.map.depthTexture.format=si,this.type===ma?(F.map.depthTexture.compareFunction=ee?el:Qc,F.map.depthTexture.minFilter=Xt,F.map.depthTexture.magFilter=Xt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Tt,F.map.depthTexture.magFilter=Tt);F.camera.updateProjectionMatrix()}const de=F.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<de;fe++){if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(F.map),i.clear());const _e=F.getViewport(fe);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),k.viewport(a)}if(G.isPointLight){const _e=F.camera,ke=F.matrix,nt=G.distance||_e.far;nt!==_e.far&&(_e.far=nt,_e.updateProjectionMatrix()),$s.setFromMatrixPosition(G.matrixWorld),_e.position.copy($s),Ao.copy(_e.position),Ao.add(U_[fe]),_e.up.copy(N_[fe]),_e.lookAt(Ao),_e.updateMatrixWorld(),ke.makeTranslation(-$s.x,-$s.y,-$s.z),Au.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Au,_e.coordinateSystem,_e.reversedDepth)}else F.updateMatrices(G);n=F.getFrustum(),M(C,y,F.camera,G,this.type)}F.isPointLightShadow!==!0&&this.type===Js&&x(F,y),F.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(T,X,P)};function x(w,C){const y=e.update(v);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new zn(s.x,s.y,{format:ws,type:ii})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,y,h,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,y,d,v,null)}function S(w,C,y,T){let X=null;const P=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)X=P;else if(X=y.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=X.uuid,V=C.uuid;let H=l[k];H===void 0&&(H={},l[k]=H);let O=H[V];O===void 0&&(O=X.clone(),H[V]=O,C.addEventListener("dispose",A)),X=O}if(X.visible=C.visible,X.wireframe=C.wireframe,T===Js?X.side=C.shadowSide!==null?C.shadowSide:C.side:X.side=C.shadowSide!==null?C.shadowSide:f[C.side],X.alphaMap=C.alphaMap,X.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,X.map=C.map,X.clipShadows=C.clipShadows,X.clippingPlanes=C.clippingPlanes,X.clipIntersection=C.clipIntersection,X.displacementMap=C.displacementMap,X.displacementScale=C.displacementScale,X.displacementBias=C.displacementBias,X.wireframeLinewidth=C.wireframeLinewidth,X.linewidth=C.linewidth,y.isPointLight===!0&&X.isMeshDistanceMaterial===!0){const k=i.properties.get(X);k.light=y}return X}function M(w,C,y,T,X){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&X===Js)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const V=e.update(w),H=w.material;if(Array.isArray(H)){const O=V.groups;for(let G=0,F=O.length;G<F;G++){const te=O[G],ee=H[te.materialIndex];if(ee&&ee.visible){const de=S(w,ee,T,X);w.onBeforeShadow(i,w,C,y,V,de,te),i.renderBufferDirect(y,null,V,de,w,te),w.onAfterShadow(i,w,C,y,V,de,te)}}}else if(H.visible){const O=S(w,H,T,X);w.onBeforeShadow(i,w,C,y,V,O,null),i.renderBufferDirect(y,null,V,O,w,null),w.onAfterShadow(i,w,C,y,V,O,null)}}const k=w.children;for(let V=0,H=k.length;V<H;V++)M(k[V],C,y,T,X)}function A(w){w.target.removeEventListener("dispose",A);for(const y in l){const T=l[y],X=w.target.uuid;X in T&&(T[X].dispose(),delete T[X])}}}function O_(i,e){function t(){let I=!1;const oe=new bt;let se=null;const Se=new bt(0,0,0,0);return{setMask:function(Q){se!==Q&&!I&&(i.colorMask(Q,Q,Q,Q),se=Q)},setLocked:function(Q){I=Q},setClear:function(Q,J,Ae,ze,dt){dt===!0&&(Q*=ze,J*=ze,Ae*=ze),oe.set(Q,J,Ae,ze),Se.equals(oe)===!1&&(i.clearColor(Q,J,Ae,ze),Se.copy(oe))},reset:function(){I=!1,se=null,Se.set(-1,0,0,0)}}}function n(){let I=!1,oe=!1,se=null,Se=null,Q=null;return{setReversed:function(J){if(oe!==J){const Ae=e.get("EXT_clip_control");J?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),oe=J;const ze=Q;Q=null,this.setClear(ze)}},getReversed:function(){return oe},setTest:function(J){J?ae(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(J){se!==J&&!I&&(i.depthMask(J),se=J)},setFunc:function(J){if(oe&&(J=zp[J]),Se!==J){switch(J){case Bo:i.depthFunc(i.NEVER);break;case ko:i.depthFunc(i.ALWAYS);break;case zo:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case Vo:i.depthFunc(i.EQUAL);break;case Ho:i.depthFunc(i.GEQUAL);break;case Go:i.depthFunc(i.GREATER);break;case Wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=J}},setLocked:function(J){I=J},setClear:function(J){Q!==J&&(Q=J,oe&&(J=1-J),i.clearDepth(J))},reset:function(){I=!1,se=null,Se=null,Q=null,oe=!1}}}function s(){let I=!1,oe=null,se=null,Se=null,Q=null,J=null,Ae=null,ze=null,dt=null;return{setTest:function(it){I||(it?ae(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(it){oe!==it&&!I&&(i.stencilMask(it),oe=it)},setFunc:function(it,Xn,$n){(se!==it||Se!==Xn||Q!==$n)&&(i.stencilFunc(it,Xn,$n),se=it,Se=Xn,Q=$n)},setOp:function(it,Xn,$n){(J!==it||Ae!==Xn||ze!==$n)&&(i.stencilOp(it,Xn,$n),J=it,Ae=Xn,ze=$n)},setLocked:function(it){I=it},setClear:function(it){dt!==it&&(i.clearStencil(it),dt=it)},reset:function(){I=!1,oe=null,se=null,Se=null,Q=null,J=null,Ae=null,ze=null,dt=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,v=!1,p=null,m=null,x=null,S=null,M=null,A=null,w=null,C=new Ke(0,0,0),y=0,T=!1,X=null,P=null,k=null,V=null,H=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,F=0;const te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(te)[1]),G=F>=1):te.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),G=F>=2);let ee=null,de={};const fe=i.getParameter(i.SCISSOR_BOX),_e=i.getParameter(i.VIEWPORT),ke=new bt().fromArray(fe),nt=new bt().fromArray(_e);function at(I,oe,se,Se){const Q=new Uint8Array(4),J=i.createTexture();i.bindTexture(I,J),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ae=0;Ae<se;Ae++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(oe+Ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return J}const q={};q[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(Ts),Ve(!1),ot(Tl),ae(i.CULL_FACE),Ze(ti);function ae(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function ce(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Oe(I,oe){return f[I]!==oe?(i.bindFramebuffer(I,oe),f[I]=oe,I===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=oe),I===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ue(I,oe){let se=d,Se=!1;if(I){se=h.get(oe),se===void 0&&(se=[],h.set(oe,se));const Q=I.textures;if(se.length!==Q.length||se[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Ae=Q.length;J<Ae;J++)se[J]=i.COLOR_ATTACHMENT0+J;se.length=Q.length,Se=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,Se=!0);Se&&i.drawBuffers(se)}function Ne(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const xt={[Fi]:i.FUNC_ADD,[cp]:i.FUNC_SUBTRACT,[lp]:i.FUNC_REVERSE_SUBTRACT};xt[up]=i.MIN,xt[dp]=i.MAX;const qe={[fp]:i.ZERO,[hp]:i.ONE,[pp]:i.SRC_COLOR,[Fo]:i.SRC_ALPHA,[Sp]:i.SRC_ALPHA_SATURATE,[xp]:i.DST_COLOR,[gp]:i.DST_ALPHA,[mp]:i.ONE_MINUS_SRC_COLOR,[Oo]:i.ONE_MINUS_SRC_ALPHA,[_p]:i.ONE_MINUS_DST_COLOR,[vp]:i.ONE_MINUS_DST_ALPHA,[yp]:i.CONSTANT_COLOR,[Mp]:i.ONE_MINUS_CONSTANT_COLOR,[Ep]:i.CONSTANT_ALPHA,[bp]:i.ONE_MINUS_CONSTANT_ALPHA};function Ze(I,oe,se,Se,Q,J,Ae,ze,dt,it){if(I===ti){v===!0&&(ce(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),I!==op){if(I!==p||it!==T){if((m!==Fi||M!==Fi)&&(i.blendEquation(i.FUNC_ADD),m=Fi,M=Fi),it)switch(I){case Ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Al:i.blendFunc(i.ONE,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",I);break}else switch(I){case Ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Al:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wl:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cl:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",I);break}x=null,S=null,A=null,w=null,C.set(0,0,0),y=0,p=I,T=it}return}Q=Q||oe,J=J||se,Ae=Ae||Se,(oe!==m||Q!==M)&&(i.blendEquationSeparate(xt[oe],xt[Q]),m=oe,M=Q),(se!==x||Se!==S||J!==A||Ae!==w)&&(i.blendFuncSeparate(qe[se],qe[Se],qe[J],qe[Ae]),x=se,S=Se,A=J,w=Ae),(ze.equals(C)===!1||dt!==y)&&(i.blendColor(ze.r,ze.g,ze.b,dt),C.copy(ze),y=dt),p=I,T=!1}function tt(I,oe){I.side===bn?ce(i.CULL_FACE):ae(i.CULL_FACE);let se=I.side===jt;oe&&(se=!se),Ve(se),I.blending===Ms&&I.transparent===!1?Ze(ti):Ze(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const Se=I.stencilWrite;o.setTest(Se),Se&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(I){X!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),X=I)}function ot(I){I!==sp?(ae(i.CULL_FACE),I!==P&&(I===Tl?i.cullFace(i.BACK):I===rp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),P=I}function L(I){I!==k&&(G&&i.lineWidth(I),k=I)}function pt(I,oe,se){I?(ae(i.POLYGON_OFFSET_FILL),(V!==oe||H!==se)&&(V=oe,H=se,a.getReversed()&&(oe=-oe),i.polygonOffset(oe,se))):ce(i.POLYGON_OFFSET_FILL)}function $(I){I?ae(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)}function Te(I){I===void 0&&(I=i.TEXTURE0+O-1),ee!==I&&(i.activeTexture(I),ee=I)}function he(I,oe,se){se===void 0&&(ee===null?se=i.TEXTURE0+O-1:se=ee);let Se=de[se];Se===void 0&&(Se={type:void 0,texture:void 0},de[se]=Se),(Se.type!==I||Se.texture!==oe)&&(ee!==se&&(i.activeTexture(se),ee=se),i.bindTexture(I,oe||q[I]),Se.type=I,Se.texture=oe)}function b(){const I=de[ee];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function Z(){try{i.texSubImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function j(){try{i.texSubImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function ye(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function re(){try{i.texStorage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function Re(){try{i.texStorage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function De(){try{i.texImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function ne(){try{i.texImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function ie(I){ke.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ke.copy(I))}function me(I){nt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),nt.copy(I))}function le(I,oe){let se=l.get(oe);se===void 0&&(se=new WeakMap,l.set(oe,se));let Se=se.get(I);Se===void 0&&(Se=i.getUniformBlockIndex(oe,I.name),se.set(I,Se))}function ue(I,oe){const Se=l.get(oe).get(I);c.get(oe)!==Se&&(i.uniformBlockBinding(oe,Se,I.__bindingPointIndex),c.set(oe,Se))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ee=null,de={},f={},h=new WeakMap,d=[],g=null,v=!1,p=null,m=null,x=null,S=null,M=null,A=null,w=null,C=new Ke(0,0,0),y=0,T=!1,X=null,P=null,k=null,V=null,H=null,ke.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:ce,bindFramebuffer:Oe,drawBuffers:Ue,useProgram:Ne,setBlending:Ze,setMaterial:tt,setFlipSided:Ve,setCullFace:ot,setLineWidth:L,setPolygonOffset:pt,setScissorTest:$,activeTexture:Te,bindTexture:he,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:D,texImage2D:De,texImage3D:ne,updateUBOMapping:le,uniformBlockBinding:ue,texStorage2D:re,texStorage3D:Re,texSubImage2D:Z,texSubImage3D:j,compressedTexSubImage2D:K,compressedTexSubImage3D:ye,scissor:ie,viewport:me,reset:Fe}}function B_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Le,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return d?new OffscreenCanvas(b,_):La("canvas")}function v(b,_,D){let Z=1;const j=he(b);if((j.width>D||j.height>D)&&(Z=D/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const K=Math.floor(Z*j.width),ye=Math.floor(Z*j.height);f===void 0&&(f=g(K,ye));const re=_?g(K,ye):f;return re.width=K,re.height=ye,re.getContext("2d").drawImage(b,0,0,K,ye),Be("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+K+"x"+ye+")."),re}else return"data"in b&&Be("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function p(b){return b.generateMipmaps}function m(b){i.generateMipmap(b)}function x(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(b,_,D,Z,j=!1){if(b!==null){if(i[b]!==void 0)return i[b];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let K=_;if(_===i.RED&&(D===i.FLOAT&&(K=i.R32F),D===i.HALF_FLOAT&&(K=i.R16F),D===i.UNSIGNED_BYTE&&(K=i.R8)),_===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.R8UI),D===i.UNSIGNED_SHORT&&(K=i.R16UI),D===i.UNSIGNED_INT&&(K=i.R32UI),D===i.BYTE&&(K=i.R8I),D===i.SHORT&&(K=i.R16I),D===i.INT&&(K=i.R32I)),_===i.RG&&(D===i.FLOAT&&(K=i.RG32F),D===i.HALF_FLOAT&&(K=i.RG16F),D===i.UNSIGNED_BYTE&&(K=i.RG8)),_===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.RG8UI),D===i.UNSIGNED_SHORT&&(K=i.RG16UI),D===i.UNSIGNED_INT&&(K=i.RG32UI),D===i.BYTE&&(K=i.RG8I),D===i.SHORT&&(K=i.RG16I),D===i.INT&&(K=i.RG32I)),_===i.RGB_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.RGB8UI),D===i.UNSIGNED_SHORT&&(K=i.RGB16UI),D===i.UNSIGNED_INT&&(K=i.RGB32UI),D===i.BYTE&&(K=i.RGB8I),D===i.SHORT&&(K=i.RGB16I),D===i.INT&&(K=i.RGB32I)),_===i.RGBA_INTEGER&&(D===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),D===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),D===i.UNSIGNED_INT&&(K=i.RGBA32UI),D===i.BYTE&&(K=i.RGBA8I),D===i.SHORT&&(K=i.RGBA16I),D===i.INT&&(K=i.RGBA32I)),_===i.RGB&&(D===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),D===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),_===i.RGBA){const ye=j?Ra:je.getTransfer(Z);D===i.FLOAT&&(K=i.RGBA32F),D===i.HALF_FLOAT&&(K=i.RGBA16F),D===i.UNSIGNED_BYTE&&(K=ye===st?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function M(b,_){let D;return b?_===null||_===Hn||_===_r?D=i.DEPTH24_STENCIL8:_===Fn?D=i.DEPTH32F_STENCIL8:_===xr&&(D=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Hn||_===_r?D=i.DEPTH_COMPONENT24:_===Fn?D=i.DEPTH_COMPONENT32F:_===xr&&(D=i.DEPTH_COMPONENT16),D}function A(b,_){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Tt&&b.minFilter!==Xt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function w(b){const _=b.target;_.removeEventListener("dispose",w),y(_),_.isVideoTexture&&u.delete(_)}function C(b){const _=b.target;_.removeEventListener("dispose",C),X(_)}function y(b){const _=n.get(b);if(_.__webglInit===void 0)return;const D=b.source,Z=h.get(D);if(Z){const j=Z[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&T(b),Object.keys(Z).length===0&&h.delete(D)}n.remove(b)}function T(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const D=b.source,Z=h.get(D);delete Z[_.__cacheKey],a.memory.textures--}function X(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let j=0;j<_.__webglFramebuffer[Z].length;j++)i.deleteFramebuffer(_.__webglFramebuffer[Z][j]);else i.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=b.textures;for(let Z=0,j=D.length;Z<j;Z++){const K=n.get(D[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(D[Z])}n.remove(b)}let P=0;function k(){P=0}function V(){const b=P;return b>=s.maxTextures&&Be("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),P+=1,b}function H(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function O(b,_){const D=n.get(b);if(b.isVideoTexture&&$(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&D.__version!==b.version){const Z=b.image;if(Z===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{q(D,b,_);return}}else b.isExternalTexture&&(D.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+_)}function G(b,_){const D=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){q(D,b,_);return}else b.isExternalTexture&&(D.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+_)}function F(b,_){const D=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){q(D,b,_);return}t.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+_)}function te(b,_){const D=n.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&D.__version!==b.version){ae(D,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+_)}const ee={[vr]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[Xo]:i.MIRRORED_REPEAT},de={[Tt]:i.NEAREST,[wp]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[$a]:i.LINEAR_MIPMAP_NEAREST,[zi]:i.LINEAR_MIPMAP_LINEAR},fe={[Lp]:i.NEVER,[Fp]:i.ALWAYS,[Ip]:i.LESS,[Qc]:i.LEQUAL,[Dp]:i.EQUAL,[el]:i.GEQUAL,[Up]:i.GREATER,[Np]:i.NOTEQUAL};function _e(b,_){if(_.type===Fn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Xt||_.magFilter===$a||_.magFilter===Fr||_.magFilter===zi||_.minFilter===Xt||_.minFilter===$a||_.minFilter===Fr||_.minFilter===zi)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,ee[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,ee[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,ee[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,fe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Tt||_.minFilter!==Fr&&_.minFilter!==zi||_.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ke(b,_){let D=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",w));const Z=_.source;let j=h.get(Z);j===void 0&&(j={},h.set(Z,j));const K=H(_);if(K!==b.__cacheKey){j[K]===void 0&&(j[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,D=!0),j[K].usedTimes++;const ye=j[b.__cacheKey];ye!==void 0&&(j[b.__cacheKey].usedTimes--,ye.usedTimes===0&&T(_)),b.__cacheKey=K,b.__webglTexture=j[K].texture}return D}function nt(b,_,D){return Math.floor(Math.floor(b/D)/_)}function at(b,_,D,Z){const K=b.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,D,Z,_.data);else{K.sort((ne,ie)=>ne.start-ie.start);let ye=0;for(let ne=1;ne<K.length;ne++){const ie=K[ye],me=K[ne],le=ie.start+ie.count,ue=nt(me.start,_.width,4),Fe=nt(ie.start,_.width,4);me.start<=le+1&&ue===Fe&&nt(me.start+me.count-1,_.width,4)===ue?ie.count=Math.max(ie.count,me.start+me.count-ie.start):(++ye,K[ye]=me)}K.length=ye+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),Re=i.getParameter(i.UNPACK_SKIP_PIXELS),De=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ne=0,ie=K.length;ne<ie;ne++){const me=K[ne],le=Math.floor(me.start/4),ue=Math.ceil(me.count/4),Fe=le%_.width,I=Math.floor(le/_.width),oe=ue,se=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Fe,I,oe,se,D,Z,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Re),i.pixelStorei(i.UNPACK_SKIP_ROWS,De)}}function q(b,_,D){let Z=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=i.TEXTURE_3D);const j=ke(b,_),K=_.source;t.bindTexture(Z,b.__webglTexture,i.TEXTURE0+D);const ye=n.get(K);if(K.version!==ye.__version||j===!0){t.activeTexture(i.TEXTURE0+D);const re=je.getPrimaries(je.workingColorSpace),Re=_.colorSpace===_i?null:je.getPrimaries(_.colorSpace),De=_.colorSpace===_i||re===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let ne=v(_.image,!1,s.maxTextureSize);ne=Te(_,ne);const ie=r.convert(_.format,_.colorSpace),me=r.convert(_.type);let le=S(_.internalFormat,ie,me,_.colorSpace,_.isVideoTexture);_e(Z,_);let ue;const Fe=_.mipmaps,I=_.isVideoTexture!==!0,oe=ye.__version===void 0||j===!0,se=K.dataReady,Se=A(_,ne);if(_.isDepthTexture)le=M(_.format===Vi,_.type),oe&&(I?t.texStorage2D(i.TEXTURE_2D,1,le,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,le,ne.width,ne.height,0,ie,me,null));else if(_.isDataTexture)if(Fe.length>0){I&&oe&&t.texStorage2D(i.TEXTURE_2D,Se,le,Fe[0].width,Fe[0].height);for(let Q=0,J=Fe.length;Q<J;Q++)ue=Fe[Q],I?se&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ue.width,ue.height,ie,me,ue.data):t.texImage2D(i.TEXTURE_2D,Q,le,ue.width,ue.height,0,ie,me,ue.data);_.generateMipmaps=!1}else I?(oe&&t.texStorage2D(i.TEXTURE_2D,Se,le,ne.width,ne.height),se&&at(_,ne,ie,me)):t.texImage2D(i.TEXTURE_2D,0,le,ne.width,ne.height,0,ie,me,ne.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,le,Fe[0].width,Fe[0].height,ne.depth);for(let Q=0,J=Fe.length;Q<J;Q++)if(ue=Fe[Q],_.format!==wn)if(ie!==null)if(I){if(se)if(_.layerUpdates.size>0){const Ae=iu(ue.width,ue.height,_.format,_.type);for(const ze of _.layerUpdates){const dt=ue.data.subarray(ze*Ae/ue.data.BYTES_PER_ELEMENT,(ze+1)*Ae/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,ze,ue.width,ue.height,1,ie,dt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ue.width,ue.height,ne.depth,ie,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,le,ue.width,ue.height,ne.depth,0,ue.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?se&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,ue.width,ue.height,ne.depth,ie,me,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,le,ue.width,ue.height,ne.depth,0,ie,me,ue.data)}else{I&&oe&&t.texStorage2D(i.TEXTURE_2D,Se,le,Fe[0].width,Fe[0].height);for(let Q=0,J=Fe.length;Q<J;Q++)ue=Fe[Q],_.format!==wn?ie!==null?I?se&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,ue.width,ue.height,ie,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,le,ue.width,ue.height,0,ue.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?se&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ue.width,ue.height,ie,me,ue.data):t.texImage2D(i.TEXTURE_2D,Q,le,ue.width,ue.height,0,ie,me,ue.data)}else if(_.isDataArrayTexture)if(I){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,le,ne.width,ne.height,ne.depth),se)if(_.layerUpdates.size>0){const Q=iu(ne.width,ne.height,_.format,_.type);for(const J of _.layerUpdates){const Ae=ne.data.subarray(J*Q/ne.data.BYTES_PER_ELEMENT,(J+1)*Q/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ie,me,Ae)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ie,me,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,ne.width,ne.height,ne.depth,0,ie,me,ne.data);else if(_.isData3DTexture)I?(oe&&t.texStorage3D(i.TEXTURE_3D,Se,le,ne.width,ne.height,ne.depth),se&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ie,me,ne.data)):t.texImage3D(i.TEXTURE_3D,0,le,ne.width,ne.height,ne.depth,0,ie,me,ne.data);else if(_.isFramebufferTexture){if(oe)if(I)t.texStorage2D(i.TEXTURE_2D,Se,le,ne.width,ne.height);else{let Q=ne.width,J=ne.height;for(let Ae=0;Ae<Se;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,le,Q,J,0,ie,me,null),Q>>=1,J>>=1}}else if(Fe.length>0){if(I&&oe){const Q=he(Fe[0]);t.texStorage2D(i.TEXTURE_2D,Se,le,Q.width,Q.height)}for(let Q=0,J=Fe.length;Q<J;Q++)ue=Fe[Q],I?se&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ie,me,ue):t.texImage2D(i.TEXTURE_2D,Q,le,ie,me,ue);_.generateMipmaps=!1}else if(I){if(oe){const Q=he(ne);t.texStorage2D(i.TEXTURE_2D,Se,le,Q.width,Q.height)}se&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie,me,ne)}else t.texImage2D(i.TEXTURE_2D,0,le,ie,me,ne);p(_)&&m(Z),ye.__version=K.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ae(b,_,D){if(_.image.length!==6)return;const Z=ke(b,_),j=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+D);const K=n.get(j);if(j.version!==K.__version||Z===!0){t.activeTexture(i.TEXTURE0+D);const ye=je.getPrimaries(je.workingColorSpace),re=_.colorSpace===_i?null:je.getPrimaries(_.colorSpace),Re=_.colorSpace===_i||ye===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const De=_.isCompressedTexture||_.image[0].isCompressedTexture,ne=_.image[0]&&_.image[0].isDataTexture,ie=[];for(let J=0;J<6;J++)!De&&!ne?ie[J]=v(_.image[J],!0,s.maxCubemapSize):ie[J]=ne?_.image[J].image:_.image[J],ie[J]=Te(_,ie[J]);const me=ie[0],le=r.convert(_.format,_.colorSpace),ue=r.convert(_.type),Fe=S(_.internalFormat,le,ue,_.colorSpace),I=_.isVideoTexture!==!0,oe=K.__version===void 0||Z===!0,se=j.dataReady;let Se=A(_,me);_e(i.TEXTURE_CUBE_MAP,_);let Q;if(De){I&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Fe,me.width,me.height);for(let J=0;J<6;J++){Q=ie[J].mipmaps;for(let Ae=0;Ae<Q.length;Ae++){const ze=Q[Ae];_.format!==wn?le!==null?I?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,0,0,ze.width,ze.height,le,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,Fe,ze.width,ze.height,0,ze.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,0,0,ze.width,ze.height,le,ue,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae,Fe,ze.width,ze.height,0,le,ue,ze.data)}}}else{if(Q=_.mipmaps,I&&oe){Q.length>0&&Se++;const J=he(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Fe,J.width,J.height)}for(let J=0;J<6;J++)if(ne){I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ie[J].width,ie[J].height,le,ue,ie[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Fe,ie[J].width,ie[J].height,0,le,ue,ie[J].data);for(let Ae=0;Ae<Q.length;Ae++){const dt=Q[Ae].image[J].image;I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,0,0,dt.width,dt.height,le,ue,dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,Fe,dt.width,dt.height,0,le,ue,dt.data)}}else{I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,le,ue,ie[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Fe,le,ue,ie[J]);for(let Ae=0;Ae<Q.length;Ae++){const ze=Q[Ae];I?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,0,0,le,ue,ze.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ae+1,Fe,le,ue,ze.image[J])}}}p(_)&&m(i.TEXTURE_CUBE_MAP),K.__version=j.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ce(b,_,D,Z,j,K){const ye=r.convert(D.format,D.colorSpace),re=r.convert(D.type),Re=S(D.internalFormat,ye,re,D.colorSpace),De=n.get(_),ne=n.get(D);if(ne.__renderTarget=_,!De.__hasExternalTextures){const ie=Math.max(1,_.width>>K),me=Math.max(1,_.height>>K);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,K,Re,ie,me,_.depth,0,ye,re,null):t.texImage2D(j,K,Re,ie,me,0,ye,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),pt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,ne.__webglTexture,0,L(_)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,ne.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(b,_,D){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const Z=_.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,K=M(_.stencilBuffer,j),ye=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(_),K,_.width,_.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(_),K,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,b)}else{const Z=_.textures;for(let j=0;j<Z.length;j++){const K=Z[j],ye=r.convert(K.format,K.colorSpace),re=r.convert(K.type),Re=S(K.internalFormat,ye,re,K.colorSpace);pt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(_),Re,_.width,_.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(_),Re,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Re,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(b,_,D){const Z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),_e(i.TEXTURE_CUBE_MAP,_.depthTexture);const De=r.convert(_.depthTexture.format),ne=r.convert(_.depthTexture.type);let ie;_.depthTexture.format===si?ie=i.DEPTH_COMPONENT24:_.depthTexture.format===Vi&&(ie=i.DEPTH24_STENCIL8);for(let me=0;me<6;me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ie,_.width,_.height,0,De,ne,null)}}else O(_.depthTexture,0);const K=j.__webglTexture,ye=L(_),re=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+D:i.TEXTURE_2D,Re=_.depthTexture.format===Vi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===si)pt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Re,re,K,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Re,re,K,0);else if(_.depthTexture.format===Vi)pt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Re,re,K,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Re,re,K,0);else throw new Error("Unknown depthTexture format")}function Ne(b){const _=n.get(b),D=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Z=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Z}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let Z=0;Z<6;Z++)Ue(_.__webglFramebuffer[Z],b,Z);else{const Z=b.texture.mipmaps;Z&&Z.length>0?Ue(_.__webglFramebuffer[0],b,0):Ue(_.__webglFramebuffer,b,0)}else if(D){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=i.createRenderbuffer(),Oe(_.__webglDepthbuffer[Z],b,!1);else{const j=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,K)}}else{const Z=b.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Oe(_.__webglDepthbuffer,b,!1);else{const j=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(b,_,D){const Z=n.get(b);_!==void 0&&ce(Z.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&Ne(b)}function qe(b){const _=b.texture,D=n.get(b),Z=n.get(_);b.addEventListener("dispose",C);const j=b.textures,K=b.isWebGLCubeRenderTarget===!0,ye=j.length>1;if(ye||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=_.version,a.memory.textures++),K){D.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[re]=[];for(let Re=0;Re<_.mipmaps.length;Re++)D.__webglFramebuffer[re][Re]=i.createFramebuffer()}else D.__webglFramebuffer[re]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)D.__webglFramebuffer[re]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(ye)for(let re=0,Re=j.length;re<Re;re++){const De=n.get(j[re]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&pt(b)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let re=0;re<j.length;re++){const Re=j[re];D.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[re]);const De=r.convert(Re.format,Re.colorSpace),ne=r.convert(Re.type),ie=S(Re.internalFormat,De,ne,Re.colorSpace,b.isXRRenderTarget===!0),me=L(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,me,ie,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,D.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(D.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),_e(i.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let Re=0;Re<_.mipmaps.length;Re++)ce(D.__webglFramebuffer[re][Re],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re);else ce(D.__webglFramebuffer[re],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);p(_)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let re=0,Re=j.length;re<Re;re++){const De=j[re],ne=n.get(De);let ie=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,ne.__webglTexture),_e(ie,De),ce(D.__webglFramebuffer,b,De,i.COLOR_ATTACHMENT0+re,ie,0),p(De)&&m(ie)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,Z.__webglTexture),_e(re,_),_.mipmaps&&_.mipmaps.length>0)for(let Re=0;Re<_.mipmaps.length;Re++)ce(D.__webglFramebuffer[Re],b,_,i.COLOR_ATTACHMENT0,re,Re);else ce(D.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,re,0);p(_)&&m(re),t.unbindTexture()}b.depthBuffer&&Ne(b)}function Ze(b){const _=b.textures;for(let D=0,Z=_.length;D<Z;D++){const j=_[D];if(p(j)){const K=x(b),ye=n.get(j).__webglTexture;t.bindTexture(K,ye),m(K),t.unbindTexture()}}}const tt=[],Ve=[];function ot(b){if(b.samples>0){if(pt(b)===!1){const _=b.textures,D=b.width,Z=b.height;let j=i.COLOR_BUFFER_BIT;const K=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(b),re=_.length>1;if(re)for(let De=0;De<_.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const Re=b.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let De=0;De<_.length;De++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[De]);const ne=n.get(_[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ne,0)}i.blitFramebuffer(0,0,D,Z,0,0,D,Z,j,i.NEAREST),c===!0&&(tt.length=0,Ve.length=0,tt.push(i.COLOR_ATTACHMENT0+De),b.depthBuffer&&b.resolveDepthBuffer===!1&&(tt.push(K),Ve.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ve)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let De=0;De<_.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,ye.__webglColorRenderbuffer[De]);const ne=n.get(_[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function L(b){return Math.min(s.maxSamples,b.samples)}function pt(b){const _=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function $(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function Te(b,_){const D=b.colorSpace,Z=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||D!==Cs&&D!==_i&&(je.getTransfer(D)===st?(Z!==wn||j!==fn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",D)),_}function he(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.setTexture2D=O,this.setTexture2DArray=G,this.setTexture3D=F,this.setTextureCube=te,this.rebindTextures=xt,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function k_(i,e){function t(n,s=_i){let r;const a=je.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Yc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ad)return i.BYTE;if(n===wd)return i.SHORT;if(n===xr)return i.UNSIGNED_SHORT;if(n===qc)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===ii)return i.HALF_FLOAT;if(n===Pd)return i.ALPHA;if(n===Ld)return i.RGB;if(n===wn)return i.RGBA;if(n===si)return i.DEPTH_COMPONENT;if(n===Vi)return i.DEPTH_STENCIL;if(n===Id)return i.RED;if(n===Zc)return i.RED_INTEGER;if(n===ws)return i.RG;if(n===Jc)return i.RG_INTEGER;if(n===jc)return i.RGBA_INTEGER;if(n===ga||n===va||n===xa||n===_a)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===qo||n===Yo||n===Ko)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zo||n===Jo||n===jo||n===Qo||n===ec||n===tc||n===nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Zo||n===Jo)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Qo)return r.COMPRESSED_R11_EAC;if(n===ec)return r.COMPRESSED_SIGNED_R11_EAC;if(n===tc)return r.COMPRESSED_RG11_EAC;if(n===nc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ic||n===sc||n===rc||n===ac||n===oc||n===cc||n===lc||n===uc||n===dc||n===fc||n===hc||n===pc||n===mc||n===gc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ic)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ac)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vc||n===xc||n===_c)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===vc)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sc||n===yc||n===Mc||n===Ec)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ec)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class H_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Vd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gn({vertexShader:z_,fragmentShader:V_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yt(new Ls(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class G_ extends Ns{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",p=new H_,m={},x=t.getContextAttributes();let S=null,M=null;const A=[],w=[],C=new Le;let y=null;const T=new dn;T.viewport=new bt;const X=new dn;X.viewport=new bt;const P=[T,X],k=new eg;let V=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ae=A[q];return ae===void 0&&(ae=new eo,A[q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(q){let ae=A[q];return ae===void 0&&(ae=new eo,A[q]=ae),ae.getGripSpace()},this.getHand=function(q){let ae=A[q];return ae===void 0&&(ae=new eo,A[q]=ae),ae.getHandSpace()};function O(q){const ae=w.indexOf(q.inputSource);if(ae===-1)return;const ce=A[ae];ce!==void 0&&(ce.update(q.inputSource,q.frame,l||a),ce.dispatchEvent({type:q.type,data:q.inputSource}))}function G(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",F);for(let q=0;q<A.length;q++){const ae=w[q];ae!==null&&(w[q]=null,A[q].disconnect(ae))}V=null,H=null,p.reset();for(const q in m)delete m[q];e.setRenderTarget(S),d=null,h=null,f=null,s=null,M=null,at.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",G),s.addEventListener("inputsourceschange",F),x.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Oe=null,Ue=null;x.depth&&(Ue=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=x.stencil?Vi:si,Oe=x.stencil?_r:Hn);const Ne={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ne),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new zn(h.textureWidth,h.textureHeight,{format:wn,type:fn,depthTexture:new Sr(h.textureWidth,h.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ce={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new zn(d.framebufferWidth,d.framebufferHeight,{format:wn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),at.setContext(s),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function F(q){for(let ae=0;ae<q.removed.length;ae++){const ce=q.removed[ae],Oe=w.indexOf(ce);Oe>=0&&(w[Oe]=null,A[Oe].disconnect(ce))}for(let ae=0;ae<q.added.length;ae++){const ce=q.added[ae];let Oe=w.indexOf(ce);if(Oe===-1){for(let Ne=0;Ne<A.length;Ne++)if(Ne>=w.length){w.push(ce),Oe=Ne;break}else if(w[Ne]===null){w[Ne]=ce,Oe=Ne;break}if(Oe===-1)break}const Ue=A[Oe];Ue&&Ue.connect(ce)}}const te=new N,ee=new N;function de(q,ae,ce){te.setFromMatrixPosition(ae.matrixWorld),ee.setFromMatrixPosition(ce.matrixWorld);const Oe=te.distanceTo(ee),Ue=ae.projectionMatrix.elements,Ne=ce.projectionMatrix.elements,xt=Ue[14]/(Ue[10]-1),qe=Ue[14]/(Ue[10]+1),Ze=(Ue[9]+1)/Ue[5],tt=(Ue[9]-1)/Ue[5],Ve=(Ue[8]-1)/Ue[0],ot=(Ne[8]+1)/Ne[0],L=xt*Ve,pt=xt*ot,$=Oe/(-Ve+ot),Te=$*-Ve;if(ae.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Te),q.translateZ($),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ue[10]===-1)q.projectionMatrix.copy(ae.projectionMatrix),q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const he=xt+$,b=qe+$,_=L-Te,D=pt+(Oe-Te),Z=Ze*qe/b*he,j=tt*qe/b*he;q.projectionMatrix.makePerspective(_,D,Z,j,he,b),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function fe(q,ae){ae===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ae.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ae=q.near,ce=q.far;p.texture!==null&&(p.depthNear>0&&(ae=p.depthNear),p.depthFar>0&&(ce=p.depthFar)),k.near=X.near=T.near=ae,k.far=X.far=T.far=ce,(V!==k.near||H!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),V=k.near,H=k.far),k.layers.mask=q.layers.mask|6,T.layers.mask=k.layers.mask&-5,X.layers.mask=k.layers.mask&-3;const Oe=q.parent,Ue=k.cameras;fe(k,Oe);for(let Ne=0;Ne<Ue.length;Ne++)fe(Ue[Ne],Oe);Ue.length===2?de(k,T,X):k.projectionMatrix.copy(T.projectionMatrix),_e(q,k,Oe)};function _e(q,ae,ce){ce===null?q.matrix.copy(ae.matrixWorld):(q.matrix.copy(ce.matrixWorld),q.matrix.invert(),q.matrix.multiply(ae.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ae.projectionMatrix),q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=bc*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(q){return m[q]};let ke=null;function nt(q,ae){if(u=ae.getViewerPose(l||a),g=ae,u!==null){const ce=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Oe=!1;ce.length!==k.cameras.length&&(k.cameras.length=0,Oe=!0);for(let qe=0;qe<ce.length;qe++){const Ze=ce[qe];let tt=null;if(d!==null)tt=d.getViewport(Ze);else{const ot=f.getViewSubImage(h,Ze);tt=ot.viewport,qe===0&&(e.setRenderTargetTextures(M,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(M))}let Ve=P[qe];Ve===void 0&&(Ve=new dn,Ve.layers.enable(qe),Ve.viewport=new bt,P[qe]=Ve),Ve.matrix.fromArray(Ze.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Ze.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(tt.x,tt.y,tt.width,tt.height),qe===0&&(k.matrix.copy(Ve.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Oe===!0&&k.cameras.push(Ve)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();const qe=f.getDepthInformation(ce[0]);qe&&qe.isValid&&qe.texture&&p.init(qe,s.renderState)}if(Ue&&Ue.includes("camera-access")&&v){e.state.unbindTexture(),f=n.getBinding();for(let qe=0;qe<ce.length;qe++){const Ze=ce[qe].camera;if(Ze){let tt=m[Ze];tt||(tt=new Vd,m[Ze]=tt);const Ve=f.getCameraImage(Ze);tt.sourceTexture=Ve}}}}for(let ce=0;ce<A.length;ce++){const Oe=w[ce],Ue=A[ce];Oe!==null&&Ue!==void 0&&Ue.update(Oe,ae,l||a)}ke&&ke(q,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),g=null}const at=new ef;at.setAnimationLoop(nt),this.setAnimationLoop=function(q){ke=q},this.dispose=function(){}}}const Li=new ri,W_=new yt;function X_(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Jd(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,S,M){m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,x,S):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===jt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===jt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m),S=x.envMap,M=x.envMapRotation;S&&(p.envMap.value=S,Li.copy(M),Li.x*=-1,Li.y*=-1,Li.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),p.envMapRotation.value.setFromMatrix4(W_.makeRotationFromEuler(Li)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,S){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=S*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===jt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){const M=S.program;n.uniformBlockBinding(x,M)}function l(x,S){let M=s[x.id];M===void 0&&(g(x),M=u(x),s[x.id]=M,x.addEventListener("dispose",p));const A=S.program;n.updateUBOMapping(x,A);const w=e.render.frame;r[x.id]!==w&&(h(x),r[x.id]=w)}function u(x){const S=f();x.__bindingPointIndex=S;const M=i.createBuffer(),A=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,M),M}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const S=s[x.id],M=x.uniforms,A=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,C=M.length;w<C;w++){const y=Array.isArray(M[w])?M[w]:[M[w]];for(let T=0,X=y.length;T<X;T++){const P=y[T];if(d(P,w,T,A)===!0){const k=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let O=0;O<V.length;O++){const G=V[O],F=v(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,k+H,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,H),H+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,S,M,A){const w=x.value,C=S+"_"+M;if(A[C]===void 0)return typeof w=="number"||typeof w=="boolean"?A[C]=w:A[C]=w.clone(),!0;{const y=A[C];if(typeof w=="number"||typeof w=="boolean"){if(y!==w)return A[C]=w,!0}else if(y.equals(w)===!1)return y.copy(w),!0}return!1}function g(x){const S=x.uniforms;let M=0;const A=16;for(let C=0,y=S.length;C<y;C++){const T=Array.isArray(S[C])?S[C]:[S[C]];for(let X=0,P=T.length;X<P;X++){const k=T[X],V=Array.isArray(k.value)?k.value:[k.value];for(let H=0,O=V.length;H<O;H++){const G=V[H],F=v(G),te=M%A,ee=te%F.boundary,de=te+ee;M+=ee,de!==0&&A-de<F.storage&&(M+=A-de),k.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=F.storage}}}const w=M%A;return w>0&&(M+=A-w),x.__size=M,x.__cache={},this}function v(x){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Be("WebGLRenderer: Unsupported uniform value type.",x),S}function p(x){const S=x.target;S.removeEventListener("dispose",p);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function m(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}const q_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function Y_(){return In===null&&(In=new om(q_,16,16,ws,ii),In.name="DFG_LUT",In.minFilter=Xt,In.magFilter=Xt,In.wrapS=Qn,In.wrapT=Qn,In.generateMipmaps=!1,In.needsUpdate=!0),In}class K_{constructor(e={}){const{canvas:t=Bp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=d,p=new Set([jc,Jc,Zc]),m=new Set([fn,Hn,xr,_r,Yc,Kc]),x=new Uint32Array(4),S=new Int32Array(4);let M=null,A=null;const w=[],C=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let X=!1;this._outputColorSpace=un;let P=0,k=0,V=null,H=-1,O=null;const G=new bt,F=new bt;let te=null;const ee=new Ke(0);let de=0,fe=t.width,_e=t.height,ke=1,nt=null,at=null;const q=new bt(0,0,fe,_e),ae=new bt(0,0,fe,_e);let ce=!1;const Oe=new kd;let Ue=!1,Ne=!1;const xt=new yt,qe=new N,Ze=new bt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function ot(){return V===null?ke:1}let L=n;function pt(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$c}`),t.addEventListener("webglcontextlost",Ae,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",dt,!1),L===null){const U="webgl2";if(L=pt(U,E),L===null)throw pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw Je("WebGLRenderer: "+E.message),E}let $,Te,he,b,_,D,Z,j,K,ye,re,Re,De,ne,ie,me,le,ue,Fe,I,oe,se,Se;function Q(){$=new Kv(L),$.init(),oe=new k_(L,$),Te=new Vv(L,$,e,oe),he=new O_(L,$),Te.reversedDepthBuffer&&h&&he.buffers.depth.setReversed(!0),b=new jv(L),_=new E_,D=new B_(L,$,he,_,Te,oe,b),Z=new Yv(T),j=new ig(L),se=new kv(L,j),K=new Zv(L,j,b,se),ye=new ex(L,K,j,se,b),ue=new Qv(L,Te,D),ie=new Hv(_),re=new M_(T,Z,$,Te,se,ie),Re=new X_(T,_),De=new T_,ne=new L_($),le=new Bv(T,Z,he,ye,g,c),me=new F_(T,ye,Te),Se=new $_(L,b,Te,he),Fe=new zv(L,$,b),I=new Jv(L,$,b),b.programs=re.programs,T.capabilities=Te,T.extensions=$,T.properties=_,T.renderLists=De,T.shadowMap=me,T.state=he,T.info=b}Q(),v!==fn&&(y=new nx(v,t.width,t.height,s,r));const J=new G_(T,L);this.xr=J,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=$.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=$.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ke},this.setPixelRatio=function(E){E!==void 0&&(ke=E,this.setSize(fe,_e,!1))},this.getSize=function(E){return E.set(fe,_e)},this.setSize=function(E,U,W=!0){if(J.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=E,_e=U,t.width=Math.floor(E*ke),t.height=Math.floor(U*ke),W===!0&&(t.style.width=E+"px",t.style.height=U+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(fe*ke,_e*ke).floor()},this.setDrawingBufferSize=function(E,U,W){fe=E,_e=U,ke=W,t.width=Math.floor(E*W),t.height=Math.floor(U*W),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(v===fn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(G)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,U,W,z){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,U,W,z),he.viewport(G.copy(q).multiplyScalar(ke).round())},this.getScissor=function(E){return E.copy(ae)},this.setScissor=function(E,U,W,z){E.isVector4?ae.set(E.x,E.y,E.z,E.w):ae.set(E,U,W,z),he.scissor(F.copy(ae).multiplyScalar(ke).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(E){he.setScissorTest(ce=E)},this.setOpaqueSort=function(E){nt=E},this.setTransparentSort=function(E){at=E},this.getClearColor=function(E){return E.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,W=!0){let z=0;if(E){let B=!1;if(V!==null){const ve=V.texture.format;B=p.has(ve)}if(B){const ve=V.texture.type,Me=m.has(ve),xe=le.getClearColor(),we=le.getClearAlpha(),Pe=xe.r,He=xe.g,Xe=xe.b;Me?(x[0]=Pe,x[1]=He,x[2]=Xe,x[3]=we,L.clearBufferuiv(L.COLOR,0,x)):(S[0]=Pe,S[1]=He,S[2]=Xe,S[3]=we,L.clearBufferiv(L.COLOR,0,S))}else z|=L.COLOR_BUFFER_BIT}U&&(z|=L.DEPTH_BUFFER_BIT),W&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",dt,!1),le.dispose(),De.dispose(),ne.dispose(),_.dispose(),Z.dispose(),ye.dispose(),se.dispose(),Se.dispose(),re.dispose(),J.dispose(),J.removeEventListener("sessionstart",ll),J.removeEventListener("sessionend",ul),bi.stop()};function Ae(E){E.preventDefault(),Dl("WebGLRenderer: Context Lost."),X=!0}function ze(){Dl("WebGLRenderer: Context Restored."),X=!1;const E=b.autoReset,U=me.enabled,W=me.autoUpdate,z=me.needsUpdate,B=me.type;Q(),b.autoReset=E,me.enabled=U,me.autoUpdate=W,me.needsUpdate=z,me.type=B}function dt(E){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function it(E){const U=E.target;U.removeEventListener("dispose",it),Xn(U)}function Xn(E){$n(E),_.remove(E)}function $n(E){const U=_.get(E).programs;U!==void 0&&(U.forEach(function(W){re.releaseProgram(W)}),E.isShaderMaterial&&re.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,W,z,B,ve){U===null&&(U=tt);const Me=B.isMesh&&B.matrixWorld.determinant()<0,xe=Sf(E,U,W,z,B);he.setMaterial(z,Me);let we=W.index,Pe=1;if(z.wireframe===!0){if(we=K.getWireframeAttribute(W),we===void 0)return;Pe=2}const He=W.drawRange,Xe=W.attributes.position;let Ie=He.start*Pe,ct=(He.start+He.count)*Pe;ve!==null&&(Ie=Math.max(Ie,ve.start*Pe),ct=Math.min(ct,(ve.start+ve.count)*Pe)),we!==null?(Ie=Math.max(Ie,0),ct=Math.min(ct,we.count)):Xe!=null&&(Ie=Math.max(Ie,0),ct=Math.min(ct,Xe.count));const Mt=ct-Ie;if(Mt<0||Mt===1/0)return;se.setup(B,z,xe,W,we);let _t,lt=Fe;if(we!==null&&(_t=j.get(we),lt=I,lt.setIndex(_t)),B.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*ot()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(B.isLine){let Ht=z.linewidth;Ht===void 0&&(Ht=1),he.setLineWidth(Ht*ot()),B.isLineSegments?lt.setMode(L.LINES):B.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else B.isPoints?lt.setMode(L.POINTS):B.isSprite&&lt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ia("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if($.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ht=B._multiDrawStarts,Ce=B._multiDrawCounts,tn=B._multiDrawCount,Qe=we?j.get(we).bytesPerElement:1,vn=_.get(z).currentProgram.getUniforms();for(let Rn=0;Rn<tn;Rn++)vn.setValue(L,"_gl_DrawID",Rn),lt.render(Ht[Rn]/Qe,Ce[Rn])}else if(B.isInstancedMesh)lt.renderInstances(Ie,Mt,B.count);else if(W.isInstancedBufferGeometry){const Ht=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ce=Math.min(W.instanceCount,Ht);lt.renderInstances(Ie,Mt,Ce)}else lt.render(Ie,Mt)};function cl(E,U,W){E.transparent===!0&&E.side===bn&&E.forceSinglePass===!1?(E.side=jt,E.needsUpdate=!0,Dr(E,U,W),E.side=Ei,E.needsUpdate=!0,Dr(E,U,W),E.side=bn):Dr(E,U,W)}this.compile=function(E,U,W=null){W===null&&(W=E),A=ne.get(W),A.init(U),C.push(A),W.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(A.pushLight(B),B.castShadow&&A.pushShadow(B))}),E!==W&&E.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(A.pushLight(B),B.castShadow&&A.pushShadow(B))}),A.setupLights();const z=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ve=B.material;if(ve)if(Array.isArray(ve))for(let Me=0;Me<ve.length;Me++){const xe=ve[Me];cl(xe,W,B),z.add(xe)}else cl(ve,W,B),z.add(ve)}),A=C.pop(),z},this.compileAsync=function(E,U,W=null){const z=this.compile(E,U,W);return new Promise(B=>{function ve(){if(z.forEach(function(Me){_.get(Me).currentProgram.isReady()&&z.delete(Me)}),z.size===0){B(E);return}setTimeout(ve,10)}$.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Ba=null;function _f(E){Ba&&Ba(E)}function ll(){bi.stop()}function ul(){bi.start()}const bi=new ef;bi.setAnimationLoop(_f),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(E){Ba=E,J.setAnimationLoop(E),E===null?bi.stop():bi.start()},J.addEventListener("sessionstart",ll),J.addEventListener("sessionend",ul),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;const W=J.enabled===!0&&J.isPresenting===!0,z=y!==null&&(V===null||W)&&y.begin(T,V);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(J.cameraAutoUpdate===!0&&J.updateCamera(U),U=J.getCamera()),E.isScene===!0&&E.onBeforeRender(T,E,U,V),A=ne.get(E,C.length),A.init(U),C.push(A),xt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix(xt,On,U.reversedDepth),Ne=this.localClippingEnabled,Ue=ie.init(this.clippingPlanes,Ne),M=De.get(E,w.length),M.init(),w.push(M),J.enabled===!0&&J.isPresenting===!0){const Me=T.xr.getDepthSensingMesh();Me!==null&&ka(Me,U,-1/0,T.sortObjects)}ka(E,U,0,T.sortObjects),M.finish(),T.sortObjects===!0&&M.sort(nt,at),Ve=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Ve&&le.addToRenderList(M,E),this.info.render.frame++,Ue===!0&&ie.beginShadows();const B=A.state.shadowsArray;if(me.render(B,E,U),Ue===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&y.hasRenderPass())===!1){const Me=M.opaque,xe=M.transmissive;if(A.setupLights(),U.isArrayCamera){const we=U.cameras;if(xe.length>0)for(let Pe=0,He=we.length;Pe<He;Pe++){const Xe=we[Pe];fl(Me,xe,E,Xe)}Ve&&le.render(E);for(let Pe=0,He=we.length;Pe<He;Pe++){const Xe=we[Pe];dl(M,E,Xe,Xe.viewport)}}else xe.length>0&&fl(Me,xe,E,U),Ve&&le.render(E),dl(M,E,U)}V!==null&&k===0&&(D.updateMultisampleRenderTarget(V),D.updateRenderTargetMipmap(V)),z&&y.end(T),E.isScene===!0&&E.onAfterRender(T,E,U),se.resetDefaultState(),H=-1,O=null,C.pop(),C.length>0?(A=C[C.length-1],Ue===!0&&ie.setGlobalState(T.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?M=w[w.length-1]:M=null};function ka(E,U,W,z){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)A.pushLight(E),E.castShadow&&A.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Oe.intersectsSprite(E)){z&&Ze.setFromMatrixPosition(E.matrixWorld).applyMatrix4(xt);const Me=ye.update(E),xe=E.material;xe.visible&&M.push(E,Me,xe,W,Ze.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Oe.intersectsObject(E))){const Me=ye.update(E),xe=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ze.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ze.copy(Me.boundingSphere.center)),Ze.applyMatrix4(E.matrixWorld).applyMatrix4(xt)),Array.isArray(xe)){const we=Me.groups;for(let Pe=0,He=we.length;Pe<He;Pe++){const Xe=we[Pe],Ie=xe[Xe.materialIndex];Ie&&Ie.visible&&M.push(E,Me,Ie,W,Ze.z,Xe)}}else xe.visible&&M.push(E,Me,xe,W,Ze.z,null)}}const ve=E.children;for(let Me=0,xe=ve.length;Me<xe;Me++)ka(ve[Me],U,W,z)}function dl(E,U,W,z){const{opaque:B,transmissive:ve,transparent:Me}=E;A.setupLightsView(W),Ue===!0&&ie.setGlobalState(T.clippingPlanes,W),z&&he.viewport(G.copy(z)),B.length>0&&Ir(B,U,W),ve.length>0&&Ir(ve,U,W),Me.length>0&&Ir(Me,U,W),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function fl(E,U,W,z){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Ie=$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new zn(1,1,{generateMipmaps:!0,type:Ie?ii:fn,minFilter:zi,samples:Math.max(4,Te.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const ve=A.state.transmissionRenderTarget[z.id],Me=z.viewport||G;ve.setSize(Me.z*T.transmissionResolutionScale,Me.w*T.transmissionResolutionScale);const xe=T.getRenderTarget(),we=T.getActiveCubeFace(),Pe=T.getActiveMipmapLevel();T.setRenderTarget(ve),T.getClearColor(ee),de=T.getClearAlpha(),de<1&&T.setClearColor(16777215,.5),T.clear(),Ve&&le.render(W);const He=T.toneMapping;T.toneMapping=kn;const Xe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),Ue===!0&&ie.setGlobalState(T.clippingPlanes,z),Ir(E,W,z),D.updateMultisampleRenderTarget(ve),D.updateRenderTargetMipmap(ve),$.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ct=0,Mt=U.length;ct<Mt;ct++){const _t=U[ct],{object:lt,geometry:Ht,material:Ce,group:tn}=_t;if(Ce.side===bn&&lt.layers.test(z.layers)){const Qe=Ce.side;Ce.side=jt,Ce.needsUpdate=!0,hl(lt,W,z,Ht,Ce,tn),Ce.side=Qe,Ce.needsUpdate=!0,Ie=!0}}Ie===!0&&(D.updateMultisampleRenderTarget(ve),D.updateRenderTargetMipmap(ve))}T.setRenderTarget(xe,we,Pe),T.setClearColor(ee,de),Xe!==void 0&&(z.viewport=Xe),T.toneMapping=He}function Ir(E,U,W){const z=U.isScene===!0?U.overrideMaterial:null;for(let B=0,ve=E.length;B<ve;B++){const Me=E[B],{object:xe,geometry:we,group:Pe}=Me;let He=Me.material;He.allowOverride===!0&&z!==null&&(He=z),xe.layers.test(W.layers)&&hl(xe,U,W,we,He,Pe)}}function hl(E,U,W,z,B,ve){E.onBeforeRender(T,U,W,z,B,ve),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(T,U,W,z,E,ve),B.transparent===!0&&B.side===bn&&B.forceSinglePass===!1?(B.side=jt,B.needsUpdate=!0,T.renderBufferDirect(W,U,z,B,E,ve),B.side=Ei,B.needsUpdate=!0,T.renderBufferDirect(W,U,z,B,E,ve),B.side=bn):T.renderBufferDirect(W,U,z,B,E,ve),E.onAfterRender(T,U,W,z,B,ve)}function Dr(E,U,W){U.isScene!==!0&&(U=tt);const z=_.get(E),B=A.state.lights,ve=A.state.shadowsArray,Me=B.state.version,xe=re.getParameters(E,B.state,ve,U,W),we=re.getProgramCacheKey(xe);let Pe=z.programs;z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;const He=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;z.envMap=Z.get(E.envMap||z.environment,He),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Pe===void 0&&(E.addEventListener("dispose",it),Pe=new Map,z.programs=Pe);let Xe=Pe.get(we);if(Xe!==void 0){if(z.currentProgram===Xe&&z.lightsStateVersion===Me)return ml(E,xe),Xe}else xe.uniforms=re.getUniforms(E),E.onBeforeCompile(xe,T),Xe=re.acquireProgram(xe,we),Pe.set(we,Xe),z.uniforms=xe.uniforms;const Ie=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ie.clippingPlanes=ie.uniform),ml(E,xe),z.needsLights=Mf(E),z.lightsStateVersion=Me,z.needsLights&&(Ie.ambientLightColor.value=B.state.ambient,Ie.lightProbe.value=B.state.probe,Ie.directionalLights.value=B.state.directional,Ie.directionalLightShadows.value=B.state.directionalShadow,Ie.spotLights.value=B.state.spot,Ie.spotLightShadows.value=B.state.spotShadow,Ie.rectAreaLights.value=B.state.rectArea,Ie.ltc_1.value=B.state.rectAreaLTC1,Ie.ltc_2.value=B.state.rectAreaLTC2,Ie.pointLights.value=B.state.point,Ie.pointLightShadows.value=B.state.pointShadow,Ie.hemisphereLights.value=B.state.hemi,Ie.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ie.spotLightMatrix.value=B.state.spotLightMatrix,Ie.spotLightMap.value=B.state.spotLightMap,Ie.pointShadowMatrix.value=B.state.pointShadowMatrix),z.currentProgram=Xe,z.uniformsList=null,Xe}function pl(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Sa.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function ml(E,U){const W=_.get(E);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function Sf(E,U,W,z,B){U.isScene!==!0&&(U=tt),D.resetTextureUnits();const ve=U.fog,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,xe=V===null?T.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Cs,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Pe=Z.get(z.envMap||Me,we),He=z.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xe=!!W.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ie=!!W.morphAttributes.position,ct=!!W.morphAttributes.normal,Mt=!!W.morphAttributes.color;let _t=kn;z.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(_t=T.toneMapping);const lt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ht=lt!==void 0?lt.length:0,Ce=_.get(z),tn=A.state.lights;if(Ue===!0&&(Ne===!0||E!==O)){const Ut=E===O&&z.id===H;ie.setState(z,E,Ut)}let Qe=!1;z.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==tn.state.version||Ce.outputColorSpace!==xe||B.isBatchedMesh&&Ce.batching===!1||!B.isBatchedMesh&&Ce.batching===!0||B.isBatchedMesh&&Ce.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ce.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ce.instancing===!1||!B.isInstancedMesh&&Ce.instancing===!0||B.isSkinnedMesh&&Ce.skinning===!1||!B.isSkinnedMesh&&Ce.skinning===!0||B.isInstancedMesh&&Ce.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ce.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ce.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ce.instancingMorph===!1&&B.morphTexture!==null||Ce.envMap!==Pe||z.fog===!0&&Ce.fog!==ve||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ie.numPlanes||Ce.numIntersection!==ie.numIntersection)||Ce.vertexAlphas!==He||Ce.vertexTangents!==Xe||Ce.morphTargets!==Ie||Ce.morphNormals!==ct||Ce.morphColors!==Mt||Ce.toneMapping!==_t||Ce.morphTargetsCount!==Ht)&&(Qe=!0):(Qe=!0,Ce.__version=z.version);let vn=Ce.currentProgram;Qe===!0&&(vn=Dr(z,U,B));let Rn=!1,Ti=!1,Zi=!1;const ut=vn.getUniforms(),zt=Ce.uniforms;if(he.useProgram(vn.program)&&(Rn=!0,Ti=!0,Zi=!0),z.id!==H&&(H=z.id,Ti=!0),Rn||O!==E){he.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ut.setValue(L,"projectionMatrix",E.projectionMatrix),ut.setValue(L,"viewMatrix",E.matrixWorldInverse);const oi=ut.map.cameraPosition;oi!==void 0&&oi.setValue(L,qe.setFromMatrixPosition(E.matrixWorld)),Te.logarithmicDepthBuffer&&ut.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),O!==E&&(O=E,Ti=!0,Zi=!0)}if(Ce.needsLights&&(tn.state.directionalShadowMap.length>0&&ut.setValue(L,"directionalShadowMap",tn.state.directionalShadowMap,D),tn.state.spotShadowMap.length>0&&ut.setValue(L,"spotShadowMap",tn.state.spotShadowMap,D),tn.state.pointShadowMap.length>0&&ut.setValue(L,"pointShadowMap",tn.state.pointShadowMap,D)),B.isSkinnedMesh){ut.setOptional(L,B,"bindMatrix"),ut.setOptional(L,B,"bindMatrixInverse");const Ut=B.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),ut.setValue(L,"boneTexture",Ut.boneTexture,D))}B.isBatchedMesh&&(ut.setOptional(L,B,"batchingTexture"),ut.setValue(L,"batchingTexture",B._matricesTexture,D),ut.setOptional(L,B,"batchingIdTexture"),ut.setValue(L,"batchingIdTexture",B._indirectTexture,D),ut.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&ut.setValue(L,"batchingColorTexture",B._colorsTexture,D));const ai=W.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&ue.update(B,W,vn),(Ti||Ce.receiveShadow!==B.receiveShadow)&&(Ce.receiveShadow=B.receiveShadow,ut.setValue(L,"receiveShadow",B.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(zt.envMapIntensity.value=U.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=Y_()),Ti&&(ut.setValue(L,"toneMappingExposure",T.toneMappingExposure),Ce.needsLights&&yf(zt,Zi),ve&&z.fog===!0&&Re.refreshFogUniforms(zt,ve),Re.refreshMaterialUniforms(zt,z,ke,_e,A.state.transmissionRenderTarget[E.id]),Sa.upload(L,pl(Ce),zt,D)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Sa.upload(L,pl(Ce),zt,D),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(L,"center",B.center),ut.setValue(L,"modelViewMatrix",B.modelViewMatrix),ut.setValue(L,"normalMatrix",B.normalMatrix),ut.setValue(L,"modelMatrix",B.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ut=z.uniformsGroups;for(let oi=0,Ji=Ut.length;oi<Ji;oi++){const gl=Ut[oi];Se.update(gl,vn),Se.bind(gl,vn)}}return vn}function yf(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Mf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(E,U,W){const z=_.get(E);z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_.get(E.texture).__webglTexture=U,_.get(E.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:W,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const W=_.get(E);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0};const Ef=L.createFramebuffer();this.setRenderTarget=function(E,U=0,W=0){V=E,P=U,k=W;let z=null,B=!1,ve=!1;if(E){const xe=_.get(E);if(xe.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(L.FRAMEBUFFER,xe.__webglFramebuffer),G.copy(E.viewport),F.copy(E.scissor),te=E.scissorTest,he.viewport(G),he.scissor(F),he.setScissorTest(te),H=-1;return}else if(xe.__webglFramebuffer===void 0)D.setupRenderTarget(E);else if(xe.__hasExternalTextures)D.rebindTextures(E,_.get(E.texture).__webglTexture,_.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const He=E.depthTexture;if(xe.__boundDepthTexture!==He){if(He!==null&&_.has(He)&&(E.width!==He.image.width||E.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(E)}}const we=E.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ve=!0);const Pe=_.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?z=Pe[U][W]:z=Pe[U],B=!0):E.samples>0&&D.useMultisampledRTT(E)===!1?z=_.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?z=Pe[W]:z=Pe,G.copy(E.viewport),F.copy(E.scissor),te=E.scissorTest}else G.copy(q).multiplyScalar(ke).floor(),F.copy(ae).multiplyScalar(ke).floor(),te=ce;if(W!==0&&(z=Ef),he.bindFramebuffer(L.FRAMEBUFFER,z)&&he.drawBuffers(E,z),he.viewport(G),he.scissor(F),he.setScissorTest(te),B){const xe=_.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,W)}else if(ve){const xe=U;for(let we=0;we<E.textures.length;we++){const Pe=_.get(E.textures[we]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+we,Pe.__webglTexture,W,xe)}}else if(E!==null&&W!==0){const xe=_.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xe.__webglTexture,W)}H=-1},this.readRenderTargetPixels=function(E,U,W,z,B,ve,Me,xe=0){if(!(E&&E.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we){he.bindFramebuffer(L.FRAMEBUFFER,we);try{const Pe=E.textures[xe],He=Pe.format,Xe=Pe.type;if(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe),!Te.textureFormatReadable(He)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(Xe)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-z&&W>=0&&W<=E.height-B&&L.readPixels(U,W,z,B,oe.convert(He),oe.convert(Xe),ve)}finally{const Pe=V!==null?_.get(V).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,U,W,z,B,ve,Me,xe=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we)if(U>=0&&U<=E.width-z&&W>=0&&W<=E.height-B){he.bindFramebuffer(L.FRAMEBUFFER,we);const Pe=E.textures[xe],He=Pe.format,Xe=Pe.type;if(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+xe),!Te.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.bufferData(L.PIXEL_PACK_BUFFER,ve.byteLength,L.STREAM_READ),L.readPixels(U,W,z,B,oe.convert(He),oe.convert(Xe),0);const ct=V!==null?_.get(V).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,ct);const Mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await kp(L,Mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ve),L.deleteBuffer(Ie),L.deleteSync(Mt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,W=0){const z=Math.pow(2,-W),B=Math.floor(E.image.width*z),ve=Math.floor(E.image.height*z),Me=U!==null?U.x:0,xe=U!==null?U.y:0;D.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,Me,xe,B,ve),he.unbindTexture()};const bf=L.createFramebuffer(),Tf=L.createFramebuffer();this.copyTextureToTexture=function(E,U,W=null,z=null,B=0,ve=0){let Me,xe,we,Pe,He,Xe,Ie,ct,Mt;const _t=E.isCompressedTexture?E.mipmaps[ve]:E.image;if(W!==null)Me=W.max.x-W.min.x,xe=W.max.y-W.min.y,we=W.isBox3?W.max.z-W.min.z:1,Pe=W.min.x,He=W.min.y,Xe=W.isBox3?W.min.z:0;else{const zt=Math.pow(2,-B);Me=Math.floor(_t.width*zt),xe=Math.floor(_t.height*zt),E.isDataArrayTexture?we=_t.depth:E.isData3DTexture?we=Math.floor(_t.depth*zt):we=1,Pe=0,He=0,Xe=0}z!==null?(Ie=z.x,ct=z.y,Mt=z.z):(Ie=0,ct=0,Mt=0);const lt=oe.convert(U.format),Ht=oe.convert(U.type);let Ce;U.isData3DTexture?(D.setTexture3D(U,0),Ce=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(D.setTexture2DArray(U,0),Ce=L.TEXTURE_2D_ARRAY):(D.setTexture2D(U,0),Ce=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const tn=L.getParameter(L.UNPACK_ROW_LENGTH),Qe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),vn=L.getParameter(L.UNPACK_SKIP_PIXELS),Rn=L.getParameter(L.UNPACK_SKIP_ROWS),Ti=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,_t.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,_t.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Pe),L.pixelStorei(L.UNPACK_SKIP_ROWS,He),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Xe);const Zi=E.isDataArrayTexture||E.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const zt=_.get(E),ai=_.get(U),Ut=_.get(zt.__renderTarget),oi=_.get(ai.__renderTarget);he.bindFramebuffer(L.READ_FRAMEBUFFER,Ut.__webglFramebuffer),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let Ji=0;Ji<we;Ji++)Zi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(E).__webglTexture,B,Xe+Ji),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(U).__webglTexture,ve,Mt+Ji)),L.blitFramebuffer(Pe,He,Me,xe,Ie,ct,Me,xe,L.DEPTH_BUFFER_BIT,L.NEAREST);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||E.isRenderTargetTexture||_.has(E)){const zt=_.get(E),ai=_.get(U);he.bindFramebuffer(L.READ_FRAMEBUFFER,bf),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,Tf);for(let Ut=0;Ut<we;Ut++)Zi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zt.__webglTexture,B,Xe+Ut):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zt.__webglTexture,B),ut?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ai.__webglTexture,ve,Mt+Ut):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ai.__webglTexture,ve),B!==0?L.blitFramebuffer(Pe,He,Me,xe,Ie,ct,Me,xe,L.COLOR_BUFFER_BIT,L.NEAREST):ut?L.copyTexSubImage3D(Ce,ve,Ie,ct,Mt+Ut,Pe,He,Me,xe):L.copyTexSubImage2D(Ce,ve,Ie,ct,Pe,He,Me,xe);he.bindFramebuffer(L.READ_FRAMEBUFFER,null),he.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ut?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Ce,ve,Ie,ct,Mt,Me,xe,we,lt,Ht,_t.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ce,ve,Ie,ct,Mt,Me,xe,we,lt,_t.data):L.texSubImage3D(Ce,ve,Ie,ct,Mt,Me,xe,we,lt,Ht,_t):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ve,Ie,ct,Me,xe,lt,Ht,_t.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ve,Ie,ct,_t.width,_t.height,lt,_t.data):L.texSubImage2D(L.TEXTURE_2D,ve,Ie,ct,Me,xe,lt,Ht,_t);L.pixelStorei(L.UNPACK_ROW_LENGTH,tn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Qe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,vn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Rn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ti),ve===0&&U.generateMipmaps&&L.generateMipmap(Ce),he.unbindTexture()},this.initRenderTarget=function(E){_.get(E).__webglFramebuffer===void 0&&D.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?D.setTextureCube(E,0):E.isData3DTexture?D.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?D.setTexture2DArray(E,0):D.setTexture2D(E,0),he.unbindTexture()},this.resetState=function(){P=0,k=0,V=null,he.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const wo=new Map;function Z_(i){if(!Ki())return null;const e=i.toUpperCase();if(e==="-"||e==="")return null;if(wo.has(e))return wo.get(e);const t=Ds(e);if(!t)return null;const n=new Image;n.src=t;const s=new Vt(n);return s.wrapS=vr,s.wrapT=vr,s.magFilter=Tt,s.minFilter=Tt,n.onload=()=>{s.needsUpdate=!0},n.complete&&(s.needsUpdate=!0),wo.set(e,s),s}function gs(i){const e=zc().get(i.toUpperCase());return e?{w:e.width,h:e.height}:{w:64,h:64}}const ya=.5;function Da(i,e,t=!1){const n=Math.max(.05,Math.min(1,e/255))*ya,s=Z_(i);if(s){const a=new Rs({map:s.clone(),color:new Ke(n,n,n)});return t&&(a.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
           if (sampledDiffuseColor.r < 0.1 && sampledDiffuseColor.g > 0.9 && sampledDiffuseColor.b > 0.9) discard;`)}),a}const r=Math.round(n*180);return new Rs({color:new Ke(`rgb(${r},${r},${Math.round(r*.75)})`)})}function J_(i){R.sectors.forEach((e,t)=>{const n=Ar(t);if(!n.length)return;let s=0,r=0;for(let x=0;x<n.length;x++){const S=Math.abs(Vc(n[x]));S>r&&(r=S,s=x)}const a=n[s],o=new $d;o.moveTo(a[0].x,a[0].y);for(let x=1;x<a.length;x++)o.lineTo(a[x].x,a[x].y);for(let x=0;x<n.length;x++){if(x===s)continue;const S=n[x],M=new Tc;M.moveTo(S[0].x,S[0].y);for(let A=1;A<S.length;A++)M.lineTo(S[A].x,S[A].y);o.holes.push(M)}let c;try{c=new ol(o)}catch{return}const l=c.getAttribute("uv"),u=c.getAttribute("position");for(let x=0;x<l.count;x++)l.setXY(x,u.getX(x)/64,u.getY(x)/64);c.rotateX(-Math.PI/2);const f=e.light??160,h=Da(e.floorTex||"FLOOR4_8",f),d=new Yt(c,h);d.position.y=e.floor??0,d.userData={entityType:"sector",entityId:t,surface:"floor"},i.add(d);const g=c.clone(),v=g.getIndex();if(v){const x=v.array;for(let S=0;S<x.length;S+=3){const M=x[S];x[S]=x[S+2],x[S+2]=M}v.needsUpdate=!0}const p=Da(e.ceilTex||"CEIL3_5",f),m=new Yt(g,p);m.position.y=e.ceiling??128,m.userData={entityType:"sector",entityId:t,surface:"ceiling"},i.add(m)})}function fs(i,e,t,n,s,r,a,o,c,l,u,f,h,d){if(r<=s)return;const g=Math.sqrt((t-i)**2+(n-e)**2);if(g<.01)return;const v=r-s,{w:p,h:m}=gs(a),x=new Float32Array([i,s,-e,t,s,-n,t,r,-n,i,r,-e]),S=c/p,M=(c+g)/p,A=1-(l+v)/m,w=1-l/m,C=new Float32Array([S,A,M,A,M,w,S,w]),y=[0,1,2,0,2,3],T=new gn;T.setAttribute("position",new en(x,3)),T.setAttribute("uv",new en(C,2)),T.setIndex(y),T.computeVertexNormals();const X=Da(a,o),P=new Yt(T,X);P.userData={entityType:"linedef",entityId:u,sidedefId:f,surface:h},d.add(P)}function wu(i,e,t,n,s,r,a,o,c,l,u,f,h,d,g){if(r<=s)return;const v=Math.sqrt((t-i)**2+(n-e)**2);if(v<.01)return;const{w:p,h:m}=gs(a),x=!!(u&16);let S,M;x?(M=s+l,S=M+m):(S=r+l,M=S-m);const A=Math.max(s,M),w=Math.min(r,S);if(w<=A)return;const C=new Float32Array([i,A,-e,t,A,-n,t,w,-n,i,w,-e]),y=c/p,T=(c+v)/p,X=1-(S-w)/m,P=1-(S-A)/m,k=new Float32Array([y,P,T,P,T,X,y,X]),V=[0,1,2,0,2,3],H=new gn;H.setAttribute("position",new en(C,3)),H.setAttribute("uv",new en(k,2)),H.setIndex(V),H.computeVertexNormals();const O=Da(a,o,!0),G=new Yt(H,O);G.userData={entityType:"linedef",entityId:f,sidedefId:h,surface:d},g.add(G)}function j_(i){R.linedefs.forEach((e,t)=>{const n=R.vertices.get(e.v1),s=R.vertices.get(e.v2);if(!n||!s)return;const r=e.frontSide?R.sidedefs.get(e.frontSide):null,a=e.backSide?R.sidedefs.get(e.backSide):null,o=r!=null&&r.sector?R.sectors.get(r.sector):null,c=a!=null&&a.sector?R.sectors.get(a.sector):null;if(!o&&!c)return;const l=!!(e.flags&8),u=!!(e.flags&16);if(!o){const g=c.floor??0,v=c.ceiling??128,p=c.light??160,m=(a==null?void 0:a.mid)||"STARTAN2",x=(a==null?void 0:a.yoff)??0,S=v-g,M=u?x+gs(m).h-S:x;fs(s.x,s.y,n.x,n.y,g,v,m,p,(a==null?void 0:a.xoff)??0,M,t,e.backSide,"mid",i);return}const f=o.floor??0,h=o.ceiling??128,d=o.light??160;if(c){const g=c.floor??0,v=c.ceiling??128,p=c.light??160;if(h>v&&r){const m=r.upper||"STARTAN2",x=r.yoff??0,S=h-v,M=l?x:x+gs(m).h-S;fs(n.x,n.y,s.x,s.y,v,h,m,d,r.xoff??0,M,t,e.frontSide,"upper",i)}if(g>f&&r){const m=r.lower||"STARTAN2",x=r.yoff??0,S=u?x+h-g:x;fs(n.x,n.y,s.x,s.y,f,g,m,d,r.xoff??0,S,t,e.frontSide,"lower",i)}if(v>h&&a){const m=a.upper||"STARTAN2",x=a.yoff??0,S=v-h,M=l?x:x+gs(m).h-S;fs(s.x,s.y,n.x,n.y,h,v,m,p,a.xoff??0,M,t,e.backSide,"upper",i)}if(f>g&&a){const m=a.lower||"STARTAN2",x=a.yoff??0,S=u?x+v-f:x;fs(s.x,s.y,n.x,n.y,g,f,m,p,a.xoff??0,S,t,e.backSide,"lower",i)}if(r&&r.mid&&r.mid!=="-"){const m=Math.max(f,g),x=Math.min(h,v);wu(n.x,n.y,s.x,s.y,m,x,r.mid,d,r.xoff??0,r.yoff??0,e.flags,t,e.frontSide,"mid",i)}if(a&&a.mid&&a.mid!=="-"){const m=Math.max(f,g),x=Math.min(h,v);wu(s.x,s.y,n.x,n.y,m,x,a.mid,p,a.xoff??0,a.yoff??0,e.flags,t,e.backSide,"mid",i)}}else{const g=(r==null?void 0:r.mid)||"STARTAN2",v=(r==null?void 0:r.yoff)??0,p=h-f,m=u?v+gs(g).h-p:v;fs(n.x,n.y,s.x,s.y,f,h,g,d,(r==null?void 0:r.xoff)??0,m,t,e.frontSide,"mid",i)}})}function Q_(i,e){let t=0;return R.sectors.forEach((n,s)=>{Bn(i,e,s)&&(t=n.floor??0)}),t}function eS(i){const e=new Map;R.things.forEach((t,n)=>{const s=br[t.type],r=(s==null?void 0:s.cat)||"player",a=(s==null?void 0:s.radius)||16,o=mr[r]||"#fff",c=Q_(t.x,t.y),l=Tr[t.type],u=l?Ua(l):null;let f;if(u){const h=u.width,d=u.height,g=c+u.topOffset,v=g-d,p=Math.max(v,c)+.1,m=g-p;if(m<=0)return;const x=new Ls(h,m);if(v<c){const A=(c-v)/d,w=x.getAttribute("uv");for(let C=0;C<w.count;C++){const y=w.getY(C);w.setY(C,A+y*(1-A))}}let S=e.get(u.name);if(!S){const A=new Image;A.src=u.dataUrl,S=new Vt(A),S.magFilter=Tt,S.minFilter=Tt,A.onload=()=>{S.needsUpdate=!0},A.complete&&(S.needsUpdate=!0),e.set(u.name,S)}const M=new Rs({map:S.clone(),transparent:!0,alphaTest:.5,side:bn,color:new Ke(ya,ya,ya)});f=new Yt(x,M),f.position.set(t.x,p+m/2,-t.y)}else{const h=a*2,d=a,g=new Ls(d,h),v=new Rs({color:new Ke(o),side:bn,transparent:!0,opacity:.8});f=new Yt(g,v),f.position.set(t.x,c+h/2,-t.y)}f.userData={entityType:"thing",entityId:n,billboard:!0},i.add(f)})}let Ft=null,tr,wt,an=null,Cn=!1,Lc=0,on,mi=0,Gi=0;const ln={},Cu=300,Ru=.002;let rn=!1;const gi=new tg,nr=new Le;let qs=null,Ma=new Le,Ys=null,Ii=null,Pu=0,Co=null;function Lu(i){if(i.entityType==="sector"&&i.entityId){const e=R.sectors.get(i.entityId);return e?i.surface==="ceiling"?e.ceilTex||"CEIL3_5":e.floorTex||"FLOOR4_8":null}if(i.entityType==="linedef"&&i.sidedefId&&i.surface){const e=R.sidedefs.get(i.sidedefId);return e&&e[i.surface]||null}return null}function Iu(i,e){if(i.entityType==="sector"&&i.entityId){const t=R.sectors.get(i.entityId);if(!t)return;const n=i.surface==="ceiling"?"ceilTex":"floorTex";gt(),be(`map/sectors/${i.entityId}`,{...t},{...t,[n]:e}),vt(),ge("sectors").child(i.entityId).update({[n]:e}),$e(`Pasted ${e} → ${i.surface}`)}else if(i.entityType==="linedef"&&i.sidedefId&&i.surface){const t=R.sidedefs.get(i.sidedefId);if(!t)return;const n=i.surface;gt(),be(`map/sidedefs/${i.sidedefId}`,{...t},{...t,[n]:e}),vt(),ge("sidedefs").child(i.sidedefId).update({[n]:e}),$e(`Pasted ${e} → ${n}`)}}function tS(){if(Ft)return;const i=document.getElementById("canvas-wrap");an=document.createElement("div"),an.id="view3d-container",an.style.cssText="position:absolute;inset:0;display:none;z-index:10;cursor:crosshair;",i.style.position="relative",i.appendChild(an),qs=document.createElement("div"),qs.style.cssText="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;pointer-events:none;z-index:11;border:1px solid rgba(255,255,255,0.4);border-radius:50%;",an.appendChild(qs),Ft=new K_({antialias:!0}),Ft.setPixelRatio(window.devicePixelRatio),Ft.setClearColor(1118481),an.appendChild(Ft.domElement),tr=new tm,tr.fog=new il(1118481,8e-4),wt=new dn(90,1,1,2e4),on=new js,tr.add(on),tr.add(new jm(16777215,1)),Ft.domElement.addEventListener("click",t=>{if(e){e=!1;return}if(!rn){gi.setFromCamera(Ma,wt);const n=gi.intersectObjects(on.children,!1);if(n.length>0){const s=n[0].object.userData;if(s.entityType&&s.entityId){const r=s.entityType==="linedef"?"linedef":s.entityType==="sector"?"sector":null;if((r==="sector"||r==="linedef")&&t.shiftKey){const a=Pt===r?new Set(et):new Set,o=Pt===r?new Map(dr):new Map;if((Ee==null?void 0:Ee.type)===r&&!a.has(Ee.id)&&(a.add(Ee.id),r==="linedef"&&Wi)){const c=R.linedefs.get(Ee.id);if(c){const l=Wi==="front"?c.frontSide:c.backSide;l&&o.set(Ee.id,l)}}a.has(s.entityId)?(a.delete(s.entityId),o.delete(s.entityId)):(a.add(s.entityId),r==="linedef"&&s.sidedefId&&o.set(s.entityId,s.sidedefId)),Ot(a,r),Vf(o),kt(null),Lt()}else if(r){Ot(new Set);let a=null;if(r==="linedef"&&s.sidedefId){const o=R.linedefs.get(s.entityId);o&&(a=s.sidedefId===o.frontSide?"front":"back")}kt({type:r,id:s.entityId}),fr(a),Lt(),Et()}}}else t.shiftKey||(Ot(new Set),kt(null),Lt(),Et())}});let e=!1;document.addEventListener("pointerlockchange",()=>{const t=rn;rn=document.pointerLockElement===Ft.domElement,t&&!rn&&(e=!0),an&&(an.style.cursor=rn?"none":"default"),qs&&(qs.style.display=rn?"":"none")}),document.addEventListener("mousemove",t=>{if(Cn){if(rn)mi+=t.movementX*Ru,Gi-=t.movementY*Ru,Gi=Math.max(-Math.PI*.47,Math.min(Math.PI*.47,Gi));else if(Ft){const n=Ft.domElement.getBoundingClientRect();Ma.x=(t.clientX-n.left)/n.width*2-1,Ma.y=-((t.clientY-n.top)/n.height)*2+1}}}),Ft.domElement.addEventListener("contextmenu",t=>t.preventDefault()),Ft.domElement.addEventListener("mousedown",t=>{rn?(t.button===0||t.button===2)&&document.exitPointerLock():t.button===2&&Ft.domElement.requestPointerLock()}),Ft.domElement.addEventListener("wheel",t=>{if(!rn||!Cn)return;t.preventDefault(),nr.set(0,0),gi.setFromCamera(nr,wt);const n=gi.intersectObjects(on.children,!1);if(n.length===0)return;const s=n[0].object.userData;if(s.entityType!=="sector"||!s.entityId)return;const r=R.sectors.get(s.entityId);if(!r)return;const a=t.ctrlKey?Math.max(1,Vn/2):Vn,o=t.deltaY<0?a:-a,c=s.surface==="ceiling"?"ceiling":"floor",l=(r[c]??(c==="ceiling"?128:0))+o;gt(),be(`map/sectors/${s.entityId}`,{...r},{...r,[c]:l}),vt(),ge("sectors").child(s.entityId).update({[c]:l})},{passive:!1}),window.addEventListener("keydown",t=>{if(Cn&&(ln[t.code]=!0,rn&&(t.code==="KeyC"||t.code==="KeyV"||t.code==="KeyT"))){nr.set(0,0),gi.setFromCamera(nr,wt);const n=gi.intersectObjects(on.children,!1);if(n.length===0)return;const s=n[0].object.userData;if(t.code==="KeyC"){const r=Lu(s);r&&(Co=r,$e(`Copied: ${r}`))}else if(t.code==="KeyV"&&Co)Iu(s,Co);else if(t.code==="KeyT"){const r=Lu(s)||"",a=s.entityType==="sector"?"flat":"wall";document.exitPointerLock(),wr({filter:a,currentValue:r,onSelect:o=>{Iu(s,o),Ft.domElement.requestPointerLock()}})}}}),window.addEventListener("keyup",t=>{ln[t.code]=!1}),window.addEventListener("resize",of)}function of(){if(!Ft||!an||!Cn)return;const i=an.clientWidth,e=an.clientHeight;Ft.setSize(i,e),wt.aspect=i/e,wt.updateProjectionMatrix()}function cf(){for(;on.children.length;){const i=on.children[0];on.remove(i),i instanceof Yt&&(i.geometry.dispose(),i.material instanceof Pr&&i.material.dispose())}J_(on),j_(on),eS(on)}const nS=41;function iS(i,e){let t=0;return R.sectors.forEach((n,s)=>{Bn(i,e,s)&&(t=n.floor??0)}),t}function sS(){const i=rt.x,e=rt.y,t=iS(i,e);wt.position.set(i,t+nS,-e),mi=0,Gi=0}let Ic=0;function lf(i){if(!Cn)return;Lc=requestAnimationFrame(lf);const e=Math.min((i-Ic)/1e3,.1);Ic=i;const t=(ln.ShiftLeft||ln.ShiftRight?Cu*3:Cu)*e,n=new N(Math.cos(Gi)*Math.sin(mi),Math.sin(Gi),Math.cos(Gi)*-Math.cos(mi)),s=new N(Math.cos(mi),0,Math.sin(mi)),r=new N(0,1,0);ln.KeyW&&wt.position.addScaledVector(n,t),ln.KeyS&&wt.position.addScaledVector(n,-t),ln.KeyA&&wt.position.addScaledVector(s,-t),ln.KeyD&&wt.position.addScaledVector(s,t),ln.KeyQ&&wt.position.addScaledVector(r,t),ln.KeyE&&wt.position.addScaledVector(r,-t);const a=wt.position.clone().add(n);wt.lookAt(a);const o=Ys;Ys&&Ii&&(Ys.material.color.copy(Ii),Ys=null,Ii=null),gi.setFromCamera(rn?nr.set(0,0):Ma,wt);const c=gi.intersectObjects(on.children,!1);if(rn)if(c.length>0){const u=c[0].object.userData;if(u.entityType&&u.entityId){const f=u.entityType==="linedef"?"linedef":"sector";let h=null;if(f==="linedef"&&u.sidedefId){const d=R.linedefs.get(u.entityId);d&&(h=u.sidedefId===d.frontSide?"front":"back")}(!Ee||Ee.type!==f||Ee.id!==u.entityId||Wi!==h)&&(kt({type:f,id:u.entityId}),fr(h),Lt())}}else Ee&&(kt(null),fr(null),Lt());if(c.length>0&&!c[0].object.userData.billboard){const u=c[0].object;u!==o&&(Pu=i);const f=u.material;Ii=f.color.clone(),Ys=u;const h=.12+.12*Math.cos((i-Pu)*.004);f.color.setRGB(Ii.r+h,Ii.g+h,Ii.b+h)}const l=new N(Math.sin(mi),0,-Math.cos(mi));for(const u of on.children)u.userData.billboard&&u.lookAt(u.position.clone().add(l));Ft.render(tr,wt)}function uf(){tS(),Cn=!Cn;const i=document.getElementById("canvas");if(Cn)an.style.display="",i.style.display="none",of(),cf(),sS(),Ic=performance.now(),Lc=requestAnimationFrame(lf),Ft.domElement.requestPointerLock(),$e("Left-click exit look | Right-click enter look | WASD move | Shift+click multi-select | Tab exit");else{an.style.display="none",i.style.display="",cancelAnimationFrame(Lc),rn&&document.exitPointerLock();for(const e in ln)ln[e]=!1;Et()}}function Dc(){return Cn}function rS(){return!Cn||!wt?null:{x:wt.position.x,y:-wt.position.z}}let Du=0;function aS(){Cn&&(clearTimeout(Du),Du=window.setTimeout(cf,100))}function df(){function i($){const Te=new Uint8Array(8),he=$==null||$===""?"-":String($);for(let b=0;b<Math.min(he.length,8);b++)Te[b]=he.charCodeAt(b);return Te}const e=new Map;let t=0;R.vertices.forEach(($,Te)=>e.set(Te,t++));const n=[];R.linedefs.forEach(($,Te)=>{let he=e.get($.v1),b=e.get($.v2);he==null||b==null||he===b||n.push({lid:Te,ld:$,v1i:he,v2i:b})});const s=new Map;n.forEach(({lid:$},Te)=>s.set($,Te));const r=new Set;for(const{ld:$}of n)$.frontSide&&R.sidedefs.has($.frontSide)&&r.add($.frontSide),$.backSide&&R.sidedefs.has($.backSide)&&r.add($.backSide);const a=new Set;for(const $ of r){const Te=R.sidedefs.get($);Te&&Te.sector&&R.sectors.has(Te.sector)&&a.add(Te.sector)}const o=new Map,c=[];R.sidedefs.forEach(($,Te)=>{r.has(Te)&&(o.set(Te,c.length),c.push($))});const l=new Map,u=[];R.sectors.forEach(($,Te)=>{a.has(Te)&&(l.set(Te,u.length),u.push($))});const f=R.vertices.size,h=n.length,d=c.length,g=u.length,v=R.things.size,p=R.linedefs.size-h,m=R.sidedefs.size-d,x=R.sectors.size-g,S=[];v?[...R.things.values()].some($=>$.type===1)||S.push("No Player 1 Start (thing type 1) — game will crash on load"):S.push("No things placed"),p&&S.push(`${p} degenerate linedef(s) skipped`),m&&S.push(`${m} orphaned sidedef(s) skipped`),x&&S.push(`${x} orphaned sector(s) skipped`);const M=n.filter(({ld:$})=>(!$.frontSide||!o.has($.frontSide))&&(!$.backSide||!o.has($.backSide))).length;M&&S.push(`${M} linedef(s) have no valid sidedef`),console.group("[WAD Export]"),console.log(`Exporting: ${f}v ${h}l ${d}sd ${g}s ${v}t`),(p||m||x)&&console.log(`Skipped orphans: ${p}l ${m}sd ${x}s`),S.length&&(console.warn("Issues:"),S.forEach($=>console.warn("  •",$))),console.groupEnd(),S.some($=>$.includes("Player 1 Start"))&&$e("Warning: no Player 1 Start");const A=new ArrayBuffer(v*10),w=new DataView(A);let C=0;R.things.forEach($=>{w.setInt16(C,Math.round($.x??0),!0),C+=2,w.setInt16(C,Math.round($.y??0),!0),C+=2,w.setInt16(C,Math.round($.angle??0),!0),C+=2,w.setInt16(C,$.type??1,!0),C+=2,w.setInt16(C,$.flags??7,!0),C+=2});const y=new ArrayBuffer(h*14),T=new DataView(y);let X=0;for(const{ld:$,v1i:Te,v2i:he}of n)T.setInt16(X,Te,!0),X+=2,T.setInt16(X,he,!0),X+=2,T.setInt16(X,$.flags??1,!0),X+=2,T.setInt16(X,$.special??0,!0),X+=2,T.setInt16(X,$.tag??0,!0),X+=2,T.setInt16(X,$.frontSide&&o.has($.frontSide)?o.get($.frontSide):-1,!0),X+=2,T.setInt16(X,$.backSide&&o.has($.backSide)?o.get($.backSide):-1,!0),X+=2;const P=new ArrayBuffer(d*30),k=new DataView(P),V=new Uint8Array(P);let H=0;for(const $ of c)k.setInt16(H,$.xoff??0,!0),H+=2,k.setInt16(H,$.yoff??0,!0),H+=2,V.set(i($.upper),H),H+=8,V.set(i($.lower),H),H+=8,V.set(i($.mid),H),H+=8,k.setInt16(H,$.sector!=null?l.get($.sector)??0:0,!0),H+=2;const O=new ArrayBuffer(f*4),G=new DataView(O);let F=0;R.vertices.forEach($=>{G.setInt16(F,Math.round($.x??0),!0),F+=2,G.setInt16(F,Math.round($.y??0),!0),F+=2});const te=[];for(const{lid:$,ld:Te,v1i:he,v2i:b}of n){const _=Te.frontSide&&o.has(Te.frontSide),D=Te.backSide&&o.has(Te.backSide);if(!_&&!D)continue;const Z=R.vertices.get(Te.v1),j=R.vertices.get(Te.v2),K=j.x-Z.x,ye=j.y-Z.y,re=Math.round(Math.atan2(ye,K)/(2*Math.PI)*65536)&65535;_&&te.push({v1:he,v2:b,angle:re,linedef:s.get($),side:0,offset:0}),D&&te.push({v1:b,v2:he,angle:re+32768&65535,linedef:s.get($),side:1,offset:0})}const ee=new ArrayBuffer(te.length*12),de=new DataView(ee);let fe=0;for(const $ of te)de.setInt16(fe,$.v1,!0),fe+=2,de.setInt16(fe,$.v2,!0),fe+=2,de.setUint16(fe,$.angle,!0),fe+=2,de.setInt16(fe,$.linedef,!0),fe+=2,de.setInt16(fe,$.side,!0),fe+=2,de.setInt16(fe,$.offset,!0),fe+=2;const _e=te.length?new ArrayBuffer(4):new ArrayBuffer(0);if(te.length){const $=new DataView(_e);$.setInt16(0,te.length,!0),$.setInt16(2,0,!0)}const ke=new ArrayBuffer(g*26),nt=new DataView(ke),at=new Uint8Array(ke);let q=0;for(const $ of u)nt.setInt16(q,$.floor??0,!0),q+=2,nt.setInt16(q,$.ceiling??128,!0),q+=2,at.set(i($.floorTex||"FLOOR4_8"),q),q+=8,at.set(i($.ceilTex||"CEIL3_5"),q),q+=8,nt.setInt16(q,$.light??160,!0),q+=2,nt.setInt16(q,$.special??0,!0),q+=2,nt.setInt16(q,$.tag??0,!0),q+=2;const ae=new ArrayBuffer(g>0?Math.ceil(g*g/8):0);function ce(){if(!f||!h)return new ArrayBuffer(0);let $=1/0,Te=1/0,he=-1/0,b=-1/0;R.vertices.forEach(le=>{$=Math.min($,le.x),he=Math.max(he,le.x),Te=Math.min(Te,le.y),b=Math.max(b,le.y)});const _=Math.floor($)-8,D=Math.floor(Te)-8,Z=Math.max(1,Math.ceil((he-_)/128)+1),j=Math.max(1,Math.ceil((b-D)/128)+1),K=n.map(({ld:le},ue)=>{const Fe=R.vertices.get(le.v1),I=R.vertices.get(le.v2);return{i:ue,x0:Math.min(Fe.x,I.x),x1:Math.max(Fe.x,I.x),y0:Math.min(Fe.y,I.y),y1:Math.max(Fe.y,I.y)}}),ye=[];for(let le=0;le<j;le++)for(let ue=0;ue<Z;ue++){const Fe=_+ue*128,I=Fe+128,oe=D+le*128,se=oe+128,Se=[0];for(const Q of K)Q.x1>=Fe&&Q.x0<=I&&Q.y1>=oe&&Q.y0<=se&&Se.push(Q.i);Se.push(65535),ye.push(Se)}const re=4+Z*j,Re=[];let De=re;for(const le of ye)Re.push(De),De+=le.length;const ne=new ArrayBuffer(De*2),ie=new DataView(ne);let me=0;ie.setInt16(me,_,!0),me+=2,ie.setInt16(me,D,!0),me+=2,ie.setInt16(me,Z,!0),me+=2,ie.setInt16(me,j,!0),me+=2;for(const le of Re)ie.setUint16(me,le,!0),me+=2;for(const le of ye)for(const ue of le)ie.setUint16(me,ue,!0),me+=2;return ne}const Oe=[{name:"MAP01",buf:new ArrayBuffer(0)},{name:"THINGS",buf:A},{name:"LINEDEFS",buf:y},{name:"SIDEDEFS",buf:P},{name:"VERTEXES",buf:O},{name:"SEGS",buf:ee},{name:"SSECTORS",buf:_e},{name:"NODES",buf:new ArrayBuffer(0)},{name:"SECTORS",buf:ke},{name:"REJECT",buf:ae},{name:"BLOCKMAP",buf:ce()}],Ne=12+Oe.reduce(($,Te)=>$+Te.buf.byteLength,0),xt=new ArrayBuffer(Ne+Oe.length*16),qe=new DataView(xt),Ze=new Uint8Array(xt);Ze.set([80,87,65,68],0),qe.setInt32(4,Oe.length,!0),qe.setInt32(8,Ne,!0);let tt=12;const Ve=[];for(const $ of Oe)Ve.push({off:tt,size:$.buf.byteLength,name:$.name}),$.buf.byteLength>0&&(Ze.set(new Uint8Array($.buf),tt),tt+=$.buf.byteLength);let ot=Ne;for(const $ of Ve)qe.setInt32(ot,$.off,!0),ot+=4,qe.setInt32(ot,$.size,!0),ot+=4,Ze.set(i($.name),ot),ot+=8;console.table(Ve.map($=>({lump:$.name,offset:$.off,size:$.size})));let L=`MAP01: ${f}v ${h}l ${d}sd ${g}s ${v}t`;const pt=p+m+x;return pt&&(L+=` (${pt} orphans skipped)`),{wad:xt,msg:L}}function oS(){const i=df();if(!i)return;const{wad:e,msg:t}=i,n=new Blob([e],{type:"application/octet-stream"}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download="map.wad",s.click(),URL.revokeObjectURL(s.href),$e(t)}const cS="http://127.0.0.1:3666";async function Uc(i,e){const t=df();if(!t)return;const{wad:n,msg:s}=t;try{const r=i!=null&&e!=null?`?x=${Math.round(i)}&y=${Math.round(e)}`:"",o=await(await fetch(`${cS}/launch${r}`,{method:"POST",body:new Uint8Array(n)})).json();o.ok?$e(`Launched (${o.game}) — ${s}`):$e(`Launch error: ${o.error}`)}catch{$e("Launcher not running — start launcher/server.js")}}function hs(i,e){kt({type:i,id:e}),Lt()}function Uu(i,e,t){const n=R.linedefs.get(i);if(!n)return null;const s=R.vertices.get(n.v1),r=R.vertices.get(n.v2);return!s||!r?null:(r.x-s.x)*(t-s.y)-(r.y-s.y)*(e-s.x)<0?"front":"back"}let Di=null,pi={x:0,y:0},yn=null,ms=null,oa=!1,ff=0,hf=0;function Nu(i){const e=new Set;for(const t of i){const n=R.linedefs.get(t);n&&(e.add(n.v1),e.add(n.v2))}return e}function Fu(i){const e=new Set;for(const t of i)for(const n of Hc(t))for(const s of n)e.add(s);return e}function ca(i,e,t){yn=new Map;let n=null,s=1/0;for(const r of i){const a=R.vertices.get(r);if(!a)continue;yn.set(r,{x:a.x,y:a.y});const o=Math.hypot(a.x-e,a.y-t);o<s&&(s=o,n=r)}if(n){ms=n;const r=R.vertices.get(n);pi={x:r.x-e,y:r.y-t}}}function lS(i){function e(n){const s=i.getBoundingClientRect();return{sx:n.clientX-s.left,sy:n.clientY-s.top}}i.addEventListener("contextmenu",n=>n.preventDefault()),i.addEventListener("dblclick",n=>{if(Mn!=="select")return;const{sx:s,sy:r}=e(n),{x:a,y:o}=Ni(s,r),c=da(a,o,fa/ft);c!==null&&(pd(c,Jt(a),Jt(o)),Et())}),i.addEventListener("mousemove",n=>{ff=n.clientX,hf=n.clientY;const{sx:s,sy:r}=e(n);if(kf(Ni(s,r)),document.getElementById("coords").textContent=`${Math.round(rt.x)}, ${Math.round(rt.y)}`,$u){Bt.x=Ks.px+(n.clientX-Ks.mx),Bt.y=Ks.py+(n.clientY-Ks.my),Et();return}if(yn&&ms){const a=yn.get(ms),o=a.x+(rt.x-a.x)+pi.x,c=a.y+(rt.y-a.y)+pi.y,l=n.altKey?o:Jt(o),u=n.altKey?c:Jt(c),f=l-a.x,h=u-a.y;for(const[d,g]of yn)ge("vertices").child(d).update({x:g.x+f,y:g.y+h});return}if(Dn){const a=rt.x+pi.x,o=rt.y+pi.y,c=n.altKey?a:Jt(a),l=n.altKey?o:Jt(o);Dn.type==="vertex"?ge("vertices").child(Dn.id).update({x:c,y:l}):Dn.type==="thing"&&ge("things").child(Dn.id).update({x:c,y:l});return}if(Hi){Et();return}if(Mn==="select"){const a=rt.x,o=rt.y,c=pr(a,o,Si/ft),l=c===null?Sl(a,o,Ml/ft):null,u=c===null&&l===null?da(a,o,fa/ft):null;let f=null;if(c!==null?f={type:"vertex",id:c}:l!==null?f={type:"thing",id:l}:u!==null?f={type:"linedef",id:u}:R.sectors.forEach((h,d)=>{Bn(a,o,d)&&(f={type:"sector",id:d})}),(Ee==null?void 0:Ee.type)==="linedef"){const h=Uu(Ee.id,a,o);h!==null&&Wi!==h&&(fr(h),Lt())}((Rt==null?void 0:Rt.type)!==(f==null?void 0:f.type)||(Rt==null?void 0:Rt.id)!==(f==null?void 0:f.id))&&(Zu(f),Et())}else Mn==="draw"&&Et()}),i.addEventListener("mousedown",async n=>{if(n.button===1||n.button===0&&qu){Ea(!0),Ku({mx:n.clientX,my:n.clientY,px:Bt.x,py:Bt.y}),n.preventDefault();return}if(n.button!==0)return;const{sx:s,sy:r}=e(n),{x:a,y:o}=Ni(s,r);if(Mn==="select"){const c=pr(a,o,Si/ft),l=Sl(a,o,Ml/ft),u=da(a,o,fa/ft);if(c!==null&&n.shiftKey){const f=Pt==="vertex"?new Set(et):new Set;(Ee==null?void 0:Ee.type)==="vertex"&&!f.has(Ee.id)&&f.add(Ee.id),f.has(c)?f.delete(c):f.add(c),Ot(f,"vertex"),kt(null),Lt()}else if(c!==null&&Pt==="vertex"&&et.size>0&&et.has(c)){yn=new Map;for(const h of et){const d=R.vertices.get(h);d&&yn.set(h,{x:d.x,y:d.y})}ms=c;const f=R.vertices.get(c);pi={x:f.x-a,y:f.y-o}}else if(c!==null){Ot(new Set),hs("vertex",c),Ha({type:"vertex",id:c});const f=R.vertices.get(c);f&&(Di={...f},pi={x:f.x-a,y:f.y-o})}else if(l!==null){Ot(new Set),hs("thing",l),Ha({type:"thing",id:l});const f=R.things.get(l);f&&(Di={...f},pi={x:f.x-a,y:f.y-o})}else if(u!==null&&n.shiftKey){const f=Pt==="linedef"?new Set(et):new Set;(Ee==null?void 0:Ee.type)==="linedef"&&!f.has(Ee.id)&&f.add(Ee.id),f.has(u)?f.delete(u):f.add(u),Ot(f,"linedef"),kt(null),Lt()}else if(u!==null&&Pt==="linedef"&&et.has(u))ca(Nu(et),a,o);else if(u!==null)Ot(new Set),fr(Uu(u,a,o)),hs("linedef",u),ca(Nu([u]),a,o);else{let f=null;if(R.sectors.forEach((h,d)=>{Bn(a,o,d)&&(f=d)}),f!==null&&n.shiftKey){const h=Pt==="sector"?new Set(et):new Set;(Ee==null?void 0:Ee.type)==="sector"&&!h.has(Ee.id)&&h.add(Ee.id),h.has(f)?h.delete(f):h.add(f),Ot(h,"sector"),kt(null),Lt()}else f!==null&&n.ctrlKey&&Pt==="sector"&&et.has(f)?ca(Fu(et),a,o):f!==null&&n.ctrlKey?(Ot(new Set),hs("sector",f),ca(Fu([f]),a,o)):(oa=n.shiftKey,ba({x:a,y:o}))}Et()}else Mn==="draw"?(await Hh(a,o),Et()):Mn==="thing"&&(gt(),Xh(Jt(a),Jt(o)),vt())}),i.addEventListener("mouseup",()=>{if(Ea(!1),Hi){const n=Hi,s=rt,r=Math.abs(s.x-n.x),a=Math.abs(s.y-n.y),o=4/ft;if(ba(null),r<o&&a<o){oa||(Ot(new Set),kt(null));let c=null;R.sectors.forEach((l,u)=>{Bn(n.x,n.y,u)&&(c=u)}),c?hs("sector",c):Lt()}else{oa||kt(null);const c=Math.min(n.x,s.x),l=Math.max(n.x,s.x),u=Math.min(n.y,s.y),f=Math.max(n.y,s.y),h=oa?new Set(et):new Set;if(R.vertices.forEach((d,g)=>{d.x>=c&&d.x<=l&&d.y>=u&&d.y<=f&&h.add(g)}),h.size===1){const d=[...h][0];Ot(new Set),hs("vertex",d)}else Ot(h,"vertex"),Lt()}Et();return}if(yn&&ms){let n=!1;for(const[s,r]of yn){const a=R.vertices.get(s);if(a&&(r.x!==a.x||r.y!==a.y)){n=!0;break}}if(n){gt();for(const[s,r]of yn){const a=R.vertices.get(s);a&&be(`map/vertices/${s}`,{...r},{...a})}vt()}yn=null,ms=null;return}if(Dn&&Di){const n=Dn.type==="vertex"?"vertices":"things",s=R[n].get(Dn.id);s&&(Di.x!==s.x||Di.y!==s.y)&&(gt(),be(`map/${n}/${Dn.id}`,Di,{...s}),vt())}Ha(null),Di=null});const t=/Mac|iPhone|iPad/.test(navigator.platform);i.addEventListener("wheel",n=>{if(n.preventDefault(),n.ctrlKey||n.metaKey||!t&&!n.shiftKey){const{sx:r,sy:a}=e(n),o=Ni(r,a),c=n.deltaY<0?1.05625:1/1.05625;Yu(Math.max(.05,Math.min(32,ft*c)));const l=Ni(r,a);Bt.x+=(l.x-o.x)*ft,Bt.y-=(l.y-o.y)*ft}else Bt.x-=n.deltaX*1.5,Bt.y-=n.deltaY*1.5;Et()},{passive:!1})}function uS(i){function e(t){Bf(t),Ta(),Zu(null),Ot(new Set),ba(null),document.querySelectorAll(".tool-btn").forEach(n=>n.classList.toggle("active",n.dataset.tool===t)),i.style.cursor=t==="select"?"crosshair":t==="draw"?`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' fill='white' stroke='black' stroke-width='.5'/%3E%3C/svg%3E") 2 22, crosshair`:"crosshair",Et()}return window.addEventListener("keydown",t=>{var n;if(!["INPUT","SELECT","TEXTAREA"].includes(t.target.tagName)){if(t.key==="F5"){t.preventDefault();const r=rS()??rt;let a=!1;R.sectors.forEach((o,c)=>{Bn(r.x,r.y,c)&&(a=!0)}),a?Uc(r.x,r.y):Uc();return}if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"&&!t.shiftKey){t.preventDefault(),yh();return}if((t.ctrlKey||t.metaKey)&&(t.key.toLowerCase()==="y"||t.key.toLowerCase()==="z"&&t.shiftKey)){t.preventDefault(),Mh();return}if(t.key===" "){_l(!0),Ea(!0),Ku({mx:ff,my:hf,px:Bt.x,py:Bt.y}),t.preventDefault();return}if(t.key==="Enter"&&Mn==="draw"){Gh().then(()=>Et());return}if(t.key==="Escape"){Ta(),Ot(new Set),ba(null),Et();return}if(t.key==="Delete"||t.key==="Backspace"){et.size>0?Yh():md();return}if(t.key.toLowerCase()==="m"&&Mn==="select"){if(Pt==="sector")qh();else if(Pt==="linedef"&&et.size===2){const[s,r]=[...et];Kh(s,r)}else $h();return}if(t.key==="Tab"){t.preventDefault(),uf(),(n=document.getElementById("view3d-btn"))==null||n.classList.toggle("active",Dc());return}if(!Dc()){if(t.key.toLowerCase()==="c"){const a=da(rt.x,rt.y,fa/ft);a!==null&&(pd(a,Jt(rt.x),Jt(rt.y)),Et());return}const r={s:"select",d:"draw",t:"thing"}[t.key.toLowerCase()];r&&e(r)}}}),window.addEventListener("keyup",t=>{t.key===" "&&(_l(!1),Ea(!1))}),e}function dS(){const i={ld:0,sd:0,sec:0,vt:0},e={flip:0,tex:0};R.linedefs.forEach((a,o)=>{(!R.vertices.has(a.v1)||!R.vertices.has(a.v2))&&(a.frontSide&&ge("sidedefs").child(a.frontSide).remove(),a.backSide&&ge("sidedefs").child(a.backSide).remove(),ge("linedefs").child(o).remove(),i.ld++)}),R.linedefs.forEach((a,o)=>{if(a.frontSide&&a.backSide)return;const c=a.frontSide||a.backSide;if(!c)return;const l=R.sidedefs.get(c);if(!(l!=null&&l.sector))return;const u=R.vertices.get(a.v1),f=R.vertices.get(a.v2),h=f.x-u.x,d=f.y-u.y,g=Math.sqrt(h*h+d*d);if(g===0)return;const v=.1,p=(u.x+f.x)/2+d/g*v,m=(u.y+f.y)/2-h/g*v,x=Bn(p,m,l.sector),S=!!a.frontSide;x!==S&&(ge("linedefs").child(o).update({v1:a.v2,v2:a.v1}),e.flip++)}),R.linedefs.forEach(a=>{a.flags&4&&[a.frontSide,a.backSide].forEach(o=>{if(!o)return;const c=R.sidedefs.get(o);if(!c)return;const l={};(!c.upper||c.upper==="-")&&(l.upper="STARTAN2"),(!c.lower||c.lower==="-")&&(l.lower="STARTAN2"),Object.keys(l).length&&(ge("sidedefs").child(o).update(l),e.tex++)})});const t=new Set;R.linedefs.forEach(a=>{a.frontSide&&t.add(a.frontSide),a.backSide&&t.add(a.backSide)}),R.sidedefs.forEach((a,o)=>{t.has(o)||(ge("sidedefs").child(o).remove(),i.sd++)});const n=new Set;R.sidedefs.forEach((a,o)=>{t.has(o)&&a.sector&&R.sectors.has(a.sector)&&n.add(a.sector)}),R.sectors.forEach((a,o)=>{n.has(o)||(ge("sectors").child(o).remove(),i.sec++)});const s=new Set;R.linedefs.forEach(a=>{s.add(a.v1),s.add(a.v2)}),R.vertices.forEach((a,o)=>{s.has(o)||(ge("vertices").child(o).remove(),i.vt++)});const r=[];i.ld+i.sd+i.sec+i.vt&&r.push(`removed ${i.sec}s ${i.sd}sd ${i.ld}l ${i.vt}v`),e.flip&&r.push(`${e.flip} facing flips`),e.tex&&r.push(`${e.tex} texture fixes`),$e(r.length?"Cleaned: "+r.join(", "):"Map is clean")}const Nc=1,pf=["vertices","linedefs","sidedefs","sectors","things"];function fS(i){const e={};return i.forEach((t,n)=>{e[n]=t}),e}function hS(){const i={version:Nc};for(const r of pf)i[r]=fS(R[r]);const e=JSON.stringify(i,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download="map.json",s.click(),URL.revokeObjectURL(n),$e("Map exported as JSON")}async function mf(i){const e=await i.text(),t=JSON.parse(e);if(typeof t.version!="number"){$e("Invalid file: missing version");return}if(t.version>Nc){$e(`File version ${t.version} is newer than supported (${Nc})`);return}if(!confirm("Import will replace the current map. Continue?"))return;const n={};for(const s of pf)n["map/"+s]=t[s]??null;await $t.ref().update(n),cd(),$e("Map imported from JSON")}function pS(){const i=document.createElement("input");i.type="file",i.accept=".json",i.addEventListener("change",async()=>{var t;const e=(t=i.files)==null?void 0:t[0];if(e)try{await mf(e)}catch(n){$e("Import failed: "+n.message)}}),i.click()}function mS(){document.addEventListener("dragover",i=>{i.preventDefault()}),document.addEventListener("drop",async i=>{var t;i.preventDefault();const e=(t=i.dataTransfer)==null?void 0:t.files[0];if(!(!e||!e.name.endsWith(".json")))try{await mf(e)}catch(n){$e("Import failed: "+n.message)}})}function gS(i,e,t,n,s,r,a,o){if(i===s&&e===r||i===a&&e===o||t===s&&n===r||t===a&&n===o)return!1;const c=(d,g,v,p,m,x)=>(v-d)*(x-g)-(p-g)*(m-d),l=c(s,r,a,o,i,e),u=c(s,r,a,o,t,n),f=c(i,e,t,n,s,r),h=c(i,e,t,n,a,o);return(l>0&&u<0||l<0&&u>0)&&(f>0&&h<0||f<0&&h>0)}function Ou(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const a=t[s].x,o=t[s].y,c=t[r].x,l=t[r].y;o>e!=l>e&&i<(c-a)*(e-o)/(l-o)+a&&(n=!n)}return n}function Bu(i){const e=[];for(let t=0;t<i.length;t++)e.push([i[t],i[(t+1)%i.length]]);return e}function ku(i,e){return e.some(t=>t.x===i.x&&t.y===i.y)}function vS(){const i=[],e=[...R.sectors.keys()],t=new Map;for(const n of e)t.set(n,Ar(n));for(let n=0;n<e.length;n++)for(let s=n+1;s<e.length;s++){const r=e[n],a=e[s],o=t.get(r),c=t.get(a),l=o.flat(),u=c.flat();let f=!1;e:for(const h of o)for(const d of c)for(const[g,v]of Bu(h))for(const[p,m]of Bu(d))if(gS(g.x,g.y,v.x,v.y,p.x,p.y,m.x,m.y)){i.push({sectorA:r,sectorB:a,reason:`edges (${g.x},${g.y})-(${v.x},${v.y}) and (${p.x},${p.y})-(${m.x},${m.y}) cross`}),f=!0;break e}if(!f){for(const h of l){if(f)break;if(ku(h,u))continue;let d=0;for(const g of c)Ou(h.x,h.y,g)&&d++;(d&1)===1&&(i.push({sectorA:r,sectorB:a,reason:`vertex (${h.x},${h.y}) of sector ${r} is inside sector ${a}`}),f=!0)}for(const h of u){if(f)break;if(ku(h,l))continue;let d=0;for(const g of o)Ou(h.x,h.y,g)&&d++;(d&1)===1&&(i.push({sectorA:r,sectorB:a,reason:`vertex (${h.x},${h.y}) of sector ${a} is inside sector ${r}`}),f=!0)}}}return i}function xS(i){document.querySelectorAll(".tool-btn").forEach(a=>a.addEventListener("click",()=>i(a.dataset.tool))),document.getElementById("import-wad-btn").addEventListener("click",()=>{const a=document.createElement("input");a.type="file",a.accept=".wad",a.addEventListener("change",async()=>{var c;const o=(c=a.files)==null?void 0:c[0];if(o)try{$e("Importing WAD...");const{flats:l,walls:u}=await Zf(o);$e(`Loaded ${l} flats + ${u} wall textures`),Lt()}catch(l){$e(`Import failed: ${l.message}`)}}),a.click()}),document.getElementById("thing-type-btn").addEventListener("click",()=>{Th(()=>i("thing"))}),document.getElementById("view3d-btn").addEventListener("click",()=>{uf(),document.getElementById("view3d-btn").classList.toggle("active",Dc())});const e=document.getElementById("record-btn"),t=document.getElementById("record-modal"),n=document.getElementById("record-output");let s=[],r="recorded test case";e.addEventListener("click",()=>{Ah()?(s=Ch(),e.textContent="Record",e.style.background="#2a1a1a",$e(`Recording stopped — ${s.length} step(s)`),s.length&&(r=prompt("Test title:")||"recorded test case",n.value=bl(s,r),t.style.display="flex")):(wh(),e.textContent="● REC",e.style.background="#4a1a1a",$e("Recording started — draw sectors, split, delete..."))}),document.getElementById("record-copy-test").addEventListener("click",()=>{navigator.clipboard.writeText(bl(s,r)),$e("Test code copied to clipboard")}),document.getElementById("record-copy-json").addEventListener("click",()=>{navigator.clipboard.writeText(kh(s)),$e("JSON recording copied to clipboard")}),document.getElementById("record-close").addEventListener("click",()=>{t.style.display="none"}),document.getElementById("clean-btn").addEventListener("click",dS),document.getElementById("overlap-btn").addEventListener("click",()=>{const a=vS();a.length===0?$e("No overlapping sectors found"):$e(`${a.length} overlap(s): ${a.map(o=>o.reason).join("; ")}`)}),document.getElementById("wad-btn").addEventListener("click",oS),document.getElementById("json-export-btn").addEventListener("click",hS),document.getElementById("json-import-btn").addEventListener("click",pS),document.getElementById("play-btn").addEventListener("click",()=>Uc()),document.getElementById("clear-btn").addEventListener("click",()=>{confirm("Clear the entire map? This cannot be undone.")&&($t.ref("map").remove(),kt(null),Lt())})}function zu(i){return i.replace(/s$/,"")}function _S(i){const e=ge(i);e.on("child_added",t=>{if(R[i].set(t.key,t.val()),i==="linedefs"){const n=t.val();eh(t.key,n.v1,n.v2)}else if(i==="sidedefs"){const n=t.val();ih(t.key,n.sector)}vs()}),e.on("child_changed",t=>{const n=i==="linedefs"?R.linedefs.get(t.key):void 0,s=i==="sidedefs"?R.sidedefs.get(t.key):void 0;if(R[i].set(t.key,t.val()),i==="linedefs"&&n){const r=t.val();th(t.key,r.v1,r.v2,n.v1,n.v2)}else if(i==="sidedefs"){const r=t.val();sh(t.key,r.sector,s==null?void 0:s.sector)}if(vs(),Ee&&Ee.type===zu(i)&&Ee.id===t.key)Mi();else if(i==="sidedefs"&&(Ee==null?void 0:Ee.type)==="linedef"){const r=R.linedefs.get(Ee.id);r&&(r.frontSide===t.key||r.backSide===t.key)&&Mi()}}),e.on("child_removed",t=>{if(i==="linedefs"){const n=R.linedefs.get(t.key);n&&nh(t.key,n.v1,n.v2)}else if(i==="sidedefs"){const n=R.sidedefs.get(t.key);n&&rh(t.key,n.sector)}R[i].delete(t.key),Ee&&Ee.type===zu(i)&&Ee.id===t.key&&(kt(null),Mi()),vs()})}function SS(){["vertices","linedefs","sidedefs","sectors","things"].forEach(_S),$t.ref("settings/snapSize").on("value",i=>{const e=i.val();if(e!=null){Hf(e);const t=document.getElementById("snap-size-sel");t&&(t.value=String(e))}}),Qf().then(fd)}function yS(){const i=$t.ref("presence/"+Of);i.set(!0),i.onDisconnect().remove(),$t.ref("presence").on("value",e=>{const t=e.numChildren();document.getElementById("users").textContent=t+(t===1?" user":" users")}),$t.ref(".info/connected").on("value",e=>{const t=document.getElementById("status");t.textContent=e.val()?"Connected":"Offline",t.className=e.val()?"connected":"disconnected"})}Gf({draw:Et,renderPanel:Lt,rebuild3D:aS});const Yi=document.getElementById("canvas");ch(Yi);function gf(){const i=document.getElementById("canvas-wrap");Yi.width=i.clientWidth,Yi.height=i.clientHeight,Et()}window.addEventListener("resize",gf);lS(Yi);const MS=uS(Yi);xS(MS);document.getElementById("snap-size-sel").addEventListener("change",i=>{const e=parseInt(i.target.value,10);$t.ref("settings/snapSize").set(e)});mS();function vf(i){const e=[{key:"apiKey",label:"API Key"},{key:"authDomain",label:"Auth Domain"},{key:"databaseURL",label:"Database URL"},{key:"projectId",label:"Project ID"},{key:"storageBucket",label:"Storage Bucket"},{key:"messagingSenderId",label:"Messaging Sender ID"},{key:"appId",label:"App ID"}],t=Gu(),n=document.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;display:flex;align-items:center;justify-content:center;";const s=document.createElement("div");s.style.cssText="background:#1a1a1a;border:1px solid #444;border-radius:6px;padding:16px;width:420px;font-family:monospace;",s.innerHTML='<div style="color:#ccc;font-size:14px;margin-bottom:12px;">Firebase Configuration</div><div style="color:#888;font-size:11px;margin-bottom:12px;">Find these values in Firebase Console → Project Settings</div>';const r={};for(const l of e){const u=document.createElement("div");u.style.cssText="margin-bottom:8px;",u.innerHTML=`<label style="color:#888;font-size:11px;display:block;margin-bottom:2px;">${l.label}</label>`;const f=document.createElement("input");f.style.cssText="width:100%;box-sizing:border-box;background:#111;color:#ccc;border:1px solid #333;border-radius:3px;padding:4px 6px;font-family:monospace;font-size:12px;",f.placeholder=l.key,t!=null&&t[l.key]&&(f.value=t[l.key]),r[l.key]=f,u.appendChild(f),s.appendChild(u)}const a=document.createElement("div");a.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;";const o=document.createElement("button");o.textContent="Cancel",o.style.cssText="background:#2a1a1a;border:1px solid #644;color:#f88;padding:4px 12px;cursor:pointer;border-radius:3px;font-size:12px;font-family:monospace;",o.onclick=()=>n.remove();const c=document.createElement("button");c.textContent=i?"Connect":"Save",c.style.cssText="background:#1a2a1a;border:1px solid #464;color:#8f8;padding:4px 12px;cursor:pointer;border-radius:3px;font-size:12px;font-family:monospace;",c.onclick=()=>{const l={};for(const u of e){const f=r[u.key].value.trim();if(!f){r[u.key].style.borderColor="#f44";return}l[u.key]=f}Uf(l),i?Xu():n.remove()},a.append(o,c),s.appendChild(a),n.appendChild(s),document.body.appendChild(n),r.apiKey.focus()}const Vu=document.getElementById("status"),ES=document.getElementById("users"),ps=document.getElementById("connect-btn"),xf=document.getElementById("settings-btn");xf.style.display="";xf.addEventListener("click",()=>vf(!1));Wu?(yS(),ps.textContent="Disconnect",ps.style.display="",ps.addEventListener("click",Ff)):(Vu.textContent="Local",Vu.className="connected",ES.textContent="",ps.textContent="Connect",ps.style.display="",ps.addEventListener("click",()=>{Df()?Xu():vf(!0)}));gf();Bt.x=Yi.width/2;Bt.y=Yi.height/2;Et();Po.then(()=>{SS(),ge("vertices").once("value").then(()=>{setTimeout(cd,100)})});
