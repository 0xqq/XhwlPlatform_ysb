<template>
    <div id="XSDFXPage" class="XSDFXPage"></div>
</template>
<script>
    export default {
    	 data () {
            return {
				a:0,
				arr: null,
				interval: null,
            }
        },
        mounted() {
            // 创建Map实例
            var map = new BMap.Map("XSDFXPage",{enableMapClick:true,minZoom:4,maxZoom:50});
            // 初始化地图,设置中心点坐标和地图级别
            map.centerAndZoom(new BMap.Point(114.058567,22.539266), 50);
            // 添加地图类型控件
            map.addControl(new BMap.MapTypeControl());  
            // 设置地图显示的城市 此项是必须设置的
            map.setCurrentCity("深圳");    
            // 开启鼠标滚轮缩放      
            map.enableScrollWheelZoom(true);
            
                var num=[
                        {"x":"113.954562","y":"22.596964"},
                        {"x":"113.974562","y":"24.586964"},
                        {"x":"113.964562","y":"22.576964"},
                        {"x":"113.944562","y":"22.566964"},
                        {"x":"113.984562","y":"22.556964"},
                        {"x":"113.924562","y":"22.546964"},
                        {"x":"113.914562","y":"22.536964"},
                        {"x":"113.994562","y":"22.526964"},
                        {"x":"113.904562","y":"22.516964"}
                ];
                for(var i = 0;i<num.length;i++){
                    var  a=num[i].x
                    var  b=num[i].y
                    var point = new BMap.Point(a,b);
                    var gc = new BMap.Geocoder();
                    gc.getLocation(point, function(rs){
	                    var addComp = rs.addressComponents;
	                    console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
	                    map.clearOverlays(); 
						var new_point = new BMap.Point(a,b);
						var marker = new BMap.Marker(new_point);  //创建标注
						map.addOverlay(marker);               //将标注添加到地图中
						map.panTo(new_point);
						point[i] = new window.BMap.Point(a, b); //循环生成新的地图点
	                    marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
	                    map.addOverlay(marker[i]);
	                    marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		                var label = new BMap.Label(addComp.street, { offset: new BMap.Size(30, -10) });
		                 marker.setLabel(label);
		                  label.setStyle({
                            color: "White",
                            fontSize: "14px",
                            backgroundColor: "#5CACEE",
                            border: "0"
                        });
                        //创建信息窗口
                        var opts = {
                            width: 400,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                            title: "<strong style=\"font-size:16px;font-weight:bold\">" + addComp.street + "</strong>", // 信息窗口标题
                            enableMessage: true, //设置允许信息窗发送短息
                            message: ""
                        }
                         var showInfo =  "地址：" + addComp.district
						 marker.addEventListener("click",function(){  
			                   map.openInfoWindow(infoWindow,point);//打开信息窗口  
			            }); 
			             map.addOverlay(marker);
	                  // console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    });
                }
                this.arr = num.length
				var _this=this
				//一秒一条直线
			this.interval=setInterval(function(){
					 _this.a=_this.a+1
					var pointlh= new BMap.Point(num[_this.a-1].x,num[_this.a-1].y);
					var pointls= new BMap.Point(num[_this.a].x,num[_this.a].y);
	              	var polyline = new BMap.Polyline([pointlh,pointls],{strokeColor:"red",strokeWeight:5,strokeOpacity:0.5});
	              	map.addOverlay(polyline);
	        },1000)
         },
        watch:{
            a:function(){
                if (this.a> this.arr-2) {
                    clearInterval(this.interval);
                }
            }	
      	}
    }
</script>

<style scoped>
    html,body,.XSDFXPage{
    width: 100%;
    height: 4.32rem;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
}

</style>