var vo=o=>{throw TypeError(o)};var ke=(o,t,e)=>t.has(o)||vo("Cannot "+e);var y=(o,t,e)=>(ke(o,t,"read from private field"),e?e.call(o):t.get(o)),$=(o,t,e)=>t.has(o)?vo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),x=(o,t,e,r)=>(ke(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),k=(o,t,e)=>(ke(o,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ce=globalThis,Ge=ce.ShadowRoot&&(ce.ShadyCSS===void 0||ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qe=Symbol(),yo=new WeakMap;let Mo=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==qe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ge&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=yo.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&yo.set(e,t))}return t}toString(){return this.cssText}};const Mr=o=>new Mo(typeof o=="string"?o:o+"",void 0,qe),D=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((r,s,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[i+1],o[0]);return new Mo(e,o,qe)},zr=(o,t)=>{if(Ge)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=ce.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,o.appendChild(r)}},go=Ge?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Mr(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ir,defineProperty:Ur,getOwnPropertyDescriptor:Br,getOwnPropertyNames:Hr,getOwnPropertySymbols:jr,getPrototypeOf:Nr}=Object,q=globalThis,bo=q.trustedTypes,Fr=bo?bo.emptyScript:"",Ce=q.reactiveElementPolyfillSupport,Ht=(o,t)=>o,de={toAttribute(o,t){switch(t){case Boolean:o=o?Fr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Ye=(o,t)=>!Ir(o,t),_o={attribute:!0,type:String,converter:de,reflect:!1,hasChanged:Ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),q.litPropertyMetadata??(q.litPropertyMetadata=new WeakMap);class ht extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_o){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Ur(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:i}=Br(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return s==null?void 0:s.call(this)},set(n){const c=s==null?void 0:s.call(this);i.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_o}static _$Ei(){if(this.hasOwnProperty(Ht("elementProperties")))return;const t=Nr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ht("properties"))){const e=this.properties,r=[...Hr(e),...jr(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(go(s))}else t!==void 0&&e.push(go(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zr(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var i;const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){const n=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:de).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=r.getPropertyOptions(s),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)==null?void 0:i.fromAttribute)!==void 0?n.converter:de;this._$Em=s,this[s]=c.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??Ye)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s)n.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}ht.elementStyles=[],ht.shadowRootOptions={mode:"open"},ht[Ht("elementProperties")]=new Map,ht[Ht("finalized")]=new Map,Ce==null||Ce({ReactiveElement:ht}),(q.reactiveElementVersions??(q.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=globalThis,he=jt.trustedTypes,xo=he?he.createPolicy("lit-html",{createHTML:o=>o}):void 0,zo="$lit$",G=`lit$${(Math.random()+"").slice(9)}$`,Io="?"+G,Wr=`<${Io}>`,it=document,Nt=()=>it.createComment(""),Ft=o=>o===null||typeof o!="object"&&typeof o!="function",Uo=Array.isArray,Vr=o=>Uo(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Ee=`[ 	
\f\r]`,Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wo=/-->/g,$o=/>/g,et=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ao=/'/g,ko=/"/g,Bo=/^(?:script|style|textarea|title)$/i,Kr=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),T=Kr(1),Ct=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Co=new WeakMap,rt=it.createTreeWalker(it,129);function Ho(o,t){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return xo!==void 0?xo.createHTML(t):t}const Gr=(o,t)=>{const e=o.length-1,r=[];let s,i=t===2?"<svg>":"",n=Ut;for(let c=0;c<e;c++){const a=o[c];let l,h,d=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===Ut?h[1]==="!--"?n=wo:h[1]!==void 0?n=$o:h[2]!==void 0?(Bo.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=et):h[3]!==void 0&&(n=et):n===et?h[0]===">"?(n=s??Ut,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,l=h[1],n=h[3]===void 0?et:h[3]==='"'?ko:Ao):n===ko||n===Ao?n=et:n===wo||n===$o?n=Ut:(n=et,s=void 0);const u=n===et&&o[c+1].startsWith("/>")?" ":"";i+=n===Ut?a+Wr:d>=0?(r.push(l),a.slice(0,d)+zo+a.slice(d)+G+u):a+G+(d===-2?c:u)}return[Ho(o,i+(o[e]||"<?>")+(t===2?"</svg>":"")),r]};class Wt{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,n=0;const c=t.length-1,a=this.parts,[l,h]=Gr(t,e);if(this.el=Wt.createElement(l,r),rt.currentNode=this.el.content,e===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=rt.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(zo)){const f=h[n++],u=s.getAttribute(d).split(G),m=/([.?@])?(.*)/.exec(f);a.push({type:1,index:i,name:m[2],strings:u,ctor:m[1]==="."?Yr:m[1]==="?"?Xr:m[1]==="@"?Zr:ve}),s.removeAttribute(d)}else d.startsWith(G)&&(a.push({type:6,index:i}),s.removeAttribute(d));if(Bo.test(s.tagName)){const d=s.textContent.split(G),f=d.length-1;if(f>0){s.textContent=he?he.emptyScript:"";for(let u=0;u<f;u++)s.append(d[u],Nt()),rt.nextNode(),a.push({type:2,index:++i});s.append(d[f],Nt())}}}else if(s.nodeType===8)if(s.data===Io)a.push({type:2,index:i});else{let d=-1;for(;(d=s.data.indexOf(G,d+1))!==-1;)a.push({type:7,index:i}),d+=G.length-1}i++}}static createElement(t,e){const r=it.createElement("template");return r.innerHTML=t,r}}function Et(o,t,e=o,r){var n,c;if(t===Ct)return t;let s=r!==void 0?(n=e._$Co)==null?void 0:n[r]:e._$Cl;const i=Ft(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((c=s==null?void 0:s._$AO)==null||c.call(s,!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=s:e._$Cl=s),s!==void 0&&(t=Et(o,s._$AS(o,t.values),s,r)),t}class qr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??it).importNode(e,!0);rt.currentNode=s;let i=rt.nextNode(),n=0,c=0,a=r[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new ee(i,i.nextSibling,this,t):a.type===1?l=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(l=new Jr(i,this,t)),this._$AV.push(l),a=r[++c]}n!==(a==null?void 0:a.index)&&(i=rt.nextNode(),n++)}return rt.currentNode=it,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class ee{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Et(this,t,e),Ft(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==Ct&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vr(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==C&&Ft(this._$AH)?this._$AA.nextSibling.data=t:this.T(it.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Wt.createElement(Ho(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(e);else{const n=new qr(s,this),c=n.u(this.options);n.p(e),this.T(c),this._$AH=n}}_$AC(t){let e=Co.get(t.strings);return e===void 0&&Co.set(t.strings,e=new Wt(t)),e}k(t){Uo(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const i of t)s===e.length?e.push(r=new ee(this.S(Nt()),this.S(Nt()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=C}_$AI(t,e=this,r,s){const i=this.strings;let n=!1;if(i===void 0)t=Et(this,t,e,0),n=!Ft(t)||t!==this._$AH&&t!==Ct,n&&(this._$AH=t);else{const c=t;let a,l;for(t=i[0],a=0;a<i.length-1;a++)l=Et(this,c[r+a],e,a),l===Ct&&(l=this._$AH[a]),n||(n=!Ft(l)||l!==this._$AH[a]),l===C?t=C:t!==C&&(t+=(l??"")+i[a+1]),this._$AH[a]=l}n&&!s&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Yr extends ve{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}class Xr extends ve{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}}class Zr extends ve{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=Et(this,t,e,0)??C)===Ct)return;const r=this._$AH,s=t===C&&r!==C||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==C&&(r===C||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Jr{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Et(this,t)}}const Pe=jt.litHtmlPolyfillSupport;Pe==null||Pe(Wt,ee),(jt.litHtmlVersions??(jt.litHtmlVersions=[])).push("3.1.2");const Qr=(o,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const i=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new ee(t.insertBefore(Nt(),i),i,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class L extends ht{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ct}}var Lo;L._$litElement$=!0,L.finalized=!0,(Lo=globalThis.litElementHydrateSupport)==null||Lo.call(globalThis,{LitElement:L});const Oe=globalThis.litElementPolyfillSupport;Oe==null||Oe({LitElement:L});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ts={attribute:!0,type:String,converter:de,reflect:!1,hasChanged:Ye},es=(o=ts,t,e)=>{const{kind:r,metadata:s}=e;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),i.set(e.name,o),r==="accessor"){const{name:n}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,a,o)},init(c){return c!==void 0&&this.P(n,void 0,o),c}}}if(r==="setter"){const{name:n}=e;return function(c){const a=this[n];t.call(this,c),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+r)};function w(o){return(t,e)=>typeof e=="object"?es(o,t,e):((r,s,i)=>{const n=s.hasOwnProperty(i);return s.constructor.createProperty(i,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Eo=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function os(o,t){return(e,r,s)=>{const i=n=>{var c;return((c=n.renderRoot)==null?void 0:c.querySelector(o))??null};if(t){const{get:n,set:c}=typeof r=="object"?e:s??(()=>{const a=Symbol();return{get(){return this[a]},set(l){this[a]=l}}})();return Eo(e,r,{get(){let a=n.call(this);return a===void 0&&(a=i(this),(a!==null||this.hasUpdated)&&c.call(this,a)),a}})}return Eo(e,r,{get(){return i(this)}})}}const p=Symbol("internals"),Rt=o=>{var t,e;class r extends(e=o,t=p,e){constructor(){super(...arguments),this[t]=this.attachInternals()}}return r},Xe=o=>{const e=class e extends o{get form(){return this[p].form}get name(){return this.getAttribute("name")}get validity(){return this[p].validity}get validationMessage(){return this[p].validationMessage}get willValidate(){return this[p].willValidate}checkValidity(){return this[p].checkValidity()}reportValidity(){return this[p].reportValidity()}};e.formAssociated=!0;let t=e;return t},Ze=D`
  :host([hidden]) {
    display: none;
    visibility: hidden;
  }
`;var rs=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,jo=(o,t,e,r)=>{for(var s=r>1?void 0:r?ss(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&rs(t,e,s),s};const is=Xe(Rt(L));var yt,gt,bt,J,No,Fo,Wo;const co=class co extends is{constructor(){super();$(this,J);$(this,yt);$(this,gt);$(this,bt);this.type="button",this.disabled=!1,x(this,yt,k(this,J,No).bind(this)),x(this,gt,k(this,J,Fo).bind(this)),x(this,bt,k(this,J,Wo).bind(this)),this[p].role="button",this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",y(this,yt)),this.addEventListener("keyup",y(this,gt)),this.addEventListener("click",y(this,bt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",y(this,yt)),this.removeEventListener("keyup",y(this,gt)),this.removeEventListener("click",y(this,bt))}updated(e){e.has("disabled")&&this.updateInternals()}updateInternals(){this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false"}};yt=new WeakMap,gt=new WeakMap,bt=new WeakMap,J=new WeakSet,No=function(e){e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),e.stopPropagation(),e.key==="Enter"&&this.click())},Fo=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),this.click())},Wo=function(){var e;this.type!=="button"&&((e=this[p].form)==null||e[this.type]())},co.styles=[Ze];let nt=co;jo([w({reflect:!0})],nt.prototype,"type",2);jo([w({type:Boolean,reflect:!0})],nt.prototype,"disabled",2);var ns=Object.defineProperty,as=Object.getOwnPropertyDescriptor,cs=(o,t,e,r)=>{for(var s=r>1?void 0:r?as(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ns(t,e,s),s};const Je=o=>{class t extends o{constructor(){super(...arguments),this.currentControl=null}connectedCallback(){super.connectedCallback(),this.setCurrentControl(this.$control)}disconnectedCallback(){this.setCurrentControl(null),super.disconnectedCallback()}get $control(){return this.hasAttribute("for")?!this.htmlFor||!this.isConnected?null:this.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentElement}set $control(r){r?this.attach(r):this.detach()}setCurrentControl(r){this.handleControlChange(this.currentControl,r),this.currentControl=r}attach(r){r!==this.currentControl&&(this.setCurrentControl(r),this.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.setAttribute("for","")}handleControlChange(r=null,s=null){}}return cs([w({attribute:"for",type:String})],t.prototype,"htmlFor",2),t};let ye=!1;window.addEventListener("keydown",()=>ye=!0,{capture:!0});window.addEventListener("mousedown",()=>ye=!1,{capture:!0});const ls=D`
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
`;var ds=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,Vo=o=>{throw TypeError(o)},Ko=(o,t,e,r)=>{for(var s=r>1?void 0:r?hs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ds(t,e,s),s},Go=(o,t,e)=>t.has(o)||Vo("Cannot "+e),Se=(o,t,e)=>(Go(o,t,"read from private field"),e?e.call(o):t.get(o)),ie=(o,t,e)=>t.has(o)?Vo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),Re=(o,t,e)=>(Go(o,t,"access private method"),e),Te,Le,Me,Bt,qo,Yo,Xo;let ue=class extends Je(Rt(L)){constructor(){super(),ie(this,Bt),this.inward=!1,ie(this,Te,Re(this,Bt,qo).bind(this)),ie(this,Le,Re(this,Bt,Yo).bind(this)),ie(this,Me,Re(this,Bt,Xo).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={focusin:Se(this,Te),focusout:Se(this,Le),pointerdown:Se(this,Me)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}};Te=new WeakMap;Le=new WeakMap;Me=new WeakMap;Bt=new WeakSet;qo=function(){ye&&this[p].states.add("visible")};Yo=function(){this[p].states.delete("visible")};Xo=function(){this[p].states.delete("visible")};ue.styles=[ls];Ko([w({type:Boolean,reflect:!0})],ue.prototype,"inward",2);ue=Ko([F("md-focus-ring")],ue);const us=D`
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
`;var ps=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,Zo=o=>{throw TypeError(o)},Qe=(o,t,e,r)=>{for(var s=r>1?void 0:r?fs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ps(t,e,s),s},to=(o,t,e)=>t.has(o)||Zo("Cannot "+e),O=(o,t,e)=>(to(o,t,"read from private field"),e?e.call(o):t.get(o)),I=(o,t,e)=>t.has(o)?Zo("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),oe=(o,t,e,r)=>(to(o,t,"write to private field"),r?r.call(o,e):t.set(o,e),e),ot=(o,t,e)=>(to(o,t,"access private method"),e),Vt,Dt,le,ze,Ie,Ue,Be,He,H,W,Jo,Qo,tr,er,or,rr,sr;const ms=450,vs=225,ys=105,gs=375;function bs({x:o,y:t},{x:e,y:r}){return Math.sqrt((o-e)**2+(t-r)**2)}let Kt=class extends Je(Rt(L)){constructor(){super(),I(this,W),this.$ripples=[],this.enterBehavior="always",this.spaceBehavior="once",I(this,Vt,!1),I(this,Dt,!1),I(this,le,0),I(this,ze,ot(this,W,Jo).bind(this)),I(this,Ie,ot(this,W,Qo).bind(this)),I(this,Ue,ot(this,W,tr).bind(this)),I(this,Be,ot(this,W,er).bind(this)),I(this,He,ot(this,W,or).bind(this)),I(this,H,ot(this,W,rr).bind(this)),this[p].ariaHidden="true"}handleControlChange(o=null,t=null){const e={keydown:O(this,ze),keyup:O(this,Ie),pointerenter:O(this,Ue),pointerleave:O(this,Be),pointerdown:O(this,He)};Object.keys(e).forEach(r=>{o==null||o.removeEventListener(r,e[r]),t==null||t.addEventListener(r,e[r])})}addRipple(o=null){const{startCenter:t,endCenter:e,radius:r}=ot(this,W,sr).call(this,o),s=r*2+"px",i=`${t.x-r}px ${t.y-r}px`,n=`${e.x-r}px ${e.y-r}px`,c=document.createElement("div");c.setAttribute("part","ripple"),this.renderRoot.append(c),this.$ripples.push(c),c.animate({opacity:[0,.12]},{duration:ys,easing:"linear",fill:"forwards"}),c.animate({height:[s,s],width:[s,s],translate:[i,n],scale:[.2,1.35]},{duration:ms,easing:"cubic-bezier(0.2, 0, 0, 1)",fill:"forwards"}),oe(this,le,Date.now())}removeRipple(o){setTimeout(()=>{const t=o.animate({opacity:[getComputedStyle(o).opacity,"0"]},{duration:gs,fill:"forwards",easing:"linear"});t.onfinish=t.oncancel=()=>o.remove()},Math.max(vs-(Date.now()-O(this,le)),0))}removeRippleAll(){for(const o of this.$ripples.splice(0))this.removeRipple(o)}};Vt=new WeakMap;Dt=new WeakMap;le=new WeakMap;ze=new WeakMap;Ie=new WeakMap;Ue=new WeakMap;Be=new WeakMap;He=new WeakMap;H=new WeakMap;W=new WeakSet;Jo=function(o){o.key==="Enter"&&this.enterBehavior==="always"||o.key===" "&&this.spaceBehavior==="always"?(this.addRipple(),this.removeRippleAll()):o.key===" "&&this.spaceBehavior==="once"&&(O(this,Vt)||this.addRipple(),oe(this,Vt,!0))};Qo=function(o){o.key===" "&&this.spaceBehavior==="once"&&(oe(this,Vt,!1),this.removeRippleAll())};tr=function(o){o.pointerType!=="touch"&&(this[p].states.add("hover"),O(this,Dt)&&this.addRipple(o))};er=function(){this[p].states.delete("hover"),O(this,Dt)&&this.removeRippleAll()};or=function(o){o.pointerType==="mouse"&&oe(this,Dt,!0),document.addEventListener("pointerup",O(this,H)),document.addEventListener("touchcancel",O(this,H)),document.addEventListener("touchend",O(this,H)),document.addEventListener("touchmove",O(this,H)),o.button!==2&&this.addRipple(o)};rr=function(){oe(this,Dt,!1),document.removeEventListener("pointerup",O(this,H)),document.removeEventListener("touchcancel",O(this,H)),document.removeEventListener("touchend",O(this,H)),document.removeEventListener("touchmove",O(this,H)),this.removeRippleAll()};sr=function(o=null){const t=this.getBoundingClientRect(),e={x:t.width/2,y:t.height/2},r=!o,s=e;let i=s;r||(i.x=o.clientX-t.left,i.y=o.clientY-t.top);const n=[{x:0,y:0},{x:t.width,y:0},{x:0,y:t.height},{x:t.width,y:t.height}],c=Math.max(...n.map(a=>bs(s,a)));return{startCenter:i,endCenter:s,radius:c}};Kt.styles=[us];Qe([w()],Kt.prototype,"enterBehavior",2);Qe([w()],Kt.prototype,"spaceBehavior",2);Kt=Qe([F("md-ripple")],Kt);const _s=D`
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
`,Tt=D`
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
`;var xs=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,$s=Object.getPrototypeOf,As=Reflect.get,eo=(o,t,e,r)=>{for(var s=r>1?void 0:r?ws(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&xs(t,e,s),s},ks=(o,t,e)=>As($s(o),e,t);let st=class extends nt{constructor(){super(...arguments),this.variant="filled",this.color="primary"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" name="icon" aria-hidden="true"></slot>
      <slot part="label"></slot>
      <slot part="trailingicon" name="trailingicon" aria-hidden="true"></slot>
    `}};st.styles=[...ks(st,st,"styles"),Tt,_s];eo([w({reflect:!0})],st.prototype,"variant",2);eo([w({reflect:!0})],st.prototype,"color",2);st=eo([F("md-button")],st);const Cs=D`
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
`;var Es=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,Os=Object.getPrototypeOf,Ss=Reflect.get,ge=(o,t,e,r)=>{for(var s=r>1?void 0:r?Ps(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Es(t,e,s),s},Rs=(o,t,e)=>Ss(Os(o),e,t);let Y=class extends nt{constructor(){super(...arguments),this.size="medium",this.color="surface",this.lowered=!1}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon" aria-hidden="true"></slot>
      <slot part="label" name="label"></slot>
    `}};Y.styles=[...Rs(Y,Y,"styles"),Tt,Cs];ge([w({reflect:!0})],Y.prototype,"size",2);ge([w({reflect:!0})],Y.prototype,"color",2);ge([w({type:Boolean,reflect:!0})],Y.prototype,"lowered",2);Y=ge([F("md-fab")],Y);const ir=D`
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
`;var Ds=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,Ls=Object.getPrototypeOf,Ms=Reflect.get,nr=(o,t,e,r)=>{for(var s=r>1?void 0:r?Ts(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ds(t,e,s),s},zs=(o,t,e)=>Ms(Ls(o),e,t);let ut=class extends nt{constructor(){super(...arguments),this.variant="standard"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple></md-ripple>
      <span part="target"></span>
      <slot part="icon"></slot>
    `}};ut.styles=[...zs(ut,ut,"styles"),Tt,ir];nr([w({reflect:!0})],ut.prototype,"variant",2);ut=nr([F("md-icon-button")],ut);var Is=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,ar=(o,t,e,r)=>{for(var s=r>1?void 0:r?Us(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Is(t,e,s),s};const Bs={true:"checked",false:"unchecked"},Hs=Xe(Rt(L));var _t,xt,V,cr,lr,je;const lo=class lo extends Hs{constructor(){super();$(this,V);$(this,_t);$(this,xt);this.checked=!1,this.disabled=!1,x(this,_t,k(this,V,cr).bind(this)),x(this,xt,k(this,V,lr).bind(this)),this._ignoreClick=!1,this[p].role="switch",this.checked=this.hasAttribute("checked"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",y(this,_t)),this.addEventListener("keydown",y(this,xt))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",y(this,_t)),this.removeEventListener("keydown",y(this,xt))}updated(e){(e.has("checked")||e.has("disabled"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].ariaPressed=this.checked?"true":"false",this[p].states.add(`${Bs[this[p].ariaPressed]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};_t=new WeakMap,xt=new WeakMap,V=new WeakSet,cr=function(e){e.stopPropagation(),e.preventDefault(),!this._ignoreClick&&k(this,V,je).call(this)},lr=function(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),e.stopPropagation(),k(this,V,je).call(this))},je=function(){this.disabled||(this.checked=!this.checked,this.updateInternals())},lo.styles=[Ze];let Pt=lo;ar([w({type:Boolean})],Pt.prototype,"checked",2);ar([w({type:Boolean,reflect:!0})],Pt.prototype,"disabled",2);const js=D`
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
`;var Ns=Object.defineProperty,Fs=Object.getOwnPropertyDescriptor,Ws=Object.getPrototypeOf,Vs=Reflect.get,dr=(o,t,e,r)=>{for(var s=r>1?void 0:r?Fs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ns(t,e,s),s},Ks=(o,t,e)=>Vs(Ws(o),e,t);let pt=class extends Pt{constructor(){super(),this.variant="standard",this[p].role="button"}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      <slot part="icon icon-unchecked"></slot>
      <slot part="icon icon-checked" name="checked"></slot>
    `}};pt.styles=[...Ks(pt,pt,"styles"),Tt,ir,js];dr([w({reflect:!0})],pt.prototype,"variant",2);pt=dr([F("md-icon-button-toggle")],pt);var Gs=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,oo=(o,t,e,r)=>{for(var s=r>1?void 0:r?qs(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Gs(t,e,s),s};const Po={true:"checked",false:"unchecked",mixed:"indeterminate"},Ys=Xe(Rt(L));var wt,$t,At,z,hr,ur,pr,Ne;const ho=class ho extends Ys{constructor(){super();$(this,z);$(this,wt);$(this,$t);$(this,At);this.checked=!1,this.indeterminate=!1,this.disabled=!1,x(this,wt,k(this,z,hr).bind(this)),x(this,$t,k(this,z,ur).bind(this)),x(this,At,k(this,z,pr).bind(this)),this[p].role="checkbox",this.checked=this.hasAttribute("checked"),this.indeterminate=this.hasAttribute("indeterminate"),this.updateInternals()}connectedCallback(){super.connectedCallback(),this.addEventListener("click",y(this,wt)),this.addEventListener("keydown",y(this,$t)),this.addEventListener("keyup",y(this,At))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",y(this,wt)),this.removeEventListener("keydown",y(this,$t)),this.removeEventListener("keyup",y(this,At))}updated(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&this.updateInternals(!0)}updateInternals(e=!1){this[p].states.delete("was-unchecked"),this[p].states.delete("was-checked"),this[p].states.delete("was-indeterminate"),this[p].states.add(`was-${Po[this[p].ariaChecked]}`),this[p].ariaChecked=this.indeterminate?"mixed":this.checked?"true":"false",this[p].states.delete("unchecked"),this[p].states.delete("checked"),this[p].states.delete("indeterminate"),this[p].states.add(`${Po[this[p].ariaChecked]}`),this.setAttribute("tabindex",this.disabled?"-1":"0"),this[p].ariaDisabled=this.disabled?"true":"false",this[p].setFormValue(this.checked?"on":null),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:this.checked}))}};wt=new WeakMap,$t=new WeakMap,At=new WeakMap,z=new WeakSet,hr=function(e){e.stopPropagation(),e.preventDefault(),k(this,z,Ne).call(this)},ur=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation())},pr=function(e){e.key===" "&&(e.preventDefault(),e.stopPropagation(),k(this,z,Ne).call(this))},Ne=function(){this.disabled||(this.checked=!this.checked,this.indeterminate=!1,this.updateInternals())},ho.styles=[Ze];let Ot=ho;oo([w({type:Boolean})],Ot.prototype,"checked",2);oo([w({type:Boolean})],Ot.prototype,"indeterminate",2);oo([w({type:Boolean,reflect:!0})],Ot.prototype,"disabled",2);const Xs=D`
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
`;var Zs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Qs=Object.getPrototypeOf,ti=Reflect.get,fr=(o,t,e,r)=>{for(var s=r>1?void 0:r?Js(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Zs(t,e,s),s},ei=(o,t,e)=>ti(Qs(o),e,t);let ft=class extends Ot{constructor(){super(...arguments),this.error=!1}render(){return T`
      <md-focus-ring></md-focus-ring>
      <md-ripple enterbehavior="none"></md-ripple>
      <span part="target"></span>
      ${this.renderIcon()}
    `}renderIcon(){return T`
      <svg part="icon" viewBox="0 0 18 18" aria-hidden="true">
        <rect part="mark mark-short"></rect>
        <rect part="mark mark-long"></rect>
      </svg>
    `}};ft.styles=[...ei(ft,ft,"styles"),Tt,Xs];fr([w({type:Boolean,reflect:!0})],ft.prototype,"error",2);ft=fr([F("md-checkbox")],ft);const oi=D`
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
`;var ri=Object.defineProperty,si=Object.getOwnPropertyDescriptor,ro=(o,t,e,r)=>{for(var s=r>1?void 0:r?si(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ri(t,e,s),s};let Gt=class extends Pt{constructor(){super(...arguments),this.icons=!1,this.checkedIconOnly=!1}render(){return T`
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
    `}};Gt.styles=[Tt,oi];ro([w({type:Boolean,reflect:!0})],Gt.prototype,"icons",2);ro([w({type:Boolean,reflect:!0})],Gt.prototype,"checkedIconOnly",2);Gt=ro([F("md-switch")],Gt);const ii=Math.min,ni=Math.max,ai={left:"right",right:"left",bottom:"top",top:"bottom"},ci={start:"end",end:"start"};function Oo(o,t,e){return ni(o,ii(t,e))}function be(o,t){return typeof o=="function"?o(t):o}function at(o){return o.split("-")[0]}function _e(o){return o.split("-")[1]}function mr(o){return o==="x"?"y":"x"}function vr(o){return o==="y"?"height":"width"}function xe(o){return["top","bottom"].includes(at(o))?"y":"x"}function yr(o){return mr(xe(o))}function li(o,t,e){e===void 0&&(e=!1);const r=_e(o),s=yr(o),i=vr(s);let n=s==="x"?r===(e?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(n=pe(n)),[n,pe(n)]}function di(o){const t=pe(o);return[Fe(o),t,Fe(t)]}function Fe(o){return o.replace(/start|end/g,t=>ci[t])}function hi(o,t,e){const r=["left","right"],s=["right","left"],i=["top","bottom"],n=["bottom","top"];switch(o){case"top":case"bottom":return e?t?s:r:t?r:s;case"left":case"right":return t?i:n;default:return[]}}function ui(o,t,e,r){const s=_e(o);let i=hi(at(o),e==="start",r);return s&&(i=i.map(n=>n+"-"+s),t&&(i=i.concat(i.map(Fe)))),i}function pe(o){return o.replace(/left|right|bottom|top/g,t=>ai[t])}function pi(o){return{top:0,right:0,bottom:0,left:0,...o}}function fi(o){return typeof o!="number"?pi(o):{top:o,right:o,bottom:o,left:o}}function fe(o){return{...o,top:o.y,left:o.x,right:o.x+o.width,bottom:o.y+o.height}}function So(o,t,e){let{reference:r,floating:s}=o;const i=xe(t),n=yr(t),c=vr(n),a=at(t),l=i==="y",h=r.x+r.width/2-s.width/2,d=r.y+r.height/2-s.height/2,f=r[c]/2-s[c]/2;let u;switch(a){case"top":u={x:h,y:r.y-s.height};break;case"bottom":u={x:h,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:d};break;case"left":u={x:r.x-s.width,y:d};break;default:u={x:r.x,y:r.y}}switch(_e(t)){case"start":u[n]-=f*(e&&l?-1:1);break;case"end":u[n]+=f*(e&&l?-1:1);break}return u}const mi=async(o,t,e)=>{const{placement:r="bottom",strategy:s="absolute",middleware:i=[],platform:n}=e,c=i.filter(Boolean),a=await(n.isRTL==null?void 0:n.isRTL(t));let l=await n.getElementRects({reference:o,floating:t,strategy:s}),{x:h,y:d}=So(l,r,a),f=r,u={},m=0;for(let g=0;g<c.length;g++){const{name:b,fn:v}=c[g],{x:_,y:A,data:S,reset:P}=await v({x:h,y:d,initialPlacement:r,placement:f,strategy:s,middlewareData:u,rects:l,platform:n,elements:{reference:o,floating:t}});h=_??h,d=A??d,u={...u,[b]:{...u[b],...S}},P&&m<=50&&(m++,typeof P=="object"&&(P.placement&&(f=P.placement),P.rects&&(l=P.rects===!0?await n.getElementRects({reference:o,floating:t,strategy:s}):P.rects),{x:h,y:d}=So(l,f,a)),g=-1)}return{x:h,y:d,placement:f,strategy:s,middlewareData:u}};async function gr(o,t){var e;t===void 0&&(t={});const{x:r,y:s,platform:i,rects:n,elements:c,strategy:a}=o,{boundary:l="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:f=!1,padding:u=0}=be(t,o),m=fi(u),b=c[f?d==="floating"?"reference":"floating":d],v=fe(await i.getClippingRect({element:(e=await(i.isElement==null?void 0:i.isElement(b)))==null||e?b:b.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(c.floating)),boundary:l,rootBoundary:h,strategy:a})),_=d==="floating"?{...n.floating,x:r,y:s}:n.reference,A=await(i.getOffsetParent==null?void 0:i.getOffsetParent(c.floating)),S=await(i.isElement==null?void 0:i.isElement(A))?await(i.getScale==null?void 0:i.getScale(A))||{x:1,y:1}:{x:1,y:1},P=fe(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:_,offsetParent:A,strategy:a}):_);return{top:(v.top-P.top+m.top)/S.y,bottom:(P.bottom-v.bottom+m.bottom)/S.y,left:(v.left-P.left+m.left)/S.x,right:(P.right-v.right+m.right)/S.x}}const vi=function(o){return o===void 0&&(o={}),{name:"flip",options:o,async fn(t){var e,r;const{placement:s,middlewareData:i,rects:n,initialPlacement:c,platform:a,elements:l}=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:f,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:g=!0,...b}=be(o,t);if((e=i.arrow)!=null&&e.alignmentOffset)return{};const v=at(s),_=at(c)===c,A=await(a.isRTL==null?void 0:a.isRTL(l.floating)),S=f||(_||!g?[pe(c)]:di(c));!f&&m!=="none"&&S.push(...ui(c,g,m,A));const P=[c,...S],Q=await gr(t,b),se=[];let Mt=((r=i.flip)==null?void 0:r.overflows)||[];if(h&&se.push(Q[v]),d){const tt=li(s,n,A);se.push(Q[tt[0]],Q[tt[1]])}if(Mt=[...Mt,{placement:s,overflows:se}],!se.every(tt=>tt<=0)){var uo,po;const tt=(((uo=i.flip)==null?void 0:uo.index)||0)+1,mo=P[tt];if(mo)return{data:{index:tt,overflows:Mt},reset:{placement:mo}};let zt=(po=Mt.filter(lt=>lt.overflows[0]<=0).sort((lt,dt)=>lt.overflows[1]-dt.overflows[1])[0])==null?void 0:po.placement;if(!zt)switch(u){case"bestFit":{var fo;const lt=(fo=Mt.map(dt=>[dt.placement,dt.overflows.filter(It=>It>0).reduce((It,Lr)=>It+Lr,0)]).sort((dt,It)=>dt[1]-It[1])[0])==null?void 0:fo[0];lt&&(zt=lt);break}case"initialPlacement":zt=c;break}if(s!==zt)return{reset:{placement:zt}}}return{}}}};async function yi(o,t){const{placement:e,platform:r,elements:s}=o,i=await(r.isRTL==null?void 0:r.isRTL(s.floating)),n=at(e),c=_e(e),a=xe(e)==="y",l=["left","top"].includes(n)?-1:1,h=i&&a?-1:1,d=be(t,o);let{mainAxis:f,crossAxis:u,alignmentAxis:m}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof m=="number"&&(u=c==="end"?m*-1:m),a?{x:u*h,y:f*l}:{x:f*l,y:u*h}}const gi=function(o){return o===void 0&&(o=0),{name:"offset",options:o,async fn(t){var e,r;const{x:s,y:i,placement:n,middlewareData:c}=t,a=await yi(t,o);return n===((e=c.offset)==null?void 0:e.placement)&&(r=c.arrow)!=null&&r.alignmentOffset?{}:{x:s+a.x,y:i+a.y,data:{...a,placement:n}}}}},bi=function(o){return o===void 0&&(o={}),{name:"shift",options:o,async fn(t){const{x:e,y:r,placement:s}=t,{mainAxis:i=!0,crossAxis:n=!1,limiter:c={fn:b=>{let{x:v,y:_}=b;return{x:v,y:_}}},...a}=be(o,t),l={x:e,y:r},h=await gr(t,a),d=xe(at(s)),f=mr(d);let u=l[f],m=l[d];if(i){const b=f==="y"?"top":"left",v=f==="y"?"bottom":"right",_=u+h[b],A=u-h[v];u=Oo(_,u,A)}if(n){const b=d==="y"?"top":"left",v=d==="y"?"bottom":"right",_=m+h[b],A=m-h[v];m=Oo(_,m,A)}const g=c.fn({...t,[f]:u,[d]:m});return{...g,data:{x:g.x-e,y:g.y-r}}}}},We=Math.min,mt=Math.max,me=Math.round,ne=Math.floor,X=o=>({x:o,y:o});function Lt(o){return br(o)?(o.nodeName||"").toLowerCase():"#document"}function R(o){var t;return(o==null||(t=o.ownerDocument)==null?void 0:t.defaultView)||window}function K(o){var t;return(t=(br(o)?o.ownerDocument:o.document)||window.document)==null?void 0:t.documentElement}function br(o){return o instanceof Node||o instanceof R(o).Node}function j(o){return o instanceof Element||o instanceof R(o).Element}function N(o){return o instanceof HTMLElement||o instanceof R(o).HTMLElement}function Ro(o){return typeof ShadowRoot>"u"?!1:o instanceof ShadowRoot||o instanceof R(o).ShadowRoot}function re(o){const{overflow:t,overflowX:e,overflowY:r,display:s}=M(o);return/auto|scroll|overlay|hidden|clip/.test(t+r+e)&&!["inline","contents"].includes(s)}function _i(o){return["table","td","th"].includes(Lt(o))}function we(o){return[":popover-open",":modal"].some(t=>{try{return o.matches(t)}catch{return!1}})}function so(o){const t=io(),e=M(o);return e.transform!=="none"||e.perspective!=="none"||(e.containerType?e.containerType!=="normal":!1)||!t&&(e.backdropFilter?e.backdropFilter!=="none":!1)||!t&&(e.filter?e.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(e.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(e.contain||"").includes(r))}function xi(o){let t=Z(o);for(;N(t)&&!St(t);){if(we(t))return null;if(so(t))return t;t=Z(t)}return null}function io(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function St(o){return["html","body","#document"].includes(Lt(o))}function M(o){return R(o).getComputedStyle(o)}function $e(o){return j(o)?{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop}:{scrollLeft:o.scrollX,scrollTop:o.scrollY}}function Z(o){if(Lt(o)==="html")return o;const t=o.assignedSlot||o.parentNode||Ro(o)&&o.host||K(o);return Ro(t)?t.host:t}function _r(o){const t=Z(o);return St(t)?o.ownerDocument?o.ownerDocument.body:o.body:N(t)&&re(t)?t:_r(t)}function qt(o,t,e){var r;t===void 0&&(t=[]),e===void 0&&(e=!0);const s=_r(o),i=s===((r=o.ownerDocument)==null?void 0:r.body),n=R(s);return i?t.concat(n,n.visualViewport||[],re(s)?s:[],n.frameElement&&e?qt(n.frameElement):[]):t.concat(s,qt(s,[],e))}function xr(o){const t=M(o);let e=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const s=N(o),i=s?o.offsetWidth:e,n=s?o.offsetHeight:r,c=me(e)!==i||me(r)!==n;return c&&(e=i,r=n),{width:e,height:r,$:c}}function no(o){return j(o)?o:o.contextElement}function vt(o){const t=no(o);if(!N(t))return X(1);const e=t.getBoundingClientRect(),{width:r,height:s,$:i}=xr(t);let n=(i?me(e.width):e.width)/r,c=(i?me(e.height):e.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!c||!Number.isFinite(c))&&(c=1),{x:n,y:c}}const wi=X(0);function wr(o){const t=R(o);return!io()||!t.visualViewport?wi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function $i(o,t,e){return t===void 0&&(t=!1),!e||t&&e!==R(o)?!1:t}function ct(o,t,e,r){t===void 0&&(t=!1),e===void 0&&(e=!1);const s=o.getBoundingClientRect(),i=no(o);let n=X(1);t&&(r?j(r)&&(n=vt(r)):n=vt(o));const c=$i(i,e,r)?wr(i):X(0);let a=(s.left+c.x)/n.x,l=(s.top+c.y)/n.y,h=s.width/n.x,d=s.height/n.y;if(i){const f=R(i),u=r&&j(r)?R(r):r;let m=f,g=m.frameElement;for(;g&&r&&u!==m;){const b=vt(g),v=g.getBoundingClientRect(),_=M(g),A=v.left+(g.clientLeft+parseFloat(_.paddingLeft))*b.x,S=v.top+(g.clientTop+parseFloat(_.paddingTop))*b.y;a*=b.x,l*=b.y,h*=b.x,d*=b.y,a+=A,l+=S,m=R(g),g=m.frameElement}}return fe({width:h,height:d,x:a,y:l})}function Ai(o){let{elements:t,rect:e,offsetParent:r,strategy:s}=o;const i=s==="fixed",n=K(r),c=t?we(t.floating):!1;if(r===n||c&&i)return e;let a={scrollLeft:0,scrollTop:0},l=X(1);const h=X(0),d=N(r);if((d||!d&&!i)&&((Lt(r)!=="body"||re(n))&&(a=$e(r)),N(r))){const f=ct(r);l=vt(r),h.x=f.x+r.clientLeft,h.y=f.y+r.clientTop}return{width:e.width*l.x,height:e.height*l.y,x:e.x*l.x-a.scrollLeft*l.x+h.x,y:e.y*l.y-a.scrollTop*l.y+h.y}}function ki(o){return Array.from(o.getClientRects())}function $r(o){return ct(K(o)).left+$e(o).scrollLeft}function Ci(o){const t=K(o),e=$e(o),r=o.ownerDocument.body,s=mt(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=mt(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let n=-e.scrollLeft+$r(o);const c=-e.scrollTop;return M(r).direction==="rtl"&&(n+=mt(t.clientWidth,r.clientWidth)-s),{width:s,height:i,x:n,y:c}}function Ei(o,t){const e=R(o),r=K(o),s=e.visualViewport;let i=r.clientWidth,n=r.clientHeight,c=0,a=0;if(s){i=s.width,n=s.height;const l=io();(!l||l&&t==="fixed")&&(c=s.offsetLeft,a=s.offsetTop)}return{width:i,height:n,x:c,y:a}}function Pi(o,t){const e=ct(o,!0,t==="fixed"),r=e.top+o.clientTop,s=e.left+o.clientLeft,i=N(o)?vt(o):X(1),n=o.clientWidth*i.x,c=o.clientHeight*i.y,a=s*i.x,l=r*i.y;return{width:n,height:c,x:a,y:l}}function Do(o,t,e){let r;if(t==="viewport")r=Ei(o,e);else if(t==="document")r=Ci(K(o));else if(j(t))r=Pi(t,e);else{const s=wr(o);r={...t,x:t.x-s.x,y:t.y-s.y}}return fe(r)}function Ar(o,t){const e=Z(o);return e===t||!j(e)||St(e)?!1:M(e).position==="fixed"||Ar(e,t)}function Oi(o,t){const e=t.get(o);if(e)return e;let r=qt(o,[],!1).filter(c=>j(c)&&Lt(c)!=="body"),s=null;const i=M(o).position==="fixed";let n=i?Z(o):o;for(;j(n)&&!St(n);){const c=M(n),a=so(n);!a&&c.position==="fixed"&&(s=null),(i?!a&&!s:!a&&c.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||re(n)&&!a&&Ar(o,n))?r=r.filter(h=>h!==n):s=c,n=Z(n)}return t.set(o,r),r}function Si(o){let{element:t,boundary:e,rootBoundary:r,strategy:s}=o;const n=[...e==="clippingAncestors"?we(t)?[]:Oi(t,this._c):[].concat(e),r],c=n[0],a=n.reduce((l,h)=>{const d=Do(t,h,s);return l.top=mt(d.top,l.top),l.right=We(d.right,l.right),l.bottom=We(d.bottom,l.bottom),l.left=mt(d.left,l.left),l},Do(t,c,s));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function Ri(o){const{width:t,height:e}=xr(o);return{width:t,height:e}}function Di(o,t,e){const r=N(t),s=K(t),i=e==="fixed",n=ct(o,!0,i,t);let c={scrollLeft:0,scrollTop:0};const a=X(0);if(r||!r&&!i)if((Lt(t)!=="body"||re(s))&&(c=$e(t)),r){const d=ct(t,!0,i,t);a.x=d.x+t.clientLeft,a.y=d.y+t.clientTop}else s&&(a.x=$r(s));const l=n.left+c.scrollLeft-a.x,h=n.top+c.scrollTop-a.y;return{x:l,y:h,width:n.width,height:n.height}}function De(o){return M(o).position==="static"}function To(o,t){return!N(o)||M(o).position==="fixed"?null:t?t(o):o.offsetParent}function kr(o,t){const e=R(o);if(we(o))return e;if(!N(o)){let s=Z(o);for(;s&&!St(s);){if(j(s)&&!De(s))return s;s=Z(s)}return e}let r=To(o,t);for(;r&&_i(r)&&De(r);)r=To(r,t);return r&&St(r)&&De(r)&&!so(r)?e:r||xi(o)||e}const Ti=async function(o){const t=this.getOffsetParent||kr,e=this.getDimensions,r=await e(o.floating);return{reference:Di(o.reference,await t(o.floating),o.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Li(o){return M(o).direction==="rtl"}const Mi={convertOffsetParentRelativeRectToViewportRelativeRect:Ai,getDocumentElement:K,getClippingRect:Si,getOffsetParent:kr,getElementRects:Ti,getClientRects:ki,getDimensions:Ri,getScale:vt,isElement:j,isRTL:Li};function zi(o,t){let e=null,r;const s=K(o);function i(){var c;clearTimeout(r),(c=e)==null||c.disconnect(),e=null}function n(c,a){c===void 0&&(c=!1),a===void 0&&(a=1),i();const{left:l,top:h,width:d,height:f}=o.getBoundingClientRect();if(c||t(),!d||!f)return;const u=ne(h),m=ne(s.clientWidth-(l+d)),g=ne(s.clientHeight-(h+f)),b=ne(l),_={rootMargin:-u+"px "+-m+"px "+-g+"px "+-b+"px",threshold:mt(0,We(1,a))||1};let A=!0;function S(P){const Q=P[0].intersectionRatio;if(Q!==a){if(!A)return n();Q?n(!1,Q):r=setTimeout(()=>{n(!1,1e-7)},1e3)}A=!1}try{e=new IntersectionObserver(S,{..._,root:s.ownerDocument})}catch{e=new IntersectionObserver(S,_)}e.observe(o)}return n(!0),i}function Ii(o,t,e,r){r===void 0&&(r={});const{ancestorScroll:s=!0,ancestorResize:i=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=!1}=r,l=no(o),h=s||i?[...l?qt(l):[],...qt(t)]:[];h.forEach(v=>{s&&v.addEventListener("scroll",e,{passive:!0}),i&&v.addEventListener("resize",e)});const d=l&&c?zi(l,e):null;let f=-1,u=null;n&&(u=new ResizeObserver(v=>{let[_]=v;_&&_.target===l&&u&&(u.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var A;(A=u)==null||A.observe(t)})),e()}),l&&!a&&u.observe(l),u.observe(t));let m,g=a?ct(o):null;a&&b();function b(){const v=ct(o);g&&(v.x!==g.x||v.y!==g.y||v.width!==g.width||v.height!==g.height)&&e(),g=v,m=requestAnimationFrame(b)}return e(),()=>{var v;h.forEach(_=>{s&&_.removeEventListener("scroll",e),i&&_.removeEventListener("resize",e)}),d==null||d(),(v=u)==null||v.disconnect(),u=null,a&&cancelAnimationFrame(m)}}const Ui=gi,Bi=bi,Hi=vi,ji=(o,t,e)=>{const r=new Map,s={platform:Mi,...e},i={...s.platform,_c:r};return mi(o,t,{...s,platform:i})};var Ni=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,ao=(o,t,e,r)=>{for(var s=r>1?void 0:r?Fi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ni(t,e,s),s};let ae=0;const Wi=Je(Rt(L));var U,B,Yt,Xt,Zt,Jt,Qt,te,kt,E,Cr,Er,Pr,Or,Sr,Rr,Dr,Tr;class Ae extends Wi{constructor(){super();$(this,E);$(this,U);$(this,B);$(this,Yt);$(this,Xt);$(this,Zt);$(this,Jt);$(this,Qt);$(this,te);$(this,kt);this.position="top",this.offset=4,this.padding=4,this.showDuration=100,this.hideDuration=100,this.mouseShowDelay=100,this.mouseHideDelay=0,this.focusShowDelay=100,this.focusHideDelay=0,this.touchShowDelay=700,this.touchHideDelay=1500,this.recentlyShowedDelay=800,x(this,U,void 0),x(this,B,void 0),x(this,Yt,k(this,E,Er).bind(this)),x(this,Xt,k(this,E,Pr).bind(this)),x(this,Zt,k(this,E,Or).bind(this)),x(this,Jt,k(this,E,Sr).bind(this)),x(this,Qt,k(this,E,Rr).bind(this)),x(this,te,k(this,E,Dr).bind(this)),x(this,kt,k(this,E,Tr).bind(this)),this[p].role="tooltip"}render(){return T`<slot @slotchange="${k(this,E,Cr)}"></slot>`}set visible(e){e?(this.clearAutoUpdate=Ii(this.$control,this,this.updatePosition.bind(this)),this[p].states.add("showing"),this.updatePosition(),setTimeout(()=>{this[p].states.delete("showing"),this[p].states.add("visible")},this.showDuration)):(this[p].states.add("hiding"),setTimeout(()=>{var r;this[p].states.delete("hiding"),this[p].states.delete("visible"),(r=this.clearAutoUpdate)==null||r.call(this)},this.hideDuration))}handleControlChange(e=null,r=null){const s={focusin:y(this,Yt),focusout:y(this,Xt),pointerenter:y(this,Zt),pointerleave:y(this,Jt),touchstart:y(this,Qt),touchend:y(this,te)};Object.keys(s).forEach(i=>{e==null||e.removeEventListener(i,s[i]),r==null||r.addEventListener(i,s[i])}),e&&e.removeAttribute("aria-label"),r&&r.setAttribute("aria-label",this.textContent??"")}updatePosition(){this.$control&&ji(this.$control,this,{placement:this.position,middleware:[Ui(this.offset),Hi({padding:this.padding}),Bi({padding:this.padding,crossAxis:!0})]}).then(({x:e,y:r})=>{this.style.top=`${r}px`,this.style.left=`${e}px`})}}U=new WeakMap,B=new WeakMap,Yt=new WeakMap,Xt=new WeakMap,Zt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap,te=new WeakMap,kt=new WeakMap,E=new WeakSet,Cr=function(){this.$control.setAttribute("aria-label",this.textContent??"")},Er=function(){ye&&(clearTimeout(y(this,B)),x(this,U,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-ae<this.recentlyShowedDelay?0:this.focusShowDelay))))},Pr=function(){ae=Date.now(),clearTimeout(y(this,U)),x(this,B,setTimeout(()=>{this.visible=!1},this.focusHideDelay))},Or=function(e){e.pointerType!=="touch"&&(clearTimeout(y(this,B)),x(this,U,setTimeout(()=>{this.visible=!0},Math.max(Date.now()-ae<this.recentlyShowedDelay?0:this.mouseShowDelay))))},Sr=function(e){e.pointerType!=="touch"&&(ae=Date.now(),clearTimeout(y(this,U)),x(this,B,setTimeout(()=>{this.visible=!1},this.mouseHideDelay)))},Rr=function(){clearTimeout(y(this,B)),x(this,U,setTimeout(()=>{this.visible=!0,addEventListener("click",y(this,kt))},this.touchShowDelay))},Dr=function(){clearTimeout(y(this,U)),x(this,B,setTimeout(()=>{this.visible=!1},this.touchHideDelay))},Tr=function(e){e.composedPath().includes(this.$control)||(this.visible=!1,removeEventListener("click",y(this,kt)))};ao([os("slot")],Ae.prototype,"$slot",2);ao([w({reflect:!0})],Ae.prototype,"position",2);ao([w({type:Number,reflect:!0})],Ae.prototype,"offset",2);const Vi=D`
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
`;var Ki=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,qi=(o,t,e,r)=>{for(var s=r>1?void 0:r?Gi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Ki(t,e,s),s};let Ve=class extends Ae{};Ve.styles=[Vi];Ve=qi([F("md-tooltip")],Ve);var Yi=Object.defineProperty,Xi=Object.getOwnPropertyDescriptor,Zi=(o,t,e,r)=>{for(var s=r>1?void 0:r?Xi(t,e):t,i=o.length-1,n;i>=0;i--)(n=o[i])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&Yi(t,e,s),s};let Ke=class extends L{render(){return T`
      <div part="contents"><slot></slot></div>
      <div part="controls">
        <div part="controls-header">
          <h3>Playground</h3>
        </div>
        <div part="controls-body">
          <slot name="controls"></slot>
        </div>
      </div>
    `}};Ke.styles=D`
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
  `;Ke=Zi([F("dc-demo")],Ke);function Ji(){const t=document.body.querySelectorAll("h2, h3, h4, h5, h6"),e=document.getElementById("toc-list");if(!e)throw new Error("Table of Contents container not found.");let r=[e],s=[];t.forEach(i=>{let n=Number(i.localName.replace("h",""))-1,c=i.textContent,a=(i.textContent||"").toLowerCase().replace(/ /g,"-");s[n-1]=a;let l=[...s.slice(0,n-1),a].join("-");i.setAttribute("id",l);let h=document.createElement("a");h.setAttribute("href","#"+l),h.textContent=c;let d=document.createElement("li");d.appendChild(h),n==1?e.appendChild(d):(r[n-1]=document.createElement("ul"),r[n-1].appendChild(d),r[n-2].appendChild(r[n-1]))})}Ji();
