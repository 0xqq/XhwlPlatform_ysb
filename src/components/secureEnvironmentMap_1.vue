<template>
	<div id="myChart"></div>	
</template>
<script>
	import echarts from 'echarts';
	import 'echarts/map/js/china.js';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				isDispose:false,
		    	mapStatus:null,  //图表返回函数状态
		    	isFirst: true,
		    	content:null,
		    	data1:[{name:'',value:''}],
		    	data2:[{name:'',value:''}],
		    	data3:[{name:'',value:''}],
		    	data4:[{name:'',value:''}],
		    	data5:[{name:'',value:''}],
			}
		},
		props:['year'],
		mounted() {
			//初始化时获取数据
			this.getData();
		},
		computed:{
        	...mapState(['contentSize','geoCoordMap','mnUrl']),
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
				},800)				
		    },
		    year:function(){
		    	for(var i=0;i<this.content.length;i++){
					var finalDate= new Date(this.content[i].日期);
			    	var year = finalDate.getFullYear();
			    	var month = finalDate.getMonth()+1;
			    	var timeNow =  year+'-'+month;
			    	if(timeNow==this.year){
			    		var num1 = this.content[i].安防报警数前十;
						var num2 = this.content[i].消防报警数前十;
						var num3 = this.content[i].视频报警数前十;
						var num4 = this.content[i].周界防范数前十;
						var num5 = this.content[i].人员报警数前十;
						for(var i=0;i<num1.length;i++){
							this.data1[i]={name:num1[i].城市,value:num1[i].数值};
							this.data2[i]={name:num2[i].城市,value:num2[i].数值};
							this.data3[i]={name:num3[i].城市,value:num3[i].数值};
							this.data4[i]={name:num4[i].城市,value:num4[i].数值};
							this.data5[i]={name:num5[i].城市,value:num5[i].数值};
						}			    		
			    	}
			    	this.drawLine();
				}
		    }
		},
		methods: {
			getData(){
		 	this.$http({
				url:this.mnUrl+"/tmp/safe/overview",
				method:'get',
			}).then(function(res){
				this.content=res.body.content
				var value = res.body.content;
				for(var i=0;i<value.length;i++){
					var finalDate= new Date(value[i].日期);
			    	var year = finalDate.getFullYear();
			    	var month = finalDate.getMonth()+1;
			    	var timeNow =  year+'-'+month;
			    	if(timeNow==this.year){
			    		var num1 = value[i].安防报警数前十;
						var num2 = value[i].消防报警数前十;
						var num3 = value[i].视频报警数前十;
						var num4 = value[i].周界防范数前十;
						var num5 = value[i].人员报警数前十;
						for(var i=0;i<num1.length;i++){
							this.data1[i]={name:num1[i].城市,value:num1[i].数值};
							this.data2[i]={name:num2[i].城市,value:num2[i].数值};
							this.data3[i]={name:num3[i].城市,value:num3[i].数值};
							this.data4[i]={name:num4[i].城市,value:num4[i].数值};
							this.data5[i]={name:num5[i].城市,value:num5[i].数值};
						}			    		
			    	}				
				};
				if(this.isFirst){
				    	//第一次获取数据进行实列化
				    	this.mapStatus = this.drawLine();
				    	this.isFirst = false;
			    }else{
			    	// 否则进行重绘
			    	var _resizeMap = this.mapStatus;
						_resizeMap();
			    }	
				},function(error){
					//失败回调的函数								
					alert(error)
						});						
			},
			drawLine() {
				var  refThis = this;
				var myChart = echarts.init(document.getElementById('myChart'));
				var geoCoordMap = this.geoCoordMap;
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
			var	option = {
					backgroundColor:'',  //容器背景颜色
				    tooltip: {
				        trigger: 'item',
				        formatter: function (params) {
				            return params.name + ' : ' + params.value[2];
				        }
				    },
				    legend: {          //标题组件参数配置（左边，大小，颜色等）
				    	orient: 'vertical',   //垂直
				        bottom: '80',      
				        x:'80',
				        icon: 'rect',
				        data:['安防报警数','消防报警数','视频报警数','周边防范报警数','人员报警数',],
				        textStyle: {
				            color: '#fff'
				        },
						selectedMode: 'single',   //单选模式
				    },
				    color: ['#00BFFF','#FF4500','#87CEFA','#90EE90','#ADFF2F'],
				    geo: {
				        map: 'china',
				        roam: true,    //地图可缩放
				        zoom: 1.15,    //地图视图比例
				        label: {
				            emphasis: {
				                show: false
				            }
				        },
				      itemStyle: {
							normal: {
								areaColor: 'rgba(31,37,75,0.5)',   //地图背景颜色
								borderColor: 'rgba(255,255,255,1)'    //线体颜色
							},
							emphasis: {
								areaColor: '#2fadef'   //鼠标悬停颜色
							}
						}
				    },
				    series: [
				        {
				            name: '安防报警数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.8;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      
				                    position: 'right',
				                    show: true,
				                    color: '#f4e925',
				                    fontSize: 15,
				                },
				                emphasis: {
				                    show: false
				                }
				            },				            
				            itemStyle: {
				                emphasis: {
				                    borderColor: '#f4e925',
				                    borderWidth: 1
				                }
				            }
				        },
				        {
				            name: '消防报警数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.4;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      
				                    position: 'right',
				                    show: true,
				                    color: '#f4e925',
				                    fontSize: 15,
				                },
				                emphasis: {
				                    show: false
				                }
				            },				            
				            itemStyle: {
				                emphasis: {
				                    borderColor: '#f4e925',
				                    borderWidth: 1
				                }
				            }
				        },
				        {
				            name: '视频报警数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.4;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      
				                    position: 'right',
				                    show: true,
				                    color: '#f4e925',
				                    fontSize: 15,
				                },
				                emphasis: {
				                    show: false
				                }
				            },				            
				            itemStyle: {
				                emphasis: {
				                    borderColor: '#f4e925',
				                    borderWidth: 1
				                }
				            }
				        },
				        {
				            name: '周边防范报警数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.4;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      
				                    position: 'right',
				                    show: true,
				                    color: '#f4e925',
				                    fontSize: 15,
				                },
				                emphasis: {
				                    show: false
				                }
				            },				            
				            itemStyle: {
				                emphasis: {
				                    borderColor: '#f4e925',
				                    borderWidth: 1
				                }
				            }
				        },
				        {
				            name: '人员报警数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.4;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      
				                    position: 'right',
				                    show: true,
				                    color: '#f4e925',
				                    fontSize: 15,
				                },
				                emphasis: {
				                    show: false
				                }
				            },				            
				            itemStyle: {
				                emphasis: {
				                    borderColor: '#f4e925',
				                    borderWidth: 1
				                }
				            }
				        },
				    ]
				};
				myChart.setOption(option);
				function disposeMap() { //销毁函数作为返回值返出去
						if(refThis.isDispose){
							myChart.dispose();
						}else{
							myChart.resize();
						}
					}
					return disposeMap;
			}
		}
	}
</script>

<style lang="scss" scoped>
#myChart{
	flex: 2.2;
	height: 8.1rem;
	display: inline-block;
}
</style>