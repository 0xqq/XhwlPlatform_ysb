<template>
	<div class="main">
		<!--面包导航组件-->
		<Bread :breadData="ab"></Bread>
		<!--搜索栏-->
		<div class="device-nav">
			<div class="img-time">
				<div class="info">
					<el-select v-model="value1" placeholder="上报时间">
						<el-option v-for="item in options" :key="item.value1" :label="item.label" :value="item.value1">
						</el-option>
					</el-select>
				</div>
				<div class="date_time">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
						</el-date-picker>
					</div>
				</div>
				<div class="date-device">
					<div>
						<el-input placeholder="请输入搜索内容" v-model="input5" class="place">
							<el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
								<el-option label="类型" value="1"></el-option>
								<el-option label="状态" value="2"></el-option>
								<el-option label="对接人" value="3"></el-option>
							</el-select>
							<el-button slot="append" icon="search"></el-button>
						</el-input>
					</div>
				</div>
				<input type="button" value="搜索" class="bttn">
				<img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
			</div>
		</div>
		<!--顶部导航-->
		<div class="table" id='table-cont'>
			<table id="tableExcel" cellspacing="0" cellpadding="0">
				<thead class="table_thead">
					<tr class="nav_table">
						<th class="left_none">系统 </th>
						<th class="vehicle">
							<select>
								<option value="volvo">全部款项</option>
								<option value="saab">维修费</option>
								<option value="opel">水电费</option>
								<option value="audi">增值服务费</option>
							</select>
						</th>
						<th class="vehicle">
							<select>
								<option value="volvo">全部状态</option>
								<option value="saab">已处理</option>
								<option value="opel">未处理&nbsp &nbsp</option>
							</select>
						</th>
						<th>对接人</th>
						<th> 上报时间</th>
						<th> 处理时间</th>
					</tr>
				</thead>
				<tbody class="table_body">
					<tr v-for="(d,index) in value" :key="index" class="center_table">
						<td>{{d.系统}}</td>
						<td>{{d.报警类型}}</td>
						<td>{{d.状态}}</td>
						<td>{{d.对接人}}</td>
						<td>{{d.上报时间}}</td>
						<td>{{d.处理时间}}</td>
					</tr>
				</tbody>
			</table>
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
import callPolice from '@/httpData/callPolice.js'
import { format, gapTime } from '@/script/timeFormat.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			showImg: false,
			ab: ['物联监控', '园区电子地图', '报警管理'],
			currentPage2: 5,
			pickerOptions2: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
			select: '',
			input5: '',
			value6: '',
			value: [],
			options: [
				{
					value1: 'zhinan1',
					label: '处理时间'
				},
				{
					value1: 'zhinan2',
					label: '上报时间'
				},
			],
			value1: '',
		}
	},
	components: {
		Bread
	},
	computed: {
		...mapState(['mnUrl'])
	},
	mounted() {
		this.getData();
	},
	methods: {
		derivedForm(tableExcel) {
			this.$func.method5(tableExcel)
		},
		getData() {
      this.value  = callPolice.content
      this.value.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 上报时间
        item.上报时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.上报时间.substr(-8) //日期随机+时间取定值
        item.处理时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.处理时间.substr(-8) //日期随机+时间取定值
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

.el-select {
	width: 1.1rem;
}

.main {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
}

.hide_div {
	@include shade;
	text-align: right;
	i {
		background: transparent;
		width: 0.18rem;
		height: 0.18rem;
		display: inline-block;
		position: absolute;
		top: 0.05rem;
		right: 0.07rem;
		background: url(../../../images/close.png);
	}
}

.hide_div i:hover {
	cursor: pointer;
}






/*头部button组件*/

.device-nav {
	height: 0.6rem;
	width: 100%;
	background: url(../../../assets/kaimenNav.png)no-repeat;
	background-size: 100% 100%;
	padding-bottom: 0.5rem;
	margin-bottom: 0.08rem; //导航栏右边的日历搜索等框
	.img-time {
		display: inline-block;
		height: 0.6rem;
		width: auto;
		position: relative;
		margin-bottom: 0.1rem;
		float: right;
		.info {
			width: 1.1rem;
			height: 0.4rem;
			display: inline-block;
			vertical-align: middle;
		}
		.date_time {
			display: inline-block;
			width: 2.58rem;
			height: 0.4rem;
			color: #67bce9;
			outline: none;
			margin-right: 1rem;
			margin-left: -0.05rem;
			vertical-align: middle; // margin-top:0.05rem;
			.el_picker {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				font-size: 0.14rem;
			}
		}

		.search {
			display: inline-block;
			width: 0.2rem;
			height: 0.2rem;
			background: url(../../../assets/search.png)no-repeat;
			background-size: 100% 100%;
			margin-left: -0.3rem;
			@include aa;
		} // 配置名称框
		.date-device {
			display: inline-block;
			height: 0.4rem;
			width: 4.65rem;
			background: transparent;
			color: #67bce9;
			vertical-align: middle;
			font-size: 0.14rem;
			.place {
				font-size: 0.14rem;
			}
		} // 搜索按钮
		.bttn {
			margin: 0.16rem 0.15rem 0 0;
			@include btn(0.8rem, 0.3rem)
		}
		img {
			width: 0.21rem;
			height: 0.21rem;
			margin-right: 0.15rem;
			@include aa;
		}
	}
}
/*滚动条*/

.table {
	width: 100%;
	height: 7rem;
	background-image: url(../../../images/kaimen.png);
	background-size: 100% 100%;
	overflow: hidden;
	scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
	scrollbar-face-color: #184e7a; // 滚动条整体颜色
	// scrollbar-highlight-color: #333;
	// 滚动条阴影
	// scrollbar-shadow-color: #ccc;
	// 滚动条轨道颜色·································································	··································································
	scrollbar-track-color: #12253d;
	scrollbar-arrow-color: #12253d;
	table {
		width: 100%;
		height: 6.2rem;
		border: 0;
		.table_thead {
			display: inline-block;
			width: 100%;
			height: 0.4rem;
			overflow: hidden;
			background-color: #184e7a;
			.nav_table {
				width: 100%;
				height: 0.4rem;
				text-align: center;
				overflow: hidden;
				background-image: url(../../../images/kaimenNav.png);
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				th:last-child {
					border-right: 2px solid #698499;
				}
				th {
					flex: 1;
					width: 0.6rem;
					height: 0.4rem;
					line-height: 0.4rem;
					border-left: 2px solid #698499;
					display: inline-block;
				}
				.vehicle {
					select {
						text-align: center;
						color: #83dbff;
						outline: none;
						height: 100%;
						margin-left: 0.15rem;
						padding: 0.1rem 0.1rem;
						@include aa;
						option {
							background: #060e1d;
						}
					}
				}
			}
		}
		.table_body {
			display: inline-block;
			width: 100%;
			height: 6.8rem;
			overflow: hidden;
			overflow-y: scroll;
			.center_table {
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-bottom: 2px solid #698499;
				td {
					flex: 1;
					height: 0.4rem;
					padding: 0.2rem 0;
					line-height: 0.4rem;
					text-align: center;
					display: inline-block;
				}
			}
		}
	}
}
/*底部换页框*/

.pager {
	float: right;
	margin-top: 0.2rem;
}

.zhezhao {
	width: 4.04rem;
	height: 1.98rem;
	background: url(../../../images/answerbg.png);
	@include center;
	border-radius: 0.1rem;
	position: relative;
	text-align: center;
}

.zhezhao .tel {
	display: inline-block;
	font-size: 0.18rem;
	color: white;
	position: absolute;
	top: 0.58rem;
	left: 1.3rem;
	text-align: center;
}

.zhezhao input {
	width: 1.41rem;
	height: 0.36rem;
	background: url(../../../images/zNormal.png);
	position: absolute;
	top: 1.25rem;
	left: 1.33rem;
	color: white;
}

.zhezhao input:hover {
	background: url(../../../images/zHover.png);
	cursor: pointer;
}

.zhezhao input:active {
	background: url(../../../images/zActive.png);
}

i {
	color: transparent !important;
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
