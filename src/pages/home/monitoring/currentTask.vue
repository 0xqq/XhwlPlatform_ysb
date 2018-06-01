<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="content_left">
    <div class="device-nav">
      <div class="img-time">
        <div class="date-time">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
            </el-date-picker>
          </div>
        </div>
        <div class="date-device">
          <div>
            <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </div>
        </div>
        <input type="button" value="搜索" class="bttn">
      </div>
    </div>
    <!--顶部导航-->
    <ul class="content_divNav">
      <li class="serial1">单号</li>
      <li>生成时间/完成时间</li>
      <li>报修人</li>
      <li class="left_none">
        <el-select v-model="value" placeholder="全部状态" class="el_box">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <li class="people_leftnone">跟进人</li>
        <li>操作</li>
    </ul>
    <!--顶部导航-->
    <!--中间内容-->
    <div class="content_div">
      <ul class="ul_list" v-for='(d, index) in  vaLue'>
        <li>{{d.单号}}</li>
        <li>
          <span>{{d.生成时间}}</span>
          <span>{{d.完成时间}}</span>
        </li>
        <li>{{d.报修人}}</li>
        <li>{{d.全部状态}}</li>
        <li>{{d.跟进人}}</li>
        <li class="btn_center">
          <button class="btn1">修改</button>
          <button class="btn2">删除</button>
        </li>

      </ul>
    </div>
    <!--底部每页显示-->
    <div class="page">
      <span>每页显示</span>
      <select class="select">
                    <option value="A">10</option>
                    <option value="B">20</option>
                    <option value="C">30</option>
                </select>
      <div class="pageDiv">
        <img src="../../../images/left_select.png" />
        <span>1/1</span>
        <img src="../../../images/right_select.png" />
      </div>
    </div>
  </div>

  <!--右边内容-->
  <!--<div class="content_right">
            <div class="new_Device_right">
                <p>选择人员</p>
                <select class="date_device">
                    <option value="volvo">深圳分公司</option>
                    <option value="saab">张三</option>
                    <option value="opel">王五</option>
                    <option value="audi">李四</option>
                </select>
                <select class="date_device">
                    <option value="volvo">中海华庭项目</option>
                    <option value="saab">张三</option>
                    <option value="opel">王五</option>
                    <option value="audi">李四</option>
                </select>
                <select class="date_device">
                    <option value="volvo">环境部</option>
                    <option value="saab">张三</option>
                    <option value="opel">王五</option>
                    <option value="audi">李四</option>
                </select>
                <section>
                    <textarea name=""></textarea>
                </section>
                <section class="last_section">
                    <span class="label1">选定人员</span>
                    <textarea name=""></textarea>
                </section>
                <button class="btn1">确认</button>
                <button class="btn2">取消</button>
            </div>

        </div>-->
</div>
</template>
<script>
import Bread from '@/components/common/bread'
import currentTask from '@/httpData/currentTask'
import { format, gapTime } from '@/script/timeFormat.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '人员物联监控', '工程人员', '当前任务'],
      modifyvue: null,
      box_model: false,
      keepIndex: null,
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
      vaLue: [],
      options: [{
        value: '选项1',
        label: '已完成'
      }, {
        value: '选项2',
        label: '进行中'
      }, {
        value: '选项3',
        label: '已关闭'
      }],
      value: '',
    }
  },
  computed: {},
  components: {
    Bread
  },
  mounted() {
    this.getData()
  },
  methods: {
    removeTode(keep) {
      console.log(keep);
      this.value.splice(keep, 1);
      this.box_model = false;
    },
    show_model(index) {
      this.keepIndex = index;
      this.box_model = true;
    },
    cancal() {
      this.box_model = false;
    },
    getData() {
      this.vaLue = currentTask.content;
      this.vaLue.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 上报时间
        item.生成时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.生成时间.substr(-8) //日期随机+时间取定值
        item.完成时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.完成时间.substr(-8) //日期随机+时间取定值
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    position: relative;

    .content_left {
        display: inline-block;
        width: 100%;
        .device-nav {
            display: inline-block;
            height: 0.6rem;
            width: 100%;
            background: url(../../../assets/kaimenNav.png)no-repeat;
            background-size: 100% 100%; // padding-bottom: 0.5rem;
            // margin-bottom: 0.08rem;
            //导航栏右边的日历搜索等框
            .img-time {
                display: inline-block;
                height: 0.6rem;
                width: auto; // float: right; // line-height: 0.1rem;
                // margin-right: 0.3rem;
                position: relative;
                margin-bottom: 0.1rem;
                float: right;
                .date-time {
                    display: inline-block;
                    width: 2.58rem;
                    height: 0.4rem;
                    color: #67bce9;
                    outline: none;
                    vertical-align: middle; // margin-top:0.05rem;
                    .el_picker {
                        display: inline-block;
                        width: 2.58rem;
                        height: 0.4rem;
                        font-size: 0.14rem;
                    }
                }
                .search {
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background: url(../../../assets/search.png)no-repeat;
                    background-size: 100% 100%;
                    margin-left: -0.3rem;
                    @include aa;
                } // 配置名称框
                .date-device {
                    display: inline-block;
                    height: 0.4rem;
                    width: 3.65rem;
                    background: transparent;
                    color: #67bce9;
                    vertical-align: middle;
                    .place {
                        font-size: 0.14rem;
                    }
                } // 搜索按钮
                .bttn {
                    margin: 0.16rem 0.15rem 0 0;
                    @include btn(0.8rem, 0.3rem);
                }
            }
        }

        .content_div {
            background-image: url(../../../images/kaimen.png);
            width: 100%;
            height: 6.20rem;
            overflow: auto; // 三角箭头的颜色
            scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
            scrollbar-face-color: #184e7a; // 滚动条整体颜色
            // scrollbar-highlight-color: #333;
            // 滚动条阴影
            // scrollbar-shadow-color: #ccc;
            // 滚动条轨道颜色·································································	··································································
            scrollbar-track-color: #12253d;
            scrollbar-arrow-color: #12253d;
        }

        .content_divNav {
            display: flex;
            height: 0.4rem;
            width: 100%;
            background-image: url(../../../images/kaimenNav.png);
            .serial1 {
                border-left: none;
            }
            .left_none {
                border-left: none;
            }
            .el_box {
                width: 2.7rem;
                height: 0.4rem;
            }
            .people_leftnone {
                border-left: none;
            }
        }

        .content_divNav li {
            float: left;
            text-align: center; // flex-shrink: auto;
            flex: 1;
            height: 0.4rem;
            line-height: 0.4rem;
            color: white;
            border-left: 2px solid #698499; // font-size:0.12rem;
        }
        /*表格主体内容*/
        .ul_list {
            float: left;
            flex: 1;
            display: flex;
            height: 1.166rem;
            width: 100%;
            .btn_center {
                button {
                    background: transparent;
                    border: 0rem;
                    @include aa;
                    outline: none;
                }
                .btn1 {
                    color: #fff;
                    margin-left: 0.25rem;
                }
                .btn2 {
                    color: red; // margin-left: 0.2rem;
                    padding-left: 0.1rem;
                }
            }
        }

        .ul_list li {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            /*text-align: center;
        line-height: 1.166rem;*/
            color: white;
            border-bottom: 2px solid #698499;
            font-size: 0.14rem;
        }
        .page {
            line-height: 0.6rem;
            width: auto;
            height: 0.6rem;
            background-image: url(../../../images/kaimen.png);
            background-size: 100% 100%;
            float: right;
            margin-top: 0.2rem;
            margin-right: 0.25rem;
            padding-right:0.1rem;
        }
        .page>span {
            color: #70ccfc;
            margin-left: 0.2rem;
        }
        .select {
            text-align: center;
            width: 0.61rem;
            height: 0.35rem;
            background: darkgray;
            background-image: url(../../../images/kaimen.png);
            color: white;
        }
        .pageDiv {
            display: inline-block;
            margin-left: 0.15rem;
            span {
                color: #83dbff;
                margin: 0 0.15rem;
            }
            img {
                width: 0.1rem;
                height: 0.2rem;
                @include aa;
            }
        }

        select {
            /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
            /*很关键：将默认的select选择框样式清除*/
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            background: transparent;
            /*在选择框的最右侧中间显示小箭头图片*/
            background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
            /*为下拉小箭头留出一点位置，避免被文字覆盖*/
            padding-right: 14px;
        }



        select::-ms-expand {
            display: none;
        }
    }


    // .content_right {
    //     width: 20%;
    //     display: inline-block;
    //     float: right;
    //     padding: 1.5rem 0.5rem;

    //     margin: 0 auto;
    //     .new_Device_right {
    //         display: inline-block;
    //         width: 4rem;
    //         height: 5.5rem;
    //         background: url(../../../images/answer-call.png) no-repeat;
    //         background-size: 100% 100%;
    //         vertical-align: bottom;
    //         p {
    //             font-size: 0.18rem;
    //             padding: 0.1rem 0 0.1rem 0.1rem;
    //             border-bottom: 1px solid #666;
    //         }

    //         .date_device {
    //             width: 3rem;
    //             height: 0.34rem;
    //             border: 0.02rem solid #83dbff;
    //             border-radius: 0.05rem;
    //             background-color: transparent;
    //             padding: 0.05rem;
    //             color: #fff;
    //             margin: 0.25rem 0 0rem 0.5rem;

    //             option {
    //                 background-color: #154777;
    //             }
    //         }
    //         section {
    //             textarea {
    //                 @include tare(3rem,
    //                 1.5rem);
    //                 vertical-align: middle; // margin-left: 0.2rem;
    //                 margin: 0.25rem 0 0.25rem 0.5rem;
    //             }
    //         }
    //         .last_section {
    //             margin-left: 0.5rem;
    //             span {
    //                 display: inline-block;
    //             }
    //             textarea {
    //                 margin: 0;
    //                 padding: 0;
    //                 width: 2.3rem;
    //                 height: 0.34rem;
    //                 border: 0.02rem solid #83dbff;
    //                 border-radius: 0.05rem;
    //                 background-color: transparent;
    //             }
    //         }
    //         button {
    //             margin:0.5rem 0.3rem;

    //         }
    //         .btn1 {

    //                 @include btn(1rem,
    //                 0.36rem);
    //                 margin-left:0.7rem;
    //             }
    //              .btn2 {

    //                 @include btnX(1rem,
    //                 0.36rem);
    //             }
    //     }
    // }

}
textarea {
	overflow: hidden;
}

input::-ms-clear {
	display: none;
}

select {
	/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
	/*很关键：将默认的select选择框样式清除*/
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background: transparent;
	/*在选择框的最右侧中间显示小箭头图片*/
	background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
	/*为下拉小箭头留出一点位置，避免被文字覆盖*/
	padding-right: 14px;
}

select::-ms-expand {
	display: none;
}
</style>
