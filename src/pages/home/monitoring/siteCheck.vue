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
		</div>
		<div class="table">
			<input type="button" class="personnel" value="人员" @click="toggle1(1)" :class="{'bord_click':clickBtn==1}" />
			<input type="button" class="assess" value="异常信息" @click="toggle1(2)" :class="{'bord_click':clickBtn==2}" />
			<input type="button" class="assess" value="紧急报警" @click="toggle1(3)" :class="{'bord_click':clickBtn==3}" />
		</div>
		<!--人员页面-->
		<div v-show="clickBtn==1">
			<ul class="table_content">
				<li>序号</li>
				<li>人员</li>
				<li>电量</li>
				<li>巡更进度</li>
				<li>当前状态</li>
			</ul>
			<div class="content_div">
				<ul class="ul_list" v-for='(d,index) in value1'>
					<li>{{index+1}}</li>
					<li>{{d.人员}}</li>
					<li>{{d.电量}}</li>
					<li>{{d.巡更进度}}%</li>
					<li>{{d.当前状态}}</li>
				</ul>
			</div>
		</div>
		<div v-show="clickBtn==2">
			<ul class="table_content1">
				<li>序号</li>
				<li>时间</li>
				<li>人员</li>
				<li>异常信息</li>
				<li>操作</li>
			</ul>
			<div class="content_div">
				<ul class="ul_list" v-for='(d,index) in  value2'>
					<li>{{index+1}}</li>
					<li>{{d.时间}}</li>
					<li>{{d.人员}}</li>
					<li>无异常情况</li>
					<li>
						<input type='button' class="btn" @click="call" value="对讲">
					</li>
				</ul>
			</div>
		</div>
		<!--异常报警-->
		<div v-show="clickBtn==3">
			<ul class="table_content1">
				<li>序号</li>
				<li>时间</li>
				<li>人员</li>
				<li>紧急报警</li>
				<li>操作</li>
			</ul>
			<div class="content_div">
				<ul class="ul_list" v-for='(d,index) in value3'>
					<li>{{index+1}}</li>
					<li>{{d.时间}}</li>
					<li>{{d.人员}}</li>
					<li>无紧急情况</li>
					<li>
						<input type='button' class="btn" @click="call" value="对讲">
					</li>
				</ul>
			</div>
		</div>
		<!--有紧急报警自动弹出<-->
		<div class="zhezhao" v-show="showImg">
			<i class="el-icon-close" @click="hideImg"></i>
		</div>
		<!--底部每页显示-->
		<div class="pager">
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			show: true,
			showImg: false,
			currentPage2: 5,
			abcd: ['物联监控', '人员物联监控', '安防人员', '实时位置监控'],
			value1: [],
			value2: [],
			value3: [],
			value4: [],
			clickBtn: '1'
		}
	},
	components: {
		Bread
	},
	computed: {
		...mapState(['mnUrl']),
	},
	mounted() {
		this.initMap();
		this.getData();
		//this.getMsg();
	},
	methods: {
		toggle1(num) {
			this.clickBtn = num;
		},
		check() {
			this.showImg = true;
		},
		hideImg() {
			this.showImg = false;
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
			map.centerAndZoom(point, 19);
			// 设置鼠标滚轮缩放
			map.enableScrollWheelZoom(true);
		},
		getData() {
			const url = this.mnUrl + "/tmp/watching/person/safe_location"
			this.$http.get(url).then(res => {
				this.value1 = res.body.content;
				this.value2 = res.body.content
				this.value3 = res.body.content
				console.log(this.value1)
			}, function(error) {
				console.log(error)
			})
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
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
	margin-top: 0.29rem;
	left: 0.18rem;
	position: relative;
	background: url(../../../images/pp_VBG.png);
	background-size: cover;
	position: relative;
}

.newdevice1,
.newdevice2,
.newdevice3,
.newdevice4 {
	display: inline-block;
	width: 0.4rem;
	height: 0.4rem;
}

.newdevice1 {
	background: url(../../../assets/newdevice2.png);
	background-size: cover;
	position: absolute;
	left: -0.13rem;
	top: -0.13rem;
}

.newdevice2 {
	background: url(../../../assets/newdevice1.png);
	background-size: cover;
	position: absolute;
	right: -0.13rem;
	top: -0.13rem;
}

.newdevice3 {
	background: url(../../../assets/newdevice3.png);
	background-size: cover;
	position: absolute;
	left: -0.13rem;
	bottom: -0.13rem;
}

.newdevice4 {
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
	top: 0.19rem;
}

.environment {
	display: inline-block;
	width: 0.18rem;
	height: 0.18rem;
	background: url(../../../images/environment.png);
	background-size: cover;
	position: absolute;
	right: 1.1rem;
	top: 0.19rem;
}

.battery_text {
	width: 0.65rem;
	display: inline-block;
	color: white;
	font-size: 0.16rem;
	position: absolute;
	right: 1.5rem;
	top: 0.18rem;
}

.environment_text {
	width: 0.8rem;
	display: inline-block;
	color: white;
	font-size: 0.16rem;
	position: absolute;
	right: 0.2rem;
	top: 0.18rem;
	;
}

.table {
	margin-top: 0.27rem;
	width: 3.96rem;
	height: 0.52rem; // border: 2px solid #78babc;
	overflow: hidden;
	box-sizing: border-box;
	font-size: 0.16rem;
	color: #78babc;
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
	/*// @include actBt(1.32rem,  0.52rem)*/
	@include unactBt(1.32rem, 0.52rem);
}

.table>.assess {
	// border-radius: 0 0.05rem 0.05rem 0;
	@include unactBt(1.32rem, 0.52rem)
}

.table_content,
.table_content1 {
	height: 0.47rem;
	width: 13.94rem;
	background-image: url(../../../images/kaimenNav.png);
	margin-top: 0.1rem;
}

.table_content li {
	width: 20%;
	list-style: none;
	float: left;
	text-align: center;
	height: 0.47rem;
	line-height: 0.47rem;
	color: white;
	font-size: 0.16rem;
}

.table_content1 li {
	width: 20%;
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
	font-size: 0.16rem;
	margin-left: 0.1rem;
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

.ul_list {
	float: left;
	flex: 1;
	display: flex;
	height: 0.7rem;
	width: 100%;
}

.ul_list li {
	display: flex;
	flex: 1;
	-webkit-justify-content: center;
	align-items: center;
	color: white;
	border-bottom: 2px solid #698499;
	-webkit-justify-content: center;
	/*兼容写法*/
	justify-content: center;
	-moz-box-pack: center;
	-webkit--moz-box-pack: center;
	box-pack: center;
}

.ul_list1 {
	float: left;
	flex: 1;
	display: flex;
	height: 0.7rem;
	width: 100%;
}

.ul_list1 li {
	display: flex;
	flex: 1;
	-webkit-justify-content: center;
	align-items: center;
	color: white;
	border-bottom: 2px solid #698499;
	-webkit-justify-content: center;
	/*兼容写法*/
	justify-content: center;
	-moz-box-pack: center;
	-webkit--moz-box-pack: center;
	box-pack: center;
}
.select {
	text-align: center;
	width: 0.61rem;
	height: 0.35rem;
	background: darkgray;
	background-image: url(../../../images/kaimen.png);
	color: white;
	padding-left: 0.15rem;
}

img {
	width: 0.1rem;
	height: 0.22rem;
	@include aa;
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

.bord_click {
	color: #68ffff!important;
	background: linear-gradient(#2477c2, #022749, #072f55)!important;
}

.zhezhao {
	width: 6.3rem;
	height: 4.4rem;
	background: url(../../../images/answerbg.png);
	@include center;
	border-radius: 0.1rem;
	position: absolute;
	background-size: cover;
}

i {
	background: transparent;
	width: 0.18rem;
	height: 0.18rem;
	display: inline-block;
	position: absolute;
	top: 0.05rem;
	right: 0.07rem;
	background: url(../../../images/close.png);
	color: transparent !important;
}

i:hover {
	cursor: pointer;
}

.p1 {
	margin-top: 0.38rem;
}

.p1 span {
	color: white;
	font-size: 0.18rem;
}

.span1 {
	margin-left: 0.29rem;
}

.span2 {
	margin-right: 1.45rem;
}

.ttable {
	width: 100%;
	height: 3.68rem;
	color: white;
	margin-top: 0.12rem;
}

.td_span1 {
	color: white;
	font-size: 0.16rem;
	margin-top: 0.3rem;
}

.td_span2 {
	color: white;
	font-size: 0.16rem;
	margin-top: 0.3rem;
	margin-bottom: 0.3rem;
}

.td p {
	color: white;
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
 .pager {
        float: right;
        margin-top: 0.2rem;
		margin-right:0.45rem;
    }
</style>