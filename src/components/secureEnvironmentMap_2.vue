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
		    	data6:[{name:'',value:''}],
			}
		},
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
				},800)				
		    }
		},
		methods: {
			getData(){
		 	this.$http({
				url:this.mnUrl+"/tmp/safe/park_in_out",
				method:'get',
			}).then(function(res){
				this.content = res.body.content;
				var data1 = res.body.content.停车场总数前十;
				var data2 = res.body.content.车辆入场数前十;
				var data3 = res.body.content.剩余车位数前十;
				var data4 = res.body.content.车位利用率前十;
				var data5 = res.body.content.车位周转率前十;
				var data6 = res.body.content.异常抬杆率前十;
				for(var i=0;i<data1.length;i++){
					this.data1[i]={name:data1[i].城市,value:data1[i].数值};
					this.data2[i]={name:data2[i].城市,value:data2[i].数值};
					this.data3[i]={name:data3[i].城市,value:data3[i].数值};
					this.data4[i]={name:data4[i].城市,value:data4[i].数值};
					this.data5[i]={name:data5[i].城市,value:data5[i].数值};
					this.data6[i]={name:data6[i].城市,value:data6[i].数值};
				}				
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
			var	option = {
					backgroundColor:'',  //容器背景颜色
				    tooltip: {
				        trigger: 'item',
				        formatter: function (params) {
				            return params.name + ' : ' + params.value[2];
				        }
				    },
				    color: ['#00BFFF','#FF4500','#87CEFA','#90EE90','#DC143C','#ADFF2F'],
				    legend: {          //标题组件参数配置（左边，大小，颜色等）
				    	type: 'scroll',
				    	orient: 'vertical',   //垂直
				        bottom: '100',      
				        x:'80',
				        icon: 'rect',
				        data:['停车位总数','车辆入场流量','剩余车位数','车位利用率','车位周转率','异常抬杆率'],				        
				        textStyle: {
				            color: '#fff'
				        },
						selectedMode: 'single',   //单选模式
				    },
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
				            name: '停车位总数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 30;        
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
				            name: '车辆入场流量',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 35;        
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
				            name: '剩余车位数',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data3.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 5;        
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
				            name: '车位利用率',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data4.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 5;        
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
				            name: '车位周转率',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data5.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.08;        
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
				            name: '异常抬杆率',
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            data: convertData(refThis.data6.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),    //数据接入
				            //symbolSize: 15,
							symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 0.2;        
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
	height: 8.4rem;
	display: inline-block;
}
</style>