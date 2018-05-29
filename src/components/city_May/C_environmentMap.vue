<template>
	<div id="myChart"></div>
</template>

<script>
	import $ from 'jquery'
	import echarts from 'echarts';
	import 'echarts/map/js/china.js';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				isDispose:false,
		    	mapStatus:null,  //图表返回函数状态
		    	isFirst: true,
			}
		},
		computed: {
			...mapState(['contentSize','cityName','shenzhen','guangzhou','guangzhouData1','guangzhouData2','guangzhouData3','shenzhenData1','shenzhenData2','shenzhenData3']),
		},
		mounted(){
			//初始化时获取数据
			this.getData();
		},
		destroyed(){
			//页面跳转时销毁
		    this.isDispose = true;
			var _destroyMap = this.mapStatus;
			_destroyMap();
		},
		watch:{
			//页面变化时重绘
			contentSize:function(contentSize){
				var _resizeMap = this.mapStatus;
				setTimeout(function(){
					_resizeMap();
				},500)				
			}
		},
		methods: {
			getData(){
		 	this.$http({
				url:"../../../static/homepage.json",
				method:'get',
			}).then(function(res){
				//this.Text=res.body.finance.carData.costType;
			    
			    if(this.isFirst){
			    	//第一次获取数据进行实列化
			    	this.mapStatus = this.showProvince();
			    	this.isFirst = false;
			    }else{
			    	// 否则进行重绘
			    	var _resizeMap = this.mapStatus;
						_resizeMap();
			    }
				},function(error){
				//失败回调的函数								
				console.log(error);
					});						
			},
			showProvince() {
				var return_value;
				var refThis = this;
				var name = this.cityName;
			    var myChart = echarts.init(document.getElementById('myChart'));	
				if(this.cityName=='深圳'){
					 var uploadedDataURL = "../../../static/china-main-city/440300.json";
					 var geoCoordMap = this.shenzhen;
					  var data1 =this.shenzhenData1;
					  var data2 =this.shenzhenData2; 
					  var data3 =this.shenzhenData3; 
				}
//				else if(this.cityName=='广州'){
//					 var uploadedDataURL = "../../../static/china-main-city/440100.json";
//					 var geoCoordMap = this.guangzhou;
//					  var data1 =this.guangzhouData1;
//					  var data2 =this.guangzhouData2; 
//					  var data3 =this.guangzhouData3;
//				}
				else{
					//没有其他数据默认深圳
					 var uploadedDataURL = "../../../static/china-main-city/440300.json";
					 var geoCoordMap = this.shenzhen;
					  var data1 =this.shenzhenData1;
					  var data2 =this.shenzhenData2; 
					  var data3 =this.shenzhenData3;
				};			
				
				var convertData = function(data) {
					var res = [];
					for(var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];
						if(geoCoord) {
							res.push({
								name: data[i].name,
								value: geoCoord.concat(data[i].value)
							});
						}
					}
					return res;
				};
			    		
			    $.ajax({
			        url: uploadedDataURL,
			        async: false,//改为同步方式
			        type: "get",
			    	success: function(geoJson1) {			
			        echarts.registerMap(name, geoJson1);			
			         var option1 = {
			         	backgroundColor: '',
			         	color: ['#00BFFF','#FF4500','#00FF00','#90EE90','#DC143C'],
					    legend: {          //标题组件参数配置（左边，大小，颜色等）
					    	type: 'scroll',
					    	orient: 'vertical',   //垂直
					        bottom: '80',      
					        x:'80',
					        icon: 'rect',
					        data:['环境工作完成率','生活水质评分','泳池水质评分','景观水质评分','空气质量评分'],
					        textStyle: {
					            color: '#fff'
					        },
							selectedMode: 'single',   //单选模式
					    },
					    tooltip: {          //鼠标移上去时提示信息
					    	show:false,
					        trigger: 'item',					        
					        formatter: function (params) {
					            return params.name + ' : ' + params.value[2];
					        }
					    },
					    geo: {
					        map: name,
					        label: {
					        	normal: {
					        		show: true,
					        		textStyle: {
										color: '#fff'
										}
					        	},
					            emphasis: {
					                show: false
					            }
					        },
					        roam: true,
					        itemStyle: {
					            normal: {
					                areaColor: 'rgba(31,37,75,0.5)',
					                borderColor: 'rgba(255,255,255,1)'
					            },
					            emphasis: {
					                areaColor: ''
					            }
					        }
					    },
					    series: [{
					            name: '环境工作完成率',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data1),    //数据接入
					            symbolSize: 10,
					            label: {
					                normal: {
					                    formatter: '{b}',      
					                    position: 'right',
					                    show: true
					                },
					                emphasis: {
					                    show: false
					                }
					            },				            
					            itemStyle: {
					                emphasis: {
					                    borderColor: '#fff',
					                    borderWidth: 1
					                }
					            }
					        },
					        {
					            name: '生活水质评分',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data2),    //数据接入
					            symbolSize: 10,
					            label: {
					                normal: {
					                    formatter: '{b}',      
					                    position: 'right',
					                    show: true
					                },
					                emphasis: {
					                    show: false
					                }
					            },				            
					            itemStyle: {
					                emphasis: {
					                    borderColor: '#fff',
					                    borderWidth: 1
					                }
					            }
					        },
					        {
					            name: '泳池水质评分',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data3),    //数据接入
					            symbolSize: 10,
					            label: {
					                normal: {
					                    formatter: '{b}',      
					                    position: 'right',
					                    show: true
					                },
					                emphasis: {
					                    show: false
					                }
					            },				            
					            itemStyle: {
					                emphasis: {
					                    borderColor: '#fff',
					                    borderWidth: 1
					                }
					            }
					        },
					        {
					            name: '景观水质评分',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data1),    //数据接入
					            symbolSize: 10,
					            label: {
					                normal: {
					                    formatter: '{b}',      
					                    position: 'right',
					                    show: true
					                },
					                emphasis: {
					                    show: false
					                }
					            },				            
					            itemStyle: {
					                emphasis: {
					                    borderColor: '#fff',
					                    borderWidth: 1
					                }
					            }
					        },
					        {
					            name: '空气质量评分',
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data3),    //数据接入
					            symbolSize: 10,
					            label: {
					                normal: {
					                    formatter: '{b}',      
					                    position: 'right',
					                    show: true
					                },
					                emphasis: {
					                    show: false
					                }
					            },				            
					            itemStyle: {
					                emphasis: {
					                    borderColor: '#fff',
					                    borderWidth: 1
					                }
					            }
					        },
					    	{                  //前十带闪的------------------------------------------------------------
					        name: '环境工作完成率',
					        type: 'effectScatter',
					        coordinateSystem: 'geo',
					        zlevel: 2,
					        rippleEffect: {
					            brushType: 'stroke',
					            period:7,
					            scale:6       //扩散圈的大小
					        },
					        symbolSize: 10,
					        showEffectOn: 'render',
					        data:convertData(data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
					    },
					    {                  //前十带闪的------------------------------------------------------------
					        name: '生活水质评分',
					        type: 'effectScatter',
					        coordinateSystem: 'geo',
					        zlevel: 2,
					        rippleEffect: {
					            brushType: 'stroke',
					            period:7,
					            scale:6       //扩散圈的大小
					        },
					        symbolSize: 10,
					        showEffectOn: 'render',
					        data:convertData(data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
					    },
					    {                  //前十带闪的------------------------------------------------------------
					        name: '泳池水质评分',
					        type: 'effectScatter',
					        coordinateSystem: 'geo',
					        zlevel: 2,
					        rippleEffect: {
					            brushType: 'stroke',
					            period:7,
					            scale:6       //扩散圈的大小
					        },
					        symbolSize: 10,
					        showEffectOn: 'render',
					        data:convertData(data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
					    },
					    {                  //前十带闪的------------------------------------------------------------
					        name: '景观水质评分',
					        type: 'effectScatter',
					        coordinateSystem: 'geo',
					        zlevel: 2,
					        rippleEffect: {
					            brushType: 'stroke',
					            period:7,
					            scale:6       //扩散圈的大小
					        },
					        symbolSize: 10,
					        showEffectOn: 'render',
					        data:convertData(data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
					    },
					    {                  //前十带闪的------------------------------------------------------------
					        name: '空气质量评分',
					        type: 'effectScatter',
					        coordinateSystem: 'geo',
					        zlevel: 2,
					        rippleEffect: {
					            brushType: 'stroke',
					            period:7,
					            scale:6       //扩散圈的大小
					        },
					        symbolSize: 10,
					        showEffectOn: 'render',
					        data:convertData(data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
					    }]
			        }			        
			      myChart.setOption(option1);
			      function disposeMap() { //销毁函数作为返回值返出去
						if(refThis.isDispose){
							myChart.dispose();	
						}else{
							myChart.resize();
						}
					}			        
			        return_value= disposeMap;
			    }			    
			});    
			return return_value; 
			}
		},
	}
</script>


<style lang="scss" scoped>
#myChart{
	flex: 2.2;
	height: 8.1rem;
	display: inline-block;
}
</style>