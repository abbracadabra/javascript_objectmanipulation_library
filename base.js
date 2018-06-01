var $0={};

$0.override=function(to,from){
	if(typeof from!="object" || typeof to!="object"){
			throw("parameter type mismatch");
	}
	for(var t in from){
		to[t]=from[t];
	}
}

$0.override($0,{
	extend:function(superclass,proto){
		if(typeof superclass!="function" || typeof proto!="object"){
			throw("parameter type mismatch");
		}
		var oc = Object.prototype.constructor;
		var constrctor;
		if(proto.constructor!=oc){
			constrctor=proto.constructor;
		}else{
			constrctor=function(){};
		}
		constrctor.superclass=superclass;
		proto.__proto__=superclass.prototype;
		constrctor.prototype=proto;
		return constrctor;
	},
	namespace:function(var namespacepath){
		if(typeof namespacepath!="string"){
			throw("parameter type mismatch");
		}
		var reg=/^\.|\.$| /;
		if(namespacepath.match(reg)!=null){
			throw("illegal namespacepath");
		}
		namespacepath=namespacepath.replace('/ /g','');
		var _path=namespacepath.split('.');
		var current=window;
		for(var i=0;i<_path.length;i++){
			if(current[_path[i]]==undefined){
				current[_path[i]]={};
				current=current[_path[i]];
			}else if(typeof current[_path[i]]=="object"){
				current=current[_path[i]];
				continue;
			}else{
				throw("namespace already occupied");
			}
		}
		return current;
	}
});
