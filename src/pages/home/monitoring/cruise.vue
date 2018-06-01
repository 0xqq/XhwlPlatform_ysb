<template>
<div class="Cruise">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="device-nav">
    <div class="top_div1">
      <span class="span_left">视频巡检设置</span>
      <button class="cruise_btn" @click="showmodel" v-if="vanish">
                    <span class="cruise_span">+</span> 添加巡检计划</button>
    </div>
  </div>
  <div class="cruise_center" v-if="!stopshow">
    <div class="cruise_top" v-for="d in vaLue">
      <span class="newdevice2"></span>
      <span class="newdevice3"></span>
      <span class="newdevice1"></span>
      <span class="newdevice5"></span>
      <div class="cruise_num">
        {{d.序号}}
      </div>
      <div class="cruise_ul">
        <ul>
          <li><span>巡检配置名称：</span><span>{{d.巡检配置名称}}</span></li>
          <li><span>巡检时间：</span><span>{{d.巡检时间}}</span></li>
          <li><span>巡检周期：</span><span>{{d.巡检周期}}</span></li>
          <li><span>计划巡检摄像头列表：</span><span>{{d.计划巡检摄像头}}</span></li>
          <li><span>巡检状态：</span><span>{{d.状态}}</span></li>
          <li><span>视频切换间隔时间：</span><span>{{d.视频切换间隔时间}}</span></li>
        </ul>
      </div>
      <div class="cruise_blue">
        <el-switch v-model="item.id" on-color="#13ce66" off-color="#ff4949"></el-switch>
      </div>
      <div class="rubbish1"></div>
    </div>
  </div>
  <!--点击弹出的模态框-->
  <div class="model_cruise" v-if="stopshow">
    <div class="model_delete " @click="addplans">x</div>
    <div class="model_top">
      <section class="section">
        <span class="label">巡检名称：</span>
        <textarea name=""></textarea>
      </section>
      <section class="section1">
        <span class="label">巡检时间：</span>
        <textarea name=""></textarea>
        <span class="label3">—</span>
        <textarea name=""></textarea>
      </section>
      <section class="section3">
        <span class="label">视频间隔时间：</span>
        <textarea name=""></textarea>
        <span>秒</span>
        <span class="label1">&nbsp&nbsp巡检周期：</span>
        <input type="checkbox"> 全选
        <input type="checkbox"> 周一
        <input type="checkbox"> 周二
        <input type="checkbox"> 周三
        <input type="checkbox"> 周四
        <input type="checkbox"> 周五
        <input type="checkbox"> 周六
        <input type="checkbox"> 周日
      </section>
      <section class="section3">
        <span class="label">在线验证间隔时间：</span>
        <textarea name=""></textarea>
        <span>分钟</span>
        <span class="label1">巡检设备：</span>
        <span class="label2"> 1号摄像头</span>
        <span class="label2"> 2号摄像头</span>
        <span class="label2"> 5号摄像头</span>
      </section>
    </div>
    <div class="model_buttom">
      <ul class="modle_ul" v-for="(key,index) in camera" :key="index">
        <li class="modle_li_one">{{key.center}}</li>
        <li>{{key.camera1}}</li>
        <li>{{key.camera2}}</li>
        <li>{{key.camera3}}</li>
        <li>{{key.camera4}}</li>
        <li>{{key.camera5}}</li>
      </ul>
    </div>
    <div class="model_btn"><button class="btn" @click="addplan">确认</button></div>
  </div>
</div>
</template>
<script>
import Bread from '@/components/common/bread'
import cruiseObj from '@/httpData/cruise.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '视频物联监控', '巡检配置'],
      item: [{
        id1: true
      }, {
        id2: true
      }],
      datas: {},
      value1: true,
      value2: false,
      stopshow: false,
      vanish: true,
      camera: [{
          "center": "监控中心",
          "camera1": "监控室  ",

        }, {
          "center": "财务类",
          "camera1": "财务室",
        }, {
          "center": "客服类",
          "camera1": "游泳池1",
          "camera2": "游泳池2",
          "camera3": "小花园1",
          "camera4": "小花园2",
          "camera5": "会所1",
          "camera6": "会所2",
        }, {
          "center": "道口岗",
          "camera1": "地上车场岗亭",
          "camera2": "地库车场岗亭",
          "camera3": "地上车场入口",
          "camera4": "北区地库车场出口",
          "camera5": "南区地库出口门口",
          "camera6": "南区负一层地库入口通道",
        }, {
          "center": "大门",
          "camera1": "东大门1",
          "camera2": "东大门2",
          "camera3": "西大门1",
          "camera4": "西大门2",
          "camera5": "南大门1",
          "camera6": "南大门2",
          "camera7": "北大门1",
          "camera8": "北大门2",
        }, {
          "center": "社区户外公共区域",
          "camera1": "东面摄像头1",
          "camera2": "东面摄像头2",
          "camera3": "南面摄像头1",
          "camera4": "南面摄像头2",
          "camera5": "西面摄像头1",
          "camera6": "西面摄像头2",
          "camera7": "北面摄像头1",
          "camera8": "北面摄像头2",
        }, {
          "center": "单元门口",
          "camera1": "华景轩一座后楼道",
          "camera2": "华景轩二座后楼道",
          "camera3": "华景轩三座后楼道",
          "camera4": "华景峰一座后楼道",
          "camera5": "华景峰二座后楼道",
          "camera6": "华景台一座后楼道",
          "camera7": "华景台二座后楼道",
        }, {
          "center": "电梯厅",
          "camera1": "大堂摄像头1",
          "camera2": "大堂摄像头2",
          "camera3": "管理处前台",
        }

      ],
      vaLue: []
    }
  },
  computed: {
    ...mapState(['token', 'mnUrl'])
  },
  components: {
    Bread
  },
  mounted() {
    this.add();
    this.getData()
  },
  methods: {
    add() {
      this.datas = this.$route.query.value;
    },
    showmodel() {
      this.stopshow = true;
      this.vanish = false;
    },
    addplan() {
      this.stopshow = false;
      this.vanish = true;
    },
    addplans() {
      this.stopshow = false;
      this.vanish = true;
    },
    getData() {
      this.vaLue = cruiseObj.content
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.Cruise {
    vertical-align: top;
    width: 14.4rem;
    height: 8.96rem; // display: inline-block;
    margin: 0 auto;
    /*顶部长条外框*/
    .top_div1 {
        width: 13.41rem;
        height: 0.43rem;
        margin: 0 auto;
        margin-bottom: 0.26rem;
        .span_left {
            text-align: center;
            display: inline-block;
            width: 1.65rem;
            height: 0.43rem;
            line-height: 0.43rem;
            color: #70CCFC;
            background-image: url(../../../images/rectangle2.png);
            background-size: 100% 100%;
            background-position: center;
        }
        .cruise_btn {
            line-height: 0.33rem;
            margin-left: 0.21rem;
            @include btn(1.41rem,0.36rem);

            .cruise_span {
                display: inline-block;
                color: #fff;
                font-size: 0.23rem;
            }
        }
    }
    .cruise_center {
        width: 14rem;
        height: 7.31rem;
        margin: 0 auto;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 0.15rem;
        .cruise_top {
            padding-top: 0.5rem;
            width: 98%;
            height: 4rem;
            background: url(../../../images/cruise2.png);
            background-size: cover;
            margin-bottom: 0.45rem;
            position: relative;
            border-radius:0.05rem;
            .rubbish1 {
                width: 0.48rem;
                height: 0.48rem;
                background: url(../../../images/rubbish1.png)no-repeat;
                background-size: cover;
                position: absolute;
                right: 0.39rem;
                bottom: 0.32rem;
                @include aa;
            }
            .cruise_blue {
                display: inline-block;
                width: 1.22rem;
                height: 0.52rem;
                position: absolute;
                right: 1.08rem;
                top: 1.41rem;
            }
        }
        .cruise_bottom {
            width: 100%;
            height: 3.39rem;
            background: url(../../../images/cruise2.png);
            background-size: contain;
            position: relative;
            padding-top: 0.54rem;
            .rubbish2 {
                width: 0.48rem;
                height: 0.48rem;
                background: url(../../../images/rubbish2.png)no-repeat;
                background-size: cover;
                position: absolute;
                right: 0.39rem;
                bottom: 0.32rem;
                @include aa;
            }
            .cruise_blue {
                display: inline-block;
                width: 1.22rem;
                height: 0.52rem;
                position: absolute;
                right: 1.08rem;
                top: 1.41rem;
            }
        }
    }
    .model_cruise {
        width: 11.49rem;
        height: 7.4rem;
        background: url(../../../images/blue.png) no-repeat;
        background-size: cover;
        margin: 0 auto;
        padding: 0.3rem 0.3rem 0 0.3rem;
        position: relative;
        .model_delete{
            display:inline-block;
            width: 0.3rem;
            height: 0.3rem;
            text-align:center;
            line-height: 0.23rem;
            font-size:0.16rem;
            border-radius: 50%;
            border:2px solid #83dbff;
            color:#83dbff;
            position: absolute;
            right:0.1rem;
            top:0.1rem;

        }
        .model_delete:hover{
             color:red;
              border:2px solid red;
        }
        .model_top {
            margin-bottom: 0.2rem;
            section {
                margin-bottom: 0.16rem;
                .label {
                    display: inline-block;
                    width: 1.5rem;
                    height: 0.37rem;
                    text-align: right;
                }
                .label1{
                    margin-left:0.73rem;

                }
                .label2{
                    margin-left:0.2rem;
                }
                .label3{
                    width: 0.15rem;
                    height: 0.3rem;
                    color:#83dbff;
                }
            }
            .section {

                textarea {
                    width: 2.04rem;
                    height: 0.37rem;
                    background: transparent;
                    border: 2px solid #83dbff;
                    vertical-align: middle;
                    border-radius: 0.05rem;
                }
            }
            .section1 {
                textarea {
                    width: 1.13rem;
                    height: 0.37rem;
                    background: transparent;
                    border: 2px solid #83dbff;
                    vertical-align: middle;
                    border-radius: 0.05rem;
                }
            }
            .section3 {
                textarea {
                    width: 0.55rem;
                    height: 0.37rem;
                    background: transparent;
                    border: 2px solid #83dbff;
                    vertical-align: middle;
                    border-radius: 0.05rem;
                }

                input{
                    margin-left:0.15rem;
                }
            }
        }
        .model_buttom {
            width: 100%;
            height: 4rem;
                 display:flex;
                 flex-wrap: wrap;
                 overflow-y: scroll;
                 margin:0 auto;
                //  overflow: hidden;
            .modle_ul{
                // flex:1;
                width: 2.5rem;
                height: 1.9rem;
                margin-bottom: 0.2rem;


                li{
                     text-align: center;
                     margin-top:0.1rem;
                }
                .modle_li_one{
                    font-size:0.18rem;
                     width: 1.91rem;
                    border-bottom: 0.02rem solid #fff;
                    margin-left:0.3rem;
                    // margin-top:0.4rem;

                }
            }
        }
        .model_btn{
              text-align: center;
                .btn{
            margin-top:0.15rem;
            @include btn(1.41rem,0.36rem);
        }
        }
    }
}
.newdevice2,
.newdevice3,
.newdevice5,
.newdevice1{
 display: inline-block;
    width: 0.314rem;
    height: 0.314rem;
}
.newdevice2 {
    background: url(../../../assets/newdevice3.png)no-repeat;
    background-size: contain;
    position: absolute;
    left: -0.1rem;
    bottom: -0.1rem;
}
.newdevice3 {
    background: url(../../../assets/newdevice2.png)no-repeat;
    background-size: contain;
    position: absolute;
    left: -0.1rem;
    top: -0.1rem;
}
.newdevice1 {
    background: url(../../../assets/newdevice1.png)no-repeat;
    background-size: contain;
    position: absolute;
    right: -0.1rem;
    top: -0.1rem;
}
.newdevice5 {
    background: url(../../../assets/newdevice4.png)no-repeat;
    background-size: contain;
    position: absolute;
    right: -0.1rem;
    bottom: -0.1rem;
}
.cruise_num {
    display: inline-block;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    border: 2px solid #83dbff;
    color: #83dbff;
    text-align: center;
    line-height: 0.85rem;
    font-size: 0.30rem;
    margin: 0.72rem 0.55rem 0 0.55rem;
    float: left;
}

.cruise_ul {
    display: inline-block;
    li {
    	width:8.5rem ;
        color: #fff;
        margin-bottom: 0.18rem;

    }
}
textarea {
    overflow: hidden;
}
</style>
