<template>
<div>
  <Bread :breadData="ab"></Bread>
  <div class="div_top">
    <span class="span_right">今日实时</span>
    <div class="div_left">
      <span>时间筛选:</span>
      <select class="select">
		            <option class="select_option" value="A">自然日</option>
		            <option value="B">自然年</option>
		            <option value="C">自然月</option>
	            </select>
      <div class="time_select">
        <el-date-picker v-model="value" type="daterange" placeholder="2017-09-15-2017-09-22"></el-date-picker>
      </div>
    </div>
  </div>
  <!--中间内容部分-->
  <div class="div_content">
    <ul class="content_ul">
      <li>
        <p>环境工作完成率</p>
        <span>100%</span>
        <div id="myChart" class="myChart"></div>
      </li>
      <li>
        <p>生活水质指数</p>
        <span>12</span>
        <p>PH值</p>
        <span>6.8<i>(国标:6.5~8.5)</i></span>
        <p>余氯</p>
        <span>0.29<sub>mg/L</sub><i>(国标:>0.25mg/L)</i></span>
      </li>
      <li>
        <p>泳池水质指数</p>
        <span>27</span>
        <p>PH值</p>
        <span>7.2<i>(国标:6.5~8.5)</i></span>
        <p>余氯</p>
        <span>0.3<sub>mg/L</sub><i>(国标:>0.25mg/L)</i></span>
      </li>
      <li>
        <p>景观水质指数</p>
        <span>32</span>
        <p>PH值</p>
        <span>7<i>(国标:6.5~8.5)</i></span>
        <p>余氯</p>
        <span>0.28<sub>mg/L</sub><i>(国标:>0.25mg/L)</i></span>
      </li>
      <li>
        <p>空气质量指数</p>
        <span>15</span>
        <div class="moving_bar">
          <span><sub>PM2.5</sub>8<sub>ug/m<sup>2</sup></sub></span>
          <div class="triangle"></div>
          <p class="_bar"></p>
          <span><sub>PM10</sub>28<sub>ug/m<sup>3</sup></sub></span>
          <div class="triangle1"></div>
          <p class="_bar"></p>
          <span><sub>温度</sub>28<sub>°C</sub></span>
          <div class="triangle2"></div>
          <p class="_bar2"></p>
          <span><sub>湿度</sub>65<sub>%HR</sub></span>
          <div class="triangle3"></div>
          <p class="_bar2"></p>
        </div>
      </li>
    </ul>
  </div>
  <!--底部 部分-->
  <div class="div_bottom"><span>2017年6月中海华庭财务人员考勤</span></div>
  <ul class="ul_bottom">
    <li>
      <p>迟到早退人员</p>
      <span>无</span>
    </li>
    <li>
      <p>缺勤人员</p>
      <span>无</span>
    </li>
    <li>
      <p>请假人员</p>
      <span>无</span>
    </li>
  </ul>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import echarts from 'echarts'
import Bread from '@/components/common/bread'
export default {
  data() {
    return {
      ab: ['业务应用', '环境业务应用'],
      value: '',
      isDispose: false, //判断是否销毁
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      route: 'P_environment', //向子组件传跳转路由
    }
  },
  computed: {
    ...mapState(['contentSize']),
  },
  components: {
    Bread
  },
  mounted() {
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
      }, 400)
    }
  },
  methods: {
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
      var myChart = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      var pointOut = {
        normal: {
          label: {
            position: 'inner',
            formatter: function(params) {
              return (params.percent - 0).toFixed(0) + '%'
            },
            textStyle: {
              baseline: 'top',
              color: "#fff",
              fontSize: 25,
            }
          },
          labelLine: {
            show: false
          }
        }
      }
      var option = {
        title: {
          text: this.title2,
          textStyle: {
            color: '#fff',
          },
          top: '5'
        },
        color: ['rgba(255,255,255,0)', "#45d3e4"],
        tooltip: {
          show: true,
          formatter: "{a} <br/>{b}:{d}%",
          position: "right"
        },
        calculable: true,
        series: [{
          name: '数据类型',
          type: 'pie',
          center: ['50%', '50%'],
          cursor: 'pointer',
          radius: "82%",
          clockwise: false, //逆时针
          data: [{
              value: 0,
              name: '未缴费率'
            },
            {
              value: 100,
              name: '环境工作完成率',
              itemStyle: pointOut
            },
          ]
        }]
      };
      myChart.setOption(option);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart.dispose();
        } else { //重绘函数作为返回值返出去
          myChart.resize();
        }
      }
      return disposeMap
    }
  },
}
</script>

<style lang="scss" scoped>
/*顶部标题*/
.div_top{
	margin-top: 0.1rem;
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../images/projck_nav.png);
	background-size: cover;
	.span_right{
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 1rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}
/*右边时间选择部分*/
.div_left{
	float: right;
	display: inline-block;
	width: 5rem;
	height:0.58rem;
	line-height: 0.58rem;
	span{
		color: #70CCFC;
		font-size: 0.16rem;
	}
	.select{
		vertical-align: middle;
		width: 1.62rem;
		height: 0.38rem;
		border: 0.02rem solid #70CCFC;
		border-radius: 0.05rem;
		background: rgba(255,255,255,0);
		color: #FFF;
		margin-bottom: 0.06rem;
	}
	.time_select{
		vertical-align: middle;
		display: inline-block;
		margin-bottom: 0.06rem;
		width: 2.22rem;
		height: 0.6rem;
		margin-left: 0.1rem ;
		border-radius: 0.05rem;
	}
}
/*中间内容部分*/
.div_content{
	width: 100%;
	height: 5.78rem;
	display: flex;
	.content_ul{
		width: 100%;
		height: 100%;
		display:flex;
		li{
			flex:1;
			text-align: center;
			border-right: 0.01rem solid darkgray;
			span{
				display: inline-block;
				width: 100%;
				height: 1.3rem;
				font-size: 0.32rem;
				sub{
					font-size: 0.15rem;
				}
				i{
					color: darkgray;
					display: block;
				}
			}
			p{
				margin-top: 0.3rem;
			}
			.myChart{
				width: 100%;
				height: 2.6rem;
			}
			.moving_bar{
				width: 2.5rem;
				height: 3.5rem;
				margin: 0 auto;
				span{
					display: block;
					height: 0.23rem;
				}
				._bar{
					width: 100%;
					height: 0.15rem;
					background: -webkit-linear-gradient(left, red ,	#FFA500,#7CFC00); /* Safari 5.1 - 6.0 */
				    background: -o-linear-gradient(right,red,#FFA500,#7CFC00); /* Opera 11.1 - 12.0 */
				    background: -moz-linear-gradient(right,red,#FFA500, #7CFC00); /* Firefox 3.6 - 15 */
				    background: linear-gradient(to right, red,#FFA500, #7CFC00); /* 标准的语法（必须放在最后） */
				}
				._bar2{
					width: 100%;
					height: 0.15rem;
					background: -webkit-linear-gradient(left, red ,blue ); /* Safari 5.1 - 6.0 */
				    background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
				    background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
				    background: linear-gradient(to right, red , blue); /* 标准的语法（必须放在最后） */
				}
			}

		}
		li:nth-of-type(5){
			border-right: 0;
		}
	}

}
.triangle{
	height:0rem;
	width: 0rem;
	border: 0.1rem solid blue;
	border-bottom: 0.1rem solid transparent;
	border-left: 0.1rem solid transparent;
	border-right: 0.1rem solid transparent;
	position: absolute;
	right: 6.5%;
	bottom: 62%;
}
.triangle1{
	height:0rem;
	width: 0rem;
	border: 0.1rem solid blue;
	border-bottom: 0.1rem solid transparent;
	border-left: 0.1rem solid transparent;
	border-right: 0.1rem solid transparent;
	position: absolute;
	right: 10%;
	bottom: 43.2%;
}
.triangle2{
	height:0rem;
	width: 0rem;
	border: 0.1rem solid blue;
	border-bottom: 0.1rem solid transparent;
	border-left: 0.1rem solid transparent;
	border-right: 0.1rem solid transparent;
	position: absolute;
	right: 8%;
	bottom: 55.7%;
}
.triangle3{
	height:0rem;
	width: 0rem;
	border: 0.1rem solid blue;
	border-bottom: 0.1rem solid transparent;
	border-left: 0.1rem solid transparent;
	border-right: 0.1rem solid transparent;
	position: absolute;
	right: 11%;
	bottom: 49.5%;
}

/*底部样式*/
.div_bottom{
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../images/projck_nav.png);
	background-size: cover;
	span{
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 4rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}
.ul_bottom{
	width: 100%;
	height: 1.28rem;
	display: flex;
	li{
		flex: 1;
		height: 1.28rem;
		overflow: auto;
		text-align: center;
		p{
			color:darkgray;
			font-size: 0.16rem;
			margin-top: 0.2rem;
		}
		span{
			color: #70CCFC;
			font-size: 0.16rem;
		}
	}
}
</style>
