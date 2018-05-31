<template>
<div id="myChart">
</div>
</template>
<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js';
import {
  mapState
} from 'vuex';
export default {
  data() {
    return {
      isDispose: false,
      mapStatus: null, //图表返回函数状态
      isFirst: true,
    }
  },
  computed: {
    ...mapState(['contentSize', 'geoCoordMap']),
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
      var geoCoordMap = this.geoCoordMap;
      var data = [{
        name: '长春',
        value: 90
      }, {
        name: '西安',
        value: 10
      }, {
        name: '深圳',
        value: 20
      }, {
        name: '北京',
        value: 50
      }, {
        name: '广州',
        value: 58
      }, {
        name: '上海',
        value: 64
      }, {
        name: '重庆',
        value: 68
      }, {
        name: '佛山',
        value: 45
      }, {
        name: '成都',
        value: 68
      }, {
        name: '大连',
        value: 49
      }];

      function formtGCData(geoData, data, srcNam, dest) {
        var tGeoDt = [];
        if (dest) {
          for (var i = 0, len = data.length; i < len; i++) {
            if (srcNam != data[i].name) {
              tGeoDt.push({
                coords: [geoData[srcNam], geoData[data[i].name]]
              });
            }
          }
        } else {
          for (var i = 0, len = data.length; i < len; i++) {
            if (srcNam != data[i].name) {
              tGeoDt.push({
                coords: [geoData[data[i].name], geoData[srcNam]]
              });
            }
          }
        }
        return tGeoDt;
      }

      function formtVData(geoData, data, srcNam) {
        var tGeoDt = [];
        for (var i = 0, len = data.length; i < len; i++) {
          var tNam = data[i].name
          if (srcNam != tNam) {
            tGeoDt.push({
              name: tNam,
              value: geoData[tNam]
            });
          }

        }
        tGeoDt.push({
          name: srcNam,
          value: geoData[srcNam],
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: 'red',
              borderColor: 'red'
            }
          }
        });
        return tGeoDt;
      }
      //var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      var planePath = 'arrow'; //射线小图标样式
      var option = {
        backgroundColor: '',
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        geo: { //中国地图参数配置
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          zoom: 1.2,
          itemStyle: {
            normal: {
              areaColor: 'rgba(31,37,75,0.5)', //背景颜色
              borderColor: 'rgba(255,255,255,1)' //线体颜色
            },
            emphasis: {
              areaColor: '#2fadef'
            }
          }
        },
        series: [{
            //射线样式设置
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 8,
              trailLength: 0.4, //尾巴长度
              color: '#00FFFF',
              symbol: planePath,
              symbolSize: 5 //箭头大小
            },
            lineStyle: {
              normal: {
                color: '#a6c84c',
                width: 1,
                opacity: 0.4,
                curveness: 0.1 //弧度
              }
            },
            data: formtGCData(geoCoordMap, data, '深圳', true)
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              scale: 8, //箭头速度
              brushType: 'stroke'
            },
            //各分支名字
            label: {
              normal: {
                show: true,
                color: '#fff',
                position: 'right', //点的右边
                formatter: '{b}'
              }
            },
            //各分支的样式设置
            symbolSize: 8, //闪点大小
            itemStyle: {
              normal: {
                color: '#fbf320', //字体颜色
                borderColor: '#fbf320' //闪点颜色
              }
            },
            data: formtVData(geoCoordMap, data, '深圳') //红色标点处
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
	flex: 2;
	margin-top: 0.5rem;
	height: 7.8rem;
	display: inline-block;
}
</style>
