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
		// 取当前属性值
		if(attr=='opacity'){
			iCur=parseFloat(getStyle(obj,attr))*100;
		}else{
			iCur=parseInt(getStyle(obj,attr));
		}
		// 计算速度
		var iSpeed=(target-iCur)/10;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		// 检测运动停止
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
		var iStop=true;/*射每个属性运动都到达目标点*/
		for(attr in json){
			if(attr=='opacity'){
				iCur=parseFloat(getStyle(obj,attr))*100;
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			var iSpeed=(json[attr]-iCur)/10;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur!=json[attr]){
				iStop=false;/*只要是有一个属性没有达到目标点就为false，不能关掉定时器*/
			}
			if(attr=='opacity'){
				obj.style.fitler='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
			
		}
		// 当所有属性都到达目标点，iStop为true，关掉定时器
		if(iStop){
			clearInterval(obj.timer);
			fn&&fn();
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