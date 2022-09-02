function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n;const l=window.trustedTypes,a=l?l.emptyScript:"",d=window.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},c=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:c};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=p){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:h.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:h.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:u}),(null!==(n=globalThis.reactiveElementVersions)&&void 0!==n?n:globalThis.reactiveElementVersions=[]).push("1.3.2");const v=globalThis.trustedTypes,f=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,m="?"+$,y=`<${m}>`,_=document,A=(t="")=>_.createComment(t),b=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,C=/>/g,x=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,T=/'/g,P=/"/g,U=/^(?:script|style|textarea|title)$/i,k=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),R=new WeakMap,M=_.createTreeWalker(_,129,null,!1);class L{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=S;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===S?"!--"===a[1]?n=E:void 0!==a[1]?n=C:void 0!==a[2]?(U.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=x):void 0!==a[3]&&(n=x):n===x?">"===a[0]?(n=null!=o?o:S,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?x:'"'===a[3]?P:T):n===P||n===T?n=x:n===E||n===C?n=S:(n=x,o=void 0);const c=n===x&&t[e+1].startsWith("/>")?" ":"";r+=n===S?i+y:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+$+c):i+$+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==f?f.createHTML(l):l,s]})(t,e);if(this.el=L.createElement(a,i),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=M.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith($)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split($),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?V:"@"===e[1]?W:B})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(U.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),M.nextNode(),l.push({type:2,index:++o});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===m)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)l.push({type:7,index:o}),t+=$.length-1}o++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function O(t,e,i=t,s){var o,r,n,l;if(e===H)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=b(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=O(t,a._$AS(t,e.values),a,s)),e}class z{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:_).importNode(i,!0);M.currentNode=o;let r=M.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new D(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new q(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=M.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var o;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),b(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==N&&b(this._$AH)?this._$AA.nextSibling.data=t:this.k(_.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=L.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new z(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new L(t)),e}S(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new D(this.M(A()),this.M(A()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=O(this,t,e,0),r=!b(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=O(this,s[i+n],e,n),l===H&&(l=this._$AH[n]),r||(r=!b(l)||l!==this._$AH[n]),l===N?t=N:t!==N&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends B{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===N?void 0:t}}const I=v?v.emptyScript:"";class V extends B{constructor(){super(...arguments),this.type=4}C(t){t&&t!==N?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name)}}class W extends B{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=O(this,t,e,0))&&void 0!==i?i:N)===H)return;const s=this._$AH,o=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==N&&(s===N||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const F=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,J;null==F||F(L,D),(null!==(g=globalThis.litHtmlVersions)&&void 0!==g?g:globalThis.litHtmlVersions=[]).push("2.2.6");class Z extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new D(e.insertBefore(A(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return H}}Z.finalized=!0,Z._$litElement$=!0,null===(K=globalThis.litElementHydrateSupport)||void 0===K||K.call(globalThis,{LitElement:Z});const G=globalThis.litElementPolyfillSupport;null==G||G({LitElement:Z}),(null!==(J=globalThis.litElementVersions)&&void 0!==J?J:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function X(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Q(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var Y;null===(Y=window.HTMLSlotElement)||void 0===Y||Y.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=N,t.type!==tt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===N||null==t)return this.ft=void 0,this.it=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}et.directiveName="unsafeHTML",et.resultType=1;const it=(t=>(...e)=>({_$litDirective$:t,values:e}))(et),st="",ot="",rt="",nt="",lt=!1;class at extends Z{constructor(){super(...arguments),this.dim=st,this.slotStyle=ot,this.cellStyle=ot,this.rowStyle=rt,this.hostStyle=nt,this.noFillers=lt,this.slotCounter=0}makeGridDim(){this.slotCounter=0;let t="";const e=this.dim.split(/[;]/);""===e.at(-1)&&e.pop();let i=!1;if(e.length>0&&1===e.length&&1===e[0].split(" ").length&&(i=!0),!i){const i=e.length;for(let s=0;s<i;s++){const i=e[s].split(" ").filter((t=>t));let o="";for(let t=0;t<i.length;t++)i[t]=`${i[t]}%`,this.noFillers?o+=`\n             <div style="${this.slotStyle} ${this.cellStyle}">\n                <slot name="${this.slotCounter+1}"> </slot>\n            </div>`:o+=`\n             <div style="${this.slotStyle} ${this.cellStyle}">\n                <slot name="${this.slotCounter+1}">\n                  <i>replace me with: <br>\n                  <code>\n                  &lt;div slot=${this.slotCounter+1}&gt;your content&lt;/div&gt;\n                  </code>\n                  </i>\n                </slot>\n            </div>`,this.slotCounter++;t+=`\n        <div class="gridrow grid-${s+1}" style="${`display: grid;\n            grid-template-columns: ${i.join(" ")};\n            grid-gap: var(--gridspace-col);`} ${this.rowStyle}">\n          ${o}\n        </div>\n        `}}return`\n      ${`\n        <div class="dd-grid" style="${this.hostStyle}">\n          ${t}\n        </div>\n    `}\n    `}render(){return this.getAttribute("dim")?k` ${it(this.makeGridDim())} `:k`
      <i>
        <p>
          [WARN] no grid dimensions specified. Make sure to include a
          <b>non-empty</b> <code>dim</code> attribute.
        </p>
      </i>
    `}}function dt(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}at.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,i)})`
    :host {
      --gridspace-row: var(--dd-gridspace-row, 10px);
      --gridspace-col: var(--dd-gridspace-col, 10px);
    }
    .gridrow {
      padding-bottom: var(--gridspace-row);
    }
  `,t([X({type:String,attribute:"dim"})],at.prototype,"dim",void 0),t([X({type:String,attribute:"slot-style"})],at.prototype,"slotStyle",void 0),t([X({type:String,attribute:"cell-style"})],at.prototype,"cellStyle",void 0),t([X({type:String,attribute:"row-style"})],at.prototype,"rowStyle",void 0),t([X({type:String,attribute:"style"})],at.prototype,"hostStyle",void 0),t([X({type:Boolean,attribute:"no-fillers",reflect:!0})],at.prototype,"noFillers",void 0),t([X({type:Number})],at.prototype,"slotCounter",void 0),window.customElements.define("dd-grid",at);const ht=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ct=Symbol(),pt=new Map;class ut{constructor(t,e){if(this._$cssResult$=!0,e!==ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=pt.get(this.cssText);return ht&&void 0===t&&(pt.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const gt=ht?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new ut("string"==typeof t?t:t+"",ct))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var vt;const ft=window.trustedTypes,$t=ft?ft.emptyScript:"",mt=window.reactiveElementPolyfillSupport,yt={toAttribute(t,e){switch(e){case Boolean:t=t?$t:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_t=(t,e)=>e!==t&&(e==e||t==t),At={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:_t};class bt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=At){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||At}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(gt(t))}else void 0!==t&&e.push(gt(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{ht?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=At){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:yt.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:yt.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_t)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wt;bt.finalized=!0,bt.elementProperties=new Map,bt.elementStyles=[],bt.shadowRootOptions={mode:"open"},null==mt||mt({ReactiveElement:bt}),(null!==(vt=globalThis.reactiveElementVersions)&&void 0!==vt?vt:globalThis.reactiveElementVersions=[]).push("1.3.2");const St=globalThis.trustedTypes,Et=St?St.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ct=`lit$${(Math.random()+"").slice(9)}$`,xt="?"+Ct,Tt=`<${xt}>`,Pt=document,Ut=(t="")=>Pt.createComment(t),kt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Ht=Array.isArray,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Mt=/>/g,Lt=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ot=/'/g,zt=/"/g,Dt=/^(?:script|style|textarea|title)$/i,Bt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),jt=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Vt=new WeakMap,Wt=Pt.createTreeWalker(Pt,129,null,!1);class qt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=Nt;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===Nt?"!--"===a[1]?n=Rt:void 0!==a[1]?n=Mt:void 0!==a[2]?(Dt.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=Lt):void 0!==a[3]&&(n=Lt):n===Lt?">"===a[0]?(n=null!=o?o:Nt,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?Lt:'"'===a[3]?zt:Ot):n===zt||n===Ot?n=Lt:n===Rt||n===Mt?n=Nt:(n=Lt,o=void 0);const c=n===Lt&&t[e+1].startsWith("/>")?" ":"";r+=n===Nt?i+Tt:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+Ct+c):i+Ct+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==Et?Et.createHTML(l):l,s]})(t,e);if(this.el=qt.createElement(a,i),Wt.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=Wt.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(Ct)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(Ct),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Gt:"?"===e[1]?Xt:"@"===e[1]?Yt:Zt})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(Dt.test(s.tagName)){const t=s.textContent.split(Ct),e=t.length-1;if(e>0){s.textContent=St?St.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],Ut()),Wt.nextNode(),l.push({type:2,index:++o});s.append(t[e],Ut())}}}else if(8===s.nodeType)if(s.data===xt)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(Ct,t+1));)l.push({type:7,index:o}),t+=Ct.length-1}o++}}static createElement(t,e){const i=Pt.createElement("template");return i.innerHTML=t,i}}function Ft(t,e,i=t,s){var o,r,n,l;if(e===jt)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=kt(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=Ft(t,a._$AS(t,e.values),a,s)),e}class Kt{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Pt).importNode(i,!0);Wt.currentNode=o;let r=Wt.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Jt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new te(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=Wt.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Jt{constructor(t,e,i,s){var o;this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ft(this,t,e),kt(t)?t===It||null==t||""===t?(this._$AH!==It&&this._$AR(),this._$AH=It):t!==this._$AH&&t!==jt&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return Ht(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==It&&kt(this._$AH)?this._$AA.nextSibling.data=t:this.k(Pt.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=qt.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new Kt(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=Vt.get(t.strings);return void 0===e&&Vt.set(t.strings,e=new qt(t)),e}S(t){Ht(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Jt(this.M(Ut()),this.M(Ut()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Zt{constructor(t,e,i,s,o){this.type=1,this._$AH=It,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=It}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Ft(this,t,e,0),r=!kt(t)||t!==this._$AH&&t!==jt,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=Ft(this,s[i+n],e,n),l===jt&&(l=this._$AH[n]),r||(r=!kt(l)||l!==this._$AH[n]),l===It?t=It:t!==It&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Gt extends Zt{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===It?void 0:t}}const Qt=St?St.emptyScript:"";class Xt extends Zt{constructor(){super(...arguments),this.type=4}C(t){t&&t!==It?this.element.setAttribute(this.name,Qt):this.element.removeAttribute(this.name)}}class Yt extends Zt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Ft(this,t,e,0))&&void 0!==i?i:It)===jt)return;const s=this._$AH,o=t===It&&s!==It||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==It&&(s===It||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class te{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ft(this,t)}}const ee=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,se;null==ee||ee(qt,Jt),(null!==(wt=globalThis.litHtmlVersions)&&void 0!==wt?wt:globalThis.litHtmlVersions=[]).push("2.2.6");class oe extends bt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Jt(e.insertBefore(Ut(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return jt}}oe.finalized=!0,oe._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:oe});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function le(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ne(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var ae;null===(ae=window.HTMLSlotElement)||void 0===ae||ae.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class he extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=It,t.type!==de)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===It||null==t)return this.ft=void 0,this.it=t;if(t===jt)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}he.directiveName="unsafeHTML",he.resultType=1;const ce=(t=>(...e)=>({_$litDirective$:t,values:e}))(he),pe="",ue="",ge="",ve="",fe=!1,$e=!1,me=!1,ye=!1;class _e extends oe{constructor(){super(...arguments),this.dim=pe,this.slotStyle=ue,this.cellStyle=ue,this.rowStyle=ge,this.hostStyle=ve,this.noFillers=fe,this.noFooter=$e,this.center=me,this.shout=ye,this.slotCounter=0,this._checkFooter=()=>{if(this.noFooter){this.querySelector("dd-footer").style.display="none"}}}_makeGridDim(){this.slotCounter=0;let t="";const e=this.dim.split(/[;]/);""===e.at(-1)&&e.pop();let i=!1;if(e.length>0&&1===e.length&&1===e[0].split(" ").length&&(i=!0),!i){const i=e.length;for(let s=0;s<i;s++){const i=e[s].split(" ").filter((t=>t));let o="";for(let t=0;t<i.length;t++)i[t]=`${i[t]}%`,this.noFillers?o+=`\n             <div style="${this.slotStyle} ${this.cellStyle}">\n                <slot name="${this.slotCounter+1}"> </slot>\n            </div>`:o+=`\n             <div style="${this.slotStyle} ${this.cellStyle}">\n                <slot name="${this.slotCounter+1}">\n                  <i>replace me with: <br>\n                  <code>\n                  &lt;div slot=${this.slotCounter+1}&gt;your content&lt;/div&gt;\n                  </code>\n                  </i>\n                </slot>\n            </div>`,this.slotCounter++;t+=`\n        <div class="gridrow grid-${s+1}" style="${`display: grid;\n            grid-template-columns: ${i.join(" ")};\n            grid-gap: var(--gridspace-col);`} ${this.rowStyle}">\n          ${o}\n        </div>\n        `}}return`\n      ${`\n        ${t}\n    `}\n    `}async firstUpdated(){}connectedCallback(){super.connectedCallback(),document.addEventListener("DOMContentLoaded",this._checkFooter)}disconnectedCallback(){window.removeEventListener("DOMContentLoaded",this._checkFooter),super.disconnectedCallback()}render(){this.classList.add("slide");const t=["dd-slide"];return this.center&&t.push("center"),this.shout&&(t.push("center"),t.push("shout")),this.dim?this.noFillers?Bt`
        <div class="${t.join(" ")}">
          <div>
            <slot></slot>
            ${ce(this._makeGridDim())}
            <slot name="postgrid"></slot>
          </div>
        </div>
      `:Bt`
          <div class="${t.join(" ")}">
            <div>
              <slot>
                <h2>Put a title to remove me</h2>
              </slot>
              ${ce(this._makeGridDim())}
              <slot name="postgrid"></slot>
            </div>
          </div>
        `:Bt`
      <div class="${t.join(" ")}">
        <div>
          <slot>
            <h2>
              No content added, or no grid layout defined. Default will be an
              empty page. Typing content in your slide will replace this
              message.
            </h2>
          </slot>
        </div>
      </div>
    `}}function Ae(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}_e.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new ut(i,ct)})`
    /****************************************************************
     * Element styling
     ****************************************************************/

    :host {
      /* color pallette */
      --slide-color-heading: var(--dd-color-heading, var(--dd-color-prim-dark));
      --slide-color-link: var(--dd-color-link, rgba(65, 90, 72, 0.7));
      --slide-color-link-hover: var(--dd-color-link-hover, rgba(65, 90, 72, 1));

      --slide-ratio: var(--dd-slide-ratio, calc(16 / 9));
      --slide-width: var(--dd-slide-width, 1024px);
      --slide-height: calc(var(--slide-width) / var(--slide-ratio));
      --slide-font: var(--dd-font, 24px/2 'Roboto', sans-serif);

      --slide-pad-top: var(--dd-slide-pad-top, 0px);
      --slide-pad-top-content: var(--dd-slide-pad-top-content, 0px);
      --slide-pad-right: var(--dd-slide-pad-right, 25px);
      --slide-pad-left: var(--dd-slide-pad-left, 25px);

      --slide-gridspace-row: var(--dd-slide-gridspace-row, 10px);
      --slide-gridspace-col: var(--dd-slide-gridspace-col, 10px);

      --slide-shout-size: var(--dd-slide-shout-size, 2.5em);

      display: block;
      font: var(--slide-font);
    }

    ::slotted(h1:first-child),
    h1:first-child,
    ::slotted(h2:first-child),
    h2:first-child,
    ::slotted(h3:first-child),
    h3:first-child,
    ::slotted(h4:first-child),
    h4:first-child,
    ::slotted(h5:first-child),
    h5:first-child,
    ::slotted(h6:first-child),
    h6:first-child {
      /* style headings in the template "<slot> dummy text </slot>" */
      color: var(--slide-color-heading);
      margin: 0;
      padding: 0 0 var(--slide-pad-top-content) 0;
    }

    :host(.slide) {
      padding: var(--slide-pad-top) var(--slide-pad-right) 0
        var(--slide-pad-left);

      position: relative;
      z-index: 0;
      overflow: hidden;
      box-sizing: border-box;
      width: var(--slide-width);
      max-width: 100%;
      height: var(--slide-height);
      background-color: white;
      margin: 0;
    }

    .center {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .shout {
      font-size: var(--slide-shout-size);
      text-align: center;
      line-height: 1.25em;
    }

    .gridrow {
      padding-bottom: var(--slide-gridspace-row);
    }

    /* https://github.com/WICG/webcomponents/issues/889 */
  `,dt([le({type:String,attribute:"dim"})],_e.prototype,"dim",void 0),dt([le({type:String,attribute:"slot-style"})],_e.prototype,"slotStyle",void 0),dt([le({type:String,attribute:"cell-style"})],_e.prototype,"cellStyle",void 0),dt([le({type:String,attribute:"row-style"})],_e.prototype,"rowStyle",void 0),dt([le({type:String,attribute:"style"})],_e.prototype,"hostStyle",void 0),dt([le({type:Boolean,attribute:"no-fillers",reflect:!0})],_e.prototype,"noFillers",void 0),dt([le({type:Boolean,attribute:"no-footer",reflect:!0})],_e.prototype,"noFooter",void 0),dt([le({type:Boolean,attribute:"center",reflect:!0})],_e.prototype,"center",void 0),dt([le({type:Boolean,attribute:"shout",reflect:!0})],_e.prototype,"shout",void 0),dt([le({type:Number})],_e.prototype,"slotCounter",void 0),window.customElements.define("dd-slide",_e);const be=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),Se=new WeakMap;class Ee{constructor(t,e,i){if(this._$cssResult$=!0,i!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(be&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Se.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Se.set(e,t))}return t}toString(){return this.cssText}}const Ce=be?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Ee("string"==typeof t?t:t+"",void 0,we))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var xe;const Te=window.trustedTypes,Pe=Te?Te.emptyScript:"",Ue=window.reactiveElementPolyfillSupport,ke={toAttribute(t,e){switch(e){case Boolean:t=t?Pe:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},He=(t,e)=>e!==t&&(e==e||t==t),Ne={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:He};class Re extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=Ne){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ne}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Ce(t))}else void 0!==t&&e.push(Ce(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{be?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Ne){var s,o;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:ke.toAttribute)(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i,s;const o=this.constructor,r=o._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=o.getPropertyOptions(r),n=t.converter,l=null!==(s=null!==(i=null==n?void 0:n.fromAttribute)&&void 0!==i?i:"function"==typeof n?n:null)&&void 0!==s?s:ke.fromAttribute;this._$El=r,this[r]=l(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||He)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Me;Re.finalized=!0,Re.elementProperties=new Map,Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},null==Ue||Ue({ReactiveElement:Re}),(null!==(xe=globalThis.reactiveElementVersions)&&void 0!==xe?xe:globalThis.reactiveElementVersions=[]).push("1.3.3");const Le=globalThis.trustedTypes,Oe=Le?Le.createPolicy("lit-html",{createHTML:t=>t}):void 0,ze=`lit$${(Math.random()+"").slice(9)}$`,De="?"+ze,Be=`<${De}>`,je=document,Ie=(t="")=>je.createComment(t),Ve=t=>null===t||"object"!=typeof t&&"function"!=typeof t,We=Array.isArray,qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fe=/-->/g,Ke=/>/g,Je=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ze=/'/g,Ge=/"/g,Qe=/^(?:script|style|textarea|title)$/i,Xe=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Ye=Symbol.for("lit-noChange"),ti=Symbol.for("lit-nothing"),ei=new WeakMap,ii=je.createTreeWalker(je,129,null,!1);class si{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=qe;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===qe?"!--"===a[1]?n=Fe:void 0!==a[1]?n=Ke:void 0!==a[2]?(Qe.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=Je):void 0!==a[3]&&(n=Je):n===Je?">"===a[0]?(n=null!=o?o:qe,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?Je:'"'===a[3]?Ge:Ze):n===Ge||n===Ze?n=Je:n===Fe||n===Ke?n=qe:(n=Je,o=void 0);const c=n===Je&&t[e+1].startsWith("/>")?" ":"";r+=n===qe?i+Be:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+ze+c):i+ze+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==Oe?Oe.createHTML(l):l,s]})(t,e);if(this.el=si.createElement(a,i),ii.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=ii.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(ze)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(ze),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?ai:"?"===e[1]?hi:"@"===e[1]?ci:li})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(Qe.test(s.tagName)){const t=s.textContent.split(ze),e=t.length-1;if(e>0){s.textContent=Le?Le.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],Ie()),ii.nextNode(),l.push({type:2,index:++o});s.append(t[e],Ie())}}}else if(8===s.nodeType)if(s.data===De)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(ze,t+1));)l.push({type:7,index:o}),t+=ze.length-1}o++}}static createElement(t,e){const i=je.createElement("template");return i.innerHTML=t,i}}function oi(t,e,i=t,s){var o,r,n,l;if(e===Ye)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=Ve(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=oi(t,a._$AS(t,e.values),a,s)),e}class ri{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:je).importNode(i,!0);ii.currentNode=o;let r=ii.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new ni(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new pi(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=ii.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ni{constructor(t,e,i,s){var o;this.type=2,this._$AH=ti,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=oi(this,t,e),Ve(t)?t===ti||null==t||""===t?(this._$AH!==ti&&this._$AR(),this._$AH=ti):t!==this._$AH&&t!==Ye&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return We(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==ti&&Ve(this._$AH)?this._$AA.nextSibling.data=t:this.k(je.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=si.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new ri(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=ei.get(t.strings);return void 0===e&&ei.set(t.strings,e=new si(t)),e}S(t){We(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new ni(this.M(Ie()),this.M(Ie()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class li{constructor(t,e,i,s,o){this.type=1,this._$AH=ti,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ti}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=oi(this,t,e,0),r=!Ve(t)||t!==this._$AH&&t!==Ye,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=oi(this,s[i+n],e,n),l===Ye&&(l=this._$AH[n]),r||(r=!Ve(l)||l!==this._$AH[n]),l===ti?t=ti:t!==ti&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===ti?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class ai extends li{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===ti?void 0:t}}const di=Le?Le.emptyScript:"";class hi extends li{constructor(){super(...arguments),this.type=4}C(t){t&&t!==ti?this.element.setAttribute(this.name,di):this.element.removeAttribute(this.name)}}class ci extends li{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=oi(this,t,e,0))&&void 0!==i?i:ti)===Ye)return;const s=this._$AH,o=t===ti&&s!==ti||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==ti&&(s===ti||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class pi{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){oi(this,t)}}const ui=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var gi,vi;null==ui||ui(si,ni),(null!==(Me=globalThis.litHtmlVersions)&&void 0!==Me?Me:globalThis.litHtmlVersions=[]).push("2.2.6");class fi extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new ni(e.insertBefore(Ie(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Ye}}fi.finalized=!0,fi._$litElement$=!0,null===(gi=globalThis.litElementHydrateSupport)||void 0===gi||gi.call(globalThis,{LitElement:fi});const $i=globalThis.litElementPolyfillSupport;null==$i||$i({LitElement:fi}),(null!==(vi=globalThis.litElementVersions)&&void 0!==vi?vi:globalThis.litElementVersions=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function yi(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):mi(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var _i;null===(_i=window.HTMLSlotElement)||void 0===_i||_i.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ai=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class bi extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=ti,t.type!==Ai)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ti||null==t)return this.ft=void 0,this.it=t;if(t===Ye)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}bi.directiveName="unsafeHTML",bi.resultType=1;const wi=(t=>(...e)=>({_$litDirective$:t,values:e}))(bi),Si="",Ei="dummy-title",Ci="",xi="",Ti="",Pi="",Ui="",ki="",Hi="",Ni=!1,Ri=1,Mi="",Li=3e3;let Oi;class zi extends fi{constructor(){super(),this.mainTitle=Ei,this.subTitle=Ci,this.author=Si,this.date=xi,this.url=Ti,this.imgUrl=Ui,this.imgSrc=Pi,this.organisation=ki,this.organisationUrl=Hi,this.jsonConfig=Mi,this.cursorTimeout=Li,this.full=Ni,this.fullScaleFactor=Ri,this.goToPrint=!1,this._updateView=(t=!1)=>{if(this.goToPrint)return;t&&(this.full=!this.full);const e=this.shadowRoot.querySelector(".dd-caption");e&&(this.full?e.style.display="none":e.style.display="flex");if(document.querySelector(".shower"))return void(this.full?this.classList.remove("list"):this.classList.add("list"));if(this.full){this.classList.add("full"),this.classList.remove("list");const{innerWidth:t,innerHeight:e}=window,i=document.querySelector(".slide");if(i){const{offsetWidth:s,offsetHeight:o}=i,r=1/Math.max(s/t,o/e)*this.fullScaleFactor;this.style.setProperty("--slide-collect-full-scale-factor",`${r}`);const n=(e-o*r)/2,l=document.querySelectorAll("dd-slide-collection > .slide");this.style.height=l.length*e+"px";for(const[i,o]of l.entries())o.id=`${i+1}`,o.style.marginTop=`\n              ${e*i+n}px`,o.style.marginLeft=`\n              ${(t-s*r)/2}px`,i===l.length-1&&(o.style.marginBottom=`${n}px`)}}else{this.classList.add("list"),this.classList.remove("full"),this.style.height="auto";const t=document.querySelectorAll("dd-slide-collection > .slide");for(const e of t)e.style.marginTop="0px",e.style.marginLeft="0px"}const i=`${window.location.protocol}//${window.location.host}${window.location.pathname}`;this.full?window.history.pushState({fullPage:!0},"Slide",`${i}?full`):window.history.pushState({fullPage:!0},"Slide",`${i}`),this._updateStyle()},this._handleSlideClick=()=>{const t=document.querySelectorAll("dd-slide-collection > .slide");for(const[e,i]of t.entries())i.addEventListener("click",(()=>{if(!this.full){if(this._updateView(!0),document.querySelector(".shower"))return;window.scrollBy(0,window.innerHeight*e),window.location.hash=`#${e+1}`}}))},this._handleResize=()=>{document.querySelector(".shower")||this._updateView()},this._handleLocation=()=>{const t=window.location.href.split("?")[1],e=new URLSearchParams(t);for(const t of e.entries())if(t[0].includes("full")){this.full||this._updateView(!0);break}},this._handleScroll=()=>{if(!document.querySelector(".shower")&&!this.goToPrint&&this.full){const t=document.documentElement.scrollTop,e=Math.floor(t/window.innerHeight);window.history.pushState(null,"",`?full#${e+1}`)}},this._interactKeys=()=>{document.onkeydown=t=>{const e=t||window.event;if(!(e.ctrlKey||e.altKey||e.metaKey))switch(e.key.toUpperCase()){case"ESC":case"ESCAPE":this.full&&(e.preventDefault(),this._updateView(!0));break;case"BACKSPACE":case"PAGEUP":case"ARROWUP":case"ARROWLEFT":case"P":this.full&&(e.preventDefault(),window.scrollBy(0,-window.innerHeight));break;case"PAGEDOWN":case"ARROWDOWN":case"ARROWRIGHT":case"N":this.full&&(e.preventDefault(),window.scrollBy(0,window.innerHeight));break;case" ":this.full&&(e.preventDefault(),e.shiftKey?window.scrollBy(0,-window.innerHeight):window.scrollBy(0,window.innerHeight))}}},this._updateStyle=()=>{this.full?this.parentElement.style.backgroundColor="rgba(0,0,0,1)":this.parentElement.style.backgroundColor=""},this.addEventListener("mousemove",(()=>{0!==this.cursorTimeout&&(this.style.cursor="default",Oi&&clearTimeout(Oi),Oi=setTimeout((()=>{this.style.cursor="none"}),this.cursorTimeout))}))}async setPropsFromJson(){const t=await async function(t){if(await(async t=>404!==(await fetch(t,{method:"HEAD"})).status||(console.error(`JSON config does not exist at '${t}'`),!1))(t))try{const e=await fetch(t);return await e.json()}catch(e){console.error(`Error while reading config file at ${t} \n\n ${e}`)}return{error:"Could not parse JSON config, see console for errors"}}(this.jsonConfig);t.error?this.mainTitle=`<i><b>[ERROR]</b>${t.error} </i>`:(t.title&&(this.mainTitle=t.title),t.mainTitle&&(this.mainTitle=t.mainTitle),t.subTitle&&(this.subTitle=t.subTitle),t.author&&this.author===Si&&(this.author=t.author),t.date&&(this.date=t.date),t.url&&(this.url=t.url),t.imgUrl&&(this.imgUrl=t.imgUrl),t.imgSrc&&(this.imgSrc=t.imgSrc),t.organisation&&(this.organisation=t.organisation),t.organisationUrl&&(this.organisationUrl=t.organisationUrl))}makeCaptionHeader(t=""){let e="";this.imgSrc&&(e=`<a class="caption-link"\n          href="${this.imgUrl}"\n          target="_blank"\n          title="Click to see IMG link">\n          <img class="caption-img" src="${this.imgSrc}" alt="img-src"></a>`);let i=`${this.organisation}`;this.organisationUrl&&(i=`<a href="${this.organisationUrl}"\n                           title="Organisation (click for link)"\n                           class="dd-slide-collect-org-url">${this.organisation}</a>`);let s="";return this.url&&(s=`\n      <a class="caption-url" href="${this.url}" target="_blank">\n          <i>${this.url}</i>\n      </a>`),t?`\n        <div class="dd-caption-custom">\n          ${t}\n        </div>\n        `:`\n        <header class="dd-caption">\n          <div class="dd-caption-item dd-caption-left">\n            ${e}\n          </div>\n          <div class="dd-caption-item dd-caption-center">\n            <div class="dd-caption-title">\n              ${this.mainTitle}<br>\n            </div>\n            <div class="dd-caption-subtitle">\n              <i>${this.subTitle}</i>\n            </div>\n          </div>\n          <div class="dd-caption-item dd-caption-right">\n            <span>${this.date}</span><br>\n            <strong>${this.author}</strong><br>\n            <span>${i}</span><br>\n            ${s}\n          </div>\n        </header>\n      `}connectedCallback(){super.connectedCallback(),window.addEventListener("DOMContentLoaded",this._handleSlideClick),window.addEventListener("DOMContentLoaded",this._handleLocation),window.addEventListener("resize",this._handleResize),document.addEventListener("scroll",this._handleScroll),window.addEventListener("beforeprint",(()=>{this.goToPrint=!0})),window.addEventListener("afterprint",(()=>{this.goToPrint=!1}))}disconnectedCallback(){window.removeEventListener("DOMContentLoaded",this._handleSlideClick),window.removeEventListener("DOMContentLoaded",this._handleLocation),window.removeEventListener("resize",this._handleResize),document.removeEventListener("scroll",this._handleScroll),window.removeEventListener("beforeprint",(()=>{this.goToPrint=!0})),window.removeEventListener("afterprint",(()=>{this.goToPrint=!1})),super.disconnectedCallback()}async firstUpdated(){this.full?this.classList.add("full"):this.classList.add("list");document.querySelector(".shower")||(this.parentElement.style.margin="0"),this._interactKeys(),this._updateStyle()}render(){let t="";this.jsonConfig&&this.setPropsFromJson();const e=this.querySelector('[slot="caption"]');e?(t+=this.makeCaptionHeader(e.innerHTML),e.style.display="none"):t+=this.makeCaptionHeader(),t+='<slot name="caption"></slot>',t+="<slot></slot>";const i=this.querySelectorAll('dd-slide-collection > *:not(.slide):not([slot="caption"]):not(section)');for(const t of i)t.innerHTML=`\n<i>[WARNING] <code>${t.nodeName}</code> element is not allowed.\n<br>\n<br>\nOnly include <code>section and dd-slide</code> elements, or elements with\n<code>.slide</code> class inside a <code>dd-slide-collection</code>, otherwise,\nthe slide will not be rendered properly</i>\n`;return Xe`${wi(t)}`}}function Di(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}zi.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new Ee(i,t,we)})`
    :host {
      /* Ddpres fillers */

      /* dd color pallette */

      --slide-collect-color-prim: var(--dd-color-prim);
      --slide-collect-color-prim-dark: var(--dd-color-prim-dark);
      --slide-collect-color-sec: var(--dd-color-sec);
      --slide-collect-list-bg-color: var(
        --dd-color-list-bg,
        rgba(248, 237, 227, 0.5)
      );
      --slide-collect-text-color: var(--dd-color-text, rgba(0, 0, 0, 0.9));
      --slide-collect-text-color-light: var(
        --dd-color-text-light,
        rgba(255, 255, 255, 1)
      );

      --dd-color-caption-link: inherit;

      --slide-collect-gap: var(--dd-slide-gap, 96px);
      --slide-collect-ratio: var(--dd-slide-ratio, calc(16 / 9));
      --slide-collect-width: var(--dd-slide-width, 1024px);
      --slide-collect-height: var(
        --dd-slide-height,
        calc(var(--slide-collect-width) / var(--slide-collect-ratio))
      );
      --slide-collect-full-scale-factor: var(--dd-full-scale-factor, 1);
      --slide-collect-font: var(--dd-font, 24px/2 'Roboto', sans-serif);
      --slide-collect-font-size: var(--dd-font-size, 24px);

      --caption-height: var(--dd-caption-height, 250px);
      --caption-center-width: 60%;
      --caption-font-size: calc(2.2 * var(--slide-collect-font-size));
      --caption-padding-left: 30px;
      --caption-padding-top: 30px;
      --caption-padding-right: 30px;
      --caption-padding-bottom: 30px;
      --caption-img-height: calc(0.6 * var(--caption-height));
      --caption-fg-color: var(
        --dd-color-caption-fg,
        var(--slide-collect-text-color-light)
      );

      --dd-color-caption-bg: var(--dd-color-prim-dark, rgba(65, 90, 72, 1));
      --caption-bg-color: var(--dd-color-caption-bg);

      --slide-collect-slide-nr-font-size: var(--dd-slide-nr-font-size, 16px);
      --slide-collect-slide-nr-right: var(--dd-slide-nr-right, 13px);

      --dd-slide-nr-bottom: 0em;

      --slide-collect-slide-nr-bottom: var(--dd-slide-nr-bottom, 0.2em);
      --slide-collect-slide-nr-color: var(
        --dd-slide-nr-color,
        var(--slide-collect-text-color)
      );

      --slide-scale: 1;

      margin: 0;
      padding: 0;
      color: black;
      counter-reset: slide;

      font: var(--slide-collect-font);
      font-size: var(--slide-collect-font-size);
    }

    /* Full */

    :host(.full) {
      display: block;
    }

    /* Hover */

    :host(.list) > ::slotted(.slide:hover),
    :host(.list) > ::slotted(section:hover) {
      box-shadow: 0 0 0 20px
        var(--slide-collect-color-prim, rgba(65, 90, 72, 0.5));
    }

    :host > ::slotted(section),
    :host > ::slotted(.slide) {
      position: relative;
      z-index: 0;
      overflow: hidden;
      box-sizing: border-box;
      width: var(--slide-collect-width);
      max-width: 100%;
      height: var(--slide-collect-height);
      background-color: white;
      margin: 0 auto;
      /*margin-bottom: var(--slide-collect-gap)*/
    }

    :host(.full) > ::slotted(section),
    :host(.full) > ::slotted(.slide) {
      position: absolute;
      transform-origin: 0 0;
      transform: scale(var(--slide-collect-full-scale-factor));
      border: 1px solid black;
    }

    /* Number */

    :host > ::slotted(section)::after,
    :host > ::slotted(.slide)::after {
      position: absolute;
      font-size: var(--slide-collect-slide-nr-font-size);
      right: var(--slide-collect-slide-nr-right);
      bottom: calc(var(--slide-collect-slide-nr-bottom));
      left: 0px;
      color: var(--slide-collect-slide-nr-color);
      text-align: right;
      counter-increment: slide;
      content: counter(slide);
      z-index: 2;
    }

    :host > ::slotted(.slide.titlepage)::after,
    :host > ::slotted(dd-titlepage)::after {
      counter-increment: slide;
      content: '';
    }

    /* List */

    :host(.list) ::slotted(.slide),
    :host(.list) ::slotted(section) {
      position: relative;
      box-shadow: calc(var(--slide-scale) * 4px) calc(var(--slide-scale) * 4px)
        0 calc(var(--slide-scale) * 4px)
        var(--slide-collect-color-prim-dark, rgba(0, 0, 0, 0.8));
      transform-origin: 0 0;
      transform: scale(var(--slide-scale));
      display: block;
      min-width: var(--slide-collect-width);
    }

    :host(.list) > ::slotted(section.slide *),
    :host(.list) > ::slotted(dd-slide *) {
      pointer-events: none;
    }

    :host(.list) {
      padding: calc(var(--slide-collect-gap) * var(--slide-scale));
      box-sizing: border-box;
      width: 100%;
      display: grid;
      grid-gap: calc(var(--slide-collect-gap) * var(--slide-scale));
      grid-auto-rows: calc(var(--slide-collect-height) * var(--slide-scale));
      grid-template-rows: min-content;
      grid-template-columns: repeat(
        auto-fill,
        calc(var(--slide-collect-width) * var(--slide-scale))
      );
      background-color: var(--slide-collect-list-bg-color);
      /*overflow-x: hidden;*/
    }

    :host(.list) .dd-caption,
    :host(.list) .dd-caption-custom {
      grid-column: 1 / -1;
      margin-top: calc(-1 * var(--slide-collect-gap) * var(--slide-scale));
      margin-left: calc(-1 * var(--slide-collect-gap) * var(--slide-scale));
      box-sizing: border-box;
      width: 100vw;
    }

    /* IE & Edge Fix */

    :host(.list):not(.dd-caption):not(.dd-caption-custom) {
      position: absolute;
      clip: rect(0, auto, auto, 0);
    }

    /* Responsive */

    :host(.list) {
      --slide-scale: 0.25;
    }

    @media (min-width: 1168px) {
      :host(.list) {
        --slide-scale: 0.5;
      }
    }

    @media (min-width: 2336px) {
      :host(.list) {
        --slide-scale: 1;
      }
    }

    @media (max-width: 1168px) {
      :host {
        --caption-font-size: calc(1.3 * var(--slide-collect-font-size));
      }
    }
    @media (max-width: 700px) {
      :host {
        --caption-font-size: calc(1.1 * var(--slide-collect-font-size));
      }
    }

    /* Caption */

    .dd-caption {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: row;
      z-index: 1;
      color: var(--caption-fg-color);
      background-color: var(--caption-bg-color);
      height: var(--caption-height);
    }

    .dd-caption a {
      color: var(--dd-color-caption-link);
    }

    .dd-caption-item {
      font-size: var(--caption-font-size);
    }

    .dd-caption-left {
      flex-grow: 1;
      text-align: left;
      align-self: center;
      padding: var(--caption-padding-top) 0 var(--caption-padding-bottom)
        var(--caption-padding-left);
    }

    .dd-caption-center {
      flex-grow: 6;
      text-align: left;
      max-width: var(--caption-center-width);
      padding: var(--caption-padding-top) var(--caption-padding-right)
        var(--caption-padding-bottom) var(--caption-padding-left);
    }

    .dd-caption-title {
      padding-top: 20px;
      line-height: 1em;
      font-size: var(--caption-font-size);
      font-weight: 300;
    }

    .dd-caption-subtitle {
      padding-top: 20px;
      line-height: 1em;
      font-size: calc(0.55 * var(--caption-font-size));
      color: var(--caption-color-subtitle, rgba(255, 255, 255, 0.7));
    }

    .dd-caption-right {
      flex-grow: 1;
      text-align: right;
      font-size: calc(0.35 * var(--caption-font-size));
      align-self: flex-end;
      padding: var(--caption-padding-top) var(--caption-padding-right)
        var(--caption-padding-bottom) 0;
    }

    img.caption-img {
      height: var(--caption-img-height);
      display: block;
    }

    .dd-slide-collect-org-url {
      color: var(--slide-collect-text-color-light);
    }

    /* do not show custom caption slot */
    .dd-caption-custom {
      width: 100%;
      z-index: 1;
    }

    /* Print */

    @media print {
      :host(.full) {
        display: inline;
      }

      :host(.full) ::slotted(section),
      :host(.full) ::slotted(.slide) {
        position: relative;
        margin-left: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        transform: none;
      }
    }
  `,Ae([yi({type:String,attribute:"main-title"})],zi.prototype,"mainTitle",void 0),Ae([yi({type:String,attribute:"sub-title"})],zi.prototype,"subTitle",void 0),Ae([yi({type:String,attribute:"author"})],zi.prototype,"author",void 0),Ae([yi({type:String,attribute:"date"})],zi.prototype,"date",void 0),Ae([yi({type:String,attribute:"url"})],zi.prototype,"url",void 0),Ae([yi({type:String,attribute:"img-url"})],zi.prototype,"imgUrl",void 0),Ae([yi({type:String,attribute:"img-src"})],zi.prototype,"imgSrc",void 0),Ae([yi({type:String,attribute:"organisation"})],zi.prototype,"organisation",void 0),Ae([yi({type:String,attribute:"organisation-url"})],zi.prototype,"organisationUrl",void 0),Ae([yi({type:String,attribute:"config-path"})],zi.prototype,"jsonConfig",void 0),Ae([yi({type:Number,attribute:"cursor-timeout"})],zi.prototype,"cursorTimeout",void 0),Ae([yi({type:Boolean,attribute:"full"})],zi.prototype,"full",void 0),Ae([yi({type:Number,attribute:"full-scale-factor"})],zi.prototype,"fullScaleFactor",void 0),Ae([yi({type:Boolean,attribute:!1})],zi.prototype,"goToPrint",void 0),window.customElements.define("dd-slide-collection",zi);const Bi=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ji=Symbol(),Ii=new Map;class Vi{constructor(t,e){if(this._$cssResult$=!0,e!==ji)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=Ii.get(this.cssText);return Bi&&void 0===t&&(Ii.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const Wi=Bi?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Vi("string"==typeof t?t:t+"",ji))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var qi;const Fi=window.trustedTypes,Ki=Fi?Fi.emptyScript:"",Ji=window.reactiveElementPolyfillSupport,Zi={toAttribute(t,e){switch(e){case Boolean:t=t?Ki:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Gi=(t,e)=>e!==t&&(e==e||t==t),Qi={attribute:!0,type:String,converter:Zi,reflect:!1,hasChanged:Gi};class Xi extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=Qi){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Qi}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Wi(t))}else void 0!==t&&e.push(Wi(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Bi?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=Qi){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:Zi.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:Zi.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Gi)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Yi;Xi.finalized=!0,Xi.elementProperties=new Map,Xi.elementStyles=[],Xi.shadowRootOptions={mode:"open"},null==Ji||Ji({ReactiveElement:Xi}),(null!==(qi=globalThis.reactiveElementVersions)&&void 0!==qi?qi:globalThis.reactiveElementVersions=[]).push("1.3.2");const ts=globalThis.trustedTypes,es=ts?ts.createPolicy("lit-html",{createHTML:t=>t}):void 0,is=`lit$${(Math.random()+"").slice(9)}$`,ss="?"+is,os=`<${ss}>`,rs=document,ns=(t="")=>rs.createComment(t),ls=t=>null===t||"object"!=typeof t&&"function"!=typeof t,as=Array.isArray,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hs=/-->/g,cs=/>/g,ps=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,us=/'/g,gs=/"/g,vs=/^(?:script|style|textarea|title)$/i,fs=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),$s=Symbol.for("lit-noChange"),ms=Symbol.for("lit-nothing"),ys=new WeakMap,_s=rs.createTreeWalker(rs,129,null,!1);class As{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=ds;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===ds?"!--"===a[1]?n=hs:void 0!==a[1]?n=cs:void 0!==a[2]?(vs.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=ps):void 0!==a[3]&&(n=ps):n===ps?">"===a[0]?(n=null!=o?o:ds,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?ps:'"'===a[3]?gs:us):n===gs||n===us?n=ps:n===hs||n===cs?n=ds:(n=ps,o=void 0);const c=n===ps&&t[e+1].startsWith("/>")?" ":"";r+=n===ds?i+os:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+is+c):i+is+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==es?es.createHTML(l):l,s]})(t,e);if(this.el=As.createElement(a,i),_s.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=_s.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(is)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(is),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Cs:"?"===e[1]?Ts:"@"===e[1]?Ps:Es})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(vs.test(s.tagName)){const t=s.textContent.split(is),e=t.length-1;if(e>0){s.textContent=ts?ts.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],ns()),_s.nextNode(),l.push({type:2,index:++o});s.append(t[e],ns())}}}else if(8===s.nodeType)if(s.data===ss)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(is,t+1));)l.push({type:7,index:o}),t+=is.length-1}o++}}static createElement(t,e){const i=rs.createElement("template");return i.innerHTML=t,i}}function bs(t,e,i=t,s){var o,r,n,l;if(e===$s)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=ls(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=bs(t,a._$AS(t,e.values),a,s)),e}class ws{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:rs).importNode(i,!0);_s.currentNode=o;let r=_s.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Ss(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new Us(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=_s.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Ss{constructor(t,e,i,s){var o;this.type=2,this._$AH=ms,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=bs(this,t,e),ls(t)?t===ms||null==t||""===t?(this._$AH!==ms&&this._$AR(),this._$AH=ms):t!==this._$AH&&t!==$s&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return as(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==ms&&ls(this._$AH)?this._$AA.nextSibling.data=t:this.k(rs.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=As.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new ws(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=ys.get(t.strings);return void 0===e&&ys.set(t.strings,e=new As(t)),e}S(t){as(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Ss(this.M(ns()),this.M(ns()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Es{constructor(t,e,i,s,o){this.type=1,this._$AH=ms,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ms}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=bs(this,t,e,0),r=!ls(t)||t!==this._$AH&&t!==$s,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=bs(this,s[i+n],e,n),l===$s&&(l=this._$AH[n]),r||(r=!ls(l)||l!==this._$AH[n]),l===ms?t=ms:t!==ms&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===ms?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Cs extends Es{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===ms?void 0:t}}const xs=ts?ts.emptyScript:"";class Ts extends Es{constructor(){super(...arguments),this.type=4}C(t){t&&t!==ms?this.element.setAttribute(this.name,xs):this.element.removeAttribute(this.name)}}class Ps extends Es{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=bs(this,t,e,0))&&void 0!==i?i:ms)===$s)return;const s=this._$AH,o=t===ms&&s!==ms||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==ms&&(s===ms||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Us{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){bs(this,t)}}const ks=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Hs,Ns;null==ks||ks(As,Ss),(null!==(Yi=globalThis.litHtmlVersions)&&void 0!==Yi?Yi:globalThis.litHtmlVersions=[]).push("2.2.6");class Rs extends Xi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Ss(e.insertBefore(ns(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return $s}}Rs.finalized=!0,Rs._$litElement$=!0,null===(Hs=globalThis.litElementHydrateSupport)||void 0===Hs||Hs.call(globalThis,{LitElement:Rs});const Ms=globalThis.litElementPolyfillSupport;null==Ms||Ms({LitElement:Rs}),(null!==(Ns=globalThis.litElementVersions)&&void 0!==Ns?Ns:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Os(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Ls(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var zs;null===(zs=window.HTMLSlotElement)||void 0===zs||zs.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ds=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Bs extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=ms,t.type!==Ds)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ms||null==t)return this.ft=void 0,this.it=t;if(t===$s)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Bs.directiveName="unsafeHTML",Bs.resultType=1;const js=(t=>(...e)=>({_$litDirective$:t,values:e}))(Bs),Is="",Vs="",Ws="",qs="",Fs="",Ks="",Js="",Zs="",Gs="",Qs="",Xs="center",Ys="dd-slide",to="dd-slide-collection";class eo extends Rs{constructor(){super(...arguments),this.textLeft=Is,this.imgLeft=Vs,this.imgLeftLink=Ws,this.textCenter=qs,this.imgCenter=Fs,this.imgCenterLink=Ks,this.textRight=Js,this.imgRight=Zs,this.imgRightLink=Gs,this.configPath=Qs,this.alignVertical=Xs,this.toSelector=Ys,this.fromSelector=to,this._injectIntoSelector=()=>{var t,e;if("DD-SLIDE"===(null===(t=this.parentElement)||void 0===t?void 0:t.nodeName))return;if("SECTION"===(null===(e=this.parentElement)||void 0===e?void 0:e.nodeName))return;const i=document.querySelectorAll(this.toSelector);if(i.length>0){this.style.display="none";for(const t of i)if(t.querySelector("dd-footer"));else{const e=document.createElement("dd-footer");e.setAttribute("text-left",this.textLeft),e.setAttribute("img-left",this.imgLeft),e.setAttribute("img-left-link",this.imgLeftLink),e.setAttribute("text-center",this.textCenter),e.setAttribute("img-center",this.imgCenter),e.setAttribute("img-center-link",this.imgCenterLink),e.setAttribute("text-right",this.textRight),e.setAttribute("img-right",this.imgRight),e.setAttribute("img-right-link",this.imgRightLink),e.setAttribute("align-v",this.alignVertical),e.setAttribute("config-path",this.configPath),e.setAttribute("to-selector",""),e.setAttribute("from-selector",""),this.setVerticalAlignment(e),t.append(e)}}},this._injectFromSelector=()=>{var t,e;if("DD-SLIDE"===(null===(t=this.parentElement)||void 0===t?void 0:t.nodeName))return;if("SECTION"===(null===(e=this.parentElement)||void 0===e?void 0:e.nodeName))return;const i=document.querySelector(this.fromSelector);i&&(null==this.getAttribute("text-center")&&(i.getAttribute("main-title")&&(this.textCenter=`<b>${i.getAttribute("main-title")}</b>`),i.getAttribute("author")&&(this.textCenter+=` &ndash; <i>${i.getAttribute("author")}</i>`),i.getAttribute("date")&&(this.textCenter+=` &ndash; ${i.getAttribute("date")}`)),i.getAttribute("url-logo")&&null==this.getAttribute("img-left-link")&&(this.imgLeftLink=i.getAttribute("url-logo")),i.getAttribute("img-src")&&null==this.getAttribute("img-left")&&(this.imgLeft=i.getAttribute("img-src")))}}makeFooter(){let t="none",e="none",i="none";return this.imgLeft&&(t="inline"),this.imgCenter&&(e="inline"),this.imgRight&&(i="inline"),`\n      <div class="dd-footer">\n        <div class="dd-footer-item dd-footer-left">\n            <a class="footer-link" style="display:${t};"\n                                   href="${this.imgLeftLink}"\n                                   target="_blank">\n              <img class="footer-img footer-img-left"  src="${this.imgLeft}" alt="imgLeft"></a>\n            <div class="footer-text" style="display:inline-block;">${this.textLeft}</div>\n        </div>\n\n        <div class="dd-footer-item dd-footer-center">\n            <a class="footer-link" style="display:${e};"\n                                   href="${this.imgCenterLink}"\n                                   target="_blank">\n              <img class="footer-img" footer-img-center" src="${this.imgCenter}" alt="imgCenter">\n            </a>\n            <div class="footer-text" style="display:inline-block;">${this.textCenter}</div>\n        </div>\n\n        <div class="dd-footer-item dd-footer-right">\n            <div class="footer-text" style="display:inline-block;">${this.textRight}</div>\n            <a class="footer-link" style="display:${i};"\n                                   href="${this.imgRightLink}"\n                                   target="_blank">\n              <img class="footer-img footer-img-right" src="${this.imgRight}" alt="imgRight">\n            </a>\n        </div>\n\n      </div>\n    `}async setPropsFromJson(){const t=await async function(t){if(await(async t=>404!==(await fetch(t,{method:"HEAD"})).status||(console.error(`JSON config does not exist at '${t}'`),!1))(t))try{const e=await fetch(t);return await e.json()}catch(e){console.error(`Error while reading config file at ${t} \n\n ${e}`)}return{error:"Could not parse JSON config, see console for errors"}}(this.configPath);t.error?this.textCenter=`<i><b>[ERROR]</b>${t.error} </i>`:(this.textCenter||(t.title&&(this.textCenter=`<b>${t.title}</b>`),t.mainTitle&&(this.textCenter=`<b>${t.mainTitle}</b>`),t.author&&(this.textCenter+=` &ndash; <i>${t.author}</i>`),t.date&&(this.textCenter+=` &ndash; ${t.date}`)),t.urlLogo&&!this.imgLeftLink&&(this.imgLeftLink=t.urlLogo),t.imgSrc&&!this.imgLeft&&(this.imgLeft=t.imgSrc))}setVerticalAlignment(t){"center"===this.alignVertical?(t.style.setProperty("--footer-align-v","center"),t.style.setProperty("--footer-align-flex-v","center")):"top"===this.alignVertical?(t.style.setProperty("--footer-align-v","start"),t.style.setProperty("--footer-align-flex-v","flex-start")):"bottom"===this.alignVertical&&(t.style.setProperty("--footer-align-v","end"),t.style.setProperty("--footer-align-flex-v","flex-end"))}connectedCallback(){super.connectedCallback(),document.addEventListener("DOMContentLoaded",this._injectFromSelector),document.addEventListener("DOMContentLoaded",this._injectIntoSelector)}disconnectedCallback(){window.removeEventListener("DOMContentLoaded",this._injectIntoSelector),window.removeEventListener("DOMContentLoaded",this._injectFromSelector),super.disconnectedCallback()}render(){let t="";return this.setVerticalAlignment(this),this.configPath&&this.setPropsFromJson(),t+=this.makeFooter(),fs`${js(t)}`}}function io(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}eo.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new Vi(i,ji)})`
    :host {
      --footer-height: var(--dd-footer-height, 30px);
      --footer-img-height: var(--dd-footer-img-height, var(--dd-footer-height));
      --footer-align-v: var(--dd-footer-align-v, center);
      --footer-align-flex-v: var(--dd-footer-align-flex-v, center);
      --footer-padding-side: var(--dd-footer-padding-side, 0px);
      --footer-padding-bottom: var(--dd-footer-padding-bottom, 0px);
      --footer-padding-text: var(--dd-footer-padding-text, 0 2px 0 2px);
      --footer-font-size: var(--dd-footer-font-size, 14px);
      --footer-bottom: var(--dd-footer-bottom, var(--progress-height));
      --footer-color-bg: var(--dd-footer-color-bg);
    }

    .footer-link {
      z-index: 10;
    }

    .dd-footer {
      width: 100%;
      position: absolute;
      padding-bottom: var(--footer-bottom);
      bottom: 0;
      left: 0;
      display: grid;
      grid-template-areas: 'left center right';
      grid-template-columns: 1fr auto 1fr;
      align-items: var(--footer-align-v);
      height: var(--footer-height);
      justify-content: space-between;
      z-index: 10;
      font-size: var(--footer-font-size);
      background-color: var(--footer-color-bg);
      line-height: normal;
    }

    .dd-footer-item {
      display: flex;
    }

    .dd-footer-left {
      grid-area: left;
      padding-left: var(--footer-padding-side);
      padding-bottom: var(--footer-padding-bottom);
      text-align: left;
      align-items: center;
    }

    .dd-footer-center {
      grid-area: center;
      padding-bottom: var(--footer-padding-bottom);
      text-align: center;
    }

    .dd-footer-right {
      grid-area: right;
      padding-bottom: var(--footer-padding-bottom);
      padding-right: var(--footer-padding-side);
      text-align: right;
      justify-content: flex-end;
    }

    .footer-text {
      align-self: var(--footer-align-flex-v);
      padding: var(--footer-padding-text);
    }

    img.footer-img {
      height: var(--footer-img-height, var(--footer-height));
      display: block;
    }
  `,Di([Os({type:String,attribute:"text-left"})],eo.prototype,"textLeft",void 0),Di([Os({type:String,attribute:"img-left"})],eo.prototype,"imgLeft",void 0),Di([Os({type:String,attribute:"img-left-link"})],eo.prototype,"imgLeftLink",void 0),Di([Os({type:String,attribute:"text-center"})],eo.prototype,"textCenter",void 0),Di([Os({type:String,attribute:"img-center"})],eo.prototype,"imgCenter",void 0),Di([Os({type:String,attribute:"img-center-link"})],eo.prototype,"imgCenterLink",void 0),Di([Os({type:String,attribute:"text-right"})],eo.prototype,"textRight",void 0),Di([Os({type:String,attribute:"img-right"})],eo.prototype,"imgRight",void 0),Di([Os({type:String,attribute:"img-right-link"})],eo.prototype,"imgRightLink",void 0),Di([Os({type:String,attribute:"config-path"})],eo.prototype,"configPath",void 0),Di([Os({type:String,attribute:"align-v"})],eo.prototype,"alignVertical",void 0),Di([Os({type:String,attribute:"to-selector"})],eo.prototype,"toSelector",void 0),Di([Os({type:String,attribute:"from-selector"})],eo.prototype,"fromSelector",void 0),window.customElements.define("dd-footer",eo);const so=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oo=Symbol(),ro=new Map;class no{constructor(t,e){if(this._$cssResult$=!0,e!==oo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=ro.get(this.cssText);return so&&void 0===t&&(ro.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const lo=so?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new no("string"==typeof t?t:t+"",oo))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var ao;const ho=window.trustedTypes,co=ho?ho.emptyScript:"",po=window.reactiveElementPolyfillSupport,uo={toAttribute(t,e){switch(e){case Boolean:t=t?co:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},go=(t,e)=>e!==t&&(e==e||t==t),vo={attribute:!0,type:String,converter:uo,reflect:!1,hasChanged:go};class fo extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=vo){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||vo}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(lo(t))}else void 0!==t&&e.push(lo(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{so?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=vo){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:uo.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:uo.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||go)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $o;fo.finalized=!0,fo.elementProperties=new Map,fo.elementStyles=[],fo.shadowRootOptions={mode:"open"},null==po||po({ReactiveElement:fo}),(null!==(ao=globalThis.reactiveElementVersions)&&void 0!==ao?ao:globalThis.reactiveElementVersions=[]).push("1.3.2");const mo=globalThis.trustedTypes,yo=mo?mo.createPolicy("lit-html",{createHTML:t=>t}):void 0,_o=`lit$${(Math.random()+"").slice(9)}$`,Ao="?"+_o,bo=`<${Ao}>`,wo=document,So=(t="")=>wo.createComment(t),Eo=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Co=Array.isArray,xo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,To=/-->/g,Po=/>/g,Uo=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ko=/'/g,Ho=/"/g,No=/^(?:script|style|textarea|title)$/i,Ro=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Mo=Symbol.for("lit-noChange"),Lo=Symbol.for("lit-nothing"),Oo=new WeakMap,zo=wo.createTreeWalker(wo,129,null,!1);class Do{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=((t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=xo;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===xo?"!--"===a[1]?n=To:void 0!==a[1]?n=Po:void 0!==a[2]?(No.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=Uo):void 0!==a[3]&&(n=Uo):n===Uo?">"===a[0]?(n=null!=o?o:xo,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?Uo:'"'===a[3]?Ho:ko):n===Ho||n===ko?n=Uo:n===To||n===Po?n=xo:(n=Uo,o=void 0);const c=n===Uo&&t[e+1].startsWith("/>")?" ":"";r+=n===xo?i+bo:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+_o+c):i+_o+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==yo?yo.createHTML(l):l,s]})(t,e);if(this.el=Do.createElement(a,i),zo.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=zo.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_o)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(_o),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Wo:"?"===e[1]?Fo:"@"===e[1]?Ko:Vo})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(No.test(s.tagName)){const t=s.textContent.split(_o),e=t.length-1;if(e>0){s.textContent=mo?mo.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],So()),zo.nextNode(),l.push({type:2,index:++o});s.append(t[e],So())}}}else if(8===s.nodeType)if(s.data===Ao)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(_o,t+1));)l.push({type:7,index:o}),t+=_o.length-1}o++}}static createElement(t,e){const i=wo.createElement("template");return i.innerHTML=t,i}}function Bo(t,e,i=t,s){var o,r,n,l;if(e===Mo)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=Eo(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=Bo(t,a._$AS(t,e.values),a,s)),e}class jo{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:wo).importNode(i,!0);zo.currentNode=o;let r=zo.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Io(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new Jo(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=zo.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Io{constructor(t,e,i,s){var o;this.type=2,this._$AH=Lo,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Bo(this,t,e),Eo(t)?t===Lo||null==t||""===t?(this._$AH!==Lo&&this._$AR(),this._$AH=Lo):t!==this._$AH&&t!==Mo&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return Co(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==Lo&&Eo(this._$AH)?this._$AA.nextSibling.data=t:this.k(wo.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Do.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new jo(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=Oo.get(t.strings);return void 0===e&&Oo.set(t.strings,e=new Do(t)),e}S(t){Co(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Io(this.M(So()),this.M(So()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Vo{constructor(t,e,i,s,o){this.type=1,this._$AH=Lo,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Lo}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Bo(this,t,e,0),r=!Eo(t)||t!==this._$AH&&t!==Mo,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=Bo(this,s[i+n],e,n),l===Mo&&(l=this._$AH[n]),r||(r=!Eo(l)||l!==this._$AH[n]),l===Lo?t=Lo:t!==Lo&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===Lo?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Wo extends Vo{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===Lo?void 0:t}}const qo=mo?mo.emptyScript:"";class Fo extends Vo{constructor(){super(...arguments),this.type=4}C(t){t&&t!==Lo?this.element.setAttribute(this.name,qo):this.element.removeAttribute(this.name)}}class Ko extends Vo{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Bo(this,t,e,0))&&void 0!==i?i:Lo)===Mo)return;const s=this._$AH,o=t===Lo&&s!==Lo||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==Lo&&(s===Lo||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Jo{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Bo(this,t)}}const Zo=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Go,Qo;null==Zo||Zo(Do,Io),(null!==($o=globalThis.litHtmlVersions)&&void 0!==$o?$o:globalThis.litHtmlVersions=[]).push("2.2.6");class Xo extends fo{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Io(e.insertBefore(So(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return Mo}}Xo.finalized=!0,Xo._$litElement$=!0,null===(Go=globalThis.litElementHydrateSupport)||void 0===Go||Go.call(globalThis,{LitElement:Xo});const Yo=globalThis.litElementPolyfillSupport;null==Yo||Yo({LitElement:Xo}),(null!==(Qo=globalThis.litElementVersions)&&void 0!==Qo?Qo:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tr=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function er(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):tr(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var ir;null===(ir=window.HTMLSlotElement)||void 0===ir||ir.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const sr=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class or extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=Lo,t.type!==sr)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Lo||null==t)return this.ft=void 0,this.it=t;if(t===Mo)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}or.directiveName="unsafeHTML",or.resultType=1;const rr=(t=>(...e)=>({_$litDirective$:t,values:e}))(or),nr="",lr="",ar="",dr="",hr="",cr="",pr="",ur="dd-slide-collection",gr="",vr=!1,fr=!1,$r=!1,mr=!1,yr="100%",_r="",Ar="",br="",wr="",Sr="",Er="";class Cr extends Xo{constructor(){super(...arguments),this.imgSrc=ar,this.mainTitle=nr,this.subTitle=lr,this.author=dr,this.organisation=hr,this.organisationUrl=cr,this.date=pr,this.noDefaultMap=vr,this.centerText=$r,this.centerImg=mr,this.center=fr,this.configPath=gr,this.fromSelector=ur,this.htmlTopLeft=_r,this.htmlTopRight=Ar,this.htmlMidLeft=br,this.htmlMidRight=wr,this.htmlBotLeft=Sr,this.htmlBotRight=Er,this.widthLeft=yr}makeTitlePage(){return`\n        <div class='dd-titlepage'>\n\n          \x3c!-- logo --\x3e\n          <div id="dd-titlepage-logo">\n            <img src="${this.imgSrc}" alt="dd-logo";>\n          </div>\n\n          \x3c!-- top --\x3e\n          <div class="dd-titlepage-top-l dd-titlepage-top">\n              ${this.htmlTopLeft}\n          </div>\n          <div class="dd-titlepage-top-r dd-titlepage-top">\n              ${this.htmlTopRight}\n          </div>\n\n          \x3c!-- middle --\x3e\n          <div class="dd-titlepage-mid-l dd-titlepage-middle">\n            ${this.htmlMidLeft}\n          </div>\n          <div class="dd-titlepage-mid-r dd-titlepage-middle">\n            ${this.htmlMidRight}\n          </div>\n\n          \x3c!-- bottom --\x3e\n          <div class="dd-titlepage-bot-l dd-titlepage-bottom">\n            ${this.htmlBotLeft}\n          </div>\n          <div class="dd-titlepage-bot-r dd-titlepage-bottom">\n            ${this.htmlBotRight}\n          </div>\n        </div>\n      `}_mapDefault(){(this.mainTitle||this.subTitle)&&(this.htmlMidLeft=`\n        <div class="dd-titlepage-title dd-titlepage-mid-l default">\n          <strong>${this.mainTitle}</strong>\n        </div>\n        <div class="dd-titlepage-subtitle dd-titlepage-mid-l default">\n          ${this.subTitle}\n        </div>`),(this.author||this.organisation||this.date)&&!this.htmlBotLeft&&(this.organisationUrl?this.htmlBotLeft=`\n          <div class="dd-titlepage-bot-l default">\n          <strong>${this.author}</strong>  <br>\n          <a class="dd-titlepage-org-url" href="${this.organisationUrl}">${this.organisation}</a> <br>\n          ${this.date}\n        </div>`:this.htmlBotLeft=`\n          <div class="dd-titlepage-bot-l default">\n          <strong>${this.author}</strong>  <br>\n                  ${this.organisation}     <br>\n                  ${this.date}\n        </div>`)}async setPropsFromJson(){const t=await async function(t){if(await(async t=>404!==(await fetch(t,{method:"HEAD"})).status||(console.error(`JSON config does not exist at '${t}'`),!1))(t))try{const e=await fetch(t);return await e.json()}catch(e){console.error(`Error while reading config file at ${t} \n\n ${e}`)}return{error:"Could not parse JSON config, see console for errors"}}(this.configPath);t.error?this.htmlMidLeft=`<i><b>[ERROR]</b>${t.error} </i>`:(t.title&&(this.mainTitle=t.title),t.mainTitle&&(this.mainTitle=t.mainTitle),t.subTitle&&(this.subTitle=t.subTitle),t.author&&(this.author=t.author),t.organisation&&(this.organisation=t.organisation),t.date&&(this.date=t.date),t.imgSrc&&(this.imgSrc=t.imgSrc))}injectFromSelector(){const t=document.querySelector(this.fromSelector);t&&(t.getAttribute("main-title")&&null==this.getAttribute("main-title")&&(this.mainTitle=t.getAttribute("main-title")),t.getAttribute("sub-title")&&null==this.getAttribute("sub-title")&&(this.subTitle=t.getAttribute("sub-title")),t.getAttribute("author")&&null==this.getAttribute("author")&&(this.author=t.getAttribute("author")),t.getAttribute("date")&&null==this.getAttribute("date")&&(this.date=t.getAttribute("date")),t.getAttribute("organisation")&&null==this.getAttribute("organisation")&&(this.organisation=t.getAttribute("organisation")),t.getAttribute("organisation-url")&&null==this.getAttribute("organisation-url")&&(this.organisationUrl=t.getAttribute("organisation-url")),t.getAttribute("img-src")&&null==this.getAttribute("img-src")&&(this.imgSrc=t.getAttribute("img-src")))}async firstUpdated(){if(!this.imgSrc){this.shadowRoot.querySelector("#dd-titlepage-logo").style.display="none"}(this.centerText||this.center)&&(this.style.setProperty("--titlepage-align-lsec","center"),this.style.setProperty("--titlepage-padding-left","0px"),this.style.setProperty("--titlepage-padding-right","0px"),this.style.setProperty("--titlepage-w-left","100%")),this.widthLeft!==yr&&this.style.setProperty("--titlepage-w-left",this.widthLeft),(this.centerImg||this.center)&&window.addEventListener("load",(()=>{const t=this.shadowRoot.querySelector("#dd-titlepage-logo img").clientWidth;this.style.setProperty("--titlepage-logo-left",`calc( 50% - ${t/2}px )`)}))}render(){let t="";return this.configPath&&this.setPropsFromJson(),this.classList.add("slide"),this.classList.add("titlepage"),this.fromSelector&&this.injectFromSelector(),this.noDefaultMap||this._mapDefault(),t+=this.makeTitlePage(),Ro`${rr(t)}`}}function xr(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}Cr.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new no(i,oo)})`
    :host {
      /* slide placeholders */
      --slide-ratio: var(--dd-slide-ratio, calc(16 / 9));
      --slide-width: var(--dd-slide-width, 1024px);
      --slide-height: var(
        --dd-slide-height,
        calc(var(--slide-width) / var(--slide-ratio))
      );
      --titlepage-font-size: var(--dd-titlepage-font-size, 24px);
      --titlepage-font: var(--dd-font, 24px/2 'Roboto', sans-serif);

      /* titlepage */
      --titlepage-padding-side: var(--dd-titlepage-padding-side, 50px);
      --titlepage-padding-left: var(--titlepage-padding-side);
      --titlepage-padding-right: var(--titlepage-padding-side);
      --titlepage-padding-top-top: var(--dd-titlepage-padding-top-top, 10px);
      --titlepage-padding-mid-top: var(--dd-titlepage-padding-mid-top, 100px);
      --titlepage-padding-bot-top: var(--dd-titlepage-padding-bot-top, 10px);
      --titlepage-padding-sectop: var(--titlepage-padding-top-top)
        var(--titlepage-padding-right) 0 var(--titlepage-padding-left);
      --titlepage-padding-secmid: var(--titlepage-padding-mid-top)
        var(--titlepage-padding-right) 0 var(--titlepage-padding-left);
      --titlepage-padding-secbot: var(--titlepage-padding-bot-top)
        var(--titlepage-padding-right) 0 var(--titlepage-padding-left);

      /* dd color pallette */
      --dd-titlepage-color-fg-top: var(--dd-color-text);
      --dd-titlepage-color-bg-top: var(--dd-color-sec);
      --dd-titlepage-color-fg-mid: var(--dd-color-text-light);
      --dd-titlepage-color-bg-mid: var(--dd-color-prim);
      --dd-titlepage-color-fg-bot: var(--dd-color-text);
      --dd-titlepage-color-bg-bot: var(--dd-color-sec);

      --dd-titlepage-color-link: inherit;

      --titlepage-align-lsec: var(--dd-titlepage-align-lsec, left);
      --titlepage-align-rsec: var(--dd-titlepage-align-rsec, right);

      --titlepage-w-left: var(--dd-titlepage-w-left, 100%);
      --titlepage-h-top: var(
        --dd-titlepage-h-top,
        calc(0.15 * var(--slide-height))
      );
      --titlepage-h-middle: var(
        --dd-titlepage-h-middle,
        calc(
          var(--slide-height) - var(--titlepage-h-top) -
            var(--titlepage-h-bottom)
        )
      );
      --titlepage-h-bottom: var(
        --dd-titlepage-h-bottom,
        calc(0.2 * var(--slide-height))
      );

      --titlepage-title-font-size: var(
        --dd-titlepage-title-font-size,
        calc(2.15 * var(--titlepage-font-size))
      );
      --titlepage-subtitle-font-size: var(
        --dd-titlepage-subtitle-font-size,
        calc(0.6 * var(--titlepage-title-font-size))
      );

      --titlepage-logo-height: var(
        --dd-titlepage-logo-height,
        calc(var(--titlepage-h-top) / 1.3)
      );
      --titlepage-logo-top: var(
        --dd-titlepage-logo-top,
        calc(var(--titlepage-h-top) - var(--titlepage-logo-height) / 2)
      );
      --titlepage-logo-left: var(
        --dd-titlepage-logo-left,
        var(--titlepage-padding-side)
      );

      font: var(--titlepage-font);
      font-size: var(--titlepage-font-size);

      display: block;
    }

    :host(.slide) {
      position: relative;
      z-index: 0;
      overflow: hidden;
      box-sizing: border-box;
      width: var(--slide-width);
      height: var(--slide-height);
      background-color: white;
      max-width: 100%;
    }

    .dd-titlepage {
      min-height: 100%;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0;
      display: grid;
      grid-template-areas:
        'top-l top-r'
        'mid-l mid-r'
        'bot-l bot-r';
      grid-template-columns: var(--titlepage-w-left) 1fr;
      grid-template-rows: var(--titlepage-h-top) auto var(--titlepage-h-bottom);
      align-items: top;
      justify-content: space-between;
      /* make sure slide number is not shown */
      z-index: 5;
    }

    #dd-titlepage-logo {
      position: absolute;
      top: var(--titlepage-logo-top);
      left: var(--titlepage-logo-left);
    }

    #dd-titlepage-logo img {
      height: var(--titlepage-logo-height);
      width: auto;
    }

    .dd-titlepage-top-l {
      grid-area: top-l;
      text-align: var(--titlepage-align-lsec);
    }
    .dd-titlepage-top-r {
      grid-area: top-r;
      text-align: var(--titlepage-align-rsec);
    }

    .dd-titlepage-mid-l {
      text-align: var(--titlepage-align-lsec);
      grid-area: mid-l;
    }
    .dd-titlepage-mid-r {
      grid-area: mid-r;
      text-align: var(--titlepage-align-rsec);
    }

    .dd-titlepage-bot-l {
      grid-area: bot-l;
      text-align: var(--titlepage-align-lsec);
    }
    .dd-titlepage-bot-r {
      grid-area: bot-r;
      text-align: var(--titlepage-align-rsec);
    }

    .dd-titlepage-top {
      top: 0;
      background-color: var(--dd-titlepage-color-bg-top);
      color: var(--dd-titlepage-color-fg-top);
      padding: var(--titlepage-padding-sectop);
    }

    .dd-titlepage-middle {
      max-height: var(--titlepage-h-middle);
      background-color: var(--dd-titlepage-color-bg-mid);
      color: var(--dd-titlepage-color-fg-mid);
      padding: var(--titlepage-padding-secmid);
    }

    .dd-titlepage-bottom {
      padding: var(--titlepage-padding-secbot);
      background-color: var(--dd-titlepage-color-bg-bot);
      color: var(--dd-titlepage-color-fg-bot);
    }
    .dd-titlepage-bottom .default {
      font-size: calc(0.45 * var(--titlepage-title-font-size));
      line-height: 1.3em;
    }

    .dd-titlepage-title {
      font-size: var(--titlepage-title-font-size);
      line-height: 1.3em;
    }

    .dd-titlepage-subtitle {
      padding-top: 0.8em;
      font-size: var(--titlepage-subtitle-font-size);
      line-height: 1.3em;
    }

    .dd-titlepage-org-url {
      text-decoration: none;
      /*color: var(--dd-titlepage-color-text)*/
    }

    a {
      color: var(--dd-titlepage-color-link);
    }

    @media (max-width: 1168px) {
      :host {
        --titlepage-title-font-size: calc(1.8 * var(--titlepage-font-size));
        --slide-width: 1000px;
      }
    }
    @media (max-width: 700px) {
      :host {
        --titlepage-title-font-size: calc(1.2 * var(--titlepage-font-size));
        --slide-width: 600px;
      }
    }
  `,io([er({type:String,attribute:"img-src"})],Cr.prototype,"imgSrc",void 0),io([er({type:String,attribute:"main-title"})],Cr.prototype,"mainTitle",void 0),io([er({type:String,attribute:"sub-title"})],Cr.prototype,"subTitle",void 0),io([er({type:String,attribute:"author"})],Cr.prototype,"author",void 0),io([er({type:String,attribute:"organisation"})],Cr.prototype,"organisation",void 0),io([er({type:String,attribute:"organisation-url"})],Cr.prototype,"organisationUrl",void 0),io([er({type:String,attribute:"date"})],Cr.prototype,"date",void 0),io([er({type:Boolean,attribute:"no-default-map"})],Cr.prototype,"noDefaultMap",void 0),io([er({type:Boolean,attribute:"center-text"})],Cr.prototype,"centerText",void 0),io([er({type:Boolean,attribute:"center-img"})],Cr.prototype,"centerImg",void 0),io([er({type:Boolean,attribute:"center"})],Cr.prototype,"center",void 0),io([er({type:String,attribute:"config-path"})],Cr.prototype,"configPath",void 0),io([er({type:String,attribute:"from-selector"})],Cr.prototype,"fromSelector",void 0),io([er({type:String,attribute:"html-top-left"})],Cr.prototype,"htmlTopLeft",void 0),io([er({type:String,attribute:"html-top-right"})],Cr.prototype,"htmlTopRight",void 0),io([er({type:String,attribute:"html-mid-left"})],Cr.prototype,"htmlMidLeft",void 0),io([er({type:String,attribute:"html-mid-right"})],Cr.prototype,"htmlMidRight",void 0),io([er({type:String,attribute:"html-bot-left"})],Cr.prototype,"htmlBotLeft",void 0),io([er({type:String,attribute:"html-bot-right"})],Cr.prototype,"htmlBotRight",void 0),io([er({type:String,attribute:"width-left"})],Cr.prototype,"widthLeft",void 0),window.customElements.define("dd-titlepage",Cr);const Tr=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pr=Symbol(),Ur=new Map;class kr{constructor(t,e){if(this._$cssResult$=!0,e!==Pr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=Ur.get(this.cssText);return Tr&&void 0===t&&(Ur.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const Hr=Tr?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new kr("string"==typeof t?t:t+"",Pr))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var Nr;const Rr=window.trustedTypes,Mr=Rr?Rr.emptyScript:"",Lr=window.reactiveElementPolyfillSupport,Or={toAttribute(t,e){switch(e){case Boolean:t=t?Mr:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},zr=(t,e)=>e!==t&&(e==e||t==t),Dr={attribute:!0,type:String,converter:Or,reflect:!1,hasChanged:zr};class Br extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=Dr){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Dr}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Hr(t))}else void 0!==t&&e.push(Hr(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Tr?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=Dr){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:Or.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:Or.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||zr)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var jr;Br.finalized=!0,Br.elementProperties=new Map,Br.elementStyles=[],Br.shadowRootOptions={mode:"open"},null==Lr||Lr({ReactiveElement:Br}),(null!==(Nr=globalThis.reactiveElementVersions)&&void 0!==Nr?Nr:globalThis.reactiveElementVersions=[]).push("1.3.2");const Ir=globalThis.trustedTypes,Vr=Ir?Ir.createPolicy("lit-html",{createHTML:t=>t}):void 0,Wr=`lit$${(Math.random()+"").slice(9)}$`,qr="?"+Wr,Fr=`<${qr}>`,Kr=document,Jr=(t="")=>Kr.createComment(t),Zr=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Gr=Array.isArray,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xr=/-->/g,Yr=/>/g,tn=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,en=/'/g,sn=/"/g,on=/^(?:script|style|textarea|title)$/i,rn=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),nn=Symbol.for("lit-noChange"),ln=Symbol.for("lit-nothing"),an=new WeakMap,dn=Kr.createTreeWalker(Kr,129,null,!1),hn=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=Qr;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===Qr?"!--"===a[1]?n=Xr:void 0!==a[1]?n=Yr:void 0!==a[2]?(on.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=tn):void 0!==a[3]&&(n=tn):n===tn?">"===a[0]?(n=null!=o?o:Qr,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?tn:'"'===a[3]?sn:en):n===sn||n===en?n=tn:n===Xr||n===Yr?n=Qr:(n=tn,o=void 0);const c=n===tn&&t[e+1].startsWith("/>")?" ":"";r+=n===Qr?i+Fr:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+Wr+c):i+Wr+(-2===d?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==Vr?Vr.createHTML(l):l,s]};class cn{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=hn(t,e);if(this.el=cn.createElement(a,i),dn.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=dn.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(Wr)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(Wr),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?fn:"?"===e[1]?mn:"@"===e[1]?yn:vn})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(on.test(s.tagName)){const t=s.textContent.split(Wr),e=t.length-1;if(e>0){s.textContent=Ir?Ir.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],Jr()),dn.nextNode(),l.push({type:2,index:++o});s.append(t[e],Jr())}}}else if(8===s.nodeType)if(s.data===qr)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(Wr,t+1));)l.push({type:7,index:o}),t+=Wr.length-1}o++}}static createElement(t,e){const i=Kr.createElement("template");return i.innerHTML=t,i}}function pn(t,e,i=t,s){var o,r,n,l;if(e===nn)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const d=Zr(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=pn(t,a._$AS(t,e.values),a,s)),e}class un{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Kr).importNode(i,!0);dn.currentNode=o;let r=dn.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new gn(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new _n(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=dn.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class gn{constructor(t,e,i,s){var o;this.type=2,this._$AH=ln,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=pn(this,t,e),Zr(t)?t===ln||null==t||""===t?(this._$AH!==ln&&this._$AR(),this._$AH=ln):t!==this._$AH&&t!==nn&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return Gr(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==ln&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.k(Kr.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=cn.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new un(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=an.get(t.strings);return void 0===e&&an.set(t.strings,e=new cn(t)),e}S(t){Gr(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new gn(this.M(Jr()),this.M(Jr()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class vn{constructor(t,e,i,s,o){this.type=1,this._$AH=ln,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ln}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=pn(this,t,e,0),r=!Zr(t)||t!==this._$AH&&t!==nn,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=pn(this,s[i+n],e,n),l===nn&&(l=this._$AH[n]),r||(r=!Zr(l)||l!==this._$AH[n]),l===ln?t=ln:t!==ln&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.C(t)}C(t){t===ln?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class fn extends vn{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===ln?void 0:t}}const $n=Ir?Ir.emptyScript:"";class mn extends vn{constructor(){super(...arguments),this.type=4}C(t){t&&t!==ln?this.element.setAttribute(this.name,$n):this.element.removeAttribute(this.name)}}class yn extends vn{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=pn(this,t,e,0))&&void 0!==i?i:ln)===nn)return;const s=this._$AH,o=t===ln&&s!==ln||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==ln&&(s===ln||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class _n{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){pn(this,t)}}const An=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var bn,wn;null==An||An(cn,gn),(null!==(jr=globalThis.litHtmlVersions)&&void 0!==jr?jr:globalThis.litHtmlVersions=[]).push("2.2.6");class Sn extends Br{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new gn(e.insertBefore(Jr(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return nn}}Sn.finalized=!0,Sn._$litElement$=!0,null===(bn=globalThis.litElementHydrateSupport)||void 0===bn||bn.call(globalThis,{LitElement:Sn});const En=globalThis.litElementPolyfillSupport;null==En||En({LitElement:Sn}),(null!==(wn=globalThis.litElementVersions)&&void 0!==wn?wn:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Cn=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function xn(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Cn(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var Tn;null===(Tn=window.HTMLSlotElement)||void 0===Tn||Tn.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pn=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Un extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),this.it=ln,t.type!==Pn)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ln||null==t)return this.ft=void 0,this.it=t;if(t===nn)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Un.directiveName="unsafeHTML",Un.resultType=1;const kn=(t=>(...e)=>({_$litDirective$:t,values:e}))(Un),Hn="",Nn="",Rn="",Mn="#f3f3f3",Ln="black",On=!1,zn=!1,Dn="";class Bn extends Sn{constructor(){super(...arguments),this.hl=Hn,this.italic=Nn,this.bold=Rn,this.bgColor=Mn,this.fgColor=Ln,this.lang=Dn,this.lineNrs=On,this.noTrim=zn,this.highlight=Hn,this.codeHtml=""}_getMarkupLinesFromString(){const t=(t,e=0)=>[...Array(t).keys()].map((t=>t+e)),e=e=>{const i=[];if(e){const s=e.split(",");for(const e of s){const s=Number(e.trim());if(Number.isNaN(s)){const s=e.split("-");if(2===s.length){const e=Number(s[0].trim()),o=Number(s[1].trim());Number.isNaN(e)||Number.isNaN(o)||i.push(...t(o-e+1,e))}}else i.push(s)}}return i};return{hlLinesArr:e(this.hl),boldLinesArr:e(this.bold),italicLinesArr:e(this.italic)}}handleSlotChange(t){const e=t.target.assignedNodes({flatten:!0})[0];if(!e.textContent)return;let i=e.textContent;(this.childNodes.length>1||"HTML"===this.lang.toUpperCase())&&(i=this.innerHTML,i=i.replace(/</g,"&lt;"),i=i.replace(/>/g,"&gt;"));let s=i;this.noTrim||(s=s.replace(/^\n|\n$/g,""));const o=s.split("\n");let r=0;const n=o[0].split(" ");if(!this.noTrim)for(const t of n){if(""!==t)break;r++}0!==o[o.length-1].trim().length||this.noTrim||o.pop();const l=this._getMarkupLinesFromString(),a=[];for(const[t,e]of o.entries()){const i=e.slice(r);let s="";this.lineNrs&&(s=`<span class="line-nr">${t+1}</span>`),"!!!"===e.substring(r,r+3)?a.push(`<code class="code-hl">${s}${i.slice(3)}</code>`):l.hlLinesArr.includes(t+1)?a.push(`<code class="code-hl">${s}${i}</code>`):"!!"===e.substring(r,r+2)?a.push(`<code class="code-bold">${s}${i.slice(2)}</code>`):l.boldLinesArr.includes(t+1)?a.push(`<code class="code-bold">${s}${i}</code>`):"!"===e.substring(r,r+1)?a.push(`<code class="code-italic">${s}${i.slice(1)}</code>`):l.italicLinesArr.includes(t+1)?a.push(`<code class="code-italic">${s}${i}</code>`):a.push(`<code>${s}${i}</code>`)}this.codeHtml=a.join("\n"),this.bgColor&&this.style.setProperty("--color-bg",this.bgColor),this.fgColor&&this.style.setProperty("--color-fg",this.fgColor)}async firstUpdated(){}render(){return this.highlight&&(this.hl=this.highlight),rn`
      <slot style="display:none;" @slotchange="${this.handleSlotChange}"></slot>
      <div class="code-container">
        <div class="lang">${this.lang}</div>
        ${kn(`<pre class="codeblock">${this.codeHtml}</pre>`)}
      </div>
    `}}Bn.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new kr(i,Pr)})`
    :host {
      --color-hl: var(--dd-code-color-hl, rgba(251, 247, 25, 0.8));
      --line-height: var(--dd-code-line-height, 1.2em);
      --padding: var(--dd-code-padding, 1em);
      --margin: var(--dd-code-margin, 0.5em 0 0.5em 0);
      --line-nr-padding: var(--dd-code-padding-line-nr, 1.5em);
      --color-bg: var(--dd-code-color-bg, #f3f3f3);
      --color-fg: var(--dd-code-color-fg, black);
      --color-lang: var(--dd-code-color-lang, rgba(0, 0, 0, 0.6));
      --font-size:var(--dd-code-font-size, 1.85em);
    }

    .codeblock {
      font-family: "Roboto Mono", monospace;
    }

    pre {
      padding:var(--padding);
      line-height:var(--line-height);
      background-color:var(--color-bg);
      color:var(--color-fg);
      margin:var(--margin);
      overflow-x: scroll;
      font-size:var(--font-size);
    }

    code {
     padding-left:var(--padding-left);
    }

    .code-hl {
      background-color:var(--color-hl);
    }
    .code-bold {
      font-weight:bold;
    }
    .code-italic {
      font-style:italic;
    }

    .line-nr {
      font-weight:normal;
      font-style:normal;
      padding-right: var(--line-nr-padding);
    }

    .code-container {
      font-family: "Roboto Mono", monospace;
      position:relative;
    }
    .lang {
      position:absolute;
      top:7px;
      right:7px;
      font-size:calc(0.85 * var(--font-size));
      color:var(--color-lang);
      line-height:1em;
    }
  `,xr([xn({type:String,attribute:"hl"})],Bn.prototype,"hl",void 0),xr([xn({type:String,attribute:"italic"})],Bn.prototype,"italic",void 0),xr([xn({type:String,attribute:"bold"})],Bn.prototype,"bold",void 0),xr([xn({type:String,attribute:"bg-color"})],Bn.prototype,"bgColor",void 0),xr([xn({type:String,attribute:"fg-color"})],Bn.prototype,"fgColor",void 0),xr([xn({type:String,attribute:"lang"})],Bn.prototype,"lang",void 0),xr([xn({type:Boolean,attribute:"line-nrs"})],Bn.prototype,"lineNrs",void 0),xr([xn({type:Boolean,attribute:"no-trim"})],Bn.prototype,"noTrim",void 0),xr([xn({type:String,attribute:"highlight"})],Bn.prototype,"highlight",void 0),xr([xn({type:String})],Bn.prototype,"codeHtml",void 0),window.customElements.define("dd-code",Bn);
