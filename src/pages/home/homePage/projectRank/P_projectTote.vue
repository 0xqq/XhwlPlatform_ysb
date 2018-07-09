<template>
<div>
  <Homenav :navData="route"></Homenav>
  <div class="div_top">
    <span class="span_left">今日实时</span>
    <!--<div class="div_right">
				 <span>时间筛选:</span>
				<div class="select">
					<el-select v-model="value" placeholder="自然月" class="small_select">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
	            <div class="time_select">
	            	<el-date-picker v-model="value"  type="daterange" placeholder="2017-09-15-2017-09-22"></el-date-picker>
	            </div>
			</div>-->
  </div>
  <!--中间内容部分-->
  <div class="div_content">
    <ul class="content_ul">
      <li>
        <p>住宅户数(户)</p><span>{{data1}}</span></li>
      <li>
        <p>停车总位数(个)</p><span>{{data2}}</span></li>
      <li>
        <p>车辆入场流量(次)</p><span>{{data3}}</span></li>
      <li>
        <p>剩余车位(个)</p><span>{{data4}}</span></li>
    </ul>
    <ul class="content_ul">
      <li>
        <p>当月总收入(元)</p><span>{{data5}}</span></li>
      <li>
        <p>当月总支出(元)</p><span>{{data6}}</span></li>
      <li>
        <p>当月总增值(元)</p><span>{{data7}}</span></li>
      <li>
        <p>当月增值回报率</p><span>{{data8}}%</span></li>
    </ul>
    <div class="content_left">
      <div class="letf_title"><span>未销项事件数统计</span></div>
      <dl class="left_ul">
        <dd>
          <p>未销项事件数(次)</p>
          <span>10</span>
        </dd>
      </dl>
      <div id="myChart1" class="chart1"></div>
    </div>
    <div class="content_right">
      <div class="right_title"><span>当日出勤率排行</span></div>
      <div class="chart2">
        <div class="progressBar">
          <span>财务</span><span>100%</span>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success"></el-progress>
          <span>安环</span><span>100%</span>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success"></el-progress>
          <span>工程</span><span>100%</span>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success"></el-progress>
          <span>客服</span><span>100%</span>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success"></el-progress>
          <span>人事</span><span>99%</span>
          <el-progress :text-inside="true" :stroke-width="15" :percentage="99" status="success"></el-progress>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import echarts from 'echarts'
import Homenav from '@/components/common/projectHomeNav'
import projectObj from '@/httpData/P_projectTote.js'
export default {
  data() {
    return {
      isDispose: false, //判断是否销毁
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      value: '',
      num1: '',
      title: ["消防报警", "视频报警", "周界防范报警", "人员报警"],
      Data: [1, 2, 1, 1],
      E_title: ["消防报警", "视频报警", "周界防范报警", "人员报警"],
      E_data: [1, 2, 1, 1],
      H_title: ["投诉", "设备报事"],
      H_data: [1, 1],
      A_title: ["客服未销项"],
      A_data: [3],
      route: 'P_projectTote', //向子组件传跳转路由
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
      var value = projectObj.content
      this.data1 = value['住宅户数（户）'];
      this.data2 = value['停车位总数（个）'];
      this.data3 = value['车辆入场流量（次）'];
      this.data4 = value['剩余车位（个）'];
      this.data5 = value['当月总收入（元）'];
      this.data6 = value['当月总支出（元）'];
      this.data7 = value['当月总增值（万元）'];
      this.data8 = (value['当月增值回报率'] * 100);
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
      // 绘制图表
      var data0 = [10, 52];
      var option1 = {
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
          data: this.title,
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          axisTick: {
            show: false,
          },
          axisLabel: { //刻度标题倾斜角度
            interval: 0,
            rotate: -30
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
            name: '数据',
            type: 'pie',
            radius: '74%',
            center: ['36%', '50%'],
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: [{
                value: 5,
                name: '安防'
              },
              {
                value: 2,
                name: '工程'
              },
              {
                value: 3,
                name: '客服'
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
      //		    setInterval(function() {
      //			    data0.shift();
      //			    data0.push(Math.round(Math.random()*400));
      //			    myChart1.setOption(option1);
      //			}, 1000);

      myChart1.on('click', function(params) {
        if (params.name == '安防') {
          refThis.Data.splice(0, 4, refThis.E_data[0], refThis.E_data[1], refThis.E_data[2], refThis.E_data[3]);
          refThis.title.splice(0, 4, refThis.E_title[0], refThis.E_title[1], refThis.E_title[2], refThis.E_title[3])
          myChart1.setOption(option1);
        } else if (params.name == '客服') {
          refThis.Data.splice(0, 4, refThis.A_data[0]);
          refThis.title.splice(0, 4, refThis.A_title[0])
          myChart1.setOption(option1);
        } else {
          refThis.Data.splice(0, 4, refThis.H_data[0], refThis.E_data[1]);
          refThis.title.splice(0, 4, refThis.H_title[0], refThis.E_title[1])
          myChart1.setOption(option1);
        }
      });
      myChart1.setOption(option1);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart1.dispose();
        } else { //重绘函数作为返回值返出去
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
.div_top{
	margin-top: 0.1rem;
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../../images/projck_nav.png);
	background-size: cover;
	.span_left{
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
.div_right{
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
		display:inline-block;
		vertical-align: top;
		width: 1.62rem;
		height: 0.38rem;
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
	font-size: 0;
	.content_ul{
			height: 1.3rem;
			width: 100%;
			display: flex;
			li{
				flex: 1;
				height: 1.2rem;
				text-align: center;
				p{
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span{
					color: #44d3e3;
					font-size: 0.34rem;
				}
			}
		}
	.content_left{
		margin-top: 0.08rem;
		width: 49.5%;
		height: 4.42rem;
		border-right: 0.01rem solid #70CCFC;
		display: inline-block;
		.letf_title{
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../../images/projack_snav.png);
			background-size: cover;
			span{
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.left_ul{
			height: 1rem;
			display: flex;
			dd{
				flex: 1;
				margin-left: 22%;
				p{
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span{
					color: #44d3e3;
					font-size: 0.34rem;
				}
			}
		}
		.chart1{
			width: 100%;
			height: 3rem;
		}
	}
	.content_right{
		margin-top: 0.08rem;
		width: 50%;
		height: 4.42rem;
		display: inline-block;
		vertical-align: top;
		.right_title{
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../../images/projack_snav.png);
			background-size: cover;
			span{
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.chart2{
			width: 100%;
			height: 4rem;
			overflow: hidden;
			.progressBar{
				width: 80%;
				height: 100%;
				margin:0 auto;
				span{
					display: inline-block;
					width: 0.8rem;
					height: 0.2rem;
					margin-top:0.2rem;
					margin-bottom: 0.1rem;
					color: #fff;
					font-size: 0.18rem;
				}
			}

		}
	}
}
</style>
