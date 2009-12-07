YUI.add("ac-plugin",function(C){function E(){E.superclass.constructor.apply(this,arguments);}var B="autocomplete",K=C.Lang,D=C.Array.each,F={query:function(P){var L=this,O=L.get("dataSource"),N=P.value,M=C.bind(G,L);if(O){O.sendRequest({request:L.get("queryTemplate")(N),callback:{success:M,failure:M}});}}};C.Plugin.ACPlugin=C.extend(E,C.Plugin.Base,{initializer:function(){var L=this,M=L.get("host");I(L,M);var N=F;D(["query","load","show","hide","next","previous"],function(O){L.publish("ac:"+O,{broadcast:1,bubbles:1,context:L,preventable:true,defaultFn:N[O]||null,prefix:"ac"});},L);J(M);},destructor:function(){C.detach(C.stamp(this)+"|");},open:function(){this.fire("ac:show");},next:function(L){L.preventDefault();this.fire("ac:next");},previous:function(L){L.preventDefault();this.fire("ac:previous");},close:function(){this.fire("ac:hide");}},{NAME:"ACPlugin",NS:"ac",ATTRS:{queryValue:{getter:function(){return this.get("host").get("value");},setter:function(L){this.get("host").set("value",L);return(this._cachedValue=L);}},dataSource:{validator:function(L){return L&&K.isFunction(L.sendRequest);}},minQueryLength:{value:3,validator:K.isNumber},queryTemplate:{value:encodeURIComponent,setter:function(L){return(K.isFunction(L)?L:function(M){return L.replace(/(^|[^\\])((\\{2})*)\{query\}/,"$1$2"+encodeURIComponent(M)).replace(/(^|[^\\])((\\{2})*)\\(\{query\})/,"$1$2$4");});}}}});function I(L,N){var M=C.stamp(this)+"|";C.on(M+"valueChange",H,N,L);C.on(M+"key",L.next,N,"down:40",L);C.on(M+"key",L.previous,N,"down:38",L);C.on(M+"key",L.close,N,"down:27",L);}function H(M){var L=M.value;if(!L){return this.close();}if(L===this._cachedValue||L.length<this.get("minQueryLength")){return;}this._cachedValue=L;this.fire("ac:query",{value:M.value});}function A(L){return function(){if(L){L.setAttribute(B,"on");}L=null;};}function J(L){var N=C.Node.getDOMNode(L),O=N.getAttribute(B);if((O&&O!=="off")||O===null||O===undefined){var M=A(N);C.on("beforeunload",M,window);C.on("unload",M,window);}N.setAttribute(B,"off");}function G(M){var L=(M&&M.response&&M.response.results)?M.response.results:M;if(L&&!(L&&("length" in L)&&L.length===0)){this.fire("ac:load",{results:L,query:this.get("queryValue")});}}},"@VERSION@",{requires:["node","plugin","value-change","event-key"],optional:["event-custom"]});