<template>
<div>
  <Homenav :navData="route"></Homenav>
  <div class="div_top">
    <span class="span_left">今日实时</span>

    <div class="div_right">
      <!--<span>时间筛选:</span>
				<div class="select">
					<el-select v-model="value" placeholder="自然月"  class="select_text">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>-->
      <!--<div class="time_select">
					<el-date-picker v-model="value" type="daterange" placeholder="2017-09-15-2017-09-22"></el-date-picker>
				</div>-->
    </div>
  </div>
  <div class="div_content">
    <dl class="content_dl">
      <dd>
        <ul>
          <li>
            <p>安防报警未销项数</p>
            <span>{{data1}}</span>
          </li>
        </ul>
        <ul>
          <li>
            <p>安防报警销项率</p>
            <span>96%</span>
          </li>
        </ul>
        <!--<span class="tote">安防报警 <br />
						<i>{{data3}}起</i>
					</span>-->
        <div id="myChart1" class="myChart1"></div>
      </dd>
      <dd>
        <ul>
          <li>
            <p>停车总位数(个)</p>
            <span>{{data8}}</span>
          </li>
          <li>
            <p>车辆入场流量(次)</p>
            <span>{{data9}}</span>
          </li>
        </ul>
        <ul>
          <li>
            <p>剩余车位(个)</p>
            <span>{{data10}}</span>
          </li>
          <li>
            <p>高峰时段</p>
            <span>{{data11}}</span>
          </li>
        </ul>
        <div id="myChart2" class="myChart2"></div>
      </dd>
      <dd>
        <ul>
          <li>
            <p>业主入流量(次)</p>
            <span>885</span>
          </li>
          <li>
            <p>访客入流量(次)</p>
            <span>220</span>
          </li>
        </ul>
        <ul>
          <li>
            <p>当前滞留人数(20)</p>
            <span>120</span>
          </li>
          <li>
            <p>异常开门(次)</p>
            <span>2</span>
          </li>
        </ul>
        <div id="myChart3" class="myChart3"></div>
      </dd>
    </dl>

  </div>
  <div class="div_bottom">
    <span>{{year}}年{{month}}月{{day}}日中海华庭安防人员考勤</span>
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
import echarts from "echarts"
import Homenav from '@/components/common/projectHomeNav'
import secureObj from '@/httpData/P_secureEnvironment.js'
export default {
  data() {
    return {
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      value: '',
      route: 'P_secureEnvironment', //向子组件传跳转路由
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
      day: '',
      data1: '',
      data2: '',
      data3: '',
      data4: '',
      data5: '',
      data6: '',
      data7: '',
      data8: '',
      data9: '',
      data10: '',
      data11: '',
      data12: '',
      data13: '',
      data14: '',
      data15: '',
      data16: '',
    }
  },
  components: {
    Homenav
  },
  computed: {
    ...mapState(['contentSize']),
  },
  mounted() {
    //初始化时获取数据
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
      }, 500)
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
      var value = secureObj.content
      this.data1 = value['安防报警未消项数'];
      this.data2 = value['安防报警销项率'];
      this.data3 = value['安防报警数'];
      this.data4 = value['消防报警数'];
      this.data5 = value['视频报警数'];
      this.data6 = value['周界防范报警数'];
      this.data7 = value['人员报警数'];
      this.data8 = value['停车位总数（个）'];
      this.data9 = value['车辆入流量'];
      this.data10 = value['剩余车位'];
      this.data11 = value['高峰时段'];
      this.data12 = value['月卡车放行'];
      this.data13 = value['免费时间段放行'];
      this.data14 = value['收费已满放行'];
      this.data15 = value['软件放行'];
      this.data16 = value['手动开闸放行'];
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
      // 绘制图表
      var option1 = {
        title: {
          text: '安防报警数',
          subtext: this.data3 + '起',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}:{c}"
        },
        color: ['#1b5f88', '#295162', '#fbf320', '#45d3e4'],
        calculable: true,
        series: [{
            name: '',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                fontSize: 14,
                textBorderColor: '#696969',
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
            data: [{
                value: this.data4,
                name: '消防报警'
              },
              {
                value: this.data6,
                name: '周界防范报警'
              },
              {
                value: this.data7,
                name: '人员报警'
              },
              {
                value: this.data5,
                name: '视频报警'
              },
            ]
          },

        ]
      };
      myChart1.setOption(option1);
      myChart2.setOption({
        //color:['#00BFFF','#00FFFF','#708090','#ADD8E6'], //柱体颜色
        color: ['#fbf320', '#1b5f88', '#295162', '#45d3e4', '#708090'],
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return (params.percent - 0).toFixed(0) + '%'
          }
        },
        series: [{
          name: '数据',
          type: 'pie',
          radius: '72%',
          center: ['50%', '50%'],
          data: [{
              value: this.data16,
              name: '手动开闸放行'
            },
            {
              value: this.data13,
              name: '免费时间段放行'
            },
            {
              value: this.data15,
              name: '软件放行'
            },
            {
              value: this.data12,
              name: '月卡车放行'
            },
            {
              value: this.data14,
              name: '收费已满放行'
            }
          ],
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: "{b}:{c}"
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
      myChart3.setOption({
        color: ['#00BFFF', '#00FFFF', '#708090', '#ADD8E6', '#fbf320'], //柱体颜色
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return (params.percent - 0).toFixed(0) + '%'
          }
        },
        series: [{
          name: '数据',
          type: 'pie',
          radius: '72%',
          center: ['50%', '50%'],
          data: [{
              value: 135,
              name: '二维码开门'
            },
            {
              value: 10,
              name: '管理卡开门'
            },
            {
              value: 34,
              name: '刷卡开门'
            },
            {
              value: 144,
              name: 'APP开门'
            },
            {
              value: 64,
              name: '指纹开门'
            }
          ],
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: "{b}:{c}"
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart1.dispose();
          myChart2.dispose();
          myChart3.dispose();
        } else { //重绘函数作为返回值返出去
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
		display: inline-block;
		vertical-align: top;
		width: 1.62rem;
		height: 0.38rem;
		border-radius: 0.05rem;
		background: rgba(255, 255, 255, 0);
		color: #FFF;
		margin-bottom: 0.06rem;
		.select_text{
			color: #FFF;
		}

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
}

.content_dl {
	display: flex;
	width: 100%;
	height: 100%;
	.tote {
		text-align: center;
		display: inline-block;
		position: absolute;
		width: 0.7rem;
		height: 0.3rem;
		color: #fff;
		left: 26.5%;
		top: 53%;
		font-size: 0.08rem;
		i {
			color: #fff;
			font-size: 0.18rem;
		}
	}
	dd {
		height: 100%;
		flex: 1;
		border-left: 0.01rem solid darkgrey;
		ul {
			width: 100%;
			height: 1.22rem;
			display: flex;
			li {
				flex: 1;
				height: 1.92rem;
				text-align: center;
				p {
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span {
					color: #70CCFC;
					font-size: 0.34rem;
				}
			}
		}
	}
}

.content_dl dd:nth-of-type(1) {
	border: none;
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


/*图表容器*/

.myChart1,
.myChart2,
.myChart3 {
	height: 3.3rem;
	width: 100%;
}
</style>
