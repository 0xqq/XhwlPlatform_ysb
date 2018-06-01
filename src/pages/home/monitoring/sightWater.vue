<template>
<div class="electronicMap">
  <!--面包导航组件-->
  <Bread :breadData="abc"></Bread>
  <button class="btn_1">实时数据</button><button class="btn_2">历史数据</button>
  <div class="content">
    <span class="newdevice1"></span>
    <span class="newdevice2"></span>
    <span class="newdevice3"></span>
    <span class="newdevice4"></span>
    <!--地图视口-->
    <div id="XSDFXPage" class="XSDFXPage"></div>
    <div class="top_2">
      <p class="air_text1">景观水质</p>
      <div class="bar_box">优</div>
      <ul class="ul">
        <li>
          <div class="box_1">
            <p class="p1">COD</p>
            <p class="p2">21<sub>mg/L</sub></p>
            <p class="p3">(国际:≤30mg/L)</p>
          </div>
        </li>
        <li>
          <div class="box_1">
            <p class="p1">TOC</p>
            <p class="p2">0.3</p>
            <p class="p3">(国际:≤0.5mg/L)</p>
          </div>
        </li>
        <li>
          <div class="box_1">
            <p class="p1">TDC</p>
            <p class="p2">0.2</p>
            <p class="p3">(国际:≤0.5mg/L)</p>
          </div>
        </li>
        <li>
          <div class="box_1">
            <p class="p1">浊度</p>
            <p class="p2">0.2</p>
            <p class="p3">(国际:≤1)</p>
          </div>
        </li>
        <li>
          <div class="box_1">
            <p class="p1">温度</p>
            <p class="p2">30</p>
            <p class="p3">(国标:±4℃)</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Bread from '@/components/common/bread'
import sightWater from '@/httpData/sightWater'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '环境物联监控', '景观水质监控'],
      all: [{
          "x": "114.05884",
          "y": "22.539014"
        },
        {
          "x": "114.058153",
          "y": "22.539928"
        }
      ]
    }
  },
  computed: {
    ...mapState(['mnUrl'])
  },
  components: {
    Bread,
  },
  mounted() {
    this.initMap();
    this.showAll();
    //this.getData();
  },
  methods: {
    initMap() {
      // 创建Map实例及设置类型
      var map = new BMap.Map("XSDFXPage");
      // 设置中心点坐标
      var point = new BMap.Point(114.058167, 22.539506);
      // 设置地图显示的城市(必须)
      map.setCurrentCity("深圳市");
      // 设置地图级别:1-19越大越清晰
      map.centerAndZoom(point, 19);
      // 设置鼠标滚轮缩放
      map.enableScrollWheelZoom(true);
      return map
    },
    //		setTimeout(){
    //			setTimeout(function(){
    //				showAll()
    //			},1000)
    //		},
    showAll() {
      var _map = this.initMap();
      for (var i = 0; i <= this.all.length - 1; i++) {
        var marker = new BMap.Marker(new BMap.Point(this.all[i].x, this.all[i].y));
        _map.addOverlay(marker);
      }
    },
    getData() {
      console.log('sightWater', sightWater.content)
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
    .electronicMap {
        width: 100%;
        height: 100%;
    }
    .btn_1,.btn_2{
    	width: 1.41rem;
    	height: 0.36rem;
    	border-radius: 0.05rem;
    	background: url(../../../images/answer-active.png);
    	background-size: cover;
    }
    .btn_1{
    	margin-left: 0.05rem;
    	margin-right: 0.15rem;
    }
    .btn_1,.btn_2:hover{
    	cursor: pointer;
    }
    .content {
        width:13.94rem;
        height: 7.06rem;
        position: relative;
        margin-left: 0.2rem;
        flex-basis: 0;
        background:url(../../../images/blue.png);
        background-size:cover;
        margin: 0 auto;
        margin-top: 0.4rem;
    }
    .newdevice1, .newdevice2, .newdevice3, .newdevice4 {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
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
	.XSDFXPage{
	    width: 9.44rem;
		height: 6.31rem;
	    font-family: "微软雅黑";
	 	 float: left;
	  	margin-top: 0.34rem;
	  	margin-left: 0.38rem;
	  	margin-bottom: 0.41rem;
	}
	.top_2{
		width: 4.1rem;
		height: 6.31rem;
		float: left;
		margin-top: 0.34rem;
	}
	.air_text1{
		text-align: center;
		font-size: 0.18rem;
		margin-top: 0.03rem;
	}
	.bar_box{
		width: 0.41rem;
		height: 0.41rem;
		border-radius: 50%;
		background: #4ee21b;
		text-align: center;
		line-height: 0.41rem;
		margin-left: 1.78rem;
		margin-top: 0.18rem;
	}
	.ul{
		margin-top: 0.25rem;
	}
	.ul>li{
		width: 4.1rem;
		height: 1.05rem;
		list-style: none;
		display: flex;
	}
	.box_1{
		flex-grow: 1;
		height: 1.05rem;
		flex-basis: 0;
		padding-left: 1.83rem;
	}
	.p1{
		font-size: 0.14rem;
	}
	.p2{
		margin-top: 0.15rem;
		font-size: 0.22rem;
	}
	.p3{
		font-size: 0.12rem;
		color: gray;
	}
</style>
