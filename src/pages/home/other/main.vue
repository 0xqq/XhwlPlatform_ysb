<template>
	<div class="Odiv">
		 <zen-modal v-if="showModal" @fireclose="showModal = false"></zen-modal>
		<p class="title">中海物业集团物联网大数据平台</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{text1}}</p>
				<span  @click="show()" class="project">{{data1}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{text2}}</p>
				<span>{{data2 | formatPrice}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{text3}}</p>
				<span>{{data3 | formatPrice}}</span>
			</div>
		</div>
		<div class="chart_div">
			<Mapvue></Mapvue>
			<div class="right_div">
				<div id="myChart1" class="myChart1" @click="goLink1()"></div>
				<span class="tote">{{this.Community_safety}} <br /><i>起/万平米·月</i></span>
				<div id="myChart3" class="myChart3" @click="goLink3()"></div>
				<div id="myChart5" class="myChart5" @click="goLink5()">
					<div class="progress_bar">
						<p class="title_progress">工程服务指标</p>
						<span>巡检计划完成率</span><span class="progress_data">{{this.engineering1}}%</span>
						<el-progress :text-inside="true" :stroke-width="10" :percentage="100"  status="exception"></el-progress>
						<span>维修完成率</span><span class="progress_data">{{this.engineering2}}%</span>
						<el-progress :text-inside="true" :stroke-width="10" :percentage="97" status="success" ></el-progress>
						<span>能耗指标</span><span class="progress_data">{{this.engineering3}}</span>
						<el-progress :text-inside="true" :stroke-width="10" :percentage="100" ></el-progress>
					</div>										
				</div>				
				<div id="myChart4" class="myChart4" @click="goLink4()"></div>
				<div id="myChart2" class="myChart2" @click="goLink2()"></div>		
				<div id="myChart6" class="myChart6" @click="goLink6()"></div>			
			</div>
		</div>		
	</div>
	
</template>

<script>
import echarts from "echarts"
import zenModal from '@/components/Bomb_box'
import Mapvue from '@/components/common/map'
import Homenav from '@/components/common/homeNav'
import {mapState} from 'vuex';
export default {
  data () {
	    return {
	    	Rem:'',
	    	isDispose:false,
	    	mapStatus:null,  //图表返回函数状态
	    	isFirst: true,
			text1:'联网项目数(个)',
			text2:'管理面积数(万平方米)',
			text3:'服务业主数(户)',			
			data1:'',
			data2:'',
			data3:'',
			title1:'经营数据分析',
			title2:'客服服务指标',
			title3:'社区安全指标',
			title4:'环境服务指标',
			title5:'工程服务指标',
			title6:'人事数据分析',
			manage:[],
			Rate_of_detachment:[],
			Rate_of_detachment_over:[],
			Community_safety:'',
			fire_protection:'',
			boundary:'',
			personnel:'',
			video :'',
			engineering1:'',
			engineering2:'',
			engineering3:'',
			environment:'',
			month_card:'',
			turn_out_for_work:'',
			showModal:false,
			Height:''
	    }
    },
    components: {
	    Mapvue,
	    Homenav,
	    zenModal
    },
  	computed:{
		...mapState(['contentSize']),       	
	},
	mounted(){
		//初始化时获取数据
		//this.getDpr();
		this.getData();
		this.Height = window.screen.height
		if(window.screen.height>=1080){
			this.Rem = 16;
		}else if(window.screen.height>=900&window.screen.height<=1080){
			this.Rem = 13;
		}else{
			this.Rem = 10;
		}
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
			//this.loading(false);
			setTimeout(function(){
				_resizeMap();
			},600)				
		}
	},
	
  methods: {
  	//各子页面的跳转
  	 goLink1:function(){ 	 			
        this.$router.push({path:'financialData'});
    },
    goLink2:function(){ 	 		
        this.$router.push({path:'custom'});
    },
    goLink3:function(){ 	 		
        this.$router.push({path:'secureEnvironment_1'});
    },
    goLink4:function(){ 	 		
        this.$router.push({path:'secureEnvironment_1'});
    },
    goLink5:function(){ 	 		
        this.$router.push({path:'engineeringData'});
    },
    goLink6:function(){ 	 		
        this.$router.push({path:'humanAffairs'});
    },
    show:function(){
    	this.showModal = true;
    },
    loading(state) {
		this.$store.commit('CHANGE_LOADING',state);
	},
    getData(){
  		//this.loading(true);
	 	this.$http({
			url:"http://xhmind.com:5051/tmp/total/overview",
			method:'get',
		}).then(function(res){
			if(res.body.status){
				this.data1 = res.body.content.联网项目数;
				this.data2 = res.body.content.管理面积数;
				this.data3 = res.body.content.服务业主数;
				this.manage[0] = res.body.content.停车场收费应收;
				this.manage[1] = res.body.content.停车场收费实收;
				this.Community_safety = res.body.content.社区安全指数;
				this.fire_protection = res.body.content.消防报警;
				this.boundary = res.body.content.周界防范报警;
				this.personnel = res.body.content.人员报警;
				this.video = res.body.content.视频报警;
				this.engineering1 = res.body.content.巡检计划完成率;
				this.engineering2 = res.body.content.维修完成率;
				this.engineering3 = res.body.content.能耗指标;
				this.environment = res.body.content.环境工作完成率;
				this.satisfied = res.body.content.客户满意度;
				this.month_card = res.body.content.停车场月卡催缴率;
				this.turn_out_for_work = res.body.content.出勤率;				
				this.Rate_of_detachment[0] = res.body.content.重点岗位脱岗率;
				this.Rate_of_detachment[1] = res.body.content.安防脱岗率;
				this.Rate_of_detachment[2] = res.body.content.工程脱岗率;				
				this.Rate_of_detachment[3] = res.body.content.环境脱岗率;
				this.Rate_of_detachment[4] = res.body.content.客服脱岗率;				
				this.Rate_of_detachment_over[0]=0;
				this.Rate_of_detachment_over[1]=this.Rate_of_detachment[0]-this.Rate_of_detachment[1];
				this.Rate_of_detachment_over[2]=this.Rate_of_detachment_over[1]-this.Rate_of_detachment[2]
				this.Rate_of_detachment_over[3]=this.Rate_of_detachment_over[2]-this.Rate_of_detachment[3];
				this.Rate_of_detachment_over[4]=(this.Rate_of_detachment_over[3]+0.001)-this.Rate_of_detachment[4];
				this.loading(false);
			}
		    if(this.isFirst){
		    	//第一次获取数据进行实列化
		    	this.loading(false);
		    	this.mapStatus = this.drawLine();
		    	this.isFirst = false;
		    }else{
		    	// 否则进行重绘
		    	var _resizeMap = this.mapStatus;
					_resizeMap();
		    }
		    this.loading(false);
			},function(error){
			//失败回调的函数								
			console.log(error);
			
			});
	},
//	getDpr(){
//      var dpr = window.screen.height ;
//      //alert(dpr)
//      if (dpr <= 1080) {
//          return 16;
//         console.log(234)
//      }else if (dpr <= 900&dpr>=700) {
//          return  14;
//          
//           console.log(264)
//      }else {
//      	 console.log(27784)
//          return 12;
//      }
//  },
	drawLine() {
		var  refThis = this;
		var myChart1 = echarts.init(document.getElementById('myChart1'));
		var myChart2 = echarts.init(document.getElementById('myChart2'));
		var myChart3 = echarts.init(document.getElementById('myChart3')); 
		var myChart4 = echarts.init(document.getElementById('myChart4'));
		var myChart6 = echarts.init(document.getElementById('myChart6'));
//右边图形参数
	var ption = {
		backgroundColor:'rgba(255,255,255,0.1)',
	  	title: {
	  		text: this.title1,
	  		textStyle: {
	  			color: 'rgba(255,255,255,0.7)',
	  			fontSize: 16,
	  		},
	  		top: '5'
	  	},
	  	color: ['#65f5f3'], //柱体颜色
	  	textStyle: {
	  		color: '#fff',
	  	},
	  	legend: {
	        data:['停车场收费'],
	        bottom: '3%',
	        textStyle: {
	        	color: '#fff'
	        },
	    },
	  	tooltip : {
	        show: true,
	        formatter: "{a} <br/>{b}:{c}",
	     	position:"right"
	    },
	  	xAxis: {    //x轴相关设置
	  		type : 'category',
	  		data: ["应收", "实收"],
	  		axisLine: {             //轴线设置
	  			show: false,
	  			lineStyle: {		 		
	  				color: '#fff',
	  			}
	  		},
	  		axisTick: {  //轴刻度设置
	  			show: false,
	  		},
	  		nameTextStyle: {
	  			fontSize: 14,
	  		}
	  	},
	  	yAxis: [{
	  		show: false,
	  		type: '',
	  		axisLine: {
	  			show: false,
	  		},
	  		splitLine: {
	  			show: false,
	  		}
	  	}],
	  	series: [{        
	  			name: '停车场收费',
	  			type: 'bar',
	  			data: this.manage,
	  			barWidth: '12%',     //柱型宽度
			        itemStyle: {      //柱型圆角
			        	normal: {
			        		barBorderRadius: 10
			        	},
			        },
	  			cursor: 'pointer',
				label: {    //柱型上的数值提升
		            normal: {
		                show: true,
		                position: 'top',
		                formatter: '{c}'
		            }
		        }
	  		}
	  	]
	  };
  	myChart1.setOption(ption);
	var color1={       //圆环颜色( 长)
  		normal : {
        color: '#7FFFAA',
        label : {
                position : 'outside',
                formatter : function (params) {                         
                  return (params.percent - 0).toFixed(0) + '%'
                },
                textStyle: {
	                color:"#fff",
	                fontSize: 20,
	            }
            }
      	}
  	};
   	var color2={
  		normal : {
        color: 'rgba(255,255,255,0)',//圆环颜色( 短)
      	}
  	};
  	var pointOut ={
  		 normal : {
            label : {
                position : 'inside',
                formatter : function (params) {                         
                  return (params.percent - 0).toFixed(0) + '%'
                },
                 textStyle: {
	                baseline : 'top',
	                color:"#fff",
	                fontSize: 20,
	            }
            }          
        } 
  	}
  	var option2 = {
  		backgroundColor:'rgba(255,255,255,0.1)',
  		title: {
  		text: this.title2,
  		textStyle: {
  			color: 'rgba(255,255,255,0.7)',
  			fontSize: this.Rem,
  		},
  		top: '5'
  		},
		legend: {
			//orient: 'vertical',   //垂直
			data: ['月卡缴费率','报事销项率'],
			bottom: '0',
			//left:'0',
			itemWidth: 15,
			itemHeight: 8,
			textStyle: {
				color: '#fff',
				fontSize: 10,
				}
		},
    	//backgroundColor:['rgba(16, 44,71,0.4)'],
    	color: ['rgba(255,255,255,0)',"#45d3e4"],
	    tooltip : {
	        show: true,
	        formatter: "{a} <br/>{b}:{d}%",
	     	position:"right"
	    }, 
	    calculable : true,
    series : [
        {
            name:'数据类型',
            type:'pie',
            center : ['50%', '52%'],
            cursor: 'pointer',
            radius : "52%",
            clockwise: false,
            itemStyle : {          	                      
            },
            data:[
                {value:100-this.month_card, name:'未缴费率'},
                {value:this.month_card, name:'月卡缴费率',itemStyle:pointOut},
            ]},
        {
            name:'数据类型',
            type:'pie',
            center : ['50%',' 52%'],
            radius : ["65%", "75%"],
            clockwise: false,
            labelLine: {
				normal: {
					show: false,
					length: 0.8,
					length2: 8,
				}
			},
            data:[
                {value:100-this.satisfied, name:'不满意', itemStyle:color2},
                {value:this.satisfied, name:'报事销项率',itemStyle:color1},              
            ]
        }]
	};
	myChart2.setOption(option2);
   	var option3 = {
   		backgroundColor:'rgba(255,255,255,0.1)',
   	    title : {
        text: this.title3,
	        textStyle: {
	  			color: 'rgba(255,255,255,0.7)',
	  			fontSize: this.Rem,
	  				},
	  		top: '5'
			},
		tooltip : {
		    trigger: 'item',
		    formatter: "{b}:{c} <br/>占比:{d}%"
		},
		color:['#1b5f88','#2564b4','#94b9ff','#45d3e4'],
    	calculable : true,
    	series: [
        {
            name:'',
            type:'pie',
            center : ['50%', '55%'],
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'inner',
                    fontSize: 14,
                    textBorderColor:'#696969',
                    //textBorderWidth: 
                },
                emphasis: {
                    show: false,
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
			// 社区安全指标模块数量
            data:[
                {value:this.fire_protection, name:'消防报警'},
                {value:this.boundary, name:'周界防范报警'},
                {value:this.personnel, name:'人员报警'},
                {value:this.video, name:'视频报警'},
            ]
        },]
	};
	myChart3.setOption(option3);
	var labelTop = {
	    normal : {
	       color: '#45d3e4',
	        label : {
	            show : true,
	            position : 'center',
	            formatter : '{b}',
	            textStyle: {
	                baseline : 'bottom'
	            }
	        },
	        labelLine : {
	            show : false
	        }
	    }
	};
	var labelFromatter = {
	    normal : {
	        label : {
	            formatter : function (params){
	                return 100 - params.value + '%'
	            },
	            textStyle: {
	                baseline :'top',
	                color:"#fff",
	                fontSize: 18,
	            }
	        }
	    }
	}
	var labelBottom = {
	    normal : {
	        color: 'rgba(255,255,255,0)',
	        label : {
	            show : true,
	            position : 'center',
	           
	        },
	        labelLine : {
	            show : false
	        }
	    },
	};
	var radius = ["66%","75%"];
	var option4 = {
		backgroundColor:'rgba(255,255,255,0.1)',
	   	title: {
	  		text: this.title4,
	  		textStyle: {
	  			color: 'rgba(255,255,255,0.7)',
	  			fontSize: this.Rem,
	  			},
	  		top: '5'
	  		},
		tooltip : {
	    	show: true,
		    formatter: "{b}:{d}%",
		 	position:"top"
		},
	    series : [
	        {
	            type : 'pie',
	            center : ['50%', '50%'],
	            radius : radius,
	            x: '0%', // for funnel
	            itemStyle : labelFromatter,
	            clockwise: false,
	            data : [
	                {name:'未完成', value:100-this.environment, itemStyle : labelBottom},
	                {name:'环境工作完成率', value:this.environment,itemStyle : labelTop}
	            ]
	        }      
	    ]
	};
	myChart4.setOption(option4);
//圆圈参数配置-------------------------------------
	var labelquanl = {
	    normal : {
	        label : {
	            formatter : function (params){
	                return 100 - params.value + '%'
	            },
	            textStyle: {
	                baseline : 'top',
	                color:"#fff",
	                fontSize: 14,
	            }
	        }
	    }
	};
	var labelT= {
	    normal : {
	       color: '#7FFFAA',
	        label : {
	            show : true,
	            position : 'center',
	            formatter : '{b}',
	            textStyle: {
	                baseline : 'bottom'
	            }
	        },
	        labelLine : {
	            show : false
	        }
	    }
	};
	var labelB = {
	    normal : {
	        color: 'rgba(255,255,255,0)',
	        label : {
	            show : true,
	            position : 'center',          
	        },
	        labelLine : {
	            show : false
	        }
	    }
	 };
    var radius2 = ["28%", "33%"];
    var option6 = {
    	backgroundColor:'rgba(255,255,255,0.1)',
	    title: {
	  		text: this.title6,
	  		subtext:"单位：起/万平米·月",
	  		textStyle: {
	  			color: 'rgba(255,255,255,0.7)',
	  			fontSize: this.Rem,
	  		},
	  		top: '5'
	  		},
	  	color:['#45d3e4'],	
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        formatter: function (params) {
	            var tar = params[1];
	            return tar.name + '<br/>' + tar.seriesName + '  ' + tar.value+'%';
	        }
	    },
	    grid: {
	    	top:'30%',
	        left: '0%',
	        right: '2%',
	        bottom: '2%',
	      containLabel: true
	    },
	    xAxis: {
	        type : 'category',
	        splitLine: {show:false},
	        data : ['脱岗率','安防','工程','环境','客服'],
	        axisLine: {
				lineStyle: {
					color: '#fff',
				}
			},
			axisTick: {                //轴刻度设置
				show: false,
			},
			axisLabel: {
				fontSize: 12,
			},
			nameTextStyle: {
				fontSize: 12,
			}
	    },
	    yAxis: [ 
	        {
	        	show: false,
	            axisLine: {
	            	show: false,
	            },
	            splitLine: {
						show: false,
	            },
	         },     
	    ],
	    series: [
	        {
	            name: '辅助',
	            type: 'bar',
	            stack:  '总量',
	            itemStyle: {
	                normal: {
	                    barBorderColor: 'rgba(0,0,0,0)',
	                    color: 'rgba(0,0,0,0)'
	                },
	                emphasis: {
	                    barBorderColor: 'rgba(0,0,0,0)',
	                    color: 'rgba(0,0,0,0)'
	                }
	            },
	            data:this.Rate_of_detachment_over,         
	        },
	        {
	        name: '',
	        type: 'bar',
	        barWidth: '20%',
	        stack: '总量',
	         label: {
		        normal: {
		            show: true,
		            position: 'top',
		            formatter: '{c}'
		        }
		    },
	        data:this.Rate_of_detachment,
	        barCategoryGap: '10%',
	        barWidth: '10',                //柱型宽度
		        itemStyle: {               //柱型圆角
		        	normal: {
		        		barBorderRadius: 10
		        	},
		        }
	        },
	        {
	            type : 'pie',
	            center : ['78%', '20%'],
	            zlevel: 1,
	            radius : radius2,
	            x: '0%', // for funnel
	            itemStyle : labelquanl,
	            clockwise: false,
	            data : [
	                {name:'other', value:100-this.turn_out_for_work, itemStyle : labelB},
	                {name:'出勤率', value:this.turn_out_for_work,itemStyle : labelT}
	            ]
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
					myChart6.dispose();
				}else{       //返回重绘函数作为返回值返出去
					myChart1.resize();
					myChart2.resize();
					myChart3.resize();
					myChart4.resize();
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
	-moz-user-select:none;
	-webkit-user-select: none;       
	-ms-user-select: none;
}
/*标题样式*/
.title{
	width: 90%;
	height: 0.6rem;
	line-height: 0.8rem;
	text-align: center;
	font-size: 0.28rem;
	color: #fff;
}
/*显示数据*/
.data_div{
	width: 60%;
	height: 0.8rem;
	position: absolute;
	margin-left: 4%;
	top: 1rem;
	z-index: 99;
	flex: 1;	
}
.data_textDiv{
	height: 0.8rem;
	width: 30%;
	display: inline-block;
	text-align: center;
	p{
		color: rgba(225,255,255,0.7);
		margin-bottom: 0.1rem;
		font-size: 0.16rem;
	}
	span{
		font-size: 0.35rem;
		color: rgb(89,235,232);		
	}
	.project{
		color: #dafc4e;
		cursor: pointer;
	}
}
/*图表区域*/
.chart_div{
	width: 100%;
	height: 8.3rem;
	display: flex;
}
/*右边容器*/
.right_div{
	/*width: 5.34rem;*/
	flex: 1;
	height: 8.3rem;
	display: inline-block;
	overflow: hidden;		
}
.myChart1{
	width: 48%;
	height: 2.6rem;
	float: left;
	margin-right: 0.05rem;
	border: 0.01rem solid rgba(89,235,232,0.5);
	cursor: pointer;
	border-radius: 0.10rem;
}
.myChart3{
	width: 48%;
	height: 2.6rem;
	float: left;	
	//margin-right: 0.05rem;
	border: 0.01rem solid rgba(89,235,232,0.5);
	cursor: pointer;
	border-radius: 0.10rem;	
}
.myChart2{
	width: 48%;
	height: 2.6rem;	
	float: left;
	border: 0.01rem solid rgba(89,235,232,0.5);
	cursor: pointer;
	border-radius: 0.10rem;
	margin-top: 0.03rem;
	margin-right: 0.05rem;	
}
.myChart4{
	width: 48%;
	height: 2.6rem;
	float: left;
	margin-top: 0.03rem;
	border: 0.01rem solid rgba(89,235,232,0.5);
	cursor: pointer;
	border-radius: 0.10rem;
}
/*进度条*/
.myChart5{
	width: 48%;
	height: 2.6rem;	
	float: left;
	margin-top: 0.03rem;
	margin-right: 0.05rem;	
	border: 0.01rem solid rgba(89,235,232,0.5);
	background: rgba(255,255,255,0.1);
	cursor: pointer;
	border-radius: 0.10rem;
	.progress_bar{
		width: 92%;
		height: 100%;
		margin:0 auto;	
		span{
			font-size: 0.12rem;
			color: #fff;
			display: inline-block;
			margin-bottom: 1%;
			margin-top: 8%;
		}
		.title_progress{
			margin-top: 0.08rem;
			font-size: 0.16rem;
			color: #a3a5b3;
			margin-bottom: 0.08rem;
			font-weight: 700;
		}
		.progress_data{
			color: #fff;
			float: right;
		}		
	}		
}
.myChart6{
	width: 48%;
	height: 2.6rem;
	float: left;
	margin-top: 0.03rem;
	border: 0.01rem solid rgba(89,235,232,0.5);
	cursor: pointer;
	border-radius: 0.10rem;	
}
.tote{
	text-align: center;
	display: inline-block;
	position: absolute;
	width: 0.7rem;
	height: 0.3rem;
	color: #fff;
	right:6.8%;
	top: 19%;
	font-size: 0.24rem;
	i{
		color: #fff;
		font-size: 0.12rem;
	}
}
</style>
