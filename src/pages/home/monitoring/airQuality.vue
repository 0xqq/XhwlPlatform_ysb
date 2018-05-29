<template>
	<div class="electronicMap">
		<!--面包导航组件-->
		<Bread :breadData="abc"></Bread>
		<button class="btn_1">实时数据</button><button class="btn_2">历史数据</button>
		<div class="content">
			<!--地图视口-->
			<div class="box_top">
				<span class="newdevice1"></span>
				<span class="newdevice2"></span>
				<span class="newdevice3"></span>
				<span class="newdevice4"></span>
				<div class="top_1">
					<div id="XSDFXPage" class="XSDFXPage"></div>
				</div>
				<div class="top_2">
					<p class="air_text1">空气质量指数</p>
					<p class="air_text2">更新：
						<span>2017.10.11</span>
						<span>10:00:00</span>
					</p>
					<div class="bar_box">
						<div class="triangle">
							优
						</div>
						<p class="_bar"></p>
					</div>
					<div class="air_info">
						<span class="good">优</span>
						<p class="air_info_text">健康指引</p>
						<div class="air_info1">
							<p>
								<span>健康影响：</span>
								<span>空气质量令人满意，基本无空气污染，对健康没有危害！</span>
							</p>
						</div>
						<div class="air_info2">
							<span>建议措施：</span>
							<span>各类人群可参加屋外活动，多呼吸一下清新的空气！</span>
						</div>
					</div>
				</div>
			</div>
			<div class="box_bottom">
				<ul class="ul">
					<li>
						<p>PM2.5</p>
						<p>
							<span>30</span>
							<sub>ug/m</sub>
							<sup>3</sup>
						</p>
					</li>
					<li>
						<p>PM10</p>
						<p>
							<span>36</span>
							<sub>ug/m</sub>
							<sup>3</sup>
						</p>
					</li>
					<li>
						<p>温度</p>
						<p>
							<span>29</span>
							<sub>℃</sub>
						</p>
					</li>
					<li>
						<p>湿度</p>
						<p>
							<span>62</span>
							<sub>%RH</sub>
						</p>
					</li>
					<li>
						<p>气压</p>
						<p>
							<span>1018</span>
							<sub>mbar</sub>
						</p>
					</li>
				</ul>
				<ul >

					<li>
						<p>一氧化碳</p>
						<p>
							<span>1.2</span>
							<sub>ppm</sub>
						</p>
					</li>
					<li>
						<p>二氧化硫</p>
						<p>
							<span>36</span>
							<sub>ppm</sub>
						</p>
					</li>
					<li>
						<p>二氧化氮</p>
						<p>
							<span>30</span>
							<sub>ppm</sub>
						</p>
					</li>
					<li>
						<p>臭氧</p>
						<p>
							<span>87</span>
							<sub>ppm</sub>
						</p>
					</li>
					<li>
						<p>风速</p>
						<p>
							<span>1.6</span>
							<sub>m/s</sub>
						</p>
					</li>
				</ul>
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
				abc: ['物联监控', '环境物联监控', '空气质量监控'],
				all:[
 				{"x":"114.058386","y":"22.538872"},
 				{"x":"114.058153","y":"22.540036"}
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
			this.getData();
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
			showAll() {
				var _map = this.initMap();
				for(var i = 0; i <= this.all.length - 1; i++) {
					var marker = new BMap.Marker(new BMap.Point(this.all[i].x, this.all[i].y));
					_map.addOverlay(marker);
				}
			},
			getData() {
				const url = this.mnUrl + "/tmp/watching/environment/air"
				this.$http.get(url).then(res => {
					for(var i=0;i<res.body.content.length;i++){
						this.all.push(res.body.content[i].数值)
						console.log(res.body.content[i]);
					}
					this.all=res.body.content[0].数值
					
				}, (err) => {
					console.log(err);
				})
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
	
	.btn_1,
	.btn_2 {
		width: 1.41rem;
		height: 0.36rem;
		border-radius: 0.05rem;
		background: url(../../../images/answer-active.png);
		background-size: cover;
	}
	
	.btn_1 {
		margin-left: 0.05rem;
		margin-right: 0.15rem;
	}
	
	.btn_1,
	.btn_2:hover {
		cursor: pointer;
	}
	
	.electronicMap {
		width: 100%;
		height: 100%;
	}
	
	.content {
		margin-left: 0.2rem;
		margin-top: 0.4rem;
		width: 13.94rem;
		height: 7.06rem;
		display: flex;
		flex-direction: column;
		position: relative;
		flex-basis: 0;
		background: url(../../../images/blue.png);
		background-size: cover;
		.box_top {
			padding-left:0.3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-grow: 7;
			width: 13.94rem;
			flex-basis: 0;
			.newdevice1,
			.newdevice2,
			.newdevice3,
			.newdevice4 {
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
		}
		.box_bottom {
			width: 13.94rem;
			flex-grow: 3;
			flex-basis: 0;
		}
		.top_1 {
			flex-grow: 2;
			height: 4.942rem;
			flex-basis: 0;
		}
		.top_2 {
			flex-grow: 1;
			/*height: 4.942rem;*/
			flex-basis: 0;
		}
	}
	
	.XSDFXPage {
		margin-top: 0.3rem;
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: "微软雅黑";
	}
	
	.air_text1 {
		text-align: center;
		font-size: 0.2rem;
		margin-top: 0.3rem;
	}
	
	.air_text2 {
		text-align: right;
		padding-right: 0.1rem;
		font-size: 0.18rem;
		margin-top: 0.1rem;
		margin-bottom: 0.2rem;
		span {
			margin-right: 0.1rem;
		}
	}
	
	.bar_box {
		position: relative;
	}
	
	.triangle {
		position: absolute;
		height: 0.6rem;
		width: 0.5rem;
		text-align: center;
		line-height: 0.7rem;
    	background: url(../../../images/littleWater.png);
    	background-size: cover;
		left: 10%;
		bottom: -0.5rem;
		color: deepskyblue;
		font-size: 0.14rem;
	}
	._bar {
		margin: 0 auto;
		width: 80%;
		height: 0.15rem;
		background: url(../../../images/jindu.png);
		background-size:contain;
	}
	.air_info {
		width: 90%;
		/*height: 2.2rem;*/
		border-radius: 0.1rem;
		border: 1px solid skyblue;
		margin: 0 auto;
		margin-top: 0.8rem;
		position: relative;
	}
	
	.air_info_text {
		text-align: center;
		font-size: 0.18rem;
		margin-top: 0.2rem;
		font-weight: bold;
	}
	
	.good {
		display: inline-block;
		width: 0.6rem;
		/*height: 0.3rem;*/
		background: #6bcd07;
		position: absolute;
		left: 0.2rem;
		text-align: center;
		line-height: 0.3rem;
		border-radius: 0.05rem;
	}
	
	.air_info1,
	.air_info2 {
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		margin-top: 0.2rem;
	}
	
	.air_info1 span,
	.air_info2>span {
		font-size: 0.16rem;
		font-weight: bold;
	}
	
	.air_info1 {
		border-bottom: 1px solid gainsboro;
		padding-bottom: 0.2rem;
	}
	
	ul>li {
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 0.1rem;
		text-align: center;
		list-style: none;
		width: 19%;
		display: inline-block;
		height: 0.75rem;
	}
	
	ul>li>p {
		font-size: 0.18rem;
		margin-bottom: 0.1rem;
	}
	
	ul>li>p>span {
		font-size: 0.2rem;
		font-weight: bold;
	}
	
	.ul {
		margin-top: 0.3rem;
		padding-bottom: 0.15rem;
	}
</style>