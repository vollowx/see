var go=o=>{throw TypeError(o)};var Pe=(o,t,e)=>t.has(o)||go("Cannot "+e);var y=(o,t,e)=>(Pe(o,t,"read from private field"),e?e.call(o):t.get(o)),$=(o,t,e)=>t.has(o)?go("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),w=(o,t,e,r)=>(Pe(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),k=(o,t,e)=>(Pe(o,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=globalThis,Xe=le.ShadowRoot&&(le.ShadyCSS===void 0||le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),bo=new WeakMap;let Io=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Xe&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=bo.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&bo.set(e,t))}return t}toString(){return this.cssText}};const Ir=o=>new Io(typeof o=="string"?o:o+"",void 0,Ze),R=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((r,i,s)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new Io(e,o,Ze)},Ur=(o,t)=>{if(Xe)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=le.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,o.appendChild(r)}},_o=Xe?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Ir(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Br,defineProperty:Hr,getOwnPropertyDescriptor:jr,getOwnPropertyNames:Nr,getOwnPropertySymbols:Fr,getPrototypeOf:Wr}=Object,q=globalThis,xo=q.trustedTypes,Vr=xo?xo.emptyScript:"",Oe=q.reactiveElementPolyfillSupport,jt=(o,t)=>o,he={toAttribute(o,t){switch(t){case Boolean:o=o?Vr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Je=(o,t)=>!Br(o,t),wo={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Je};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),q.litPropertyMetadata??(q.litPropertyMetadata=new WeakMap);class ht extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=wo){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&Hr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=jr(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const c=i==null?void 0:i.call(this);s.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??wo}static _$Ei(){if(this.hasOwnProperty(jt("elementProperties")))return;const t=Wr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(jt("properties"))){const e=this.properties,r=[...Nr(e),...Fr(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(_o(i))}else t!==void 0&&e.push(_o(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ur(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var s;const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const n=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:he).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var s;const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=r.getPropertyOptions(i),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)==null?void 0:s.fromAttribute)!==void 0?n.converter:he;this._$Em=i,this[i]=c.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??Je)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i)n.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},ht[jt("elementProperties")]=new Map,ht[jt("finalized")]=new Map,Oe==null||Oe({ReactiveElement:ht}),(q.reactiveElementVersions??(q.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=globalThis,ue=Nt.trustedTypes,$o=ue?ue.createPolicy("lit-html",{createHTML:o=>o}):void 0,Uo="$lit$",G=`lit$${(Math.random()+"").slice(9)}$`,Bo="?"+G,Kr=`<${Bo}>`,st=document,Ft=()=>st.createComment(""),Wt=o=>o===null||typeof o!="object"&&typeof o!="function",Ho=Array.isArray,Gr=o=>Ho(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Se=`[ 	
\f\r]`,Bt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ao=/-->/g,ko=/>/g,et=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Co=/'/g,Eo=/"/g,jo=/^(?:script|style|textarea|title)$/i,qr=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),T=qr(1),Ct=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Po=new WeakMap,rt=st.createTreeWalker(st,129);function No(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $o!==void 0?$o.createHTML(t):t}const Yr=(o,t)=>{const e=o.length-1,r=[];let i,s=t===2?"<svg>":"",n=Bt;for(let c=0;c<e;c++){const a=o[c];let l,h,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===Bt?h[1]==="!--"?n=Ao:h[1]!==void 0?n=ko:h[2]!==void 0?(jo.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=et):h[3]!==void 0&&(n=et):n===et?h[0]===">"?(n=i??Bt,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,l=h[1],n=h[3]===void 0?et:h[3]==='"'?Eo:Co):n===Eo||n===Co?n=et:n===Ao||n===ko?n=Bt:(n=et,i=void 0);const u=n===et&&o[c+1].startsWith("/>")?" ":"";s+=n===Bt?a+Kr:d>=0?(r.push(l),a.slice(0,d)+Uo+a.slice(d)+G+u):a+G+(d===-2?c:u)}return[No(o,s+(o[e]||"<?>")+(t===2?"</svg>":"")),r]};class Vt{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,n=0;const c=t.length-1,a=this.parts,[l,h]=Yr(t,e);if(this.el=Vt.createElement(l,r),rt.currentNode=this.el.content,e===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=rt.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Uo)){const f=h[n++],u=i.getAttribute(d).split(G),m=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:m[2],strings:u,ctor:m[1]==="."?Zr:m[1]==="?"?Jr:m[1]==="@"?Qr:ye}),i.removeAttribute(d)}else d.startsWith(G)&&(a.push({type:6,index:s}),i.removeAttribute(d));if(jo.test(i.tagName)){const d=i.textContent.split(G),f=d.length-1;if(f>0){i.textContent=ue?ue.emptyScript:"";for(let u=0;u<f;u++)i.append(d[u],Ft()),rt.nextNode(),a.push({type:2,index:++s});i.append(d[f],Ft())}}}else if(i.nodeType===8)if(i.data===Bo)a.push({type:2,index:s});else{let d=-1;for(;(d=i.data.indexOf(G,d+1))!==-1;)a.push({type:7,index:s}),d+=G.length-1}s++}}static createElement(t,e){const r=st.createElement("template");return r.innerHTML=t,r}}function Et(o,t,e=o,r){var n,c;if(t===Ct)return t;let i=r!==void 0?(n=e._$Co)==null?void 0:n[r]:e._$Cl;const s=Wt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=i:e._$Cl=i),i!==void 0&&(t=Et(o,i._$AS(o,t.values),i,r)),t}class Xr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=((t==null?void 0:t.creationScope)??st).importNode(e,!0);rt.currentNode=i;let s=rt.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new oe(s,s.nextSibling,this,t):a.type===1?l=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(l=new ti(s,this,t)),this._$AV.push(l),a=r[++c]}n!==(a==null?void 0:a.index)&&(s=rt.nextNode(),n++)}return rt.currentNode=st,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class oe{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Et(this,t,e),Wt(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==Ct&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gr(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==C&&Wt(this._$AH)?this._$AA.nextSibling.data=t:this.T(st.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Vt.createElement(No(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(e);else{const n=new Xr(i,this),c=n.u(this.options);n.p(e),this.T(c),this._$AH=n}}_$AC(t){let e=Po.get(t.strings);return e===void 0&&Po.set(t.strings,e=new Vt(t)),e}k(t){Ho(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new oe(this.S(Ft()),this.S(Ft()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class ye{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=C}_$AI(t,e=this,r,i){const s=this.strings;let n=!1;if(s===void 0)t=Et(this,t,e,0),n=!Wt(t)||t!==this._$AH&&t!==Ct,n&&(this._$AH=t);else{const c=t;let a,l;for(t=s[0],a=0;a<s.length-1;a++)l=Et(this,c[r+a],e,a),l===Ct&&(l=this._$AH[a]),n||(n=!Wt(l)||l!==this._$AH[a]),l===C?t=C:t!==C&&(t+=(l??"")+s[a+1]),this._$AH[a]=l}n&&!i&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Zr extends ye{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}class Jr extends ye{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}}class Qr extends ye{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=Et(this,t,e,0)??C)===Ct)return;const r=this._$AH,i=t===C&&r!==C||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==C&&(r===C||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class ti{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Et(this,t)}}const De=Nt.litHtmlPolyfillSupport;De==null||De(Vt,oe),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.1.2");const ei=(o,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let i=r._$litPart$;if(i===void 0){const s=(e==null?void 0:e.renderBefore)??null;r._$litPart$=i=new oe(t.insertBefore(Ft(),s),s,void 0,e??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class L extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ei(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ct}}var zo;L._$litElement$=!0,L.finalized=!0,(zo=globalThis.litElementHydrateSupport)==null||zo.call(globalThis,{LitElement:L});const Re=globalThis.litElementPolyfillSupport;Re==null||Re({LitElement:L});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oi={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Je},ri=(o=oi,t,e)=>{const{kind:r,metadata:i}=e;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(e.name,o),r==="accessor"){const{name:n}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,o)},init(c){return c!==void 0&&this.P(n,void 0,o),c}}}if(r==="setter"){const{name:n}=e;return function(c){const a=this[n];t.call(this,c),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+r)};function _(o){return(t,e)=>typeof e=="object"?ri(o,t,e):((r,i,s)=>{const n=i.hasOwnProperty(s);return i.constructor.createProperty(s,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(i,s):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oo=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ii(o,t){return(e,r,i)=>{const s=n=>{var c;return((c=n.renderRoot)==null?void 0:c.querySelector(o))??null};if(t){const{get:n,set:c}=typeof r=="object"?e:i??(()=>{const a=Symbol();return{get(){return this[a]},set(l){this[a]=l}}})();return Oo(e,r,{get(){let a=n.call(this);return a===void 0&&(a=s(this),(a!==null||this.hasUpdated)&&c.call(this,a)),a}})}return Oo(e,r,{get(){return s(this)}})}}const p=Symbol("internals"),Rt=o=>{var t,e;class r extends(e=o,t=p,e){constructor(){super(...arguments),this[t]=this.attachInternals()}}return r},Qe=o=>{const e=class e extends o{get form(){return this[p].form}get name(){return this.getAttribute("name")}get validity(){return this[p].validity}get validationMessage(){return this[p].validationMessage}get willValidate(){return this[p].willValidate}checkValidity(){return this[p].checkValidity()}reportValidity(){return this[p].reportValidity()}};e.formAssociated=!0;let t=e;return t},ge=R`
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
`;var si=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,Fo=(o,t,e,r)=>{for(var i=r>1?void 0:r?ni(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&si(t,e,i),i};const ai=Qe(Rt(L));var yt,gt,bt,J,Wo,Vo,Ko;const ho=class ho extends ai{constructor(){super();$(this,J);$(this,yt);$(this,gt);$(this,bt);this.type="button",this.disabled=!1,w(this,yt,k(this,J,Wo).bind(this)),w(this,gt,k(this,J,Vo).bind(this)),w(this,bt,k(this,J,Ko).bind(this)),this[p].role="button",this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",y(this,yt)),this.addEventListener("keyup",y(this,gt)),this.addEventListener("click",y(this,bt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",y(this,yt)),this.removeEventListener("keyup",y(this,gt)),this.removeEventListener("click",y(this,bt))}updated(e){e.has("disabled")&&this.updateInternals()}updateInternals(){this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false"}};yt=new WeakMap,gt=new WeakMap,bt=new WeakMap,J=new WeakSet,Wo=function(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),e.stopPropagation(),e.key==="Enter"&&this.click())},Vo=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),this.click())},Ko=function(){var e;this.type!=="button"&&((e=this[p].form)==null||e[this.type]())},ho.styles=[ge];let nt=ho;Fo([_({reflect:!0})],nt.prototype,"type",2);Fo([_({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);var ci=Object.defineProperty,li=Object.getOwnPropertyDescriptor,di=(o,t,e,r)=>{for(var i=r>1?void 0:r?li(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&ci(t,e,i),i};const to=o=>{class t extends o{constructor(){super(...arguments),this.currentControl=null}connectedCallback(){super.connectedCallback(),this.setCurrentControl(this.$control)}disconnectedCallback(){this.setCurrentControl(null),super.disconnectedCallback()}get $control(){return this.hasAttribute("for")?!this.htmlFor||!this.isConnected?null:this.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentElement}set $control(r){r?this.attach(r):this.detach()}setCurrentControl(r){this.handleControlChange(this.currentControl,r),this.currentControl=r}attach(r){r!==this.currentControl&&(this.setCurrentControl(r),this.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.setAttribute("for","")}handleControlChange(r=null,i=null){}}return di([_({attribute:"for",type:String})],t.prototype,"htmlFor",2),t};let be=!1;window.addEventListener("keydown",()=>be=!0,{capture:!0});window.addEventListener("mousedown",()=>be=!1,{capture:!0});const hi=R`
  :host {
    animation-delay: 0s, calc(var(--md-focus-ring-duration, 600ms) * 0.25);
    animation-duration: calc(var(--md-focus-ring-duration, 600ms) * 0.25),
      calc(var(--md-focus-ring-duration, 600ms) * 0.75);
    animation-timing-function: var(--md-sys-motion-easing-emphasized);
    box-sizing: border-box;
    color: var(--md-focus-ring-color, var(--md-sys-color-secondary));
    display: none;
    pointer-events: none;
    position: absolute;
  }

  :host(:state(visible)) {
    display: flex;
  }

  :host(:not([inward])) {
    animation-name: outward-grow, outward-shrink;
    border-end-end-radius: calc(
      var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-end-start-radius: calc(
      var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-start-end-radius: calc(
      var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    border-start-start-radius: calc(
      var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) +
        var(--md-focus-ring-outward-offset, 2px)
    );
    inset: calc(-1 * var(--md-focus-ring-outward-offset, 2px));
    outline: var(--md-focus-ring-width, 3px) solid currentColor;
  }

  :host([inward]) {
    animation-name: inward-grow, inward-shrink;
    border-end-end-radius: calc(
      var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-end-start-radius: calc(
      var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-start-end-radius: calc(
      var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border-start-start-radius: calc(
      var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) - var(
          --md-focus-ring-inward-offset,
          0px
        )
    );
    border: var(--md-focus-ring-width, 3px) solid currentColor;
    inset: var(--md-focus-ring-inward-offset, 0px);
  }

  @keyframes outward-grow {
    from {
      outline-width: 0;
    }

    to {
      outline-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes outward-shrink {
    from {
      outline-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes inward-grow {
    from {
      border-width: 0;
    }

    to {
      border-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @keyframes inward-shrink {
    from {
      border-width: var(--md-focus-ring-active-width, 8px);
    }
  }

  @media (prefers-reduced-motion) {
    :host {
      animation: none;
    }
  }
`;var ui=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,Go=o=>{throw TypeError(o)},qo=(o,t,e,r)=>{for(var i=r>1?void 0:r?pi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&ui(t,e,i),i},Yo=(o,t,e)=>t.has(o)||Go("Cannot "+e),Te=(o,t,e)=>(Yo(o,t,"read from private field"),e?e.call(o):t.get(o)),ne=(o,t,e)=>t.has(o)?Go("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),Le=(o,t,e)=>(Yo(o,t,"access private method"),e),ze,Ie,Ue,Ht,Xo,Zo,Jo;let pe=class extends to(Rt(L)){constructor(){super(),ne(this,Ht),this.inward=!1,ne(this,ze,Le(this,Ht,Xo).bind(this)),ne(this,Ie,Le(this,Ht,Zo).bind(this)),ne(this,Ue,Le(this,Ht,Jo).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={focusin:Te(this,ze),focusout:Te(this,Ie),pointerdown:Te(this,Ue)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}};ze=new WeakMap;Ie=new WeakMap;Ue=new WeakMap;Ht=new WeakSet;Xo=function(){be&&this[p].states.add("visible")};Zo=function(){this[p].states.delete("visible")};Jo=function(){this[p].states.delete("visible")};pe.styles=[hi];qo([_({type:Boolean,reflect:!0})],pe.prototype,"inward",2);pe=qo([I("md-focus-ring")],pe);const fi=R`
  :host {
    border-radius: inherit;
    display: block;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
  }

  [part~='ripple'] {
    background-image: radial-gradient(
      closest-side,
      var(--md-ripple-color, currentColor) max(calc(100% - 70px), 65%),
      transparent 100%
    );
    left: 0;
    position: absolute;
    top: 0;
  }

  :host::before {
    background-color: var(--md-ripple-color, currentColor);
    border-radius: inherit;
    content: '';
    display: block;
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 67ms linear;
  }

  :host(:state(hover))::before {
    opacity: 0.08;
  }
`;var mi=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,Qo=o=>{throw TypeError(o)},eo=(o,t,e,r)=>{for(var i=r>1?void 0:r?vi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&mi(t,e,i),i},oo=(o,t,e)=>t.has(o)||Qo("Cannot "+e),O=(o,t,e)=>(oo(o,t,"read from private field"),e?e.call(o):t.get(o)),U=(o,t,e)=>t.has(o)?Qo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),re=(o,t,e,r)=>(oo(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),ot=(o,t,e)=>(oo(o,t,"access private method"),e),Kt,Tt,de,Be,He,je,Ne,Fe,j,W,tr,er,or,rr,ir,sr,nr;const yi=450,gi=225,bi=105,_i=375;function xi({x:o,y:t},{x:e,y:r}){return Math.sqrt((o-e)**2+(t-r)**2)}let Gt=class extends to(Rt(L)){constructor(){super(),U(this,W),this.$ripples=[],this.enterBehavior="always",this.spaceBehavior="once",U(this,Kt,!1),U(this,Tt,!1),U(this,de,0),U(this,Be,ot(this,W,tr).bind(this)),U(this,He,ot(this,W,er).bind(this)),U(this,je,ot(this,W,or).bind(this)),U(this,Ne,ot(this,W,rr).bind(this)),U(this,Fe,ot(this,W,ir).bind(this)),U(this,j,ot(this,W,sr).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={keydown:O(this,Be),keyup:O(this,He),pointerenter:O(this,je),pointerleave:O(this,Ne),pointerdown:O(this,Fe)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}addRipple(o=null){const{startCenter:t,endCenter:e,radius:r}=ot(this,W,nr).call(this,o),i=r*2+"px",s=`${t.x-r}px ${t.y-r}px`,n=`${e.x-r}px ${e.y-r}px`,c=document.createElement("div");c.setAttribute("part","ripple"),this.renderRoot.append(c),this.$ripples.push(c),c.animate({opacity:[0,.12]},{duration:bi,easing:"linear",fill:"forwards"}),c.animate({height:[i,i],width:[i,i],translate:[s,n],scale:[.2,1.35]},{duration:yi,easing:"cubic-bezier(0.2, 0, 0, 1)",fill:"forwards"}),re(this,de,Date.now())}removeRipple(o){setTimeout(()=>{const t=o.animate({opacity:[getComputedStyle(o).opacity,"0"]},{duration:_i,fill:"forwards",easing:"linear"});t.onfinish=t.oncancel=()=>o.remove()},Math.max(gi-(Date.now()-O(this,de)),0))}removeRippleAll(){for(const o of this.$ripples.splice(0))this.removeRipple(o)}};Kt=new WeakMap;Tt=new WeakMap;de=new WeakMap;Be=new WeakMap;He=new WeakMap;je=new WeakMap;Ne=new WeakMap;Fe=new WeakMap;j=new WeakMap;W=new WeakSet;tr=function(o){o.key==="Enter"&&this.enterBehavior==="always"||o.key===" "&&this.spaceBehavior==="always"?(this.addRipple(),this.removeRippleAll()):o.key===" "&&this.spaceBehavior==="once"&&(O(this,Kt)||this.addRipple(),re(this,Kt,!0))};er=function(o){o.key===" "&&this.spaceBehavior==="once"&&(re(this,Kt,!1),this.removeRippleAll())};or=function(o){o.pointerType!=="touch"&&(this[p].states.add("hover"),O(this,Tt)&&this.addRipple(o))};rr=function(){this[p].states.delete("hover"),O(this,Tt)&&this.removeRippleAll()};ir=function(o){o.pointerType==="mouse"&&re(this,Tt,!0),document.addEventListener("pointerup",O(this,j)),document.addEventListener("touchcancel",O(this,j)),document.addEventListener("touchend",O(this,j)),document.addEventListener("touchmove",O(this,j)),o.button!==2&&this.addRipple(o)};sr=function(){re(this,Tt,!1),document.removeEventListener("pointerup",O(this,j)),document.removeEventListener("touchcancel",O(this,j)),document.removeEventListener("touchend",O(this,j)),document.removeEventListener("touchmove",O(this,j)),this.removeRippleAll()};nr=function(o=null){const t=this.getBoundingClientRect(),e={x:t.width/2,y:t.height/2},r=!o,i=e;let s=i;r||(s.x=o.clientX-t.left,s.y=o.clientY-t.top);const n=[{x:0,y:0},{x:t.width,y:0},{x:0,y:t.height},{x:t.width,y:t.height}],c=Math.max(...n.map(a=>xi(i,a)));return{startCenter:s,endCenter:i,radius:c}};Gt.styles=[fi];eo([_()],Gt.prototype,"enterBehavior",2);eo([_()],Gt.prototype,"spaceBehavior",2);Gt=eo([I("md-ripple")],Gt);const wi=R`
  :host {
    --_on-color: var(--md-sys-color-on-primary);
    --_color: var(--md-sys-color-primary);

    --_text-color: var(--_on-color);
    --_background-color: var(--_color);
    --_outline-color: var(--md-sys-color-outline);
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--_background-color) var(--_background-opacity, 100%),
      transparent
    );
    border-radius: 9999px;
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_text-color) var(--_text-opacity, 100%),
      transparent
    );
    cursor: pointer;
    display: inline-flex;
    font: var(--md-sys-typography-label-large);
    gap: 8px;
    height: 40px;
    justify-content: center;
    min-width: 64px;
    outline: 0;
    padding-inline: 24px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: box-shadow 280ms var(--md-sys-motion-easing-emphasized);
    user-select: none;
    vertical-align: top;
  }

  :host([color='secondary']) {
    --_on-color: var(--md-sys-color-on-secondary);
    --_color: var(--md-sys-color-secondary);
  }
  :host([color='tertiary']) {
    --_on-color: var(--md-sys-color-on-tertiary);
    --_color: var(--md-sys-color-tertiary);
  }

  :host([variant='tonal']) {
    --_background-color: var(--md-sys-color-secondary-container);
    --_text-color: var(--md-sys-color-on-secondary-container);
  }
  :host([variant='elevated']) {
    --_background-color: var(--md-sys-color-surface-container-low);
    --_text-color: var(--_color);
    box-shadow: var(--md-sys-elevation-shadow-1);
  }
  :host([variant='outlined']) {
    --_background-color: transparent !important;
    --_text-color: var(--_color);
    border-width: 1px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    box-shadow: none !important;
    padding-inline: 23px;
  }
  :host([variant='outlined']) md-focus-ring {
    --md-focus-ring-offset: 3px;
  }
  :host([variant='text']) {
    --_background-color: transparent !important;
    --_text-color: var(--_color);
    box-shadow: none !important;
    padding-inline: 12px;
  }

  @media (hover: hover) and (pointer: fine) {
    :host(:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-1);
    }
    :host([variant='elevated']:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-2);
    }
  }

  :host(:disabled) {
    --_background-color: var(--md-sys-color-on-surface);
    --_background-opacity: 12%;
    --_text-color: var(--md-sys-color-on-surface);
    --_text-opacity: 38%;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
  }
  :host([variant='outlined']:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
  }

  ::slotted([slot='icon']),
  ::slotted([slot='trailingicon']) {
    block-size: 1em;
    fill: currentcolor;
    font-size: 18px;
    inline-size: 1em;
  }
  :host(:not([variant='text'])) ::slotted([slot='icon']) {
    margin-inline-start: -8px;
  }
  :host(:not([variant='text'])) ::slotted([slot='trailingicon']) {
    margin-inline-end: -8px;
  }
`,Lt=R`
  [part~='target'] {
    box-sizing: border-box;
    content: '';
    height: 100%;
    left: 50%;
    min-height: 48px;
    min-width: 48px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;var $i=Object.defineProperty,Ai=Object.getOwnPropertyDescriptor,ki=Object.getPrototypeOf,Ci=Reflect.get,ro=(o,t,e,r)=>{for(var i=r>1?void 0:r?Ai(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&$i(t,e,i),i},Ei=(o,t,e)=>Ci(ki(o),e,t);let it=class extends nt{constructor(){super(...arguments),this.variant="filled",this.color="primary"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `}};it.styles=[...Ei(it,it,"styles"),Lt,wi];ro([_({reflect:!0})],it.prototype,"variant",2);ro([_({reflect:!0})],it.prototype,"color",2);it=ro([I("md-button")],it);const Pi=R`
  :host {
    --_text-color: var(--md-sys-color-primary);
    --_background-color: var(--md-sys-color-surface-container-high);
    --_size: 56px;
    --_border-radius: 16px;
    --_icon-size: 24px;
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--_background-color) var(--_background-opacity, 100%),
      transparent
    );
    border-radius: var(--_border-radius);
    box-shadow: var(--md-sys-elevation-shadow-3);
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_text-color) var(--_text-opacity, 100%),
      transparent
    );
    cursor: pointer;
    display: inline-flex;
    font: var(--md-sys-typography-label-large);
    gap: 8px; /* 12px (origin) - 4px (label) */
    height: var(--_size);
    justify-content: center;
    min-width: var(--_size);
    outline: 0;
    padding-inline: calc((var(--_size) - var(--_icon-size)) / 2);
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: box-shadow 280ms var(--md-sys-motion-easing-emphasized);
    user-select: none;
    vertical-align: middle;
  }

  :host([lowered]) {
    --_background-color: var(--md-sys-color-surface-container-low);
    box-shadow: var(--md-sys-elevation-shadow-1);
  }

  :host([size='small']) {
    --_size: 40px;
    --_border-radius: 12px;
  }
  :host([size='large']) {
    --_size: 96px;
    --_border-radius: 28px;
    --_icon-size: 36px;
  }

  :host([color='primary']) {
    --_text-color: var(--md-sys-color-on-primary);
    --_background-color: var(--md-sys-color-primary);
  }
  :host([color='secondary']) {
    --_text-color: var(--md-sys-color-on-secondary);
    --_background-color: var(--md-sys-color-secondary);
  }
  :host([color='tertiary']) {
    --_text-color: var(--md-sys-color-on-tertiary);
    --_background-color: var(--md-sys-color-tertiary);
  }

  :host(:disabled) {
    --_background-color: var(--md-sys-color-on-surface);
    --_background-opacity: 12%;
    --_text-color: var(--md-sys-color-on-surface);
    --_text-opacity: 38%;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-4);
    }
    :host([lowered]:hover:not(:active)) {
      box-shadow: var(--md-sys-elevation-shadow-2);
    }
  }

  md-focus-ring {
    --md-focus-ring-shape: var(--_border-radius);
  }

  ::slotted(:not([slot='label'])) {
    block-size: 1em;
    display: inline-flex;
    fill: currentcolor;
    font-size: var(--_icon-size);
    inline-size: 1em;
  }
  ::slotted([slot='label']) {
    margin-inline: 4px;
  }
`;var Oi=Object.defineProperty,Si=Object.getOwnPropertyDescriptor,Di=Object.getPrototypeOf,Ri=Reflect.get,_e=(o,t,e,r)=>{for(var i=r>1?void 0:r?Si(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Oi(t,e,i),i},Ti=(o,t,e)=>Ri(Di(o),e,t);let Y=class extends nt{constructor(){super(...arguments),this.size="medium",this.color="surface",this.lowered=!1}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" aria-hidden="true"></slot>
      <slot part="label" name="label"></slot>
    `}};Y.styles=[...Ti(Y,Y,"styles"),Lt,Pi];_e([_({reflect:!0})],Y.prototype,"size",2);_e([_({reflect:!0})],Y.prototype,"color",2);_e([_({type:Boolean,reflect:!0})],Y.prototype,"lowered",2);Y=_e([I("md-fab")],Y);const ar=R`
  :host {
    --_background-color: transparent;
    --_text-color: var(--md-sys-color-on-surface-variant);
    --_outline-color: var(--md-sys-color-outline);
    align-items: center;
    background-color: color-mix(
      in srgb,
      var(--_background-color) var(--_background-opacity, 100%),
      transparent
    );
    border-radius: 9999px;
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_text-color) var(--_text-opacity, 100%),
      transparent
    );
    cursor: pointer;
    display: inline-flex;
    height: 40px;
    justify-content: center;
    outline: 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    vertical-align: top;
    width: 40px;
  }
  :host([variant='filled']) {
    --_text-color: var(--md-sys-color-on-primary);
    --_background-color: var(--md-sys-color-primary);
  }
  :host([variant='tonal']) {
    --_background-color: var(--md-sys-color-secondary-container);
    --_text-color: var(--md-sys-color-on-secondary-container);
  }
  :host([variant='outlined']) {
    border-width: 1px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
  }
  :host([variant='outlined']) md-focus-ring {
    --md-focus-ring-offset: 3px;
  }

  :host(:disabled) {
    --_text-color: var(--md-sys-color-on-surface) !important;
    --_text-opacity: 38%;
    cursor: default;
    pointer-events: none;
  }
  :host([variant='filled']:disabled),
  :host([variant='tonal']:disabled) {
    --_background-color: var(--md-sys-color-on-surface);
    --_background-opacity: 12%;
  }
  :host([variant='outlined']:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
  }

  ::slotted(*) {
    block-size: 24px;
    fill: currentcolor;
    font-size: 24px;
    inline-size: 24px;
  }
`;var Li=Object.defineProperty,Mi=Object.getOwnPropertyDescriptor,zi=Object.getPrototypeOf,Ii=Reflect.get,cr=(o,t,e,r)=>{for(var i=r>1?void 0:r?Mi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Li(t,e,i),i},Ui=(o,t,e)=>Ii(zi(o),e,t);let ut=class extends nt{constructor(){super(...arguments),this.variant="standard"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon"></slot>
    `}};ut.styles=[...Ui(ut,ut,"styles"),Lt,ar];cr([_({reflect:!0})],ut.prototype,"variant",2);ut=cr([I("md-icon-button")],ut);var Bi=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,lr=(o,t,e,r)=>{for(var i=r>1?void 0:r?Hi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Bi(t,e,i),i};const ji={true:"checked",false:"unchecked"},Ni=Qe(Rt(L));var _t,xt,V,dr,hr,We;const uo=class uo extends Ni{constructor(){super();$(this,V);$(this,_t);$(this,xt);this.checked=!1,this.disabled=!1,w(this,_t,k(this,V,dr).bind(this)),w(this,xt,k(this,V,hr).bind(this)),this._ignoreClick=!1,this[p].role="switch",this.checked=this.hasAttribute("checked"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",y(this,_t)),this.addEventListener("keydown",y(this,xt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",y(this,_t)),this.removeEventListener("keydown",y(this,xt))}updated(e){(e.has("checked")||e.has("disabled"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].ariaPressed=this.checked?"true":"false",this[p].states.add(`${ji[this[p].ariaPressed]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};_t=new WeakMap,xt=new WeakMap,V=new WeakSet,dr=function(e){e.stopPropagation(),e.preventDefault(),!this._ignoreClick&&k(this,V,We).call(this)},hr=function(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),e.stopPropagation(),k(this,V,We).call(this))},We=function(){this.disabled||(this.checked=!this.checked,this.updateInternals())},uo.styles=[ge];let Pt=uo;lr([_({type:Boolean})],Pt.prototype,"checked",2);lr([_({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);const Fi=R`
  :host(:state(checked)) [part~='icon-unchecked'] {
    display: none;
  }
  :host(:not(:state(checked))) [part~='icon-checked'] {
    display: none;
  }

  :host(:not([variant]):state(checked)),
  :host([variant='standard']:state(checked)) {
    --_text-color: var(--md-sys-color-primary);
  }

  :host([variant='filled']:not(:state(checked))) {
    --_background-color: var(--md-sys-color-surface-container-highest);
    --_text-color: var(--md-sys-color-primary);
  }
  :host([variant='tonal']:not(:state(checked))) {
    --_background-color: var(--md-sys-color-surface-container-highest);
    --_text-color: var(--md-sys-color-on-surface-variant);
  }
  :host([variant='outlined']:state(checked)) {
    --_background-color: var(--md-sys-color-inverse-surface);
    --_outline-color: var(--md-sys-color-inverse-surface);
    --_text-color: var(--md-sys-color-inverse-on-surface);
  }
`;var Wi=Object.defineProperty,Vi=Object.getOwnPropertyDescriptor,Ki=Object.getPrototypeOf,Gi=Reflect.get,ur=(o,t,e,r)=>{for(var i=r>1?void 0:r?Vi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Wi(t,e,i),i},qi=(o,t,e)=>Gi(Ki(o),e,t);let pt=class extends Pt{constructor(){super(),this.variant="standard",this[p].role="button"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `}};pt.styles=[...qi(pt,pt,"styles"),Lt,ar,Fi];ur([_({reflect:!0})],pt.prototype,"variant",2);pt=ur([I("md-icon-button-toggle")],pt);var Yi=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,io=(o,t,e,r)=>{for(var i=r>1?void 0:r?Xi(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Yi(t,e,i),i};const So={true:"checked",false:"unchecked",mixed:"indeterminate"},Zi=Qe(Rt(L));var wt,$t,At,z,pr,fr,mr,Ve;const po=class po extends Zi{constructor(){super();$(this,z);$(this,wt);$(this,$t);$(this,At);this.checked=!1,this.indeterminate=!1,this.disabled=!1,w(this,wt,k(this,z,pr).bind(this)),w(this,$t,k(this,z,fr).bind(this)),w(this,At,k(this,z,mr).bind(this)),this[p].role="checkbox",this.checked=this.hasAttribute("checked"),this.indeterminate=this.hasAttribute("indeterminate"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",y(this,wt)),this.addEventListener("keydown",y(this,$t)),this.addEventListener("keyup",y(this,At))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",y(this,wt)),this.removeEventListener("keydown",y(this,$t)),this.removeEventListener("keyup",y(this,At))}updated(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("was-unchecked"),this[p].states.delete("was-checked"),this[p].states.delete("was-indeterminate"),this[p].states.add(`was-${So[this[p].ariaChecked]}`),this[p].ariaChecked=this.indeterminate?"mixed":this.checked?"true":"false",this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].states.delete("indeterminate"),this[p].states.add(`${So[this[p].ariaChecked]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};wt=new WeakMap,$t=new WeakMap,At=new WeakMap,z=new WeakSet,pr=function(e){e.stopPropagation(),e.preventDefault(),k(this,z,Ve).call(this)},fr=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation())},mr=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),k(this,z,Ve).call(this))},Ve=function(){this.disabled||(this.checked=!this.checked,this.indeterminate=!1,this.updateInternals())},po.styles=[ge];let Ot=po;io([_({type:Boolean})],Ot.prototype,"checked",2);io([_({type:Boolean})],Ot.prototype,"indeterminate",2);io([_({type:Boolean,reflect:!0})],Ot.prototype,"disabled",2);const Ji=R`
  :host {
    --md-focus-ring-radius: 9999px;

    --_container-color: transparent;
    --_outline-color: var(--md-sys-color-on-surface-variant);
    --_mark-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-on-surface);
    --_checkbox-size: 18px;
    background-color: color-mix(
      in srgb,
      var(--_container-color) var(--_container-opacity, 100%),
      transparent
    );
    border-width: var(--md-checkbox-outline-width, 2px);
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-grid;
    height: var(--_checkbox-size);
    margin: 15px;
    outline: 0;
    place-content: center;
    place-items: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 50ms linear,
      border-color 50ms linear;
    user-select: none;
    vertical-align: top;
    width: var(--_checkbox-size);
  }
  :host(:state(checked)),
  :host(:state(indeterminate)) {
    --_container-color: var(--md-sys-color-primary);
    --_outline-color: var(--md-sys-color-primary);
    --_mark-color: var(--md-sys-color-on-primary);
    --_mark-opacity: 100%;
    --_ripple-color: var(--md-sys-color-primary);
  }
  :host([error]) {
    --_outline-color: var(--md-sys-color-error);
    --_mark-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-error);
  }
  :host([error]:state(checked)),
  :host([error]:state(indeterminate)) {
    --_container-color: var(--md-sys-color-error);
    --_outline-color: var(--md-sys-color-error);
    --_mark-color: var(--md-sys-color-on-error);
    --_ripple-color: var(--md-sys-color-error);
  }
  :host(:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 38%;
    --_mark-color: var(--md-sys-color-surface-container-highest);
    cursor: default;
    pointer-events: none;
  }
  :host(:disabled:state(checked)),
  :host(:disabled:state(indeterminate)) {
    --_container-color: var(--md-sys-color-on-surface);
    --_container-opacity: 38%;
    --_outline-color: var(--md-sys-color-surface);
    --_outline-opacity: 0%;
    --_mark-color: var(--md-sys-color-surface);
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover) {
      --_unchecked-outline-color: var(--md-sys-color-on-surface);
    }
  }
  @media (forced-colors: active) {
    :host {
      forced-color-adjust: none;
    }
  }

  :host(:disabled) {
    --_unchecked-container-opacity: 38%;
  }

  [part~='icon'] {
    fill: color-mix(
      in srgb,
      var(--_mark-color) var(--_mark-opacity, 0%),
      transparent
    );
    height: 18px;
    inset: -2px;
    position: absolute;
    transition: fill 50ms linear;
    width: 18px;
  }
  [part~='mark'] {
    transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
    transition-duration: 150ms;
    transition-timing-function: var(
      --md-sys-motion-easing-emphasized-decelerate
    );
  }
  :host(:state(indeterminate)) [part~='mark'] {
    transform: scaleY(-1) translate(4px, -10px) rotate(0deg);
  }
  :host(:state(checked)) [part~='mark'],
  :host(:state(indeterminate)) [part~='mark'] {
    transition-duration: 350ms;
  }
  [part~='mark-short'] {
    height: 0px;
    transition-property: transform, height;
    width: 2px;
  }
  [part~='mark-long'] {
    height: 2px;
    transition-property: transform, width;
    width: 0px;
  }
  :host(:not(:state(checked)):not(:state(indeterminate)):state(was-checked))
    [part~='mark'],
  :host(
      :not(:state(checked)):not(:state(indeterminate)):state(was-indeterminate)
    )
    [part~='mark'] {
    transition-delay: 150ms;
  }
  :host(:state(checked)) [part~='mark-short'] {
    height: 5.6568542495px;
  }
  :host(:state(checked)) [part~='mark-long'] {
    width: 11.313708499px;
  }
  :host(:state(checked):state(was-unchecked)) [part~='mark-short'] {
    transition-property: none;
  }
  :host(:state(indeterminate)) [part~='mark-short'] {
    height: 2px;
  }
  :host(:state(indeterminate)) [part~='mark-long'] {
    width: 10px;
  }
  :host(:state(indeterminate):state(was-unchecked)) [part~='mark-short'] {
    transition-property: height;
  }
  :host(:state(indeterminate):state(was-unchecked)) [part~='mark-long'] {
    transition-property: width;
  }

  md-focus-ring {
    height: 44px;
    inset: unset;
    width: 44px;
  }
  md-ripple {
    --md-ripple-color: var(--_ripple-color);
    border-radius: 9999px;
    height: 40px;
    inset: unset;
    width: 40px;
  }
`;var Qi=Object.defineProperty,ts=Object.getOwnPropertyDescriptor,es=Object.getPrototypeOf,os=Reflect.get,vr=(o,t,e,r)=>{for(var i=r>1?void 0:r?ts(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Qi(t,e,i),i},rs=(o,t,e)=>os(es(o),e,t);let ft=class extends Ot{constructor(){super(...arguments),this.error=!1}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      ${this.renderIcon()}
    `}renderIcon(){return T`
      <svg part="icon" viewBox="0 0 18 18" aria-hidden="true">
        <rect part="mark mark-short"></rect>
        <rect part="mark mark-long"></rect>
      </svg>
    `}};ft.styles=[...rs(ft,ft,"styles"),Lt,Ji];vr([_({type:Boolean,reflect:!0})],ft.prototype,"error",2);ft=vr([I("md-checkbox")],ft);const is=R`
  :host {
    --_outline-color: var(--md-sys-color-outline);
    --_track-color: var(--md-sys-color-surface-container-highest);
    --_thumb-color: var(--md-sys-color-outline);
    --_icon-color: var(--md-sys-color-surface-container-highest);
    --_ripple-color: var(--md-sys-color-on-surface);
    background-color: color-mix(
      in srgb,
      var(--_track-color) var(--_track-opacity, 100%),
      transparent
    );
    border-width: 2px;
    border-style: solid;
    border-color: color-mix(
      in srgb,
      var(--_outline-color) var(--_outline-opacity, 100%),
      transparent
    );
    border-radius: 9999px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-grid;
    height: 32px;
    outline: 0;
    place-content: center;
    place-items: center;
    position: relative;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    transition:
      background-color 67ms linear,
      border-color 67ms linear;
    user-select: none;
    vertical-align: top;
    width: 52px;
  }
  :host(:state(checked)) {
    --_outline-color: var(--md-sys-color-primary);
    --_track-color: var(--md-sys-color-primary);
    --_thumb-color: var(--md-sys-color-on-primary);
    --_icon-color: var(--md-sys-color-on-primary-container);
    --_ripple-color: var(--md-sys-color-primary);
  }
  :host(:disabled) {
    --_outline-color: var(--md-sys-color-on-surface);
    --_outline-opacity: 12%;
    --_track-color: var(--md-sys-color-surface-variant);
    --_track-opacity: 12%;
    --_thumb-color: var(--md-sys-color-on-surface);
    --_thumb-opacity: 38%;
    --_icon-color: var(--md-sys-color-surface-container-highest);
    cursor: default;
    pointer-events: none;
  }
  :host(:disabled:state(checked)) {
    --_outline-color: var(--md-sys-color-surface);
    --_track-color: var(--md-sys-color-on-surface);
    --_thumb-color: var(--md-sys-color-surface);
    --_thumb-opacity: 100%;
    --_icon-color: var(--md-sys-color-on-surface);
  }
  :host([icons]:not(:state(checked)):not([checkedicononly]))
    [part~='icon-off'] {
    --_icon-opacity: 100%;
  }
  :host([icons]:state(checked)) [part~='icon-on'] {
    --_icon-opacity: 100%;
  }
  :host([icons]:state(checked):disabled) [part~='icon-on'] {
    --_icon-opacity: 38%;
  }
  @media (hover: hover) and (pointer: fine) {
    :host(:hover) {
      --_thumb-color: var(--md-sys-color-on-surface-variant);
    }
    :host(:state(checked):hover) {
      --_thumb-color: var(--md-sys-color-primary-container);
    }
  }
  @media (forced-colors: active) {
    :host {
      forced-color-adjust: none;
    }
  }

  [part~='thumb'] {
    --_thumb-diameter: 16px;
    --_thumb-diff-default: 20px;
    background-color: color-mix(
      in srgb,
      var(--_thumb-color) var(--_thumb-opacity, 100%),
      transparent
    );
    border-radius: 50%;
    display: grid;
    height: var(--_thumb-diameter);
    /* FIXME: lightningcss compiles this to stuffs with :lang */
    margin-inline-start: calc(
      var(--_thumb-diff-pointer, 0px) - var(--_thumb-diff-default)
    );
    place-content: center;
    place-items: center;
    position: absolute;
    transition:
      background-color 67ms linear,
      width 250ms var(--md-sys-motion-easing-standard),
      height 250ms var(--md-sys-motion-easing-standard),
      margin 300ms var(--md-sys-motion-overshoot);
    width: var(--_thumb-diameter);
    z-index: 1;
  }
  :host(:state(checked)) [part~='thumb'] {
    --_thumb-diameter: 24px;
    --_thumb-diff-default: -20px;
    background-color: var(--_thumb-color);
  }
  :host([icons]:not([checkedicononly])) [part~='thumb'] {
    --_thumb-diameter: 24px;
  }
  :host(:active) [part~='thumb'] {
    --_thumb-diameter: 28px !important;
    --_thumb-color: var(--md-sys-color-on-surface-variant);
  }
  :host(:state(checked):active) [part~='thumb'] {
    --_thumb-color: var(--md-sys-color-primary-container);
  }

  [part~='icons'] {
    fill: color-mix(
      in srgb,
      var(--_icon-color) var(--_icon-opacity, 0%),
      transparent
    );
    height: 16px;
    position: absolute;
    transition: fill 67ms linear;
    width: 16px;
  }

  md-focus-ring {
    inset: -4px;
  }
  md-ripple {
    color: var(--_ripple-color);
    height: 40px;
    inset: unset;
    width: 40px;
  }
`;var ss=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,so=(o,t,e,r)=>{for(var i=r>1?void 0:r?ns(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&ss(t,e,i),i};let qt=class extends Pt{constructor(){super(...arguments),this.icons=!1,this.checkedIconOnly=!1}render(){return T`
      <md-focus-ring></md-focus-ring>
      <div part="thumb">
        <md-ripple spacebehavior="always"></md-ripple>
        <span part="target"></span>
        ${this.renderOffIcon()}${this.renderOnIcon()}
      </div>
    `}renderOnIcon(){return T`
      <svg part="icons icon-on" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"
        />
      </svg>
    `}renderOffIcon(){return T`
      <svg part="icons icon-off" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"
        />
      </svg>
    `}};qt.styles=[Lt,is];so([_({type:Boolean,reflect:!0})],qt.prototype,"icons",2);so([_({type:Boolean,reflect:!0})],qt.prototype,"checkedIconOnly",2);qt=so([I("md-switch")],qt);const as=Math.min,cs=Math.max,ls={left:"right",right:"left",bottom:"top",top:"bottom"},ds={start:"end",end:"start"};function Do(o,t,e){return cs(o,as(t,e))}function xe(o,t){return typeof o=="function"?o(t):o}function at(o){return o.split("-")[0]}function we(o){return o.split("-")[1]}function yr(o){return o==="x"?"y":"x"}function gr(o){return o==="y"?"height":"width"}function $e(o){return["top","bottom"].includes(at(o))?"y":"x"}function br(o){return yr($e(o))}function hs(o,t,e){e===void 0&&(e=!1);const r=we(o),i=br(o),s=gr(i);let n=i==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[s]>t.floating[s]&&(n=fe(n)),[n,fe(n)]}function us(o){const t=fe(o);return[Ke(o),t,Ke(t)]}function Ke(o){return o.replace(/start|end/g,t=>ds[t])}function ps(o,t,e){const r=["left","right"],i=["right","left"],s=["top","bottom"],n=["bottom","top"];switch(o){case"top":case"bottom":return e?t?i:r:t?r:i;case"left":case"right":return t?s:n;default:return[]}}function fs(o,t,e,r){const i=we(o);let s=ps(at(o),e==="start",r);return i&&(s=s.map(n=>n+"-"+i),t&&(s=s.concat(s.map(Ke)))),s}function fe(o){return o.replace(/left|right|bottom|top/g,t=>ls[t])}function ms(o){return{top:0,right:0,bottom:0,left:0,...o}}function vs(o){return typeof o!="number"?ms(o):{top:o,right:o,bottom:o,left:o}}function me(o){return{...o,top:o.y,left:o.x,right:o.x+o.width,bottom:o.y+o.height}}function Ro(o,t,e){let{reference:r,floating:i}=o;const s=$e(t),n=br(t),c=gr(n),a=at(t),l=s==="y",h=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[c]/2-i[c]/2;let u;switch(a){case"top":u={x:h,y:r.y-i.height};break;case"bottom":u={x:h,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:d};break;case"left":u={x:r.x-i.width,y:d};break;default:u={x:r.x,y:r.y}}switch(we(t)){case"start":u[n]-=f*(e&&l?-1:1);break;case"end":u[n]+=f*(e&&l?-1:1);break}return u}const ys=async(o,t,e)=>{const{placement:r="bottom",strategy:i="absolute",middleware:s=[],platform:n}=e,c=s.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(t));let l=await n.getElementRects({reference:o,floating:t,strategy:i}),{x:h,y:d}=Ro(l,r,a),f=r,u={},m=0;for(let g=0;g<c.length;g++){const{name:b,fn:v}=c[g],{x,y:A,data:S,reset:P}=await v({x:h,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:u,rects:l,platform:n,elements:{reference:o,floating:t}});h=x??h,d=A??d,u={...u,[b]:{...u[b],...S}},P&&m<=50&&(m++,typeof P=="object"&&(P.placement&&(f=P.placement),P.rects&&(l=P.rects===!0?await n.getElementRects({reference:o,floating:t,strategy:i}):P.rects),{x:h,y:d}=Ro(l,f,a)),g=-1)}return{x:h,y:d,placement:f,strategy:i,middlewareData:u}};async function _r(o,t){var e;t===void 0&&(t={});const{x:r,y:i,platform:s,rects:n,elements:c,strategy:a}=o,{boundary:l="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:f=!1,padding:u=0}=xe(t,o),m=vs(u),b=c[f?d==="floating"?"reference":"floating":d],v=me(await s.getClippingRect({element:(e=await(s.isElement==null?void 0:s.isElement(b)))==null||e?b:b.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(c.floating)),boundary:l,rootBoundary:h,strategy:a})),x=d==="floating"?{...n.floating,x:r,y:i}:n.reference,A=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c.floating)),S=await(s.isElement==null?void 0:s.isElement(A))?await(s.getScale==null?void 0:s.getScale(A))||{x:1,y:1}:{x:1,y:1},P=me(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:A,strategy:a}):x);return{top:(v.top-P.top+m.top)/S.y,bottom:(P.bottom-v.bottom+m.bottom)/S.y,left:(v.left-P.left+m.left)/S.x,right:(P.right-v.right+m.right)/S.x}}const gs=function(o){return o===void 0&&(o={}),{name:"flip",options:o,async fn(t){var e,r;const{placement:i,middlewareData:s,rects:n,initialPlacement:c,platform:a,elements:l}=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:g=!0,...b}=xe(o,t);if((e=s.arrow)!=null&&e.alignmentOffset)return{};const v=at(i),x=at(c)===c,A=await(a.isRTL==null?void 0:a.isRTL(l.floating)),S=f||(x||!g?[fe(c)]:us(c));!f&&m!=="none"&&S.push(...fs(c,g,m,A));const P=[c,...S],Q=await _r(t,b),se=[];let zt=((r=s.flip)==null?void 0:r.overflows)||[];if(h&&se.push(Q[v]),d){const tt=hs(i,n,A);se.push(Q[tt[0]],Q[tt[1]])}if(zt=[...zt,{placement:i,overflows:se}],!se.every(tt=>tt<=0)){var fo,mo;const tt=(((fo=s.flip)==null?void 0:fo.index)||0)+1,yo=P[tt];if(yo)return{data:{index:tt,overflows:zt},reset:{placement:yo}};let It=(mo=zt.filter(lt=>lt.overflows[0]<=0).sort((lt,dt)=>lt.overflows[1]-dt.overflows[1])[0])==null?void 0:mo.placement;if(!It)switch(u){case"bestFit":{var vo;const lt=(vo=zt.map(dt=>[dt.placement,dt.overflows.filter(Ut=>Ut>0).reduce((Ut,zr)=>Ut+zr,0)]).sort((dt,Ut)=>dt[1]-Ut[1])[0])==null?void 0:vo[0];lt&&(It=lt);break}case"initialPlacement":It=c;break}if(i!==It)return{reset:{placement:It}}}return{}}}};async function bs(o,t){const{placement:e,platform:r,elements:i}=o,s=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=at(e),c=we(e),a=$e(e)==="y",l=["left","top"].includes(n)?-1:1,h=s&&a?-1:1,d=xe(t,o);let{mainAxis:f,crossAxis:u,alignmentAxis:m}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof m=="number"&&(u=c==="end"?m*-1:m),a?{x:u*h,y:f*l}:{x:f*l,y:u*h}}const _s=function(o){return o===void 0&&(o=0),{name:"offset",options:o,async fn(t){var e,r;const{x:i,y:s,placement:n,middlewareData:c}=t,a=await bs(t,o);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:i+a.x,y:s+a.y,data:{...a,placement:n}}}}},xs=function(o){return o===void 0&&(o={}),{name:"shift",options:o,async fn(t){const{x:e,y:r,placement:i}=t,{mainAxis:s=!0,crossAxis:n=!1,limiter:c={fn:b=>{let{x:v,y:x}=b;return{x:v,y:x}}},...a}=xe(o,t),l={x:e,y:r},h=await _r(t,a),d=$e(at(i)),f=yr(d);let u=l[f],m=l[d];if(s){const b=f==="y"?"top":"left",v=f==="y"?"bottom":"right",x=u+h[b],A=u-h[v];u=Do(x,u,A)}if(n){const b=d==="y"?"top":"left",v=d==="y"?"bottom":"right",x=m+h[b],A=m-h[v];m=Do(x,m,A)}const g=c.fn({...t,[f]:u,[d]:m});return{...g,data:{x:g.x-e,y:g.y-r}}}}},Ge=Math.min,mt=Math.max,ve=Math.round,ae=Math.floor,X=o=>({x:o,y:o});function Mt(o){return xr(o)?(o.nodeName||"").toLowerCase():"#document"}function D(o){var t;return(o==null||(t=o.ownerDocument)==null?void 0:t.defaultView)||window}function K(o){var t;return(t=(xr(o)?o.ownerDocument:o.document)||window.document)==null?void 0:t.documentElement}function xr(o){return o instanceof Node||o instanceof D(o).Node}function N(o){return o instanceof Element||o instanceof D(o).Element}function F(o){return o instanceof HTMLElement||o instanceof D(o).HTMLElement}function To(o){return typeof ShadowRoot>"u"?!1:o instanceof ShadowRoot||o instanceof D(o).ShadowRoot}function ie(o){const{overflow:t,overflowX:e,overflowY:r,display:i}=M(o);return/auto|scroll|overlay|hidden|clip/.test(t+r+e)&&!["inline","contents"].includes(i)}function ws(o){return["table","td","th"].includes(Mt(o))}function Ae(o){return[":popover-open",":modal"].some(t=>{try{return o.matches(t)}catch{return!1}})}function no(o){const t=ao(),e=M(o);return e.transform!=="none"||e.perspective!=="none"||(e.containerType?e.containerType!=="normal":!1)||!t&&(e.backdropFilter?e.backdropFilter!=="none":!1)||!t&&(e.filter?e.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function $s(o){let t=Z(o);for(;F(t)&&!St(t);){if(Ae(t))return null;if(no(t))return t;t=Z(t)}return null}function ao(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function St(o){return["html","body","#document"].includes(Mt(o))}function M(o){return D(o).getComputedStyle(o)}function ke(o){return N(o)?{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop}:{scrollLeft:o.scrollX,scrollTop:o.scrollY}}function Z(o){if(Mt(o)==="html")return o;const t=o.assignedSlot||o.parentNode||To(o)&&o.host||K(o);return To(t)?t.host:t}function wr(o){const t=Z(o);return St(t)?o.ownerDocument?o.ownerDocument.body:o.body:F(t)&&ie(t)?t:wr(t)}function Yt(o,t,e){var r;t===void 0&&(t=[]),e===void 0&&(e=!0);const i=wr(o),s=i===((r=o.ownerDocument)==null?void 0:r.body),n=D(i);return s?t.concat(n,n.visualViewport||[],ie(i)?i:[],n.frameElement&&e?Yt(n.frameElement):[]):t.concat(i,Yt(i,[],e))}function $r(o){const t=M(o);let e=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const i=F(o),s=i?o.offsetWidth:e,n=i?o.offsetHeight:r,c=ve(e)!==s||ve(r)!==n;return c&&(e=s,r=n),{width:e,height:r,$:c}}function co(o){return N(o)?o:o.contextElement}function vt(o){const t=co(o);if(!F(t))return X(1);const e=t.getBoundingClientRect(),{width:r,height:i,$:s}=$r(t);let n=(s?ve(e.width):e.width)/r,c=(s?ve(e.height):e.height)/i;return(!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}const As=X(0);function Ar(o){const t=D(o);return!ao()||!t.visualViewport?As:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function ks(o,t,e){return t===void 0&&(t=!1),!e||t&&e!==D(o)?!1:t}function ct(o,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=!1);const i=o.getBoundingClientRect(),s=co(o);let n=X(1);t&&(r?N(r)&&(n=vt(r)):n=vt(o));const c=ks(s,e,r)?Ar(s):X(0);let a=(i.left+c.x)/n.x,l=(i.top+c.y)/n.y,h=i.width/n.x,d=i.height/n.y;if(s){const f=D(s),u=r&&N(r)?D(r):r;let m=f,g=m.frameElement;for(;g&&r&&u!==m;){const b=vt(g),v=g.getBoundingClientRect(),x=M(g),A=v.left+(g.clientLeft+parseFloat(x.paddingLeft))*b.x,S=v.top+(g.clientTop+parseFloat(x.paddingTop))*b.y;a*=b.x,l*=b.y,h*=b.x,d*=b.y,a+=A,l+=S,m=D(g),g=m.frameElement}}return me({width:h,height:d,x:a,y:l})}function Cs(o){let{elements:t,rect:e,offsetParent:r,strategy:i}=o;const s=i==="fixed",n=K(r),c=t?Ae(t.floating):!1;if(r===n||c&&s)return e;let a={scrollLeft:0,scrollTop:0},l=X(1);const h=X(0),d=F(r);if((d||!d&&!s)&&((Mt(r)!=="body"||ie(n))&&(a=ke(r)),F(r))){const f=ct(r);l=vt(r),h.x=f.x+r.clientLeft,h.y=f.y+r.clientTop}return{width:e.width*l.x,height:e.height*l.y,x:e.x*l.x-a.scrollLeft*l.x+h.x,y:e.y*l.y-a.scrollTop*l.y+h.y}}function Es(o){return Array.from(o.getClientRects())}function kr(o){return ct(K(o)).left+ke(o).scrollLeft}function Ps(o){const t=K(o),e=ke(o),r=o.ownerDocument.body,i=mt(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),s=mt(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let n=-e.scrollLeft+kr(o);const c=-e.scrollTop;return M(r).direction==="rtl"&&(n+=mt(t.clientWidth,r.clientWidth)-i),{width:i,height:s,x:n,y:c}}function Os(o,t){const e=D(o),r=K(o),i=e.visualViewport;let s=r.clientWidth,n=r.clientHeight,c=0,a=0;if(i){s=i.width,n=i.height;const l=ao();(!l||l&&t==="fixed")&&(c=i.offsetLeft,a=i.offsetTop)}return{width:s,height:n,x:c,y:a}}function Ss(o,t){const e=ct(o,!0,t==="fixed"),r=e.top+o.clientTop,i=e.left+o.clientLeft,s=F(o)?vt(o):X(1),n=o.clientWidth*s.x,c=o.clientHeight*s.y,a=i*s.x,l=r*s.y;return{width:n,height:c,x:a,y:l}}function Lo(o,t,e){let r;if(t==="viewport")r=Os(o,e);else if(t==="document")r=Ps(K(o));else if(N(t))r=Ss(t,e);else{const i=Ar(o);r={...t,x:t.x-i.x,y:t.y-i.y}}return me(r)}function Cr(o,t){const e=Z(o);return e===t||!N(e)||St(e)?!1:M(e).position==="fixed"||Cr(e,t)}function Ds(o,t){const e=t.get(o);if(e)return e;let r=Yt(o,[],!1).filter(c=>N(c)&&Mt(c)!=="body"),i=null;const s=M(o).position==="fixed";let n=s?Z(o):o;for(;N(n)&&!St(n);){const c=M(n),a=no(n);!a&&c.position==="fixed"&&(i=null),(s?!a&&!i:!a&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||ie(n)&&!a&&Cr(o,n))?r=r.filter(h=>h!==n):i=c,n=Z(n)}return t.set(o,r),r}function Rs(o){let{element:t,boundary:e,rootBoundary:r,strategy:i}=o;const n=[...e==="clippingAncestors"?Ae(t)?[]:Ds(t,this._c):[].concat(e),r],c=n[0],a=n.reduce((l,h)=>{const d=Lo(t,h,i);return l.top=mt(d.top,l.top),l.right=Ge(d.right,l.right),l.bottom=Ge(d.bottom,l.bottom),l.left=mt(d.left,l.left),l},Lo(t,c,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function Ts(o){const{width:t,height:e}=$r(o);return{width:t,height:e}}function Ls(o,t,e){const r=F(t),i=K(t),s=e==="fixed",n=ct(o,!0,s,t);let c={scrollLeft:0,scrollTop:0};const a=X(0);if(r||!r&&!s)if((Mt(t)!=="body"||ie(i))&&(c=ke(t)),r){const d=ct(t,!0,s,t);a.x=d.x+t.clientLeft,a.y=d.y+t.clientTop}else i&&(a.x=kr(i));const l=n.left+c.scrollLeft-a.x,h=n.top+c.scrollTop-a.y;return{x:l,y:h,width:n.width,height:n.height}}function Me(o){return M(o).position==="static"}function Mo(o,t){return!F(o)||M(o).position==="fixed"?null:t?t(o):o.offsetParent}function Er(o,t){const e=D(o);if(Ae(o))return e;if(!F(o)){let i=Z(o);for(;i&&!St(i);){if(N(i)&&!Me(i))return i;i=Z(i)}return e}let r=Mo(o,t);for(;r&&ws(r)&&Me(r);)r=Mo(r,t);return r&&St(r)&&Me(r)&&!no(r)?e:r||$s(o)||e}const Ms=async function(o){const t=this.getOffsetParent||Er,e=this.getDimensions,r=await e(o.floating);return{reference:Ls(o.reference,await t(o.floating),o.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function zs(o){return M(o).direction==="rtl"}const Is={convertOffsetParentRelativeRectToViewportRelativeRect:Cs,getDocumentElement:K,getClippingRect:Rs,getOffsetParent:Er,getElementRects:Ms,getClientRects:Es,getDimensions:Ts,getScale:vt,isElement:N,isRTL:zs};function Us(o,t){let e=null,r;const i=K(o);function s(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null}function n(c,a){c===void 0&&(c=!1),a===void 0&&(a=1),s();const{left:l,top:h,width:d,height:f}=o.getBoundingClientRect();if(c||t(),!d||!f)return;const u=ae(h),m=ae(i.clientWidth-(l+d)),g=ae(i.clientHeight-(h+f)),b=ae(l),x={rootMargin:-u+"px "+-m+"px "+-g+"px "+-b+"px",threshold:mt(0,Ge(1,a))||1};let A=!0;function S(P){const Q=P[0].intersectionRatio;if(Q!==a){if(!A)return n();Q?n(!1,Q):r=setTimeout(()=>{n(!1,1e-7)},1e3)}A=!1}try{e=new IntersectionObserver(S,{...x,root:i.ownerDocument})}catch{e=new IntersectionObserver(S,x)}e.observe(o)}return n(!0),s}function Bs(o,t,e,r){r===void 0&&(r={});const{ancestorScroll:i=!0,ancestorResize:s=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=!1}=r,l=co(o),h=i||s?[...l?Yt(l):[],...Yt(t)]:[];h.forEach(v=>{i&&v.addEventListener("scroll",e,{passive:!0}),s&&v.addEventListener("resize",e)});const d=l&&c?Us(l,e):null;let f=-1,u=null;n&&(u=new ResizeObserver(v=>{let[x]=v;x&&x.target===l&&u&&(u.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var A;(A=u)==null||A.observe(t)})),e()}),l&&!a&&u.observe(l),u.observe(t));let m,g=a?ct(o):null;a&&b();function b(){const v=ct(o);g&&(v.x!==g.x||v.y!==g.y||v.width!==g.width||v.height!==g.height)&&e(),g=v,m=requestAnimationFrame(b)}return e(),()=>{var v;h.forEach(x=>{i&&x.removeEventListener("scroll",e),s&&x.removeEventListener("resize",e)}),d==null||d(),(v=u)==null||v.disconnect(),u=null,a&&cancelAnimationFrame(m)}}const Hs=_s,js=xs,Ns=gs,Fs=(o,t,e)=>{const r=new Map,i={platform:Is,...e},s={...i.platform,_c:r};return ys(o,t,{...i,platform:s})};var Ws=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,lo=(o,t,e,r)=>{for(var i=r>1?void 0:r?Vs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Ws(t,e,i),i};let ce=0;const Ks=to(Rt(L));var B,H,Xt,Zt,Jt,Qt,te,ee,kt,E,Pr,Or,Sr,Dr,Rr,Tr,Lr,Mr;class Ce extends Ks{constructor(){super();$(this,E);$(this,B);$(this,H);$(this,Xt);$(this,Zt);$(this,Jt);$(this,Qt);$(this,te);$(this,ee);$(this,kt);this.position="top",this.offset=4,this.padding=4,this.showDuration=100,this.hideDuration=100,this.mouseShowDelay=100,this.mouseHideDelay=0,this.focusShowDelay=100,this.focusHideDelay=0,this.touchShowDelay=700,this.touchHideDelay=1500,this.recentlyShowedDelay=800,w(this,B,void 0),w(this,H,void 0),w(this,Xt,k(this,E,Or).bind(this)),w(this,Zt,k(this,E,Sr).bind(this)),w(this,Jt,k(this,E,Dr).bind(this)),w(this,Qt,k(this,E,Rr).bind(this)),w(this,te,k(this,E,Tr).bind(this)),w(this,ee,k(this,E,Lr).bind(this)),w(this,kt,k(this,E,Mr).bind(this)),this[p].role="tooltip"}render(){return T`<slot @slotchange="${k(this,E,Pr)}"></slot>`}set visible(e){e?(this.clearAutoUpdate=Bs(this.$control,this,this.updatePosition.bind(this)),this[p].states.add("showing"),this.updatePosition(),setTimeout(()=>{this[p].states.delete("showing"),this[p].states.add("visible")},this.showDuration)):(this[p].states.add("hiding"),setTimeout(()=>{var r;this[p].states.delete("hiding"),this[p].states.delete("visible"),(r=this.clearAutoUpdate)==null||r.call(this)},this.hideDuration))}handleControlChange(e=null,r=null){const i={focusin:y(this,Xt),focusout:y(this,Zt),pointerenter:y(this,Jt),pointerleave:y(this,Qt),touchstart:y(this,te),touchend:y(this,ee)};Object.keys(i).forEach(s=>{e==null||e.removeEventListener(s,i[s]),r==null||r.addEventListener(s,i[s])}),e&&e.removeAttribute("aria-label"),r&&r.setAttribute("aria-label",this.textContent??"")}updatePosition(){this.$control&&Fs(this.$control,this,{placement:this.position,middleware:[Hs(this.offset),Ns({padding:this.padding}),js({padding:this.padding,crossAxis:!0})]}).then(({x:e,y:r})=>{this.style.top=`${r}px`,this.style.left=`${e}px`})}}B=new WeakMap,H=new WeakMap,Xt=new WeakMap,Zt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap,te=new WeakMap,ee=new WeakMap,kt=new WeakMap,E=new WeakSet,Pr=function(){this.$control.setAttribute("aria-label",this.textContent??"")},Or=function(){be&&(clearTimeout(y(this,H)),w(this,B,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-ce<this.recentlyShowedDelay?0:this.focusShowDelay))))},Sr=function(){ce=Date.now(),clearTimeout(y(this,B)),w(this,H,setTimeout(()=>{this.visible=!1},this.focusHideDelay))},Dr=function(e){e.pointerType!=="touch"&&(clearTimeout(y(this,H)),w(this,B,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-ce<this.recentlyShowedDelay?0:this.mouseShowDelay))))},Rr=function(e){e.pointerType!=="touch"&&(ce=Date.now(),clearTimeout(y(this,B)),w(this,H,setTimeout(()=>{this.visible=!1},this.mouseHideDelay)))},Tr=function(){clearTimeout(y(this,H)),w(this,B,setTimeout(()=>{this.visible=!0,addEventListener("click",y(this,kt))},this.touchShowDelay))},Lr=function(){clearTimeout(y(this,B)),w(this,H,setTimeout(()=>{this.visible=!1},this.touchHideDelay))},Mr=function(e){e.composedPath().includes(this.$control)||(this.visible=!1,removeEventListener("click",y(this,kt)))};lo([ii("slot")],Ce.prototype,"$slot",2);lo([_({reflect:!0})],Ce.prototype,"position",2);lo([_({type:Number,reflect:!0})],Ce.prototype,"offset",2);const Gs=R`
  :host {
    align-items: center;
    background-color: var(--md-sys-color-inverse-surface);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--md-sys-color-inverse-on-surface);
    display: none;
    font: var(--md-sys-typography-body-small);
    left: 0;
    max-width: var(--_max-width, 300px);
    min-height: 24px;
    opacity: 0;
    padding: 4px 8px;
    position: absolute;
    top: 0;
    transition: opacity 67ms linear;
    z-index: 9999;
  }
  :host(:state(showing)),
  :host(:state(visible)) {
    display: flex;
    opacity: 1;
  }
  :host(:state(hiding)) {
    display: flex;
    opacity: 0;
  }
`;var qs=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,Xs=(o,t,e,r)=>{for(var i=r>1?void 0:r?Ys(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&qs(t,e,i),i};let qe=class extends Ce{};qe.styles=[Gs];qe=Xs([I("md-tooltip")],qe);const Zs=R`
  :host {
    --_container-color: var(
      --md-toolbar-container-color,
      var(--md-sys-color-surface-container)
    );
    --_on-color: var(
      --md-toolbar-on-color,
      var(--md-sys-color-on-surface)
    );
    align-items: center;
    box-sizing: border-box;
    color: color-mix(
      in srgb,
      var(--_on-color) var(--_on-opacity, 100%),
      transparent
    );
    display: flex;
    height: 64px;
    width: 100%;
    background-color: color-mix(
      in srgb,
      var(--_container-color) var(--_container-opacity, 100%),
      transparent
    );
  }

  :host(:not([type='floating'])) {
    --_padding: 16px;
    --_gap: 32px;
  }
  :host([type='floating']) {
    --_padding: 8px;
    --_gap: 4px;
    --_container-color: var(
      --md-toolbar-container-color,
      var(--md-sys-color-surface-container-high)
    );
    background: transparent;
    box-shadow: none;
    max-width: calc(100% - 32px);
    width: fit-content;
  }
  :host([type='floating'][orientation='vertical']) {
    align-items: stretch;
    flex-direction: column;
    min-height: auto;
    width: 56px;
  }

  /* @TODO: Not done yet */
  :host([color='vibrant']) {
    --_container-color: var(
      --md-toolbar-container-color,
      var(--md-sys-color-primary-container)
    );
    --_on-color: var(
      --md-toolbar-on-color,
      var(--md-sys-color-on-primary-container)
    );
  }

  [part='container'] {
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    gap: var(--_gap);
    height: 56px;
    width: 100%;
    padding: 0 var(--_padding);
  }
  :host([type='floating']) [part='container'] {
    background-color: color-mix(
      in srgb,
      var(--_container-color) var(--_container-opacity, 100%),
      transparent
    );
    border-radius: var(--md-toolbar-shape, 28px);
    box-shadow: var(--md-toolbar-shadow, var(--md-sys-elevation-shadow-3));
    width: fit-content;
  }

  [part='fab-slot'] {
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }
  :host(:not([orientation='vertical'])) ::slotted([slot='fab']) {
    margin-inline-start: 8px;
  }
  :host([orientation='vertical']) ::slotted([slot='fab']) {
    margin-block-start: 8px;
  }
  :host([type='floating'][orientation='vertical']) [part='container'] {
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: var(--_padding) 0;
  }

  ::slotted(md-icon-button-toggle[variant='tonal']:not(:state(checked))) {
    --_background-color: transparent;
  }
`;var Js=Object.defineProperty,Qs=Object.getOwnPropertyDescriptor,Ee=(o,t,e,r)=>{for(var i=r>1?void 0:r?Qs(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Js(t,e,i),i};let Dt=class extends L{constructor(){super(),this.type="docked",this.color="standard",this.orientation="horizontal",this.setAttribute("role","toolbar"),this.setAttribute("aria-orientation",this.orientation)}updated(o){o.has("orientation")&&this.setAttribute("aria-orientation",this.orientation)}render(){return T`
      <div part="container">
        <slot></slot>
      </div>
      <div part="fab-slot">
        <slot name="fab"></slot>
      </div>
    `}};Dt.styles=[ge,Zs];Ee([_({reflect:!0})],Dt.prototype,"type",2);Ee([_({reflect:!0})],Dt.prototype,"color",2);Ee([_({reflect:!0})],Dt.prototype,"orientation",2);Dt=Ee([I("md-toolbar")],Dt);var tn=Object.defineProperty,en=Object.getOwnPropertyDescriptor,on=(o,t,e,r)=>{for(var i=r>1?void 0:r?en(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&tn(t,e,i),i};let Ye=class extends L{render(){return T`
      <div part="contents"><slot></slot></div>
      <div part="controls">
        <div part="controls-header">
          <h3>Playground</h3>
        </div>
        <div part="controls-body">
          <slot name="controls"></slot>
        </div>
      </div>
    `}};Ye.styles=R`
    :host {
      border-radius: 12px;
      display: flex;
      flex-grow: 1;
    }
    :host([hascontrols]) {
      border: 1px solid var(--md-sys-color-outline);
    }

    [part~='contents'] {
      align-items: center;
      display: flex;
      flex-grow: 999;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 24px;
    }
    [part~='controls'] {
      background-color: var(--md-sys-color-surface-container-low);
      border-bottom-right-radius: 12px;
      border-inline-start: 1px solid var(--md-sys-color-outline);
      border-top-right-radius: 12px;
      flex-shrink: 0;
      gap: 16px;
      min-width: 250px;
    }
    :host-context([dir='rtl']) [part~='controls'] {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 0;
      border-top-left-radius: 12px;
      border-top-right-radius: 0;
    }

    [part~='controls-header'] {
      border-bottom: 1px solid var(--md-sys-color-outline);
      padding: 24px;
    }
    [part~='controls-body'] {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
    }
    [part~='controls'] h3 {
      font: var(--md-sys-typography-title-medium);
      margin: 0;
    }
    :host(:not([hascontrols])) [part~='controls'] {
      display: none;
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column;
      }
      [part~='controls'] {
        border-bottom-left-radius: 12px;
        border-inline-start: none;
        border-top: 1px solid var(--md-sys-color-outline);
        border-top-right-radius: 0;
      }
    }
  `;Ye=on([I("dc-demo")],Ye);function rn(){const t=document.body.querySelectorAll("h2, h3, h4, h5, h6"),e=document.getElementById("toc-list");if(!e)throw new Error("Table of Contents container not found.");let r=[e],i=[];t.forEach(s=>{let n=Number(s.localName.replace("h",""))-1,c=s.textContent,a=(s.textContent||"").toLowerCase().replace(/ /g,"-");i[n-1]=a;let l=[...i.slice(0,n-1),a].join("-");s.setAttribute("id",l);let h=document.createElement("a");h.setAttribute("href","#"+l),h.textContent=c;let d=document.createElement("li");d.appendChild(h),n==1?e.appendChild(d):(r[n-1]=document.createElement("ul"),r[n-1].appendChild(d),r[n-2].appendChild(r[n-1]))})}rn();
