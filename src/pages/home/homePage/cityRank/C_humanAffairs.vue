<template>
	<div class="Odiv">
		<Homenav :navData="route"></Homenav>
		<p class="title">{{this.yearNow}}年{{this.monthNow}}月中海物业集团深圳市人事数据分析</p>
		<div class="data_div">
			<div class="data_textDiv">
				<p>{{title[0]}}</p>
				<span>{{data1}}%</span>
			</div>
			<div class="data_textDiv">
				<p>{{title[1]}}</p>
				<span>{{data2}}%</span>
			</div>
		</div>
		<div class="chart_div">
			<Mapvue v-if="$route.path.indexOf('humanAffairs')"></Mapvue>
			<div class="right_div">
				<div id="myChart1" class="myChart1"></div>
				<div id="myChart2" class="myChart2"></div>
			</div>
		</div>
		<time-Select @my-year="getYear"></time-Select>
	</div>

</template>

<script>
import echarts from 'echarts'
import Mapvue from '@/components/city_May/C_humanAffairsMap'
import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/cityHomeNav'
import humanAffairsObj from '@/httpData/C_humanAffairs.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      content: null,
      data1: '',
      data2: '',
      year: '2017-9',
      yearNow: '2017',
      monthNow: '9',
      title: ['重点岗位脱岗率', '出勤率'],
      cityName1: [],
      cityName2: [],
      cityData1: [],
      cityData2: [],
      title1: '重点岗位脱岗率前十',
      title2: '出勤率前十',
      route: 'C_humanAffairs' //向子组件传跳转路由
    }
  },
  components: {
    Mapvue,
    Homenav,
    timeSelect
  },
  computed: {
    ...mapState(['contentSize', 'cityName', 'mnUrl']),
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
      }, 1000)
    },
    year: function() {
      for (var i = 0; i < this.content.length; i++) {
        var tmpDate = this.content[i].日期;
        var finalDate = new Date(this.content[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          this.data1 = this.content[i].重点岗位脱岗率;
          this.data2 = this.content[i].出勤率;
        }
      };
      for (var i = 0; i < this.content.length; i++) {
        var finalDate = new Date(this.content[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          var cityName1 = this.content[i].重点岗位脱岗率前十;
          var cityName2 = this.content[i].出勤率前十;
          for (var i = 0; i < cityName1.length; i++) {
            this.cityName1[i] = cityName1[i].项目;
            this.cityData1[i] = cityName1[i].数值;
            this.cityName2[i] = cityName2[i].项目;
            this.cityData2[i] = cityName2[i].数值;
          }
        }
      };
      if (this.isFirst) {
        //第一次获取数值进行实列化
        this.mapStatus = this.drawLine();
        this.isFirst = false;
      } else {
        // 否则进行重绘
        var _resizeMap = this.mapStatus;
        _resizeMap();
      }
    }
  },
  methods: {
    getYear(year) {
      this.year = year;
      this.yearNow = this.year.substring(0, 4);
      this.monthNow = this.year.substring(5, 7);
    },
    getData() {
      this.content = humanAffairsObj.content
      var value = this.content
      for (var i = 0; i < value.length; i++) {
        var finalDate = new Date(value[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          this.data1 = value[i].重点岗位脱岗率;
          this.data2 = value[i].出勤率;
        }
      };
      for (var i = 0; i < value.length; i++) {
        var finalDate = new Date(value[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          var cityName1 = value[i].重点岗位脱岗率前十;
          var cityName2 = value[i].出勤率前十;
          for (var i = 0; i < cityName1.length; i++) {
            this.cityName1[i] = cityName1[i].项目;
            this.cityData1[i] = cityName1[i].数值;
            this.cityName2[i] = cityName2[i].项目;
            this.cityData2[i] = cityName2[i].数值;
          }
        }
      }
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
      var color = 'rgba(0,191,255,0.6)';
      //右边三图形参数
      var option1 = {
        color: [color],
        title: {
          text: this.title1,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
          },
          top: '10'
        },
        textStyle: {
          color: '#fff',
        },
        // 	tooltip: {
        // 		trigger: 'axis',
        // 		axisPointer: { // 坐标轴指示器，坐标轴触发有效
        // 			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        // 		}
        // 	},
        grid: { //图形在画布中的位置
          left: '3%',
          right: '4%',
          bottom: '13%',
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
          },
          axisLabel: { //刻度标题倾斜角度
            interval: 0,
            rotate: -30
          },
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        }],
        itemStyle: { //颜色渐变
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
          name: '数值',
          type: 'bar',
          data: this.cityData1,
          barWidth: '20%', //柱型宽度
          itemStyle: { //柱型圆角
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
            fontSize: 16,
          },
          top: '10'
        },
        textStyle: {
          color: '#fff',
        },
        //  tooltip : {
        //      trigger: 'axis',
        //      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //      }
        //  },
        grid: { //图形在画布中的位置
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.cityName2,
          axisTick: {
            show: false,
            alignWithLabel: false
          },
          axisLine: {
            show: false,
          },
          axisLabel: { //刻度标题倾斜角度
            interval: 0,
            rotate: -30
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
        itemStyle: { //颜色渐变
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
          name: '数值',
          type: 'bar',
          data: this.cityData2,
          barWidth: '20%', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart2.setOption(option2);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart1.dispose();
          myChart2.dispose();
        } else {
          myChart1.setOption(option1);
          myChart2.setOption(option2);
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
	width: 100%;
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
