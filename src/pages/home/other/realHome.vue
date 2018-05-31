<template>
<div class="back_img1">
  <div class="top_logo">
    <img class="img_logo" src="../../../images/logo.png" alt="logo" />
    <img class="img_location" src="../../../images/position.png" @click.stop="choisePro" />
    <span @click.stop="choisePro">{{nowProject}}</span>
  </div>
  <div class="user">
    <img src="../../../images/user01.png" />
    <span>周健龙</span>
    <div class="select" @click="select" :class="{tir:user_select==true}"></div>
    <ul class="select_ul" v-if="user_select" @mouseleave="select">
      <li @click="usre_out">切换用户</li>
      <li @click="usre_out">退出登录</li>
    </ul>
  </div>
  <!-- 项目地址选择 -->
  <transition name="el-zoom-in-top">
    <!-- 这里空的点击事件不可删 -->
    <div class="choise_position" @click.stop="" v-if="showLtd">
      <ul class="all_menu1">
        <li v-for="a in positionMenu" @click.stop="choiseLtd(a)" :class="{nav_active: pMenu1==a.name}">{{a.name}}</li>
      </ul>
      <div class="all_ul">
        <ul class="all_menu2" v-for="b in clickLtd">
          <li class="all_name2">
            <span>{{b.name}}</span>
          </li>
          <li>
            <ul class="all_menu3" v-for="c in b.projects">
              <li class="all_name3" @click="goProject(c)">
                <span>{{c.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <div class="back_img2">
    <div class="data">
      <div class="data_one"></div>
      <div class="data_two"></div>
      <div class="data_three"></div>
      <div class="data_four"></div>
      <div class="data_five"></div>
      <div class="data_six"></div>
      <div class="data_seven"></div>
      <div class="data_eight"></div>
      <div class="data_nine"></div>
    </div>
    <div class="setting">
      <img src="../../../images/glass14.png" alt="">
    </div>
    <div class="link" @mouseenter="light(1)" @mouseleave="light(0)">
      <div v-if="showItem!=1">
        <span class="img_one"></span>
        <span class="img_two"></span>
        <span class="img_three"></span>
        <span class="img_four"></span>
        <div class="link_text">
          <p>物联监控</p>
        </div>
      </div>
    </div>
    <div class="link_gloss" v-if="showItem==1" @mouseenter="light(1)" @mouseleave="light(0)" @click="clickMenuLink">
      <span class="img_one"></span>
      <span class="img_two"></span>
      <span class="img_three"></span>
      <span class="img_four"></span>
      <div class="link_text">
        <p>物联监控</p>
        <span class="img_five"></span>
        <img class="img_six" src="../../../images/glass28.png" alt="">
      </div>
    </div>

    <div class="business" @mouseenter="light(2)" @mouseleave="light(0)">
      <div v-if="showItem!=2">
        <span class="img_one"></span>
        <span class="img_two"></span>
        <span class="img_three"></span>
        <span class="img_four"></span>
        <div class="link_text">
          <p>管理应用</p>
        </div>
      </div>
    </div>
    <div class="business_gloss" v-if="showItem==2" @mouseenter="light(2)" @mouseleave="light(0)" @click="clickMenugloss">
      <span class="img_one"></span>
      <span class="img_two"></span>
      <span class="img_three"></span>
      <span class="img_four"></span>
      <div class="link_text">
        <p>管理应用</p>
        <span class="img_five"></span>
        <img class="img_six" src="../../../images/glass28.png" alt="">
      </div>
    </div>
    <div class="apply">
      <div class="apply_one">
        <img src="../../../images/glass30.png" alt="">
        <img src="../../../images/glass31.png" alt="">
      </div>
      <div class="apply_two">
        <img src="../../../images/glass30.png" alt="">
        <img src="../../../images/glass31.png" alt="">
      </div>
      <div class="apply_three">
        <img src="../../../images/glass30.png" alt="">
        <img src="../../../images/glass31.png" alt="">
      </div>
      <div class="apply_four">
        <img src="../../../images/glass30.png" alt="">
        <img src="../../../images/glass31.png" alt="">
      </div>
      <div class="apply_five">
        <img src="../../../images/glass30.png" alt="">
        <img src="../../../images/glass31.png" alt="">
      </div>
    </div>
    <div class="systems" @mouseenter="light(3)" @mouseleave="light(0)">
      <div v-if="showItem!=3">
        <span class="img_one"></span>
        <span class="img_two"></span>
        <span class="img_three"></span>
        <span class="img_four"></span>
        <div class="link_text">
          <p>业务配置</p>

        </div>
      </div>
    </div>
    <div class="systems_box" v-if="showItem==3" @mouseenter="light(3)" @mouseleave="light(0)" @click="clickMenusys">
      <span class="img_one"></span>
      <span class="img_two"></span>
      <span class="img_three"></span>
      <span class="img_four"></span>
      <div class="link_text">
        <p>业务配置</p>
        <span class="img_five"></span>
        <img class="img_six" src="../../../images/glass28.png" alt="">
      </div>
    </div>
    <div class="place">
      <div class="one" v-if="showItem==3">
        <img src="../../../images/glass9.png" alt="">
      </div>
      <div class="two" v-if="showItem==1">
        <img src="../../../images/glass10.png" alt="">
      </div>
      <div class="three" v-if="showItem==2">
        <img src="../../../images/glass11.png" alt="">
      </div>
      <div class="four" v-if="showItem==4">
        <img src="../../../images/glass12.png" alt="">
      </div>
    </div>
    <div class="map" @mouseenter="light(4)" @mouseleave="light(0)">
      <div v-if="showItem!=4">
        <span class="img_one"></span>
        <span class="img_two"></span>
        <span class="img_three"></span>
        <span class="img_four"></span>
        <div class="link_text">
          <p>数据分析</p>
        </div>
      </div>
    </div>
    <div class="map_box" v-if="showItem==4" @mouseenter="light(4)" @mouseleave="light(0)" @click="clickMenumap">
      <span class="img_one"></span>
      <span class="img_two"></span>
      <span class="img_three"></span>
      <span class="img_four"></span>
      <div class="link_text">
        <p>数据分析</p>
        <span class="img_five"></span>
        <img class="img_six" src="../../../images/glass28.png" alt="">
      </div>
    </div>
  </div>
  <!-- <div class="control"></div> -->
</div>
</template>
<script>
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      menuList: [{
        "name": "物联监控",
        "url": "carGuide"
      }, {
        "name": "数据应用",
        "url": ""
      }, {
        "name": "业务应用",
        "url": ""
      }, {
        "name": "系统管理",
        "url": ""
      }],
      showItem: 0,
      dimLink: true,
      showOld: true,
      businessGloss: true,
      systemsGloss: true,
      mapGlass: true,
      pMenu1: null,
      clickLtd: null,
      showLtd: false,
      user_select: false,
      nowProject: "中海华庭",
      positionMenu: [{
        "name": "上海分公司",
        "id": "1",
        "citys": [{
            "centreName": "上海城市管理中心",
            "projects": [{
                "name": "上海中海国际东区",
                "projectID": "1-1-1"
              },
              {
                "name": "上海中海国际四期",
                "projectID": "1-1-1"
              },
            ]
          },
          {
            "centreName": "上海长沙城市管理中心",
            "projects": [{
                "name": "上海中海国际东区",
                "projectID": "1-1-1"
              },
              {
                "name": "上海中海国际四期",
                "projectID": "1-1-1"
              },
            ]
          },
        ]
      }, ],
    }
  },
  computed: {
    ...mapState(['projectList', 'mnUrl'])
  },
  mounted() {
    var _this = this;
    //绑定点击事件到body让项目选择弹窗消失
    document.getElementsByTagName("body")[0].addEventListener("click", function() {
      _this.showLtd = false;
    });
    // var url = this.mnUrl + '/organizations';
    // this.$http.get(url).then(res => {
    //     var projectList = JSON.stringify(res.body.content[0].children);
    //     window.localStorage.setItem('projectList', projectList);
    //     projectList = window.localStorage.getItem('projectList');
    //     _this.positionMenu = JSON.parse(projectList);
    //     _this.clickLtd = _this.positionMenu[0].citys;
    //     _this.pMenu1 = _this.positionMenu[0].citys;
    // }, err => {
    //     console.log("请求失败")
    // })
  },
  methods: {
    light(num) {
      this.showItem = num;
      this.dimLink = false;
      // console.log("进来了")
    },
    clickMenuLink() {
      window.localStorage.setItem('navOne', "物联监控");
      this.$router.push({
        path: '/' + 'monit/garden/map'
      });
    },
    clickMenugloss() {
      window.localStorage.setItem('navOne', "管理应用");
      this.$router.push({
        path: '/' + 'P_projectTote'
      });
    },
    clickMenusys() {
      window.localStorage.setItem('navOne', "业务配置");
      this.$router.push({
        path: '/' + 'config/carcfg/carlink'
      });
    },
    clickMenumap() {
      window.localStorage.setItem('navOne', "数据分析");
      this.$router.push({
        path: '/' + 'data/overview'
      });
    },
    choiseLtd(ltd) {
      this.pMenu1 = ltd.name;
      this.clickLtd = ltd.citys;
    },
    choisePro() {
      this.showLtd = true;
    },
    goProject(project) {
      this.nowProject = project.name;
    },
    select() {
      this.user_select = !this.user_select;
    },
    usre_out() {
      this.$router.push({
        path: '/' + 'login'
      });
    }
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
* {
    padding: 0;
    margin: 0;
}
.back_img1 {
    background-image: url(../../../images/back.jpg);
    background-position: center;
    background-size: cover;
    height: 10.80rem;
    width: 19.20rem; // overflow: hidden;
    position: relative;
    .top_logo {
        position: absolute;
        height: 0.56rem;
        z-index: 100;
        .img_logo {
            width: 0.85rem;
            height: 0.56rem;
            display: inline-block;
            vertical-align: middle;
            @include aa;
            margin-left: 0.8rem;
        }
        .img_location {
            display: inline-block;
            width: 0.45rem;
            height: 0.5rem;
            vertical-align: middle;
            @include aa;
            margin-left: 0.2rem; // margin-right: 0.01rem;
        }
    }
    .top_logo span {
        color: #FFFFFF;
        line-height: 0.56rem;
        height: 0.61rem;
        display: inline-block;
        @include aa;
        &:hover {
            text-shadow: 0.02rem 0 0.2rem #fff;
        }
    }
    .control {
        width: 19.20rem;
        height: 0.94rem;
        background-image: url(../../../images/control.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: absolute;
        bottom: 0.2rem;
    }
    .choise_position {
        position: absolute;
        left: 2.25rem;
        top: 0.6rem;
        z-index: 10001;
        background-image: url(../../../images/homePop.png);
        background-size: 100% 100%;
        padding: 0.5rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem; // margin-left: 2.25rem;
    } //发光标题专区
    .nav_active {
        color: #fff!important;
        -webkit-animation: neon2 1s ease-in-out infinite alternate;
        -moz-animation: neon2 1s ease-in-out infinite alternate;
        animation: neon2 1s ease-in-out infinite alternate;
    }
    //用户头像
	.user{
		position: absolute;
		top: 0.5%;
		right: 2.8%;
		width: 1.5rem;
		height: 0.5rem;
		line-height: 0.5rem;
		span{
			width: 0.6rem;
			height: 0.5rem;
			display: inline-block;
			position: absolute;
			left: 25%;
			font-size: 0.14rem;
		}
		img{
			width: 0.4rem;
			height: 0.4rem;
			border-radius: 50%;
			position: absolute;
			left: 2%;
			top: 9%;
		}
		.select{
			display: inline-block;
	        width: 0.20rem;
	        height: 0.20rem;
	        position: absolute;
	        background-image: url(../../../images/user_back2.png);
	        background-size: cover;
	        background-position: center;
	        top: 30%;
	        right: 10%;
	        cursor: pointer;
	        z-index: 999;
	        transition:transform 0.2s ease-in;
        	transform-origin: center 50%;
		}
		.tir{
			transform:rotate(180deg);
		}
		.select_ul{
			position: absolute;
			right: -15%;
			top: 100%;
			z-index: 1000000;
			background: darkgray;
			li{
				line-height: 0.35rem;
				width: 1rem;
				height: 0.35rem;
				cursor: pointer;

			}
		}
		.select_ul li:hover{
			background-image: url(../../../images/zActive.png);
		}
	}
    @keyframes neon2 {
        from {
            text-shadow: 0 0 0.1rem #c5e8f9,
        }
        to {
            text-shadow: 0 0 0.2rem #c5e8f9,
        }
    }
    .all_menu1 {
        display: inline-block;
        vertical-align: top;
        border-right: 0.02rem solid #83dbff;
        li {
            line-height: 0.3rem;
            padding-right: 0.25rem;
            padding-left: 0.25rem;
            color: #ccc;
            &:hover {
                background-image: url(../../../images/hover_bar.png);
                background-size: 100% 100%;
                @include aa;
            }
        }
    }
    .all_ul {
        display: inline-block;
        vertical-align: top;
    }

    .all_menu2 {
        margin-left: 0.15rem;
        margin-right: 0.15rem;
        display: inline-block;
        vertical-align: top;
    }

    .all_name2 {
        margin-bottom: 0.1rem;
        span {
            font-size: 0.18rem;
            color: #fff;
            line-height: 0.3rem;
            border-bottom: 0.02rem solid #83dbff;
        }
    }

    .all_name3 {
        @include aa;
        span {
            font-size: 0.14rem;
            line-height: 0.3rem;
            color: #ccc;
        }
        &:hover {
            background-image: url(../../../images/hover_bar.png);
            background-size: 100% 100%;
            span {
                color: #fff;
            }
        }
    }
    .back_img2 {
        font-size: 0!important;
        background-image: url(../../../images/back_glass.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        height: 10.80rem;
        width: 19.20rem;
        text-align: left;
        display: flex;
        position: relative;
        padding-right: 0.23rem;
        padding-left: 0.24rem;
        .data {
            width: 2.92rem;
            height: 1.18rem; // background: url(../../../images/glass1.png)no-repeat;
            // background-size: cover;
            position: absolute;
            top: 1rem;
            left: 0.5rem;
            div {
                opacity: 0.5;
                 border-radius: 0.05rem;
                background: linear-gradient(#03307d, #0e6484);
                margin-top: 0.08rem;
            }
            .data_one {
                height: 0.06rem;
                width: 1.74rem;

                animation: dataAnima 1s infinite alternate linear;
            }
            .data_two {
                height: 0.06rem;
                width: 2rem;
                animation: dataAnima 1.2s 1s infinite alternate linear;
            }
            .data_three {
                height: 0.06rem;
                width: 1rem;
                animation: dataAnima 1s 1s infinite alternate linear;
            }
            .data_four {
                height: 0.06rem;
                width: 1.3rem;
                animation: dataAnima 2s 2s infinite alternate linear;
            }
            .data_five {
                height: 0.06rem;
                width: 0.8rem;
                animation: dataAnima 3.5s 1s infinite alternate linear;
            }
            .data_six {
                height: 0.06rem;
                width: 2.3rem;
                animation: dataAnima 1.4s 2s infinite alternate linear;
            }
            .data_seven {
                height: 0.06rem;
                width: 1.5rem;
                animation: dataAnima 1.3s 1s infinite alternate linear;
            }
            .data_eight {
                height: 0.06rem;
                width: 1.7rem;
                animation: dataAnima 1.6s 2s infinite alternate linear;
            }
            .data_nine {
                height: 0.06rem;
                width: 1.3rem;
                animation: dataAnima 1.7s 1s infinite linear;
            }
        }
        .setting {
            position: absolute;
            right: 0.05rem;
            top: 0.05rem;
            @include aa;
            img {
                width: 0.56rem;
                height: 0.56rem;
            }
        }

        .link {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            left: 2.7rem;
            top: 2rem;
            span {
                 width: 2.5rem;
                height: 2.5rem;
                display: inline-block;
                background-size: contain;
                @include aa;
                @include center;
            }
            @include aa;
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass19.png);
            }
            .img_two {
                background-image: url(../../../images/glass3.png);
            }
            .img_three {
                background-image: url(../../../images/glass6.png);
            }
            .img_four {
                background-image: url(../../../images/glass8.png);
            }
            .link_text {
                .img_five {
                    position: absolute;
                    top: 1.1rem;
                    left: 2rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #999;
                    font-size: 0.18rem;
                    position: absolute;
                    left: 2.3rem;
                    top: 0.7rem;
                }
                .img_six {
                    position: absolute;
                    left: 4.3rem;
                    top: 1.25rem;
                    transform: rotate(180deg)
                }
            }
        }
        .link_gloss {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            left: 2.7rem;
            top: 2rem;
            @include aa;
            span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                 background-size: contain;
                   position: absolute;
                left: -0.1rem;
                top: -0.1rem;
                 @include aa;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass18.png);
                @include center;
            }
            .img_two {
                background-image: url(../../../images/glass4.png);
                animation: Turn 8s infinite linear;
            }
            .img_three {
                background-image: url(../../../images/glass5.png);
                animation: TurnRun 8s infinite linear;
            }
            .img_four {
                background-image: url(../../../images/glass7.png);
                animation: Turn 8s infinite linear;
            }
            .link_text {
                .img_five {
                    display: inline-block;
                    width: 4.88rem;
                    height: 1.50rem;
                    background-image: url(../../../images/glass24.png);
                    background-size: contain;
                    position: absolute;
                    top: 1.1rem;
                    left: 2rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #fff;
                    font-size: 0.18rem;
                    position: absolute;
                    left: 2.3rem;
                    top: 0.7rem;
                }
                .img_six {
                    position: absolute;
                    left: 4.3rem;
                    top: 1.25rem;
                    transform: rotate(180deg)
                }
            }
        }
        .business {
            width: 2.26rem;
            height: 2.25rem;
            float: right;
            position: absolute;
            right: 4rem;
            top: 1.5rem;
            @include aa;
            span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                  background-size: contain;
                @include aa;
                @include center;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass15.png);
            }
            .img_two {
                background-image: url(../../../images/glass3.png);
            }
            .img_three {
                background-image: url(../../../images/glass6.png);
            }
            .img_four {
                background-image: url(../../../images/glass8.png);
            }
            .link_text {
                .img_five {
                    position: absolute;
                    left: -3rem;
                    top: 1.2rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #999;
                    font-size: 0.18rem;
                    position: absolute;
                    left: -1rem;
                    top: 0.8rem;
                }
                .img_six {
                    position: absolute;
                    left: -1rem;
                    top: 1.3rem; // transform: rotate(180deg)
                }
            }
        }
        .business_gloss {
            width: 2.26rem;
            height: 2.25rem;
            @include aa;
            position: absolute;
            right: 4rem;
            top: 1.5rem;
            span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                 background-size: contain;
                position: absolute;
                left: -0.1rem;
                top: -0.1rem;
                 @include aa;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass22.png);
                @include center;
            }
            .img_two {
                background-image: url(../../../images/glass4.png);
                animation: Turn 8s infinite linear;

            }
            .img_three {
                background-image: url(../../../images/glass5.png);
                animation: TurnRun 8s infinite linear;
            }
            .img_four {
                background-image: url(../../../images/glass7.png);
                animation: Turn 8s infinite linear;
            }
            .link_text {
                .img_five {
                    display: inline-block;
                    width: 3.07rem;
                    height: 1.57rem;
                    background-image: url(../../../images/glass25.png);
                    background-size: contain;
                    position: absolute;
                    left: -2.8rem;
                    top: 1.2rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #fff;
                    font-size: 0.18rem;
                    position: absolute;
                    left: -1rem;
                    top: 0.8rem;
                }
                .img_six {
                    position: absolute;
                    left: -1rem;
                    top: 1.3rem; // transform: rotate(180deg)
                }
            }
        }

        .place {
            width: 14.56rem;
            height: 2.05rem;
            background: url(../../../images/glass13.png)no-repeat;
            background-size: 100% 100%;
            margin-top: -0.5rem;
            @include center;
            div{
            width: 14.56rem;
                height: 2.05rem;
                position: absolute;
                top: 0;
                left: 0rem;
            }
              img {
                    width: 14.56rem;
                    height: 2.05rem;
                }
        }
        .apply {
            width: 4.71rem;
            height: 2.65rem;
            background: url(../../../images/glass29.png) no-repeat;
            background-size: cover;
            position: absolute;
            left: 0.2rem;
            bottom: 1.3rem;
            .div{
                 width: 0.43rem;
                height: 0.43rem;

            }
            img {
                opacity: 0.5;
                 width: 0.43rem;
                    height: 0.43rem;
                     @include center;
            }
            .apply_one {
                position: absolute;
                left: 0.33rem;
                top: 0.17rem; // bottom: 1.3rem;
                img {
                    animation: Turn 2s infinite linear;
                }
            }
            .apply_two {
                position: absolute;
                left: 1.28rem;
                top: 0.85rem; // bottom: 1.3rem;
                img {
                    animation: Turn 2.2s infinite linear;
                }
            }
            .apply_three {
                position: absolute;
                left: 2.25rem;
                top: 0.19rem; // bottom: 1.3rem;
                img {
                    animation: Turn 2.3s infinite linear;
                }
            }
            .apply_four {
                position: absolute;
                left: 3.17rem;
                top: 0.85rem; // bottom: 1.3rem;
                img {
                    animation: Turn 2.4s infinite linear;
                }
            }
            .apply_five {
                position: absolute;
                left: 4.1rem;
                top: 0.23rem; // bottom: 1.3rem;
                img {
                    animation: Turn 2.3s infinite linear;
                }
            }
        }
        .systems {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            left: 5rem;
            bottom: 2rem;
            @include aa;
            span {
                display: inline-block;
                width: 2.5rem;
                height: 2.5rem;
                 background-size: contain;
                @include aa;
                @include center;
            }

            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass20.png);
            }
            .img_two {
                background-image: url(../../../images/glass3.png);
            }
            .img_three {
                background-image: url(../../../images/glass6.png);
            }
            .img_four {
                background-image: url(../../../images/glass8.png);
            }
            .link_text {
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #999;
                    font-size: 0.18rem;
                    position: absolute;
                    left: 2.5rem;
                    top: 0.9rem;
                }
            }
        }
        .systems_box {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            left: 5rem;
            bottom: 2rem;
            @include aa;
            span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                 background-size: contain;
                position: absolute;
                left: -0.1rem;
                top: -0.1rem;
                  @include aa;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass21.png);
                @include center;
            }
            .img_two {
                background-image: url(../../../images/glass4.png);
                animation: Turn 8s infinite linear;

            }
            .img_three {
                background-image: url(../../../images/glass5.png);
                animation: TurnRun 8s infinite linear;
            }
            .img_four {
                background-image: url(../../../images/glass7.png);
                animation: Turn 8s infinite linear;
            }
            .link_text {
                .img_five {
                    display: inline-block;
                    width: 2.49rem;
                    height: 2.35rem;
                    background-image: url(../../../images/glass26.png);
                    background-size: contain;
                    position: absolute;
                    left: 2.1rem;
                    top: -1rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #fff;
                    font-size: 0.18rem;
                    position: absolute;
                    left: 2.5rem;
                    top: 0.9rem;
                }
                .img_six {
                    position: absolute;
                    left: 2.5rem;
                    top: 1.5rem; // transform: rotate(180deg)
                    transform: rotate(180deg)
                }
            }
        }

        .map {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            right: 1.5rem;
            bottom: 2rem;
            @include aa;
             span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                  background-size: contain;
                @include aa;
                @include center;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass16.png);
            }
            .img_two {
                background-image: url(../../../images/glass3.png);
            }
            .img_three {
                background-image: url(../../../images/glass6.png);
            }
            .img_four {
                background-image: url(../../../images/glass8.png);
            }
            .link_text {
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #999;
                    font-size: 0.18rem;
                    position: absolute;
                    left: -1rem;
                    top: 0.9rem;
                }
            }
        }
        .map_box {
            width: 2.26rem;
            height: 2.25rem;
            position: absolute;
            right: 1.5rem;
            bottom: 2rem;
            @include aa;
           span {
                display: inline-block;
                 width: 2.5rem;
                height: 2.5rem;
                 background-size: contain;
                  position: absolute;
                left: -0.1rem;
                top: -0.1rem;
                @include aa;
            }
            .img_one {
                width: 0.65rem;
                height: 0.65rem;
                background-image: url(../../../images/glass17.png);
                @include center;
            }
            .img_two {
                background-image: url(../../../images/glass4.png);
                animation: Turn 8s infinite linear;
            }
            .img_three {
                background-image: url(../../../images/glass5.png);
                animation: TurnRun 8s infinite linear;
            }
            .img_four {
                background-image: url(../../../images/glass7.png);
                animation: Turn 8s infinite linear;
            }
            .link_text {
                .img_five {
                    display:inline-block;
                    width: 3rem;
                    height: 2.5rem;
                     background-image: url(../../../images/glass23.png);
                    background-size: 100% 100%;
                    position: absolute;
                    left: -2.7rem;
                    top: -1.2rem;
                }
                p {
                    width: 1.18rem;
                    height: 0.29rem;
                    color: #fff;
                    font-size: 0.18rem;
                    position: absolute;
                    left: -1rem;
                    top: 0.9rem;
                }
                .img_six {
                    position: absolute;
                    left: -1rem;
                    top: 1.4rem; // transform: rotate(180deg)
                    // transform: rotate(180deg)
                }
            }
        }
    }
}

@keyframes Turn {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

@keyframes TurnRun {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dataAnima {
    from {
        width: 0.5rem;
    }
    to {
        width: 100%;
    }
}
</style>
