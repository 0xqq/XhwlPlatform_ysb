<template>
<div>
  <Homenav :navData="route"></Homenav>
  <div class="div_top">
    <span class="span_left">今日实时</span>
    <div class="div_right">
      <!--<span>时间筛选:</span>
				<div class="select">
					<el-select v-model="value" placeholder="自然月" class="small_select">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="time_select">
					<el-date-picker v-model="value" type="daterange" placeholder="2017-09-15-2017-09-22"></el-date-picker>
				</div>-->
    </div>
  </div>
  <!--中间内容部分-->
  <div class="div_content">
    <ul class="content_ul">
      <li>
        <p>设备报事数(次)</p>
        <span>25</span>
      </li>
      <li>
        <p>设备报事未消项数</p>
        <span>1</span>
      </li>
      <li>
        <p>维修完成率</p>
        <span>96%</span>
      </li>
      <li>
        <p>巡检计划完成率</p>
        <span>100%</span>
      </li>
    </ul>
    <div class="content_left">
      <div class="letf_title">
        <span>工程投诉统计</span>
      </div>
      <dl class="left_ul">
        <dd>
          <p>投诉次数(次)</p>
          <span>8</span>
        </dd>
        <dd>
          <p>投诉未消项数</p>
          <span>0</span>
        </dd>
        <dd>
          <p>投诉消项率</p>
          <span>100%</span>
        </dd>
      </dl>
      <span class="title_tu">{{title_tu}}</span>
      <div id="myChart1" class="chart1"></div>
    </div>
    <div class="content_right">
      <div class="right_title">
        <span>能耗统计</span>
      </div>
      <div id="myChart2" class="chart2"></div>
    </div>
  </div>
  <!--底部 部分-->
  <div class="div_bottom">
    <span>{{year}}年{{month}}月{{day}}日中海华庭工程人员考勤</span>
  </div>
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
import Homenav from '@/components/common/projectHomeNav'
export default {
  data() {
    return {
      isDispose: false, //判断是否销毁
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      title_tu: '一般投诉',
      value: '',
      Data: [6, 0],
      title: ['已处理', '未处理'],
      S_data: [6, 0], //一般投诉
      C_data: [1, 0], //复杂投诉
      I_data: [1, 0], //重要投诉
      route: 'P_engineeringData', //向子组件传跳转路由
      options: [{
        value: '选项1',
        label: '自然年'
      }, {
        value: '选项2',
        label: '自然日'
      }],
      value: '',
      month: '',
      year: '',
      day: ''
    }
  },
  computed: {
    ...mapState(['contentSize']),
  },
  components: {
    Homenav,
  },
  mounted() {
    this.getTime();
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
    getTime() {
      var Time = new Date();
      this.year = Time.getFullYear();
      this.month = Time.getMonth() + 1;
      this.day = Time.getDate();
      if (Time.getDate() <= 9) {
        this.day = '0' + Time.getDate();
      }
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
      // 绘制图表
      var option1 = {
        tooltip: {
          show: true,
          formatter: "{b} <br/>{a}:{d}%",
          position: "right"
        },
        color: ['#00BFFF', '#00FFFF', '#ADD8E6'], //柱体颜色
        textStyle: {
          color: '#fff',
        },
        grid: {
          show: false,
          left: '66%',
          top: "20%",
          right: '10%',
          bottom: 'auto',
          width: '20%',
          height: '60%',
        },
        xAxis: {
          data: ["已处理", "未处理"],
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            fontSize: 14,
          }
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            }
          },
          splitLine: {
            show: false,
          }
        },
        series: [{
            name: '',
            type: 'bar',
            data: this.Data,
            barWidth: '13', //柱型宽度
            itemStyle: { //柱型圆角
              normal: {
                barBorderRadius: 10
              },
            }
          },
          {
            name: '占比',
            type: 'pie',
            radius: '68%',
            center: ['28%', '50%'],
            label: {
              normal: {
                show: true,
                position: 'inside',
              }
            },
            data: [{
                value: 1,
                name: '重要投诉'
              },
              {
                value: 1,
                name: '复杂投诉'
              },
              {
                value: 6,
                name: '一般投诉'
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      var option2 = {
        color: ['#00BFFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          data: ['总耗能', '照明电路', '电梯系统', '水泵', '消防', '门禁', '车场设备', '暖通设备'],
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            fontSize: 14,
          }
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            }
          },
          splitLine: {
            show: false,
          }
        },
        series: [{
            name: '辅助',
            type: 'bar',
            stack: '总量',
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
            data: [0, 291335, 216808, 145669, 128731, 101631, 60980, 0],
          },
          {
            name: '耗能',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top',
              }
            },
            data: [338761, 47426, 74527, 71139, 16938, 27100, 40651, 60980],
            barWidth: '13', //柱型宽度
            itemStyle: { //柱型圆角
              normal: {
                barBorderRadius: 10
              },
            }
          }
        ]
      };
      myChart1.on('click', function(params) {
        if (params.name == '一般投诉') {
          refThis.Data.splice(0, 2, refThis.S_data[0], refThis.S_data[1]);
          refThis.title_tu = params.name;
          myChart1.setOption(option1);
        } else if (params.name == '复杂投诉') {
          refThis.Data.splice(0, 2, refThis.C_data[0], refThis.C_data[1]);
          refThis.title_tu = params.name;
          myChart1.setOption(option1);
        } else {
          refThis.Data.splice(0, 2, refThis.I_data[0], refThis.I_data[1]);
          refThis.title_tu = params.name;
          myChart1.setOption(option1);
        }
      });
      myChart1.setOption(option1);
      myChart2.setOption(option2);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart2.dispose();
          myChart1.dispose();

        } else { //重绘函数作为返回值返出去
          myChart2.resize();
          myChart1.resize();
        }
      }
      return disposeMap
    }
  }
}
</script>

<style lang="scss" scoped>
/*顶部标题*/

.div_top {
	margin-top: 0.1rem;
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../../images/projck_nav.png);
	background-size: cover;
	.span_left {
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 1rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}


/*右边时间选择样式*/

.div_right {
	float: right;
	display: inline-block;
	width: 5rem;
	height: 0.58rem;
	line-height: 0.58rem;
	span {
		color: #70CCFC;
		font-size: 0.16rem;
	}
	.select {
		display:inline-block;
		vertical-align: top;
		width: 1.62rem;
		height: 0.38rem;
		border-radius: 0.05rem;
		background: rgba(255, 255, 255, 0);
		color: #FFF;
		margin-bottom: 0.06rem;
	}
	.time_select {
		vertical-align: middle;
		display: inline-block;
		margin-bottom: 0.06rem;
		width: 2.22rem;
		height: 0.6rem;
		margin-left: 0.1rem;
		border-radius: 0.05rem;
	}
}


/*中间内容部分*/

.div_content {
	width: 100%;
	height: 5.78rem;
	font-size: 0;
	.content_ul {
		height: 1.2rem;
		width: 100%;
		display: flex;
		li {
			flex: 1;
			height: 1.2rem;
			text-align: center;
			p {
				color: #fff;
				margin-top: 0.2rem;
				margin-bottom: 0.1rem;
			}
			span {
				color: #44d3e3;
				font-size: 0.34rem;
			}
		}
	}
	.content_left {
		margin-top: 0.08rem;
		width: 49.5%;
		height: 4.42rem;
		border-right: 0.01rem solid #70CCFC;
		display: inline-block;
		.letf_title {
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../../images/projack_snav.png);
			background-size: cover;
			span {
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.left_ul {
			height: 1rem;
			display: flex;
			dd {
				flex: 1;
				text-align: center;
				p {
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span {
					color: #44d3e3;
					font-size: 0.34rem;
				}
			}
		}
		.chart1 {
			width: 100%;
			height: 3rem;
		}
	}
	.content_right {
		margin-top: 0.08rem;
		width: 50%;
		height: 4.42rem;
		display: inline-block;
		vertical-align: top;
		.right_title {
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../../images/projack_snav.png);
			background-size: cover;
			span {
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.chart2 {
			width: 100%;
			height: 4rem;
			overflow: hidden;
		}
	}
}
.title_tu {
	display: inline-block;
	width: 1rem;
	height: 0.3rem;
	color: #fff;
	position: absolute;
	left: 44%;
	margin-top: 1.2%;
}
/*底部样式*/

.div_bottom {
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../../images/projck_nav.png);
	background-size: cover;
	span {
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 4rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}

.ul_bottom {
	width: 100%;
	height: 1.28rem;
	display: flex;
	li {
		flex: 1;
		height: 1.28rem;
		overflow: auto;
		text-align: center;
		p {
			color: darkgray;
			font-size: 0.16rem;
			margin-top: 0.2rem;
		}
		span {
			color: #70CCFC;
			font-size: 0.16rem;
		}
	}
}
</style>
