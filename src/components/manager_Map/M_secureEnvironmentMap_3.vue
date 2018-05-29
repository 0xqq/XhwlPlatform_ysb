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
				destroyMap: null,
				reDraw: null,
				isDispose: false,
			}
		},
		 computed:{
        	...mapState(['contentSize']),
        	...mapState(['geoCoordMap'])
  		},
		mounted() {
			this.destroyMap = this.drawLine();
		},
		destroyed() {
			this.isDispose = true;
			var _destroyMap = this.destroyMap;
			_destroyMap();
		},
		watch:{
			contentSize:function(contentSize){
				var _destroyMap = this.destroyMap;
				setTimeout(function(){
					_destroyMap();
				},650)
			}
		},
		methods: {
			
			drawLine() {
				var  refThis = this;
				var myChart = echarts.init(document.getElementById('myChart'));
				var geoCoordMap = this.geoCoordMap;
				var data1 =[	{name: "泉州", value: 21},				                				               
				                {name: "上海", value: 185},				                
				                {name: "厦门", value: 26},				                
				                {name: "烟台", value: 28},				               
				                {name: "汕头", value: 32},				               
				                {name: "东莞", value: 96},				               				                
				                {name: "广州", value: 178},				               
				                {name: "深圳", value: 169},
				                {name: "珠海", value: 142},				               
				                {name: "沈阳", value: 50},			
				                {name: "成都", value: 158},				             			        				          
				                {name: "西安", value: 61},				             				                			               				                				                				                
				                {name: "重庆", value: 166},				                
				                {name: "南京", value: 167},
								{name: "北京", value: 190},				            				                
				                {name: "杭州", value: 84},				        				               
				                {name: "济南", value: 172},				              
				                {name: "温州", value: 95},				              
				                {name: "天津", value: 175},				               				              
				                {name: "郑州", value: 113},
				                {name: "哈尔滨", value: 64},				               				                
				                {name: "唐山", value: 79},				               				               				               				                
				                {name: "石家庄", value: 177},				                			               
				                {name: "长沙", value: 175},				              
				                {name: "武汉", value: 183}
				            ];
				var data2 =[	{name: "泉州", value: 21},				                				               
				                {name: "上海", value: 185},				                
				                {name: "厦门", value: 166},				                
				                {name: "烟台", value: 128},				               
				                {name: "汕头", value: 32},				               
				                {name: "东莞", value: 186},				               				                
				                {name: "广州", value: 168},				               
				                {name: "深圳", value: 189},
				                {name: "珠海", value: 162},				               
				                {name: "沈阳", value: 50},			
				                {name: "成都", value: 188},				             			        				          
				                {name: "西安", value: 61},				             				                			               				                				                				                
				                {name: "重庆", value: 166},				                
				                {name: "南京", value: 167},
								{name: "北京", value: 170},				            				                
				                {name: "杭州", value: 174},				        				               
				                {name: "济南", value: 172},				              
				                {name: "温州", value: 95},				              
				                {name: "天津", value: 165},				               				              
				                {name: "郑州", value: 123},
				                {name: "哈尔滨", value: 94},				               				                
				                {name: "唐山", value: 154},				               				               				               				                
				                {name: "石家庄", value: 177},				                			               
				                {name: "长沙", value: 165},				              
				                {name: "武汉", value: 173}
				            ];
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
				    legend: {          //标题组件参数配置（左边，大小，颜色等）
				    	type: 'scroll',
				    	orient: 'vertical',   //垂直
				        bottom: '80',      
				        x:'80',
				        //data:['停车场月卡缴费率','客服满意度'],
				        data: [{
						    name: '业主入流量',
						    // 强制设置图形为方形。
						    icon: 'rect',
						    color:'#00BFFF',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff'
						    	}
						    },
						    {
						    name: '访客入流量',
						    icon: 'rect',
						    color:'',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff'
						    	}
							},
				        	{
						    name: '当前滞留人数',
						    icon: 'rect',
						    color:'',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff'
						    	}
							},
				        	{
						    name: '异常开门率',
						    icon: 'rect',
						    color:'',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff'
						    	}
							}],				        
				        textStyle: {
				            color: '#fff'
				        },
				        selected: {
						    // 选中'系列1'
						    '业主入流量': true,
						    // 不选中'系列2'
						    '访客入流量': false
						},
						selectedMode: 'single',   //单选模式
				    },
				    visualMap: {   //选择数据区域
				        min: 0,
				        max: 200,
				        bottom: '60',      
				        x:'0',
				        calculable: true,
				        inRange: {
				            color: ['#FF0000', '#FF8C00', '#fbf320'] //颜色选择
				        },
				        textStyle: {
				            color: '#fff'
				        }
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
				            name: '业主入流量',
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            data: convertData(data1),    //数据接入
				            symbolSize: 12,
				            label: {
				                normal: {
				                    show: false
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
				            name: '访客入流量',
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            data: convertData(data2),
				            symbolSize: 12,
				            label: {
				                normal: {
				                    show: false
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
				            name: '当前滞留人数',
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            data: convertData(data2),
				            symbolSize: 12,
				            label: {
				                normal: {
				                    show: false
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
				            name: '异常开门率',
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            data: convertData(data1),     
				            symbolSize: 12,
				            label: {
				                normal: {
				                    show: false
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
				        	{                       //前十城市闪烁
				            name: '业主入流量',
				            type: 'effectScatter',  
				            coordinateSystem: 'geo',
				            data: convertData(data1.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
				            symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 10;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      //圆点显示前十城市名称
				                    position: 'right',
				                    show: true
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#f4e925',
				                    shadowBlur: 10,
				                    shadowColor: '#333'
				                }
				            },
				            zlevel: 1
				        },
				         {                       //前十城市闪烁
				            name: '访客入流量',
				            type: 'effectScatter',  
				            coordinateSystem: 'geo',
				            data: convertData(data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
				            symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 10;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      //圆点显示前十城市名称
				                    position: 'right',
				                    show: true
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#f4e925',
				                    shadowBlur: 10,
				                    shadowColor: '#333'
				                }
				            },
				            zlevel: 1
				        },
				        {                       //前十城市闪烁
				            name: '当前滞留人数',
				            type: 'effectScatter',  
				            coordinateSystem: 'geo',
				            data: convertData(data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
				            symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 10;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      //圆点显示前十城市名称
				                    position: 'right',
				                    show: true
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#f4e925',
				                    shadowBlur: 10,
				                    shadowColor: '#333'
				                }
				            },
				            zlevel: 1
				        },
				        {                       //前十城市闪烁
				            name: '异常开门率',
				            type: 'effectScatter',  
				            coordinateSystem: 'geo',
				            data: convertData(data2.sort(function (a, b) {
				                return b.value - a.value;
				            }).slice(0, 10)),
				            symbolSize: function (val) {	//前十闪烁的大小
				                return val[2] / 10;        
				            },
				            showEffectOn: 'render',
				            rippleEffect: {
				                brushType: 'stroke'
				            },
				            hoverAnimation: true,
				            label: {
				                normal: {
				                    formatter: '{b}',      //圆点显示前十城市名称
				                    position: 'right',
				                    show: true
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            itemStyle: {
				                normal: {
				                    color: '#f4e925',
				                    shadowBlur: 10,
				                    shadowColor: '#333'
				                }
				            },
				            zlevel: 1
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