<template>
	<div class="picker">
		<input type="" name="" value="2017-06-01" @click.stop="showTable" v-model="time" placeholder="输入日期范围">
		<i class="el-icon-date"></i>
		<transition name="el-zoom-in-top">
			<div class="picker_content" @click.stop="" v-show="hasTabel">
				<ul class="type">
					<li v-for="item in types" :class="{nav_active: countType == item}" @click="choiseType(item)">{{item}}</li>
				</ul>
				<!-- 按年选择 -->
				<div class="tables" v-if="countType=='按年统计'">
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="pre_year" @click="changeStartYear"><i class="el-icon-arrow-left"></i></span>
								<span class="year_scope">{{startYear + '年' + ' - '}}{{(startYear + 9) + '年' }}</span>
								<!-- <span class="next_year" @click="changeStartYear(1)">{{'>'}}</span> -->
							</div>
							<ul class="year_table">
								<li v-for="(num, index) in 10" @click="choiseYear(startYear + index)" :class="{activ_time: start==startYear + index, unuse_time: startYear + index>curYear}">{{startYear + index}}</li>
							</ul>
						</div>
					</div>
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<!-- <span class="pre_year" @click="changeEndYear(0)" v-if="startYear+10<endYear">{{'<'}}</span> -->
								<span class="year_scope">{{endYear + '年' + ' - '}}{{(endYear + 9) + '年'}}</span>
								<span class="next_year" @click="changeEndYear(1)"><i class="el-icon-arrow-right"></i></span>
							</div>
							<ul class="year_table">
								<li v-for="(num, index) in 10" @click="choiseYear(endYear + index)" :class="{activ_time: start==endYear + index, unuse_time: endYear + index>curYear}">{{endYear + index}}</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 按季选择 -->
				<div class="tables" v-if="countType=='按季统计'">
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="pre_year" @click="changeSeasonTable(0)"><i class="el-icon-arrow-left"></i></span>
								<span class="year_scope">{{seasonStartYear + '年'}}</span>
							</div>
							<ul class="year_table season_table">
								<li v-for="(num, index) in 4" @click="choiseSeason(seasonStartYear, index+1)" :class="{activ_time: start==seasonStartYear + '年' + (index+1) + '季度', unuse_time: seasonStartYear*10 + (index+1)>curSeasonValue}">{{ (index+1) + "季度"}}</li>
							</ul>
						</div>
					</div>
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="year_scope">{{seasonEndYear + '年'}}</span>
								<span class="next_year" @click="changeSeasonTable(1)"><i class="el-icon-arrow-right"></i></span>
							</div>
							<ul class="year_table season_table">
								<li v-for="(num, index) in 4" @click="choiseSeason(seasonEndYear, index+1)" :class="{activ_time: start==seasonEndYear + '年' + (index+1) + '季度', unuse_time: seasonEndYear*10 + (index+1)>curSeasonValue}">{{ (index+1)+ "季度"}}</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 按月选择 -->
				<div class="tables" v-if="countType=='按月统计'">
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="pre_year" @click="changeMonthTable(0)"><i class="el-icon-arrow-left"></i></span>
								<span class="year_scope">{{monthStartYear + '年'}}</span>
							</div>
							<ul class="year_table">
								<li v-for="(num, index) in 12" @click="choiseMonth(monthStartYear, index+1)" :class="{activ_time: start==monthStartYear + '年' + (index+1) + '月份', unuse_time: monthStartYear*100 + (index+1)>curMonthValue}">{{ (index+1) + "月份"}}</li>
							</ul>
						</div>
					</div>
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="year_scope">{{monthEndYear + '年'}}</span>
								<span class="next_year" @click="changeMonthTable(1)"><i class="el-icon-arrow-right"></i></span>
							</div>
							<ul class="year_table">
								<li v-for="(num, index) in 12" @click="choiseMonth(monthEndYear, index+1)" :class="{activ_time: start==monthEndYear + '年' + (index+1) + '月份', unuse_time: monthEndYear*100 + (index+1)>curMonthValue}">{{ (index+1)+ "月份"}}</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 按周统计 -->
				<div class="tables" v-if="countType=='按周统计'">
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="pre_year"><i class="el-icon-d-arrow-left" @click="changeDayYear(0)"></i><i class="el-icon-arrow-left" @click="changeDayMonth(0)"></i></span>
								<span class="year_scope">{{dayStartYear+ '年' + dayStartMonth+ '月'}}</span>
							</div>
							<table>
								<thead>
									<tr>
										<th v-for="(item, index) in weeks">{{item}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in dateArr1" class="week_tr" :class="{activ_time : dayStartYear*10000 + dayStartMonth*100 + index==weekIndexValue}">
										<td v-for="(day, index1) in item" @click="choiseWeek(dayStartYear,dayStartMonth,item,index)" :class="{ unuse_time: (index==0&&index1<dayStart1)||(index>=4&&day<15)}">{{day}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="year_scope">{{dayEndYear+ '年' + dayEndMonth+ '月'}}</span>
								<span class="next_year"><i class="el-icon-arrow-right" @click="changeDayMonth(1)"></i><i class="el-icon-d-arrow-right" @click="changeDayYear(1)"></i></span>
							</div>
							<table>
								<thead>
									<tr>
										<th v-for="(item, index) in weeks">{{item}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in dateArr2" class="week_tr" :class="{activ_time : dayEndYear*10000 + dayEndMonth*100 + index==weekIndexValue}">
										<td v-for="(day, index1) in item" @click="choiseWeek(dayEndYear,dayEndMonth,item,index)" :class="{ unuse_time: (index==0&&index1<dayStart2)||(index>=4&&day<15)}">{{day}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!-- 按日统计 -->
				<div class="tables" v-if="countType=='按日统计'">
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="pre_year"><i class="el-icon-d-arrow-left" @click="changeDayYear(0)"></i><i class="el-icon-arrow-left" @click="changeDayMonth(0)"></i></span>
								<span class="year_scope">{{dayStartYear+ '年' + dayStartMonth+ '月'}}</span>
							</div>
							<table>
								<thead>
									<tr>
										<th v-for="(item, index) in weeks">{{item}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in dateArr1">
										<td v-for="(day, index1) in item" @click="choiseDay(dayStartYear,dayStartMonth,day,index)" :class="{activ_time: (start== dayStartYear + '-' + dayStartMonth +'-' + day)&&((index==0&&day<10)||(index>=4&&day>15)||(index>=1&&index<=3)) , unuse_time: (index==0&&index1<dayStart1)||(index>=4&&day<15)}">{{day}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="sigle_table">
						<div class="year">
							<div class="year_title">
								<span class="year_scope">{{dayEndYear+ '年' + dayEndMonth+ '月'}}</span>
								<span class="next_year"><i class="el-icon-arrow-right" @click="changeDayMonth(1)"></i><i class="el-icon-d-arrow-right" @click="changeDayYear(1)"></i></span>
							</div>
							<table>
								<thead>
									<tr>
										<th v-for="(item, index) in weeks">{{item}}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in dateArr2">
										<td v-for="(day, index1) in item" @click="choiseDay(dayEndYear,dayEndMonth,day,index)" :class="{activ_time: (start== dayEndYear + '-' + dayEndMonth +'-' + day)&&((index==0&&day<10)||(index>=4&&day>15)||(index>=1&&index<=3)) , unuse_time: (index==0&&index1<dayStart2)||(index>=4&&day<15)}">{{day}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			types: ['按日统计','按周统计','按月统计','按季统计','按年统计'],
			countType: '按日统计',
			time: '',
			curYear: null,
			curMoon: null,
			curDay: null,
			curWeek: null,
			hasTabel: false,
			start: '',
			end: '',
			firstValue: 0,
			weeks: ["一","二","三","四","五","六","日"],

			//按年统计
			startYear: 2010,
			endYear: 2020,
			hasStart: false,
			//按季统计
			seasonStartYear: null,
			seasonEndYear: null,
			curSeasonValue: 0,
			//按月统计
			monthStartYear: null,
			monthEndYear: null,
			curMonthValue: 0,
			//按日统计
			dayStartYear: 0,
			dayEndYear: 0,
			dayStartMonth: 0,
			dayEndMonth: 0,
			curDayValue: 0,
			dateArr1: [],
			dateArr2: [],
			dayStart1: 0,
			dayEnd1: 0,
			dayStart2: 0,
			dayEnd2: 0,
			//按周统计
			weekIndexValue: 0,
		}
	},
	computed: {

	},
	methods: {
		changeStartYear(){
			this.startYear = this.startYear - 10;
			this.endYear = this.endYear - 10;
		},
		changeEndYear(){
			this.startYear = this.startYear + 10;
			this.endYear = this.endYear + 10;
		},
		//如果已经选择了开始时间，则选择结束时间然后清空、关闭，不然选择开始时间
		choiseYear(year){
			if(year>this.curYear){
				return
			}
			if(this.start==''){
				this.start = year;
			}else if(year>this.start){
				this.time = this.start + '~' + year;
				this.initData();
				this.hasTabel = false;
			}else{
				this.start = year;
			}		
		},
		//季度的比对值为，如： 2017*10 + 2（第三季度） = 20172
		choiseSeason(year, index){
			if(year*10+index>this.curSeasonValue){
				return
			}
			if(this.start==''){
				this.firstValue = year*10 + index;
				this.start = year + '年' + index + '季度'; 
			}else{
				var secondValue = year*10 + index;
				if(secondValue>this.firstValue){
					this.end = year + '年' + index + '季度'; 
					this.time = this.start + '~' + this.end;
					this.initData();
					this.hasTabel = false;
				}else{
					this.firstValue = year*10 + index;
					this.start = year + '年' + index + '季度'; 
				}
			}
		},
		changeSeasonTable(state){
			if(state==0){
				this.seasonStartYear--;
				this.seasonEndYear--;
			}else{
				this.seasonStartYear++;
				this.seasonEndYear++;
			}
		},
		//按月统计
		changeMonthTable(state){
			if(state==0){
				this.monthStartYear--;
				this.monthEndYear--;
			}else{
				this.monthStartYear++;
				this.monthEndYear++;
			}
		},
		choiseMonth(year, index){
			if(year*10+index>this.curMonthValue){
				return
			}
			if(this.start==''){
				this.firstValue = year*10 + index;
				this.start = year + '年' + index + '月份'; 
			}else{
				var secondValue = year*10 + index;
				if(secondValue>this.firstValue){
					this.end = year + '年' + index + '月份'; 
					this.time = this.start + '~' + this.end;
					this.initData();
					this.hasTabel = false;
				}else{
					this.firstValue = year*10 + index;
					this.start = year + '年' + index + '月份'; 
				}
			}
		},
		//按周统计
		weekFirstDay(year,month,day,index){
			var firstValue = null;
			var start = null;
			var Arr = [];
			if(index == 0&&day>7){
				if(month!= 1){
					firstValue = year*10000 + (month-1)*100 + day; 
					start = year + '-' + (month-1) +'-' + day+ '周';
				}else{
					firstValue = (year-1)*10000 + 12*100 + day; 
					start = (year-1) + '-' + 12 +'-' + day+ '周';
				}
			}else if(index>=4&&day<15){
				if(month!= 12){
					firstValue = year*10000 + (month+1)*100 + day; 
					start = year + '-' + (month+1) +'-' + day+ '周';
				}else{
					firstValue = (year+1)*10000 + 1*100 + day; 
					start = (year+1) + '-' + 1 +'-' + day+ '周';
				}
			}else{
				firstValue = year*10000 + month*100 + day; 
				start = year + '-' + month +'-' + day+ '周';
			}
			Arr[0] = firstValue;
			Arr[1] = start;
			return Arr
		},
		choiseWeek(year,month,weeks,index){
			var day = weeks[0];
			var Arr = [];
			this.weekIndexValue = year*10000 + month*100 + index;
			if(this.start == ''){
				Arr = this.weekFirstDay(year,month,day,index);
				this.firstValue = Arr[0];
				this.start = Arr[1];
			}else{
				Arr = this.weekFirstDay(year,month,day,index);
				var secondValue = Arr[0];
				if(secondValue> this.firstValue){
					this.end = Arr[1];
					this.time = this.start + '~' + this.end;
					this.initData();
					this.hasTabel = false;
				}else{
					this.firstValue = secondValue; 
					this.start = Arr[1];
				}
			}
		},
		//按日统计
		initDay(year, month,state){
			var monthArr = [];
			var Arr = [[],[],[],[],[],[]];
			var date = new Date(year,month-1,1);
			var week = date.getDay()==0?7:date.getDay();		//这个月1号的星期
			var endDay = new Date(year,month,0).getDate();	//这个月最后一天是几号
			var preEndDay = new Date(year,month-1,0).getDate();	//上个月最后一天是几号
			//获取上个月在表格中的数据
			for(let i = week-2; i >= 0; i-- ){
				monthArr[i] = preEndDay--;
			}
			//7*6的表格中容纳42个日期,这里获取下个月数据
			var j = 1;
			for(let i = week+endDay-1; i<=41 ; i++){	
				monthArr[i] = j++;
			}
			var k = 1;
			for(let i = week-1; i <= week+endDay-2; i++){
				monthArr[i] = k++;
			}
			var arrs = [];
			for(let i = 0; i<=41; i++){
				var j = parseInt(i/7);
				Arr[j].push(monthArr[i]);
			}
			if(state == 0){
				this.dayStart1 = week-1;
			}
			if(state == 1){
				this.dayStart2 = week-1;
			}
			return Arr
		},
		getInitDay(){
			this.dateArr1 = this.initDay(this.dayStartYear,this.dayStartMonth, 0);
			this.dateArr2 = this.initDay(this.dayEndYear,this.dayEndMonth, 1);
		},
		changeDayYear(state){
			if(state==0){
				this.dayStartYear--;
				this.dayEndYear--;
			}else{
				this.dayStartYear++;
				this.dayEndYear++;
			}
			this.getInitDay();
		},
		changeDayMonth(state){
			if(state==0){
				if(this.dayStartMonth>1&& this.dayStartMonth<12){
					this.dayStartMonth--;
					this.dayEndMonth--;
				}else if(this.dayStartMonth == 1){
					this.dayStartMonth = 12;
					this.dayStartYear--;
					this.dayEndMonth--;
				}else if(this.dayStartMonth == 12){
					this.dayStartMonth--;
					this.dayEndMonth = 12;
					this.dayEndYear--;
				}
			}
			if(state==1){
				if(this.dayEndMonth>1&& this.dayEndMonth<12){
					this.dayStartMonth++;
					this.dayEndMonth++;
				}else if(this.dayEndMonth == 1){
					this.dayStartMonth = 1;
					this.dayStartYear++;
					this.dayEndMonth++;
				}else if(this.dayEndMonth == 12){
					this.dayStartMonth++;
					this.dayEndMonth = 1;
					this.dayEndYear++;
				}
			}
			this.getInitDay();
		},
		choiseDay(year,month,day,index){
			if(day>10&&index==0){
				this.changeDayMonth(0);
				return
			}
			if(day<15&&index>=4){
				this.changeDayMonth(1);
				return
			}
			if(this.start==''){
				this.firstValue = year*10000 + month*100 + day; 
				this.start = year + '-' + month +'-' + day;
			}else{
				var secondValue = year*10000 + month*100 + day; 
				if(secondValue> this.firstValue){
					this.end = year + '-' + month +'-' + day;
					this.time = this.start + '~' + this.end;
					this.initData();
					this.hasTabel = false;
				}else{
					this.firstValue = year*10000 + month*100 + day; 
					this.start = year + '-' + month +'-' + day;
				}
			}
		},

		//公用部分
		choiseType(type){
			this.initData()
			this.countType = type;

		},
		showTable(){
			this.hasTabel = true;
		},
		initData(){
			this.start = '';
			this.end = '';
			this.hasStart = '';
			this.startYear = 2000;
			this.endYear = 2010;
			this.seasonStartYear = this.curYear - 1;
			this.seasonEndYear = this.curYear;
			this.monthStartYear = this.curYear - 1;
			this.monthEndYear = this.curYear;

			this.dayEndYear = this.curYear;
			this.dayEndMonth = this.curMoon;
			this.weekIndexValue = 0;
			if(this.dayEndMonth==1){
				this.dayStartMonth = 12;
				this.dayStartYear = this.curYear-1;
			}else{
				this.dayStartMonth = this.curMoon -1;
				this.dayStartYear = this.curYear;
			}
		}
	},
	mounted() {
		var refThis = this;
		document.getElementsByTagName("body")[0].addEventListener("click", function() {
			refThis.initData();
			refThis.hasTabel = false;
		});
		var date = new Date();
		this.curYear = date.getFullYear();
		this.curMoon = date.getMonth()+1;
		this.curDay = date.getDate();
		this.curWeek = date.getDay();
		this.curSeasonValue = this.curYear*10 + parseInt(this.curMoon/3 +1);
		this.curMonthValue = this.curYear*100 + this.curMoon;
		this.curDayValue = this.curYear*10000 + this.curMoon*100 + this.curDay; 
		this.initData();
		this.getInitDay();
	},
	watch: {
		time: function(){
			this.$emit('timeValue',this.time);
		}
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$th: 250px;	//高
$tw: 240px;	//单个表的宽
$cw: 100px;	//类型选择的宽
$aw: $tw + $tw + $cw + 10px;	//总宽
.picker{
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 2001;
	line-height: 0;				//不加这个的话里边文字的line-height就会被父组件的行高继承覆盖，原理不明
	.el-icon-date{
		position: absolute;
	    right: 10px;
	    top: 50%;
	    transform: translateY(-50%);
	}
	input{
		width: 100%;
		height: 100%;
		background: transparent;
		border: 0.01rem solid #83dbff;
		border-radius: 0.03rem;
		padding-left: 0.1rem;
	}
	display: inline-block;
	position: relative;
	.picker_content{
		position: absolute;
		right: 0;
	    bottom: -270px;
		background-color: $pickerbg;
		position: absolute;
		margin-top: 13px;
		font-size: 0;
		border: 1px solid #83dbff;
		box-shadow: 0 0 6px 0;
		width: $aw;
	}
	.type{
		// margin-left: 0.02rem;
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
	    width: $cw;
		height: $th;
		display: inline-block;
		vertical-align: top;
		li{
			text-align: center;
			margin-top: 5px;
			color: #ccc;
			font-size: 16px;
		    line-height: 30px;
			@include aa;
			&:hover {
				background-image: url(../../images/hover_bar.png);
				background-size: 100% 100%;
				color: #fff;
			}
		}
	}
	.tables{
		display: inline-block;
		width: $tw + $tw + 4px;
		font-size: 0;
	}
	.sigle_table{
		width: $tw;
		height: $th;
		border-left: 1px solid #83dbff;
		display: inline-block;
		vertical-align: top;
		.year{
			padding: 20px;
			.day_table{
				display: flex;
				li{
					display: inline-block;
					flex: 1;
				}
			}
			.year_title{
				position: relative;
				text-align: center;
				.pre_year{
					position:absolute;
					left: 0;
					top: 0;
					@include aa;
					i{
						color: $textblue;
						font-size: 14px;
						margin-right: 3px;
					}
				}
				.year_scope{
					font-size: 18px;
					line-height: 20px;
				}
				.next_year{
					position:absolute;
					right: 0;
					top: 0;
					@include aa;
					i{
						color: $textblue;
						font-size: 14px;
						margin-right: 3px;
					}
				}
			}
			.year_table{
				text-align: center;
				margin-top: 20px;
				li{
					display: inline-block;
					width: 80px;
					font-size: 16px;
					line-height: 28px;
					@include aa;
					&:hover{
						background-color: $darkblue;
					}
				}
			}
			.season_table{
				li{
					line-height: 60px;
				}
			}
		}
	}
	.second_table{
		width: $tw;
		height: $th;
		display: inline-block;
		vertical-align: top;
	}
	table{
		margin-top: 10px;
		width: 100%;
		tr{
			width: 100%;
			line-height: 25px;
			td,th{
				text-align: center;
				font-size: 12px;
			}
			th{
				color: $textblue;
			}
			td{
				@include aa;
				&:hover{
					background-color: $darkblue;
				}
			}
		}
	}
	.week_tr{
		&:hover{
			background-color: $darkblue;
		}
	}
}
.activ_time{
	background-color: $darkblue;
}
.unuse_time{
    color: rgba(255, 255, 255, 0.16);
	&:hover{
		background-color: transparent!important;
		cursor: default!important;

	}
}
</style>