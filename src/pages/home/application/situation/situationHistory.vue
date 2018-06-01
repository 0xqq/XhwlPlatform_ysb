<template>
<div class="main">
	<!--面包导航组件-->
	<Bread :breadData="navName"></Bread>
	<div class="title">
		<div class="title_time">
			<div class="time_top">
				<div class="time_icon"></div>
				<div class="time_hour">{{timeHOur}}</div>
				<div class="time_date">{{timeDate}}</div>
			</div>
			<div class="time_bottom">
				<div class="look_icon"></div>
				<div class="look_hour">监控</div>
				<div class="look_date">{{allDate}}天</div>
			</div>
		</div>
		<div class="title_info">
			<div class="updata">
				<div class="updataText">今日更新</div>
				<div class="updataTotal">{{dayNum}}</div>
			</div>
			<div class="goodInfo">
				<div class="goodIcon">
					<div class="icon"></div>
				</div>
				<div class="goodBox">
					<div class="goodTotal">{{goodNum}}</div>
					<div class="goodText">正面</div>
				</div>
			</div>
			<div class="badInfo">
				<div class="badIcon">
					<div class="icon"></div>
				</div>
				<div class="badBox">
					<div class="badTotal">{{badNum}}</div>
					<div class="badText">负面</div>
				</div>
			</div>
		</div>
		<div class="title_total">
			<p class="title_total_text">全部消息</p>
			<p class="title_total_number">{{allNUm}}</p>
		</div>
		<div class="title_total">
			<p class="title_total_text">服务满意度</p>
			<p class="title_total_number">{{service}}</p>
		</div>
	</div>
	<!--搜索栏-->
	<div class="device_nav">
		<div class="img_time">
			<div class="date_time">
				<div class="block">
					<el-date-picker v-model="filterDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
					</el-date-picker>
				</div>
			</div>
			<div class="info" id="situationHistory">
				<el-select v-model="emotion" placeholder="请选择" @change="getEmotion">
					<el-option v-for="item in emotionData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>


			<div class="date_device" id="cityData">
				<el-select v-model="newCity" multiple placeholder="请选择城市" @change="getCity">
					<el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="info_1" id="mediaType">
				<el-select v-model="mediaType" placeholder="请选择媒体" @change="getMedia">
					<el-option v-for="item in mideaData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>

				</el-select>
			</div>
			<button class="btn" @click="serachAll">搜索</button>
			<!--<img src="../../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">-->

		</div>
	</div>
	<!--顶部导航-->
	<div class="table" id='table-cont'>
		<div class="noData" v-if="isShow">暂无数据</div>
		<ul v-for="(item,index) in allData" v-if="!isShow">
			<li>
				<div class="content_top">
					<div class="select_box">
						<label class="custom-checkbox">
						        <input type="checkbox"  @click="checkOne(item.id)" :checked="newCheck.indexOf(item.id)>=0">
						        <span></span>
						    </label>
					</div>
					<div :class="[item.emotionName == '正面'?'content_good_icon':'content_bad_icon']"></div>
					<div class="content_title" @click="goDetails(item.address)">{{item.title}}</div>
				</div>
				<div class="content_bottom">
					<div class="content_details">
						<div class="datails_text" @click="goDetails(item.address)">{{item.abstract}}</div>
						<div class="details_from">
							<div class="adress">
								<span>地域:</span>
								<span>{{item.regionName}}</span>
							</div>
							<div class="from">
								<span>来源:</span>
								<span>{{item.mediaName}}</span>
							</div>
							<div class="time">
								<span>时间:</span>
								<span>{{item.date}}&nbsp;&nbsp;{{item.time}}</span>
							</div>
						</div>
					</div>
					<div class="content_colletion">
						<div class="collection_left" @click="addCollection(item.id,index)">
							<div :class="[item.isCollect == 0?'collection_icon':'collection_icon1']"></div>
							<div :class="[item.isCollect == 0?'collection_text':'collection_text1']">收藏</div>
							<div class="line"></div>
						</div>

						<div class="collection_right">
							<div class="copy_icon"></div>
							<div id="copy_text" class="copy_text" @click="copyUrl(index)" :data-clipboard-text="item.address">复制</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<!--底部每页显示-->
	<div class="nav_footer">
		<label class="custom-checkbox">
		        <input type="checkbox" :checked="allData.length === newCheck.length" @click="checkAll">
		        <span></span>
		    </label>
		<button class="out" @click="upLoad">导出</button>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10]" layout="sizes, prev, pager, next" :total="this.allNUm">
			</el-pagination>
		</div>
	</div>

	<transition name="router-fade" mode="out-in">>
		<div v-if="message" class="showSuccess">
			<p>{{text}}</p>
		</div>
	</transition>
</div>
</template>

<script>
import Bread from '@/components/common/bread'
import { mapState } from 'vuex'
import abc from '@/script/func.js'
import { getStore } from '@/script/util'
import $ from 'jquery'
import cityData from '@/script/cityData'
import Clipboard from 'clipboard'
import { format } from '@/script/timeFormat.js'

export default {
	data() {
		return {
      navName: ['舆情分析', '舆情收藏'],
			showImg: false,
			select: '',
			input5: '',
			filterDate: '',
			value: [],
			projectInfo: "",
			value1: '',
			selectValue: "",
			status: "",
			Type: "",
			pageSize: 10,
			tableData3: [],
			currentPage: 1,
			total: null,
			timeHOur: '',
			timeDate: '',
			allDate: '',
			mideaData: [{
					"value": "全部",
					"label": "全部"
				},
				{
					"value": "微信",
					"label": "微信"
				},
				{
					"value": "微博",
					"label": "微博"
				},
				{
					"value": "新闻",
					"label": "新闻"
				},
				{
					"value": "论坛",
					"label": "论坛"
				},
				{
					"value": "博客",
					"label": "博客"
				}
			],
			emotionData: [{
					"value": "正面",
					"label": "正面"
				},
				{
					"value": "负面",
					"label": "负面"
				}
			],
			status: "未处理",
			yqURl: this.apis.analyze,
			checked: false,
			emotion: '负面',
			mediaType: '',
			newCity: '',
			getCitydata: [],
			cityData: cityData.cityData,
			city: cityData.city,
			goodNum: 0,
			badNum: 0,
			allType: [],
			timeer: '',
			dayNum: 0,
			allNUm: 0,
			allData: [],
			copy: true,
			isIndeterminate: true,
			isCheckedAll: false,
			newCheck: [],
			startTime: '',
			endTime: '',
			isShow: false,
			collectionIndex: null,
			hasSearch: false,
			message: false,
			service: '', //服务满意度
		}
	},
	components: {
		Bread
	},
	computed: {
		...mapState(['mnUrl', 'currentProject'])
	},
	mounted() {
		this.getData();
		var $ = abc.$;
		$(".table_body").scrollUnique();
		this.getTime();
		this.timeer = setInterval(() => {
			this.getTime()
		}, 1000);
	},
	methods: {
		derivedForm(tableExcel) {
			this.$func.method5(tableExcel)
		},
		getData() {
			var allNum = null;
			const url = "/analysis/getData"
			this.$post(url, {}, this.yqURl, 'formdata').then((res) => {
				this.goodNum = res.data.emotion[0].count;
				this.badNum = res.data.emotion[1].count;
				this.allType = res.data.mediaType; //所有的媒体来源
				allNum = Number(this.goodNum) + Number(this.badNum);
				this.service = Math.round(Number(this.goodNum) / allNum * 100) ==0?0:Math.round(Number(this.goodNum) / allNum * 100)+ '%';
				// this.allNUm = res.data.count;
				//er this.allData = res.data.datas;
				// this.allData.length == 0?this.isShow = true:this.isShow = false;

			})
			this.handleCurrentChange(1)
		},

		goDetails(address) {
			window.open(address); //详情页面
		},
		checkOne(id) {
			let idIndex = this.newCheck.indexOf(id)
			if (idIndex >= 0) {
				this.newCheck.splice(idIndex, 1);
			} else {
				this.newCheck.push(id);
			}
			this.isCheckedAll = (this.newCheck.length === this.pageSize) ? true : false
		},
		checkAll() {
			this.newCheck = []; //关键
			this.isCheckedAll = !this.isCheckedAll;
			if (this.isCheckedAll) {
				// 全选时
				this.allData.forEach((item) => {
					this.newCheck.push(item.id);
				})
			} else {
				this.newCheck = [];
			}
		},
		addCollection(id, index) {
			this.allData[index].isCollect = !this.allData[index].isCollect;
			if (this.allData[index].isCollect) {
				const url = "/analysis/addCollect";
				var dataArr = [];
				dataArr.push(id);
				this.$post(url, {
					dataId: dataArr
				}, this.yqURl).then((res) => {
					//console.log(res)
				})
			} else {
				const url = "/analysis/delCollect";
				var arr = [];
				arr.push(id);
				this.$post(url, {
					dataId: arr
				}, this.yqURl).then((res) => {
					//console.log(res)
				})
			}
		},
		upLoad() {
			var upData = [];
			const url = "/analysis/export";
			var data = JSON.stringify(this.newCheck);
			this.$post(url, {
				dataId: data,
        keyWordName: '中海物业'
			}, this.yqURl, 'formdata').then((res) => {
				upData = res.data.datas;
				require.ensure([], () => {
					const { export_json_to_excel } = require('@/script/Export2Excel')
					const tHeader = ['标题', '链接地址', '日期', '时间', '作者', '内容', '情感类型', '关键词', '媒体来源', '地域'];
					const filterVal = ['title', 'address', 'date', 'time', 'author', 'abstract', 'emotionName', 'keyWordName', 'mediaTypeName', 'regionName'];
					const data = this.formatJson(filterVal, upData);
					export_json_to_excel(tHeader, data, '舆情监测')
				})
			})
		},
		formatJson(filterVal, upData) {
			return upData.map(v => filterVal.map(j => v[j]))
		},
		copyUrl() {
			let clipboard = new Clipboard('#copy_text');
			//alert("已复制成功")
			var _this = this;
			_this.text = "已复制成功"
			_this.message = true;
			setTimeout(function() {
				_this.message = false;
			}, 1000)
		},
		serachAll() {
			this.handleCurrentChange(1)
			// this.currentPage = 1;
			// this.mediaType = this.mediaType === "全部" ? "" : this.mediaType;
			// const url="analysis/getHistorySearchData";
			// this.getCitydata = this.getCitydata.some((item)=>item == 0)?this.cityData:this.getCitydata;
			// var data = {
			// 	mediaType:this.mediaType,
			// 	emotion:this.emotion,
			// 	city:this.getCitydata,
			// 	date:this.filterDate,
			// 	page:1
			// };
			// for(var prop in data){
			//           if (data[prop]===''|| data[prop].length === 0) {
			//               delete data[prop]
			//           }
			//       };
			//       var dataLength = Object.keys(data).length;
			//       if(dataLength>1){
			//       	this.$post(url,data,this.yqURl).then((res) => {
			// 		if(res.data.count == 0){

			// 			this.isShow = true;
			// 			this.allNUm = 0;
			// 		}else{
			// 			this.isShow = false;
			// 			this.allNUm = res.data.count;
			// 			this.allData = res.data.datas;
			// 		}
			// 	})
			//       }else{
			//       	this.getData();
			//   }
		},
		getTime() {
      var date = new Date().getTime()
      this.timeHOur = format(date, 'HH:mm:ss');
      this.timeDate = format(date, 'yyyy-MM-dd');
			function getOffsetDays(time1, time2) {
				var offsetTime = Math.abs(time1 - time2);
				return Math.floor(offsetTime / (3600 * 24 * 1e3));
			}
			this.allDate = getOffsetDays((new Date(2017, 12, 1)).getTime(), Date.now());
		},
		beforeRouteLeave(to, from, next) {
			next()
			clearInterval(this.timeer)
		},
		getEmotion(val) {
			this.emotion = val;
		},
		getCity(val) {
			this.getCitydata = val;
			this.getCitydata = this.getCitydata.some((item) => item == 0) ? this.city : this.getCitydata;
		},
		getMedia(val) {
			this.mediaType = val;
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			this.pagesize = val;
			this.currentPage = 1;


		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			var keyWordName = this.currentProject.name;
			this.currentPage = val;
			let data = {};
			const url = "/analysis/getHistorySearchData";
			this.mediaType = this.mediaType === "全部" ? "" : this.mediaType;
			this.filterDate = this.filterDate == "null" ? "" : this.filterDate;
			data = {
				mediaType: this.mediaType,
				emotion: this.emotion,
				city: this.getCitydata,
				date: this.filterDate,
				page: this.currentPage,
				keyWordName: "中海物业"

			};
			//			for(var prop in data){
			//	            if (data[prop]===''|| data[prop].length === 0) {
			//	                delete data[prop]
			//	            }
			//	        }
			this.$post(url, data, this.yqURl).then((res) => {
				if (res.data.datas.length == 0) {
					this.isShow = true;
					this.allNUm = 0;
					this.newCheck.length = (this.allData.length == 0 && this.newCheck.length == 0) ? 1 : 0;
				} else {
					this.isShow = false;
					//console.log(res.data.datas)
					this.allData = res.data.datas;

					this.allNUm = res.data.count;
				}
			})
		},
		selectTime(val) {
			//			console.log('val', val)
			//			this.startTime = this.moment(val[0]).format('YYYY-MM-DD');
			//			this.endTime = this.moment(val[1]).format('YYYY-MM-DD');
		},
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$padding_top: 0.1rem;
.main {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
}
.title{
	width: 100%;
	height: 1.41rem;
	background: url(../../../../assets/kaimenNav.png)no-repeat;
	background-size: 100% 100%;
	display: flex;
	.title_time{
		flex: 2;
		height: 1.41rem;
	}
	.title_total{
		flex: 1;
		height: 1.41rem;
		border-left: 1px solid #4f6783;
	}
	.title_info{
		flex: 3;
		height: 1.41rem;
	}
	.title_time,
	.title_info,
	.title_total{
		.time_top,
		.time_bottom{
			width: 100%;
			height: 50%;
		}
		.time_top{
			padding-top: 0.29rem;
			.time_icon{
				width: 0.28rem;
				height: 0.28rem;
				margin-left: 0.52rem;
				background: url(../../../../images/situation/time.png);
				background-size: 100% 100%;
				display: inline-block;
			}
			.time_hour{
				margin-left: 0.6rem;
				font-size: 0.24rem;
				display: inline-block;
				height: 0.28rem;
				line-height: 0.28rem;
			}
			.time_date{
				display: inline-block;
				height: 0.28rem;
				margin-left: 0.3rem;
				line-height: 0.28rem;
				font-size: 0.18rem;
			}
		}
		.time_bottom{
			padding-top: 0.15rem;
			.look_icon{
				width: 0.3rem;
				height: 0.22rem;
				margin-left: 0.52rem;
				background: url(../../../../images/situation/look.png);
				background-size: 100% 100%;
				display: inline-block;
			}
			.look_hour{
				margin-left: 0.6rem;
				font-size: 0.18rem;
				display: inline-block;
				height: 0.28rem;
				line-height: 0.28rem;
			}
			.look_date{
				display: inline-block;
				height: 0.28rem;
				margin-left: 0.05rem;
				line-height: 0.28rem;
				font-size: 0.24rem;
				font-weight:bold ;
			}
		}
	}
	.title_info{
		border-left: 1px solid #4f6783;
		display: flex;
		flex-direction: row;
		height: 1.41rem;
		.updata{
			flex: 1;
			.updataText{
				padding-top: 0.29rem;
				height: 0.75rem;
				text-align: center;
				width: 100%;
				font-size: 0.18rem;
			}
			.updataTotal{
				padding-top: 0.08rem;
				height: 0.75rem;
				text-align: center;
				width: 100%;
				font-size: 0.32rem;
			}
		}
		.goodInfo{
			flex: 1;
			height: 1.41rem;
			.goodIcon{
				float: left;
				display: inline-block;
				width: 30%;
				height: 100%;
				padding-top:0.42rem;
				padding-left:15%;
				.icon{
					width: 0.57rem;
					height: 0.57rem;
					background: url(../../../../images/situation/good.png);
					background-size: 100% 100%;
				}
			}
			.goodBox{
				float: left;
				display: inline-block;
				width: 70%;
				height: 100%;
				.goodTotal{
					float: left;
					width: 100%;
					height: 0.75rem;
					padding-top: 0.29rem;
					font-size: 0.32rem;
					text-align: center;
				}
				.goodText{
					float: left;
					width: 100%;
					height: 0.75rem;
					line-height:0.75rem;
					font-size: 0.16rem;
					text-align: center;
				}
			}
		}
		.badInfo{
			flex: 1;
			height: 1.41rem;
			.badIcon{
				float: left;
				display: inline-block;
				width: 30%;
				height: 100%;
				padding-top:0.42rem;
				padding-left:15%;
				.icon{
					width: 0.57rem;
					height: 0.57rem;
					background: url(../../../../images/situation/bad.png);
					background-size: 100% 100%;
				}
			}
			.badBox{
				float: left;
				display: inline-block;
				width: 70%;
				height: 100%;
				.badTotal{
					float: left;
					width: 100%;
					height: 0.75rem;
					padding-top: 0.29rem;
					font-size: 0.32rem;
					text-align: center;
				}
				.badText{
					float: left;
					width: 100%;
					height: 0.75rem;
					line-height:0.75rem;
					font-size: 0.16rem;
					text-align: center;
				}
			}
		}
	}
	.title_total{
		text-align: center;
		.title_total_text{
			font-size: 0.18rem;
			margin-top: 0.33rem;
		}
		.title_total_number{
			font-size: 0.32rem;
			margin-top: 0.26rem;
		}
	}
}
.device_nav {
	height: 0.6rem;
	width: 100%;
	background: url(../../../../assets/kaimenNav.png)no-repeat;
	background-size: 100% 100%;
	margin-top: 0.05rem;
	.img_time {
		display: inline-block;
		height: 0.6rem;
		width: auto;
		position: relative;
		width: 100%;
		padding-top:0.1rem;
		.info {
			width: 1.1rem;
			height: 0.4rem;
			display: inline-block;
			vertical-align: middle;
			margin-left: 2rem;
		}
		.date_time {
			display: inline-block;
			width: 2.58rem;
			height: 0.4rem;
			color: #67bce9;
			outline: none;
			margin-left: 0.52rem;
			vertical-align: middle;
			.el_picker {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				font-size: 0.14rem;
			}
		}
		.info_1{
			width: 1.3rem;
			height: 0.4rem;
			display: inline-block;
			vertical-align: middle;
			margin-left: 0.15rem;
		}
		.btn{
			position: absolute;
			right: 0.15rem;
			vertical-align: middle;
     		 @include btn(0.8rem, 0.36rem);
		}
		.search {
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			background: url(../../../../assets/search.png)no-repeat;
			background-size: 100% 100%;
			margin-left: -0.3rem;
			@include aa;
		} // 配置名称框
		.date_device {
			display: inline-block;
			height: 0.4rem;
			width: 2rem;
			background: transparent;
			color: #67bce9;
			vertical-align: middle;
			font-size: 0.14rem;
			margin-left: 0.15rem;
			.place {
				font-size: 0.14rem;
			}
		}

		img {
			width: 0.21rem;
			height: 0.21rem;
			margin-right: 0.45rem;
			@include aa;
		}
	}
}


.table {
	width: 100%;
	height: 4.96rem;
	background-image: url(../../../../images/kaimen.png);
	background-size: 100% 100%;
	overflow-y: scroll;
	position: relative;
	margin-top:0.05rem;
	.noData{
		height: 0.4rem;
		width: 1rem;
		position: absolute;
		top: 2rem;
		left: 50%;
		margin-left: -0.5rem;
		font-size: 0.16rem;
	}
	ul>li{
		list-style: none;
		height: 1.65rem;
		width: 100%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	ul>li:hover{
		background: #092443;
	}
	.content_top{
		width: 100%;
		height: 0.52rem;
		padding-left: 0.52rem;
		.select_box{
			margin-top:0.24rem ;
			display: inline-block;

		}
		.content_good_icon{
			display: inline-block;
			width: 0.31rem;
			height: 0.31rem;
			background: url(../../../../images/situation/bad.png);
			background-size: 100% 100%;
			margin-left: 0.6rem;
			/*margin-top: 0.2rem;*/
			vertical-align: middle;
		}
		.content_bad_icon{
			display: inline-block;
			width: 0.31rem;
			height: 0.31rem;
			background: url(../../../../images/situation/bad.png);
			background-size: 100% 100%;
			margin-left: 0.6rem;
			/*margin-top: 0.2rem;*/
			vertical-align: middle;
		}
		.content_good_icon{
			display: inline-block;
			width: 0.31rem;
			height: 0.31rem;
			background: url(../../../../images/situation/good.png);
			background-size: 100% 100%;
			margin-left: 0.6rem;
		/*	margin-top: 0.2rem;*/
			vertical-align: middle;
		}
		.content_title{
			display: inline-block;
			vertical-align: middle;
			margin-left: 0.15rem;
			font-size: 0.18rem;
			width: 4.45rem;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			@include aa;
		}
		.content_title:hover{
			color: #83dbff;
		}
	}
	.content_bottom{
		height:1.12rem;
		width: 12.15rem;
		margin-left: 1.79rem;
		position: relative;
		.datails_text{
			position:relative;
			display: inline-block;
			max-width: 10.30rem;
			height: 0.4rem;
			line-height: 0.4rem;
			overflow: hidden;
			padding-left: 0.15rem;
			padding-right: 0.1rem;
			@include aa;
		}
		.datails_text:hover{
			color: #83dbff;
		}
		/*.datails_text:after {
		    content:". . .";
		    position:absolute;
		    bottom:0;
		    right:0;
		    background: transparent;
		}*/
		.details_from{
			padding-left: 0.15rem;
			.adress,.from,.time{
				display: inline-block;
				margin-top: 0.28rem;
				color: #989999;
			}
			.from{
				margin-left: 1.25rem;
				width: 1.6rem;
				overflow: hidden;
	            text-overflow:ellipsis;
	            white-space: nowrap;
			}
			.time{
				margin-left: 0.85rem;
			}
		}
		.content_colletion{
			position: absolute;
			width: 1.5rem;
			right: -0.28rem;
			bottom: 0.2rem;
			overflow: hidden;
			.collection_left{
				float: left;
				box-sizing: border-box;
				height: 0.16rem;
				line-height:0.16rem;
				overflow: hidden;
				position:relative;

				.collection_icon{
					width: 0.14rem;
					height: 0.14rem;
					float: left;
					background: url(../../../../images/situation/Collection1.png);
					background-size: 100% 100%;
					margin-right:0.05rem;
					@include aa;
				}
				.collection_icon1{
					width: 0.14rem;
					height: 0.14rem;
					float: left;
					background: url(../../../../images/situation/Collection2.png);
					background-size: 100% 100%;
					margin-right: 0.05rem;
					@include aa;
				}
				.collection_text{
					float: left;
					font-size: 0.12rem;
					height: 0.16rem;
					line-height:0.16rem;
					padding-bottom: 0.02rem;
					margin-right:0.1rem;
					@include aa;
				}
				.collection_text1{
					float: left;
					font-size: 0.12rem;
					height: 0.16rem;
					line-height:0.16rem;
					padding-bottom: 0.02rem;
					color: #83dbff;
					margin-right:0.1rem;
					@include aa;
				}
				.line{
					width: 0.01rem;
					height: 0.14rem;
					position: absolute;
					right: 0;
					background: #ffffff;
					top: 0.01rem;
				}
			}
			.collection_right{
				text-align: right;
				float: left;
				width:0.75rem;
				height: 0.16rem;
				line-height:0.16rem;
				overflow: hidden;
				.copy_icon{
					width: 0.12rem;
					height: 0.14rem;
					float: left;
					background: url(../../../../images/situation/copy_1.png);
					background-size: 100% 100%;
					margin-left: 0.08rem;
					margin-right: 0.05rem;
				}
				.copy_text{
					float: left;

					font-size: 0.12rem;
					height: 0.16rem;
					line-height:0.16rem;
					padding-bottom: 0.02rem;
					@include aa;
				}
			}
			.collection_right:hover .copy_icon{
				width: 0.12rem;
				height: 0.14rem;
				float: left;
				background: url(../../../../images/situation/copy_2.png);
				background-size: 100% 100%;
				margin-left: 0.08rem;
				margin-right: 0.05rem;
			}
			.collection_right:hover .copy_text{
				float: left;

				font-size: 0.12rem;
				height: 0.16rem;
				line-height:0.16rem;
				padding-bottom: 0.02rem;
				color: #83dbff;
				@include aa;
			}
		}
	}
}

.check{
    background-color: transparent;
    border-radius: 0.05rem;
    border: 2px solid #83dbff;
    width: 0.2rem;
    height: 0.2rem;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 0.2rem;
    position:relative;

}
.custom-checkbox span{
        background-color: transparent;
	    border-radius: 0.05rem;
	    border: 2px solid #83dbff;
	    width: 0.2rem;
	    height: 0.2rem;
	    display: inline-block;
	    text-align: center;
	    vertical-align: middle;
	    line-height: 0.2rem;
	    @include aa;
    }
.custom-checkbox input[type="checkbox"]{
    display: none;
}
.custom-checkbox input[type="checkbox"]:checked + span{
    background-color: transparent;
}
.custom-checkbox input[type="checkbox"]:checked + span:after{
    content: "\2714";
}
.nav_footer{
	height: 0.5rem;
	width: 100%;
	background: url(../../../../assets/kaimenNav.png)no-repeat;
	margin-top: 0.05rem;
	background-size: 100% 100%;
	padding-top: 0.1rem;
	padding-left: 0.52rem;
	position:relative;
	.block {
		//float: right;
		// margin-top: -0.05rem;
		position:absolute;
		top:50%;
		margin-top:-0.25rem;
		right:0;
	}
	.out{
     	@include btn(0.8rem, 0.3rem);
     	margin-top: -0.1rem;
     	margin-left: 0.3rem;
	}
}
.showSuccess{
	width:2rem;
	height:1rem;
    background: url(../../../../images/callPlace_alert.png);
	background-size:cover;
	position: fixed;
	border-radius: 0.1rem;
	top: 15%;
	left: 50%;
	z-index: 2004;
	text-align: center;
	line-height: 1rem;
	p {
		color: #83dbff;
		font-size: 0.18rem;
	}
}
</style>
