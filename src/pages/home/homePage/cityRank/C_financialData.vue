<template>
<div class="Odiv">
  <Homenav :navData="route"></Homenav>
  <p class="title">{{this.yearNow}}年{{this.monthNow}}月中海物业集团深圳市财务数据分析</p>
  <div class="data_div">
    <div class="data_textDiv">
      <p>{{Text[0]}}</p>
      <span>{{data1 | formatPrice}}</span>
    </div>
    <div class="data_textDiv">
      <p>{{Text[1]}}</p>
      <span>{{data2 | formatPrice}}</span>
    </div>
    <div class="data_textDiv">
      <p>{{Text[2]}}</p>
      <span>{{data3 | formatPrice}}%</span>
    </div>
  </div>
  <div class="chart_div">
    <Mapvue></Mapvue>
    <div class="right_div">
      <div id="myChart1" class="myChart1"></div>
      <div id="myChart2" class="myChart2"></div>
      <div id="myChart3" class="myChart3"></div>
    </div>
  </div>
  <time-Select @my-year="getYear"></time-Select>
</div>
</template>
<script>
import echarts from 'echarts'
import Mapvue from '@/components/city_May/C_financialMap'
import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/cityHomeNav'
import financialObj from '@/httpData/C_financialData.js'
import {
  mapState
} from 'vuex'
import $ from 'jquery'
export default {
  data() {
    return {
      Text: ["停车场应收总额(万元)", "停车场实收总额(万元)", "停车场缴费率"],
      Data: [],
      yearNow: '2017',
      monthNow: '9',
      year: '2017-9',
      content: null,
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      data1: '',
      data2: '',
      data3: '',
      cityName1: [],
      cityData1: [],
      cityName2: [],
      cityData2: [],
      cityName3: [],
      cityData3: [],
      cat1: '停车场应收前十',
      cat2: '停车场实收前十',
      cat3: '停车场缴费率前十',
      route: 'C_financialData' //向子组件传跳转路由
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
    //初始化时获取数据
    this.getData();
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
          this.data1 = this.content[i].停车场应收总额;
          this.data2 = this.content[i].停车场实收总额;
          this.data3 = parseInt(this.content[i].停车场收缴率)
        }
      };
      for (var i = 0; i < this.content.length; i++) {
        var finalDate = new Date(this.content[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          var cityName1 = this.content[i].停车场应收前十;
          var cityName2 = this.content[i].停车场实收前十;
          var cityName3 = this.content[i].停车场收缴率前十;
          for (var i = 0; i < cityName1.length; i++) {
            this.cityName1[i] = cityName1[i].项目;
            this.cityData1[i] = cityName1[i].数值;
            this.cityName2[i] = cityName2[i].项目;
            this.cityData2[i] = cityName2[i].数值;
            this.cityName3[i] = cityName3[i].项目;
            this.cityData3[i] = cityName3[i].数值;
            this.isFirst = false;
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
      this.content = financialObj.content
      var value = this.content
      for (var i = 0; i < value.length; i++) {
        var finalDate = new Date(value[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          var cityName1 = value[i].停车场应收前十;
          var cityName2 = value[i].停车场实收前十;
          var cityName3 = value[i].停车场收缴率前十;
          for (var i = 0; i < cityName1.length; i++) {
            this.cityName1[i] = cityName1[i].项目;
            this.cityData1[i] = cityName1[i].数值;
            this.cityName2[i] = cityName2[i].项目;
            this.cityData2[i] = cityName2[i].数值;
            this.cityName3[i] = cityName3[i].项目;
            this.cityData3[i] = cityName3[i].数值;
          }
        }
      };
      for (var i = 0; i < value.length; i++) {
        var finalDate = new Date(value[i].日期);
        var year = finalDate.getFullYear();
        var month = finalDate.getMonth() + 1;
        var timeNow = year + '-' + month;
        if (timeNow == this.year) {
          this.data1 = value[i].停车场应收总额;
          this.data2 = value[i].停车场实收总额;
          this.data3 = parseInt(value[i].停车场收缴率);
        }
      };
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
      var color = 'rgba(0,191,255,0.6)';
      //右边三图形参数
      var option1 = {
        color: [color],
        title: {
          text: this.cat1,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
          },
          top: '10%',
          left: '10%',
        },
        textStyle: {
          color: '#fff',
        },
        //		    tooltip : {
        //		    	formatter:'{b}',
        //		        trigger: 'axis',
        //		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //		        }
        //		    },
        xAxis: [{
          type: 'category',
          data: this.cityName1,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: { //刻度标题倾斜角度
            interval: 0,
            rotate: -30
          },
        }],
        yAxis: [{
          show: false,
          type: 'value',
          axisTick: {
            show: false,
          },
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
          barWidth: '50%',
          data: this.cityData1, //数据放置处
          barWidth: '25%', //柱型宽度
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
          text: this.cat2,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
          },
          top: '10%',
          left: '10%',
        },
        textStyle: {
          color: '#fff',
        },
        //		    tooltip : {
        //		    	formatter:'{b}',
        //		        trigger: 'axis',
        //		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //		        }
        //		    },
        xAxis: [{
          type: 'category',
          data: this.cityName2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: -30
          }
        }],
        yAxis: [{
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          }
        }],
        itemStyle: {
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
          barWidth: '50%',
          data: this.cityData2,
          barWidth: '25%', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart2.setOption(option2);
      var option3 = {
        color: [color],
        title: {
          text: this.cat3,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
          },
          top: '10%',
          left: '10%',
        },
        textStyle: {
          color: '#fff',
        },
        //		    tooltip : {
        //		    	formatter:'{b}',
        //		        trigger: 'axis',
        //		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //		        }
        //		    },
        xAxis: [{
          type: 'category',
          data: this.cityName3,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: -30
          },
        }],
        yAxis: [{
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          }
        }],
        itemStyle: {
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
          barWidth: '50%',
          data: this.cityData3,
          barWidth: '25%', //柱型宽度
          itemStyle: { //柱型圆角
            normal: {
              barBorderRadius: 10
            },
          }
        }]
      };
      myChart3.setOption(option3);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart1.dispose();
          myChart2.dispose();
          myChart3.dispose();
        } else {
          myChart1.resize();
          myChart2.resize();
          myChart3.resize();
          myChart1.setOption(option1);
          myChart2.setOption(option2);
          myChart3.setOption(option3);
        }
      }
      return disposeMap
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
	width: 60%;
	height: 0.8rem;
	position: absolute;
	top: 1.2rem;
	z-index: 99;
	flex: 1;
	left: 16%;
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
.myChart1{
	width: 100%;
	height: 2.5rem;
}
.myChart2{
	width: 100%;
	height: 2.5rem;
}
.myChart3{
	width: 100%;
	height: 2.6rem;
}
</style>
