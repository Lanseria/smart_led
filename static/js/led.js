
   /*
   1:配置基本的服务器地址信息
   2:将页面接受到的参数，转换为json对象，已备后面使用
   3:根据传递过来的参数，初始化页面的相关图片内容，
   4:根据用户的操作（灯的开，关；灯的变色（调亮度））发起ajax请求
     (
    		 具体的规则如下：
    		 1: 灯可以开，可以关。
    		 2: 调色的前提是必须要在灯是打开的状态下进行
    		 3: 灯打开的时候，默认显示 红色
    		 4: 在 灯打开的情况下（无论什么颜色）再次点击开关，就是关闭
     )
   */
   
   //第一步：由java中的变量，转换为javascript中的变量
    var basePath = "http://192.168.43.236:8080/HelloWeb/"; // 获取服务器地址
    //第二步 json对象   
    var deviceObj = '{"lampG":170,"lampR":231,"lampB":170,"lampState":"0","name":"test110","online":"1","id":2}';// 获取从上一个servlet中传递过来的值 
    var deviceJson = eval('(' + deviceObj + ')'); // 将javascript的字符串转换为javascript的 对象 （json）

	console.log(deviceObj);
	console.log(deviceJson);
	
	//第三步初始化页面
	var flip = 0;
	var colorflag = 0;
	$(document).ready(formInit()); //页面初始化动作，当页面加载后，立马执行
	function formInit(){
		var lr = deviceJson.lampR;
    	var lg = deviceJson.lampG;
    	var lb = deviceJson.lampB;
    	if(deviceJson.lampState ==false){  // 灯关
    		lightInit();
    	}
    	else if(lr==231 && lg==170 && lb==170){ //red
    		lightInit();
    		$(".light-switch").attr("src","images/l-red.png");
            $(".light-btm-switch").attr("src","images/switch-red.png");
            $(".li-red").attr("src","images/on-red.png");
            colorflag=1;
            flip=1;
    	}
    	else if(lr==255 && lg==186 && lb==0){ //yellow
    		lightInit();
    		$(".light-switch").attr("src","images/l-yellow.png");
            $(".light-btm-switch").attr("src","images/switch-yellow.png");
            $(".li-yellow").attr("src","images/on-yellow.png");
            colorflag=2;
            flip=1;
    	}
    	else if(lr==60 && lg==182 && lb==245){ //blue
    		lightInit();
    		$(".light-switch").attr("src","images/l-blue.png");
            $(".light-btm-switch").attr("src","images/switch-blue.png");
            $(".li-blue").attr("src","images/on-blue.png");
            colorflag=3;
            flip=1;
    	}
    	else if(lr==56 && lg==193 && lb==43){ //green
    		lightInit();
    		$(".light-switch").attr("src","images/l-green.png");
            $(".light-btm-switch").attr("src","images/switch-green.png");
            $(".li-green").attr("src","images/on-green.png");
            colorflag=4;
            flip=1;
    	}
    	else if(lr==250 && lg==40 && lb==181){ //purple
    		lightInit();
    		$(".light-switch").attr("src","images/l-purple.png");
            $(".light-btm-switch").attr("src","images/switch-purple.png");
            $(".li-purple").attr("src","images/on-purple.png");
            colorflag=5;
            flip=1;
    	}
	}
    function lightInit(){
    	$('.li-red').attr("src","images/off-red.png");
		$('.li-yellow').attr("src","images/off-yellow.png");
		$('.li-blue').attr("src","images/off-blue.png");
		$('.li-green').attr("src","images/off-green.png");
		$('.li-purple').attr("src","images/off-purple.png");
		
        $(".light-switch").attr("src","images/l-close.png");
        $(".light-btm-switch").attr("src","images/switch-close.png");
        flip=0;
    }
	
	/* 
	GET http://localhost:8080/ChangeLightServletWeb?para=id=3&switchLight=on&lampR=200&lampG=32&lampB=76&switchTemp=on&_=1490238068605 404 (Not Found)
	因为没有做项目名称的匹配
	两种方式解决：
	A: 使用 之前已经获取的临时变量 basePath来拼接 basePath+"/ChangeLightServletWeb"
    B: 使用jstl url标签 /HelloWeb/ChangeLightServletWeb
		
	*/
	//var url = "/ChangeLightServletWeb";
	
	var url = basePath+"/ChangeLightServletWeb";
	
	if($(".light-btm-switch").attr("src")!="images/switch-close.png"){
		//
		deviceJson.switchLight = "on";

	}
	
	function formget(){
		//绑定发起后台请求的
		var data = "id="+deviceJson.id+"&name="+deviceJson.name+"&switchLight="+deviceJson.switchLight
	   +"&lampR="+deviceJson.lampR+"&lampG="+deviceJson.lampG+"&lampB="+deviceJson.lampB
	   +"&switchTemp="+deviceJson.switchTemp;
		$.ajax({
		    type: "get",
		    url: url,
		    data: "para="+data,  
		//  data: {"para":1},此处data可以为 a=1&b=2类型的字符串 或 json数据。
		    cache: false,
		    async : true,
		    dataType: "json"
		    //,
		    /* success: function (data ,textStatus, jqXHR)
		    {
		        if("true"==data.flag){
		           alert("合法！");
		            return true;
		        }else{
		            alert("不合法！错误信息如下："+data.errorMsg);
		            return false;
		        }
		    },
		    error:function (XMLHttpRequest, textStatus, errorThrown) {      
		        alert("请求失败！");
		    } */
		 });
	}
	
   
    function  lighttoggle() {
    	
    	deviceJson.switchTemp = "off"; //模拟灯调节亮度
    	console.log("colorflag"+colorflag);
    	// 包含close，说明灯是关闭状态
    	if($(".light-switch").attr("src").indexOf("close")>=0){
    		 $(".light-switch").attr("src","images/l-red.png");
             $(".light-btm-switch").attr("src","images/switch-red.png");
             $(".li-red").attr("src","images/on-red.png");
             deviceJson.switchLight = "on";
             flip=1;
           	 console.log(flip);
           	 // 发起ajax get方式请求，更新数据。
             formget();
    	}
    	else{
    		lightInit();
            deviceJson.switchLight = "off";
          	
          	// 发起ajax get方式请求，更新数据。
            formget();
    	}
    	/* if (flip++ % 2 === 0){
          $(".light-switch").attr("src","images/l-red.png");
          $(".light-btm-switch").attr("src","images/switch-red.png");
          $(".li-red").attr("src","images/on-red.png");
          deviceJson.switchLight = "on";
        	console.log(flip);
        	 // 发起ajax get方式请求，更新数据。
            formget();
        }else{
          $(".light-switch").attr("src","images/l-close.png");
          $(".light-btm-switch").attr("src","images/switch-close.png");
          $(".li-red").attr("src","images/off-red.png");
          deviceJson.switchLight = "off";
        	console.log(flip);
        	
        	 // 发起ajax get方式请求，更新数据。
            formget();
        } */
    }
    
    /*灯的颜色切换*/
    $(function(){
    	$('.color-ul li img').click(function(){
    		if(flip==0){
    			alert("灯必须是打开的情况下，才可以调色彩！请先开灯！");
    			return; //
    		}
    		deviceJson.switchTemp = "on";
    		
            if($(this).attr("src")=="images/off-red.png" || $(this).attr("src")=="images/on-red.png") {// red
            	if($(this).attr("src")=="images/off-red.png"){
            		$(this).attr("src","images/on-red.png");
            		$('.li-yellow').attr("src","images/off-yellow.png");
            		$('.li-blue').attr("src","images/off-blue.png");
            		$('.li-green').attr("src","images/off-green.png");
            		$('.li-purple').attr("src","images/off-purple.png");
            		
            		colorflag = 1;// 标记为红灯
            		
            		deviceJson.switchLight = "on";
            		deviceJson.lampR = 231;
            		deviceJson.lampG = 170;
            		deviceJson.lampB = 170;
            		//灯本身的颜色
            		$(".light-switch").attr("src","images/l-red.png");
                    $(".light-btm-switch").attr("src","images/switch-red.png");
                    
                    // 发起ajax get方式请求，更新数据。
                    formget();
            	}
            }
            if($(this).attr("src")=="images/off-yellow.png" || $(this).attr("src")=="images/on-yellow.png") {// yellow
            	if($(this).attr("src")=="images/off-yellow.png"){
            		$('.li-red').attr("src","images/off-red.png");
            		$(this).attr("src","images/on-yellow.png");
            		$('.li-blue').attr("src","images/off-blue.png");
            		$('.li-green').attr("src","images/off-green.png");
            		$('.li-purple').attr("src","images/off-purple.png");
            		
            		colorflag = 2;// 标记为黄色
            		deviceJson.switchLight = "on";
            		deviceJson.lampR = 255;
            		deviceJson.lampG = 186;
            		deviceJson.lampB = 0;
            		
            		
            		//灯本身的颜色
            		$(".light-switch").attr("src","images/l-yellow.png");
                    $(".light-btm-switch").attr("src","images/switch-yellow.png");
                    
                    // 发起ajax get方式请求，更新数据。
                    formget();
            	}
            }
            if($(this).attr("src")=="images/off-blue.png" || $(this).attr("src")=="images/on-blue.png") {// blue
            	if($(this).attr("src")=="images/off-blue.png"){
            		$('.li-red').attr("src","images/off-red.png");
            		$('.li-yellow').attr("src","images/off-yellow.png");
            		$(this).attr("src","images/on-blue.png");
            		$('.li-green').attr("src","images/off-green.png");
            		$('.li-purple').attr("src","images/off-purple.png");
            		
            		colorflag = 3;// 标记为蓝色
            		deviceJson.switchLight = "on";
            		deviceJson.lampR = 60;
            		deviceJson.lampG = 182;
            		deviceJson.lampB = 245;
            		//灯本身的颜色
            		$(".light-switch").attr("src","images/l-blue.png");
                    $(".light-btm-switch").attr("src","images/switch-blue.png");
                    
                    // 发起ajax get方式请求，更新数据。
                    formget();
            	}
            }
            if($(this).attr("src")=="images/off-green.png" || $(this).attr("src")=="images/on-green.png") {// blue
            	if($(this).attr("src")=="images/off-green.png"){
            		$('.li-red').attr("src","images/off-red.png");
            		$('.li-yellow').attr("src","images/off-yellow.png");
            		$('.li-blue').attr("src","images/off-blue.png");
            		$(this).attr("src","images/on-green.png");
            		$('.li-purple').attr("src","images/off-purple.png");
            		
            		colorflag = 4;// 标记为绿色
            		deviceJson.switchLight = "on";
            		deviceJson.lampR = 56;
            		deviceJson.lampG = 193;
            		deviceJson.lampB = 43;
            		//灯本身的颜色
            		$(".light-switch").attr("src","images/l-green.png");
                    $(".light-btm-switch").attr("src","images/switch-green.png");
                    
                    // 发起ajax get方式请求，更新数据。
                    for…