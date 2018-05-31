<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">{{year}}中海物业集团广州分公司客服数据分析</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}</p>
				<span>{{data[0]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}</p>
				<span>{{data[1]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[2]}}</p>
				<span>{{data[2]}}</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[3]}}</p>
				<span>{{data[3]}}</span>
			</div>
		</div>
		<!--图表区域-->
		<div class="chart_div">
			<Mapvue></Mapvue>
			<div class="right_div">
				<div id="myChart1" class="myChart1"></div>
				<div id="myChart2" class="myChart2"></div>
				<div id="myChart3" class="myChart3"></div>
				<div id="myChart4" class="myChart4"></div>
			</div>
		</div>
		<!--<time-Select @my-year="getYear"></time-Select>-->
	</div>
</template>
<script>
import echarts from 'echarts'
import Mapvue from '@/components/manager_Map/M_customMap'
//import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/managerHomeNav'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      year: '2017年1月',
      title1: '停车场月卡缴费率前十',
      title2: '客户满意度前十',
      title3: '投诉统计前十',
      title4: '投诉销项率前十',
      title: ['停车场月卡缴费率', '客户满意度', '投诉统计', '投诉销项率'],
      data: ['99%', '98%', '34', '98%'],
      cityName1: ["深圳", "北京", "长春", "上海", "大连", "成都", "广州", "重庆", "西安", "佛山"],
      cityName2: ["深圳", "北京", "长春", "上海", "大连", "成都", "广州", "重庆", "西安", "佛山"],
      cityName3: ["深圳", "北京", "长春", "上海", "大连", "成都", "广州", "重庆", "西安", "佛山"],
      cityName4: ["深圳", "北京", "长春", "上海", "大连", "成都", "广州", "重庆", "西安", "佛山"],
      cityData1: [182, 234, 290, 104, 131, 630, 540, 341, 222, 432],
      cityData2: [182, 234, 290, 104, 131, 630, 540, 341, 222, 432],
      cityData3: [182, 234, 290, 104, 131, 630, 540, 341, 222, 432],
      cityData4: [182, 234, 290, 104, 131, 630, 540, 341, 222, 432],
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      route: 'M_custom', //向子组件传跳转路由
    }
  },
  components: {
    Mapvue,
    Homenav,
    //  timeSelect
  },
  computed: {
    ...mapState(['contentSize', 'cityName']),
  },
  mounted() {
    //初始化时读取数据
    this.getData()
  },
  destroyed() {
    //页面跳转时销毁
    this.isDispose = true;
    var _destroyMap = this.mapStatus;
    _destroyMap();
  },
  watch: {
    //页面变化时重绘
    contentSize: function(contentSize) {
      var _resizeMap = this.mapStatus;
      setTimeout(function() {
        _resizeMap();
      }, 800)
    }
  },
  methods: {
    getYear(year) {
      this.year = year;
    },
    getData() {
      if (this.isFirst) {
        //第一次获取数据进行实列化
        this.mapStatus = this.drawLine();
        this.isFirst = false;
      } else {
        // 否则进行重绘
        var _resizeMap = this.mapStatus;
        _resizeMap();
      }
    },
    drawLine() {
      var refThis = this;
      var myChart1 = echarts.init(document.getElementById('myChart1'));
      var myChart2 = echarts.init(document.getElementById('myChart2'));
      var myChart3 = echarts.init(document.getElementById('myChart3'));
      var myChart4 = echarts.init(document.getElementById('myChart4'));
      var color = 'rgba(30,144,255,0.7)';
      myChart1.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_custom"
        });
      });
      myChart2.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_custom"
        });
      });
      myChart3.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_custom"
        });
      });
      myChart4.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_custom"
        });
      });
      //右边4图形参数
      var option1 = {
        title: {
          text: this.title1,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
          },
          top: '15'
        },
        color: [color],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
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
          data: this.cityName1,
          axisTick: { //轴刻度
            show: false,
          },
          axisLine: { //y轴刻度线
            show: false,
          }
        },
        itemStyle: { //颜色渐变
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
        series: [{
          name: '2011年',
          type: 'bar',
          data: this.cityData1,
          barWidth: '7', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart1.setOption(option1);
      var option2 = {
        title: {
          text: this.title2,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
          },
          top: '15'
        },
        color: [color],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
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
        itemStyle: { //颜色渐变
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
        yAxis: {
          type: 'category',
          data: this.cityName2,
          axisTick: { //轴刻度
            show: false,
          },
          axisLine: { //y轴刻度线
            show: false,
          }
        },
        series: [{
          name: '2011年',
          type: 'bar',
          data: this.cityData2,
          barWidth: '7', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart2.setOption(option2);
      var option3 = {
        title: {
          text: this.title3,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
          },
          top: '15'
        },
        color: [color],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
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
        itemStyle: { //颜色渐变
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
        yAxis: {
          type: 'category',
          data: this.cityName3,
          axisTick: { //轴刻度
            show: false,
          },
          axisLine: { //y轴刻度线
            show: false,
          }
        },
        series: [{
          name: '2011年',
          type: 'bar',
          data: this.cityData3,
          barWidth: '7', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart3.setOption(option3);
      var option4 = {
        title: {
          text: this.title4,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
          },
          top: '15'
        },
        zoom: 1.25,
        color: [color],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
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
          axisTick: { //轴刻度
            show: false,
          },
          axisLine: { //y轴刻度线
            show: false,
          }
        },
        itemStyle: { //颜色渐变
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
        series: [{
          name: '2011年',
          type: 'bar',
          data: this.cityData4,
          barWidth: '7', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart4.setOption(option4);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart1.dispose();
          myChart2.dispose();
          myChart3.dispose();
          myChart4.dispose();
        } else { //重绘函数作为返回值返出去
          myChart1.resize();
          myChart2.resize();
          myChart3.resize();
          myChart4.resize();
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
	left: 5%;
	z-index: 99;
	margin: 0 auto;
	flex: 1;
}
.data_textDiv{
	height: 0.8rem;
	width: 20%;
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
/*图形1*/
.myChart1{
	width: 50%;
	height: 3.2rem;
	float: left;
	margin-top: 0.5rem;
}
/*图形2*/
.myChart2{
	width: 50%;
	height: 3.2rem;
	float: left;
	margin-top: 0.5rem;
}
/*图形3*/
.myChart3{
	width: 50%;;
	height: 2.8rem;
	float: left;
}
/*图形4*/
.myChart4{
	width: 50%;
	height: 2.8rem;
	float: left;
}

</style>
