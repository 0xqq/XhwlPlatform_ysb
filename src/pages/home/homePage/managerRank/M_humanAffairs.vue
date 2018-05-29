<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">{{year}}中海物业集团广州分公司人事数据分析</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}</p>
				<span>{{data[0]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}</p>
				<span>{{data[1]}}</span>
			</div>
		</div>
		<div class="chart_div">
			<Mapvue v-if="$route.path.indexOf('humanAffairs')"></Mapvue>
			<div class="right_div">
				<div id="myChart1" class="myChart1"></div>
				<div id="myChart2" class="myChart2"></div>	
			</div>
		</div>
		<!--<time-Select @my-year="getYear"></time-Select>-->		
	</div>
	
</template>

<script>
import echarts from 'echarts'
import Mapvue from '@/components/manager_Map/M_humanAffairsMap'
//import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/managerHomeNav'
import {mapState} from 'vuex'
export default {
  data () {
	    return {
	    	year:'2017年1月',
			title1:'重点岗位脱岗率前十',
			title2:'出勤率前十',
			title:['重点岗位脱岗率','出勤率'],
	    	data:['9%','98%'],
	    	cityName1:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityName2:["深圳","北京","长春","上海","大连","成都","广州","重庆","西安","佛山"],
			cityData1:[100, 82, 70, 64, 50, 40, 30,20,10,8],
			cityData2:[100, 82, 70, 64, 50, 40, 30,20,10,8],
			isDispose:false,
			mapStatus:null,  //图表返回函数状态
			isFirst: true,
			route:'M_humanAffairs'     //向子组件传跳转路由
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
			},800)			
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
	drawLine() {
		var  refThis = this;
		var myChart1 = echarts.init(document.getElementById('myChart1'));
		var myChart2 = echarts.init(document.getElementById('myChart2'));
		var color = 'rgba(0,191,255,0.6)';
		myChart1.on('click', function (params) {
		 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
		 	refThis.$router.push({path:"C_humanAffairs"});			 	
                });
        myChart2.on('click', function (params) {
		 	refThis.$store.commit('CHANGE_CITY',{cityName:params.name});
		 	refThis.$router.push({path:"C_humanAffairs"});			 	
               });
//右边三图形参数
   var option1 = {
   	color: [color],
   	title: {
   		text: this.title1,
   		textStyle: {
   			color: 'rgba(255,255,255,0.7)',
   		},
   		top: '10'
   	},
   	textStyle: {
   		color: '#fff',
   	},
   	tooltip: {
   		trigger: 'axis',
   		axisPointer: { // 坐标轴指示器，坐标轴触发有效
   			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
   		}
   	},
   	grid: {
   		left: '0%',
   		right: '0%',
   		bottom: '3%',
   		containLabel: true
   	},
   	xAxis: [{
   		type: 'category',
   		data: this.cityName1,
   		axisTick: { //轴刻度
   			show: false,
   		},
   		axisLine: { //y轴刻度线
   			show: false,
   		}
   	}],
   	yAxis: [{
   		type: 'value',
   		axisLine: {
   			show: false,
   		},
   		splitLine: {
   			show: false,
   		}
   	}],
 	itemStyle: {   //颜色渐变
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
   	series: [{
   		name: '直接访问',
   		type: 'bar',
   		barWidth: '50%',
   		data: this.cityData1,
   		barWidth: '13',     //柱型宽度
        itemStyle: {      //柱型圆角
        	normal: {
        		barBorderRadius: 10
        	},
        }
   	}]
   };
   myChart1.setOption(option1);
   var option2 = {
   		color: [color],
    title: {
    	text: this.title2,
    	textStyle: {
			color: 'rgba(255,255,255,0.7)',
			},
		top: '10'
    },
    textStyle:{
        	color: '#fff',
        },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : this.cityName2,
             axisTick: {
            	show:false,
                alignWithLabel: false
            },
            axisLine: {
				show: false,
			}
        }
    ],
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
    itemStyle: {   //颜色渐变
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
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '50%',
            data:this.cityData2,
            barWidth: '13',     //柱型宽度
        	itemStyle: {      //柱型圆角
        	normal: {
        		barBorderRadius: 10
        	},
        }
        }
    ]
};
myChart2.setOption(option2);
function disposeMap() { //销毁函数作为返回值返出去
	if(refThis.isDispose){
		myChart1.dispose();
		myChart2.dispose();				
	}else{
		myChart1.resize();
		myChart2.resize();				
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
	width: 40%;
	height: 0.8rem;
	position: absolute;
	top: 1.2rem;
	left: 20%;
	z-index: 99;
	margin: 0 auto;
	flex: 1;
}
.data_textDiv{
	height: 0.8rem;
	width: 40%;
	display: inline-block;
	text-align: center;
	p{
		color: rgba(225,255,255,0.7);
		font-size: 0.16rem;
	}
	span{
		color: rgb(89,235,232);
		font-size: 0.38rem;
	}
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
	width: 100%;
	height: 3rem;
	margin-top: 0.4rem;
}
.myChart2{
	width: 100%;
	height: 3rem;		
}

</style>