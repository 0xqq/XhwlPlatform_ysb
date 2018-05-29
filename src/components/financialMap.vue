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
			contentSize:function(contentSize){
				var _resizeMap = this.mapStatus;
				setTimeout(function(){
					_resizeMap();
				},500)				
			},
			year:function(){
				for(var i=0;i<this.content.length;i++){
					var finalDate= new Date(this.content[i].日期);
			    	var year = finalDate.getFullYear();
			    	var month = finalDate.getMonth()+1;
			    	var timeNow =  year+'-'+month;
			    	if(timeNow==this.year){
			    		var num1 = this.content[i].停车场应收前十;
						var num2 = this.content[i].停车场实收前十;
						var num3 = this.content[i].停车场收缴率前十;
						for(var i=0;i<num1.length;i++){
							this.data1[i]={name:num1[i].城市,value:num1[i].数值.substring(0,4)};
							this.data2[i]={name:num2[i].城市,value:num2[i].数值.substring(0,4)};
							this.data3[i]={name:num3[i].城市,value:num3[i].数值.substring(0,5)};
							this.isFirst = false;
						}			    		
			    	}				
				};
				this.drawLine();
			}
		},

		methods: {
			getData(){
		 	this.$http({
				url:this.mnUrl+"/tmp/finance/overview",
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
			    		var num1 = value[i].停车场应收前十;
						var num2 = value[i].停车场实收前十;
						var num3 = value[i].停车场收缴率前十;
						for(var i=0;i<num1.length;i++){
							this.data1[i]={name:num1[i].城市,value:num1[i].数值.substring(0,4)};
							this.data2[i]={name:num2[i].城市,value:num2[i].数值.substring(0,4)};
							this.data3[i]={name:num3[i].城市,value:num3[i].数值.substring(0,5)};
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
				//myChart.showLoading();
			var	option1 = {
					backgroundColor:'',  //容器背景颜色
				    tooltip: {
				        trigger: 'item',
				        formatter: function (params) {
				            return params.name + ' : ' + params.value[2];
				        }
				    },
				    color: ['#00BFFF','#87CEFA','#FF4500'],			    
				    legend: {          //标题组件参数配置（左边，大小，颜色等）
				    	type: 'scroll',
				    	orient: 'vertical',   //垂直
				        bottom: '80',      
				        x:'80',
				        icon: 'rect',
				        data: ['停车场应收总额','停车场实收总额','停车场缴费率'],
				        textStyle: {
				            color: '#fff'
				        },
						selectedMode: 'single',   //单选模式
				    },
				    geo: {
				        map: 'china',
				        roam: true,    //地图可缩放
				        label: {
				            emphasis: {
				                show: false
				            }
				        },
				        zoom: 1.15,  //地图的缩放比例
				        itemStyle: {
							normal: {
								areaColor: 'rgba(31,37,75,0.5)',   //地图背景颜色
								borderColor: 'rgba(255,255,255,1)'    //线体颜色
							},
							emphasis: {
								areaColor: '#2fadef'
							}
						}
				    },
				    series: [
				        {
				            name: '停车场应收总额',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data:convertData(refThis.data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),				            
//				            data: convertData(refThis.data1.sort(function (a, b) {
//				                return b.value - a.value;
//				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 1.6;        
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
				            name: '停车场实收总额',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 1.6;        
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
				            name: '停车场缴费率',
				             type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data:convertData(refThis.data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 6;        
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
				        }
				    ]
				};
				myChart.setOption(option1);
				function disposeMap() { //销毁函数作为返回值返出去
						if(refThis.isDispose){
							myChart.dispose();
						}else{
							myChart.setOption(option1);
							myChart.resize();							
						}
					}
					return disposeMap;
			},
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