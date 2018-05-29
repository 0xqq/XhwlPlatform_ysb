<template>
	<div class="back_img1">
		<!--顶部logao-->
		<div class="top_logo">
			<img class="img_logo" src="../../images/logo.png" alt="logo" />
			<img class="img_location" src="../../images/position.png" @click.stop="choisePro" />
			<span @click.stop="choisePro">{{nowProject}}</span>
		</div>
		<div class="user">
			<img src="../../images/user01.png"/>
			<span>{{'周健龙'}}</span>
			<div class="select" @click.stop="select" :class="{tir:user_select==true}"></div>
			<ul class="select_ul" v-if="user_select" @mouseleave="select">
				<li @click="usre_out">切换用户</li>
				<li @click="usre_out">退出登录</li>
			</ul>
		</div>
		<!-- 项目地址选择 -->
		<transition name="el-zoom-in-top">
			<!-- 这里空的点击事件不可删 -->
			<div class="choise_position" @click.stop="" v-if="showLtd">
				<iframe class="hide_iframe" frameborder="0" src="about:blank"></iframe>
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
		<!--背景图-->
		<div class="back_img2">
			<!-- 语音接入提示框 -->
			<div class="call_tip" v-if="!openCall&&newCall">
				<iframe class="hide_iframe" frameborder="0" src="about:blank"></iframe>
				<p>您有新的语音接入
				</p>
				<span class="receive_call" @click="showCall">接听</span>
				<span class="refuse_call" @click="refuseCall">挂断</span>
				<audio src="/static/6501.wav" autoplay autobuffer autoloop loop controls>
				</audio>
			</div>
			<!-- 语音接听框 -->
			<div v-if="openCall" class="video_call" v-drag>
				<div class="video_nav">
					<span class="left_open" @click="">一键开门</span>
					<span>400客服中心</span>
					<span class="right" @click="closeVideo"></span>
				</div>
				<iframe class="video_iframe" v-if="openCall" scrolling="no" frameborder="0" src="http://xhmind.com:5050/video.html">
					<p>请使用360浏览器极速模式</p>
				</iframe>
			</div>
			<transition name="el-zoom-in-center">
				<div class="nav_left" v-if="showNav">
					<ul class="ul_nav">
						<!--一级导航-->
						<li class="class_point" @click.stop="goHome">
							<!-- <img src="navHome" alt=""> -->
							<span :class="{ nav_active: indexOne=='首页'}"><img class="img_nav1" src="http://xhmind.com:5050/img/navHome.png" alt="">首页</span>
						</li>
						<li class="class_point" @mouseenter="showAllSevice" @mouseleave="hideAllSevice">
							<span>所有服务</span>
						</li>
						<li v-for="(a,index) in testMenu">
							<span @click="showNav2(a.name)" :class="{ nav_active: indexOne==a.name}"><img class="img_nav1" :src="a.imgUrl" alt="">{{a.name}}</span>
							<!-- <ul class="ul_nav2" v-if="a.name==indexOne"> -->
							<el-collapse-transition>
								<ul class="ul_nav2" v-show="indexOne==a.name">
									<!--二级导航-->
									<!-- <span>二级菜单</span> -->
									<li v-for="b in a.submenu" @click.stop="showThree(b)">
										<span :class="{ nav_active: b.name == indexTwo}">{{b.name}}</span>
									</li>
								</ul>
							</el-collapse-transition>
						</li>
					</ul>
					<!--隐藏箭头-->
					<span class="hide" @click="hide"></span>
				</div>
			</transition>
			<!-- 所有服务框 -->
			<transition name="bounce">
				<div class="all_service" v-if="hasAllSevice||hasStay" @mouseenter="stayAllSevice" @mouseleave="leaveAllSevice">
					<iframe class="hide_iframe" frameborder="0" src="about:blank"></iframe>
					<ul class="all_menu1">
						<li v-for="a in testMenu" @click="allShowContent(a)" :class="{nav_active: allMenu1==a.name}">{{a.name}}</li>
					</ul>
					<div class="all_ul">
						<ul class="all_menu2" v-for="b in allContent">
							<li class="all_name2">
								<span>{{b.name}}</span>
							</li>
							<li>
								<ul class="all_menu3" v-for="c in b.submenu">
									<li class="all_name3" :class="{title3: c.submenu}" @click="golike(c,3)">
										<span>{{c.name}}</span>
									</li>
									<li class="all_name4" v-for="d in c.submenu" @click="golike(d,4)">{{d.name}}</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</transition>
			<!--导航显示箭头-->
			<div class="nav_leftbeack" v-if="!showNav" @click="show" @mouseenter="" @mouseleave="hide">
				<div class="rotate_div Rotation"></div>
				<div class="arrows"></div>
			</div>
			<!--三级导航-->
			<transition name="el-zoom-in-center">
				<div class="nav_side" v-if="navText" :class="{margin_left: navText&&!showNav,_opacity: hasAllSevice||hasStay||showLtd||backHome}">
					<ul class="ul_nav3" :class="{ only_nav3: null==navText[0].submenu}">
						<li class="ul_navli3" v-for="(c,index) in navText" :class="{active_nav3: c.url}" @click="golike(c,3)">
							<span class="nav_span3" :class="{ nav_active: c.name == indexThree }">{{c.name}}</span>
							<ul class="ul_nav4">
								<li v-for="(d,index) in c.submenu" :class="{ nav_active: d.name == indexFour , active_nav3: d.url}" @click="golike(d,4)">{{d.name}}</li>
							</ul>
						</li>
					</ul>
				</div>
			</transition>
			<!--右边内容-->
			<div class="content" :class="{_opacity: hasAllSevice||hasStay||showLtd||backHome}" v-loading.body="false" element-loading-text="拼命加载中">
				<!--编辑内容区域入口-->
				<transition name="router-fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
			<div class="zhezhao"></div>
		</div>

		<!--底部控制器-->
		<div class="control">
			<div class="back_left" @click="Back"></div>
			<div class="back_home" @click.stop="backHome = !backHome">
				<span></span>
			</div>
			<div class="back_right" @click="Go"></div>
		</div>
		<div :class="{small_circle1:backHome==true}">
			<p @click="clickMenuLink"></p>
			<span @click="clickMenuLink">物联监控</span>
		</div>
		<div :class="{small_circle2:backHome==true}">
			<p @click="clickMenusys"></p>
			<span @click="clickMenusys">管理应用</span>
		</div>
		<div :class="{small_circle3:backHome==true}">		
			<p @click="clickMenugloss"></p>
			<span @click="clickMenugloss">业务配置</span>
		</div>
		<div :class="{small_circle4:backHome==true}">		
			<p @click="clickMenumap"></p>
			<span @click="clickMenumap">数据分析</span>
		</div>
		<transition name="el-zoom-in-center">	
			<div v-show="backHome" :class="{big_circle:backHome==true}">			
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import io from 'socket.io-client'
import routerMap from '../../router/routerMap'

//导出home组件模块
export default {
	name: 'home',
	mounted() {
		var _this = this;
		//进入系统后展开相应的菜单
		this.indexOne = window.localStorage.getItem('navOne');
		window.localStorage.setItem('navOne', '');
		if(this.indexOne == "物联监控"){
			this.showThree(this.testMenu[0].submenu[0]);
		}
		if(this.indexOne == "管理应用"){
			this.showThree(this.testMenu[1].submenu[0]);
		}
		if(this.indexOne == "业务配置"){
			this.showThree(this.testMenu[2].submenu[0]);
		}
		if(this.indexOne == "数据分析"){
			this.showThree(this.testMenu[3].submenu[0]);
		}
		//刷新时获取菜单打开的相应项
		this.changeIndexs();
		//注册socket.io
		setTimeout(function(){
			var socket = io.connect('ws://202.105.104.105:8005');
			socket.emit('login', { "roomid": "coppm_data", "userid": _this.genUUID(), "username": _this.genUUID() });//将用户名替换为用户名称
			socket.on('message', function(obj) {
				var msg = JSON.stringify(obj);
				if((_this.$route.path.indexOf('carGuide')== -1)&&(_this.$route.path.indexOf('walkGuide')== -1)&&(_this.$route.path.indexOf('preVideo')== -1)){
					if(!_this.openCall){
					_this.newCall = true;
					}else if(_this.openCall){
						_this.newCall = false;
					}
				}
			});
		},1000)

		setTimeout(function() {
			window.addEventListener("resize", function() {	//监听窗口变化时改变CHANGE_SIZE——echarts图表重绘的依据
				_this.$store.commit('CHANGE_SIZE');
			});
		}, 20)

		//"所有服务"的初始
		this.allContent = this.testMenu[0].submenu;
		this.allMenu1 = this.testMenu[0].name;
		var projectList = window.localStorage.getItem('projectList');
		_this.positionMenu = JSON.parse(projectList);
		_this.clickLtd = _this.positionMenu[0].citys;
		_this.pMenu1 = _this.positionMenu[0].citys;

		//绑定点击事件到body让项目选择弹窗消失
		document.getElementsByTagName("body")[0].addEventListener("click", function() {
			_this.showLtd = false;
			_this.user_select = false;
		});
		document.getElementsByTagName("body")[0].addEventListener("click", function() {
			_this.backHome = false;
		});
	},
	methods: {
		genUUID() {
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
			return uuid;
		},
		show() {
			this.showNav = true;
			this.$store.commit('CHANGE_SIZE');
		},
		showNav2(name) {
			this.$store.commit('CHANGE_SIZE');
			this.indexOne = name;
		},
		hide() {
			this.showNav = false;
			this.$store.commit('CHANGE_SIZE');
		},
		goHome() {
			if (true) {
				this.$router.push({ path: '/' + 'realHome' });
			}
			this.indexOne = '首页';
		},
		showThree(b) {
			this.$store.commit('CHANGE_SIZE');
			this.navText = b.submenu;
			this.indexTwo = b.name;
			if (b.url) {								//如果二级自带菜单就跳转二级
				this.$router.push({ path: '/' + b.url });
			} else if (b.submenu){
				if (!b.submenu[0].submenu && b.submenu[0].url != '') {
					this.indexThree = b.submenu[0].name;
				} else if (b.submenu[0] && b.submenu[0].submenu && b.submenu[0].submenu[0].url != '') {
					this.indexFour = b.submenu[0].submenu[0].name;
				}
				if (b.submenu && b.submenu[0].url) {									//不然跳转三级
					this.indexThree = b.submenu[0].name;
					this.$router.push({ path: '/' + b.submenu[0].url });
				}
				//或四级
				if (b.submenu && b.submenu[0].submenu && b.submenu[0].submenu[0].url) {					
					this.indexFour = b.submenu[0].submenu[0].name;
					this.$router.push({ path: '/' + b.submenu[0].submenu[0].url });
				}
			}
		},
		golike(value, num) {
			if (!value.submenu) {
				if (num == 3 && value.url) {
					this.indexFour = null;
					this.indexThree = value.name;
					this.$router.push({ path: '/' + value.url });
					this.hasStay = false;
				} else if (num == 4 && value.url) {
					this.indexFour = value.name;
					this.indexThree = null;
					this.$router.push({ path: '/' + value.url });
					this.hasStay = false;
				} else return
			}
			else if(value.url&&num == 3) {
				this.indexFour = null;
				this.$router.push({ path: '/' + value.url });
			}
		},
		allShowContent(content) {
			this.allContent = content.submenu;
			this.allMenu1 = content.name;
		},
		showAllSevice() {
			var refThis = this;
			this.allflag = setTimeout(function() {
				refThis.hasAllSevice = true;
				refThis.allContent = refThis.testMenu[0].submenu;
				refThis.allMenu1 = refThis.testMenu[0].name;
			}, 300)
		},
		hideAllSevice() {
			clearTimeout(this.allflag);
			var refThis = this;
			clearTimeout(this.timeFlag);
			this.timeFlag = setTimeout(function() {
				refThis.hasAllSevice = false;
			}, 100)
		},
		stayAllSevice() {
			this.hasStay = true;
		},
		leaveAllSevice() {
			var refThis = this;
			clearTimeout(this.timeFlag);
			this.timeFlag = setTimeout(function() {
				refThis.hasStay = false;
				refThis.hasAllSevice = false;
			}, 100)
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
		back_homeAge() {
			this.backHome = true;
		},
		clickMenuLink() {
			this.$router.push({ path: '/' + 'monit/garden/map' });
			this.backHome = false;
		},
		clickMenugloss() {
			this.$router.push({ path: '/' + 'config/carcfg/carlink' });
			this.backHome = false;
		},
		clickMenusys() {
			this.$router.push({ path: '/' + 'P_projectTote' });
			this.backHome = false;
		},
		clickMenumap() {
			this.$router.push({ path: '/' + 'data/overview' });
			this.backHome = false;
		},
		Back() {
			this.$router.go('-1');
		},
		Go() {
			this.$router.go('+1');
		},
		refuseCall() {
			this.$store.commit('HAS_CALL', 0);	//拒绝通话次数加一
			this.newCall = false;
		},
		showCall() {
			this.$store.commit('HAS_CALL', 1);	//接收通话次数加一
			this.openCall = true;
			this.newCall = false;
		},
		closeVideo() {
			this.openCall = false;
			this.newCall = false;
		},
		select() {
			this.user_select = !this.user_select;
		},
		usre_out() {
			this.$router.push({ path: '/' + 'login' });
		},
		//刷新时根据获取
		changeIndexs(){
			var pathArr = this.$route.path.split('/');
			pathArr.splice(0,1);
			for(let i = 0; i<routerMap.length; i++){
					if(routerMap[i].word&&pathArr[0].indexOf(routerMap[i].word) != -1){
						this.indexOne = routerMap[i].name;
						if(routerMap[i].submenu){
							var oneSub = routerMap[i].submenu;
							i = 1000;
							for(let j = 0; j<oneSub.length; j++){
								if(oneSub[j].word&&pathArr[1].indexOf(oneSub[j].word) != -1){
									this.indexTwo = oneSub[j].name;
									this.navText = oneSub[j].submenu;
									if(oneSub[j].submenu){
										var twoSub = oneSub[j].submenu;
										j = 1000;
										for(let k = 0; k<oneSub.length; k++){
											if(twoSub[k].word&&pathArr[2].indexOf(twoSub[k].word) != -1){
												this.indexThree = twoSub[k].name;
												if(twoSub[k].submenu){
													var threeSub = twoSub[k].submenu;
													k = 1000;
													for(let m = 0; m<twoSub.length; m++){
														if(threeSub[m].word&&pathArr[3].indexOf(threeSub[m].word) != -1){
															this.indexFour = threeSub[m].name;
															m = 1000;
														}
													}
												}
												return
											}
										}
									}
								}
							}
						}
					}
				}
			// showNav2(name);
			console.log(pathArr);
		}
	},
	computed: {
		...mapState(['loading']),
	},
	created() {

	},
	watch: {
		$route: function(){
			this.changeIndexs();
		}
	},
	data() {
		return {
			backHome: false,
			navText: null,		//第二列菜单
			indexOne: null,		//一级菜单点击项
			indexTwo: null,		//二级菜单点击项
			indexThree: null,	//三级菜单点击项
			indexFour: null,	//四级菜单点击项
			showNav: true,		//主菜单显示
			allMenu1: null,		//所有服务的一级菜单点击项
			hasAllSevice: false,//所有服务框是否存在
			hasStay: false,		//鼠标是否停留在所有服务的弹出框上
			allContent: null,
			timeFlag: null,		//所有服务弹出优化细节的定时器
			allflag: null,
			pMenu1: null,
			clickLtd: null,
			showLtd: false,
			nowProject: "中海华庭",
			openCall: false,	//跳转到语音界面
			newCall: false,		//弹出语音提示框
			socket: '',
			user_select: false,
			positionMenu: [
				{
					"name": "广州分公司",
					"id": "1",
					"citys": [
						{
							"name": "长沙城市管理中心",
							"projects": [
								{
									"name": "中海国际东区",
									"projectID": "1-1-1"
								},
								{
									"name": "中海国际四期",
									"projectID": "1-1-1"
								},
							]
						},
					]
				},
			],
			testMenu: routerMap,
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/mixin';
li,
span {
	font-size: 0.16rem;
}

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

.user {
	position: absolute;
	top: 0.5%;
	right: 2.8%;
	width: 1.5rem;
	height: 0.5rem;
	line-height: 0.5rem;
	span {
		width: 0.6rem;
		height: 0.5rem;
		display: inline-block;
		position: absolute;
		left: 25%;
		font-size: 0.14rem;
	}
	img {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		position: absolute;
		left: 2%;
		top: 9%;		
	}
	.select {
		display: inline-block;
        width: 0.20rem;
        height: 0.20rem;
        position: absolute;
        background-image: url(../../images/user_back2.png);
        background-size: cover;
        background-position: center;
        top: 30%;
        right: 10%;
        cursor: pointer;
        z-index: 999;
        transition:transform 0.2s ease-in;
        transform-origin: center 50%;
        -moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
	.tir{      
		transform:rotate(180deg);  
	}
	.select_ul {
		position: absolute;
		top: 100%;
		right: -15%;
		z-index: 1000000;
		background: darkgray;
		li {
			line-height: 0.35rem;
			width: 1rem;
			height: 0.35rem;
			cursor: pointer;
		}
	}
	.select_ul li:hover {
		background-image: url(../../images/zActive.png);
	}
}

// 公司/项目选择器
.choise_position {
	position: absolute;
	left: 2.25rem;
	top: 0.6rem;
	z-index: 10001;
	background-image: url(../../images/homePop.png);
	background-size: 100% 100%;
	padding: 0.5rem;
	padding-left: 0.1rem;
	padding-right: 0.1rem; // margin-left: 2.25rem;
	.hide_iframe {
		position: absolute;
		z-index: -1;		//小五不准改1000.只能负数
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		scrolling: no;
	}
}



/*底部控制器*/

.control {
	width: 19.20rem;
	height: 0.94rem;
	background-image: url(../../images/control.png);
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	position: absolute;
	bottom: 0.2rem;
	
	.back_left {
		position: absolute;
		left: 30%;
		bottom: 5%;
		height: 0.5rem;
		width: 2.3rem;
		cursor: pointer;
	}
	.back_home {
		position: absolute;
		left: 43%;
		height: 0.8rem;
		width: 2.7rem;
		cursor: pointer;
		span {
			display: inline-block;
			margin-top: 0.2rem;
			height: 0.51rem;
			width: 0.51rem;
			background-image: url(../../images/rocket.png);
			background-size: cover;
			background-position: center;
		}
	}
	.back_right {
		cursor: pointer;
		position: absolute;
		right: 30%;
		bottom: 5%;
		height: 0.55rem;
		width: 2.3rem;
	}
}

.big_circle {
	width: 3.54rem;
	height: 2rem;
	background-image: url(../../images/big_circle.png);
	background-size: cover;
	background-position: center;
	position: absolute;
	bottom: 10%;
	left: 40.8%;

}

.small_circle1 {
	width: 1.31rem;
	height: 1.6rem;
	position: absolute;
	animation: myposition1 1s;
	bottom: 12%;
	left: 34.5%;
	text-align: center;
	p {
		width: 1.31rem;
		height: 1.31rem;
		background-image: url(../../images/small_circle1.png);
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}
	span {
		cursor: pointer;
		color: #fff;
	}
}

.small_circle2 {
	width: 1.31rem;
	height: 1.6rem;
	position: absolute;
	animation: myposition2 1s;
	bottom: 26%;
	left: 40.5%;
	text-align: center;
	p {
		width: 1.31rem;
		height: 1.31rem;
		background-image: url(../../images/small_circle3.png);
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}
	span {
		cursor: pointer;
		color: #fff;
	}
}

.small_circle3 {
	width: 1.31rem;
	height: 1.6rem;
	position: absolute;
	animation: myposition3 1s;
	bottom: 26%;
	left: 52.5%;
	text-align: center;
	p {
		width: 1.31rem;
		height: 1.31rem;
		background-image: url(../../images/small_circle2.png);
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}
	span {
		color: #fff;
		cursor: pointer;
	}
}

.small_circle4 {
	width: 1.31rem;
	height: 1.6rem;
	position: absolute;
	animation: myposition4 1s;
	bottom: 12%;
	left: 58.5%;
	text-align: center;
	p {
		width: 1.31rem;
		height: 1.31rem;
		background-image: url(../../images/small_circle4.png);
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}
	span {
		color: #fff;
		cursor: pointer;
	}
}

@keyframes myposition1 {
	from {
		bottom: 6%;
		left: 46.5%;
	}
	to {
		bottom: 12%;
		left: 34.5%;
	}
}

@keyframes myposition2 {
	from {
		bottom: 6%;
		left: 46.5%;
	}
	to {
		bottom: 26%;
		left: 40.5%;
	}
}

@keyframes myposition3 {
	from {
		bottom: 6%;
		left: 46.5%;
	}
	to {
		bottom: 26%;
		left: 52.5%;
	}
}

@keyframes myposition4 {
	from {
		bottom: 6%;
		left: 46.5%;
	}
	to {
		bottom: 12%;
		left: 58.5%;
	}
}
/*第一层背景*/

.back_img1 {
	background-image: url(../../images/back.jpg);
	background-position: center;
	background-size: cover;
	height: 10.80rem;
	width: 19.2rem;
	overflow: hidden;
	position: relative;
}
.call_tip {
	background-color: #03072b;
	width: 5rem;
	height: 3rem;
	border-radius: 0.1rem;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
	text-align: center;
	.hide_iframe {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		scrolling: no;
	}
	span {
		color: #fff;
	}
	audio {
		visibility: hidden
	}
	p {
		color: #fff;
		margin-top: 0.7rem;
		margin-bottom: 0.8rem;
		font-size: 0.25rem;
	}
	.receive_call {
		display: inline-block;
		@include btnG(1rem, 0.4rem);
		margin-right: 0.8rem;
	}
	.refuse_call {
		display: inline-block;
		@include btnR(1rem, 0.4rem)
	}
}

.opreation_div {
	margin-top: 1.5rem; // @include cl2;
}

.video_call {
	height: 8.2rem;
	width: 15rem;
	position: fixed;
	left: 56%;
	top: 48%;
	transform: translate(-50%, -50%);
	z-index: 1000;
	background-image: url(../../images/answerbg.png);
	background-size: cover;
	background-position: center;
}

.video_nav {
	background-image: url(../../images/hover_bar.png);
	height: 0.4rem;
	width: 100%;
	position: absolute;
	top: 0;
	text-align: center;
	line-height: 0.4rem;
	.left_open{
		margin-left: 0.1rem;
		margin-top: 0.05rem;
		float: left;
		display: inline-block;
		@include btnR(1rem, 0.3rem);
	}
	.right {
		width: 0.3rem;
		height: 0.3rem;
		margin-top: 0.05rem;
		background-image: url(../../images/btn_endcall.png);
		background-position: center;
		background-size: cover;
		position: absolute;
		font-size: 0.20rem;
		right: 1%;
		cursor: pointer;
	}
}

.video_iframe {
	height: 8rem;
	width: 15rem;
	/*position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);*/
	z-index: 100; // background-color: red;
}








/*第二层背景*/

.back_img2 {
	font-size: 0!important;
	background-image: url(../../images/back_glass.png);
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	height: 10.8rem;
	width: 19.20rem;
	text-align: left;
	display: flex;
	position: relative;
	padding-right: 0.23rem;
	padding-left: 0.24rem;
}













/*第二层背景*/

.back_img2 {
	font-size: 0!important;
	background-image: url(../../images/back_glass.png);
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
}

// 第二层背景

/*左边导航外框*/

.nav_left {
	background-image: url(../../images/nav-back.png);
	background-size: cover;
	width: 2rem;
	height: 8.96rem;
	margin-top: 0.60rem;
	display: inline-block;
	position: relative;
	z-index: 120; // overflow-y: scroll; 
	// overflow-x: visible;
	// overflow-y: hidden;
}













/*一级导航*/

.click_first {
	background-color: #028fd8;
	color: #fff !important;
}

.ul_nav {
	margin-top: 0.5rem;
	width: 100%;
	float: left;
	color: #FFFFFF;
	position: relative;
}

.ul_nav:hover {
	// cursor : pointer;
}

.ul_nav:active {
	// cursor: default;
}

.ul_nav:visited {
	// cursor: pointer;
}

.ul_nav>li {
	color: #fff; // margin-top: 0.2rem;
	font-size: 0.16rem;

	/*height: 0.3rem;*/
}



.ul_nav>li>span {
	color: #ddd;
	line-height: 0.43rem;
	width: 100%;
	display: block;
	padding-left: 0.25rem;
	font-weight: bold;
	@include aa;
}

.ul_nav>li>span:hover {
	background-image: url(../../images/hover_bar.png);
	background-size: 100% 100%;
	color: #ddd;
}

.img_nav1 {
	display: inline-block;
	height: 0.2rem;
	width: 0.2rem;
	margin-right: 0.1rem;
	margin-bottom: 0.03rem;
}









/*二级导航*/

.ul_nav2 li {
	height: 0.35rem;
	@include aa;
}

.ul_nav2 li:hover {
	background-image: url(../../images/hover_bar.png);
	background-size: 100% 100%;
	span {
		color: #fff;
	}
}

.ul_nav2 li span {

	color: #ccc;
	margin-top: 0.1rem;
	margin-left: 0.65rem;
	line-height: 0.35rem;
}






/*三级导航*/

.ul_nav3 {
	margin-top: 0.1rem;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
}

.ul_nav3 li {}

.nav_span3 {
	color: #a0d7fc;
	margin-top: 0.2rem;
	font-size: 0.16rem;
	line-height: 0.35rem; // height: 0.3rem;
	// padding-left: 0.15rem;
	// padding-right: 0.15rem;
}

.only_nav3 {
	// .ul_navli3 {
	// 	@include aa;
	// 	span {
	// 		&:hover {
	// 			color: #fff!important;
	// 		}
	// 	}
	// }
}

// 四级导航
.ul_nav4 {
	li {
		color: #90e7fc;
		padding-left: 0.3rem;
		font-size: 0.14rem;
		line-height: 0.3rem; // @include aa;
		// &:hover {
		// 	color: #fff;
		// }
	}
}

.active_nav3 {
	@include aa;
	&:hover {
		color: #fff;
	}
	span {
		&:hover {
			color: #fff;
		}
	}
}












/*导航隐藏后返回箭头*/

.nav_leftbeack {
	width: 0.6rem;
	height: 1.5rem;
	margin-left: 0.25rem;
	margin-top: -0.5rem;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	display: inline-block;
	overflow: hidden;
	@include aa; // background-color: red;
}

.rotate_div {
	width: 1.5rem;
	height: 1.5rem;
	background-image: url(../../images/open_nav.png);
	background-size: contain;
	margin-left: -1.12rem;
}

.arrows {
	width: 0.3rem;
	height: 0.3rem;
	position: absolute;
	right: 0.1rem;
	top: 50%;
	transform: translateY(-50%);
	background-image: url(../../images/arrows.png);
	background-size: 100% 100%;
}













/*向左箭头*/

.hide {
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 1.8rem;
	margin-top: -0.4rem;
	font-size: 0.15rem;
	width: 0.3rem;
	height: 0.3rem;
	z-index: 99;
	background-image: url(../../images/arrows.png);
	background-size: 100% 100%;
	transform: rotate(180deg);
	@include aa;
	&:hover {
		background-image: url(../../images/actArrows.png);
	}
}













/*向右箭头*/

.show {
	background-image: url(../../images/show.jpg);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: inline-block;
	margin-left: 0.3rem;
	position: absolute;
	top: 5.0rem; // font-size: 0.2rem;
	width: 0.2rem;
	height: 0.2rem;
	z-index: 1000;
}













/*左边三级导航外边框*/

.nav_side {
	vertical-align: top;
	margin-top: 0.60rem;
	overflow: hidden;
	background-image: url(../../images/nav-side.jpg);
	background-size: cover; // width: 1.43rem;
	height: 8.92rem;
	display: inline-block;
} // 所有服务的弹出框
.all_service {
	height: 8.97rem;
	padding: 0.5rem;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
	position: absolute;
	left: 0;
	margin-left: 2.24rem;
	margin-top: 0.58rem;
	background-image: url(../../images/homePop.png); // background-color: blue;
	background-size: 100% 100%;
	z-index: 1000;
	.hide_iframe {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		scrolling: no;
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
			background-image: url(../../images/hover_bar.png);
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
		background-image: url(../../images/hover_bar.png);
		background-size: 100% 100%;
		span {
			color: #fff;
		}
	}
}

.all_name4 {
	@include aa;
	font-size: 0.14rem;
	color: #ccc;
	line-height: 0.25rem;
	&:hover {
		background-image: url(../../images/hover_bar.png);
		background-size: 100% 100%;
		color: #fff;
	}
}

// 所有服务弹窗的动态样式
.title3 {
	margin-bottom: 0.1rem;
	margin-top: 0.1rem;
	cursor: text!important;
	span {
		color: #ccc!important;
		font-size: 0.19rem!important;
	}
	&:hover {
		color: #ccc!important;
		cursor: text!important;
		background-image: none;
	}
}

.click_allmenu1 {
	background-image: url(../../images/hover_bar.png);
	background-size: 100% 100%;
}













/*右边内容*/

.content {
	// border: 1px solid red;
	vertical-align: top;
	width: 14.45rem;
	height: 8.96rem;
	margin-top: 0.60rem;
	display: inline-block;
	flex: 1;
	padding: 0 0.35rem;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	overflow: hidden;
}

// ::-webkit-scrollbar {
//   width: 0.1rem;
//   height: 0px;
//   background-color:#588095; 
// }
.class_point {
	@include aa;
	span {
		color: #fff!important;
	}
}

.class_point span:hover {
	// background-image: url(../../images/hover_bar.png);
	// background-size: 100% 100%;
}

.margin_left {
	margin-left: 0.5rem;
}

._opacity {
	opacity: 0.1;
}


//旋转导航菜单开关
@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.Rotation {
	-ms-transform: rotate(360deg);
	transform: rotate(360deg); // -webkit-transform: rotate(360deg);
	animation: rotation 5s linear infinite;
	-moz-animation: rotation 5s linear infinite;
	-webkit-animation: rotation 5s linear infinite;
	-o-animation: rotation 5s linear infinite;
}

//发光标题专区
.nav_active {
	color: #fff!important;
	-webkit-animation: neon2 1s ease-in-out infinite alternate;
	-moz-animation: neon2 1s ease-in-out infinite alternate;
	animation: neon2 1s ease-in-out infinite alternate;
}

@keyframes neon2 {
	from {
		text-shadow: 0 0 0.1rem #c5e8f9,
	}
	to {
		text-shadow: 0 0 0.2rem #c5e8f9,
	}
}

//离开、进入动画区
.bounce-enter-active {
	animation: bounce-in .2s;
}

.bounce-leave-active {
	animation: bounce-in .2s reverse;
}

@keyframes bounce-in {
	0% {
		margin-left: 1;
		opacity: 0;
	}
	50% {
		margin-left: 1.5rem;
		opacity: 0.3;
	}
	100% {
		margin-left: 2rem;
		opacity: 1;
	}
}

</style>