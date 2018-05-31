<template>
<div class="Odiv">
  <Homenav :navData="route"></Homenav>
  <p class="title">{{year}}中海物业集团广州分公司财务数据分析</p>
  <div class="data_div">
    <div class="data_textDiv">
      <p>{{Text[0]}}</p>
      <span>{{Data[0] | formatPrice}}</span>
    </div>
    <div class="data_textDiv">
      <p>{{Text[1]}}</p>
      <span>{{Data[1] | formatPrice}}</span>
    </div>
    <div class="data_textDiv">
      <p>{{Text[2]}}</p>
      <span>{{Data[2]}}</span>
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
import Mapvue from '@/components/manager_Map/M_financialMap'
import timeSelect from '@/components/common/timeSelect'
import Homenav from '@/components/common/managerHomeNav'
import homepageObj from '@/httpData/homepage.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      Text: ["停车场应收总额(万元)", "停车场实收总额(万元)", "停车场缴费率"],
      Data: [],
      year: '2017-9',
      cityName1: [],
      cityData1: [],
      cityName2: [],
      cityData2: [],
      cityName3: [],
      cityData3: [],
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      cat1: '停车场应收前十',
      cat2: '停车场实收前十',
      cat3: '停车场缴费率前十',
      route: 'M_financialData' //向子组件传跳转路由
    }
  },
  components: {
    Mapvue,
    Homenav,
    timeSelect
  },
  computed: {
    ...mapState(['contentSize']),
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
    }
  },
  methods: {
    getYear(year) {
      this.year = year
    },
    getData() {
      var data = homepageObj.content
      this.Data = data.finance.carData;
      this.cityName1 = data.finance.car.should.cityName;
      this.cityData1 = data.finance.car.should.data;
      this.cityName2 = data.finance.car.reality.cityName;
      this.cityData2 = data.finance.car.reality.data;
      this.cityName3 = data.finance.car.scale.cityName;
      this.cityData3 = data.finance.car.scale.data;
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
    Property() {
      this.$router.push({
        path: 'M_financialDataProperty'
      });
    },
    drawLine() {
      var refThis = this;
      var myChart1 = echarts.init(document.getElementById('myChart1'));
      var myChart2 = echarts.init(document.getElementById('myChart2'));
      var myChart3 = echarts.init(document.getElementById('myChart3'));
      var color = 'rgba(0,191,255,0.6)';
      //城市级的跳转
      myChart1.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_financialData"
        });
      });
      myChart2.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_financialData"
        });
      });
      myChart3.on('click', function(params) {
        refThis.$store.commit('CHANGE_CITY', {
          cityName: params.name
        });
        refThis.$router.push({
          path: "C_financialData"
        });
      });
      //右边三图形参数
      var option1 = {
        color: [color],
        title: {
          text: this.cat1,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
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
        xAxis: [{
          type: 'category',
          data: this.cityName1,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#000',
              width: 0,
            }
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
          name: '直接访问',
          type: 'bar',
          barWidth: '50%',
          data: this.cityData1,
          barWidth: '13', //柱型宽度
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
        xAxis: [{
          type: 'category',
          data: this.cityName2,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
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
          name: '直接访问',
          type: 'bar',
          barWidth: '50%',
          data: this.cityData2,
          barWidth: '13', //柱型宽度
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.cityName3,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
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
          name: '直接访问',
          type: 'bar',
          barWidth: '50%',
          data: this.cityData3,
          barWidth: '13', //柱型宽度
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
	width: 90%;
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
	height: 2.6rem;
}
.myChart2{
	width: 100%;
	height: 2.6rem;
}
.myChart3{
	width: 100%;
	height: 2.6rem;
}
</style>
