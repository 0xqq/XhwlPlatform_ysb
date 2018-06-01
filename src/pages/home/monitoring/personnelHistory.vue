<template>
<div class="Personnelhistory">
  <!--面包导航组件-->
  <Bread :breadData="abc"></Bread>
  <div class="content">
    <div class="box_nav">
      <div class="nav_time">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
          </el-date-picker>
        </div>
      </div>
      <div class="nav_right">
        人员姓名&nbsp&nbsp<input type="text"> &nbsp&nbsp人员工号&nbsp&nbsp
        <input type="text">&nbsp&nbsp
        <button @click="createIcon()">查询轨迹</button>
        <button @click="drawLine()">轨迹回放</button>
      </div>
    </div>
    <div class="box_top">
      <div id="XSDFXPage" class="XSDFXPage"></div>
      <span class="newdevice1"></span>
      <span class="newdevice2"></span>
      <span class="newdevice3"></span>
      <span class="newdevice4"></span>
      <!--<div class="ipt">
                    <input type="checkbox" value="">&nbsp;&nbsp;显示电量
                    <input type="checkbox" value="" class="ipt2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示巡更进度
                </div>-->
    </div>
  </div>

</div>
</template>

<script>
import Bread from '@/components/common/bread'
import inAndOut from "../../../images/inAndOut.png"
import personHistory from '@/httpData/personnelHistory.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '人员物联监控', '安防人员', '历史轨迹查询'],
      input5: '',
      select: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value6: '',
      value: [{
          'order': 'KM001',
          'DoorEquipment': '东大门岗亭1',
          'time': '2017-08-15 14:00:11',
          'name': '张三',
          'event': 'KM001',
          'operate': '对讲'
        },
        {
          'order': 'KM001',
          'DoorEquipment': '东大门岗亭1',
          'time': '2017-08-15 14:00:11',
          'name': '张三',
          'event': 'KM001',
          'operate': '对讲'
        },
        {
          'order': 'KM001',
          'DoorEquipment': '东大门岗亭1',
          'time': '2017-08-15 14:00:11',
          'name': '张三',
          'event': 'KM001',
          'operate': '对讲'
        },
        {
          'order': 'KM001',
          'DoorEquipment': '东大门岗亭1',
          'time': '2017-08-15 14:00:11',
          'name': '张三',
          'event': 'KM001',
          'operate': '对讲'
        },
      ],
      point: [{
          "x": "114.059323",
          "y": "22.539379"
        },
        {
          "x": "114.059217",
          "y": "22.538907"
        },
        {
          "x": "114.05878",
          "y": "22.539215"
        },
        {
          "x": "114.05878",
          "y": "22.538805"
        },
        {
          "x": "114.05828",
          "y": "22.538805"
        },
        {
          "x": "114.05856",
          "y": "22.539445"
        },
        {
          "x": "114.058086",
          "y": "22.539532"
        },
        {
          "x": "114.057751",
          "y": "22.53922"
        },
        {
          "x": "114.057751",
          "y": "22.53862"
        }
      ]
    }
  },
  components: {
    Bread,
  },
  computed: {
    ...mapState(['mnUrl'])
  },
  mounted() {
    this.initMap();
    this.getData()
  },
  methods: {
    initMap() {
      // 创建Map实例及设置类型
      var map = new BMap.Map("XSDFXPage");
      var point = new BMap.Point(114.058167, 22.539506);
      map.setCurrentCity("深圳市");
      map.centerAndZoom(point, 19);
      map.enableScrollWheelZoom(true);
      return map;
    },
    createIcon() {
      var _map = this.initMap();
      for (var i = 0; i <= this.point.length - 1; i++) {
        var myIcon = new BMap.Icon(inAndOut, new BMap.Size(20, 20));
        var marker = new BMap.Marker(new BMap.Point(this.point[i].x, this.point[i].y), {
          icon: myIcon
        });
        _map.addOverlay(marker);
      }
      return _map;
    },
    drawLine() {
      // 调用之前清除定时器
      clearInterval(interval);
      var point = this.point;
      // 调用createIcom函数获取 map 实例
      var map = this.createIcon();
      // 设置一个定时器
      var a = 0;
      var interval = setInterval(function() {
        a = a + 1
        var pointlh = new BMap.Point(point[a - 1].x, point[a - 1].y);
        var pointls = new BMap.Point(point[a].x, point[a].y);
        var polyline = new BMap.Polyline([pointlh, pointls], {
          strokeColor: "blue",
          strokeWeight: 3,
          strokeOpacity: 1
        });
        map.addOverlay(polyline);
        if (a >= point.length - 1) {
          clearInterval(interval);
          //console.log("清除");
          return;
        }
      }, 800)
    },
    getData() {
      console.log(personHistory.content)
    }
  },
  created() {

  }
}
</script>
<style lang="scss" scoped>
    @import 'src/style/mixin';
    $padding_top: 0.1rem;
    span,
    button,
    select,
    input {
        color: #fff;
    }
    .Personnelhistory {
        vertical-align: top;
        width: 100%;
        height: 100%; // display: inline-block;
        // border: 1px solid green;
    }
    .content {
        width: 13.65rem;
        height: 8.04rem;
        margin: 0 auto;
        .box_nav {
            width: 14.36rem;
            height: 1rem;
            .nav_time {
                display: inline-block;
                width: 3.32rem;
                height: 0.8rem;
                .block{
                    line-height: 0.4rem;
                    margin-top:0.2rem;
                }
                .el_picker{
                   font-size:0.14rem;
                     width: 2.5rem;
                    height: 0.4rem;
                }
                span {
                    display: inline-block;
                    padding-top: 0.28rem;
                    padding-left: 0.5rem;
                    color: #70ccfc;
                }
                img {
                    width: 0.24rem;
                    height: 0.22rem;
                    background-size: contain;
                    margin-left: 0.1rem;
                }
            }
            .nav_right {
                display: inline-block;
                color: #fff;
                float: right;
                margin-right: 0.53rem;
                margin-top: 0.22rem;
                input {
                    width: 2.1rem;
                    height: 0.4rem;
                    background: transparent;
                    border: 0.02rem solid #83dbff;
                    border-radius: 0.05rem;
                }
                button {
                    background: transparent;
                    padding-left: 0.1rem;
                    @include aa;
                }
            }
        }
        .box_top {
            width: 14.08rem;
            height: 6.98rem;
            background: rgba(123, 123, 231, .4);
            background-size: contain;
            margin-top: 0.12rem;
            margin-left:-0.17rem;
            display: flex;
            justify-content: center;
            align-items: center; // margin:0 auto;
            position: relative;
            span {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
            }
            .ipt {
                // width: 3.15rem;
                width: 2.75rem;
                height: 0.47rem;
                position: absolute;
                // right: -0.25rem;
                right: -0.4rem;
                color: #fff;
                top: 0.20rem;
                // top: 0.15rem;
                input{
                    position:absolute;
                }
                input:nth-child(1){
                    margin-right:0.04rem;
                    right:2.7rem;
                    top:0.01rem;
                }
                .ipt2 {
                    margin-left: 0.18rem;
                    margin-top:0.009rem;
                }
            }

            .newdevice1 {
                background: url(../../../images/newdevice1.png);
                background-size: 100% 100%;
                position: absolute;
                left: -0.14rem;
                top: -0.14rem;
            }
            .newdevice2 {
                background: url(../../../images/newdevice2.png);
                background-size: 100% 100%;
                position: absolute;
                right: -0.14rem;
                top: -0.14rem;
            }
            .newdevice3 {
                background: url(../../../images/newdevice3.png);
                background-size: 100% 100%;
                position: absolute;
                left: -0.14rem;
                bottom: -0.14rem;
            }
            .newdevice4 {
                background: url(../../../images/newdevice4.png);
                background-size: 100% 100%;
                position: absolute;
                right: -0.14rem;
                bottom: -0.14rem;
            }
        }
    }

html,body,.XSDFXPage{
    width: 100%;
    height:100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
}
</style>
