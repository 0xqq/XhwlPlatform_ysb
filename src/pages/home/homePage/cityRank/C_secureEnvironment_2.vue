<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">中海物业集团深圳市安防数据分析</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}</p>
				<span>{{data1 | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}</p>
				<span>{{data2 | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[2]}}</p>
				<span>{{data3 | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[3]}}</p>
				<span>{{data4}}%</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[4]}}</p>
				<span>{{data5}}%</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[5]}}</p>
				<span>{{data6}}%</span>
			</div>
		</div>
		<div class="boutton_div">
			<input type="button" value="安环数据概览"  class="button2" @click="environment"/>
			<input type="button" value="停车场出入实时"  id="button1"/>
			<input type="button" value="门禁出入实时"  class="button2"  @click="door" />
		</div>
		<div class="chart_div">
			<Mapvue></Mapvue>
			<div class="right_div">
				<div id="myChart1" class="myChart1" ></div>
				<div id="myChart2" class="myChart2" ></div>
				<div id="myChart3" class="myChart3"></div>
				<div id="myChart4" class="myChart4"></div>
				<div id="myChart5" class="myChart5"></div>
				<div id="myChart6" class="myChart6"></div>			
			</div>
		</div>		
	</div>
	
</template>

<script>
import echarts from "echarts"
import Mapvue from '@/components/city_May/C_secureEnvironmentMap_2'
import Homenav from '@/components/common/cityHomeNav'
import {mapState} from 'vuex'
export default {
  data () {
	    return {
	    	isDispose:false,
			mapStatus:null,  //图表返回函数状态
			isFirst: true,
			content:'',
	    	year:'2017年9月',
	    	title:['停车位总数(个)','车辆入场流量(次)','剩余车位数(个)','车位利用率','车位周转率','异常抬杆率'],
			data:['35','432222','1950','96%','15%','7%'],
			data1:'',
			data2:'',
			data3:'',
			data4:'',
			data5:'',
			data6:'',
			cityName1:[],
			cityName2:[],
			cityName3:[],
			cityName4:[],
			cityName5:[],
			cityName6:[],
			cityData1:[],
			cityData2:[],
			cityData3:[],
			cityData4:[],
			cityData5:[],
			cityData6:[],
			title1:'停车位总数前十',
			title2:'车辆入场流量前十',
			title3:'剩余车位数前十',
			title4:'车位利用率前十',
			title5:'车位周转率前十',
			title6:'异常抬杆率前十',
			route:'C_secureEnvironment_2',   //向子组件传跳转路由
	    }
  },
  	components: {
	    Mapvue,
	    Homenav,
	},
	computed:{
		...mapState(['contentSize','cityName','mnUrl']),       	
	},
  	mounted(){
  		this.getData()	
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
			},1000)			
		}
	},
    methods: {
    	getYear(year){
	    		this.year=year;
	    	},
	    getData(){
		 	this.$http({
				url:this.mnUrl+"/tmp/safe/city_park_in_out",
				method:'get',
				type:'json',
			}).then(function(res){
				if(res.body.status){
					var value = res.body.content[0];
					this.content=res.body.content[0];
					this.data1 = value.停车场总数;
					this.data2 = value.车辆入场流量;
					this.data3 = value.剩余车位数;
					this.data4 = value.车位利用率;
					this.data5 = value.车位周转率;
					this.data6 = value.异常抬杆率;
					var cityName1 = res.body.content[0].停车位总数前十;
					var cityName2 = res.body.content[0].车辆入场流量前十;
					var cityName3 = res.body.content[0].剩余车位数前十;
					var cityName4 = res.body.content[0].车位利用率前十;
					var cityName5 = res.body.content[0].车位周转率前十;
					var cityName6 = res.body.content[0].异常抬杆率前十;
					for(var i=0;i<cityName1.length;i++){
						this.cityName1[i] = cityName1[i].项目;
						this.cityData1[i] = cityName1[i].数值;
						this.cityName2[i] = cityName2[i].项目;
						this.cityData2[i] = cityName2[i].数值;
						this.cityName3[i] = cityName3[i].项目;
						this.cityData3[i] = cityName3[i].数值;
						this.cityName4[i] = cityName4[i].项目;
						this.cityData4[i] = cityName4[i].数值;
						this.cityName5[i] = cityName5[i].项目;
						this.cityData5[i] = cityName5[i].数值;
						this.cityName6[i] = cityName6[i].项目;
						this.cityData6[i] = cityName6[i].数值;
					}
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
			},
			function(error){
			//失败回调的函数								
			console.log(error);
				});						
	 		},
	  	environment(){	
	  			this.$router.push({path:'C_secureEnvironment_1'});
	  		},
  		door(){	
  			this.$router.push({path:'C_secureEnvironment_3'});
  		},
		drawLine() {
			var  refThis = this;
			var myChart1 = echarts.init(document.getElementById('myChart1'));
			var myChart2 = echarts.init(document.getElementById('myChart2'));
			var myChart3 = echarts.init(document.getElementById('myChart3')); 
			var myChart4 = echarts.init(document.getElementById('myChart4'));
			var myChart5 = echarts.init(document.getElementById('myChart5'));
			var myChart6 = echarts.init(document.getElementById('myChart6'));
			var color = 'rgba(0,191,255,0.6)';
	//右边5图形参数
	var option1 = {
	    title: {
	        text: this.title1,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName1,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData1,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart1.setOption(option1);
	   var option2 = {
	    title: {
	        text: this.title2,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName2,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData2,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart2.setOption(option2);
	   var option3 = {
	    title: {
	        text: this.title3,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName3,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData3,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart3.setOption(option3);
	   var option4 = {
	    title: {
	        text: this.title4,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName3,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData4,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart4.setOption(option4);
	   var option5 = {
	    title: {
	        text: this.title5,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName5,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData5,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart5.setOption(option5);
	   var option6 = {
	    title: {
	        text: this.title6,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				fontSize: 16,
				},
			top:'15'
	    },
	    color: [color],
//	    tooltip: {
//	        trigger: 'axis',
//	        axisPointer: {
//	            type: 'shadow'
//	        }
//	    },
	    textStyle:{
	        	color: '#fff',
	        },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        splitLine: {
						show: false,
	            }
	    },
	    yAxis: {
	        type: 'category',
	        inverse: true,
	        data: this.cityName6,
	        axisTick: {       //轴刻度
	        	show: false,
		    	},
	        axisLine: {     //y轴刻度线
	        	show: false,
	        	}
	    },
	    itemStyle: {     //颜色渐变
            normal: {                
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(0,191,255,0.9)'
                }, {
                    offset: 1,
                    color: 'rgba(0,191,255,0.1)'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
	    series: [
	        {
	            name: '2011年',
	            type: 'bar',
	            data: this.cityData6,
	            barWidth: '7',     //柱型宽度
	            itemStyle: {      //柱型圆角
	            	normal: {
	            		barBorderRadius: 10
	            	},
	            }
	        }
	    ]
	};
	myChart6.setOption(option6);
		   function disposeMap() { //销毁函数作为返回值返出去
				if(refThis.isDispose){
					myChart1.dispose();
					myChart2.dispose();
					myChart3.dispose();
					myChart4.dispose();
					myChart5.dispose();
					myChart6.dispose();
				}else{
					myChart1.resize();
					myChart2.resize();
					myChart3.resize();
					myChart4.resize();
					myChart5.resize();
					myChart6.resize();
				}
			}
			return disposeMap;
 		}			
  	}
 }
</script>

<style lang="scss" scoped>
/*外层最大div*/
.Odiv{
	width: 100%;
	height: 8.9rem;
	margin: 0 auto;
	position: relative;
}
/*标题样式*/
.title{
	width: 100%;
	height: 0.5rem;
	line-height: 0.7rem;
	text-align: center;
	font-size: 0.28rem;
	color: #fff;
}
/*显示数据*/
.data_div{
	width: 70%;
	height: 0.8rem;
	position: absolute;
	top: 1.2rem;
	z-index: 99;
	flex: 1;
}
.data_textDiv{
	height: 0.8rem;
	width: 16%;
	display: inline-block;
	text-align: center;
	p{
		color: rgba(225,255,255,0.7);
		font-size: 0.16rem;
	}
	span{
		font-size: 0.38rem;
		color: rgb(89,235,232);
	}
}
/*按钮样式*/
.boutton_div{
	z-index: 99;
	width: 3.06rem;
	height: 0.42rem;
	overflow: hidden;
	margin-right: 0.1rem;
	position: absolute;
	display: flex;
	top: 0.5rem;
	line-height: 0.32rem;
	input{
		flex: 1;
		height: 0.41rem;		
		float: right;
		font-size: 0.14rem	
	}
}
#button1{	
	color: white;
	background-image: url(../../../../images/homeButton2.png);
	background-size: cover;
}
.button2{
	color: darkgray;
	background-image: url(../../../../images/homeButton3.png);
	background-size: cover;	
}
.button3{
	color: darkgray;
	background-image: url(../../../../images/homeButton3.png);
	background-size: cover;
}
/*图表区域*/
.chart_div{
	width: 100%;
	height: 8.1rem;
	display: flex;
}
/*右边容器*/
.right_div{
	flex: 1;
	height: 8.1rem;
	display: inline-block;
	overflow: hidden;	
}
.myChart1{
	width: 50%;
	height: 2.6rem;
	float: left;
}
.myChart2{
	width: 50%;
	height: 2.6rem;	
	float: left;	
}
.myChart3{
	width: 50%;
	height: 2.6rem;	
	float: left;
}
.myChart4{
	width: 50%;
	height: 2.6rem;
	float: left;
}
.myChart5{
	width: 50%;
	height: 2.6rem;
	float: left;		
}
.myChart6{
	width: 50%;
	height: 2.6rem;	
	float: left;
}

</style>