<template>
	<div class="peoplePlace">
		<Bread :breadData="abcd"></Bread>
		<div class="new_center_box">
			<!--地图视口-->
			<div id="XSDFXPage" class="XSDFXPage"></div>
			<!--四个直角-->
			<span class="newdevice1"></span>
			<span class="newdevice2"></span>
			<span class="newdevice3"></span>
			<span class="newdevice4"></span>
			<!--视频区域-->
			<div class="video_content">
				<span class="battery"></span>
				<span class="battery_text">显示电量</span>
				<span class="environment"></span>
				<span class="environment_text">显示清洁度</span>
			</div>
		</div>
		<!--底部表格-->
		<div class="table">
			<input type="button" class="personnel" value="人员" @click="toggle1(1)"  :class="{'bord_click':clickBtn==1}" />
			<input type="button" class="assess" value="考核上报" @click="toggle1(2)" :class="{'bord_click':clickBtn==2}" />
		</div>
		<!--人员页面-->
		<div v-show="clickBtn==1">
			<ul class="table_content">
				<li>序号</li>
				<li>人员</li>
				<li>电量</li>
				<li>流量</li>
				<li>清洁度</li>
				<li>操作</li>
			</ul>
			<div class="content_div">
				<ul class="ul_list" v-for='d in  value'>
					<li>{{d.序号}}</li>
					<li>{{d.人员}}</li>
					<li>{{d.电量}}</li>
					<li>{{d.流量}}</li>
					<li>{{d.操作}}</li>
					<li>
						<input type='button' class="btn" @click="call" value="对讲">
					</li>
				</ul>
			</div>
		</div>
		<!--考核上报页面-->
		<div v-show="clickBtn==2">
			<ul class="table_content">
				<li>序号</li>
				<li>人员</li>
				<li>电量</li>
				<li>流量</li>
				<li>考核明细</li>
				<li>操作</li>
			</ul>
			<div class="content_div">
				<ul class="ul_list" v-for='d in  value'>
					<li>{{d.序号}}</li>
					<li>{{d.人员}}</li>
					<li>70</li>
					<li>75</li>
					<li>
						<input type='button' class="btn" @click="check" value="操作">
					</li>
					<li>
						<input type='button' class="btn" @click="call" value="对讲">
					</li>
				</ul>
			</div>
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
</template>

<script>
	import Bread from '@/components/common/bread'
	import { mapState} from 'vuex'	

export default{
	data(){
		return{
			show:true,
			showImg:false,
			abcd: ['物联监控','人员物联监控','环境人员','位置信息'],
			value: [],
			clickBtn:'1',
		}
	},
	mounted(){
		this.initMap();
		this.getData();
	},
	components: {
		Bread
	},
	computed:{
		...mapState(['mnUrl'])
	},
	methods:{
		toggle2(){
			this.show=false;
		},
		toggle1(num) {
			this.clickBtn = num;
		},
		check(){
			this.showImg=true;
		},
		call(){
			
		},
		hideImg(){
			this.showImg=false;
		},
		call() {

		},
		initMap() {
			// 创建Map实例及设置类型
			var map = new BMap.Map("XSDFXPage", { mapType: BMAP_PERSPECTIVE_MAP });
			// 设置中心点坐标
			var point = new BMap.Point(114.058167, 22.540106);
			// 设置地图显示的城市(必须)
			map.setCurrentCity("深圳市");
			// 设置地图级别:1-19越大越清晰
			map.centerAndZoom(point, 18);
			// 设置鼠标滚轮缩放
			map.enableScrollWheelZoom(true);
		},
		getData(){
		 		 const url = this.mnUrl+"/tmp/watching/partrol/person"
					this.$http.get(url).then(res => {
						console.log(res)
						this.value = res.body.content;
						console.log(this.value)
					},function(error){
						console.log(error)
					})
			}	

	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$padding_top: 0.1rem;
* {
	margin: 0;
	padding: 0;
}

.peoplePlace {
	vertical-align: top;
	width: 14.4rem;
	height: 8.96rem; // display: inline-block;
	margin: 0 auto;
}

.new_center_box {
	width: 13.66rem;
	height: 4.32rem;
	margin-top: 0.1rem;
	left: 0.18rem;
	position: relative;
	background: url(../../../images/pp_VBG.png);
	background-size: cover;
	position: relative;
}

.newdevice1 {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../../assets/newdevice2.png);
	background-size: cover;
	position: absolute;
	left: -0.13rem;
	top: -0.13rem;
}

.newdevice2 {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../../assets/newdevice1.png);
	background-size: cover;
	position: absolute;
	right: -0.13rem;
	top: -0.13rem;
}

.newdevice3 {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../../assets/newdevice3.png);
	background-size: cover;
	position: absolute;
	left: -0.13rem;
	bottom: -0.13rem;
}

.newdevice4 {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../../assets/newdevice4.png);
	background-size: cover;
	position: absolute;
	right: -0.13rem;
	bottom: -0.13rem;
}

.battery {
	display: inline-block;
	width: 0.18rem;
	height: 0.18rem;
	background: url(../../../images/battery.png);
	background-size: cover;
	position: absolute;
	right: 2.24rem;
	top: 0.19rem; // right: 2.43rem;
	// top: 0.08rem;
}

.environment {
	display: inline-block;
	width: 0.18rem;
	height: 0.18rem;
	background: url(../../../images/environment.png);
	background-size: cover;
	position: absolute;
	right: 1.1rem;
	top: 0.19rem; // right: 1.42rem;
	// top: 0.08rem;
}

.battery_text {
	width: 0.65rem;
	display: inline-block;
	color: white;
	font-size: 0.16rem;
	position: absolute;
	right: 1.5rem;
	top: 0.18rem; // right: 1.73rem;
	// top: 0.08rem;
}

.environment_text {
	width: 0.8rem;
	display: inline-block;
	color: white;
	font-size: 0.16rem;
	position: absolute;
	right: 0.2rem;
	top: 0.18rem; // right: 0.56rem;
	// top: 0.08rem;
}

.table {
	margin-top: 0.27rem;
	width: 2.7rem;
	height: 0.52rem;
	// border: 2px solid #78babc;
	overflow: hidden;
	box-sizing: border-box;
	border-radius: 0.05rem;
	font-size: 0.16rem;
	color: #78babc;
	/*background: ;*/
}

.table>.personnel,
.table>.assess {
	width: 1.32rem;
	height: 0.52rem;
	font-size: 0.16rem;
	text-align: center;
	line-height: 0.52rem;
	float: left;
	outline: none;
	background: transparent;
	font-weight: bold;
}

.table>.personnel {
	// @include actBt(1.32rem,  0.52rem)
	@include unactBt(1.32rem,  0.52rem)

}

.table>.assess {
	border-radius: 0 0.05rem 0.05rem 0;
	@include unactBt(1.32rem,  0.52rem)
}

.table>.personnel,
.table>.assess:hover {
	cursor: pointer;
}

.table_content {
	height: 0.47rem;
	width: 13.94rem;
	background-image: url(../../../images/kaimenNav.png);
	margin-top: 0.1rem;
}

.table_content li {
	width: 16.6%;
	list-style: none;
	float: left;
	text-align: center;
	height: 0.47rem;
	line-height: 0.47rem;
	color: white;
	font-size: 0.16rem;
}

.btn {
	text-align: center;
	width: 0.4rem;
	height: 0.2rem;
	background: transparent;
	color: white;
	/*border: 1px solid red;*/
	font-size: 0.16rem;
	margin-left: 0.2rem;
}

.btn:hover {
	cursor: pointer;
}

.content_div {
	background-image: url(../../../images/kaimen.png);
	width: 13.94rem;
	height: 1.75rem;
	overflow-y: scroll;
}

.content_divNav li {
		width: 16.6%;
		list-style: none;
		float: left;
		text-align: center;
		height: 0.47rem;
		line-height: 0.47rem;
		color: white;
		/*border: 1px solid #698499;*/ 
		font-size:0.16rem;
	}
	.ul_list{
		float: left;
		flex: 1;
		display: flex;
		height: 1.166rem;
		width: 100%;
	
	}
	.ul_list li{
		display: flex;
		flex: 1;
		-webkit-justify-content: center;
		align-items: center;
		color: white;
		border-bottom: 2px solid #698499;
		-webkit-justify-content:center;
		/*兼容写法*/
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		box-pack:center;
	}



/*底部换页框*/

.page {
	line-height: 0.6rem;
	width: auto;
	height: 0.6rem;
	background-image: url(../../../images/kaimen.png);
	background-size: 100% 100%;
	float: right;
	margin-top: 0.11rem;
	margin-right: 0.45rem;
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
	padding-left: 0.2rem;
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

html,
body,
.XSDFXPage {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin: 0;
	font-family: "微软雅黑";
}
.bord_click{
	color: #68ffff!important;
    background: linear-gradient(#2477c2, #022749, #072f55)!important;
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