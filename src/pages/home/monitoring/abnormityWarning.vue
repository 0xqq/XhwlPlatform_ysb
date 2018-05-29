<template>
	<div class="main">
		<!--面包导航组件-->
		<Bread :breadData="ab"></Bread>
		<!--搜索栏-->
		<div class="device-nav">
			<div class="img-time">
				<div class="info">
					<el-select v-model="value1" placeholder="上报时间">
						<el-option v-for="item in options1" :key="item.value1" :label="item.label" :value="item.value1">
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
								<el-option label="对接人" value="1"></el-option>
								<el-option label="上报人" value="2"></el-option>
								<el-option label="上报人" value="3"></el-option>
							</el-select>
							<el-button slot="append" icon="search"></el-button>
						</el-input>
					</div>
				</div>
				<input type="button" value="搜索" class="bttn">
				<img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
			</div>
		</div>
		<el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
			<el-table-column prop="上报时间" label="上报时间">
			</el-table-column>
			<el-table-column prop="上报人" label="上报人">
			</el-table-column>
			<el-table-column prop="状态" label="全部状态">
			</el-table-column>
			<el-table-column prop="对接人" label="对接人">
			</el-table-column>
			<el-table-column prop="对接时间" label="对接时间">
			</el-table-column>
			<el-table-column prop="处置简述" label="处置简述">
			</el-table-column>
			<el-table-column prop="name" label="操作">
			</el-table-column>
		</el-table>
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
			ab: ['物联监控', '云对讲呼叫台', '进度跟踪'],
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
			value6: '',
			currentPage2: 5,
			tableData3: [{ name: '回访对讲' }
			],
			input5: '',
			select: '',
			options1: [
				{
					value1: 'zhinan1',
					label: '上报时间'
				},
				{
					value1: 'zhinan2',
					label: '处理时间'
				}
			],
			options2: [
				{
					value2: 'zhinan1',
					label: '客服'
				},
				{
					value2: 'zhinan2',
					label: '安管'
				},
				{
					value2: 'zhinan3',
					label: '工程'
				},
				{
					value2: 'zhinan4',
					label: '环境'
				}
			],
			value1: '',
			value2: ''
		}
	},
	hideImg() {
		this.showImg = false;
	},
	computed: {
		...mapState(['mnUrl'])
	},
	components: {
		Bread
	},
	mounted() {
		this.getData();
	},
	methods: {
		toggle() {
			console.log(1)
		},
		call() {
			this.$router.push({ path: 'naswerNormal' });
		},
		getData() {
			const url = this.mnUrl + "/tmp/watching/park/processes"
			this.$http.get(url).then(res => {
				console.log(res)
				this.tableData3 = res.body.content;

				// console.log(this.value)
			}, function(error) {
				console.log(error)
			})
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
		},
		derivedForm(tableExcel) {
			this.$func.method5(tableExcel)
		},
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

.select1 {
	width: 1.1rem;
}

.main {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
}






/*头部button组件*/

.device-nav {
	height: 0.6rem;
	width: 100%;
	background: url(../../../assets/kaimenNav.png)no-repeat;
	background-size: 100% 100%;
	padding-bottom: 0.5rem;
	margin-bottom: 0.08rem;
	.btn {
		line-height: 0.3rem;
		margin: 0.13rem 0 0 0.15rem;
		@include btn(1.41rem, 0.36rem);
		span {
			display: inline-block;
			font-size: 0.24rem;
			color: #fff;
		}
	} //导航栏右边的日历搜索等框
	.img-time {
		display: inline-block;
		height: 0.6rem;
		width: auto;
		position: relative;
		margin-bottom: 0.1rem;
		float: right;
		.info {
			width: 1.5rem;
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
			margin-right: 2rem;
			margin-left: -0.05rem;
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

.img-time>div {
	display: inline-block;
}

.select_group {
	width: 1.5rem;
	height: 0.42rem;
	margin-left: 0.2rem;
}

.select_group2 {
	width: 1.3rem;
	height: 0.42rem;
}

.el_select {
	width: 1.3rem;
}

.el_date_picke {
	width: 2.26rem;
	height: 0.36rem;
	margin-left: 4rem;
}

.btn {
	width: 0.90rem;
	height: 0.46rem;
	background: #028fd8;
	border-radius: 0 0.05rem 0.05rem 0;
	border: 1px solid #83dbff;
	position: absolute;
	right: 0.2rem;
	color: white;
	top: 50%;
	margin-top: -0.23rem;
}

.btn:hover {
	cursor: pointer;
}

.rearch {
	width: 2rem;
	height: 0.46rem;
	border: 0.01rem solid #83dbff;
	position: absolute;
	right: 1.1rem;
	top: 50%;
	margin-top: -0.23rem;
	background: transparent;
	outline: none;
	padding-left: 0.1rem;
	color: white;
	border-radius: 0.05rem 0 0 0.05rem;
}






/*滚动条*/

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

#tableExcel {
	min-height: 7rem;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>