(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1553:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return p}));var n,a=r(6),o=r.n(a),i=r(90),s=r.n(i),l=r(1),c=r(602),h=r(91),u=r(105),d=r(107);!function(e){e.Edit="edit",e.Importing="importing"}(n||(n={}));class p extends s.a.Component{constructor(e){super(e),o()(this,"unmounted",!1),o()(this,"file",Object(i.createRef)()),o()(this,"onFormChange",()=>{const e=this.file.current.files||[];this.setState({enableSubmit:""!==this.state.passphrase&&e.length>0})}),o()(this,"onPassphraseChange",e=>{this.setState({passphrase:e.target.value}),this.onFormChange()}),o()(this,"onFormSubmit",e=>(e.preventDefault(),this.startImport(this.file.current.files[0],this.state.passphrase),!1)),o()(this,"onCancelClick",e=>(e.preventDefault(),this.props.onFinished(!1),!1)),this.state={enableSubmit:!1,phase:n.Edit,errStr:null,passphrase:""}}componentWillUnmount(){this.unmounted=!0}startImport(e,t){return this.setState({errStr:null,phase:n.Importing}),function(e){return new Promise((t,r)=>{const n=new FileReader;n.onload=e=>{t(e.target.result)},n.onerror=r,n.readAsArrayBuffer(e)})}(e).then(e=>c.a(e,t)).then(e=>this.props.matrixClient.importRoomKeys(JSON.parse(e))).then(()=>{this.props.onFinished(!0)}).catch(e=>{if(l.a.error("Error importing e2e keys:",e),this.unmounted)return;const t=e.friendlyText||Object(h.a)("Unknown error");this.setState({errStr:t,phase:n.Edit})})}render(){const e=this.state.phase!==n.Edit;return s.a.createElement(u.a,{className:"mx_importE2eKeysDialog",onFinished:this.props.onFinished,title:Object(h.a)("Import room keys")},s.a.createElement("form",{onSubmit:this.onFormSubmit},s.a.createElement("div",{className:"mx_Dialog_content"},s.a.createElement("p",null,Object(h.a)("This process allows you to import encryption keys that you had previously exported from another Matrix client. You will then be able to decrypt any messages that the other client could decrypt.")),s.a.createElement("p",null,Object(h.a)("The export file will be protected with a passphrase. You should enter the passphrase here, to decrypt the file.")),s.a.createElement("div",{className:"error"},this.state.errStr),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputTable"},s.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},s.a.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},s.a.createElement("label",{htmlFor:"importFile"},Object(h.a)("File to import"))),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},s.a.createElement("input",{ref:this.file,id:"importFile",type:"file",autoFocus:!0,onChange:this.onFormChange,disabled:e}))),s.a.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},s.a.createElement(d.a,{label:Object(h.a)("Enter passphrase"),value:this.state.passphrase,onChange:this.onPassphraseChange,size:64,type:"password",disabled:e})))),s.a.createElement("div",{className:"mx_Dialog_buttons"},s.a.createElement("input",{className:"mx_Dialog_primary",type:"submit",value:Object(h.a)("Import"),disabled:!this.state.enableSubmit||e}),s.a.createElement("button",{onClick:this.onCancelClick,disabled:e},Object(h.a)("Cancel")))))}}},602:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return h}));var n=r(1),a=r(91),o=r(101);const i=window.crypto.subtle||window.crypto.webkitSubtle;function s(e,t){return{message:e,friendlyText:t}}function l(){return Object(a.a)("Your browser does not support the required cryptography extensions")}async function c(e,t){const r=function(e){const t=(new TextDecoder).decode(new Uint8Array(e));let r=0;for(;;){const e=t.indexOf("\n",r);if(e<0)throw new Error("Header line not found");const n=t.slice(r,e).trim();if(r=e+1,n===d)break}const n=r;for(;;){const e=t.indexOf("\n",r);if("-----END MEGOLM SESSION DATA-----"===t.slice(r,e<0?void 0:e).trim())break;if(e<0)throw new Error("Trailer line not found");r=e+1}const a=r;return function(e){const t=window.atob(e),r=new Uint8Array(t.length);for(let e=0;e<t.length;e++)r[e]=t.charCodeAt(e);return r}(t.slice(n,a))}(e),n=o.b.get().brand;if(r.length<1)throw s("Invalid file: too short",Object(a.a)("Not a valid %(brand)s keyfile",{brand:n}));if(1!==r[0])throw s("Unsupported version",Object(a.a)("Not a valid %(brand)s keyfile",{brand:n}));const c=r.length-69;if(c<0)throw s("Invalid file: too short",Object(a.a)("Not a valid %(brand)s keyfile",{brand:n}));const h=r.subarray(1,17),p=r.subarray(17,33),m=r[33]<<24|r[34]<<16|r[35]<<8|r[36],y=r.subarray(37,37+c),f=r.subarray(-32),[w,b]=await u(h,m,t),g=r.subarray(0,-32);let E,C;try{E=await i.verify({name:"HMAC"},b,f,g)}catch(e){throw s("subtleCrypto.verify failed: "+e,l())}if(!E)throw s("hmac mismatch",Object(a.a)("Authentication check failed: incorrect password?"));try{C=await i.decrypt({name:"AES-CTR",counter:p,length:64},w,y)}catch(e){throw s("subtleCrypto.decrypt failed: "+e,l())}return(new TextDecoder).decode(new Uint8Array(C))}async function h(e,t,r){const n=(r=r||{}).kdf_rounds||5e5,a=new Uint8Array(16);window.crypto.getRandomValues(a);const o=new Uint8Array(16);window.crypto.getRandomValues(o),o[8]&=127;const[c,h]=await u(a,n,t),m=(new TextEncoder).encode(e);let y;try{y=await i.encrypt({name:"AES-CTR",counter:o,length:64},c,m)}catch(e){throw s("subtleCrypto.encrypt failed: "+e,l())}const f=new Uint8Array(y),w=1+a.length+o.length+4+f.length+32,b=new Uint8Array(w);let g=0;b[g++]=1,b.set(a,g),g+=a.length,b.set(o,g),g+=o.length,b[g++]=n>>24,b[g++]=n>>16&255,b[g++]=n>>8&255,b[g++]=255&n,b.set(f,g),g+=f.length;const E=b.subarray(0,g);let C;try{C=await i.sign({name:"HMAC"},h,E)}catch(e){throw s("subtleCrypto.sign failed: "+e,l())}const S=new Uint8Array(C);return b.set(S,g),function(e){const t=Math.ceil(e.length/96),r=new Array(t+3);r[0]=d;let n,a=0;for(n=1;n<=t;n++)r[n]=p(e.subarray(a,a+96)),a+=96;return r[n++]="-----END MEGOLM SESSION DATA-----",r[n]="",(new TextEncoder).encode(r.join("\n")).buffer}(b)}async function u(e,t,r){const a=new Date;let o,c;try{o=await i.importKey("raw",(new TextEncoder).encode(r),{name:"PBKDF2"},!1,["deriveBits"])}catch(e){throw s("subtleCrypto.importKey failed: "+e,l())}try{c=await i.deriveBits({name:"PBKDF2",salt:e,iterations:t,hash:"SHA-512"},o,512)}catch(e){throw s("subtleCrypto.deriveBits failed: "+e,l())}const h=new Date;n.a.log("E2e import/export: deriveKeys took "+(h.getTime()-a.getTime())+"ms");const u=c.slice(0,32),d=c.slice(32),p=i.importKey("raw",u,{name:"AES-CTR"},!1,["encrypt","decrypt"]).catch(e=>{throw s("subtleCrypto.importKey failed for AES key: "+e,l())}),m=i.importKey("raw",d,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]).catch(e=>{throw s("subtleCrypto.importKey failed for HMAC key: "+e,l())});return Promise.all([p,m])}const d="-----BEGIN MEGOLM SESSION DATA-----";function p(e){const t=String.fromCharCode.apply(null,Array.from(e));return window.btoa(t)}}}]);
//# sourceMappingURL=30.js.map