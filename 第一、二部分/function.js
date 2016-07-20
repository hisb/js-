function getStyle(obj,attr){
	attr = obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	return attr;
}
function domove(obj,attr,dir,targer,endFn){
	clearInterval(obj.timer);
	dir = parseInt(getStyle(obj,attr)) < targer ? dir : -dir;
	obj.timer = setInterval(function(){
		var pos = parseInt(getStyle(obj,attr));
		var speed = pos + dir;
		if(speed > targer&&dir > 0||speed < targer&&dir < 0){
			speed = targer;
		}
		obj.style[attr] = speed + 'px';
		if(speed == targer){
			clearInterval(obj.timer);
			endFn&&endFn();
		}
		/*if(dir > 0){
			if(pos > targer){
			obj.style[attr] = targer + 'px';
			clearInterval(obj.timer);
			}else{
				obj.style[attr] = pos + dir +'px';
			}
		}else{
			if(pos < targer){
				obj.style[attr] = targer + 'px';
				clearInterval(obj.timer);
			}else{
				obj.style[attr] = pos + dir +'px';
			}
		}*/
		
	},30);
}
// 变化像素或者透明度
function startMove(obj,attr,target,fn){
	clearInterval(obj.timer);
	var iCur=0;
	obj.timer=setInterval(function(){
		if(attr=='opacity'){
			iCur=parseFloat(getStyle(obj,attr))*100;
		}else{
			iCur=parseInt(getStyle(obj,attr));
		}
		var iSpeed=(target-iCur)/10;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(iCur==target){
			clearInterval(obj.timer);
			fn&&fn();
		}else{
			if(attr=='opacity'){
				obj.style.fitler='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	},30);
};
// 带json的运动框架
function startMove2(obj,json,fn){
	clearInterval(obj.timer);
	var iCur=0;
	var attr='';
	obj.timer=setInterval(function(){
		for(attr in json){
			if(attr=='opacity'){
				iCur=parseFloat(getStyle(obj,attr))*100;
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			var iSpeed=(json[attr]-iCur)/10;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur==json[attr]){
				clearInterval(obj.timer);
				fn&&fn();
			}else{
				if(attr=='opacity'){
					obj.style.fitler='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}else{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
		}
	},30);
};
/*透明度的封装函数*/
function opa(obj,time){
			clearInterval(obj.timer1);
			var opa = getStyle(obj,'opacity');
			var size = 0.1;
			obj.timer1 = setInterval(function(){
				opa = opa - size;
				if(opa < 0){
					opa = 0;
				}
				//console.log(opa)
				obj.style.opacity = opa;
				obj.style.filter = 'alpha(opacity='+opa*100+')';
				if(opa == 0){
					clearInterval(obj.timer1);
					obj.style.display = 'none';
				}
			},time);
		};
function myAddEvent(obj,nEvent,fn){
	if(obj.attachEvent){/*IE下*/
		obj.attachEvent('on'+nEvent,fn);
	}else{
		obj.addEventListener(nEvent,fn,false);
	}
};
/*拖拽函数*/
function tuozhuai(id){
	var oDiv=document.getElementById(id);
	var disx=0;
	var disy=0;

	oDiv.onmousedown=function(ev){
		var oEvent=ev||event;
		disx=oEvent.clientX-oDiv.offsetLeft;
		disy=oEvent.clientY-oDiv.offsetTop;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var tb=oEvent.clientY-disy;
			var lr=oEvent.clientX-disx;
			if(lr<0) lr=0;
			else if(lr>document.documentElement.clientWidth-oDiv.offsetWidth) lr=document.documentElement.clientWidth-oDiv.offsetWidth;
			if(tb<0) tb=0;
			else if(tb>document.documentElement.clientHeight-oDiv.offsetHeight) tb=document.documentElement.clientHeight-oDiv.offsetHeight;
			oDiv.style.top=tb+'px';
			oDiv.style.left=lr+'px';
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
	};
};
function onMouseWheel(ev){
	var oEvent=ev||event;
	var bDown=true;/*判断滚动方向*/
	/*if(oEvent.wheelDelta){
		bDown=oEvent.wheelDelta<0?true:false;
	}else{
		bDown=oEvent.detail>0?true:false;
	}*/
	/*阻止默认行为，解决浏览器自带滚动条出现时时问题*/
	bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
	if(oEvent.preventDefault)/*FF下*/
		oEvent.preventDefault();/*用于该事件被绑定的情况下*/
	return false;/*IE下*/
}