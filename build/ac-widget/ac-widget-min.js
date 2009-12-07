YUI.add("ac-widget",function(B){function D(){D.superclass.constructor.apply(this,arguments);}var A="_bound",E="selectedIndex",J="_selectedIndex",G="_originalValue",C=B.Array.each,F="queryValue";B.ACWidget=B.extend(D,B.Widget,{initializer:function(){var K=this;K.after({queryChanged:K.syncUI,dataChanged:K.syncUI});K.hide();},renderUI:function(){var L=this.get("ac");if(!L){return;}var K=L.get("host");H(this.get("boundingBox"),K);this.setSize();return;},setSize:function(){return this.set("width",this.get("ac").get("host").getComputedStyle("width"));},bindUI:function(N){var O=this,K=O.get("contentBox"),M=O.get("ac"),L=B.stamp(O)+"|";if(N&&M!==N&&O[A]){B.detach(L);O[A]=0;}N=N||M;if(N&&!O[A]){O[A]=1;K.delegate(L+"click",O.click,"li",O);B.on(L+"click",O.hide,document);N.on(L+"ac:load",function(P){O.setAttrs({query:P.query,data:P.results}).syncUI().show();});N.on(L+"ac:query",function(P){O.set("query",P.value).syncUI();});N.on(L+"ac:next",O.next,O);N.on(L+"ac:previous",O.previous,O);N.on(L+"ac:hide",O.hide,O);}return O;},syncUI:function(){var K=this,M=K.get("data"),L=K.get("query");if(!M){return K;}K[J]=-1;K[G]="";K.get("contentBox").set("innerHTML",K.getListMarkup(M));return K;},getListMarkup:function(N){var M=this,K=M.get("listTpl"),L=[];C(N,function(O){L.push(M.getItemMarkup(O));});return K.replace(/\{list\}/g,L.join(""));},getItemMarkup:function(K){return this.get("itemTpl").replace(/\{term\}/g,K).replace(/\{hilite\}/g,this.getHiliteMarkup(K));},getHiliteMarkup:function(M){var L=this,K=L.get("query").split(/\s+/);out=M;C(K,function(N){if(!N){return;}N=I(N);out=out.replace(new RegExp(N,"g"),L.get("hiliteTpl").replace(/\{term\}/g,N));});return out;},next:function(){var K=this;return(K.get("visible")?K.selectNext():K.get("data")?K.show():K);},selectNext:function(){return this.set(E,this.get(E)+1);},selectPrevious:function(){return this.set(E,this.get(E)-1);},previous:function(){return this.get("visible")?this.selectPrevious():this;},item:function(K){return this.get("contentBox").one(this.get("itemSelector").replace(/\{n\}/g,I(K+1)));},click:function(M){var K=this,L=K.get("ac"),N=M.currentTarget.get("text");L.set(F,N);K[J]=-1;K._currentValue=N;L.get("host").focus();K.hide();}},{NAME:"ACWidget",ATTRS:{ac:{setter:function(K){if(!this[A]){return;}this.bindUI(K);},validator:function(K){return true;}},data:{validator:function(K){return K&&K.length>0;}},query:{value:""},listTpl:{value:"<ul>{list}</ul>"},itemTpl:{value:"<li>{hilite}</li>"},itemSelector:{value:"ul li:nth-child({n})"},hiliteTpl:{value:"<em>{term}</em>"}}});D.ATTRS[E]={value:-1,validator:function(K){var L=this.get("data");return L&&B.Lang.isNumber(K);},getter:function(){return this[J];},setter:function(M){var R=this,O=R.get(E),P=R.get("data"),K=P&&P.length,Q=R.get("ac"),L=this.getClassName("selected");if(isNaN(O)){O=-1;}if(!P||!K){return;}while(M<-1){M+=K+1;}M=(M+1)%(K+1)-1;O=(O+1)%(K+1)-1;R[J]=M;if(O===-1){R[G]=Q.get(F);}if(O===M){return;}var S=R.get("contentBox").one("."+L);if(S){S.removeClass(L);}if(M===-1){Q.set(F,this[G]);}else{var N=R.item(M);if(N){N.addClass(L);}Q.set(F,P[M]);}return M;}};function I(K){return(""+K).replace(/([\^\/.*+?|()[\]{}\\])/g,"\\$1");}function H(L,K){K.insert(L,"after");return;var M=K.get("parentNode");M.insertBefore(L,K);M.insertBefore(K,L);}},"@VERSION@",{requires:["widget","ac-plugin"]});