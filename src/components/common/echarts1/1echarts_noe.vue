<template>
	<div>								
		<div id="myChart1" class="chart"></div>								
	</div>

</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import echarts from 'echarts'
	export default {
  data () {
    return {
		mapStatus:null,  //图表返回函数状态
       }
    },
    props:['Text','Legend','Ndata1','Vdata1','Ndata2','Vdata2','Ndata3','Vdata3','Ndata4','Vdata4',"Xvalue"],
    computed:{
		...mapState(['contentSize','mnUrl']),       	
	},
	mounted(){
		//初始化时获取数据
		this.mapStatus = this.drawLine()
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
  	drawLine() {
      // 基于准备好的dom，初始化echarts实例
        var  myChart1 = echarts.init(document.getElementById('myChart1'))
        var toolTip = {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            	type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    };
	    var toolBox = {
		    	right:'2%',
		        iconStyle: {
		            normal: {
		                borderColor: '#fff'
		            },
		            emphasis: {
		                borderColor: '#b1e4ff'
		            }
		        },
		        feature: {
		        	magicType: {type: ['line', 'bar']},
		            saveAsImage: {
		                show: true
		            }
		        }
		   };
		var Grid = {
	        left: '3%',
	        right: '4%',
	        bottom: '8%',
	        top:"15%",
	        containLabel: true
	    }
		var Y = [{
	    		name:'万元',
	            type : 'value',
	            axisLine: {
	        		lineStyle: {
	        			color: '#fff',
	        		}
	        	},
	        	splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255,255,255,0.2)',
					}
	            }
	       }];
	    var itemstyle = {        //颜色渐变
	            normal: {           
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(0,191,255,0.9)'
	                }, {
	                    offset: 1,
	                    color: 'rgba(0,191,255,0.1)'
	                }]),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        };  
      // 绘制图表
	var option1 = {
    	title:{
			show:true,
			text:this.Text,
			left: '2%',
			textStyle:{
				color: '#fff',
				fontSize: 12,
			}
		},
    	backgroundColor:['rgba(30,144,255,0.15)'],
        color: ['#3398DB','#00FFFF','#FFD700','#E9967A'],
	    tooltip : {
	        trigger: 'axis',
//	        formatter: function (params, ticket, callback) {
//			   console.log(params);   
//			},
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:this.Legend,
	        textStyle:{
	        	color: '#fff',
	        	fontSize: 12,        	
	       	},
	    },
	    toolbox: {
	    	right:'2%',
	        iconStyle: {
	            normal: {
	                borderColor: '#fff'
	            },
	            emphasis: {
	                borderColor: '#b1e4ff'
	            }
	        },
	        feature: {
	            saveAsImage: {
	                show: true
	            }
	        }
	    },
	    itemStyle: itemstyle,
	    grid: Grid,
	    xAxis : [
	        {
	            type : 'category',
	            data : this.Xvalue,
	            axisTick: {
	            	interval: '0',
	            },
	            nameTextStyle: {
	            	fontSize: 10,
	            },
	            axisLine: {
	        		lineStyle: {
	        			color: '#fff',
	        		}
	        	},
	        	axisLabel: {           //刻度标题倾斜角度
		            interval: 0,
		            rotate: -45
		        }
	        }
	    ],
	    yAxis : [
	    	{
		        type: 'value',
		        name: '占比',
		        min: 0,
		        max: 50,
		        position: 'right',
		        axisLabel: {
		            formatter: '{value} %'
		        },
		        axisLine: {
	        		lineStyle: {
	        			color: '#fff',
	        		}
	        	},
	        	splitLine: {
					show: false,
	            }
		    },{
	    		name:'万元',
	    		position: 'left',
	            type : 'value',
	            min: 0,
		        max: 600,
	            axisLine: {
	        		lineStyle: {
	        			color: '#fff',
	        		}
	        	},
	        	splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255,255,255,0.2)',
					}
	            }
	       }],
	    series : [{
	            name:this.Ndata1,
	            type:'bar',
	            yAxisIndex: 1,
	            barGap: '15%',
	            barWidth: '45%',
	            barCategoryGap: '20%',
	            data:this.Vdata1
	        },
	        {
	            name:this.Ndata2,
	            type: 'line',
	            lineStyle: {
					normal: {
						color: '#00FFFF',
					}
				},
        		data:this.Vdata2 
	        },
	        {
	            name:this.Ndata3,
	            type: 'line',
	            lineStyle: {
					normal: {
						color: '#FFD700',
					}
				},
        		data: this.Vdata3
	        },
	    	{
	            name:this.Ndata4,
	            type: 'line',
	            lineStyle: {
					normal: {
						color: '#E9967A',
					}
				},
        		data: this.Vdata4
	        }]
        };
    	myChart1.setOption(option1);    
		function MapStatus() {//销毁函数或者重绘函数作为返回值返出去		
			myChart1.resize();
			myChart1.setOption(option1);					
		}
		return MapStatus
   	   }     
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
	/*可视区外框样式*/	
/*图表外框*/
.chart{
	width: 99.8%;
	height: 5.23rem;
	margin: 0 auto;
}
</style>