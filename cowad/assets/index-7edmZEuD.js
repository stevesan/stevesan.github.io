(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class dn{constructor(e,t){this.key=e,this._val=t}val(){return this._val}numChildren(){return this._val&&typeof this._val=="object"?Object.keys(this._val).length:0}}const Pf="cowad-local",dr="data",Xu="store",ki={};let fo=null;function Lf(){return new Promise((i,e)=>{const t=indexedDB.open(Pf,1);t.onupgradeneeded=()=>{t.result.createObjectStore(dr)},t.onsuccess=()=>i(t.result),t.onerror=()=>e(t.error)})}function If(){return Lf().then(i=>(fo=i,new Promise(e=>{const n=i.transaction(dr,"readonly").objectStore(dr).get(Xu);n.onsuccess=()=>{n.result&&Object.assign(ki,n.result),e()},n.onerror=()=>e()}))).catch(()=>{})}let Go=null;function Sl(){fo&&(Go||(Go=setTimeout(()=>{if(Go=null,!fo)return;fo.transaction(dr,"readwrite").objectStore(dr).put(structuredClone(ki),Xu)},100)))}const ir=new Map;function li(i,e){const t=ir.get(i);return t?t.filter(n=>n.event===e).map(n=>n.callback):[]}function Df(i,e,t){ir.has(i)||ir.set(i,[]),ir.get(i).push({event:e,callback:t})}function Jn(i){let e=ki;for(const t of i){if(e==null||typeof e!="object")return;e=e[t]}return e}function Wo(i,e){if(i.length===0){if(e==null)for(const s of Object.keys(ki))delete ki[s];else typeof e=="object"&&Object.assign(ki,e);return}let t=ki;for(let s=0;s<i.length-1;s++)(t[i[s]]==null||typeof t[i[s]]!="object")&&(t[i[s]]={}),t=t[i[s]];const n=i[i.length-1];e==null?delete t[n]:t[n]=e}function Xo(i,e,t,n){if(e.length>=2){const o=e.slice(0,-1).join("/"),a=e[e.length-1],c=t!==void 0,l=n==null;if(!c&&!l)for(const u of li(o,"child_added"))u(new dn(a,n));else if(c&&l)for(const u of li(o,"child_removed"))u(new dn(a,t));else if(c&&!l)for(const u of li(o,"child_changed"))u(new dn(a,n))}for(const o of li(i,"value"))o(new dn(e[e.length-1]||"",n??null));if(e.length>=2){const o=e.slice(0,-1).join("/"),a=Jn(e.slice(0,-1));for(const c of li(o,"value"))c(new dn(e[e.length-2]||"",a??null))}if(n==null&&t&&typeof t=="object")for(const[o,a]of ir){if(!o.startsWith(i+"/"))continue;const c=o.slice(i.length+1).split("/");let l=t;for(const d of c){if(l==null||typeof l!="object"){l=void 0;break}l=l[d]}if(l==null||typeof l!="object")continue;const u=a.filter(d=>d.event==="child_removed").map(d=>d.callback);for(const d of u)for(const[f,h]of Object.entries(l))d(new dn(f,h))}const s=t!=null&&typeof t=="object";if(n!=null&&typeof n=="object"){const o=s?new Set(Object.keys(t)):new Set;for(const[a,c]of Object.entries(n))if(o.has(a)){if(JSON.stringify(t[a])!==JSON.stringify(c))for(const l of li(i,"child_changed"))l(new dn(a,c))}else for(const l of li(i,"child_added"))l(new dn(a,c));if(s){for(const a of Object.keys(t))if(!(a in n))for(const c of li(i,"child_removed"))c(new dn(a,t[a]))}}}let Uf=Date.now();class zc{constructor(e){this._path=e.replace(/^\/+|\/+$/g,"")}get key(){const e=this._path.split("/");return e[e.length-1]||""}get segments(){return this._path?this._path.split("/"):[]}child(e){const t=this._path?`${this._path}/${e}`:e;return new zc(t)}set(e){const t=this.segments,n=Jn(t);Wo(t,e);const s=Jn(t);return Xo(this._path,t,n,s),Sl(),Promise.resolve()}update(e){if(e==null)return Promise.resolve();const t=this.segments;if(t.length===0)for(const[n,s]of Object.entries(e)){const r=n.split("/").filter(c=>c),o=Jn(r);Wo(r,s);const a=Jn(r);Xo(n,r,o,a)}else{const n=Jn(t),s=n&&typeof n=="object"?{...n}:{};for(const[r,o]of Object.entries(e))o==null?delete s[r]:s[r]=o;Wo(t,s),Xo(this._path,t,n,s)}return Sl(),Promise.resolve()}remove(){return this.set(null)}push(e){const t="-"+(++Uf).toString(36)+Math.random().toString(36).slice(2,8),n=this.child(t);if(e!==void 0){const r=n.set(e).then(()=>n);return r.key=t,r}const s=Promise.resolve(n);return s.key=t,s}on(e,t){if(Df(this._path,e,t),e==="value"){const n=Jn(this.segments);t(new dn(this.key,n??null))}else if(e==="child_added"){const n=Jn(this.segments);if(n&&typeof n=="object")for(const[s,r]of Object.entries(n))t(new dn(s,r))}}once(e){const t=Jn(this.segments);return Promise.resolve(new dn(this.key,t??null))}onDisconnect(){return{remove(){}}}}class Nf{ref(e){return new zc(e||"")}}function Ff(){const i=If();return{db:new Nf,ready:i}}const Vc="cowad-firebase-config",Hc="cowad-firebase-connected";function Of(){return localStorage.getItem(Vc)!==null}function $u(){try{const i=localStorage.getItem(Vc);return i?JSON.parse(i):null}catch{return null}}function Bf(i){localStorage.setItem(Vc,JSON.stringify(i))}let qu=!1,It,Da;const kf=localStorage.getItem(Hc)==="true",yl=$u();if(kf&&yl)firebase.initializeApp({...yl}),It=firebase.database(),qu=!0,Da=Promise.resolve();else{const i=Ff();It=i.db,Da=i.ready}function pe(i){return It.ref("map/"+i)}function Yu(){localStorage.setItem(Hc,"true"),location.reload()}function zf(){localStorage.setItem(Hc,"false"),location.reload()}const Vf=Math.random().toString(36).slice(2,10),P={vertices:new Map,linedefs:new Map,sidedefs:new Map,sectors:new Map,things:new Map};let Qt="select",be=null,kt={x:0,y:0},dt=1,Ku=!1,Ks={mx:0,my:0,px:0,py:0},ju=!1,Nn=null,rt={x:0,y:0},Rt=null,Ct=[],et=new Set,Pt=null,Gi=null,xn=8,$i=null,fr=new Map,Tr="doom2";function Hf(i){Qt=i}function Vt(i){be=i}function Zu(i){dt=i}function To(i){Ku=i}function Ju(i){Ks=i}function Ml(i){ju=i}function $o(i){Nn=i}function Gf(i){rt=i}function Qu(i){Rt=i}function Wf(i){Ct=i}function Bt(i,e){et=i,e!==void 0&&(Pt=e),i.size===0&&(Pt=null,fr=new Map),Pt!=="linedef"&&(fr=new Map)}function Xf(i){fr=i}function Ao(i){Gi=i}function $f(i){xn=i}function hr(i){$i=i}function ed(i){Tr=i}let td=()=>{},nd=()=>{},id=()=>{};function qf(i){td=i.draw,nd=i.renderPanel,i.rebuild3D&&(id=i.rebuild3D)}function Wi(){td(),id()}function Mi(){nd()}const Ar={1:{name:"Player 1 Start",cat:"player",radius:16},2:{name:"Player 2 Start",cat:"player",radius:16},3:{name:"Player 3 Start",cat:"player",radius:16},4:{name:"Player 4 Start",cat:"player",radius:16},11:{name:"Deathmatch Start",cat:"player",radius:20},3004:{name:"Zombieman",cat:"enemy",radius:20},9:{name:"Shotgun Guy",cat:"enemy",radius:20},3001:{name:"Imp",cat:"enemy",radius:20},3002:{name:"Demon",cat:"enemy",radius:30},58:{name:"Spectre",cat:"enemy",radius:30},3005:{name:"Cacodemon",cat:"enemy",radius:31},3003:{name:"Baron of Hell",cat:"enemy",radius:24},3006:{name:"Lost Soul",cat:"enemy",radius:16},16:{name:"Cyberdemon",cat:"enemy",radius:40},7:{name:"Spider Mastermind",cat:"enemy",radius:128},65:{name:"Chaingun Guy",cat:"enemy",radius:20,doom2Only:!0},64:{name:"Arch-Vile",cat:"enemy",radius:20,doom2Only:!0},66:{name:"Revenant",cat:"enemy",radius:20,doom2Only:!0},67:{name:"Mancubus",cat:"enemy",radius:48,doom2Only:!0},68:{name:"Arachnotron",cat:"enemy",radius:64,doom2Only:!0},69:{name:"Hell Knight",cat:"enemy",radius:24,doom2Only:!0},71:{name:"Pain Elemental",cat:"enemy",radius:31,doom2Only:!0},84:{name:"Wolfenstein SS",cat:"enemy",radius:20,doom2Only:!0},2005:{name:"Chainsaw",cat:"weapon",radius:20},2001:{name:"Shotgun",cat:"weapon",radius:20},82:{name:"Super Shotgun",cat:"weapon",radius:20,doom2Only:!0},2002:{name:"Chaingun",cat:"weapon",radius:20},2003:{name:"Rocket Launcher",cat:"weapon",radius:20},2004:{name:"Plasma Rifle",cat:"weapon",radius:20},2006:{name:"BFG 9000",cat:"weapon",radius:20},2007:{name:"Clip",cat:"ammo",radius:20},2048:{name:"Box of Bullets",cat:"ammo",radius:20},2008:{name:"Shells",cat:"ammo",radius:20},2049:{name:"Box of Shells",cat:"ammo",radius:20},2010:{name:"Rocket",cat:"ammo",radius:20},2046:{name:"Box of Rockets",cat:"ammo",radius:20},2047:{name:"Energy Cell",cat:"ammo",radius:20},17:{name:"Energy Cell Pack",cat:"ammo",radius:20},8:{name:"Backpack",cat:"ammo",radius:20},2014:{name:"Health Bonus",cat:"health",radius:20},2011:{name:"Stimpack",cat:"health",radius:20},2012:{name:"Medikit",cat:"health",radius:20},2013:{name:"Soulsphere",cat:"health",radius:20},83:{name:"Megasphere",cat:"health",radius:20,doom2Only:!0},2015:{name:"Armor Bonus",cat:"armor",radius:20},2018:{name:"Green Armor",cat:"armor",radius:20},2019:{name:"Blue Armor",cat:"armor",radius:20},5:{name:"Blue Keycard",cat:"key",radius:20},13:{name:"Red Keycard",cat:"key",radius:20},6:{name:"Yellow Keycard",cat:"key",radius:20},40:{name:"Blue Skull Key",cat:"key",radius:20},38:{name:"Red Skull Key",cat:"key",radius:20},39:{name:"Yellow Skull Key",cat:"key",radius:20},2022:{name:"Invulnerability",cat:"powerup",radius:20},2023:{name:"Berserk",cat:"powerup",radius:20},2024:{name:"Invisibility",cat:"powerup",radius:20},2025:{name:"Radiation Suit",cat:"powerup",radius:20},2026:{name:"Computer Map",cat:"powerup",radius:20},2045:{name:"Light Goggles",cat:"powerup",radius:20},2035:{name:"Barrel",cat:"decor",radius:10},70:{name:"Burning Barrel",cat:"decor",radius:16,doom2Only:!0},43:{name:"Burnt Tree",cat:"decor",radius:16},54:{name:"Brown Tree",cat:"decor",radius:32},2028:{name:"Floor Lamp",cat:"decor",radius:16},85:{name:"Tall Techno Lamp",cat:"decor",radius:16,doom2Only:!0},86:{name:"Short Techno Lamp",cat:"decor",radius:16,doom2Only:!0},34:{name:"Candle",cat:"decor",radius:20},35:{name:"Candelabra",cat:"decor",radius:16},44:{name:"Tall Blue Torch",cat:"decor",radius:16},45:{name:"Tall Green Torch",cat:"decor",radius:16},46:{name:"Tall Red Torch",cat:"decor",radius:16},55:{name:"Short Blue Torch",cat:"decor",radius:16},56:{name:"Short Green Torch",cat:"decor",radius:16},57:{name:"Short Red Torch",cat:"decor",radius:16},48:{name:"Tall Techno Column",cat:"decor",radius:16},30:{name:"Tall Green Pillar",cat:"decor",radius:16},32:{name:"Short Green Pillar",cat:"decor",radius:16},31:{name:"Tall Red Pillar",cat:"decor",radius:16},33:{name:"Short Red Pillar",cat:"decor",radius:16},36:{name:"Pillar w/ Heart",cat:"decor",radius:16},37:{name:"Pillar w/ Skull",cat:"decor",radius:16},47:{name:"Brown Stump",cat:"decor",radius:16},41:{name:"Evil Eye",cat:"decor",radius:16},42:{name:"Floating Skull",cat:"decor",radius:16},10:{name:"Bloody Mess 1",cat:"gore",radius:20},12:{name:"Bloody Mess 2",cat:"gore",radius:20},24:{name:"Pool of Blood",cat:"gore",radius:20},27:{name:"Pole w/ Skull",cat:"gore",radius:16},28:{name:"Skewer w/ Heads",cat:"gore",radius:16},29:{name:"Pile of Skulls",cat:"gore",radius:16},25:{name:"Impaled Body",cat:"gore",radius:16},26:{name:"Twitching Body",cat:"gore",radius:16},49:{name:"Hanging Body 1",cat:"gore",radius:16},50:{name:"Hanging Body 2",cat:"gore",radius:16},51:{name:"Hanging Body 3",cat:"gore",radius:16},52:{name:"Hanging Body 4",cat:"gore",radius:16},53:{name:"Hanging Body 5",cat:"gore",radius:16},73:{name:"Hanging Victim, Guts Removed",cat:"gore",radius:16,doom2Only:!0},74:{name:"Hanging Victim, Guts+Brain",cat:"gore",radius:16,doom2Only:!0},75:{name:"Hanging Torso, Looking Down",cat:"gore",radius:16,doom2Only:!0},76:{name:"Hanging Torso, Open Skull",cat:"gore",radius:16,doom2Only:!0},77:{name:"Hanging Torso, Looking Up",cat:"gore",radius:16,doom2Only:!0},78:{name:"Hanging Torso, Brain Removed",cat:"gore",radius:16,doom2Only:!0},79:{name:"Pool of Blood",cat:"gore",radius:20,doom2Only:!0},59:{name:"Hanging Victim, Arms Out",cat:"gore",radius:20},60:{name:"Hanging Pair of Legs",cat:"gore",radius:20},61:{name:"Hanging Victim, One-legged",cat:"gore",radius:20},62:{name:"Hanging Leg",cat:"gore",radius:20},63:{name:"Hanging Victim, Twitching",cat:"gore",radius:20},15:{name:"Dead Marine",cat:"gore",radius:20},18:{name:"Dead Zombieman",cat:"gore",radius:20},19:{name:"Dead Shotgun Guy",cat:"gore",radius:20},20:{name:"Dead Imp",cat:"gore",radius:20},21:{name:"Dead Demon",cat:"gore",radius:20},22:{name:"Dead Cacodemon",cat:"gore",radius:20},23:{name:"Dead Lost Soul",cat:"gore",radius:20},14:{name:"Teleport Landing",cat:"decor",radius:20},72:{name:"Commander Keen",cat:"enemy",radius:16,doom2Only:!0},88:{name:"Boss Brain",cat:"enemy",radius:16,doom2Only:!0},89:{name:"Spawn Shooter",cat:"enemy",radius:20,doom2Only:!0},87:{name:"Spawn Spot",cat:"enemy",radius:20,doom2Only:!0},80:{name:"Pool of Blood 2",cat:"gore",radius:20,doom2Only:!0},81:{name:"Pool of Brains",cat:"gore",radius:20,doom2Only:!0}},wr={1:"PLAY",2:"PLAY",3:"PLAY",4:"PLAY",11:"PLAY",3004:"POSS",9:"SPOS",3001:"TROO",3002:"SARG",58:"SARG",3005:"HEAD",3003:"BOSS",3006:"SKUL",16:"CYBR",7:"SPID",65:"CPOS",64:"VILE",66:"SKEL",67:"FATT",68:"BSPI",69:"BOS2",71:"PAIN",72:"KEEN",84:"SSWV",2005:"CSAW",2001:"SHOT",82:"SGN2",2002:"MGUN",2003:"LAUN",2004:"PLAS",2006:"BFUG",2007:"CLIP",2048:"AMMO",2008:"SHEL",2049:"SBOX",2010:"ROCK",2046:"BROK",2047:"CELL",17:"CELP",2014:"BON1",2011:"STIM",2012:"MEDI",2013:"SOUL",83:"MEGA",2015:"BON2",2018:"ARM1",2019:"ARM2",5:"BKEY",13:"RKEY",6:"YKEY",40:"BSKU",38:"RSKU",39:"YSKU",2022:"PINV",2023:"PSTR",2024:"PINS",2025:"SUIT",2026:"PMAP",2045:"PVIS",2035:"BAR1",70:"FCAN",43:"TRE1",54:"TRE2",2028:"COLU",85:"TLMP",86:"TLP2",34:"CAND",35:"CBRA",44:"TBLU",45:"TGRN",46:"TRED",55:"SMBT",56:"SMGT",57:"SMRT",48:"ELEC",30:"COL1",32:"COL3",31:"COL2",33:"COL4",36:"COL5",37:"COL6",47:"SMIT",41:"CEYE",42:"FSKU",10:"POL5",12:"POL5",24:"POL5",27:"POL4",28:"POL2",29:"POL3",25:"POL1",26:"POL6",49:"GOR1",50:"GOR2",51:"GOR3",52:"GOR4",53:"GOR5",59:"GOR2",60:"GOR4",61:"GOR3",62:"GOR5",63:"GOR1",8:"BPAK",73:"HDB1",74:"HDB2",75:"HDB3",76:"HDB4",77:"HDB5",78:"HDB6",79:"POB1",80:"POB2",81:"BRS1",15:"PLAYN",18:"POSSL",19:"SPOSL",20:"TROOM",21:"SARGN",22:"HEADL",23:"SKULK",14:"TFOG",88:"BBRN",89:"BOSF",87:"FIRE"},sd=[{bit:1,label:"Impassable"},{bit:4,label:"Two-Sided"},{bit:16,label:"Upper Unpeg"},{bit:32,label:"Lower Unpeg"}];function _t(i,e){return{x:i*dt+kt.x,y:-e*dt+kt.y}}function Fi(i,e){return{x:(i-kt.x)/dt,y:-(e-kt.y)/dt}}function zt(i,e=xn){return Math.round(i/e)*e}function Yf(i){const e=new DataView(i),t=String.fromCharCode(e.getUint8(0),e.getUint8(1),e.getUint8(2),e.getUint8(3));if(t!=="IWAD"&&t!=="PWAD")throw new Error("Not a WAD file");const n=e.getInt32(4,!0),s=e.getInt32(8,!0),r=[];for(let o=0;o<n;o++){const a=s+o*16,c=e.getInt32(a,!0),l=e.getInt32(a+4,!0);let u="";for(let d=0;d<8;d++){const f=e.getUint8(a+8+d);if(f===0)break;u+=String.fromCharCode(f)}r.push({name:u.toUpperCase(),offset:c,size:l})}return{type:t,lumps:r,data:i}}function Ua(i,e){const t=e.toUpperCase(),n=i.lumps.find(s=>s.name===t);return!n||n.size===0?null:{dv:new DataView(i.data,n.offset,n.size),offset:n.offset,size:n.size}}function pr(i,e,t){const n=e.toUpperCase(),s=t.toUpperCase(),r=[];let o=!1;for(const a of i.lumps){if(a.name===n){o=!0;continue}if(a.name===s){o=!1;continue}o&&a.size>0&&r.push(a)}return r}function Kf(i){const e=Ua(i,"PLAYPAL");if(!e)throw new Error("PLAYPAL lump not found");const t=new Uint8Array(768);for(let n=0;n<768;n++)t[n]=e.dv.getUint8(n);return t}function jf(i,e){const t=[],n=[["F_START","F_END"],["F1_START","F1_END"],["F2_START","F2_END"],["FF_START","FF_END"]],s=new Set;for(const[r,o]of n){const a=pr(i,r,o);for(const c of a){if(c.size!==4096||s.has(c.name))continue;s.add(c.name);const l=new Uint8Array(i.data,c.offset,4096),u=new ImageData(64,64),d=u.data;for(let f=0;f<4096;f++){const h=l[f];d[f*4]=e[h*3],d[f*4+1]=e[h*3+1],d[f*4+2]=e[h*3+2],d[f*4+3]=255}t.push({name:c.name,type:"flat",width:64,height:64,dataUrl:Gc(u)})}}return t}function rd(i,e,t){if(t<8)return null;const n=new DataView(i,e,t),s=n.getUint16(0,!0),r=n.getUint16(2,!0),o=n.getInt16(6,!0);if(s===0||r===0||s>4096||r>4096||t<8+s*4)return null;const a=new Uint8Array(s*r);a.fill(255);for(let c=0;c<s;c++){let l=n.getUint32(8+c*4,!0);if(l>=t)continue;let u=0;for(;l<t;){const d=n.getUint8(l);if(d===255)break;l++;const f=d<=u&&u>0?u+d:d;if(u=f,l>=t)break;const h=n.getUint8(l);l++,l++;for(let g=0;g<h&&!(l>=t);g++){const v=f+g;v<r&&(a[v*s+c]=n.getUint8(l)),l++}l++}}return{width:s,height:r,topOffset:o,pixels:a}}function Zf(i,e){const t=Ua(i,"PNAMES");if(!t)return[];const n=t.dv.getInt32(0,!0),s=[];for(let u=0;u<n;u++){let d="";for(let f=0;f<8;f++){const h=t.dv.getUint8(4+u*8+f);if(h===0)break;d+=String.fromCharCode(h)}s.push(d.toUpperCase())}const r=new Map,o=[...pr(i,"P_START","P_END"),...pr(i,"PP_START","PP_END")];for(const u of o)r.has(u.name)||r.set(u.name,{offset:u.offset,size:u.size});for(const u of s)if(!r.has(u)){const d=i.lumps.find(f=>f.name===u&&f.size>0);d&&r.set(u,{offset:d.offset,size:d.size})}const a=new Map;function c(u){if(a.has(u))return a.get(u);const d=r.get(u);if(!d)return a.set(u,null),null;const f=rd(i.data,d.offset,d.size);return a.set(u,f),f}const l=[];for(const u of["TEXTURE1","TEXTURE2"]){const d=Ua(i,u);if(!d)continue;const f=d.dv.getInt32(0,!0);for(let h=0;h<f;h++){let v=d.dv.getInt32(4+h*4,!0),p="";for(let A=0;A<8;A++){const S=d.dv.getUint8(v+A);if(S===0)break;p+=String.fromCharCode(S)}p=p.toUpperCase(),v+=8,v+=4;const m=d.dv.getUint16(v,!0);v+=2;const x=d.dv.getUint16(v,!0);v+=2,v+=4;const y=d.dv.getUint16(v,!0);if(v+=2,m===0||x===0||m>4096||x>4096)continue;const M=new Uint8Array(m*x);M.fill(255);for(let A=0;A<y;A++){const S=d.dv.getInt16(v,!0);v+=2;const b=d.dv.getInt16(v,!0);v+=2;const z=d.dv.getUint16(v,!0);if(v+=2,v+=4,z>=s.length)continue;const R=c(s[z]);if(R)for(let F=0;F<R.height;F++){const k=b+F;if(!(k<0||k>=x))for(let O=0;O<R.width;O++){const V=S+O;if(V<0||V>=m)continue;const H=R.pixels[F*R.width+O];H!==255&&(M[k*m+V]=H)}}}const C=new ImageData(m,x),T=C.data;for(let A=0;A<m*x;A++){const S=M[A];S===255?(T[A*4]=0,T[A*4+1]=255,T[A*4+2]=255,T[A*4+3]=255):(T[A*4]=e[S*3],T[A*4+1]=e[S*3+1],T[A*4+2]=e[S*3+2],T[A*4+3]=255)}l.push({name:p,type:"wall",width:m,height:x,dataUrl:Gc(C)})}}return l}const ho=document.createElement("canvas"),Jf=ho.getContext("2d");function Gc(i){return ho.width=i.width,ho.height=i.height,Jf.putImageData(i,0,0),ho.toDataURL()}let Rn=new Map;function Oo(i){const e=i.toUpperCase();return e.length>=5?Rn.get(e+"0")||Rn.get(e+"1")||null:Rn.get(e+"A0")||Rn.get(e+"A1")||null}function Qf(i,e){Rn=new Map;const t=[...pr(i,"S_START","S_END"),...pr(i,"SS_START","SS_END")],n=new Set,s=new Set;for(const r of Object.values(wr)){const o=r.toUpperCase();n.add(o.substring(0,4)),o.length>=5&&s.add(o)}for(const r of t){if(r.size<8||r.name.length<6)continue;const o=r.name.substring(0,4);if(!n.has(o))continue;const a=r.name[4],c=r.name[5];if(c!=="0"&&c!=="1")continue;const l=o+a,u=a==="A",d=s.has(l);if(!u&&!d)continue;const f=l+c;if(Rn.has(l+"0")||c==="1"&&Rn.has(f))continue;const h=rd(i.data,r.offset,r.size);if(!h)continue;const g=new ImageData(h.width,h.height),v=g.data;for(let p=0;p<h.width*h.height;p++){const m=h.pixels[p];m===255?v[p*4+3]=0:(v[p*4]=e[m*3],v[p*4+1]=e[m*3+1],v[p*4+2]=e[m*3+2],v[p*4+3]=255)}Rn.set(f,{name:r.name,width:h.width,height:h.height,topOffset:h.topOffset,dataUrl:Gc(g)})}}let ei=new Map;function Wc(){return ei}function Us(i){var e;return((e=ei.get(i.toUpperCase()))==null?void 0:e.dataUrl)??null}function Zi(){return ei.size>0}function eh(i){const e=new Set(i.lumps.map(t=>t.name));for(const t of e){if(/^E\dM\d$/.test(t))return"doom1";if(/^MAP\d\d$/.test(t))return"doom2"}return e.has("SGN2A0")||e.has("VILEA1"),"doom2"}async function th(i){const e=await i.arrayBuffer(),t=Yf(e),n=Kf(t),s=eh(t),r=Tr;if(r!==s){const c={doom1:"DOOM",doom2:"DOOM 2"};if(!confirm(`Map is ${c[r]} but imported WAD is ${c[s]}. Switch to ${c[s]}?`))throw new Error("Import cancelled — game type mismatch")}ed(s);const o=jf(t,n),a=Zf(t,n);Qf(t,n),ei=new Map;for(const c of o)ei.set(c.name,c);for(const c of a)ei.set(c.name,c);return await nh(),await ih(),await It.ref("map/gameType").set(s),{flats:o.length,walls:a.length,gameType:s}}async function nh(){const i={};ei.forEach((e,t)=>{i[t]={name:e.name,type:e.type,width:e.width,height:e.height,dataUrl:e.dataUrl}}),await It.ref("textures").set(i)}async function ih(){const i={};Rn.forEach((e,t)=>{i[t]={name:e.name,width:e.width,height:e.height,topOffset:e.topOffset,dataUrl:e.dataUrl}}),await It.ref("sprites").set(i)}async function sh(){const e=(await It.ref("textures").once("value")).val();if(!e)return;ei=new Map;for(const s of Object.keys(e)){const r=e[s];ei.set(s,{name:r.name,type:r.type,width:r.width,height:r.height,dataUrl:r.dataUrl})}const n=(await It.ref("sprites").once("value")).val();if(n){Rn=new Map;for(const s of Object.keys(n)){const r=n[s];Rn.set(s,{name:r.name,width:r.width,height:r.height,topOffset:r.topOffset,dataUrl:r.dataUrl})}}}const An=new Map,_s=new Map,Ts=new Map;function rh(i){const e=new Set,t=_s.get(i);if(t)for(const n of t){const s=Ts.get(n);s&&e.add(s)}return e}function oh(i,e,t){od(i,e,t);const n=P.linedefs.get(i);n&&ad(i,n.frontSide,n.backSide)}function ah(i,e,t,n,s){var o,a;n&&n!==e&&((o=An.get(n))==null||o.delete(i)),s&&s!==t&&((a=An.get(s))==null||a.delete(i)),od(i,e,t),cd(i);const r=P.linedefs.get(i);r&&ad(i,r.frontSide,r.backSide)}function ch(i,e,t){var n,s;(n=An.get(e))==null||n.delete(i),(s=An.get(t))==null||s.delete(i),cd(i)}function lh(i,e){ld(i,e)}function uh(i,e,t){var n;t&&t!==e&&((n=_s.get(t))==null||n.delete(i)),ld(i,e)}function dh(i,e){var t;e&&((t=_s.get(e))==null||t.delete(i)),Ts.delete(i)}function od(i,e,t){An.has(e)||An.set(e,new Set),An.has(t)||An.set(t,new Set),An.get(e).add(i),An.get(t).add(i)}function ad(i,e,t){e&&Ts.set(e,i),t&&Ts.set(t,i)}function cd(i){for(const[e,t]of Ts)t===i&&Ts.delete(e)}function ld(i,e){e&&(_s.has(e)||_s.set(e,new Set),_s.get(e).add(i))}function mr(i,e,t){let n=null,s=t;return P.vertices.forEach((r,o)=>{const a=Math.hypot(r.x-i,r.y-e);a<s&&(s=a,n=o)}),n}function po(i,e,t){let n=null,s=t;return P.linedefs.forEach((r,o)=>{const a=P.vertices.get(r.v1),c=P.vertices.get(r.v2);if(!a||!c)return;const l=fh(i,e,a.x,a.y,c.x,c.y);l<s&&(s=l,n=o)}),n}function El(i,e,t){let n=null,s=t;return P.things.forEach((r,o)=>{const a=Math.hypot(r.x-i,r.y-e);a<s&&(s=a,n=o)}),n}function fh(i,e,t,n,s,r){const o=s-t,a=r-n,c=o*o+a*a;if(!c)return Math.hypot(i-t,e-n);const l=Math.max(0,Math.min(1,((i-t)*o+(e-n)*a)/c));return Math.hypot(i-(t+l*o),e-(n+l*a))}function ud(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const o=t[s].x,a=t[s].y,c=t[r].x,l=t[r].y;a>e!=l>e&&i<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}function bl(i){let e=0;for(let t=0,n=i.length-1;t<i.length;n=t++)e+=(i[n].x+i[t].x)*(i[n].y-i[t].y);return Math.abs(e)/2}function Fr(i,e,t,n,s,r){return(t-i)*(r-e)-(n-e)*(s-i)}function sr(i,e,t,n,s,r,o,a){if(i===s&&e===r||i===o&&e===a||t===s&&n===r||t===o&&n===a)return!1;const c=Fr(s,r,o,a,i,e),l=Fr(s,r,o,a,t,n),u=Fr(i,e,t,n,s,r),d=Fr(i,e,t,n,o,a);return(c>0&&l<0||c<0&&l>0)&&(u>0&&d<0||u<0&&d>0)}function wo(i){let e=0;for(let t=0,n=i.length-1;t<i.length;n=t++)e+=(i[n].x+i[t].x)*(i[n].y-i[t].y);return e}function Xc(i){const e=rh(i);if(!e.size)return[];const t=new Map;for(const h of e){const g=P.linedefs.get(h);if(!g)continue;const v=P.vertices.get(g.v1),p=P.vertices.get(g.v2);!v||!p||(t.has(g.v1)||t.set(g.v1,[]),t.has(g.v2)||t.set(g.v2,[]),t.get(g.v1).push({angle:Math.atan2(p.y-v.y,p.x-v.x),vid:g.v2}),t.get(g.v2).push({angle:Math.atan2(v.y-p.y,v.x-p.x),vid:g.v1}))}for(const h of t.values())h.sort((g,v)=>g.angle-v.angle);const n=new Map;let s=0;for(const h of t.keys()){if(n.has(h))continue;const g=s++,v=[h];for(;v.length;){const p=v.pop();if(!n.has(p)){n.set(p,g);for(const m of t.get(p))n.has(m.vid)||v.push(m.vid)}}}const r=new Array(s).fill(""),o=new Array(s).fill(-1/0),a=new Array(s).fill(-1/0);for(const[h,g]of n){const v=P.vertices.get(h);(v.x>o[g]||v.x===o[g]&&v.y>a[g])&&(o[g]=v.x,a[g]=v.y,r[g]=h)}const c=new Set;for(let h=0;h<s;h++){const g=r[h],v=t.get(g);c.add(g+"|"+v[0].vid)}const l=new Set,u=[],d=[];for(const[h,g]of t)for(const v of g){const p=h+"|"+v.vid;if(l.has(p))continue;const m=[];let x=!1,y=h,M=v.vid;for(;;){const C=y+"|"+M;c.has(C)&&(x=!0),l.add(C),m.push(y);const T=t.get(M),S=(T.findIndex(b=>b.vid===y)-1+T.length)%T.length;if(y=M,M=T[S].vid,y===h&&M===v.vid||m.length>e.size*2)break}m.length>=3&&(u.push(m),d.push(x))}const f=u.filter((h,g)=>!d[g]);if(f.length>0){const g=f.map(m=>m.map(x=>P.vertices.get(x))).map(m=>wo(m));let v=0,p=0;for(let m=0;m<g.length;m++){const x=Math.abs(g[m]);x>p&&(p=x,v=m)}g[v]<0&&f[v].reverse();for(let m=0;m<f.length;m++)m!==v&&g[m]>0&&f[m].reverse()}return f}function Cr(i){return Xc(i).map(e=>e.map(t=>P.vertices.get(t)).filter(t=>!!t)).filter(e=>e.length>=3)}function hh(i){const e=Cr(i);if(!e.length)return null;let t=e[0],n=bl(t);for(let s=1;s<e.length;s++){const r=bl(e[s]);r>n&&(n=r,t=e[s])}return t}function ti(i,e,t){const n=Cr(t);let s=0;for(const r of n)ud(i,e,r)&&s++;return(s&1)===1}const Si=12,mo=16,Tl=48,gr={player:"#0f0",enemy:"#f44",weapon:"#fa0",ammo:"#f80",health:"#4af",armor:"#4ff",key:"#ff4",powerup:"#f4f",decor:"#888",gore:"#a44"};let On,K;function ph(i){On=i,K=On.getContext("2d")}function dd(){if(!On||P.vertices.size===0)return;let i=1/0,e=1/0,t=-1/0,n=-1/0;P.vertices.forEach(u=>{u.x<i&&(i=u.x),u.x>t&&(t=u.x),u.y<e&&(e=u.y),u.y>n&&(n=u.y)});const s=80,r=t-i||1,o=n-e||1,a=(i+t)/2,c=(e+n)/2,l=Math.min((On.width-s*2)/r,(On.height-s*2)/o);Zu(Math.max(.05,Math.min(32,l))),kt.x=On.width/2-a*dt,kt.y=On.height/2+c*dt,St()}function St(){if(!On)return;const i=On.width,e=On.height;K.clearRect(0,0,i,e),K.fillStyle="#0a0a0a",K.fillRect(0,0,i,e),mh(i,e),gh(),vh(),xh(),Sh(),yh(),Mh()}function mh(i,e){const t=xn,n=Fi(0,0),s=Fi(i,e),r=Math.floor(n.x/t)*t,o=Math.ceil(s.x/t)*t,a=Math.floor(s.y/t)*t,c=Math.ceil(n.y/t)*t;if(t*dt>=4){K.strokeStyle="#181818",K.lineWidth=1;for(let u=r;u<=o;u+=t){const d=_t(u,0).x;K.beginPath(),K.moveTo(d,0),K.lineTo(d,e),K.stroke()}for(let u=a;u<=c;u+=t){const d=_t(0,u).y;K.beginPath(),K.moveTo(0,d),K.lineTo(i,d),K.stroke()}}K.strokeStyle="#252525";const l=_t(0,0);K.beginPath(),K.moveTo(l.x,0),K.lineTo(l.x,e),K.stroke(),K.beginPath(),K.moveTo(0,l.y),K.lineTo(i,l.y),K.stroke()}function gh(){P.sectors.forEach((i,e)=>{const t=Cr(e);if(!t.length)return;const n=be&&be.type==="sector"&&be.id===e,s=Pt==="sector"&&et.has(e),r=Rt&&Rt.type==="sector"&&Rt.id===e,o=Math.max(0,Math.min(255,i.light??160)),a=Math.round(20+o/255*70);K.fillStyle=n||s?`rgba(${a+40},${a+30},${Math.round(a*.4)},0.7)`:r?`rgba(${a+20},${a+20},${Math.round(a*.75)+15},0.7)`:`rgba(${a},${a},${Math.round(a*.75)},0.6)`,K.beginPath();for(const c of t){const l=_t(c[0].x,c[0].y);K.moveTo(l.x,l.y);for(let u=1;u<c.length;u++){const d=_t(c[u].x,c[u].y);K.lineTo(d.x,d.y)}K.closePath()}K.fill("evenodd"),n||s?(K.strokeStyle="#ff0",K.lineWidth=2,K.stroke()):r&&(K.strokeStyle="rgba(255, 255, 255, 0.4)",K.lineWidth=1,K.stroke())})}function vh(){P.linedefs.forEach((i,e)=>{const t=P.vertices.get(i.v1),n=P.vertices.get(i.v2);if(!t||!n)return;const s=_t(t.x,t.y),r=_t(n.x,n.y),o=be&&be.type==="linedef"&&be.id===e,a=Pt==="linedef"&&et.has(e),c=Rt&&Rt.type==="linedef"&&Rt.id===e,l=!!(i.flags&4);c&&!o&&!a&&(K.strokeStyle="rgba(255, 255, 255, 0.15)",K.lineWidth=8,K.beginPath(),K.moveTo(s.x,s.y),K.lineTo(r.x,r.y),K.stroke()),K.strokeStyle=o||a?"#ff0":c?"#fff":l?"#aa0":"#ddd",K.lineWidth=o||a||c?2:1,K.beginPath(),K.moveTo(s.x,s.y),K.lineTo(r.x,r.y),K.stroke();const u=(s.x+r.x)/2,d=(s.y+r.y)/2,f=r.x-s.x,h=r.y-s.y,g=Math.hypot(f,h);if(g>0){const v=-h/g,p=f/g;K.strokeStyle="#f00",K.lineWidth=1,K.beginPath(),K.moveTo(u,d),K.lineTo(u+v*6,d+p*6),K.stroke()}})}function xh(){P.vertices.forEach((i,e)=>{const t=_t(i.x,i.y),n=be&&be.type==="vertex"&&be.id===e,s=et.has(e),r=Rt&&Rt.type==="vertex"&&Rt.id===e;r&&!n&&!s&&(K.strokeStyle="rgba(255, 255, 255, 0.3)",K.lineWidth=1,K.beginPath(),K.arc(t.x,t.y,Si,0,Math.PI*2),K.stroke()),K.fillStyle=n||s?"#ff0":r?"#fff":"#0ff";const o=r||n||s?4:3;K.fillRect(t.x-o,t.y-o,o*2,o*2)})}const qo=new Map;function _h(i){if(qo.has(i))return qo.get(i);const e=Oo(i);if(!e)return null;const t=new Image;return t.src=e.dataUrl,t.onload=()=>St(),qo.set(i,t),t}function Sh(){P.things.forEach((i,e)=>{const t=_t(i.x,i.y),n=Ar[i.type]||{cat:"player"},s=Math.max(n.radius*dt,4),r=s*2,o=be&&be.type==="thing"&&be.id===e,a=Rt&&Rt.type==="thing"&&Rt.id===e,c=o?"#ff0":a?"#fff":gr[n.cat]||"#fff";a&&!o&&(K.strokeStyle="rgba(255, 255, 255, 0.2)",K.lineWidth=1,K.beginPath(),K.arc(t.x,t.y,24,0,Math.PI*2),K.stroke());const l=wr[i.type],u=l&&Zi()?_h(l):null;if(u&&u.complete&&u.naturalWidth>0){const d=Math.min(r/u.naturalWidth,r/u.naturalHeight),f=u.naturalWidth*d,h=u.naturalHeight*d;K.imageSmoothingEnabled=!1,K.drawImage(u,t.x-f/2,t.y-h/2,f,h),K.imageSmoothingEnabled=!0}if(Qt==="thing"||o||a){K.strokeStyle=c,K.lineWidth=o||a?2:1,K.strokeRect(t.x-s,t.y-s,r,r);const d=(i.angle??0)*Math.PI/180;K.lineWidth=1,K.beginPath(),K.moveTo(t.x,t.y),K.lineTo(t.x+Math.cos(d)*s,t.y-Math.sin(d)*s),K.stroke()}})}function yh(){if(Qt!=="draw")return;if(Ct.length===0){const l=mr(rt.x,rt.y,Si/dt);if(l){const u=P.vertices.get(l),d=_t(u.x,u.y);K.strokeStyle="#0ff",K.lineWidth=1,K.beginPath(),K.arc(d.x,d.y,Si,0,Math.PI*2),K.stroke()}return}const i=Ct[0],e=Ct[Ct.length-1];let t=zt(rt.x),n=zt(rt.y);const s=mr(rt.x,rt.y,Si/dt);let r=!1;if(s){const l=P.vertices.get(s);t=l.x,n=l.y,r=!0}let o=!1;if(Ct.length>=3&&Math.hypot(t-i.x,n-i.y)<24/dt&&(t=i.x,n=i.y,o=!0),Ct.length>=2){K.fillStyle="rgba(0, 180, 0, 0.08)",K.beginPath();const l=_t(i.x,i.y);K.moveTo(l.x,l.y);for(let d=1;d<Ct.length;d++){const f=_t(Ct[d].x,Ct[d].y);K.lineTo(f.x,f.y)}const u=_t(t,n);K.lineTo(u.x,u.y),K.closePath(),K.fill()}K.strokeStyle="#0f0",K.lineWidth=2;for(let l=0;l<Ct.length-1;l++){const u=_t(Ct[l].x,Ct[l].y),d=_t(Ct[l+1].x,Ct[l+1].y);K.beginPath(),K.moveTo(u.x,u.y),K.lineTo(d.x,d.y),K.stroke()}const a=_t(e.x,e.y),c=_t(t,n);if(K.strokeStyle="#ff0",K.lineWidth=1,K.setLineDash([4,4]),K.beginPath(),K.moveTo(a.x,a.y),K.lineTo(c.x,c.y),K.stroke(),Ct.length>=2){const l=_t(i.x,i.y);K.strokeStyle="rgba(255, 255, 0, 0.3)",K.beginPath(),K.moveTo(c.x,c.y),K.lineTo(l.x,l.y),K.stroke()}K.setLineDash([]);for(let l=0;l<Ct.length;l++){const u=_t(Ct[l].x,Ct[l].y);K.fillStyle=l===0?"#0f0":"#0ff";const d=l===0?5:3;K.fillRect(u.x-d,u.y-d,d*2,d*2)}if(o){const l=_t(i.x,i.y);K.fillStyle="rgba(0, 255, 0, 0.15)",K.beginPath(),K.arc(l.x,l.y,30,0,Math.PI*2),K.fill(),K.strokeStyle="#0f0",K.lineWidth=2,K.beginPath(),K.arc(l.x,l.y,30,0,Math.PI*2),K.stroke()}else r&&(K.strokeStyle="#0ff",K.lineWidth=1,K.beginPath(),K.arc(c.x,c.y,Si,0,Math.PI*2),K.stroke())}function Mh(){if(!Gi)return;const i=_t(Gi.x,Gi.y),e=_t(rt.x,rt.y),t=Math.min(i.x,e.x),n=Math.min(i.y,e.y),s=Math.abs(e.x-i.x),r=Math.abs(e.y-i.y);K.fillStyle="rgba(255, 255, 0, 0.08)",K.fillRect(t,n,s,r),K.strokeStyle="rgba(255, 255, 0, 0.5)",K.lineWidth=1,K.setLineDash([4,4]),K.strokeRect(t,n,s,r),K.setLineDash([])}function fd(i,e,t){for(const[n,s]of i){if(s.v1===e&&s.v2===t)return{ldId:n,sameDirection:!0};if(s.v1===t&&s.v2===e)return{ldId:n,sameDirection:!1}}return null}function Eh(i,e,t,n){const s=new Set,r=new Set;for(const[o,a]of i)o!==n&&(a.v1===e&&s.add(a.v2),a.v2===e&&s.add(a.v1),a.v1===t&&r.add(a.v2),a.v2===t&&r.add(a.v1));for(const o of s)if(o!==t&&r.has(o))return!0;return!1}function bh(i){const e=new Set,t=An.get(i);if(!t)return e;for(const n of t){const s=P.linedefs.get(n);if(s)for(const r of[s.frontSide,s.backSide]){if(!r)continue;const o=P.sidedefs.get(r);o!=null&&o.sector&&e.add(o.sector)}}return e}function Th(i,e){const t=bh(i);for(const n of t)for(const s of Xc(n))if(s.includes(i)&&s.includes(e))return!0;return!1}let Al;function Xe(i){const e=document.getElementById("toast");e.textContent=i,e.classList.add("show"),clearTimeout(Al),Al=setTimeout(()=>e.classList.remove("show"),3e3)}const rr=[],$c=[];let zi=null,or=0,qi=!1,Ss=!1;const Ah=50;function ht(){qi||(or===0&&(zi=[]),or++)}function Ee(i,e,t){qi||!zi||zi.push({path:i,before:e,after:t})}function pt(){qi||or<=0||(or--,or===0&&(zi&&zi.length>0&&(rr.push({changes:zi}),rr.length>Ah&&rr.shift(),$c.length=0),zi=null))}async function wh(){if(Ss)return;const i=rr.pop();if(!i){Xe("Nothing to undo");return}Ss=!0,qi=!0;try{const e={};for(const{path:t,before:n}of i.changes)t in e||(e[t]=n);await It.ref().update(e),$c.push(i)}finally{qi=!1,Ss=!1}}async function Ch(){if(Ss)return;const i=$c.pop();if(!i){Xe("Nothing to redo");return}Ss=!0,qi=!0;try{const e={};for(const{path:t,after:n}of i.changes)e[t]=n;await It.ref().update(e),rr.push(i)}finally{qi=!1,Ss=!1}}let ys=1,qc="",ar="all",Na=null;const hd={player:"Players",enemy:"Enemies",weapon:"Weapons",ammo:"Ammo",health:"Health",armor:"Armor",key:"Keys",powerup:"Power-ups",decor:"Decorations",gore:"Gore"},pd=["player","enemy","weapon","ammo","health","armor","key","powerup","decor","gore"];function Rh(){return ys}function md(){const i=document.getElementById("thing-type-btn");if(!i)return;const e=Ar[ys],t=wr[ys],n=t?Oo(t):null;let s="";if(n)s+=`<img src="${n.dataUrl}" width="20" height="20" style="image-rendering:pixelated;vertical-align:middle;margin-right:4px;">`;else{const r=gr[e==null?void 0:e.cat]||"#888";s+=`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${r};vertical-align:middle;margin-right:4px;"></span>`}s+=(e==null?void 0:e.name)||`Type ${ys}`,i.innerHTML=s}function Ph(){let i=document.getElementById("thing-browser-modal");if(!i){i=document.createElement("div"),i.id="thing-browser-modal",i.className="tex-modal-overlay",i.style.display="none",i.innerHTML=`
      <div class="tex-modal-content">
        <div class="tex-modal-header">
          <input type="text" id="thing-search" placeholder="Search things...">
          <div class="tex-tabs" id="thing-cat-tabs">
            <button class="tex-tab active" data-cat="all">All</button>
          </div>
          <button class="tex-modal-close">&times;</button>
        </div>
        <div class="tex-grid" id="thing-grid" style="grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));"></div>
      </div>`,document.body.appendChild(i);const e=i.querySelector("#thing-cat-tabs");for(const t of pd){const n=document.createElement("button");n.className="tex-tab",n.dataset.cat=t,n.textContent=hd[t]||t,e.appendChild(n)}i.addEventListener("click",t=>{t.target===i&&go()}),i.querySelector(".tex-modal-close").addEventListener("click",go),i.querySelector("#thing-search").addEventListener("input",t=>{qc=t.target.value,Fa()}),i.querySelectorAll(".tex-tab").forEach(t=>{t.addEventListener("click",()=>{ar=t.dataset.cat,i.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n===t)),Fa()})}),i.addEventListener("keydown",t=>{t.key==="Escape"&&go(),t.stopPropagation()}),i.addEventListener("keyup",t=>t.stopPropagation())}return i}function Fa(){const i=document.getElementById("thing-grid"),e=qc.toLowerCase(),t=[];for(const[r,o]of Object.entries(Ar)){const a=parseInt(r,10);o.doom2Only&&Tr==="doom1"||ar!=="all"&&o.cat!==ar||e&&!o.name.toLowerCase().includes(e)||t.push({id:a,name:o.name,cat:o.cat})}const n=new Map;for(const r of pd){const o=t.filter(a=>a.cat===r);o.length>0&&n.set(r,o)}let s="";for(const[r,o]of n){if(ar==="all"){const a=gr[r]||"#888";s+=`<div class="thing-cat-header" style="border-left-color:${a}">${hd[r]||r}</div>`}for(const a of o){const c=a.id===ys,l=wr[a.id],u=l?Oo(l):null,d=gr[a.cat]||"#888";let f;u?f=`<img src="${u.dataUrl}" width="48" height="48" style="image-rendering:pixelated;object-fit:contain;">`:f=`<div style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
          <span style="display:block;width:24px;height:24px;border-radius:50%;background:${d};border:2px solid ${d}88;"></span></div>`,s+=`<div class="tex-card thing-card${c?" selected":""}" data-id="${a.id}" style="border-bottom: 2px solid ${d}44;">
        ${f}
        <div class="tex-card-name">${a.name}</div>
      </div>`}}i.innerHTML=s,i.querySelectorAll(".thing-card").forEach(r=>{r.addEventListener("click",()=>{ys=parseInt(r.dataset.id,10),md(),go(),Na&&Na()})})}function Lh(i){Na=i??null;const e=Ph();ar="all",qc="";const t=e.querySelector("#thing-search");t.value="",e.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n.dataset.cat==="all")),Fa(),e.style.display="",setTimeout(()=>t.focus(),50)}function go(){const i=document.getElementById("thing-browser-modal");i&&(i.style.display="none")}let _n=!1,Yt=[],xi=null;function Ih(){return _n}function Dh(){_n=!0,Yt=[],xi=null}function Uh(){return _n=!1,xi=null,Yt}function gd(i){const e=hh(i);if(!e||e.length<3)return null;let t=0,n=0;for(const s of e)t+=s.x,n+=s.y;if(t/=e.length,n/=e.length,ti(t,n,i))return{x:t,y:n};for(let s=0;s<e.length;s++){const r=e[s],o=e[(s+1)%e.length],a=e[(s+2)%e.length],c=(r.x+o.x+a.x)/3,l=(r.y+o.y+a.y)/3;if(ti(c,l,i))return{x:c,y:l}}return{x:t,y:n}}function Ns(){return{sectors:P.sectors.size,vertices:P.vertices.size,linedefs:P.linedefs.size,sidedefs:P.sidedefs.size}}function Nh(i,e){_n&&Yt.push({action:"drawClick",x:i,y:e})}function Fh(){_n&&Yt.push({action:"drawComplete"})}function Oh(i,e){if(!_n)return;let t=null;if(i==="vertex"){const n=P.vertices.get(e);n&&(t={x:n.x,y:n.y})}else if(i==="linedef"){const n=P.linedefs.get(e);if(n){const s=P.vertices.get(n.v1),r=P.vertices.get(n.v2);s&&r&&(t={x:(s.x+r.x)/2,y:(s.y+r.y)/2})}}else if(i==="sector")t=gd(e);else if(i==="thing"){const n=P.things.get(e);n&&(t={x:n.x,y:n.y})}xi={type:i,x:(t==null?void 0:t.x)??0,y:(t==null?void 0:t.y)??0}}function Bh(){_n&&(xi&&Yt.push({action:"deleteSelected",deleteType:xi.type,x:xi.x,y:xi.y}),Yt.push({action:"assertCounts",counts:Ns()}),xi=null)}function kh(i,e){if(!_n)return;const t=P.vertices.get(i),n=P.vertices.get(e);!t||!n||(Yt.push({action:"mergeVertices",x1:t.x,y1:t.y,x2:n.x,y2:n.y}),Yt.push({action:"assertCounts",counts:Ns()}))}function zh(i){if(!_n)return;const e=[];for(const t of i){const n=gd(t);n&&e.push(n)}Yt.push({action:"mergeSectors",sectorPoints:e}),Yt.push({action:"assertCounts",counts:Ns()})}function Vh(i,e){_n&&(Yt.push({action:"placeThing",x:i,y:e}),Yt.push({action:"assertCounts",counts:Ns()}))}function Hh(i,e,t){if(!_n)return;const n=P.linedefs.get(i);if(!n)return;const s=P.vertices.get(n.v1),r=P.vertices.get(n.v2),o=s&&r?{x:(s.x+r.x)/2,y:(s.y+r.y)/2}:{x:0,y:0};Yt.push({action:"splitLinedef",ldMid:o,splitX:e,splitY:t}),Yt.push({action:"assertCounts",counts:Ns()})}function Gh(i){if(!_n)return;const e=[];for(const t of i){const n=P.vertices.get(t);n&&e.push({x:n.x,y:n.y})}Yt.push({action:"deleteMultiSelected",vertices:e}),Yt.push({action:"assertCounts",counts:Ns()})}function Wh(i){return i.replace(/[^a-zA-Z0-9\s]/g,"").split(/\s+/).filter(e=>e.length>0).map((e,t)=>t===0?e.toLowerCase():e[0].toUpperCase()+e.slice(1).toLowerCase()).join("")}function wl(i,e){const t=[],n=Wh(e);t.push("import { describe, it, expect } from 'vitest';"),t.push("import { maps, setSelected, setMultiSelected, multiSelectType } from '../../src/state/appState';"),t.push("import { drawClick, drawComplete } from '../../src/map/drawSession';"),t.push("import { findVertexAt, findSectorAt, findLinedefNear, expectMapIsValid, dumpMapJSON } from './setup';"),t.push("import { deleteSelected, deleteMultiSelected, mergeVertices, mergeSectors, bridgeLinedefs, placeThing, splitLinedefAtPoint } from '../../src/map/mapActions';"),t.push(""),t.push(`describe('${e}', () => {`),t.push("  it('should produce correct map state', async () => {");for(const s of i)switch(s.action){case"drawClick":t.push(`    await drawClick(${s.x}, ${s.y});`);break;case"drawComplete":t.push("    await drawComplete();");break;case"deleteSelected":s.deleteType==="sector"?t.push(`    setSelected({ type: 'sector', id: findSectorAt(${s.x}, ${s.y})! });`):s.deleteType==="vertex"?t.push(`    setSelected({ type: 'vertex', id: findVertexAt(${s.x}, ${s.y})! });`):t.push(`    // TODO: select ${s.deleteType} at (${s.x}, ${s.y})`),t.push("    deleteSelected();");break;case"deleteMultiSelected":t.push("    setMultiSelected(new Set([");for(const r of s.vertices)t.push(`      findVertexAt(${r.x}, ${r.y})!,`);t.push("    ]));"),t.push("    deleteMultiSelected();");break;case"mergeVertices":t.push(`    setMultiSelected(new Set([findVertexAt(${s.x1}, ${s.y1})!, findVertexAt(${s.x2}, ${s.y2})!]));`),t.push("    mergeVertices();");break;case"mergeSectors":t.push("    setMultiSelected(new Set([");for(const r of s.sectorPoints)t.push(`      findSectorAt(${r.x}, ${r.y})!,`);t.push("    ]));"),t.push("    mergeSectors();");break;case"bridgeLinedefs":t.push(`    await bridgeLinedefs(findLinedefNear(${s.mid1.x}, ${s.mid1.y})!, findLinedefNear(${s.mid2.x}, ${s.mid2.y})!);`);break;case"placeThing":t.push(`    placeThing(${s.x}, ${s.y});`);break;case"splitLinedef":t.push(`    splitLinedefAtPoint(findLinedefNear(${s.ldMid.x}, ${s.ldMid.y})!, ${s.splitX}, ${s.splitY});`);break;case"assertCounts":t.push(`    expect(maps.sectors.size).toBe(${s.counts.sectors});`),t.push(`    expect(maps.vertices.size).toBe(${s.counts.vertices});`),t.push(`    expect(maps.linedefs.size).toBe(${s.counts.linedefs});`),t.push("");break}return t.push(`    dumpMapJSON('${n}');`),t.push("    expectMapIsValid();"),t.push("  });"),t.push("});"),t.push(""),t.join(`
`)}function Xh(i){return JSON.stringify(i,null,2)}let yt=[];function Oa(){Wf(yt.map(i=>({x:i.x,y:i.y})))}function Co(){yt=[],Oa()}function js(i,e,t,n){for(const[,s]of P.linedefs){const r=P.vertices.get(s.v1),o=P.vertices.get(s.v2);if(!(!r||!o)&&sr(i,e,t,n,r.x,r.y,o.x,o.y))return!1}for(let s=0;s<yt.length-1;s++){const r=yt[s],o=yt[s+1];if(sr(i,e,t,n,r.x,r.y,o.x,o.y))return!1}return!0}function Yo(i){const e=P.sectors.get(i),t=e?{floor:e.floor,ceiling:e.ceiling,light:e.light,...e.special!=null?{special:e.special}:{},...e.tag!=null?{tag:e.tag}:{},...e.floorTex!=null?{floorTex:e.floorTex}:{},...e.ceilTex!=null?{ceilTex:e.ceilTex}:{}}:{floor:0,ceiling:128,light:160,floorTex:"FLOOR4_8",ceilTex:"CEIL3_5"},n=pe("sectors").push(t);return Ee(`map/sectors/${n.key}`,null,t),n.key}function $h(i){const e=i.map(s=>({loop:s.loop,area2:s.area2,children:[]}));e.sort((s,r)=>Math.abs(r.area2)-Math.abs(s.area2));function t(s,r){if(s.area2<0==r.area2<0)return!1;const o=new Set(s.loop.map(l=>l.ldId));for(const l of r.loop)if(o.has(l.ldId))return s.area2<0&&r.area2>0;const a=P.vertices.get(r.loop[0].fromVid),c=s.loop.map(l=>P.vertices.get(l.fromVid));return ud(a.x,a.y,c)}const n=[];for(let s=0;s<e.length;s++){const r=e[s];let o=null;for(let a=s-1;a>=0;a--)if(t(e[a],r)){o=e[a];break}o?o.children.push(r):n.push(r)}return n}async function Ro(i){const e=yt.length;if(e<2)return;ht();const t=[];for(const r of yt)if(r.existingId)t.push(r.existingId);else{const o={x:r.x,y:r.y},a=pe("vertices").push(o);Ee(`map/vertices/${a.key}`,null,o),t.push(a.key)}const n=i?e:e-1,s=[];for(let r=0;r<n;r++){const o=t[r],a=t[(r+1)%e],c=fd(P.linedefs,o,a);if(c)s.push(c.ldId);else{const l={v1:o,v2:a,flags:1},u=pe("linedefs").push(l);Ee(`map/linedefs/${u.key}`,null,l),s.push(u.key)}}Kh(new Set(s)),pt(),Co()}async function qh(i,e){yt=i,await Ro(e),Co()}async function Yh(i,e){const t=zt(i),n=zt(e),s=mr(i,e,Si/dt);let r,o,a=null;if(s){const d=P.vertices.get(s);r=d.x,o=d.y,a=s}else r=t,o=n;if(Nh(r,o),yt.length===0){yt.push({x:r,y:o,existingId:a}),Oa();return}const c=yt[0],l=yt[yt.length-1];if(r===l.x&&o===l.y)return;const u=24/dt;if(yt.length>=3){const d=Math.hypot(r-c.x,o-c.y)<u,f=a!==null&&a===c.existingId;if(d||f){if(!js(l.x,l.y,c.x,c.y)){Xe("Closing edge would intersect");return}await Ro(!0);return}}if(c.existingId&&yt.length>=1&&a&&!yt.some(d=>d.existingId===a)){if(!js(l.x,l.y,r,o)){Xe("Edge would intersect");return}if(!Th(c.existingId,a)&&!js(r,o,c.x,c.y)){Xe("Closing edge would intersect");return}yt.push({x:r,y:o,existingId:a}),await Ro(!1);return}if(!js(l.x,l.y,r,o)){Xe("Edge would intersect");return}yt.push({x:r,y:o,existingId:a}),Oa()}async function vd(){if(yt.length<3)return!1;const i=yt[0],e=yt[yt.length-1];return js(e.x,e.y,i.x,i.y)?(Fh(),await Ro(!0),!0):(Xe("Closing edge would intersect"),!1)}function Kh(i){const e=new Map;function t(T,A,S){const b=P.vertices.get(T),z=P.vertices.get(A);!b||!z||(e.has(T)||e.set(T,[]),e.get(T).push({angle:Math.atan2(z.y-b.y,z.x-b.x),toVid:A,ldId:S}))}for(const[T,A]of P.linedefs)t(A.v1,A.v2,T),t(A.v2,A.v1,T);for(const T of e.values())T.sort((A,S)=>A.angle-S.angle);function n(T,A,S){const b=e.get(A);let z=-1;for(let F=0;F<b.length;F++)if(b[F].toVid===T&&b[F].ldId===S){z=F;break}if(z===-1)throw new Error("Could not find twin");const R=b[(z+1)%b.length];return{fromVid:A,toVid:R.toVid,ldId:R.ldId}}const s=T=>`${T.ldId}:${T.fromVid}`;function r(T){const A=[];let S=T;for(;A.push(S),S=n(S.fromVid,S.toVid,S.ldId),!(S.fromVid===T.fromVid&&S.toVid===T.toVid&&S.ldId===T.ldId||A.length>P.linedefs.size*2););return A}const o=new Set,a=[];for(const T of i){const A=P.linedefs.get(T);for(const S of[{fromVid:A.v1,toVid:A.v2,ldId:T},{fromVid:A.v2,toVid:A.v1,ldId:T}]){if(o.has(s(S)))continue;const b=r(S);for(const R of b)i.has(R.ldId)&&o.add(s(R));const z=b.map(R=>P.vertices.get(R.fromVid));a.push({loop:b,area2:wo(z)})}}function c(T){const A=P.linedefs.get(T.ldId);return(T.fromVid===A.v1?A.frontSide:A.backSide)??null}function l(T){const A=c(T);if(A)return A;const S=P.linedefs.get(T.ldId),b=T.fromVid===S.v1,z=b?S.backSide:S.frontSide,R=!!z,F={sector:null,xoff:0,yoff:0,upper:R?"STARTAN2":"-",mid:R?"-":"STARTAN2",lower:R?"STARTAN2":"-"},k=pe("sidedefs").push(F);Ee(`map/sidedefs/${k.key}`,null,F);const O={...S},H={[b?"frontSide":"backSide"]:k.key};if(R){H.flags=(O.flags|4)&-2;const U=P.sidedefs.get(z);if(U){const Q={};(!U.upper||U.upper==="-")&&(Q.upper="STARTAN2"),(!U.lower||U.lower==="-")&&(Q.lower="STARTAN2"),U.mid&&U.mid!=="-"&&(Q.mid="-"),Object.keys(Q).length&&(Ee(`map/sidedefs/${z}`,{...U},{...U,...Q}),pe("sidedefs").child(z).update(Q))}}return Ee(`map/linedefs/${T.ldId}`,O,{...O,...H}),pe("linedefs").child(T.ldId).update(H),k.key}function u(T,A){const S=P.sidedefs.get(T);if(S.sector!==A){const b={...S};Ee(`map/sidedefs/${T}`,b,{...S,sector:A}),pe("sidedefs").child(T).update({sector:A})}}const d=new Set,f=[];for(const[T,A]of P.linedefs)for(const S of[{fromVid:A.v1,toVid:A.v2,ldId:T},{fromVid:A.v2,toVid:A.v1,ldId:T}]){if(d.has(s(S)))continue;const b=r(S);for(const R of b)d.add(s(R));const z=b.map(R=>P.vertices.get(R.fromVid));f.push({loop:b,area2:wo(z)})}const h=$h(f);function g(T){return T.map(s).sort().join("|")}const v=new Map,p=new Map;function m(T,A){for(const S of T)v.set(g(S.loop),S),p.set(S,A),m(S.children,S)}m(h,null);const x=new Set,y=new Set(a.map(T=>g(T.loop))),M=[];for(const T of a){const A=T.area2>0;let S=null;for(const F of T.loop){const k=c(F);if(k){const O=P.sidedefs.get(k);if(O!=null&&O.sector){S=O.sector;break}}}let b,z=!1;if(S)x.has(S)?(b=Yo(S),z=!0):b=S;else if(A){let F=null;for(const k of T.loop){const O=P.linedefs.get(k.ldId),H=k.fromVid===O.v1?O.backSide:O.frontSide;if(H){const U=P.sidedefs.get(H);if(U!=null&&U.sector){F=U.sector;break}}}if(F)b=Yo(F);else{const k={floor:0,ceiling:128,light:160,floorTex:"FLOOR4_8",ceilTex:"CEIL3_5"},O=pe("sectors").push(k);Ee(`map/sectors/${O.key}`,null,k),b=O.key}z=!0}else{const F=v.get(g(T.loop));if(!F)continue;const k=p.get(F);if(!k)continue;let O=null;for(const V of k.loop){const H=c(V);if(H){const U=P.sidedefs.get(H);if(U!=null&&U.sector){O=U.sector;break}}}if(!O)continue;x.has(O)?(b=Yo(O),z=!0):b=O}const R=T.loop.map(l);x.add(b);for(const F of R)u(F,b);M.push({face:T,sectorId:b,isNewOrCloned:z})}let C=0;for(;C<M.length;){const{face:T,sectorId:A,isNewOrCloned:S}=M[C++];if(!S)continue;const b=v.get(g(T.loop));if(b)if(T.area2>0)for(const z of b.children){if(y.has(g(z.loop)))continue;const R=z.loop.map(l);for(const F of R)u(F,A)}else{const z=p.get(b);if(z&&!y.has(g(z.loop))){let R=!1;const F=z.loop.map(l);for(const k of F){const O=P.sidedefs.get(k);(!O||O.sector!==A)&&(R=!0),u(k,A)}R&&M.push({face:{loop:z.loop,area2:z.area2},sectorId:A,isNewOrCloned:!0})}}}}function Ba(i,e){const t=Rh(),n={x:i,y:e,angle:0,type:t,flags:7},s=pe("things").push(n);Ee(`map/things/${s.key}`,null,n),Vh(i,e)}function xd(i,e,t){const n=P.linedefs.get(i);if(!n)return;const s=P.vertices.get(n.v1),r=P.vertices.get(n.v2);if(!s||!r||e===s.x&&t===s.y||e===r.x&&t===r.y)return;Hh(i,e,t),ht();const o={x:e,y:t},c=pe("vertices").push(o).key;Ee(`map/vertices/${c}`,null,o);const l=n.v2,u={...n};Ee(`map/linedefs/${i}`,u,{...u,v2:c}),pe("linedefs").child(i).update({v2:c});const d={v1:c,v2:l,flags:u.flags};if(u.special&&(d.special=u.special),u.tag&&(d.tag=u.tag),u.frontSide){const h=P.sidedefs.get(u.frontSide);if(h){const g={...h},v=pe("sidedefs").push(g);Ee(`map/sidedefs/${v.key}`,null,g),d.frontSide=v.key}}if(u.backSide){const h=P.sidedefs.get(u.backSide);if(h){const g={...h},v=pe("sidedefs").push(g);Ee(`map/sidedefs/${v.key}`,null,g),d.backSide=v.key}}const f=pe("linedefs").push(d);Ee(`map/linedefs/${f.key}`,null,d),pt(),Vt({type:"vertex",id:c}),Mi()}function jh(){if(et.size!==2){Xe("Select exactly 2 vertices to merge");return}const[i,e]=[...et],t=P.vertices.get(i),n=P.vertices.get(e);if(!t||!n)return;const s=fd(P.linedefs,i,e);if(!s){Xe("Vertices must be connected by a linedef");return}const r=s.ldId;if(Eh(P.linedefs,i,e,r)){Xe("Merge would create duplicate linedefs");return}kh(i,e),ht();const o=Math.hypot(t.x-rt.x,t.y-rt.y),a=Math.hypot(n.x-rt.x,n.y-rt.y),c=o<a?t:n;c!==n&&(Ee(`map/vertices/${e}`,{...n},{x:c.x,y:c.y}),pe("vertices").child(e).update({x:c.x,y:c.y})),Po(r),P.linedefs.forEach((l,u)=>{const d={};l.v1===i&&(d.v1=e),l.v2===i&&(d.v2=e),Object.keys(d).length&&(Ee(`map/linedefs/${u}`,{...l},{...l,...d}),pe("linedefs").child(u).update(d))}),Ee(`map/vertices/${i}`,{...t},null),pe("vertices").child(i).remove(),pt(),Bt(new Set([e])),Vt({type:"vertex",id:e}),Mi(),Wi()}function Zh(){if(Pt!=="sector"||et.size<2){Xe("Select 2 or more sectors to merge");return}const i=[...et],e=i[i.length-1],t=new Set(i.slice(0,-1));zh(i),ht(),P.sidedefs.forEach((r,o)=>{r.sector&&t.has(r.sector)&&(Ee(`map/sidedefs/${o}`,{...r},{...r,sector:e}),pe("sidedefs").child(o).update({sector:e}))});const n=[];P.linedefs.forEach((r,o)=>{if(!r.frontSide||!r.backSide)return;const a=P.sidedefs.get(r.frontSide),c=P.sidedefs.get(r.backSide);(a==null?void 0:a.sector)===e&&(c==null?void 0:c.sector)===e&&n.push(o)});for(const r of n)Po(r);const s=new Set;P.linedefs.forEach(r=>{s.add(r.v1),s.add(r.v2)}),P.vertices.forEach((r,o)=>{s.has(o)||(Ee(`map/vertices/${o}`,{...r},null),pe("vertices").child(o).remove())});for(const r of t){const o=P.sectors.get(r);o&&(Ee(`map/sectors/${r}`,{...o},null),pe("sectors").child(r).remove())}pt(),Bt(new Set),Vt({type:"sector",id:e}),Mi(),Wi()}function Po(i){const e=P.linedefs.get(i);if(e){if(e.frontSide){const t=P.sidedefs.get(e.frontSide);t&&Ee(`map/sidedefs/${e.frontSide}`,{...t},null),pe("sidedefs").child(e.frontSide).remove()}if(e.backSide){const t=P.sidedefs.get(e.backSide);t&&Ee(`map/sidedefs/${e.backSide}`,{...t},null),pe("sidedefs").child(e.backSide).remove()}Ee(`map/linedefs/${i}`,{...e},null),pe("linedefs").child(i).remove()}}function _d(){if(!be)return;Oh(be.type,be.id),ht();const{type:i,id:e}=be;if(i==="vertex"){const t=[];P.linedefs.forEach((s,r)=>{(s.v1===e||s.v2===e)&&t.push(r)}),t.forEach(Po);const n=P.vertices.get(e);n&&Ee(`map/vertices/${e}`,{...n},null),pe("vertices").child(e).remove()}else if(i==="linedef")Po(e);else if(i==="sector"){const t=new Set;P.sidedefs.forEach((s,r)=>{s.sector===e&&t.add(r)}),P.linedefs.forEach((s,r)=>{const o=s.frontSide&&t.has(s.frontSide),a=s.backSide&&t.has(s.backSide);if(!o&&!a)return;const c={...s};if(o&&a){const l=P.sidedefs.get(s.frontSide);l&&Ee(`map/sidedefs/${s.frontSide}`,{...l},null),pe("sidedefs").child(s.frontSide).remove();const u=P.sidedefs.get(s.backSide);u&&Ee(`map/sidedefs/${s.backSide}`,{...u},null),pe("sidedefs").child(s.backSide).remove(),Ee(`map/linedefs/${r}`,c,null),pe("linedefs").child(r).remove();for(const d of[s.v1,s.v2]){let f=!1;if(P.linedefs.forEach((h,g)=>{g!==r&&(h.v1===d||h.v2===d)&&(f=!0)}),!f){const h=P.vertices.get(d);h&&Ee(`map/vertices/${d}`,{...h},null),pe("vertices").child(d).remove()}}}else if(o){const l=P.sidedefs.get(s.frontSide);if(l&&Ee(`map/sidedefs/${s.frontSide}`,{...l},null),pe("sidedefs").child(s.frontSide).remove(),s.backSide){const u={frontSide:s.backSide,backSide:null,v1:s.v2,v2:s.v1,flags:(s.flags??1)&-5|1};Ee(`map/linedefs/${r}`,c,{...c,...u}),pe("linedefs").child(r).update(u);const d=P.sidedefs.get(s.backSide);d&&(!d.mid||d.mid==="-")&&(Ee(`map/sidedefs/${s.backSide}`,{...d},{...d,mid:"STARTAN2"}),pe("sidedefs").child(s.backSide).update({mid:"STARTAN2"}))}else Ee(`map/linedefs/${r}`,c,null),pe("linedefs").child(r).remove()}else if(a){const l=P.sidedefs.get(s.backSide);l&&Ee(`map/sidedefs/${s.backSide}`,{...l},null),pe("sidedefs").child(s.backSide).remove();const u={backSide:null,flags:(s.flags??1)&-5|1};Ee(`map/linedefs/${r}`,c,{...c,...u}),pe("linedefs").child(r).update(u);const d=s.frontSide?P.sidedefs.get(s.frontSide):null;d&&(!d.mid||d.mid==="-")&&(Ee(`map/sidedefs/${s.frontSide}`,{...d},{...d,mid:"STARTAN2"}),pe("sidedefs").child(s.frontSide).update({mid:"STARTAN2"}))}});const n=P.sectors.get(e);n&&Ee(`map/sectors/${e}`,{...n},null),pe("sectors").child(e).remove()}else if(i==="thing"){const t=P.things.get(e);t&&Ee(`map/things/${e}`,{...t},null),pe("things").child(e).remove()}pt(),Bh(),Vt(null),Mi()}function Jh(){if(et.size===0)return;Gh(et),ht();const i=new Set(et),e=new Set;P.linedefs.forEach((r,o)=>{(i.has(r.v1)||i.has(r.v2))&&e.add(o)});const t=new Set,n=new Map;P.linedefs.forEach((r,o)=>{if(!e.has(o))for(const a of[r.frontSide,r.backSide]){if(!a)continue;const c=P.sidedefs.get(a);c!=null&&c.sector&&n.set(c.sector,(n.get(c.sector)??0)+1)}});for(const r of e){const o=P.linedefs.get(r);if(o){if(o.frontSide){const a=P.sidedefs.get(o.frontSide);a&&(Ee(`map/sidedefs/${o.frontSide}`,{...a},null),t.add(o.frontSide)),pe("sidedefs").child(o.frontSide).remove()}if(o.backSide){const a=P.sidedefs.get(o.backSide);a&&(Ee(`map/sidedefs/${o.backSide}`,{...a},null),t.add(o.backSide)),pe("sidedefs").child(o.backSide).remove()}Ee(`map/linedefs/${r}`,{...o},null),pe("linedefs").child(r).remove()}}for(const r of i){const o=P.vertices.get(r);o&&Ee(`map/vertices/${r}`,{...o},null),pe("vertices").child(r).remove()}const s=new Set;P.sectors.forEach((r,o)=>{(!n.has(o)||n.get(o)===0)&&s.add(o)});for(const r of s){const o=P.sectors.get(r);o&&Ee(`map/sectors/${r}`,{...o},null),pe("sectors").child(r).remove()}pt(),Bt(new Set),Vt(null),Mi(),Wi()}async function Qh(i,e){const t=P.linedefs.get(i),n=P.linedefs.get(e);if(!t||!n)return;if(i===e){Xe("Select two different linedefs");return}const s=[t.v1,t.v2],r=[n.v1,n.v2];if(new Set([...s,...r]).size!==4){Xe("Cannot bridge: linedefs share a vertex");return}const[o,a]=s.map(v=>P.vertices.get(v)),[c,l]=r.map(v=>P.vertices.get(v));if(!o||!a||!c||!l)return;function u(v,p,m,x){for(const[,y]of P.linedefs){const M=P.vertices.get(y.v1),C=P.vertices.get(y.v2);if(!(!M||!C)&&sr(v,p,m,x,M.x,M.y,C.x,C.y))return!0}return!1}const d=!sr(a.x,a.y,c.x,c.y,l.x,l.y,o.x,o.y)&&!u(a.x,a.y,c.x,c.y)&&!u(l.x,l.y,o.x,o.y),f=!sr(a.x,a.y,l.x,l.y,c.x,c.y,o.x,o.y)&&!u(a.x,a.y,l.x,l.y)&&!u(c.x,c.y,o.x,o.y);let h;if(d)h=[t.v1,t.v2,n.v1,n.v2];else if(f)h=[t.v1,t.v2,n.v2,n.v1];else{Xe("Cannot bridge: connecting edges would intersect");return}const g=h.map(v=>{const p=P.vertices.get(v);return{x:p.x,y:p.y,existingId:v}});await qh(g,!0)}let Lo=null,vr="all",Yc="",Sd="";function ep(){let i=document.getElementById("texture-browser-modal");return i||(i=document.createElement("div"),i.id="texture-browser-modal",i.className="tex-modal-overlay",i.style.display="none",i.innerHTML=`
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
      </div>`,document.body.appendChild(i),i.addEventListener("click",e=>{e.target===i&&vo()}),i.querySelector(".tex-modal-close").addEventListener("click",vo),i.querySelector("#tex-search").addEventListener("input",e=>{Yc=e.target.value,ka()}),i.querySelectorAll(".tex-tab").forEach(e=>{e.addEventListener("click",()=>{vr=e.dataset.filter,i.querySelectorAll(".tex-tab").forEach(t=>t.classList.toggle("active",t===e)),ka()})}),i.addEventListener("keydown",e=>{e.key==="Escape"&&vo(),e.stopPropagation()}),i.addEventListener("keyup",e=>e.stopPropagation())),i}function ka(){const i=document.getElementById("tex-grid"),e=Wc(),t=Yc.toUpperCase(),n=[];e.forEach(s=>{vr!=="all"&&s.type!==vr||t&&!s.name.includes(t)||n.push(s)}),n.sort((s,r)=>s.name.localeCompare(r.name)),i.innerHTML=n.map(s=>{const r=s.width&&s.height?s.width/s.height:1;return`
    <div class="tex-card${s.name===Sd.toUpperCase()?" selected":""}" data-name="${s.name}">
      <img src="${s.dataUrl}" style="aspect-ratio:${r};image-rendering:pixelated">
      <div class="tex-card-name">${s.name}</div>
    </div>`}).join(""),i.querySelectorAll(".tex-card").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.name;Lo&&Lo(r),vo()})})}function Rr(i){const e=ep();Lo=i.onSelect,vr=i.filter??"all",Sd=i.currentValue??"",Yc="";const t=e.querySelector("#tex-search");t.value="",e.querySelectorAll(".tex-tab").forEach(n=>n.classList.toggle("active",n.dataset.filter===vr)),ka(),e.style.display="",setTimeout(()=>t.focus(),50)}function vo(){const i=document.getElementById("texture-browser-modal");i&&(i.style.display="none"),Lo=null}function Pr(i,e=24){const t=Wc().get(i.toUpperCase());if(!t||!t.width||!t.height)return`width:${e}px;height:${e}px`;const n=t.width/t.height;return`width:${Math.round(e*n)}px;height:${e}px`}function Ms(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gn(i){const e=i.trim();if(!e)return 0;if(/^[\d+\-*/().  ]+$/.test(e))try{const t=new Function("return "+e)();if(typeof t=="number"&&isFinite(t))return Math.round(t*1e3)/1e3}catch{}return parseFloat(e)||0}function Lt(){var f;const i=document.getElementById("panel-empty"),e=document.getElementById("panel-content");if(Pt==="vertex"&&et.size>0){i.style.display="none",e.style.display="",rp(e);return}if(Pt==="sector"&&et.size>0){i.style.display="none",e.style.display="",op(e);return}if(Pt==="linedef"&&et.size>0){i.style.display="none",e.style.display="",ap(e);return}if(!be){i.style.display="",e.style.display="none",e.innerHTML="";return}i.style.display="none",e.style.display="";const{type:t,id:n}=be,s=t==="vertex"?"vertices":t+"s",r=P[s]&&P[s].get(n);if(!r){e.innerHTML='<div id="panel-empty">Not found.</div>';return}let o=`<div class="panel-title">${t} <span style="color:#444;text-transform:none">${n}</span></div>`;function a(h,g,v,p=1){return`<div class="prop-row"><label>${h}</label>
      <input type="text" data-path="${g}" data-numeric data-step="${p}" value="${v??0}"></div>`}function c(h,g,v){return`<div class="prop-row"><label>${h}</label>
      <input type="text" data-path="${g}" value="${Ms(v??"")}"></div>`}function l(h,g,v,p){const m=v??"",x=Zi()?Us(m):null,y=m?Pr(m):"width:24px;height:24px",M=x?`<img class="tex-preview tex-clickable" src="${x}" style="${y}" data-path="${g}" data-tex-type="${p}">`:`<span class="tex-clickable tex-placeholder" data-path="${g}" data-tex-type="${p}"></span>`;return`<div class="prop-row"><label>${h}</label>
      ${M}
      <span class="tex-name tex-clickable" data-path="${g}" data-tex-type="${p}">${Ms(m)||"—"}</span></div>`}function u(h,g,v,p){const m=p&v?"checked":"";return`<div class="prop-row"><label>${h}</label>
      <input type="checkbox" data-bitmask="${g}" data-bit="${v}" ${m}></div>`}function d(h,g,v=!1){const p=P.sidedefs.get(g);if(!p)return"";const m=x=>`sidedefs/${g}/${x}`;return`<div class="prop-section${v?" active-side":""}">
      <div class="panel-title">${h}</div>
      ${c("Sector",m("sector"),p.sector??"")}
      ${a("X Off",m("xoff"),p.xoff)}
      ${a("Y Off",m("yoff"),p.yoff)}
      ${l("Upper",m("upper"),p.upper,"wall")}
      ${l("Mid",m("mid"),p.mid,"wall")}
      ${l("Lower",m("lower"),p.lower,"wall")}
    </div>`}if(t==="vertex"){const h=g=>`vertices/${n}/${g}`;o+=`<div class="prop-row"><label>ID</label><span class="prop-val">${Ms(n)}</span></div>`,o+=a("X",h("x"),r.x)+a("Y",h("y"),r.y)}else if(t==="linedef"){const h=g=>`linedefs/${n}/${g}`;o+=a("Special",h("special"),r.special)+a("Tag",h("tag"),r.tag),o+='<div class="prop-section"><div class="panel-title">Flags</div>';for(const{bit:g,label:v}of sd)o+=u(v,`linedefs/${n}/flags`,g,r.flags||0);o+="</div>",r.frontSide&&(o+=d("Front Sidedef",r.frontSide,$i==="front")),r.backSide&&(o+=d("Back Sidedef",r.backSide,$i==="back"))}else if(t==="sector"){const h=g=>`sectors/${n}/${g}`;o+=a("Floor H",h("floor"),r.floor)+a("Ceil H",h("ceiling"),r.ceiling)+l("Floor Tex",h("floorTex"),r.floorTex||"FLOOR4_8","flat")+l("Ceil Tex",h("ceilTex"),r.ceilTex||"CEIL3_5","flat")+a("Light",h("light"),r.light)+a("Special",h("special"),r.special)+a("Tag",h("tag"),r.tag),o+='<button class="door-btn" id="door-btn">Create Door</button>'}else if(t==="thing"){const h=g=>`things/${n}/${g}`;o+=a("X",h("x"),r.x)+a("Y",h("y"),r.y)+a("Angle",h("angle"),r.angle),o+=`<div class="prop-row"><label>Type</label><select data-path="${h("type")}">`;for(const[g,v]of Object.entries(Ar))o+=`<option value="${g}" ${r.type==g?"selected":""}>${v.name}</option>`;o+="</select></div>",o+=a("Flags",h("flags"),r.flags)}o+=`<button class="del-btn" id="del-btn">Delete ${t}</button>`,e.innerHTML=o,e.querySelectorAll("[data-path]").forEach(h=>{h.addEventListener("change",()=>{var M;const[g,v,p]=h.dataset.path.split("/"),m=h.hasAttribute("data-numeric");m&&(h.value=String(gn(h.value)));const x=m?gn(h.value):h.tagName==="SELECT"?isNaN(Number(h.value))?h.value:+h.value:h.value,y=(M=P[g])==null?void 0:M.get(v);y&&(ht(),Ee(`map/${g}/${v}`,{...y},{...y,[p]:x}),pt()),pe(g).child(v).update({[p]:x})})}),e.querySelectorAll("[data-bitmask]").forEach(h=>{h.addEventListener("change",()=>{var C;const[g,v,p]=h.dataset.bitmask.split("/"),m=parseInt(h.dataset.bit,10),x=(P[g].get(v)||{})[p]||0,y=h.checked?x|m:x&~m,M=(C=P[g])==null?void 0:C.get(v);M&&(ht(),Ee(`map/${g}/${v}`,{...M},{...M,[p]:y}),pt()),pe(g).child(v).update({[p]:y})})}),e.querySelectorAll(".tex-clickable").forEach(h=>{h.addEventListener("click",()=>{var M,C;const g=h.dataset.path,v=h.dataset.texType,[p,m,x]=g.split("/"),y=((C=(M=P[p])==null?void 0:M.get(m))==null?void 0:C[x])??"";Rr({filter:v,currentValue:y,onSelect:T=>{var S;const A=(S=P[p])==null?void 0:S.get(m);A&&(ht(),Ee(`map/${p}/${m}`,{...A},{...A,[x]:T}),pt()),pe(p).child(m).update({[x]:T}),Lt()}})})}),e.querySelectorAll("input[data-numeric]").forEach(h=>{h.addEventListener("wheel",g=>{g.preventDefault();const v=g.deltaY<0?xn:-xn;h.value=String(gn(h.value)+v),h.dispatchEvent(new Event("change"))})}),e.querySelectorAll('input[type="text"]').forEach(h=>{h.addEventListener("focus",()=>h.select())}),document.getElementById("del-btn").addEventListener("click",_d),(f=document.getElementById("door-btn"))==null||f.addEventListener("click",()=>{(be==null?void 0:be.type)==="sector"&&ip(be.id)})}const tp=[{value:1,label:"Standard Door (open/close)"},{value:31,label:"Door (stays open)"},{value:26,label:"Blue Key Door"},{value:27,label:"Yellow Key Door"},{value:28,label:"Red Key Door"},{value:32,label:"Blue Key Door (stays open)"},{value:33,label:"Yellow Key Door (stays open)"},{value:34,label:"Red Key Door (stays open)"}];function Or(i,e,t,n){const s=Zi()?Us(t):null,r=Pr(t),o=s?`<img class="tex-preview door-tex-pick" src="${s}" style="${r}" data-door-id="${i}" data-tex-type="${n}">`:`<span class="door-tex-pick tex-placeholder" data-door-id="${i}" data-tex-type="${n}"></span>`;return`<div class="prop-row"><label>${e}</label>
    ${o}
    <span class="tex-name door-tex-pick" data-door-id="${i}" data-tex-type="${n}" id="${i}-name">${t||"—"}</span>
    <input type="hidden" id="${i}" value="${Ms(t)}">
  </div>`}function np(i){const e=document.getElementById(i);if(!e)return;const t=e.value,n=document.getElementById(i+"-name");n&&(n.textContent=t||"—");const s=e.closest(".prop-row");if(!s)return;const r=s.querySelector("img.door-tex-pick"),o=s.querySelector("span.door-tex-pick.tex-placeholder"),a=Zi()?Us(t):null;if(a&&r)r.src=a;else if(a&&o){const c=document.createElement("img");c.className="tex-preview door-tex-pick",c.src=a,c.style.cssText=Pr(t),c.dataset.doorId=o.dataset.doorId,c.dataset.texType=o.dataset.texType,o.replaceWith(c)}}function ip(i){let e=document.getElementById("door-modal");e&&e.remove(),e=document.createElement("div"),e.id="door-modal",e.className="tex-modal-overlay",e.innerHTML=`
    <div class="door-modal-content">
      <div class="panel-title" style="margin-bottom:12px;">Create Door</div>
      <div class="prop-row"><label>Type</label>
        <select id="door-type">
          ${tp.map(t=>`<option value="${t.value}">${t.label}</option>`).join("")}
        </select>
      </div>
      ${Or("door-tex-face","Door Face","BIGDOOR2","wall")}
      ${Or("door-tex-bottom","Door Bottom","FLAT20","flat")}
      ${Or("door-tex-track","Track Sides","DOORTRAK","wall")}
      ${Or("door-tex-floor","Track Floor","FLAT20","flat")}
      <div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end;">
        <button id="door-cancel" class="del-btn" style="background:#333;">Cancel</button>
        <button id="door-ok" class="del-btn" style="background:#2a6e2a;">OK</button>
      </div>
    </div>`,document.body.appendChild(e),e.querySelectorAll(".door-tex-pick").forEach(t=>{t.style.cursor="pointer",t.addEventListener("click",()=>{const n=t.dataset.doorId,s=t.dataset.texType,r=document.getElementById(n);Rr({filter:s,currentValue:r.value,onSelect:o=>{r.value=o,np(n)}})})}),e.addEventListener("click",t=>{t.target===e&&e.remove()}),e.addEventListener("keydown",t=>{t.key==="Escape"&&e.remove(),t.stopPropagation()}),e.addEventListener("keyup",t=>t.stopPropagation()),document.getElementById("door-cancel").addEventListener("click",()=>e.remove()),document.getElementById("door-ok").addEventListener("click",()=>{const t=parseInt(document.getElementById("door-type").value,10),n=document.getElementById("door-tex-face").value||"BIGDOOR2",s=document.getElementById("door-tex-bottom").value||"FLAT20",r=document.getElementById("door-tex-track").value||"DOORTRAK",o=document.getElementById("door-tex-floor").value||"FLAT20";sp(i,t,{face:n,bottom:s,trackSides:r,trackFloor:o}),e.remove()}),document.getElementById("door-type").focus()}function sp(i,e,t){const n=P.sectors.get(i);if(!n)return;ht();const s=n.floor??0,r={...n,ceiling:s,ceilTex:t.bottom,floorTex:t.trackFloor};Ee(`map/sectors/${i}`,{...n},r),pe("sectors").child(i).update({ceiling:s,ceilTex:t.bottom,floorTex:t.trackFloor}),P.linedefs.forEach((o,a)=>{if(!o.frontSide)return;const c=P.sidedefs.get(o.frontSide);if(!c)return;const l=o.backSide?P.sidedefs.get(o.backSide):null,u=c.sector===i,d=(l==null?void 0:l.sector)===i;if(!u&&!d)return;const f={...o};if(!o.backSide){const x=(o.flags||0)|16;Ee(`map/linedefs/${a}`,f,{...f,flags:x}),pe("linedefs").child(a).update({flags:x}),Ee(`map/sidedefs/${o.frontSide}`,{...c},{...c,mid:t.trackSides}),pe("sidedefs").child(o.frontSide).update({mid:t.trackSides});return}const h=(o.flags||0)|16;if(u){const x={...f,v1:o.v2,v2:o.v1,frontSide:o.backSide,backSide:o.frontSide,special:e,flags:h};Ee(`map/linedefs/${a}`,f,x),pe("linedefs").child(a).update(x)}else Ee(`map/linedefs/${a}`,f,{...f,special:e,flags:h}),pe("linedefs").child(a).update({special:e,flags:h});const g=u?o.backSide:o.frontSide,v=P.sidedefs.get(g);Ee(`map/sidedefs/${g}`,{...v},{...v,upper:t.face}),pe("sidedefs").child(g).update({upper:t.face});const p=u?o.frontSide:o.backSide,m=P.sidedefs.get(p);Ee(`map/sidedefs/${p}`,{...m},{...m,upper:t.trackSides}),pe("sidedefs").child(p).update({upper:t.trackSides})}),pt(),Lt()}function rp(i){const e=[...et],t=e.map(a=>P.vertices.get(a)).filter(Boolean);if(t.length===0)return;function n(a){const c=t.map(l=>l[a]);return c.every(l=>l===c[0])?c[0]:null}const s=n("x"),r=n("y");let o=`<div class="panel-title">vertices <span style="color:#444">${e.length} selected</span></div>`;o+=`<div class="prop-row"><label>X</label>
    <input type="text" data-multi-field="x" data-numeric data-step="1" value="${s!==null?s:""}" placeholder="mixed"></div>`,o+=`<div class="prop-row"><label>Y</label>
    <input type="text" data-multi-field="y" data-numeric data-step="1" value="${r!==null?r:""}" placeholder="mixed"></div>`,i.innerHTML=o,i.querySelectorAll("[data-multi-field]").forEach(a=>{a.addEventListener("change",()=>{const c=a.dataset.multiField;a.value=String(gn(a.value));const l=gn(a.value);ht();for(const u of e){const d=P.vertices.get(u);d&&(Ee(`map/vertices/${u}`,{...d},{...d,[c]:l}),pe("vertices").child(u).update({[c]:l}))}pt()})})}function op(i){const e=[...et],t=e.map(g=>P.sectors.get(g)).filter(Boolean);if(t.length===0)return;function n(g){const v=t.map(p=>p[g]);return v.every(p=>p===v[0])?v[0]:null}const s=n("floor"),r=n("ceiling"),o=n("light"),a=n("special"),c=n("tag"),l=n("floorTex"),u=n("ceilTex");function d(g,v,p,m=1){return`<div class="prop-row"><label>${g}</label>
      <input type="text" data-multi-field="${v}" data-numeric data-step="${m}" value="${p!==null?p:""}" placeholder="mixed"></div>`}function f(g,v,p,m){const x=p??"",y=x&&Zi()?Us(x):null,M=x?Pr(x):"width:24px;height:24px",C=y?`<img class="tex-preview tex-clickable" src="${y}" style="${M}" data-multi-field="${v}" data-tex-type="${m}">`:`<span class="tex-clickable tex-placeholder" data-multi-field="${v}" data-tex-type="${m}"></span>`;return`<div class="prop-row"><label>${g}</label>
      ${C}
      <span class="tex-name tex-clickable" data-multi-field="${v}" data-tex-type="${m}">${p?Ms(x):"mixed"}</span></div>`}let h=`<div class="panel-title">sectors <span style="color:#444">${e.length} selected</span></div>`;h+=d("Floor H","floor",s),h+=d("Ceil H","ceiling",r),h+=f("Floor Tex","floorTex",l,"flat"),h+=f("Ceil Tex","ceilTex",u,"flat"),h+=d("Light","light",o),h+=d("Special","special",a),h+=d("Tag","tag",c),i.innerHTML=h,i.querySelectorAll("[data-multi-field]").forEach(g=>{g.tagName==="INPUT"&&g.addEventListener("change",()=>{const v=g.dataset.multiField,p=g.hasAttribute("data-numeric");p&&(g.value=String(gn(g.value)));const m=p?gn(g.value):g.value;ht();for(const x of e){const y=P.sectors.get(x);y&&(Ee(`map/sectors/${x}`,{...y},{...y,[v]:m}),pe("sectors").child(x).update({[v]:m}))}pt()})}),i.querySelectorAll(".tex-clickable").forEach(g=>{g.addEventListener("click",()=>{const v=g.dataset.multiField,p=g.dataset.texType,m=n(v)??"";Rr({filter:p,currentValue:m,onSelect:x=>{ht();for(const y of e){const M=P.sectors.get(y);M&&(Ee(`map/sectors/${y}`,{...M},{...M,[v]:x}),pe("sectors").child(y).update({[v]:x}))}pt(),Lt()}})})}),i.querySelectorAll("input[data-numeric]").forEach(g=>{g.addEventListener("wheel",v=>{v.preventDefault();const p=v.deltaY<0?xn:-xn;g.value=String(gn(g.value)+p),g.dispatchEvent(new Event("change"))})}),i.querySelectorAll("input[data-numeric]").forEach(g=>{g.addEventListener("focus",()=>g.select())})}function ap(i){const e=[...et],t=e.map(v=>P.linedefs.get(v)).filter(Boolean);if(t.length===0)return;function n(v){const p=t.map(m=>m[v]);return p.every(m=>m===p[0])?p[0]:null}const s=e.map(v=>{var p;return(p=P.linedefs.get(v))==null?void 0:p.frontSide}).filter(Boolean),r=e.map(v=>{var p;return(p=P.linedefs.get(v))==null?void 0:p.backSide}).filter(Boolean);function o(v,p){if(v.length===0)return null;const m=v.map(x=>{const y=P.sidedefs.get(x);return y?y[p]:void 0});return m.every(x=>x===m[0])?m[0]:null}const a=n("special"),c=n("tag"),l=n("flags");function u(v,p,m,x=1){return`<div class="prop-row"><label>${v}</label>
      <input type="text" data-multi-field="${p}" data-numeric data-step="${x}" value="${m!==null?m:""}" placeholder="mixed"></div>`}function d(v,p,m){const x=m!==null&&m&p?"checked":"";return`<div class="prop-row"><label>${v}</label>
      <input type="checkbox" data-multi-bit="${p}" ${x}></div>`}function f(v,p,m,x){if(m.length===0)return"";const y=o(m,p),M=y??"",C=M&&Zi()?Us(M):null,T=M?Pr(M):"width:24px;height:24px",A=C?`<img class="tex-preview tex-clickable" src="${C}" style="${T}" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}">`:`<span class="tex-clickable tex-placeholder" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}"></span>`;return`<div class="prop-row"><label>${v}</label>
      ${A}
      <span class="tex-name tex-clickable" data-side-field="${p}" data-side-type="${x}" data-side-ids="${m.join(",")}">${y?Ms(M):"mixed"}</span></div>`}let h=`<div class="panel-title">linedefs <span style="color:#444">${e.length} selected</span></div>`;h+=u("Special","special",a),h+=u("Tag","tag",c),h+='<div class="prop-section"><div class="panel-title">Flags</div>';for(const{bit:v,label:p}of sd)h+=d(p,v,l);h+="</div>";const g=e.map(v=>fr.get(v)).filter(Boolean);if(g.length>0){let v=function(y,M){const C=y.map(T=>{const A=P.sidedefs.get(T);return A?A[M]??0:0});return C.every(T=>T===C[0])?C[0]:null},p=function(y,M,C,T,A=1){return`<div class="prop-row"><label>${y}</label>
        <input type="text" data-multi-side-num="${M}" data-side-ids="${T.join(",")}" data-numeric data-step="${A}" value="${C!==null?C:""}" placeholder="mixed"></div>`};const m=v(g,"xoff"),x=v(g,"yoff");h+=`<div class="prop-section"><div class="panel-title">Selected Sides <span style="color:#444">${g.length}</span></div>`,h+=p("X Off","xoff",m,g),h+=p("Y Off","yoff",x,g),h+="</div>"}s.length>0&&(h+='<div class="prop-section"><div class="panel-title">Front Sidedef</div>',h+=f("Upper","upper",s,"wall"),h+=f("Mid","mid",s,"wall"),h+=f("Lower","lower",s,"wall"),h+="</div>"),r.length>0&&(h+='<div class="prop-section"><div class="panel-title">Back Sidedef</div>',h+=f("Upper","upper",r,"wall"),h+=f("Mid","mid",r,"wall"),h+=f("Lower","lower",r,"wall"),h+="</div>"),i.innerHTML=h,i.querySelectorAll("[data-multi-field]").forEach(v=>{v.addEventListener("change",()=>{const p=v.dataset.multiField;v.hasAttribute("data-numeric")&&(v.value=String(gn(v.value)));const m=gn(v.value);ht();for(const x of e){const y=P.linedefs.get(x);y&&(Ee(`map/linedefs/${x}`,{...y},{...y,[p]:m}),pe("linedefs").child(x).update({[p]:m}))}pt()})}),i.querySelectorAll("[data-multi-side-num]").forEach(v=>{v.addEventListener("change",()=>{const p=v.dataset.multiSideNum,m=v.dataset.sideIds.split(","),x=gn(v.value);v.value=String(x),ht();for(const y of m){const M=P.sidedefs.get(y);M&&(Ee(`map/sidedefs/${y}`,{...M},{...M,[p]:x}),pe("sidedefs").child(y).update({[p]:x}))}pt()})}),i.querySelectorAll("[data-multi-bit]").forEach(v=>{v.addEventListener("change",()=>{const p=parseInt(v.dataset.multiBit,10);ht();for(const m of e){const x=P.linedefs.get(m);if(x){const y=x.flags||0,M=v.checked?y|p:y&~p;Ee(`map/linedefs/${m}`,{...x},{...x,flags:M}),pe("linedefs").child(m).update({flags:M})}}pt()})}),i.querySelectorAll(".tex-clickable").forEach(v=>{v.addEventListener("click",()=>{const p=v.dataset.sideField,m=v.dataset.sideType,x=v.dataset.sideIds.split(","),y=o(x,p)??"";Rr({filter:m,currentValue:y,onSelect:M=>{ht();for(const C of x){const T=P.sidedefs.get(C);T&&(Ee(`map/sidedefs/${C}`,{...T},{...T,[p]:M}),pe("sidedefs").child(C).update({[p]:M}))}pt(),Lt()}})})}),i.querySelectorAll("input[data-numeric]").forEach(v=>{v.addEventListener("wheel",p=>{p.preventDefault();const m=p.deltaY<0?xn:-xn;v.value=String(gn(v.value)+m),v.dispatchEvent(new Event("change"))})}),i.querySelectorAll("input[data-numeric]").forEach(v=>{v.addEventListener("focus",()=>v.select())})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kc="183",cp=0,Cl=1,lp=2,xo=1,up=2,Zs=3,Ei=0,en=1,wn=2,ni=0,Es=1,Rl=2,Pl=3,Ll=4,dp=5,Oi=100,fp=101,hp=102,pp=103,mp=104,gp=200,vp=201,xp=202,_p=203,za=204,Va=205,Sp=206,yp=207,Mp=208,Ep=209,bp=210,Tp=211,Ap=212,wp=213,Cp=214,Ha=0,Ga=1,Wa=2,As=3,Xa=4,$a=5,qa=6,Ya=7,yd=0,Rp=1,Pp=2,zn=0,Md=1,Ed=2,bd=3,Td=4,Ad=5,wd=6,Cd=7,Rd=300,Yi=301,ws=302,Ko=303,jo=304,Bo=306,xr=1e3,Qn=1001,Ka=1002,At=1003,Lp=1004,Br=1005,qt=1006,Zo=1007,Vi=1008,mn=1009,Pd=1010,Ld=1011,_r=1012,jc=1013,Hn=1014,Bn=1015,si=1016,Zc=1017,Jc=1018,Sr=1020,Id=35902,Dd=35899,Ud=1021,Nd=1022,Pn=1023,ri=1026,Hi=1027,Fd=1028,Qc=1029,Cs=1030,el=1031,tl=1033,_o=33776,So=33777,yo=33778,Mo=33779,ja=35840,Za=35841,Ja=35842,Qa=35843,ec=36196,tc=37492,nc=37496,ic=37488,sc=37489,rc=37490,oc=37491,ac=37808,cc=37809,lc=37810,uc=37811,dc=37812,fc=37813,hc=37814,pc=37815,mc=37816,gc=37817,vc=37818,xc=37819,_c=37820,Sc=37821,yc=36492,Mc=36494,Ec=36495,bc=36283,Tc=36284,Ac=36285,wc=36286,Ip=3200,Dp=0,Up=1,_i="",hn="srgb",Rs="srgb-linear",Io="linear",st="srgb",es=7680,Il=519,Np=512,Fp=513,Op=514,nl=515,Bp=516,kp=517,il=518,zp=519,Dl=35044,Ul="300 es",kn=2e3,Do=2001;function Vp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Uo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hp(){const i=Uo("canvas");return i.style.display="block",i}const Nl={};function Fl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Od(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Fe(...i){i=Od(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=Od(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function No(...i){const e=i.join(" ");e in Nl||(Nl[e]=!0,Fe(...i))}function Gp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Wp={[Ha]:Ga,[Wa]:qa,[Xa]:Ya,[As]:$a,[Ga]:Ha,[qa]:Wa,[Ya]:Xa,[$a]:As};class Fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jo=Math.PI/180,Cc=180/Math.PI;function Os(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Xp(i,e){return(i%e+e)%e}function Qo(i,e,t){return(1-t)*i+t*e}function zs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[o+0],h=r[o+1],g=r[o+2],v=r[o+3];if(d!==v||c!==f||l!==h||u!==g){let p=c*f+l*h+u*g+d*v;p<0&&(f=-f,h=-h,g=-g,v=-v,p=-p);let m=1-a;if(p<.9995){const x=Math.acos(p),y=Math.sin(x);m=Math.sin(m*x)/y,a=Math.sin(a*x)/y,c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+v*a}else{c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+v*a;const x=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=x,l*=x,u*=x,d*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],f=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),f=c(n/2),h=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(o-s)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+l)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(r-l)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(c+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,n=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ol.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ol.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ea.copy(this).projectOnVector(e),this.sub(ea)}reflect(e){return this.sub(ea.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new B,Ol=new Bs;class He{constructor(e,t,n,s,r,o,a,c,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],v=s[0],p=s[3],m=s[6],x=s[1],y=s[4],M=s[7],C=s[2],T=s[5],A=s[8];return r[0]=o*v+a*x+c*C,r[3]=o*p+a*y+c*T,r[6]=o*m+a*M+c*A,r[1]=l*v+u*x+d*C,r[4]=l*p+u*y+d*T,r[7]=l*m+u*M+d*A,r[2]=f*v+h*x+g*C,r[5]=f*p+h*y+g*T,r[8]=f*m+h*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*r,h=l*r-o*c,g=t*d+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*l-u*n)*v,e[2]=(a*n-s*o)*v,e[3]=f*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=h*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ta.makeScale(e,t)),this}rotate(e){return this.premultiply(ta.makeRotation(-e)),this}translate(e,t){return this.premultiply(ta.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new He,Bl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $p(){const i={enabled:!0,workingColorSpace:Rs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===st&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===st&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?Io:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return No("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return No("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Rs]:{primaries:e,whitePoint:n,transfer:Io,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:st,toXYZ:Bl,fromXYZ:kl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Je=$p();function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function bs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ts;class qp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=Uo("canvas")),ts.width=e.width,ts.height=e.height;const s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Uo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ii(t[n]/255)*255):t[n]=ii(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yp=0;class sl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=Os(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(na(s[o].image)):r.push(na(s[o]))}else r=na(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function na(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Kp=0;const ia=new B;class Gt extends Fs{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Qn,s=Qn,r=qt,o=Vi,a=Pn,c=mn,l=Gt.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=Os(),this.name="",this.source=new sl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ia).x}get height(){return this.source.getSize(ia).y}get depth(){return this.source.getSize(ia).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xr:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xr:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Rd;Gt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,M=(h+1)/2,C=(m+1)/2,T=(u+f)/4,A=(d+v)/4,S=(g+p)/4;return y>M&&y>C?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=A/n):M>C?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=S/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=S/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(f-u)/x,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jp extends Fs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Gt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new sl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends jp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bd extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zp extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Et{constructor(e,t,n,s,r,o,a,c,l,u,d,f,h,g,v,p){Et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,d,f,h,g,v,p)}set(e,t,n,s,r,o,a,c,l,u,d,f,h,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),o=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,h=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,h=c*d,g=l*u,v=l*d;t[0]=f+v*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,h=c*d,g=l*u,v=l*d;t[0]=f-v*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,h=o*d,g=a*u,v=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+v,t[1]=c*d,t[5]=v*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,h=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-v*d}else if(e.order==="XZY"){const f=o*c,h=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+v,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jp,e,Qp)}lookAt(e,t,n){const s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ui.crossVectors(n,rn),ui.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ui.crossVectors(n,rn)),ui.normalize(),kr.crossVectors(rn,ui),s[0]=ui.x,s[4]=kr.x,s[8]=rn.x,s[1]=ui.y,s[5]=kr.y,s[9]=rn.y,s[2]=ui.z,s[6]=kr.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],v=n[6],p=n[10],m=n[14],x=n[3],y=n[7],M=n[11],C=n[15],T=s[0],A=s[4],S=s[8],b=s[12],z=s[1],R=s[5],F=s[9],k=s[13],O=s[2],V=s[6],H=s[10],U=s[14],Q=s[3],ee=s[7],de=s[11],fe=s[15];return r[0]=o*T+a*z+c*O+l*Q,r[4]=o*A+a*R+c*V+l*ee,r[8]=o*S+a*F+c*H+l*de,r[12]=o*b+a*k+c*U+l*fe,r[1]=u*T+d*z+f*O+h*Q,r[5]=u*A+d*R+f*V+h*ee,r[9]=u*S+d*F+f*H+h*de,r[13]=u*b+d*k+f*U+h*fe,r[2]=g*T+v*z+p*O+m*Q,r[6]=g*A+v*R+p*V+m*ee,r[10]=g*S+v*F+p*H+m*de,r[14]=g*b+v*k+p*U+m*fe,r[3]=x*T+y*z+M*O+C*Q,r[7]=x*A+y*R+M*V+C*ee,r[11]=x*S+y*F+M*H+C*de,r[15]=x*b+y*k+M*U+C*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],v=e[7],p=e[11],m=e[15],x=c*h-l*f,y=a*h-l*d,M=a*f-c*d,C=o*h-l*u,T=o*f-c*u,A=o*d-a*u;return t*(v*x-p*y+m*M)-n*(g*x-p*C+m*T)+s*(g*y-v*C+m*A)-r*(g*M-v*T+p*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],v=e[13],p=e[14],m=e[15],x=t*a-n*o,y=t*c-s*o,M=t*l-r*o,C=n*c-s*a,T=n*l-r*a,A=s*l-r*c,S=u*v-d*g,b=u*p-f*g,z=u*m-h*g,R=d*p-f*v,F=d*m-h*v,k=f*m-h*p,O=x*k-y*F+M*R+C*z-T*b+A*S;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/O;return e[0]=(a*k-c*F+l*R)*V,e[1]=(s*F-n*k-r*R)*V,e[2]=(v*A-p*T+m*C)*V,e[3]=(f*T-d*A-h*C)*V,e[4]=(c*z-o*k-l*b)*V,e[5]=(t*k-s*z+r*b)*V,e[6]=(p*M-g*A-m*y)*V,e[7]=(u*A-f*M+h*y)*V,e[8]=(o*F-a*z+l*S)*V,e[9]=(n*z-t*F-r*S)*V,e[10]=(g*T-v*M+m*x)*V,e[11]=(d*M-u*T-h*x)*V,e[12]=(a*b-o*R-c*S)*V,e[13]=(t*R-n*b+s*S)*V,e[14]=(v*y-g*C-p*x)*V,e[15]=(u*C-d*y+f*x)*V,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,f=r*l,h=r*u,g=r*d,v=o*u,p=o*d,m=a*d,x=c*l,y=c*u,M=c*d,C=n.x,T=n.y,A=n.z;return s[0]=(1-(v+m))*C,s[1]=(h+M)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(h-M)*T,s[5]=(1-(f+m))*T,s[6]=(p+x)*T,s[7]=0,s[8]=(g+y)*A,s[9]=(p-x)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let o=ns.set(s[0],s[1],s[2]).length();const a=ns.set(s[4],s[5],s[6]).length(),c=ns.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Mn.copy(this);const l=1/o,u=1/a,d=1/c;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=kn,c=!1){const l=this.elements,u=2*r/(t-e),d=2*r/(n-s),f=(t+e)/(t-e),h=(n+s)/(n-s);let g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===kn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Do)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=kn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-s),f=-(t+e)/(t-e),h=-(n+s)/(n-s);let g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===kn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Do)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ns=new B,Mn=new Et,Jp=new B(0,0,0),Qp=new B(1,1,1),ui=new B,kr=new B,rn=new B,zl=new Et,Vl=new Bs;class oi{constructor(e=0,t=0,n=0,s=oi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oi.DEFAULT_ORDER="XYZ";class rl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let em=0;const Hl=new B,is=new Bs,qn=new Et,zr=new B,Vs=new B,tm=new B,nm=new Bs,Gl=new B(1,0,0),Wl=new B(0,1,0),Xl=new B(0,0,1),$l={type:"added"},im={type:"removed"},ss={type:"childadded",child:null},sa={type:"childremoved",child:null};class tn extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new B,t=new oi,n=new Bs,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Et},normalMatrix:{value:new He}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(Gl,e)}rotateY(e){return this.rotateOnAxis(Wl,e)}rotateZ(e){return this.rotateOnAxis(Xl,e)}translateOnAxis(e,t){return Hl.copy(e).applyQuaternion(this.quaternion),this.position.add(Hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gl,e)}translateY(e){return this.translateOnAxis(Wl,e)}translateZ(e){return this.translateOnAxis(Xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Vs,zr,this.up):qn.lookAt(zr,Vs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(qn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($l),ss.child=e,this.dispatchEvent(ss),ss.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(im),sa.child=e,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($l),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,e,tm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,nm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new B(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Js extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sm={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Js;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function oa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=Xp(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=oa(o,r,e+1/3),this.g=oa(o,r,e),this.b=oa(o,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Je.workingToColorSpace($t.copy(this),e),Math.round(qe($t.r*255,0,255))*65536+Math.round(qe($t.g*255,0,255))*256+Math.round(qe($t.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace($t.copy(this),t);const n=$t.r,s=$t.g,r=$t.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=hn){Je.workingToColorSpace($t.copy(this),e);const t=$t.r,n=$t.g,s=$t.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(di),this.setHSL(di.h+e,di.s+t,di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(di),e.getHSL(Vr);const n=Qo(di.h,Vr.h,t),s=Qo(di.s,Vr.s,t),r=Qo(di.l,Vr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new Ke;Ke.NAMES=kd;class ol{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=t}clone(){return new ol(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class rm extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const En=new B,Yn=new B,aa=new B,Kn=new B,rs=new B,os=new B,ql=new B,ca=new B,la=new B,ua=new B,da=new Tt,fa=new Tt,ha=new Tt;class Cn{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),Yn.subVectors(n,t),aa.subVectors(e,t);const o=En.dot(En),a=En.dot(Yn),c=En.dot(aa),l=Yn.dot(Yn),u=Yn.dot(aa),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(o,Kn.y),c.addScaledVector(a,Kn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return da.setScalar(0),fa.setScalar(0),ha.setScalar(0),da.fromBufferAttribute(e,t),fa.fromBufferAttribute(e,n),ha.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(da,r.x),o.addScaledVector(fa,r.y),o.addScaledVector(ha,r.z),o}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),Yn.subVectors(e,t),En.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),En.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;rs.subVectors(s,n),os.subVectors(r,n),ca.subVectors(e,n);const c=rs.dot(ca),l=os.dot(ca);if(c<=0&&l<=0)return t.copy(n);la.subVectors(e,s);const u=rs.dot(la),d=os.dot(la);if(u>=0&&d<=u)return t.copy(s);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(rs,o);ua.subVectors(e,r);const h=rs.dot(ua),g=os.dot(ua);if(g>=0&&h<=g)return t.copy(r);const v=h*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(os,a);const p=u*g-h*d;if(p<=0&&d-u>=0&&h-g>=0)return ql.subVectors(r,s),a=(d-u)/(d-u+(h-g)),t.copy(s).addScaledVector(ql,a);const m=1/(p+v+f);return o=v*m,a=f*m,t.copy(n).addScaledVector(rs,o).addScaledVector(os,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Lr{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hr.copy(n.boundingBox)),Hr.applyMatrix4(e.matrixWorld),this.union(Hr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hs),Gr.subVectors(this.max,Hs),as.subVectors(e.a,Hs),cs.subVectors(e.b,Hs),ls.subVectors(e.c,Hs),fi.subVectors(cs,as),hi.subVectors(ls,cs),Ai.subVectors(as,ls);let t=[0,-fi.z,fi.y,0,-hi.z,hi.y,0,-Ai.z,Ai.y,fi.z,0,-fi.x,hi.z,0,-hi.x,Ai.z,0,-Ai.x,-fi.y,fi.x,0,-hi.y,hi.x,0,-Ai.y,Ai.x,0];return!pa(t,as,cs,ls,Gr)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,as,cs,ls,Gr))?!1:(Wr.crossVectors(fi,hi),t=[Wr.x,Wr.y,Wr.z],pa(t,as,cs,ls,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new B,new B,new B,new B,new B,new B,new B,new B],bn=new B,Hr=new Lr,as=new B,cs=new B,ls=new B,fi=new B,hi=new B,Ai=new B,Hs=new B,Gr=new B,Wr=new B,wi=new B;function pa(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){wi.fromArray(i,r);const a=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=n.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const wt=new B,Xr=new Pe;let om=0;class nn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:om++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dl,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xr.fromBufferAttribute(this,t),Xr.applyMatrix3(e),this.setXY(t,Xr.x,Xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dl&&(e.usage=this.usage),e}}class zd extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Vd extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vn extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const am=new Lr,Gs=new B,ma=new B;class al{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):am.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gs.subVectors(e,this.center);const t=Gs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gs.copy(e.center).add(ma)),this.expandByPoint(Gs.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let cm=0;const ln=new Et,ga=new tn,us=new B,on=new Lr,Ws=new Lr,Ft=new B;class Sn extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vp(e)?Vd:zd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return ga.lookAt(e),ga.updateMatrix(),this.applyMatrix4(ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new vn(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Lr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new al);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(on.min,Ws.min),on.expandByPoint(Ft),Ft.addVectors(on.max,Ws.max),on.expandByPoint(Ft)):(on.expandByPoint(Ws.min),on.expandByPoint(Ws.max))}on.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ft.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(e,l),Ft.add(us)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let S=0;S<n.count;S++)a[S]=new B,c[S]=new B;const l=new B,u=new B,d=new B,f=new Pe,h=new Pe,g=new Pe,v=new B,p=new B;function m(S,b,z){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,z),f.fromBufferAttribute(r,S),h.fromBufferAttribute(r,b),g.fromBufferAttribute(r,z),u.sub(l),d.sub(l),h.sub(f),g.sub(f);const R=1/(h.x*g.y-g.x*h.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(R),p.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(R),a[S].add(v),a[b].add(v),a[z].add(v),c[S].add(p),c[b].add(p),c[z].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let S=0,b=x.length;S<b;++S){const z=x[S],R=z.start,F=z.count;for(let k=R,O=R+F;k<O;k+=3)m(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const y=new B,M=new B,C=new B,T=new B;function A(S){C.fromBufferAttribute(s,S),T.copy(C);const b=a[S];y.copy(b),y.sub(C.multiplyScalar(C.dot(b))).normalize(),M.crossVectors(T,b);const R=M.dot(c[S])<0?-1:1;o.setXYZW(S,y.x,y.y,y.z,R)}for(let S=0,b=x.length;S<b;++S){const z=x[S],R=z.start,F=z.count;for(let k=R,O=R+F;k<O;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,u=new B,d=new B;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),v=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u);let h=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?h=c[v]*a.data.stride+a.offset:h=c[v]*u;for(let m=0;m<u;m++)f[g++]=l[h++]}return new nn(f,u,d)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Sn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const f=l[u],h=e(f,n);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let lm=0;class Ir extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=Es,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Va,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==za&&(n.blendSrc=this.blendSrc),this.blendDst!==Va&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Zn=new B,va=new B,$r=new B,pi=new B,xa=new B,qr=new B,_a=new B;class Hd{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){va.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(va);const r=e.distanceTo(t)*.5,o=-this.direction.dot($r),a=pi.dot(this.direction),c=-pi.dot($r),l=pi.lengthSq(),u=Math.abs(1-o*o);let d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=r*u,d>=0)if(f>=-g)if(f<=g){const v=1/u;d*=v,f*=v,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(va).addScaledVector($r,f),h}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,s,r){xa.subVectors(t,e),qr.subVectors(n,e),_a.crossVectors(xa,qr);let o=this.direction.dot(_a),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;pi.subVectors(this.origin,e);const c=a*this.direction.dot(qr.crossVectors(pi,qr));if(c<0)return null;const l=a*this.direction.dot(xa.cross(pi));if(l<0||c+l>o)return null;const u=-a*pi.dot(_a);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ps extends Ir{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=yd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yl=new Et,Ci=new Hd,Yr=new al,Kl=new B,Kr=new B,jr=new B,Zr=new B,Sa=new B,Jr=new B,jl=new B,Qr=new B;class Kt extends tn{constructor(e=new Sn,t=new Ps){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Jr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(Sa.fromBufferAttribute(d,e),o?Jr.addScaledVector(Sa,u):Jr.addScaledVector(Sa.sub(t),u))}t.add(Jr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(r),Ci.copy(e.ray).recast(e.near),!(Yr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(Yr,Kl)===null||Ci.origin.distanceToSquared(Kl)>(e.far-e.near)**2))&&(Yl.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Yl),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ci)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],m=o[p.materialIndex],x=Math.max(p.start,h.start),y=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let M=x,C=y;M<C;M+=3){const T=a.getX(M),A=a.getX(M+1),S=a.getX(M+2);s=eo(this,m,e,n,l,u,d,T,A,S),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),v=Math.min(a.count,h.start+h.count);for(let p=g,m=v;p<m;p+=3){const x=a.getX(p),y=a.getX(p+1),M=a.getX(p+2);s=eo(this,o,e,n,l,u,d,x,y,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],m=o[p.materialIndex],x=Math.max(p.start,h.start),y=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let M=x,C=y;M<C;M+=3){const T=M,A=M+1,S=M+2;s=eo(this,m,e,n,l,u,d,T,A,S),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),v=Math.min(c.count,h.start+h.count);for(let p=g,m=v;p<m;p+=3){const x=p,y=p+1,M=p+2;s=eo(this,o,e,n,l,u,d,x,y,M),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function um(i,e,t,n,s,r,o,a){let c;if(e.side===en?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ei,a),c===null)return null;Qr.copy(a),Qr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Qr);return l<t.near||l>t.far?null:{distance:l,point:Qr.clone(),object:i}}function eo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Kr),i.getVertexPosition(c,jr),i.getVertexPosition(l,Zr);const u=um(i,e,t,n,Kr,jr,Zr,jl);if(u){const d=new B;Cn.getBarycoord(jl,Kr,jr,Zr,d),s&&(u.uv=Cn.getInterpolatedAttribute(s,a,c,l,d,new Pe)),r&&(u.uv1=Cn.getInterpolatedAttribute(r,a,c,l,d,new Pe)),o&&(u.normal=Cn.getInterpolatedAttribute(o,a,c,l,d,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new B,materialIndex:0};Cn.getNormal(Kr,jr,Zr,f.normal),u.face=f,u.barycoord=d}return u}class dm extends Gt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=At,u=At,d,f){super(null,o,a,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ya=new B,fm=new B,hm=new He;class Ui{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ya.subVectors(n,t).cross(fm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ya),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||hm.getNormalMatrix(e),s=this.coplanarPoint(ya).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new al,pm=new Pe(.5,.5),to=new B;class Gd{constructor(e=new Ui,t=new Ui,n=new Ui,s=new Ui,r=new Ui,o=new Ui){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],h=r[7],g=r[8],v=r[9],p=r[10],m=r[11],x=r[12],y=r[13],M=r[14],C=r[15];if(s[0].setComponents(l-o,h-u,m-g,C-x).normalize(),s[1].setComponents(l+o,h+u,m+g,C+x).normalize(),s[2].setComponents(l+a,h+d,m+v,C+y).normalize(),s[3].setComponents(l-a,h-d,m-v,C-y).normalize(),n)s[4].setComponents(c,f,p,M).normalize(),s[5].setComponents(l-c,h-f,m-p,C-M).normalize();else if(s[4].setComponents(l-c,h-f,m-p,C-M).normalize(),t===kn)s[5].setComponents(l+c,h+f,m+p,C+M).normalize();else if(t===Do)s[5].setComponents(c,f,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);const t=pm.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(to.x=s.normal.x>0?e.max.x:e.min.x,to.y=s.normal.y>0?e.max.y:e.min.y,to.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wd extends Gt{constructor(e=[],t=Yi,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yr extends Gt{constructor(e,t,n=Hn,s,r,o,a=At,c=At,l,u=ri,d=1){if(u!==ri&&u!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class mm extends yr{constructor(e,t=Hn,n=Yi,s,r,o=At,a=At,c,l=ri){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xd extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Dr extends Sn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new vn(l,3)),this.setAttribute("normal",new vn(u,3)),this.setAttribute("uv",new vn(d,2));function g(v,p,m,x,y,M,C,T,A,S,b){const z=M/A,R=C/S,F=M/2,k=C/2,O=T/2,V=A+1,H=S+1;let U=0,Q=0;const ee=new B;for(let de=0;de<H;de++){const fe=de*R-k;for(let xe=0;xe<V;xe++){const Oe=xe*z-F;ee[v]=Oe*x,ee[p]=fe*y,ee[m]=O,l.push(ee.x,ee.y,ee.z),ee[v]=0,ee[p]=0,ee[m]=T>0?1:-1,u.push(ee.x,ee.y,ee.z),d.push(xe/A),d.push(1-de/S),U+=1}}for(let de=0;de<S;de++)for(let fe=0;fe<A;fe++){const xe=f+fe+V*de,Oe=f+fe+V*(de+1),nt=f+(fe+1)+V*(de+1),ot=f+(fe+1)+V*de;c.push(xe,Oe,ot),c.push(Oe,nt,ot),Q+=6}a.addGroup(h,Q,b),h+=Q,f+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,h=(o-u)/f;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new Pe:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new B,s=[],r=[],o=[],a=new B,c=new Et;for(let h=0;h<=e;h++){const g=h/e;s[h]=this.getTangentAt(g,new B)}r[0]=new B,o[0]=new B;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(qe(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(a,g))}o[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(qe(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(h=-h);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],h*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class cl extends Wn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new Pe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,h=l-this.aY;c=f*u-h*d+this.aX,l=f*d+h*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class gm extends cl{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ll(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,d){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,h=(a-o)/u-(c-o)/(u+d)+(c-a)/d;f*=u,h*=u,s(o,a,f,h)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const no=new B,Ma=new ll,Ea=new ll,ba=new ll;class vm extends Wn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new B){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(no.subVectors(s[0],s[1]).add(s[0]),l=no);const d=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(no.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=no),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),h),v=Math.pow(d.distanceToSquared(f),h),p=Math.pow(f.distanceToSquared(u),h);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Ma.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,g,v,p),Ea.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,g,v,p),ba.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,g,v,p)}else this.curveType==="catmullrom"&&(Ma.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),Ea.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),ba.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(Ma.calc(c),Ea.calc(c),ba.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new B().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Zl(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function xm(i,e){const t=1-i;return t*t*e}function _m(i,e){return 2*(1-i)*i*e}function Sm(i,e){return i*i*e}function cr(i,e,t,n){return xm(i,e)+_m(i,t)+Sm(i,n)}function ym(i,e){const t=1-i;return t*t*t*e}function Mm(i,e){const t=1-i;return 3*t*t*i*e}function Em(i,e){return 3*(1-i)*i*i*e}function bm(i,e){return i*i*i*e}function lr(i,e,t,n,s){return ym(i,e)+Mm(i,t)+Em(i,n)+bm(i,s)}class $d extends Wn{constructor(e=new Pe,t=new Pe,n=new Pe,s=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Pe){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(lr(e,s.x,r.x,o.x,a.x),lr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Tm extends Wn{constructor(e=new B,t=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new B){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(lr(e,s.x,r.x,o.x,a.x),lr(e,s.y,r.y,o.y,a.y),lr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qd extends Wn{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Am extends Wn{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yd extends Wn{constructor(e=new Pe,t=new Pe,n=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Pe){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(e,s.x,r.x,o.x),cr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wm extends Wn{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(e,s.x,r.x,o.x),cr(e,s.y,r.y,o.y),cr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kd extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Zl(a,c.x,l.x,u.x,d.x),Zl(a,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Pe().fromArray(s))}return this}}var Jl=Object.freeze({__proto__:null,ArcCurve:gm,CatmullRomCurve3:vm,CubicBezierCurve:$d,CubicBezierCurve3:Tm,EllipseCurve:cl,LineCurve:qd,LineCurve3:Am,QuadraticBezierCurve:Yd,QuadraticBezierCurve3:wm,SplineCurve:Kd});class Cm extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Jl[s.type]().fromJSON(s))}return this}}class Rc extends Cm{constructor(e){super(),this.type="Path",this.currentPoint=new Pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new qd(this.currentPoint.clone(),new Pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Yd(this.currentPoint.clone(),new Pe(e,t),new Pe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new $d(this.currentPoint.clone(),new Pe(e,t),new Pe(n,s),new Pe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Kd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new cl(e,t,n,s,r,o,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class jd extends Rc{constructor(e){super(e),this.uuid=Os(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Rc().fromJSON(s))}return this}}function Rm(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Zd(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Um(i,e,r,t)),i.length>80*t){a=i[0],c=i[1];let u=a,d=c;for(let f=t;f<s;f+=t){const h=i[f],g=i[f+1];h<a&&(a=h),g<c&&(c=g),h>u&&(u=h),g>d&&(d=g)}l=Math.max(u-a,d-c),l=l!==0?32767/l:0}return Mr(r,o,t,a,c,l,0),o}function Zd(i,e,t,n,s){let r;if(s===Xm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Ql(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Ql(o/n|0,i[o],i[o+1],r);return r&&Ls(r,r.next)&&(br(r),r=r.next),r}function Ki(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ls(t,t.next)||gt(t.prev,t,t.next)===0)){if(br(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Mr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&km(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?Lm(i,n,s,r):Pm(i)){e.push(c.i,i.i,l.i),br(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Im(Ki(i),e),Mr(i,e,t,n,s,r,2)):o===2&&Dm(i,e,t,n,s,r):Mr(Ki(i),e,t,n,s,r,1);break}}}function Pm(i){const e=i.prev,t=i,n=i.next;if(gt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=Math.min(s,r,o),d=Math.min(a,c,l),f=Math.max(s,r,o),h=Math.max(a,c,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=d&&g.y<=h&&Qs(s,a,r,c,o,l,g.x,g.y)&&gt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Lm(i,e,t,n){const s=i.prev,r=i,o=i.next;if(gt(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,d=r.y,f=o.y,h=Math.min(a,c,l),g=Math.min(u,d,f),v=Math.max(a,c,l),p=Math.max(u,d,f),m=Pc(h,g,e,t,n),x=Pc(v,p,e,t,n);let y=i.prevZ,M=i.nextZ;for(;y&&y.z>=m&&M&&M.z<=x;){if(y.x>=h&&y.x<=v&&y.y>=g&&y.y<=p&&y!==s&&y!==o&&Qs(a,u,c,d,l,f,y.x,y.y)&&gt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=h&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&Qs(a,u,c,d,l,f,M.x,M.y)&&gt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=h&&y.x<=v&&y.y>=g&&y.y<=p&&y!==s&&y!==o&&Qs(a,u,c,d,l,f,y.x,y.y)&&gt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=h&&M.x<=v&&M.y>=g&&M.y<=p&&M!==s&&M!==o&&Qs(a,u,c,d,l,f,M.x,M.y)&&gt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Im(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Ls(n,s)&&Qd(n,t,t.next,s)&&Er(n,s)&&Er(s,n)&&(e.push(n.i,t.i,s.i),br(t),br(t.next),t=i=s),t=t.next}while(t!==i);return Ki(t)}function Dm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Hm(o,a)){let c=ef(o,a);o=Ki(o,o.next),c=Ki(c,c.next),Mr(o,e,t,n,s,r,0),Mr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Um(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Zd(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Vm(l))}s.sort(Nm);for(let r=0;r<s.length;r++)t=Fm(s[r],t);return t}function Nm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Fm(i,e){const t=Om(i,e);if(!t)return e;const n=ef(t,i);return Ki(n,n.next),Ki(t,t.next)}function Om(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(Ls(i,t))return t;do{if(Ls(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Jd(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const d=Math.abs(s-t.y)/(n-t.x);Er(t,i)&&(d<u||d===u&&(t.x>o.x||t.x===o.x&&Bm(o,t)))&&(o=t,u=d)}t=t.next}while(t!==a);return o}function Bm(i,e){return gt(i.prev,i,e.prev)<0&&gt(e.next,i,i.next)<0}function km(i,e,t,n){let s=i;do s.z===0&&(s.z=Pc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,zm(s)}function zm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Pc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Vm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Jd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Qs(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Jd(i,e,t,n,s,r,o,a)}function Hm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Gm(i,e)&&(Er(i,e)&&Er(e,i)&&Wm(i,e)&&(gt(i.prev,i,e.prev)||gt(i,e.prev,e))||Ls(i,e)&&gt(i.prev,i,i.next)>0&&gt(e.prev,e,e.next)>0)}function gt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ls(i,e){return i.x===e.x&&i.y===e.y}function Qd(i,e,t,n){const s=so(gt(i,e,t)),r=so(gt(i,e,n)),o=so(gt(t,n,i)),a=so(gt(t,n,e));return!!(s!==r&&o!==a||s===0&&io(i,t,e)||r===0&&io(i,n,e)||o===0&&io(t,i,n)||a===0&&io(t,e,n))}function io(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function so(i){return i>0?1:i<0?-1:0}function Gm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Er(i,e){return gt(i.prev,i,i.next)<0?gt(i,e,i.next)>=0&&gt(i,i.prev,e)>=0:gt(i,e,i.prev)<0||gt(i,i.next,e)<0}function Wm(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ef(i,e){const t=Lc(i.i,i.x,i.y),n=Lc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ql(i,e,t,n){const s=Lc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function br(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Xm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class $m{static triangulate(e,t,n=2){return Rm(e,t,n)}}class ur{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return ur.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];eu(e),tu(n,e);let o=e.length;t.forEach(eu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,tu(n,t[c]);const a=$m.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function eu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function tu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Is extends Sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],v=[],p=[];for(let m=0;m<u;m++){const x=m*f-o;for(let y=0;y<l;y++){const M=y*d-r;g.push(M,-x,0),v.push(0,0,1),p.push(y/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const y=x+l*m,M=x+l*(m+1),C=x+1+l*(m+1),T=x+1+l*m;h.push(y,M,T),h.push(M,C,T)}this.setIndex(h),this.setAttribute("position",new vn(g,3)),this.setAttribute("normal",new vn(v,3)),this.setAttribute("uv",new vn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.widthSegments,e.heightSegments)}}class ul extends Sn{constructor(e=new jd([new Pe(0,.5),new Pe(-.5,-.5),new Pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new vn(s,3)),this.setAttribute("normal",new vn(r,3)),this.setAttribute("uv",new vn(o,2));function l(u){const d=s.length/3,f=u.extractPoints(t);let h=f.shape;const g=f.holes;ur.isClockWise(h)===!1&&(h=h.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];ur.isClockWise(x)===!0&&(g[p]=x.reverse())}const v=ur.triangulateShape(h,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];h=h.concat(x)}for(let p=0,m=h.length;p<m;p++){const x=h[p];s.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let p=0,m=v.length;p<m;p++){const x=v[p],y=x[0]+d,M=x[1]+d,C=x[2]+d;n.push(y,M,C),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return qm(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new ul(n,e.curveSegments)}}function qm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function Ds(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function jt(i){const e={};for(let t=0;t<i.length;t++){const n=Ds(i[t]);for(const s in n)e[s]=n[s]}return e}function Ym(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function tf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const Km={clone:Ds,merge:jt};var jm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends Ir{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jm,this.fragmentShader=Zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=Ym(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Jm extends Gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Qm extends Ir{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ip,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eg extends Ir{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class tg extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ro=new B,oo=new Bs,Dn=new B;class nf extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ro,oo,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ro,oo,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ro,oo,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ro,oo,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new B,nu=new Pe,iu=new Pe;class pn extends nf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cc*2*Math.atan(Math.tan(Jo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mi.x,mi.y).multiplyScalar(-e/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-e/mi.z)}getViewSize(e,t){return this.getViewBounds(e,nu,iu),t.subVectors(iu,nu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Jo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sf extends nf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ng extends tg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ds=-90,fs=1;class ig extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(ds,fs,e,t);s.layers=this.layers,this.add(s);const r=new pn(ds,fs,e,t);r.layers=this.layers,this.add(r);const o=new pn(ds,fs,e,t);o.layers=this.layers,this.add(o);const a=new pn(ds,fs,e,t);a.layers=this.layers,this.add(a);const c=new pn(ds,fs,e,t);c.layers=this.layers,this.add(c);const l=new pn(ds,fs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Do)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sg extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const su=new Et;class rg{constructor(e,t,n=0,s=1/0){this.ray=new Hd(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return su.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(su),this}intersectObject(e,t=!0,n=[]){return Ic(e,this,n,t),n.sort(ru),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ic(e[s],this,n,t);return n.sort(ru),n}}function ru(i,e){return i.distance-e.distance}function Ic(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ic(r[o],e,t,!0)}}function ou(i,e,t,n){const s=og(n);switch(t){case Ud:return i*e;case Fd:return i*e/s.components*s.byteLength;case Qc:return i*e/s.components*s.byteLength;case Cs:return i*e*2/s.components*s.byteLength;case el:return i*e*2/s.components*s.byteLength;case Nd:return i*e*3/s.components*s.byteLength;case Pn:return i*e*4/s.components*s.byteLength;case tl:return i*e*4/s.components*s.byteLength;case _o:case So:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yo:case Mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Za:case Qa:return Math.max(i,16)*Math.max(e,8)/4;case ja:case Ja:return Math.max(i,8)*Math.max(e,8)/2;case ec:case tc:case ic:case sc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nc:case rc:case oc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ac:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case lc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case uc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case dc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case fc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case hc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case pc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case mc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case gc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case _c:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case yc:case Mc:case Ec:return Math.ceil(i/4)*Math.ceil(e/4)*16;case bc:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ac:case wc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function og(i){switch(i){case mn:case Pd:return{byteLength:1,components:1};case _r:case Ld:case si:return{byteLength:2,components:1};case Zc:case Jc:return{byteLength:2,components:4};case Hn:case jc:case Bn:return{byteLength:4,components:1};case Id:case Dd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kc}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ag(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],v=d[h];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,d[f]=v)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const v=d[h];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var cg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lg=`#ifdef USE_ALPHAHASH
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
#endif`,ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pg=`#ifdef USE_AOMAP
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
#endif`,mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gg=`#ifdef USE_BATCHING
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
#endif`,vg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yg=`#ifdef USE_IRIDESCENCE
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
#endif`,Mg=`#ifdef USE_BUMPMAP
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
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Lg=`#define PI 3.141592653589793
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
} // validated`,Ig=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dg=`vec3 transformedNormal = objectNormal;
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
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ng=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bg="gl_FragColor = linearToOutputTexel( gl_FragColor );",kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
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
#endif`,Gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$g=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kg=`#ifdef USE_GRADIENTMAP
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
}`,jg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qg=`uniform bool receiveShadow;
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
#endif`,e0=`#ifdef USE_ENVMAP
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
#endif`,t0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r0=`PhysicalMaterial material;
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
#endif`,o0=`uniform sampler2D dfgLUT;
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
}`,a0=`
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
#endif`,c0=`#if defined( RE_IndirectDiffuse )
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
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,d0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,v0=`#if defined( USE_POINTS_UV )
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
#endif`,x0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,S0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,y0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E0=`#ifdef USE_MORPHTARGETS
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
#endif`,b0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,A0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,P0=`#ifdef USE_NORMALMAP
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
#endif`,L0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,I0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,U0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,F0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,O0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,B0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$0=`float getShadowMask() {
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
}`,q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Y0=`#ifdef USE_SKINNING
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
#endif`,K0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j0=`#ifdef USE_SKINNING
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
#endif`,Z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ev=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tv=`#ifdef USE_TRANSMISSION
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
#endif`,nv=`#ifdef USE_TRANSMISSION
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
#endif`,iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ov=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const av=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cv=`uniform sampler2D t2D;
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
}`,lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hv=`#include <common>
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
}`,pv=`#if DEPTH_PACKING == 3200
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
}`,mv=`#define DISTANCE
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
}`,gv=`#define DISTANCE
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
}`,vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_v=`uniform float scale;
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
}`,Sv=`uniform vec3 diffuse;
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
}`,yv=`#include <common>
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
}`,Mv=`uniform vec3 diffuse;
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
}`,Ev=`#define LAMBERT
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
}`,bv=`#define LAMBERT
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
}`,Tv=`#define MATCAP
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
}`,Av=`#define MATCAP
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
}`,wv=`#define NORMAL
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
}`,Cv=`#define NORMAL
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
}`,Rv=`#define PHONG
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
}`,Pv=`#define PHONG
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
}`,Lv=`#define STANDARD
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
}`,Iv=`#define STANDARD
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
}`,Dv=`#define TOON
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
}`,Uv=`#define TOON
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
}`,Nv=`uniform float size;
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
}`,Fv=`uniform vec3 diffuse;
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
}`,Ov=`#include <common>
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
}`,Bv=`uniform vec3 color;
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
}`,kv=`uniform float rotation;
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
}`,zv=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:cg,alphahash_pars_fragment:lg,alphamap_fragment:ug,alphamap_pars_fragment:dg,alphatest_fragment:fg,alphatest_pars_fragment:hg,aomap_fragment:pg,aomap_pars_fragment:mg,batching_pars_vertex:gg,batching_vertex:vg,begin_vertex:xg,beginnormal_vertex:_g,bsdfs:Sg,iridescence_fragment:yg,bumpmap_pars_fragment:Mg,clipping_planes_fragment:Eg,clipping_planes_pars_fragment:bg,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:Ag,color_fragment:wg,color_pars_fragment:Cg,color_pars_vertex:Rg,color_vertex:Pg,common:Lg,cube_uv_reflection_fragment:Ig,defaultnormal_vertex:Dg,displacementmap_pars_vertex:Ug,displacementmap_vertex:Ng,emissivemap_fragment:Fg,emissivemap_pars_fragment:Og,colorspace_fragment:Bg,colorspace_pars_fragment:kg,envmap_fragment:zg,envmap_common_pars_fragment:Vg,envmap_pars_fragment:Hg,envmap_pars_vertex:Gg,envmap_physical_pars_fragment:e0,envmap_vertex:Wg,fog_vertex:Xg,fog_pars_vertex:$g,fog_fragment:qg,fog_pars_fragment:Yg,gradientmap_pars_fragment:Kg,lightmap_pars_fragment:jg,lights_lambert_fragment:Zg,lights_lambert_pars_fragment:Jg,lights_pars_begin:Qg,lights_toon_fragment:t0,lights_toon_pars_fragment:n0,lights_phong_fragment:i0,lights_phong_pars_fragment:s0,lights_physical_fragment:r0,lights_physical_pars_fragment:o0,lights_fragment_begin:a0,lights_fragment_maps:c0,lights_fragment_end:l0,logdepthbuf_fragment:u0,logdepthbuf_pars_fragment:d0,logdepthbuf_pars_vertex:f0,logdepthbuf_vertex:h0,map_fragment:p0,map_pars_fragment:m0,map_particle_fragment:g0,map_particle_pars_fragment:v0,metalnessmap_fragment:x0,metalnessmap_pars_fragment:_0,morphinstance_vertex:S0,morphcolor_vertex:y0,morphnormal_vertex:M0,morphtarget_pars_vertex:E0,morphtarget_vertex:b0,normal_fragment_begin:T0,normal_fragment_maps:A0,normal_pars_fragment:w0,normal_pars_vertex:C0,normal_vertex:R0,normalmap_pars_fragment:P0,clearcoat_normal_fragment_begin:L0,clearcoat_normal_fragment_maps:I0,clearcoat_pars_fragment:D0,iridescence_pars_fragment:U0,opaque_fragment:N0,packing:F0,premultiplied_alpha_fragment:O0,project_vertex:B0,dithering_fragment:k0,dithering_pars_fragment:z0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:H0,shadowmap_pars_fragment:G0,shadowmap_pars_vertex:W0,shadowmap_vertex:X0,shadowmask_pars_fragment:$0,skinbase_vertex:q0,skinning_pars_vertex:Y0,skinning_vertex:K0,skinnormal_vertex:j0,specularmap_fragment:Z0,specularmap_pars_fragment:J0,tonemapping_fragment:Q0,tonemapping_pars_fragment:ev,transmission_fragment:tv,transmission_pars_fragment:nv,uv_pars_fragment:iv,uv_pars_vertex:sv,uv_vertex:rv,worldpos_vertex:ov,background_vert:av,background_frag:cv,backgroundCube_vert:lv,backgroundCube_frag:uv,cube_vert:dv,cube_frag:fv,depth_vert:hv,depth_frag:pv,distance_vert:mv,distance_frag:gv,equirect_vert:vv,equirect_frag:xv,linedashed_vert:_v,linedashed_frag:Sv,meshbasic_vert:yv,meshbasic_frag:Mv,meshlambert_vert:Ev,meshlambert_frag:bv,meshmatcap_vert:Tv,meshmatcap_frag:Av,meshnormal_vert:wv,meshnormal_frag:Cv,meshphong_vert:Rv,meshphong_frag:Pv,meshphysical_vert:Lv,meshphysical_frag:Iv,meshtoon_vert:Dv,meshtoon_frag:Uv,points_vert:Nv,points_frag:Fv,shadow_vert:Ov,shadow_frag:Bv,sprite_vert:kv,sprite_frag:zv},he={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Fn={basic:{uniforms:jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:jt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:jt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:jt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:jt([he.points,he.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:jt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:jt([he.common,he.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:jt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:jt([he.sprite,he.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:jt([he.common,he.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:jt([he.lights,he.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Fn.physical={uniforms:jt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const ao={r:0,b:0,g:0},Pi=new oi,Vv=new Et;function Hv(i,e,t,n,s,r){const o=new Ke(0);let a=s===!0?0:1,c,l,u=null,d=0,f=null;function h(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const M=x.backgroundBlurriness>0;y=e.get(y,M)}return y}function g(x){let y=!1;const M=h(x);M===null?p(o,a):M&&M.isColor&&(p(M,1),y=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,y){const M=h(y);M&&(M.isCubeTexture||M.mapping===Bo)?(l===void 0&&(l=new Kt(new Dr(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Ds(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),Pi.copy(y.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vv.makeRotationFromEuler(Pi)),l.material.toneMapped=Je.getTransfer(M.colorSpace)!==st,(u!==M||d!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Kt(new Is(2,2),new Gn({name:"BackgroundMaterial",uniforms:Ds(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Je.getTransfer(M.colorSpace)!==st,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(ao,tf(i)),t.buffers.color.setClear(ao.r,ao.g,ao.b,y,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),a=y,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,p(o,a)},render:g,addToRenderList:v,dispose:m}}function Gv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(R,F,k,O,V){let H=!1;const U=d(R,O,k,F);r!==U&&(r=U,l(r.object)),H=h(R,O,k,V),H&&g(R,O,k,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,M(R,F,k,O),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,F,k,O){const V=O.wireframe===!0;let H=n[F.id];H===void 0&&(H={},n[F.id]=H);const U=R.isInstancedMesh===!0?R.id:0;let Q=H[U];Q===void 0&&(Q={},H[U]=Q);let ee=Q[k.id];ee===void 0&&(ee={},Q[k.id]=ee);let de=ee[V];return de===void 0&&(de=f(c()),ee[V]=de),de}function f(R){const F=[],k=[],O=[];for(let V=0;V<t;V++)F[V]=0,k[V]=0,O[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:k,attributeDivisors:O,object:R,attributes:{},index:null}}function h(R,F,k,O){const V=r.attributes,H=F.attributes;let U=0;const Q=k.getAttributes();for(const ee in Q)if(Q[ee].location>=0){const fe=V[ee];let xe=H[ee];if(xe===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(xe=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(xe=R.instanceColor)),fe===void 0||fe.attribute!==xe||xe&&fe.data!==xe.data)return!0;U++}return r.attributesNum!==U||r.index!==O}function g(R,F,k,O){const V={},H=F.attributes;let U=0;const Q=k.getAttributes();for(const ee in Q)if(Q[ee].location>=0){let fe=H[ee];fe===void 0&&(ee==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),ee==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor));const xe={};xe.attribute=fe,fe&&fe.data&&(xe.data=fe.data),V[ee]=xe,U++}r.attributes=V,r.attributesNum=U,r.index=O}function v(){const R=r.newAttributes;for(let F=0,k=R.length;F<k;F++)R[F]=0}function p(R){m(R,0)}function m(R,F){const k=r.newAttributes,O=r.enabledAttributes,V=r.attributeDivisors;k[R]=1,O[R]===0&&(i.enableVertexAttribArray(R),O[R]=1),V[R]!==F&&(i.vertexAttribDivisor(R,F),V[R]=F)}function x(){const R=r.newAttributes,F=r.enabledAttributes;for(let k=0,O=F.length;k<O;k++)F[k]!==R[k]&&(i.disableVertexAttribArray(k),F[k]=0)}function y(R,F,k,O,V,H,U){U===!0?i.vertexAttribIPointer(R,F,k,V,H):i.vertexAttribPointer(R,F,k,O,V,H)}function M(R,F,k,O){v();const V=O.attributes,H=k.getAttributes(),U=F.defaultAttributeValues;for(const Q in H){const ee=H[Q];if(ee.location>=0){let de=V[Q];if(de===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(de=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(de=R.instanceColor)),de!==void 0){const fe=de.normalized,xe=de.itemSize,Oe=e.get(de);if(Oe===void 0)continue;const nt=Oe.buffer,ot=Oe.type,Y=Oe.bytesPerElement,le=ot===i.INT||ot===i.UNSIGNED_INT||de.gpuType===jc;if(de.isInterleavedBufferAttribute){const ue=de.data,Be=ue.stride,Ie=de.offset;if(ue.isInstancedInterleavedBuffer){for(let Ne=0;Ne<ee.locationSize;Ne++)m(ee.location+Ne,ue.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Ne=0;Ne<ee.locationSize;Ne++)p(ee.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Ne=0;Ne<ee.locationSize;Ne++)y(ee.location+Ne,xe/ee.locationSize,ot,fe,Be*Y,(Ie+xe/ee.locationSize*Ne)*Y,le)}else{if(de.isInstancedBufferAttribute){for(let ue=0;ue<ee.locationSize;ue++)m(ee.location+ue,de.meshPerAttribute);R.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ue=0;ue<ee.locationSize;ue++)p(ee.location+ue);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let ue=0;ue<ee.locationSize;ue++)y(ee.location+ue,xe/ee.locationSize,ot,fe,xe*Y,xe/ee.locationSize*ue*Y,le)}}else if(U!==void 0){const fe=U[Q];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(ee.location,fe);break;case 3:i.vertexAttrib3fv(ee.location,fe);break;case 4:i.vertexAttrib4fv(ee.location,fe);break;default:i.vertexAttrib1fv(ee.location,fe)}}}}x()}function C(){b();for(const R in n){const F=n[R];for(const k in F){const O=F[k];for(const V in O){const H=O[V];for(const U in H)u(H[U].object),delete H[U];delete O[V]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;const F=n[R.id];for(const k in F){const O=F[k];for(const V in O){const H=O[V];for(const U in H)u(H[U].object),delete H[U];delete O[V]}}delete n[R.id]}function A(R){for(const F in n){const k=n[F];for(const O in k){const V=k[O];if(V[R.id]===void 0)continue;const H=V[R.id];for(const U in H)u(H[U].object),delete H[U];delete V[R.id]}}}function S(R){for(const F in n){const k=n[F],O=R.isInstancedMesh===!0?R.id:0,V=k[O];if(V!==void 0){for(const H in V){const U=V[H];for(const Q in U)u(U[Q].object),delete U[Q];delete V[H]}delete k[O],Object.keys(k).length===0&&delete n[F]}}}function b(){z(),o=!0,r!==s&&(r=s,l(r.object))}function z(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:z,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Wv(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,n,1)}function c(l,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v]*f[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Xv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Pn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const S=A===si&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==mn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Bn&&!S)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Fe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:M,maxSamples:C,samples:T}}function $v(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Ui,a=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const x=r?0:n,y=x*4;let M=m.clippingState||null;c.value=M,M=u(g,f,y,h);for(let C=0;C!==y;++C)M[C]=t[C];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=h+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,M=h;y!==v;++y,M+=4)o.copy(d[y]).applyMatrix4(x,a),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}const yi=4,au=[.125,.215,.35,.446,.526,.582],Bi=20,qv=256,Xs=new sf,cu=new Ke;let Ta=null,Aa=0,wa=0,Ca=!1;const Yv=new B;class lu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=Yv}=r;Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=du(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ta,Aa,wa),this._renderer.xr.enabled=Ca,e.scissorTest=!1,hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:si,format:Pn,colorSpace:Rs,depthBuffer:!1},s=uu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uu(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Kv(r)),this._blurMaterial=Zv(r,e,t),this._ggxMaterial=jv(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new Sn,e);this._renderer.compile(t,Xs)}_sceneToCubeUV(e,t,n,s,r){const c=new pn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(cu),d.toneMapping=zn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new Dr,new Ps({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let m=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,m=!0):(p.color.copy(cu),m=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[y],r.y,r.z)):M===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[y]));const C=this._cubeSize;hs(s,M*C,y>2?C:0,C,C),d.setRenderTarget(s),m&&d.render(v,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Yi||e.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=du());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;hs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Xs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:g}=this,v=this._sizeLods[n],p=3*v*(n>g-yi?n-g+yi:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=g-t,hs(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Xs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,hs(e,p,m,3*v,2*v),s.setRenderTarget(e),s.render(a,Xs)}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=l;const f=l.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Bi-1),v=r/g,p=isFinite(r)?1+Math.floor(u*v):Bi;p>Bi&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Bi}`);const m=[];let x=0;for(let A=0;A<Bi;++A){const S=A/v,b=Math.exp(-S*S/2);m.push(b),A===0?x+=b:A<p&&(x+=2*b)}for(let A=0;A<m.length;A++)m[A]=m[A]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const M=this._sizeLods[s],C=3*M*(s>y-yi?s-y+yi:0),T=4*(this._cubeSize-M);hs(t,C,T,3*M,2*M),c.setRenderTarget(t),c.render(d,Xs)}}function Kv(i){const e=[],t=[],n=[];let s=i;const r=i-yi+1+au.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-yi?c=au[o-i+yi-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,v=3,p=2,m=1,x=new Float32Array(v*g*h),y=new Float32Array(p*g*h),M=new Float32Array(m*g*h);for(let T=0;T<h;T++){const A=T%3*2/3-1,S=T>2?0:-1,b=[A,S,0,A+2/3,S,0,A+2/3,S+1,0,A,S,0,A+2/3,S+1,0,A,S+1,0];x.set(b,v*g*T),y.set(f,p*g*T);const z=[T,T,T,T,T,T];M.set(z,m*g*T)}const C=new Sn;C.setAttribute("position",new nn(x,v)),C.setAttribute("uv",new nn(y,p)),C.setAttribute("faceIndex",new nn(M,m)),n.push(new Kt(C,null)),s>yi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function uu(i,e,t){const n=new Vn(i,e,t);return n.texture.mapping=Bo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function jv(i,e,t){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ko(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Zv(i,e,t){const n=new Float32Array(Bi),s=new B(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ko(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function du(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ko(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function fu(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function ko(){return`

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
	`}class of extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Wd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dr(5,5,5),r=new Gn({name:"CubemapFromEquirect",uniforms:Ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:ni});r.uniforms.tEquirect.value=t;const o=new Kt(s,r),a=t.minFilter;return t.minFilter===Vi&&(t.minFilter=qt),new ig(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}function Jv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,h=!1){return f==null?null:h?o(f):r(f)}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===Ko||h===jo)if(e.has(f)){const g=e.get(f).texture;return a(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new of(g.height);return v.fromEquirectangularTexture(i,f),e.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const h=f.mapping,g=h===Ko||h===jo,v=h===Yi||h===ws;if(g||v){let p=t.get(f);const m=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new lu(i)),p=g?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{const x=f.image;return g&&x&&x.height>0||v&&x&&c(x)?(n===null&&(n=new lu(i)),p=g?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",u),p.texture):null}}}return f}function a(f,h){return h===Ko?f.mapping=Yi:h===jo&&(f.mapping=ws),f}function c(f){let h=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&h++;return h===g}function l(f){const h=f.target;h.removeEventListener("dispose",l);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Qv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&No("WebGLRenderer: "+n+" extension not supported."),s}}}function ex(i,e,t,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const h in f)e.update(f[h],i.ARRAY_BUFFER)}function l(d){const f=[],h=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(h!==null){const x=h.array;v=h.version;for(let y=0,M=x.length;y<M;y+=3){const C=x[y+0],T=x[y+1],A=x[y+2];f.push(C,T,T,A,A,C)}}else{const x=g.array;v=g.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const C=y+0,T=y+1,A=y+2;f.push(C,T,T,A,A,C)}}const p=new(g.count>=65535?Vd:zd)(f,1);p.version=v;const m=r.get(d);m&&e.remove(m),r.set(d,p)}function u(d){const f=r.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function tx(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*o),t.update(h,n,1)}function l(f,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,f*o,g),t.update(h,n,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=h[m];t.update(p,n,1)}function d(f,h,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,h[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,h,0,r,f,0,v,0,g);let m=0;for(let x=0;x<g;x++)m+=h[x]*v[x];t.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function nx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ze("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ix(i,e,t){const n=new WeakMap,s=new Tt;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let z=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",z)};var h=z;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),p===!0&&(M=3);let C=a.attributes.position.count*M,T=1;C>e.maxTextureSize&&(T=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const A=new Float32Array(C*T*4*d),S=new Bd(A,C,T,d);S.type=Bn,S.needsUpdate=!0;const b=M*4;for(let R=0;R<d;R++){const F=m[R],k=x[R],O=y[R],V=C*T*4*R;for(let H=0;H<F.count;H++){const U=H*b;g===!0&&(s.fromBufferAttribute(F,H),A[V+U+0]=s.x,A[V+U+1]=s.y,A[V+U+2]=s.z,A[V+U+3]=0),v===!0&&(s.fromBufferAttribute(k,H),A[V+U+4]=s.x,A[V+U+5]=s.y,A[V+U+6]=s.z,A[V+U+7]=0),p===!0&&(s.fromBufferAttribute(O,H),A[V+U+8]=s.x,A[V+U+9]=s.y,A[V+U+10]=s.z,A[V+U+11]=O.itemSize===4?s.w:1)}}f={count:d,texture:S,size:new Pe(C,T)},n.set(a,f),a.addEventListener("dispose",z)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function sx(i,e,t,n,s){let r=new WeakMap;function o(l){const u=s.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const rx={[Md]:"LINEAR_TONE_MAPPING",[Ed]:"REINHARD_TONE_MAPPING",[bd]:"CINEON_TONE_MAPPING",[Td]:"ACES_FILMIC_TONE_MAPPING",[wd]:"AGX_TONE_MAPPING",[Cd]:"NEUTRAL_TONE_MAPPING",[Ad]:"CUSTOM_TONE_MAPPING"};function ox(i,e,t,n,s){const r=new Vn(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),o=new Vn(e,t,{type:si,depthBuffer:!1,stencilBuffer:!1}),a=new Sn;a.setAttribute("position",new vn([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new vn([0,2,0,0,2,0],2));const c=new Jm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Kt(a,c),u=new sf(-1,1,1,-1,0,1);let d=null,f=null,h=!1,g,v=null,p=[],m=!1;this.setSize=function(x,y){r.setSize(x,y),o.setSize(x,y);for(let M=0;M<p.length;M++){const C=p[M];C.setSize&&C.setSize(x,y)}},this.setEffects=function(x){p=x,m=p.length>0&&p[0].isRenderPass===!0;const y=r.width,M=r.height;for(let C=0;C<p.length;C++){const T=p[C];T.setSize&&T.setSize(y,M)}},this.begin=function(x,y){if(h||x.toneMapping===zn&&p.length===0)return!1;if(v=y,y!==null){const M=y.width,C=y.height;(r.width!==M||r.height!==C)&&this.setSize(M,C)}return m===!1&&x.setRenderTarget(r),g=x.toneMapping,x.toneMapping=zn,!0},this.hasRenderPass=function(){return m},this.end=function(x,y){x.toneMapping=g,h=!0;let M=r,C=o;for(let T=0;T<p.length;T++){const A=p[T];if(A.enabled!==!1&&(A.render(x,C,M,y),A.needsSwap!==!1)){const S=M;M=C,C=S}}if(d!==x.outputColorSpace||f!==x.toneMapping){d=x.outputColorSpace,f=x.toneMapping,c.defines={},Je.getTransfer(d)===st&&(c.defines.SRGB_TRANSFER="");const T=rx[f];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(v),x.render(l,u),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const af=new Gt,Dc=new yr(1,1),cf=new Bd,lf=new Zp,uf=new Wd,hu=[],pu=[],mu=new Float32Array(16),gu=new Float32Array(9),vu=new Float32Array(4);function ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=hu[s];if(r===void 0&&(r=new Float32Array(s),hu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function zo(i,e){let t=pu[e];t===void 0&&(t=new Int32Array(e),pu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ax(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function cx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function lx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function dx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;vu.set(n),i.uniformMatrix2fv(this.addr,!1,vu),Ut(t,n)}}function fx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;gu.set(n),i.uniformMatrix3fv(this.addr,!1,gu),Ut(t,n)}}function hx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;mu.set(n),i.uniformMatrix4fv(this.addr,!1,mu),Ut(t,n)}}function px(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function vx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function xx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function _x(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function Mx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dc.compareFunction=t.isReversedDepthBuffer()?il:nl,r=Dc):r=af,t.setTexture2D(e||r,s)}function Ex(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||lf,s)}function bx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||uf,s)}function Tx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||cf,s)}function Ax(i){switch(i){case 5126:return ax;case 35664:return cx;case 35665:return lx;case 35666:return ux;case 35674:return dx;case 35675:return fx;case 35676:return hx;case 5124:case 35670:return px;case 35667:case 35671:return mx;case 35668:case 35672:return gx;case 35669:case 35673:return vx;case 5125:return xx;case 36294:return _x;case 36295:return Sx;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return Mx;case 35679:case 36299:case 36307:return Ex;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Tx}}function wx(i,e){i.uniform1fv(this.addr,e)}function Cx(i,e){const t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function Rx(i,e){const t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function Px(i,e){const t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function Lx(i,e){const t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ix(i,e){const t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Dx(i,e){const t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ux(i,e){i.uniform1iv(this.addr,e)}function Nx(i,e){i.uniform2iv(this.addr,e)}function Fx(i,e){i.uniform3iv(this.addr,e)}function Ox(i,e){i.uniform4iv(this.addr,e)}function Bx(i,e){i.uniform1uiv(this.addr,e)}function kx(i,e){i.uniform2uiv(this.addr,e)}function zx(i,e){i.uniform3uiv(this.addr,e)}function Vx(i,e){i.uniform4uiv(this.addr,e)}function Hx(i,e,t){const n=this.cache,s=e.length,r=zo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Dc:o=af;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Gx(i,e,t){const n=this.cache,s=e.length,r=zo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||lf,r[o])}function Wx(i,e,t){const n=this.cache,s=e.length,r=zo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||uf,r[o])}function Xx(i,e,t){const n=this.cache,s=e.length,r=zo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||cf,r[o])}function $x(i){switch(i){case 5126:return wx;case 35664:return Cx;case 35665:return Rx;case 35666:return Px;case 35674:return Lx;case 35675:return Ix;case 35676:return Dx;case 5124:case 35670:return Ux;case 35667:case 35671:return Nx;case 35668:case 35672:return Fx;case 35669:case 35673:return Ox;case 5125:return Bx;case 36294:return kx;case 36295:return zx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Hx;case 35679:case 36299:case 36307:return Gx;case 35680:case 36300:case 36308:case 36293:return Wx;case 36289:case 36303:case 36311:case 36292:return Xx}}class qx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ax(t.type)}}class Yx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$x(t.type)}}class Kx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function xu(i,e){i.seq.push(e),i.map[e.id]=e}function jx(i,e,t){const n=i.name,s=n.length;for(Ra.lastIndex=0;;){const r=Ra.exec(n),o=Ra.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){xu(t,l===void 0?new qx(a,i,e):new Yx(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Kx(a),xu(t,d)),t=d}}}class Eo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);jx(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function _u(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Zx=37297;let Jx=0;function Qx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Su=new He;function e_(i){Je._getMatrix(Su,Je.workingColorSpace,i);const e=`mat3( ${Su.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case Io:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function yu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Qx(i.getShaderSource(e),a)}else return r}function t_(i,e){const t=e_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const n_={[Md]:"Linear",[Ed]:"Reinhard",[bd]:"Cineon",[Td]:"ACESFilmic",[wd]:"AgX",[Cd]:"Neutral",[Ad]:"Custom"};function i_(i,e){const t=n_[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const co=new B;function s_(){Je.getLuminanceCoefficients(co);const i=co.x.toFixed(4),e=co.y.toFixed(4),t=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function o_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function a_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function er(i){return i!==""}function Mu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Eu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const c_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(i){return i.replace(c_,u_)}const l_=new Map;function u_(i,e){let t=Ge[e];if(t===void 0){const n=l_.get(e);if(n!==void 0)t=Ge[n],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Uc(t)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bu(i){return i.replace(d_,f_)}function f_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const h_={[xo]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function p_(i){return h_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const m_={[Yi]:"ENVMAP_TYPE_CUBE",[ws]:"ENVMAP_TYPE_CUBE",[Bo]:"ENVMAP_TYPE_CUBE_UV"};function g_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":m_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const v_={[ws]:"ENVMAP_MODE_REFRACTION"};function x_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":v_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const __={[yd]:"ENVMAP_BLENDING_MULTIPLY",[Rp]:"ENVMAP_BLENDING_MIX",[Pp]:"ENVMAP_BLENDING_ADD"};function S_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":__[i.combine]||"ENVMAP_BLENDING_NONE"}function y_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function M_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=p_(t),l=g_(t),u=x_(t),d=S_(t),f=y_(t),h=r_(t),g=o_(r),v=s.createProgram();let p,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(er).join(`
`),m.length>0&&(m+=`
`)):(p=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),m=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==zn?i_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,t_("linearToOutputTexel",t.outputColorSpace),s_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),o=Uc(o),o=Mu(o,t),o=Eu(o,t),a=Uc(a),a=Mu(a,t),a=Eu(a,t),o=bu(o),a=bu(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=x+p+o,M=x+m+a,C=_u(s,s.VERTEX_SHADER,y),T=_u(s,s.FRAGMENT_SHADER,M);s.attachShader(v,C),s.attachShader(v,T),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(R){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",k=s.getShaderInfoLog(C)||"",O=s.getShaderInfoLog(T)||"",V=F.trim(),H=k.trim(),U=O.trim();let Q=!0,ee=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,C,T);else{const de=yu(s,C,"vertex"),fe=yu(s,T,"fragment");Ze("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+de+`
`+fe)}else V!==""?Fe("WebGLProgram: Program Info Log:",V):(H===""||U==="")&&(ee=!1);ee&&(R.diagnostics={runnable:Q,programLog:V,vertexShader:{log:H,prefix:p},fragmentShader:{log:U,prefix:m}})}s.deleteShader(C),s.deleteShader(T),S=new Eo(s,v),b=a_(s,v)}let S;this.getUniforms=function(){return S===void 0&&A(this),S};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(v,Zx)),z},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}let E_=0;class b_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new T_(e),t.set(e,n)),n}}class T_{constructor(e){this.id=E_++,this.code=e,this.usedTimes=0}}function A_(i,e,t,n,s,r){const o=new rl,a=new b_,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function v(S,b,z,R,F){const k=R.fog,O=F.geometry,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?R.environment:null,H=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,U=e.get(S.envMap||V,H),Q=U&&U.mapping===Bo?U.image.height:null,ee=h[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&Fe("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const de=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,fe=de!==void 0?de.length:0;let xe=0;O.morphAttributes.position!==void 0&&(xe=1),O.morphAttributes.normal!==void 0&&(xe=2),O.morphAttributes.color!==void 0&&(xe=3);let Oe,nt,ot,Y;if(ee){const it=Fn[ee];Oe=it.vertexShader,nt=it.fragmentShader}else Oe=S.vertexShader,nt=S.fragmentShader,a.update(S),ot=a.getVertexShaderID(S),Y=a.getFragmentShaderID(S);const le=i.getRenderTarget(),ue=i.state.buffers.depth.getReversed(),Be=F.isInstancedMesh===!0,Ie=F.isBatchedMesh===!0,Ne=!!S.map,vt=!!S.matcap,$e=!!U,Ye=!!S.aoMap,tt=!!S.lightMap,ze=!!S.bumpMap,ft=!!S.normalMap,L=!!S.displacementMap,mt=!!S.emissiveMap,je=!!S.metalnessMap,j=!!S.roughnessMap,ie=S.anisotropy>0,w=S.clearcoat>0,_=S.dispersion>0,D=S.iridescence>0,Z=S.sheen>0,J=S.transmission>0,q=ie&&!!S.anisotropyMap,Me=w&&!!S.clearcoatMap,ae=w&&!!S.clearcoatNormalMap,we=w&&!!S.clearcoatRoughnessMap,De=D&&!!S.iridescenceMap,te=D&&!!S.iridescenceThicknessMap,se=Z&&!!S.sheenColorMap,_e=Z&&!!S.sheenRoughnessMap,me=!!S.specularMap,ce=!!S.specularColorMap,Ue=!!S.specularIntensityMap,I=J&&!!S.transmissionMap,re=J&&!!S.thicknessMap,oe=!!S.gradientMap,Se=!!S.alphaMap,ne=S.alphaTest>0,$=!!S.alphaHash,Te=!!S.extensions;let ke=zn;S.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ke=i.toneMapping);const ut={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Oe,fragmentShader:nt,defines:S.defines,customVertexShaderID:ot,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ie,batchingColor:Ie&&F._colorsTexture!==null,instancing:Be,instancingColor:Be&&F.instanceColor!==null,instancingMorph:Be&&F.morphTexture!==null,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Rs,alphaToCoverage:!!S.alphaToCoverage,map:Ne,matcap:vt,envMap:$e,envMapMode:$e&&U.mapping,envMapCubeUVHeight:Q,aoMap:Ye,lightMap:tt,bumpMap:ze,normalMap:ft,displacementMap:L,emissiveMap:mt,normalMapObjectSpace:ft&&S.normalMapType===Up,normalMapTangentSpace:ft&&S.normalMapType===Dp,metalnessMap:je,roughnessMap:j,anisotropy:ie,anisotropyMap:q,clearcoat:w,clearcoatMap:Me,clearcoatNormalMap:ae,clearcoatRoughnessMap:we,dispersion:_,iridescence:D,iridescenceMap:De,iridescenceThicknessMap:te,sheen:Z,sheenColorMap:se,sheenRoughnessMap:_e,specularMap:me,specularColorMap:ce,specularIntensityMap:Ue,transmission:J,transmissionMap:I,thicknessMap:re,gradientMap:oe,opaque:S.transparent===!1&&S.blending===Es&&S.alphaToCoverage===!1,alphaMap:Se,alphaTest:ne,alphaHash:$,combine:S.combine,mapUv:Ne&&g(S.map.channel),aoMapUv:Ye&&g(S.aoMap.channel),lightMapUv:tt&&g(S.lightMap.channel),bumpMapUv:ze&&g(S.bumpMap.channel),normalMapUv:ft&&g(S.normalMap.channel),displacementMapUv:L&&g(S.displacementMap.channel),emissiveMapUv:mt&&g(S.emissiveMap.channel),metalnessMapUv:je&&g(S.metalnessMap.channel),roughnessMapUv:j&&g(S.roughnessMap.channel),anisotropyMapUv:q&&g(S.anisotropyMap.channel),clearcoatMapUv:Me&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ae&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:se&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:_e&&g(S.sheenRoughnessMap.channel),specularMapUv:me&&g(S.specularMap.channel),specularColorMapUv:ce&&g(S.specularColorMap.channel),specularIntensityMapUv:Ue&&g(S.specularIntensityMap.channel),transmissionMapUv:I&&g(S.transmissionMap.channel),thicknessMapUv:re&&g(S.thicknessMap.channel),alphaMapUv:Se&&g(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ft||ie),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(Ne||Se),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||O.attributes.normal===void 0&&ft===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ue,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:xe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ne&&S.map.isVideoTexture===!0&&Je.getTransfer(S.map.colorSpace)===st,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&Je.getTransfer(S.emissiveMap.colorSpace)===st,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===wn,flipSided:S.side===en,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Te&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&S.extensions.multiDraw===!0||Ie)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ut.vertexUv1s=c.has(1),ut.vertexUv2s=c.has(2),ut.vertexUv3s=c.has(3),c.clear(),ut}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const z in S.defines)b.push(z),b.push(S.defines[z]);return S.isRawShaderMaterial===!1&&(m(b,S),x(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function m(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){const b=h[S.type];let z;if(b){const R=Fn[b];z=Km.clone(R.uniforms)}else z=S.uniforms;return z}function M(S,b){let z=u.get(b);return z!==void 0?++z.usedTimes:(z=new M_(i,b,S,s),l.push(z),u.set(b,z)),z}function C(S){if(--S.usedTimes===0){const b=l.indexOf(S);l[b]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function T(S){a.remove(S)}function A(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:y,acquireProgram:M,releaseProgram:C,releaseShaderCache:T,programs:l,dispose:A}}function w_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function C_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Au(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,v,p,m){let x=i[e];return x===void 0?(x={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:p,group:m},i[e]=x):(x.id=f.id,x.object=f,x.geometry=h,x.material=g,x.materialVariant=o(f),x.groupOrder=v,x.renderOrder=f.renderOrder,x.z=p,x.group=m),e++,x}function c(f,h,g,v,p,m){const x=a(f,h,g,v,p,m);g.transmission>0?n.push(x):g.transparent===!0?s.push(x):t.push(x)}function l(f,h,g,v,p,m){const x=a(f,h,g,v,p,m);g.transmission>0?n.unshift(x):g.transparent===!0?s.unshift(x):t.unshift(x)}function u(f,h){t.length>1&&t.sort(f||C_),n.length>1&&n.sort(h||Au),s.length>1&&s.sort(h||Au)}function d(){for(let f=e,h=i.length;f<h;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function R_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new wu,i.set(n,[o])):s>=r.length?(o=new wu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function P_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ke};break;case"SpotLight":t={position:new B,direction:new B,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function L_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let I_=0;function D_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function U_(i){const e=new P_,t=L_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new Et,o=new Et;function a(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let h=0,g=0,v=0,p=0,m=0,x=0,y=0,M=0,C=0,T=0,A=0;l.sort(D_);for(let b=0,z=l.length;b<z;b++){const R=l[b],F=R.color,k=R.intensity,O=R.distance;let V=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Cs?V=R.shadow.map.texture:V=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=F.r*k,d+=F.g*k,f+=F.b*k;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],k);A++}else if(R.isDirectionalLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const U=R.shadow,Q=t.get(R);Q.shadowIntensity=U.intensity,Q.shadowBias=U.bias,Q.shadowNormalBias=U.normalBias,Q.shadowRadius=U.radius,Q.shadowMapSize=U.mapSize,n.directionalShadow[h]=Q,n.directionalShadowMap[h]=V,n.directionalShadowMatrix[h]=R.shadow.matrix,x++}n.directional[h]=H,h++}else if(R.isSpotLight){const H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(F).multiplyScalar(k),H.distance=O,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[v]=H;const U=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,U.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[v]=U.matrix,R.castShadow){const Q=t.get(R);Q.shadowIntensity=U.intensity,Q.shadowBias=U.bias,Q.shadowNormalBias=U.normalBias,Q.shadowRadius=U.radius,Q.shadowMapSize=U.mapSize,n.spotShadow[v]=Q,n.spotShadowMap[v]=V,M++}v++}else if(R.isRectAreaLight){const H=e.get(R);H.color.copy(F).multiplyScalar(k),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=H,p++}else if(R.isPointLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const U=R.shadow,Q=t.get(R);Q.shadowIntensity=U.intensity,Q.shadowBias=U.bias,Q.shadowNormalBias=U.normalBias,Q.shadowRadius=U.radius,Q.shadowMapSize=U.mapSize,Q.shadowCameraNear=U.camera.near,Q.shadowCameraFar=U.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=R.shadow.matrix,y++}n.point[g]=H,g++}else if(R.isHemisphereLight){const H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(k),H.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[m]=H,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const S=n.hash;(S.directionalLength!==h||S.pointLength!==g||S.spotLength!==v||S.rectAreaLength!==p||S.hemiLength!==m||S.numDirectionalShadows!==x||S.numPointShadows!==y||S.numSpotShadows!==M||S.numSpotMaps!==C||S.numLightProbes!==A)&&(n.directional.length=h,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,S.directionalLength=h,S.pointLength=g,S.spotLength=v,S.rectAreaLength=p,S.hemiLength=m,S.numDirectionalShadows=x,S.numPointShadows=y,S.numSpotShadows=M,S.numSpotMaps=C,S.numLightProbes=A,n.version=I_++)}function c(l,u){let d=0,f=0,h=0,g=0,v=0;const p=u.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const y=l[m];if(y.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(y.isSpotLight){const M=n.spot[h];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),h++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function Cu(i){const e=new U_(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function N_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Cu(i),e.set(s,[a])):r>=o.length?(a=new Cu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const F_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O_=`uniform sampler2D shadow_pass;
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
}`,B_=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],k_=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Ru=new Et,$s=new B,Pa=new B;function z_(i,e,t){let n=new Gd;const s=new Pe,r=new Pe,o=new Tt,a=new Qm,c=new eg,l={},u=t.maxTextureSize,d={[Ei]:en,[en]:Ei,[wn]:wn},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:F_,fragmentShader:O_}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new Sn;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Kt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xo;let m=this.type;this.render=function(T,A,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===up&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xo);const b=i.getRenderTarget(),z=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),F=i.state;F.setBlending(ni),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=m!==this.type;k&&A.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(V=>V.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,V=T.length;O<V;O++){const H=T[O],U=H.shadow;if(U===void 0){Fe("WebGLShadowMap:",H,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const Q=U.getFrameExtents();s.multiply(Q),r.copy(U.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,U.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,U.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=ee,U.map===null||k===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===Zs){if(H.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new Vn(s.x,s.y,{format:Cs,type:si,minFilter:qt,magFilter:qt,generateMipmaps:!1}),U.map.texture.name=H.name+".shadowMap",U.map.depthTexture=new yr(s.x,s.y,Bn),U.map.depthTexture.name=H.name+".shadowMapDepth",U.map.depthTexture.format=ri,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=At,U.map.depthTexture.magFilter=At}else H.isPointLight?(U.map=new of(s.x),U.map.depthTexture=new mm(s.x,Hn)):(U.map=new Vn(s.x,s.y),U.map.depthTexture=new yr(s.x,s.y,Hn)),U.map.depthTexture.name=H.name+".shadowMap",U.map.depthTexture.format=ri,this.type===xo?(U.map.depthTexture.compareFunction=ee?il:nl,U.map.depthTexture.minFilter=qt,U.map.depthTexture.magFilter=qt):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=At,U.map.depthTexture.magFilter=At);U.camera.updateProjectionMatrix()}const de=U.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<de;fe++){if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(U.map),i.clear());const xe=U.getViewport(fe);o.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),F.viewport(o)}if(H.isPointLight){const xe=U.camera,Oe=U.matrix,nt=H.distance||xe.far;nt!==xe.far&&(xe.far=nt,xe.updateProjectionMatrix()),$s.setFromMatrixPosition(H.matrixWorld),xe.position.copy($s),Pa.copy(xe.position),Pa.add(B_[fe]),xe.up.copy(k_[fe]),xe.lookAt(Pa),xe.updateMatrixWorld(),Oe.makeTranslation(-$s.x,-$s.y,-$s.z),Ru.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),U._frustum.setFromProjectionMatrix(Ru,xe.coordinateSystem,xe.reversedDepth)}else U.updateMatrices(H);n=U.getFrustum(),M(A,S,U.camera,H,this.type)}U.isPointLightShadow!==!0&&this.type===Zs&&x(U,S),U.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(b,z,R)};function x(T,A){const S=e.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Vn(s.x,s.y,{format:Cs,type:si})),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,S,f,v,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,S,h,v,null)}function y(T,A,S,b){let z=null;const R=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)z=R;else if(z=S.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=z.uuid,k=A.uuid;let O=l[F];O===void 0&&(O={},l[F]=O);let V=O[k];V===void 0&&(V=z.clone(),O[k]=V,A.addEventListener("dispose",C)),z=V}if(z.visible=A.visible,z.wireframe=A.wireframe,b===Zs?z.side=A.shadowSide!==null?A.shadowSide:A.side:z.side=A.shadowSide!==null?A.shadowSide:d[A.side],z.alphaMap=A.alphaMap,z.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,z.map=A.map,z.clipShadows=A.clipShadows,z.clippingPlanes=A.clippingPlanes,z.clipIntersection=A.clipIntersection,z.displacementMap=A.displacementMap,z.displacementScale=A.displacementScale,z.displacementBias=A.displacementBias,z.wireframeLinewidth=A.wireframeLinewidth,z.linewidth=A.linewidth,S.isPointLight===!0&&z.isMeshDistanceMaterial===!0){const F=i.properties.get(z);F.light=S}return z}function M(T,A,S,b,z){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&z===Zs)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);const k=e.update(T),O=T.material;if(Array.isArray(O)){const V=k.groups;for(let H=0,U=V.length;H<U;H++){const Q=V[H],ee=O[Q.materialIndex];if(ee&&ee.visible){const de=y(T,ee,b,z);T.onBeforeShadow(i,T,A,S,k,de,Q),i.renderBufferDirect(S,null,k,de,T,Q),T.onAfterShadow(i,T,A,S,k,de,Q)}}}else if(O.visible){const V=y(T,O,b,z);T.onBeforeShadow(i,T,A,S,k,V,null),i.renderBufferDirect(S,null,k,V,T,null),T.onAfterShadow(i,T,A,S,k,V,null)}}const F=T.children;for(let k=0,O=F.length;k<O;k++)M(F[k],A,S,b,z)}function C(T){T.target.removeEventListener("dispose",C);for(const S in l){const b=l[S],z=T.target.uuid;z in b&&(b[z].dispose(),delete b[z])}}}function V_(i,e){function t(){let I=!1;const re=new Tt;let oe=null;const Se=new Tt(0,0,0,0);return{setMask:function(ne){oe!==ne&&!I&&(i.colorMask(ne,ne,ne,ne),oe=ne)},setLocked:function(ne){I=ne},setClear:function(ne,$,Te,ke,ut){ut===!0&&(ne*=ke,$*=ke,Te*=ke),re.set(ne,$,Te,ke),Se.equals(re)===!1&&(i.clearColor(ne,$,Te,ke),Se.copy(re))},reset:function(){I=!1,oe=null,Se.set(-1,0,0,0)}}}function n(){let I=!1,re=!1,oe=null,Se=null,ne=null;return{setReversed:function($){if(re!==$){const Te=e.get("EXT_clip_control");$?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),re=$;const ke=ne;ne=null,this.setClear(ke)}},getReversed:function(){return re},setTest:function($){$?le(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function($){oe!==$&&!I&&(i.depthMask($),oe=$)},setFunc:function($){if(re&&($=Wp[$]),Se!==$){switch($){case Ha:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case $a:i.depthFunc(i.GEQUAL);break;case qa:i.depthFunc(i.GREATER);break;case Ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=$}},setLocked:function($){I=$},setClear:function($){ne!==$&&(ne=$,re&&($=1-$),i.clearDepth($))},reset:function(){I=!1,oe=null,Se=null,ne=null,re=!1}}}function s(){let I=!1,re=null,oe=null,Se=null,ne=null,$=null,Te=null,ke=null,ut=null;return{setTest:function(it){I||(it?le(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(it){re!==it&&!I&&(i.stencilMask(it),re=it)},setFunc:function(it,Xn,$n){(oe!==it||Se!==Xn||ne!==$n)&&(i.stencilFunc(it,Xn,$n),oe=it,Se=Xn,ne=$n)},setOp:function(it,Xn,$n){($!==it||Te!==Xn||ke!==$n)&&(i.stencilOp(it,Xn,$n),$=it,Te=Xn,ke=$n)},setLocked:function(it){I=it},setClear:function(it){ut!==it&&(i.clearStencil(it),ut=it)},reset:function(){I=!1,re=null,oe=null,Se=null,ne=null,$=null,Te=null,ke=null,ut=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,h=[],g=null,v=!1,p=null,m=null,x=null,y=null,M=null,C=null,T=null,A=new Ke(0,0,0),S=0,b=!1,z=null,R=null,F=null,k=null,O=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,U=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=U>=1):Q.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=U>=2);let ee=null,de={};const fe=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),Oe=new Tt().fromArray(fe),nt=new Tt().fromArray(xe);function ot(I,re,oe,Se){const ne=new Uint8Array(4),$=i.createTexture();i.bindTexture(I,$),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Te=0;Te<oe;Te++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(re+Te,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return $}const Y={};Y[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(i.DEPTH_TEST),o.setFunc(As),ze(!1),ft(Cl),le(i.CULL_FACE),Ye(ni);function le(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function ue(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Be(I,re){return d[I]!==re?(i.bindFramebuffer(I,re),d[I]=re,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=re),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=re),!0):!1}function Ie(I,re){let oe=h,Se=!1;if(I){oe=f.get(re),oe===void 0&&(oe=[],f.set(re,oe));const ne=I.textures;if(oe.length!==ne.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let $=0,Te=ne.length;$<Te;$++)oe[$]=i.COLOR_ATTACHMENT0+$;oe.length=ne.length,Se=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,Se=!0);Se&&i.drawBuffers(oe)}function Ne(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const vt={[Oi]:i.FUNC_ADD,[fp]:i.FUNC_SUBTRACT,[hp]:i.FUNC_REVERSE_SUBTRACT};vt[pp]=i.MIN,vt[mp]=i.MAX;const $e={[gp]:i.ZERO,[vp]:i.ONE,[xp]:i.SRC_COLOR,[za]:i.SRC_ALPHA,[bp]:i.SRC_ALPHA_SATURATE,[Mp]:i.DST_COLOR,[Sp]:i.DST_ALPHA,[_p]:i.ONE_MINUS_SRC_COLOR,[Va]:i.ONE_MINUS_SRC_ALPHA,[Ep]:i.ONE_MINUS_DST_COLOR,[yp]:i.ONE_MINUS_DST_ALPHA,[Tp]:i.CONSTANT_COLOR,[Ap]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[Cp]:i.ONE_MINUS_CONSTANT_ALPHA};function Ye(I,re,oe,Se,ne,$,Te,ke,ut,it){if(I===ni){v===!0&&(ue(i.BLEND),v=!1);return}if(v===!1&&(le(i.BLEND),v=!0),I!==dp){if(I!==p||it!==b){if((m!==Oi||M!==Oi)&&(i.blendEquation(i.FUNC_ADD),m=Oi,M=Oi),it)switch(I){case Es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rl:i.blendFunc(i.ONE,i.ONE);break;case Pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ll:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",I);break}else switch(I){case Es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Rl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pl:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ll:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",I);break}x=null,y=null,C=null,T=null,A.set(0,0,0),S=0,p=I,b=it}return}ne=ne||re,$=$||oe,Te=Te||Se,(re!==m||ne!==M)&&(i.blendEquationSeparate(vt[re],vt[ne]),m=re,M=ne),(oe!==x||Se!==y||$!==C||Te!==T)&&(i.blendFuncSeparate($e[oe],$e[Se],$e[$],$e[Te]),x=oe,y=Se,C=$,T=Te),(ke.equals(A)===!1||ut!==S)&&(i.blendColor(ke.r,ke.g,ke.b,ut),A.copy(ke),S=ut),p=I,b=!1}function tt(I,re){I.side===wn?ue(i.CULL_FACE):le(i.CULL_FACE);let oe=I.side===en;re&&(oe=!oe),ze(oe),I.blending===Es&&I.transparent===!1?Ye(ni):Ye(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const Se=I.stencilWrite;a.setTest(Se),Se&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(I){z!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),z=I)}function ft(I){I!==cp?(le(i.CULL_FACE),I!==R&&(I===Cl?i.cullFace(i.BACK):I===lp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),R=I}function L(I){I!==F&&(H&&i.lineWidth(I),F=I)}function mt(I,re,oe){I?(le(i.POLYGON_OFFSET_FILL),(k!==re||O!==oe)&&(k=re,O=oe,o.getReversed()&&(re=-re),i.polygonOffset(re,oe))):ue(i.POLYGON_OFFSET_FILL)}function je(I){I?le(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function j(I){I===void 0&&(I=i.TEXTURE0+V-1),ee!==I&&(i.activeTexture(I),ee=I)}function ie(I,re,oe){oe===void 0&&(ee===null?oe=i.TEXTURE0+V-1:oe=ee);let Se=de[oe];Se===void 0&&(Se={type:void 0,texture:void 0},de[oe]=Se),(Se.type!==I||Se.texture!==re)&&(ee!==oe&&(i.activeTexture(oe),ee=oe),i.bindTexture(I,re||Y[I]),Se.type=I,Se.texture=re)}function w(){const I=de[ee];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(I){Ze("WebGLState:",I)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(I){Ze("WebGLState:",I)}}function Z(){try{i.texSubImage2D(...arguments)}catch(I){Ze("WebGLState:",I)}}function J(){try{i.texSubImage3D(...arguments)}catch(I){Ze("WebGLState:",I)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Ze("WebGLState:",I)}}function Me(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Ze("WebGLState:",I)}}function ae(){try{i.texStorage2D(...arguments)}catch(I){Ze("WebGLState:",I)}}function we(){try{i.texStorage3D(...arguments)}catch(I){Ze("WebGLState:",I)}}function De(){try{i.texImage2D(...arguments)}catch(I){Ze("WebGLState:",I)}}function te(){try{i.texImage3D(...arguments)}catch(I){Ze("WebGLState:",I)}}function se(I){Oe.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Oe.copy(I))}function _e(I){nt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),nt.copy(I))}function me(I,re){let oe=l.get(re);oe===void 0&&(oe=new WeakMap,l.set(re,oe));let Se=oe.get(I);Se===void 0&&(Se=i.getUniformBlockIndex(re,I.name),oe.set(I,Se))}function ce(I,re){const Se=l.get(re).get(I);c.get(re)!==Se&&(i.uniformBlockBinding(re,Se,I.__bindingPointIndex),c.set(re,Se))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ee=null,de={},d={},f=new WeakMap,h=[],g=null,v=!1,p=null,m=null,x=null,y=null,M=null,C=null,T=null,A=new Ke(0,0,0),S=0,b=!1,z=null,R=null,F=null,k=null,O=null,Oe.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:le,disable:ue,bindFramebuffer:Be,drawBuffers:Ie,useProgram:Ne,setBlending:Ye,setMaterial:tt,setFlipSided:ze,setCullFace:ft,setLineWidth:L,setPolygonOffset:mt,setScissorTest:je,activeTexture:j,bindTexture:ie,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:D,texImage2D:De,texImage3D:te,updateUBOMapping:me,uniformBlockBinding:ce,texStorage2D:ae,texStorage3D:we,texSubImage2D:Z,texSubImage3D:J,compressedTexSubImage2D:q,compressedTexSubImage3D:Me,scissor:se,viewport:_e,reset:Ue}}function H_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pe,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return h?new OffscreenCanvas(w,_):Uo("canvas")}function v(w,_,D){let Z=1;const J=ie(w);if((J.width>D||J.height>D)&&(Z=D/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const q=Math.floor(Z*J.width),Me=Math.floor(Z*J.height);d===void 0&&(d=g(q,Me));const ae=_?g(q,Me):d;return ae.width=q,ae.height=Me,ae.getContext("2d").drawImage(w,0,0,q,Me),Fe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+Me+")."),ae}else return"data"in w&&Fe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),w;return w}function p(w){return w.generateMipmaps}function m(w){i.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(w,_,D,Z,J=!1){if(w!==null){if(i[w]!==void 0)return i[w];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=_;if(_===i.RED&&(D===i.FLOAT&&(q=i.R32F),D===i.HALF_FLOAT&&(q=i.R16F),D===i.UNSIGNED_BYTE&&(q=i.R8)),_===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.R8UI),D===i.UNSIGNED_SHORT&&(q=i.R16UI),D===i.UNSIGNED_INT&&(q=i.R32UI),D===i.BYTE&&(q=i.R8I),D===i.SHORT&&(q=i.R16I),D===i.INT&&(q=i.R32I)),_===i.RG&&(D===i.FLOAT&&(q=i.RG32F),D===i.HALF_FLOAT&&(q=i.RG16F),D===i.UNSIGNED_BYTE&&(q=i.RG8)),_===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RG8UI),D===i.UNSIGNED_SHORT&&(q=i.RG16UI),D===i.UNSIGNED_INT&&(q=i.RG32UI),D===i.BYTE&&(q=i.RG8I),D===i.SHORT&&(q=i.RG16I),D===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RGB8UI),D===i.UNSIGNED_SHORT&&(q=i.RGB16UI),D===i.UNSIGNED_INT&&(q=i.RGB32UI),D===i.BYTE&&(q=i.RGB8I),D===i.SHORT&&(q=i.RGB16I),D===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),D===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),D===i.UNSIGNED_INT&&(q=i.RGBA32UI),D===i.BYTE&&(q=i.RGBA8I),D===i.SHORT&&(q=i.RGBA16I),D===i.INT&&(q=i.RGBA32I)),_===i.RGB&&(D===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),D===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),_===i.RGBA){const Me=J?Io:Je.getTransfer(Z);D===i.FLOAT&&(q=i.RGBA32F),D===i.HALF_FLOAT&&(q=i.RGBA16F),D===i.UNSIGNED_BYTE&&(q=Me===st?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function M(w,_){let D;return w?_===null||_===Hn||_===Sr?D=i.DEPTH24_STENCIL8:_===Bn?D=i.DEPTH32F_STENCIL8:_===_r&&(D=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Hn||_===Sr?D=i.DEPTH_COMPONENT24:_===Bn?D=i.DEPTH_COMPONENT32F:_===_r&&(D=i.DEPTH_COMPONENT16),D}function C(w,_){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==At&&w.minFilter!==qt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),S(_),_.isVideoTexture&&u.delete(_)}function A(w){const _=w.target;_.removeEventListener("dispose",A),z(_)}function S(w){const _=n.get(w);if(_.__webglInit===void 0)return;const D=w.source,Z=f.get(D);if(Z){const J=Z[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(w),Object.keys(Z).length===0&&f.delete(D)}n.remove(w)}function b(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const D=w.source,Z=f.get(D);delete Z[_.__cacheKey],o.memory.textures--}function z(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let J=0;J<_.__webglFramebuffer[Z].length;J++)i.deleteFramebuffer(_.__webglFramebuffer[Z][J]);else i.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=w.textures;for(let Z=0,J=D.length;Z<J;Z++){const q=n.get(D[Z]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(D[Z])}n.remove(w)}let R=0;function F(){R=0}function k(){const w=R;return w>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),R+=1,w}function O(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function V(w,_){const D=n.get(w);if(w.isVideoTexture&&je(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&D.__version!==w.version){const Z=w.image;if(Z===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(D,w,_);return}}else w.isExternalTexture&&(D.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+_)}function H(w,_){const D=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&D.__version!==w.version){Y(D,w,_);return}else w.isExternalTexture&&(D.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+_)}function U(w,_){const D=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&D.__version!==w.version){Y(D,w,_);return}t.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+_)}function Q(w,_){const D=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&D.__version!==w.version){le(D,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+_)}const ee={[xr]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[Ka]:i.MIRRORED_REPEAT},de={[At]:i.NEAREST,[Lp]:i.NEAREST_MIPMAP_NEAREST,[Br]:i.NEAREST_MIPMAP_LINEAR,[qt]:i.LINEAR,[Zo]:i.LINEAR_MIPMAP_NEAREST,[Vi]:i.LINEAR_MIPMAP_LINEAR},fe={[Np]:i.NEVER,[zp]:i.ALWAYS,[Fp]:i.LESS,[nl]:i.LEQUAL,[Op]:i.EQUAL,[il]:i.GEQUAL,[Bp]:i.GREATER,[kp]:i.NOTEQUAL};function xe(w,_){if(_.type===Bn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===qt||_.magFilter===Zo||_.magFilter===Br||_.magFilter===Vi||_.minFilter===qt||_.minFilter===Zo||_.minFilter===Br||_.minFilter===Vi)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ee[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ee[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ee[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,de[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,de[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,fe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==Br&&_.minFilter!==Vi||_.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Oe(w,_){let D=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const Z=_.source;let J=f.get(Z);J===void 0&&(J={},f.set(Z,J));const q=O(_);if(q!==w.__cacheKey){J[q]===void 0&&(J[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,D=!0),J[q].usedTimes++;const Me=J[w.__cacheKey];Me!==void 0&&(J[w.__cacheKey].usedTimes--,Me.usedTimes===0&&b(_)),w.__cacheKey=q,w.__webglTexture=J[q].texture}return D}function nt(w,_,D){return Math.floor(Math.floor(w/D)/_)}function ot(w,_,D,Z){const q=w.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,D,Z,_.data);else{q.sort((te,se)=>te.start-se.start);let Me=0;for(let te=1;te<q.length;te++){const se=q[Me],_e=q[te],me=se.start+se.count,ce=nt(_e.start,_.width,4),Ue=nt(se.start,_.width,4);_e.start<=me+1&&ce===Ue&&nt(_e.start+_e.count-1,_.width,4)===ce?se.count=Math.max(se.count,_e.start+_e.count-se.start):(++Me,q[Me]=_e)}q.length=Me+1;const ae=i.getParameter(i.UNPACK_ROW_LENGTH),we=i.getParameter(i.UNPACK_SKIP_PIXELS),De=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let te=0,se=q.length;te<se;te++){const _e=q[te],me=Math.floor(_e.start/4),ce=Math.ceil(_e.count/4),Ue=me%_.width,I=Math.floor(me/_.width),re=ce,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Ue,I,re,oe,D,Z,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ae),i.pixelStorei(i.UNPACK_SKIP_PIXELS,we),i.pixelStorei(i.UNPACK_SKIP_ROWS,De)}}function Y(w,_,D){let Z=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=i.TEXTURE_3D);const J=Oe(w,_),q=_.source;t.bindTexture(Z,w.__webglTexture,i.TEXTURE0+D);const Me=n.get(q);if(q.version!==Me.__version||J===!0){t.activeTexture(i.TEXTURE0+D);const ae=Je.getPrimaries(Je.workingColorSpace),we=_.colorSpace===_i?null:Je.getPrimaries(_.colorSpace),De=_.colorSpace===_i||ae===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let te=v(_.image,!1,s.maxTextureSize);te=j(_,te);const se=r.convert(_.format,_.colorSpace),_e=r.convert(_.type);let me=y(_.internalFormat,se,_e,_.colorSpace,_.isVideoTexture);xe(Z,_);let ce;const Ue=_.mipmaps,I=_.isVideoTexture!==!0,re=Me.__version===void 0||J===!0,oe=q.dataReady,Se=C(_,te);if(_.isDepthTexture)me=M(_.format===Hi,_.type),re&&(I?t.texStorage2D(i.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,me,te.width,te.height,0,se,_e,null));else if(_.isDataTexture)if(Ue.length>0){I&&re&&t.texStorage2D(i.TEXTURE_2D,Se,me,Ue[0].width,Ue[0].height);for(let ne=0,$=Ue.length;ne<$;ne++)ce=Ue[ne],I?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,se,_e,ce.data):t.texImage2D(i.TEXTURE_2D,ne,me,ce.width,ce.height,0,se,_e,ce.data);_.generateMipmaps=!1}else I?(re&&t.texStorage2D(i.TEXTURE_2D,Se,me,te.width,te.height),oe&&ot(_,te,se,_e)):t.texImage2D(i.TEXTURE_2D,0,me,te.width,te.height,0,se,_e,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,me,Ue[0].width,Ue[0].height,te.depth);for(let ne=0,$=Ue.length;ne<$;ne++)if(ce=Ue[ne],_.format!==Pn)if(se!==null)if(I){if(oe)if(_.layerUpdates.size>0){const Te=ou(ce.width,ce.height,_.format,_.type);for(const ke of _.layerUpdates){const ut=ce.data.subarray(ke*Te/ce.data.BYTES_PER_ELEMENT,(ke+1)*Te/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ke,ce.width,ce.height,1,se,ut)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ce.width,ce.height,te.depth,se,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,me,ce.width,ce.height,te.depth,0,ce.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ce.width,ce.height,te.depth,se,_e,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,me,ce.width,ce.height,te.depth,0,se,_e,ce.data)}else{I&&re&&t.texStorage2D(i.TEXTURE_2D,Se,me,Ue[0].width,Ue[0].height);for(let ne=0,$=Ue.length;ne<$;ne++)ce=Ue[ne],_.format!==Pn?se!==null?I?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,se,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,me,ce.width,ce.height,0,ce.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ce.width,ce.height,se,_e,ce.data):t.texImage2D(i.TEXTURE_2D,ne,me,ce.width,ce.height,0,se,_e,ce.data)}else if(_.isDataArrayTexture)if(I){if(re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,me,te.width,te.height,te.depth),oe)if(_.layerUpdates.size>0){const ne=ou(te.width,te.height,_.format,_.type);for(const $ of _.layerUpdates){const Te=te.data.subarray($*ne/te.data.BYTES_PER_ELEMENT,($+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,te.width,te.height,1,se,_e,Te)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,se,_e,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,se,_e,te.data);else if(_.isData3DTexture)I?(re&&t.texStorage3D(i.TEXTURE_3D,Se,me,te.width,te.height,te.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,se,_e,te.data)):t.texImage3D(i.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,se,_e,te.data);else if(_.isFramebufferTexture){if(re)if(I)t.texStorage2D(i.TEXTURE_2D,Se,me,te.width,te.height);else{let ne=te.width,$=te.height;for(let Te=0;Te<Se;Te++)t.texImage2D(i.TEXTURE_2D,Te,me,ne,$,0,se,_e,null),ne>>=1,$>>=1}}else if(Ue.length>0){if(I&&re){const ne=ie(Ue[0]);t.texStorage2D(i.TEXTURE_2D,Se,me,ne.width,ne.height)}for(let ne=0,$=Ue.length;ne<$;ne++)ce=Ue[ne],I?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,se,_e,ce):t.texImage2D(i.TEXTURE_2D,ne,me,se,_e,ce);_.generateMipmaps=!1}else if(I){if(re){const ne=ie(te);t.texStorage2D(i.TEXTURE_2D,Se,me,ne.width,ne.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,_e,te)}else t.texImage2D(i.TEXTURE_2D,0,me,se,_e,te);p(_)&&m(Z),Me.__version=q.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function le(w,_,D){if(_.image.length!==6)return;const Z=Oe(w,_),J=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+D);const q=n.get(J);if(J.version!==q.__version||Z===!0){t.activeTexture(i.TEXTURE0+D);const Me=Je.getPrimaries(Je.workingColorSpace),ae=_.colorSpace===_i?null:Je.getPrimaries(_.colorSpace),we=_.colorSpace===_i||Me===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const De=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,se=[];for(let $=0;$<6;$++)!De&&!te?se[$]=v(_.image[$],!0,s.maxCubemapSize):se[$]=te?_.image[$].image:_.image[$],se[$]=j(_,se[$]);const _e=se[0],me=r.convert(_.format,_.colorSpace),ce=r.convert(_.type),Ue=y(_.internalFormat,me,ce,_.colorSpace),I=_.isVideoTexture!==!0,re=q.__version===void 0||Z===!0,oe=J.dataReady;let Se=C(_,_e);xe(i.TEXTURE_CUBE_MAP,_);let ne;if(De){I&&re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Ue,_e.width,_e.height);for(let $=0;$<6;$++){ne=se[$].mipmaps;for(let Te=0;Te<ne.length;Te++){const ke=ne[Te];_.format!==Pn?me!==null?I?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te,0,0,ke.width,ke.height,me,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te,Ue,ke.width,ke.height,0,ke.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te,0,0,ke.width,ke.height,me,ce,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te,Ue,ke.width,ke.height,0,me,ce,ke.data)}}}else{if(ne=_.mipmaps,I&&re){ne.length>0&&Se++;const $=ie(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,Ue,$.width,$.height)}for(let $=0;$<6;$++)if(te){I?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,se[$].width,se[$].height,me,ce,se[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ue,se[$].width,se[$].height,0,me,ce,se[$].data);for(let Te=0;Te<ne.length;Te++){const ut=ne[Te].image[$].image;I?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te+1,0,0,ut.width,ut.height,me,ce,ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te+1,Ue,ut.width,ut.height,0,me,ce,ut.data)}}else{I?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,me,ce,se[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ue,me,ce,se[$]);for(let Te=0;Te<ne.length;Te++){const ke=ne[Te];I?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te+1,0,0,me,ce,ke.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,Te+1,Ue,me,ce,ke.image[$])}}}p(_)&&m(i.TEXTURE_CUBE_MAP),q.__version=J.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ue(w,_,D,Z,J,q){const Me=r.convert(D.format,D.colorSpace),ae=r.convert(D.type),we=y(D.internalFormat,Me,ae,D.colorSpace),De=n.get(_),te=n.get(D);if(te.__renderTarget=_,!De.__hasExternalTextures){const se=Math.max(1,_.width>>q),_e=Math.max(1,_.height>>q);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,q,we,se,_e,_.depth,0,Me,ae,null):t.texImage2D(J,q,we,se,_e,0,Me,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,J,te.__webglTexture,0,L(_)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,J,te.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(w,_,D){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const Z=_.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,q=M(_.stencilBuffer,J),Me=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(_),q,_.width,_.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(_),q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,w)}else{const Z=_.textures;for(let J=0;J<Z.length;J++){const q=Z[J],Me=r.convert(q.format,q.colorSpace),ae=r.convert(q.type),we=y(q.internalFormat,Me,ae,q.colorSpace);mt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(_),we,_.width,_.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(_),we,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,we,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(w,_,D){const Z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),xe(i.TEXTURE_CUBE_MAP,_.depthTexture);const De=r.convert(_.depthTexture.format),te=r.convert(_.depthTexture.type);let se;_.depthTexture.format===ri?se=i.DEPTH_COMPONENT24:_.depthTexture.format===Hi&&(se=i.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,se,_.width,_.height,0,De,te,null)}}else V(_.depthTexture,0);const q=J.__webglTexture,Me=L(_),ae=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+D:i.TEXTURE_2D,we=_.depthTexture.format===Hi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===ri)mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,we,ae,q,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,we,ae,q,0);else if(_.depthTexture.format===Hi)mt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,we,ae,q,0,Me):i.framebufferTexture2D(i.FRAMEBUFFER,we,ae,q,0);else throw new Error("Unknown depthTexture format")}function Ne(w){const _=n.get(w),D=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=Z}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let Z=0;Z<6;Z++)Ie(_.__webglFramebuffer[Z],w,Z);else{const Z=w.texture.mipmaps;Z&&Z.length>0?Ie(_.__webglFramebuffer[0],w,0):Ie(_.__webglFramebuffer,w,0)}else if(D){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=i.createRenderbuffer(),Be(_.__webglDepthbuffer[Z],w,!1);else{const J=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}else{const Z=w.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Be(_.__webglDepthbuffer,w,!1);else{const J=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(w,_,D){const Z=n.get(w);_!==void 0&&ue(Z.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&Ne(w)}function $e(w){const _=w.texture,D=n.get(w),Z=n.get(_);w.addEventListener("dispose",A);const J=w.textures,q=w.isWebGLCubeRenderTarget===!0,Me=J.length>1;if(Me||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=_.version,o.memory.textures++),q){D.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[ae]=[];for(let we=0;we<_.mipmaps.length;we++)D.__webglFramebuffer[ae][we]=i.createFramebuffer()}else D.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)D.__webglFramebuffer[ae]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ae=0,we=J.length;ae<we;ae++){const De=n.get(J[ae]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&mt(w)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ae=0;ae<J.length;ae++){const we=J[ae];D.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[ae]);const De=r.convert(we.format,we.colorSpace),te=r.convert(we.type),se=y(we.internalFormat,De,te,we.colorSpace,w.isXRRenderTarget===!0),_e=L(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,se,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,D.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),Be(D.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),xe(i.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let we=0;we<_.mipmaps.length;we++)ue(D.__webglFramebuffer[ae][we],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,we);else ue(D.__webglFramebuffer[ae],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(_)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ae=0,we=J.length;ae<we;ae++){const De=J[ae],te=n.get(De);let se=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(se=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,te.__webglTexture),xe(se,De),ue(D.__webglFramebuffer,w,De,i.COLOR_ATTACHMENT0+ae,se,0),p(De)&&m(se)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ae=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,Z.__webglTexture),xe(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let we=0;we<_.mipmaps.length;we++)ue(D.__webglFramebuffer[we],w,_,i.COLOR_ATTACHMENT0,ae,we);else ue(D.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,ae,0);p(_)&&m(ae),t.unbindTexture()}w.depthBuffer&&Ne(w)}function Ye(w){const _=w.textures;for(let D=0,Z=_.length;D<Z;D++){const J=_[D];if(p(J)){const q=x(w),Me=n.get(J).__webglTexture;t.bindTexture(q,Me),m(q),t.unbindTexture()}}}const tt=[],ze=[];function ft(w){if(w.samples>0){if(mt(w)===!1){const _=w.textures,D=w.width,Z=w.height;let J=i.COLOR_BUFFER_BIT;const q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(w),ae=_.length>1;if(ae)for(let De=0;De<_.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const we=w.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let De=0;De<_.length;De++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[De]);const te=n.get(_[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,D,Z,0,0,D,Z,J,i.NEAREST),c===!0&&(tt.length=0,ze.length=0,tt.push(i.COLOR_ATTACHMENT0+De),w.depthBuffer&&w.resolveDepthBuffer===!1&&(tt.push(q),ze.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let De=0;De<_.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,Me.__webglColorRenderbuffer[De]);const te=n.get(_[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function L(w){return Math.min(s.maxSamples,w.samples)}function mt(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function je(w){const _=o.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function j(w,_){const D=w.colorSpace,Z=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||D!==Rs&&D!==_i&&(Je.getTransfer(D)===st?(Z!==Pn||J!==mn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",D)),_}function ie(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=H,this.setTexture3D=U,this.setTextureCube=Q,this.rebindTextures=vt,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function G_(i,e){function t(n,s=_i){let r;const o=Je.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===Zc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Id)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Pd)return i.BYTE;if(n===Ld)return i.SHORT;if(n===_r)return i.UNSIGNED_SHORT;if(n===jc)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===Bn)return i.FLOAT;if(n===si)return i.HALF_FLOAT;if(n===Ud)return i.ALPHA;if(n===Nd)return i.RGB;if(n===Pn)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===Hi)return i.DEPTH_STENCIL;if(n===Fd)return i.RED;if(n===Qc)return i.RED_INTEGER;if(n===Cs)return i.RG;if(n===el)return i.RG_INTEGER;if(n===tl)return i.RGBA_INTEGER;if(n===_o||n===So||n===yo||n===Mo)if(o===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_o)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_o)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===So)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ja||n===Za||n===Ja||n===Qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ec||n===tc)return o===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ic)return r.COMPRESSED_R11_EAC;if(n===sc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===rc)return r.COMPRESSED_RG11_EAC;if(n===oc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ac||n===cc||n===lc||n===uc||n===dc||n===fc||n===hc||n===pc||n===mc||n===gc||n===vc||n===xc||n===_c||n===Sc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ac)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_c)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yc||n===Mc||n===Ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yc)return o===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bc||n===Tc||n===Ac||n===wc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ac)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const W_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X_=`
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

}`;class $_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Xd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gn({vertexShader:W_,fragmentShader:X_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new Is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class q_ extends Fs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null;const v=typeof XRWebGLBinding<"u",p=new $_,m={},x=t.getContextAttributes();let y=null,M=null;const C=[],T=[],A=new Pe;let S=null;const b=new pn;b.viewport=new Tt;const z=new pn;z.viewport=new Tt;const R=[b,z],F=new sg;let k=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let le=C[Y];return le===void 0&&(le=new ra,C[Y]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Y){let le=C[Y];return le===void 0&&(le=new ra,C[Y]=le),le.getGripSpace()},this.getHand=function(Y){let le=C[Y];return le===void 0&&(le=new ra,C[Y]=le),le.getHandSpace()};function V(Y){const le=T.indexOf(Y.inputSource);if(le===-1)return;const ue=C[le];ue!==void 0&&(ue.update(Y.inputSource,Y.frame,l||o),ue.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",U);for(let Y=0;Y<C.length;Y++){const le=T[Y];le!==null&&(T[Y]=null,C[Y].disconnect(le))}k=null,O=null,p.reset();for(const Y in m)delete m[Y];e.setRenderTarget(y),h=null,f=null,d=null,s=null,M=null,ot.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",U),x.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Be=null,Ie=null;x.depth&&(Ie=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=x.stencil?Hi:ri,Be=x.stencil?Sr:Hn);const Ne={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(Ne),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new Vn(f.textureWidth,f.textureHeight,{format:Pn,type:mn,depthTexture:new yr(f.textureWidth,f.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ue={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),M=new Vn(h.framebufferWidth,h.framebufferHeight,{format:Pn,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ot.setContext(s),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function U(Y){for(let le=0;le<Y.removed.length;le++){const ue=Y.removed[le],Be=T.indexOf(ue);Be>=0&&(T[Be]=null,C[Be].disconnect(ue))}for(let le=0;le<Y.added.length;le++){const ue=Y.added[le];let Be=T.indexOf(ue);if(Be===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=T.length){T.push(ue),Be=Ne;break}else if(T[Ne]===null){T[Ne]=ue,Be=Ne;break}if(Be===-1)break}const Ie=C[Be];Ie&&Ie.connect(ue)}}const Q=new B,ee=new B;function de(Y,le,ue){Q.setFromMatrixPosition(le.matrixWorld),ee.setFromMatrixPosition(ue.matrixWorld);const Be=Q.distanceTo(ee),Ie=le.projectionMatrix.elements,Ne=ue.projectionMatrix.elements,vt=Ie[14]/(Ie[10]-1),$e=Ie[14]/(Ie[10]+1),Ye=(Ie[9]+1)/Ie[5],tt=(Ie[9]-1)/Ie[5],ze=(Ie[8]-1)/Ie[0],ft=(Ne[8]+1)/Ne[0],L=vt*ze,mt=vt*ft,je=Be/(-ze+ft),j=je*-ze;if(le.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(j),Y.translateZ(je),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ie[10]===-1)Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{const ie=vt+je,w=$e+je,_=L-j,D=mt+(Be-j),Z=Ye*$e/w*ie,J=tt*$e/w*ie;Y.projectionMatrix.makePerspective(_,D,Z,J,ie,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function fe(Y,le){le===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(le.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let le=Y.near,ue=Y.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(ue=p.depthFar)),F.near=z.near=b.near=le,F.far=z.far=b.far=ue,(k!==F.near||O!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,O=F.far),F.layers.mask=Y.layers.mask|6,b.layers.mask=F.layers.mask&-5,z.layers.mask=F.layers.mask&-3;const Be=Y.parent,Ie=F.cameras;fe(F,Be);for(let Ne=0;Ne<Ie.length;Ne++)fe(Ie[Ne],Be);Ie.length===2?de(F,b,z):F.projectionMatrix.copy(b.projectionMatrix),xe(Y,F,Be)};function xe(Y,le,ue){ue===null?Y.matrix.copy(le.matrixWorld):(Y.matrix.copy(ue.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(le.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(le.projectionMatrix),Y.projectionMatrixInverse.copy(le.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Cc*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Y){return m[Y]};let Oe=null;function nt(Y,le){if(u=le.getViewerPose(l||o),g=le,u!==null){const ue=u.views;h!==null&&(e.setRenderTargetFramebuffer(M,h.framebuffer),e.setRenderTarget(M));let Be=!1;ue.length!==F.cameras.length&&(F.cameras.length=0,Be=!0);for(let $e=0;$e<ue.length;$e++){const Ye=ue[$e];let tt=null;if(h!==null)tt=h.getViewport(Ye);else{const ft=d.getViewSubImage(f,Ye);tt=ft.viewport,$e===0&&(e.setRenderTargetTextures(M,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(M))}let ze=R[$e];ze===void 0&&(ze=new pn,ze.layers.enable($e),ze.viewport=new Tt,R[$e]=ze),ze.matrix.fromArray(Ye.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ye.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(tt.x,tt.y,tt.width,tt.height),$e===0&&(F.matrix.copy(ze.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Be===!0&&F.cameras.push(ze)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const $e=d.getDepthInformation(ue[0]);$e&&$e.isValid&&$e.texture&&p.init($e,s.renderState)}if(Ie&&Ie.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let $e=0;$e<ue.length;$e++){const Ye=ue[$e].camera;if(Ye){let tt=m[Ye];tt||(tt=new Xd,m[Ye]=tt);const ze=d.getCameraImage(Ye);tt.sourceTexture=ze}}}}for(let ue=0;ue<C.length;ue++){const Be=T[ue],Ie=C[ue];Be!==null&&Ie!==void 0&&Ie.update(Be,le,l||o)}Oe&&Oe(Y,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),g=null}const ot=new rf;ot.setAnimationLoop(nt),this.setAnimationLoop=function(Y){Oe=Y},this.dispose=function(){}}}const Li=new oi,Y_=new Et;function K_(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,tf(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,y,M){m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&h(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,x,y):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===en&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===en&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m),y=x.envMap,M=x.envMapRotation;y&&(p.envMap.value=y,Li.copy(M),Li.x*=-1,Li.y*=-1,Li.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),p.envMapRotation.value.setFromMatrix4(Y_.makeRotationFromEuler(Li)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function j_(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const M=y.program;n.uniformBlockBinding(x,M)}function l(x,y){let M=s[x.id];M===void 0&&(g(x),M=u(x),s[x.id]=M,x.addEventListener("dispose",p));const C=y.program;n.updateUBOMapping(x,C);const T=e.render.frame;r[x.id]!==T&&(f(x),r[x.id]=T)}function u(x){const y=d();x.__bindingPointIndex=y;const M=i.createBuffer(),C=x.__size,T=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const y=s[x.id],M=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,A=M.length;T<A;T++){const S=Array.isArray(M[T])?M[T]:[M[T]];for(let b=0,z=S.length;b<z;b++){const R=S[b];if(h(R,T,b,C)===!0){const F=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let O=0;for(let V=0;V<k.length;V++){const H=k[V],U=v(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+O,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,O),O+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(x,y,M,C){const T=x.value,A=y+"_"+M;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const S=C[A];if(typeof T=="number"||typeof T=="boolean"){if(S!==T)return C[A]=T,!0}else if(S.equals(T)===!1)return S.copy(T),!0}return!1}function g(x){const y=x.uniforms;let M=0;const C=16;for(let A=0,S=y.length;A<S;A++){const b=Array.isArray(y[A])?y[A]:[y[A]];for(let z=0,R=b.length;z<R;z++){const F=b[z],k=Array.isArray(F.value)?F.value:[F.value];for(let O=0,V=k.length;O<V;O++){const H=k[O],U=v(H),Q=M%C,ee=Q%U.boundary,de=Q+ee;M+=ee,de!==0&&C-de<U.storage&&(M+=C-de),F.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=U.storage}}}const T=M%C;return T>0&&(M+=C-T),x.__size=M,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",x),y}function p(x){const y=x.target;y.removeEventListener("dispose",p);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(const x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}const Z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function J_(){return Un===null&&(Un=new dm(Z_,16,16,Cs,si),Un.name="DFG_LUT",Un.minFilter=qt,Un.magFilter=qt,Un.wrapS=Qn,Un.wrapT=Qn,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class Q_{constructor(e={}){const{canvas:t=Hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=mn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const v=h,p=new Set([tl,el,Qc]),m=new Set([mn,Hn,_r,Sr,Zc,Jc]),x=new Uint32Array(4),y=new Int32Array(4);let M=null,C=null;const T=[],A=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let z=!1;this._outputColorSpace=hn;let R=0,F=0,k=null,O=-1,V=null;const H=new Tt,U=new Tt;let Q=null;const ee=new Ke(0);let de=0,fe=t.width,xe=t.height,Oe=1,nt=null,ot=null;const Y=new Tt(0,0,fe,xe),le=new Tt(0,0,fe,xe);let ue=!1;const Be=new Gd;let Ie=!1,Ne=!1;const vt=new Et,$e=new B,Ye=new Tt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function ft(){return k===null?Oe:1}let L=n;function mt(E,N){return t.getContext(E,N)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kc}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",ut,!1),L===null){const N="webgl2";if(L=mt(N,E),L===null)throw mt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw Ze("WebGLRenderer: "+E.message),E}let je,j,ie,w,_,D,Z,J,q,Me,ae,we,De,te,se,_e,me,ce,Ue,I,re,oe,Se;function ne(){je=new Qv(L),je.init(),re=new G_(L,je),j=new Xv(L,je,e,re),ie=new V_(L,je),j.reversedDepthBuffer&&f&&ie.buffers.depth.setReversed(!0),w=new nx(L),_=new w_,D=new H_(L,je,ie,_,j,re,w),Z=new Jv(b),J=new ag(L),oe=new Gv(L,J),q=new ex(L,J,w,oe),Me=new sx(L,q,J,oe,w),ce=new ix(L,j,D),se=new $v(_),ae=new A_(b,Z,je,j,oe,se),we=new K_(b,_),De=new R_,te=new N_(je),me=new Hv(b,Z,ie,Me,g,c),_e=new z_(b,Me,j),Se=new j_(L,w,j,ie),Ue=new Wv(L,je,w),I=new tx(L,je,w),w.programs=ae.programs,b.capabilities=j,b.extensions=je,b.properties=_,b.renderLists=De,b.shadowMap=_e,b.state=ie,b.info=w}ne(),v!==mn&&(S=new ox(v,t.width,t.height,s,r));const $=new q_(b,L);this.xr=$,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=je.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=je.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(E){E!==void 0&&(Oe=E,this.setSize(fe,xe,!1))},this.getSize=function(E){return E.set(fe,xe)},this.setSize=function(E,N,X=!0){if($.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=E,xe=N,t.width=Math.floor(E*Oe),t.height=Math.floor(N*Oe),X===!0&&(t.style.width=E+"px",t.style.height=N+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(fe*Oe,xe*Oe).floor()},this.setDrawingBufferSize=function(E,N,X){fe=E,xe=N,Oe=X,t.width=Math.floor(E*X),t.height=Math.floor(N*X),this.setViewport(0,0,E,N)},this.setEffects=function(E){if(v===mn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let N=0;N<E.length;N++)if(E[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(H)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,N,X,W){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,N,X,W),ie.viewport(H.copy(Y).multiplyScalar(Oe).round())},this.getScissor=function(E){return E.copy(le)},this.setScissor=function(E,N,X,W){E.isVector4?le.set(E.x,E.y,E.z,E.w):le.set(E,N,X,W),ie.scissor(U.copy(le).multiplyScalar(Oe).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(E){ie.setScissorTest(ue=E)},this.setOpaqueSort=function(E){nt=E},this.setTransparentSort=function(E){ot=E},this.getClearColor=function(E){return E.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(E=!0,N=!0,X=!0){let W=0;if(E){let G=!1;if(k!==null){const ge=k.texture.format;G=p.has(ge)}if(G){const ge=k.texture.type,ye=m.has(ge),ve=me.getClearColor(),Ae=me.getClearAlpha(),Re=ve.r,Ve=ve.g,We=ve.b;ye?(x[0]=Re,x[1]=Ve,x[2]=We,x[3]=Ae,L.clearBufferuiv(L.COLOR,0,x)):(y[0]=Re,y[1]=Ve,y[2]=We,y[3]=Ae,L.clearBufferiv(L.COLOR,0,y))}else W|=L.COLOR_BUFFER_BIT}N&&(W|=L.DEPTH_BUFFER_BIT),X&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",ut,!1),me.dispose(),De.dispose(),te.dispose(),_.dispose(),Z.dispose(),Me.dispose(),oe.dispose(),Se.dispose(),ae.dispose(),$.dispose(),$.removeEventListener("sessionstart",fl),$.removeEventListener("sessionend",hl),bi.stop()};function Te(E){E.preventDefault(),Fl("WebGLRenderer: Context Lost."),z=!0}function ke(){Fl("WebGLRenderer: Context Restored."),z=!1;const E=w.autoReset,N=_e.enabled,X=_e.autoUpdate,W=_e.needsUpdate,G=_e.type;ne(),w.autoReset=E,_e.enabled=N,_e.autoUpdate=X,_e.needsUpdate=W,_e.type=G}function ut(E){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function it(E){const N=E.target;N.removeEventListener("dispose",it),Xn(N)}function Xn(E){$n(E),_.remove(E)}function $n(E){const N=_.get(E).programs;N!==void 0&&(N.forEach(function(X){ae.releaseProgram(X)}),E.isShaderMaterial&&ae.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,X,W,G,ge){N===null&&(N=tt);const ye=G.isMesh&&G.matrixWorld.determinant()<0,ve=bf(E,N,X,W,G);ie.setMaterial(W,ye);let Ae=X.index,Re=1;if(W.wireframe===!0){if(Ae=q.getWireframeAttribute(X),Ae===void 0)return;Re=2}const Ve=X.drawRange,We=X.attributes.position;let Le=Ve.start*Re,at=(Ve.start+Ve.count)*Re;ge!==null&&(Le=Math.max(Le,ge.start*Re),at=Math.min(at,(ge.start+ge.count)*Re)),Ae!==null?(Le=Math.max(Le,0),at=Math.min(at,Ae.count)):We!=null&&(Le=Math.max(Le,0),at=Math.min(at,We.count));const bt=at-Le;if(bt<0||bt===1/0)return;oe.setup(G,W,ve,X,Ae);let xt,ct=Ue;if(Ae!==null&&(xt=J.get(Ae),ct=I,ct.setIndex(xt)),G.isMesh)W.wireframe===!0?(ie.setLineWidth(W.wireframeLinewidth*ft()),ct.setMode(L.LINES)):ct.setMode(L.TRIANGLES);else if(G.isLine){let Wt=W.linewidth;Wt===void 0&&(Wt=1),ie.setLineWidth(Wt*ft()),G.isLineSegments?ct.setMode(L.LINES):G.isLineLoop?ct.setMode(L.LINE_LOOP):ct.setMode(L.LINE_STRIP)}else G.isPoints?ct.setMode(L.POINTS):G.isSprite&&ct.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)No("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Wt=G._multiDrawStarts,Ce=G._multiDrawCounts,sn=G._multiDrawCount,Qe=Ae?J.get(Ae).bytesPerElement:1,yn=_.get(W).currentProgram.getUniforms();for(let In=0;In<sn;In++)yn.setValue(L,"_gl_DrawID",In),ct.render(Wt[In]/Qe,Ce[In])}else if(G.isInstancedMesh)ct.renderInstances(Le,bt,G.count);else if(X.isInstancedBufferGeometry){const Wt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ce=Math.min(X.instanceCount,Wt);ct.renderInstances(Le,bt,Ce)}else ct.render(Le,bt)};function dl(E,N,X){E.transparent===!0&&E.side===wn&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,Nr(E,N,X),E.side=Ei,E.needsUpdate=!0,Nr(E,N,X),E.side=wn):Nr(E,N,X)}this.compile=function(E,N,X=null){X===null&&(X=E),C=te.get(X),C.init(N),A.push(C),X.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(C.pushLight(G),G.castShadow&&C.pushShadow(G))}),E!==X&&E.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(C.pushLight(G),G.castShadow&&C.pushShadow(G))}),C.setupLights();const W=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){const ve=ge[ye];dl(ve,X,G),W.add(ve)}else dl(ge,X,G),W.add(ge)}),C=A.pop(),W},this.compileAsync=function(E,N,X=null){const W=this.compile(E,N,X);return new Promise(G=>{function ge(){if(W.forEach(function(ye){_.get(ye).currentProgram.isReady()&&W.delete(ye)}),W.size===0){G(E);return}setTimeout(ge,10)}je.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Vo=null;function Ef(E){Vo&&Vo(E)}function fl(){bi.stop()}function hl(){bi.start()}const bi=new rf;bi.setAnimationLoop(Ef),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(E){Vo=E,$.setAnimationLoop(E),E===null?bi.stop():bi.start()},$.addEventListener("sessionstart",fl),$.addEventListener("sessionend",hl),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;const X=$.enabled===!0&&$.isPresenting===!0,W=S!==null&&(k===null||X)&&S.begin(b,k);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&($.cameraAutoUpdate===!0&&$.updateCamera(N),N=$.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,N,k),C=te.get(E,A.length),C.init(N),A.push(C),vt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Be.setFromProjectionMatrix(vt,kn,N.reversedDepth),Ne=this.localClippingEnabled,Ie=se.init(this.clippingPlanes,Ne),M=De.get(E,T.length),M.init(),T.push(M),$.enabled===!0&&$.isPresenting===!0){const ye=b.xr.getDepthSensingMesh();ye!==null&&Ho(ye,N,-1/0,b.sortObjects)}Ho(E,N,0,b.sortObjects),M.finish(),b.sortObjects===!0&&M.sort(nt,ot),ze=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,ze&&me.addToRenderList(M,E),this.info.render.frame++,Ie===!0&&se.beginShadows();const G=C.state.shadowsArray;if(_e.render(G,E,N),Ie===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&S.hasRenderPass())===!1){const ye=M.opaque,ve=M.transmissive;if(C.setupLights(),N.isArrayCamera){const Ae=N.cameras;if(ve.length>0)for(let Re=0,Ve=Ae.length;Re<Ve;Re++){const We=Ae[Re];ml(ye,ve,E,We)}ze&&me.render(E);for(let Re=0,Ve=Ae.length;Re<Ve;Re++){const We=Ae[Re];pl(M,E,We,We.viewport)}}else ve.length>0&&ml(ye,ve,E,N),ze&&me.render(E),pl(M,E,N)}k!==null&&F===0&&(D.updateMultisampleRenderTarget(k),D.updateRenderTargetMipmap(k)),W&&S.end(b),E.isScene===!0&&E.onAfterRender(b,E,N),oe.resetDefaultState(),O=-1,V=null,A.pop(),A.length>0?(C=A[A.length-1],Ie===!0&&se.setGlobalState(b.clippingPlanes,C.state.camera)):C=null,T.pop(),T.length>0?M=T[T.length-1]:M=null};function Ho(E,N,X,W){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)C.pushLight(E),E.castShadow&&C.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Be.intersectsSprite(E)){W&&Ye.setFromMatrixPosition(E.matrixWorld).applyMatrix4(vt);const ye=Me.update(E),ve=E.material;ve.visible&&M.push(E,ye,ve,X,Ye.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Be.intersectsObject(E))){const ye=Me.update(E),ve=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ye.copy(E.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ye.copy(ye.boundingSphere.center)),Ye.applyMatrix4(E.matrixWorld).applyMatrix4(vt)),Array.isArray(ve)){const Ae=ye.groups;for(let Re=0,Ve=Ae.length;Re<Ve;Re++){const We=Ae[Re],Le=ve[We.materialIndex];Le&&Le.visible&&M.push(E,ye,Le,X,Ye.z,We)}}else ve.visible&&M.push(E,ye,ve,X,Ye.z,null)}}const ge=E.children;for(let ye=0,ve=ge.length;ye<ve;ye++)Ho(ge[ye],N,X,W)}function pl(E,N,X,W){const{opaque:G,transmissive:ge,transparent:ye}=E;C.setupLightsView(X),Ie===!0&&se.setGlobalState(b.clippingPlanes,X),W&&ie.viewport(H.copy(W)),G.length>0&&Ur(G,N,X),ge.length>0&&Ur(ge,N,X),ye.length>0&&Ur(ye,N,X),ie.buffers.depth.setTest(!0),ie.buffers.depth.setMask(!0),ie.buffers.color.setMask(!0),ie.setPolygonOffset(!1)}function ml(E,N,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[W.id]===void 0){const Le=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[W.id]=new Vn(1,1,{generateMipmaps:!0,type:Le?si:mn,minFilter:Vi,samples:Math.max(4,j.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const ge=C.state.transmissionRenderTarget[W.id],ye=W.viewport||H;ge.setSize(ye.z*b.transmissionResolutionScale,ye.w*b.transmissionResolutionScale);const ve=b.getRenderTarget(),Ae=b.getActiveCubeFace(),Re=b.getActiveMipmapLevel();b.setRenderTarget(ge),b.getClearColor(ee),de=b.getClearAlpha(),de<1&&b.setClearColor(16777215,.5),b.clear(),ze&&me.render(X);const Ve=b.toneMapping;b.toneMapping=zn;const We=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),C.setupLightsView(W),Ie===!0&&se.setGlobalState(b.clippingPlanes,W),Ur(E,X,W),D.updateMultisampleRenderTarget(ge),D.updateRenderTargetMipmap(ge),je.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let at=0,bt=N.length;at<bt;at++){const xt=N[at],{object:ct,geometry:Wt,material:Ce,group:sn}=xt;if(Ce.side===wn&&ct.layers.test(W.layers)){const Qe=Ce.side;Ce.side=en,Ce.needsUpdate=!0,gl(ct,X,W,Wt,Ce,sn),Ce.side=Qe,Ce.needsUpdate=!0,Le=!0}}Le===!0&&(D.updateMultisampleRenderTarget(ge),D.updateRenderTargetMipmap(ge))}b.setRenderTarget(ve,Ae,Re),b.setClearColor(ee,de),We!==void 0&&(W.viewport=We),b.toneMapping=Ve}function Ur(E,N,X){const W=N.isScene===!0?N.overrideMaterial:null;for(let G=0,ge=E.length;G<ge;G++){const ye=E[G],{object:ve,geometry:Ae,group:Re}=ye;let Ve=ye.material;Ve.allowOverride===!0&&W!==null&&(Ve=W),ve.layers.test(X.layers)&&gl(ve,N,X,Ae,Ve,Re)}}function gl(E,N,X,W,G,ge){E.onBeforeRender(b,N,X,W,G,ge),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(b,N,X,W,E,ge),G.transparent===!0&&G.side===wn&&G.forceSinglePass===!1?(G.side=en,G.needsUpdate=!0,b.renderBufferDirect(X,N,W,G,E,ge),G.side=Ei,G.needsUpdate=!0,b.renderBufferDirect(X,N,W,G,E,ge),G.side=wn):b.renderBufferDirect(X,N,W,G,E,ge),E.onAfterRender(b,N,X,W,G,ge)}function Nr(E,N,X){N.isScene!==!0&&(N=tt);const W=_.get(E),G=C.state.lights,ge=C.state.shadowsArray,ye=G.state.version,ve=ae.getParameters(E,G.state,ge,N,X),Ae=ae.getProgramCacheKey(ve);let Re=W.programs;W.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?N.environment:null,W.fog=N.fog;const Ve=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;W.envMap=Z.get(E.envMap||W.environment,Ve),W.envMapRotation=W.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Re===void 0&&(E.addEventListener("dispose",it),Re=new Map,W.programs=Re);let We=Re.get(Ae);if(We!==void 0){if(W.currentProgram===We&&W.lightsStateVersion===ye)return xl(E,ve),We}else ve.uniforms=ae.getUniforms(E),E.onBeforeCompile(ve,b),We=ae.acquireProgram(ve,Ae),Re.set(Ae,We),W.uniforms=ve.uniforms;const Le=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=se.uniform),xl(E,ve),W.needsLights=Af(E),W.lightsStateVersion=ye,W.needsLights&&(Le.ambientLightColor.value=G.state.ambient,Le.lightProbe.value=G.state.probe,Le.directionalLights.value=G.state.directional,Le.directionalLightShadows.value=G.state.directionalShadow,Le.spotLights.value=G.state.spot,Le.spotLightShadows.value=G.state.spotShadow,Le.rectAreaLights.value=G.state.rectArea,Le.ltc_1.value=G.state.rectAreaLTC1,Le.ltc_2.value=G.state.rectAreaLTC2,Le.pointLights.value=G.state.point,Le.pointLightShadows.value=G.state.pointShadow,Le.hemisphereLights.value=G.state.hemi,Le.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Le.spotLightMatrix.value=G.state.spotLightMatrix,Le.spotLightMap.value=G.state.spotLightMap,Le.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=We,W.uniformsList=null,We}function vl(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=Eo.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function xl(E,N){const X=_.get(E);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function bf(E,N,X,W,G){N.isScene!==!0&&(N=tt),D.resetTextureUnits();const ge=N.fog,ye=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?N.environment:null,ve=k===null?b.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Rs,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Re=Z.get(W.envMap||ye,Ae),Ve=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,We=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Le=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,bt=!!X.morphAttributes.color;let xt=zn;W.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(xt=b.toneMapping);const ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Wt=ct!==void 0?ct.length:0,Ce=_.get(W),sn=C.state.lights;if(Ie===!0&&(Ne===!0||E!==V)){const Nt=E===V&&W.id===O;se.setState(W,E,Nt)}let Qe=!1;W.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==sn.state.version||Ce.outputColorSpace!==ve||G.isBatchedMesh&&Ce.batching===!1||!G.isBatchedMesh&&Ce.batching===!0||G.isBatchedMesh&&Ce.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ce.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ce.instancing===!1||!G.isInstancedMesh&&Ce.instancing===!0||G.isSkinnedMesh&&Ce.skinning===!1||!G.isSkinnedMesh&&Ce.skinning===!0||G.isInstancedMesh&&Ce.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ce.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ce.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ce.instancingMorph===!1&&G.morphTexture!==null||Ce.envMap!==Re||W.fog===!0&&Ce.fog!==ge||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==se.numPlanes||Ce.numIntersection!==se.numIntersection)||Ce.vertexAlphas!==Ve||Ce.vertexTangents!==We||Ce.morphTargets!==Le||Ce.morphNormals!==at||Ce.morphColors!==bt||Ce.toneMapping!==xt||Ce.morphTargetsCount!==Wt)&&(Qe=!0):(Qe=!0,Ce.__version=W.version);let yn=Ce.currentProgram;Qe===!0&&(yn=Nr(W,N,G));let In=!1,Ti=!1,Ji=!1;const lt=yn.getUniforms(),Ht=Ce.uniforms;if(ie.useProgram(yn.program)&&(In=!0,Ti=!0,Ji=!0),W.id!==O&&(O=W.id,Ti=!0),In||V!==E){ie.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),lt.setValue(L,"projectionMatrix",E.projectionMatrix),lt.setValue(L,"viewMatrix",E.matrixWorldInverse);const ci=lt.map.cameraPosition;ci!==void 0&&ci.setValue(L,$e.setFromMatrixPosition(E.matrixWorld)),j.logarithmicDepthBuffer&&lt.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&lt.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),V!==E&&(V=E,Ti=!0,Ji=!0)}if(Ce.needsLights&&(sn.state.directionalShadowMap.length>0&&lt.setValue(L,"directionalShadowMap",sn.state.directionalShadowMap,D),sn.state.spotShadowMap.length>0&&lt.setValue(L,"spotShadowMap",sn.state.spotShadowMap,D),sn.state.pointShadowMap.length>0&&lt.setValue(L,"pointShadowMap",sn.state.pointShadowMap,D)),G.isSkinnedMesh){lt.setOptional(L,G,"bindMatrix"),lt.setOptional(L,G,"bindMatrixInverse");const Nt=G.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),lt.setValue(L,"boneTexture",Nt.boneTexture,D))}G.isBatchedMesh&&(lt.setOptional(L,G,"batchingTexture"),lt.setValue(L,"batchingTexture",G._matricesTexture,D),lt.setOptional(L,G,"batchingIdTexture"),lt.setValue(L,"batchingIdTexture",G._indirectTexture,D),lt.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&lt.setValue(L,"batchingColorTexture",G._colorsTexture,D));const ai=X.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&ce.update(G,X,yn),(Ti||Ce.receiveShadow!==G.receiveShadow)&&(Ce.receiveShadow=G.receiveShadow,lt.setValue(L,"receiveShadow",G.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&N.environment!==null&&(Ht.envMapIntensity.value=N.environmentIntensity),Ht.dfgLUT!==void 0&&(Ht.dfgLUT.value=J_()),Ti&&(lt.setValue(L,"toneMappingExposure",b.toneMappingExposure),Ce.needsLights&&Tf(Ht,Ji),ge&&W.fog===!0&&we.refreshFogUniforms(Ht,ge),we.refreshMaterialUniforms(Ht,W,Oe,xe,C.state.transmissionRenderTarget[E.id]),Eo.upload(L,vl(Ce),Ht,D)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Eo.upload(L,vl(Ce),Ht,D),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&lt.setValue(L,"center",G.center),lt.setValue(L,"modelViewMatrix",G.modelViewMatrix),lt.setValue(L,"normalMatrix",G.normalMatrix),lt.setValue(L,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Nt=W.uniformsGroups;for(let ci=0,Qi=Nt.length;ci<Qi;ci++){const _l=Nt[ci];Se.update(_l,yn),Se.bind(_l,yn)}}return yn}function Tf(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function Af(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(E,N,X){const W=_.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),_.get(E.texture).__webglTexture=N,_.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,N){const X=_.get(E);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0};const wf=L.createFramebuffer();this.setRenderTarget=function(E,N=0,X=0){k=E,R=N,F=X;let W=null,G=!1,ge=!1;if(E){const ve=_.get(E);if(ve.__useDefaultFramebuffer!==void 0){ie.bindFramebuffer(L.FRAMEBUFFER,ve.__webglFramebuffer),H.copy(E.viewport),U.copy(E.scissor),Q=E.scissorTest,ie.viewport(H),ie.scissor(U),ie.setScissorTest(Q),O=-1;return}else if(ve.__webglFramebuffer===void 0)D.setupRenderTarget(E);else if(ve.__hasExternalTextures)D.rebindTextures(E,_.get(E.texture).__webglTexture,_.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ve=E.depthTexture;if(ve.__boundDepthTexture!==Ve){if(Ve!==null&&_.has(Ve)&&(E.width!==Ve.image.width||E.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(E)}}const Ae=E.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);const Re=_.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Re[N])?W=Re[N][X]:W=Re[N],G=!0):E.samples>0&&D.useMultisampledRTT(E)===!1?W=_.get(E).__webglMultisampledFramebuffer:Array.isArray(Re)?W=Re[X]:W=Re,H.copy(E.viewport),U.copy(E.scissor),Q=E.scissorTest}else H.copy(Y).multiplyScalar(Oe).floor(),U.copy(le).multiplyScalar(Oe).floor(),Q=ue;if(X!==0&&(W=wf),ie.bindFramebuffer(L.FRAMEBUFFER,W)&&ie.drawBuffers(E,W),ie.viewport(H),ie.scissor(U),ie.setScissorTest(Q),G){const ve=_.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ve.__webglTexture,X)}else if(ge){const ve=N;for(let Ae=0;Ae<E.textures.length;Ae++){const Re=_.get(E.textures[Ae]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ae,Re.__webglTexture,X,ve)}}else if(E!==null&&X!==0){const ve=_.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ve.__webglTexture,X)}O=-1},this.readRenderTargetPixels=function(E,N,X,W,G,ge,ye,ve=0){if(!(E&&E.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){ie.bindFramebuffer(L.FRAMEBUFFER,Ae);try{const Re=E.textures[ve],Ve=Re.format,We=Re.type;if(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!j.textureFormatReadable(Ve)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(We)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-W&&X>=0&&X<=E.height-G&&L.readPixels(N,X,W,G,re.convert(Ve),re.convert(We),ge)}finally{const Re=k!==null?_.get(k).__webglFramebuffer:null;ie.bindFramebuffer(L.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(E,N,X,W,G,ge,ye,ve=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae)if(N>=0&&N<=E.width-W&&X>=0&&X<=E.height-G){ie.bindFramebuffer(L.FRAMEBUFFER,Ae);const Re=E.textures[ve],Ve=Re.format,We=Re.type;if(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!j.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Le),L.bufferData(L.PIXEL_PACK_BUFFER,ge.byteLength,L.STREAM_READ),L.readPixels(N,X,W,G,re.convert(Ve),re.convert(We),0);const at=k!==null?_.get(k).__webglFramebuffer:null;ie.bindFramebuffer(L.FRAMEBUFFER,at);const bt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Gp(L,bt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Le),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ge),L.deleteBuffer(Le),L.deleteSync(bt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,N=null,X=0){const W=Math.pow(2,-X),G=Math.floor(E.image.width*W),ge=Math.floor(E.image.height*W),ye=N!==null?N.x:0,ve=N!==null?N.y:0;D.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,ye,ve,G,ge),ie.unbindTexture()};const Cf=L.createFramebuffer(),Rf=L.createFramebuffer();this.copyTextureToTexture=function(E,N,X=null,W=null,G=0,ge=0){let ye,ve,Ae,Re,Ve,We,Le,at,bt;const xt=E.isCompressedTexture?E.mipmaps[ge]:E.image;if(X!==null)ye=X.max.x-X.min.x,ve=X.max.y-X.min.y,Ae=X.isBox3?X.max.z-X.min.z:1,Re=X.min.x,Ve=X.min.y,We=X.isBox3?X.min.z:0;else{const Ht=Math.pow(2,-G);ye=Math.floor(xt.width*Ht),ve=Math.floor(xt.height*Ht),E.isDataArrayTexture?Ae=xt.depth:E.isData3DTexture?Ae=Math.floor(xt.depth*Ht):Ae=1,Re=0,Ve=0,We=0}W!==null?(Le=W.x,at=W.y,bt=W.z):(Le=0,at=0,bt=0);const ct=re.convert(N.format),Wt=re.convert(N.type);let Ce;N.isData3DTexture?(D.setTexture3D(N,0),Ce=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(D.setTexture2DArray(N,0),Ce=L.TEXTURE_2D_ARRAY):(D.setTexture2D(N,0),Ce=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const sn=L.getParameter(L.UNPACK_ROW_LENGTH),Qe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),yn=L.getParameter(L.UNPACK_SKIP_PIXELS),In=L.getParameter(L.UNPACK_SKIP_ROWS),Ti=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Re),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),L.pixelStorei(L.UNPACK_SKIP_IMAGES,We);const Ji=E.isDataArrayTexture||E.isData3DTexture,lt=N.isDataArrayTexture||N.isData3DTexture;if(E.isDepthTexture){const Ht=_.get(E),ai=_.get(N),Nt=_.get(Ht.__renderTarget),ci=_.get(ai.__renderTarget);ie.bindFramebuffer(L.READ_FRAMEBUFFER,Nt.__webglFramebuffer),ie.bindFramebuffer(L.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let Qi=0;Qi<Ae;Qi++)Ji&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(E).__webglTexture,G,We+Qi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(N).__webglTexture,ge,bt+Qi)),L.blitFramebuffer(Re,Ve,ye,ve,Le,at,ye,ve,L.DEPTH_BUFFER_BIT,L.NEAREST);ie.bindFramebuffer(L.READ_FRAMEBUFFER,null),ie.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||_.has(E)){const Ht=_.get(E),ai=_.get(N);ie.bindFramebuffer(L.READ_FRAMEBUFFER,Cf),ie.bindFramebuffer(L.DRAW_FRAMEBUFFER,Rf);for(let Nt=0;Nt<Ae;Nt++)Ji?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ht.__webglTexture,G,We+Nt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ht.__webglTexture,G),lt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ai.__webglTexture,ge,bt+Nt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ai.__webglTexture,ge),G!==0?L.blitFramebuffer(Re,Ve,ye,ve,Le,at,ye,ve,L.COLOR_BUFFER_BIT,L.NEAREST):lt?L.copyTexSubImage3D(Ce,ge,Le,at,bt+Nt,Re,Ve,ye,ve):L.copyTexSubImage2D(Ce,ge,Le,at,Re,Ve,ye,ve);ie.bindFramebuffer(L.READ_FRAMEBUFFER,null),ie.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else lt?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(Ce,ge,Le,at,bt,ye,ve,Ae,ct,Wt,xt.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Ce,ge,Le,at,bt,ye,ve,Ae,ct,xt.data):L.texSubImage3D(Ce,ge,Le,at,bt,ye,ve,Ae,ct,Wt,xt):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ge,Le,at,ye,ve,ct,Wt,xt.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ge,Le,at,xt.width,xt.height,ct,xt.data):L.texSubImage2D(L.TEXTURE_2D,ge,Le,at,ye,ve,ct,Wt,xt);L.pixelStorei(L.UNPACK_ROW_LENGTH,sn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Qe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,yn),L.pixelStorei(L.UNPACK_SKIP_ROWS,In),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ti),ge===0&&N.generateMipmaps&&L.generateMipmap(Ce),ie.unbindTexture()},this.initRenderTarget=function(E){_.get(E).__webglFramebuffer===void 0&&D.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?D.setTextureCube(E,0):E.isData3DTexture?D.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?D.setTexture2DArray(E,0):D.setTexture2D(E,0),ie.unbindTexture()},this.resetState=function(){R=0,F=0,k=null,ie.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const La=new Map;function eS(i){if(!Zi())return null;const e=i.toUpperCase();if(e==="-"||e==="")return null;if(La.has(e))return La.get(e);const t=Us(e);if(!t)return null;const n=new Image;n.src=t;const s=new Gt(n);return s.wrapS=xr,s.wrapT=xr,s.magFilter=At,s.minFilter=At,n.onload=()=>{s.needsUpdate=!0},n.complete&&(s.needsUpdate=!0),La.set(e,s),s}function xs(i){const e=Wc().get(i.toUpperCase());return e?{w:e.width,h:e.height}:{w:64,h:64}}const bo=.5;function Fo(i,e,t=!1){const n=Math.max(.05,Math.min(1,e/255))*bo,s=eS(i);if(s){const o=new Ps({map:s.clone(),color:new Ke(n,n,n)});return t&&(o.onBeforeCompile=a=>{a.fragmentShader=a.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
           if (sampledDiffuseColor.r < 0.1 && sampledDiffuseColor.g > 0.9 && sampledDiffuseColor.b > 0.9) discard;`)}),o}const r=Math.round(n*180);return new Ps({color:new Ke(`rgb(${r},${r},${Math.round(r*.75)})`)})}function tS(i){P.sectors.forEach((e,t)=>{const n=Cr(t);if(!n.length)return;let s=0,r=0;for(let x=0;x<n.length;x++){const y=Math.abs(wo(n[x]));y>r&&(r=y,s=x)}const o=n[s],a=new jd;a.moveTo(o[0].x,o[0].y);for(let x=1;x<o.length;x++)a.lineTo(o[x].x,o[x].y);for(let x=0;x<n.length;x++){if(x===s)continue;const y=n[x],M=new Rc;M.moveTo(y[0].x,y[0].y);for(let C=1;C<y.length;C++)M.lineTo(y[C].x,y[C].y);a.holes.push(M)}let c;try{c=new ul(a)}catch{return}const l=c.getAttribute("uv"),u=c.getAttribute("position");for(let x=0;x<l.count;x++)l.setXY(x,u.getX(x)/64,u.getY(x)/64);c.rotateX(-Math.PI/2);const d=e.light??160,f=Fo(e.floorTex||"FLOOR4_8",d),h=new Kt(c,f);h.position.y=e.floor??0,h.userData={entityType:"sector",entityId:t,surface:"floor"},i.add(h);const g=c.clone(),v=g.getIndex();if(v){const x=v.array;for(let y=0;y<x.length;y+=3){const M=x[y];x[y]=x[y+2],x[y+2]=M}v.needsUpdate=!0}const p=Fo(e.ceilTex||"CEIL3_5",d),m=new Kt(g,p);m.position.y=e.ceiling??128,m.userData={entityType:"sector",entityId:t,surface:"ceiling"},i.add(m)})}function ps(i,e,t,n,s,r,o,a,c,l,u,d,f,h){if(r<=s)return;const g=Math.sqrt((t-i)**2+(n-e)**2);if(g<.01)return;const v=r-s,{w:p,h:m}=xs(o),x=new Float32Array([i,s,-e,t,s,-n,t,r,-n,i,r,-e]),y=c/p,M=(c+g)/p,C=1-(l+v)/m,T=1-l/m,A=new Float32Array([y,C,M,C,M,T,y,T]),S=[0,1,2,0,2,3],b=new Sn;b.setAttribute("position",new nn(x,3)),b.setAttribute("uv",new nn(A,2)),b.setIndex(S),b.computeVertexNormals();const z=Fo(o,a),R=new Kt(b,z);R.userData={entityType:"linedef",entityId:u,sidedefId:d,surface:f},h.add(R)}function Pu(i,e,t,n,s,r,o,a,c,l,u,d,f,h,g){if(r<=s)return;const v=Math.sqrt((t-i)**2+(n-e)**2);if(v<.01)return;const{w:p,h:m}=xs(o),x=!!(u&16);let y,M;x?(M=s+l,y=M+m):(y=r+l,M=y-m);const C=Math.max(s,M),T=Math.min(r,y);if(T<=C)return;const A=new Float32Array([i,C,-e,t,C,-n,t,T,-n,i,T,-e]),S=c/p,b=(c+v)/p,z=1-(y-T)/m,R=1-(y-C)/m,F=new Float32Array([S,R,b,R,b,z,S,z]),k=[0,1,2,0,2,3],O=new Sn;O.setAttribute("position",new nn(A,3)),O.setAttribute("uv",new nn(F,2)),O.setIndex(k),O.computeVertexNormals();const V=Fo(o,a,!0),H=new Kt(O,V);H.userData={entityType:"linedef",entityId:d,sidedefId:f,surface:h},g.add(H)}function nS(i){P.linedefs.forEach((e,t)=>{const n=P.vertices.get(e.v1),s=P.vertices.get(e.v2);if(!n||!s)return;const r=e.frontSide?P.sidedefs.get(e.frontSide):null,o=e.backSide?P.sidedefs.get(e.backSide):null,a=r!=null&&r.sector?P.sectors.get(r.sector):null,c=o!=null&&o.sector?P.sectors.get(o.sector):null;if(!a&&!c)return;const l=!!(e.flags&8),u=!!(e.flags&16);if(!a){const g=c.floor??0,v=c.ceiling??128,p=c.light??160,m=(o==null?void 0:o.mid)||"STARTAN2",x=(o==null?void 0:o.yoff)??0,y=v-g,M=u?x+xs(m).h-y:x;ps(s.x,s.y,n.x,n.y,g,v,m,p,(o==null?void 0:o.xoff)??0,M,t,e.backSide,"mid",i);return}const d=a.floor??0,f=a.ceiling??128,h=a.light??160;if(c){const g=c.floor??0,v=c.ceiling??128,p=c.light??160;if(f>v&&r){const m=r.upper||"STARTAN2",x=r.yoff??0,y=f-v,M=l?x:x+xs(m).h-y;ps(n.x,n.y,s.x,s.y,v,f,m,h,r.xoff??0,M,t,e.frontSide,"upper",i)}if(g>d&&r){const m=r.lower||"STARTAN2",x=r.yoff??0,y=u?x+f-g:x;ps(n.x,n.y,s.x,s.y,d,g,m,h,r.xoff??0,y,t,e.frontSide,"lower",i)}if(v>f&&o){const m=o.upper||"STARTAN2",x=o.yoff??0,y=v-f,M=l?x:x+xs(m).h-y;ps(s.x,s.y,n.x,n.y,f,v,m,p,o.xoff??0,M,t,e.backSide,"upper",i)}if(d>g&&o){const m=o.lower||"STARTAN2",x=o.yoff??0,y=u?x+v-d:x;ps(s.x,s.y,n.x,n.y,g,d,m,p,o.xoff??0,y,t,e.backSide,"lower",i)}if(r&&r.mid&&r.mid!=="-"){const m=Math.max(d,g),x=Math.min(f,v);Pu(n.x,n.y,s.x,s.y,m,x,r.mid,h,r.xoff??0,r.yoff??0,e.flags,t,e.frontSide,"mid",i)}if(o&&o.mid&&o.mid!=="-"){const m=Math.max(d,g),x=Math.min(f,v);Pu(s.x,s.y,n.x,n.y,m,x,o.mid,p,o.xoff??0,o.yoff??0,e.flags,t,e.backSide,"mid",i)}}else{const g=(r==null?void 0:r.mid)||"STARTAN2",v=(r==null?void 0:r.yoff)??0,p=f-d,m=u?v+xs(g).h-p:v;ps(n.x,n.y,s.x,s.y,d,f,g,h,(r==null?void 0:r.xoff)??0,m,t,e.frontSide,"mid",i)}})}function iS(i,e){let t=0;return P.sectors.forEach((n,s)=>{ti(i,e,s)&&(t=n.floor??0)}),t}function sS(i){const e=new Map;P.things.forEach((t,n)=>{const s=Ar[t.type],r=(s==null?void 0:s.cat)||"player",o=(s==null?void 0:s.radius)||16,a=gr[r]||"#fff",c=iS(t.x,t.y),l=wr[t.type],u=l?Oo(l):null;let d;if(u){const f=u.width,h=u.height,g=c+u.topOffset,v=g-h,p=Math.max(v,c)+.1,m=g-p;if(m<=0)return;const x=new Is(f,m);if(v<c){const C=(c-v)/h,T=x.getAttribute("uv");for(let A=0;A<T.count;A++){const S=T.getY(A);T.setY(A,C+S*(1-C))}}let y=e.get(u.name);if(!y){const C=new Image;C.src=u.dataUrl,y=new Gt(C),y.magFilter=At,y.minFilter=At,C.onload=()=>{y.needsUpdate=!0},C.complete&&(y.needsUpdate=!0),e.set(u.name,y)}const M=new Ps({map:y.clone(),transparent:!0,alphaTest:.5,side:wn,color:new Ke(bo,bo,bo)});d=new Kt(x,M),d.position.set(t.x,p+m/2,-t.y)}else{const f=o*2,h=o,g=new Is(h,f),v=new Ps({color:new Ke(a),side:wn,transparent:!0,opacity:.8});d=new Kt(g,v),d.position.set(t.x,c+f/2,-t.y)}d.userData={entityType:"thing",entityId:n,billboard:!0},i.add(d)})}let Ot=null,tr,Mt,cn=null,Ln=!1,Nc=0,Zt,vi=0,Xi=0;const fn={},Lu=300,Iu=.002;let an=!1;const un=new rg,Ni=new Pe;let qs=null,nr=new Pe,Ys=null,Ii=null,Du=0,Ia=null;function Uu(i){if(i.entityType==="sector"&&i.entityId){const e=P.sectors.get(i.entityId);return e?i.surface==="ceiling"?e.ceilTex||"CEIL3_5":e.floorTex||"FLOOR4_8":null}if(i.entityType==="linedef"&&i.sidedefId&&i.surface){const e=P.sidedefs.get(i.sidedefId);return e&&e[i.surface]||null}return null}function Nu(i,e){if(i.entityType==="sector"&&i.entityId){const t=P.sectors.get(i.entityId);if(!t)return;const n=i.surface==="ceiling"?"ceilTex":"floorTex";ht(),Ee(`map/sectors/${i.entityId}`,{...t},{...t,[n]:e}),pt(),pe("sectors").child(i.entityId).update({[n]:e}),Xe(`Pasted ${e} → ${i.surface}`)}else if(i.entityType==="linedef"&&i.sidedefId&&i.surface){const t=P.sidedefs.get(i.sidedefId);if(!t)return;const n=i.surface;ht(),Ee(`map/sidedefs/${i.sidedefId}`,{...t},{...t,[n]:e}),pt(),pe("sidedefs").child(i.sidedefId).update({[n]:e}),Xe(`Pasted ${e} → ${n}`)}}function rS(){if(Ot)return;const i=document.getElementById("canvas-wrap");cn=document.createElement("div"),cn.id="view3d-container",cn.style.cssText="position:absolute;inset:0;display:none;z-index:10;cursor:crosshair;",i.style.position="relative",i.appendChild(cn),qs=document.createElement("div"),qs.style.cssText="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;pointer-events:none;z-index:11;border:1px solid rgba(255,255,255,0.4);border-radius:50%;",cn.appendChild(qs),Ot=new Q_({antialias:!0}),Ot.setPixelRatio(window.devicePixelRatio),Ot.setClearColor(1118481),cn.appendChild(Ot.domElement),tr=new rm,tr.fog=new ol(1118481,8e-4),Mt=new pn(90,1,1,2e4),Zt=new Js,tr.add(Zt),tr.add(new ng(16777215,1)),Ot.domElement.addEventListener("click",t=>{if(e){e=!1;return}if(!an){if(Qt==="thing"){un.setFromCamera(nr,Mt);const s=un.intersectObjects(Zt.children,!1);if(s.length>0){const r=s[0].point;ht(),Ba(zt(r.x),zt(-r.z)),pt()}return}un.setFromCamera(nr,Mt);const n=un.intersectObjects(Zt.children,!1);if(n.length>0){const s=n[0].object.userData;if(s.entityType&&s.entityId){const r=s.entityType==="linedef"?"linedef":s.entityType==="sector"?"sector":null;if((r==="sector"||r==="linedef")&&t.shiftKey){const o=Pt===r?new Set(et):new Set,a=Pt===r?new Map(fr):new Map;if((be==null?void 0:be.type)===r&&!o.has(be.id)&&(o.add(be.id),r==="linedef"&&$i)){const c=P.linedefs.get(be.id);if(c){const l=$i==="front"?c.frontSide:c.backSide;l&&a.set(be.id,l)}}o.has(s.entityId)?(o.delete(s.entityId),a.delete(s.entityId)):(o.add(s.entityId),r==="linedef"&&s.sidedefId&&a.set(s.entityId,s.sidedefId)),Bt(o,r),Xf(a),Vt(null),Lt()}else if(r){Bt(new Set);let o=null;if(r==="linedef"&&s.sidedefId){const a=P.linedefs.get(s.entityId);a&&(o=s.sidedefId===a.frontSide?"front":"back")}Vt({type:r,id:s.entityId}),hr(o),Lt(),St()}}}else t.shiftKey||(Bt(new Set),Vt(null),Lt(),St())}});let e=!1;document.addEventListener("pointerlockchange",()=>{const t=an;an=document.pointerLockElement===Ot.domElement,t&&!an&&(e=!0),cn&&(cn.style.cursor=an?"none":"default"),qs&&(qs.style.display=an?"":"none")}),document.addEventListener("mousemove",t=>{if(Ln){if(an)vi+=t.movementX*Iu,Xi-=t.movementY*Iu,Xi=Math.max(-Math.PI*.47,Math.min(Math.PI*.47,Xi));else if(Ot){const n=Ot.domElement.getBoundingClientRect();nr.x=(t.clientX-n.left)/n.width*2-1,nr.y=-((t.clientY-n.top)/n.height)*2+1}}}),Ot.domElement.addEventListener("contextmenu",t=>t.preventDefault()),Ot.domElement.addEventListener("mousedown",t=>{if(an){if(t.button===0&&Qt==="thing"){Ni.set(0,0),un.setFromCamera(Ni,Mt);const n=un.intersectObjects(Zt.children,!1);if(n.length>0){const s=n[0].point;ht(),Ba(zt(s.x),zt(-s.z)),pt()}return}(t.button===0||t.button===2)&&document.exitPointerLock()}else t.button===2&&Ot.domElement.requestPointerLock()}),Ot.domElement.addEventListener("wheel",t=>{if(!an||!Ln)return;t.preventDefault(),Ni.set(0,0),un.setFromCamera(Ni,Mt);const n=un.intersectObjects(Zt.children,!1);if(n.length===0)return;const s=n[0].object.userData;if(s.entityType!=="sector"||!s.entityId)return;const r=P.sectors.get(s.entityId);if(!r)return;const o=t.ctrlKey?Math.max(1,xn/2):xn,a=t.deltaY<0?o:-o,c=s.surface==="ceiling"?"ceiling":"floor",l=(r[c]??(c==="ceiling"?128:0))+a;ht(),Ee(`map/sectors/${s.entityId}`,{...r},{...r,[c]:l}),pt(),pe("sectors").child(s.entityId).update({[c]:l})},{passive:!1}),window.addEventListener("keydown",t=>{if(Ln&&(fn[t.code]=!0,an&&(t.code==="KeyC"||t.code==="KeyV"||t.code==="KeyT"))){Ni.set(0,0),un.setFromCamera(Ni,Mt);const n=un.intersectObjects(Zt.children,!1);if(n.length===0)return;const s=n[0].object.userData;if(t.code==="KeyC"){const r=Uu(s);r&&(Ia=r,Xe(`Copied: ${r}`))}else if(t.code==="KeyV"&&Ia)Nu(s,Ia);else if(t.code==="KeyT"){const r=Uu(s)||"",o=s.entityType==="sector"?"flat":"wall";document.exitPointerLock(),Rr({filter:o,currentValue:r,onSelect:a=>{Nu(s,a),Ot.domElement.requestPointerLock()}})}}}),window.addEventListener("keyup",t=>{fn[t.code]=!1}),window.addEventListener("resize",df)}function df(){if(!Ot||!cn||!Ln)return;const i=cn.clientWidth,e=cn.clientHeight;Ot.setSize(i,e),Mt.aspect=i/e,Mt.updateProjectionMatrix()}function ff(){for(;Zt.children.length;){const i=Zt.children[0];Zt.remove(i),i instanceof Kt&&(i.geometry.dispose(),i.material instanceof Ir&&i.material.dispose())}tS(Zt),nS(Zt),sS(Zt)}const oS=41;function aS(i,e){let t=0;return P.sectors.forEach((n,s)=>{ti(i,e,s)&&(t=n.floor??0)}),t}function cS(){const i=rt.x,e=rt.y,t=aS(i,e);Mt.position.set(i,t+oS,-e),vi=0,Xi=0}let Fc=0;function hf(i){if(!Ln)return;Nc=requestAnimationFrame(hf);const e=Math.min((i-Fc)/1e3,.1);Fc=i;const t=(fn.ShiftLeft||fn.ShiftRight?Lu*3:Lu)*e,n=new B(Math.cos(Xi)*Math.sin(vi),Math.sin(Xi),Math.cos(Xi)*-Math.cos(vi)),s=new B(Math.cos(vi),0,Math.sin(vi)),r=new B(0,1,0);fn.KeyW&&Mt.position.addScaledVector(n,t),fn.KeyS&&Mt.position.addScaledVector(n,-t),fn.KeyA&&Mt.position.addScaledVector(s,-t),fn.KeyD&&Mt.position.addScaledVector(s,t),fn.KeyQ&&Mt.position.addScaledVector(r,t),fn.KeyE&&Mt.position.addScaledVector(r,-t);const o=Mt.position.clone().add(n);Mt.lookAt(o);const a=Ys;Ys&&Ii&&(Ys.material.color.copy(Ii),Ys=null,Ii=null),un.setFromCamera(an?Ni.set(0,0):nr,Mt);const c=un.intersectObjects(Zt.children,!1);if(an)if(c.length>0){const u=c[0].object.userData;if(u.entityType&&u.entityId){const d=u.entityType==="linedef"?"linedef":"sector";let f=null;if(d==="linedef"&&u.sidedefId){const h=P.linedefs.get(u.entityId);h&&(f=u.sidedefId===h.frontSide?"front":"back")}(!be||be.type!==d||be.id!==u.entityId||$i!==f)&&(Vt({type:d,id:u.entityId}),hr(f),Lt())}}else be&&(Vt(null),hr(null),Lt());if(c.length>0&&!c[0].object.userData.billboard){const u=c[0].object;u!==a&&(Du=i);const d=u.material;Ii=d.color.clone(),Ys=u;const f=.12+.12*Math.cos((i-Du)*.004);d.color.setRGB(Ii.r+f,Ii.g+f,Ii.b+f)}const l=new B(Math.sin(vi),0,-Math.cos(vi));for(const u of Zt.children)u.userData.billboard&&u.lookAt(u.position.clone().add(l));Ot.render(tr,Mt)}function pf(){rS(),Ln=!Ln;const i=document.getElementById("canvas");if(Ln)cn.style.display="",i.style.display="none",df(),ff(),cS(),Fc=performance.now(),Nc=requestAnimationFrame(hf),Ot.domElement.requestPointerLock(),Xe("Left-click exit look | Right-click enter look | WASD move | Shift+click multi-select | Tab exit");else{cn.style.display="none",i.style.display="",cancelAnimationFrame(Nc),an&&document.exitPointerLock();for(const e in fn)fn[e]=!1;St()}}function Oc(){return Ln}function lS(){return!Ln||!Mt?null:{x:Mt.position.x,y:-Mt.position.z}}let Fu=0;function uS(){Ln&&(clearTimeout(Fu),Fu=window.setTimeout(ff,100))}function mf(){function i(j){const ie=new Uint8Array(8),w=j==null||j===""?"-":String(j);for(let _=0;_<Math.min(w.length,8);_++)ie[_]=w.charCodeAt(_);return ie}const e=new Map;let t=0;P.vertices.forEach((j,ie)=>e.set(ie,t++));const n=[];P.linedefs.forEach((j,ie)=>{let w=e.get(j.v1),_=e.get(j.v2);w==null||_==null||w===_||n.push({lid:ie,ld:j,v1i:w,v2i:_})});const s=new Map;n.forEach(({lid:j},ie)=>s.set(j,ie));const r=new Set;for(const{ld:j}of n)j.frontSide&&P.sidedefs.has(j.frontSide)&&r.add(j.frontSide),j.backSide&&P.sidedefs.has(j.backSide)&&r.add(j.backSide);const o=new Set;for(const j of r){const ie=P.sidedefs.get(j);ie&&ie.sector&&P.sectors.has(ie.sector)&&o.add(ie.sector)}const a=new Map,c=[];P.sidedefs.forEach((j,ie)=>{r.has(ie)&&(a.set(ie,c.length),c.push(j))});const l=new Map,u=[];P.sectors.forEach((j,ie)=>{o.has(ie)&&(l.set(ie,u.length),u.push(j))});const d=P.vertices.size,f=n.length,h=c.length,g=u.length,v=P.things.size,p=P.linedefs.size-f,m=P.sidedefs.size-h,x=P.sectors.size-g,y=[];v?[...P.things.values()].some(j=>j.type===1)||y.push("No Player 1 Start (thing type 1) — game will crash on load"):y.push("No things placed"),p&&y.push(`${p} degenerate linedef(s) skipped`),m&&y.push(`${m} orphaned sidedef(s) skipped`),x&&y.push(`${x} orphaned sector(s) skipped`);const M=n.filter(({ld:j})=>(!j.frontSide||!a.has(j.frontSide))&&(!j.backSide||!a.has(j.backSide))).length;M&&y.push(`${M} linedef(s) have no valid sidedef`),console.group("[WAD Export]"),console.log(`Exporting: ${d}v ${f}l ${h}sd ${g}s ${v}t`),(p||m||x)&&console.log(`Skipped orphans: ${p}l ${m}sd ${x}s`),y.length&&(console.warn("Issues:"),y.forEach(j=>console.warn("  •",j))),console.groupEnd(),y.some(j=>j.includes("Player 1 Start"))&&Xe("Warning: no Player 1 Start");const C=new ArrayBuffer(v*10),T=new DataView(C);let A=0;P.things.forEach(j=>{T.setInt16(A,Math.round(j.x??0),!0),A+=2,T.setInt16(A,Math.round(j.y??0),!0),A+=2,T.setInt16(A,Math.round(j.angle??0),!0),A+=2,T.setInt16(A,j.type??1,!0),A+=2,T.setInt16(A,j.flags??7,!0),A+=2});const S=new ArrayBuffer(f*14),b=new DataView(S);let z=0;for(const{ld:j,v1i:ie,v2i:w}of n)b.setInt16(z,ie,!0),z+=2,b.setInt16(z,w,!0),z+=2,b.setInt16(z,j.flags??1,!0),z+=2,b.setInt16(z,j.special??0,!0),z+=2,b.setInt16(z,j.tag??0,!0),z+=2,b.setInt16(z,j.frontSide&&a.has(j.frontSide)?a.get(j.frontSide):-1,!0),z+=2,b.setInt16(z,j.backSide&&a.has(j.backSide)?a.get(j.backSide):-1,!0),z+=2;const R=new ArrayBuffer(h*30),F=new DataView(R),k=new Uint8Array(R);let O=0;for(const j of c)F.setInt16(O,j.xoff??0,!0),O+=2,F.setInt16(O,j.yoff??0,!0),O+=2,k.set(i(j.upper),O),O+=8,k.set(i(j.lower),O),O+=8,k.set(i(j.mid),O),O+=8,F.setInt16(O,j.sector!=null?l.get(j.sector)??0:0,!0),O+=2;const V=new ArrayBuffer(d*4),H=new DataView(V);let U=0;P.vertices.forEach(j=>{H.setInt16(U,Math.round(j.x??0),!0),U+=2,H.setInt16(U,Math.round(j.y??0),!0),U+=2});const Q=[];for(const{lid:j,ld:ie,v1i:w,v2i:_}of n){const D=ie.frontSide&&a.has(ie.frontSide),Z=ie.backSide&&a.has(ie.backSide);if(!D&&!Z)continue;const J=P.vertices.get(ie.v1),q=P.vertices.get(ie.v2),Me=q.x-J.x,ae=q.y-J.y,we=Math.round(Math.atan2(ae,Me)/(2*Math.PI)*65536)&65535;D&&Q.push({v1:w,v2:_,angle:we,linedef:s.get(j),side:0,offset:0}),Z&&Q.push({v1:_,v2:w,angle:we+32768&65535,linedef:s.get(j),side:1,offset:0})}const ee=new ArrayBuffer(Q.length*12),de=new DataView(ee);let fe=0;for(const j of Q)de.setInt16(fe,j.v1,!0),fe+=2,de.setInt16(fe,j.v2,!0),fe+=2,de.setUint16(fe,j.angle,!0),fe+=2,de.setInt16(fe,j.linedef,!0),fe+=2,de.setInt16(fe,j.side,!0),fe+=2,de.setInt16(fe,j.offset,!0),fe+=2;const xe=Q.length?new ArrayBuffer(4):new ArrayBuffer(0);if(Q.length){const j=new DataView(xe);j.setInt16(0,Q.length,!0),j.setInt16(2,0,!0)}const Oe=new ArrayBuffer(g*26),nt=new DataView(Oe),ot=new Uint8Array(Oe);let Y=0;for(const j of u)nt.setInt16(Y,j.floor??0,!0),Y+=2,nt.setInt16(Y,j.ceiling??128,!0),Y+=2,ot.set(i(j.floorTex||"FLOOR4_8"),Y),Y+=8,ot.set(i(j.ceilTex||"CEIL3_5"),Y),Y+=8,nt.setInt16(Y,j.light??160,!0),Y+=2,nt.setInt16(Y,j.special??0,!0),Y+=2,nt.setInt16(Y,j.tag??0,!0),Y+=2;const le=new ArrayBuffer(g>0?Math.ceil(g*g/8):0);function ue(){if(!d||!f)return new ArrayBuffer(0);let j=1/0,ie=1/0,w=-1/0,_=-1/0;P.vertices.forEach(ce=>{j=Math.min(j,ce.x),w=Math.max(w,ce.x),ie=Math.min(ie,ce.y),_=Math.max(_,ce.y)});const D=Math.floor(j)-8,Z=Math.floor(ie)-8,J=Math.max(1,Math.ceil((w-D)/128)+1),q=Math.max(1,Math.ceil((_-Z)/128)+1),Me=n.map(({ld:ce},Ue)=>{const I=P.vertices.get(ce.v1),re=P.vertices.get(ce.v2);return{i:Ue,x0:Math.min(I.x,re.x),x1:Math.max(I.x,re.x),y0:Math.min(I.y,re.y),y1:Math.max(I.y,re.y)}}),ae=[];for(let ce=0;ce<q;ce++)for(let Ue=0;Ue<J;Ue++){const I=D+Ue*128,re=I+128,oe=Z+ce*128,Se=oe+128,ne=[0];for(const $ of Me)$.x1>=I&&$.x0<=re&&$.y1>=oe&&$.y0<=Se&&ne.push($.i);ne.push(65535),ae.push(ne)}const we=4+J*q,De=[];let te=we;for(const ce of ae)De.push(te),te+=ce.length;const se=new ArrayBuffer(te*2),_e=new DataView(se);let me=0;_e.setInt16(me,D,!0),me+=2,_e.setInt16(me,Z,!0),me+=2,_e.setInt16(me,J,!0),me+=2,_e.setInt16(me,q,!0),me+=2;for(const ce of De)_e.setUint16(me,ce,!0),me+=2;for(const ce of ae)for(const Ue of ce)_e.setUint16(me,Ue,!0),me+=2;return se}const Be=Tr==="doom1"?"E1M1":"MAP01",Ie=[{name:Be,buf:new ArrayBuffer(0)},{name:"THINGS",buf:C},{name:"LINEDEFS",buf:S},{name:"SIDEDEFS",buf:R},{name:"VERTEXES",buf:V},{name:"SEGS",buf:ee},{name:"SSECTORS",buf:xe},{name:"NODES",buf:new ArrayBuffer(0)},{name:"SECTORS",buf:Oe},{name:"REJECT",buf:le},{name:"BLOCKMAP",buf:ue()}],vt=12+Ie.reduce((j,ie)=>j+ie.buf.byteLength,0),$e=new ArrayBuffer(vt+Ie.length*16),Ye=new DataView($e),tt=new Uint8Array($e);tt.set([80,87,65,68],0),Ye.setInt32(4,Ie.length,!0),Ye.setInt32(8,vt,!0);let ze=12;const ft=[];for(const j of Ie)ft.push({off:ze,size:j.buf.byteLength,name:j.name}),j.buf.byteLength>0&&(tt.set(new Uint8Array(j.buf),ze),ze+=j.buf.byteLength);let L=vt;for(const j of ft)Ye.setInt32(L,j.off,!0),L+=4,Ye.setInt32(L,j.size,!0),L+=4,tt.set(i(j.name),L),L+=8;console.table(ft.map(j=>({lump:j.name,offset:j.off,size:j.size})));let mt=`${Be}: ${d}v ${f}l ${h}sd ${g}s ${v}t`;const je=p+m+x;return je&&(mt+=` (${je} orphans skipped)`),{wad:$e,msg:mt}}function dS(){const i=mf();if(!i)return;const{wad:e,msg:t}=i,n=new Blob([e],{type:"application/octet-stream"}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download="map.wad",s.click(),URL.revokeObjectURL(s.href),Xe(t)}const fS="http://127.0.0.1:3666";async function Bc(i,e){const t=mf();if(!t)return;const{wad:n,msg:s}=t;try{const r=i!=null&&e!=null?`?x=${Math.round(i)}&y=${Math.round(e)}`:"",a=await(await fetch(`${fS}/launch${r}`,{method:"POST",body:new Uint8Array(n)})).json();a.ok?Xe(`Launched (${a.game}) — ${s}`):Xe(`Launch error: ${a.error}`)}catch{Xe("Launcher not running — start launcher/server.js")}}function ms(i,e){Vt({type:i,id:e}),Lt()}function Ou(i,e,t){const n=P.linedefs.get(i);if(!n)return null;const s=P.vertices.get(n.v1),r=P.vertices.get(n.v2);return!s||!r?null:(r.x-s.x)*(t-s.y)-(r.y-s.y)*(e-s.x)<0?"front":"back"}let Di=null,gi={x:0,y:0},Tn=null,vs=null,lo=!1,gf=0,vf=0;function Bu(i){const e=new Set;for(const t of i){const n=P.linedefs.get(t);n&&(e.add(n.v1),e.add(n.v2))}return e}function ku(i){const e=new Set;for(const t of i)for(const n of Xc(t))for(const s of n)e.add(s);return e}function uo(i,e,t){Tn=new Map;let n=null,s=1/0;for(const r of i){const o=P.vertices.get(r);if(!o)continue;Tn.set(r,{x:o.x,y:o.y});const a=Math.hypot(o.x-e,o.y-t);a<s&&(s=a,n=r)}if(n){vs=n;const r=P.vertices.get(n);gi={x:r.x-e,y:r.y-t}}}function hS(i){function e(n){const s=i.getBoundingClientRect();return{sx:n.clientX-s.left,sy:n.clientY-s.top}}i.addEventListener("contextmenu",n=>n.preventDefault()),i.addEventListener("dblclick",n=>{if(Qt!=="select")return;const{sx:s,sy:r}=e(n),{x:o,y:a}=Fi(s,r),c=po(o,a,mo/dt);c!==null&&(xd(c,zt(o),zt(a)),St())}),i.addEventListener("mousemove",n=>{gf=n.clientX,vf=n.clientY;const{sx:s,sy:r}=e(n);if(Gf(Fi(s,r)),document.getElementById("coords").textContent=`${Math.round(rt.x)}, ${Math.round(rt.y)}`,Ku){kt.x=Ks.px+(n.clientX-Ks.mx),kt.y=Ks.py+(n.clientY-Ks.my),St();return}if(Tn&&vs){const o=Tn.get(vs),a=o.x+(rt.x-o.x)+gi.x,c=o.y+(rt.y-o.y)+gi.y,l=n.altKey?a:zt(a),u=n.altKey?c:zt(c),d=l-o.x,f=u-o.y;for(const[h,g]of Tn)pe("vertices").child(h).update({x:g.x+d,y:g.y+f});return}if(Nn){const o=rt.x+gi.x,a=rt.y+gi.y,c=n.altKey?o:zt(o),l=n.altKey?a:zt(a);Nn.type==="vertex"?pe("vertices").child(Nn.id).update({x:c,y:l}):Nn.type==="thing"&&pe("things").child(Nn.id).update({x:c,y:l});return}if(Gi){St();return}if(Qt==="select"){const o=rt.x,a=rt.y,c=mr(o,a,Si/dt),l=c===null?El(o,a,Tl/dt):null,u=c===null&&l===null?po(o,a,mo/dt):null;let d=null;if(c!==null?d={type:"vertex",id:c}:l!==null?d={type:"thing",id:l}:u!==null?d={type:"linedef",id:u}:P.sectors.forEach((f,h)=>{ti(o,a,h)&&(d={type:"sector",id:h})}),(be==null?void 0:be.type)==="linedef"){const f=Ou(be.id,o,a);f!==null&&$i!==f&&(hr(f),Lt())}((Rt==null?void 0:Rt.type)!==(d==null?void 0:d.type)||(Rt==null?void 0:Rt.id)!==(d==null?void 0:d.id))&&(Qu(d),St())}else Qt==="draw"&&St()}),i.addEventListener("mousedown",async n=>{if(n.button===1||n.button===0&&ju){To(!0),Ju({mx:n.clientX,my:n.clientY,px:kt.x,py:kt.y}),n.preventDefault();return}if(n.button===2&&Qt==="draw"){vd().then(()=>St());return}if(n.button!==0)return;const{sx:s,sy:r}=e(n),{x:o,y:a}=Fi(s,r);if(Qt==="select"){const c=mr(o,a,Si/dt),l=El(o,a,Tl/dt),u=po(o,a,mo/dt);if(c!==null&&n.shiftKey){const d=Pt==="vertex"?new Set(et):new Set;(be==null?void 0:be.type)==="vertex"&&!d.has(be.id)&&d.add(be.id),d.has(c)?d.delete(c):d.add(c),Bt(d,"vertex"),Vt(null),Lt()}else if(c!==null&&Pt==="vertex"&&et.size>0&&et.has(c)){Tn=new Map;for(const f of et){const h=P.vertices.get(f);h&&Tn.set(f,{x:h.x,y:h.y})}vs=c;const d=P.vertices.get(c);gi={x:d.x-o,y:d.y-a}}else if(c!==null){Bt(new Set),ms("vertex",c),$o({type:"vertex",id:c});const d=P.vertices.get(c);d&&(Di={...d},gi={x:d.x-o,y:d.y-a})}else if(l!==null){Bt(new Set),ms("thing",l),$o({type:"thing",id:l});const d=P.things.get(l);d&&(Di={...d},gi={x:d.x-o,y:d.y-a})}else if(u!==null&&n.shiftKey){const d=Pt==="linedef"?new Set(et):new Set;(be==null?void 0:be.type)==="linedef"&&!d.has(be.id)&&d.add(be.id),d.has(u)?d.delete(u):d.add(u),Bt(d,"linedef"),Vt(null),Lt()}else if(u!==null&&Pt==="linedef"&&et.has(u))uo(Bu(et),o,a);else if(u!==null)Bt(new Set),hr(Ou(u,o,a)),ms("linedef",u),uo(Bu([u]),o,a);else{let d=null;if(P.sectors.forEach((f,h)=>{ti(o,a,h)&&(d=h)}),d!==null&&n.shiftKey){const f=Pt==="sector"?new Set(et):new Set;(be==null?void 0:be.type)==="sector"&&!f.has(be.id)&&f.add(be.id),f.has(d)?f.delete(d):f.add(d),Bt(f,"sector"),Vt(null),Lt()}else d!==null&&n.ctrlKey&&Pt==="sector"&&et.has(d)?uo(ku(et),o,a):d!==null&&n.ctrlKey?(Bt(new Set),ms("sector",d),uo(ku([d]),o,a)):(lo=n.shiftKey,Ao({x:o,y:a}))}St()}else Qt==="draw"?(await Yh(o,a),St()):Qt==="thing"&&(ht(),Ba(zt(o),zt(a)),pt())}),i.addEventListener("mouseup",()=>{if(To(!1),Gi){const n=Gi,s=rt,r=Math.abs(s.x-n.x),o=Math.abs(s.y-n.y),a=4/dt;if(Ao(null),r<a&&o<a){lo||(Bt(new Set),Vt(null));let c=null;P.sectors.forEach((l,u)=>{ti(n.x,n.y,u)&&(c=u)}),c?ms("sector",c):Lt()}else{lo||Vt(null);const c=Math.min(n.x,s.x),l=Math.max(n.x,s.x),u=Math.min(n.y,s.y),d=Math.max(n.y,s.y),f=lo?new Set(et):new Set;if(P.vertices.forEach((h,g)=>{h.x>=c&&h.x<=l&&h.y>=u&&h.y<=d&&f.add(g)}),f.size===1){const h=[...f][0];Bt(new Set),ms("vertex",h)}else Bt(f,"vertex"),Lt()}St();return}if(Tn&&vs){let n=!1;for(const[s,r]of Tn){const o=P.vertices.get(s);if(o&&(r.x!==o.x||r.y!==o.y)){n=!0;break}}if(n){ht();for(const[s,r]of Tn){const o=P.vertices.get(s);o&&Ee(`map/vertices/${s}`,{...r},{...o})}pt()}Tn=null,vs=null;return}if(Nn&&Di){const n=Nn.type==="vertex"?"vertices":"things",s=P[n].get(Nn.id);s&&(Di.x!==s.x||Di.y!==s.y)&&(ht(),Ee(`map/${n}/${Nn.id}`,Di,{...s}),pt())}$o(null),Di=null});const t=/Mac|iPhone|iPad/.test(navigator.platform);i.addEventListener("wheel",n=>{if(n.preventDefault(),n.ctrlKey||n.metaKey||!t&&!n.shiftKey){const{sx:r,sy:o}=e(n),a=Fi(r,o),c=n.deltaY<0?1.05625:1/1.05625;Zu(Math.max(.05,Math.min(32,dt*c)));const l=Fi(r,o);kt.x+=(l.x-a.x)*dt,kt.y-=(l.y-a.y)*dt}else kt.x-=n.deltaX*1.5,kt.y-=n.deltaY*1.5;St()},{passive:!1})}function pS(i){function e(t){Hf(t),Co(),Qu(null),Bt(new Set),Ao(null),document.querySelectorAll(".tool-btn").forEach(n=>n.classList.toggle("active",n.dataset.tool===t)),i.style.cursor=t==="select"?"crosshair":t==="draw"?`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' fill='white' stroke='black' stroke-width='.5'/%3E%3C/svg%3E") 2 22, crosshair`:"crosshair",St()}return window.addEventListener("keydown",t=>{var n;if(!["INPUT","SELECT","TEXTAREA"].includes(t.target.tagName)){if(t.key==="F5"){t.preventDefault();const r=lS()??rt;let o=!1;P.sectors.forEach((a,c)=>{ti(r.x,r.y,c)&&(o=!0)}),o?Bc(r.x,r.y):Bc();return}if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"&&!t.shiftKey){t.preventDefault(),wh();return}if((t.ctrlKey||t.metaKey)&&(t.key.toLowerCase()==="y"||t.key.toLowerCase()==="z"&&t.shiftKey)){t.preventDefault(),Ch();return}if(t.key===" "){Ml(!0),To(!0),Ju({mx:gf,my:vf,px:kt.x,py:kt.y}),t.preventDefault();return}if(t.key==="Enter"&&Qt==="draw"){vd().then(()=>St());return}if(t.key==="Escape"){Co(),Bt(new Set),Ao(null),St();return}if(t.key==="Delete"||t.key==="Backspace"){et.size>0?Jh():_d();return}if(t.key.toLowerCase()==="m"&&Qt==="select"){if(Pt==="sector")Zh();else if(Pt==="linedef"&&et.size===2){const[s,r]=[...et];Qh(s,r)}else jh();return}if(t.key==="["||t.key==="]"){const s=[1,2,4,8,16,32,64],r=s.indexOf(xn),o=t.key==="["?Math.max(0,r-1):Math.min(s.length-1,r+1);o!==r&&It.ref("settings/snapSize").set(s[o]);return}if(t.key==="Tab"){t.preventDefault(),pf(),(n=document.getElementById("view3d-btn"))==null||n.classList.toggle("active",Oc());return}if(!Oc()){if(t.key.toLowerCase()==="c"){const o=po(rt.x,rt.y,mo/dt);o!==null&&(xd(o,zt(rt.x),zt(rt.y)),St());return}const r={s:"select",d:"draw",t:"thing"}[t.key.toLowerCase()];r&&e(r)}}}),window.addEventListener("keyup",t=>{t.key===" "&&(Ml(!1),To(!1))}),e}function mS(){const i={ld:0,sd:0,sec:0,vt:0},e={flip:0,tex:0};P.linedefs.forEach((o,a)=>{(!P.vertices.has(o.v1)||!P.vertices.has(o.v2))&&(o.frontSide&&pe("sidedefs").child(o.frontSide).remove(),o.backSide&&pe("sidedefs").child(o.backSide).remove(),pe("linedefs").child(a).remove(),i.ld++)}),P.linedefs.forEach((o,a)=>{if(o.frontSide&&o.backSide)return;const c=o.frontSide||o.backSide;if(!c)return;const l=P.sidedefs.get(c);if(!(l!=null&&l.sector))return;const u=P.vertices.get(o.v1),d=P.vertices.get(o.v2),f=d.x-u.x,h=d.y-u.y,g=Math.sqrt(f*f+h*h);if(g===0)return;const v=.1,p=(u.x+d.x)/2+h/g*v,m=(u.y+d.y)/2-f/g*v,x=ti(p,m,l.sector),y=!!o.frontSide;x!==y&&(pe("linedefs").child(a).update({v1:o.v2,v2:o.v1}),e.flip++)}),P.linedefs.forEach(o=>{o.flags&4&&[o.frontSide,o.backSide].forEach(a=>{if(!a)return;const c=P.sidedefs.get(a);if(!c)return;const l={};(!c.upper||c.upper==="-")&&(l.upper="STARTAN2"),(!c.lower||c.lower==="-")&&(l.lower="STARTAN2"),Object.keys(l).length&&(pe("sidedefs").child(a).update(l),e.tex++)})});const t=new Set;P.linedefs.forEach(o=>{o.frontSide&&t.add(o.frontSide),o.backSide&&t.add(o.backSide)}),P.sidedefs.forEach((o,a)=>{t.has(a)||(pe("sidedefs").child(a).remove(),i.sd++)});const n=new Set;P.sidedefs.forEach((o,a)=>{t.has(a)&&o.sector&&P.sectors.has(o.sector)&&n.add(o.sector)}),P.sectors.forEach((o,a)=>{n.has(a)||(pe("sectors").child(a).remove(),i.sec++)});const s=new Set;P.linedefs.forEach(o=>{s.add(o.v1),s.add(o.v2)}),P.vertices.forEach((o,a)=>{s.has(a)||(pe("vertices").child(a).remove(),i.vt++)});const r=[];i.ld+i.sd+i.sec+i.vt&&r.push(`removed ${i.sec}s ${i.sd}sd ${i.ld}l ${i.vt}v`),e.flip&&r.push(`${e.flip} facing flips`),e.tex&&r.push(`${e.tex} texture fixes`),Xe(r.length?"Cleaned: "+r.join(", "):"Map is clean")}const kc=1,xf=["vertices","linedefs","sidedefs","sectors","things"];function gS(i){const e={};return i.forEach((t,n)=>{e[n]=t}),e}function vS(){const i={version:kc,gameType:Tr};for(const r of xf)i[r]=gS(P[r]);const e=JSON.stringify(i,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download="map.json",s.click(),URL.revokeObjectURL(n),Xe("Map exported as JSON")}async function _f(i){const e=await i.text(),t=JSON.parse(e);if(typeof t.version!="number"){Xe("Invalid file: missing version");return}if(t.version>kc){Xe(`File version ${t.version} is newer than supported (${kc})`);return}if(!confirm("Import will replace the current map. Continue?"))return;const n={};for(const s of xf)n["map/"+s]=t[s]??null;(t.gameType==="doom1"||t.gameType==="doom2")&&(n["map/gameType"]=t.gameType),await It.ref().update(n),dd(),Xe("Map imported from JSON")}function xS(){const i=document.createElement("input");i.type="file",i.accept=".json",i.addEventListener("change",async()=>{var t;const e=(t=i.files)==null?void 0:t[0];if(e)try{await _f(e)}catch(n){Xe("Import failed: "+n.message)}}),i.click()}function _S(){document.addEventListener("dragover",i=>{i.preventDefault()}),document.addEventListener("drop",async i=>{var t;i.preventDefault();const e=(t=i.dataTransfer)==null?void 0:t.files[0];if(!(!e||!e.name.endsWith(".json")))try{await _f(e)}catch(n){Xe("Import failed: "+n.message)}})}function SS(i,e,t,n,s,r,o,a){if(i===s&&e===r||i===o&&e===a||t===s&&n===r||t===o&&n===a)return!1;const c=(h,g,v,p,m,x)=>(v-h)*(x-g)-(p-g)*(m-h),l=c(s,r,o,a,i,e),u=c(s,r,o,a,t,n),d=c(i,e,t,n,s,r),f=c(i,e,t,n,o,a);return(l>0&&u<0||l<0&&u>0)&&(d>0&&f<0||d<0&&f>0)}function zu(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const o=t[s].x,a=t[s].y,c=t[r].x,l=t[r].y;a>e!=l>e&&i<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}function Vu(i){const e=[];for(let t=0;t<i.length;t++)e.push([i[t],i[(t+1)%i.length]]);return e}function Hu(i,e){return e.some(t=>t.x===i.x&&t.y===i.y)}function yS(){const i=[],e=[...P.sectors.keys()],t=new Map;for(const n of e)t.set(n,Cr(n));for(let n=0;n<e.length;n++)for(let s=n+1;s<e.length;s++){const r=e[n],o=e[s],a=t.get(r),c=t.get(o),l=a.flat(),u=c.flat();let d=!1;e:for(const f of a)for(const h of c)for(const[g,v]of Vu(f))for(const[p,m]of Vu(h))if(SS(g.x,g.y,v.x,v.y,p.x,p.y,m.x,m.y)){i.push({sectorA:r,sectorB:o,reason:`edges (${g.x},${g.y})-(${v.x},${v.y}) and (${p.x},${p.y})-(${m.x},${m.y}) cross`}),d=!0;break e}if(!d){for(const f of l){if(d)break;if(Hu(f,u))continue;let h=0;for(const g of c)zu(f.x,f.y,g)&&h++;(h&1)===1&&(i.push({sectorA:r,sectorB:o,reason:`vertex (${f.x},${f.y}) of sector ${r} is inside sector ${o}`}),d=!0)}for(const f of u){if(d)break;if(Hu(f,l))continue;let h=0;for(const g of a)zu(f.x,f.y,g)&&h++;(h&1)===1&&(i.push({sectorA:r,sectorB:o,reason:`vertex (${f.x},${f.y}) of sector ${o} is inside sector ${r}`}),d=!0)}}}return i}function MS(i){document.querySelectorAll(".tool-btn").forEach(c=>c.addEventListener("click",()=>i(c.dataset.tool))),document.getElementById("import-wad-btn").addEventListener("click",()=>{const c=document.createElement("input");c.type="file",c.accept=".wad",c.addEventListener("change",async()=>{var u;const l=(u=c.files)==null?void 0:u[0];if(l)try{Xe("Importing WAD...");const{flats:d,walls:f,gameType:h}=await th(l);Xe(`${h==="doom1"?"DOOM":"DOOM 2"}: loaded ${d} flats + ${f} wall textures`),Lt()}catch(d){Xe(`Import failed: ${d.message}`)}}),c.click()}),document.getElementById("thing-type-btn").addEventListener("click",()=>{Lh(()=>i("thing"))}),document.getElementById("view3d-btn").addEventListener("click",()=>{pf(),document.getElementById("view3d-btn").classList.toggle("active",Oc())});const e=document.getElementById("record-btn"),t=document.getElementById("record-modal"),n=document.getElementById("record-output");let s=[],r="recorded test case";e.addEventListener("click",()=>{Ih()?(s=Uh(),e.textContent="Record",e.style.background="#2a1a1a",Xe(`Recording stopped — ${s.length} step(s)`),s.length&&(r=prompt("Test title:")||"recorded test case",n.value=wl(s,r),t.style.display="flex")):(Dh(),e.textContent="● REC",e.style.background="#4a1a1a",Xe("Recording started — draw sectors, split, delete..."))}),document.getElementById("record-copy-test").addEventListener("click",()=>{navigator.clipboard.writeText(wl(s,r)),Xe("Test code copied to clipboard")}),document.getElementById("record-copy-json").addEventListener("click",()=>{navigator.clipboard.writeText(Xh(s)),Xe("JSON recording copied to clipboard")}),document.getElementById("record-close").addEventListener("click",()=>{t.style.display="none"}),document.getElementById("clean-btn").addEventListener("click",mS),document.getElementById("overlap-btn").addEventListener("click",()=>{const c=yS();c.length===0?Xe("No overlapping sectors found"):Xe(`${c.length} overlap(s): ${c.map(l=>l.reason).join("; ")}`)}),document.getElementById("wad-btn").addEventListener("click",dS),document.getElementById("json-export-btn").addEventListener("click",vS),document.getElementById("json-import-btn").addEventListener("click",xS),document.getElementById("play-btn").addEventListener("click",()=>Bc()),document.getElementById("clear-btn").addEventListener("click",()=>{confirm("Clear the entire map? This cannot be undone.")&&(It.ref("map").remove(),Vt(null),Lt())}),document.getElementById("reset-local-btn").addEventListener("click",()=>{confirm("Are you sure? This will reset all your local settings. Make sure all your work is exported to a JSON file!")&&(localStorage.clear(),indexedDB.deleteDatabase("cowad-local"),location.reload())});const o=document.querySelector(".overflow-toggle"),a=document.querySelector(".overflow-dropdown");o.addEventListener("click",()=>a.classList.toggle("open")),document.addEventListener("click",c=>{c.target.closest(".overflow-menu")||a.classList.remove("open")}),a.querySelectorAll("button").forEach(c=>c.addEventListener("click",()=>a.classList.remove("open")))}function Gu(i){return i.replace(/s$/,"")}function ES(i){const e=pe(i);e.on("child_added",t=>{if(P[i].set(t.key,t.val()),i==="linedefs"){const n=t.val();oh(t.key,n.v1,n.v2)}else if(i==="sidedefs"){const n=t.val();lh(t.key,n.sector)}Wi()}),e.on("child_changed",t=>{const n=i==="linedefs"?P.linedefs.get(t.key):void 0,s=i==="sidedefs"?P.sidedefs.get(t.key):void 0;if(P[i].set(t.key,t.val()),i==="linedefs"&&n){const r=t.val();ah(t.key,r.v1,r.v2,n.v1,n.v2)}else if(i==="sidedefs"){const r=t.val();uh(t.key,r.sector,s==null?void 0:s.sector)}if(Wi(),be&&be.type===Gu(i)&&be.id===t.key)Mi();else if(i==="sidedefs"&&(be==null?void 0:be.type)==="linedef"){const r=P.linedefs.get(be.id);r&&(r.frontSide===t.key||r.backSide===t.key)&&Mi()}}),e.on("child_removed",t=>{if(i==="linedefs"){const n=P.linedefs.get(t.key);n&&ch(t.key,n.v1,n.v2)}else if(i==="sidedefs"){const n=P.sidedefs.get(t.key);n&&dh(t.key,n.sector)}P[i].delete(t.key),be&&be.type===Gu(i)&&be.id===t.key&&(Vt(null),Mi()),Wi()})}function bS(){["vertices","linedefs","sidedefs","sectors","things"].forEach(ES),It.ref("settings/snapSize").on("value",i=>{const e=i.val();if(e!=null){$f(e);const t=document.getElementById("snap-size-sel");t&&(t.value=String(e)),Wi()}}),It.ref("map/gameType").on("value",i=>{const e=i.val();(e==="doom1"||e==="doom2")&&ed(e)}),sh().then(md)}function TS(){const i=It.ref("presence/"+Vf);i.set(!0),i.onDisconnect().remove(),It.ref("presence").on("value",e=>{const t=e.numChildren();document.getElementById("users").textContent=t+(t===1?" user":" users")}),It.ref(".info/connected").on("value",e=>{const t=document.getElementById("status");t.textContent=e.val()?"Connected":"Offline",t.className=e.val()?"connected":"disconnected"})}qf({draw:St,renderPanel:Lt,rebuild3D:uS});const ji=document.getElementById("canvas");ph(ji);function Sf(){const i=document.getElementById("canvas-wrap");ji.width=i.clientWidth,ji.height=i.clientHeight,St()}window.addEventListener("resize",Sf);hS(ji);const AS=pS(ji);MS(AS);document.getElementById("snap-size-sel").addEventListener("change",i=>{const e=parseInt(i.target.value,10);It.ref("settings/snapSize").set(e)});_S();function yf(i){const e=[{key:"apiKey",label:"API Key"},{key:"authDomain",label:"Auth Domain"},{key:"databaseURL",label:"Database URL"},{key:"projectId",label:"Project ID"},{key:"storageBucket",label:"Storage Bucket"},{key:"messagingSenderId",label:"Messaging Sender ID"},{key:"appId",label:"App ID"}],t=$u(),n=document.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;display:flex;align-items:center;justify-content:center;";const s=document.createElement("div");s.style.cssText="background:#1a1a1a;border:1px solid #444;border-radius:6px;padding:16px;width:420px;font-family:monospace;",s.innerHTML='<div style="color:#ccc;font-size:14px;margin-bottom:12px;">Firebase Configuration</div><div style="color:#888;font-size:11px;margin-bottom:12px;">Find these values in Firebase Console → Project Settings</div>';const r={};for(const l of e){const u=document.createElement("div");u.style.cssText="margin-bottom:8px;",u.innerHTML=`<label style="color:#888;font-size:11px;display:block;margin-bottom:2px;">${l.label}</label>`;const d=document.createElement("input");d.style.cssText="width:100%;box-sizing:border-box;background:#111;color:#ccc;border:1px solid #333;border-radius:3px;padding:4px 6px;font-family:monospace;font-size:12px;",d.placeholder=l.key,t!=null&&t[l.key]&&(d.value=t[l.key]),r[l.key]=d,u.appendChild(d),s.appendChild(u)}const o=document.createElement("div");o.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;";const a=document.createElement("button");a.textContent="Cancel",a.style.cssText="background:#2a1a1a;border:1px solid #644;color:#f88;padding:4px 12px;cursor:pointer;border-radius:3px;font-size:12px;font-family:monospace;",a.onclick=()=>n.remove();const c=document.createElement("button");c.textContent=i?"Connect":"Save",c.style.cssText="background:#1a2a1a;border:1px solid #464;color:#8f8;padding:4px 12px;cursor:pointer;border-radius:3px;font-size:12px;font-family:monospace;",c.onclick=()=>{const l={};for(const u of e){const d=r[u.key].value.trim();if(!d){r[u.key].style.borderColor="#f44";return}l[u.key]=d}Bf(l),i?Yu():n.remove()},o.append(a,c),s.appendChild(o),n.appendChild(s),document.body.appendChild(n),r.apiKey.focus()}const Wu=document.getElementById("status"),wS=document.getElementById("users"),gs=document.getElementById("connect-btn"),Mf=document.getElementById("settings-btn");Mf.style.display="";Mf.addEventListener("click",()=>yf(!1));qu?(TS(),gs.textContent="Disconnect",gs.style.display="",gs.addEventListener("click",zf)):(Wu.textContent="Local",Wu.className="connected",wS.textContent="",gs.textContent="Connect",gs.style.display="",gs.addEventListener("click",()=>{Of()?Yu():yf(!0)}));Sf();kt.x=ji.width/2;kt.y=ji.height/2;St();Da.then(()=>{bS(),pe("vertices").once("value").then(()=>{setTimeout(dd,100)})});
