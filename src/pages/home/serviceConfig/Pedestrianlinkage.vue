<template>
<div class="Pedestrianlinkage">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="dealer-box">
    <div class="dealer-top">
      <!--最上面两个角-->
      <span class="newdevice3 newdevice4"></span>
      <span class="newdevice1 newdevice4"></span>
      <!--左边的用户身份部分-->
      <div class="dealer-massage">
        用户身份&nbsp&nbsp&nbsp&nbsp
        <select class="date-device">
                        <option value="volvo">红名单</option>
                        <option value="saab">黄名单</option>
                        <option value="opel">黑名单</option>
                        <option value="audi">灰名单</option>
                        <option value="audi">VIP名单</option>
                    </select>
        <p class="select_img"></p>
        </br>
        联动动作
        <div class="dealer-device2">
          <input type="checkbox"> &nbsp&nbsp短消息推送</br>
          <input type="checkbox"> &nbsp&nbspAPP消息推送</br>
          <input type="checkbox"> &nbsp&nbsp呼梯</br>
          <input type="checkbox"> &nbsp&nbsp... ...
        </div>
        </br>
        <section>
          <span class="label">接受人</span>
          <textarea name=""></textarea>
        </section>
        配置名称&nbsp&nbsp&nbsp&nbsp&nbsp<input type="text" placeholder="车行联动配置" class="bus_tx"></br>
        <!--<img src="../../../assets/delete.png" class="delete_img"></img>-->
        <input type="button" class="btn btn1" value="按钮"> <input type="button" class="btn" value="重置">
      </div>
      <!--右边的触发条件部分-->
      <div class="dealer-text">
        触发条件&nbsp&nbsp&nbsp
        <select class="date-device">
                        <option value="volvo">入场</option>
                        <option value="saab">出场</option>
                    </select>
        <p class="select_img"></p>
        </br>
        <section>
          <span class="label1">推送内容&nbsp&nbsp</span>
          <textarea name=""></textarea>
        </section>
        <section>
          <span class="label1">应用到 &nbsp&nbsp&nbsp&nbsp</span>
          <textarea name=""></textarea>
        </section>
      </div>
      <img src="../../../assets/gloss1.png" alt="" class="gloss_img">
    </div>
    <!--中间输入关键字部分-->
    <div class="dealer-center">
      <img src="../../../assets/delete.png" class="delete_img2"></img>
      <input type="text" class="ipt-text" value="" placeholder="请输入关键字">
      <input class="btn2" type="button" value="查询">
      <input class="btn3" type="button" value="删除">
    </div>
    <!--底部导航-->
    <ul class="content_divNav">
      <li class="one_left"><input type="checkbox" name="Fruit" value="" /></li>
      <li>序号</li>
      <li>配置名称</li>
      <li>用户身份</li>
      <li>触发动作</li>
      <li>联动动作</li>
      <li>推送内容</li>
      <li>接收人</li>
      <li>配置应用</li>

    </ul>
    <!--底部中间内容-->
    <div class="content_div">
      <ul class="ul_list" v-for='d in  value'>
        <li class="one_left"><input type="checkbox" name="Fruit" value="" /></li>
        <li>{{d.序号}}</li>
        <li>{{d.配置名称}}</li>
        <li>{{d.用户身份}}</li>
        <li>{{d.触发动作}}</li>
        <li>{{d.联动动作}}</li>
        <li>{{d.推送内容}}</li>
        <li>{{d.接收人}}</li>
        <li>{{d.配置应用}}</li>
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
</div>
</template>
<script>
import Bread from '@/components/common/bread'
import pedestObj from '@/httpData/Pedestrianlinkage'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      abc: ['业务配置', '安防业务配置', '人行出入配置', '人行联动配置'],
      value: []
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState([
      'token', 'mnUrl'
    ])
  },
  components: {
    Bread
  },
  mounted() {},
  methods: {
    getData() {
      this.value = pedestObj.content
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';

// 整个大框
input {
    color: #fff;
}

.Pedestrianlinkage {
    vertical-align: top;
    width: 100%;
    height: 8.96rem;
    display: inline-block;
    margin: 0 auto;
    .dealer-box {
        width: 12.19rem;
        height: 7.46rem;
        margin-top: -0.1rem;
        margin: 0 auto; // 上面那个大盒子
        .dealer-top {
            width: 100%;
            height: 4.9rem;
            background: url(../../../assets/dealers1.png);
            background-size: contain;
            padding: 0.24rem 0.5rem 0.18rem 0.5rem; // 用户身份
            margin-top: 0.08rem;
            position: relative; // 一道光图
            .gloss_img {
                height: 2rem;
                position: absolute;
                bottom: -1rem;
                right: 0rem;
            }
            .newdevice4 {
                display: inline-block;
                width: 0.314rem;
                height: 0.314rem;
                background-size: contain;
                position: absolute;
                left: -0.1rem;
                top: -0.1rem;
            }
            .newdevice3 {
                background: url(../../../assets/newdevice2.png)no-repeat;
            }
            .newdevice1 {
                background: url(../../../assets/newdevice1.png)no-repeat;
            } // 左边用户身份样式
            .dealer-massage {
                display: inline-block;
                width: 5.5rem;
                height: 100%;
                color: #fff;
                padding: 0rem 0rem 0.18rem 0rem;
                input {
                    width: 3.41rem;
                    height: 0.38rem;
                    color: #fff;
                    background: transparent;
                    border: 0.02rem solid #83dbff;
                    border-radius: 0.05rem;
                    margin-top: 0.13rem;
                }
                .delete_img {
                    width: 0.18rem;
                    height: 0.18rem;
                    position: absolute;
                    left: 4.5rem;
                    top: 4rem;
                }
                .bus_tx {
                    color: #7a7f88;
                }
                .btn {
                    border: 0rem;
                    margin: 0.25rem 0 0 0.9rem;
                    @include btn(1.2rem, 0.36rem)
                }
                section {
                    .label {
                        color: #fff;
                    }
                    textarea {
                        margin-left: 0.35rem;
                        margin-top: 0.2rem;
                        vertical-align: middle;
                        @include tare(3.41rem, 1.23rem)
                    }
                }
                .dealer-device2 {
                    width: 3.41rem;
                    height: 1.37rem;
                    border: 0.02rem solid #83dbff;
                    border-radius: 0.05rem;
                    margin-top: 0.13rem;
                    color: #fff;
                    margin-left: 0.18rem;
                    display: inline-block;
                    vertical-align: middle;
                    padding-left: 0.05rem;
                    input {
                        width: 0.15rem;
                        height: 0.15rem; // background: transparent;
                        border: 0.02rem solid #83dbff;
                    }
                } // 小三角样式
                .select_img {
                    width: 0.21rem;
                    height: 0.11rem;
                    background: url(../../../assets/Triangle.png)no-repeat;
                    background-size: contain;
                    position: absolute;
                    left: 4.52rem;
                    top: 0.52rem;
                    display: inline-block;
                    cursor: pointer;
                }
                .date-device {
                    margin-top: 0.13rem;
                    @include myselect(3.41rem);
                }
            } // 触发条件那个框
            .dealer-text {
                display: inline-block;
                width: 4.6rem;
                height: 100%;
                float: right;
                color: #fff;
                position: relative;
                .date-device {
                    margin-top: 0.13rem;
                    @include myselect(3.14rem); // margin-left: 0.85rem;
                    vertical-align: middle;
                }
                .label1 {
                    color: #fff;
                }
                textarea {
                    margin-left: 0.05rem;
                    margin-top: 0.2rem;
                    vertical-align: middle;
                    @include tare(3.14rem, 1.23rem)
                }
                .select_img {
                    width: 0.21rem;
                    height: 0.11rem;
                    background: url(../../../assets/Triangle.png)no-repeat;
                    background-size: contain;
                    position: absolute;
                    left: 3.7rem;
                    top: 0.3rem;
                    display: inline-block;
                    cursor: pointer;
                }
            }
        }
        .dealer-center {
            width: 100%;
            height: 0.70rem;
            line-height: 0.70rem;
            position: relative;
            .delete_img2 {
                width: 0.18rem;
                height: 0.18rem;
                position: absolute;
                left: 2.4rem;
                top: 0.28rem;
                cursor: pointer;
            }
            .ipt-text {
                width: 2.66rem;
                height: 0.38rem;
                background: transparent;
                border: 0.025rem solid #83dbff;
                border-radius: 0.05rem;
                margin-left: 0.05rem;
                color: #7a7f88;
            }
            .btn2 {
                margin-left: 0.2rem;
                @include btn(1.44rem, 0.36rem)
            }
            .btn3 {
                margin-left: 0.2rem;
                @include btnR(1.44rem, 0.36rem);
            }
        }
    }
}

// 底下那个序号表
.content_div {
    background-image: url(../../../images/kaimen.png);
    width: 100%;
    height: 1.4rem;
    overflow: hidden;
    overflow-y: auto;
}

// 序号表头部
.content_divNav {
    flex: 1;
    display: flex;
    height: 0.4rem;
    width: 100%;
    background-image: url(../../../images/kaimenNav.png);
    .one_left {
        border-left: none;
        flex: 0 0 5%;
    }
}

.content_divNav li {
    // float: left;
    text-align: center;
    flex: 1;
    height: 0.4rem;
    line-height: 0.4rem;
    color: white;
    border-left: 0.01rem solid #698499; // font-size:0.12rem;
}

//表格主体内容
.ul_list {
    float: left;
    flex: 1;
    display: flex;
    width: 100%;
    .one_left {
        border-left: none;
        flex: 0 0 5%;
    }
}

.ul_list li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: conter;
    text-align: center;
    height: auto;
    color: white;
    border-bottom: 0.01rem solid #698499;
    font-size: 0.14rem;
    padding: 0.1rem 0;
}

//底部换页框

/*底部换页框*/

.page {
    line-height: 0.6rem;
    width: auto;
    height: 0.6rem;
    background-image: url(../../../images/kaimen.png);
    background-size: 100% 100%;
    float: right;
    margin-top: 0.2rem;
    margin-right: 0.25rem;
    padding-right: 0.1rem;
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
    margin: 0 auto;
    span {
        color: #83dbff;
        margin: 0 0.15rem;
    }
    img {
        width: 0.1rem;
        height: 0.22rem;
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

// 去除textarea右边的样式
textarea {
    overflow: hidden;
}
</style>
