<!-- 创建ajax对象 -->
function ajax(url,fnSucc,fnFaird){
	var oAjax=null;
	if(window.XMLHttpRequest){
		oAjax=new XMLHttpRequest();
	}else{
		oAjax=new ActiveXObject("Microsoft.XMLHttp");<!-- IE6 -->
	}

	<!-- 链接服务器 -->
	oAjax.open('GET',url,true);
	<!-- 发送请求 -->
	oAjax.send();
	<!-- 接收返回 -->
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState<!-- 请求状态 -->==4){
			if(oAjax.status==200<!-- 请求结果 -->)
				fnSucc(oAjax.responseText);
			else 
				fnFaird();
		}
	};
};
