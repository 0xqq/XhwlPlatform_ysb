<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">{{year}}中海物业集团广州分公司安防数据分析</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}</p>
				<span>{{data[0] | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}</p>
				<span>{{data[1] | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[2]}}</p>
				<span>{{data[2] | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[3]}}</p>
				<span>{{data[3]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[4]}}</p>
				<span>{{data[4]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[5]}}</p>
				<span>{{data[5]}}</span>
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
		<!--<time-Select @my-year="getYear"></time-Select>-->		
	</div>
	
</template>

<script>
import echarts from "echarts"
import Mapvue from '@/components/manager_Map/M_secureEnvironmentMap_2'
//import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/managerHomeNav'
import {mapState} from 'vuex'
export default {
  data () {
	    return {
	    	year:'2017年1月',
	    	isDispose:false,
			mapStatus:null,  //图表返回函数状态
			isFirst: true,
			title:['停车位总数(个)','车辆入场流量(次)','剩余车位数(个)','车位利用率','车位周转率','异常抬杆率'],
			data:['35','432222','1950','96%','15%','7%'],
			cityName1:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName2:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName3:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName4:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName5:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName6:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityData1:[182, 234, 290, 104, 131, 630,540,341,222,432],
			cityData2:[182, 234, 290, 104, 131, 630,540,341,222,432],
			cityData3:[182, 234, 290, 104, 131, 630,540,341,222,432],
			cityData4:[182, 234, 290, 104, 131, 630,540,341,222,432],
			cityData5:[182, 234, 290, 104, 131, 630,540,341,222,432],
			cityData6:[182, 234, 290, 104, 131, 630,540,341,222,432],
			title1:'停车位总数前十',
			title2:'车辆入场流量前十',
			title3:'剩余车位数前十',
			title4:'车位利用率',
			title5:'车位周转率 ',
			title6:'异常抬杆率 ',
			route:'M_secureEnvironment_1',   //向子组件传跳转路由
	    }
  },
  	components: {
	    Mapvue,
	    Homenav,
//	    timeSelect
	},
	computed:{
		...mapState(['contentSize']),       	
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
			},500)			
		}
	},
    methods: {
    	getYear(year){
	    		this.year=year;
	    	},
	    getData(){
		 	this.$http({
				url:"../../../static/homepage.json",
				method:'get',
			}).then(function(res){
			    //console.log(res.body);
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
			console.log(error);
				});						
	 	},
	  	environment(){	
	  			this.$router.push({path:'M_secureEnvironment_1'});
	  		},
	  		door(){	
	  			this.$router.push({path:'M_secureEnvironment_3'});
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
			//城市级跳转
			myChart1.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
               		 });
	        myChart2.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
	                });
	        myChart3.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
	                });
	        myChart4.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
	                });
	        myChart5.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
	                });
	        myChart6.on('click', function (params) {
			 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
			 	refThis.$router.push({path:"C_secureEnvironment_2"});			 	
	                });
	//右边5图形参数
	var option1 = {
	    title: {
	        text: this.title1,
	        textStyle: {
				color: 'rgba(255,255,255,0.7)',
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
	            data:this.cityData3,
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
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
	        data: this.cityName4,
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
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
				},
			top:'15'
	    },
	    color: [color],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
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
	width: 90%;
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