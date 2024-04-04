var Ue=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var g=(o,t,e)=>(Ue(o,t,"read from private field"),e?e.call(o):t.get(o)),m=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},x=(o,t,e,r)=>(Ue(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e);var A=(o,t,e)=>(Ue(o,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=globalThis,fo=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mo=Symbol(),Io=new WeakMap;let tr=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==mo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(fo&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Io.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Io.set(e,t))}return t}toString(){return this.cssText}};const Qr=o=>new tr(typeof o=="string"?o:o+"",void 0,mo),T=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new tr(e,o,mo)},ts=(o,t)=>{if(fo)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=re.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,o.appendChild(r)}},Uo=fo?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Qr(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:es,defineProperty:os,getOwnPropertyDescriptor:rs,getOwnPropertyNames:ss,getOwnPropertySymbols:is,getPrototypeOf:ns}=Object,F=globalThis,zo=F.trustedTypes,as=zo?zo.emptyScript:"",ze=F.reactiveElementPolyfillSupport,Lt=(o,t)=>o,ie={toAttribute(o,t){switch(t){case Boolean:o=o?as:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},vo=(o,t)=>!es(o,t),Bo={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:vo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),F.litPropertyMetadata??(F.litPropertyMetadata=new WeakMap);class ct extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Bo){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&os(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:i}=rs(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return s==null?void 0:s.call(this)},set(n){const c=s==null?void 0:s.call(this);i.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Bo}static _$Ei(){if(this.hasOwnProperty(Lt("elementProperties")))return;const t=ns(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Lt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Lt("properties"))){const e=this.properties,r=[...ss(e),...is(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(Uo(s))}else t!==void 0&&e.push(Uo(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ts(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var i;const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){const n=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:ie).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=r.getPropertyOptions(s),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)==null?void 0:i.fromAttribute)!==void 0?n.converter:ie;this._$Em=s,this[s]=c.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??vo)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s)n.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},ct[Lt("elementProperties")]=new Map,ct[Lt("finalized")]=new Map,ze==null||ze({ReactiveElement:ct}),(F.reactiveElementVersions??(F.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=globalThis,ne=Mt.trustedTypes,Ho=ne?ne.createPolicy("lit-html",{createHTML:o=>o}):void 0,er="$lit$",W=`lit$${(Math.random()+"").slice(9)}$`,or="?"+W,cs=`<${or}>`,et=document,It=()=>et.createComment(""),Ut=o=>o===null||typeof o!="object"&&typeof o!="function",rr=Array.isArray,ls=o=>rr(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Be=`[ 	
\f\r]`,Tt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jo=/-->/g,No=/>/g,X=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wo=/'/g,Fo=/"/g,sr=/^(?:script|style|textarea|title)$/i,ds=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),L=ds(1),xt=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Vo=new WeakMap,J=et.createTreeWalker(et,129);function ir(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ho!==void 0?Ho.createHTML(t):t}const hs=(o,t)=>{const e=o.length-1,r=[];let s,i=t===2?"<svg>":"",n=Tt;for(let c=0;c<e;c++){const a=o[c];let l,h,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===Tt?h[1]==="!--"?n=jo:h[1]!==void 0?n=No:h[2]!==void 0?(sr.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=X):h[3]!==void 0&&(n=X):n===X?h[0]===">"?(n=s??Tt,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,l=h[1],n=h[3]===void 0?X:h[3]==='"'?Fo:Wo):n===Fo||n===Wo?n=X:n===jo||n===No?n=Tt:(n=X,s=void 0);const u=n===X&&o[c+1].startsWith("/>")?" ":"";i+=n===Tt?a+cs:d>=0?(r.push(l),a.slice(0,d)+er+a.slice(d)+W+u):a+W+(d===-2?c:u)}return[ir(o,i+(o[e]||"<?>")+(t===2?"</svg>":"")),r]};class zt{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,n=0;const c=t.length-1,a=this.parts,[l,h]=hs(t,e);if(this.el=zt.createElement(l,r),J.currentNode=this.el.content,e===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=J.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(er)){const f=h[n++],u=s.getAttribute(d).split(W),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:i,name:v[2],strings:u,ctor:v[1]==="."?ps:v[1]==="?"?fs:v[1]==="@"?ms:Pe}),s.removeAttribute(d)}else d.startsWith(W)&&(a.push({type:6,index:i}),s.removeAttribute(d));if(sr.test(s.tagName)){const d=s.textContent.split(W),f=d.length-1;if(f>0){s.textContent=ne?ne.emptyScript:"";for(let u=0;u<f;u++)s.append(d[u],It()),J.nextNode(),a.push({type:2,index:++i});s.append(d[f],It())}}}else if(s.nodeType===8)if(s.data===or)a.push({type:2,index:i});else{let d=-1;for(;(d=s.data.indexOf(W,d+1))!==-1;)a.push({type:7,index:i}),d+=W.length-1}i++}}static createElement(t,e){const r=et.createElement("template");return r.innerHTML=t,r}}function $t(o,t,e=o,r){var n,c;if(t===xt)return t;let s=r!==void 0?(n=e._$Co)==null?void 0:n[r]:e._$Cl;const i=Ut(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((c=s==null?void 0:s._$AO)==null||c.call(s,!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=s:e._$Cl=s),s!==void 0&&(t=$t(o,s._$AS(o,t.values),s,r)),t}class us{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??et).importNode(e,!0);J.currentNode=s;let i=J.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new Zt(i,i.nextSibling,this,t):a.type===1?l=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(l=new vs(i,this,t)),this._$AV.push(l),a=r[++c]}n!==(a==null?void 0:a.index)&&(i=J.nextNode(),n++)}return J.currentNode=et,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Zt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=$t(this,t,e),Ut(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==xt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ls(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==C&&Ut(this._$AH)?this._$AA.nextSibling.data=t:this.T(et.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=zt.createElement(ir(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(e);else{const n=new us(s,this),c=n.u(this.options);n.p(e),this.T(c),this._$AH=n}}_$AC(t){let e=Vo.get(t.strings);return e===void 0&&Vo.set(t.strings,e=new zt(t)),e}k(t){rr(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const i of t)s===e.length?e.push(r=new Zt(this.S(It()),this.S(It()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=C}_$AI(t,e=this,r,s){const i=this.strings;let n=!1;if(i===void 0)t=$t(this,t,e,0),n=!Ut(t)||t!==this._$AH&&t!==xt,n&&(this._$AH=t);else{const c=t;let a,l;for(t=i[0],a=0;a<i.length-1;a++)l=$t(this,c[r+a],e,a),l===xt&&(l=this._$AH[a]),n||(n=!Ut(l)||l!==this._$AH[a]),l===C?t=C:t!==C&&(t+=(l??"")+i[a+1]),this._$AH[a]=l}n&&!s&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ps extends Pe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}class fs extends Pe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}}class ms extends Pe{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=$t(this,t,e,0)??C)===xt)return;const r=this._$AH,s=t===C&&r!==C||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==C&&(r===C||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class vs{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){$t(this,t)}}const He=Mt.litHtmlPolyfillSupport;He==null||He(zt,Zt),(Mt.litHtmlVersions??(Mt.litHtmlVersions=[])).push("3.1.2");const ys=(o,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const i=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new Zt(t.insertBefore(It(),i),i,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class M extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ys(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return xt}}var Qo;M._$litElement$=!0,M.finalized=!0,(Qo=globalThis.litElementHydrateSupport)==null||Qo.call(globalThis,{LitElement:M});const je=globalThis.litElementPolyfillSupport;je==null||je({LitElement:M});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gs={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:vo},bs=(o=gs,t,e)=>{const{kind:r,metadata:s}=e;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),i.set(e.name,o),r==="accessor"){const{name:n}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,o)},init(c){return c!==void 0&&this.P(n,void 0,o),c}}}if(r==="setter"){const{name:n}=e;return function(c){const a=this[n];t.call(this,c),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+r)};function $(o){return(t,e)=>typeof e=="object"?bs(o,t,e):((r,s,i)=>{const n=s.hasOwnProperty(i);return s.constructor.createProperty(i,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ko=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _s(o,t){return(e,r,s)=>{const i=n=>{var c;return((c=n.renderRoot)==null?void 0:c.querySelector(o))??null};if(t){const{get:n,set:c}=typeof r=="object"?e:s??(()=>{const a=Symbol();return{get(){return this[a]},set(l){this[a]=l}}})();return Ko(e,r,{get(){let a=n.call(this);return a===void 0&&(a=i(this),(a!==null||this.hasUpdated)&&c.call(this,a)),a}})}return Ko(e,r,{get(){return i(this)}})}}const p=Symbol("internals"),Et=o=>{var t;class e extends o{constructor(){super(...arguments),this[t]=this.attachInternals()}}return t=p,e},yo=o=>{const e=class e extends o{get form(){return this[p].form}get name(){return this.getAttribute("name")}get validity(){return this[p].validity}get validationMessage(){return this[p].validationMessage}get willValidate(){return this[p].willValidate}checkValidity(){return this[p].checkValidity()}reportValidity(){return this[p].reportValidity()}};e.formAssociated=!0;let t=e;return t},go=T`
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
`;var ws=Object.defineProperty,xs=Object.getOwnPropertyDescriptor,nr=(o,t,e,r)=>{for(var s=r>1?void 0:r?xs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ws(t,e,s),s};const $s=yo(Et(M));var pt,ft,mt,ue,ar,pe,cr,fe,lr;const Oo=class Oo extends $s{constructor(){super();m(this,ue);m(this,pe);m(this,fe);m(this,pt,void 0);m(this,ft,void 0);m(this,mt,void 0);this.type="button",this.disabled=!1,x(this,pt,A(this,ue,ar).bind(this)),x(this,ft,A(this,pe,cr).bind(this)),x(this,mt,A(this,fe,lr).bind(this)),this[p].role="button",this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",g(this,pt)),this.addEventListener("keyup",g(this,ft)),this.addEventListener("click",g(this,mt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",g(this,pt)),this.removeEventListener("keyup",g(this,ft)),this.removeEventListener("click",g(this,mt))}updated(e){e.has("disabled")&&this.updateInternals()}updateInternals(){this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false"}};pt=new WeakMap,ft=new WeakMap,mt=new WeakMap,ue=new WeakSet,ar=function(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),e.stopPropagation(),e.key==="Enter"&&this.click())},pe=new WeakSet,cr=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),this.click())},fe=new WeakSet,lr=function(){var e;this.type!=="button"&&((e=this[p].form)==null||e[this.type]())},Oo.styles=[go];let ot=Oo;nr([$({reflect:!0})],ot.prototype,"type",2);nr([$({type:Boolean,reflect:!0})],ot.prototype,"disabled",2);var ks=Object.defineProperty,As=Object.getOwnPropertyDescriptor,Cs=(o,t,e,r)=>{for(var s=r>1?void 0:r?As(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ks(t,e,s),s};const bo=o=>{class t extends o{constructor(){super(...arguments),this.currentControl=null}connectedCallback(){super.connectedCallback(),this.setCurrentControl(this.$control)}disconnectedCallback(){this.setCurrentControl(null),super.disconnectedCallback()}get $control(){return this.hasAttribute("for")?!this.htmlFor||!this.isConnected?null:this.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentElement}set $control(r){r?this.attach(r):this.detach()}setCurrentControl(r){this.handleControlChange(this.currentControl,r),this.currentControl=r}attach(r){r!==this.currentControl&&(this.setCurrentControl(r),this.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.setAttribute("for","")}handleControlChange(r=null,s=null){}}return Cs([$({attribute:"for",type:String})],t.prototype,"htmlFor",2),t};let Oe=!1;window.addEventListener("keydown",()=>Oe=!0,{capture:!0});window.addEventListener("mousedown",()=>Oe=!1,{capture:!0});const Es=T`
  :host {
    animation-delay: 0s, calc(var(--md-focus-ring-duration, 600ms) * 0.25);
    animation-duration: calc(var(--md-focus-ring-duration, 600ms) * 0.25),
      calc(var(--md-focus-ring-duration, 600ms) * 0.75);
    animation-timing-function: var(--md-sys-motion-easing-decelerated);
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
    border-radius: calc(
      var(--md-focus-ring-shape, 9999px) + var(--_offset, 2px)
    );
    inset: calc(-1 * var(--md-focus-ring-offset, 2px));
    outline: var(--md-focus-ring-width, 3px) solid currentColor;
  }

  :host([inward]) {
    animation-name: inward-grow, inward-shrink;
    border: var(--md-focus-ring-width, 3px) solid currentColor;
    border-radius: calc(
      var(--md-focus-ring-shape, 9999px) - var(--_offset, 0px)
    );
    inset: var(--md-focus-ring-offset, 0px);
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
`;var Ps=Object.defineProperty,Os=Object.getOwnPropertyDescriptor,dr=(o,t,e,r)=>{for(var s=r>1?void 0:r?Os(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ps(t,e,s),s},hr=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)},Ne=(o,t,e)=>(hr(o,t,"read from private field"),e?e.call(o):t.get(o)),at=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},We=(o,t,e)=>(hr(o,t,"access private method"),e),Fe,Ve,Ke,Ge,ur,qe,pr,Ye,fr;let ae=class extends bo(Et(M)){constructor(){super(),at(this,Ge),at(this,qe),at(this,Ye),this.inward=!1,at(this,Fe,We(this,Ge,ur).bind(this)),at(this,Ve,We(this,qe,pr).bind(this)),at(this,Ke,We(this,Ye,fr).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={focusin:Ne(this,Fe),focusout:Ne(this,Ve),pointerdown:Ne(this,Ke)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}};Fe=new WeakMap;Ve=new WeakMap;Ke=new WeakMap;Ge=new WeakSet;ur=function(){Oe&&this[p].states.add("visible")};qe=new WeakSet;pr=function(){this[p].states.delete("visible")};Ye=new WeakSet;fr=function(){this[p].states.delete("visible")};ae.styles=[Es];dr([$({type:Boolean,reflect:!0})],ae.prototype,"inward",2);ae=dr([H("md-focus-ring")],ae);const Ss=T`
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
`;var Ds=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,_o=(o,t,e,r)=>{for(var s=r>1?void 0:r?Rs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ds(t,e,s),s},wo=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)},P=(o,t,e)=>(wo(o,t,"read from private field"),e?e.call(o):t.get(o)),O=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)},Jt=(o,t,e,r)=>(wo(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),Z=(o,t,e)=>(wo(o,t,"access private method"),e),Bt,Pt,se,Xe,Ze,Je,Qe,to,z,eo,mr,oo,vr,ro,yr,so,gr,io,br,no,_r,ao,wr;const Ts=450,Ls=225,Ms=105,Is=375;function Us({x:o,y:t},{x:e,y:r}){return Math.sqrt((o-e)**2+(t-r)**2)}let Ht=class extends bo(Et(M)){constructor(){super(),O(this,eo),O(this,oo),O(this,ro),O(this,so),O(this,io),O(this,no),O(this,ao),this.$ripples=[],this.enterBehavior="always",this.spaceBehavior="once",O(this,Bt,!1),O(this,Pt,!1),O(this,se,0),O(this,Xe,Z(this,eo,mr).bind(this)),O(this,Ze,Z(this,oo,vr).bind(this)),O(this,Je,Z(this,ro,yr).bind(this)),O(this,Qe,Z(this,so,gr).bind(this)),O(this,to,Z(this,io,br).bind(this)),O(this,z,Z(this,no,_r).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={keydown:P(this,Xe),keyup:P(this,Ze),pointerenter:P(this,Je),pointerleave:P(this,Qe),pointerdown:P(this,to)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}addRipple(o=null){const{startCenter:t,endCenter:e,radius:r}=Z(this,ao,wr).call(this,o),s=r*2+"px",i=`${t.x-r}px ${t.y-r}px`,n=`${e.x-r}px ${e.y-r}px`,c=document.createElement("div");c.setAttribute("part","ripple"),this.renderRoot.append(c),this.$ripples.push(c),c.animate({opacity:[0,.12]},{duration:Ms,easing:"linear",fill:"forwards"}),c.animate({height:[s,s],width:[s,s],translate:[i,n],scale:[.2,1.35]},{duration:Ts,easing:"cubic-bezier(0.2, 0, 0, 1)",fill:"forwards"}),Jt(this,se,Date.now())}removeRipple(o){setTimeout(()=>{const t=o.animate({opacity:[getComputedStyle(o).opacity,"0"]},{duration:Is,fill:"forwards",easing:"linear"});t.onfinish=t.oncancel=()=>o.remove()},Math.max(Ls-(Date.now()-P(this,se)),0))}removeRippleAll(){for(const o of this.$ripples.splice(0))this.removeRipple(o)}};Bt=new WeakMap;Pt=new WeakMap;se=new WeakMap;Xe=new WeakMap;Ze=new WeakMap;Je=new WeakMap;Qe=new WeakMap;to=new WeakMap;z=new WeakMap;eo=new WeakSet;mr=function(o){o.key==="Enter"&&this.enterBehavior==="always"||o.key===" "&&this.spaceBehavior==="always"?(this.addRipple(),this.removeRippleAll()):o.key===" "&&this.spaceBehavior==="once"&&(P(this,Bt)||this.addRipple(),Jt(this,Bt,!0))};oo=new WeakSet;vr=function(o){o.key===" "&&this.spaceBehavior==="once"&&(Jt(this,Bt,!1),this.removeRippleAll())};ro=new WeakSet;yr=function(o){o.pointerType!=="touch"&&(this[p].states.add("hover"),P(this,Pt)&&this.addRipple(o))};so=new WeakSet;gr=function(){this[p].states.delete("hover"),P(this,Pt)&&this.removeRippleAll()};io=new WeakSet;br=function(o){o.pointerType==="mouse"&&Jt(this,Pt,!0),document.addEventListener("pointerup",P(this,z)),document.addEventListener("touchcancel",P(this,z)),document.addEventListener("touchend",P(this,z)),document.addEventListener("touchmove",P(this,z)),o.button!==2&&this.addRipple(o)};no=new WeakSet;_r=function(){Jt(this,Pt,!1),document.removeEventListener("pointerup",P(this,z)),document.removeEventListener("touchcancel",P(this,z)),document.removeEventListener("touchend",P(this,z)),document.removeEventListener("touchmove",P(this,z)),this.removeRippleAll()};ao=new WeakSet;wr=function(o=null){const t=this.getBoundingClientRect(),e={x:t.width/2,y:t.height/2},r=!o,s=e;let i=s;r||(i.x=o.clientX-t.left,i.y=o.clientY-t.top);const n=[{x:0,y:0},{x:t.width,y:0},{x:0,y:t.height},{x:t.width,y:t.height}],c=Math.max(...n.map(a=>Us(s,a)));return{startCenter:i,endCenter:s,radius:c}};Ht.styles=[Ss];_o([$()],Ht.prototype,"enterBehavior",2);_o([$()],Ht.prototype,"spaceBehavior",2);Ht=_o([H("md-ripple")],Ht);const zs=T`
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
    padding: 0 24px;
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
  /* FIXME: Can't be normally compiled by lightningcss */
  :host(:not([variant='text'])) ::slotted([slot='icon']) {
    margin-inline-start: -8px;
  }
  :host(:not([variant='text'])) ::slotted([slot='trailingicon']) {
    margin-inline-end: -8px;
  }
`,Ot=T`
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
`;var Bs=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,js=Object.getPrototypeOf,Ns=Reflect.get,xo=(o,t,e,r)=>{for(var s=r>1?void 0:r?Hs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Bs(t,e,s),s},Ws=(o,t,e)=>Ns(js(o),e,t);let Q=class extends ot{constructor(){super(...arguments),this.variant="filled",this.color="primary"}render(){return L`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `}};Q.styles=[...Ws(Q,Q,"styles"),Ot,zs];xo([$({reflect:!0})],Q.prototype,"variant",2);xo([$({reflect:!0})],Q.prototype,"color",2);Q=xo([H("md-button")],Q);const Fs=T`
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
`;var Vs=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,Gs=Object.getPrototypeOf,qs=Reflect.get,Se=(o,t,e,r)=>{for(var s=r>1?void 0:r?Ks(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Vs(t,e,s),s},Ys=(o,t,e)=>qs(Gs(o),e,t);let V=class extends ot{constructor(){super(...arguments),this.size="medium",this.color="surface",this.lowered=!1}render(){return L`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" aria-hidden="true"></slot>
      <slot part="label" name="label"></slot>
    `}};V.styles=[...Ys(V,V,"styles"),Ot,Fs];Se([$({reflect:!0})],V.prototype,"size",2);Se([$({reflect:!0})],V.prototype,"color",2);Se([$({type:Boolean,reflect:!0})],V.prototype,"lowered",2);V=Se([H("md-fab")],V);const xr=T`
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
    --_background-color: var(--md-sys-color-secondary);
    --_text-color: var(--md-sys-color-on-secondary);
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
`;var Xs=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,Js=Object.getPrototypeOf,Qs=Reflect.get,$r=(o,t,e,r)=>{for(var s=r>1?void 0:r?Zs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Xs(t,e,s),s},ti=(o,t,e)=>Qs(Js(o),e,t);let lt=class extends ot{constructor(){super(...arguments),this.variant="standard"}render(){return L`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon"></slot>
    `}};lt.styles=[...ti(lt,lt,"styles"),Ot,xr];$r([$({reflect:!0})],lt.prototype,"variant",2);lt=$r([H("md-icon-button")],lt);var ei=Object.defineProperty,oi=Object.getOwnPropertyDescriptor,kr=(o,t,e,r)=>{for(var s=r>1?void 0:r?oi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ei(t,e,s),s};const ri={true:"checked",false:"unchecked"},si=yo(Et(M));var vt,yt,me,Ar,ve,Cr,Wt,co;const So=class So extends si{constructor(){super();m(this,me);m(this,ve);m(this,Wt);m(this,vt,void 0);m(this,yt,void 0);this.checked=!1,this.disabled=!1,x(this,vt,A(this,me,Ar).bind(this)),x(this,yt,A(this,ve,Cr).bind(this)),this._ignoreClick=!1,this[p].role="switch",this.checked=this.hasAttribute("checked"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",g(this,vt)),this.addEventListener("keydown",g(this,yt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",g(this,vt)),this.removeEventListener("keydown",g(this,yt))}updated(e){(e.has("checked")||e.has("disabled"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].ariaPressed=this.checked?"true":"false",this[p].states.add(`${ri[this[p].ariaPressed]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};vt=new WeakMap,yt=new WeakMap,me=new WeakSet,Ar=function(e){e.stopPropagation(),e.preventDefault(),!this._ignoreClick&&A(this,Wt,co).call(this)},ve=new WeakSet,Cr=function(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),e.stopPropagation(),A(this,Wt,co).call(this))},Wt=new WeakSet,co=function(){this.disabled||(this.checked=!this.checked,this.updateInternals())},So.styles=[go];let kt=So;kr([$({type:Boolean})],kt.prototype,"checked",2);kr([$({type:Boolean,reflect:!0})],kt.prototype,"disabled",2);const ii=T`
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
`;var ni=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,ci=Object.getPrototypeOf,li=Reflect.get,Er=(o,t,e,r)=>{for(var s=r>1?void 0:r?ai(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ni(t,e,s),s},di=(o,t,e)=>li(ci(o),e,t);let dt=class extends kt{constructor(){super(),this.variant="standard",this[p].role="button"}render(){return L`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `}};dt.styles=[...di(dt,dt,"styles"),Ot,xr,ii];Er([$({reflect:!0})],dt.prototype,"variant",2);dt=Er([H("md-icon-button-toggle")],dt);var hi=Object.defineProperty,ui=Object.getOwnPropertyDescriptor,$o=(o,t,e,r)=>{for(var s=r>1?void 0:r?ui(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&hi(t,e,s),s};const Go={true:"checked",false:"unchecked",mixed:"indeterminate"},pi=yo(Et(M));var gt,bt,_t,ye,Pr,ge,Or,be,Sr,Ft,lo;const Do=class Do extends pi{constructor(){super();m(this,ye);m(this,ge);m(this,be);m(this,Ft);m(this,gt,void 0);m(this,bt,void 0);m(this,_t,void 0);this.checked=!1,this.indeterminate=!1,this.disabled=!1,x(this,gt,A(this,ye,Pr).bind(this)),x(this,bt,A(this,ge,Or).bind(this)),x(this,_t,A(this,be,Sr).bind(this)),this[p].role="checkbox",this.checked=this.hasAttribute("checked"),this.indeterminate=this.hasAttribute("indeterminate"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",g(this,gt)),this.addEventListener("keydown",g(this,bt)),this.addEventListener("keyup",g(this,_t))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",g(this,gt)),this.removeEventListener("keydown",g(this,bt)),this.removeEventListener("keyup",g(this,_t))}updated(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("was-unchecked"),this[p].states.delete("was-checked"),this[p].states.delete("was-indeterminate"),this[p].states.add(`was-${Go[this[p].ariaChecked]}`),this[p].ariaChecked=this.indeterminate?"mixed":this.checked?"true":"false",this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].states.delete("indeterminate"),this[p].states.add(`${Go[this[p].ariaChecked]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};gt=new WeakMap,bt=new WeakMap,_t=new WeakMap,ye=new WeakSet,Pr=function(e){e.stopPropagation(),e.preventDefault(),A(this,Ft,lo).call(this)},ge=new WeakSet,Or=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation())},be=new WeakSet,Sr=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),A(this,Ft,lo).call(this))},Ft=new WeakSet,lo=function(){this.disabled||(this.checked=!this.checked,this.indeterminate=!1,this.updateInternals())},Do.styles=[go];let At=Do;$o([$({type:Boolean})],At.prototype,"checked",2);$o([$({type:Boolean})],At.prototype,"indeterminate",2);$o([$({type:Boolean,reflect:!0})],At.prototype,"disabled",2);const fi=T`
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
  :host(:not(:state(checked)):not(:state(indeterminate)):--was-indeterminate)
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
`;var mi=Object.defineProperty,vi=Object.getOwnPropertyDescriptor,yi=Object.getPrototypeOf,gi=Reflect.get,Dr=(o,t,e,r)=>{for(var s=r>1?void 0:r?vi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&mi(t,e,s),s},bi=(o,t,e)=>gi(yi(o),e,t);let ht=class extends At{constructor(){super(...arguments),this.error=!1}render(){return L`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      ${this.renderIcon()}
    `}renderIcon(){return L`
      <svg part="icon" viewBox="0 0 18 18" aria-hidden="true">
        <rect part="mark mark-short"></rect>
        <rect part="mark mark-long"></rect>
      </svg>
    `}};ht.styles=[...bi(ht,ht,"styles"),Ot,fi];Dr([$({type:Boolean,reflect:!0})],ht.prototype,"error",2);ht=Dr([H("md-checkbox")],ht);const _i=T`
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
`;var wi=Object.defineProperty,xi=Object.getOwnPropertyDescriptor,ko=(o,t,e,r)=>{for(var s=r>1?void 0:r?xi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&wi(t,e,s),s};let jt=class extends kt{constructor(){super(...arguments),this.icons=!1,this.checkedIconOnly=!1}render(){return L`
      <md-focus-ring></md-focus-ring>
      <div part="thumb">
        <md-ripple spacebehavior="always"></md-ripple>
        <span part="target"></span>
        ${this.renderOffIcon()}${this.renderOnIcon()}
      </div>
    `}renderOnIcon(){return L`
      <svg part="icons icon-on" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"
        />
      </svg>
    `}renderOffIcon(){return L`
      <svg part="icons icon-off" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"
        />
      </svg>
    `}};jt.styles=[Ot,_i];ko([$({type:Boolean,reflect:!0})],jt.prototype,"icons",2);ko([$({type:Boolean,reflect:!0})],jt.prototype,"checkedIconOnly",2);jt=ko([H("md-switch")],jt);const ce=Math.min,tt=Math.max,le=Math.round,ee=Math.floor,K=o=>({x:o,y:o}),$i={left:"right",right:"left",bottom:"top",top:"bottom"},ki={start:"end",end:"start"};function qo(o,t,e){return tt(o,ce(t,e))}function De(o,t){return typeof o=="function"?o(t):o}function rt(o){return o.split("-")[0]}function Re(o){return o.split("-")[1]}function Rr(o){return o==="x"?"y":"x"}function Tr(o){return o==="y"?"height":"width"}function Te(o){return["top","bottom"].includes(rt(o))?"y":"x"}function Lr(o){return Rr(Te(o))}function Ai(o,t,e){e===void 0&&(e=!1);const r=Re(o),s=Lr(o),i=Tr(s);let n=s==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(n=de(n)),[n,de(n)]}function Ci(o){const t=de(o);return[ho(o),t,ho(t)]}function ho(o){return o.replace(/start|end/g,t=>ki[t])}function Ei(o,t,e){const r=["left","right"],s=["right","left"],i=["top","bottom"],n=["bottom","top"];switch(o){case"top":case"bottom":return e?t?s:r:t?r:s;case"left":case"right":return t?i:n;default:return[]}}function Pi(o,t,e,r){const s=Re(o);let i=Ei(rt(o),e==="start",r);return s&&(i=i.map(n=>n+"-"+s),t&&(i=i.concat(i.map(ho)))),i}function de(o){return o.replace(/left|right|bottom|top/g,t=>$i[t])}function Oi(o){return{top:0,right:0,bottom:0,left:0,...o}}function Si(o){return typeof o!="number"?Oi(o):{top:o,right:o,bottom:o,left:o}}function he(o){return{...o,top:o.y,left:o.x,right:o.x+o.width,bottom:o.y+o.height}}function Yo(o,t,e){let{reference:r,floating:s}=o;const i=Te(t),n=Lr(t),c=Tr(n),a=rt(t),l=i==="y",h=r.x+r.width/2-s.width/2,d=r.y+r.height/2-s.height/2,f=r[c]/2-s[c]/2;let u;switch(a){case"top":u={x:h,y:r.y-s.height};break;case"bottom":u={x:h,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:d};break;case"left":u={x:r.x-s.width,y:d};break;default:u={x:r.x,y:r.y}}switch(Re(t)){case"start":u[n]-=f*(e&&l?-1:1);break;case"end":u[n]+=f*(e&&l?-1:1);break}return u}const Di=async(o,t,e)=>{const{placement:r="bottom",strategy:s="absolute",middleware:i=[],platform:n}=e,c=i.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(t));let l=await n.getElementRects({reference:o,floating:t,strategy:s}),{x:h,y:d}=Yo(l,r,a),f=r,u={},v=0;for(let b=0;b<c.length;b++){const{name:_,fn:y}=c[b],{x:w,y:k,data:S,reset:E}=await y({x:h,y:d,initialPlacement:r,placement:f,strategy:s,middlewareData:u,rects:l,platform:n,elements:{reference:o,floating:t}});h=w??h,d=k??d,u={...u,[_]:{...u[_],...S}},E&&v<=50&&(v++,typeof E=="object"&&(E.placement&&(f=E.placement),E.rects&&(l=E.rects===!0?await n.getElementRects({reference:o,floating:t,strategy:s}):E.rects),{x:h,y:d}=Yo(l,f,a)),b=-1)}return{x:h,y:d,placement:f,strategy:s,middlewareData:u}};async function Mr(o,t){var e;t===void 0&&(t={});const{x:r,y:s,platform:i,rects:n,elements:c,strategy:a}=o,{boundary:l="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:f=!1,padding:u=0}=De(t,o),v=Si(u),_=c[f?d==="floating"?"reference":"floating":d],y=he(await i.getClippingRect({element:(e=await(i.isElement==null?void 0:i.isElement(_)))==null||e?_:_.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(c.floating)),boundary:l,rootBoundary:h,strategy:a})),w=d==="floating"?{...n.floating,x:r,y:s}:n.reference,k=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c.floating)),S=await(i.isElement==null?void 0:i.isElement(k))?await(i.getScale==null?void 0:i.getScale(k))||{x:1,y:1}:{x:1,y:1},E=he(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:k,strategy:a}):w);return{top:(y.top-E.top+v.top)/S.y,bottom:(E.bottom-y.bottom+v.bottom)/S.y,left:(y.left-E.left+v.left)/S.x,right:(E.right-y.right+v.right)/S.x}}const Ri=function(o){return o===void 0&&(o={}),{name:"flip",options:o,async fn(t){var e,r;const{placement:s,middlewareData:i,rects:n,initialPlacement:c,platform:a,elements:l}=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:v="none",flipAlignment:b=!0,..._}=De(o,t);if((e=i.arrow)!=null&&e.alignmentOffset)return{};const y=rt(s),w=rt(c)===c,k=await(a.isRTL==null?void 0:a.isRTL(l.floating)),S=f||(w||!b?[de(c)]:Ci(c));!f&&v!=="none"&&S.push(...Pi(c,b,v,k));const E=[c,...S],q=await Mr(t,_),te=[];let St=((r=i.flip)==null?void 0:r.overflows)||[];if(h&&te.push(q[y]),d){const Y=Ai(s,n,k);te.push(q[Y[0]],q[Y[1]])}if(St=[...St,{placement:s,overflows:te}],!te.every(Y=>Y<=0)){var Ro,To;const Y=(((Ro=i.flip)==null?void 0:Ro.index)||0)+1,Mo=E[Y];if(Mo)return{data:{index:Y,overflows:St},reset:{placement:Mo}};let Dt=(To=St.filter(it=>it.overflows[0]<=0).sort((it,nt)=>it.overflows[1]-nt.overflows[1])[0])==null?void 0:To.placement;if(!Dt)switch(u){case"bestFit":{var Lo;const it=(Lo=St.map(nt=>[nt.placement,nt.overflows.filter(Rt=>Rt>0).reduce((Rt,Jr)=>Rt+Jr,0)]).sort((nt,Rt)=>nt[1]-Rt[1])[0])==null?void 0:Lo[0];it&&(Dt=it);break}case"initialPlacement":Dt=c;break}if(s!==Dt)return{reset:{placement:Dt}}}return{}}}};async function Ti(o,t){const{placement:e,platform:r,elements:s}=o,i=await(r.isRTL==null?void 0:r.isRTL(s.floating)),n=rt(e),c=Re(e),a=Te(e)==="y",l=["left","top"].includes(n)?-1:1,h=i&&a?-1:1,d=De(t,o);let{mainAxis:f,crossAxis:u,alignmentAxis:v}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof v=="number"&&(u=c==="end"?v*-1:v),a?{x:u*h,y:f*l}:{x:f*l,y:u*h}}const Li=function(o){return o===void 0&&(o=0),{name:"offset",options:o,async fn(t){var e,r;const{x:s,y:i,placement:n,middlewareData:c}=t,a=await Ti(t,o);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:s+a.x,y:i+a.y,data:{...a,placement:n}}}}},Mi=function(o){return o===void 0&&(o={}),{name:"shift",options:o,async fn(t){const{x:e,y:r,placement:s}=t,{mainAxis:i=!0,crossAxis:n=!1,limiter:c={fn:_=>{let{x:y,y:w}=_;return{x:y,y:w}}},...a}=De(o,t),l={x:e,y:r},h=await Mr(t,a),d=Te(rt(s)),f=Rr(d);let u=l[f],v=l[d];if(i){const _=f==="y"?"top":"left",y=f==="y"?"bottom":"right",w=u+h[_],k=u-h[y];u=qo(w,u,k)}if(n){const _=d==="y"?"top":"left",y=d==="y"?"bottom":"right",w=v+h[_],k=v-h[y];v=qo(w,v,k)}const b=c.fn({...t,[f]:u,[d]:v});return{...b,data:{x:b.x-e,y:b.y-r}}}}};function G(o){return Ir(o)?(o.nodeName||"").toLowerCase():"#document"}function D(o){var t;return(o==null||(t=o.ownerDocument)==null?void 0:t.defaultView)||window}function N(o){var t;return(t=(Ir(o)?o.ownerDocument:o.document)||window.document)==null?void 0:t.documentElement}function Ir(o){return o instanceof Node||o instanceof D(o).Node}function j(o){return o instanceof Element||o instanceof D(o).Element}function B(o){return o instanceof HTMLElement||o instanceof D(o).HTMLElement}function Xo(o){return typeof ShadowRoot>"u"?!1:o instanceof ShadowRoot||o instanceof D(o).ShadowRoot}function Qt(o){const{overflow:t,overflowX:e,overflowY:r,display:s}=R(o);return/auto|scroll|overlay|hidden|clip/.test(t+r+e)&&!["inline","contents"].includes(s)}function Ii(o){return["table","td","th"].includes(G(o))}function Ao(o){const t=Co(),e=R(o);return e.transform!=="none"||e.perspective!=="none"||(e.containerType?e.containerType!=="normal":!1)||!t&&(e.backdropFilter?e.backdropFilter!=="none":!1)||!t&&(e.filter?e.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function Ui(o){let t=Ct(o);for(;B(t)&&!Le(t);){if(Ao(t))return t;t=Ct(t)}return null}function Co(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Le(o){return["html","body","#document"].includes(G(o))}function R(o){return D(o).getComputedStyle(o)}function Me(o){return j(o)?{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop}:{scrollLeft:o.pageXOffset,scrollTop:o.pageYOffset}}function Ct(o){if(G(o)==="html")return o;const t=o.assignedSlot||o.parentNode||Xo(o)&&o.host||N(o);return Xo(t)?t.host:t}function Ur(o){const t=Ct(o);return Le(t)?o.ownerDocument?o.ownerDocument.body:o.body:B(t)&&Qt(t)?t:Ur(t)}function Nt(o,t,e){var r;t===void 0&&(t=[]),e===void 0&&(e=!0);const s=Ur(o),i=s===((r=o.ownerDocument)==null?void 0:r.body),n=D(s);return i?t.concat(n,n.visualViewport||[],Qt(s)?s:[],n.frameElement&&e?Nt(n.frameElement):[]):t.concat(s,Nt(s,[],e))}function zr(o){const t=R(o);let e=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const s=B(o),i=s?o.offsetWidth:e,n=s?o.offsetHeight:r,c=le(e)!==i||le(r)!==n;return c&&(e=i,r=n),{width:e,height:r,$:c}}function Eo(o){return j(o)?o:o.contextElement}function ut(o){const t=Eo(o);if(!B(t))return K(1);const e=t.getBoundingClientRect(),{width:r,height:s,$:i}=zr(t);let n=(i?le(e.width):e.width)/r,c=(i?le(e.height):e.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}const zi=K(0);function Br(o){const t=D(o);return!Co()||!t.visualViewport?zi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Bi(o,t,e){return t===void 0&&(t=!1),!e||t&&e!==D(o)?!1:t}function st(o,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=!1);const s=o.getBoundingClientRect(),i=Eo(o);let n=K(1);t&&(r?j(r)&&(n=ut(r)):n=ut(o));const c=Bi(i,e,r)?Br(i):K(0);let a=(s.left+c.x)/n.x,l=(s.top+c.y)/n.y,h=s.width/n.x,d=s.height/n.y;if(i){const f=D(i),u=r&&j(r)?D(r):r;let v=f,b=v.frameElement;for(;b&&r&&u!==v;){const _=ut(b),y=b.getBoundingClientRect(),w=R(b),k=y.left+(b.clientLeft+parseFloat(w.paddingLeft))*_.x,S=y.top+(b.clientTop+parseFloat(w.paddingTop))*_.y;a*=_.x,l*=_.y,h*=_.x,d*=_.y,a+=k,l+=S,v=D(b),b=v.frameElement}}return he({width:h,height:d,x:a,y:l})}const Hi=[":popover-open",":modal"];function Hr(o){return Hi.some(t=>{try{return o.matches(t)}catch{return!1}})}function ji(o){let{elements:t,rect:e,offsetParent:r,strategy:s}=o;const i=s==="fixed",n=N(r),c=t?Hr(t.floating):!1;if(r===n||c&&i)return e;let a={scrollLeft:0,scrollTop:0},l=K(1);const h=K(0),d=B(r);if((d||!d&&!i)&&((G(r)!=="body"||Qt(n))&&(a=Me(r)),B(r))){const f=st(r);l=ut(r),h.x=f.x+r.clientLeft,h.y=f.y+r.clientTop}return{width:e.width*l.x,height:e.height*l.y,x:e.x*l.x-a.scrollLeft*l.x+h.x,y:e.y*l.y-a.scrollTop*l.y+h.y}}function Ni(o){return Array.from(o.getClientRects())}function jr(o){return st(N(o)).left+Me(o).scrollLeft}function Wi(o){const t=N(o),e=Me(o),r=o.ownerDocument.body,s=tt(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=tt(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let n=-e.scrollLeft+jr(o);const c=-e.scrollTop;return R(r).direction==="rtl"&&(n+=tt(t.clientWidth,r.clientWidth)-s),{width:s,height:i,x:n,y:c}}function Fi(o,t){const e=D(o),r=N(o),s=e.visualViewport;let i=r.clientWidth,n=r.clientHeight,c=0,a=0;if(s){i=s.width,n=s.height;const l=Co();(!l||l&&t==="fixed")&&(c=s.offsetLeft,a=s.offsetTop)}return{width:i,height:n,x:c,y:a}}function Vi(o,t){const e=st(o,!0,t==="fixed"),r=e.top+o.clientTop,s=e.left+o.clientLeft,i=B(o)?ut(o):K(1),n=o.clientWidth*i.x,c=o.clientHeight*i.y,a=s*i.x,l=r*i.y;return{width:n,height:c,x:a,y:l}}function Zo(o,t,e){let r;if(t==="viewport")r=Fi(o,e);else if(t==="document")r=Wi(N(o));else if(j(t))r=Vi(t,e);else{const s=Br(o);r={...t,x:t.x-s.x,y:t.y-s.y}}return he(r)}function Nr(o,t){const e=Ct(o);return e===t||!j(e)||Le(e)?!1:R(e).position==="fixed"||Nr(e,t)}function Ki(o,t){const e=t.get(o);if(e)return e;let r=Nt(o,[],!1).filter(c=>j(c)&&G(c)!=="body"),s=null;const i=R(o).position==="fixed";let n=i?Ct(o):o;for(;j(n)&&!Le(n);){const c=R(n),a=Ao(n);!a&&c.position==="fixed"&&(s=null),(i?!a&&!s:!a&&c.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||Qt(n)&&!a&&Nr(o,n))?r=r.filter(h=>h!==n):s=c,n=Ct(n)}return t.set(o,r),r}function Gi(o){let{element:t,boundary:e,rootBoundary:r,strategy:s}=o;const n=[...e==="clippingAncestors"?Ki(t,this._c):[].concat(e),r],c=n[0],a=n.reduce((l,h)=>{const d=Zo(t,h,s);return l.top=tt(d.top,l.top),l.right=ce(d.right,l.right),l.bottom=ce(d.bottom,l.bottom),l.left=tt(d.left,l.left),l},Zo(t,c,s));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function qi(o){const{width:t,height:e}=zr(o);return{width:t,height:e}}function Yi(o,t,e){const r=B(t),s=N(t),i=e==="fixed",n=st(o,!0,i,t);let c={scrollLeft:0,scrollTop:0};const a=K(0);if(r||!r&&!i)if((G(t)!=="body"||Qt(s))&&(c=Me(t)),r){const d=st(t,!0,i,t);a.x=d.x+t.clientLeft,a.y=d.y+t.clientTop}else s&&(a.x=jr(s));const l=n.left+c.scrollLeft-a.x,h=n.top+c.scrollTop-a.y;return{x:l,y:h,width:n.width,height:n.height}}function Jo(o,t){return!B(o)||R(o).position==="fixed"?null:t?t(o):o.offsetParent}function Wr(o,t){const e=D(o);if(!B(o)||Hr(o))return e;let r=Jo(o,t);for(;r&&Ii(r)&&R(r).position==="static";)r=Jo(r,t);return r&&(G(r)==="html"||G(r)==="body"&&R(r).position==="static"&&!Ao(r))?e:r||Ui(o)||e}const Xi=async function(o){const t=this.getOffsetParent||Wr,e=this.getDimensions;return{reference:Yi(o.reference,await t(o.floating),o.strategy),floating:{x:0,y:0,...await e(o.floating)}}};function Zi(o){return R(o).direction==="rtl"}const Ji={convertOffsetParentRelativeRectToViewportRelativeRect:ji,getDocumentElement:N,getClippingRect:Gi,getOffsetParent:Wr,getElementRects:Xi,getClientRects:Ni,getDimensions:qi,getScale:ut,isElement:j,isRTL:Zi};function Qi(o,t){let e=null,r;const s=N(o);function i(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null}function n(c,a){c===void 0&&(c=!1),a===void 0&&(a=1),i();const{left:l,top:h,width:d,height:f}=o.getBoundingClientRect();if(c||t(),!d||!f)return;const u=ee(h),v=ee(s.clientWidth-(l+d)),b=ee(s.clientHeight-(h+f)),_=ee(l),w={rootMargin:-u+"px "+-v+"px "+-b+"px "+-_+"px",threshold:tt(0,ce(1,a))||1};let k=!0;function S(E){const q=E[0].intersectionRatio;if(q!==a){if(!k)return n();q?n(!1,q):r=setTimeout(()=>{n(!1,1e-7)},100)}k=!1}try{e=new IntersectionObserver(S,{...w,root:s.ownerDocument})}catch{e=new IntersectionObserver(S,w)}e.observe(o)}return n(!0),i}function tn(o,t,e,r){r===void 0&&(r={});const{ancestorScroll:s=!0,ancestorResize:i=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=!1}=r,l=Eo(o),h=s||i?[...l?Nt(l):[],...Nt(t)]:[];h.forEach(y=>{s&&y.addEventListener("scroll",e,{passive:!0}),i&&y.addEventListener("resize",e)});const d=l&&c?Qi(l,e):null;let f=-1,u=null;n&&(u=new ResizeObserver(y=>{let[w]=y;w&&w.target===l&&u&&(u.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var k;(k=u)==null||k.observe(t)})),e()}),l&&!a&&u.observe(l),u.observe(t));let v,b=a?st(o):null;a&&_();function _(){const y=st(o);b&&(y.x!==b.x||y.y!==b.y||y.width!==b.width||y.height!==b.height)&&e(),b=y,v=requestAnimationFrame(_)}return e(),()=>{var y;h.forEach(w=>{s&&w.removeEventListener("scroll",e),i&&w.removeEventListener("resize",e)}),d==null||d(),(y=u)==null||y.disconnect(),u=null,a&&cancelAnimationFrame(v)}}const en=Mi,on=Ri,rn=(o,t,e)=>{const r=new Map,s={platform:Ji,...e},i={...s.platform,_c:r};return Di(o,t,{...s,platform:i})};var sn=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,Po=(o,t,e,r)=>{for(var s=r>1?void 0:r?nn(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&sn(t,e,s),s};let oe=0;const an=bo(Et(M));var I,U,Vt,Kt,Gt,qt,Yt,Xt,wt,_e,Fr,we,Vr,xe,Kr,$e,Gr,ke,qr,Ae,Yr,Ce,Xr,Ee,Zr;class Ie extends an{constructor(){super();m(this,_e);m(this,we);m(this,xe);m(this,$e);m(this,ke);m(this,Ae);m(this,Ce);m(this,Ee);m(this,I,void 0);m(this,U,void 0);m(this,Vt,void 0);m(this,Kt,void 0);m(this,Gt,void 0);m(this,qt,void 0);m(this,Yt,void 0);m(this,Xt,void 0);m(this,wt,void 0);this.position="top",this.offset=4,this.padding=4,this.showDuration=100,this.hideDuration=100,this.mouseShowDelay=100,this.mouseHideDelay=0,this.focusShowDelay=100,this.focusHideDelay=0,this.touchShowDelay=700,this.touchHideDelay=1500,this.recentlyShowedDelay=800,x(this,I,void 0),x(this,U,void 0),x(this,Vt,A(this,we,Vr).bind(this)),x(this,Kt,A(this,xe,Kr).bind(this)),x(this,Gt,A(this,$e,Gr).bind(this)),x(this,qt,A(this,ke,qr).bind(this)),x(this,Yt,A(this,Ae,Yr).bind(this)),x(this,Xt,A(this,Ce,Xr).bind(this)),x(this,wt,A(this,Ee,Zr).bind(this)),this[p].role="tooltip"}render(){return L`<slot @slotchange="${A(this,_e,Fr)}"></slot>`}set visible(e){e?(this.clearAutoUpdate=tn(this.$control,this,this.updatePosition.bind(this)),this[p].states.add("showing"),this.updatePosition(),setTimeout(()=>{this[p].states.delete("showing"),this[p].states.add("visible")},this.showDuration)):(this[p].states.add("hiding"),setTimeout(()=>{var r;this[p].states.delete("hiding"),this[p].states.delete("visible"),(r=this.clearAutoUpdate)==null||r.call(this)},this.hideDuration))}handleControlChange(e=null,r=null){const s={focusin:g(this,Vt),focusout:g(this,Kt),pointerenter:g(this,Gt),pointerleave:g(this,qt),touchstart:g(this,Yt),touchend:g(this,Xt)};Object.keys(s).forEach(i=>{e==null||e.removeEventListener(i,s[i]),r==null||r.addEventListener(i,s[i])}),e&&e.removeAttribute("aria-label"),r&&r.setAttribute("aria-label",this.textContent??"")}updatePosition(){this.$control&&rn(this.$control,this,{placement:this.position,middleware:[Li(this.offset),on({padding:this.padding}),en({padding:this.padding,crossAxis:!0})]}).then(({x:e,y:r})=>{this.style.top=`${r}px`,this.style.left=`${e}px`})}}I=new WeakMap,U=new WeakMap,Vt=new WeakMap,Kt=new WeakMap,Gt=new WeakMap,qt=new WeakMap,Yt=new WeakMap,Xt=new WeakMap,wt=new WeakMap,_e=new WeakSet,Fr=function(){this.$control.setAttribute("aria-label",this.textContent??"")},we=new WeakSet,Vr=function(){Oe&&(clearTimeout(g(this,U)),x(this,I,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-oe<this.recentlyShowedDelay?0:this.focusShowDelay))))},xe=new WeakSet,Kr=function(){oe=Date.now(),clearTimeout(g(this,I)),x(this,U,setTimeout(()=>{this.visible=!1},this.focusHideDelay))},$e=new WeakSet,Gr=function(e){e.pointerType!=="touch"&&(clearTimeout(g(this,U)),x(this,I,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-oe<this.recentlyShowedDelay?0:this.mouseShowDelay))))},ke=new WeakSet,qr=function(e){e.pointerType!=="touch"&&(oe=Date.now(),clearTimeout(g(this,I)),x(this,U,setTimeout(()=>{this.visible=!1},this.mouseHideDelay)))},Ae=new WeakSet,Yr=function(){clearTimeout(g(this,U)),x(this,I,setTimeout(()=>{this.visible=!0,addEventListener("click",g(this,wt))},this.touchShowDelay))},Ce=new WeakSet,Xr=function(){clearTimeout(g(this,I)),x(this,U,setTimeout(()=>{this.visible=!1},this.touchHideDelay))},Ee=new WeakSet,Zr=function(e){e.composedPath().includes(this.$control)||(this.visible=!1,removeEventListener("click",g(this,wt)))};Po([_s("slot")],Ie.prototype,"$slot",2);Po([$({reflect:!0})],Ie.prototype,"position",2);Po([$({type:Number,reflect:!0})],Ie.prototype,"offset",2);var cn=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,dn=(o,t,e,r)=>{for(var s=r>1?void 0:r?ln(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&cn(t,e,s),s};let uo=class extends Ie{};uo.styles=T`
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
  `;uo=dn([H("md-tooltip")],uo);var hn=Object.defineProperty,un=Object.getOwnPropertyDescriptor,pn=(o,t,e,r)=>{for(var s=r>1?void 0:r?un(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&hn(t,e,s),s};let po=class extends M{render(){return L`
      <div part="contents"><slot></slot></div>
      <div part="controls">
        <div part="controls-header">
          <h3>Playground</h3>
        </div>
        <div part="controls-body">
          <slot name="controls"></slot>
        </div>
      </div>
    `}};po.styles=T`
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
  `;po=pn([H("dc-demo")],po);function fn(){const t=document.body.querySelectorAll("h2, h3, h4, h5, h6"),e=document.getElementById("toc-list");if(!e)throw new Error("Table of Contents container not found.");let r=[e],s=[];t.forEach(i=>{let n=Number(i.localName.replace("h",""))-1,c=i.textContent,a=(i.textContent||"").toLowerCase().replace(/ /g,"-");s[n-1]=a;let l=[...s.slice(0,n-1),a].join("-");i.setAttribute("id",l);let h=document.createElement("a");h.setAttribute("href","#"+l),h.textContent=c;let d=document.createElement("li");d.appendChild(h),n==1?e.appendChild(d):(r[n-1]=document.createElement("ul"),r[n-1].appendChild(d),r[n-2].appendChild(r[n-1]))})}fn();
