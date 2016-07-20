window.onload=function(){
	var oText=document.getElementById('text');
	var oTxt=document.getElementById('text2');
	var oImg=document.getElementById('img');
	function getChoseContent(){
		if(document.selection){
			return document.selection.createRange().text();
		}else{
			return document.getSelection().toString();
		}
	};
	oText.onmouseup=function(eve){
		var oEvent=eve||window.event;
		if(getChoseContent().length>=10){
			oImg.style.display='block';
			oImg.style.top=oEvent.clientY+'px';
			oImg.style.left=oEvent.clientX+'px';
		}else{
			oImg.style.display='none';
		}
		
	};
	oText.onclick=function(eve){//阻止冒泡
		var oEvent=eve||event;
		oEvent.cancelBubble=true;
	};

	document.onclick=function(){
		oImg.style.display='none';
	};
	oImg.onclick=function(){
		window.location.href="file:///E:/%E8%94%A1%E9%9B%85%E7%8E%B2/%E5%89%8D%E7%AB%AF/JS%E5%AE%9E%E6%88%98%E6%95%88%E6%9E%9C/%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86/%E9%80%89%E4%B8%AD%E6%96%87%E5%AD%97%E5%88%86%E4%BA%AB/%E5%88%86%E4%BA%AB%E6%A1%86.html"
		oTxt.innerHTML=getChoseContent();
	};
}