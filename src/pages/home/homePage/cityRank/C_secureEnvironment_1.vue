<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">{{this.yearNow}}年{{this.monthNow}}月中海物业集团深圳市安防数据分析</p>
		<!--数据显示-->
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}<br />(起/万平米·月)</p>
				<span>{{data1}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}<br />(起/万平米·月)</p>
				<span>{{data2}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[2]}}<br />(起/万平米·月)</p>
				<span>{{data3}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[3]}}<br />(起/万平米·月)</p>
				<span>{{data4}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[4]}}<br />(起/万平米·月)</p>
				<span>{{data5}}</span>
			</div>
		</div>
		<div class="boutton_div">
			<input type="button" value="安环数据概览"  class="button2"/>
			<input type="button" value="停车场出入实时"  id="button1"  @click="cat" />
			<input type="button" value="门禁出入实时"  class="button3"  @click="door" />
		</div>
		<!--图形区域-->
		<div class="chart_div">
			<Mapvue></Mapvue>   <!--中国地图-->
			<div class="right_div">
				<div id="myChart1" class="myChart1"></div>
				<div id="myChart3" class="myChart3"></div>
				<div id="myChart4" class="myChart4"></div>
				<div id="myChart5" class="myChart5"></div>
				<div id="myChart6" class="myChart6" ></div>			
			</div>
		</div>
		<time-Select @my-year="getYear"></time-Select>		
	</div>
	
</template>

<script>
import echarts from "echarts"
import Mapvue from '@/components/city_May/C_secureEnvironmentMap_1'
import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/cityHomeNav'
import {mapState} from 'vuex'
export default {
  data () {
	    return {
	    	isDispose:false,
			mapStatus:null,  //图表返回函数状态
			isFirst: true,
	    	year:'2017-9',
			title:['安防报警数','消防报警数','视频报警数','周边防范报警数','人员报警数'],
			yearNow:'2017',
	    	monthNow:'9',
			data1:'',
			data2:'',
			data3:'',
			data4:'',
			data5:'',
			content:'',
			cityName1:[],
	    	cityData1:[],
	    	cityName2:[],
	    	cityData2:[],
	    	cityName3:[],
	    	cityData3:[],
	    	cityName4:[],
	    	cityData4:[],
	    	cityName5:[],
	    	cityData5:[],
			title3:'消防报警数前十',
			title4:'视频报警数前十',
			title5:'周边防范报警数前十 ',
			title6:'人员报警数前十 ',
			title1:'安防报警数前十',
			route:'C_secureEnvironment_1',   //向子组件传跳转路由
	    }
  	},
  	components: {
	    Mapvue,
	    Homenav,
	    timeSelect
  	},
  	computed:{
		...mapState(['contentSize','cityName','mnUrl']),       	
	},
  	mounted(){
  		//初始化时读取数据
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
		},
		year:function(){		
   			for(var i=0;i<this.content.length;i++){
		    	var tmpDate = this.content[i].日期;
		    	var finalDate= new Date(this.content[i].日期);
		    	var year = finalDate.getFullYear();
		    	var month = finalDate.getMonth()+1;
		    	var timeNow =  year+'-'+month;
		    	if(timeNow==this.year){
		    		this.data1 = this.content[i].安防报警指数;
		    		this.data2 = this.content[i].消防报警数;
		    		this.data3 = this.content[i].视频报警数;
		    		this.data4 = this.content[i].周界防范报警数;
		    		this.data5 = this.content[i].人员报警数;	    		
		    	}
		    };
		    for(var i=0;i<this.content.length;i++){
				var finalDate= new Date(this.content[i].日期);
		    	var year = finalDate.getFullYear();
		    	var month = finalDate.getMonth()+1;
		    	var timeNow =  year+'-'+month;
				if(timeNow==this.year){
					var cityName1 = this.content[i].安防报警指数前十;
					var cityName2 = this.content[i].消防报警数前十;
					var cityName3 = this.content[i].视频报警数前十;
					var cityName4 = this.content[i].周界防范数前十;
					var cityName5 = this.content[i].人员报警数前十;
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
						this.isFirst = false;
					}
				}
			};
			if(this.isFirst){
		    	//第一次获取数值进行实列化
		    	this.mapStatus = this.drawLine();
		    	this.isFirst = false;
		    }else{
		    	// 否则进行重绘
		    	var _resizeMap = this.mapStatus;
					_resizeMap();
		    }
		}
	},
  methods: {
  	getYear(year){
		this.year=year;
		this.yearNow = this.year.substring(0,4);
		this.monthNow = this.year.substring(5,7);
    },
    getData(){
	 	this.$http({
			url:this.mnUrl+"/tmp/safe/city",
			method:'get',
		}).then(function(res){
		    if(res.body.status){
				this.content = res.body.content;
				var value = res.body.content;
				for(var i=0;i<value.length;i++){
					var finalDate= new Date(value[i].日期);
			    	var year = finalDate.getFullYear();
			    	var month = finalDate.getMonth()+1;
			    	var timeNow =  year+'-'+month;
					if(timeNow==this.year){
						var cityName1 = value[i].安防报警指数前十;
						var cityName2 = value[i].消防报警数前十;
						var cityName3 = value[i].视频报警数前十;
						var cityName4 = value[i].周界防范数前十;
						var cityName5 = value[i].人员报警数前十;
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
						}
					}
				}				
			    for(var i=0;i<value.length;i++){
			    	var finalDate= new Date(res.body.content[i].日期);
			    	var year = finalDate.getFullYear();
			    	var month = finalDate.getMonth()+1;
			    	var timeNow =  year+'-'+month;
			    	if(timeNow==this.year){
			    		this.data1 = value[i].安防报警指数;
			    		this.data2 = value[i].消防报警数;
			    		this.data3 = value[i].视频报警数;
			    		this.data4 = value[i].周界防范报警数;
			    		this.data5 = value[i].人员报警数;		    		
			    	}
			    }
			}else{
				alert("链接失败......(请刷新)");
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
		console.log(error);
			});						
 		},
 	cat(){	
  		this.$router.push({path:'C_secureEnvironment_2'});	
	},
	door(){	
		this.$router.push({path:'C_secureEnvironment_3'});
	},
	drawLine() {
		var  refThis = this;
		var myChart1 = echarts.init(document.getElementById('myChart1'));
		var myChart3 = echarts.init(document.getElementById('myChart3')); 
		var myChart4 = echarts.init(document.getElementById('myChart4'));
		var myChart5 = echarts.init(document.getElementById('myChart5'));
		var myChart6 = echarts.init(document.getElementById('myChart6'));
		var color = 'rgba(30,144,255,0.7)';
		
//右边五个图形参数
   	var option1 = {
			     color: ['rgba(30,144,255,0.7)'],
			    title: {
			    	text: this.title1,
			    	textStyle: {
						color: 'rgba(255,255,255,0.7)',
						fontSize: 16,
						},
					top: '10'
			    },
			    textStyle:{
			        	color: '#fff',
			        },
//			    tooltip : {
//			        trigger: 'axis',
//			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//			        }
//			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data :this.cityName1,
			           	axisTick: {
			            	show:false,
			            },
			            axisLine: {
							show: false,
						},
						axisLabel: {           //刻度标题倾斜角度
				            interval: 0,
				            rotate: -30
				        }
				    }
			    ],
			    itemStyle: {     //颜色渐变
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
		        },
			    yAxis : [
			        {
			            type : 'value',
			             axisLine: {
			            	show: false,
			            },
			            splitLine: {
								show: false,
			            }
			        }
			    ],
			    series : [
			        {
			            name:'数值',
			            type:'bar',
			            data:this.cityData1,
			            barWidth: '20%',     //柱型宽度
			            itemStyle: {      //柱型圆角
			            	normal: {
			            		barBorderRadius: 10
			            	},
			            }
			        }
			    ]
			};
			myChart1.setOption(option1);
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
//		    tooltip: {
//		        trigger: 'axis',
//		        axisPointer: {
//		            type: 'shadow'
//		        }
//		    },
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
		            name: '数值',
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
//		    tooltip: {
//		        trigger: 'axis',
//		        axisPointer: {
//		            type: 'shadow'
//		        }
//		    },
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
		            name: '数值',
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
//		    tooltip: {
//		        trigger: 'axis',
//		        axisPointer: {
//		            type: 'shadow'
//		        }
//		    },
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
		            name: '数值',
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
//		    tooltip: {
//		        trigger: 'axis',
//		        axisPointer: {
//		            type: 'shadow'
//		        }
//		    },
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
		            name: '数值',
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
		myChart6.setOption(option6);
		function disposeMap() { //销毁函数作为返回值返出去
			if(refThis.isDispose){
				myChart1.dispose();
				myChart3.dispose();
				myChart4.dispose();
				myChart5.dispose();
				myChart6.dispose();
			}else{
				myChart1.resize();
				myChart3.resize();
				myChart4.resize();
				myChart5.resize();
				myChart6.resize();
				myChart1.setOption(option1);
				myChart3.setOption(option3);
				myChart4.setOption(option4);
				myChart5.setOption(option5);
				myChart6.setOption(option6);
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
	left: 6%;
	z-index: 99;
	margin: 0 auto;
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
		font-size: 0.14rem;		
	}
}
#button1{	
	color: darkgray;	
	background-image: url(../../../../images/homeButton3.png);
	background-size: cover;
	background-position: center;
}
.button2{
	color: white;
	background-image: url(../../../../images/homeButton2.png);
	background-size: cover;
	background-position: center;	
}
.button3{
	color: darkgray;
	background-image: url(../../../../images/homeButton3.png);
	background-size: cover;
	background-position: center;
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
/*图形一*/
.myChart1{
	width: 100%;
	height: 2.6rem;
	float: left;
}
/*图形二*/
.myChart3{
	width: 50%;
	height: 2.6rem;	
	float: left;
}
/*图形三*/
.myChart4{
	width: 50%;
	height: 2.6rem;
	float: left;
}
/*图形四*/
.myChart5{
	width: 50%;
	height: 2.6rem;
	float: left;		
}
/*图形五*/
.myChart6{
	width: 50%;
	height: 2.6rem;	
	float: left;
}
</style>