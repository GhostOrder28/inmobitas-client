"use strict";(self.webpackChunkreal_estate_management_app=self.webpackChunkreal_estate_management_app||[]).push([[936],{7422:function(e,t,i){i.d(t,{o:function(){return s}});var r=i(7462),n=i(7313),a=i(8690),o=["M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"],u=["M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11H5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"],s=(0,n.memo)((0,n.forwardRef)((function(e,t){return n.createElement(a.Z,(0,r.Z)({svgPaths16:o,svgPaths20:u,ref:t,name:"ban-circle"},e))})))},8307:function(e,t,i){var r=i(4942),n=i(7462),a=i(5987),o=i(7313),u=i(6123),s=i.n(u),l=i(5192),c=i.n(l),f=i(9438),d=i.n(f),v=i(9128),m=i(29),b=i(1876),p=["appearance","className","disabled","fontFamily","isInvalid","placeholder","required","spellCheck","width"],S=["className"];function h(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function g(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?h(Object(i),!0).forEach((function(t){(0,r.Z)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var y={_focus:"&:focus",_disabled:"&:disabled",_invalid:'&[aria-invalid="true"]:not(:focus)',_placeholder:"&::placeholder",_placeholderHover:"&:hover::placeholder",_placeholderFocus:"&:focus::placeholder"},O={border:"none",MozAppearance:"none",outline:"none",textDecoration:"none",WebkitAppearance:"none",WebkitFontSmoothing:"antialiased"},E=(0,o.memo)((0,o.forwardRef)((function(e,t){var i=e.appearance,r=void 0===i?"default":i,u=e.className,l=e.disabled,c=void 0!==l&&l,f=e.fontFamily,h=void 0===f?"ui":f,g=e.isInvalid,E=void 0!==g&&g,F=e.placeholder,w=e.required,j=e.spellCheck,V=void 0===j||j,k=e.width,Z=void 0===k?280:k,P=(0,a.Z)(e,p),N=(0,b.Z)().fontFamilies[h]||h,L=(0,v.m)("Input",{appearance:r,size:P.size||"medium"},y,O),C=L.className,A=(0,a.Z)(L,S),R=P.height||A.height,x=!P.size&&P.height?(0,m.F)(P.height):{};return o.createElement(d(),(0,n.Z)({is:"input",className:s()(C,u),type:"text",width:Z,required:w,disabled:c,placeholder:F,spellCheck:V,"aria-invalid":E,ref:t,fontFamily:N},A,P,x,{height:R}))})));E.propTypes=g(g(g(g(g({},f.dimensions.propTypes),f.spacing.propTypes),f.position.propTypes),f.layout.propTypes),{},{required:c().bool,disabled:c().bool,isInvalid:c().bool,spellCheck:c().bool,placeholder:c().string,appearance:c().string,width:c().oneOfType([c().string,c().number]),className:c().string}),t.Z=E},5818:function(e,t,i){var r=i(4942),n=i(7462),a=i(5987),o=i(7313),u=i(5192),s=i.n(u),l=i(9438),c=i.n(l),f=i(9128),d=i(1876),v=["className","color","fontFamily","size"];function m(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function b(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?m(Object(i),!0).forEach((function(t){(0,r.Z)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):m(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var p={},S=(0,o.memo)((0,o.forwardRef)((function(e,t){var i=e.className,r=e.color,u=void 0===r?"default":r,s=e.fontFamily,l=void 0===s?"ui":s,m=e.size,b=void 0===m?400:m,S=(0,a.Z)(e,v),h=(0,d.Z)(),g=h.colors,y="none"===u||"default"===u?"default":u,O=h.fontFamilies[l]||l,E=g[y]||g.text&&g.text[y]||y,F=(0,f.m)("Text",{size:b},p,p);return o.createElement(c(),(0,n.Z)({is:"span",ref:t},F,{fontFamily:O,color:E,className:i},S))})));S.propTypes=b(b({},c().propTypes),{},{size:s().oneOf([300,400,500,600]),fontFamily:s().string}),t.Z=S},5622:function(e,t,i){i.d(t,{gN:function(){return re},l0:function(){return M},lP:function(){return G}});var r=i(7462),n=i(3366),a=i(7313),o=".".charCodeAt(0),u=/\\(\\)?/g,s=RegExp("[^.[\\]]+|\\[(?:([^\"'][^[]*)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))","g"),l={},c=function(e){if(null===e||void 0===e||!e.length)return[];if("string"!==typeof e)throw new Error("toPath() expects a string");return null==l[e]&&(l[e]=function(e){var t=[];return e.charCodeAt(0)===o&&t.push(""),e.replace(s,(function(e,i,r,n){var a=e;r?a=n.replace(u,"$1"):i&&(a=i.trim()),t.push(a)})),t}(e)),l[e]},f=function(e,t){for(var i=c(t),r=e,n=0;n<i.length;n++){var a=i[n];if(void 0===r||null===r||"object"!==typeof r||Array.isArray(r)&&isNaN(a))return;r=r[a]}return r};function d(e){var t=function(e,t){if("object"!==typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var r=i.call(e,t||"default");if("object"!==typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===typeof t?t:String(t)}var v=function e(t,i,a,o,u){if(i>=a.length)return o;var s=a[i];if(isNaN(s)){var l;if(void 0===t||null===t){var c,f=e(void 0,i+1,a,o,u);return void 0===f?void 0:((c={})[s]=f,c)}if(Array.isArray(t))throw new Error("Cannot set a non-numeric property on an array");var v=e(t[s],i+1,a,o,u);if(void 0===v){var m=Object.keys(t).length;if(void 0===t[s]&&0===m)return;return void 0!==t[s]&&m<=1?isNaN(a[i-1])||u?void 0:{}:(t[s],(0,n.Z)(t,[s].map(d)))}return(0,r.Z)({},t,((l={})[s]=v,l))}var b=Number(s);if(void 0===t||null===t){var p=e(void 0,i+1,a,o,u);if(void 0===p)return;var S=[];return S[b]=p,S}if(!Array.isArray(t))throw new Error("Cannot set a numeric property on an object");var h=e(t[b],i+1,a,o,u),g=[].concat(t);if(u&&void 0===h){if(g.splice(b,1),0===g.length)return}else g[b]=h;return g},m=function(e,t,i,r){if(void 0===r&&(r=!1),void 0===e||null===e)throw new Error("Cannot call setIn() with "+String(e)+" state");if(void 0===t||null===t)throw new Error("Cannot call setIn() with "+String(t)+" key");return v(e,0,c(t),i,r)},b="FINAL_FORM/form-error",p="FINAL_FORM/array-error";function S(e,t){var i=e.errors,r=e.initialValues,n=e.lastSubmittedValues,a=e.submitErrors,o=e.submitFailed,u=e.submitSucceeded,s=e.submitting,l=e.values,c=t.active,d=t.blur,v=t.change,m=t.data,b=t.focus,S=t.modified,h=t.modifiedSinceLastSubmit,g=t.name,y=t.touched,O=t.validating,E=t.visited,F=f(l,g),w=f(i,g);w&&w[p]&&(w=w[p]);var j=a&&f(a,g),V=r&&f(r,g),k=t.isEqual(V,F),Z=!w&&!j;return{active:c,blur:d,change:v,data:m,dirty:!k,dirtySinceLastSubmit:!(!n||t.isEqual(f(n,g),F)),error:w,focus:b,initial:V,invalid:!Z,length:Array.isArray(F)?F.length:void 0,modified:S,modifiedSinceLastSubmit:h,name:g,pristine:k,submitError:j,submitFailed:o,submitSucceeded:u,submitting:s,touched:y,valid:Z,value:F,visited:E,validating:O}}var h=["active","data","dirty","dirtySinceLastSubmit","error","initial","invalid","length","modified","modifiedSinceLastSubmit","pristine","submitError","submitFailed","submitSucceeded","submitting","touched","valid","value","visited","validating"],g=function(e,t){if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var i=Object.keys(e),r=Object.keys(t);if(i.length!==r.length)return!1;for(var n=Object.prototype.hasOwnProperty.bind(t),a=0;a<i.length;a++){var o=i[a];if(!n(o)||e[o]!==t[o])return!1}return!0};function y(e,t,i,r,n,a){var o=!1;return n.forEach((function(n){r[n]&&(e[n]=t[n],i&&(~a.indexOf(n)?g(t[n],i[n]):t[n]===i[n])||(o=!0))})),o}var O=["data"],E=function(e,t,i,r){var n={blur:e.blur,change:e.change,focus:e.focus,name:e.name};return y(n,e,t,i,h,O)||!t||r?n:void 0},F=["active","dirty","dirtyFields","dirtyFieldsSinceLastSubmit","dirtySinceLastSubmit","error","errors","hasSubmitErrors","hasValidationErrors","initialValues","invalid","modified","modifiedSinceLastSubmit","pristine","submitting","submitError","submitErrors","submitFailed","submitSucceeded","touched","valid","validating","values","visited"],w=["touched","visited"];function j(e,t,i,r){var n={};return y(n,e,t,i,F,w)||!t||r?n:void 0}var V=function(e){var t,i;return function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t&&n.length===t.length&&!n.some((function(e,i){return!g(t[i],e)}))||(t=n,i=e.apply(void 0,n)),i}},k=function(e){return!!e&&("object"===typeof e||"function"===typeof e)&&"function"===typeof e.then},Z=function(e,t){return e===t},P=function e(t){return Object.keys(t).some((function(i){var r=t[i];return!r||"object"!==typeof r||r instanceof Error?"undefined"!==typeof r:e(r)}))};function N(e,t,i,r,n,a){var o=n(i,r,t,a);return!!o&&(e(o),!0)}function L(e,t,i,r,n){var a=e.entries;Object.keys(a).forEach((function(e){var o=a[Number(e)];if(o){var u=o.subscription,s=o.subscriber,l=o.notified;N(s,u,t,i,r,n||!l)&&(o.notified=!0)}}))}function C(e){if(!e)throw new Error("No config specified");var t=e.debug,i=e.destroyOnUnregister,n=e.keepDirtyOnReinitialize,a=e.initialValues,o=e.mutators,u=e.onSubmit,s=e.validate,l=e.validateOnBlur;if(!u)throw new Error("No onSubmit function specified");var c={subscribers:{index:0,entries:{}},fieldSubscribers:{},fields:{},formState:{asyncErrors:{},dirtySinceLastSubmit:!1,modifiedSinceLastSubmit:!1,errors:{},initialValues:a&&(0,r.Z)({},a),invalid:!1,pristine:!0,submitting:!1,submitFailed:!1,submitSucceeded:!1,resetWhileSubmitting:!1,valid:!0,validating:0,values:a?(0,r.Z)({},a):{}},lastFormState:void 0},d=0,v=!1,h=!1,y=!1,O=0,F={},w=function(e,t,i){var r=i(f(e.formState.values,t));e.formState.values=m(e.formState.values,t,r)||{}},C=function(e,t,i){if(e.fields[t]){var n,a;e.fields=(0,r.Z)({},e.fields,((n={})[i]=(0,r.Z)({},e.fields[t],{name:i,blur:function(){return W.blur(i)},change:function(e){return W.change(i,e)},focus:function(){return W.focus(i)},lastFieldState:void 0}),n)),delete e.fields[t],e.fieldSubscribers=(0,r.Z)({},e.fieldSubscribers,((a={})[i]=e.fieldSubscribers[t],a)),delete e.fieldSubscribers[t];var o=f(e.formState.values,t);e.formState.values=m(e.formState.values,t,void 0)||{},e.formState.values=m(e.formState.values,i,o),delete e.lastFormState}},A=function(e){return function(){if(o){for(var t={formState:c.formState,fields:c.fields,fieldSubscribers:c.fieldSubscribers,lastFormState:c.lastFormState},i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];var a=o[e](r,t,{changeValue:w,getIn:f,renameField:C,resetFieldState:W.resetFieldState,setIn:m,shallowEqual:g});return c.formState=t.formState,c.fields=t.fields,c.fieldSubscribers=t.fieldSubscribers,c.lastFormState=t.lastFormState,z(void 0,(function(){q(),I()})),a}}},R=o?Object.keys(o).reduce((function(e,t){return e[t]=A(t),e}),{}):{},x=function(e){return Object.keys(e.validators).reduce((function(t,i){var r=e.validators[Number(i)]();return r&&t.push(r),t}),[])},z=function(e,t){if(v)return h=!0,void t();var i=c.fields,n=c.formState,a=(0,r.Z)({},i),o=Object.keys(a);if(s||o.some((function(e){return x(a[e]).length}))){var u=!1;if(e){var l=a[e];if(l){var d=l.validateFields;d&&(u=!0,o=d.length?d.concat(e):[e])}}var y,E={},w={},j={},V=[].concat(function(e){var t=[];if(s){var i=s((0,r.Z)({},c.formState.values));k(i)?t.push(i.then((function(t){return e(t,!0)}))):e(i,!1)}return t}((function(e,t){t?w=e||{}:E=e||{}})),o.reduce((function(e,t){return e.concat(function(e,t){var i,r=[],n=x(e);return n.length&&(n.forEach((function(n){var a=n(f(c.formState.values,e.name),c.formState.values,0===n.length||3===n.length?S(c.formState,c.fields[e.name]):void 0);if(a&&k(a)){e.validating=!0;var o=a.then((function(i){c.fields[e.name]&&(c.fields[e.name].validating=!1,t(i))}));r.push(o)}else i||(i=a)})),t(i)),r}(i[t],(function(e){j[t]=e})))}),[])),Z=V.length>0,P=++O,N=Promise.all(V).then((y=P,function(e){return delete F[y],e}));Z&&(F[P]=N);var L=function(e){var t=(0,r.Z)({},u?n.errors:{},E,e?w:n.asyncErrors),l=function(e){o.forEach((function(r){if(i[r]){var n=f(E,r),o=f(t,r),l=x(a[r]).length,c=j[r];e(r,l&&c||s&&n||(n||u?void 0:o))}}))};l((function(e,i){t=m(t,e,i)||{}})),l((function(e,i){if(i&&i[p]){var r=f(t,e),n=[].concat(r);n[p]=i[p],t=m(t,e,n)}})),g(n.errors,t)||(n.errors=t),e&&(n.asyncErrors=w),n.error=E[b]};if(Z&&(c.formState.validating++,t()),L(!1),t(),Z){var C=function(){c.formState.validating--,t()};N.then((function(){O>P||L(!0)})).then(C,C)}}else t()},q=function(e){if(!d){var t=c.fields,i=c.fieldSubscribers,n=c.formState,a=(0,r.Z)({},t),o=function(e){var t=a[e],r=S(n,t),o=t.lastFieldState;t.lastFieldState=r;var u=i[e];u&&L(u,r,o,E,void 0===o)};e?o(e):Object.keys(a).forEach(o)}},D=function(){Object.keys(c.fields).forEach((function(e){c.fields[e].touched=!0}))},_=function(){var e=c.fields,t=c.formState,i=c.lastFormState,n=(0,r.Z)({},e),a=Object.keys(n),o=!1,u=a.reduce((function(e,i){return!n[i].isEqual(f(t.values,i),f(t.initialValues||{},i))&&(o=!0,e[i]=!0),e}),{}),s=a.reduce((function(e,i){var r=t.lastSubmittedValues||{};return n[i].isEqual(f(t.values,i),f(r,i))||(e[i]=!0),e}),{});t.pristine=!o,t.dirtySinceLastSubmit=!(!t.lastSubmittedValues||!Object.values(s).some((function(e){return e}))),t.modifiedSinceLastSubmit=!(!t.lastSubmittedValues||!Object.keys(n).some((function(e){return n[e].modifiedSinceLastSubmit}))),t.valid=!t.error&&!t.submitError&&!P(t.errors)&&!(t.submitErrors&&P(t.submitErrors));var l=function(e){var t=e.active,i=e.dirtySinceLastSubmit,r=e.modifiedSinceLastSubmit,n=e.error,a=e.errors,o=e.initialValues,u=e.pristine,s=e.submitting,l=e.submitFailed,c=e.submitSucceeded,f=e.submitError,d=e.submitErrors,v=e.valid,m=e.validating,b=e.values;return{active:t,dirty:!u,dirtySinceLastSubmit:i,modifiedSinceLastSubmit:r,error:n,errors:a,hasSubmitErrors:!!(f||d&&P(d)),hasValidationErrors:!(!n&&!P(a)),invalid:!v,initialValues:o,pristine:u,submitting:s,submitFailed:l,submitSucceeded:c,submitError:f,submitErrors:d,valid:v,validating:m>0,values:b}}(t),d=a.reduce((function(e,t){return e.modified[t]=n[t].modified,e.touched[t]=n[t].touched,e.visited[t]=n[t].visited,e}),{modified:{},touched:{},visited:{}}),v=d.modified,m=d.touched,b=d.visited;return l.dirtyFields=i&&g(i.dirtyFields,u)?i.dirtyFields:u,l.dirtyFieldsSinceLastSubmit=i&&g(i.dirtyFieldsSinceLastSubmit,s)?i.dirtyFieldsSinceLastSubmit:s,l.modified=i&&g(i.modified,v)?i.modified:v,l.touched=i&&g(i.touched,m)?i.touched:m,l.visited=i&&g(i.visited,b)?i.visited:b,i&&g(i,l)?i:l},B=!1,U=!1,I=function e(){if(B)U=!0;else{if(B=!0,t&&t(_(),Object.keys(c.fields).reduce((function(e,t){return e[t]=c.fields[t],e}),{})),!d&&(!v||!y)){var i=c.lastFormState,r=_();r!==i&&(c.lastFormState=r,L(c.subscribers,r,i,j))}B=!1,U&&(U=!1,e())}},T=function(){return Object.keys(c.fields).forEach((function(e){return c.fields[e].modifiedSinceLastSubmit=!1}))};z(void 0,(function(){I()}));var W={batch:function(e){d++,e(),d--,q(),I()},blur:function(e){var t=c.fields,i=c.formState,n=t[e];n&&(delete i.active,t[e]=(0,r.Z)({},n,{active:!1,touched:!0}),l?z(e,(function(){q(),I()})):(q(),I()))},change:function(e,t){var i=c.fields,n=c.formState;if(f(n.values,e)!==t){w(c,e,(function(){return t}));var a=i[e];a&&(i[e]=(0,r.Z)({},a,{modified:!0,modifiedSinceLastSubmit:!!n.lastSubmittedValues})),l?(q(),I()):z(e,(function(){q(),I()}))}},get destroyOnUnregister(){return!!i},set destroyOnUnregister(e){i=e},focus:function(e){var t=c.fields[e];t&&!t.active&&(c.formState.active=e,t.active=!0,t.visited=!0,q(),I())},mutators:R,getFieldState:function(e){var t=c.fields[e];return t&&t.lastFieldState},getRegisteredFields:function(){return Object.keys(c.fields)},getState:function(){return _()},initialize:function(e){var t=c.fields,i=c.formState,a=(0,r.Z)({},t),o="function"===typeof e?e(i.values):e;n||(i.values=o);var u=n?Object.keys(a).reduce((function(e,t){return a[t].isEqual(f(i.values,t),f(i.initialValues||{},t))||(e[t]=f(i.values,t)),e}),{}):{};i.initialValues=o,i.values=o,Object.keys(u).forEach((function(e){i.values=m(i.values,e,u[e])})),z(void 0,(function(){q(),I()}))},isValidationPaused:function(){return v},pauseValidation:function(e){void 0===e&&(e=!0),v=!0,y=e},registerField:function(e,t,r,n){void 0===r&&(r={}),c.fieldSubscribers[e]||(c.fieldSubscribers[e]={index:0,entries:{}});var a=c.fieldSubscribers[e].index++;c.fieldSubscribers[e].entries[a]={subscriber:V(t),subscription:r,notified:!1},c.fields[e]||(c.fields[e]={active:!1,afterSubmit:n&&n.afterSubmit,beforeSubmit:n&&n.beforeSubmit,blur:function(){return W.blur(e)},change:function(t){return W.change(e,t)},data:n&&n.data||{},focus:function(){return W.focus(e)},isEqual:n&&n.isEqual||Z,lastFieldState:void 0,modified:!1,modifiedSinceLastSubmit:!1,name:e,touched:!1,valid:!0,validateFields:n&&n.validateFields,validators:{},validating:!1,visited:!1});var o=!1,u=n&&n.silent,s=function(){u?q(e):(I(),q())};if(n){o=!(!n.getValidator||!n.getValidator()),n.getValidator&&(c.fields[e].validators[a]=n.getValidator);var l=void 0===f(c.formState.values,e);void 0===n.initialValue||!l&&f(c.formState.values,e)!==f(c.formState.initialValues,e)||(c.formState.initialValues=m(c.formState.initialValues||{},e,n.initialValue),c.formState.values=m(c.formState.values,e,n.initialValue),z(void 0,s)),void 0!==n.defaultValue&&void 0===n.initialValue&&void 0===f(c.formState.initialValues,e)&&l&&(c.formState.values=m(c.formState.values,e,n.defaultValue))}return o?z(void 0,s):s(),function(){var t=!1;c.fields[e]&&(t=!(!c.fields[e].validators[a]||!c.fields[e].validators[a]()),delete c.fields[e].validators[a]);var r=!!c.fieldSubscribers[e];r&&delete c.fieldSubscribers[e].entries[a];var n=r&&!Object.keys(c.fieldSubscribers[e].entries).length;n&&(delete c.fieldSubscribers[e],delete c.fields[e],t&&(c.formState.errors=m(c.formState.errors,e,void 0)||{}),i&&(c.formState.values=m(c.formState.values,e,void 0,!0)||{})),u||(t?z(void 0,(function(){I(),q()})):n&&I())}},reset:function(e){void 0===e&&(e=c.formState.initialValues),c.formState.submitting&&(c.formState.resetWhileSubmitting=!0),c.formState.submitFailed=!1,c.formState.submitSucceeded=!1,delete c.formState.submitError,delete c.formState.submitErrors,delete c.formState.lastSubmittedValues,W.initialize(e||{})},resetFieldState:function(e){c.fields[e]=(0,r.Z)({},c.fields[e],{active:!1,lastFieldState:void 0,modified:!1,touched:!1,valid:!0,validating:!1,visited:!1}),z(void 0,(function(){q(),I()}))},restart:function(e){void 0===e&&(e=c.formState.initialValues),W.batch((function(){for(var t in c.fields)W.resetFieldState(t),c.fields[t]=(0,r.Z)({},c.fields[t],{active:!1,lastFieldState:void 0,modified:!1,modifiedSinceLastSubmit:!1,touched:!1,valid:!0,validating:!1,visited:!1});W.reset(e)}))},resumeValidation:function(){v=!1,y=!1,h&&z(void 0,(function(){q(),I()})),h=!1},setConfig:function(e,r){switch(e){case"debug":t=r;break;case"destroyOnUnregister":i=r;break;case"initialValues":W.initialize(r);break;case"keepDirtyOnReinitialize":n=r;break;case"mutators":o=r,r?(Object.keys(R).forEach((function(e){e in r||delete R[e]})),Object.keys(r).forEach((function(e){R[e]=A(e)}))):Object.keys(R).forEach((function(e){delete R[e]}));break;case"onSubmit":u=r;break;case"validate":s=r,z(void 0,(function(){q(),I()}));break;case"validateOnBlur":l=r;break;default:throw new Error("Unrecognised option "+e)}},submit:function(){var e=c.formState;if(!e.submitting){if(delete e.submitErrors,delete e.submitError,e.lastSubmittedValues=(0,r.Z)({},e.values),c.formState.error||P(c.formState.errors))return D(),T(),c.formState.submitFailed=!0,I(),void q();var t=Object.keys(F);if(t.length)Promise.all(t.map((function(e){return F[Number(e)]}))).then(W.submit,console.error);else if(!Object.keys(c.fields).some((function(e){return c.fields[e].beforeSubmit&&!1===c.fields[e].beforeSubmit()}))){var i,n=!1,a=function(t){e.submitting=!1;var r=e.resetWhileSubmitting;return r&&(e.resetWhileSubmitting=!1),t&&P(t)?(e.submitFailed=!0,e.submitSucceeded=!1,e.submitErrors=t,e.submitError=t[b],D()):(r||(e.submitFailed=!1,e.submitSucceeded=!0),Object.keys(c.fields).forEach((function(e){return c.fields[e].afterSubmit&&c.fields[e].afterSubmit()}))),I(),q(),n=!0,i&&i(t),t};e.submitting=!0,e.submitFailed=!1,e.submitSucceeded=!1,e.lastSubmittedValues=(0,r.Z)({},e.values),T();var o=u(e.values,W,a);if(!n){if(o&&k(o))return I(),q(),o.then(a,(function(e){throw a(),e}));if(u.length>=3)return I(),q(),new Promise((function(e){i=e}));a(o)}}}},subscribe:function(e,t){if(!e)throw new Error("No callback given.");if(!t)throw new Error("No subscription provided. What values do you want to listen to?");var i=V(e),r=c.subscribers,n=r.index++;r.entries[n]={subscriber:i,subscription:t,notified:!1};var a=_();return N(i,t,a,a,j,!0),function(){delete r.entries[n]}}};return W}var A=["render","children","component"];function R(e,t,i){var r=e.render,o=e.children,u=e.component,s=(0,n.Z)(e,A);if(u)return a.createElement(u,Object.assign(t,s,{children:o,render:r}));if(r)return r(void 0===o?Object.assign(t,s):Object.assign(t,s,{children:o}));if("function"!==typeof o)throw new Error("Must specify either a render prop, a render function as children, or a component prop to "+i);return o(Object.assign(t,s))}function x(e,t,i){void 0===i&&(i=function(e,t){return e===t});var r=a.useRef(e);a.useEffect((function(){i(e,r.current)||(t(),r.current=e)}))}var z=function(e,t){if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var i=Object.keys(e),r=Object.keys(t);if(i.length!==r.length)return!1;for(var n=Object.prototype.hasOwnProperty.bind(t),a=0;a<i.length;a++){var o=i[a];if(!n(o)||e[o]!==t[o])return!1}return!0},q=function(e){return!(!e||"function"!==typeof e.stopPropagation)},D=a.createContext();function _(e){var t=a.useRef(e);return a.useEffect((function(){t.current=e})),t}var B=function(e,t,i){i.forEach((function(i){Object.defineProperty(e,i,{get:function(){return t[i]},enumerable:!0})}))},U=function(e,t){return B(e,t,["active","dirty","dirtyFields","dirtySinceLastSubmit","dirtyFieldsSinceLastSubmit","error","errors","hasSubmitErrors","hasValidationErrors","initialValues","invalid","modified","modifiedSinceLastSubmit","pristine","submitError","submitErrors","submitFailed","submitSucceeded","submitting","touched","valid","validating","values","visited"])},I=["debug","decorators","destroyOnUnregister","form","initialValues","initialValuesEqual","keepDirtyOnReinitialize","mutators","onSubmit","subscription","validate","validateOnBlur"],T={"final-form":"4.20.6","react-final-form":"6.5.8"},W=F.reduce((function(e,t){return e[t]=!0,e}),{});function M(e){var t=e.debug,i=e.decorators,o=void 0===i?[]:i,u=e.destroyOnUnregister,s=e.form,l=e.initialValues,c=e.initialValuesEqual,f=e.keepDirtyOnReinitialize,d=e.mutators,v=e.onSubmit,m=e.subscription,b=void 0===m?W:m,p=e.validate,S=e.validateOnBlur,h=(0,n.Z)(e,I),g={debug:t,destroyOnUnregister:u,initialValues:l,keepDirtyOnReinitialize:f,mutators:d,onSubmit:v,validate:p,validateOnBlur:S},y=function(e){var t=a.useRef();return t.current||(t.current=e()),t.current}((function(){var e=s||C(g);return e.pauseValidation(),e})),O=a.useState((function(){var e={};return y.subscribe((function(t){e=t}),b)(),e})),E=O[0],F=O[1],w=_(E);a.useEffect((function(){y.isValidationPaused()&&y.resumeValidation();var e=[y.subscribe((function(e){z(e,w.current)||F(e)}),b)].concat(o?o.map((function(e){return e(y)})):[]);return function(){y.pauseValidation(),e.reverse().forEach((function(e){return e()}))}}),o),x(t,(function(){y.setConfig("debug",t)})),x(u,(function(){y.destroyOnUnregister=!!u})),x(f,(function(){y.setConfig("keepDirtyOnReinitialize",f)})),x(l,(function(){y.setConfig("initialValues",l)}),c||z),x(d,(function(){y.setConfig("mutators",d)})),x(v,(function(){y.setConfig("onSubmit",v)})),x(p,(function(){y.setConfig("validate",p)})),x(S,(function(){y.setConfig("validateOnBlur",S)}));var j={form:(0,r.Z)({},y,{reset:function(e){q(e)?y.reset():y.reset(e)}}),handleSubmit:function(e){return e&&("function"===typeof e.preventDefault&&e.preventDefault(),"function"===typeof e.stopPropagation&&e.stopPropagation()),y.submit()}};return U(j,E),a.createElement(D.Provider,{value:y},R((0,r.Z)({},h,{__versions:T}),j,"ReactFinalForm"))}function H(e){var t=a.useContext(D);if(!t)throw new Error((e||"useForm")+" must be used inside of a <Form> component");return t}var $=["onChange","subscription"];function G(e){var t=e.onChange,i=e.subscription,o=(0,n.Z)(e,$),u=H("FormSpy"),s=function(e){var t=void 0===e?{}:e,i=t.onChange,r=t.subscription,n=void 0===r?W:r,o=H("useFormState"),u=a.useRef(!0),s=a.useRef(i);s.current=i;var l=a.useState((function(){var e={};return o.subscribe((function(t){e=t}),n)(),i&&i(e),e})),c=l[0],f=l[1];a.useEffect((function(){return o.subscribe((function(e){u.current?u.current=!1:(f(e),s.current&&s.current(e))}),n)}),[]);var d={};return U(d,c),d}({onChange:t,subscription:i});if(t)return null;var l={form:(0,r.Z)({},u,{reset:function(e){q(e)?u.reset():u.reset(e)}})};return R((0,r.Z)({},o,l),s,"FormSpy")}var J="undefined"!==typeof window&&window.navigator&&window.navigator.product&&"ReactNative"===window.navigator.product;function K(e){var t=a.useRef(e);return a.useEffect((function(){t.current=e})),a.useCallback((function(){for(var e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];return t.current.apply(null,i)}),[])}var Q=h.reduce((function(e,t){return e[t]=!0,e}),{}),X=function(e,t){return void 0===e?"":e},Y=function(e,t){return""===e?void 0:e},ee=function(e,t){return e===t};function te(e,t){void 0===t&&(t={});var i=t,r=i.afterSubmit,n=i.allowNull,o=i.component,u=i.data,s=i.defaultValue,l=i.format,c=void 0===l?X:l,f=i.formatOnBlur,d=i.initialValue,v=i.multiple,m=i.parse,b=void 0===m?Y:m,p=i.subscription,S=void 0===p?Q:p,h=i.type,g=i.validateFields,y=i.value,O=H("useField"),E=_(t),F=function(t,i){return O.registerField(e,t,S,{afterSubmit:r,beforeSubmit:function(){var t=E.current,i=t.beforeSubmit,r=t.formatOnBlur,n=t.format,a=void 0===n?X:n;if(r){var o=O.getFieldState(e).value,u=a(o,e);u!==o&&O.change(e,u)}return i&&i()},data:u,defaultValue:s,getValidator:function(){return E.current.validate},initialValue:d,isEqual:function(e,t){return(E.current.isEqual||ee)(e,t)},silent:i,validateFields:g})},w=a.useRef(!0),j=a.useState((function(){var e={},t=O.destroyOnUnregister;return O.destroyOnUnregister=!1,F((function(t){e=t}),!0)(),O.destroyOnUnregister=t,e})),V=j[0],k=j[1];a.useEffect((function(){return F((function(e){w.current?w.current=!1:k(e)}),!1)}),[e,u,s,d]);var Z={};!function(e,t){B(e,t,["active","data","dirty","dirtySinceLastSubmit","error","initial","invalid","length","modified","modifiedSinceLastSubmit","pristine","submitError","submitFailed","submitSucceeded","submitting","touched","valid","validating","visited"])}(Z,V);var P={name:e,get value(){var t=V.value;return f?"input"===o&&(t=X(t)):t=c(t,e),null!==t||n||(t=""),"checkbox"===h||"radio"===h?y:"select"===o&&v?t||[]:t},get checked(){var t=V.value;return"checkbox"===h?(t=c(t,e),void 0===y?!!t:!(!Array.isArray(t)||!~t.indexOf(y))):"radio"===h?c(t,e)===y:void 0},onBlur:K((function(e){if(V.blur(),f){var t=O.getFieldState(V.name);V.change(c(t.value,V.name))}})),onChange:K((function(t){var i=t&&t.target?function(e,t,i,r){if(!r&&e.nativeEvent&&void 0!==e.nativeEvent.text)return e.nativeEvent.text;if(r&&e.nativeEvent)return e.nativeEvent.text;var n=e.target,a=n.type,o=n.value,u=n.checked;switch(a){case"checkbox":if(void 0!==i){if(u)return Array.isArray(t)?t.concat(i):[i];if(!Array.isArray(t))return t;var s=t.indexOf(i);return s<0?t:t.slice(0,s).concat(t.slice(s+1))}return!!u;case"select-multiple":return function(e){var t=[];if(e)for(var i=0;i<e.length;i++){var r=e[i];r.selected&&t.push(r.value)}return t}(e.target.options);default:return o}}(t,V.value,y,J):t;V.change(b(i,e))})),onFocus:K((function(e){return V.focus()}))};return v&&(P.multiple=v),void 0!==h&&(P.type=h),{input:P,meta:Z}}var ie=["afterSubmit","allowNull","beforeSubmit","children","component","data","defaultValue","format","formatOnBlur","initialValue","isEqual","multiple","name","parse","subscription","type","validate","validateFields","value"],re=a.forwardRef((function(e,t){var i=e.afterSubmit,o=e.allowNull,u=e.beforeSubmit,s=e.children,l=e.component,c=e.data,f=e.defaultValue,d=e.format,v=e.formatOnBlur,m=e.initialValue,b=e.isEqual,p=e.multiple,S=e.name,h=e.parse,g=e.subscription,y=e.type,O=e.validate,E=e.validateFields,F=e.value,w=(0,n.Z)(e,ie),j=te(S,{afterSubmit:i,allowNull:o,beforeSubmit:u,children:s,component:l,data:c,defaultValue:f,format:d,formatOnBlur:v,initialValue:m,isEqual:b,multiple:p,parse:h,subscription:g,type:y,validate:O,validateFields:E,value:F});if("function"===typeof s)return s((0,r.Z)({},j,w));if("string"===typeof l)return a.createElement(l,(0,r.Z)({},j.input,{children:s,ref:t},w));if(!S)throw new Error("prop name cannot be undefined in <Field> component");return R((0,r.Z)({children:s,component:l,ref:t},w),j,"Field("+S+")")}))}}]);