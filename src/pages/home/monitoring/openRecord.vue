<template>
	<div class="bread_div">
		<!--面包导航组件-->
		<Bread :breadData="abc"></Bread>
		<!--头部-->
		<div class="device-nav">
			<div class="img-time">
				<div class="date-time">
					<div class="block">
						<span class="demonstration"></span>
						<el-date-picker v-model="value6" type="daterange" placeholder="输入日期范围" class="el_picker">
						</el-date-picker>
					</div>
				</div>
				<div class="date-device">
					<div>
						<el-input placeholder="请输入搜索内容" v-model="input5" class="place">
							<el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
								<el-option label="开门人" value="1"></el-option>
								<el-option label="相关设备" value="2"></el-option>
							</el-select>
							<el-button slot="append" icon="search"></el-button>
						</el-input>
					</div>
				</div>
				<input type="button" value="搜索" class="bttn">
				<a class="inout_a" href="javascript:void(0);" @click="method55('tableExcel')"><img src="../../../images/inout.png" alt=""></a>
			</div>
		</div>
		<div class="table">
			<table id="tableExcel" cellspacing="0" cellpadding="0">
				<thead class="table_thead">
					<tr class="nav_table">
						<th class="left_none"> 序号</th>
						<th> 门设备</th>
						<th> 开门时间</th>
						<th> 开门人</th>
						<th> 开门原因</th>
						<th class="vehicle">
							<select>
								<option value="volvo">全部人员类型</option>
								<option value="saab">业主</option>
								<option value="opel">装修</option>
								<option value="audi">家政</option>
								<option value="audi">家教</option>
								<option value="audi">中介</option>
								<option value="audi">外卖</option>
								<option value="audi">快递</option>
							</select>
						</th>
						<th class="vehicle">
							<select>
								<option value="volvo">全部名单</option>
								<option value="saab">白名单</option>
								<option value="opel">黄名单</option>
								<option value="audi">黄名单（失效）</option>
								<option value="opel">红名单</option>
							</select>
						</th>
						<th>相关设备</th>
						<th>抓拍记录</th>
					</tr>
				</thead>
				<tbody class="table_body">
					<tr v-for="(d,index) in openList" :key="index" class="center_table">
						<td>{{d.序号}}</td>
						<td>{{d.门设备}}</td>
						<td>{{d.开门时间}}</td>
						<td>{{d.开门人}}</td>
						<td>
							<span :class="{red_name: d.nameType=='红名单'}">{{d.开门原因}}</span>
						</td>
						<td>{{d.全部人员类型}}</td>
						<td>{{d.全部名单}}</td>
						<td>{{d.相关设备}}</td>
						<td>{{d.查看照片}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--底部换页-->
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
import openRecord from '@/httpData/openRecord'
import { format, gapTime } from '@/script/timeFormat.js'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			abc: ['物联监控', '出入物联监控', '人行指挥调度', '开门记录'],
			openList: [],
			currentPage2: 5,
			input5: '',
			select: '',
			value6: ''
		}
	},
	computed: {
		...mapState(['mnUrl']),
	},
	components: {
		Bread
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
      this.openList = openRecord.content
      this.openList.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 上报时间
        item.开门时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.开门时间.substr(-8) //日期随机+时间取定值
      })
		},
		method55(tableExcel) {
			this.$func.method5(tableExcel)
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
/*整个大框*/
.bread_div {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	.device-nav {
		display: inline-block;
		height: 0.6rem;
		width: 100%;
		background: url(../../../assets/kaimenNav.png)no-repeat;
		background-size: 100% 100%;
		.img-time {
			display: inline-block;
			height: 0.6rem;
			width: auto;
			position: relative;
			margin-bottom: 0.1rem;
			float: right;
			.date-time {
				display: inline-block;
				width: 2.58rem;
				height: 0.4rem;
				color: #67bce9;
				outline: none;
				margin-right: 0.2rem;
				vertical-align: middle;
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
				.place {
					font-size: 0.14rem;
				}
			} // 搜索按钮
			.bttn {
				margin: 0.16rem 0.15rem 0 0;
				@include btn(0.8rem, 0.3rem);
			}
			.inout_a {
				margin-right: 0.15rem;
				img {
					width: 0.21rem;
					height: 0.21rem;
				}
			}
		}
	}
}

.table {
	width: 100%;
	height: 6.8rem;
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
				.left_none {}
				.vehicle {
					select {
						height: 100%;
						color: #83dbff;
						outline: none;
						padding: 0 0.1rem;
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
			height: 6.5rem;
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

//动态添加样式
.red_name {
	color: red!important;
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
	// padding-right: 14px;
}

select::-ms-expand {
	display: none;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
