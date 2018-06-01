<template>
	<div class="main">
		<!--面包导航组件-->
		<Bread :breadData="abc"></Bread>
		<div class="content">
			<div class="left_div">
				<div class="video">
					<div class="flex_video">
					</div>
				</div>
				<div class="head">
					<div class="select_group">
						<select class="date_device" v-model="doors">
							<!--<option value="volvo">{{datas.监控对像类型}}</option>-->
							<option value="1670" selected="selected">北区门</option>
							<option value="1697">东大门</option>
							<option value="1699">南区门</option>
							<option value="1595">车场门</option>
						</select>
						<iframe class="hide_iframe" frameborder="0" src="about:blank"></iframe>
					</div>
					<span class="one_key">
						<button class="open" type="">远程开门</button>
						<button class="close" type="">远程锁门</button>
					</span>
				</div>
			</div>
			<ul class="right_div">
				<li class="ul_title">
					<span class="msg">消息中心</span>
					<div class="un_num">
						<span>{{unHold}}</span>
					</div>
					<span class="has_hold">已处理{{hasHold}}条</span>
				</li>
				<ul>
					<li v-for="item in unrecList" class="phone_list">{{item}}</li>
					<li v-for="item in recList" class="phone_list green_text">{{item}}</li>
				</ul>
				<li class="unhold">
					<span>待接呼叫</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import $ from 'jquery'
import md5 from 'md5'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			abc: ['物联监控', '云对讲呼叫台', '呼叫中心'],
			value: '',
			doors: '1670',
			recList: ["0755-82894866", "15043090804", "15889316681", "13554852078", "13824308503"],
			unrecList: ["0755-82894866", "15043090804", "15889316681"],
		}
	},
	computed: {
		...mapState(['unHold', 'hasHold'])
	},
	components: {
		Bread
	},
	mounted() {

	},
	watch: {
		doors: function() {

		},
		unHold: function() {
			this.unrecList.unshift("0755-82894866");
		},
		hasHold: function() {
			this.recList.unshift("0755-82894866");
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

span,
button,
select {
	color: #fff;
}

.main {
	vertical-align: top;
	width: 100%;
	height: 100%;
	display: inline-block;
}

.content {
	width: 13.4rem;
	height: 7.1rem;
	margin: 0 auto;
	margin-top: 0.3rem;
	display: flex;
	.head {
		height: 0.6rem;
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 0.1rem;
		background-image: url(../../../images/head_nav.png);
		.select_group {
			padding-left: 0.1rem;
			flex: 1;
			.date_device {
				width: 2rem;
				height: 0.36rem;
				border-radius: 0.05rem;
				border: 2px solid #83dbff;
				padding-left: 0.1rem;
				color: #fff;
				option {
					background-color: #154777;
				}
			}
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


		span {
			text-align: right;
			flex: 1;
			.open {
				@include btn(1.25rem, 0.36rem);
				margin-right: 0.2rem;
			}
			.close {
				@include btnR(1.25rem, 0.36rem);
				margin-right: 0.2rem;
			}
		}
		.catch_photo {
			flex: 1;
			text-align: center;
			button {
				@include btn(1.25rem, 0.36rem);
			}
		}
	}
	.video {
		height: 6.45rem;
		background-color: #182c51;
		object {
			height: 6.45rem;
			width: 100%;
		}
		button {
			background-color: pink;
			@include aa;
			@include btn(1.25rem, 0.36rem);
		}
	}
}

.left_div {
	flex: 8;
}

.right_div {
	margin-left: 0.2rem;
	flex: 2;
	background-image: url(../../../images/nav-side.jpg);
	background-size: 100% 100%;
	position: relative;
	ul {
		height: 5.9rem;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.ul_title {
		height: 0.6rem;
		text-align: center;
		border-bottom: 0.01rem solid #ddd;
		position: relative;
		span {
			line-height: 0.6rem;
		}
		.msg {
			font-size: 0.2rem;
		}
		.has_hold {
			margin-left: 0.4rem;
			font-size: 0.14rem;
			color: #63d863;
		}
		.un_num {
			$ht: 0.24rem;
			display: inline-block;
			width: $ht;
			height: $ht;
			border-radius: $ht/2;
			border: 0.01rem solid red;
			position: absolute;
			left: 1.25rem;
			top: 0.05rem;
			span {
				font-size: 0.14rem;
				line-height: 0.14rem;
			}
		}
	}
}

.video_iframe {
	height: 8rem;
	width: 15rem;
	z-index: 100;
}

.phone_list {
	line-height: 0.5rem;
	font-size: 0.2rem;
	text-align: center;
	color: red;
}

.green_text {
	color: #63d863;
}

.unhold {
	height: 0.6rem;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	border-top: 0.01rem solid #ddd;
	span {
		@include center;
		isplay: inline-block;
		@include btnR(1.25rem, 0.36rem);
		@include aa;
	}
}

.red_name {
	color: red;
}

.green_name {
	color: green;
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
