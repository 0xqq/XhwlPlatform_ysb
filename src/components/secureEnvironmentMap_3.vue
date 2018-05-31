<template>
<div id="myChart">
</div>
</template>
<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js';
import secureEnvironmentObj from '@/httpData/secureEnvironmentMap_3.js';
import {
  mapState
} from 'vuex';
export default {
  data() {
    return {
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
      content: null,
      data1: [{
        name: '',
        value: ''
      }],
      data2: [{
        name: '',
        value: ''
      }],
      data3: [{
        name: '',
        value: ''
      }],
      data4: [{
        name: '',
        value: ''
      }],
    }
  },
  mounted() {
    //初始化时获取数据
    this.getData();
  },
  computed: {
    ...mapState(['contentSize', 'geoCoordMap', 'mnUrl']),
  },
  destroyed() {
    //页面跳转时销毁
    this.isDispose = true;
    var _destroyMap = this.mapStatus;
    _destroyMap();
  },
  watch: {
    contentSize: function(contentSize) {
      var _resizeMap = this.mapStatus;
      setTimeout(function() {
        _resizeMap();
      }, 800)
    },
  },
  watch: {
    contentSize: function(contentSize) {
      var _resizeMap = this.mapStatus;
      setTimeout(function() {
        _resizeMap();
      }, 800)
    }
  },
  methods: {
    getData() {
      this.content = secureEnvironmentObj.content
      var data1 = this.content.业主入流量前十;
      var data2 = this.content.访客入场流量前十;
      var data3 = this.content.滞留人员数前十;
      var data4 = this.content.异常开门率前十;
      for (var i = 0; i < data1.length; i++) {
        this.data1[i] = {
          name: data1[i].城市,
          value: data1[i].数值
        };
        this.data2[i] = {
          name: data2[i].城市,
          value: data2[i].数值
        };
        this.data3[i] = {
          name: data3[i].城市,
          value: data3[i].数值
        };
        this.data4[i] = {
          name: data4[i].城市,
          value: data4[i].数值
        };
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
      var myChart = echarts.init(document.getElementById('myChart'));
      var geoCoordMap = this.geoCoordMap;
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      //myChart.showLoading();
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + ' : ' + params.value[2];
          }
        },
        legend: { //标题组件参数配置（左边，大小，颜色等）
          type: 'scroll',
          orient: 'vertical', //垂直
          bottom: '80',
          x: '80',
          icon: 'rect',
          data: ['业主入流量', '访客入流量', '当前滞留人数', '异常开门率'],
          textStyle: {
            color: '#fff'
          },
          selected: {
            // 选中'系列1'
            '业主入流量': true,
            // 不选中'系列2'
            '访客入流量': false
          },
          selectedMode: 'single', //单选模式
        },
        color: ['#00BFFF', '#87CEFA', '#FF4500', '#DC143C'],
        geo: {
          map: 'china',
          roam: true, //地图可缩放
          zoom: 1.15, //地图视图比例
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(31,37,75,0.5)', //地图背景颜色
              borderColor: 'rgba(255,255,255,1)' //线体颜色
            },
            emphasis: {
              areaColor: '#2fadef' //鼠标悬停颜色
            }
          }
        },
        series: [{
            name: '业主入流量',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(refThis.data1.sort(function(a, b) {
              return b.value - a.value;
            }).slice(0, 10)), //数据接入
            //symbolSize: 15,
            symbolSize: function(val) { //前十闪烁的大小
              return val[2] / 110;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#f4e925',
                fontSize: 15,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#f4e925',
                borderWidth: 1
              }
            }
          },
          {
            name: '访客入流量',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(refThis.data2.sort(function(a, b) {
              return b.value - a.value;
            }).slice(0, 10)), //数据接入
            //symbolSize: 15,
            symbolSize: function(val) { //前十闪烁的大小
              return val[2] / 5;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#f4e925',
                fontSize: 15,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#f4e925',
                borderWidth: 1
              }
            }
          },
          {
            name: '当前滞留人数',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(refThis.data3.sort(function(a, b) {
              return b.value - a.value;
            }).slice(0, 10)), //数据接入
            //symbolSize: 15,
            symbolSize: function(val) { //前十闪烁的大小
              return val[2] / 0.8;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#f4e925',
                fontSize: 15,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#f4e925',
                borderWidth: 1
              }
            }
          },
          {
            name: '异常开门率',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(refThis.data4.sort(function(a, b) {
              return b.value - a.value;
            }).slice(0, 10)), //数据接入
            //symbolSize: 15,
            symbolSize: function(val) { //前十闪烁的大小
              return val[2] / 0.04;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#f4e925',
                fontSize: 15,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#f4e925',
                borderWidth: 1
              }
            }
          }
        ]
      };
      myChart.setOption(option);

      function disposeMap() { //销毁函数作为返回值返出去
        if (refThis.isDispose) {
          myChart.dispose();
        } else {
          myChart.resize();
        }
      }
      return disposeMap;
    }
  }
}
</script>

<style lang="scss" scoped>
#myChart{
	flex: 2.2;
	height: 8.1rem;
	display: inline-block;
}
</style>
