<template>
	<div class="newdevice">
		<!--业务配置/设备监控阀值配置组件-->
		<Bread :breadData="abc"></Bread>
		<div class="device-nav">
			<div class="top_div1">
				<span class="span_left" >新建网络监控</span>
			</div>
		</div>
		<div class="new_center_box">
			<span class="newdevice2"></span>
			<span class="newdevice3"></span>
			<span class="newdevice1"></span>
			<span class="newdevice5"></span>
			<div class="new_Device_center_ul">
				<!--上面4个小边框-->
				<section class="section1">
					<span class="label">配置日期</span>
					<textarea name="">{{datas.配置日期}}</textarea>
				</section>
				<section class="section1">
					<span class="label">配置名称</span>
					<textarea name="">{{datas.配置名称}}</textarea>
				</section>
				<section class="section1">
					<span class="label">监控对象类型</span>
					<textarea name="">{{datas.监控对象类型}}</textarea>
				</section>
				<span class="label">监控对象名称</span>&nbsp&nbsp&nbsp&nbsp
				<select class="date_device">
					<option value="volvo">{{datas.监控对象名称}}</option>
					<option value="saab">张三</option>
					<option value="opel">王五</option>
					<option value="audi">李四</option>
				</select>
				<section class="section1">
					<span class="label">报警阈值 </span>
					<textarea name="">{{datas.报警阈值}}</textarea>
				</section>
				<section class="section1">
					<span class="label">触发动作</span>
					<textarea name="">{{datas.触发动作}}</textarea>
				</section>
				<span class="label">推送方式</span>
				<input class="ipt1" type="checkbox" name="">APP推送
				<input class="ipt1" type="checkbox" name="">短信推送</br>
				<section>
					<span class="label1 ">推送内容</span>
					<textarea name="">{{datas.推送内容}}</textarea>
				</section>
				<section>
					<span class="label1">接收人</span>
					<textarea name="">{{datas.接收人}}</textarea>
				</section>

			</div>
			<!--中间左箭头点击图片-->
			<div class="newdevice_info">
				<a href="javascript:void(0)" class="newdevice_a"> <img class="newdevice_img" src="../../../assets/newdevice6.png" alt=""></a>
			</div>

			<div class="new_Device_right">
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
			</div>
			<!--!--确认点击和取消点击按钮-->
			<img src="../../../assets/gloss3.png" alt="" class="gloss_img">

		</div>
		<div class="box_btn">
			<button @click="device_t">确认</button>
			<router-link  to="/networKmonitoring">
				<button class="btn2">取消</button>
			</router-link>
			
		</div>

	</div>
</template>
<script>
import Bread from '@/components/common/bread'
export default {
	data() {
		return {
			abc: ['业务配置', '物联业务', '网络监控阀值配置', '新建网络监控'],
			datas: {}
		}
	},
	computed: {

	},
	components: {
		Bread
	},
	mounted() {
		this.add();
	},
	methods: {
		add() {
			this.datas = this.$route.query.value;
		},
		device_t(){
            this.$router.push({ path: '/networKmonitoring'});
		},
	}
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.newdevice {
	vertical-align: top;
	width: 14.4rem;
	height: 8.96rem; // display: inline-block;
	margin: 0 auto;
}







/*顶部长条外框*/

.top_div1 {
	width: 13.41rem;
	height: 0.5rem;
	margin: 0 auto;
	margin-bottom: 0.33rem;
}

.span_left {
	text-align: center;
	display: inline-block;
	width: 1.86rem;
	height: 0.5rem;
	line-height: 0.5rem;
	color: #70CCFC;
	background-image: url(../../../images/rectangle2.png);
	background-position: center;
}

.new_center_box {
	// display:inline-block;
	width: 10.73rem; // height: auto;
	height: 6.56rem;
	padding: 0.21rem 0rem 0.36rem 0.12rem;
	background: url(../../../images/blue.png);
	margin: 0 auto;
	position: relative;
	.newdevice2 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice3.png)no-repeat;
		background-size: contain;
		position: absolute;
		left: -0.1rem;
		bottom: -0.1rem;
	}
	.newdevice3 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice2.png)no-repeat;
		background-size: contain;
		position: absolute;
		left: -0.1rem;
		top: -0.1rem;
	}
	.newdevice1 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice1.png)no-repeat;
		background-size: contain;
		position: absolute;
		right: -0.1rem;
		top: -0.1rem;
	}
	.newdevice5 {
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		background: url(../../../assets/newdevice4.png)no-repeat;
		background-size: contain;
		position: absolute;
		right: -0.1rem;
		bottom: -0.1rem;
	}
	.new_Device_center_ul {
		display: inline-block;

		color: #fff;

		.ipt1 {
			width: 0.14rem;
			height: 0.14rem;
			margin-left: 0.3rem;
			margin-bottom: 0.25rem;
		}
		.label {
			display: inline-block;
			width: 1.1rem;
			height: 0.3rem;
			color: #fff; // border:2px solid #154777;
			text-align: right;	
		}
		
		.section1 {

			textarea {
				@include tare(3.68rem, 0.35rem);
				vertical-align: middle;
				margin-left: 0.2rem;
				margin-bottom: 0.21rem;
			}
		}
		.label1 {
			// width: 2.14rem;
			display: inline-block;
			width: 1.1rem;
			height: 0.3rem;
			color: #fff;
			text-align:right;
		}
		textarea {
			@include tare(3.68rem, 1rem);
			vertical-align: middle;
			margin-left: 0.2rem;
			margin-bottom: 0.28rem;
		}
		.date_device {
			width: 3.68rem;
			height: 0.34rem;
			border: 0.02rem solid #83dbff;
			border-radius: 0.05rem;
			background-color: transparent;
			padding: 0.05rem;
			color: #fff;
			margin-bottom: 0.17rem;
			option {
				background-color: #154777;
			}
		}
		.ipt3 {
			width: 2.14rem;
			height: 0.8rem;
		}
	}

	.newdevice_info {
		display: inline-block;
		width: 0.69rem;
		height: 0.51rem;
		position: absolute;
		left: 5.3rem;
		bottom: 0.6rem;

		.newdevice_a {
			display: inline-block;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 0.69rem;
			height: 0.51rem;
			background: url(../../../assets/newdevice5.png) no-repeat;
			background-size: contain;
			.newdevice_img {
				width: 0.4rem;
				height: 0.36rem;
			}
		}
	}

	.new_Device_right {
		display: inline-block;
		width: 3.87rem;
		height: 3.55rem;
		margin-left: 0.98rem;
		vertical-align: bottom;


		.date_device {
			width: 3.68rem;
			height: 0.34rem;
			border: 0.02rem solid #83dbff;
			border-radius: 0.05rem;
			background-color: transparent;
			padding: 0.05rem;
			color: #fff;
			margin-bottom: 0.25rem;
			option {
				background-color: #154777;
			}
		}
		section {

			textarea {
				@include tare(3.68rem, 1.5rem);
				vertical-align: middle; // margin-left: 0.2rem;
				margin-bottom: 0.2rem;
			}
		}
	}
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
// 新建设备页面的新建设备监控
.gloss_img {
	width: 4.15rem;
	height: 0.5rem;
	position: absolute;
	bottom: -0.2rem;
	left: 3.4rem;
}
.box_btn {
	display: inline-block;
	width: 100%;
	height: 0.41rem;
	margin: 0.40rem 0 0 5.7rem;
	.btn2 {
		@include btnX(1.54rem,0.4rem);
	}
	button {
		margin-right: 0.57rem;
		display: inline-block;
		@include btn(1.54rem,
		0.4rem)
	}
}
// / 按钮呼吸灯
@-webkit-keyframes neon3 {
	from {
		box-shadow: 0 0 0.13rem 0.023rem #fff,
		0 0 0.13rem 0.053rem #fff,
	}
	to {
		box-shadow: 0 0 0.03rem 0.013rem #fff,
		0 0 0.13rem 0.043rem #fff,
	}
}
</style>