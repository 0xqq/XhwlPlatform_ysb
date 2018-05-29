<template>
	<div>								
		<div id="myChart6" class="chart"></div>														
	</div>

</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import echarts from 'echarts'
	export default {
    data () {
        return {
			
        }
    },
    props:['Text',"Xvalue",'Legend',"Series"],
    computed:{
		...mapState(['contentSize']),       	
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
	        let myChart6 = echarts.init(document.getElementById('myChart6'))
	        var toolTip = {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    }
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
		    };
		    var Y = [{
		    		name:'百分比',
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
		       }]
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
			    tooltip : toolTip,
			    legend: {
			        data:this.Legend,
			        textStyle:{
			        	color: '#fff',
			        	fontSize: 12,        	
			       		},
			    },
			    toolbox: toolBox,
			    grid: Grid,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: {
			        		lineStyle: {
			        			color: '#fff',
			        		}
			        	},
			        	axisLabel: {           //刻度标题倾斜角度
				            interval: 0,
				            rotate: -30
				        },
			            boundaryGap : false,
			            data : this.Xvalue,
			        }
			    ],
			    yAxis : Y,
			    series : this.Series
			}
	    myChart6.setOption(option1);
	    function MapStatus() { //销毁函数或者重绘函数作为返回值返出去				
				myChart6.resize();
				myChart6.setOption(option1);
			}
			return MapStatus
	    }  
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

/*图表外框*/
.chart{
	width: 99.8%;
	height: 5.23rem;
	margin: 0 auto;
}
select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: transparent;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    // padding-right: 14px;
}

select::-ms-expand {
    display: none;
}	
</style>