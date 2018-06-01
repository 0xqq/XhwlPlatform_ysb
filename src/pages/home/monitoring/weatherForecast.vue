<template>
   <div class="weather">
   		<div class="now_eather">
   			<div class="weather_now">
   				<div class="left">
   					<span>{{now_tmp}}°C</span>
   					<i>体感温度{{now_fl}}°C</i><br />
   					<i>相对湿度{{now_hum}}°C</i>
   					<p>{{loc}}&nbsp;&nbsp;实况</p>
   				</div>
   				<div class="right">
   					<img :src="'/static/weather/'+ now_img + '.png'" alt="天气情况" />
   					<p class="time">{{now_cond.txt}}</p>
   					<p>空气质量：{{now_qlty}}</p>
   					<p>pm2.5指数：{{now_pm25}}</p>
   					<p>风向：{{now_dir}}</p>
   					<p>风力：{{now_sc}}</p>
   					<p>风速：{{now_spd}}(kmph)</p>
   				</div>
   			</div>
   			<!--<div class="weather_data">

   			</div>-->
   		</div>
   		<!--<div class="right">-->
   			<ul class="weather_list">
				<li>
					<p class="time">{{today_time}}号(今天)</p>
					<p>白天 <img :src="'/static/weather/'+ today_img1 + '.png'" alt="天气情况" /></p>
					<p>夜间 <img :src="'/static/weather/'+ today_img2 + '.png'" alt="天气情况" /></p>
					<div class="tmp">
						<span>{{today_tmp.min}}°C~{{today_tmp.max}}°C</span>
					</div>
					<p class="time">{{now_cond.txt}}</p>
					<p class="wing">{{today_wind.dir}}</p>
					<p class="wing">{{today_wind.sc}}</p>
				</li>
				<li>
					<p class="time">{{tomorrow_time}}号(明天)</p>
					<p>白天 <img :src="'/static/weather/'+ tomorrow_img1 + '.png'" alt="天气情况" /></p>
					<p>夜间 <img :src="'/static/weather/'+ tomorrow_img2 + '.png'" alt="天气情况" /></p>
					<div class="tmp">
						<span>{{tomorrow_tmp.min}}°C~{{tomorrow_tmp.max}}°C</span>
					</div>
					<p class="time">{{tomorrow_cond.txt_d}}</p>
					<p class="wing">{{tomorrow_wind.dir}}</p>
					<p class="wing">{{tomorrow_wind.sc}}</p>
				</li>
				<li>
					<p class="time">{{after_tomorrow_time}}号(后天)</p>
					<p>白天 <img :src="'/static/weather/'+ after_tomorrow_img1 + '.png'" alt="天气情况" /></p>
					<p>夜间 <img :src="'/static/weather/'+ after_tomorrow_img2 + '.png'" alt="天气情况" /></p>
					<div class="tmp">
						<span>{{after_tomorrow_tmp.min}}°C~{{after_tomorrow_tmp.max}}°C</span>
					</div>
					<p class="time">{{after_tomorrow_cond.txt_d}}</p>
					<p class="wing">{{after_tomorrow_wind.dir}}</p>
					<p class="wing">{{after_tomorrow_wind.sc}}</p>
				</li>
			</ul>
			<div class="weather_bottom">
				 <ul>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/sunshine.png"/>
				 			<p>紫外线指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{uv_brf}}</p>
				 			<span>{{uv_txt}}</span>
				 		</div>
				 	</li>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/pill.png"/>
				 			<p>感冒指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{flu.brf}}</p>
				 			<span>{{flu.txt}}</span>
				 		</div>
				 	</li>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/t-shirt.png"/>
				 			<p>穿衣指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{drsg.brf}}</p>
				 			<span>{{drsg.txt}}</span>
				 		</div>
				 	</li>
				 </ul>
				 <ul>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/car.png"/>
				 			<p>洗车指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{cw.brf}}</p>
				 			<span>{{cw.txt}}</span>
				 		</div>
				 	</li>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/basketball.png"/>
				 			<p>运动指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{sport.brf}}</p>
				 			<span>{{sport.txt}}</span>
				 		</div>
				 	</li>
				 	<li>
				 		<div class="left">
				 			<img src="../../../images/air.png"/>
				 			<p>空气污染扩散指数</p>
				 		</div>
				 		<div class="right">
				 			<p>{{air.brf}}</p>
				 			<span>{{air.txt}}</span>
				 		</div>
				 	</li>
				 </ul>
			</div>
   		<!--</div>-->

  </div>
</template>

<script>

import weatherForecast from '@/httpData/weatherForecast'
export default {
  data () {
    return {
    	now:'',
    	uv_brf:'',
    	uv_txt:'',
    	flu:'',
    	cw:'',
    	drsg:'',
    	sport:'',
    	air:'',
    	now_cond:'',
    	now_tmp:'',
    	now_img:'101',
    	now_fl:'',
    	now_hum:'',
    	now_qlty:'',
    	now_pm25:'',
    	now_dir:'',
    	now_sc:'',
    	now_spd:'',
    	today:'',
    	today_cond:'',
    	today_wind:'',
    	tomorrow:'',
    	tomorrow_cond:'',
    	tomorrow_wind:'',
    	after_tomorrow:'',
    	after_tomorrow_cond:'',
    	after_tomorrow_wind:'',
    	today_tmp:'',
    	tomorrow_tmp:'',
    	after_tomorrow_tmp:'',
		today_time:'',
		tomorrow_time:'',
		after_tomorrow_time:'',
		today_img1: '101',
		today_img2: '101',
		tomorrow_img1:'101',
		tomorrow_img2:'101',
		after_tomorrow_img1:'101',
		after_tomorrow_img2:'101',
		city:'',
		loc:'',
    }
  },
  computed:{

  },
  components: {

  },
  mounted(){
	this.getData()
  },
  methods: {
  	loading(state) {
			this.$store.commit('CHANGE_LOADING',state);
		},
	getData(){
		this.loading(true);
    var data = weatherForecast.HeWeather5[0]
    var forecast_weather = data.daily_forecast;
    this.now = data.now;
    this.city = data.basic.city;
    this.loc = data.basic.update.loc;
    this.uv_brf = data.suggestion.uv.brf;
    this.uv_txt = data.suggestion.uv.txt;
    this.flu = data.suggestion.flu;
    this.drsg = data.suggestion.drsg;
    this.cw = data.suggestion.cw;
    this.sport = data.suggestion.sport;
    this.air = data.suggestion.air;
    this.now_cond = data.now.cond;
    this.now_dir = data.now.wind.dir;
    this.now_sc = data.now.wind.sc;
    this.now_spd = data.now.wind.spd;
    this.now_img = data.now.cond.code;
    this.now_tmp= data.now.tmp;
    this.now_fl= data.now.fl;
    this.now_hum= data.now.hum;
    this.now_qlty= data.aqi.city.qlty;
    this.now_pm25= data.aqi.city.pm25;
    this.today = forecast_weather[0];
    this.today_img1 = forecast_weather[0].cond.code_d;
    this.today_img2 = forecast_weather[0].cond.code_n;
    this.today_tmp = forecast_weather[0].tmp;
    this.today_wind = forecast_weather[0].wind;
    this.tomorrow = forecast_weather[1];
    this.tomorrow_tmp = forecast_weather[1].tmp;
    this.tomorrow_cond = forecast_weather[1].cond;
    this.tomorrow_img1 = forecast_weather[1].cond.code_d;
    this.tomorrow_img2 = forecast_weather[1].cond.code_n;
    this.tomorrow_wind = forecast_weather[1].wind;
    this.after_tomorrow = forecast_weather[2];
    this.after_tomorrow_cond = forecast_weather[2].cond;
    this.after_tomorrow_img1 = forecast_weather[2].cond.code_d;
    this.after_tomorrow_img2 = forecast_weather[2].cond.code_n;
    this.after_tomorrow_wind = forecast_weather[2].wind;
    this.after_tomorrow_tmp = forecast_weather[2].tmp;
    this.today_time=forecast_weather[0].date.substring(8,10);
    this.tomorrow_time = forecast_weather[1].date.substring(8,10);
    this.after_tomorrow_time = forecast_weather[2].date.substring(8,10);
    this.loading(false);
		}
  }
}
</script>

<style lang="scss" scoped>
.now_eather{
	width: 35%;
	height: 100%;
	/*border: 1px solid red;*/
	float: left;
	.weather_now{
		width: 95%;
		height: 4rem;
		margin: 0 auto;
		margin-top: 2.1rem;
		/*border: 0.01rem solid rgb(89,235,232);*/
		p{
			margin-top: 0.5rem;
			font-size: 0.16rem;
		}
		.left{
			width: 40%;
			height: 3.4rem;
			/*border: 1px solid red;*/
			margin-top: 0.2rem;
			text-align: center;
			/*line-height: 2rem;*/
			span{
				width: 100%;
				font-size: 0.8rem;
				display: inline-block;
				margin-bottom: 0.1rem;
			}
			i{
				display: inline-block;
				margin: 0.06rem 0;
			}
		}
		.right{
			width: 60%;
			height: 3.4rem;
			/*border: 0.01rem solid rgb(89,235,232);*/
			text-align: center;
			margin-top: 0.06rem;
			img{
				margin-top: 0.05rem;
				width: 1rem;
				height: 1rem;
			}
			p{
				margin: 0.1rem 0;
			}
		}
	}
	.weather_data{
		width: 90%;
		height: 4rem;
		margin: 0 auto;
		margin-top: 0.4rem;
		border: 1px solid red;
	}
}
.weather{
	width: 100%;
	height: 8.7rem;
}
.weather_list{

	width: 65%;
	height: 3,8rem;
	display: flex;
	margin-bottom: 0.08rem;
	margin-top: 0.08rem;
	li{
		margin-top: 0.2rem;
		background-image: url(../../../images/weather3.png);
		background-position-x: center;
		background-size: cover;
		text-align: center;
		float: left;
		flex: 1;
		height: 3.6rem;
		margin-left: 0.06rem;
		p{
			font-size: 0.15rem;
			img{
				margin-top: 0.05rem;
				width: 0.6rem;
				height: 0.6rem;
			}
		}
		.time{
			font-size: 0.24rem;
			margin-top: 0.1rem;
			color: rgb(89,235,232);
		}
		.wing{
			margin-top: 0.1rem;
		}
		.tmp{
			width: 100%;
			height: 0.7rem;
			line-height: 0.7rem;
			span{
				font-size: 0.32rem;
				color: rgb(89,235,232);
			}
		}
	}
}
.weather_bottom{
	float: right;
	width: 65%;
	height:4.2rem;
	ul{
		width: 100%;
		height: 50%;
		margin-bottom: 0.05rem;
		display: flex;
		li{
			margin-top: 0.3rem;
			margin-left: 0.06rem;
			background-image: url(../../../images/weather4.png);
			background-position-x: center;
			background-size: cover;
			float: left;
			flex: 1;
			display: flex;
			height: 100%;
			.left{
				flex: 1.4;
				text-align: center;
				img{
					/*width: 1.1rem;
					height: 1.1rem;*/
					margin-top: 0.5rem;
					margin-bottom: 0.2rem;
				}
				p{
					font-size: 0.18rem;
					text-align: center;
				};
			}
			.right{
				flex: 2;
				p{
					font-size: 0.26rem;
					margin-top: 0.26rem;
					margin-bottom: 0.2rem;
					color: rgb(89,235,232);
				}
				span{
					font-size: 0.15rem;
					text-indent:2rem;
					text-align: left !important;
					color: #dafc4e;
				};
			}
		}
	}
}
</style>
