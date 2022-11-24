System.register("chunks:///_virtual/createOwn.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){"use strict";var t,e,i,o,r,a,l,s,c,u;return{setters:[function(n){t=n.applyDecoratedDescriptor,e=n.inheritsLoose,i=n.initializerDefineProperty,o=n.assertThisInitialized},function(n){r=n.cclegacy,a=n._decorator,l=n.EditBox,s=n.Label,c=n.Node,u=n.Component}],execute:function(){var g,p,h,d,f,y,m,w,b,_,v;r._RF.push({},"86a0fGX/pFCk7nSs4r0RCAN","createOwn",void 0);var C=a.ccclass,A=a.property;n("CreateOwn",(g=C("CreateOwn"),p=A(l),h=A(s),d=A(c),f=A(c),g((w=t((m=function(n){function t(){for(var t,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return t=n.call.apply(n,[this].concat(r))||this,i(t,"input_enterAppellation",w,o(t)),i(t,"label_sharelink",b,o(t)),i(t,"node_warning",_,o(t)),i(t,"node_alert",v,o(t)),t.myLat=null,t.myLng=null,t}e(t,n);var r=t.prototype;return r.onLoad=function(){this.isGeolocationAvailable()&&this.updateCurrentPosition()},r.onSubmit=function(){if(this.isGeolocationAvailable()&&this.myLat&&this.myLng){var n=new URL(window.location.href),t=btoa(this.myLat+","+this.myLng),e=new URLSearchParams({zwbyu:t,cnhu:this.input_enterAppellation.string||"他"});n.search=e.toString(),this.label_sharelink.string=n.toString();var i=this;navigator.clipboard.writeText(n.toString()).then((function(){console.log("Async: Copying to clipboard was successful!"),i.showAlert("OK","分享連結已經複製起來了")}),(function(n){console.error("Async: Could not copy text: ",n)}))}},r.isGeolocationAvailable=function(){return"geolocation"in navigator},r.updateCurrentPosition=function(){var n=this;navigator.geolocation.getCurrentPosition((function(t){var e=t.coords.latitude,i=t.coords.longitude;e||i?(n.myLat=e,n.myLng=i):n.showWarning("A02","找不到GPS訊號")}),(function(){n.showWarning("A01","找不到GPS訊號\n可能是瀏覽器不給予權限")}))},r.showAlert=function(n,t){this.node_alert.active=!0,this.node_alert.getChildByName("title").getComponent(s).string=n,this.node_alert.getChildByName("msg").getComponent(s).string=t},r.showWarning=function(n,t){this.node_warning.active=!0,this.node_warning.getChildByName("errorCode").getComponent(s).string="ERR"+n,this.node_warning.getChildByName("msg").getComponent(s).string=t},t}(u)).prototype,"input_enterAppellation",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=t(m.prototype,"label_sharelink",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_=t(m.prototype,"node_warning",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),v=t(m.prototype,"node_alert",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),y=m))||y));r._RF.pop()}}}));

System.register("chunks:///_virtual/machResult.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var n,i,e,a,r,l,o,s,h,c;return{setters:[function(t){n=t.applyDecoratedDescriptor,i=t.inheritsLoose,e=t.initializerDefineProperty,a=t.assertThisInitialized},function(t){r=t.cclegacy,l=t._decorator,o=t.Label,s=t.Node,h=t.director,c=t.Component}],execute:function(){var u,g,d,b,p,f,m,w,_,v,y;r._RF.push({},"1ca45zePANIcLqQkQ96Wv5q","machResult",void 0);var M=l.ccclass,L=l.property;t("MachResult",(u=M("MachResult"),g=L(o),d=L(o),b=L(o),p=L(s),u((w=n((m=function(t){function n(){for(var n,i=arguments.length,r=new Array(i),l=0;l<i;l++)r[l]=arguments[l];return n=t.call.apply(t,[this].concat(r))||this,e(n,"label_title",w,a(n)),e(n,"label_distanceMsg",_,a(n)),e(n,"label_hint",v,a(n)),e(n,"node_warning",y,a(n)),n.myLat=null,n.myLng=null,n.theirLat=null,n.theirLng=null,n}i(n,t);var r=n.prototype;return r.onLoad=function(){this.isGeolocationAvailable()&&this.updateCurrentPosition()},r.showResult=function(){var t,n=new URL(window.location.href).searchParams;try{if(null==(t=atob(n.get("zwbyu"))).match(/[\d\.]+,[\d\.]+/))return void this.showWarning("B00","網址錯誤，請重新要一份分享連結")}catch(t){return void this.showWarning("B00","網址錯誤，請重新要一份分享連結")}var i=t.split(","),e=i[0],a=i[1];if(this.theirLat=parseFloat(null!=e?e:"0"),this.theirLng=parseFloat(null!=a?a:"0"),this.theirLat&&this.theirLng){var r=n.get("cnhu")||"他",l=this.calcDistance();l<25e3?(this.label_title.string="你跟"+r+"只距離",this.label_distanceMsg.string=Math.round(l/1e3)+"km!",this.label_hint.string="你們距離很近耶，怎麼還不約起來"):l>4e5?(this.label_title.string="你跟"+r+"距離了",this.label_distanceMsg.string="超過"+Math.round(l/1e3)+"km!",this.label_hint.string="不曉得你們是在異地還是開了VPN，久久還是要記得約一下噢"):(this.label_title.string="你跟"+r+"距離了",this.label_distanceMsg.string=Math.round(l/1e3)+"km!",this.label_hint.string="好像有點距離，好像該約一下了")}else this.showWarning("B00","網址錯誤，請重新要一份分享連結")},r.onClickCreateOwn=function(){h.loadScene("createOwn")},r.isGeolocationAvailable=function(){return"geolocation"in navigator},r.updateCurrentPosition=function(){var t=this;navigator.geolocation.getCurrentPosition((function(n){var i=n.coords.latitude,e=n.coords.longitude;i||e?(t.myLat=i,t.myLng=e,t.showResult()):t.showWarning("A02","找不到GPS訊號")}),(function(){t.showWarning("A01","找不到GPS訊號\n可能是瀏覽器不給予權限")}))},r.calcDistance=function(){var t=function(t){return t*Math.PI/180},n=this.myLat,i=this.myLng,e=this.theirLat,a=this.theirLng,r=t(e-n),l=t(a-i);n=t(n),e=t(e);var o=Math.sin(r/2)*Math.sin(r/2)+Math.sin(l/2)*Math.sin(l/2)*Math.cos(n)*Math.cos(e);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))},r.showWarning=function(t,n){this.node_warning.active=!0,this.node_warning.getChildByName("errorCode").getComponent(o).string="ERR"+t,this.node_warning.getChildByName("msg").getComponent(o).string=n},n}(c)).prototype,"label_title",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_=n(m.prototype,"label_distanceMsg",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),v=n(m.prototype,"label_hint",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),y=n(m.prototype,"node_warning",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),f=m))||f));r._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./createOwn.ts","./machResult.ts","./main.ts"],(function(){"use strict";return{setters:[null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/main.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){"use strict";var e,t,o,r,i;return{setters:[function(n){e=n.inheritsLoose},function(n){t=n.cclegacy,o=n._decorator,r=n.director,i=n.Component}],execute:function(){var a;t._RF.push({},"28ed0AEynVIz5fRmDOiNeVN","main",void 0);var c=o.ccclass;o.property,n("Entry",c("Entry")(a=function(n){function t(){return n.apply(this,arguments)||this}e(t,n);var o=t.prototype;return o.onLoad=function(){this.isGeolocationAvailable(),new URL(window.location.href).searchParams.has("zwbyu")?r.loadScene("matchResult"):r.loadScene("createOwn")},o.isGeolocationAvailable=function(){return"geolocation"in navigator},t}(i))||a);t._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});